import { BookOpen, BriefcaseBusiness, CircleDollarSign, Compass, HeartPulse, House, Megaphone, Users } from "lucide-react";

export const navItems = [
  { label: "Who We Are", to: "/who-we-are" },
  { label: "Programs", to: "/programs" },
  { label: "Pathway", to: "/athlete-pathway" },
  { label: "Impact", to: "/impact" },
  { label: "Partners", to: "/partners" },
  { label: "Get Involved", to: "/get-involved" },
] as const;

export const programs = [
  { icon: Compass, title: "Faith, Purpose and Identity", short: "Ground identity in faith, values, and purpose that outlast performance.", serves: "Athletes and families navigating pressure, transition, or questions of identity.", receive: "Values-based curriculum, guided reflection, trusted mentors, and a personal purpose framework.", activities: "Small groups, purpose workshops, family conversations, and one-to-one mentoring.", outcome: "A grounded identity and a clear definition of success beyond statistics." },
  { icon: CircleDollarSign, title: "Financial Literacy and Stewardship", short: "Build confidence to steward income, opportunity, and responsibility wisely.", serves: "Athletes and families at every earning stage, from aspiring competitors to professionals.", receive: "Plain-language education on cash flow, taxes, credit, risk, giving, and long-term planning.", activities: "Financial foundations labs, scenario planning, professional Q&A, and family stewardship sessions.", outcome: "Informed decisions, stronger safeguards, and habits designed for long-term stability." },
  { icon: BriefcaseBusiness, title: "Business, Ownership and Entrepreneurship", short: "Turn ideas and influence into durable, values-aligned ownership.", serves: "Athletes exploring a venture, investment readiness, or a path to ownership.", receive: "Business fundamentals, idea validation, operating guidance, and vetted expert access.", activities: "Founder labs, business model workshops, due diligence education, and pitch practice.", outcome: "Clearer decisions, viable plans, and ownership built on substance rather than attention." },
  { icon: BookOpen, title: "Career and Transition Development", short: "Prepare for the next chapter before the final whistle.", serves: "Current and former athletes preparing for education, employment, or career reinvention.", receive: "Strengths discovery, career navigation, professional readiness, and transition support.", activities: "Skills translation, résumé sessions, job shadowing, interviews, and career introductions.", outcome: "A credible next-step plan and confidence carrying athletic strengths into new arenas." },
  { icon: HeartPulse, title: "Mental, Physical and Emotional Wellness", short: "Support the whole person through pressure, change, and recovery.", serves: "Athletes and families seeking coordinated, confidential wellness education and resources.", receive: "Wellness literacy, recovery practices, healthy relationship tools, and vetted referrals.", activities: "Resilience sessions, family wellness conversations, recovery planning, and provider navigation.", outcome: "Greater self-awareness, healthier support systems, and earlier access to appropriate care." },
  { icon: House, title: "Family and Generational Legacy", short: "Equip the people who carry the journey together.", serves: "Athletes, parents, spouses, caregivers, and the wider family system.", receive: "Shared language, family decision tools, estate education, and legacy conversations.", activities: "Family forums, communication workshops, stewardship planning, and legacy mapping.", outcome: "More aligned families, clearer expectations, and decisions that consider future generations." },
  { icon: Megaphone, title: "Brand, Media and Opportunity", short: "Navigate visibility with discernment, agency, and integrity.", serves: "Athletes evaluating media, personal brand, NIL, speaking, or commercial opportunities.", receive: "Brand literacy, contract education, media readiness, and opportunity evaluation tools.", activities: "Message development, media training, mock negotiations, and conflict disclosure practice.", outcome: "A values-aligned public presence and the confidence to ask better questions before saying yes." },
  { icon: Users, title: "Community Impact and Youth Mentorship", short: "Turn lived experience into service that multiplies.", serves: "Athletes ready to mentor, lead, give back, or build a community initiative.", receive: "Mentor preparation, service design, safeguarding practices, and community connections.", activities: "Youth mentorship, service projects, leadership circles, and community partner activations.", outcome: "Responsible leadership and impact that continues through others." },
] as const;

export const pathway = [
  { step: "01", title: "Discover", text: "Begin with a confidential assessment of the whole person, family, priorities, and season of life." },
  { step: "02", title: "Educate", text: "Build practical understanding before considering products, introductions, or opportunities." },
  { step: "03", title: "Connect", text: "Meet vetted mentors, professionals, and resources selected around the athlete's needs." },
  { step: "04", title: "Build", text: "Create an individualized Legacy Action Plan with clear priorities, actions, and accountability." },
  { step: "05", title: "Multiply", text: "Return as a mentor, ambassador, and community leader who helps the next person rise." },
] as const;

export const trustStandards = ["Athlete interest first", "Education before opportunity", "No hidden compensation", "Transparent conflicts", "Confidentiality and consent", "Vetted professionals"];

export const roleOptions = ["Athlete", "Former Athlete", "Parent or Family", "Coach", "Mentor", "Business Leader", "Donor", "Organization"];
