// Centralized Realistic Indian Agriculture Mock Data for Farmogram AI (SIH Prototype)

export const currentUser = {
  id: "usr_01",
  name: "Murugan K.",
  phone: "+91 98421 76540",
  email: "murugan.farm@example.in",
  village: "Perundurai",
  district: "Erode",
  state: "Tamil Nadu",
  landArea: "4.5", // Acres
  primaryCrops: ["Tomato", "Turmeric", "Paddy"],
  soilType: "Red Loam",
  waterSource: "Drip Irrigation + Borewell",
  language: "English (Tamil native)",
  avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=240&auto=format&fit=crop&q=80",
  bio: "Progressive farmer adopting precision drip irrigation and natural pest management practices. Cultivating since 2011.",
  verified: false,
  role: "farmer" // 'farmer' | 'admin'
};

export const currentFarmerStats = {
  postsCount: 14,
  savedCount: 23,
  questionsCount: 7,
  recommendationsCount: 9,
  acresCultivated: 4.5,
  yieldEfficiency: "94%"
};

export const currentCropSeason = "Kharif / Samba (2026)";

export const soilTypes = [
  { id: "red_loam", name: "Red Loam", description: "Good aeration and porous structure, ideal for groundnut, pulses, and vegetables with regulated drip." },
  { id: "clayey_alluvial", name: "Clayey Alluvial", description: "High moisture retention and nutrient capacity, optimal for wetland paddy and sugarcane." },
  { id: "black_cotton", name: "Black Cotton Soil (Regur)", description: "High clay content and self-ploughing nature, well-suited for cotton, maize, and chillies." },
  { id: "sandy_loam", name: "Sandy Loam", description: "Rapid drainage and light texture, excellent for tubers, root crops, watermelon, and drip-irrigated tomatoes." },
  { id: "laterite", name: "Laterite Soil", description: "Porous and acidic, suitable for plantation crops, banana, and cashew with organic soil conditioning." }
];

export const locations = [
  "Coimbatore",
  "Erode",
  "Salem",
  "Madurai",
  "Thanjavur",
  "Tiruchirappalli",
  "Dindigul",
  "Theni"
];

export const cropsList = [
  "Paddy",
  "Tomato",
  "Groundnut",
  "Sugarcane",
  "Cotton",
  "Banana",
  "Maize",
  "Turmeric"
];

export const seasonsList = [
  "Kharif / Samba (Jun - Nov)",
  "Rabi / Thaladi (Oct - Feb)",
  "Zaid / Navarai Summer (Feb - May)"
];

export const waterAvailabilityList = [
  "Abundant (Canal + High Borewell Yield)",
  "Moderate (Seasonal Well / Scheduled Borewell)",
  "Limited / Rainfed Only"
];

export const weatherData = {
  location: "Coimbatore, Tamil Nadu",
  currentTemp: 29,
  feelsLike: 31,
  condition: "Partly Cloudy",
  icon: "CloudSun",
  humidity: 74,
  windSpeed: 14,
  windDirection: "NW",
  rainfallProbability: 65,
  uvIndex: "Moderate (5)",
  soilMoisture: "Adequate (62%)",
  advisoryAlert: {
    type: "warning",
    title: "Rain Expected Tomorrow Afternoon",
    message: "Rain expected tomorrow (35-45mm). Hold pesticide spraying and check drainage channels in low-lying plots to avoid waterlogging.",
    urgency: "High"
  },
  forecast7Day: [
    { day: "Today", date: "Sep 4", tempMax: 30, tempMin: 22, condition: "Partly Cloudy", rainProb: 20, advisory: "Ideal for soil bed preparation & manual weeding." },
    { day: "Fri", date: "Sep 5", tempMax: 27, tempMin: 21, condition: "Heavy Showers", rainProb: 85, advisory: "Avoid pesticide/foliar spraying. Ensure drainage." },
    { day: "Sat", date: "Sep 6", tempMax: 28, tempMin: 22, condition: "Scattered Rain", rainProb: 60, advisory: "Delay irrigation; soil moisture will remain high." },
    { day: "Sun", date: "Sep 7", tempMax: 31, tempMin: 23, condition: "Sunny / Clear", rainProb: 15, advisory: "Optimal for fertilizer top-dressing after rain settles." },
    { day: "Mon", date: "Sep 8", tempMax: 32, tempMin: 23, condition: "Clear Sky", rainProb: 10, advisory: "Check field moisture; schedule light drip cycle." },
    { day: "Tue", date: "Sep 9", tempMax: 31, tempMin: 22, condition: "Passing Clouds", rainProb: 25, advisory: "Good window for intercultural hoeing." },
    { day: "Wed", date: "Sep 10", tempMax: 30, tempMin: 22, condition: "Partly Cloudy", rainProb: 30, advisory: "Monitor groundnut plots for early fungal signs." }
  ]
};

