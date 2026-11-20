import React, { useState } from 'react';
import {
  Sparkles,
  Utensils,
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Flame,
  Zap,
  Leaf,
  Droplets,
  HelpCircle
} from 'lucide-react';

interface DailyWellnessTipProps {
  currentDay: number;
  currentPhase: string;
  onAskCoach?: (question: string) => void;
  onXPBonus?: (xp: number) => void;
  onNavigateToNutrition?: () => void;
}

interface PhaseTip {
  phaseId: 'I' | 'II' | 'III' | 'IV';
  phaseName: string;
  daysRange: string;
  headline: string;
  cellularContext: string;
  dietAdvice: {
    heroNutrient: string;
    foodSources: string;
    actionableDiet: string;
    checklist: string[];
  };
  lifestyleShield: {
    title: string;
    guideline: string;
    action: string;
  };
  scientificCitation: string;
  keyMolecules: string[];
}

const PHASE_TIPS: Record<'I' | 'II' | 'III' | 'IV', PhaseTip> = {
  I: {
    phaseId: 'I',
    phaseName: 'Phase I: Mitosis & Proliferation',
    daysRange: 'Days 1–25',
    headline: 'Mitotic DNA Synthesis & Stem Cell Progenitor Shield',
    cellularContext:
      'In this phase, diploid spermatogonia stem cells proliferate rapidly along the seminiferous tubule basement membrane. Developing cells require high nucleotide synthesis and trace mineral co-factors.',
    dietAdvice: {
      heroNutrient: 'Bioavailable Zinc & L-Methylfolate',
      foodSources: 'Raw pumpkin seeds, spinach, lentils, pasture-raised eggs, and oysters.',
      actionableDiet:
        'Incorporate 2 tablespoons of raw pumpkin seeds and a cup of steamed leafy greens into lunch. Folate donates methyl groups for DNA replication, while zinc stabilizes chromosome chromatin folding.',
      checklist: [
        'Raw pumpkin seeds or zinc-rich seeds (30g)',
        'Dark leafy greens for folate methylation',
        'Cruciferous vegetables (DIM/Sulforaphane for estrogen detox)',
        'Hydrate with 1L pure water upon waking',
      ],
    },
    lifestyleShield: {
      title: 'Stem Niche Thermal Protection',
      guideline:
        'Mitotic stem cells have limited endogenous antioxidant defense. Keep laptops off your lap and eliminate synthetic underwear.',
      action: 'Wear loose breathable organic cotton shorts during workouts and sleep.',
    },
    scientificCitation: 'AUA / European Urology: Mitotic Spermatogonial Niche Architecture (2024)',
    keyMolecules: ['Zinc Picolinate 30mg', 'L-Methylfolate 800mcg', 'Vitamin D3 4000 IU'],
  },
  II: {
    phaseId: 'II',
    phaseName: 'Phase II: Meiosis & Chromosome Crossover',
    daysRange: 'Days 26–55',
    headline: 'Homologous Genetic Crossover & Anti-ROS Defense',
    cellularContext:
      'Primary spermatocytes are undergoing meiotic reduction division to become haploid (1n). Chromosomes are uncoiled during genetic crossover, making DNA exceptionally vulnerable to thermal denaturation and reactive oxygen species (ROS).',
    dietAdvice: {
      heroNutrient: 'Ubiquinol CoQ10 & Anthocyanin Polyphenols',
      foodSources: 'Wild blueberries, pomegranate arils, dark walnuts, and extra virgin olive oil.',
      actionableDiet:
        'Snack on 1/2 cup of wild blueberries or fresh pomegranate with raw walnuts. Anthocyanins cross biological barriers to protect meiotic spindle fibers from lipid peroxidation.',
      checklist: [
        '1/2 cup wild blueberries or pure pomegranate',
        'Ubiquinol CoQ10 (200mg with healthy fat)',
        'Handful of raw walnuts (alpha-linolenic omega-3)',
        'Post-workout scrotal cool rinse (34.0°C target)',
      ],
    },
    lifestyleShield: {
      title: 'Scrotal Thermoregulation & Meiotic Safeguard',
      guideline:
        'A scrotal elevation of just 1.5°C disrupts meiotic chromosomal disjunction, causing premature apoptosis and elevated DFI.',
      action: 'Perform a 60-second post-workout cool rinse and avoid saunas, hot tubs, and heated car seats.',
    },
    scientificCitation: 'Human Reproduction (Oxford): Scrotal Hyperthermia & Meiotic DNA Fragmentation',
    keyMolecules: ['Ubiquinol CoQ10 200mg', 'Vitamin E (Mixed Tocopherols)', 'Lycopene 15mg'],
  },
  III: {
    phaseId: 'III',
    phaseName: 'Phase III: Spermiogenesis & Packaging',
    daysRange: 'Days 56–74',
    headline: 'Histone-to-Protamine Compaction & Acrosome Cap Assembly',
    cellularContext:
      'Round spermatids undergo radical morphogenesis: they shed somatic cytoplasm, replace histones with arginine-rich protamines to condense DNA by 90%, and construct the enzymatic acrosome hood.',
    dietAdvice: {
      heroNutrient: 'L-Arginine & Organic Selenoproteins',
      foodSources: 'Brazil nuts, almonds, pumpkin seeds, pastured turkey breast, and citrus.',
      actionableDiet:
        'Eat 2 Brazil nuts daily for whole-food selenium, and include arginine-dense proteins. Arginine constitutes over 50% of the protamines that pack your DNA into crystalline crystalline toroids.',
      checklist: [
        '2 raw Brazil nuts (Selenium for mitochondrial capsule)',
        'Arginine-dense snack (almonds or pumpkin seeds)',
        'Vitamin C (1000mg) for acrosome enzyme vesicle protection',
        '8+ hours sleep in cold darkness (melatonin ROS scavenging)',
      ],
    },
    lifestyleShield: {
      title: 'Nuclear Condensation & Melatonin Shield',
      guideline:
        'During spermiogenesis, Sertoli cells phagocytose residual cytoplasmic bodies. Peak nocturnal melatonin acts as a direct intratesticular antioxidant.',
      action: 'Sleep in a dark, 18°C (65°F) room to stimulate endogenous melatonin secretion.',
    },
    scientificCitation: 'Fertility & Sterility: Chromatin Protamination & Acrosomal Biogenesis',
    keyMolecules: ['Selenium 200mcg', 'L-Carnitine 2000mg', 'Vitamin C 1000mg', 'N-Acetyl Cysteine (NAC)'],
  },
  IV: {
    phaseId: 'IV',
    phaseName: 'Phase IV: Epididymal Motility & Transit',
    daysRange: 'Days 75–90',
    headline: 'Flagellar Hydrodynamics, Motility & Seminal Volume',
    cellularContext:
      'Sperm traverse the caput, corpus, and cauda epididymidis to acquire forward progressive rectilinear motility. Seminal vesicles and prostate gland fluid optimize liquefaction and buffer vaginal acidity.',
    dietAdvice: {
      heroNutrient: 'Omega-3 DHA & Seminal Hydration Matrix',
      foodSources: 'Wild Alaskan salmon, chia seeds, mineral-rich spring water, and lemon water.',
      actionableDiet:
        'Consume wild salmon or clean DHA algae oil. DHA incorporates into the flagellar plasma membrane, conferring the high mechanical fluidity needed for rapid progressive tail beat frequencies.',
      checklist: [
        '3.0 Liters total structured hydration for seminal volume',
        'Omega-3 DHA (1000mg) for tail membrane elasticity',
        'L-Carnitine Tartrate for mitochondrial beta-oxidation ATP',
        '2-3 day ejaculatory cadence to clear senescent sperm',
      ],
    },
    lifestyleShield: {
      title: 'Seminal Fluid Liquefaction & Hydration',
      guideline:
        'Dehydration directly reduces seminal vesicle volume (< 1.5 mL) and increases semen viscosity, trapping motile sperm in thick coagulum.',
      action: 'Track 3.0L daily water intake to ensure fertile seminal fluid volume and alkaline pH (> 7.2).',
    },
    scientificCitation: 'WHO Laboratory Manual 6th Edition: Progressive Motility & Epididymal Dynamics',
    keyMolecules: ['Omega-3 DHA 1000mg', 'L-Carnitine 2000mg', 'Hydration Electrolytes (Mg, K, Na)'],
  },
};

