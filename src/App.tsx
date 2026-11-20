import React, { useState, useEffect } from 'react';
import { UserProfile, MetricStreak, MedicalRecord, HealthAssessment, DailyCheckinData } from './types';
import { initialUser, initialStreaks, initialRecords, initialAssessments } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { Sperm3DViewer } from './components/Sperm3DViewer';
import { MedicalRecordsSection } from './components/MedicalRecordsSection';
import { AssessmentsSection } from './components/AssessmentsSection';
import { AICoachSection } from './components/AICoachSection';
import { StreaksRewardsSection } from './components/StreaksRewardsSection';
import { ClinicalConsultSection } from './components/ClinicalConsultSection';
import { PrivacySection } from './components/PrivacySection';
import { FertilityFlashcards } from './components/FertilityFlashcards';
import { Complete3DAtlasSection } from './components/Complete3DAtlasSection';
import { NutritionSection } from './components/NutritionSection';
import { RedFlagModal } from './components/RedFlagModal';
import { DailyCheckinModal } from './components/DailyCheckinModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [streaks, setStreaks] = useState<MetricStreak[]>(initialStreaks);
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [assessments, setAssessments] = useState<HealthAssessment[]>(initialAssessments);
  const [currentDay, setCurrentDay] = useState<number>(24);

  // Modals
  const [isCheckinOpen, setIsCheckinOpen] = useState<boolean>(false);
  const [isRedFlagOpen, setIsRedFlagOpen] = useState<boolean>(false);

  // Sync protocol day
  const handleDayChange = (day: number) => {
    setCurrentDay(day);
    setUser((prev) => ({
      ...prev,
      protocolDay: day,
      phase:
        day <= 25
          ? 'Phase I: Spermatogonia Proliferation'
          : day <= 55
          ? 'Phase II: Meiosis & Genetic Crossover'
          : day <= 74
          ? 'Phase III: Spermiogenesis & Packaging'
          : 'Phase IV: Epididymal Transit & Motility',
    }));
  };

  const handleAddWater = () => {
    setStreaks((prev) =>
      prev.map((s) => {
        if (s.id === 'hydration') {
          const nextVal = Math.min(3.0, Math.round(((s.days || 2.8) + 0.25) * 10) / 10);
          return {
            ...s,
            days: nextVal,
            current: `${nextVal} / 3.0 L`,
            sublabel: `${Math.round((nextVal / 3.0) * 100)}% Daily Target Reached`,
          };
        }
        return s;
      })
    );
  };

  const handleExtendStreak = (streakId: string) => {
    setStreaks((prev) =>
      prev.map((s) => (s.id === streakId ? { ...s, days: s.days + 1 } : s))
    );
  };

  const handleAddRecord = (newRec: MedicalRecord) => {
    setRecords((prev) => [newRec, ...prev]);
    // Also adjust user reproductive index slightly as fresh positive data comes in
    setUser((prev) => ({
      ...prev,
      reproductiveIndex: Math.min(96, prev.reproductiveIndex + 2),
    }));
  };

  const handleUpdateRecord = (updated: MedicalRecord) => {
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleUpdateAssessment = (updated: HealthAssessment) => {
    setAssessments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleSaveCheckin = (data: DailyCheckinData) => {
    setUser((prev) => ({
      ...prev,
      sleepHours: data.sleepHours,
      micronutrientsMet: data.supplementsTaken.coq10 && data.supplementsTaken.zincSelenium ? 95 : 85,
      reproductiveIndex: Math.min(95, prev.reproductiveIndex + 1),
    }));
    // Update hydration streak
    setStreaks((prev) =>
      prev.map((s) => {
        if (s.id === 'hydration') {
          return {
            ...s,
            days: data.hydrationLiters,
            current: `${data.hydrationLiters} / 3.0 L`,
            sublabel: `${Math.round((data.hydrationLiters / 3.0) * 100)}% Daily Target Reached`,
          };
        }
        return s;
      })
    );
  };

  const handleClearData = () => {
    setRecords([]);
    alert('All local clinical records and telemetry cleared.');
  };

  return (
    <div className="min-h-screen bg-[#faf9f4] text-[#1b1c19] flex flex-col font-sans selection:bg-[#5cba83]/20">
      {/* Top Header */}
      <Header
        user={user}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onOpenRedFlag={() => setIsRedFlagOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 mb-16 md:mb-6">
        {/* TAB 1: Home Dashboard */}
        {activeTab === 'home' && (
          <HomeDashboard
            user={user}
            streaks={streaks}
            records={records}
            onOpenCheckin={() => setIsCheckinOpen(true)}
            onOpenRedFlag={() => setIsRedFlagOpen(true)}
            onNavigate={setActiveTab}
            onAddWater={handleAddWater}
            onAskCoach={(q) => {
              setActiveTab('ai-coach');
            }}
            onXPBonus={(xp) => {
              // celebratory feedback
            }}
          />
        )}

        {/* TAB: Testicular Nutrition & Superfood Bio-Matrix */}
        {activeTab === 'nutrition' && (
          <NutritionSection
            user={user}
            currentDay={currentDay}
            onAskCoach={(q) => {
              setActiveTab('ai-coach');
            }}
            onLogNutrition={(xp) => {
              setUser((prev) => ({
                ...prev,
                micronutrientsMet: Math.min(98, prev.micronutrientsMet + 6),
                reproductiveIndex: Math.min(96, prev.reproductiveIndex + 1),
              }));
            }}
          />
        )}

                {/* TAB: Complete 3D Male Reproductive Anatomy & Pathology Atlas */}
        {activeTab === "atlas" && (
          <Complete3DAtlasSection
            onTriggerRedFlag={() => setIsRedFlagOpen(true)}
            onNavigateToRecords={() => setActiveTab("records")}
            onAskCoach={(q) => setActiveTab("ai-coach")}
          />
        )}

        {/* TAB 2: 3D 90-Day Challenge & Spermatogenesis Roadmap */}
        {activeTab === '90-day' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-semibold">
                  3D Cellular Architecture & Longevity
                </span>
                <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">
                  90-Day Spermatogenesis & Sperm Cellular Roadmap
                </h2>
                <p className="text-sm text-[#5a6460]">
                  Human spermatogenesis requires ~72 to 90 days. Scrub through each developmental stage to inspect the cellular transformation in 3D.
                </p>
              </div>
            </div>

            {/* The 3D Viewer */}
            <Sperm3DViewer currentDay={currentDay} onDayChange={handleDayChange} />

            {/* 90-Day Challenge Milestone Cards */}
            <div className="mt-6">
              <h3 className="font-bold text-base text-[#1b1c19] mb-3">
                Key Spermatogenesis Chronological Milestones
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    phase: 'Phase I (Days 1–25)',
                    title: 'Mitosis & Sertoli Barrier',
                    desc: 'Stem cells divide along basement membrane. Extreme vulnerability to heavy metals, BPA, and fever.',
                    focus: 'DNA Integrity & Zero Nicotine',
                    day: 1,
                  },
                  {
                    phase: 'Phase II (Days 26–55)',
                    title: 'Meiosis & Chromosome Crossover',
                    desc: 'Haploid genome creation. High susceptibility to scrotal heat and oxidative stress.',
                    focus: 'CoQ10 + Scrotal Cooling',
                    day: 24,
                  },
                  {
                    phase: 'Phase III (Days 56–74)',
                    title: 'Spermiogenesis & Packaging',
                    desc: 'Histone-to-protamine transition, acrosome cap formation, and flagellar elongation.',
                    focus: 'Zinc Fingers & Selenium',
                    day: 60,
                  },
                  {
                    phase: 'Phase IV (Days 75–90)',
                    title: 'Epididymal Maturation',
                    desc: 'Forward progressive motility acquired. Membrane lipid remodeling for fertilization capacity.',
                    focus: 'Seminal Volume & Peak Motility',
                    day: 90,
                  },
                ].map((item, idx) => {
                  const isCurrent = currentDay >= item.day && (idx === 3 || currentDay < [26, 56, 75][idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleDayChange(item.day)}
                      className={`clinical-card p-4.5 cursor-pointer transition-all ${
                        isCurrent
                          ? 'border-2 border-[#123d32] bg-white shadow-md'
                          : 'bg-white hover:border-[#5cba83]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#006d40]">{item.phase}</span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-[#123d32] text-white text-[10px] font-bold">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-[#1b1c19] mt-1">{item.title}</h4>
                      <p className="text-xs text-[#5a6460] mt-1 leading-relaxed">{item.desc}</p>
                      <div className="mt-3 pt-2 border-t border-[#f5f4ef] text-[11px] text-[#123d32] font-semibold">
                        ★ Shield: {item.focus}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Medical Records Upload & AI Analysis */}
        {activeTab === 'records' && (
          <MedicalRecordsSection
            records={records}
            onAddRecord={handleAddRecord}
            onUpdateRecord={handleUpdateRecord}
          />
        )}

        {/* TAB 4: Assessments & Preventive Screening */}
        {activeTab === 'assessments' && (
          <AssessmentsSection
            assessments={assessments}
            onUpdateAssessment={handleUpdateAssessment}
          />
        )}

        {/* TAB: Male Fertility Flashcards Masterclass */}
        {activeTab === 'flashcards' && (
          <FertilityFlashcards
            onEarnXP={(xp) => {
              // XP bonus
            }}
            onAskCoach={(q) => {
              setActiveTab('ai-coach');
            }}
          />
        )}

        {/* TAB 5: AI Health Coach (M-CARE AI) */}
        {activeTab === 'ai-coach' && (
          <AICoachSection
            user={user}
            records={records}
            onTriggerRedFlag={() => setIsRedFlagOpen(true)}
          />
        )}

        {/* TAB 6: Streaks, Rewards & Gamification */}
        {activeTab === 'streaks' && (
          <StreaksRewardsSection
            streaks={streaks}
            currentDay={currentDay}
            onExtendStreak={handleExtendStreak}
          />
        )}

        {/* TAB 7: Clinical Consult Portal & Virtual Triage */}
        {activeTab === 'doctors' && (
          <ClinicalConsultSection onTriggerRedFlag={() => setIsRedFlagOpen(true)} />
        )}

        {/* TAB 8: Profile & Privacy Governance */}
        {activeTab === 'profile' && (
          <PrivacySection user={user} records={records} onClearData={handleClearData} />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <Navigation activeTab={activeTab} onNavigate={setActiveTab} />

      {/* Red Flag Emergency Triage Modal */}
      <RedFlagModal isOpen={isRedFlagOpen} onClose={() => setIsRedFlagOpen(false)} />

      {/* Daily Check-in Modal */}
      <DailyCheckinModal
        isOpen={isCheckinOpen}
        onClose={() => setIsCheckinOpen(false)}
        onSave={handleSaveCheckin}
        onTriggerRedFlag={() => setIsRedFlagOpen(true)}
      />
    </div>
  );
}
