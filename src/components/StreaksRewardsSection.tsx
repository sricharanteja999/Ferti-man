import React, { useState } from 'react';
import { MetricStreak } from '../types';
import {
  Flame,
  Award,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Trophy,
  Heart,
  Droplet,
  Coffee,
  Moon,
  ChevronRight,
  Shield,
  Snowflake
} from 'lucide-react';

interface StreaksRewardsSectionProps {
  streaks: MetricStreak[];
  currentDay: number;
  onExtendStreak: (streakId: string) => void;
}

export const StreaksRewardsSection: React.FC<StreaksRewardsSectionProps> = ({
  streaks,
  currentDay,
  onExtendStreak,
}) => {
  const [streakFreezes, setStreakFreezes] = useState<number>(2);
  const [userXP, setUserXP] = useState<number>(1840);
  const [level, setLevel] = useState<number>(4);
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const badges = [
    {
      id: 'b1',
      title: 'Mitochondrial Guardian',
      desc: 'Completed 21 continuous days of antioxidant CoQ10 & Zn/Se adherence.',
      earned: true,
      icon: '🛡️',
      date: 'Oct 22, 2025',
    },
    {
      id: 'b2',
      title: 'Spermatogenesis Phase I Graduate',
      desc: 'Navigated the 25-day stem spermatogonial proliferation milestone.',
      earned: currentDay >= 24,
      icon: '🧬',
      date: 'Current Phase',
    },
    {
      id: 'b3',
      title: 'Thermal Shield Master',
      desc: 'Maintained 14 days of heat defense (avoided saunas, hot tubs & laptops).',
      earned: true,
      icon: '❄️',
      date: 'Oct 18, 2025',
    },
    {
      id: 'b4',
      title: 'Seminal Hydration Sentinel',
      desc: 'Logged 3.0L daily hydration target for 10 consecutive days.',
      earned: true,
      icon: '💧',
      date: 'Oct 24, 2025',
    },
    {
      id: 'b5',
      title: '90-Day Cellular Vanguard',
      desc: 'Full cycle completion of meiotic and epididymal maturation.',
      earned: false,
      icon: '🏆',
      date: 'Unlocks on Day 90',
    },
  ];

  const handleUseFreeze = () => {
    if (streakFreezes > 0) {
      setStreakFreezes((prev) => prev - 1);
      setClaimedReward('Streak Freeze Activated! Your 42-day DNA integrity streak is safeguarded for rest.');
      setTimeout(() => setClaimedReward(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#123d32] text-xs font-semibold">
              Habit Longevity & Motivation
            </span>
            <span className="text-xs text-[#717975]">Behavior-Based Health Gamification</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">Streaks, Cellular Shields & Milestones</h2>
          <p className="text-sm text-[#5a6460] max-w-2xl mt-0.5">
            Every clean meal, chilled sleep, and antioxidant shield today constitutes the cellular DNA of sperm matured 3 months from now. Rewards celebrate consistent daily self-care.
          </p>
        </div>

        {/* Level & XP Capsule */}
        <div className="flex items-center gap-3 bg-white border border-[#e6e4dd] p-2.5 rounded-2xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#123d32] flex items-center justify-center text-white font-bold text-sm">
            L{level}
          </div>
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#1b1c19]">Spermatogenesis Vitality</span>
              <span className="text-[#006d40]">{userXP} / 2500 XP</span>
            </div>
            <div className="w-36 h-2 bg-[#f5f4ef] rounded-full overflow-hidden mt-1.5 border border-[#e6e4dd]">
              <div
                className="h-full bg-gradient-to-r from-[#123d32] to-[#5cba83]"
                style={{ width: `${(userXP / 2500) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Alert Banner if any */}
      {claimedReward && (
        <div className="p-4 bg-[#eaf6ee] border border-[#a4d0c0] rounded-xl text-xs text-[#004d2c] font-semibold flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-[#5cba83]" />
          <span>{claimedReward}</span>
        </div>
      )}

      {/* Active Cellular Streaks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {streaks.map((s) => (
          <div
            key={s.id}
            className="clinical-card p-5 bg-white flex flex-col justify-between hover:border-[#5cba83] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-[#eaf6ee] text-[#123d32]">
                  {s.icon === 'flame' && <Flame className="w-4 h-4 text-[#ea580c]" />}
                  {s.icon === 'droplet' && <Droplet className="w-4 h-4 text-[#0284c7]" />}
                  {s.icon === 'check' && <CheckCircle2 className="w-4 h-4 text-[#006d40]" />}
                  {s.icon === 'glass' && <Zap className="w-4 h-4 text-[#123d32]" />}
                </span>
                <span className="text-[11px] font-bold text-[#006d40] bg-[#eaf6ee] px-2 py-0.5 rounded-full">
                  Active Shield
                </span>
              </div>

              <div className="mt-4">
                <span className="metric-display text-[#1b1c19]">{s.days}</span>
                <span className="text-xs text-[#717975] ml-1 font-medium">Days</span>
              </div>

              <h4 className="font-bold text-sm text-[#1b1c19] mt-1">{s.label}</h4>
              <p className="text-xs text-[#5a6460] mt-0.5">{s.sublabel}</p>
            </div>

            <button
              onClick={() => {
                onExtendStreak(s.id);
                setUserXP((x) => x + 25);
                setClaimedReward(`+25 XP! Streak verified for ${s.label}`);
                setTimeout(() => setClaimedReward(null), 3000);
              }}
              className="mt-4 w-full py-2 bg-[#faf9f4] hover:bg-[#eaf6ee] text-[#123d32] border border-[#e6e4dd] hover:border-[#a4d0c0] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5cba83]" />
              <span>Verify Today (+25 XP)</span>
            </button>
          </div>
        ))}
      </div>

      {/* Streak Freeze & Rest Day Grace Mechanism */}
      <div className="clinical-card-elevated p-5 bg-gradient-to-r from-[#f5fbf8] to-white border border-[#bfecdc] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-[#123d32] text-white rounded-xl">
            <Snowflake className="w-5 h-5 text-[#a7f3d0]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-[#1b1c19]">Streak Freeze & Biological Rest Days</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#123d32] text-white">
                {streakFreezes} Freezes Available
              </span>
            </div>
            <p className="text-xs text-[#5a6460] mt-1 max-w-xl">
              Life happens. We never penalize missed days or symptoms. Activate a freeze to protect your streaks during travel, illness, or medical follow-ups.
            </p>
          </div>
        </div>

        <button
          onClick={handleUseFreeze}
          disabled={streakFreezes === 0}
          className="px-5 py-2.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm whitespace-nowrap"
        >
          Use 1 Streak Freeze
        </button>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-base text-[#1b1c19] flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#b45309]" />
          <span>Cellular Mastery Badges & Milestones</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`clinical-card p-4 flex items-start gap-3.5 transition-all ${
                b.earned ? 'bg-white border-[#e6e4dd]' : 'bg-[#faf9f4] opacity-60 border-dashed'
              }`}
            >
              <div className="text-2xl p-2 bg-[#f5f4ef] rounded-xl shrink-0">
                {b.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#1b1c19]">{b.title}</h4>
                  <span className={`text-[10px] font-bold ${b.earned ? 'text-[#006d40]' : 'text-[#717975]'}`}>
                    {b.earned ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <p className="text-[11px] text-[#5a6460] mt-1 leading-relaxed">{b.desc}</p>
                <span className="text-[10px] text-[#717975] block mt-1 font-mono">{b.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Policy */}
      <div className="p-4 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs text-[#717975] leading-relaxed">
        <strong>Gamification Ethics Constitution:</strong> MANLY rewards healthy lifestyle adherence, hydration, sleep quality, and proactive preventive care. Points are <em>never</em> tied to semen test metrics, pregnancy outcomes, or avoiding necessary medical evaluation.
      </div>
    </div>
  );
};
