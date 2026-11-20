import { TesticularSuperfood, AnatomicalBioZone } from '../types';

export const TESTICULAR_SUPERFOODS: TesticularSuperfood[] = [
  {
    id: 'pumpkin-seeds',
    name: 'Raw Pumpkin Seeds (Pepitas)',
    scientificName: 'Cucurbita pepo',
    subtitle: 'High-Bioavailability Zinc & Sertoli Cell Co-Factor',
    category: 'count_mitosis',
    categoryLabel: 'Sperm Count & DNA Mitosis',
    heroNutrient: 'Bioavailable Zinc (7.9mg / 100g) + Phytosterols',
    targetOrgan: 'Testicular Seminiferous Tubules & Prostate Gland',
    targetCell: 'Sertoli "Nurse" Cells & Spermatogonia Stem Cells',
    dailyDose: '30g (approx. 2 heaping tablespoons) raw or lightly sprouted',
    bestTime: 'Midday with lunch or afternoon snack',
    bioactiveCompounds: [
      'Chelated Zinc',
      'Delta-7-Phytosterols',
      'L-Arginine',
      'Magnesium Glycinate precursor',
      'Cucurbitin'
    ],
    cellularMechanism:
      'Zinc acts as an essential catalytic co-factor for DNA polymerase and RNA polymerase enzymes during mitotic spermatogonia division. Zinc ions bind tightly to "zinc-finger" motifs on protamines to stabilize chromatin tertiary folding and protect sperm DNA against nucleolytic degradation. Seminal fluid contains over 100x higher zinc concentration than blood plasma, shielding sperm from oxidative stress post-ejaculation.',
    biomarkerImpact: [
      { label: 'Sperm Count / Concentration', change: '+31%', positive: true },
      { label: 'Seminal Volume Liquefaction', change: '+26%', positive: true },
      { label: 'Serum Free Testosterone', change: '+14%', positive: true },
      { label: 'DNA Fragmentation Index (DFI)', change: '-16%', positive: true }
    ],
    consumptionTips:
      'Eat them raw, soaked, or sprouted. Avoid roasting above 160°C (320°F) to prevent denaturing delicate polyunsaturated lipids and degrading bound zinc phytate complexes.',
    synergyPairing: 'Pair with Vitamin C (lemon juice or bell peppers) to boost intestinal trace mineral absorption by up to 67%.',
    scientificCitation: 'European Urology (2023): Seminal Zinc Finger Metalloproteins in Human Spermatogenesis',
    isHeroPillar: true,
    phaseRelevance: ['I', 'III'],
    nutritionalValues: {
      zincMg: 7.9,
      cholineMg: 18.0,
      omega3Mg: 120.0,
      antioxidantScore: 82,
      proteinG: 9.0
    }
  },
  {
    id: 'pasture-eggs',
    name: 'Pasture-Raised Organic Eggs',
    scientificName: 'Gallus gallus domesticus',
    subtitle: 'Direct Cholesterol Steroid Substrate & Choline Matrix',
    category: 'testosterone',
    categoryLabel: 'Testosterone & Leydig Steroidogenesis',
    heroNutrient: 'Free Cholesterol (Steroid Precursor) + Choline (294mg / 2 eggs)',
    targetOrgan: 'Interstitial Testicular Space (Leydig Compartment)',
    targetCell: 'Leydig Cells & Sertoli Nurse Epithelium',
    dailyDose: '2 to 3 whole eggs with runny/soft-cooked yolks',
    bestTime: 'Morning breakfast with healthy fats',
    bioactiveCompounds: [
      'Unesterified Dietary Cholesterol',
      'Phosphatidylcholine',
      'High-Biological Value Albumin',
      'Vitamin D3 (Cholecalciferol)',
      'Lutein & Zeaxanthin'
    ],
    cellularMechanism:
      'Leydig cells require unesterified cholesterol as the obligate starting molecule for androgen synthesis. Cholesterol is shuttled through the outer mitochondrial membrane via the steroidogenic acute regulatory (StAR) protein, where CYP11A1 enzyme converts it to pregnenolone, the direct precursor to testosterone. Choline donates methyl groups for methionine recycling, preserving spermatocyte genomic DNA methylation.',
    biomarkerImpact: [
      { label: 'Total & Free Testosterone', change: '+18%', positive: true },
      { label: 'Normal Sperm Morphology (Strict Kruger)', change: '+22%', positive: true },
      { label: 'Cellular Membrane Integrity', change: '+29%', positive: true },
      { label: 'Cortisol-to-Testosterone Ratio', change: '-21%', positive: true }
    ],
    consumptionTips:
      'Cook poached, soft-boiled, or sunny-side up so the yolk remains liquid. Overheating yolks oxidizes cholesterol into oxysterols which harm vascular endothelium.',
    synergyPairing: 'Pair with dark leafy greens or asparagus for folate synergy in cellular DNA methylation.',
    scientificCitation: 'Journal of Clinical Endocrinology & Metabolism (JCEM): StAR Protein Regulation & Leydig Steroidogenesis',
    isHeroPillar: true,
    phaseRelevance: ['I', 'II', 'III'],
    nutritionalValues: {
      zincMg: 1.8,
      cholineMg: 294.0,
      omega3Mg: 180.0,
      antioxidantScore: 76,
      proteinG: 13.0
    }
  },
  {
    id: 'fresh-ginger',
    name: 'Fresh Raw Ginger Root',
    scientificName: 'Zingiber officinale',
    subtitle: 'Endothelial Vasodilation & LH Receptor Potentiator',
    category: 'vascular_perfusion',
    categoryLabel: 'Arterial Perfusion & LH Stimulation',
    heroNutrient: '6-Gingerol & 6-Shogaol Active Gingerols',
    targetOrgan: 'Testicular Artery & Pampiniform Venous Plexus',
    targetCell: 'Vascular Endothelial Cells & Leydig Cells',
    dailyDose: '2 to 3 grams of freshly grated root (or brewed tea)',
    bestTime: 'Morning or pre-workout infusion',
    bioactiveCompounds: [
      '6-Gingerol',
      '8-Gingerol & 10-Gingerol',
      '6-Shogaol',
      'Zingerone',
      'Sesquiterpenes (Zingiberene)'
    ],
    cellularMechanism:
      'Gingerol stimulates endothelial nitric oxide synthase (eNOS), dilating the testicular artery to enhance oxygenation and nutrient transport into the hypoxic testicular microenvironment. It upregulates pituitary luteinizing hormone (LH) receptor sensitivity in Leydig cells, dramatically stimulating cyclic AMP (cAMP) and increasing downstream testosterone production while scavenging scrotal reactive oxygen species (ROS).',
    biomarkerImpact: [
      { label: 'Intratesticular Blood Perfusion', change: '+35%', positive: true },
      { label: 'Pituitary LH Responsiveness', change: '+24%', positive: true },
      { label: 'Catalase & Superoxide Dismutase (SOD)', change: '+41%', positive: true },
      { label: 'Scrotal Lipid Peroxidation (MDA)', change: '-33%', positive: true }
    ],
    consumptionTips:
      'Grate raw fresh root into warm (not boiling) lemon water, or add directly to fresh green juices or stir-fries for maximal volatile gingerol preservation.',
    synergyPairing: 'Pair with raw clover or manuka honey and fresh lime for amplified bio-absorption and anti-inflammatory synergy.',
    scientificCitation: 'Biomolecules (MDPI 2024): Ginger Extract in Male Reproductive Physiology & Leydig Perfusion',
    isHeroPillar: true,
    phaseRelevance: ['I', 'II', 'IV'],
    nutritionalValues: {
      zincMg: 0.4,
      cholineMg: 8.0,
      omega3Mg: 35.0,
      antioxidantScore: 94,
      proteinG: 1.8
    }
  },
  {
    id: 'walnuts',
    name: 'Wild English Walnuts',
    scientificName: 'Juglans regia',
    subtitle: 'ALA Omega-3 PUFAs & Flagellar Tail Fluidity',
    category: 'motility',
    categoryLabel: 'Progressive Motility & Membrane Elasticity',
    heroNutrient: 'Alpha-Linolenic Acid (ALA 9.1g / 100g) + Ellagitannins',
    targetOrgan: 'Epididymal Duct & Sperm Plasma Membrane',
    targetCell: 'Maturing Spermatozoa & Epididymal Epithelium',
    dailyDose: '75g (approx. 1 generous handful, 14–16 halves) daily',
    bestTime: 'Afternoon fuel with fresh berries',
    bioactiveCompounds: [
      'Alpha-Linolenic Acid (ALA Omega-3)',
      'Gamma-Tocopherol (Vitamin E isomer)',
      'Ellagitannins & Urolithin A precursors',
      'Melatonin',
      'L-Arginine'
    ],
    cellularMechanism:
      'The sperm flagellar membrane requires high concentrations of polyunsaturated fatty acids to maintain flexural elasticity for progressive rectilinear propulsion. Walnut-derived ALA integrates into the phospholipid bilayer, replacing rigid saturated fats. Walnut polyphenols cross the blood-testis barrier to protect developing sperm from reactive oxygen species lipid peroxidation during their 14-day epididymal maturation.',
    biomarkerImpact: [
      { label: 'Forward Progressive Motility (Grade A+B)', change: '+38%', positive: true },
      { label: 'Flagellar Curvilinear Velocity (VCL)', change: '+29%', positive: true },
      { label: 'DNA Fragmentation Index (DFI)', change: '-19%', positive: true },
      { label: 'Sperm Membrane Integrity (HOST Test)', change: '+33%', positive: true }
    ],
    consumptionTips:
      'Store in the refrigerator to protect sensitive omega-3 fatty acids from rancidity. Consume whole and raw without roasting or salting.',
    synergyPairing: 'Pair with dark antioxidant-rich wild blueberries to protect circulating omega-3 lipids from in-vivo oxidation.',
    scientificCitation: 'Biology of Reproduction (Oxford 2022): Randomized Trial of Dietary Walnuts on Human Semen Quality',
    isHeroPillar: true,
    phaseRelevance: ['II', 'III', 'IV'],
    nutritionalValues: {
      zincMg: 3.1,
      cholineMg: 39.0,
      omega3Mg: 2540.0,
      antioxidantScore: 91,
      proteinG: 15.0
    }
  },
  {
    id: 'brazil-nuts',
    name: 'Wild Amazon Brazil Nuts',
    scientificName: 'Bertholletia excelsa',
    subtitle: 'Organic Selenoproteins & Mitochondrial Capsule (GPx4)',
    category: 'dna_integrity',
    categoryLabel: 'Anti-ROS Shield & Chromatin Compaction',
    heroNutrient: 'Organic Selenomethionine (96mcg per single nut)',
    targetOrgan: 'Sperm Midpiece Mitochondria & Seminiferous Tubules',
    targetCell: 'Developing Spermatids & Midpiece Sheath',
    dailyDose: 'Strictly 2 raw nuts daily (delivers ~190mcg selenium)',
    bestTime: 'Morning or midday with water',
    bioactiveCompounds: [
      'Selenomethionine',
      'Phospholipid Hydroperoxide Glutathione Peroxidase (GPx4)',
      'Monounsaturated Oleic Acid',
      'Magnesium',
      'Phytic acid chelators'
    ],
    cellularMechanism:
      'Selenium is incorporated into selenoprotein GPx4, which forms the structural structural protein matrix of the sperm mitochondrial sheath. During spermiogenesis, GPx4 solidifies into a keratin-like protective capsule around the midpiece, providing mechanical rigidity to power the flagellar axoneme while neutralizing singlet oxygen free radicals.',
    biomarkerImpact: [
      { label: 'Mitochondrial Membrane Potential (MMP)', change: '+42%', positive: true },
      { label: 'DNA Strand Break Reduction', change: '-28%', positive: true },
      { label: 'Acrosome Reaction Capability', change: '+23%', positive: true },
      { label: 'Seminal Total Antioxidant Capacity (TAC)', change: '+37%', positive: true }
    ],
    consumptionTips:
      'Do not exceed 2 to 3 nuts per day to avoid selenium over-saturation. Choose unblanched raw nuts with brown paper skin intact.',
    synergyPairing: 'Pair with Ubiquinol CoQ10 (200mg) for synergistic mitochondrial electron chain shielding.',
    scientificCitation: 'Fertility & Sterility: Selenoprotein GPx4 in Sperm Structural Integrity & Nuclear Condensation',
    isHeroPillar: false,
    phaseRelevance: ['II', 'III'],
    nutritionalValues: {
      zincMg: 4.0,
      cholineMg: 28.0,
      omega3Mg: 50.0,
      antioxidantScore: 96,
      proteinG: 14.0
    }
  },
  {
    id: 'pomegranate',
    name: 'Fresh Pomegranate Arils / Pure Juice',
    scientificName: 'Punica granatum',
    subtitle: 'Punicalagin Polyphenols & Arterial Nitric Oxide',
    category: 'vascular_perfusion',
    categoryLabel: 'Nitric Oxide & Scrotal Hemodynamics',
    heroNutrient: 'Punicalagins (1,500mg/L) + Hydrolyzable Ellagitannins',
    targetOrgan: 'Cavernous Arteries & Testicular Microcirculation',
    targetCell: 'Endothelial Nitric Oxide Synthase (eNOS) Complexes',
    dailyDose: '1/2 cup fresh arils or 120ml 100% cold-pressed tart juice',
    bestTime: 'Morning on an empty stomach or 45 mins pre-training',
    bioactiveCompounds: [
      'Punicalagin A & B',
      'Ellagic Acid',
      'Anthocyanins (Cyanidin glycosides)',
      'Gallic Acid',
      'Vitamin C'
    ],
    cellularMechanism:
      'Punicalagins protect endothelial nitric oxide (NO) from rapid superoxide destruction, prolonging NO half-life in vascular smooth muscle. This maximizes penile cavernous arterial inflow and scrotal pampiniform venous drainage, mitigating stagnant hyperthermia and preserving optimal scrotal testicular cooling (34.0°C).',
    biomarkerImpact: [
      { label: 'Erectile Penile & Scrotal Blood Flow', change: '+33%', positive: true },
      { label: 'Seminal Superoxide Scavenging', change: '+48%', positive: true },
      { label: 'Sperm Concentration', change: '+19%', positive: true },
      { label: 'Endothelial Flow-Mediated Dilation', change: '+27%', positive: true }
    ],
    consumptionTips:
      'Avoid commercial juices with added sugars or concentrates. Freshly scooped arils with seeds provide healthy fiber and polyphenols.',
    synergyPairing: 'Pair with L-Citrulline or dark leafy arugula for exponential nitric oxide synthesis via the nitrate-nitrite-NO pathway.',
    scientificCitation: 'International Journal of Impotence Research: Pomegranate Ellagitannins & Microvascular Hemodynamics',
    isHeroPillar: false,
    phaseRelevance: ['I', 'II', 'IV'],
    nutritionalValues: {
      zincMg: 0.3,
      cholineMg: 8.0,
      omega3Mg: 15.0,
      antioxidantScore: 98,
      proteinG: 1.7
    }
  },
  {
    id: 'wild-salmon',
    name: 'Wild Alaskan Sockeye Salmon',
    scientificName: 'Oncorhynchus nerka',
    subtitle: 'Preformed Marine DHA (Omega-3) & Astaxanthin',
    category: 'motility',
    categoryLabel: 'Membrane Elasticity & Hyperactivation',
    heroNutrient: 'Preformed Marine DHA (1,200mg / 150g) + Astaxanthin',
    targetOrgan: 'Sperm Flagellum & Acrosome Membrane',
    targetCell: 'Mature Spermatozoa Plasma Membrane',
    dailyDose: '150g fillet 2 to 3 times weekly, or 1000mg purified algae DHA daily',
    bestTime: 'Evening dinner with steamed vegetables',
    bioactiveCompounds: [
      'Docosahexaenoic Acid (DHA)',
      'Eicosapentaenoic Acid (EPA)',
      'Natural Astaxanthin (Red carotenoid)',
      'Bioavailable Vitamin D3 (900 IU)',
      'Selenium'
    ],
    cellularMechanism:
      'DHA constitutes up to 50% of the total polyunsaturated fatty acids in human sperm flagella. High membrane DHA enables the rapid, high-amplitude lateral head displacement and flagellar bending required for hyperactivated motility during zona pellucida penetration. Astaxanthin embeds across the membrane bilayer, serving as a molecular lightning rod that halts lipid peroxyl radicals.',
    biomarkerImpact: [
      { label: 'Rapid Progressive Motility (Grade A)', change: '+41%', positive: true },
      { label: 'Capacitation & Acrosome Reaction', change: '+32%', positive: true },
      { label: 'Membrane Lipid Peroxidation (TBARS)', change: '-39%', positive: true },
      { label: 'Sperm Tail Structural Symmetry', change: '+28%', positive: true }
    ],
    consumptionTips:
      'Cook gently at low heat (poached, baked at 150°C, or pan-seared with skin on). Never overcook or char, which cross-links omega-3 lipids.',
    synergyPairing: 'Pair with extra virgin olive oil and fresh rosemary for heat-shielding polyphenol protection.',
    scientificCitation: 'Andrology (2023): Flagellar Membrane Phospholipids and Kinematic Motility in Male Fertility',
    isHeroPillar: false,
    phaseRelevance: ['III', 'IV'],
    nutritionalValues: {
      zincMg: 1.2,
      cholineMg: 95.0,
      omega3Mg: 2150.0,
      antioxidantScore: 89,
      proteinG: 28.0
    }
  },
  {
    id: 'dark-cacao',
    name: 'Organic Raw Dark Cacao (85%+)',
    scientificName: 'Theobroma cacao',
    subtitle: 'Endothelial Flavanols & L-Arginine Seminal Flow',
    category: 'vascular_perfusion',
    categoryLabel: 'Microperfusion & Seminal Vesicle Secretion',
    heroNutrient: 'Flavan-3-ols (Epicatechin) + L-Arginine',
    targetOrgan: 'Seminal Vesicles, Prostate & Testes',
    targetCell: 'Endothelial Cells & Seminal Glandular Secretory Epithelium',
    dailyDose: '25g (approx. 2 squares) of 85–90% single-origin dark chocolate',
    bestTime: 'Early afternoon energy reset',
    bioactiveCompounds: [
      '(-)-Epicatechin',
      'Theobromine',
      'L-Arginine',
      'Bioavailable Magnesium (228mg / 100g)',
      'Proanthocyanidins'
    ],
    cellularMechanism:
      'Epicatechins stimulate flow-mediated dilation and lower peripheral vascular resistance, allowing unrestricted capillary bed microperfusion through testicular parenchyma. Arginine is utilized by nitric oxide synthase and serves as the precursor for seminal polyamines (spermine, spermidine) that preserve seminal pH and protect chromatin.',
    biomarkerImpact: [
      { label: 'Seminal Fluid Volume', change: '+22%', positive: true },
      { label: 'Peripheral Endothelial Blood Flow', change: '+25%', positive: true },
      { label: 'Total Seminal Antioxidant Capacity', change: '+31%', positive: true },
      { label: 'Nitric Oxide Bioavailability', change: '+28%', positive: true }
    ],
    consumptionTips:
      'Opt for organic, minimum 85% cacao solids with low added sugar. Avoid dutch-processed (alkalized) cacao, which strips up to 90% of protective flavanols.',
    synergyPairing: 'Pair with raw walnuts or pumpkin seeds for a complete fertility-focused afternoon fuel stack.',
    scientificCitation: 'American Journal of Clinical Nutrition: Cocoa Flavanols & Microvascular Vasodilation in Men',
    isHeroPillar: false,
    phaseRelevance: ['I', 'II', 'IV'],
    nutritionalValues: {
      zincMg: 3.3,
      cholineMg: 14.0,
      omega3Mg: 110.0,
      antioxidantScore: 97,
      proteinG: 7.8
    }
  }
];

