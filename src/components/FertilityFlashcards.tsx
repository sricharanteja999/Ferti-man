import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Brain,
  Zap,
  Flame,
  Search,
  Check,
  X,
  ExternalLink,
  SlidersHorizontal,
  GraduationCap,
  Layers,
  Star,
  Shuffle
} from 'lucide-react';

export interface Flashcard {
  id: string;
  category: 'Semen Analysis' | 'DNA & Genetics' | 'Hormones' | 'Thermal & Varicocele' | 'Supplements' | 'Clinical Cases';
  difficulty: 'Foundational' | 'Clinical' | 'Advanced Andrology';
  front: {
    title: string;
    questionOrPrompt: string;
    subtext?: string;
    badge?: string;
    clinicalClue?: string;
  };
  back: {
    coreAnswer: string;
    deepExplanation: string;
    actionableTakeaway: string;
    normalReference?: string;
    scientificSource: string;
    proteinOrBiomarker?: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const FLASHCARD_DECKS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Semen Analysis',
    difficulty: 'Foundational',
    front: {
      title: 'Progressive vs. Non-Progressive Motility',
      questionOrPrompt: 'What is the precise clinical distinction between Progressive (PR) and Non-Progressive (NP) motility in WHO 6th Edition?',
      subtext: 'Flagellar kinematics & fertilization velocity',
      badge: 'WHO 6th Benchmark',
      clinicalClue: 'Look for forward rectilinear swimming vs spinning in place.',
    },
    back: {
      coreAnswer: 'Progressive Motility (PR) requires active, linear forward movement across the visual field, whereas Non-Progressive (NP) consists of flagellar beating with zero forward displacement (e.g. swimming in tight circles or twitching).',
      deepExplanation: 'Only progressively motile spermatozoa possess the kinetic capability to penetrate the cervical mucus plug, traverse the uterotubular junction, and undergo rheotaxis toward the oocyte. Non-progressive motility often signals mitochondrial ATP depletion or axoneme outer dense fiber structural flaws.',
      actionableTakeaway: 'Focus on L-Carnitine (2000mg) and CoQ10 (200mg) to boost mitochondrial beta-oxidation in the midpiece sheath.',
      normalReference: 'WHO 6th Ed. Lower Reference Limit: PR ≥ 30% (PR + NP Total ≥ 42%)',
      scientificSource: 'WHO Laboratory Manual for the Examination and Processing of Human Semen (6th Edition, 2021)',
      proteinOrBiomarker: 'CATSPER1 (Cation Channel of Sperm, UniProt Q8NEC5)',
    },
    quiz: {
      question: 'Under the WHO 6th Edition, what is the lower reference limit for Progressive Motility (PR)?',
      options: ['≥ 15%', '≥ 30%', '≥ 50%', '≥ 65%'],
      correctIndex: 1,
      explanation: 'WHO 6th Edition established the 5th percentile lower reference limit for Progressive Motility at 30% (down from 32% in 5th edition).',
    },
  },
  {
    id: 'fc-2',
    category: 'DNA & Genetics',
    difficulty: 'Advanced Andrology',
    front: {
      title: 'DNA Fragmentation Index (DFI) vs. Semen Parameters',
      questionOrPrompt: 'Why can a man have a normal sperm count (e.g. 60 M/mL) and motility, yet still suffer from unexplained infertility due to elevated DFI?',
      subtext: 'Nuclear Chromatin Integrity',
      badge: 'Epigenetic & Chromatin',
      clinicalClue: 'Standard microscope semen analysis only checks shape and swimming, not DNA strand breaks.',
    },
    back: {
      coreAnswer: 'Conventional semen analysis assesses physical morphology and swimming kinetics, but cannot visualize molecular double-strand breaks in sperm nuclear chromatin.',
      deepExplanation: 'During spermiogenesis, somatic histones are replaced by small, arginine-rich Protamines (PRM1 & PRM2) that compact DNA into crystalline toroids. Incomplete protamination or oxidative stress causes single and double-strand DNA nicks. A sperm can appear structurally perfect under a 400x optical microscope, swim straight, and fertilize an egg—yet cause early embryonic arrest or recurrent blastocyst failure.',
      actionableTakeaway: 'Test DFI via SCSA or TUNEL assay if unexplained infertility exceeds 12 months. Target DFI < 15% via antioxidant therapy and scrotal cooling.',
      normalReference: 'Optimal: < 15% | Moderate: 15–25% | High Risk: > 25%',
      scientificSource: 'Agarwal et al., "Clinical Utility of Sperm DNA Fragmentation Testing: AUA/ASRM Best Practice" (Fertility & Sterility)',
      proteinOrBiomarker: 'Protamine-1 & Protamine-2 (PRM1/PRM2, UniProt P04553 / P04554)',
    },
    quiz: {
      question: 'Which proteins replace somatic histones during spermiogenesis to lock sperm DNA into crystalline toroids?',
      options: ['Actin & Myosin', 'Protamines (PRM1 & PRM2)', 'Tubulin & Dynein', 'Albumin & Globulin'],
      correctIndex: 1,
      explanation: 'Protamines are arginine-rich proteins that replace 85–90% of somatic histones during chromatin compaction, shielding paternal DNA from enzymatic digestion.',
    },
  },
  {
    id: 'fc-3',
    category: 'Thermal & Varicocele',
    difficulty: 'Clinical',
    front: {
      title: 'The Counter-Current Heat Exchange System',
      questionOrPrompt: 'How does the Pampiniform Venous Plexus regulate testicular temperature, and what occurs in a Varicocele?',
      subtext: 'Testicular Thermoregulation',
      badge: 'Vascular Micro-Anatomy',
      clinicalClue: 'Arterial blood at 37°C is pre-cooled before entering the testis.',
    },
    back: {
      coreAnswer: 'The pampiniform venous plexus forms an intricate counter-current heat exchanger, wrapping cool venous blood around the incoming warm testicular artery to drop blood temperature by 2.0–3.0°C.',
      deepExplanation: 'Human spermatogenesis is temperature-obligate and requires 34.0°C–34.5°C. In a varicocele, incompetent venous valves cause retrograde pooling of warm deoxygenated blood in the internal spermatic vein. This abolishes the counter-current gradient, elevates scrotal temperature, induces testicular hypoxia, and floods meiotic spermatocytes with reactive nitrogen and oxygen species.',
      actionableTakeaway: 'Avoid heat traps (saunas, heated car seats, tight synthetic lycra). Grade 2/3 varicoceles with abnormal SFA/DFI warrant microscopic subinguinal varicocelectomy.',
      normalReference: 'Scrotal Temperature: 33.5°C – 34.5°C (2–3°C below core body 37.0°C)',
      scientificSource: 'European Association of Urology (EAU) Guidelines on Male Sexual and Reproductive Health (2024)',
      proteinOrBiomarker: 'Heat Shock Protein 70 (HSP70, UniProt P0DMV8)',
    },
    quiz: {
      question: 'What is the optimal physiological temperature for human spermatogenesis relative to core body temperature (37°C)?',
      options: ['Same as body temperature (37°C)', '2°C to 3°C lower (34°C–34.5°C)', '5°C higher (42°C)', 'Sub-freezing (20°C)'],
      correctIndex: 1,
      explanation: 'Human testes are located outside the abdominal cavity in the scrotum specifically to maintain a temperature 2°C to 3°C lower than core body temperature.',
    },
  },
  {
    id: 'fc-4',
    category: 'Supplements',
    difficulty: 'Foundational',
    front: {
      title: 'CoQ10: Ubiquinone vs. Ubiquinol & Sperm Kinetics',
      questionOrPrompt: 'Why is the reduced form (Ubiquinol) superior for male fertility, and where does it accumulate in the sperm cell?',
      subtext: 'Mitochondrial Bioenergetics',
      badge: 'Nutraceutical Bioavailability',
      clinicalClue: 'Look at the mitochondrial spiral sheath in the midpiece.',
    },
    back: {
      coreAnswer: 'Ubiquinol is the pre-converted, electron-rich active antioxidant form with 3x–8x greater absorption. It concentrates directly in the mitochondrial spiral sheath of the sperm midpiece.',
      deepExplanation: 'Sperm have virtually no cytoplasm and cannot store glycogen. Their swimming motility is powered by ATP generated by ~75–100 mitochondria arranged in a tight helix around the axoneme. Ubiquinol serves two vital functions: (1) It acts as an obligate electron carrier in Complexes I, II, and III of the respiratory chain; and (2) It acts as a lipophilic antioxidant neutralizing lipid peroxyl radicals before they can attack the flagellar membrane.',
      actionableTakeaway: 'Clinical dosing: 200mg–300mg Ubiquinol daily taken with dietary fats. Takes 72–90 days to show on semen analysis due to the spermatogenesis cycle.',
      normalReference: 'Target Seminal Plasma CoQ10: > 0.40 µmol/L',
      scientificSource: 'Lafuente et al., "Coenzyme Q10 and Male Infertility: A Systematic Review and Meta-Analysis" (Andrology)',
      proteinOrBiomarker: 'ATP Synthase & Coenzyme Q Cytochrome c Reductase',
    },
    quiz: {
      question: 'Where is CoQ10 primarily localized in the mature spermatozoon?',
      options: ['Acrosome Cap', 'Nuclear Chromatin', 'Mitochondrial Spiral Sheath of the Midpiece', 'Tail Endpiece'],
      correctIndex: 2,
      explanation: 'CoQ10 is heavily concentrated in the mitochondrial sheath of the midpiece, where it fuels ATP production for flagellar motility.',
    },
  },
  {
    id: 'fc-5',
    category: 'Hormones',
    difficulty: 'Clinical',
    front: {
      title: 'The LH / Testosterone / FSH / Sertoli Triad',
      questionOrPrompt: 'Why does exogenous Testosterone use (TRT / Anabolic steroids) paradoxically cause azoospermia (zero sperm count)?',
      subtext: 'Hypothalamic-Pituitary-Gonadal Axis',
      badge: 'Endocrine Feedback Loop',
      clinicalClue: 'Negative feedback on the pituitary shuts down intra-testicular testosterone.',
    },
    back: {
      coreAnswer: 'Exogenous testosterone exerts profound negative feedback on the hypothalamus and pituitary, shutting down LH and FSH secretion. Without LH, intratesticular testosterone drops by 98%, causing complete spermatogenic arrest.',
      deepExplanation: 'Intratesticular testosterone (ITT) concentration in the seminiferous tubules is normally 50–100 times higher than blood serum levels. High ITT is required to maintain the blood-testis barrier and stimulate Sertoli cells. When a man takes testosterone injections, serum levels may look high (e.g. 1000 ng/dL), but pituitary LH drops to 0.0 mIU/mL. The Leydig cells shut down, ITT collapses to near zero, and sperm production halts completely.',
      actionableTakeaway: 'Never use testosterone replacement therapy (TRT) if fertility is desired. Use hCG, Clomiphene Citrate, or Enclomiphene to stimulate endogenous LH/FSH instead.',
      normalReference: 'FSH: 1.5–12.4 mIU/mL | LH: 1.7–8.6 mIU/mL | Total T: 300–890 ng/dL',
      scientificSource: 'American Urological Association (AUA): Evaluation and Management of Male Infertility (Endocrine Section)',
      proteinOrBiomarker: 'Luteinizing Hormone Receptor (LHCGR, UniProt P22888)',
    },
    quiz: {
      question: 'What happens to Intratesticular Testosterone (ITT) when a man begins exogenous Testosterone injections?',
      options: ['It multiplies by 10x', 'It remains identical to serum levels', 'It collapses by up to 98% due to LH shutdown', 'It increases FSH production'],
      correctIndex: 2,
      explanation: 'Exogenous testosterone shuts down pituitary LH via negative feedback, causing Leydig cells to stop producing intratesticular testosterone, which drops by up to 98%.',
    },
  },
  {
    id: 'fc-6',
    category: 'Clinical Cases',
    difficulty: 'Advanced Andrology',
    front: {
      title: 'Clinical Case: The Sedentary Desk Worker Dilemma',
      questionOrPrompt: 'Case: A 33yo software engineer presents with 28% progressive motility and 24% DFI. He sits 10 hours daily on an ergonomic heated mesh chair. Semen volume is 1.8 mL. What is the primary etiology?',
      subtext: 'Real-World Clinical Scenario',
      badge: 'Diagnostic Vignette',
      clinicalClue: 'Chronic pelvic pooling + thermal trap + sedentary dehydration.',
    },
    back: {
      coreAnswer: 'Occupational scrotal hyperthermia combined with pelvic venous congestion and sub-optimal hydration, triggering oxidative stress during meiotic maturation.',
      deepExplanation: 'Prolonged sitting with thighs adducted elevates scrotal temperature by 1.8°C to 2.2°C. Over 10 hours daily, this produces continuous thermal stress on developing spermatocytes, increasing reactive oxygen species (ROS) and lipid peroxidation. This explains the elevated 24% DFI and impaired motility.',
      actionableTakeaway: '1. Introduce an electric sit-stand desk (alternate 45 min standing / 45 min sitting). 2. Avoid chair heaters. 3. Daily hydration to 3.0L. 4. Initiate 90-day antioxidant protocol (CoQ10 + Zinc + Lycopene). Expect SFA improvement at Day 72–90.',
      normalReference: 'Target: DFI < 15%, Progressive Motility ≥ 40%',
      scientificSource: 'Garolla et al., "Occupational Physical and Chemical Hazards in Male Infertility" (Hum Reprod Update)',
      proteinOrBiomarker: 'Glutathione Peroxidase 4 (GPX4, UniProt P36969)',
    },
    quiz: {
      question: 'Which daily intervention has been proven to significantly reduce scrotal thermal pooling in desk workers?',
      options: ['Sitting cross-legged', 'Alternating sit-stand desk & loose breathable cotton undergarments', 'Drinking hot tea', 'Wearing compression bike shorts all day'],
      correctIndex: 1,
      explanation: 'Sit-stand desks reduce prolonged pelvic compression, allowing natural thermoregulation via scrotal dartos and cremaster contraction.',
    },
  },
  {
    id: 'fc-7',
    category: 'Semen Analysis',
    difficulty: 'Clinical',
    front: {
      title: 'Kruger Strict Morphology: The 4% Threshold',
      questionOrPrompt: 'Why is the normal threshold for Strict Kruger Morphology only 4.0%? Does having 96% abnormal forms mean infertility?',
      subtext: 'Cellular Geometry & Acrosome Integrity',
      badge: 'WHO 6th Benchmark',
      clinicalClue: 'Kruger criteria is exceptionally strict: only ideal oval heads pass.',
    },
    back: {
      coreAnswer: 'No, having 4% normal morphology is considered fertile under WHO criteria. Kruger strict criteria requires an essentially perfect oval head (4.0–5.0 µm length, 2.5–3.5 µm width) with 40–70% acrosomal coverage and no neck or tail defects.',
      deepExplanation: 'Human spermatogenesis produces a vast excess of pleomorphic forms (tapered heads, amorphous heads, vacuolated acrosomes, coiled tails, duplicate heads). The strict Tygerberg/Kruger criteria was validated in in-vitro fertilization (IVF) studies, establishing that if ≥ 4% of sperm meet textbook perfection, natural in-vivo conception rates are preserved.',
      actionableTakeaway: 'Do not panic if your report says 95% abnormal forms. Ensure your absolute normal count (Total Motile Count × % Morphology) exceeds 2 million cells.',
      normalReference: 'WHO 6th Ed. Lower Reference Limit: ≥ 4.0% Strict Normal Forms',
      scientificSource: 'Kruger et al., "Predictive Value of Abnormal Sperm Morphology in IVF" (Hum Reprod)',
      proteinOrBiomarker: 'Hyaluronidase & Acrosin (ACR, UniProt P10323)',
    },
    quiz: {
      question: 'What percentage of normal forms is required to meet the WHO 6th Edition normal reference limit for Strict Kruger Morphology?',
      options: ['≥ 50%', '≥ 25%', '≥ 4.0%', '≥ 80%'],
      correctIndex: 2,
      explanation: 'Under strict Kruger criteria, the 5th percentile lower reference threshold is just 4.0% normal forms.',
    },
  },
  {
    id: 'fc-8',
    category: 'DNA & Genetics',
    difficulty: 'Advanced Andrology',
    front: {
      title: 'Y-Chromosome Microdeletions (AZFa, AZFb, AZFc)',
      questionOrPrompt: 'What are the AZF regions on the long arm of the Y-chromosome (Yq), and why are they critical in severe oligozoospermia or azoospermia?',
      subtext: 'Cytogenetics & Andrology',
      badge: 'Molecular Genetics',
      clinicalClue: 'Deletions in these regions govern whether sperm can be retrieved surgically.',
    },
    back: {
      coreAnswer: 'AZF (Azoospermia Factor) regions a, b, and c house master spermatogenesis genes (such as DAZ and RBMY1). Complete AZFa or AZFb microdeletions predict virtually 0% surgical sperm retrieval success (TESE), whereas AZFc deletions permit successful TESE in ~50–70% of cases.',
      deepExplanation: 'Microdeletions occur via non-allelic homologous recombination in repetitive palindromic sequences. AZFa contains USP9Y and DDX3Y (essential for stem cell maintenance); complete loss causes Sertoli cell-only syndrome (SCOS). AZFb loss causes meiotic maturation arrest. AZFc deletions frequently preserve focal islands of spermatogenesis, enabling testicular sperm extraction (micro-TESE) for ICSI.',
      actionableTakeaway: 'Any man with sperm concentration < 5 M/mL should receive Y-chromosome microdeletion (YCMD) and Karyotype testing before invasive biopsy.',
      normalReference: 'Intact Yq11.23 region (Zero microdeletions)',
      scientificSource: 'Krausz et al., "EAA/EMQN Best Practice Guidelines for Molecular Diagnosis of Y-chromosomal Microdeletions"',
      proteinOrBiomarker: 'DAZ1 (Deleted in Azoospermia 1, UniProt Q9NQZ3)',
    },
    quiz: {
      question: 'Which AZF microdeletion region still allows successful micro-TESE sperm retrieval in approximately 50% to 70% of cases?',
      options: ['Complete AZFa deletion', 'Complete AZFb deletion', 'AZFc deletion (DAZ gene cluster)', 'AZFa + AZFb combined'],
      correctIndex: 2,
      explanation: 'AZFc deletions frequently leave focal pockets of active spermatogenesis in seminiferous tubules, allowing micro-TESE retrieval.',
    },
  },
];