export const initialFeedPosts = [
  {
    id: "post_1",
    author: {
      name: "Murugan K.",
      role: "Farmer",
      location: "Perundurai, Erode",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=160&auto=format&fit=crop&q=80",
      verified: false
    },
    crop: "Tomato",
    category: "Irrigation & Water Saving",
    timestamp: "2 hours ago",
    title: "Successful tomato cultivation using drip irrigation & plastic mulching",
    content: "Sharing our 4th harvest cycle of Shivam F1 tomato in Erode. By adopting 25-micron silver-black mulching film and inline drip fertigation (NPK 19:19:19), we reduced irrigation water use by 42% and weed growth was practically zero! Yield reached 28 tonnes per acre with excellent firmness for export.",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80",
    likes: 142,
    isLiked: false,
    saves: 38,
    isSaved: false,
    commentsCount: 24,
    comments: [
      { id: "c1", user: "Gopal V.", text: "What was your row-to-row spacing for the mulching bed?", time: "1 hour ago" },
      { id: "c2", user: "Murugan K.", text: "We kept 4.5 feet between bed centers and 1.5 feet plant-to-plant on a zigzag layout.", time: "45 mins ago" }
    ],
    tags: ["Tomato", "DripIrrigation", "Mulching", "ErodeFarmers"]
  },
  {
    id: "post_2",
    author: {
      name: "Dr. K. Soundararajan",
      role: "Senior Agronomist (TNAU)",
      location: "Coimbatore",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      verified: true
    },
    crop: "Groundnut",
    category: "Pest & Disease Advisory",
    timestamp: "5 hours ago",
    title: "Groundnut Alert: Early Season Tikka Leaf Spot & Leaf Miner identification",
    content: "Field surveys across Coimbatore and Tirupur reveal initial circular necrotic spots surrounded by yellow chlorotic halos on lower foliage of 35-day groundnut crops. Do not delay action. Recommended control: Spray Mancozeb 75% WP @ 2g/liter or Neem Seed Kernel Extract (NSKE 5%) during morning hours before afternoon showers.",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80",
    likes: 289,
    isLiked: false,
    saves: 94,
    isSaved: false,
    commentsCount: 36,
    comments: [
      { id: "c3", user: "Senthil Kumar", text: "Sir, does spraying right before rain wash it away?", time: "3 hours ago" },
      { id: "c4", user: "Dr. K. Soundararajan", text: "Yes! Add a wetting agent (sticker/spreader 0.5ml/L) and ensure at least a 3-hour rain-free window.", time: "2 hours ago" }
    ],
    tags: ["Groundnut", "TNAUAdvisory", "DiseaseAlert", "PestManagement"]
  },
  {
    id: "post_3",
    author: {
      name: "Arumugam V.",
      role: "Progressive Paddy Farmer",
      location: "Thiruvaiyaru, Thanjavur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
      verified: true
    },
    crop: "Paddy",
    category: "Best Practices",
    timestamp: "Yesterday",
    title: "Samba Paddy SRI Technique: Achieving 40+ productive tillers per hill",
    content: "Transitioned 3 acres to Modified System of Rice Intensification (SRI) using CR 1009 Sub 1 variety. Transplanting 14-day single seedlings at 25x25 cm with cono-weeder passes at day 10, 20, and 30 aerated the soil tremendously. Panicle initiation is uniform and root mass is double compared to flood method.",
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80",
    likes: 312,
    isLiked: false,
    saves: 110,
    isSaved: false,
    commentsCount: 42,
    comments: [],
    tags: ["Paddy", "SRIMethod", "ThanjavurDelta", "WaterConservation"]
  },
  {
    id: "post_4",
    author: {
      name: "Kavitha Rajendran",
      role: "Organic Grower",
      location: "Omalur, Salem",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      verified: false
    },
    crop: "Turmeric",
    category: "Natural Farming",
    timestamp: "2 days ago",
    title: "Natural farming experience: Jeevamrutham application in Erode Local Turmeric",
    content: "Applied fermented Jeevamrutham through venturi injector every 15 days along with border crops of marigold and maize. Not a single chemical pesticide used this season. Rhizome development is thick with vibrant orange core. Zero chemical residue test report received!",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    likes: 198,
    isLiked: false,
    saves: 65,
    isSaved: false,
    commentsCount: 19,
    comments: [],
    tags: ["Turmeric", "NaturalFarming", "SalemOrganic", "ZeroBudget"]
  }
];