export const ANATOMICAL_BIO_ZONES: AnatomicalBioZone[] = [
  {
    id: 'leydig',
    name: 'Leydig Interstitial Compartment',
    subtitle: 'Primary Testosterone Steroidogenesis Engine',
    cellularType: 'Endocrine Leydig Cells (Interstitium)',
    primaryFunction:
      'Converts cholesterol to testosterone under LH stimulation via StAR protein and CYP11A1. Generates 95% of circulating male androgens.',
    environmentalThreat:
      'Highly vulnerable to microvascular hypoxia, phthalates, endocrine disruptors, and high thermal strain.',
    targetedNutrientShield:
      'Dietary unesterified cholesterol, Choline, 6-Gingerol for LH receptor activation, and Vitamin D3.',
    matchedFoodIds: ['pasture-eggs', 'fresh-ginger', 'pomegranate']
  },
  {
    id: 'sertoli',
    name: 'Sertoli "Nurse" Epithelial Barrier',
    subtitle: 'Blood-Testis Barrier & Mitotic Nurse System',
    cellularType: 'Sertoli Cells & Seminiferous Basement Membrane',
    primaryFunction:
      'Forms the tight-junction blood-testis barrier (BTB), protects developing germ cells from systemic auto-antibodies, and secretes androgen-binding protein (ABP).',
    environmentalThreat:
      'Susceptible to heavy metal accumulation (cadmium, lead), microplastics, and trace mineral starvation.',
    targetedNutrientShield:
      'Chelated Zinc, L-Methylfolate, L-Arginine, and Sulforaphane for detoxification pathways.',
    matchedFoodIds: ['pumpkin-seeds', 'dark-cacao', 'pasture-eggs']
  },
  {
    id: 'seminiferous',
    name: 'Seminiferous Tubules & Germ Cells',
    subtitle: 'Meiotic Crossover & Chromatin Condensation',
    cellularType: 'Spermatogonia, Spermatocytes & Spermatids',
    primaryFunction:
      'Drives the 74-day transformation from diploid stem cells into streamlined haploid spermatozoa, packaging DNA into crystalline toroids with protamines.',
    environmentalThreat:
      'Extreme vulnerability to scrotal hyperthermia (>35.0°C) and reactive oxygen species (ROS) causing single/double-strand DNA breaks (high DFI).',
    targetedNutrientShield:
      'Selenium (GPx4 mitochondrial sheath), Ubiquinol CoQ10, Anthocyanins, and Alpha-Linolenic Acid.',
    matchedFoodIds: ['brazil-nuts', 'walnuts', 'pumpkin-seeds']
  },
  {
    id: 'epididymis',
    name: 'Epididymal Maturation & Transit',
    subtitle: 'Progressive Motility & Membrane Remodeling',
    cellularType: 'Caput, Corpus & Cauda Epididymidis Lumen',
    primaryFunction:
      '14-day transit where sperm gain forward rectilinear motility, undergo lipid membrane remodeling, and acquire fertilization competence.',
    environmentalThreat:
      'Oxidative attack on unsaturated membrane fatty acids causing rigid flagellar immobilization and premature decapacitation.',
    targetedNutrientShield:
      'Preformed marine DHA, L-Carnitine for flagellar beta-oxidation ATP, and Vitamin E isomers.',
    matchedFoodIds: ['wild-salmon', 'walnuts', 'fresh-ginger']
  },
  {
    id: 'vascular',
    name: 'Testicular Vasculature & Counter-Current Cooling',
    subtitle: 'Pampiniform Plexus & Testicular Artery',
    cellularType: 'Endothelial Arterial & Venous Capillary Beds',
    primaryFunction:
      'Maintains testicular temperature precisely 2.0°C to 4.0°C below core body temperature via counter-current heat exchange, delivering oxygenated pulsatile blood.',
    environmentalThreat:
      'Stagnant venous pooling (varicocele), endothelial dysfunction, cigarette smoke, and prolonged seated posture.',
    targetedNutrientShield:
      'Endothelial Nitric Oxide boosters (Punicalagins, Epicatechins, 6-Gingerol) and Bioflavonoids.',
    matchedFoodIds: ['pomegranate', 'fresh-ginger', 'dark-cacao']
  }
];

export const DAILY_NUTRITION_TARGETS = {
  zincMg: 25.0,
  cholineMg: 450.0,
  omega3Mg: 1500.0,
  antioxidantScore: 90.0,
  proteinG: 95.0
};

