import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ninetyDayMilestones } from '../data/mockData';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  Layers,
  Eye,
  Activity,
  Zap,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

interface Sperm3DViewerProps {
  currentDay: number;
  onDayChange: (day: number) => void;
}

export const Sperm3DViewer: React.FC<Sperm3DViewerProps> = ({ currentDay, onDayChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCinematic, setIsCinematic] = useState<boolean>(false);
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<'overview' | 'acrosome' | 'mitochondria' | 'tail' | 'pathway'>('overview');
  const [selectedOrganelle, setSelectedOrganelle] = useState<{
    name: string;
    clinicalRole: string;
    optimizingNutrients: string;
    stageVulnerability: string;
  } | null>(null);

  // References for Three.js state that persist across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spermGroupRef = useRef<THREE.Group | null>(null);
  const tailMeshRef = useRef<THREE.Mesh | null>(null);
  const mitochondriaGroupRef = useRef<THREE.Group | null>(null);
  const acrosomeMeshRef = useRef<THREE.Mesh | null>(null);
  const nucleusMeshRef = useRef<THREE.Mesh | null>(null);
  const pathParticlesRef = useRef<THREE.Points | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.5, 9));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const animationFrameId = useRef<number>(0);
  const explodedRef = useRef<number>(0);
  const currentDayRef = useRef<number>(currentDay);

  // Sync ref
  useEffect(() => {
    currentDayRef.current = currentDay;
  }, [currentDay]);

  useEffect(() => {
    explodedRef.current = explodedFactor;
  }, [explodedFactor]);

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
    scene.background = new THREE.Color(0x071a14); // Deep botanical dark void
    scene.fog = new THREE.FogExp2(0x071a14, 0.045);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.5, 9);
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
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Room Environment reflection
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // fallback
    }

    // 5. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x1a3d31, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa5f3d0, 2.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x34d399, 2.2);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const warmAccentLight = new THREE.PointLight(0xfef08a, 1.8, 12);
    warmAccentLight.position.set(0, 1.5, 1.5);
    scene.add(warmAccentLight);

    // 6. Ground Shadow / Contact Plane
    const contactGeo = new THREE.PlaneGeometry(16, 16);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(0, 40, 25, 0.7)');
      gradient.addColorStop(0.5, 'rgba(0, 25, 15, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(canvas);
    const contactMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const contactPlane = new THREE.Mesh(contactGeo, contactMat);
    contactPlane.rotation.x = -Math.PI / 2;
    contactPlane.position.y = -2.2;
    scene.add(contactPlane);

    // 7. BUILD PROCEDURAL 3D SPERM CELL & SPERMATOGENESIS GROUP
    const spermGroup = new THREE.Group();
    spermGroupRef.current = spermGroup;
    scene.add(spermGroup);

    // Head Group: Nucleus + Acrosome Cap
    const headGroup = new THREE.Group();
    headGroup.name = 'Head';

    // Nucleus (Condensed DNA packaging)
    const nucleusGeo = new THREE.SphereGeometry(1.0, 36, 36);
    nucleusGeo.scale(0.85, 1.25, 0.55);
    const nucleusMat = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    nucleusMesh.name = 'Nucleus (DNA Core)';
    headGroup.add(nucleusMesh);
    nucleusMeshRef.current = nucleusMesh;

    // Acrosome Cap (Protective enzymatic anterior hood)
    const acrosomeGeo = new THREE.SphereGeometry(1.06, 36, 20, 0, Math.PI * 2, 0, Math.PI * 0.52);
    acrosomeGeo.scale(0.86, 1.28, 0.57);
    const acrosomeMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      roughness: 0.1,
      metalness: 0.05,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
      transmission: isSoftwareGl ? 0 : 0.45,
    });
    const acrosomeMesh = new THREE.Mesh(acrosomeGeo, acrosomeMat);
    acrosomeMesh.position.y = 0.08;
    acrosomeMesh.name = 'Acrosome Cap';
    headGroup.add(acrosomeMesh);
    acrosomeMeshRef.current = acrosomeMesh;

    headGroup.position.set(0, 1.3, 0);
    spermGroup.add(headGroup);

    // Midpiece Group: Centriole & Mitochondrial Spiral Powerhouse
    const midpieceGroup = new THREE.Group();
    midpieceGroup.name = 'Midpiece';
    midpieceGroup.position.set(0, -0.4, 0);

    // Centriole connector
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.4, 24);
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });
    const neckMesh = new THREE.Mesh(neckGeo, neckMat);
    neckMesh.position.y = 0.3;
    midpieceGroup.add(neckMesh);

    // Helical Mitochondria Sheath (Procedurally built spiral rings representing ATP synthesis)
    const mitoSheathGroup = new THREE.Group();
    mitoSheathGroup.name = 'Mitochondrial Sheath';
    const numRings = 9;
    const ringGeo = new THREE.TorusGeometry(0.32, 0.09, 16, 28);
    const mitoMat = new THREE.MeshPhysicalMaterial({
      color: 0xef4444,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.3,
      clearcoat: 0.8,
    });

    for (let i = 0; i < numRings; i++) {
      const ring = new THREE.Mesh(ringGeo, mitoMat.clone());
      ring.rotation.x = Math.PI / 2 + 0.12;
      ring.position.y = 0.1 - i * 0.16;
      ring.scale.set(1.0 - i * 0.03, 1.0 - i * 0.03, 1.0);
      mitoSheathGroup.add(ring);
    }
    midpieceGroup.add(mitoSheathGroup);
    spermGroup.add(midpieceGroup);
    mitochondriaGroupRef.current = mitoSheathGroup;

    // Tail (Flagellum with Axoneme 9+2 Dynamic Wave)
    const tailPointsCount = 60;
    const tailSplinePoints: THREE.Vector3[] = [];
    for (let i = 0; i < tailPointsCount; i++) {
      const t = i / (tailPointsCount - 1);
      tailSplinePoints.push(new THREE.Vector3(0, -1.8 - t * 6.5, 0));
    }
    const tailCurve = new THREE.CatmullRomCurve3(tailSplinePoints);
    const tailGeo = new THREE.TubeGeometry(tailCurve, 54, 0.14, 12, false);
    const tailMat = new THREE.MeshPhysicalMaterial({
      color: 0x6ee7b7,
      emissive: 0x065f46,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      clearcoat: 0.5,
    });
    const tailMesh = new THREE.Mesh(tailGeo, tailMat);
    tailMesh.name = 'Flagellum (Axoneme Tail)';
    spermGroup.add(tailMesh);
    tailMeshRef.current = tailMesh;

    // 8. 90-Day Cellular Roadmap 3D Helix/Pathway in background
    const pathCurvePoints: THREE.Vector3[] = [];
    for (let day = 1; day <= 90; day++) {
      const angle = (day / 90) * Math.PI * 4.5 - Math.PI;
      const radius = 3.8 + Math.sin(day * 0.08) * 0.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -3.5 + (day / 90) * 7.0;
      pathCurvePoints.push(new THREE.Vector3(x, y, z));
    }
    const pathSpline = new THREE.CatmullRomCurve3(pathCurvePoints);
    const pathTubeGeo = new THREE.TubeGeometry(pathSpline, 120, 0.04, 8, false);
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x064e3b,
      roughness: 0.4,
      transparent: true,
      opacity: 0.4,
    });
    const pathMesh = new THREE.Mesh(pathTubeGeo, pathMat);
    scene.add(pathMesh);

    // Glowing Milestone Orbs along the 3D pathway
    const milestoneOrbsGroup = new THREE.Group();
    ninetyDayMilestones.forEach((m) => {
      const t = m.day / 90;
      const pos = pathSpline.getPoint(t);
      const orbGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const orbMat = new THREE.MeshStandardMaterial({
        color: m.day === currentDay ? 0xf59e0b : 0x10b981,
        emissive: m.day === currentDay ? 0xd97706 : 0x047857,
        emissiveIntensity: 0.9,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.copy(pos);
      orb.userData = { milestone: m };
      milestoneOrbsGroup.add(orb);
    });
    scene.add(milestoneOrbsGroup);

    // Floating Bioactive Shield Micro-particles (Antioxidants, CoQ10, Zn ions)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const pathParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(pathParticles);
    pathParticlesRef.current = pathParticles;

    // Mouse / Touch Interaction for Orbit Rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    const rotationVelocity = { x: 0, y: 0.003 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !spermGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      spermGroupRef.current.rotation.y += deltaX * 0.007;
      spermGroupRef.current.rotation.x += deltaY * 0.005;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clock for wave kinetics
    const clock = new THREE.Clock();

    // 9. ANIMATION LOOP with smooth exponential damping
    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Auto-rotation when not dragging
      if (spermGroupRef.current && !isDragging) {
        spermGroupRef.current.rotation.y += rotationVelocity.y;
      }

      // Smooth camera interpolation towards target position & lookAt
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPos.current, 0.05);
        cameraRef.current.lookAt(targetLookAt.current);
      }

      // Dynamic Spermatogenesis Maturation & Wave Motion based on Day
      const cDay = currentDayRef.current;
      const maturityRatio = Math.min(1.0, Math.max(0.1, cDay / 90));
      // Motility wave frequency and amplitude increase as sperm matures
      const waveFreq = 4.0 * maturityRatio;
      const waveAmp = 0.35 * maturityRatio;

      // Deform flagellum tail dynamically to create authentic rectilinear sperm wave
      if (tailMeshRef.current) {
        const dynamicPoints: THREE.Vector3[] = [];
        for (let i = 0; i < tailPointsCount; i++) {
          const t = i / (tailPointsCount - 1);
          // Wave propagation down the axoneme
          const wave = Math.sin(time * waveFreq - t * 8) * (t * waveAmp);
          const waveZ = Math.cos(time * waveFreq * 0.8 - t * 7) * (t * waveAmp * 0.4);
          const y = -1.8 - t * 6.5;
          dynamicPoints.push(new THREE.Vector3(wave, y, waveZ));
        }
        const newCurve = new THREE.CatmullRomCurve3(dynamicPoints);
        tailMeshRef.current.geometry.dispose();
        tailMeshRef.current.geometry = new THREE.TubeGeometry(newCurve, 54, 0.14 * (1 - (1 - maturityRatio) * 0.3), 12, false);
      }

      // Exploded View Separation Kinematics
      const curExploded = explodedRef.current;
      if (nucleusMeshRef.current && acrosomeMeshRef.current && mitochondriaGroupRef.current && tailMeshRef.current) {
        // Smooth separation of organelles
        acrosomeMeshRef.current.position.y = 0.08 + curExploded * 1.5;
        mitochondriaGroupRef.current.position.y = -0.4 - curExploded * 1.2;
        tailMeshRef.current.position.y = -curExploded * 2.8;
      }

      // Mitochondrial ATP Energy Glow Pulse (faster and brighter if past Day 45)
      if (mitochondriaGroupRef.current) {
        const pulse = 0.5 + 0.5 * Math.sin(time * 3.5);
        mitochondriaGroupRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhysicalMaterial) {
            child.material.emissiveIntensity = 0.4 + pulse * (0.3 + maturityRatio * 0.5);
          }
        });
      }

      // Slowly drift background particles
      if (pathParticlesRef.current) {
        pathParticlesRef.current.rotation.y = time * 0.03;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Throttled loop for software renderer
        animationFrameId.current = window.setTimeout(tick, 80);
      } else {
        animationFrameId.current = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      clearTimeout(animationFrameId.current);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Camera presets handler
  const setCameraPreset = (preset: 'overview' | 'acrosome' | 'mitochondria' | 'tail' | 'pathway') => {
    setActivePreset(preset);
    if (!targetCamPos.current || !targetLookAt.current) return;

    if (preset === 'overview') {
      targetCamPos.current.set(0, 1.8, 8.5);
      targetLookAt.current.set(0, -0.5, 0);
    } else if (preset === 'acrosome') {
      targetCamPos.current.set(0, 2.2, 3.2);
      targetLookAt.current.set(0, 1.8, 0);
      setSelectedOrganelle({
        name: 'Acrosome Cap & Protective Hood',
        clinicalRole: 'Stores hyaluronidase and acrosin enzymes necessary to penetrate the oocyte zona pellucida.',
        optimizingNutrients: 'Zinc (30mg/day) & Vitamin C (1000mg/day) protect the acrosomal membrane against oxidative lipid breakdown.',
        stageVulnerability: 'Highly sensitive to heavy metals, BPA/phthalates, and excessive free radicals.',
      });
    } else if (preset === 'mitochondria') {
      targetCamPos.current.set(0, 0.2, 3.0);
      targetLookAt.current.set(0, -0.3, 0);
      setSelectedOrganelle({
        name: 'Mitochondrial Spiral Sheath (ATP Powerhouse)',
        clinicalRole: 'Generates cellular ATP via oxidative phosphorylation to fuel continuous flagellar motility.',
        optimizingNutrients: 'Ubiquinol CoQ10 (200mg) + L-Carnitine (2000mg) fuel fatty acid beta-oxidation inside the mitochondrial matrix.',
        stageVulnerability: 'Prone to mitochondrial DNA fragmentation and reactive oxygen species (ROS) leakage when testicular temp exceeds 35°C.',
      });
    } else if (preset === 'tail') {
      targetCamPos.current.set(0, -4.5, 4.8);
      targetLookAt.current.set(0, -4.0, 0);
      setSelectedOrganelle({
        name: 'Axoneme (9+2 Microtubule Flagellum)',
        clinicalRole: 'Dynein motor arms generate sliding microtubule action producing progressive forward swimming velocity.',
        optimizingNutrients: 'Magnesium and Selenium maintain structural stability of dense fibrous sheaths.',
        stageVulnerability: 'Cold shock or excessive sitting causes tail coiled deformities and asthenozoospermia (sluggish swimming).',
      });
    } else if (preset === 'pathway') {
      targetCamPos.current.set(5.5, 4.0, 7.5);
      targetLookAt.current.set(0, 0, 0);
    }
  };

  const currentMilestone = ninetyDayMilestones.reduce((prev, curr) => {
    return curr.day <= currentDay ? curr : prev;
  }, ninetyDayMilestones[0]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#1b3f34] bg-[#071a14] shadow-2xl text-white">
      {/* Top HUD Header with Cellular Phase & Spec Badges */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#0a261e]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#1b4e3e]">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#5cba83]"></span>
          <span className="text-xs font-semibold text-[#a7f3d0] tracking-wide uppercase">
            3D Spermatogenesis Roadmap
          </span>
          <span className="text-xs text-[#6ee7b7] font-bold px-2 py-0.5 rounded-full bg-[#123d32]">
            Day {currentDay} of 90
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsCinematic(!isCinematic)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a261e]/90 hover:bg-[#123d32] border border-[#1b4e3e] text-xs text-[#e2e8f0] transition-colors"
          >
            {isCinematic ? <Minimize2 className="w-3.5 h-3.5 text-[#5cba83]" /> : <Maximize2 className="w-3.5 h-3.5 text-[#5cba83]" />}
            <span>{isCinematic ? 'Exit Zen' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full ${isCinematic ? 'h-[640px]' : 'h-[440px] md:h-[500px]'} cursor-grab active:cursor-grabbing transition-all duration-300`}
      />

      {/* Dynamic Overlay Biological Stage Callout (Top Center-Left) */}
      {!isCinematic && (
        <div className="absolute top-16 left-4 max-w-sm pointer-events-none z-10">
          <div className="bg-[#0c2c22]/95 border border-[#1e5845] rounded-xl p-3 shadow-lg pointer-events-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5cba83] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>{currentMilestone.phaseName}</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1">{currentMilestone.spermStage}</h4>
            <p className="text-xs text-[#cbd5e1] mt-1 leading-relaxed">
              {currentMilestone.cellularFocus}
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#1b4638] flex items-center justify-between text-[11px]">
              <span className="text-[#94a3b8]">Target DFI: <strong className="text-[#a7f3d0]">{currentMilestone.expectedDFI}</strong></span>
              <span className="text-[#94a3b8]">Motility: <strong className="text-[#a7f3d0]">{currentMilestone.motilityForecast}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Organelle Inspector Popover if user clicked Acrosome/Mito/Tail preset */}
      {selectedOrganelle && !isCinematic && (
        <div className="absolute top-16 right-4 max-w-xs z-10 pointer-events-auto animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-[#0c2c22]/95 border border-[#236e56] rounded-xl p-3.5 shadow-xl text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5cba83]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cellular Anatomy</span>
              </div>
              <button
                onClick={() => setSelectedOrganelle(null)}
                className="text-[#94a3b8] hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <h5 className="text-sm font-bold text-white mt-1">{selectedOrganelle.name}</h5>
            <p className="text-xs text-[#cbd5e1] mt-1.5">{selectedOrganelle.clinicalRole}</p>
            <div className="mt-2 bg-[#061b14] p-2 rounded-lg border border-[#144434] text-[11px] space-y-1">
              <div className="text-[#a7f3d0]">
                <strong>Key Shield:</strong> {selectedOrganelle.optimizingNutrients}
              </div>
              <div className="text-[#fca5a5]">
                <strong>Vulnerability:</strong> {selectedOrganelle.stageVulnerability}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Dock (Zero Viewport Occlusion as per Three.js directives) */}
      <div className="relative z-20 bg-[#09221b] border-t border-[#164838] px-4 py-3">
        {/* Timeline Day Slider / Scrubber */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#94a3b8] font-medium flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#f59e0b]" />
              Spermatogenesis 90-Day Progression Track
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#a7f3d0] font-bold text-sm">Day {currentDay}</span>
              <span className="text-[#64748b]">/ 90 Days</span>
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="1"
              max="90"
              value={currentDay}
              onChange={(e) => onDayChange(Number(e.target.value))}
              className="w-full h-2.5 bg-[#123d32] rounded-lg appearance-none cursor-pointer accent-[#5cba83]"
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#64748b] px-0.5">
            <span>Day 1: Stem Mitosis</span>
            <span>Day 24: Meiosis (Current)</span>
            <span>Day 60: Spermiogenesis</span>
            <span>Day 90: Fertile Motility</span>
          </div>
        </div>

        {/* Interactive Controls & Organelle Exploder */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#123d32]">
          {/* Camera View Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] text-[#94a3b8] mr-1 hidden sm:inline">Camera:</span>
            {[
              { id: 'overview', label: 'Full Cell' },
              { id: 'acrosome', label: 'Acrosome Hood' },
              { id: 'mitochondria', label: 'Mitochondria Sheath' },
              { id: 'tail', label: 'Axoneme Tail' },
              { id: 'pathway', label: '90D Pathway' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setCameraPreset(btn.id as any)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  activePreset === btn.id
                    ? 'bg-[#5cba83] text-[#00261e] font-bold shadow-sm'
                    : 'bg-[#123d32] text-[#cbd5e1] hover:bg-[#1a4f41]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Exploded View Slider */}
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#5cba83]" />
            <span className="text-xs text-[#cbd5e1] whitespace-nowrap">Explode Organelles:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={explodedFactor}
              onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
              className="w-20 md:w-28 h-1.5 bg-[#123d32] rounded-lg appearance-none cursor-pointer accent-[#5cba83]"
            />
            <span className="text-[11px] text-[#94a3b8] w-6">{Math.round(explodedFactor * 100)}%</span>
          </div>
        </div>

        {/* Daily Protocol Challenge for Selected Day */}
        <div className="mt-3 bg-[#0c2e24] border border-[#1d5442] rounded-xl p-2.5 flex items-start gap-2.5 text-xs">
          <div className="p-1.5 rounded-lg bg-[#144839] text-[#5cba83] shrink-0 mt-0.5">
            <Award className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#a7f3d0]">Day {currentDay} Cellular Protection Protocol:</span>
              <span className="text-[10px] text-[#94a3b8]">{currentMilestone.antioxidantProtocol}</span>
            </div>
            <p className="text-[#e2e8f0] mt-0.5 text-xs">{currentMilestone.dailyChallenge}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