export const reelsData = [
  {
    id: "reel_1",
    title: "3 Drip Irrigation Mistakes Every Farmer Makes",
    creator: "Er. Ramesh Agritech",
    verified: true,
    crop: "All Crops",
    category: "Irrigation",
    location: "Coimbatore",
    views: "24.5K",
    likes: "1.8K",
    duration: "0:45",
    thumbnail: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=80",
    description: "Flushing sub-mains weekly and acid treatment for salt deposits will double emitter life."
  },
  {
    id: "reel_2",
    title: "Quick Test: Is Your Tomato Infected with Early Blight?",
    creator: "Dr. Soundararajan (TNAU)",
    verified: true,
    crop: "Tomato",
    category: "Pest Control",
    location: "TNAU Campus",
    views: "42.1K",
    likes: "3.4K",
    duration: "0:58",
    thumbnail: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80",
    description: "Notice target-board concentric rings on the lower third foliage before yellowing spreads."
  },
  {
    id: "reel_3",
    title: "Groundnut Pod Filling Secret: Gypsum Application Timing",
    creator: "Balasubramaniam",
    verified: false,
    crop: "Groundnut",
    category: "Crop Tips",
    location: "Erode",
    views: "18.9K",
    likes: "1.2K",
    duration: "0:50",
    thumbnail: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80",
    description: "Apply 200 kg gypsum per acre strictly at 40-45 DAS along with earthing up for plump pods."
  },
  {
    id: "reel_4",
    title: "Harvesting Sugarcane at Peak Brix: Refractometer Demo",
    creator: "Sakthi Sugar Cane Cell",
    verified: true,
    crop: "Sugarcane",
    category: "Harvesting",
    location: "Appakudal",
    views: "15.3K",
    likes: "890",
    duration: "0:42",
    thumbnail: "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=600&auto=format&fit=crop&q=80",
    description: "Field refractometer brix above 19-20 ensures maximum sucrose recovery and highest mill price."
  },
  {
    id: "reel_5",
    title: "Paddy Straw Mushroom Cultivation in 15 Days",
    creator: "Malar Organic Farm",
    verified: false,
    crop: "Paddy",
    category: "Organic Farming",
    location: "Madurai",
    views: "31.2K",
    likes: "2.7K",
    duration: "0:55",
    thumbnail: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&auto=format&fit=crop&q=80",
    description: "Turn post-harvest paddy stubble into ₹500/day supplemental farm revenue with zero waste."
  },
  {
    id: "reel_6",
    title: "How to Read Live Mandi Rates Before Selling",
    creator: "Farmogram Advisory",
    verified: true,
    crop: "Market Tips",
    category: "Market Tips",
    location: "Tamil Nadu",
    views: "55.8K",
    likes: "4.9K",
    duration: "0:48",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
    description: "Always compare 3 adjacent mandis. Morning arrivals peak at 6:30 AM determines pricing power."
  }
];

export const marketCommodities = [
  {
    id: "mkt_1",
    commodity: "Tomato",
    variety: "Hybrid Shivam / Local",
    mandi: "Coimbatore Central Market",
    district: "Coimbatore",
    currentPrice: 2800,
    previousPrice: 2590,
    changePercent: 8.1,
    unit: "₹ / Quintal",
    trend: "up",
    arrivalsTonnes: 45.5,
    minPrice: 2400,
    maxPrice: 3100,
    history: [2400, 2450, 2500, 2590, 2720, 2800]
  },
  {
    id: "mkt_2",
    commodity: "Groundnut",
    variety: "Pod (VRI 8 / Kadiri 6)",
    mandi: "Erode Regulated Market",
    district: "Erode",
    currentPrice: 6500,
    previousPrice: 6250,
    changePercent: 4.0,
    unit: "₹ / Quintal",
    trend: "up",
    arrivalsTonnes: 82.0,
    minPrice: 6100,
    maxPrice: 6800,
    history: [6000, 6150, 6200, 6250, 6400, 6500]
  },
  {
    id: "mkt_3",
    commodity: "Paddy",
    variety: "Common (CR 1009 / BPT 5204)",
    mandi: "Thanjavur APMC",
    district: "Thanjavur",
    currentPrice: 2300,
    previousPrice: 2350,
    changePercent: -2.1,
    unit: "₹ / Quintal",
    trend: "down",
    arrivalsTonnes: 140.0,
    minPrice: 2200,
    maxPrice: 2420,
    history: [2450, 2400, 2380, 2350, 2320, 2300]
  },
  {
    id: "mkt_4",
    commodity: "Turmeric",
    variety: "Finger Turmeric (Erode Local)",
    mandi: "Semmampalayam Regulated Market",
    district: "Erode",
    currentPrice: 14800,
    previousPrice: 13900,
    changePercent: 6.5,
    unit: "₹ / Quintal",
    trend: "up",
    arrivalsTonnes: 65.0,
    minPrice: 13500,
    maxPrice: 15500,
    history: [13000, 13400, 13700, 13900, 14200, 14800]
  },
  {
    id: "mkt_5",
    commodity: "Cotton",
    variety: "Medium Staple (MCU 5)",
    mandi: "Salem Cotton Market",
    district: "Salem",
    currentPrice: 7200,
    previousPrice: 7350,
    changePercent: -2.0,
    unit: "₹ / Quintal",
    trend: "down",
    arrivalsTonnes: 38.0,
    minPrice: 6900,
    maxPrice: 7500,
    history: [7500, 7450, 7400, 7350, 7280, 7200]
  },
  {
    id: "mkt_6",
    commodity: "Banana",
    variety: "Grand Naine (G9)",
    mandi: "Madurai Mattuthavani",
    district: "Madurai",
    currentPrice: 2200,
    previousPrice: 2050,
    changePercent: 7.3,
    unit: "₹ / Quintal",
    trend: "up",
    arrivalsTonnes: 54.0,
    minPrice: 1900,
    maxPrice: 2400,
    history: [1950, 2000, 2020, 2050, 2150, 2200]
  },
  {
    id: "mkt_7",
    commodity: "Maize",
    variety: "Yellow Feed Grade",
    mandi: "Tiruchirappalli APMC",
    district: "Tiruchirappalli",
    currentPrice: 2250,
    previousPrice: 2220,
    changePercent: 1.4,
    unit: "₹ / Quintal",
    trend: "up",
    arrivalsTonnes: 90.0,
    minPrice: 2150,
    maxPrice: 2320,
    history: [2180, 2200, 2210, 2220, 2240, 2250]
  }
];

