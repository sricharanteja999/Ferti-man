import React from 'react';
import { UserProfile } from '../types';
import { Menu, Bell, Shield, HeartPulse, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenRedFlag: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  onNavigate,
  onOpenRedFlag,
  unreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f4]/95 backdrop-blur-md border-b border-[#e6e4dd]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Menu & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 -ml-2 rounded-xl text-[#1b1c19] hover:bg-[#efeee9] transition-colors md:hidden"
            title="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* MANLY Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-[#123d32] flex items-center justify-center text-white shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#123d32" stroke="#5cba83" strokeWidth="1.5"/>
                <path d="M12 7V17M7 12H17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 9C15 9 17 11 17 13C17 15 15.5 16 14 16" stroke="#5cba83" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-[#00261e] tracking-tight font-display leading-tight">
                MANLY
              </span>
              <span className="text-[9px] tracking-wider text-[#5cba83] font-bold uppercase -mt-0.5">
                Health & Atlas
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-6 text-xs font-semibold overflow-x-auto">
            {[
              { id: 'home', label: 'Home' },
              { id: 'nutrition', label: 'Nutrition & Bio-Matrix' },
              { id: 'atlas', label: '3D Anatomy Atlas' },
              { id: '90-day', label: '3D 90-Day Roadmap' },
              { id: 'records', label: 'Medical Records' },
              { id: 'assessments', label: 'Assessments' },
              { id: 'flashcards', label: 'Flashcards' },
              { id: 'ai-coach', label: 'M-CARE AI' },
              { id: 'streaks', label: 'Streaks & Rewards' },
              { id: 'doctors', label: 'Doctors & Consult' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#123d32] text-white shadow-xs'
                    : 'text-[#5a6460] hover:text-[#1b1c19] hover:bg-[#efeee9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Notifications, Red Flag triage button & Profile Avatar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenRedFlag}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#93000a] text-xs font-bold transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Red Flag Triage</span>
          </button>

          <button
            onClick={() => onNavigate('records')}
            className="relative p-2 rounded-xl text-[#1b1c19] hover:bg-[#efeee9] transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#5a6460]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            )}
          </button>

          {/* User Avatar */}
          <div
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-[#efeee9] transition-colors"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#5cba83] bg-[#123d32] flex items-center justify-center text-white text-xs font-bold">
              <span>{user.name.charAt(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