interface FertilityFlashcardsProps {
  onEarnXP?: (xp: number) => void;
  onAskCoach?: (question: string) => void;
}

export const FertilityFlashcards: React.FC<FertilityFlashcardsProps> = ({
  onEarnXP,
  onAskCoach,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [mode, setMode] = useState<'flashcard' | 'quiz' | 'cheat-sheet'>('flashcard');
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});
  const [bookmarkedCards, setBookmarkedCards] = useState<Record<string, boolean>>({});
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalXP, setTotalXP] = useState<number>(340);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  // Filter deck
  const filteredCards = FLASHCARD_DECKS.filter((c) => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      c.front.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.front.questionOrPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.back.coreAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeCard = filteredCards[currentCardIndex] || filteredCards[0] || FLASHCARD_DECKS[0];

  const handleNext = () => {
    setIsFlipped(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(randomIndex);
  };

  const handleMarkMastered = (cardId: string) => {
    const isAlready = masteredCards[cardId];
    setMasteredCards((prev) => ({
      ...prev,
      [cardId]: !isAlready,
    }));
    if (!isAlready) {
      setTotalXP((x) => x + 20);
      if (onEarnXP) onEarnXP(20);
      setShowCelebration('+20 XP! Card Mastered & Synced to Longitudinal Memory');
      setTimeout(() => setShowCelebration(null), 3000);
    }
  };

  const handleToggleBookmark = (cardId: string) => {
    setBookmarkedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleQuizAnswer = (optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(optIndex);
    setQuizSubmitted(true);
    if (activeCard.quiz && optIndex === activeCard.quiz.correctIndex) {
      setTotalXP((x) => x + 25);
      if (onEarnXP) onEarnXP(25);
      setShowCelebration('Correct! +25 XP Clinical Mastery Awarded');
      setTimeout(() => setShowCelebration(null), 3000);
    }
  };

  const categories = ['All', 'Semen Analysis', 'DNA & Genetics', 'Thermal & Varicocele', 'Supplements', 'Hormones', 'Clinical Cases'];

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / FLASHCARD_DECKS.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#123d32] text-white text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5cba83]" />
              Andrology Masterclass
            </span>
            <span className="text-xs text-[#717975] flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#006d40]" />
              AUA / WHO 6th Clinical Flashcards
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1b1c19] mt-1.5">
            Male Fertility Spaced-Repetition & Knowledge Engine
          </h2>
          <p className="text-sm text-[#5a6460] max-w-2xl mt-0.5">
            Beyond standard fertility apps. Master sperm kinematics, chromatin protamination, scrotal counter-current thermoregulation, and endocrinology through interactive 3D flashcards.
          </p>
        </div>

        {/* XP & Mastery Progress Capsule */}
        <div className="flex items-center gap-3 bg-white border border-[#e6e4dd] p-3 rounded-2xl shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#eaf6ee] text-[#006d40] flex items-center justify-center font-bold text-sm">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-[#1b1c19]">Mastery Progress</span>
              <span className="text-[#006d40] font-mono">{masteredCount}/{FLASHCARD_DECKS.length} Cards</span>
            </div>
            <div className="w-36 h-2 bg-[#efeee9] rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-gradient-to-r from-[#123d32] to-[#5cba83] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-[#717975] mt-0.5 flex items-center justify-between">
              <span>{progressPercent}% Complete</span>
              <span className="text-[#006d40] font-bold">★ {totalXP} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex p-1 bg-[#efeee9] rounded-full w-fit text-xs font-semibold">
          <button
            onClick={() => setMode('flashcard')}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              mode === 'flashcard' ? 'bg-[#123d32] text-white shadow-xs' : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#5cba83]" />
            <span>3D Interactive Flashcards</span>
          </button>
          <button
            onClick={() => setMode('quiz')}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              mode === 'quiz' ? 'bg-[#123d32] text-white shadow-xs' : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#5cba83]" />
            <span>Case Challenge Quiz</span>
          </button>
          <button
            onClick={() => setMode('cheat-sheet')}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              mode === 'cheat-sheet' ? 'bg-[#123d32] text-white shadow-xs' : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#5cba83]" />
            <span>WHO 6th Diagnostic Cheat Sheet</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#717975]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentCardIndex(0);
            }}
            placeholder="Search DFI, motility, hormones..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#e6e4dd] rounded-full outline-none focus:border-[#123d32]"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#123d32] text-white shadow-xs'
                : 'bg-white border border-[#e6e4dd] text-[#5a6460] hover:bg-[#efeee9]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Celebration Notification Toast */}
      {showCelebration && (
        <div className="p-3 bg-[#eaf6ee] border border-[#a4d0c0] rounded-xl text-xs text-[#004d2c] font-bold flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-[#5cba83]" />
          <span>{showCelebration}</span>
        </div>
      )}

      {/* MODE 1: 3D Flashcard Experience */}
      {mode === 'flashcard' && activeCard && (
        <div className="space-y-4">
          {/* Card Top Metadata & Controls */}
          <div className="flex items-center justify-between text-xs text-[#717975]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#123d32] bg-[#eaf6ee] px-2.5 py-0.5 rounded-full">
                {activeCard.category}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#f5f4ef] text-[11px] font-medium text-[#414845]">
                Level: {activeCard.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs">
                Card {currentCardIndex + 1} of {filteredCards.length}
              </span>
              <button
                onClick={() => handleToggleBookmark(activeCard.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  bookmarkedCards[activeCard.id]
                    ? 'bg-[#fef9c3] border-[#fde047] text-[#854d0e]'
                    : 'bg-white border-[#e6e4dd] text-[#717975] hover:text-[#1b1c19]'
                }`}
                title="Bookmark for review"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShuffle}
                className="p-1.5 rounded-lg bg-white border border-[#e6e4dd] text-[#717975] hover:text-[#1b1c19]"
                title="Shuffle Cards"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            className="w-full min-h-[380px] sm:min-h-[420px] cursor-pointer select-none perspective-1000 group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] transition-transform duration-500 rounded-3xl shadow-xl preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div
                className={`absolute inset-0 backface-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#e6e4dd] bg-gradient-to-br from-white via-[#faf9f4] to-[#f4f8f6] ${
                  isFlipped ? 'pointer-events-none' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#006d40] bg-[#eaf6ee] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#5cba83]" />
                      {activeCard.front.badge || 'Andrology Concept'}
                    </span>
                    <span className="text-xs text-[#717975] font-semibold flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Tap to Flip
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1b1c19] mt-6 tracking-tight font-display">
                    {activeCard.front.title}
                  </h3>

                  {activeCard.front.subtext && (
                    <span className="text-xs text-[#006d40] font-semibold block mt-1">
                      ● {activeCard.front.subtext}
                    </span>
                  )}

                  <p className="text-sm sm:text-base text-[#202b29] mt-4 font-medium leading-relaxed">
                    {activeCard.front.questionOrPrompt}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#e6e4dd]">
                  {activeCard.front.clinicalClue && (
                    <div className="p-3 bg-[#eaf6ee]/60 rounded-xl border border-[#bfecdc] text-xs text-[#004d2c] flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 shrink-0 text-[#006d40] mt-0.5" />
                      <div>
                        <strong>Clinical Diagnostic Clue:</strong> {activeCard.front.clinicalClue}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-[#717975]">
                    <span>Tap anywhere to reveal molecular mechanism</span>
                    <span className="font-semibold text-[#123d32] flex items-center gap-1">
                      Flip Answer →
                    </span>
                  </div>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div
                className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#123d32] bg-[#0c2a22] text-white shadow-2xl overflow-y-auto ${
                  !isFlipped ? 'pointer-events-none' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1b4d3e] text-[#a7f3d0] font-bold uppercase tracking-wider text-[10px]">
                      Clinical Mechanism Revealed
                    </span>
                    <span className="text-xs text-[#a4d0c0] flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Tap to Flip Front
                    </span>
                  </div>

                  {/* Core Answer */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#6ee7b7]">
                      {activeCard.back.coreAnswer}
                    </h4>
                  </div>

                  {/* Deep Cellular Explanation */}
                  <div className="p-3.5 bg-[#071c16] rounded-xl border border-[#1b4638] text-xs text-[#e2e8f0] leading-relaxed">
                    <strong className="text-[#a7f3d0] block mb-1">Biological & Physiological Pathway:</strong>
                    {activeCard.back.deepExplanation}
                  </div>

                  {/* Normal Reference / Benchmark */}
                  {activeCard.back.normalReference && (
                    <div className="p-2.5 bg-[#123d32] rounded-lg border border-[#235848] text-xs flex items-center justify-between">
                      <span className="text-[#94a3b8]">Clinical Reference:</span>
                      <strong className="text-[#a7f3d0]">{activeCard.back.normalReference}</strong>
                    </div>
                  )}

                  {/* Actionable Protocol Takeaway */}
                  <div className="p-3 bg-[#123d32]/90 rounded-xl border border-[#5cba83]/40 text-xs text-white">
                    <strong className="text-[#fef08a] flex items-center gap-1.5 mb-0.5">
                      <Zap className="w-3.5 h-3.5 text-[#f59e0b]" />
                      Actionable 90-Day Protocol Takeaway:
                    </strong>
                    {activeCard.back.actionableTakeaway}
                  </div>
                </div>

                {/* Protein & Source Footer */}
                <div className="pt-3 border-t border-[#1b4638] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#94a3b8]">
                  {activeCard.back.proteinOrBiomarker && (
                    <span className="text-[#a7f3d0] font-mono bg-[#071c16] px-2 py-0.5 rounded border border-[#1b4638]">
                      🧬 {activeCard.back.proteinOrBiomarker}
                    </span>
                  )}
                  <span className="truncate max-w-xs text-right">
                    Ref: {activeCard.back.scientificSource}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Spaced Repetition (SRS) Mastery Actions & Carousel Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white border border-[#e6e4dd] text-[#123d32] hover:bg-[#efeee9] transition-colors shadow-xs"
                title="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white border border-[#e6e4dd] text-[#123d32] hover:bg-[#efeee9] transition-colors shadow-xs"
                title="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs text-[#717975] pl-1">
                Use arrow buttons or swipe
              </span>
            </div>

            {/* SRS Feedback Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handleNext();
                }}
                className="px-3.5 py-2 rounded-full bg-[#faf9f4] hover:bg-[#efeee9] border border-[#e6e4dd] text-xs font-semibold text-[#5a6460] transition-colors"
              >
                Review Soon (Hard)
              </button>
              <button
                onClick={() => handleMarkMastered(activeCard.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                  masteredCards[activeCard.id]
                    ? 'bg-[#eaf6ee] text-[#006d40] border border-[#a4d0c0]'
                    : 'bg-[#123d32] hover:bg-[#1a4f41] text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{masteredCards[activeCard.id] ? 'Mastered (✓)' : 'Got it! (+20 XP)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: Clinical Case Challenge Quiz Mode */}
      {mode === 'quiz' && activeCard && activeCard.quiz && (
        <div className="clinical-card-elevated p-6 sm:p-8 bg-white space-y-6">
          <div className="flex items-center justify-between border-b border-[#e6e4dd] pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#eaf6ee] text-[#006d40]">
                <Brain className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-base text-[#1b1c19]">
                Clinical Case Challenge: {activeCard.front.title}
              </h3>
            </div>
            <span className="text-xs font-bold text-[#006d40] bg-[#eaf6ee] px-2.5 py-0.5 rounded-full">
              Question {currentCardIndex + 1} of {filteredCards.length}
            </span>
          </div>

          <p className="text-sm font-semibold text-[#1b1c19] leading-relaxed">
            {activeCard.quiz.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {activeCard.quiz.options.map((option, idx) => {
              const isSelected = selectedQuizOption === idx;
              const isCorrect = idx === activeCard.quiz?.correctIndex;

              let btnStyle = 'bg-[#faf9f4] border-[#e6e4dd] text-[#202b29] hover:bg-[#efeee9]';
              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-[#eaf6ee] border-[#006d40] text-[#006d40] font-bold ring-1 ring-[#006d40]';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a] font-bold';
                } else {
                  btnStyle = 'bg-[#faf9f4] border-[#e6e4dd] text-[#717975] opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={quizSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-[#006d40] shrink-0" />}
                  {quizSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-[#ba1a1a] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {quizSubmitted && (
            <div className="p-4 bg-[#f5fbf8] border border-[#a4d0c0] rounded-xl text-xs space-y-1.5 animate-in fade-in">
              <strong className="text-[#006d40] block">Clinical Rationale & Mechanism:</strong>
              <p className="text-[#202b29] leading-relaxed">{activeCard.quiz.explanation}</p>
            </div>
          )}

          {/* Bottom Next Question */}
          <div className="flex items-center justify-between pt-3 border-t border-[#e6e4dd]">
            <span className="text-xs text-[#717975]">
              {quizSubmitted ? 'Challenge complete' : 'Select the best evidence-based answer'}
            </span>
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Next Challenge</span>
              <ChevronRight className="w-4 h-4 text-[#5cba83]" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: WHO 6th Edition Diagnostic Cheat Sheet */}
      {mode === 'cheat-sheet' && (
        <div className="clinical-card-elevated p-6 bg-white space-y-6">
          <div className="flex items-center justify-between border-b border-[#e6e4dd] pb-3">
            <div>
              <h3 className="font-bold text-base text-[#1b1c19]">
                WHO 6th Edition Semen Analysis Standards (5th Percentile Lower Reference Limits)
              </h3>
              <p className="text-xs text-[#5a6460]">
                Official benchmark published by the World Health Organization (2021) for fertile human semen parameters.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#123d32] text-white text-xs font-bold">
              WHO-6 Reference
            </span>
          </div>

          <div className="overflow-x-auto border border-[#e6e4dd] rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5f4ef] text-[#1b1c19] font-semibold border-b border-[#e6e4dd]">
                <tr>
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">WHO 6th Lower Limit (5th %ile)</th>
                  <th className="py-3 px-4">Optimal Fertility Target</th>
                  <th className="py-3 px-4">Biological Organ / Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e4dd]">
                {[
                  {
                    param: 'Semen Volume',
                    who6: '≥ 1.4 mL',
                    opt: '2.5 – 4.5 mL',
                    organ: 'Seminal Vesicles (65%) + Prostate (25%)',
                  },
                  {
                    param: 'Sperm Concentration',
                    who6: '≥ 16.0 M/mL',
                    opt: '≥ 45.0 M/mL',
                    organ: 'Seminiferous Tubules (Sertoli cells)',
                  },
                  {
                    param: 'Total Sperm Number',
                    who6: '≥ 39.0 M / ejaculate',
                    opt: '≥ 100.0 M / ejaculate',
                    organ: 'Testicular reserve + Epididymis',
                  },
                  {
                    param: 'Progressive Motility (PR)',
                    who6: '≥ 30%',
                    opt: '≥ 45% (Rectilinear)',
                    organ: 'Mitochondrial Sheath (ATP) + Axoneme',
                  },
                  {
                    param: 'Total Motility (PR + NP)',
                    who6: '≥ 42%',
                    opt: '≥ 60%',
                    organ: 'Epididymal transit maturation',
                  },
                  {
                    param: 'Strict Kruger Morphology',
                    who6: '≥ 4.0%',
                    opt: '≥ 8.0 – 14.0%',
                    organ: 'Spermiogenesis & Acrosomal Biogenesis',
                  },
                  {
                    param: 'DNA Fragmentation Index (DFI)',
                    who6: '< 25.0%',
                    opt: '< 15.0%',
                    organ: 'Protamine-1/2 nuclear compaction & ROS defense',
                  },
                  {
                    param: 'Vitality (Membrane Intact)',
                    who6: '≥ 54%',
                    opt: '≥ 75%',
                    organ: 'Lipid bilayer antioxidant integrity',
                  },
                  {
                    param: 'pH',
                    who6: '≥ 7.2',
                    opt: '7.3 – 7.8',
                    organ: 'Alkaline seminal vesicle fluid buffer',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#faf9f4] transition-colors">
                    <td className="py-2.5 px-4 font-bold text-[#1b1c19]">{row.param}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-[#006d40]">{row.who6}</td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-[#123d32]">{row.opt}</td>
                    <td className="py-2.5 px-4 text-[#5a6460]">{row.organ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ask Coach Shortcut */}
      <div className="p-4 bg-[#f5fbf8] border border-[#a4d0c0] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Brain className="w-5 h-5 text-[#006d40] shrink-0" />
          <div>
            <strong className="text-sm text-[#123d32]">Have questions about these andrology concepts?</strong>
            <p className="text-[#5a6460]">
              Ask M-CARE AI to cross-reference your uploaded semen reports against any flashcard concept.
            </p>
          </div>
        </div>
        {onAskCoach && (
          <button
            onClick={() => onAskCoach(`Can you explain ${activeCard.front.title} in the context of my recent lab results?`)}
            className="px-4 py-2 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white font-bold whitespace-nowrap transition-colors shadow-sm"
          >
            Ask M-CARE AI →
          </button>
        )}
      </div>
    </div>
  );
};