export const cropAdvisoriesDatabase = {
  "Groundnut": {
    crop: "Groundnut",
    variety: "VRI 8 / Kadiri 6",
    sowingWindow: "June 10 – June 25 (Kharif)",
    matchScore: 96,
    multiFactorRationale: [
      { factor: "Soil Type (Red Loam)", note: "Red Loam provides good aeration and optimal penetrability for peg entry and pod swelling. Soil is 1 of 6 multi-factorial criteria.", status: "Optimal" },
      { factor: "Season Alignment", note: "Kharif photoperiod matches vegetative cycle and flowering canopy requirement.", status: "Optimal" },
      { factor: "Weather & Temp", note: "Forecasted 28-32°C range matches optimum germination and initial leaf formation.", status: "Favorable" },
      { factor: "Water Availability", note: "Moderate water requirement (400-500mm). Easily satisfied with scheduled borewell drip.", status: "Adequate" },
      { factor: "Crop Rotation", note: "Previous crop was Tomato/Fallow; avoids nematode buildup and fixes atmospheric nitrogen.", status: "Beneficial" },
      { factor: "Market Outlook", note: "Oilseed mandi prices in Erode are trending up (+4%) due to strong miller procurement.", status: "High Demand" }
    ],
    financials: {
      expectedYield: "22 Quintals / Acre",
      cultivationCost: "₹ 28,500 / Acre",
      expectedRevenue: "₹ 59,400 / Acre",
      potentialProfit: "₹ 30,900 / Acre",
      roi: "108%"
    },
    practices: [
      "Seed treatment with Trichoderma viride @ 4g/kg seed + Rhizobium biofertilizer.",
      "Maintain spacing of 30 cm x 10 cm.",
      "Apply 200 kg gypsum per acre at 40-45 days after sowing during earthing up."
    ]
  },
  "Tomato": {
    crop: "Tomato",
    variety: "Shivam Hybrid / Arka Rakshak",
    sowingWindow: "July 1 – July 20",
    matchScore: 92,
    multiFactorRationale: [
      { factor: "Soil Type (Red / Sandy Loam)", note: "Well-drained soil avoids root asphyxiation during heavy rain spells. (Soil factor)", status: "Optimal" },
      { factor: "Season Alignment", note: "Pre-monsoon nursery sowing yields peak fruit production before winter dew.", status: "Optimal" },
      { factor: "Weather & Temp", note: "Current 29°C is ideal for flower setting; monitor forecast for heavy rain protection.", status: "Favorable" },
      { factor: "Water Availability", note: "Requires steady drip irrigation; fits existing borewell schedule with mulching.", status: "Adequate" },
      { factor: "Market Outlook", note: "Coimbatore market prices are currently surging at ₹2,800/quintal (+8.1%).", status: "High Demand" }
    ],
    financials: {
      expectedYield: "32 Tonnes / Acre",
      cultivationCost: "₹ 52,000 / Acre",
      expectedRevenue: "₹ 1,12,000 / Acre",
      potentialProfit: "₹ 60,000 / Acre",
      roi: "115%"
    },
    practices: [
      "Transplant 25-day sturdy seedlings on raised beds with drip lines.",
      "Install yellow sticky traps @ 12 traps/acre against whiteflies and thrips.",
      "Follow staking to prevent soil-borne fruit rot."
    ]
  },
  "Paddy": {
    crop: "Paddy",
    variety: "CR 1009 Sub 1 / BPT 5204",
    sowingWindow: "August 1 – August 25 (Samba)",
    matchScore: 89,
    multiFactorRationale: [
      { factor: "Soil Type (Clayey / Loamy)", note: "Clayey alluvial holds moisture needed for wetland paddy. (Soil factor)", status: "Optimal" },
      { factor: "Season Alignment", note: "Classic Samba season across Tamil Nadu delta zones.", status: "Optimal" },
      { factor: "Water Availability", note: "Requires abundant water availability or canal release; moderate for SRI technique.", status: "Moderate" },
      { factor: "Market Outlook", note: "Government MSP procurement centers ensure assured minimum floor price.", status: "Stable" }
    ],
    financials: {
      expectedYield: "26 Quintals / Acre",
      cultivationCost: "₹ 24,000 / Acre",
      expectedRevenue: "₹ 48,100 / Acre",
      potentialProfit: "₹ 24,100 / Acre",
      roi: "100%"
    },
    practices: [
      "Use SRI or machine transplanter for uniform spacing and lower seed rate.",
      "Incorporate Azospirillum and Phosphobacteria biofertilizers.",
      "Maintain alternate wetting and drying (AWD) water management."
    ]
  },
  "Maize": {
    crop: "Maize",
    variety: "CO 6 / Pioneer Hybrid",
    sowingWindow: "June 15 – July 10",
    matchScore: 87,
    multiFactorRationale: [
      { factor: "Soil Type", note: "Adapts to well-drained loam and black soils with good aeration. (Soil factor)", status: "Optimal" },
      { factor: "Water Availability", note: "Drought hardy with moderate irrigation needs; requires water at silking stage.", status: "Favorable" },
      { factor: "Market Outlook", note: "Steady demand from poultry and animal feed manufacturers in Namakkal/Salem belt.", status: "Stable" }
    ],
    financials: {
      expectedYield: "30 Quintals / Acre",
      cultivationCost: "₹ 21,000 / Acre",
      expectedRevenue: "₹ 45,000 / Acre",
      potentialProfit: "₹ 24,000 / Acre",
      roi: "114%"
    },
    practices: [
      "Ridge and furrow sowing at 60 cm x 20 cm spacing.",
      "Monitor for Fall Armyworm at 15-20 days stage using pheromone traps.",
      "Top-dress urea in two split doses at knee-high and tasseling stages."
    ]
  }
};

