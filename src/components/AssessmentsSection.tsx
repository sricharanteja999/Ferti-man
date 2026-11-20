import React, { useState } from 'react';
import { HealthAssessment } from '../types';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Calendar,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  X,
  Stethoscope,
  Activity,
  Flame,
  Award
} from 'lucide-react';

interface AssessmentsSectionProps {
  assessments: HealthAssessment[];
  onUpdateAssessment: (assessment: HealthAssessment) => void;
}

export const AssessmentsSection: React.FC<AssessmentsSectionProps> = ({
  assessments,
  onUpdateAssessment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Male Reproductive' | 'Hormonal & Metabolic' | 'Mental & Lifestyle'>('All');
  const [activeQuizAssessment, setActiveQuizAssessment] = useState<HealthAssessment | null>(null);

  // IIEF-5 Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({
    0: 5,
    1: 5,
    2: 5,
    3: 4,
    4: 5,
  });

  const filtered = assessments.filter((a) => {
    return selectedCategory === 'All' || a.category === selectedCategory;
  });

  const handleCompleteQuiz = () => {
    if (!activeQuizAssessment) return;
    const totalScore = Object.values(quizAnswers).reduce((a, b) => a + b, 0);
    const updated: HealthAssessment = {
      ...activeQuizAssessment,
      status: 'Completed',
      completedDate: 'Today',
      scoreSummary: `Validated Score: ${totalScore}/25 — ${
        totalScore >= 22
          ? 'Normal / Optimal Vascular Function'
          : totalScore >= 17
          ? 'Mild Arterial / Endothelial Reduction'
          : 'Clinical Review Advised'
      }`,
    };
    onUpdateAssessment(updated);
    setActiveQuizAssessment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#123d32] text-xs font-semibold">
              Diagnostic Guidance
            </span>
            <span className="text-xs text-[#717975]">Evidence-Based AUA/EAU Triage</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">Intelligent Assessment & Preventive Screening</h2>
          <p className="text-sm text-[#5a6460] max-w-2xl mt-0.5">
            Personalized clinical roadmap tailored to your age, 90-day spermatogenesis stage, medical uploads, and symptom logs. We only recommend tests with validated clinical justification.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {['All', 'Male Reproductive', 'Hormonal & Metabolic', 'Mental & Lifestyle'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#123d32] text-white shadow-sm'
                  : 'bg-white border border-[#e6e4dd] text-[#5a6460] hover:bg-[#faf9f4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isCompleted = item.status === 'Completed';
          const isReview = item.status === 'Clinician review required';
          const isPlanned = item.status === 'Planned';

          return (
            <div
              key={item.id}
              className={`clinical-card p-5 flex flex-col justify-between transition-all duration-200 ${
                isCompleted ? 'bg-[#faf9f4]/60' : 'bg-white hover:border-[#123d32]'
              }`}
            >
              <div>
                {/* Status & Type Bar */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f5f4ef] text-[#414845]">
                    {item.type}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-[#eaf6ee] text-[#006d40]'
                        : isReview
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-[#fef9c3] text-[#854d0e]'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                    {isReview && <ShieldAlert className="w-3 h-3" />}
                    {isPlanned && <Clock className="w-3 h-3" />}
                    {item.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#1b1c19]">{item.title}</h3>

                {/* 1. Why it is relevant */}
                <div className="mt-2.5 text-xs text-[#202b29] bg-[#f5fbf8] p-2.5 rounded-lg border border-[#bfecdc]">
                  <strong className="text-[#123d32] block mb-0.5">Why this is relevant:</strong>
                  {item.relevanceReason}
                </div>

                {/* 2. Supporting history detail */}
                <div className="mt-2 text-xs text-[#5a6460]">
                  <span className="font-semibold text-[#1b1c19]">Supporting clinical indicator: </span>
                  {item.supportingDetail}
                </div>

                {/* 5. Preparation needed */}
                <div className="mt-2 text-xs text-[#717975] flex items-start gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5cba83] shrink-0 mt-0.5" />
                  <span><strong>Preparation:</strong> {item.preparation}</span>
                </div>

                {/* Completed summary if any */}
                {item.scoreSummary && (
                  <div className="mt-3 p-2.5 bg-[#eaf6ee] rounded-lg border border-[#a4d0c0] text-xs text-[#004d2c] font-medium">
                    {item.scoreSummary}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-[#e6e4dd] flex items-center justify-between">
                <span className="text-[11px] text-[#717975]">{item.timeEstimate}</span>
                {item.type === 'Questionnaire' ? (
                  <button
                    onClick={() => setActiveQuizAssessment(item)}
                    className="px-3.5 py-1.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isCompleted ? 'Retake Screener' : 'Start Screener'}</span>
                    <ChevronRight className="w-3 h-3 text-[#5cba83]" />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-[#123d32] bg-[#eaf6ee] px-2.5 py-1 rounded-full">
                    {item.existingReportLinked ? `Linked: ${item.existingReportLinked}` : 'Orders Ready'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Clinical Questionnaire Modal (e.g. IIEF-5 or Symptom Screener) */}
      {activeQuizAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#e6e4dd] max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#e6e4dd]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006d40] bg-[#eaf6ee] px-2 py-0.5 rounded">
                  Clinical Questionnaire
                </span>
                <h3 className="text-lg font-bold text-[#1b1c19] mt-1">{activeQuizAssessment.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuizAssessment(null)}
                className="text-[#717975] hover:text-[#1b1c19]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#5a6460]">
              Standardized validated clinical inventory. Your answers are stored locally with HIPAA encryption and help calculate your vascular endothelial score.
            </p>

            <div className="space-y-4">
              {[
                {
                  id: 0,
                  q: '1. Over the past 4 weeks, how would you rate your confidence that you could get and keep an erection?',
                  options: ['Very low (1)', 'Low (2)', 'Moderate (3)', 'High (4)', 'Very high (5)'],
                },
                {
                  id: 1,
                  q: '2. When you had erections with sexual stimulation, how often were your erections hard enough for penetration?',
                  options: ['Almost never/never (1)', 'A few times (2)', 'Sometimes (3)', 'Most times (4)', 'Almost always/always (5)'],
                },
                {
                  id: 2,
                  q: '3. During sexual intercourse, how often were you able to maintain your erection after penetration?',
                  options: ['Almost never/never (1)', 'A few times (2)', 'Sometimes (3)', 'Most times (4)', 'Almost always/always (5)'],
                },
                {
                  id: 3,
                  q: '4. During sexual intercourse, how difficult was it to maintain your erection to completion of intercourse?',
                  options: ['Extremely difficult (1)', 'Very difficult (2)', 'Difficult (3)', 'Slightly difficult (4)', 'Not difficult (5)'],
                },
                {
                  id: 4,
                  q: '5. When you attempted sexual intercourse, how often was it satisfactory for you?',
                  options: ['Almost never/never (1)', 'A few times (2)', 'Sometimes (3)', 'Most times (4)', 'Almost always/always (5)'],
                },
              ].map((question) => (
                <div key={question.id} className="p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs">
                  <h4 className="font-semibold text-[#1b1c19] mb-2">{question.q}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {question.options.map((opt, optIdx) => {
                      const scoreVal = optIdx + 1;
                      const isSelected = quizAnswers[question.id] === scoreVal;
                      return (
                        <button
                          key={optIdx}
                          onClick={() =>
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [question.id]: scoreVal,
                            }))
                          }
                          className={`p-2 rounded-lg text-center transition-all ${
                            isSelected
                              ? 'bg-[#123d32] text-white font-bold'
                              : 'bg-white border border-[#e6e4dd] text-[#5a6460] hover:bg-[#efeee9]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#e6e4dd] flex items-center justify-between">
              <span className="text-xs text-[#717975]">
                Score total: <strong>{Object.values(quizAnswers).reduce((a, b) => a + b, 0)} / 25</strong>
              </span>
              <button
                onClick={handleCompleteQuiz}
                className="px-5 py-2.5 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold transition-all shadow-md"
              >
                Submit & Record Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
