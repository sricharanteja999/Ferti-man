export interface UserProfile {
  name: string;
  age: number;
  protocolDay: number;
  phase: string;
  phaseRoman?: string;
  reproductiveIndex: number;
  statusText: string;
  scrotalTemp: number; // in Celsius
  sleepHours: number;
  micronutrientsMet: number; // percentage
  cortisolStatus: string;
  totalDays?: number;
  assignedDoctor: {
    name: string;
    title: string;
    institution: string;
    nextReview: string;
    avatar?: string;
    fee?: number;
  };
}

export interface MetricStreak {
  id: string;
  title?: string;
  label?: string;
  category: 'hydration' | 'scrotal_cooling' | 'antioxidants' | 'sleep' | 'movement' | string;
  days: number;
  targetDays?: number;
  target?: string;
  current?: string;
  sublabel: string;
  status?: 'active' | 'warning' | 'completed' | string;
  icon?: string;
  unit?: string;
}

export interface MedicalRecordFinding {
  parameter?: string;
  biomarker?: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  interpretation?: 'normal' | 'low' | 'high' | 'abnormal' | 'optimal' | string;
  status?: string;
  clinicalSignificance?: string;
  sourceDocId?: string;
  sourceDocName?: string;
  date?: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: string;
  date?: string;
  uploadDate?: string;
  examDate?: string;
  facility?: string;
  doctor?: string;
  status?: string;
  fileType?: string;
  fileSize?: string;
  findings?: MedicalRecordFinding[];
  extractedFindings?: {
    summary?: string;
    whatRecordsShow?: string;
    importantFindings?: string[];
    changesOverTime?: string;
    possibleHealthRisks?: string[];
    possibleRisks?: string[];
    missingInfo?: string[];
    missingInformation?: string[];
    traceabilityDoc?: string;
    confidence?: number | string;
    recommendedNextSteps?: string[];
    questionsForDoctor?: string[];
    keyValues?: Array<{
      parameter?: string;
      biomarker?: string;
      value: string;
      unit?: string;
      referenceRange?: string;
      interpretation?: 'normal' | 'low' | 'high' | 'abnormal' | 'optimal' | string;
      status?: string;
      clinicalSignificance?: string;
      sourceDocName?: string;
      sourceDocId?: string;
      date?: string;
    }>;
  };
  summary?: {
    whatRecordsShow?: string;
    importantFindings?: string[];
    changesOverTime?: string;
    possibleHealthRisks?: string[];
    missingInfo?: string[];
    recommendedNextSteps?: string[];
    questionsForDoctor?: string[];
  };
  rawText?: string;
  fileUrl?: string;
  verifiedByUser?: boolean;
}

export interface HealthAssessment {
  id: string;
  title: string;
  category: string;
  type?: string;
  urgency?: string;
  relevanceReason?: string;
  preparation?: string;
  supportingDetail?: string;
  completionScore?: number;
  status: string;
  frequency: string;
  estimatedMinutes: number;
  findingsSummary?: string;
  lastCompletedDate?: string;
  completedDate?: string;
  scoreSummary?: string;
  timeEstimate?: string;
  existingReportLinked?: string;
}

export interface DailyCheckinData {
  date?: string;
  sleepHours: number;
  sleepQuality?: string;
  scrotalCoolingMinutes?: number;
  scrotalCoolingDone?: boolean;
  heatAvoidanceAdhered?: boolean;
  energyLevel?: number | string;
  stressLevel?: number | string;
  hydrationLiters: number;
  hydrationTarget?: number;
  exerciseMinutes?: number;
  exerciseType?: string;
  supplementsTaken: {
    coq10: boolean;
    zincSelenium: boolean;
    carnitine?: boolean;
    lCarnitine?: boolean;
    omega3?: boolean;
    vitaminD3K2?: boolean;
    ashwagandha?: boolean;
    [key: string]: any;
  };
  symptomsReported?: string[];
  privateSymptoms?: {
    [key: string]: any;
  };
  notes?: string;
  [key: string]: any;
}

export interface FlashcardItem {
  id: string;
  category: 'Semen Analysis' | 'Anatomy & Physiology' | 'Lifestyle & Cooling' | 'Hormones & HPG' | 'Pathology & Red Flags';
  question: string;
  briefAnswer: string;
  clinicalDeepDive: string;
  whoStandard?: string;
  clinicalTip: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Clinical Expert';
  mastered?: boolean;
}

export interface MilestoneDay {
  day: number;
  phase?: string;
  phaseRoman?: string;
  phaseName?: string;
  title?: string;
  summary?: string;
  cellularEvent?: string;
  biologicalEvent?: string;
  cellularFocus?: string;
  spermStage?: string;
  expectedDFI?: string;
  motilityForecast?: string;
  antioxidantProtocol?: string;
  dailyChallenge?: string;
  lifestyleShield?: string;
  biomarkers?: string[];
}

// 3D Anatomy & Pathology Atlas Interfaces
export type AtlasOrganId = 
  | 'testis'
  | 'epididymis'
  | 'vas_deferens'
  | 'prostate'
  | 'seminal_vesicles'
  | 'urethra'
  | 'penis'
  | 'bladder'
  | 'pampiniform';

export type PathologyConditionId =
  | 'normal'
  | 'bph'
  | 'prostate_cancer'
  | 'prostatitis'
  | 'varicocele'
  | 'testicular_torsion'
  | 'hydrocele'
  | 'epididymitis'
  | 'testicular_tumor';

export interface OrganDetail {
  id: AtlasOrganId;
  name: string;
  system: 'External' | 'Internal' | 'Vascular & Ducts';
  normalRole: string;
  histology: string;
  arterialSupply: string;
  venousDrainage: string;
  innervation: string;
  lymphaticDrainage: string;
  clinicalSignificance: string;
  commonPathologies: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system" | string;
  text: string;
  timestamp: string;
  citations?: any[];
  recommendedActions?: string[];
  suggestedActions?: string[];
  isRedFlagWarning?: boolean;
  isUrgentEscalation?: boolean;
}

// Nutrition & Superfood Matrix Types
export interface TesticularSuperfood {
  id: string;
  name: string;
  scientificName: string;
  subtitle: string;
  category: 'testosterone' | 'count_mitosis' | 'motility' | 'dna_integrity' | 'vascular_perfusion';
  categoryLabel: string;
  heroNutrient: string;
  targetOrgan: string;
  targetCell: string;
  dailyDose: string;
  bestTime: string;
  bioactiveCompounds: string[];
  cellularMechanism: string;
  biomarkerImpact: Array<{
    label: string;
    change: string;
    positive: boolean;
  }>;
  consumptionTips: string;
  synergyPairing: string;
  scientificCitation: string;
  isHeroPillar: boolean; // True for the 4 core foods in reference: Pumpkin Seeds, Eggs, Ginger, Walnuts
  phaseRelevance: Array<'I' | 'II' | 'III' | 'IV'>;
  nutritionalValues: {
    zincMg: number;
    cholineMg: number;
    omega3Mg: number;
    antioxidantScore: number; // 0 - 100
    proteinG: number;
  };
}

export interface AnatomicalBioZone {
  id: string;
  name: string;
  subtitle: string;
  cellularType: string;
  primaryFunction: string;
  environmentalThreat: string;
  targetedNutrientShield: string;
  matchedFoodIds: string[];
}