export const sampleDiseaseCases = [
  {
    id: "dis_1",
    crop: "Tomato",
    diseaseName: "Early Blight",
    pathogen: "Alternaria solani",
    confidence: 94,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop&q=80",
    symptoms: [
      "Brown to dark concentric rings ('target board' pattern) on older lower leaves",
      "Surrounding tissue turns chlorotic (yellow) and causes premature leaf drop",
      "Sunken, leathery dark lesions on stems near the soil line",
      "Direct yield reduction due to reduced photosynthetic canopy"
    ],
    prevention: [
      "Ensure 3-year crop rotation avoiding Solanaceae family members (chilli, brinjal, potato)",
      "Maintain wider row spacing (60 cm) to allow air circulation and faster canopy drying",
      "Adopt drip irrigation; avoid overhead sprinkler watering that wets leaves",
      "Mulch soil surface with straw or black plastic to prevent soil splash onto foliage"
    ],
    suggestedAction: [
      "Immediate organic spray: Neem Seed Kernel Extract (NSKE 5%) or Trichoderma viride @ 5g/L.",
      "Chemical control (if severe): Foliar spray of Mancozeb 75% WP @ 2.5g/L or Chlorothalonil 75% WP @ 2g/L.",
      "Remove and safely burn lower infected leaves to break fungal spore cycle."
    ],
    advisoryNote: "This is an AI-assisted indication and should be verified with an agricultural officer or Krishi Vigyan Kendra (KVK) expert when necessary."
  },
  {
    id: "dis_2",
    crop: "Paddy",
    diseaseName: "Leaf Blast",
    pathogen: "Magnaporthe oryzae",
    confidence: 91,
    image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80",
    symptoms: [
      "Spindle-shaped lesions with grayish or white centers and brown margins",
      "Lesions enlarge and coalesce, causing entire leaves to dry and wither",
      "Neck blast phase causes panicles to break and fall over, resulting in chaffy grains"
    ],
    prevention: [
      "Avoid excessive nitrogen fertilizer application; split into 3-4 micro doses",
      "Maintain clean field bunds free from weed collateral hosts",
      "Use resistant/tolerant varieties such as CR 1009 Sub 1 or ADT 43"
    ],
    suggestedAction: [
      "Spray Tricyclazole 75% WP @ 0.6g/L or Kasugamycin 3% SL @ 2.5ml/L at early tillering",
      "Apply Pseudomonas fluorescens bio-agent @ 10g/L as preventive foliar spray",
      "Drain standing water for 24 hours to reduce microclimate humidity"
    ],
    advisoryNote: "This is an AI-assisted indication and should be verified with an agricultural officer or Krishi Vigyan Kendra (KVK) expert when necessary."
  },
  {
    id: "dis_3",
    crop: "Groundnut",
    diseaseName: "Tikka Leaf Spot (Cercospora)",
    pathogen: "Cercospora personata",
    confidence: 88,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80",
    symptoms: [
      "Small circular dark spots appearing on both upper and lower leaf surfaces",
      "Early leaf spot has prominent yellow halo; late leaf spot is darker without halo",
      "Severe defoliation leaving bare stems and reducing pod filling"
    ],
    prevention: [
      "Treat seeds before sowing with Carbendazim @ 2g/kg seed",
      "Avoid continuous groundnut monocropping in the same plot",
      "Ensure balanced potassium and gypsum application for leaf cell wall strength"
    ],
    suggestedAction: [
      "Spray Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2g/liter of water",
      "Alternatively spray Chlorothalonil 75 WP @ 2g/L with spreader sticker",
      "Repeat spray after 15 days if cloudy weather persists"
    ],
    advisoryNote: "This is an AI-assisted indication and should be verified with an agricultural officer or Krishi Vigyan Kendra (KVK) expert when necessary."
  }
];

