import React, { useState } from 'react';
import { ChatMessage, MedicalRecord, UserProfile } from '../types';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  HelpCircle,
  BookOpen,
  AlertTriangle,
  FileText,
  ThumbsUp,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface AICoachSectionProps {
  user: UserProfile;
  records: MedicalRecord[];
  onTriggerRedFlag: () => void;
}

export const AICoachSection: React.FC<AICoachSectionProps> = ({
  user,
  records,
  onTriggerRedFlag,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Hello ${user.name}. I am **M-CARE AI**, your male reproductive longevity and clinical preparation companion. I have reviewed your current 90-day cycle (Day ${user.protocolDay} • Meiotic Phase II) and your uploaded lab reports, including your recent Semen Analysis and Endocrine panel.

How can I assist your health and clinical prep today?`,
      citations: ['AUA Male Infertility Guidelines', 'WHO Laboratory Manual for the Examination of Human Semen (6th Ed.)'],
      suggestedActions: [
        'Explain my 18.2% DNA Fragmentation Index (DFI)',
        'Why does spermatogenesis require 72 to 90 days?',
        'How does scrotal temperature impact meiotic cell division?',
        'What questions should I ask Dr. Vance about my varicocele ultrasound?'
      ],
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const lower = userText.toLowerCase();

    // Check for acute emergency keywords
    if (
      lower.includes('severe pain') ||
      lower.includes('acute pain') ||
      lower.includes('testicular pain') ||
      lower.includes('swelling') ||
      lower.includes('torsion') ||
      lower.includes('blood in urine')
    ) {
      setTimeout(() => {
        setIsTyping(false);
        const alertMsg: ChatMessage = {
          id: `alert-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `🚨 **CLINICAL ESCALATION NOTICE**: Sudden or severe testicular pain, acute unilateral enlargement, or sudden scrotal trauma requires immediate emergency medical evaluation.

This could be a sign of **Testicular Torsion**, an emergency requiring surgical review within 4-6 hours to preserve testicular viability.

Please do not wait for chat responses or app logging. Go directly to the nearest Emergency Room or dial 911 immediately.`,
          isUrgentEscalation: true,
          suggestedActions: ['Open Red Flag Clinical Triage Protocol'],
        };
        setMessages((prev) => [...prev, alertMsg]);
      }, 600);
      return;
    }

    // Contextual responses based on user clinical data
    setTimeout(() => {
      setIsTyping(false);

      let botReply = '';
      let citations: string[] = ['WHO 6th Edition Semen Manual', 'American Urological Association (AUA)'];
      let actions: string[] = [];

      if (lower.includes('dna fragmentation') || lower.includes('dfi')) {
        botReply = `### Understanding Your 18.2% DNA Fragmentation Index (DFI)

Your recent SFA report from Weill Cornell showed a **DNA Fragmentation Index of 18.2%**.

1. **What It Measures**: DFI measures the proportion of sperm containing damaged or broken DNA strands. The optimal threshold is typically **< 15%**, while values between 15% and 25% indicate mild to moderate oxidative stress.
2. **Clinical Significance**: Intact sperm chromatin is crucial for fertilization, blastocyst progression, and pregnancy viability.
3. **Good News**: Unlike female eggs, men regenerate an entirely fresh cohort of sperm every **72–90 days**. Because you are on **Day ${user.protocolDay}**, the cellular interventions you are practicing today (your CoQ10 200mg, Zinc/Selenium stack, and cool sleep temperature) will directly manifest in the mature sperm released around Day 74–90!

*Important Reminder: This educational explanation does not constitute a diagnosis. Dr. Vance will review your follow-up SFA scheduled for Day 74.*`;
        actions = ['Review antioxidant regimen', 'Schedule SFA follow-up'];
      } else if (lower.includes('90 days') || lower.includes('72')) {
        botReply = `### Why Human Spermatogenesis Requires 72 to 90 Days

Human sperm production is one of the most intricate biological manufacturing processes in nature:

1. **Spermatogonia Mitosis (Days 1–25)**: Stem cells proliferate along the basement membrane under Sertoli cell guidance.
2. **Meiotic Chromosome Reduction (Days 26–55)**: Diploid cells undergo genetic recombination to become haploid (1n). This is your current phase (**Day ${user.protocolDay}**), where developing cells are exquisitely sensitive to reactive oxygen species (ROS) and scrotal hyperthermia.
3. **Spermiogenesis & Packaging (Days 56–74)**: Round spermatids shed excess cytoplasm, compact their DNA with protamines, and grow an enzymatic acrosome cap.
4. **Epididymal Transit (Days 75–90)**: Sperm gain forward progressive motility and membrane glycoproteins in the epididymis.

Every healthy choice you make today directly influences the sperm that will mature in approximately 10 to 12 weeks.`;
        actions = ['Explore 3D Spermatogenesis Roadmap', 'View Phase II Milestones'];
      } else if (lower.includes('varicocele') || lower.includes('ultrasound')) {
        botReply = `### Reviewing Your Scrotal Doppler Ultrasound Findings

Your ultrasound from Metropolitan Imaging documented:
- **Left Pampiniform Vein**: 2.9 mm diameter during Valsalva (mild dilation).
- **Reflux Time**: 0.8 seconds (under the 1.0s threshold).
- **Testicular Volumes**: Right 16.2 cc, Left 15.8 cc (healthy symmetry).

**Key Questions for Dr. Vance at Your Next Check-In:**
1. *"Does my Grade 1 subclinical left varicocele contribute significantly to my 18.2% DFI?"*
2. *"Is conservative scrotal thermoregulation and antioxidant therapy sufficient, or would follow-up ultrasound in 6 months be prudent?"*
3. *"Are there specific athletic exercises or lifting techniques I should modify to reduce venous retrograde pooling?"*`;
        actions = ['Book Check-in with Dr. Vance', 'View Scrotal Cooling Habits'];
      } else if (lower.includes('temp') || lower.includes('heat') || lower.includes('shower')) {
        botReply = `### Scrotal Thermoregulation & Meiotic Cellular Stress

The human testes reside outside the abdominal cavity within the scrotum specifically to maintain a temperature **2.0°C to 3.5°C lower than core body temperature** (~34.0°C vs 37.0°C).

- **Thermal Impact on Meiosis**: Elevated scrotal temperature (from hot tubs, saunas, heated car seats, or laptop computers placed on the lap) triggers heat-shock proteins and causes mitochondrial membrane leakage in meiotic spermatocytes.
- **DNA Breakage**: Elevated temperature increases lipid peroxidation in sperm membranes, driving up DNA fragmentation.
- **Recommended Action**: Continue your post-workout cool rinse, choose loose cotton undergarments, and avoid prolonged seated posture without standing breaks.`;
        actions = ['Log Scrotal Cooling in Daily Check-in'];
      } else {
        botReply = `Thank you for sharing, ${user.name}. Based on your health profile and Day ${user.protocolDay} protocol:

- **Current Biological Focus**: Meiotic chromosome pairing and Sertoli barrier protection.
- **Lifestyle Synergy**: Your logged 8.2 hours of sleep and 2.8L hydration are providing strong biological support for testosterone synthesis and seminal plasma buffering.
- **Next Milestone**: Day 45 (Chromatin compaction and histone-to-protamine transition).

Would you like me to elaborate on your micronutrient antioxidant shield, prepare questions for your andrologist consultation, or check on any specific symptoms?`;
        actions = ['Discuss micronutrient stack', 'Prepare consultation notes'];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botReply,
        citations,
        suggestedActions: actions,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#123d32] text-xs font-semibold">
              M-CARE AI Assistant
            </span>
            <span className="text-xs text-[#717975] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[#5cba83]" />
              Contextual to Uploaded SFA & Endocrine Records
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#1b1c19] mt-1">AI Health Coach & Clinical Preparation</h2>
          <p className="text-sm text-[#5a6460] max-w-2xl mt-0.5">
            Ask questions about your lab values, understand the 90-day spermatogenesis biology, and prepare actionable inquiries for your reproductive urologist.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="clinical-card-elevated bg-white flex flex-col h-[650px] overflow-hidden">
        {/* Top Info Bar */}
        <div className="p-3.5 bg-[#f5fbf8] border-b border-[#e6e4dd] flex items-center justify-between text-xs text-[#123d32]">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#006d40]" />
            <span className="font-semibold">M-CARE Clinical Assistant (AUA/WHO Grounded)</span>
          </div>
          <span className="text-[11px] text-[#717975]">
            Patient: David (Day {user.protocolDay}/90) • Doctor: {user.assignedDoctor.name}
          </span>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isEscalation = msg.isUrgentEscalation;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-[#123d32] text-white'
                      : isEscalation
                      ? 'bg-[#ba1a1a] text-white'
                      : 'bg-[#eaf6ee] text-[#006d40]'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : isEscalation ? <AlertTriangle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Body */}
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-[#123d32] text-white rounded-tr-none'
                      : isEscalation
                      ? 'bg-[#fff8f7] border-2 border-[#ba1a1a] text-[#93000a] rounded-tl-none'
                      : 'bg-[#faf9f4] border border-[#e6e4dd] text-[#202b29] rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line prose prose-xs">
                    {msg.text}
                  </div>

                  {/* Red Flag Trigger button if escalation */}
                  {isEscalation && (
                    <div className="pt-2">
                      <button
                        onClick={onTriggerRedFlag}
                        className="px-4 py-2 bg-[#ba1a1a] text-white font-bold text-xs rounded-full hover:bg-[#93000a] transition-colors flex items-center gap-2"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Open Emergency Red Flag Triage Protocol</span>
                      </button>
                    </div>
                  )}

                  {/* Citations if available */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-[#e6e4dd]/70 text-[10px] text-[#717975] flex items-center gap-1.5 flex-wrap">
                      <BookOpen className="w-3 h-3 text-[#5cba83]" />
                      <span>References:</span>
                      {msg.citations.map((c: any, idx: number) => (
                        <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#e6e4dd] text-[#5a6460]">
                          {typeof c === "string" ? c : (c.title || JSON.stringify(c))}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Suggested Quick Prompt Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="pt-2 space-y-1">
                      <div className="text-[10px] text-[#717975] font-semibold">Suggested topics:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(action)}
                            className="px-2.5 py-1 bg-white hover:bg-[#eaf6ee] hover:text-[#006d40] border border-[#e6e4dd] text-[#5a6460] rounded-full text-[11px] font-medium transition-colors text-left"
                          >
                            {action} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-[#94a3b8] text-right pt-0.5">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-sm">
              <div className="w-8 h-8 rounded-full bg-[#eaf6ee] text-[#006d40] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-2xl rounded-tl-none text-xs text-[#717975] flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#5cba83]" />
                <span>M-CARE AI is cross-referencing your medical documents...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#e6e4dd]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about sperm parameters, hormones, 90-day biology, or doctor questions..."
              className="flex-1 px-4 py-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs outline-none focus:border-[#123d32] focus:ring-1 focus:ring-[#123d32]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-3 bg-[#123d32] hover:bg-[#1a4f41] disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4 text-[#5cba83]" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
          <div className="mt-2 text-[10px] text-[#717975] flex items-center justify-between px-1">
            <span>M-CARE AI is an educational clinical assistant. In emergencies, call 911 or visit the nearest ER.</span>
            <span>Zero telemetry reselling</span>
          </div>
        </div>
      </div>
    </div>
  );
};
