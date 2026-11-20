import React, { useState } from 'react';
import { DailyCheckinData } from '../types';
import {
  Moon,
  Sun,
  Activity,
  Heart,
  Droplets,
  Pill,
  Sparkles,
  X,
  Check,
  Shield,
  EyeOff,
  ThermometerSnowflake,
  Smile,
  AlertCircle
} from 'lucide-react';

interface DailyCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DailyCheckinData) => void;
  onTriggerRedFlag: () => void;
}

export const DailyCheckinModal: React.FC<DailyCheckinModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onTriggerRedFlag,
}) => {
  const [sleepHours, setSleepHours] = useState<number>(8.2);
  const [sleepQuality, setSleepQuality] = useState<'Poor' | 'Fair' | 'Good' | 'Excellent'>('Excellent');
  const [scrotalCooling, setScrotalCooling] = useState<boolean>(true);
  const [heatAvoidance, setHeatAvoidance] = useState<boolean>(true);
  const [energyLevel, setEnergyLevel] = useState<number>(8);
  const [stressLevel, setStressLevel] = useState<number>(3);
  const [hydrationLiters, setHydrationLiters] = useState<number>(2.8);
  const [coq10, setCoq10] = useState<boolean>(true);
  const [zincSelenium, setZincSelenium] = useState<boolean>(true);
  const [vitaminD, setVitaminD] = useState<boolean>(true);
  const [lCarnitine, setLCarnitine] = useState<boolean>(true);

  // Sensitive private check-in section
  const [showPrivateSection, setShowPrivateSection] = useState<boolean>(true);
  const [testicularDiscomfort, setTesticularDiscomfort] = useState<'None' | 'Mild Dull Ache' | 'Sharp/Severe' | 'Swelling'>('None');
  const [morningErection, setMorningErection] = useState<'Absent' | 'Moderate' | 'Strong'>('Strong');
  const [libido, setLibido] = useState<'Low' | 'Moderate' | 'High'>('High');
  const [urinaryFlow, setUrinaryFlow] = useState<'Normal' | 'Hesitant/Weak' | 'Burning/Discomfort'>('Normal');
  const [notes, setNotes] = useState<string>('Feeling energized after 8h sleep. Continued scrotal cool wash routine post-workout.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user reported sharp/severe testicular pain
    if (testicularDiscomfort === 'Sharp/Severe' || testicularDiscomfort === 'Swelling') {
      onClose();
      onTriggerRedFlag();
      return;
    }

    const payload: DailyCheckinData = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sleepHours,
      sleepQuality,
      scrotalCoolingDone: scrotalCooling,
      heatAvoidanceAdhered: heatAvoidance,
      energyLevel,
      stressLevel,
      hydrationLiters,
      hydrationTarget: 3.0,
      exerciseMinutes: 45,
      exerciseType: 'Moderate Resistance + Walking',
      supplementsTaken: {
        coq10,
        zincSelenium,
        vitaminD3K2: vitaminD,
        lCarnitine,
        ashwagandha: false,
      },
      privateSymptoms: {
        testicularPainOrDiscomfort: testicularDiscomfort,
        morningErectionQuality: morningErection,
        libidoLevel: libido,
        urinaryFlow,
      },
      notes,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#e6e4dd] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#123d32] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5cba83]/20 rounded-full text-[#5cba83]">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Daily Biometric & Symptom Check-in</h3>
              <p className="text-xs text-[#a4d0c0]">Nurturing the 72-90 Day Spermatogenesis Cycle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-[#202b29]">
          {/* Sleep & Circadian Recovery */}
          <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1b1c19] flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#123d32]" />
                Sleep Duration & Circadian Recovery
              </span>
              <span className="font-mono font-bold text-sm text-[#123d32]">{sleepHours} hrs</span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="0.1"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#e6e4dd] rounded-lg appearance-none cursor-pointer accent-[#123d32]"
            />
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[#717975]">Quality:</span>
              {(['Poor', 'Fair', 'Good', 'Excellent'] as const).map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => setSleepQuality(q)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    sleepQuality === q
                      ? 'bg-[#123d32] text-white'
                      : 'bg-white border border-[#e6e4dd] text-[#5a6460]'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Scrotal Thermoregulation & Heat Defense */}
          <div className="p-4 bg-[#f5fbf8] border border-[#a4d0c0] rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#006d40]">
              <ThermometerSnowflake className="w-4 h-4" />
              <span>Scrotal Thermoregulation & Heat Defense</span>
            </div>
            <p className="text-[#5a6460] text-[11px]">
              Spermatogenesis requires an ideal temperature 2-3°C below core body temperature (~34.0°C).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <label className="flex items-center gap-2 p-2.5 bg-white border border-[#bfecdc] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={scrotalCooling}
                  onChange={(e) => setScrotalCooling(e.target.checked)}
                  className="rounded text-[#006d40] focus:ring-[#006d40] w-4 h-4"
                />
                <span className="text-xs">Post-workout cool rinse / loose cotton wear</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 bg-white border border-[#bfecdc] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={heatAvoidance}
                  onChange={(e) => setHeatAvoidance(e.target.checked)}
                  className="rounded text-[#006d40] focus:ring-[#006d40] w-4 h-4"
                />
                <span className="text-xs">Avoided saunas, hot tubs & laptops on lap</span>
              </label>
            </div>
          </div>

          {/* Hydration & Semen Volume */}
          <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1b1c19] flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#0284c7]" />
                Daily Hydration (Seminal Fluid Volume)
              </span>
              <span className="font-mono font-bold text-sm text-[#0284c7]">{hydrationLiters} / 3.0 L</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={hydrationLiters}
              onChange={(e) => setHydrationLiters(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#e6e4dd] rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
            />
          </div>

          {/* Antioxidant & Cellular Shield Supplements */}
          <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl space-y-2.5">
            <span className="font-bold text-sm text-[#1b1c19] flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#123d32]" />
              Targeted Male Antioxidant Stack Taken Today:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setCoq10(!coq10)}
                className={`p-2 rounded-lg text-center font-medium transition-colors border ${
                  coq10
                    ? 'bg-[#eaf6ee] border-[#006d40] text-[#006d40]'
                    : 'bg-white border-[#e6e4dd] text-[#717975]'
                }`}
              >
                CoQ10 (200mg) {coq10 ? '✓' : ''}
              </button>
              <button
                type="button"
                onClick={() => setZincSelenium(!zincSelenium)}
                className={`p-2 rounded-lg text-center font-medium transition-colors border ${
                  zincSelenium
                    ? 'bg-[#eaf6ee] border-[#006d40] text-[#006d40]'
                    : 'bg-white border-[#e6e4dd] text-[#717975]'
                }`}
              >
                Zn + Se {zincSelenium ? '✓' : ''}
              </button>
              <button
                type="button"
                onClick={() => setVitaminD(!vitaminD)}
                className={`p-2 rounded-lg text-center font-medium transition-colors border ${
                  vitaminD
                    ? 'bg-[#eaf6ee] border-[#006d40] text-[#006d40]'
                    : 'bg-white border-[#e6e4dd] text-[#717975]'
                }`}
              >
                Vit D3/K2 {vitaminD ? '✓' : ''}
              </button>
              <button
                type="button"
                onClick={() => setLCarnitine(!lCarnitine)}
                className={`p-2 rounded-lg text-center font-medium transition-colors border ${
                  lCarnitine
                    ? 'bg-[#eaf6ee] border-[#006d40] text-[#006d40]'
                    : 'bg-white border-[#e6e4dd] text-[#717975]'
                }`}
              >
                L-Carnitine {lCarnitine ? '✓' : ''}
              </button>
            </div>
          </div>

          {/* Optional Private Symptom Tracker */}
          <div className="p-4 bg-white border border-[#e6e4dd] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#123d32]" />
                <span className="font-bold text-sm text-[#1b1c19]">Optional Confidential Symptom & Reproductive Vigor</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivateSection(!showPrivateSection)}
                className="text-xs text-[#006d40] hover:underline"
              >
                {showPrivateSection ? 'Collapse' : 'Expand'}
              </button>
            </div>

            {showPrivateSection && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1b1c19] mb-1">
                    Testicular Discomfort or Sensation:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(['None', 'Mild Dull Ache', 'Sharp/Severe', 'Swelling'] as const).map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setTesticularDiscomfort(opt)}
                        className={`p-2 rounded-lg text-center text-xs font-medium transition-colors ${
                          testicularDiscomfort === opt
                            ? opt === 'Sharp/Severe' || opt === 'Swelling'
                              ? 'bg-[#ba1a1a] text-white font-bold'
                              : 'bg-[#123d32] text-white'
                            : 'bg-[#faf9f4] border border-[#e6e4dd] text-[#5a6460]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {(testicularDiscomfort === 'Sharp/Severe' || testicularDiscomfort === 'Swelling') && (
                    <div className="mt-2 text-[#93000a] bg-[#ffdad6] p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Warning: Acute testicular pain triggers the Red Flag Emergency evaluation.</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b1c19] mb-1">
                      Morning Erection Quality:
                    </label>
                    <div className="flex gap-1.5">
                      {(['Absent', 'Moderate', 'Strong'] as const).map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setMorningErection(m)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                            morningErection === m
                              ? 'bg-[#123d32] text-white'
                              : 'bg-[#faf9f4] border border-[#e6e4dd]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1b1c19] mb-1">
                      Urinary Stream & Comfort:
                    </label>
                    <div className="flex gap-1.5">
                      {(['Normal', 'Hesitant/Weak', 'Burning/Discomfort'] as const).map((u) => (
                        <button
                          type="button"
                          key={u}
                          onClick={() => setUrinaryFlow(u)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                            urinaryFlow === u
                              ? 'bg-[#123d32] text-white'
                              : 'bg-[#faf9f4] border border-[#e6e4dd]'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#1b1c19] mb-1">
              Personal Notes & Observations:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any changes noticed in stamina, workout recovery, or diet..."
              className="w-full p-2.5 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs outline-none focus:border-[#123d32]"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#e6e4dd] flex items-center justify-between">
            <span className="text-[11px] text-[#717975] flex items-center gap-1">
              <EyeOff className="w-3.5 h-3.5" />
              Isolated biometric storage
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold transition-all shadow-md active:scale-98"
            >
              Complete Today's Check-in & Extend Streak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