export const irrigationScheduleMock = {
  getRecommendation: (crop, soilType, growthStage, weatherCondition) => {
    let waterRequirement = "Moderate (18 - 22 mm)";
    let nextIrrigation = "Tomorrow morning at 6:30 AM";
    let duration = "1.5 hours via inline drip";
    let rationale = `Low rainfall probability and crop is entering ${growthStage || "flowering stage"}. Soil type (${soilType || "Red Loam"}) has moderate drainage; morning irrigation minimizes evaporative loss.`;
    let urgency = "Normal";

    if (weatherCondition?.includes("Rain") || weatherCondition?.includes("Showers")) {
      waterRequirement = "None / Hold Irrigation";
      nextIrrigation = "After 48 hours (Post-Rain Assessment)";
      duration = "0 hours";
      rationale = "Heavy rain expected in the forecast. Excess irrigation will cause root aeration stress and nutrient leaching.";
      urgency = "Hold";
    } else if (growthStage === "Pod Development / Fruit Bulking") {
      waterRequirement = "High (28 - 32 mm)";
      nextIrrigation = "Today evening (5:00 PM)";
      duration = "2.5 hours via drip";
      rationale = "Critical moisture sensitivity stage. Water deficit during fruit bulking causes fruit drop and blossom end rot.";
      urgency = "High";
    }

    return {
      waterRequirement,
      nextIrrigation,
      duration,
      rationale,
      urgency,
      soilMoistureStatus: "Adequate (62%)",
      next7DayPlan: [
        { day: "Thu (Today)", action: "Hold evening drip. Rainfall expected tomorrow." },
        { day: "Fri", action: "Rainfall expected (35mm). Keep drainage channels open." },
        { day: "Sat", action: "No irrigation needed. Soil saturation sufficient." },
        { day: "Sun", action: "Resume light drip (45 mins) in late afternoon." },
        { day: "Mon", action: "Regular fertigation cycle (NPK 19:19:19)." },
        { day: "Tue", action: "Normal 1.5 hr drip cycle." },
        { day: "Wed", action: "Check soil moisture via tensiometer/finger test." }
      ]
    };
  }
};

