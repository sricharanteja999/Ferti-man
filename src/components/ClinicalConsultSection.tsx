import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  Lock,
  MessageSquare,
  FileText,
  ChevronRight,
  Info,
  CheckCircle2,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  AlertTriangle,
  Radio,
  Users,
  Play,
  Check,
  Bell,
  Share2,
  Eye,
  ShieldAlert,
  HelpCircle,
  Stethoscope,
  ExternalLink
} from 'lucide-react';

interface ClinicalConsultSectionProps {
  onTriggerRedFlag?: () => void;
}

interface WebinarItem {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  speakerImage: string;
  category: string;
  date: string;
  time: string;
  attendeesCount: number;
  isLiveNow: boolean;
  summary: string;
  keyTakeaways: string[];
}

interface TriageMessage {
  id: string;
  sender: 'consultant' | 'user';
  text: string;
  timestamp: string;
  isRedFlag?: boolean;
  suggestedFollowUps?: string[];
}

export const ClinicalConsultSection: React.FC<ClinicalConsultSectionProps> = ({
  onTriggerRedFlag,
}) => {
  // Main Portal View: 'private' (1-on-1 Virtual Guidance & Specialists) vs 'webinars' (Public Webinars)
  const [consultMode, setConsultMode] = useState<'private' | 'webinars'>('private');

  // Sub-view in Private Consultation: 'triage' (1-on-1 virtual consultant chat) vs 'specialists' (book video sessions)
  const [privateSubMode, setPrivateSubMode] = useState<'triage' | 'specialists'>('triage');

  // Specialist Filters
  const [specialistFilter, setSpecialistFilter] = useState<string>('All');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<{
    name: string;
    title: string;
    image: string;
    fee: number;
    avail: string;
  } | null>(null);
  const [activeVideoCall, setActiveVideoCall] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  // Anatomy Guide Hotspots
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>('Testes');

  // -------------------------------------------------------------
  // PUBLIC WEBINARS STATE
  // -------------------------------------------------------------
  const [webinarsFilter, setWebinarsFilter] = useState<string>('All');
  const [rsvpdWebinarIds, setRsvpdWebinarIds] = useState<string[]>(['webinar-2']);
  const [activeLiveWebinarModal, setActiveLiveWebinarModal] = useState<WebinarItem | null>(null);
  const [liveWebinarChat, setLiveWebinarChat] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: 'Dr. Alistair Khan, MD',
      text: 'Welcome everyone to today’s clinical masterclass on elevated DFI. Feel free to submit your questions anonymously in the live queue below.',
      time: '6:02 PM',
    },
    {
      sender: 'Attendee #104 (Anon)',
      text: 'How soon after starting high-dose Ubiquinol CoQ10 should we re-test DNA fragmentation?',
      time: '6:05 PM',
    },
    {
      sender: 'Dr. Alistair Khan, MD',
      text: 'Great question. Human spermatogenesis takes ~74 days, plus 14 days of epididymal transit. You must wait a minimum of 90 days before your follow-up SFA for an accurate readout.',
      time: '6:07 PM',
    },
    {
      sender: 'Attendee #219 (Anon)',
      text: 'Does grade 2 varicocele always need surgery if testosterone is normal?',
      time: '6:09 PM',
    },
  ]);
  const [newLiveQuestion, setNewLiveQuestion] = useState<string>('');

  const WEBINARS_DATA: WebinarItem[] = [
    {
      id: 'webinar-1',
      title: 'Overcoming Elevated DNA Fragmentation (DFI > 25%): AUA & EAU Clinical Protocols',
      speaker: 'Dr. Alistair Khan, MD, PhD',
      speakerTitle: 'Cornell / Weill Reproductive Urologist',
      speakerImage: '/assets/aistudio/Image_9_0763f943.jpeg',
      category: 'Sperm Quality & DFI',
      date: 'Today',
      time: '6:00 PM - 7:00 PM EST',
      attendeesCount: 342,
      isLiveNow: true,
      summary:
        'A comprehensive masterclass breaking down the causes of single- and double-strand DNA lesions, scrotal hyperthermia mitigation, and the 74-day cellular intervention protocol.',
      keyTakeaways: [
        'Why standard Semen Analysis (WHO 6th) can miss elevated DFI.',
        'Ubiquinol CoQ10 (200-400mg) and zinc/selenium mitochondrial shielding.',
        'When subclinical varicocele repair significantly reduces fragmentation.',
      ],
    },
    {
      id: 'webinar-2',
      title: 'Varicocele Repair vs. Embolization: Microscopic Subinguinal Protocols',
      speaker: 'Dr. Sarah Jenkins, MD',
      speakerTitle: 'Reproductive Endocrinology & Andrology Specialist',
      speakerImage: '/assets/aistudio/Image_14_629ef754.jpeg',
      category: 'Varicocele & Surgery',
      date: 'Thursday, Nov 12',
      time: '4:00 PM - 5:00 PM EST',
      attendeesCount: 188,
      isLiveNow: false,
      summary:
        'Comparing recurrence rates, scrotal cooling outcomes, and recovery timelines between microscopic subinguinal varicocelectomy and radiological coil embolization.',
      keyTakeaways: [
        'Gold standard: Subinguinal microsurgical ligation has < 1% recurrence.',
        'Impact on scrotal counter-current thermoregulation (restoring 34°C).',
        'Post-operative timeline for progressive motility and morphology recovery.',
      ],
    },
    {
      id: 'webinar-3',
      title: 'Optimizing Testosterone Without Shutting Down Spermatogenesis',
      speaker: 'Dr. Marcus Vance, MD',
      speakerTitle: 'Male Longevity & Endocrine Consultant',
      speakerImage: '/assets/aistudio/Image_9_0763f943.jpeg',
      category: 'Hormones & Testosterone',
      date: 'Saturday, Nov 14',
      time: '11:00 AM - 12:15 PM EST',
      attendeesCount: 275,
      isLiveNow: false,
      summary:
        'Why exogenous TRT suppresses LH/FSH and causes azoospermia, and how selective estrogen receptor modulators (Enclomiphene) and hCG preserve intratesticular testosterone.',
      keyTakeaways: [
        'The negative feedback loop: Exogenous T drops intratesticular T by 98%.',
        'Enclomiphene vs. Clomiphene citrate isomer pharmacology.',
        'Monitoring LH, FSH, Estradiol (E2), and SHBG balance.',
      ],
    },
  ];

  const handleToggleRsvp = (id: string) => {
    setRsvpdWebinarIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendWebinarQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLiveQuestion.trim()) return;
    setLiveWebinarChat((prev) => [
      ...prev,
      {
        sender: 'You (Anonymous)',
        text: newLiveQuestion.trim(),
        time: 'Just now',
      },
    ]);
    setNewLiveQuestion('');
  };

  // -------------------------------------------------------------
  // PRIVATE 1-ON-1 VIRTUAL MEDICAL CONSULTANT TRIAGE STATE
  // Protocol:
  // • Privacy First: Never ask for PII (name, address, ID). Keep session completely anonymous.
  // • Step-by-Step Triage: Do not overwhelm user with text walls. Ask 2–3 clarifying questions at a time.
  // • Clear Communication: Avoid heavy medical jargon. Break down into simple explanations.
  // • Safety Guardrails: Highlight red-flags that require urgent in-person care.
  // -------------------------------------------------------------
  const [triageMessages, setTriageMessages] = useState<TriageMessage[]>([
    {
      id: 'tm-1',
      sender: 'consultant',
      timestamp: 'Just now',
      text: `Hello. I am your licensed virtual health consultant. This is a strictly confidential, 1-on-1 anonymous medical consultation session (Session ID: **Anon-#7419**).
      
You can openly discuss any male reproductive, testicular, hormonal, or fertility concerns in a safe, judgment-free space. I will never ask for your name or personal identifiers.

What primary symptom or health question is on your mind today?`,
      suggestedFollowUps: [
        'Dull dragging ache in my left testicle / suspected varicocele',
        'Recent low sperm motility / count on a semen analysis',
        'Low energy, poor morning erections & testosterone questions',
        'Discomfort or mild burning after ejaculation',
      ],
    },
  ]);
  const [triageInput, setTriageInput] = useState<string>('');
  const [isTriageTyping, setIsTriageTyping] = useState<boolean>(false);

  const handleSendTriage = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: TriageMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText,
    };

    setTriageMessages((prev) => [...prev, userMsg]);
    setTriageInput('');
    setIsTriageTyping(true);

    const lower = userText.toLowerCase();

    // Red flag detection
    const isEmergency =
      lower.includes('severe pain') ||
      lower.includes('sudden pain') ||
      lower.includes('acute pain') ||
      lower.includes('torsion') ||
      lower.includes('blood in urine') ||
      lower.includes('hard lump') ||
      lower.includes('painless lump') ||
      lower.includes('fever') && lower.includes('testicle');

    setTimeout(() => {
      setIsTriageTyping(false);

      if (isEmergency) {
        const emergencyReply: TriageMessage = {
          id: `emergency-${Date.now()}`,
          sender: 'consultant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `⚠️ **IMPORTANT SAFETY ALERT**: The symptoms you described can indicate an acute medical situation that requires immediate physical examination:

• **Sudden, severe testicular pain** is a potential sign of **Testicular Torsion** (twisting of the spermatic cord), which requires emergency surgical evaluation within 4 to 6 hours to preserve the testicle.
• **A new hard, painless lump** on the testicle body itself requires an urgent scrotal ultrasound and physical palpation by a physician.

Please do not wait for virtual chat messages. **Proceed immediately to your nearest emergency department or urgent care facility.**`,
          isRedFlag: true,
          suggestedFollowUps: ['Open Emergency Red Flag Triage Protocol'],
        };
        setTriageMessages((prev) => [...prev, emergencyReply]);
        return;
      }

      // Step-by-Step Triage Responses: Asking 2-3 targeted clarifying questions
      let consultantReply = '';
      let followUps: string[] = [];

      if (lower.includes('ache') || lower.includes('drag') || lower.includes('varicocele') || lower.includes('heavy') || lower.includes('left')) {
        consultantReply = `Thank you for sharing that. A dull, dragging ache—especially on the left side of the scrotum—is very commonly related to a varicocele (dilated scrotal veins) or mild pelvic floor muscular tension.

To help me understand your situation better, could you answer these **3 quick questions**?

1. **Timing & Triggers**: Does the heaviness worsen toward the end of the day, after workouts, or after prolonged standing?
2. **Relief**: Does lying down flat on your back make the dull sensation disappear within 15–20 minutes?
3. **Severity**: On a scale of 1 to 10, how intense is the ache, and have you noticed any visible "bag of worms" texture when standing?`;
        followUps = [
          'Yes, it worsens when standing and disappears lying down (1/10 ache)',
          'It is constant all day regardless of posture (4/10)',
          'I have not noticed any lumps or visible veins',
        ];
      } else if (lower.includes('sperm') || lower.includes('motility') || lower.includes('count') || lower.includes('semen') || lower.includes('analysis')) {
        consultantReply = `I understand how stressful a semen analysis result can feel, but remember: sperm cells completely renew every **74 to 90 days**. A single sub-optimal test is a snapshot, not a permanent diagnosis.

To guide you on the best next steps, could you tell me:

1. **Abstinence Period**: How many days of abstinence (no ejaculation) did you observe before providing the sample (optimal is 2 to 5 days)?
2. **Key Parameters**: Did the report show issues with count, progressive motility, or morphology?
3. **Medications & Supplements**: Are you currently taking any prescription medications, testosterone boosters, or daily supplements?`;
        followUps = [
          'Abstinence was 3 days; motility was around 32%',
          'Count was low (11 M/mL), but motility was normal',
          'Currently taking standard multivitamin only',
        ];
      } else if (lower.includes('testosterone') || lower.includes('libido') || lower.includes('energy') || lower.includes('erect')) {
        consultantReply = `Hormonal balance and sexual vitality are influenced by sleep, stress, testicular circulation, and metabolic factors. Let's explore what might be driving this.

Could you share:

1. **Morning Quality**: Are you waking up with natural morning erections at least 2–3 times weekly?
2. **Circadian Sleep**: How many hours of restful sleep do you average per night, and when is your energy lowest during the day?
3. **Bloodwork**: Have you had a morning fasting total & free testosterone panel drawn between 7:00 AM and 10:00 AM?`;
        followUps = [
          'Morning erections are rare; sleep is around 6 hours',
          'Energy crashes severely around 2:00 PM',
          'Have not done formal hormone bloodwork yet',
        ];
      } else if (lower.includes('burn') || lower.includes('discomfort') || lower.includes('ejaculat')) {
        consultantReply = `Discomfort or burning after ejaculation can occur due to mild prostate inflammation (non-bacterial prostatitis), pelvic floor muscle hypertonicity, or mild urethral irritation.

To help narrow down the context:

1. **Onset & Duration**: When did this start, and does the discomfort last a few minutes or several hours after ejaculation?
2. **Urination**: Do you feel any burning or difficulty when urinating during normal daytime bathroom visits?
3. **Fluids**: Have you noticed any unusual discharge or change in seminal color (such as yellowish or pinkish tinge)?`;
        followUps = [
          'Discomfort lasts 10-15 minutes after ejaculation only',
          'No burning during normal daytime urination',
          'No discharge or abnormal seminal color',
        ];
      } else {
        consultantReply = `I understand, and I am here to assist you objectively and safely. 

To help me tailor our clinical guidance:

1. **Onset & Duration**: How long has this been occurring, and was the onset sudden or gradual?
2. **Current Severity**: How would you rate any discomfort or symptom intensity on a scale of 1 to 10?
3. **Current Regimen**: Are you taking any medications, testosterone boosters, or supplements?

*(Reminder: This virtual guidance is completely confidential and complements—rather than replaces—a physical exam or prescription from your local physician.)*`;
        followUps = [
          'It started gradually over the past 3 weeks',
          'Severity is mild (2 to 3 out of 10)',
          'Currently taking Vitamin D, Zinc, and daily multivitamin',
        ];
      }

      const consultantMsg: TriageMessage = {
        id: `consultant-${Date.now()}`,
        sender: 'consultant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: consultantReply,
        suggestedFollowUps: followUps,
      };

      setTriageMessages((prev) => [...prev, consultantMsg]);
    }, 700);
  };

  const organDescriptions: Record<string, { role: string; clinicalRelevance: string }> = {
    Testes: {
      role: 'Primary male reproductive gonads; site of seminiferous tubules (spermatogenesis) and interstitial Leydig cells (testosterone synthesis).',
      clinicalRelevance: 'Evaluated for volume, symmetry, and varicocele. Maintained 2-3°C cooler than core body temperature by the dartos and cremaster muscles.',
    },
    Epididymis: {
      role: 'Crescent-shaped duct behind testis where sperm undergo final maturation, flagellar motility acquisition, and storage for 10-14 days.',
      clinicalRelevance: 'Common site of post-infection epididymitis or obstructive cysts (spermatoceles).',
    },
    'Vas Deferens': {
      role: 'Muscular conduit that transports mature spermatozoa from the cauda epididymidis to the ejaculatory ducts during emission.',
      clinicalRelevance: 'Palpated on physical exam to confirm bilateral presence (absence can indicate congenital bilateral absence of the vas deferens, CBAVD, linked to CFTR).',
    },
    'Prostate Gland': {
      role: 'Fibromuscular glandular organ producing zinc-rich, slightly alkaline seminal fluid containing PSA (prostate-specific antigen) for semen liquefaction.',
      clinicalRelevance: 'Screened via digital rectal exam and serum PSA for benign prostatic hyperplasia (BPH) or prostatitis.',
    },
    'Seminal Vesicles': {
      role: 'Glands that secrete 60-70% of total seminal volume, containing fructose (energy source for sperm) and prostaglandins.',
      clinicalRelevance: 'Assessed on semen analysis when volume is < 1.4 mL or pH is acidic, indicating possible ejaculatory duct obstruction.',
    },
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Mode Selector */}
      <div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40] text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Board-Certified Clinical Network
          </span>
          <span className="text-xs text-[#5a6460] flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#5cba83]" />
            Strictly Anonymous & Encrypted
          </span>
        </div>
        <h2 className="text-2xl font-bold text-[#1b1c19] mt-1.5">Doctor Consultation & Clinical Guidance</h2>
        <p className="text-sm text-[#5a6460] max-w-2xl mt-0.5">
          Access private 1-on-1 virtual health guidance with licensed andrology consultants, or join live interactive public clinical webinars.
        </p>
      </div>

      {/* 2. Top Mode Switcher: Private Consultation vs Public & Webinars */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 bg-white border border-[#e6e4dd] rounded-2xl shadow-xs">
        <div className="flex p-1 bg-[#efeee9] rounded-xl w-full sm:w-auto">
          {/* Tab 1: Private Consultation */}
          <button
            onClick={() => setConsultMode('private')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
              consultMode === 'private'
                ? 'bg-white text-[#123d32] shadow-sm font-bold'
                : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            <Lock className={`w-3.5 h-3.5 ${consultMode === 'private' ? 'text-[#006d40]' : 'text-[#717975]'}`} />
            <span>Private 1-on-1 Consultation</span>
          </button>

          {/* Tab 2: Public & Webinars (Now Fully Functional!) */}
          <button
            onClick={() => setConsultMode('webinars')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-2 relative ${
              consultMode === 'webinars'
                ? 'bg-white text-[#123d32] shadow-sm font-bold'
                : 'text-[#5a6460] hover:text-[#1b1c19]'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${consultMode === 'webinars' ? 'text-[#ba1a1a]' : 'text-[#717975]'}`} />
            <span>Public & Webinars</span>
            <span className="w-2 h-2 rounded-full bg-[#5cba83] animate-pulse"></span>
          </button>
        </div>

        {/* Right Info Badge */}
        <div className="hidden md:flex items-center gap-3 px-3 text-xs text-[#5a6460]">
          {consultMode === 'private' ? (
            <span className="flex items-center gap-1.5 text-[#006d40] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#5cba83]" />
              Zero PII Recorded • Anonymous Client ID
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#ba1a1a] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
              Live Masterclass Broadcast Available
            </span>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. VIEW MODE A: PUBLIC & WEBINARS HUB                     */}
      {/* ========================================================= */}
      {consultMode === 'webinars' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Featured Live Masterclass Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c261e] via-[#123d32] to-[#17483c] text-white p-6 shadow-xl border border-[#2d554a]/40">
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#ba1a1a] text-white text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-sm">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    LIVE CLINICAL MASTERCLASS NOW
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-[#a3e4c0] text-xs font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    342 Anonymous Attendees
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-display">
                  Overcoming Elevated DNA Fragmentation (DFI &gt; 25%): AUA &amp; EAU Clinical Protocols
                </h3>

                <p className="text-xs md:text-sm text-[#d1e0d9] leading-relaxed">
                  Join reproductive urologist Dr. Alistair Khan for a live, interactive case review discussing single/double strand breaks, scrotal cooling protocols, and 74-day antioxidant stacks.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#a3e4c0]">
                  <span>Host: <strong>Dr. Alistair Khan, MD, PhD</strong></span>
                  <span>•</span>
                  <span>Anonymous Interactive Q&amp;A Open</span>
                </div>
              </div>

              {/* Action Button to Join */}
              <button
                onClick={() => setActiveLiveWebinarModal(WEBINARS_DATA[0])}
                className="px-6 py-3.5 rounded-full bg-[#5cba83] hover:bg-[#4aa872] text-[#00261e] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98 whitespace-nowrap self-start lg:self-auto"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Join Live Webinar Stream</span>
              </button>
            </div>
          </div>

          {/* Webinar Topic Filter Chips */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
              {['All Webinars', 'Sperm Quality & DFI', 'Varicocele & Surgery', 'Hormones & Testosterone'].map((f) => (
                <button
                  key={f}
                  onClick={() => setWebinarsFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    webinarsFilter === f
                      ? 'bg-[#123d32] text-white shadow-xs'
                      : 'bg-white text-[#5a6460] border border-[#e6e4dd] hover:bg-[#f5f4ef]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="text-xs text-[#5a6460] hidden sm:block">
              Free Community Access • Confidential
            </span>
          </div>

          {/* Upcoming Webinars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WEBINARS_DATA.filter((w) => webinarsFilter === 'All Webinars' || w.category === webinarsFilter || (webinarsFilter === 'All' && true)).map((webinar) => {
              const isRsvpd = rsvpdWebinarIds.includes(webinar.id);
              return (
                <div
                  key={webinar.id}
                  className="clinical-card-elevated p-5 bg-white border border-[#e6e4dd] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Status & Category */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-[#eaf6ee] text-[#006d40] text-[10px] font-bold">
                        {webinar.category}
                      </span>
                      {webinar.isLiveNow ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold flex items-center gap-1">
                          <Radio className="w-3 h-3 animate-pulse" /> Live Now
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#717975] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {webinar.date}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-[#1b1c19] leading-snug line-clamp-2">
                      {webinar.title}
                    </h4>

                    {/* Speaker info */}
                    <div className="flex items-center gap-3 p-2.5 bg-[#faf9f4] rounded-xl border border-[#e6e4dd]">
                      <img
                        src={webinar.speakerImage}
                        alt={webinar.speaker}
                        className="w-10 h-10 rounded-full object-cover border border-[#e6e4dd]"
                      />
                      <div className="truncate">
                        <div className="font-bold text-xs text-[#1b1c19] truncate">{webinar.speaker}</div>
                        <div className="text-[10px] text-[#5a6460] truncate">{webinar.speakerTitle}</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#5a6460] leading-relaxed line-clamp-3">
                      {webinar.summary}
                    </p>

                    {/* Key Takeaways */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold text-[#717975] uppercase tracking-wider">
                        Core Takeaways:
                      </div>
                      {webinar.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <div key={idx} className="text-[11px] text-[#3f4945] flex items-start gap-1.5 leading-tight">
                          <span className="text-[#006d40] font-bold mt-0.5">•</span>
                          <span>{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#f0eee6] flex items-center justify-between gap-2">
                    {webinar.isLiveNow ? (
                      <button
                        onClick={() => setActiveLiveWebinarModal(webinar)}
                        className="w-full py-2.5 px-4 rounded-full bg-[#123d32] hover:bg-[#00261e] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-[#5cba83]" />
                        <span>Join Live Broadcast</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleRsvp(webinar.id)}
                        className={`w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                          isRsvpd
                            ? 'bg-[#eaf6ee] text-[#006d40] border border-[#a4d0c0]'
                            : 'bg-[#123d32] hover:bg-[#1a4f41] text-white shadow-sm'
                        }`}
                      >
                        {isRsvpd ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#006d40]" />
                            <span>RSVP Confirmed (Reminder Set)</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-3.5 h-3.5 text-[#5cba83]" />
                            <span>Reserve Free Seat</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Archived Clinical Webinar Masterclass Library */}
          <div className="clinical-card p-5 bg-white border border-[#e6e4dd] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#1b1c19]">On-Demand Clinical Masterclass Library</h4>
                <p className="text-xs text-[#5a6460]">
                  Access recorded lectures, peer-reviewed slides, and transcript notes from previous clinical sessions.
                </p>
              </div>
              <span className="text-xs font-bold text-[#006d40] bg-[#eaf6ee] px-2.5 py-1 rounded-full">
                3 Archives Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { title: 'WHO 6th Edition Semen Parameters Decoded', duration: '48 mins', date: 'Oct 2026' },
                { title: 'Subclinical Varicocele & Oxidative Scrotal Stress', duration: '55 mins', date: 'Oct 2026' },
                { title: 'Microbiome of the Male Genital Tract & Semen Volume', duration: '42 mins', date: 'Sep 2026' },
              ].map((rec, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`Opening archive: "${rec.title}"`)}
                  className="p-3 bg-[#faf9f4] hover:bg-[#f0eee6] rounded-xl border border-[#e6e4dd] transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#717975]">
                    <span>{rec.duration}</span>
                    <span>{rec.date}</span>
                  </div>
                  <div className="font-bold text-xs text-[#1b1c19] group-hover:text-[#006d40] transition-colors leading-snug">
                    {rec.title}
                  </div>
                  <div className="text-[10px] text-[#006d40] font-semibold flex items-center gap-1 pt-1">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch Recording</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. VIEW MODE B: PRIVATE 1-ON-1 VIRTUAL CONSULTATION       */}
      {/* ========================================================= */}
      {consultMode === 'private' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sub-navigation inside Private Consultation */}
          <div className="flex items-center gap-2 border-b border-[#e6e4dd] pb-3">
            <button
              onClick={() => setPrivateSubMode('triage')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                privateSubMode === 'triage'
                  ? 'bg-[#123d32] text-white shadow-xs'
                  : 'bg-white text-[#5a6460] border border-[#e6e4dd] hover:bg-[#faf9f4]'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#5cba83]" />
              <span>Virtual 1-on-1 Health Guidance (Anonymous Triage)</span>
            </button>

            <button
              onClick={() => setPrivateSubMode('specialists')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                privateSubMode === 'specialists'
                  ? 'bg-[#123d32] text-white shadow-xs'
                  : 'bg-white text-[#5a6460] border border-[#e6e4dd] hover:bg-[#faf9f4]'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-[#5cba83]" />
              <span>Book Specialist Video Session</span>
            </button>
          </div>

          {/* ------------------------------------------------------- */}
          {/* SUB-VIEW 1: VIRTUAL 1-ON-1 HEALTH GUIDANCE (TRIAGE)     */}
          {/* Strictly follows user protocol:                         */}
          {/* • Empathetic, objective, professional, confidential      */}
          {/* • Privacy first: No PII, completely anonymous           */}
          {/* • Step-by-step triage: 2-3 clarifying questions          */}
          {/* • Clear communication: Avoid heavy jargon               */}
          {/* • Safety guardrails: Red flags & doctor disclaimer       */}
          {/* ------------------------------------------------------- */}
          {privateSubMode === 'triage' && (
            <div className="space-y-4">
              {/* Consultation Governance Banner */}
              <div className="p-4 bg-[#eaf6ee] rounded-2xl border border-[#a4d0c0] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#123d32] text-white flex items-center justify-center shrink-0">
                    <Stethoscope className="w-4 h-4 text-[#5cba83]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#123d32] flex items-center gap-2">
                      <span>Licensed Medical Consultant Virtual Triage</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#123d32] text-white text-[10px]">
                        Active • Anon-#7419
                      </span>
                    </div>
                    <p className="text-[#3f4945] text-[11px] mt-0.5">
                      Empathetic, confidential, and judgment-free guidance. Never ask for your name or ID.
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-[#5a6460] flex items-center gap-1.5 self-start md:self-auto">
                  <ShieldCheck className="w-4 h-4 text-[#006d40]" />
                  <span>Peer-to-Peer 256-Bit Encrypted</span>
                </div>
              </div>

              {/* Chat Window */}
              <div className="clinical-card-elevated bg-white border border-[#e6e4dd] rounded-2xl overflow-hidden flex flex-col h-[520px]">
                {/* Chat Message Stream */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 bg-[#faf9f4]/50">
                  {triageMessages.map((msg) => {
                    const isConsultant = msg.sender === 'consultant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isConsultant ? 'justify-start' : 'justify-end'}`}
                      >
                        {isConsultant && (
                          <div className="w-8 h-8 rounded-full bg-[#123d32] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                            MD
                          </div>
                        )}

                        <div className={`max-w-xl space-y-2`}>
                          <div
                            className={`p-4 rounded-2xl text-xs leading-relaxed ${
                              isConsultant
                                ? msg.isRedFlag
                                  ? 'bg-[#ffdad6] border border-[#ba1a1a] text-[#410002]'
                                  : 'bg-white border border-[#e6e4dd] text-[#1b1c19] shadow-xs'
                                : 'bg-[#123d32] text-white shadow-xs'
                            }`}
                          >
                            <div className="whitespace-pre-line">{msg.text}</div>

                            {/* Red Flag Escalation Button */}
                            {msg.isRedFlag && onTriggerRedFlag && (
                              <div className="mt-3 pt-3 border-t border-[#ba1a1a]/30">
                                <button
                                  onClick={onTriggerRedFlag}
                                  className="px-4 py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-md"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>Open Emergency Red Flag Triage Protocol</span>
                                </button>
                              </div>
                            )}

                            <div
                              className={`text-[10px] mt-2 text-right ${
                                isConsultant ? 'text-[#717975]' : 'text-white/70'
                              }`}
                            >
                              {msg.timestamp}
                            </div>
                          </div>

                          {/* Quick Suggested Follow-Up Triage Buttons */}
                          {isConsultant && msg.suggestedFollowUps && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {msg.suggestedFollowUps.map((action, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    if (action.includes('Red Flag') && onTriggerRedFlag) {
                                      onTriggerRedFlag();
                                    } else {
                                      handleSendTriage(action);
                                    }
                                  }}
                                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#eaf6ee] hover:border-[#5cba83] text-[#123d32] text-[11px] font-medium border border-[#e6e4dd] transition-all shadow-xs text-left"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {!isConsultant && (
                          <div className="w-8 h-8 rounded-full bg-[#5cba83] text-[#00261e] flex items-center justify-center shrink-0 text-xs font-bold">
                            Anon
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTriageTyping && (
                    <div className="flex items-center gap-2 text-xs text-[#5a6460]">
                      <div className="w-8 h-8 rounded-full bg-[#123d32] text-white flex items-center justify-center text-xs font-bold">
                        MD
                      </div>
                      <div className="p-3 bg-white rounded-2xl border border-[#e6e4dd] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#5cba83] animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-[#5cba83] animate-bounce delay-100"></span>
                        <span className="w-2 h-2 rounded-full bg-[#5cba83] animate-bounce delay-200"></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendTriage(triageInput);
                  }}
                  className="p-3 bg-white border-t border-[#e6e4dd] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={triageInput}
                    onChange={(e) => setTriageInput(e.target.value)}
                    placeholder="Describe your symptoms or questions (completely anonymous)..."
                    className="flex-1 px-4 py-2.5 text-xs bg-[#faf9f4] border border-[#e6e4dd] rounded-full focus:outline-none focus:border-[#5cba83] focus:ring-1 focus:ring-[#5cba83]"
                  />
                  <button
                    type="submit"
                    disabled={!triageInput.trim()}
                    className="p-2.5 rounded-full bg-[#123d32] hover:bg-[#00261e] text-white disabled:opacity-40 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4 text-[#5cba83]" />
                  </button>
                </form>
              </div>

              {/* Safety Guardrail Disclaimer */}
              <div className="p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-[11px] text-[#5a6460] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#5cba83] shrink-0" />
                <span>
                  <strong>Safety Protocol Notice:</strong> Virtual guidance complements—rather than replaces—a physical exam or prescription from your local doctor. Always seek emergency medical care for acute or sudden severe scrotal pain.
                </span>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------- */}
          {/* SUB-VIEW 2: SPECIALISTS VIDEO BOOKING ROSTER            */}
          {/* ------------------------------------------------------- */}
          {privateSubMode === 'specialists' && (
            <div className="space-y-6">
              {/* Specialist Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 scrollbar-none">
                {['All Specialists', 'Varicocele & Motility', 'Hormone Panels'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSpecialistFilter(f)}
                    className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap text-xs ${
                      specialistFilter === f
                        ? 'bg-[#123d32] text-white font-semibold'
                        : 'bg-white border border-[#e6e4dd] text-[#5a6460] hover:bg-[#faf9f4]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Specialist Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Doctor 1: Dr. Alistair Khan, MD, PhD */}
                <div className="clinical-card-elevated p-5 bg-white space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="/assets/aistudio/Image_9_0763f943.jpeg"
                      alt="Dr. Alistair Khan"
                      className="w-20 h-20 rounded-xl object-cover border border-[#e6e4dd] shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eaf6ee] text-[#006d40]">
                          Cornell / Weill Fellow
                        </span>
                        <span className="text-xs font-bold text-[#b45309] flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#b45309]" />
                          4.9 (142)
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#1b1c19] mt-1">Dr. Alistair Khan, MD, PhD</h3>
                      <p className="text-xs text-[#5a6460]">Reproductive Urologist &amp; Andrologist</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {['Varicocele', 'DNA Frag', 'Azoospermia'].map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-[#faf9f4] border border-[#e6e4dd] text-[10px] text-[#414845]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#faf9f4] rounded-xl text-xs border border-[#e6e4dd]">
                    <div className="flex items-center gap-2 text-[#1b1c19]">
                      <Calendar className="w-4 h-4 text-[#5cba83]" />
                      <div>
                        <span className="font-semibold block">Next Availability</span>
                        <span className="text-[#5a6460]">Today, 3:30 PM (EST)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#717975] block">Private 30-min</span>
                      <span className="font-bold text-base text-[#123d32]">$120</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedDoctorForBooking({
                          name: 'Dr. Alistair Khan, MD, PhD',
                          title: 'Reproductive Urologist & Andrologist',
                          image: '/assets/aistudio/Image_9_0763f943.jpeg',
                          fee: 120,
                          avail: 'Today, 3:30 PM (EST)',
                        });
                      }}
                      className="flex-1 py-3 px-4 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Video className="w-4 h-4 text-[#5cba83]" />
                      <span>Book 1-to-1 Private Session</span>
                    </button>
                    <button
                      onClick={() => setActiveVideoCall(true)}
                      title="Launch Live Telehealth Demo"
                      className="p-3 rounded-full bg-[#eaf6ee] hover:bg-[#d6eedf] text-[#006d40] border border-[#a4d0c0] transition-colors"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Doctor 2: Dr. Sarah Jenkins, MD */}
                <div className="clinical-card-elevated p-5 bg-white space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="/assets/aistudio/Image_14_629ef754.jpeg"
                      alt="Dr. Sarah Jenkins"
                      className="w-20 h-20 rounded-xl object-cover border border-[#e6e4dd] shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#eaf6ee] text-[#006d40]">
                          Endocrine Board
                        </span>
                        <span className="text-xs font-bold text-[#b45309] flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#b45309]" />
                          4.95 (98)
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#1b1c19] mt-1">Dr. Sarah Jenkins, MD</h3>
                      <p className="text-xs text-[#5a6460]">Reproductive Endocrinology &amp; Andrology</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {['Micronutrients', 'Hormonal Panels', 'LH / FSH'].map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-md bg-[#faf9f4] border border-[#e6e4dd] text-[10px] text-[#414845]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#faf9f4] rounded-xl text-xs border border-[#e6e4dd]">
                    <div className="flex items-center gap-2 text-[#1b1c19]">
                      <Calendar className="w-4 h-4 text-[#5cba83]" />
                      <div>
                        <span className="font-semibold block">Next Availability</span>
                        <span className="text-[#5a6460]">Tomorrow, 10:00 AM (EST)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#717975] block">Private 30-min</span>
                      <span className="font-bold text-base text-[#123d32]">$110</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedDoctorForBooking({
                          name: 'Dr. Sarah Jenkins, MD',
                          title: 'Reproductive Endocrinology & Andrology',
                          image: '/assets/aistudio/Image_14_629ef754.jpeg',
                          fee: 110,
                          avail: 'Tomorrow, 10:00 AM (EST)',
                        });
                      }}
                      className="flex-1 py-3 px-4 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Video className="w-4 h-4 text-[#5cba83]" />
                      <span>Book 1-to-1 Private Session</span>
                    </button>
                    <button
                      onClick={() => setActiveVideoCall(true)}
                      title="Launch Live Telehealth Demo"
                      className="p-3 rounded-full bg-[#eaf6ee] hover:bg-[#d6eedf] text-[#006d40] border border-[#a4d0c0] transition-colors"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pre-Consult Anatomy Prep Guides */}
              <div className="space-y-4 pt-4 border-t border-[#e6e4dd]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#123d32]" />
                    <h3 className="font-bold text-base text-[#1b1c19]">Pre-Consult Anatomy Prep Guides</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#f5f4ef] text-[#5a6460]">
                    AUA / EAU
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Guide 1: Male Reproductive Anatomy & Andrology */}
                  <div className="clinical-card-elevated p-5 bg-white space-y-3">
                    <div className="relative rounded-xl overflow-hidden border border-[#e6e4dd]">
                      <img
                        src="/assets/aistudio/Image_6_5fac1657.jpeg"
                        alt="Anatomy of Male Reproductive System"
                        className="w-full h-56 object-cover object-center"
                      />
                      <span className="absolute bottom-2.5 left-2.5 bg-[#123d32]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#5cba83]" />
                        Interactive Atlas
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#1b1c19]">Male Reproductive Anatomy &amp; Andrology</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaf6ee] text-[#006d40]">
                        Core Guide
                      </span>
                    </div>
                    <p className="text-xs text-[#5a6460]">
                      Explore primary hormonal conduits, seminal fluid contribution, and structural micro-vascular systems before your session.
                    </p>

                    {/* Hotspot pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Testes', 'Epididymis', 'Vas Deferens', 'Prostate Gland', 'Seminal Vesicles'].map((organ) => (
                        <button
                          key={organ}
                          onClick={() => setSelectedOrgan(organ)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            selectedOrgan === organ
                              ? 'bg-[#123d32] text-white'
                              : 'bg-[#faf9f4] border border-[#e6e4dd] text-[#5a6460] hover:bg-[#efeee9]'
                          }`}
                        >
                          {organ}
                        </button>
                      ))}
                    </div>

                    {selectedOrgan && organDescriptions[selectedOrgan] && (
                      <div className="bg-[#f5fbf8] border border-[#bfecdc] p-3 rounded-xl text-xs space-y-1">
                        <strong className="text-[#006d40] block">{selectedOrgan} Anatomy &amp; Function:</strong>
                        <p className="text-[#202b29]">{organDescriptions[selectedOrgan].role}</p>
                        <p className="text-[#5a6460] text-[11px]">
                          <strong>Clinical focus:</strong> {organDescriptions[selectedOrgan].clinicalRelevance}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Guide 2: Human Spermatogenesis and Sperm Anatomy */}
                  <div className="clinical-card-elevated p-5 bg-white space-y-3">
                    <div className="relative rounded-xl overflow-hidden border border-[#e6e4dd]">
                      <img
                        src="/assets/aistudio/Image_1_254fd6b6.jpeg"
                        alt="Human Spermatogenesis and Sperm Anatomy"
                        className="w-full h-56 object-cover object-top"
                      />
                      <span className="absolute bottom-2.5 left-2.5 bg-[#123d32]/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#5cba83]" />
                        Cellular Morphology
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#1b1c19]">Spermatogenesis &amp; Architecture</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#123d32] text-white">
                        72-Day Cycle
                      </span>
                    </div>
                    <p className="text-xs text-[#5a6460]">
                      Understand how DNA compaction, mitochondrial sheath density, and the acrosome enzyme cap directly impact motility test scores.
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                      <div className="p-2 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl">
                        <span className="font-bold block text-[#1b1c19]">Acrosome</span>
                        <span className="text-[10px] text-[#717975]">Enzyme Cap</span>
                      </div>
                      <div className="p-2 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl">
                        <span className="font-bold block text-[#1b1c19]">Midpiece</span>
                        <span className="text-[10px] text-[#717975]">ATP Powerhouse</span>
                      </div>
                      <div className="p-2 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl">
                        <span className="font-bold block text-[#1b1c19]">Axoneme</span>
                        <span className="text-[10px] text-[#717975]">Motility Tail</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reproductive Privacy Guarantee */}
          <div className="p-5 bg-white border border-[#e6e4dd] rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs text-[#5a6460]">
            <div className="p-3 bg-[#eaf6ee] rounded-full text-[#006d40] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-[#1b1c19]">Reproductive Privacy Guarantee</h4>
              <p className="mt-0.5 leading-relaxed">
                Consultations on MANLY take place in an isolated, peer-to-peer WebRTC encrypted tunnel. Diagnostic reports uploaded are auto-purged from edge caches after clinical consultation unless preserved in your encrypted personal locker.
              </p>
              <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-[#006d40]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Data Reselling
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SOC-2 Certified
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Client ID Anonymity
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODAL: LIVE WEBINAR BROADCAST & ANONYMOUS CHAT         */}
      {/* ========================================================= */}
      {activeLiveWebinarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1c17] rounded-2xl max-w-5xl w-full h-[88vh] shadow-2xl border border-[#1b4638] flex flex-col overflow-hidden text-white">
            {/* Top Bar */}
            <div className="p-4 bg-[#071a14] border-b border-[#1b4638] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" /> LIVE STREAM
                </span>
                <span className="font-bold text-white truncate max-w-md">
                  {activeLiveWebinarModal.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#a7f3d0] text-xs flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>342 Online</span>
                </span>
                <button
                  onClick={() => setActiveLiveWebinarModal(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Split Screen: Video Stream & Live Anonymous Q&A Chat */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-black">
              {/* Left: Main Video Broadcast */}
              <div className="lg:col-span-8 relative flex items-center justify-center bg-black overflow-hidden">
                <img
                  src="/assets/aistudio/Image_16_bdc9f6c5.jpeg"
                  alt="Webinar Video Feed"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Live Presentation Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[11px] text-[#a7f3d0] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>Presenter: <strong>Dr. Alistair Khan, MD, PhD</strong></span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-white/15 text-xs text-white max-w-lg">
                  <span className="text-[#5cba83] font-bold block mb-1">Slide 14: Cellular Protamination & DFI</span>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    "When histones are not fully replaced by protamines during Phase III spermiogenesis, the DNA remains vulnerable to reactive oxygen species. This is why antioxidant oral therapy requires 90 days."
                  </p>
                </div>
              </div>

              {/* Right: Live Anonymous Audience Q&A Stream */}
              <div className="lg:col-span-4 bg-[#071a14] border-l border-[#1b4638] flex flex-col h-full overflow-hidden">
                <div className="p-3 border-b border-[#1b4638] flex items-center justify-between text-xs bg-[#09221a]">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#5cba83]" />
                    Anonymous Q&amp;A Chat
                  </span>
                  <span className="text-[10px] text-[#a7f3d0]">Strictly Anonymous</span>
                </div>

                {/* Message Log */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  {liveWebinarChat.map((msg, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#0b281f] border border-[#1b4638] space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={`font-bold ${msg.sender.includes('Dr.') ? 'text-[#5cba83]' : 'text-slate-300'}`}>
                          {msg.sender}
                        </span>
                        <span className="text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-slate-200 text-[11px] leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Question Input */}
                <form onSubmit={handleSendWebinarQuestion} className="p-3 border-t border-[#1b4638] bg-[#071a14] flex gap-2">
                  <input
                    type="text"
                    value={newLiveQuestion}
                    onChange={(e) => setNewLiveQuestion(e.target.value)}
                    placeholder="Ask doctor anonymously..."
                    className="flex-1 px-3 py-2 text-xs bg-[#0b281f] border border-[#1b4638] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#5cba83]"
                  />
                  <button
                    type="submit"
                    disabled={!newLiveQuestion.trim()}
                    className="p-2 bg-[#5cba83] hover:bg-[#4aa872] text-[#00261e] font-bold rounded-xl disabled:opacity-40 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: BOOKING CONFIRMATION MODAL                      */}
      {/* ========================================================= */}
      {selectedDoctorForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e6e4dd] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e6e4dd]">
              <h3 className="font-bold text-base text-[#1b1c19]">Confirm Video Consultation</h3>
              <button
                onClick={() => setSelectedDoctorForBooking(null)}
                className="text-[#717975] hover:text-[#1b1c19]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={selectedDoctorForBooking.image}
                alt={selectedDoctorForBooking.name}
                className="w-14 h-14 rounded-xl object-cover border border-[#e6e4dd]"
              />
              <div>
                <h4 className="font-bold text-sm text-[#1b1c19]">{selectedDoctorForBooking.name}</h4>
                <p className="text-xs text-[#5a6460]">{selectedDoctorForBooking.title}</p>
                <span className="text-xs font-semibold text-[#006d40]">
                  ${selectedDoctorForBooking.fee} for 30-min clinical review
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#faf9f4] border border-[#e6e4dd] rounded-xl text-xs space-y-1.5 text-[#202b29]">
              <div className="flex justify-between">
                <span className="text-[#717975]">Selected Date/Time:</span>
                <span className="font-semibold">{selectedDoctorForBooking.avail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717975]">Client Privacy:</span>
                <span className="font-semibold text-[#006d40]">Anon-#7419 (Encrypted)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717975]">Encryption:</span>
                <span className="font-semibold">WebRTC 256-bit AES</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDoctorForBooking(null);
                setActiveVideoCall(true);
              }}
              className="w-full py-3 rounded-full bg-[#123d32] hover:bg-[#1a4f41] text-white text-xs font-bold transition-all shadow-md"
            >
              Confirm Appointment &amp; Enter Waiting Room
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. MODAL: LIVE TELEHEALTH VIDEO CALL SIMULATION           */}
      {/* ========================================================= */}
      {activeVideoCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1c17] rounded-2xl max-w-4xl w-full h-[85vh] shadow-2xl border border-[#1b4638] flex flex-col overflow-hidden text-white">
            {/* Top Call Info */}
            <div className="p-4 bg-[#071a14] border-b border-[#1b4638] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-bold text-white">Active Clinical Telehealth Consultation</span>
                <span className="text-emerald-400 font-mono">14:28</span>
              </div>
              <div className="text-[#a7f3d0] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>HIPAA Encrypted Peer-to-Peer Tunnel</span>
              </div>
            </div>

            {/* Video Main Feed */}
            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
              <img
                src="/assets/aistudio/Image_16_bdc9f6c5.jpeg"
                alt="Telehealth Video Stream with Andrologist"
                className="w-full h-full object-cover object-center"
              />

              {/* Patient Self-View PiP */}
              <div className="absolute top-4 right-4 w-36 h-28 bg-[#123d32] rounded-xl border-2 border-[#5cba83] overflow-hidden shadow-2xl flex items-center justify-center">
                <span className="text-[11px] text-[#a7f3d0] font-semibold">Client (Anon-#7419)</span>
              </div>

              {/* Live Medical Discussion Subtitle Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white max-w-xl">
                <p className="font-semibold text-[#5cba83]">Dr. Alistair Khan, MD:</p>
                <p className="text-slate-200 mt-0.5">
                  "I'm reviewing your semen analysis. Your concentration is strong at 48 M/mL. The 18.2% DFI is consistent with the mild reflux on your left ultrasound. Your 90-day antioxidant protocol is already moving the needle."
                </p>
              </div>
            </div>

            {/* Bottom Call Controls */}
            <div className="p-4 bg-[#071a14] border-t border-[#1b4638] flex items-center justify-between">
              <div className="text-xs text-[#94a3b8]">
                <span>Attached: </span>
                <strong className="text-white">Cornell_SFA_WHO6th.pdf</strong>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full transition-colors ${
                    isMuted ? 'bg-red-600 text-white' : 'bg-[#123d32] text-white hover:bg-[#1b4e3e]'
                  }`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoMuted ? 'bg-red-600 text-white' : 'bg-[#123d32] text-white hover:bg-[#1b4e3e]'
                  }`}
                >
                  {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setActiveVideoCall(false)}
                  className="px-5 py-3 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Leave Consultation</span>
                </button>
              </div>

              <button
                onClick={() => setActiveVideoCall(false)}
                className="text-xs text-[#94a3b8] hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
