import React from 'react';
import { Home, Sparkles, Bot, Utensils, ClipboardList, Stethoscope, FileText, Flame, BookOpen, Layers } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf9f4]/95 backdrop-blur-lg border-t border-[#e6e4dd] md:hidden px-2 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Tab 1: Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'home' ? 'text-[#123d32]' : 'text-[#717975] hover:text-[#1b1c19]'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        {/* Tab 2: Nutrition Superfoods */}
        <button
          onClick={() => onNavigate('nutrition')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'nutrition' ? 'text-[#123d32]' : 'text-[#717975] hover:text-[#1b1c19]'
          }`}
        >
          <Utensils className={`w-5 h-5 ${activeTab === 'nutrition' ? 'stroke-[2.5px] text-[#006d40]' : ''}`} />
          <span className="text-[10px] font-semibold">Nutrition</span>
        </button>

        {/* Tab 3: 3D Anatomy Atlas */}
        <button
          onClick={() => onNavigate('atlas')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'atlas' ? 'text-[#123d32]' : 'text-[#717975] hover:text-[#1b1c19]'
          }`}
        >
          <Layers className={`w-5 h-5 ${activeTab === 'atlas' ? 'stroke-[2.5px] text-[#006d40]' : ''}`} />
          <span className="text-[10px] font-semibold">3D Atlas</span>
        </button>

        {/* Center Elevated Button: M-CARE AI */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={() => onNavigate('ai-coach')}
            className="w-13 h-13 rounded-full bg-[#00261e] border-2 border-[#5cba83] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:bg-[#123d32]"
            title="M-CARE AI Assistant"
          >
            <Bot className="w-6 h-6 text-[#5cba83]" />
          </button>
          <span className="text-[10px] font-bold text-[#00261e] mt-1">M-CARE AI</span>
        </div>

        {/* Tab 5: Streaks / Nutrition */}
        <button
          onClick={() => onNavigate('streaks')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'streaks' ? 'text-[#123d32]' : 'text-[#717975] hover:text-[#1b1c19]'
          }`}
        >
          <Flame className={`w-5 h-5 ${activeTab === 'streaks' ? 'stroke-[2.5px] text-[#ea580c]' : ''}`} />
          <span className="text-[10px] font-semibold">Streaks</span>
        </button>

        {/* Tab 6: Doctors / Consult */}
        <button
          onClick={() => onNavigate('doctors')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'doctors' ? 'text-[#123d32]' : 'text-[#717975] hover:text-[#1b1c19]'
          }`}
        >
          <Stethoscope className={`w-5 h-5 ${activeTab === 'doctors' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] font-semibold">Doctors</span>
        </button>
      </div>
    </nav>
  );
};