export const governmentSchemes = [
  {
    id: "sch_1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Financial Support",
    ministry: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    benefits: "₹ 6,000 per year transferred directly to bank account in three 4-monthly installments of ₹2,000 each.",
    eligibility: "All landholding farmer families with cultivable land in their names. Institutional landholders and high-income tax payers are excluded.",
    documents: ["Aadhaar Card", "Land Ownership Record (Patta / Chitta)", "Active Bank Account linked with Aadhaar", "Mobile Number"],
    deadline: "Open All Year (Continuous Registration)",
    subsidyAmount: "₹6,000 / year",
    officialLink: "https://pmkisan.gov.in",
    status: "Active",
    badge: "Direct Benefit Transfer"
  },
  {
    id: "sch_2",
    name: "PMKSY - Per Drop More Crop (Micro Irrigation Subsidy)",
    category: "Irrigation",
    ministry: "Department of Agriculture & Farmers Welfare",
    benefits: "Up to 100% subsidy for Small & Marginal Farmers in Tamil Nadu (75% to 100% state-assisted), and 75% for other farmers for drip and sprinkler irrigation installations.",
    eligibility: "Farmers with verified cultivable land holding and operational water source (borewell/well) with electricity connection.",
    documents: ["Chitta/Adangal land proof", "Well/Borewell certificate", "Aadhaar Card", "Soil & Water Test Report", "Farm layout sketch"],
    deadline: "District-wise batch allocation (Current phase ends Oct 31)",
    subsidyAmount: "Up to 100% for Small Farmers",
    officialLink: "https://pmksy.gov.in",
    status: "Active",
    badge: "100% Subsidy"
  },
  {
    id: "sch_3",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana - Crop Insurance)",
    category: "Insurance",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefits: "Comprehensive insurance cover against crop loss from non-preventable natural risks (drought, flood, unseasonal rain, pests). Farmers pay only 2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops.",
    eligibility: "All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.",
    documents: ["Aadhaar Card", "Sowing Certificate / VRO Adangal", "Bank Passbook", "Land record documents"],
    deadline: "July 31 for Kharif / Nov 15 for Samba Paddy",
    subsidyAmount: "Covers up to 100% sum insured",
    officialLink: "https://pmfby.gov.in",
    status: "Active",
    badge: "Crop Safety"
  },
  {
    id: "sch_4",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Machinery & Equipment",
    ministry: "Dept of Agrl Engineering, Govt of Tamil Nadu",
    benefits: "40% to 50% subsidy on procurement of agricultural machinery (Power tillers, Rotavators, Paddy Transplanters, Combine Harvesters, Drone sprayers).",
    eligibility: "Individual farmers, Farmer Producer Organizations (FPOs), and Custom Hiring Centers (CHCs). Priority to SC/ST and women farmers.",
    documents: ["Aadhaar Card", "Land patta copy", "Quotations from approved empaneled dealers", "Bank account details"],
    deadline: "Quarterly portal allotment (Ongoing)",
    subsidyAmount: "40% - 50% on machinery",
    officialLink: "https://agrimachinery.nic.in",
    status: "Active",
    badge: "Farm Mechanization"
  },
  {
    id: "sch_5",
    name: "Tamil Nadu Free Power Supply for Agriculture",
    category: "Utilities & Energy",
    ministry: "TANGEDCO, Govt of Tamil Nadu",
    benefits: "100% free electricity supply for agricultural pump sets for registered farmers across Tamil Nadu.",
    eligibility: "Farmers with dedicated agricultural borewell/open well connections.",
    documents: ["TANGEDCO application reference", "Patta copy", "VAO certificate for well existence"],
    deadline: "Regularized Tatkal & Normal Scheme open",
    subsidyAmount: "100% Free Power",
    officialLink: "https://tangedco.gov.in",
    status: "Active",
    badge: "State Scheme"
  },
  {
    id: "sch_6",
    name: "Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)",
    category: "Organic Farming",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefits: "Financial assistance of ₹50,000 per hectare for 3 years, of which ₹31,000 is given directly to the farmer for organic inputs (seeds, bio-fertilizers, bio-pesticides, vermicompost).",
    eligibility: "Farmers forming clusters of 50 or more farmers with 50 acres of land practicing chemical-free farming.",
    documents: ["Aadhaar Card", "Cluster membership certificate", "Land records", "Soil baseline testing certificate"],
    deadline: "Annual cluster onboarding",
    subsidyAmount: "₹50,000 / hectare",
    officialLink: "https://pgsindia-ncof.gov.in",
    status: "Active",
    badge: "Eco Farming"
  }
];

export const expertQuestions = [
  {
    id: "q_1",
    farmer: {
      name: "Suresh Mani",
      location: "Bhavani, Erode",
      crop: "Sugarcane",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80"
    },
    question: "Inter-row whitefly infestation in 4-month sugarcane crop. Leaves turning black sooty. What is the quickest bio-remedy without heavy chemical spraying?",
    timestamp: "3 hours ago",
    image: "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?w=600&auto=format&fit=crop&q=80",
    answersCount: 3,
    verifiedAnswer: {
      expert: "Dr. Anitha Priya (Entomologist, TNAU)",
      qualification: "Ph.D. Agrl Entomology, Senior Scientist",
      badge: "Verified Expert",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      answer: "The black sooty mold develops on honeydew secreted by sugarcane whitefly (Aleurolobus barodensis). \n\n1. Strip and burn the lower 4-5 dry and infested leaves immediately to improve light penetration. \n2. Release predator Encarsia / Chrysoperla zastrowi @ 1,000 eggs/acre. \n3. Spray fish oil rosin soap (FORS) @ 25g/L or Azadirachtin 10,000 ppm @ 2ml/L with high pressure directed on the under-surface of leaves. Avoid excess urea application.",
      timestamp: "1 hour ago",
      upvotes: 42
    },
    replies: [
      { id: "r1", user: "Gopal V.", text: "Removing lower leaves worked within 10 days in my field too. Highly recommended.", time: "40 mins ago" }
    ]
  },
  {
    id: "q_2",
    farmer: {
      name: "Palani Samy",
      location: "Pollachi, Coimbatore",
      crop: "Coconut",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80"
    },
    question: "Button shedding in 8-year-old tall coconut trees after summer heat. Dropping nearly 60% of small nuts. How to prevent this?",
    timestamp: "1 day ago",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
    answersCount: 2,
    verifiedAnswer: {
      expert: "Dr. V. Chandrasekhar (Horticulture Specialist)",
      qualification: "Director of Extension, Agri Research Center",
      badge: "Verified Expert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
      answer: "Button shedding occurs due to moisture stress followed by sudden rain or severe Boron/Potassium deficiency. \n\n1. Root feeding: Apply 1% Borax (10g) + 200g MOP in 200 ml water per palm in a polythene pouch root feeding. \n2. Spray Planofix (NAA) @ 2ml in 10 liters of water on the female flower bunches at button stage. \n3. Maintain basin mulching with coconut coir pith to retain root zone humidity.",
      timestamp: "18 hours ago",
      upvotes: 67
    },
    replies: []
  },
  {
    id: "q_3",
    farmer: {
      name: "Dhanalakshmi M.",
      location: "Madurai Rural",
      crop: "Chilli",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
    },
    question: "Leaves curling upward and boat-shaped in hybrid chilli plants. Flower dropping heavily. Is this thrips or mite?",
    timestamp: "2 days ago",
    image: null,
    answersCount: 4,
    verifiedAnswer: {
      expert: "Dr. K. Soundararajan",
      qualification: "TNAU Agronomist",
      badge: "Verified Expert",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      answer: "Upward leaf curling (boat-shaped) indicates Chilli Thrips (Scirtothrips dorsalis). (If it curls downward inverted, that is yellow mite). \n\nSpray Spinosad 45% SC @ 0.3 ml/L or Fipronil 5% SC @ 1.5 ml/L. Install blue sticky traps @ 20/acre for continuous monitoring.",
      timestamp: "1 day ago",
      upvotes: 53
    },
    replies: []
  }
];

