// Plumber Template Site Configuration
// Game-theory-informed structure: every section designed to move the prospect
// from attention → trust → value → commitment → conversion
//
// Sales psychology applied:
// - Kahneman: Anchoring, loss aversion, System 1 triggers
// - Cialdini: Reciprocity (free tools), social proof, authority, commitment
// - Voss: Labeling emotions, calibrated questions
// - Belfort: Three Tens (product/company/person certainty)
// - Hormozi: Value equation (dream outcome x likelihood / time x effort)
// - Cardone: Speed, urgency, massive action

const siteConfig = {
  business: {
    name: "Apex Plumbing Co.",
    ownerName: "Mike Thompson",
    ownerFirstName: "Mike",
    tagline: "Trusted Plumbing. Done Right.",
    // Hook: contradiction between what homeowners expect (unreliable, overpriced) and what we deliver
    description: "Licensed, insured, and trusted by over 2,000 homeowners. We handle everything from emergency repairs to full remodels with upfront pricing and a satisfaction guarantee.",
    story: "I started Apex Plumbing 15 years ago with one truck and a simple promise: show up on time, do honest work, and charge a fair price. Today our team of 8 licensed plumbers serves the entire metro area, but that promise has not changed. Every job gets the same care whether it is a leaky faucet or a whole-house repipe.",
    founded: 2011,
    licenseNumber: "PLB-2011-04892",
    insuranceProvider: "State Farm Commercial",
    insuranceAmount: "$2M",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    teamSize: 8,
  },

  contact: {
    phone: "+15551234567",
    phoneDisplay: "(555) 123-4567",
    email: "mike@apexplumbing.com",
    address: "1247 Industrial Parkway",
    city: "Austin",
    state: "TX",
    zip: "78701",
    fullAddress: "1247 Industrial Parkway, Austin, TX 78701",
    emergencyPhone: "+15551234567",
    emergencyPhoneDisplay: "(555) 123-4567",
    hours: "Mon-Sat 7am-7pm | Emergency 24/7",
  },

  credentials: {
    yearsExperience: 15,
    jobsCompleted: 2400,
    satisfactionRate: 98,
    responseTime: "45 min",
    googleRating: 4.9,
    reviewCount: 387,
    warrantyYears: 2,
    // Belfort Three Tens: product certainty, company certainty, person certainty
    // These stats build ALL THREE at once
  },

  // HERO: Pattern interrupt + emergency CTA + loss frame
  // Kahneman: Loss aversion (every minute costs money)
  // Cardone: Speed and urgency
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=2000&q=80",
    headline: "Plumbing Problems. Fixed Today.",
    subheadline: "Licensed plumbers at your door in under an hour. Upfront pricing. No surprises.",
    ctaText: "Get a Free Quote",
    emergencyCtaText: "Emergency? Call Now",
    // Loss frame badge shown on mobile
    urgencyBadge: "Every minute of a leak costs you money",
  },

  // TRUST BAR: Instant authority signals
  // Cialdini: Authority + Social Proof combined
  trustBar: [
    { label: "Licensed & Insured", icon: "Shield" },
    { label: "4.9★ Google Rating", icon: "Star" },
    { label: "2,400+ Jobs Done", icon: "CheckCircle" },
    { label: "2-Year Warranty", icon: "Award" },
    { label: "24/7 Emergency", icon: "Clock" },
  ],

  // STATS: Anchoring with specific numbers (Kahneman)
  // Specific > vague. "2,400 jobs" > "thousands of jobs"
  stats: [
    { number: 15, suffix: "+", label: "Years Experience" },
    { number: 2400, suffix: "+", label: "Jobs Completed" },
    { number: 98, suffix: "%", label: "Satisfaction Rate" },
    { number: 45, suffix: "min", label: "Avg Response Time" },
  ],

  // SERVICES: Transparent pricing = trust signal (Signaling Theory)
  // Most plumbers hide prices. Showing them is a differentiator.
  // Popular tags = social proof (Cialdini: consensus)
  services: [
    {
      name: "Emergency Repairs",
      description: "Burst pipes, sewage backups, and major leaks fixed fast. We arrive in under 60 minutes, 24/7.",
      icon: "Siren",
      priceRange: "$150 - $500",
      popular: true,
    },
    {
      name: "Drain Cleaning",
      description: "Slow drains, clogs, and blockages cleared with professional-grade equipment. Camera inspection included.",
      icon: "Waves",
      priceRange: "$99 - $350",
    },
    {
      name: "Water Heater",
      description: "Repair or replace your water heater. We work with tank, tankless, and hybrid systems from all major brands.",
      icon: "Flame",
      priceRange: "$200 - $2,500",
      popular: true,
    },
    {
      name: "Pipe Repair & Repipe",
      description: "From pinhole leaks to full copper or PEX repiping. We fix it right the first time with a written warranty.",
      icon: "Wrench",
      priceRange: "$175 - $5,000",
    },
    {
      name: "Fixture Installation",
      description: "Faucets, toilets, sinks, garbage disposals, and more. Clean installation with proper connections.",
      icon: "Droplets",
      priceRange: "$125 - $600",
    },
    {
      name: "Sewer Line Service",
      description: "Video inspection, hydro jetting, trenchless repair, and full sewer line replacement.",
      icon: "Construction",
      priceRange: "$300 - $8,000",
    },
  ],

  // PROCESS: Reduce perceived effort (Hormozi Value Equation)
  // Value = Dream Outcome × Perceived Likelihood / Time Delay × Effort
  // By showing a simple 5-step process, we minimize Time Delay and Effort
  process: [
    {
      step: 1,
      title: "Call or Book Online",
      description: "Describe your issue. We ask a few questions to understand the urgency and send the right plumber.",
      icon: "Phone",
    },
    {
      step: 2,
      title: "Fast Dispatch",
      description: "A licensed plumber arrives at your door, on time, in a marked truck with the tools to handle your job.",
      icon: "Truck",
    },
    {
      step: 3,
      title: "Diagnose & Quote",
      description: "We inspect the problem, explain what we find, and give you a fixed price before touching a single pipe.",
      icon: "Search",
    },
    {
      step: 4,
      title: "Expert Repair",
      description: "We do the work right the first time. Clean workspace, quality parts, and zero shortcuts.",
      icon: "Wrench",
    },
    {
      step: 5,
      title: "Final Walkthrough",
      description: "We walk you through everything we did, answer questions, and make sure you are 100% satisfied before we leave.",
      icon: "CheckCircle",
    },
  ],

  // TESTIMONIALS: Specific social proof matching reference groups
  // Cialdini: Social proof is most powerful when the reference matches the reader
  // Each testimonial covers a different service = different reader segment
  testimonials: [
    {
      quote: "Our basement was flooding at 2am on a Sunday. Mike had a plumber here in 35 minutes. They stopped the leak, cleaned up, and had the pipe replaced by Monday afternoon. Cannot say enough good things.",
      name: "Sarah Mitchell",
      detail: "Emergency Pipe Repair",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      quote: "Got three quotes for a tankless water heater install. Apex was the middle price but the only one who actually explained what the job involved. No hidden fees, finished in one day.",
      name: "David Chen",
      detail: "Tankless Water Heater Install",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      quote: "They repiped our entire 1960s ranch house in three days. The crew was respectful, covered the floors, and left the place cleaner than they found it. Two year warranty sealed the deal.",
      name: "Jennifer & Tom Brooks",
      detail: "Whole-House Repipe",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
    {
      quote: "Simple faucet replacement. They showed up on time, did a great job, and charged exactly what they quoted. That is all I ask for. Will use again.",
      name: "Robert Hayes",
      detail: "Kitchen Faucet Replacement",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
  ],

  // SERVICE AREAS: Reduce uncertainty
  // Nash Equilibrium: prospect's best response at each step is to engage deeper
  serviceAreas: [
    { name: "Downtown Austin", description: "Full service coverage including high-rise and commercial plumbing.", responseTime: "30 min" },
    { name: "North Austin", description: "Round Rock, Cedar Park, and Pflugerville. Residential specialists.", responseTime: "40 min" },
    { name: "South Austin", description: "Buda, Kyle, and San Marcos corridor. Same-day service available.", responseTime: "45 min" },
    { name: "East Austin", description: "Manor, Elgin, and surrounding communities. No trip charge.", responseTime: "40 min" },
    { name: "West Austin", description: "Lakeway, Bee Cave, and Westlake. Premium home specialists.", responseTime: "35 min" },
    { name: "Georgetown", description: "Sun City and Georgetown proper. Senior-friendly service.", responseTime: "50 min" },
  ],

  // FAQ: Pre-emptive objection handling
  // Voss: Address the negative before they say it
  // Every FAQ is a hidden objection killer
  faq: [
    {
      question: "How fast can you get here for an emergency?",
      answer: "For true emergencies (burst pipes, sewage backup, flooding), we dispatch immediately and typically arrive within 30 to 60 minutes. Our emergency line is staffed 24 hours a day, 7 days a week, including holidays.",
    },
    {
      question: "Do you charge for estimates?",
      answer: "No. We provide free on-site estimates for all non-emergency work. We will diagnose the problem, explain your options, and give you an upfront price before any work begins. No surprises on the invoice.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes. We are fully licensed (PLB-2011-04892), bonded, and carry $2M in general liability insurance plus workers compensation. We are happy to provide documentation on request.",
    },
    {
      question: "What is your warranty?",
      answer: "Every job comes with a minimum 2-year warranty on both parts and labor. Water heater installations carry the manufacturer warranty plus our own 2-year labor guarantee. If something we fixed breaks again, we come back for free.",
    },
    {
      question: "Do you work on weekends?",
      answer: "Yes. We offer regular service Monday through Saturday and emergency service 24/7. Weekend appointments are available at the same rates as weekday service. No overtime surcharges for Saturday work.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, check, all major credit cards, and offer financing on jobs over $1,000 through GreenSky. We can also work with your home warranty company if applicable.",
    },
  ],

  // COST ESTIMATOR CONFIG
  // Cialdini: Reciprocity. Free tool = they owe you attention.
  // Kahneman: Anchoring. Show price ranges to set expectations.
  costEstimator: {
    services: [
      { name: "Drain Cleaning", basePrice: 99, maxPrice: 350, unit: "per drain", factors: ["Severity of clog", "Location (main line vs. fixture)", "Camera inspection needed"] },
      { name: "Faucet Replacement", basePrice: 150, maxPrice: 450, unit: "per fixture", factors: ["Faucet type and brand", "Valve condition", "Counter/wall mount"] },
      { name: "Toilet Repair", basePrice: 85, maxPrice: 300, unit: "per toilet", factors: ["Part replacement vs. full rebuild", "Flange condition", "Wax ring replacement"] },
      { name: "Water Heater Repair", basePrice: 150, maxPrice: 500, unit: "per unit", factors: ["Tank vs. tankless", "Part availability", "Age of unit"] },
      { name: "Water Heater Install", basePrice: 800, maxPrice: 3500, unit: "per unit", factors: ["Tank vs. tankless", "Gas vs. electric", "Permit requirements"] },
      { name: "Pipe Leak Repair", basePrice: 150, maxPrice: 800, unit: "per repair", factors: ["Pipe material", "Location accessibility", "Extent of damage"] },
      { name: "Sewer Line Repair", basePrice: 500, maxPrice: 8000, unit: "per project", factors: ["Repair method (trenchless vs. dig)", "Length of repair", "Depth and accessibility"] },
      { name: "Garbage Disposal", basePrice: 175, maxPrice: 500, unit: "per unit", factors: ["Horsepower rating", "Existing wiring", "Plumbing connections"] },
    ],
  },

  // EMERGENCY TRIAGE CONFIG
  emergencyTriage: {
    scenarios: [
      {
        id: "burst-pipe",
        name: "Burst or Leaking Pipe",
        icon: "Droplets",
        severity: "critical",
        immediateSteps: ["Turn off the main water valve immediately", "Open faucets to drain remaining water", "Move valuables away from the affected area"],
        responseTime: "30 min",
        costRange: "$150 - $800",
        costOfDelay: "Water damage can cost $3,000+ per hour of flooding",
      },
      {
        id: "sewage-backup",
        name: "Sewage Backup",
        icon: "AlertTriangle",
        severity: "critical",
        immediateSteps: ["Stop using all water and fixtures", "Open windows for ventilation", "Keep children and pets away from the area"],
        responseTime: "30 min",
        costRange: "$300 - $2,500",
        costOfDelay: "Sewage poses serious health risks. Every hour increases contamination",
      },
      {
        id: "no-hot-water",
        name: "No Hot Water",
        icon: "Thermometer",
        severity: "moderate",
        immediateSteps: ["Check if your water heater pilot light is on", "Check the circuit breaker for electric heaters", "Note the age of your water heater (sticker on the side)"],
        responseTime: "2 hours",
        costRange: "$150 - $500",
        costOfDelay: "Usually not urgent, but if you smell gas, evacuate and call 911",
      },
      {
        id: "clogged-drain",
        name: "Clogged or Slow Drain",
        icon: "Waves",
        severity: "moderate",
        immediateSteps: ["Stop running water into the affected drain", "Do not use chemical drain cleaners (they damage pipes)", "Try a plunger for minor clogs"],
        responseTime: "Same day",
        costRange: "$99 - $350",
        costOfDelay: "Slow drains worsen over time. A $99 fix today prevents a $2,000 sewer repair later",
      },
      {
        id: "gas-smell",
        name: "Gas Smell Near Water Heater",
        icon: "Flame",
        severity: "critical",
        immediateSteps: ["Evacuate the house immediately", "Call 911 or your gas company first", "Do NOT use light switches, phones, or appliances inside"],
        responseTime: "Immediate",
        costRange: "Varies",
        costOfDelay: "Gas leaks are life-threatening. Evacuate first, call us second",
      },
      {
        id: "running-toilet",
        name: "Running Toilet",
        icon: "Droplets",
        severity: "low",
        immediateSteps: ["Jiggle the flush handle", "Remove the tank lid and check the flapper valve", "Note: a running toilet wastes up to 200 gallons per day"],
        responseTime: "Next available",
        costRange: "$85 - $200",
        costOfDelay: "A running toilet adds $50 to $100/month to your water bill",
      },
    ],
  },

  // WATER BILL CALCULATOR CONFIG
  // Kahneman: Loss aversion. Frame as money LOST, not money saved.
  waterCalculator: {
    issues: [
      { name: "Running toilet", monthlyWaste: 65, gallonsPerDay: 200 },
      { name: "Dripping faucet", monthlyWaste: 20, gallonsPerDay: 15 },
      { name: "Leaky pipe (hidden)", monthlyWaste: 45, gallonsPerDay: 50 },
      { name: "Old water heater (inefficient)", monthlyWaste: 35, gallonsPerDay: 0 },
      { name: "Outdated fixtures", monthlyWaste: 25, gallonsPerDay: 30 },
      { name: "No pressure regulator", monthlyWaste: 15, gallonsPerDay: 20 },
    ],
  },

  // HEALTH QUIZ CONFIG
  // Cialdini: Commitment/Consistency. Small yeses lead to big yeses.
  // Each question is a micro-commitment
  healthQuiz: {
    questions: [
      {
        id: "age",
        question: "How old is your home?",
        options: [
          { label: "Less than 10 years", score: 0 },
          { label: "10 to 25 years", score: 1 },
          { label: "25 to 50 years", score: 2 },
          { label: "Over 50 years", score: 3 },
        ],
      },
      {
        id: "water-pressure",
        question: "How is your water pressure?",
        options: [
          { label: "Strong and consistent", score: 0 },
          { label: "Varies throughout the day", score: 1 },
          { label: "Noticeably weak", score: 2 },
          { label: "Fluctuates wildly", score: 3 },
        ],
      },
      {
        id: "drains",
        question: "How do your drains perform?",
        options: [
          { label: "Fast and clear", score: 0 },
          { label: "Occasionally slow", score: 1 },
          { label: "Frequently clogged", score: 2 },
          { label: "Multiple drains are slow", score: 3 },
        ],
      },
      {
        id: "water-heater",
        question: "How old is your water heater?",
        options: [
          { label: "Less than 5 years", score: 0 },
          { label: "5 to 10 years", score: 1 },
          { label: "10 to 15 years", score: 2 },
          { label: "Over 15 years or not sure", score: 3 },
        ],
      },
      {
        id: "visible-issues",
        question: "Do you see any water stains, rust, or corrosion on visible pipes?",
        options: [
          { label: "None at all", score: 0 },
          { label: "Minor discoloration", score: 1 },
          { label: "Visible rust or corrosion", score: 2 },
          { label: "Active dripping or stains", score: 3 },
        ],
      },
      {
        id: "water-bill",
        question: "Has your water bill increased unexpectedly?",
        options: [
          { label: "No, it is consistent", score: 0 },
          { label: "Slight increase", score: 1 },
          { label: "Noticeable spike", score: 2 },
          { label: "Doubled or more", score: 3 },
        ],
      },
    ],
    results: {
      good: {
        range: [0, 5],
        title: "Your Plumbing Looks Healthy",
        description: "No major red flags. We recommend an annual inspection to keep it that way.",
        color: "success",
      },
      fair: {
        range: [6, 11],
        title: "A Few Things to Watch",
        description: "Your system has some early warning signs. A professional inspection can catch small problems before they become expensive ones.",
        color: "warning",
      },
      poor: {
        range: [12, 18],
        title: "Your Plumbing Needs Attention",
        description: "Multiple risk factors detected. We strongly recommend scheduling an inspection. Many of the issues flagged here get significantly more expensive when left untreated.",
        color: "emergency",
      },
    },
  },

  // MAINTENANCE PLANNER CONFIG
  // Game Theory: Repeated Games frame. Long-term relationship > one-time transaction.
  maintenancePlanner: {
    months: [
      { month: "January", tasks: ["Insulate exposed pipes for freeze protection", "Check water heater temperature (120\u00B0F recommended)", "Test sump pump if applicable"], season: "winter" },
      { month: "February", tasks: ["Inspect washing machine hoses for bulges or cracks", "Clean faucet aerators to improve flow", "Check under sinks for slow leaks"], season: "winter" },
      { month: "March", tasks: ["Spring inspection of outdoor faucets and hose bibs", "Check for signs of frozen pipe damage", "Test water pressure (40-60 PSI is ideal)"], season: "spring" },
      { month: "April", tasks: ["Flush water heater to remove sediment buildup", "Inspect toilet flappers and fill valves", "Check irrigation system for winter damage"], season: "spring" },
      { month: "May", tasks: ["Clean gutters and downspouts to prevent foundation issues", "Inspect sewer cleanout caps", "Test garbage disposal and sharpen blades with ice"], season: "spring" },
      { month: "June", tasks: ["Check AC condensate drain line for clogs", "Inspect visible pipes in basement/crawlspace", "Test emergency water shutoff valve"], season: "summer" },
      { month: "July", tasks: ["Monitor water bill for hidden leak indicators", "Check toilet for silent leaks (food coloring test)", "Inspect water softener if applicable"], season: "summer" },
      { month: "August", tasks: ["Back-to-school plumbing check (higher usage coming)", "Inspect dishwasher connections", "Clean shower heads with vinegar solution"], season: "summer" },
      { month: "September", tasks: ["Pre-winter water heater inspection", "Check for outdoor faucet drips before cold weather", "Inspect caulking around tubs and showers"], season: "fall" },
      { month: "October", tasks: ["Disconnect and drain outdoor hoses", "Insulate outdoor faucets and exposed pipes", "Schedule annual plumbing inspection"], season: "fall" },
      { month: "November", tasks: ["Know your main water shutoff valve location", "Check for drafts near pipes in exterior walls", "Pre-holiday drain cleaning (heavy kitchen usage ahead)"], season: "fall" },
      { month: "December", tasks: ["Keep thermostat at 55\u00B0F+ even when away", "Open cabinet doors during freezing weather", "Keep emergency plumber number accessible"], season: "winter" },
    ],
  },

  // CHATBOT CONFIG
  chatbot: {
    name: "PlumbBot",
    greeting: "Hey there! I can help you with pricing questions, scheduling, or figuring out what is going on with your plumbing. What can I help with?",
    quickReplies: [
      "I have an emergency",
      "How much does it cost to...",
      "Do you serve my area?",
      "I want to book a service",
      "What is your warranty?",
    ],
  },

  social: {
    facebook: "https://facebook.com/apexplumbing",
    google: "https://g.page/apexplumbing",
    yelp: "https://yelp.com/biz/apex-plumbing",
    nextdoor: "https://nextdoor.com/pages/apex-plumbing",
  },

  // System
  slug: "apex-plumbing",
  siteUrl: "",
  bookingUrl: "",
  trackingEndpoint: "https://www.ayushopchauhan.com/api/re-agent/track",
  leadEndpoint: "https://www.ayushopchauhan.com/api/re-agent/lead",
}

export default siteConfig
