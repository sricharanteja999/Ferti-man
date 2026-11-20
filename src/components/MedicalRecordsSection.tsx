import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { initialRecords } from '../data/mockData';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FilePlus2,
  Calendar,
  Building,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Search,
  Filter,
  Sparkles,
  Edit2,
  Check,
  RefreshCw,
  Clock,
  Eye,
  FileCode
} from 'lucide-react';
import { ReproductiveMetricsChart } from './ReproductiveMetricsChart';

interface MedicalRecordsSectionProps {
  records: MedicalRecord[];
  onAddRecord: (record: MedicalRecord) => void;
  onUpdateRecord: (record: MedicalRecord) => void;
}

export const MedicalRecordsSection: React.FC<MedicalRecordsSectionProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
}) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(records[0]?.id || '');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStep, setUploadStep] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [editingValueIdx, setEditingValueIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState<string>('');
  const [showConsentNote, setShowConsentNote] = useState<boolean>(true);

  const selectedRecord = records.find((r) => r.id === selectedRecordId) || records[0];

  const handleSimulatedUpload = (sampleType?: string) => {
    setIsUploading(true);
    setUploadStep('Reading document binary & applying optical character recognition (OCR)...');

    setTimeout(() => {
      setUploadStep('Normalizing biochemical units and referencing WHO 6th Edition & AUA standards...');
      setTimeout(() => {
        setUploadStep('Detecting longitudinal trends, missing biomarkers & clinical safety flags...');
        setTimeout(() => {
          setIsUploading(false);
          setUploadStep('');

          // Create new record
          const isUltrasound = sampleType === 'ultrasound';
          const isHormone = sampleType === 'hormone';
          const newRec: MedicalRecord = {
            id: `rec-${Date.now()}`,
            title: isUltrasound
              ? 'Follow-up Scrotal Doppler & Pampiniform Vein Ultrasound'
              : isHormone
              ? 'Comprehensive Male Androgen Panel (Quest Diagnostics)'
              : 'Repeat Semen Analysis & Oxidative Stress (SFA-6th)',
            category: isUltrasound ? 'Ultrasound' : isHormone ? 'Hormone Panel' : 'Semen Analysis',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            facility: 'Cornell Reproductive Endocrinology & Andrology Lab',
            fileType: 'PDF',
            fileSize: '1.8 MB',
            extractedFindings: {
              summary: 'Successfully extracted 6 biomarkers. DNA Fragmentation improved to 16.1% (-2.1% drop since last test). Progressive motility measured at 36.5%. No acute abnormalities detected.',
              keyValues: [
                { biomarker: 'Sperm Motility (Progressive)', value: '36.5', unit: '%', referenceRange: '>= 30%', status: 'optimal', clinicalSignificance: 'Progressive forward speed improved with CoQ10 antioxidant protocol.' },
                { biomarker: 'DNA Fragmentation Index', value: '16.1', unit: '%', referenceRange: '< 15%', status: 'borderline', clinicalSignificance: 'Approaching optimal threshold; cellular chromatin stabilization observed.' },
                { biomarker: 'Total Sperm Count', value: '158.4', unit: 'M/ejac', referenceRange: '>= 39 M/ejac', status: 'optimal', clinicalSignificance: 'High cellular yield within fertile range.' },
                { biomarker: 'Normal Kruger Morphology', value: '4.8', unit: '%', referenceRange: '>= 4.0%', status: 'optimal', clinicalSignificance: 'Intact acrosome cap and normal midpiece oval architecture.' },
                { biomarker: 'Liquefaction Time', value: '22', unit: 'mins', referenceRange: '< 60 mins', status: 'optimal', clinicalSignificance: 'Normal prostate-specific enzymatic liquefaction.' },
              ],
              changesOverTime: 'Progressive motility increased +2.5% compared to baseline. DFI decreased from 18.2% to 16.1%, demonstrating positive cellular response to ongoing 90-day protocol.',
              possibleRisks: [
                'DNA fragmentation remains slightly above strict ideal (< 15%), continue antioxidant protection and scrotal thermoregulation.',
              ],
              missingInformation: [
                'Sperm chromatin structure assay (SCSA) high DNA stainability (HDS) index was not reported.',
              ],
              recommendedNextSteps: [
                'Maintain current Ubiquinol and Zinc-Selenium doses.',
                'Review findings with Dr. Vance at next virtual check-in.',
                'Plan cycle completion check at Day 90.'
              ],
              questionsForDoctor: [
                'Given the progressive drop in DFI, should we continue the exact antioxidant dosages into the post-90-day maintenance phase?',
                'Does the current motility profile indicate high natural conception readiness?'
              ],
              confidence: 97,
              traceabilityDoc: `Uploaded_${Date.now()}.pdf (Verified via OCR)`,
            },
            verifiedByUser: true,
          };

          onAddRecord(newRec);
          setSelectedRecordId(newRec.id);
        }, 800);
      }, 900);
    }, 1000);
  };

  const handleEditValue = (idx: number, currentVal: string) => {
    setEditingValueIdx(idx);
    setEditVal(currentVal);
  };

  const handleSaveValue = (idx: number) => {
    if (!selectedRecord) return;
    const updated = { ...selectedRecord };
    if (updated.extractedFindings?.keyValues?.[idx]) {
      updated.extractedFindings.keyValues[idx].value = editVal;
      onUpdateRecord(updated);
    }
    setEditingValueIdx(null);
  };

  const filteredRecords = records.filter((r) => {
    const matchCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchSearch =
      r.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (r.facility || "").toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#123d32] text-xs font-semibold">
              Clinical Intelligence
            </span>
            <span className="text-xs text-[#717975] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5cba83]" />
              Zero-Knowledge HIPAA Storage
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">Medical Records & AI Clinical Analysis</h2>
          <p className="text-sm text-[#5a6460] max-w-2xl mt-0.5">
            Upload your semen analysis reports, hormone bloodwork, scrotal ultrasounds, and prescriptions. Our clinical AI extracts key biomarkers, tracks trends over your 90-day cycle, and prepares questions for your doctor.
          </p>
        </div>

        {/* Upload Trigger / Quick Load buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulatedUpload()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-semibold rounded-full flex items-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-50"
          >
            <UploadCloud className="w-4 h-4 text-[#5cba83]" />
            <span>Upload Medical File</span>
          </button>
        </div>
      </div>

      {/* Consent & Privacy Notice Banner */}
      {showConsentNote && (
        <div className="bg-[#f5fbf8] border border-[#bfecdc] rounded-xl p-3.5 text-xs text-[#123d32] flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#006d40] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Privacy, Consent & Medical Accuracy Guarantee:</strong>
              {' '}Your records are encrypted at rest and never shared or sold for advertising. Information extracted by AI is traced directly to original page coordinates. You can review, correct, or delete any record at any time. 
              <span className="text-[#006d40] font-medium block mt-1">
                * An isolated lab reading is not a diagnosis. All findings require qualified clinician review.
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowConsentNote(false)}
            className="text-[#717975] hover:text-[#1b1c19] text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Zone + Sample Loaders */}
      <div className="clinical-card p-6 bg-gradient-to-b from-[#faf9f4] to-white border-dashed border-2 border-[#c0c8c4] hover:border-[#123d32] transition-colors rounded-2xl text-center">
        {isUploading ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#5cba83] animate-spin" />
            <h4 className="font-bold text-[#1b1c19] text-base">Processing Medical Document...</h4>
            <p className="text-xs text-[#5a6460] font-mono max-w-md">{uploadStep}</p>
            <div className="w-64 h-2 bg-[#e6e4dd] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#5cba83] animate-pulse w-3/4"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#eaf6ee] flex items-center justify-center mx-auto text-[#123d32]">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1b1c19]">Drag and drop your medical documents here</h4>
              <p className="text-xs text-[#717975] mt-1">
                Supported formats: PDF, JPG, PNG, DICOM report summaries, HEIC, Word (.docx) • Max 50MB
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-xs text-[#5a6460] mr-2">Or test sample clinical files:</span>
              <button
                onClick={() => handleSimulatedUpload('sperm')}
                className="px-3 py-1.5 rounded-lg bg-[#eaf6ee] hover:bg-[#d6eedf] text-[#123d32] text-xs font-medium transition-colors border border-[#a4d0c0]"
              >
                + Semen Analysis (WHO 6th)
              </button>
              <button
                onClick={() => handleSimulatedUpload('hormone')}
                className="px-3 py-1.5 rounded-lg bg-[#eaf6ee] hover:bg-[#d6eedf] text-[#123d32] text-xs font-medium transition-colors border border-[#a4d0c0]"
              >
                + Endocrine & Testosterone Panel
              </button>
              <button
                onClick={() => handleSimulatedUpload('ultrasound')}
                className="px-3 py-1.5 rounded-lg bg-[#eaf6ee] hover:bg-[#d6eedf] text-[#123d32] text-xs font-medium transition-colors border border-[#a4d0c0]"
              >
                + Scrotal Doppler Ultrasound
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Longitudinal Recharts Biomarker Trends */}
      <ReproductiveMetricsChart records={records} />

      {/* Main Grid: Document List on Left & Deep Extracted Clinical Report on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document Archive List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="font-bold text-sm text-[#1b1c19]">Your Medical Archive ({records.length})</h3>
            <span className="text-xs text-[#717975]">Chronological</span>
          </div>

          {/* Search & Category Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#717975]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search lab, doctor or test..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#e6e4dd] rounded-xl focus:border-[#123d32] outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
              {['All', 'Semen Analysis', 'Hormone Panel', 'Ultrasound'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'bg-[#123d32] text-white'
                      : 'bg-[#efeee9] text-[#5a6460] hover:bg-[#e3e3de]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Records List Cards */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredRecords.map((rec) => {
              const isSelected = rec.id === selectedRecord?.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecordId(rec.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#123d32] shadow-md ring-1 ring-[#123d32]/20'
                      : 'bg-white border-[#e6e4dd] hover:border-[#c0c8c4]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#eaf6ee] text-[#123d32]">
                      {rec.category}
                    </span>
                    <span className="text-[11px] text-[#717975] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rec.date}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#1b1c19] mt-2 line-clamp-1">{rec.title}</h4>
                  <p className="text-[11px] text-[#717975] mt-0.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#5cba83]" />
                    {rec.facility}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#f5f4ef] flex items-center justify-between text-[11px]">
                    <span className="text-[#006d40] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#5cba83]" />
                      AI Verified • {rec.extractedFindings?.confidence ?? 94}% confidence
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 text-[#717975] ${isSelected ? 'text-[#123d32]' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Structured Clinical Report (8 Cols) */}
        <div className="lg:col-span-8">
          {selectedRecord ? (
            <div className="clinical-card-elevated p-6 bg-white space-y-6">
              {/* Document Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e6e4dd]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#123d32] text-white text-[11px] font-bold">
                      {selectedRecord.category}
                    </span>
                    <span className="text-xs text-[#717975]">Dated: {selectedRecord.date}</span>
                    <span className="text-[11px] text-[#006d40] bg-[#eaf6ee] px-2 py-0.5 rounded-full font-medium">
                      Traceable: {selectedRecord.extractedFindings?.traceabilityDoc || "Uploaded Document"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1b1c19] mt-1.5">{selectedRecord.title}</h3>
                  <p className="text-xs text-[#5a6460] mt-0.5">
                    Issuing Laboratory: <strong>{selectedRecord.facility}</strong> • File: {selectedRecord.fileType} ({selectedRecord.fileSize})
                  </p>
                </div>
              </div>

              {/* 1. What the records show */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#123d32] uppercase tracking-wider mb-2">
                  <FileText className="w-4 h-4 text-[#5cba83]" />
                  <span>1. What the records show</span>
                </div>
                <div className="bg-[#faf9f4] border border-[#e6e4dd] p-4 rounded-xl text-xs text-[#202b29] leading-relaxed">
                  {selectedRecord.extractedFindings?.summary || selectedRecord.summary?.whatRecordsShow || "Document processed and verified."}
                </div>
              </div>

              {/* 2. Important Findings & Biomarker Matrix with User Editability */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#123d32] uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-[#5cba83]" />
                    <span>2. Extracted Biomarkers & Reference Standards</span>
                  </div>
                  <span className="text-[11px] text-[#717975] italic">Tap any value to calibrate/edit</span>
                </div>

                <div className="overflow-x-auto border border-[#e6e4dd] rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f5f4ef] text-[#1b1c19] font-semibold border-b border-[#e6e4dd]">
                      <tr>
                        <th className="py-2.5 px-3">Biomarker</th>
                        <th className="py-2.5 px-3">Result</th>
                        <th className="py-2.5 px-3">Reference (AUA/WHO)</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Clinical Significance</th>
                        <th className="py-2.5 px-2 text-center">Edit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6e4dd]">
                      {(selectedRecord.extractedFindings?.keyValues || []).map((kv: any, idx: number) => {
                        const isOptimal = kv.status === 'optimal';
                        const isBorderline = kv.status === 'borderline';

                        return (
                          <tr key={idx} className="hover:bg-[#faf9f4] transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-[#1b1c19]">{kv.biomarker}</td>
                            <td className="py-2.5 px-3 font-mono font-bold text-sm text-[#123d32]">
                              {editingValueIdx === idx ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={editVal}
                                    onChange={(e) => setEditVal(e.target.value)}
                                    className="w-16 px-1.5 py-0.5 border border-[#123d32] rounded text-xs"
                                  />
                                  <button
                                    onClick={() => handleSaveValue(idx)}
                                    className="p-1 text-white bg-[#123d32] rounded hover:bg-[#1a4f41]"
                                  >
                                    <Check className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <span>
                                  {kv.value} <span className="text-[11px] font-normal text-[#717975]">{kv.unit}</span>
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-[#5a6460] font-mono text-[11px]">{kv.referenceRange}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  isOptimal
                                    ? 'bg-[#eaf6ee] text-[#006d40]'
                                    : isBorderline
                                    ? 'bg-[#fef9c3] text-[#854d0e]'
                                    : 'bg-[#ffdad6] text-[#93000a]'
                                }`}
                              >
                                {kv.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-[#5a6460] text-[11px]">{kv.clinicalSignificance}</td>
                            <td className="py-2.5 px-2 text-center">
                              <button
                                onClick={() => handleEditValue(idx, kv.value)}
                                className="text-[#717975] hover:text-[#123d32] p-1"
                                title="Correct extracted value"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Changes Over Time */}
              {selectedRecord.extractedFindings?.changesOverTime && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#123d32] uppercase tracking-wider mb-2">
                    <TrendingUp className="w-4 h-4 text-[#5cba83]" />
                    <span>3. Longitudinal Comparison & Trends Over Time</span>
                  </div>
                  <div className="bg-[#eaf6ee]/50 border border-[#bfecdc] p-3.5 rounded-xl text-xs text-[#004d2c] leading-relaxed">
                    {selectedRecord.extractedFindings?.changesOverTime}
                  </div>
                </div>
              )}

              {/* 4. Possible Health Risks & Biological Patterns */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#123d32] uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4 text-[#b45309]" />
                  <span>4. Potential Cellular Vulnerabilities & Risk Patterns</span>
                </div>
                <ul className="space-y-1.5">
                  {(selectedRecord.extractedFindings?.possibleRisks || selectedRecord.summary?.possibleHealthRisks || []).map((risk: any, idx: number) => (
                    <li key={idx} className="bg-[#fffbeb] border border-[#fef08a] p-3 rounded-lg text-xs text-[#92400e] flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Missing Information & Inconsistencies */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#717975] uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4 text-[#717975]" />
                  <span>5. Missing Diagnostic Information</span>
                </div>
                <div className="bg-[#faf9f4] border border-[#e6e4dd] p-3 rounded-lg text-xs text-[#5a6460] space-y-1">
                  {(selectedRecord.extractedFindings?.missingInformation || selectedRecord.summary?.missingInfo || []).map((item: any, idx: number) => (
                    <p key={idx}>• {item}</p>
                  ))}
                </div>
              </div>

              {/* 6. Recommended Next Steps & 7. Questions to discuss with a doctor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#e6e4dd]">
                {/* Steps */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-[#123d32] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#5cba83]" />
                    6. Recommended Preventive Steps
                  </h5>
                  <div className="bg-white border border-[#e6e4dd] p-3 rounded-xl space-y-1.5 text-xs text-[#202b29]">
                    {(selectedRecord.extractedFindings?.recommendedNextSteps || selectedRecord.summary?.recommendedNextSteps || []).map((step: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#5cba83] font-bold">✓</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions for doctor */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-[#123d32] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#123d32]" />
                    7. Questions to Discuss with Your Doctor
                  </h5>
                  <div className="bg-[#f5fbf8] border border-[#a4d0c0] p-3 rounded-xl space-y-1.5 text-xs text-[#123d32]">
                    {(selectedRecord.extractedFindings?.questionsForDoctor || selectedRecord.summary?.questionsForDoctor || []).map((q: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-[#006d40]">?</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Safe Clinical Disclaimer Footer */}
              <div className="p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-[11px] text-[#717975] leading-relaxed text-center">
                <strong>Medical Governance:</strong> MANLY extracts and structures user-consented medical documents to support informed clinical visits. Algorithms do not issue medical diagnoses, change prescriptions, or replace formal pathology reviews.
              </div>
            </div>
          ) : (
            <div className="clinical-card p-12 text-center text-[#717975]">
              <FileText className="w-12 h-12 mx-auto text-[#c0c8c4] mb-3" />
              <p>No records found. Upload your first medical file to view AI analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
