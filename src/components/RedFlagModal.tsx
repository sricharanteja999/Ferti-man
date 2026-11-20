import React, { useState } from 'react';
import { redFlagEmergencyChecklist } from '../data/mockData';
import { AlertTriangle, PhoneCall, ShieldAlert, X, ChevronRight, CheckCircle2, Hospital } from 'lucide-react';

interface RedFlagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RedFlagModal: React.FC<RedFlagModalProps> = ({ isOpen, onClose }) => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ffdad6] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Alert Ribbon */}
        <div className="bg-[#ba1a1a] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Urological Red Flag & Emergency Triage</h3>
              <p className="text-xs text-red-100">Immediate Clinical Safety Guidance • Non-Diagnostic Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-[#ffdad6]/50 border border-[#ffb4ab] rounded-xl p-4 text-[#93000a] text-xs leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-1">When to Seek Emergency Care Immediately:</strong>
              Testicular torsion occurs when the spermatic cord twists, cutting off blood supply. It requires surgical detorsion within <strong>4 to 6 hours</strong> to prevent permanent testicular loss. If you experience sudden, acute testicular pain or trauma, <strong>do not wait for app tracking or doctor messaging</strong>—proceed directly to an Emergency Room.
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#1b1c19] mb-3">Select your current symptom for triage guidance:</h4>
            <div className="space-y-2.5">
              {redFlagEmergencyChecklist.map((item) => {
                const isSelected = selectedIssue === item.id;
                const isEmergency = item.severity === 'EMERGENCY_IMMEDIATE_ER';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedIssue(isSelected ? null : item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? isEmergency
                          ? 'border-[#ba1a1a] bg-[#fff8f7] shadow-sm'
                          : 'border-[#123d32] bg-[#f5fbf8] shadow-sm'
                        : 'border-[#e6e4dd] hover:border-[#c0c8c4] bg-[#faf9f4]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isEmergency
                              ? 'bg-[#ba1a1a] text-white'
                              : 'bg-[#ffdad6] text-[#93000a]'
                          }`}
                        >
                          {isEmergency ? 'Critical ER' : 'Urgent Clinic'}
                        </span>
                        <div>
                          <h5 className="text-sm font-semibold text-[#1b1c19]">{item.title}</h5>
                          <p className="text-xs text-[#5a6460] mt-1">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-[#717975] transition-transform ${
                          isSelected ? 'rotate-90' : ''
                        }`}
                      />
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-[#e6e4dd] text-xs">
                        <div className="flex items-start gap-2 text-[#93000a] font-medium bg-[#ffdad6]/40 p-3 rounded-lg">
                          <Hospital className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <strong>Clinical Protocol: </strong>
                            {item.action}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Emergency Assistance Card */}
          <div className="bg-[#123d32] text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-bold text-sm">Need to contact emergency services?</h5>
              <p className="text-xs text-[#a4d0c0] mt-0.5">
                In the United States dial 911. For clinical hotline assistance, contact local medical dispatch.
              </p>
            </div>
            <a
              href="tel:911"
              className="px-5 py-2.5 bg-[#5cba83] hover:bg-[#48a56e] text-[#00261e] font-bold text-xs rounded-full flex items-center gap-2 whitespace-nowrap transition-colors shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Emergency (911)</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f5f4ef] px-6 py-3 border-t border-[#e6e4dd] flex items-center justify-between">
          <span className="text-[11px] text-[#717975]">
            MANLY Clinical Triage • Follows AUA & EAU Andrology Safety Guidelines
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#123d32] text-white text-xs font-semibold rounded-full hover:bg-[#1a4f41] transition-colors"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
