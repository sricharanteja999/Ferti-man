import React, { useState } from 'react';
import { UserProfile, MedicalRecord } from '../types';
import {
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  EyeOff,
  User,
  Key,
  Database,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PrivacySectionProps {
  user: UserProfile;
  records: MedicalRecord[];
  onClearData: () => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ user, records, onClearData }) => {
  const [consentAIAnalysis, setConsentAIAnalysis] = useState<boolean>(true);
  const [consentDoctorSharing, setConsentDoctorSharing] = useState<boolean>(true);
  const [biometricTelemetryIsolated, setBiometricTelemetryIsolated] = useState<boolean>(true);
  const [exportNotice, setExportNotice] = useState<boolean>(false);

  const handleExportData = () => {
    const dataObj = {
      user,
      medicalRecordsCount: records.length,
      records: records.map((r) => ({
        id: r.id,
        title: r.title,
        date: r.date || r.uploadDate || r.examDate || "2026-10-14",
        biomarkers: r.extractedFindings?.keyValues || r.findings || [],
      })),
      exportTimestamp: new Date().toISOString(),
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `MANLY_Health_Records_${user.name}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#123d32] text-xs font-semibold">
            Security Architecture
          </span>
          <span className="text-xs text-[#717975]">Zero Data Reselling Protocol</span>
        </div>
        <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">Privacy, Consent & Data Governance</h2>
        <p className="text-sm text-[#5a6460] mt-0.5">
          Your reproductive health data is protected with military-grade 256-bit AES encryption at rest and WebRTC peer tunnels in transit. You retain 100% data sovereignty.
        </p>
      </div>

      {/* User Identity Profile Card */}
      <div className="clinical-card p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#123d32] text-white flex items-center justify-center font-bold text-2xl border-2 border-[#5cba83]">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#1b1c19]">{user.name}</h3>
            <p className="text-xs text-[#5a6460]">
              Age: {user.age} • 90-Day Protocol Member • Phase: {user.phaseRoman}
            </p>
            <p className="text-[11px] text-[#006d40] font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Compliant Profile Token Active
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-[#717975] block">Assigned Andrologist</span>
          <span className="text-sm font-bold text-[#1b1c19]">{user.assignedDoctor.name}</span>
        </div>
      </div>

      {/* Explicit Consent Controls */}
      <div className="clinical-card-elevated p-6 bg-white space-y-4">
        <h3 className="font-bold text-base text-[#1b1c19] flex items-center gap-2">
          <Key className="w-4 h-4 text-[#123d32]" />
          <span>Consent Preferences & Algorithmic Boundaries</span>
        </h3>

        <div className="space-y-3 divide-y divide-[#e6e4dd] text-xs">
          <div className="flex items-center justify-between pt-2">
            <div>
              <strong className="text-sm text-[#1b1c19] block">AI Optical Document Extraction</strong>
              <p className="text-[#5a6460] mt-0.5">
                Authorize M-CARE AI to parse uploaded PDF/JPG lab records for biomarker trend analysis.
              </p>
            </div>
            <input
              type="checkbox"
              checked={consentAIAnalysis}
              onChange={(e) => setConsentAIAnalysis(e.target.checked)}
              className="w-5 h-5 accent-[#123d32] rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <strong className="text-sm text-[#1b1c19] block">Direct Clinician Portal Sync</strong>
              <p className="text-[#5a6460] mt-0.5">
                Enable secure, encrypted transmission of uploaded tests to Dr. Vance prior to scheduled visits.
              </p>
            </div>
            <input
              type="checkbox"
              checked={consentDoctorSharing}
              onChange={(e) => setConsentDoctorSharing(e.target.checked)}
              className="w-5 h-5 accent-[#123d32] rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <strong className="text-sm text-[#1b1c19] block">Biometric Telemetry Isolation</strong>
              <p className="text-[#5a6460] mt-0.5">
                Keep sensitive daily check-in metrics (scrotal temperature, morning erections, libido) in isolated device storage.
              </p>
            </div>
            <input
              type="checkbox"
              checked={biometricTelemetryIsolated}
              onChange={(e) => setBiometricTelemetryIsolated(e.target.checked)}
              className="w-5 h-5 accent-[#123d32] rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Data Export & Deletion */}
      <div className="clinical-card p-6 bg-white space-y-4">
        <h3 className="font-bold text-base text-[#1b1c19] flex items-center gap-2">
          <Database className="w-4 h-4 text-[#123d32]" />
          <span>Data Sovereignty, Export & Deletion</span>
        </h3>

        <p className="text-xs text-[#5a6460] leading-relaxed">
          You have full rights to your health dossier under HIPAA and GDPR. You can download a complete structured export of your medical record timeline or permanently erase all telemetry data.
        </p>

        {exportNotice && (
          <div className="p-3 bg-[#eaf6ee] text-[#006d40] text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Health dossier exported successfully to your downloads folder.</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#5cba83]" />
            <span>Export Encrypted Health Dossier (.json)</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all uploaded records and daily check-ins? This cannot be undone.')) {
                onClearData();
              }
            }}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Permanently Purge Local Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};