export const DailyWellnessTip: React.FC<DailyWellnessTipProps> = ({
  currentDay,
  currentPhase,
  onAskCoach,
  onXPBonus,
  onNavigateToNutrition,
}) => {
  // Determine user's active phase based on protocol day
  const defaultPhaseKey: 'I' | 'II' | 'III' | 'IV' =
    currentDay <= 25 ? 'I' : currentDay <= 55 ? 'II' : currentDay <= 74 ? 'III' : 'IV';

  const [selectedPhaseKey, setSelectedPhaseKey] = useState<'I' | 'II' | 'III' | 'IV'>(defaultPhaseKey);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    '1/2 cup wild blueberries or pure pomegranate': true,
    'Ubiquinol CoQ10 (200mg with healthy fat)': true,
  });
  const [isCompletedToday, setIsCompletedToday] = useState<boolean>(false);

  const activeTip = PHASE_TIPS[selectedPhaseKey];
  const isCurrentActivePhase = selectedPhaseKey === defaultPhaseKey;

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleCompleteTip = () => {
    setIsCompletedToday(true);
    if (onXPBonus) {
      onXPBonus(15);
    }
  };

  return (
    <div className="clinical-card-elevated p-5 sm:p-6 bg-gradient-to-br from-white via-[#fcfbf7] to-[#f5fbf8] border border-[#a4d0c0] space-y-4">
      {/* Header with Phase Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[#e6e4dd]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[#123d32] text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#5cba83]" />
            </span>
            <h3 className="font-bold text-base text-[#1b1c19]">
              Daily Biological Wellness Tip
            </h3>
            {isCurrentActivePhase && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] border border-[#a4d0c0]">
                Current Cycle Active
              </span>
            )}
          </div>
          <p className="text-xs text-[#5a6460] mt-0.5">
            Targeted cellular nutrition and lifestyle shielding calibrated to Day {currentDay} of your 90-day cycle.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#efeee9] p-1 rounded-full text-xs">
          {(['I', 'II', 'III', 'IV'] as const).map((pKey) => {
            const isSelected = selectedPhaseKey === pKey;
            const isUserPhase = defaultPhaseKey === pKey;
            return (
              <button
                key={pKey}
                onClick={() => setSelectedPhaseKey(pKey)}
                className={`px-3 py-1 rounded-full font-semibold transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#123d32] text-white shadow-xs'
                    : 'text-[#5a6460] hover:text-[#1b1c19] hover:bg-white/50'
                }`}
              >
                <span>Phase {pKey}</span>
                {isUserPhase && <span className="w-1.5 h-1.5 rounded-full bg-[#5cba83]"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Headline & Biological Phase Context */}
      <div className="p-3.5 bg-[#f5fbf8] border border-[#bfecdc] rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#006d40] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Zap className="w-3.5 h-3.5 text-[#5cba83]" />
            {activeTip.phaseName} ({activeTip.daysRange})
          </span>
          <span className="text-[11px] text-[#717975] font-mono">Day {currentDay}/90</span>
        </div>
        <h4 className="text-sm font-bold text-[#123d32]">{activeTip.headline}</h4>
        <p className="text-xs text-[#202b29] leading-relaxed">{activeTip.cellularContext}</p>
      </div>

      {/* Main Grid: Nutrition on Left & Lifestyle Shield on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Nutrition & Diet Advice */}
        <div className="p-4 bg-white border border-[#e6e4dd] rounded-xl space-y-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1b1c19]">
              <span className="p-1.5 rounded-lg bg-[#eaf6ee] text-[#006d40]">
                <Utensils className="w-3.5 h-3.5" />
              </span>
              <span>Targeted Dietary Protocol</span>
            </div>
            <div className="mt-2 text-xs text-[#123d32] font-semibold bg-[#faf9f4] p-2 rounded-lg border border-[#e6e4dd]">
              Key Catalyst: <span className="text-[#006d40] font-bold">{activeTip.dietAdvice.heroNutrient}</span>
            </div>
            <p className="text-[#5a6460] mt-2 leading-relaxed">
              {activeTip.dietAdvice.actionableDiet}
            </p>

            {/* Checklist */}
            <div className="mt-3 space-y-1.5 pt-2 border-t border-[#f5f4ef]">
              <span className="text-[11px] font-semibold text-[#1b1c19] block">
                Today's Phase Diet Checklist:
              </span>
              {activeTip.dietAdvice.checklist.map((item, idx) => {
                const isChecked = !!checkedItems[item];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(item)}
                    className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-[#faf9f4] transition-colors"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[#006d40] border-[#006d40] text-white'
                          : 'border-[#c0c8c4] bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <span
                      className={`text-xs ${
                        isChecked ? 'line-through text-[#717975]' : 'text-[#202b29]'
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#717975] flex items-center justify-between gap-1 border-t border-[#f5f4ef]">
            <div className="flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-[#5cba83]" />
              <span className="truncate">Whole Foods: {activeTip.dietAdvice.foodSources}</span>
            </div>
            {onNavigateToNutrition && (
              <button
                onClick={onNavigateToNutrition}
                className="text-[11px] font-bold text-[#006d40] hover:text-[#123d32] whitespace-nowrap flex items-center gap-0.5 ml-2 transition-colors"
              >
                <span>Bio-Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Lifestyle & Scrotal Temperature Shield */}
        <div className="p-4 bg-white border border-[#e6e4dd] rounded-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1b1c19]">
              <span className="p-1.5 rounded-lg bg-[#eaf6ee] text-[#006d40]">
                <ThermometerSnowflake className="w-3.5 h-3.5" />
              </span>
              <span>{activeTip.lifestyleShield.title}</span>
            </div>
            <p className="text-[#5a6460] mt-2 leading-relaxed">
              {activeTip.lifestyleShield.guideline}
            </p>

            <div className="mt-3 p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs space-y-1">
              <span className="font-semibold text-[#123d32] block">Actionable Habit:</span>
              <p className="text-[#202b29] font-medium">{activeTip.lifestyleShield.action}</p>
            </div>

            {/* Essential Shield Molecules */}
            <div className="mt-3 pt-2 border-t border-[#f5f4ef]">
              <span className="text-[11px] font-semibold text-[#1b1c19] block mb-1.5">
                Key Protocol Stack for this Stage:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTip.keyMolecules.map((mol, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#eaf6ee] border border-[#bfecdc] text-[10px] font-medium text-[#006d40]"
                  >
                    {mol}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-[#717975] flex items-center gap-1 italic border-t border-[#f5f4ef]">
            <BookOpen className="w-3 h-3 text-[#5cba83] shrink-0" />
            <span className="truncate">{activeTip.scientificCitation}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-[#e6e4dd] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {onAskCoach && (
            <button
              onClick={() =>
                onAskCoach(`Can you explain the detailed diet advice for ${activeTip.phaseName}?`)
              }
              className="text-[#123d32] hover:text-[#006d40] font-semibold flex items-center gap-1 underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask M-CARE AI about {activeTip.phaseName} Diet</span>
            </button>
          )}
        </div>

        <button
          onClick={handleCompleteTip}
          disabled={isCompletedToday}
          className={`px-4 py-2 rounded-full font-bold flex items-center gap-1.5 transition-all shadow-sm ${
            isCompletedToday
              ? 'bg-[#eaf6ee] text-[#006d40] border border-[#a4d0c0] cursor-default'
              : 'bg-[#123d32] hover:bg-[#1a4f41] text-white active:scale-98'
          }`}
        >
          {isCompletedToday ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#006d40]" />
              <span>Tip Applied Today (+15 XP)</span>
            </>
          ) : (
            <>
              <Flame className="w-3.5 h-3.5 text-[#5cba83]" />
              <span>Mark Tip Done (+15 XP)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
