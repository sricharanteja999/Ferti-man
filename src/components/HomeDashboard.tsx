import React, { useState } from 'react';
import { UserProfile, MetricStreak, MedicalRecord } from '../types';
import {
  AlertTriangle,
  Sun,
  Utensils,
  Plus,
  Thermometer,
  Moon,
  Zap,
  Activity,
  Droplet,
  Flame,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  ChevronRight,
  Shield,
  Lock,
  Info,
  Clock,
  Sparkles,
  Award,
  Video,
  BookOpen
} from 'lucide-react';

import { ReproductiveMetricsChart } from './ReproductiveMetricsChart';
import { DailyWellnessTip } from './DailyWellnessTip';

interface HomeDashboardProps {
  user: UserProfile;
  streaks: MetricStreak[];
  records: MedicalRecord[];
  onOpenCheckin: () => void;
  onOpenRedFlag: () => void;
  onNavigate: (tab: string) => void;
  onAddWater: () => void;
  onAskCoach?: (question: string) => void;
  onXPBonus?: (xp: number) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  streaks,
  records,
  onOpenCheckin,
  onOpenRedFlag,
  onNavigate,
  onAddWater,
  onAskCoach,
  onXPBonus,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(45); // in seconds
  const totalAudioDuration = 192; // 3:12 in seconds
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [careMessage, setCareMessage] = useState<string>('');
  const [messageSentNotice, setMessageSentNotice] = useState<boolean>(false);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendCareMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careMessage.trim()) return;
    setMessageSentNotice(true);
    setCareMessage('');
    setTimeout(() => {
      setMessageSentNotice(false);
      setShowMessageModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto pb-8">
      {/* 1. Urgent Guidance Red Banner */}
      <button
        onClick={onOpenRedFlag}
        className="w-full bg-[#ba1a1a] hover:bg-[#a01616] text-white text-xs font-semibold py-2.5 px-4 rounded-full flex items-center justify-between transition-colors shadow-sm"
      >
        <span className="flex items-center gap-2">
          <span>*</span>
          <span>Need urgent guidance? Tap for Red Flag Clinical Triage</span>
        </span>
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* 2. Clinical Alert Urgent Care Notice Card (Matching Image 12) */}
      <div className="p-4 bg-[#ffdad6]/60 border border-[#ffb4ab] rounded-2xl flex items-start gap-3 text-xs">
        <div className="p-2 bg-[#ba1a1a] text-white rounded-lg shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#93000a] uppercase tracking-wider text-[11px]">
              CLINICAL ALERT • Urgent Care Notice
            </span>
          </div>
          <p className="text-[#93000a] mt-0.5 text-xs font-medium leading-relaxed">
            Sudden testicular pain, acute unilateral swelling, or trauma requires immediate emergency evaluation.
          </p>
          <button
            onClick={onOpenRedFlag}
            className="text-[#93000a] font-bold underline mt-1.5 inline-flex items-center gap-1 hover:text-[#690005]"
          >
            Review Red Flag Triage →
          </button>
        </div>
      </div>

      {/* 3. Greeting & Protocol Day Header */}
      <div>
        <div className="text-xs text-[#5a6460] font-medium">Sunday, Day 24 of Protocol</div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
          <h1 className="text-3xl font-bold text-[#1b1c19] tracking-tight">
            Good morning, {user.name}
          </h1>
          <div className="inline-flex items-center gap-2 bg-[#eaf6ee] text-[#006d40] px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#a4d0c0] w-fit">
            <span className="w-2 h-2 rounded-full bg-[#5cba83]"></span>
            <span>Day {user.protocolDay} of 90-Day Cycle • {user.phase}</span>
          </div>
        </div>
      </div>

      {/* 4. Quick Action Logging Buttons */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <button
          onClick={onOpenCheckin}
          className="px-4 py-2 bg-white hover:bg-[#f5f4ef] text-[#123d32] border border-[#e6e4dd] rounded-full font-semibold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap active:scale-98"
        >
          <Sun className="w-4 h-4 text-[#5cba83]" />
          <span>+ Log Morning</span>
        </button>
        <button
          onClick={() => onNavigate('nutrition')}
          className="px-4 py-2 bg-white hover:bg-[#f5f4ef] text-[#123d32] border border-[#e6e4dd] rounded-full font-semibold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap active:scale-98"
        >
          <Utensils className="w-4 h-4 text-[#5cba83]" />
          <span>+ Log Nutrition</span>
        </button>
        <button
          onClick={onOpenCheckin}
          className="px-4 py-2 bg-white hover:bg-[#f5f4ef] text-[#123d32] border border-[#e6e4dd] rounded-full font-semibold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap active:scale-98"
        >
          <Activity className="w-4 h-4 text-[#5cba83]" />
          <span>+ Log Symptoms</span>
        </button>
      </div>

      {/* 5. Reproductive Index Card (Matching Image 12 with Circular Meter) */}
      <div className="clinical-card-elevated p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#eaf6ee] text-[#006d40]">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-lg text-[#1b1c19]">Reproductive Index</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-bold border border-[#a4d0c0]">
            {user.statusText}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Circular Gauge */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#efeee9"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#123d32"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - user.reproductiveIndex / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-[#1b1c19] tracking-tight">
                  {user.reproductiveIndex}
                </span>
                <span className="text-xs text-[#717975] font-semibold">/ 100</span>
              </div>
            </div>
          </div>

          {/* Biometric Breakdown Checklist */}
          <div className="sm:col-span-7 space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf9f4] border border-[#e6e4dd]">
              <span className="text-[#5a6460] flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#123d32]" />
                Sleep Rest
              </span>
              <span className="font-bold text-[#1b1c19] text-sm">{user.sleepHours} hrs</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf9f4] border border-[#e6e4dd]">
              <span className="text-[#5a6460] flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#006d40]" />
                Scrotal Temp
              </span>
              <div className="text-right">
                <span className="font-bold text-[#1b1c19] text-sm">{user.scrotalTemp}°C </span>
                <span className="text-[11px] text-[#006d40] font-semibold">(Optimal)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf9f4] border border-[#e6e4dd]">
              <span className="text-[#5a6460] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0284c7]" />
                Micronutrients
              </span>
              <span className="font-bold text-[#1b1c19] text-sm">{user.micronutrientsMet}% Met</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf9f4] border border-[#e6e4dd]">
              <span className="text-[#5a6460] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#006d40]" />
                Cortisol
              </span>
              <span className="font-bold text-[#006d40] text-sm">{user.cortisolStatus}</span>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <div className="pt-2 border-t border-[#f5f4ef] text-[11px] text-[#717975] flex items-start gap-1.5 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-[#5cba83] shrink-0 mt-0.5" />
          <span>
            Educational lifestyle score tracking cellular stress & circadian optimization. Not a replacement for a laboratory Semen Analysis (SFA).
          </span>
        </div>
      </div>

      {/* Context-Aware Daily Wellness Tip based on 90-day Phase */}
      <DailyWellnessTip
        currentDay={user.protocolDay}
        currentPhase={user.phase}
        onAskCoach={onAskCoach}
        onXPBonus={onXPBonus}
        onNavigateToNutrition={() => onNavigate('nutrition')}
      />

      {/* Interactive Recharts Line Graph for Semen Volume, Motility & DFI Trends */}
      <ReproductiveMetricsChart
        records={records}
        onNavigateToRecords={() => onNavigate('records')}
      />

      {/* 6. Spermatogenesis Cycle Tracker (Matching Image 12) */}
      <div className="clinical-card-elevated p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-[#eaf6ee] text-[#006d40]">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-base text-[#1b1c19]">Spermatogenesis Cycle</h3>
              <p className="text-xs text-[#717975]">Day {user.protocolDay} of ~74–90 Day Window</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('90-day')}
            className="text-xs font-bold text-[#123d32] hover:text-[#006d40] flex items-center gap-1 bg-[#eaf6ee] px-3 py-1.5 rounded-full"
          >
            <span>View 3D Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-[#efeee9] rounded-full overflow-hidden flex">
            <div
              className="bg-[#123d32] h-full"
              style={{ width: `${(user.protocolDay / 90) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-[#5a6460] font-medium pt-1">
            <span>Stem Spermatogonia</span>
            <span className="font-bold text-[#123d32] bg-[#eaf6ee] px-2 py-0.5 rounded">
              Current: Meiotic Maturation
            </span>
            <span>Epididymal Transit</span>
          </div>
        </div>

        {/* Why 90 Days Callout Box */}
        <div className="bg-[#00261e] text-white p-4 rounded-xl text-xs flex items-start gap-3">
          <div className="p-1.5 bg-[#5cba83]/20 rounded-full text-[#5cba83] shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="leading-relaxed">
            <strong className="block font-semibold text-[#a7f3d0] mb-0.5">Why 90 days?</strong>
            Full human spermatogenesis requires 72–90 days. Every clean meal, chilled sleep, and antioxidant shield today constitutes the cellular DNA of sperm matured 3 months from now.
          </div>
        </div>
      </div>

      {/* 7. Cellular Protection Streaks Grid (4/4 Active from Image 12) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#1b1c19]">Cellular Protection Streaks</h3>
          <span className="text-xs font-bold text-[#006d40] bg-[#eaf6ee] px-2.5 py-0.5 rounded-full">
            4/4 Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1: DNA Integrity */}
          <div className="clinical-card p-4 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#5a6460]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1b1c19]">
                <Flame className="w-4 h-4 text-[#ea580c]" />
                DNA Integrity
              </span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-[#1b1c19]">42</span>
              <span className="text-xs text-[#717975] ml-1">Days</span>
            </div>
            <div className="mt-1 text-[11px] text-[#5a6460]">
              <strong className="text-[#1b1c19] block">Zero Nicotine</strong>
              <span>ROS Protection High</span>
            </div>
          </div>

          {/* Card 2: Leydig Cells */}
          <div className="clinical-card p-4 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#5a6460]">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1b1c19]">
                <Droplet className="w-4 h-4 text-[#0284c7]" />
                Leydig Cells
              </span>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-[#1b1c19]">18</span>
              <span className="text-xs text-[#717975] ml-1">Days</span>
            </div>
            <div className="mt-1 text-[11px] text-[#5a6460]">
              <strong className="text-[#1b1c19] block">Sober & Moderate</strong>
              <span>Testosterone Shield</span>
            </div>
          </div>

          {/* Card 3: Zinc & Selenium */}
          <div className="clinical-card p-4 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1b1c19] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006d40]" />
                Logged Today
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#eaf6ee] text-[#006d40]">
                Completed
              </span>
            </div>
            <div className="mt-3">
              <span className="text-sm font-bold text-[#1b1c19]">Zinc & Selenium</span>
              <p className="text-[11px] text-[#5a6460] mt-0.5">Dose: 30mg Zn / 200mcg Se</p>
            </div>
          </div>

          {/* Card 4: Semen Volume Hydration */}
          <div className="clinical-card p-4 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1b1c19] flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-[#0284c7]" />
                Hydration
              </span>
              <button
                onClick={onAddWater}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd] transition-colors"
              >
                +250ml
              </button>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-[#1b1c19]">2.8</span>
              <span className="text-xs text-[#717975]"> / 3.0 L</span>
            </div>
            <div className="mt-1 text-[11px] text-[#5a6460]">
              <strong className="text-[#1b1c19] block">Semen Volume Hydration</strong>
              <span>93% Daily Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Today's Scientific Digest Audio Card (Matching Image 12) */}
      <div className="clinical-card p-5 bg-white space-y-3">
        <div className="flex items-center justify-between text-xs text-[#5a6460]">
          <span className="font-semibold text-[#123d32] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#5cba83]" />
            Today's Scientific Digest
          </span>
          <span>3 min audio</span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-xl bg-[#00261e] overflow-hidden shrink-0 flex items-center justify-center text-white">
            <img
              src="/assets/aistudio/Image_1_254fd6b6.jpeg"
              alt="Cellular Digest"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-[#1b1c19]">Antioxidant Defense against ROS</h4>
            <p className="text-xs text-[#5a6460] mt-0.5 line-clamp-2">
              How CoQ10, Vitamin E, and cold-soaking neutralize lipid peroxidation in immature meiotic spermatocytes.
            </p>
          </div>
        </div>

        {/* Audio Player Bar */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className="w-9 h-9 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white flex items-center justify-center transition-colors shrink-0 shadow-sm"
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-1.5 bg-[#efeee9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5cba83]"
                style={{ width: `${(audioProgress / totalAudioDuration) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-[11px] text-[#717975] font-mono">
            {formatTime(audioProgress)} / {formatTime(totalAudioDuration)}
          </span>
          <Volume2 className="w-4 h-4 text-[#717975]" />
        </div>
      </div>

            {/* 3D Anatomy & Clinical Pathology Atlas Spotlight Banner */}
      <div
        onClick={() => onNavigate("atlas")}
        className="clinical-card-elevated p-5 bg-[#071612] border border-[#1d4638] text-white rounded-2xl cursor-pointer hover:border-[#5cba83] transition-all group shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none bg-gradient-to-l from-[#5cba83] to-transparent"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#235848] shrink-0 bg-[#0e2820] flex items-center justify-center">
              <img
                src="/assets/aistudio/image_f37931d8.png"
                alt="3D Pathology Specimen"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5cba83] bg-[#123d32] px-2 py-0.5 rounded-full border border-[#235848]">
                  NEW • 3D Medical Atlas
                </span>
                <span className="text-xs text-[#a4d0c0] font-semibold">Interactive Pathology</span>
              </div>
              <h4 className="font-bold text-base text-white mt-1 group-hover:text-[#5cba83] transition-colors">
                Complete Male Reproductive Anatomy & Pathology Atlas
              </h4>
              <p className="text-xs text-[#94a3b8] mt-0.5 max-w-lg leading-relaxed">
                360° interactive models, prostate zonal pathology (BPH vs Adenocarcinoma), testicular torsion & varicocele morphs, and clinical triage.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button className="px-4 py-2 rounded-full bg-[#123d32] group-hover:bg-[#5cba83] group-hover:text-[#00261e] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5">
              <span>Open 3D Atlas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Male Fertility Flashcards Masterclass Banner */}
      <div
        onClick={() => onNavigate('flashcards')}
        className="clinical-card-elevated p-5 bg-gradient-to-r from-[#123d32] to-[#0a261e] text-white rounded-2xl cursor-pointer hover:border-[#5cba83] transition-all group shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#eaf6ee] text-[#006d40] rounded-xl shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7f3d0] bg-white/10 px-2 py-0.5 rounded">
                  Andrology Masterclass
                </span>
                <span className="text-xs text-[#a4d0c0] font-semibold">Spaced Repetition</span>
              </div>
              <h4 className="font-bold text-base text-white mt-1 group-hover:text-[#a7f3d0] transition-colors">
                Male Fertility & Andrology Flashcards
              </h4>
              <p className="text-xs text-[#cbd5e1] mt-0.5 max-w-md">
                3D flip cards decoding DNA fragmentation (DFI), Kruger strict morphology, varicocele cooling, and WHO 6th edition benchmarks.
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5cba83] group-hover:translate-x-1 transition-transform shrink-0 mt-3" />
        </div>
      </div>

      {/* 9. Assigned Reproductive Urologist Card (Matching Image 12) */}
      <div className="clinical-card-elevated p-5 bg-[#0a261e] text-white rounded-2xl space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-[#a7f3d0]">
            <span className="w-2 h-2 rounded-full bg-[#5cba83]"></span>
            <span>Reproductive Urologist Assigned</span>
          </span>
          <Shield className="w-4 h-4 text-[#5cba83]" />
        </div>

        <div className="flex items-center gap-3.5">
          <img
            src="/assets/aistudio/Image_9_0763f943.jpeg"
            alt="Dr. Julian Vance"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#5cba83]"
          />
          <div>
            <h4 className="font-bold text-base text-white">{user.assignedDoctor.name}</h4>
            <p className="text-xs text-[#a4d0c0]">{user.assignedDoctor.title} • {user.assignedDoctor.institution}</p>
            <p className="text-[11px] text-[#94a3b8] mt-0.5">Next Virtual Review: {user.assignedDoctor.nextReview}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onNavigate('doctors')}
            className="py-2.5 px-3 rounded-full bg-white hover:bg-slate-100 text-[#00261e] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-[#006d40]" />
            <span>Book Check-In</span>
          </button>
          <button
            onClick={() => setShowMessageModal(true)}
            className="py-2.5 px-3 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#235848]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#5cba83]" />
            <span>Message Care Team</span>
          </button>
        </div>
      </div>

      {/* Message Care Team Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e6e4dd] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e6e4dd]">
              <div>
                <h3 className="font-bold text-base text-[#1b1c19]">Message Care Team</h3>
                <p className="text-xs text-[#5a6460]">To: {user.assignedDoctor.name}</p>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="text-[#717975] hover:text-[#1b1c19]"
              >
                ✕
              </button>
            </div>

            {messageSentNotice ? (
              <div className="p-4 bg-[#eaf6ee] border border-[#a4d0c0] rounded-xl text-center text-xs text-[#004d2c] font-semibold">
                ✓ Message transmitted directly to Dr. Vance's clinical inbox. Average response: under 4 hours.
              </div>
            ) : (
              <form onSubmit={handleSendCareMessage} className="space-y-3">
                <textarea
                  rows={4}
                  value={careMessage}
                  onChange={(e) => setCareMessage(e.target.value)}
                  placeholder="Ask a non-urgent clinical question regarding your lab results, protocol dosage, or appointment..."
                  className="w-full p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs outline-none focus:border-[#123d32]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold transition-all shadow-md"
                >
                  Send Encrypted Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer HIPAA Security Notice */}
      <div className="text-center pt-2 text-[11px] text-[#717975] flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-[#5cba83]" />
        <span>End-to-End HIPAA Encrypted • Biometric Telemetry Isolated</span>
      </div>
    </div>
  );
};
