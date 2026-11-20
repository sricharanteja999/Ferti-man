import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Eye,
  Sliders,
  Sparkles,
  Info,
  ShieldAlert,
  Flame,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';

export type PathologyMode = 'normal' | 'prostate_tumor' | 'varicocele' | 'torsion' | 'hydrocele';
export type CutawayPlane = 'full' | 'sagittal' | 'coronal' | 'exploded';

interface Atlas3DViewerProps {
  activePathology: PathologyMode;
  onSelectOrgan: (organName: string) => void;
  selectedOrganName?: string;
  isClinicianMode?: boolean;
}

export const Atlas3DViewer: React.FC<Atlas3DViewerProps> = ({
  activePathology,
  onSelectOrgan,
  selectedOrganName,
  isClinicianMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cutaway, setCutaway] = useState<CutawayPlane>('full');
  const [transparency, setTransparency] = useState<number>(0.3);
  const [explodedVal, setExplodedVal] = useState<number>(0);
  const [isCinematic, setIsCinematic] = useState<boolean>(false);
  const [cameraView, setCameraView] = useState<'anterior' | 'lateral' | 'pelvic' | 'scrotal'>('anterior');

  // Internal Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const atlasGroupRef = useRef<THREE.Group | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 10));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const animFrameId = useRef<number>(0);

  // Mesh refs for dynamic pathology transformations
  const prostateMeshRef = useRef<THREE.Mesh | null>(null);
  const tumorMeshRef = useRef<THREE.Mesh | null>(null);
  const pampiniformGroupRef = useRef<THREE.Group | null>(null);
  const testisLeftMeshRef = useRef<THREE.Mesh | null>(null);
  const cordGroupRef = useRef<THREE.Group | null>(null);
  const hydroceleMeshRef = useRef<THREE.Mesh | null>(null);
  const bladderMeshRef = useRef<THREE.Mesh | null>(null);

  // References to keep in sync without re-creating scene
  const pathologyRef = useRef<PathologyMode>(activePathology);
  const cutawayRef = useRef<CutawayPlane>(cutaway);
  const transparencyRef = useRef<number>(transparency);
  const explodedRef = useRef<number>(explodedVal);

  useEffect(() => {
    pathologyRef.current = activePathology;
  }, [activePathology]);

  useEffect(() => {
    cutawayRef.current = cutaway;
  }, [cutaway]);

  useEffect(() => {
    transparencyRef.current = transparency;
    if (bladderMeshRef.current && bladderMeshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
      bladderMeshRef.current.material.opacity = 0.5 + (1 - transparency) * 0.4;
    }
  }, [transparency]);

  useEffect(() => {
    explodedRef.current = explodedVal;
  }, [explodedVal]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x061510); // Calm deep clinical dark green
    scene.fog = new THREE.FogExp2(0x061510, 0.04);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 10);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Room Environment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // fallback
    }

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x183c30, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xdcfce7, 2.8);
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x6ee7b7, 1.6);
    fillLight.position.set(-6, -2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(0, -6, -6);
    scene.add(rimLight);

    // Ground Contact Shadow
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 30, 20, 0.7)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const groundMat = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      depthWrite: false,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3.8;
    scene.add(ground);

    // 6. BUILD COMPLETE ANATOMICAL 3D MESH GROUP
    const atlasGroup = new THREE.Group();
    atlasGroupRef.current = atlasGroup;
    scene.add(atlasGroup);

    // A. URINARY BLADDER
    const bladderGeo = new THREE.SphereGeometry(1.6, 32, 28);
    bladderGeo.scale(1.2, 1.0, 1.1);
    const bladderMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0x78350f,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.7,
      clearcoat: 0.8,
    });
    const bladderMesh = new THREE.Mesh(bladderGeo, bladderMat);
    bladderMesh.position.set(0, 2.2, -0.4);
    bladderMesh.name = 'Urinary Bladder';
    bladderMesh.userData = { organ: 'Urinary Bladder' };
    atlasGroup.add(bladderMesh);
    bladderMeshRef.current = bladderMesh;

    // B. PROSTATE GLAND (Zonal Anatomy: Peripheral, Central & Transition)
    const prostateGroup = new THREE.Group();
    prostateGroup.name = 'Prostate Gland';
    prostateGroup.position.set(0, 0.7, -0.2);

    // Peripheral & Central zone body
    const prostateGeo = new THREE.SphereGeometry(1.15, 32, 24);
    prostateGeo.scale(1.1, 0.85, 1.0);
    const prostateMat = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      emissive: 0x451a03,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.6,
    });
    const prostateMesh = new THREE.Mesh(prostateGeo, prostateMat);
    prostateMesh.userData = { organ: 'Prostate Gland' };
    prostateGroup.add(prostateMesh);
    prostateMeshRef.current = prostateMesh;

    // Prostate Cancer Tumor Nodule (Attached in Peripheral Zone)
    const tumorGeo = new THREE.SphereGeometry(0.55, 24, 20);
    tumorGeo.scale(1.1, 1.0, 0.9);
    const tumorMat = new THREE.MeshPhysicalMaterial({
      color: 0xdc2626,
      emissive: 0x991b1b,
      emissiveIntensity: 0.7,
      roughness: 0.5,
      metalness: 0.2,
      clearcoat: 0.9,
    });
    const tumorMesh = new THREE.Mesh(tumorGeo, tumorMat);
    tumorMesh.position.set(0.7, -0.15, 0.4);
    tumorMesh.name = 'Prostate Tumor Nodule (Peripheral Zone)';
    tumorMesh.userData = { organ: 'Prostate Cancer (Peripheral Zone Tumor)' };
    tumorMesh.visible = false;
    prostateGroup.add(tumorMesh);
    tumorMeshRef.current = tumorMesh;

    atlasGroup.add(prostateGroup);

    // C. SEMINAL VESICLES (Bilateral lobulated glands behind prostate)
    const svMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
    const svGeo = new THREE.TorusGeometry(0.5, 0.16, 12, 24, Math.PI * 1.3);

    const svRight = new THREE.Mesh(svGeo, svMat);
    svRight.position.set(0.85, 1.4, -0.8);
    svRight.rotation.set(0.4, 0.3, 0.5);
    svRight.name = 'Right Seminal Vesicle';
    svRight.userData = { organ: 'Seminal Vesicles' };
    atlasGroup.add(svRight);

    const svLeft = new THREE.Mesh(svGeo, svMat);
    svLeft.position.set(-0.85, 1.4, -0.8);
    svLeft.rotation.set(0.4, -0.3, -0.5);
    svLeft.name = 'Left Seminal Vesicle';
    svLeft.userData = { organ: 'Seminal Vesicles' };
    atlasGroup.add(svLeft);

    // D. URETHRA (Prostatic, Membranous & Penile conduit)
    const urethraPoints = [
      new THREE.Vector3(0, 1.8, -0.3),
      new THREE.Vector3(0, 0.7, -0.2),
      new THREE.Vector3(0, -0.2, 0.1),
      new THREE.Vector3(0, -0.8, 0.8),
      new THREE.Vector3(0, -1.8, 1.6),
    ];
    const urethraSpline = new THREE.CatmullRomCurve3(urethraPoints);
    const urethraGeo = new THREE.TubeGeometry(urethraSpline, 32, 0.12, 12, false);
    const urethraMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
    const urethraMesh = new THREE.Mesh(urethraGeo, urethraMat);
    urethraMesh.name = 'Urethra (Conduit)';
    urethraMesh.userData = { organ: 'Urethra' };
    atlasGroup.add(urethraMesh);

    // E. PENIS (Shaft with Corpora Cavernosa & Glans)
    const penisGroup = new THREE.Group();
    penisGroup.name = 'Penis';
    penisGroup.position.set(0, -0.5, 0.6);

    // Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.52, 0.58, 1.8, 28);
    shaftGeo.rotateX(0.7);
    const shaftMat = new THREE.MeshPhysicalMaterial({
      color: 0xf43f5e,
      emissive: 0x881337,
      emissiveIntensity: 0.2,
      roughness: 0.35,
      clearcoat: 0.5,
    });
    const shaftMesh = new THREE.Mesh(shaftGeo, shaftMat);
    shaftMesh.position.set(0, -0.6, 0.5);
    shaftMesh.userData = { organ: 'Corpora Cavernosa (Penile Shaft)' };
    penisGroup.add(shaftMesh);

    // Glans Penis
    const glansGeo = new THREE.SphereGeometry(0.62, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.6);
    glansGeo.rotateX(2.3);
    const glansMat = new THREE.MeshPhysicalMaterial({
      color: 0xfb7185,
      emissive: 0x9f1239,
      emissiveIntensity: 0.25,
      roughness: 0.3,
      clearcoat: 0.7,
    });
    const glansMesh = new THREE.Mesh(glansGeo, glansMat);
    glansMesh.position.set(0, -1.5, 1.25);
    glansMesh.userData = { organ: 'Glans Penis' };
    penisGroup.add(glansMesh);

    atlasGroup.add(penisGroup);

    // F. SCROTUM & TESTES (Bilateral gonads, epididymis, & pampiniform venous plexus)
    const scrotalGroup = new THREE.Group();
    scrotalGroup.name = 'Scrotal Complex';
    scrotalGroup.position.set(0, -2.4, 0.1);

    // Testis Material
    const testisMat = new THREE.MeshPhysicalMaterial({
      color: 0xfef08a,
      emissive: 0x854d0e,
      emissiveIntensity: 0.2,
      roughness: 0.25,
      metalness: 0.05,
      clearcoat: 0.9,
    });

    // Right Testis
    const testisGeo = new THREE.SphereGeometry(0.85, 28, 24);
    testisGeo.scale(0.85, 1.2, 0.95);
    const testisRight = new THREE.Mesh(testisGeo, testisMat);
    testisRight.position.set(0.9, -0.4, 0);
    testisRight.name = 'Right Testis';
    testisRight.userData = { organ: 'Testis' };
    scrotalGroup.add(testisRight);

    // Left Testis (Target for Varicocele & Torsion simulations)
    const testisLeft = new THREE.Mesh(testisGeo, testisMat.clone());
    testisLeft.position.set(-0.9, -0.4, 0);
    testisLeft.name = 'Left Testis';
    testisLeft.userData = { organ: 'Testis' };
    scrotalGroup.add(testisLeft);
    testisLeftMeshRef.current = testisLeft;

    // Epididymis (Crescent structure on posterior-superior border)
    const epiGeo = new THREE.TorusGeometry(0.92, 0.18, 14, 24, Math.PI * 1.15);
    const epiMat = new THREE.MeshStandardMaterial({ color: 0xfb923c, roughness: 0.3 });

    const epiRight = new THREE.Mesh(epiGeo, epiMat);
    epiRight.position.set(0.95, -0.3, -0.2);
    epiRight.rotation.set(0.2, 0.4, 0.5);
    epiRight.name = 'Right Epididymis';
    epiRight.userData = { organ: 'Epididymis' };
    scrotalGroup.add(epiRight);

    const epiLeft = new THREE.Mesh(epiGeo, epiMat);
    epiLeft.position.set(-0.95, -0.3, -0.2);
    epiLeft.rotation.set(0.2, -0.4, -0.5);
    epiLeft.name = 'Left Epididymis';
    epiLeft.userData = { organ: 'Epididymis' };
    scrotalGroup.add(epiLeft);

    // Pampiniform Venous Plexus & Spermatic Cord (Left side)
    const pampiniformGroup = new THREE.Group();
    pampiniformGroup.name = 'Pampiniform Venous Plexus';
    pampiniformGroup.position.set(-0.9, 0.8, 0);

    // Blue venous coiling tubes
    const veinMat = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
      roughness: 0.25,
      metalness: 0.1,
    });
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const vCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * 0.18, -0.8, Math.sin(angle) * 0.18),
        new THREE.Vector3(Math.cos(angle + 1) * 0.25, 0, Math.sin(angle + 1) * 0.25),
        new THREE.Vector3(Math.cos(angle + 2) * 0.18, 1.2, Math.sin(angle + 2) * 0.18),
      ]);
      const vMesh = new THREE.Mesh(new THREE.TubeGeometry(vCurve, 24, 0.08, 8, false), veinMat);
      pampiniformGroup.add(vMesh);
    }

    // Red Testicular Artery core
    const artMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const artCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.8, 0),
      new THREE.Vector3(0.04, 0.2, 0.04),
      new THREE.Vector3(0, 1.2, 0),
    ]);
    const artMesh = new THREE.Mesh(new THREE.TubeGeometry(artCurve, 20, 0.06, 8, false), artMat);
    pampiniformGroup.add(artMesh);

    scrotalGroup.add(pampiniformGroup);
    pampiniformGroupRef.current = pampiniformGroup;
    cordGroupRef.current = pampiniformGroup;

    // Hydrocele Fluid Sac (Tunica Vaginalis expansion)
    const hydroGeo = new THREE.SphereGeometry(1.25, 24, 20);
    hydroGeo.scale(0.9, 1.35, 1.05);
    const hydroMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.6,
      clearcoat: 1.0,
    });
    const hydroMesh = new THREE.Mesh(hydroGeo, hydroMat);
    hydroMesh.position.set(-0.9, -0.4, 0);
    hydroMesh.name = 'Hydrocele (Tunica Vaginalis Fluid Sac)';
    hydroMesh.userData = { organ: 'Hydrocele' };
    hydroMesh.visible = false;
    scrotalGroup.add(hydroMesh);
    hydroceleMeshRef.current = hydroMesh;

    atlasGroup.add(scrotalGroup);

    // 7. Raycasting for organ selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(atlasGroup.children, true);

      if (intersects.length > 0) {
        // Find topmost object with userData.organ
        for (const hit of intersects) {
          if (hit.object.userData && hit.object.userData.organ) {
            onSelectOrgan(hit.object.userData.organ);
            break;
          }
        }
      }
    };
    renderer.domElement.addEventListener('click', onPointerClick);

    // Mouse drag orbit controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !atlasGroupRef.current) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      atlasGroupRef.current.rotation.y += dx * 0.008;
      atlasGroupRef.current.rotation.x += dy * 0.006;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    // 8. Render Tick Loop
    const tick = () => {
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.06);
        cameraRef.current.lookAt(targetLookAt.current);
      }

      // Dynamic Pathology Morphing
      const pMode = pathologyRef.current;

      // 1. Prostate Tumor Nodule
      if (tumorMeshRef.current) {
        tumorMeshRef.current.visible = pMode === 'prostate_tumor';
        if (tumorMeshRef.current.visible) {
          const pulse = 1.0 + 0.06 * Math.sin(time * 3.0);
          tumorMeshRef.current.scale.set(1.1 * pulse, 1.0 * pulse, 0.9 * pulse);
        }
      }

      // 2. Varicocele (Engorged Pampiniform Plexus Veins)
      if (pampiniformGroupRef.current) {
        const isVaricocele = pMode === 'varicocele';
        const targetScale = isVaricocele ? 1.75 : 1.0;
        pampiniformGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, 1.0, targetScale), 0.08);

        pampiniformGroupRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
            child.material.color.setHex(isVaricocele ? 0x1e3a8a : 0x2563eb);
          }
        });
      }

      // 3. Testicular Torsion (Twisting of cord + Testis Ischemia)
      if (cordGroupRef.current && testisLeftMeshRef.current) {
        const isTorsion = pMode === 'torsion';
        if (isTorsion) {
          // Twist cord by 720 degrees and darken testis
          cordGroupRef.current.rotation.y = Math.PI * 2.5;
          if (testisLeftMeshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
            testisLeftMeshRef.current.material.color.setHex(0x581c87); // Deep ischemic purple
            testisLeftMeshRef.current.material.emissive.setHex(0x3b0764);
          }
        } else {
          cordGroupRef.current.rotation.y = 0;
          if (testisLeftMeshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
            testisLeftMeshRef.current.material.color.setHex(0xfef08a); // Healthy yellow
            testisLeftMeshRef.current.material.emissive.setHex(0x854d0e);
          }
        }
      }

      // 4. Hydrocele Fluid Sac
      if (hydroceleMeshRef.current) {
        hydroceleMeshRef.current.visible = pMode === 'hydrocele';
      }

      // Exploded View Kinematics
      const exp = explodedRef.current;
      if (bladderMeshRef.current && prostateGroup && scrotalGroup && penisGroup) {
        bladderMeshRef.current.position.y = 2.2 + exp * 1.5;
        prostateGroup.position.z = -0.2 - exp * 1.0;
        scrotalGroup.position.y = -2.4 - exp * 1.6;
        penisGroup.position.z = 0.6 + exp * 1.4;
      }

      // Cutaway Plane adjustments (Sagittal cut removes right hemisphere)
      const cWay = cutawayRef.current;
      if (atlasGroupRef.current) {
        if (cWay === 'sagittal') {
          atlasGroupRef.current.rotation.y = -Math.PI / 2;
        } else if (cWay === 'coronal') {
          atlasGroupRef.current.rotation.y = 0;
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        animFrameId.current = window.setTimeout(tick, 80);
      } else {
        animFrameId.current = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      clearTimeout(animFrameId.current);
      dom.removeEventListener('click', onPointerClick);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Camera presets
  const setPreset = (view: 'anterior' | 'lateral' | 'pelvic' | 'scrotal') => {
    setCameraView(view);
    if (!targetCamPos.current || !targetLookAt.current) return;

    if (view === 'anterior') {
      targetCamPos.current.set(0, 0.4, 9.5);
      targetLookAt.current.set(0, -0.2, 0);
    } else if (view === 'lateral') {
      targetCamPos.current.set(8.5, 0.4, 3.5);
      targetLookAt.current.set(0, -0.2, 0);
    } else if (view === 'pelvic') {
      targetCamPos.current.set(0, 2.2, 5.0);
      targetLookAt.current.set(0, 1.4, 0);
    } else if (view === 'scrotal') {
      targetCamPos.current.set(0, -2.4, 5.2);
      targetLookAt.current.set(0, -2.4, 0);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#1b3f34] bg-[#061510] shadow-2xl text-white">
      {/* Top HUD Banner */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#0a261e]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#1b4e3e]">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#5cba83]"></span>
          <span className="text-xs font-semibold text-[#a7f3d0] tracking-wide uppercase">
            3D Anatomical Atlas
          </span>
          <span className="text-xs text-white font-bold px-2 py-0.5 rounded-full bg-[#123d32]">
            {isClinicianMode ? 'Clinical Specialist Mode' : 'Patient Education Mode'}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {activePathology !== 'normal' && (
            <div className="px-3 py-1 rounded-full bg-[#ba1a1a]/90 text-white font-bold text-xs flex items-center gap-1.5 animate-pulse">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>
                {activePathology === 'prostate_tumor' && 'Pathology: Prostate Cancer Nodule'}
                {activePathology === 'varicocele' && 'Pathology: Grade 3 Varicocele'}
                {activePathology === 'torsion' && 'Critical ER: Testicular Torsion'}
                {activePathology === 'hydrocele' && 'Pathology: Tunica Vaginalis Hydrocele'}
              </span>
            </div>
          )}

          <button
            onClick={() => setIsCinematic(!isCinematic)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a261e]/90 hover:bg-[#123d32] border border-[#1b4e3e] text-xs text-[#e2e8f0] transition-colors"
          >
            {isCinematic ? <Minimize2 className="w-3.5 h-3.5 text-[#5cba83]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#5cba83]" />}
            <span>{isCinematic ? 'Exit View' : 'Focus'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className={`w-full ${isCinematic ? 'h-[620px]' : 'h-[440px] md:h-[500px]'} cursor-grab active:cursor-grabbing transition-all duration-300`}
      />

      {/* Selected Organ Callout Card (Floating Top-Left) */}
      {selectedOrganName && !isCinematic && (
        <div className="absolute top-16 left-4 max-w-xs z-10 pointer-events-auto animate-in fade-in">
          <div className="bg-[#0c2c22]/95 border border-[#236e56] rounded-xl p-3.5 shadow-xl text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#5cba83] uppercase tracking-wider">
                Inspected Structure
              </span>
              <span className="text-[10px] text-[#94a3b8] font-mono">3D Mesh</span>
            </div>
            <h5 className="text-sm font-bold text-white mt-1">{selectedOrganName}</h5>
            <p className="text-[11px] text-[#cbd5e1] mt-1 leading-relaxed">
              Tap any surrounding structure to inspect vascular conduits, neural pathways, or glandular zones.
            </p>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Control Dock */}
      <div className="relative z-20 bg-[#09221b] border-t border-[#164838] px-4 py-3 space-y-3">
        {/* Row 1: Camera Presets & Plane Cutaways */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Camera views */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-[#94a3b8] mr-1 hidden sm:inline">Camera:</span>
            {[
              { id: 'anterior', label: 'Anterior (360°)' },
              { id: 'lateral', label: 'Lateral Sagittal' },
              { id: 'pelvic', label: 'Prostate / Bladder' },
              { id: 'scrotal', label: 'Testis & Cord' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setPreset(v.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  cameraView === v.id
                    ? 'bg-[#5cba83] text-[#00261e] shadow-xs'
                    : 'bg-[#123d32] text-[#cbd5e1] hover:bg-[#1a4f41]'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Plane toggles */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#94a3b8] hidden sm:inline">Cutaway:</span>
            {[
              { id: 'full', label: 'Coronal 3D' },
              { id: 'sagittal', label: 'Sagittal Cut' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCutaway(c.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  cutaway === c.id
                    ? 'bg-[#236e56] text-white'
                    : 'bg-[#0f3328] text-[#94a3b8] hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Exploded View & Transparency Sliders */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#123d32] text-xs">
          {/* Exploded Organ Spacing */}
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#5cba83]" />
            <span className="text-[#cbd5e1] whitespace-nowrap">Explode Organs:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodedVal}
              onChange={(e) => setExplodedVal(parseFloat(e.target.value))}
              className="w-24 md:w-32 h-1.5 bg-[#123d32] rounded-lg appearance-none cursor-pointer accent-[#5cba83]"
            />
            <span className="text-[11px] text-[#94a3b8] w-6">{Math.round(explodedVal * 100)}%</span>
          </div>

          {/* Tissue Transparency */}
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#5cba83]" />
            <span className="text-[#cbd5e1] whitespace-nowrap">Bladder Transparency:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={transparency}
              onChange={(e) => setTransparency(parseFloat(e.target.value))}
              className="w-24 md:w-32 h-1.5 bg-[#123d32] rounded-lg appearance-none cursor-pointer accent-[#5cba83]"
            />
            <span className="text-[11px] text-[#94a3b8] w-6">{Math.round(transparency * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