export const notificationsData = [
  {
    id: "notif_1",
    type: "weather",
    title: "🌧 Heavy Rain Advisory for Coimbatore & Erode",
    message: "Rain expected tomorrow (35-45mm). Hold pesticide and fertilizer spraying. Clear drainage ditches in low-lying fields.",
    time: "25 minutes ago",
    read: false,
    badge: "Urgent Weather",
    actionRoute: "weather"
  },
  {
    id: "notif_2",
    type: "market",
    title: "📈 Tomato Prices Surged by 8.1%",
    message: "Coimbatore mandi prices jumped to ₹2,800/quintal today with firm demand. Check live arrivals now.",
    time: "1 hour ago",
    read: false,
    badge: "Mandi Alert",
    actionRoute: "market"
  },
  {
    id: "notif_3",
    type: "expert",
    title: "👨‍🌾 Expert Response from Dr. Soundararajan",
    message: "Dr. Soundararajan replied to your community query on Groundnut Tikka spot identification.",
    time: "2 hours ago",
    read: true,
    badge: "Expert Q&A",
    actionRoute: "expert-qa"
  },
  {
    id: "notif_4",
    type: "advisor",
    title: "🌱 Recommended Sowing Window for Kharif Groundnut",
    message: "Ideal sowing window (June 10 - June 25) aligns with forecasted rainfall and soil moisture. Review Crop Advisor details.",
    time: "5 hours ago",
    read: true,
    badge: "Crop Advisory",
    actionRoute: "crop-advisor"
  },
  {
    id: "notif_5",
    type: "scheme",
    title: "🏛 PMKSY Micro-Irrigation Subsidy Window Extended",
    message: "Tamil Nadu Horticulture Dept has extended 100% drip subsidy application deadline till Oct 31.",
    time: "Yesterday",
    read: true,
    badge: "Scheme Deadline",
    actionRoute: "schemes"
  }
];

export const adminMetrics = {
  totalFarmers: "12,480",
  newFarmersToday: "+48",
  totalPosts: "3,842",
  totalReels: "420",
  reportedContent: "6",
  pendingVerifications: "4",
  systemUptime: "99.98%",
  activeDistricts: 14,
  reportsList: [
    { id: "rep_1", postTitle: "Black magic remedy for pest control", author: "Ramu M.", reason: "Misleading non-scientific agricultural claim", date: "Sep 3, 2026", status: "Pending Review" },
    { id: "rep_2", postTitle: "Commercial promotion of unapproved chemical", author: "AgroDealers Hub", reason: "Spam / Unregistered commercial promotion", date: "Sep 2, 2026", status: "Pending Review" }
  ],
  pendingExperts: [
    { id: "exp_1", name: "Dr. Anitha Priya", specialization: "Agricultural Entomology, TNAU", degree: "Ph.D. in Entomology", docProof: "TNAU Faculty ID #TN8842", status: "Pending" },
    { id: "exp_2", name: "Er. Rajeshwaran S.", specialization: "Precision Irrigation Engineering", degree: "M.Tech Agrl Engineering", docProof: "IEI Membership #M-10923", status: "Pending" }
  ]
};
