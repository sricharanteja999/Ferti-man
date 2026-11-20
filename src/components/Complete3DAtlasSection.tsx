import React, { useState } from 'react';
import { Atlas3DViewer, PathologyMode } from './Atlas3DViewer';
import {
  Sparkles,
  ShieldAlert,
  Layers,
  Activity,
  HeartPulse,
  Info,
  ChevronRight,
  Search,
  Eye,
  BookOpen,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Sliders,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Brain,
  Microscope,
  Zap,
  Flame,
  Droplet
} from 'lucide-react';

interface Complete3DAtlasSectionProps {
  onTriggerRedFlag: () => void;
  onNavigateToRecords?: () => void;
  onAskCoach?: (question: string) => void;
}

export const Complete3DAtlasSection: React.FC<Complete3DAtlasSectionProps> = ({
  onTriggerRedFlag,
  onNavigateToRecords,
  onAskCoach,
}) => {
  const [activePathology, setActivePathology] = useState<PathologyMode>('normal');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Testis');
  const [isClinicianMode, setIsClinicianMode] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'3d_model' | 'prostate' | 'scrotal_pathology' | 'pathways' | 'clinical_triage'>('3d_model');
  const [spermStepIndex, setSpermStepIndex] = useState<number>(0);
  const [selectedAssessmentSymptom, setSelectedAssessmentSymptom] = useState<string>('lump');

  // Comprehensive anatomical definitions database
  const ORGAN_DATA: Record<
    string,
    {
      title: string;
      system: string;
      location: string;
      normalFunction: string;
      clinicalSignificance: string;
      commonDisorders: string[];
      dimensions: string;
      bloodSupply: string;
      innervation: string;
    }
  > = {
    Testis: {
      title: 'Testis (Bilateral Male Gonads)',
      system: 'Testicular & Scrotal Complex',
      location: 'Suspended in hemiscrotum outside pelvic cavity by spermatic cord; left testis typically hangs 1cm lower.',
      normalFunction: 'Dual endocrine and exocrine function: production of spermatozoa in seminiferous tubules (~100–200 million/day) and testosterone synthesis by interstitial Leydig cells under LH stimulation.',
      clinicalSignificance: 'Requires counter-current thermoregulation 2–3°C below core body temperature (34.0°C). Any new firm, non-tender intratesticular mass is suspicious for germ cell neoplasm until proven otherwise via scrotal ultrasound.',
      commonDisorders: ['Testicular Germ Cell Tumor (Seminoma / Non-seminoma)', 'Testicular Torsion (Urological Emergency)', 'Testicular Atrophy', 'Orchitis'],
      dimensions: 'Adult: 4.5–5.0 cm length × 3.0 cm width × 2.5 cm depth; Volume: 15–25 mL (Prader orchidometer)',
      bloodSupply: 'Testicular artery (origin from abdominal aorta at L2 level); Pampiniform venous plexus draining into testicular veins.',
      innervation: 'Testicular plexus (sympathetic from T10 segment; parasympathetic from pelvic splanchnic nerves). Visceral pain refers to T10 umbilical region.',
    },
    Epididymis: {
      title: 'Epididymis (Head, Body & Tail)',
      system: 'Testicular & Scrotal Complex',
      location: 'Crescent-shaped cord applied along the posterior-superior border of the testis.',
      normalFunction: 'Site of sperm transit, storage (10–14 days), fluid resorption, and biochemical maturation. Uncondensed sperm gain forward progressive motility and membrane acrosomal glycoproteins.',
      clinicalSignificance: 'Acute posterior scrotal pain and swelling typically indicates acute epididymitis (often Chlamydia/Gonorrhea in <35yo, E. coli in >35yo). Positivity of Prehn’s sign (pain relief on scrotal elevation) supports epididymitis over torsion, but Doppler ultrasound is definitive.',
      commonDisorders: ['Acute / Chronic Epididymitis', 'Spermatocele (Epididymal Retention Cyst)', 'Appendix Epididymis Torsion'],
      dimensions: 'Single coiled duct 6 meters (20 feet) uncoiled; external organ length ~5.0 cm.',
      bloodSupply: 'Deffential artery (branch of inferior vesical) and testicular arterial anastomoses.',
      innervation: 'Inferior hypogastric plexus and genitofemoral nerve branches.',
    },
    'Prostate Gland': {
      title: 'Prostate Gland (Zonal Anatomy: Peripheral, Transition & Central)',
      system: 'Internal Pelvic Anatomy',
      location: 'Inferior to bladder neck, anterior to rectum (separated by Denonvilliers’ fascia), encircling the proximal urethra.',
      normalFunction: 'Produces 25–30% of total seminal volume. Fluid is slightly acidic (pH 6.5), rich in zinc, citric acid, acid phosphatase, and Prostate-Specific Antigen (PSA, a serine protease responsible for semen liquefaction).',
      clinicalSignificance: 'Transition Zone (5–10% of gland) surrounds urethra and is the sole site of Benign Prostatic Hyperplasia (BPH). Peripheral Zone (70–75% of gland) abuts the rectum and is the origin of >70% of prostate adenocarcinomas, accessible via Digital Rectal Exam (DRE).',
      commonDisorders: ['Benign Prostatic Hyperplasia (BPH)', 'Prostate Adenocarcinoma (Gleason Score / ISUP)', 'Acute / Chronic Bacterial Prostatitis', 'Chronic Pelvic Pain Syndrome (CP/CPPS)'],
      dimensions: 'Normal adult: ~20–25 grams; inverted cone shape (3 cm length × 4 cm breadth × 2 cm depth).',
      bloodSupply: 'Inferior vesical and middle rectal arteries; Prostatic venous plexus (Santorini’s plexus) draining into internal iliac veins.',
      innervation: 'Prostatic plexus from inferior hypogastric plexus (autonomic nerves regulating glandular secretion and smooth muscle contraction).',
    },
    'Seminal Vesicles': {
      title: 'Seminal Vesicles (Paired Saccular Glands)',
      system: 'Internal Pelvic Anatomy',
      location: 'Posterior to the bladder base, lateral to the ampullae of the vas deferens, superior to the prostate base.',
      normalFunction: 'Contribute 60–70% of seminal fluid volume. Secretions are thick, alkaline, rich in fructose (primary energy substrate for sperm flagellar ATP), flavins, prostaglandins, and semenogelin (coagulum formation).',
      clinicalSignificance: 'Low ejaculate volume (< 1.4 mL) with acidic pH (< 7.2) and absent fructose indicates complete ejaculatory duct obstruction (EDO) or congenital bilateral absence of vas deferens (CBAVD, CFTR gene mutation).',
      commonDisorders: ['Seminal Vesiculitis', 'Ejaculatory Duct Obstruction (EDO)', 'Seminal Vesicle Cysts', 'Hematospermia'],
      dimensions: 'Approximately 5 cm in length; tubular coiled diverticulum.',
      bloodSupply: 'Inferior vesical and middle rectal arteries.',
      innervation: 'Sympathetic fibers from hypogastric nerves (driving emission during ejaculation).',
    },
    'Urinary Bladder': {
      title: 'Urinary Bladder & Bladder Neck',
      system: 'Internal Pelvic Anatomy',
      location: 'Lesser pelvis when empty, resting on pelvic floor; expands into abdominal cavity when distended.',
      normalFunction: 'Stores urine with high compliance; coordinates micturition via detrusor muscle contraction and internal urethral sphincter relaxation.',
      clinicalSignificance: 'Chronic bladder outlet obstruction (BOO) secondary to BPH causes compensatory detrusor muscle hypertrophy, trabeculation, cellulae, and pseudodiverticula, leading to urinary retention.',
      commonDisorders: ['Urinary Retention (Acute/Chronic)', 'Detrusor Overactivity', 'Bladder Diverticula / Calculi', 'Urothelial Carcinoma'],
      dimensions: 'Physiological adult capacity: 350–500 mL.',
      bloodSupply: 'Superior and inferior vesical arteries (branches of internal iliac artery).',
      innervation: 'Parasympathetic (pelvic splanchnic S2-S4) stimulates detrusor contraction; Sympathetic (T11-L2) maintains continence at bladder neck.',
    },
    'Corpora Cavernosa (Penile Shaft)': {
      title: 'Corpora Cavernosa & Corpus Spongiosum (Penile Architecture)',
      system: 'External Genital Anatomy',
      location: 'Forms dorsal and ventral columns of the mobile penile shaft, enveloped by Buck’s deep fascia and tunica albuginea.',
      normalFunction: 'Dual dorsal corpora cavernosa contain sinusoidal vascular erectile tissue. The ventral corpus spongiosum houses the spongy urethra and expands distally as the glans penis.',
      clinicalSignificance: 'Erection involves parasympathetic nitric oxide release, relaxing helicine cavernous arterioles. Blood fills lacunar sinusoids, compressing subtunical venules against the inelastic tunica albuginea (veno-occlusive mechanism). Disruption leads to vasculogenic erectile dysfunction.',
      commonDisorders: ['Peyronie’s Disease (Fibrotic Tunica Plaque)', 'Arteriogenic / Venous-Leak Erectile Dysfunction', 'Priapism (Ischemic Low-Flow vs High-Flow)', 'Penile Fracture (Rupture of Tunica Albuginea)'],
      dimensions: 'Resting length 8–10 cm; erect length 12–16 cm.',
      bloodSupply: 'Internal pudendal artery → Deep cavernous arteries, dorsal penile arteries, and bulbourethral arteries.',
      innervation: 'Cavernous nerves (autonomic from prostatic plexus) and dorsal nerve of the penis (somatic sensory branch of pudendal).',
    },
  };

  const selectedData = ORGAN_DATA[selectedOrgan] || ORGAN_DATA['Testis'];

  const SPERM_PATHWAY_STEPS = [
    {
      step: 1,
      name: 'Seminiferous Tubules',
      organ: 'Testis Lobules',
      action: 'Mitotic proliferation of spermatogonia & meiotic reduction into spermatids under Sertoli nurse cell support.',
      duration: '64–72 days',
    },
    {
      step: 2,
      name: 'Rete Testis & Efferent Ductules',
      organ: 'Mediastinum Testis',
      action: 'Fluid resorption and mechanical transport through 12–20 ciliated efferent ductules into the epididymal head.',
      duration: 'Hours',
    },
    {
      step: 3,
      name: 'Epididymis (Caput → Corpus → Cauda)',
      organ: 'Epididymal Duct',
      action: 'Sperm acquire progressive forward motility, chromatin compaction stabilization, and surface glycoprotein caps.',
      duration: '10–14 days',
    },
    {
      step: 4,
      name: 'Vas Deferens & Ampulla',
      organ: 'Spermatic Cord & Pelvis',
      action: 'Muscular peristalsis propels concentrated spermatozoa through inguinal canal into retrovesical ampulla reservoir.',
      duration: 'Seconds (emission)',
    },
    {
      step: 5,
      name: 'Ejaculatory Ducts',
      organ: 'Prostate Gland Base',
      action: 'Sperm combine with fructose-rich seminal vesicle secretions inside the prostatic stroma.',
      duration: 'Instantaneous',
    },
    {
      step: 6,
      name: 'Prostatic & Spongy Urethra',
      organ: 'Penile Shaft & Glans',
      action: 'Addition of zinc-rich prostatic fluid and bulbourethral alkaline pre-ejaculate; expulsion via bulbospongiosus rhythmic contractions.',
      duration: 'Ejaculation',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* 1. Header with Medical Role & Navigation Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-[#123d32] text-white text-xs font-bold flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5 text-[#5cba83]" />
              MALE REPRODUCTIVE HEALTH — COMPLETE 3D MEDICAL ATLAS
            </span>
            <span className="text-xs text-[#006d40] bg-[#eaf6ee] px-2.5 py-0.5 rounded-full font-semibold border border-[#a4d0c0]">
              AUA / EAU Clinical Standard
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1c19] mt-1.5 tracking-tight font-display">
            3D Anatomy, Pathology & Clinical Assessment Atlas
          </h2>
          <p className="text-xs sm:text-sm text-[#5a6460] max-w-3xl mt-0.5 leading-relaxed">
            Photorealistic 360° anatomical exploration, cross-sectional planes, and clinical pathology comparisons for the adult male reproductive system—from the testicular spermatogenic micro-environment to pelvic zonal anatomy and emergency triage.
          </p>
        </div>

        {/* Mode Toggle: Patient vs Clinician Technical */}
        <div className="flex items-center gap-2 bg-white border border-[#e6e4dd] p-1.5 rounded-2xl shadow-xs shrink-0">
          <button
            onClick={() => setIsClinicianMode(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isClinicianMode
                ? 'bg-[#123d32] text-white shadow-xs'
                : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            Patient Mode
          </button>
          <button
            onClick={() => setIsClinicianMode(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isClinicianMode
                ? 'bg-[#123d32] text-white shadow-xs'
                : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            Clinician / Specialist
          </button>
        </div>
      </div>

      {/* Emergency Red Flag Notice Banner */}
      <div className="p-3.5 bg-[#ffdad6]/70 border border-[#ffb4ab] rounded-2xl flex items-center justify-between gap-3 text-xs text-[#93000a]">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 shrink-0 text-[#ba1a1a]" />
          <div>
            <strong className="font-bold">CRITICAL UROLOGICAL EMERGENCY: </strong>
            Sudden, severe testicular pain, acute swelling, or trauma requires immediate evaluation in an Emergency Room. Testicular torsion causes complete ischemic tissue necrosis within <strong>4 to 6 hours</strong>.
          </div>
        </div>
        <button
          onClick={onTriggerRedFlag}
          className="px-3.5 py-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs rounded-full shrink-0 transition-colors shadow-sm"
        >
          Open Triage Protocol
        </button>
      </div>

      {/* Atlas Main Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold border-b border-[#e6e4dd] scrollbar-none">
        {[
          { id: '3d_model', label: '1. Complete 3D Atlas & Organ Inspector' },
          { id: 'prostate', label: '2. Prostate 3D Pathology (BPH / Cancer / Prostatitis)' },
          { id: 'scrotal_pathology', label: '3. Scrotal Masses & Testicular Pathology' },
          { id: 'pathways', label: '4. Vascular, HPG Hormones & Sperm Pathway' },
          { id: 'clinical_triage', label: '5. Clinical Assessment & Diagnostic Pathway' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border-b-2 ${
              activeSubTab === tab.id
                ? 'bg-white text-[#123d32] border-[#123d32] shadow-xs'
                : 'text-[#5a6460] hover:text-[#1b1c19] border-transparent hover:bg-[#f5f4ef]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBTAB 1: 3D MODEL & ORGAN INSPECTOR */}
      {activeSubTab === '3d_model' && (
        <div className="space-y-6">
          {/* Pathology State Selector Bar for the 3D WebGL Canvas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e6e4dd]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1b1c19]">
              <Layers className="w-4 h-4 text-[#5cba83]" />
              <span>3D Interactive Pathology Model:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'normal', label: 'Normal Male Anatomy' },
                { id: 'prostate_tumor', label: 'Prostate Cancer Nodule' },
                { id: 'varicocele', label: 'Grade 3 Varicocele' },
                { id: 'torsion', label: 'Testicular Torsion (Twisted Cord)' },
                { id: 'hydrocele', label: 'Tunica Vaginalis Hydrocele' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePathology(p.id as any)}
                  className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold ${
                    activePathology === p.id
                      ? p.id === 'normal'
                        ? 'bg-[#123d32] text-white shadow-xs'
                        : 'bg-[#ba1a1a] text-white shadow-xs'
                      : 'bg-[#faf9f4] border border-[#e6e4dd] text-[#5a6460] hover:bg-[#efeee9]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Three.js 3D Viewport */}
          <Atlas3DViewer
            activePathology={activePathology}
            onSelectOrgan={(organ) => setSelectedOrgan(organ)}
            selectedOrganName={selectedOrgan}
            isClinicianMode={isClinicianMode}
          />

          {/* Organ Quick Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-xs text-[#717975] font-semibold mr-1">Select Organ:</span>
            {Object.keys(ORGAN_DATA).map((organ) => (
              <button
                key={organ}
                onClick={() => setSelectedOrgan(organ)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition-colors ${
                  selectedOrgan === organ
                    ? 'bg-[#123d32] text-white'
                    : 'bg-white border border-[#e6e4dd] text-[#5a6460] hover:bg-[#faf9f4]'
                }`}
              >
                {organ}
              </button>
            ))}
          </div>

          {/* Detailed Organ Anatomical Dossier Card */}
          <div className="clinical-card-elevated p-6 bg-white space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e6e4dd]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006d40] bg-[#eaf6ee] px-2.5 py-0.5 rounded-full">
                  {selectedData.system}
                </span>
                <h3 className="text-xl font-bold text-[#1b1c19] mt-1">{selectedData.title}</h3>
                <p className="text-xs text-[#5a6460] mt-0.5">{selectedData.location}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#717975] block font-mono">Dimensions / Volume</span>
                <span className="text-xs font-bold text-[#123d32]">{selectedData.dimensions}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-3">
                <div className="p-3.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl space-y-1">
                  <strong className="text-[#123d32] block font-bold text-xs">
                    Physiological & Reproductive Function:
                  </strong>
                  <p className="text-[#202b29] leading-relaxed">{selectedData.normalFunction}</p>
                </div>

                <div className="p-3.5 bg-[#f5fbf8] border border-[#bfecdc] rounded-xl space-y-1">
                  <strong className="text-[#006d40] block font-bold text-xs">
                    Clinical Significance & Diagnostic Examination:
                  </strong>
                  <p className="text-[#202b29] leading-relaxed">{selectedData.clinicalSignificance}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-white border border-[#e6e4dd] rounded-xl space-y-2">
                  <strong className="text-[#1b1c19] block font-bold text-xs">
                    Common Clinical Disorders & Pathologies:
                  </strong>
                  <ul className="space-y-1 text-[#5a6460]">
                    {selectedData.commonDisorders.map((disorder, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#5cba83] font-bold">•</span>
                        <span>{disorder}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-[11px] space-y-1.5 text-[#5a6460]">
                  <div>
                    <strong className="text-[#1b1c19]">Vascularization:</strong> {selectedData.bloodSupply}
                  </div>
                  <div>
                    <strong className="text-[#1b1c19]">Innervation:</strong> {selectedData.innervation}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: PROSTATE 3D PATHOLOGY (BPH, CANCER, PROSTATITIS) */}
      {activeSubTab === 'prostate' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e6e4dd] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-bold">
                  Section 3: Glandular Pathology
                </span>
                <h3 className="text-xl font-bold text-[#1b1c19] mt-1">
                  Prostate Zonal Anatomy, BPH & Adenocarcinoma
                </h3>
              </div>
              <span className="text-xs text-[#717975]">McNeal Zonal Classification</span>
            </div>
            <p className="text-xs text-[#5a6460] leading-relaxed">
              The prostate is not a uniform organ. Understanding its three distinct glandular zones is crucial to distinguishing Benign Prostatic Hyperplasia (BPH) from Prostate Cancer (adenocarcinoma).
            </p>

            {/* Embedded High-Fidelity Medical Render (image_f37931d8.png) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#e6e4dd] bg-black shadow-md relative">
                <img
                  src="/assets/aistudio/image_f37931d8.png"
                  alt="3D Pathology: Prostate Cancer Nodule in Peripheral Zone with Bladder Neck"
                  className="w-full h-72 object-cover object-center"
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10 text-[11px] text-white">
                  <span className="text-[#fca5a5] font-bold">3D Clinical Specimen: </span>
                  Peripheral zone adenocarcinoma nodule (red) compressing prostatic stroma and distorting urethral conduit.
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3 text-xs">
                {/* Condition A: Normal Prostate */}
                <div className="p-3.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-[#123d32]">A. Normal Prostate Architecture</strong>
                    <span className="text-[10px] font-bold bg-[#eaf6ee] text-[#006d40] px-2 py-0.5 rounded-full">Optimal</span>
                  </div>
                  <p className="text-[#5a6460]">
                    Weighs 20–25g. Divided into <strong>Peripheral Zone (70%)</strong>, <strong>Central Zone (25%)</strong>, and <strong>Transition Zone (5%)</strong>. Prostatic urethra remains patent with uninhibited laminar urinary outflow.
                  </p>
                </div>

                {/* Condition B: Benign Prostatic Hyperplasia (BPH) */}
                <div className="p-3.5 bg-[#fffbeb] border border-[#fef08a] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-[#92400e]">B. Benign Prostatic Hyperplasia (BPH)</strong>
                    <span className="text-[10px] font-bold bg-[#fef9c3] text-[#854d0e] px-2 py-0.5 rounded-full">Transition Zone</span>
                  </div>
                  <p className="text-[#5a6460]">
                    Androgen-driven nodular proliferation strictly in the <strong>Transition Zone</strong> surrounding the urethra. Causes circumferential urethral compression, hesitancy, weak stream, nocturia, and secondary bladder detrusor trabeculation.
                  </p>
                </div>

                {/* Condition C: Prostate Cancer */}
                <div className="p-3.5 bg-[#fff8f7] border border-[#ffdad6] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-[#ba1a1a]">C. Prostate Adenocarcinoma (Cancer)</strong>
                    <span className="text-[10px] font-bold bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full">Peripheral Zone</span>
                  </div>
                  <p className="text-[#5a6460]">
                    &gt;70% arise in the <strong>subcapsular Peripheral Zone</strong>. Often asymptomatic in early stages until locally advanced (extracapsular extension, seminal vesicle invasion). Evaluated via Serum PSA velocity, multiparametric MRI (PI-RADS 1–5), and targeted transperineal biopsy.
                  </p>
                </div>

                {/* Condition D: Prostatitis */}
                <div className="p-3.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl space-y-1">
                  <strong className="text-sm font-bold text-[#1b1c19]">D. Prostatitis (Acute, Chronic & CPPS)</strong>
                  <p className="text-[#5a6460]">
                    Acute bacterial prostatitis presents with fever, chills, perineal pain, and exquisitely tender, warm prostate on gentle DRE (vigorous massage contraindicated due to bacteremia risk).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: SCROTAL MASSES & TESTICULAR PATHOLOGY */}
      {activeSubTab === 'scrotal_pathology' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e6e4dd] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-bold">
                  Section 4 & 5: Scrotal & Testicular Pathology
                </span>
                <h3 className="text-xl font-bold text-[#1b1c19] mt-1">
                  Testicular Tumors, Varicoceles, Torsion & Scrotal Pain
                </h3>
              </div>
              <span className="text-xs text-[#717975]">Cross-Sectional Anatomical Atlas</span>
            </div>

            {/* Embedded High-Fidelity Testis 3D Render (image_ad9275fc.png) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#e6e4dd] bg-white shadow-md relative">
                <img
                  src="/assets/aistudio/image_ad9275fc.png"
                  alt="3D Anatomical Dissection: Human Testis, Lobules, Seminiferous Tubules, Epididymis, Pampiniform Venous Plexus and Vas Deferens"
                  className="w-full h-80 object-contain p-2"
                />
                <div className="p-2.5 bg-[#faf9f4] border-t border-[#e6e4dd] text-[11px] text-[#5a6460]">
                  <strong className="text-[#123d32]">Scientific 3D Dissection: </strong>
                  Testis with tunica albuginea window revealing seminiferous tubules, rete testis, epididymal head/body/tail, deferential duct, and the coiled blue pampiniform venous plexus counter-current exchanger with red testicular artery.
                </div>
              </div>

              {/* Side-by-Side Pathological Spectrum */}
              <div className="lg:col-span-7 space-y-2.5 text-xs max-h-[500px] overflow-y-auto pr-1">
                {[
                  {
                    title: '1. Testicular Germ Cell Tumor (Mass)',
                    type: 'Intratesticular (High Suspicion)',
                    color: 'border-[#ba1a1a] bg-[#fff8f7]',
                    summary: 'Painless, firm, hard, non-tender lump within the testicular parenchyma that does not transilluminate. 95% of testicular neoplasms are germ cell tumors (Seminoma vs Non-seminoma).',
                    eval: 'Urgent Scrotal Duplex Ultrasound + Serum Tumor Markers (β-hCG, AFP, LDH). Radical inguinal orchiectomy is standard.',
                  },
                  {
                    title: '2. Testicular Torsion',
                    type: 'Critical Emergency (4–6h Window)',
                    color: 'border-[#ba1a1a] bg-[#ffdad6]/40',
                    summary: 'Twisting of spermatic cord cutting off testicular arterial supply and venous drainage. Sudden, severe, acute unilateral pain, high-riding horizontal testis (bell-clapper deformity), absent cremasteric reflex.',
                    eval: 'Immediate emergency surgical exploration and bilateral orchiopexy. Do NOT delay for imaging if clinically suspected.',
                  },
                  {
                    title: '3. Varicocele (Pampiniform Venous Plexus)',
                    type: 'Extratesticular (Venous Incompetence)',
                    color: 'border-[#bfecdc] bg-[#f5fbf8]',
                    summary: 'Abnormal dilation and tortuosity of the pampiniform veins in the spermatic cord (90% left-sided due to perpendicular insertion into left renal vein). Feels like a "bag of worms" on standing.',
                    eval: 'Scrotal ultrasound with Valsalva showing vein diameter ≥ 2.5–3.0 mm and retrograde reflux > 1.0 sec.',
                  },
                  {
                    title: '4. Acute Epididymo-Orchitis',
                    type: 'Extratesticular / Infectious',
                    color: 'border-[#fed7aa] bg-[#fffaf5]',
                    summary: 'Gradual onset scrotal pain and swelling, tenderness localized to posterior epididymis with erythema and dysuria/fever. Prehn’s sign often positive.',
                    eval: 'Urinalysis, urine culture, urethral swab for STI PCR. Targeted antibiotics and scrotal support.',
                  },
                  {
                    title: '5. Hydrocele (Tunica Vaginalis)',
                    type: 'Extratesticular Fluid Collection',
                    color: 'border-[#bfdbfe] bg-[#f0f9ff]',
                    summary: 'Excess serous fluid between the parietal and visceral layers of the tunica vaginalis. Painless, smooth, fluctuant scrotal enlargement that transilluminates clearly with penlight.',
                    eval: 'Scrotal ultrasound to rule out underlying reactive hydrocele secondary to tumor or infection.',
                  },
                  {
                    title: '6. Spermatocele (Epididymal Cyst)',
                    type: 'Extratesticular Cyst',
                    color: 'border-[#e6e4dd] bg-[#faf9f4]',
                    summary: 'Painless, smooth, distinct cystic mass located at the head of the epididymis (superior and posterior to the testis), containing non-viable sperm.',
                    eval: 'Easily palpated separate from the testis. Benign; managed conservatively unless large and causing discomfort.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border ${item.color} space-y-1`}>
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-[#1b1c19]">{item.title}</strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#e6e4dd] text-[#414845]">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[#5a6460]">{item.summary}</p>
                    <div className="pt-1 text-[11px] text-[#123d32]">
                      <strong>Clinical Evaluation:</strong> {item.eval}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: VASCULAR, NERVES, HPG HORMONES & SPERM PATHWAY */}
      {activeSubTab === 'pathways' && (
        <div className="space-y-6">
          {/* Complete Sperm Pathway Animated Sequencer */}
          <div className="clinical-card-elevated p-6 bg-white space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#123d32] text-white text-xs font-bold">
                  Section 6: Kinematics & Conduits
                </span>
                <h3 className="text-xl font-bold text-[#1b1c19] mt-1">
                  The Complete Sperm Pathway (Seminiferous Tubules to Urethral Meatus)
                </h3>
              </div>
              <span className="text-xs text-[#006d40] font-bold">6-Stage Physiological Conduit</span>
            </div>

            {/* Stepper Visualizer */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
              {SPERM_PATHWAY_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setSpermStepIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    spermStepIndex === idx
                      ? 'bg-[#123d32] text-white border-[#123d32] shadow-sm'
                      : 'bg-[#faf9f4] border-[#e6e4dd] text-[#5a6460] hover:bg-[#efeee9]'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">Step {s.step}</span>
                  <strong className="text-xs block mt-0.5 truncate">{s.name}</strong>
                </button>
              ))}
            </div>

            {/* Selected Step Detail */}
            <div className="p-4 bg-[#f5fbf8] border border-[#a4d0c0] rounded-2xl flex flex-col sm:flex-row items-start justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006d40]">
                  Anatomical Structure: {SPERM_PATHWAY_STEPS[spermStepIndex].organ}
                </span>
                <h4 className="text-base font-bold text-[#123d32]">
                  {SPERM_PATHWAY_STEPS[spermStepIndex].name}
                </h4>
                <p className="text-[#202b29] leading-relaxed max-w-2xl">
                  {SPERM_PATHWAY_STEPS[spermStepIndex].action}
                </p>
              </div>
              <div className="text-right shrink-0 bg-white p-2.5 rounded-xl border border-[#bfecdc]">
                <span className="text-[10px] text-[#717975] block font-mono">Transit Duration</span>
                <strong className="text-xs font-bold text-[#006d40]">
                  {SPERM_PATHWAY_STEPS[spermStepIndex].duration}
                </strong>
              </div>
            </div>
          </div>

          {/* HPG Hormonal Axis & Penile Erection Hemodynamics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HPG Axis */}
            <div className="clinical-card p-5 bg-white space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1b1c19]">
                <Zap className="w-4 h-4 text-[#006d40]" />
                <span>Hypothalamic-Pituitary-Gonadal (HPG) Axis</span>
              </div>
              <div className="space-y-2 text-xs text-[#5a6460]">
                <div className="p-2.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-lg">
                  <strong className="text-[#123d32]">1. Hypothalamus:</strong> Secretes pulsatile Gonadotropin-Releasing Hormone (GnRH).
                </div>
                <div className="p-2.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-lg">
                  <strong className="text-[#123d32]">2. Anterior Pituitary:</strong> Releases Luteinizing Hormone (LH) and Follicle-Stimulating Hormone (FSH).
                </div>
                <div className="p-2.5 bg-[#f5fbf8] border border-[#bfecdc] rounded-lg">
                  <strong className="text-[#006d40]">3. Leydig Cells (Testis):</strong> Stimulated by LH to synthesize Testosterone.
                </div>
                <div className="p-2.5 bg-[#f5fbf8] border border-[#bfecdc] rounded-lg">
                  <strong className="text-[#006d40]">4. Sertoli Nurse Cells:</strong> Stimulated by FSH & intratesticular testosterone to govern spermatogenesis and produce Inhibin B.
                </div>
              </div>
            </div>

            {/* Penile Erection Hemodynamics */}
            <div className="clinical-card p-5 bg-white space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1b1c19]">
                <HeartPulse className="w-4 h-4 text-[#f43f5e]" />
                <span>Erection Hemodynamics & Veno-Occlusion</span>
              </div>
              <div className="space-y-2 text-xs text-[#5a6460]">
                <div className="p-2.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-lg">
                  <strong className="text-[#1b1c19]">Neural Trigger:</strong> Parasympathetic cavernous nerves (S2–S4) release Nitric Oxide (NO).
                </div>
                <div className="p-2.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-lg">
                  <strong className="text-[#1b1c19]">Smooth Muscle Relaxation:</strong> Intracellular cGMP increases, dilating helicine cavernosal arteries.
                </div>
                <div className="p-2.5 bg-[#fff8f7] border border-[#ffdad6] rounded-lg">
                  <strong className="text-[#ba1a1a]">Veno-Occlusive Mechanism:</strong> Rapidly expanding lacunar spaces compress subtunical venules against the rigid tunica albuginea, trapping blood at intracorporal pressures &gt; 100 mmHg.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: CLINICAL ASSESSMENT & DIAGNOSTIC PATHWAY */}
      {activeSubTab === 'clinical_triage' && (
        <div className="space-y-6">
          <div className="clinical-card-elevated p-6 bg-white space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#123d32] text-white text-xs font-bold">
                  Section 7: Clinical Decision Matrix
                </span>
                <h3 className="text-xl font-bold text-[#1b1c19] mt-1">
                  Evidence-Based Clinical Assessment & Triage Pathway
                </h3>
              </div>
              <span className="text-xs text-[#717975]">AUA / EAU Guidelines</span>
            </div>

            {/* Symptom Filter Selector */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#717975] font-semibold">Chief Complaint Filter:</span>
              {[
                { id: 'lump', label: 'Testicular / Scrotal Lump' },
                { id: 'acute_pain', label: 'Acute Severe Pain' },
                { id: 'urinary', label: 'Urinary Symptoms (LUTS / BPH)' },
                { id: 'fertility', label: 'Male Fertility / SFA Concerns' },
              ].map((sym) => (
                <button
                  key={sym.id}
                  onClick={() => setSelectedAssessmentSymptom(sym.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold ${
                    selectedAssessmentSymptom === sym.id
                      ? 'bg-[#123d32] text-white shadow-xs'
                      : 'bg-[#faf9f4] border border-[#e6e4dd] text-[#5a6460] hover:bg-[#efeee9]'
                  }`}
                >
                  {sym.label}
                </button>
              ))}
            </div>

            {/* Clinical Decision Output */}
            {selectedAssessmentSymptom === 'lump' && (
              <div className="p-4 bg-[#f5fbf8] border border-[#a4d0c0] rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#006d40]">Diagnostic Algorithm: Palpable Scrotal Mass</h4>
                  <span className="px-2 py-0.5 rounded bg-white text-[10px] font-bold text-[#123d32] border border-[#bfecdc]">
                    AUA Protocol
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-[#bfecdc]">
                    <strong className="text-[#ba1a1a] block mb-1">1. Intratesticular Firm Mass</strong>
                    <p className="text-[#5a6460]">Non-tender, solid lesion arising within the testis parenchyma.</p>
                    <div className="mt-2 text-[11px] font-bold text-[#ba1a1a]">
                      → Immediate High-Resolution Scrotal Ultrasound with Color Doppler + Serum β-hCG, AFP, LDH.
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#bfecdc]">
                    <strong className="text-[#0284c7] block mb-1">2. Extratesticular Cystic Mass</strong>
                    <p className="text-[#5a6460]">Transilluminates, separate from testis (Hydrocele or Spermatocele).</p>
                    <div className="mt-2 text-[11px] font-bold text-[#0284c7]">
                      → Ultrasound confirms clear serous fluid. Conservative management or elective excision if symptomatic.
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#bfecdc]">
                    <strong className="text-[#123d32] block mb-1">3. Dilated Inguinoscrotal Mass</strong>
                    <p className="text-[#5a6460]">"Bag of worms" or mass with cough impulse (Varicocele / Inguinal Hernia).</p>
                    <div className="mt-2 text-[11px] font-bold text-[#123d32]">
                      → Standing exam + Valsalva Doppler ultrasound. Assess semen parameters for subfertility.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedAssessmentSymptom === 'acute_pain' && (
              <div className="p-4 bg-[#ffdad6]/60 border border-[#ffb4ab] rounded-2xl space-y-3 text-xs text-[#93000a]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">Diagnostic Algorithm: Acute Severe Scrotal Pain</h4>
                  <span className="px-2 py-0.5 rounded bg-[#ba1a1a] text-white text-[10px] font-bold">
                    Emergency Triage
                  </span>
                </div>
                <p className="leading-relaxed">
                  Sudden severe pain under 6 hours onset with nausea/vomiting is <strong>Testicular Torsion</strong> until proven otherwise. High-riding testis and absent cremasteric reflex require immediate surgical exploration.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="tel:911"
                    className="px-4 py-2 bg-[#ba1a1a] text-white font-bold rounded-full flex items-center gap-2 hover:bg-[#93000a] transition-colors shadow-sm"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Emergency (911)</span>
                  </a>
                  <button
                    onClick={onTriggerRedFlag}
                    className="px-4 py-2 bg-white text-[#ba1a1a] border border-[#ffb4ab] font-bold rounded-full"
                  >
                    View Emergency Detorsion Protocol
                  </button>
                </div>
              </div>
            )}

            {selectedAssessmentSymptom === 'urinary' && (
              <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-2xl space-y-3 text-xs">
                <h4 className="font-bold text-sm text-[#123d32]">Diagnostic Algorithm: Lower Urinary Tract Symptoms (LUTS)</h4>
                <p className="text-[#5a6460]">
                  Evaluates urinary frequency, urgency, nocturia, weak stream, intermittency, and straining using the International Prostate Symptom Score (IPSS).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-[#e6e4dd]">
                    <strong className="text-[#1b1c19] block mb-1">Initial Diagnostic Workup:</strong>
                    <ul className="space-y-1 text-[#5a6460]">
                      <li>• Urinalysis to rule out UTI, hematuria, and glucosuria</li>
                      <li>• Serum PSA (based on shared clinical decision-making)</li>
                      <li>• Digital Rectal Exam (DRE) assessing size and nodularity</li>
                      <li>• Post-void residual (PVR) volume via bladder ultrasound</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#e6e4dd]">
                    <strong className="text-[#1b1c19] block mb-1">Therapeutic Management:</strong>
                    <ul className="space-y-1 text-[#5a6460]">
                      <li>• Mild (IPSS 1–7): Watchful waiting and fluid timing</li>
                      <li>• Moderate (IPSS 8–19): Alpha-blockers (Tamsulosin) ± 5-ARIs (Finasteride)</li>
                      <li>• Severe / Refractory: Minimally invasive surgical therapy (UroLift, Rezum, HoLEP, TURP)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedAssessmentSymptom === 'fertility' && (
              <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-2xl space-y-3 text-xs">
                <h4 className="font-bold text-sm text-[#123d32]">Diagnostic Algorithm: Male Factor Infertility</h4>
                <p className="text-[#5a6460]">
                  Comprehensive fertility evaluation for couples attempting conception for ≥ 12 months (or ≥ 6 months if female partner is ≥ 35).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-[#e6e4dd]">
                    <strong className="text-[#006d40] block mb-1">Tier 1: Semen Analysis</strong>
                    <p className="text-[#5a6460]">2 semen analyses at least 1 month apart following 2–5 days abstinence (WHO 6th Edition standards).</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#e6e4dd]">
                    <strong className="text-[#006d40] block mb-1">Tier 2: Endocrine Panel</strong>
                    <p className="text-[#5a6460]">Serum Total Testosterone, Free Testosterone, FSH, LH, and Prolactin if concentration &lt; 10 M/mL.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#e6e4dd]">
                    <strong className="text-[#006d40] block mb-1">Tier 3: Genetic Testing</strong>
                    <p className="text-[#5a6460]">Karyotype & Y-chromosome microdeletion (AZF) testing if concentration &lt; 5 M/mL or azoospermic.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Safety & Educational Governance Disclaimer */}
      <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-2xl text-xs text-[#717975] leading-relaxed text-center">
        <strong>Medical Governance:</strong> This 3D medical atlas is designed for medical education, patient awareness, and clinician-assisted assessment. It does not replace clinical examination, in-person ultrasound, biopsy, or diagnosis by a board-certified urologist or andrologist.
      </div>
    </div>
  );
};
