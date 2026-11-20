import React, { useState } from 'react';
import {
  Utensils,
  Sparkles,
  Flame,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Info,
  ChevronRight,
  Download,
  Search,
  ArrowRight,
  HeartPulse,
  Eye,
  BookOpen,
  Award,
  Zap,
  Droplets,
  Layers,
  Plus,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { TesticularSuperfood, AnatomicalBioZone, UserProfile } from '../types';
import { TESTICULAR_SUPERFOODS, ANATOMICAL_BIO_ZONES, DAILY_NUTRITION_TARGETS } from '../data/nutritionData';

interface NutritionSectionProps {
  user: UserProfile;
  currentDay: number;
  onAskCoach?: (question: string) => void;
  onLogNutrition?: (xpBonus: number) => void;
}

export const NutritionSection: React.FC<NutritionSectionProps> = ({
  user,
  currentDay,
  onAskCoach,
  onLogNutrition,
}) => {
  // Navigation View Modes
  const [viewMode, setViewMode] = useState<'matrix' | 'organ-map' | 'infographic' | 'plate-tracker'>('matrix');

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<TesticularSuperfood | null>(null);
  const [selectedBioZone, setSelectedBioZone] = useState<AnatomicalBioZone>(ANATOMICAL_BIO_ZONES[0]);

  // Plate Fuel Logger state (tracked foods consumed today)
  const [loggedFoodIds, setLoggedFoodIds] = useState<string[]>([
    'pumpkin-seeds',
    'pasture-eggs',
    'fresh-ginger'
  ]);
  const [isLoggedToday, setIsLoggedToday] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  // Infographic Zoom / Modal
  const [showFullInfographic, setShowFullInfographic] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Toggle food on today's plate
  const toggleFoodLog = (id: string) => {
    setLoggedFoodIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setIsLoggedToday(false);
  };

  // Compute live nutritional saturation from logged foods
  const computedNutrition = loggedFoodIds.reduce(
    (acc, id) => {
      const food = TESTICULAR_SUPERFOODS.find((f) => f.id === id);
      if (!food) return acc;
      return {
        zincMg: acc.zincMg + food.nutritionalValues.zincMg,
        cholineMg: acc.cholineMg + food.nutritionalValues.cholineMg,
        omega3Mg: acc.omega3Mg + food.nutritionalValues.omega3Mg,
        antioxidantScore: Math.min(100, acc.antioxidantScore + food.nutritionalValues.antioxidantScore * 0.25),
        proteinG: acc.proteinG + food.nutritionalValues.proteinG,
      };
    },
    { zincMg: 3.5, cholineMg: 60, omega3Mg: 200, antioxidantScore: 40, proteinG: 30 }
  );

  const zincPercent = Math.min(100, Math.round((computedNutrition.zincMg / DAILY_NUTRITION_TARGETS.zincMg) * 100));
  const cholinePercent = Math.min(100, Math.round((computedNutrition.cholineMg / DAILY_NUTRITION_TARGETS.cholineMg) * 100));
  const omega3Percent = Math.min(100, Math.round((computedNutrition.omega3Mg / DAILY_NUTRITION_TARGETS.omega3Mg) * 100));
  const antiRosPercent = Math.min(100, Math.round(computedNutrition.antioxidantScore));

  const handleCommitDailyLog = () => {
    setIsLoggedToday(true);
    setShowCelebration(true);
    if (onLogNutrition) {
      onLogNutrition(35);
    }
    setTimeout(() => setShowCelebration(false), 3500);
  };

  // Filter foods
  const filteredFoods = TESTICULAR_SUPERFOODS.filter((food) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'core'
        ? food.isHeroPillar
        : food.category === selectedCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.heroNutrient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.targetCell.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.targetOrgan.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. SECTION HERO & BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#123d32] via-[#00261e] to-[#0a1e18] text-white p-6 md:p-8 shadow-xl border border-[#2d554a]/40">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#5cba83]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-[#eaf6ee]/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#5cba83]/20 border border-[#5cba83]/40 text-[#a3e4c0] text-xs font-bold tracking-wide uppercase flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#5cba83]" />
                Testicular Superfood Matrix
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold">
                Day {currentDay} Protocol Calibrated
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display">
              Testicular Anatomy & Targeted Male Nutrition
            </h1>
            <p className="text-sm md:text-base text-[#d1e0d9] leading-relaxed">
              Precision clinical biochemistry connecting testicular microanatomy (Sertoli cells, Leydig interstitium, germline DNA) to validated whole-food co-factors: Zinc, Choline, Gingerol, and ALA Omega-3.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#a3e4c0]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5cba83] animate-pulse"></span>
                AUA & EAU Evidence-Based
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5cba83]" />
                Blood-Testis Barrier Bio-Shield
              </span>
              <span>•</span>
              <span>74-Day Spermatogenic Cycle Aligned</span>
            </div>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[260px] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80 font-medium">Daily Testicular Fuel</span>
              <span className="font-bold text-[#5cba83]">{zincPercent >= 80 ? 'Optimal' : 'In Progress'}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-black/20 rounded-lg p-2">
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Zinc Saturation</div>
                <div className="text-lg font-bold text-white mt-0.5">{zincPercent}%</div>
                <div className="text-[10px] text-[#5cba83] font-medium">{computedNutrition.zincMg.toFixed(1)} / 25 mg</div>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <div className="text-[10px] text-white/70 uppercase tracking-wider">Anti-ROS Defense</div>
                <div className="text-lg font-bold text-white mt-0.5">{antiRosPercent}%</div>
                <div className="text-[10px] text-[#5cba83] font-medium">ORAC High</div>
              </div>
            </div>

            <button
              onClick={() => setViewMode('plate-tracker')}
              className="w-full py-2 px-3 rounded-lg bg-[#5cba83] hover:bg-[#4aa872] text-[#00261e] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
            >
              <span>Build Today's Plate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="mt-8 pt-4 border-t border-white/15 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'matrix', label: 'Superfood Matrix', icon: Utensils },
            { id: 'organ-map', label: 'Interactive Organ Bio-Map', icon: Layers },
            { id: 'infographic', label: 'Masterclass Infographic', icon: Eye },
            { id: 'plate-tracker', label: "Today's Fuel Plate Builder", icon: Flame },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#123d32] shadow-md scale-102'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#006d40]' : 'text-white/80'}`} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB CONTENT 1: SUPERFOOD MATRIX & DIRECTORY */}
      {viewMode === 'matrix' && (
        <div className="space-y-6">
          {/* Reference Spotlight Header Box: The 4 Core Foods */}
          <div className="clinical-card-elevated p-5 md:p-6 bg-white border border-[#e6e4dd] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0eee6] pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-[11px] font-bold tracking-wide">
                  Core Reproductive Pillars
                </span>
                <h3 className="text-lg font-bold text-[#1b1c19] mt-1">
                  The 4 Targeted Testicular Superfoods
                </h3>
                <p className="text-xs text-[#5a6460]">
                  Directly derived from the testicular biochemical pathway: Pumpkin Seeds (Zinc), Organic Eggs (Cholesterol & Choline), Fresh Ginger (Endothelial Perfusion), and Walnuts (Membrane Omega-3).
                </p>
              </div>

              <button
                onClick={() => setViewMode('infographic')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#faf9f4] hover:bg-[#eaf6ee] text-[#123d32] border border-[#d8d5cb] text-xs font-semibold transition-colors self-start sm:self-auto"
              >
                <Eye className="w-3.5 h-3.5 text-[#5cba83]" />
                <span>View Full Visual Infographic</span>
              </button>
            </div>

            {/* 4 Hero Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TESTICULAR_SUPERFOODS.filter((f) => f.isHeroPillar).map((food) => (
                <div
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                  className="group clinical-card p-4 hover:border-[#123d32] hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between bg-gradient-to-b from-white to-[#faf9f4]"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-[#eaf6ee] text-[#006d40] text-[10px] font-bold">
                        {food.categoryLabel}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-[#123d32] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                        ★
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#1b1c19] group-hover:text-[#006d40] transition-colors leading-snug">
                      {food.name}
                    </h4>

                    <div className="text-xs text-[#123d32] font-semibold bg-white p-2 rounded-lg border border-[#e6e4dd]">
                      <span className="text-[10px] text-[#5a6460] block font-normal">Active Molecule:</span>
                      {food.heroNutrient}
                    </div>

                    <p className="text-xs text-[#5a6460] line-clamp-3 leading-relaxed">
                      {food.cellularMechanism}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0eee6] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-bold text-[#006d40]">
                      {food.biomarkerImpact[0].label}: {food.biomarkerImpact[0].change}
                    </span>
                    <span className="text-[#123d32] group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
              {[
                { id: 'all', label: 'All Superfoods (8)' },
                { id: 'core', label: '★ Core 4 Pillars' },
                { id: 'count_mitosis', label: 'Sperm Count & Mitosis' },
                { id: 'testosterone', label: 'Testosterone & Leydig' },
                { id: 'motility', label: 'Motility & Flagella' },
                { id: 'vascular_perfusion', label: 'Arterial Perfusion' },
                { id: 'dna_integrity', label: 'DNA Anti-ROS' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#123d32] text-white shadow-xs'
                      : 'bg-white text-[#5a6460] border border-[#e6e4dd] hover:bg-[#f5f4ef]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#717975]" />
              <input
                type="text"
                placeholder="Search food, nutrient, cell target..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#e6e4dd] rounded-full focus:outline-none focus:border-[#5cba83] focus:ring-1 focus:ring-[#5cba83]"
              />
            </div>
          </div>

          {/* All Superfood Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFoods.map((food) => {
              const isHero = food.isHeroPillar;
              const isLogged = loggedFoodIds.includes(food.id);
              return (
                <div
                  key={food.id}
                  className={`clinical-card-elevated p-5 bg-white border transition-all flex flex-col justify-between ${
                    isHero ? 'border-[#5cba83]/60 shadow-md' : 'border-[#e6e4dd]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-[10px] font-bold">
                            {food.categoryLabel}
                          </span>
                          {isHero && (
                            <span className="px-1.5 py-0.5 rounded-full bg-[#123d32] text-white text-[9px] font-bold">
                              Core 4 Pillar
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-base text-[#1b1c19] mt-1.5">{food.name}</h3>
                        <p className="text-[11px] text-[#717975] italic">{food.scientificName}</p>
                      </div>

                      {/* Add to today's plate button */}
                      <button
                        onClick={() => toggleFoodLog(food.id)}
                        className={`p-2 rounded-xl transition-all ${
                          isLogged
                            ? 'bg-[#123d32] text-white shadow-xs'
                            : 'bg-[#faf9f4] hover:bg-[#eaf6ee] text-[#5a6460] border border-[#e6e4dd]'
                        }`}
                        title={isLogged ? "Logged on today's fuel plate" : "Add to today's fuel plate"}
                      >
                        {isLogged ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Bioactive & Target info box */}
                    <div className="bg-[#faf9f4] p-3 rounded-xl border border-[#ece9df] space-y-1.5 text-xs">
                      <div>
                        <span className="text-[#5a6460] text-[10px] uppercase tracking-wider block font-medium">
                          Catalyst Nutrient:
                        </span>
                        <span className="font-semibold text-[#123d32]">{food.heroNutrient}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#f0eee6]">
                        <span className="text-[#5a6460]">Target Cell:</span>
                        <span className="font-bold text-[#006d40]">{food.targetCell}</span>
                      </div>
                    </div>

                    {/* Cellular Mechanism Snippet */}
                    <p className="text-xs text-[#5a6460] leading-relaxed line-clamp-3">
                      {food.cellularMechanism}
                    </p>

                    {/* Key Biomarker Badges */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold text-[#717975] uppercase tracking-wider">
                        Measured Clinical Biomarkers:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {food.biomarkerImpact.slice(0, 2).map((b, idx) => (
                          <div
                            key={idx}
                            className="p-1.5 rounded-lg bg-[#eaf6ee]/60 border border-[#cbe6d7] text-[11px] flex items-center justify-between font-medium text-[#006d40]"
                          >
                            <span className="truncate pr-1">{b.label}</span>
                            <span className="font-bold">{b.change}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-[#f0eee6] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="text-xs font-bold text-[#123d32] hover:text-[#006d40] flex items-center gap-1 transition-colors"
                    >
                      <span>Clinical Deep Dive</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (onAskCoach) {
                          onAskCoach(`Can you explain how ${food.name} (${food.heroNutrient}) benefits my testicular health and sperm quality?`);
                        }
                      }}
                      className="p-1.5 rounded-lg text-[#5a6460] hover:text-[#006d40] hover:bg-[#eaf6ee] transition-colors"
                      title="Ask M-CARE AI about this food"
                    >
                      <Bot className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT 2: INTERACTIVE ORGAN BIO-MAP */}
      {viewMode === 'organ-map' && (
        <div className="space-y-6">
          <div className="clinical-card-elevated p-6 bg-white border border-[#e6e4dd] space-y-6">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-bold tracking-wide">
                Microanatomical Bio-Connector
              </span>
              <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">
                Target Organ & Cellular Micro-Environment Map
              </h2>
              <p className="text-sm text-[#5a6460]">
                Click on any testicular compartment below to reveal its exact cellular function, environmental vulnerabilities, and the specific superfoods that nourish its micro-architecture.
              </p>
            </div>

            {/* Zone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {ANATOMICAL_BIO_ZONES.map((zone) => {
                const isSelected = selectedBioZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedBioZone(zone)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#123d32] text-white border-[#123d32] shadow-md scale-102'
                        : 'bg-[#faf9f4] hover:bg-white text-[#1b1c19] border-[#e6e4dd]'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">
                      Target Compartment
                    </div>
                    <div className="font-bold text-xs leading-snug">{zone.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Interactive Diagram & Detail Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#faf9f4] p-6 rounded-2xl border border-[#e6e4dd]">
              {/* Left: Interactive Stylized Testicular Diagram (SVG) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-[#ece9df] shadow-sm relative overflow-hidden">
                <div className="text-[11px] font-bold text-[#123d32] uppercase tracking-wider mb-2">
                  Testicular Architecture & Vascular Tree
                </div>

                <div className="relative w-64 h-72 flex items-center justify-center">
                  <svg viewBox="0 0 240 280" className="w-full h-full drop-shadow-sm">
                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="organGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fdf0ea" />
                        <stop offset="100%" stopColor="#f4c2b2" />
                      </linearGradient>
                      <linearGradient id="activeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#5cba83" />
                        <stop offset="100%" stopColor="#123d32" />
                      </linearGradient>
                    </defs>

                    {/* Vas Deferens / Spermatic Cord (Upper) */}
                    <path
                      d="M100 20 C100 60, 95 80, 90 120"
                      stroke="#c86452"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M140 20 C140 60, 145 80, 150 120"
                      stroke="#c86452"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Pampiniform Plexus & Vessels */}
                    <path
                      d="M96 30 Q105 50 97 70 T100 100"
                      stroke={selectedBioZone.id === 'vascular' ? '#123d32' : '#2b5ea8'}
                      strokeWidth={selectedBioZone.id === 'vascular' ? '4' : '2'}
                      fill="none"
                      className={selectedBioZone.id === 'vascular' ? 'animate-pulse' : ''}
                    />
                    <path
                      d="M144 30 Q135 50 143 70 T140 100"
                      stroke={selectedBioZone.id === 'vascular' ? '#123d32' : '#d9383a'}
                      strokeWidth={selectedBioZone.id === 'vascular' ? '4' : '2'}
                      fill="none"
                      className={selectedBioZone.id === 'vascular' ? 'animate-pulse' : ''}
                    />

                    {/* Epididymis (Crescent Cap) */}
                    <path
                      d="M60 140 C55 100, 90 95, 110 110 C90 130, 60 170, 70 210"
                      stroke={selectedBioZone.id === 'epididymis' ? '#006d40' : '#d28b7d'}
                      strokeWidth={selectedBioZone.id === 'epididymis' ? '12' : '8'}
                      strokeLinecap="round"
                      fill="none"
                      className={selectedBioZone.id === 'epididymis' ? 'animate-pulse' : ''}
                    />

                    {/* Left Testis Body */}
                    <ellipse
                      cx="95"
                      cy="175"
                      rx="38"
                      ry="50"
                      fill={selectedBioZone.id === 'seminiferous' || selectedBioZone.id === 'leydig' ? '#eaf6ee' : 'url(#organGrad)'}
                      stroke={selectedBioZone.id === 'leydig' ? '#5cba83' : '#a85b4b'}
                      strokeWidth={selectedBioZone.id === 'leydig' ? '3.5' : '2'}
                    />

                    {/* Internal Lobules & Seminiferous Tubules */}
                    <path
                      d="M80 150 Q95 160 85 180 T95 200"
                      stroke={selectedBioZone.id === 'seminiferous' ? '#006d40' : '#883a2b'}
                      strokeWidth={selectedBioZone.id === 'seminiferous' ? '3' : '1.5'}
                      fill="none"
                    />
                    <path
                      d="M95 145 Q110 165 100 185 T110 205"
                      stroke={selectedBioZone.id === 'seminiferous' ? '#006d40' : '#883a2b'}
                      strokeWidth={selectedBioZone.id === 'seminiferous' ? '3' : '1.5'}
                      fill="none"
                    />

                    {/* Right Testis Body */}
                    <ellipse
                      cx="145"
                      cy="175"
                      rx="38"
                      ry="50"
                      fill={selectedBioZone.id === 'seminiferous' || selectedBioZone.id === 'leydig' ? '#eaf6ee' : 'url(#organGrad)'}
                      stroke={selectedBioZone.id === 'leydig' ? '#5cba83' : '#a85b4b'}
                      strokeWidth={selectedBioZone.id === 'leydig' ? '3.5' : '2'}
                    />

                    {/* Right Seminiferous Lobules */}
                    <path
                      d="M130 150 Q145 160 135 180 T145 200"
                      stroke={selectedBioZone.id === 'seminiferous' ? '#006d40' : '#883a2b'}
                      strokeWidth={selectedBioZone.id === 'seminiferous' ? '3' : '1.5'}
                      fill="none"
                    />
                    <path
                      d="M145 145 Q160 165 150 185 T160 205"
                      stroke={selectedBioZone.id === 'seminiferous' ? '#006d40' : '#883a2b'}
                      strokeWidth={selectedBioZone.id === 'seminiferous' ? '3' : '1.5'}
                      fill="none"
                    />

                    {/* Hotspot Pulsing Markers */}
                    <circle cx="120" cy="175" r="4" fill="#006d40" className="animate-ping" />
                    <circle cx="120" cy="175" r="5" fill="#123d32" />
                  </svg>
                </div>

                <div className="text-[10px] text-[#5a6460] text-center mt-2">
                  Highlighting: <strong className="text-[#123d32]">{selectedBioZone.name}</strong>
                </div>
              </div>

              {/* Right: Compartment Details & Food Matches */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#123d32] text-white text-[11px] font-bold">
                      {selectedBioZone.cellularType}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1b1c19]">{selectedBioZone.name}</h3>
                  <p className="text-xs text-[#006d40] font-semibold">{selectedBioZone.subtitle}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#e6e4dd] space-y-1">
                    <span className="font-bold text-[#1b1c19] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#5cba83]" />
                      Primary Biological Function
                    </span>
                    <p className="text-[#5a6460] leading-relaxed">{selectedBioZone.primaryFunction}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#ffdad6]/60 space-y-1">
                    <span className="font-bold text-[#ba1a1a] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#ba1a1a]" />
                      Critical Threats & Vulnerabilities
                    </span>
                    <p className="text-[#5a6460] leading-relaxed">{selectedBioZone.environmentalThreat}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#cbe6d7] space-y-1">
                    <span className="font-bold text-[#006d40] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#5cba83]" />
                      Targeted Micronutrient Shield
                    </span>
                    <p className="text-[#123d32] font-medium leading-relaxed">
                      {selectedBioZone.targetedNutrientShield}
                    </p>
                  </div>
                </div>

                {/* Direct Foods that Target this Zone */}
                <div>
                  <div className="text-xs font-bold text-[#1b1c19] mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#006d40]" />
                    <span>Clinically Matched Superfoods for this Zone:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedBioZone.matchedFoodIds.map((foodId) => {
                      const food = TESTICULAR_SUPERFOODS.find((f) => f.id === foodId);
                      if (!food) return null;
                      return (
                        <div
                          key={food.id}
                          onClick={() => setSelectedFood(food)}
                          className="p-2.5 rounded-xl bg-white border border-[#e6e4dd] hover:border-[#123d32] transition-all cursor-pointer shadow-xs group"
                        >
                          <div className="text-[10px] text-[#006d40] font-bold truncate">
                            {food.heroNutrient}
                          </div>
                          <div className="font-bold text-xs text-[#1b1c19] group-hover:text-[#006d40] transition-colors truncate">
                            {food.name}
                          </div>
                          <div className="text-[10px] text-[#5a6460] mt-1 flex items-center gap-1">
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT 3: MASTERCLASS INFOGRAPHIC STUDIO */}
      {viewMode === 'infographic' && (
        <div className="space-y-6">
          <div className="clinical-card-elevated p-6 bg-white border border-[#e6e4dd] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0eee6] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-bold tracking-wide">
                  Clinical Masterclass Visual
                </span>
                <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">
                  Testicular Superfood & Reproductive Anatomy Map
                </h2>
                <p className="text-sm text-[#5a6460]">
                  High-definition editorial infographic mapping testicular microanatomy directly to the 4 essential fertility superfoods: Pumpkin Seeds, Organic Eggs, Fresh Ginger, and Walnuts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/nutrition-testicular-superfoods.jpg"
                  download="Testicular-Superfoods-Infographic.jpg"
                  className="px-3.5 py-2 rounded-full bg-[#123d32] hover:bg-[#00261e] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Visual</span>
                </a>
              </div>
            </div>

            {/* Infographic Viewer Showcase with Interactive Hotspots */}
            <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#e6e4dd] bg-[#f8f6f0]">
              <img
                src="/nutrition-testicular-superfoods.jpg"
                alt="Testicular Superfoods and Anatomy Infographic"
                className="w-full h-auto object-cover select-none"
              />

              {/* Hotspot 1: Testicles Anatomy */}
              <div
                className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => setActiveHotspot('anatomy')}
              >
                <div className="w-8 h-8 rounded-full bg-[#123d32]/80 backdrop-blur-md border-2 border-white flex items-center justify-center text-white shadow-lg animate-bounce">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-[#00261e] text-white rounded-xl text-[11px] shadow-xl text-center pointer-events-none">
                  <div className="font-bold text-[#5cba83]">Testicular Seminiferous Tubules</div>
                  <div className="text-[10px] text-white/80 mt-0.5">Where 1,000 sperm are born every heartbeat</div>
                </div>
              </div>

              {/* Hotspot 2: Pumpkin Seeds */}
              <div
                className="absolute bottom-[14%] left-[15%] -translate-x-1/2 group cursor-pointer"
                onClick={() => {
                  const food = TESTICULAR_SUPERFOODS.find((f) => f.id === 'pumpkin-seeds');
                  if (food) setSelectedFood(food);
                }}
              >
                <div className="w-7 h-7 rounded-full bg-[#5cba83] border-2 border-white flex items-center justify-center text-[#00261e] font-bold text-xs shadow-lg hover:scale-110 transition-transform">
                  Zn
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-[#00261e] text-white rounded-xl text-[10px] shadow-xl text-center pointer-events-none">
                  <div className="font-bold text-[#5cba83]">Raw Pumpkin Seeds</div>
                  <div className="text-white/80">Sertoli nurse cell zinc co-factor</div>
                </div>
              </div>

              {/* Hotspot 3: Eggs */}
              <div
                className="absolute bottom-[14%] left-[38%] -translate-x-1/2 group cursor-pointer"
                onClick={() => {
                  const food = TESTICULAR_SUPERFOODS.find((f) => f.id === 'pasture-eggs');
                  if (food) setSelectedFood(food);
                }}
              >
                <div className="w-7 h-7 rounded-full bg-[#ea580c] border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform">
                  Ch
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-[#00261e] text-white rounded-xl text-[10px] shadow-xl text-center pointer-events-none">
                  <div className="font-bold text-[#5cba83]">Pasture-Raised Eggs</div>
                  <div className="text-white/80">Steroid cholesterol & choline matrix</div>
                </div>
              </div>

              {/* Hotspot 4: Ginger */}
              <div
                className="absolute bottom-[14%] left-[62%] -translate-x-1/2 group cursor-pointer"
                onClick={() => {
                  const food = TESTICULAR_SUPERFOODS.find((f) => f.id === 'fresh-ginger');
                  if (food) setSelectedFood(food);
                }}
              >
                <div className="w-7 h-7 rounded-full bg-[#ca8a04] border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform">
                  NO
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-[#00261e] text-white rounded-xl text-[10px] shadow-xl text-center pointer-events-none">
                  <div className="font-bold text-[#5cba83]">Fresh Ginger Root</div>
                  <div className="text-white/80">Testicular artery perfusion & LH trigger</div>
                </div>
              </div>

              {/* Hotspot 5: Walnuts */}
              <div
                className="absolute bottom-[14%] left-[85%] -translate-x-1/2 group cursor-pointer"
                onClick={() => {
                  const food = TESTICULAR_SUPERFOODS.find((f) => f.id === 'walnuts');
                  if (food) setSelectedFood(food);
                }}
              >
                <div className="w-7 h-7 rounded-full bg-[#123d32] border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform">
                  Ω3
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 bg-[#00261e] text-white rounded-xl text-[10px] shadow-xl text-center pointer-events-none">
                  <div className="font-bold text-[#5cba83]">English Walnuts</div>
                  <div className="text-white/80">ALA omega-3 flagellar motility</div>
                </div>
              </div>
            </div>

            {/* Clinical Reference Table underneath */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-[#f0eee6]">
              {[
                {
                  title: 'Pumpkin Seeds',
                  key: 'Zinc & Phytosterols',
                  dose: '30g raw daily',
                  target: 'Sertoli cells & sperm mitosis',
                },
                {
                  title: 'Pasture-Raised Eggs',
                  key: 'Steroid Cholesterol & Choline',
                  dose: '2-3 eggs with liquid yolk',
                  target: 'Leydig testosterone synthesis',
                },
                {
                  title: 'Fresh Ginger Root',
                  key: '6-Gingerol & Nitric Oxide',
                  dose: '2-3g grated / tea infusion',
                  target: 'Testicular arterial perfusion',
                },
                {
                  title: 'English Walnuts',
                  key: 'ALA Omega-3 & Ellagitannins',
                  dose: '75g (approx. 14 halves)',
                  target: 'Tail membrane motility & low DFI',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-[#faf9f4] rounded-xl border border-[#e6e4dd] space-y-1">
                  <div className="text-xs font-bold text-[#1b1c19]">{item.title}</div>
                  <div className="text-[11px] text-[#006d40] font-semibold">{item.key}</div>
                  <div className="text-[10px] text-[#5a6460]">Target: {item.target}</div>
                  <div className="text-[10px] text-[#123d32] font-medium pt-1 border-t border-[#e6e4dd]">
                    Clinical Dose: {item.dose}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT 4: TODAY'S TESTICULAR FUEL BUILDER & TRACKER */}
      {viewMode === 'plate-tracker' && (
        <div className="space-y-6">
          <div className="clinical-card-elevated p-6 bg-white border border-[#e6e4dd] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0eee6] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-bold tracking-wide">
                  Interactive Plate Builder
                </span>
                <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">
                  Today's Testicular Fuel Checklist & Plate Logger
                </h2>
                <p className="text-sm text-[#5a6460]">
                  Select the fertility superfoods you consumed or plan to eat today. Watch your testicular micronutrient dials calibrate in real-time.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLoggedFoodIds([])}
                  className="px-3 py-1.5 rounded-full border border-[#e6e4dd] hover:bg-[#faf9f4] text-xs font-semibold text-[#5a6460] flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Plate</span>
                </button>
              </div>
            </div>

            {/* Live Nutrient Saturation Meters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Zinc Meter */}
              <div className="p-4 rounded-xl bg-[#faf9f4] border border-[#e6e4dd] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c19]">Bioavailable Zinc</span>
                  <span className="font-bold text-[#006d40]">{zincPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e6e4dd] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5cba83] to-[#123d32] transition-all duration-500 rounded-full"
                    style={{ width: `${zincPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#5a6460] flex justify-between">
                  <span>Current: {computedNutrition.zincMg.toFixed(1)} mg</span>
                  <span>Target: 25 mg</span>
                </div>
              </div>

              {/* Choline Meter */}
              <div className="p-4 rounded-xl bg-[#faf9f4] border border-[#e6e4dd] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c19]">Choline & Phospholipids</span>
                  <span className="font-bold text-[#ea580c]">{cholinePercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e6e4dd] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f97316] to-[#c2410c] transition-all duration-500 rounded-full"
                    style={{ width: `${cholinePercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#5a6460] flex justify-between">
                  <span>Current: {computedNutrition.cholineMg.toFixed(0)} mg</span>
                  <span>Target: 450 mg</span>
                </div>
              </div>

              {/* Omega-3 Meter */}
              <div className="p-4 rounded-xl bg-[#faf9f4] border border-[#e6e4dd] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c19]">Omega-3 (ALA & DHA)</span>
                  <span className="font-bold text-[#2563eb]">{omega3Percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e6e4dd] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#60a5fa] to-[#1d4ed8] transition-all duration-500 rounded-full"
                    style={{ width: `${omega3Percent}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#5a6460] flex justify-between">
                  <span>Current: {computedNutrition.omega3Mg.toFixed(0)} mg</span>
                  <span>Target: 1,500 mg</span>
                </div>
              </div>

              {/* Scrotal Anti-ROS Score */}
              <div className="p-4 rounded-xl bg-[#faf9f4] border border-[#e6e4dd] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1b1c19]">Anti-ROS Defense</span>
                  <span className="font-bold text-[#7c3aed]">{antiRosPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e6e4dd] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#a855f7] to-[#6d28d9] transition-all duration-500 rounded-full"
                    style={{ width: `${antiRosPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#5a6460] flex justify-between">
                  <span>Status: Optimal</span>
                  <span>DNA Shield High</span>
                </div>
              </div>
            </div>

            {/* Interactive Food Checklist Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1b1c19] flex items-center justify-between">
                <span>Select Foods Eaten Today:</span>
                <span className="text-xs font-semibold text-[#006d40]">
                  {loggedFoodIds.length} of {TESTICULAR_SUPERFOODS.length} Selected
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TESTICULAR_SUPERFOODS.map((food) => {
                  const isChecked = loggedFoodIds.includes(food.id);
                  return (
                    <div
                      key={food.id}
                      onClick={() => toggleFoodLog(food.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#eaf6ee] border-[#006d40] shadow-sm'
                          : 'bg-white border-[#e6e4dd] hover:bg-[#faf9f4]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors mt-0.5 ${
                          isChecked ? 'bg-[#006d40] text-white' : 'border border-[#c0c8c4] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1b1c19] leading-tight">
                            {food.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#006d40] font-semibold">{food.heroNutrient}</div>
                        <div className="text-[10px] text-[#5a6460]">{food.dailyDose}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Log to Protocol CTA Button */}
            <div className="pt-4 border-t border-[#f0eee6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#5a6460]">
                {isLoggedToday ? (
                  <span className="text-[#006d40] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Today's nutrition protocol logged and verified with Reproductive Index!
                  </span>
                ) : (
                  <span>Log your whole food intake to receive protocol XP and update your daily score.</span>
                )}
              </div>

              <button
                onClick={handleCommitDailyLog}
                disabled={loggedFoodIds.length === 0}
                className="px-6 py-3 rounded-full bg-[#123d32] hover:bg-[#00261e] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 disabled:opacity-50"
              >
                <Award className="w-4 h-4 text-[#5cba83]" />
                <span>Log Today's Plate (+35 XP)</span>
              </button>
            </div>

            {/* Celebration feedback toast */}
            {showCelebration && (
              <div className="p-4 rounded-xl bg-[#eaf6ee] border border-[#5cba83] text-[#006d40] text-xs font-bold flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#5cba83] animate-spin" />
                  <span>+35 Protocol XP earned! Testicular micronutrient saturation updated.</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#123d32] text-white text-[10px]">
                  Verified
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. MODAL: DETAILED CLINICAL FOOD DEEP DIVE */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-[#e6e4dd] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#f0eee6] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-[11px] font-bold">
                    {selectedFood.categoryLabel}
                  </span>
                  {selectedFood.isHeroPillar && (
                    <span className="px-2 py-0.5 rounded-full bg-[#123d32] text-white text-[10px] font-bold">
                      ★ Core 4 Pillar
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[#1b1c19] mt-1.5">{selectedFood.name}</h2>
                <p className="text-xs text-[#717975] italic">{selectedFood.scientificName}</p>
              </div>

              <button
                onClick={() => setSelectedFood(null)}
                className="w-8 h-8 rounded-full bg-[#f5f4ef] hover:bg-[#e6e4dd] text-[#1b1c19] flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Key Compound & Dose Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#faf9f4] rounded-xl border border-[#e6e4dd]">
                <span className="text-[10px] text-[#5a6460] uppercase tracking-wider block font-semibold">
                  Hero Bioactive Molecule:
                </span>
                <span className="font-bold text-sm text-[#123d32]">{selectedFood.heroNutrient}</span>
              </div>
              <div className="p-3 bg-[#faf9f4] rounded-xl border border-[#e6e4dd]">
                <span className="text-[10px] text-[#5a6460] uppercase tracking-wider block font-semibold">
                  Recommended Clinical Intake:
                </span>
                <span className="font-bold text-sm text-[#006d40]">{selectedFood.dailyDose}</span>
              </div>
            </div>

            {/* Cellular Mechanism */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[#1b1c19] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#006d40]" />
                <span>Cellular Mechanism of Action:</span>
              </h4>
              <p className="text-xs text-[#3f4945] leading-relaxed bg-[#fbfaf6] p-3.5 rounded-xl border border-[#e6e4dd]">
                {selectedFood.cellularMechanism}
              </p>
            </div>

            {/* Active Bioactive Compounds */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[#1b1c19] uppercase tracking-wider">
                Key Phytochemicals & Cofactors:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedFood.bioactiveCompounds.map((comp, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#eaf6ee] text-[#006d40] text-xs font-semibold"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Biomarker Impact */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[#1b1c19] uppercase tracking-wider">
                Measurable Clinical Biomarker Improvements:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedFood.biomarkerImpact.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white rounded-xl border border-[#cbe6d7] text-center space-y-0.5"
                  >
                    <div className="text-[10px] text-[#5a6460] leading-tight">{item.label}</div>
                    <div className="text-base font-extrabold text-[#006d40]">{item.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consumption & Preparation Best Practice */}
            <div className="p-3.5 rounded-xl bg-[#faf9f4] border border-[#e6e4dd] space-y-2 text-xs">
              <div className="font-bold text-[#123d32] flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#5cba83]" />
                <span>Preparation & Bioavailability Guide</span>
              </div>
              <p className="text-[#5a6460] leading-relaxed">{selectedFood.consumptionTips}</p>
              <div className="text-[11px] text-[#006d40] font-semibold pt-1 border-t border-[#ece9df]">
                ★ Synergy: {selectedFood.synergyPairing}
              </div>
            </div>

            {/* Scientific Citation */}
            <div className="text-[10px] text-[#717975] italic border-t border-[#f0eee6] pt-3">
              Citation: {selectedFood.scientificCitation}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  toggleFoodLog(selectedFood.id);
                  setSelectedFood(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  loggedFoodIds.includes(selectedFood.id)
                    ? 'bg-[#123d32] text-white'
                    : 'bg-[#5cba83] text-[#00261e] hover:bg-[#4aa872]'
                }`}
              >
                {loggedFoodIds.includes(selectedFood.id) ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Logged on Today's Plate</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Today's Plate</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (onAskCoach) {
                    onAskCoach(`Can you give me a personalized protocol on how to consume ${selectedFood.name} for male fertility?`);
                  }
                  setSelectedFood(null);
                }}
                className="px-4 py-2 rounded-full border border-[#123d32] text-[#123d32] hover:bg-[#eaf6ee] text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-[#006d40]" />
                <span>Ask M-CARE AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

