import { CropDisease, ClimateBasinAlert, IoTSensorNode, MandiMarketQuote, DemoScenario } from '../types';

export const CROP_DISEASES: CropDisease[] = [
  {
    id: 'rice-blast',
    nameEn: 'Rice Blast (Magnaporthe oryzae)',
    nameBn: 'ধানের ব্লাস্ট রোগ (ম্যাগনাপর্থে ওরাইজি)',
    cropEn: 'Paddy / Basmati (Swarna MTU-7029 / Pusa)',
    cropBn: 'স্বর্ণ ধান ও বাসমতী (আইসিএআর জাত)',
    pathogenType: 'fungal',
    severity: 'critical',
    confidence: 0.942,
    affectedAreaPercentage: 38,
    symptomsEn: [
      'Spindle-shaped lesions with grayish centers and dark reddish-brown borders',
      'Rapid lesion elongation coalescing across leaf blades',
      'Neck rot vulnerability threatening up to 80% grain panicle sterility'
    ],
    symptomsBn: [
      'পাতায় ডিম্বাকৃতি বা চোখের মতো দাগ, যার কেন্দ্র ছাই রঙের এবং কিনারা কালচে বাদামী',
      'দাগগুলো দ্রুত বড় হয়ে পুরো পাতা ঝলসে দেয়',
      'শীষের গোড়ায় আক্রমণ হলে শীষ মরে চিটা হয়ে যায় (নেক ব্লাস্ট)'
    ],
    organicTreatmentEn: 'Spray fermented cow urine diluted with water (1:10) + Trichoderma viride bio-fungicide at 5g/L. Drain stagnant field water.',
    organicTreatmentBn: 'জমি থেকে বাড়তি পানি শুকিয়ে দিন। ট্রাইকোডার্মা ভিরিডি বা নিম তেলের নির্যাস স্প্রে করুন। অতিরিক্ত ইউরিয়া সার প্রয়োগ সম্পূর্ণ বন্ধ রাখুন।',
    chemicalTreatmentEn: 'Apply Tricyclazole 75 WP @ 0.75g/L or Isoprothiolane 40 EC @ 2ml/L immediately at late afternoon.',
    chemicalTreatmentBn: 'ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি প্রতি লিটার পানিতে ০.৭৫ গ্রাম অথবা আইসোপ্রোথিওলেন বিকেলে জমিতে ভালো করে স্প্রে করুন।',
    urgencyDays: 2,
    audioGuidanceEn: 'Critical Rice Blast identified in Indian paddy cluster with 94.2% confidence. Halt nitrogen fertilizers immediately and apply Tricyclazole within 48 hours.',
    audioGuidanceBn: 'জরুরি সতর্কতা! ধানের ব্লাস্ট রোগ শনাক্ত হয়েছে। জমিতে নাইট্রোজেন সার দেওয়া বন্ধ করুন এবং ট্রাইসাইক্লাজল ছত্রাকনাশক আগামী ৪৮ ঘণ্টার মধ্যে স্প্রে করুন।',
    boxCoordinates: [
      { x: 22, y: 34, w: 32, h: 24, label: 'Spindle Blast Lesion' },
      { x: 58, y: 50, w: 26, h: 30, label: 'Necrotic Panicle Vector' },
      { x: 40, y: 70, w: 22, h: 18, label: 'Early Spore Spread' }
    ],
    sampleImage: 'rice_leaf'
  },
  {
    id: 'potato-blight',
    nameEn: 'Late Blight (Phytophthora infestans)',
    nameBn: 'আলুর নাবি ধসা রোগ (লেট ব্লাইট)',
    cropEn: 'Potato (Kufri Jyoti / Kufri Pukhraj - CPRI India)',
    cropBn: 'আলু (কুফরি জ্যোতি / কুফরি পোখরাজ - ভারত)',
    pathogenType: 'fungal',
    severity: 'critical',
    confidence: 0.965,
    affectedAreaPercentage: 45,
    symptomsEn: [
      'Water-soaked irregular black/brown lesions starting from leaf tips',
      'White mildew growth on lower leaf surfaces under high morning humidity (>90%)',
      'Systemic stem browning and tuber rot risk within 72 hours'
    ],
    symptomsBn: [
      'পাতার কিনারায় ও ডগায় ভেজা জলছাপের মতো কালচে দাগ সৃষ্টি হওয়া',
      'কুয়াশাচ্ছন্ন সকালে পাতার নিচের পিঠে সাদাটে ছত্রাকের পাউডার দেখা যাওয়া',
      'অনুকূল আবহাওয়ায় ২-৩ দিনের মধ্যে পুরো আলুর খেত পুড়ে যাওয়ার মতো ধ্বংস হয়ে যায়'
    ],
    organicTreatmentEn: 'Dust copper oxychloride or Bordeaux mixture (1%) preventive spray. Remove and incinerate infected foliage safely.',
    organicTreatmentBn: 'আক্রান্ত পাতা কেটে ধ্বংস করুন। জমিতে সেচ দেওয়া সাময়িকভাবে বন্ধ রাখুন। প্রতিকার হিসেবে কপার অক্সিক্লোরাইড ছিটান।',
    chemicalTreatmentEn: 'Spray systemic fungicide Cymoxanil 8% + Mancozeb 64% (Curzate M8) @ 2g/L or Metalaxyl-M @ 2.5g/L.',
    chemicalTreatmentBn: 'সাইমোক্সানিল + ম্যানকোজেব (কার্জেট) অথবা মেটালেক্সিল জাতীয় ছত্রাকনাশক প্রতি লিটার পানিতে ২ গ্রাম হারে স্প্রে করুন।',
    urgencyDays: 1,
    audioGuidanceEn: 'Emergency Late Blight outbreak in potato plot. High relative humidity accelerates decay. Spray systemic Cymoxanil today.',
    audioGuidanceBn: 'জরুরি সতর্কতা! কুফরি আলুতে নাবি ধসা বা লেট ব্লাইট রোগ শনাক্ত। সকালের কুয়াশায় এটি দ্রুত ছড়ায়, আজই ছত্রাকনাশক স্প্রে করুন।',
    boxCoordinates: [
      { x: 30, y: 25, w: 45, h: 35, label: 'Late Blight Lesion' },
      { x: 18, y: 65, w: 30, h: 25, label: 'Mildew Margin' }
    ],
    sampleImage: 'potato_leaf'
  },
  {
    id: 'tomato-curl',
    nameEn: 'Tomato Leaf Curl Virus (ToLCV)',
    nameBn: 'টমেটোর পাতা কোঁকড়ানো ভাইরাস রোগ',
    cropEn: 'Tomato (Pusa Ruby / Arka Rakshak - ICAR India)',
    cropBn: 'টমেটো (পুসা রুবি / অর্কা রক্ষক - ভারত)',
    pathogenType: 'viral',
    severity: 'moderate',
    confidence: 0.918,
    affectedAreaPercentage: 24,
    symptomsEn: [
      'Upward and inward leaf curling with stunted bushy growth',
      'Interveinal chlorosis (yellowing) with thick, brittle texture',
      'Vector: Whitefly (Bemisia tabaci) transmission'
    ],
    symptomsBn: [
      'গাছের ওপরের পাতাগুলো কোঁকড়ে ছোট হয়ে যায় ও বৃদ্ধি স্থবির হয়',
      'পাতার শিরাগুলো স্বাভাবিকের চেয়ে মোটা ও হলুদ বর্ণ ধারণ করে',
      'সাদা মাছি (হোয়াইটফ্লাই) পোকার মাধ্যমে এই ভাইরাস দ্রুত ছড়ায়'
    ],
    organicTreatmentEn: 'Install yellow sticky traps (15 traps/acre) to trap whiteflies. Spray neem oil (5ml/L) with soap solution.',
    organicTreatmentBn: 'খেতে প্রতি বিঘায় ১০-১২টি হলুদ আঠালো ফাঁদ (Yellow Sticky Trap) স্থাপন করুন। নিম তেল ৫ মিলি ও সাবান পানি মিশিয়ে স্প্রে করুন।',
    chemicalTreatmentEn: 'Control whitefly vector with Acetamiprid 20 SP @ 0.5g/L or Imidacloprid 17.8 SL @ 0.5ml/L.',
    chemicalTreatmentBn: 'ভাইরাস সরাসরি মারা যায় না, তাই বাহক সাদা মাছি দমনে ইমিডাক্লোপ্রিড প্রতি লিটার পানিতে ০.৫ মিলি স্প্রে করুন।',
    urgencyDays: 4,
    audioGuidanceEn: 'Tomato Leaf Curl detected. Eliminate whitefly vectors immediately using yellow sticky traps and systemic Acetamiprid.',
    audioGuidanceBn: 'টমেটোর পাতা কোঁকড়ানো ভাইরাস রোগ শনাক্ত। হলুদ ফাঁদ লাগান এবং সাদা মাছি দমনে স্প্রে করুন।',
    boxCoordinates: [
      { x: 25, y: 28, w: 50, h: 48, label: 'ToLCV Distortion & Chlorosis' }
    ],
    sampleImage: 'tomato_leaf'
  },
  {
    id: 'healthy-rice',
    nameEn: 'Healthy Paddy Leaf (Vigor Index 98%)',
    nameBn: 'সুস্থ ধান পাতা (উচ্চ ফলনশীল সক্ষমতা - ভারত)',
    cropEn: 'Paddy / Basmati (IR-64 / Pusa 1121)',
    cropBn: 'আমন ও বাসমতী ধান (পুসা ১১২১)',
    pathogenType: 'fungal',
    severity: 'low',
    confidence: 0.991,
    affectedAreaPercentage: 0,
    symptomsEn: [
      'Uniform chlorophyll distribution with deep green pigmentation',
      'No necrotic lesions or fungal spore aggregation detected',
      'Optimal stomatal conductance & photosynthesis index'
    ],
    symptomsBn: [
      'পাতার রঙ সম্পূর্ণ গাঢ় সবুজ ও স্বাস্থ্যকর',
      'কোনো ছত্রাক বা জীবাণুর দাগ নেই',
      'গাছের পুষ্টি গ্রহণ ও সালোকসংশ্লেষণ স্বাভাবিক পর্যায়ে রয়েছে'
    ],
    organicTreatmentEn: 'Continue regular balanced irrigation. Apply vermicompost top-dressing during tillering phase.',
    organicTreatmentBn: 'নিয়মিত সেচ বজায় রাখুন। কুশি বের হওয়ার সময় হালকা জৈব সার বা কেঁচো সার (ভার্মিকম্পোস্ট) প্রয়োগ করুন।',
    chemicalTreatmentEn: 'No chemical pesticide required. Maintain standard recommended N-P-K-S balanced fertilizer schedule.',
    chemicalTreatmentBn: 'কোনো কীটনাশক প্রয়োজন নেই। সুষম সার মাত্রা অনুযায়ী পরিচর্যা চালু রাখুন।',
    urgencyDays: 0,
    audioGuidanceEn: 'Crop is in optimal health across Indian farmland. No intervention required. High yield trajectory confirmed.',
    audioGuidanceBn: 'ফসল সম্পূর্ণ সুস্থ এবং রোগমুক্ত। কোনো কীটনাশক প্রয়োজন নেই, নিয়মিত পরিচর্যা চালিয়ে যান।',
    boxCoordinates: [],
    sampleImage: 'healthy_leaf'
  }
];

export const CLIMATE_ALERTS: ClimateBasinAlert[] = [
  {
    id: 'brahmaputra-flood',
    regionEn: 'Brahmaputra & Ganga Basin (Assam & North Bengal / Bihar Plains, India)',
    regionBn: 'ব্রহ্মপুত্র ও গঙ্গা নদী অববাহিকা (আসাম, উত্তরবঙ্গ ও বিহার, ভারত)',
    hazardType: 'flash_flood',
    severity: 'critical',
    riverLevelMeters: 14.85,
    dangerLevelMeters: 13.20,
    predictedSurgeHours: 18,
    rainfallMm24h: 215,
    salinityPpt: 0.2,
    affectedFarmersEstimate: 142000,
    recommendedActionEn: 'CRITICAL SURGE INCOMING (+1.65m above danger mark). Activate emergency early harvest protocol for 80% matured paddy in low-lying riparian tracts immediately.',
    recommendedActionBn: 'বিপদসীমার ১.৬৫ মিটার ওপর দিয়ে পানি প্রবাহিত হচ্ছে! আগামী ১৮ ঘণ্টার মধ্যে প্লাবিত হওয়ার সম্ভাবনা। ৮০% পাকা ধান জরুরি ভিত্তিতে কেটে ঘরে তোলার নির্দেশ।'
  },
  {
    id: 'sundarbans-salinity',
    regionEn: 'Coastal Sundarbans Delta Basin (South 24 Parganas & Digha, West Bengal, India)',
    regionBn: 'উপকূলীয় সুন্দরবন ডেল্টা অঞ্চল (দক্ষিণ ২৪ পরগনা ও দিঘা, পশ্চিমবঙ্গ, ভারত)',
    hazardType: 'salinity_intrusion',
    severity: 'warning',
    riverLevelMeters: 3.40,
    dangerLevelMeters: 4.80,
    predictedSurgeHours: 48,
    rainfallMm24h: 12,
    salinityPpt: 8.6,
    affectedFarmersEstimate: 68000,
    recommendedActionEn: 'High tidal surge driving coastal salinity to 8.6 ppt. Close sluice gate valves #4 & #7 to protect freshwater irrigation reservoirs & vegetable ridges.',
    recommendedActionBn: 'জোয়ারের কারণে নদীতে লবণাক্ততা ৮.৬ পিপিটি ছাড়িয়েছে। ফসল রক্ষায় ৪ ও ৭ নম্বর স্লুইস গেট অবিলম্বে বন্ধ করার নির্দেশ।'
  },
  {
    id: 'yamuna-basin',
    regionEn: 'Yamuna & Indo-Gangetic Plains (Punjab / Haryana / Western UP, India)',
    regionBn: 'যমুনা ও সিন্ধু-গাঙ্গেয় সমভূমি অববাহিকা (পাঞ্জাব, হরিয়ানা ও পশ্চিম উত্তরপ্রদেশ, ভারত)',
    hazardType: 'drought',
    severity: 'advisory',
    riverLevelMeters: 48.2,
    dangerLevelMeters: 52.6,
    predictedSurgeHours: 96,
    rainfallMm24h: 0,
    salinityPpt: 0.1,
    affectedFarmersEstimate: 52000,
    recommendedActionEn: 'Canal head discharge deficit of 35%. Schedule micro-drip rotational irrigation across tubewell command areas to conserve groundwater table.',
    recommendedActionBn: 'সেচ ক্যানেলে স্বাভাবিকের চেয়ে ৩৫% পানিপ্রবাহ কম। ভূগর্ভস্থ পানি সাশ্রয়ে ড্রিপ ও রোটেশনাল সেচ ব্যবস্থা চালু রাখুন।'
  }
];

export const IOT_NODES: IoTSensorNode[] = [
  {
    id: 'NODE-01-PUNJAB',
    name: 'LoRa-Node #1 (Punjab Green Belt - Ludhiana Paddy, India)',
    batteryLevel: 94,
    signalStrengthDbm: -72,
    soilMoisturePct: 88,
    soilTemperatureC: 27.4,
    soilPh: 6.4,
    nitrogenPpm: 48,
    phosphorusPpm: 22,
    potassiumPpm: 160,
    electricalConductivityMsCm: 0.75,
    irrigationStatus: 'idle',
    lastPingSecsAgo: 14
  },
  {
    id: 'NODE-02-BENGAL',
    name: 'LoRa-Node #2 (Burdwan / Hooghly Potato Ridge Alpha, India)',
    batteryLevel: 87,
    signalStrengthDbm: -68,
    soilMoisturePct: 34, // Low moisture! Needs irrigation
    soilTemperatureC: 24.1,
    soilPh: 6.8,
    nitrogenPpm: 65,
    phosphorusPpm: 38,
    potassiumPpm: 210,
    electricalConductivityMsCm: 1.12,
    irrigationStatus: 'irrigating',
    lastPingSecsAgo: 6
  },
  {
    id: 'NODE-03-SUNDARBAN',
    name: 'LoRa-Node #3 (Sundarbans Coastal Saline Polder Beta, India)',
    batteryLevel: 79,
    signalStrengthDbm: -84,
    soilMoisturePct: 62,
    soilTemperatureC: 29.2,
    soilPh: 7.6, // High alkaline / saline risk
    nitrogenPpm: 32,
    phosphorusPpm: 15,
    potassiumPpm: 290,
    electricalConductivityMsCm: 3.45, // High EC indicates salinity
    irrigationStatus: 'idle',
    lastPingSecsAgo: 22
  }
];

export const MANDI_QUOTES: MandiMarketQuote[] = [
  {
    cropId: 'potato-jyoti',
    cropNameEn: 'Potato (Kufri Jyoti Grade A)',
    cropNameBn: 'আলু (কুফরি জ্যোতি এ-গ্রেড)',
    variety: 'Table Export / Chips',
    localMandiNameEn: 'Burdwan / Hooghly APMC Mandi, West Bengal',
    localMandiNameBn: 'বর্ধমান / হুগলি এপিএমসি মান্ডি, পশ্চিমবঙ্গ',
    localPricePerMaund: 820,
    centralMandiNameEn: 'Azadpur Terminal Mandi, New Delhi',
    centralMandiNameBn: 'আজাদপুর টার্মিনাল মান্ডি, নতুন দিল্লি',
    centralPricePerMaund: 1160,
    netProfitPerTruck: 34000,
    recommendedAction: 'transport_to_central',
    nearestStorageEn: 'Agro Cold Vault Hub (12km, West Bengal)',
    nearestStorageBn: 'এগ্রো কোল্ড স্টোরেজ হাব (১২ কিমি, পশ্চিমবঙ্গ)',
    storageAvailableTons: 420
  },
  {
    cropId: 'rice-basmati',
    cropNameEn: 'Paddy / Basmati (Pusa 1121 Standard)',
    cropNameBn: 'ধান / বাসমতী (পুসা ১১২১ প্রিমিয়াম)',
    variety: 'Aromatic Long Grain',
    localMandiNameEn: 'Karnal Grain Mandi, Haryana',
    localMandiNameBn: 'কারনাল শস্য মান্ডি, হরিয়ানা',
    localPricePerMaund: 1320,
    centralMandiNameEn: 'Narela / Azadpur Wholesale Mandi, Delhi',
    centralMandiNameBn: 'নারেলা / আজাদপুর পাইকারি মান্ডি, দিল্লি',
    centralPricePerMaund: 1540,
    netProfitPerTruck: 18500,
    recommendedAction: 'transport_to_central',
    nearestStorageEn: 'Central Warehousing Corp Silo (8km)',
    nearestStorageBn: 'সেন্ট্রাল ওয়্যারহাউজিং সাইলো কমপ্লেক্স (৮ কিমি)',
    storageAvailableTons: 1150
  },
  {
    cropId: 'tomato-winter',
    cropNameEn: 'Hybrid Winter Tomato (Arka)',
    cropNameBn: 'শীতকালীন হাইব্রিড টমেটো (অর্কা)',
    variety: 'Fresh Table APMC',
    localMandiNameEn: 'Kolar APMC Market, Karnataka',
    localMandiNameBn: 'কোলার এপিএমসি মার্কেট, কর্ণাটক',
    localPricePerMaund: 900,
    centralMandiNameEn: 'Vashi Wholesale APMC, Navi Mumbai',
    centralMandiNameBn: 'ভাসি পাইকারি এপিএমসি, নভি মুম্বাই',
    centralPricePerMaund: 980,
    netProfitPerTruck: -4200, // Long transit freight reduces margin
    recommendedAction: 'hold_cold_storage',
    nearestStorageEn: 'Kolar Cold Chain Logistics (5km)',
    nearestStorageBn: 'কোলার কোল্ড চেইন লজিস্টিকস (৫ কিমি)',
    storageAvailableTons: 85
  }
];

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'brahmaputra-flood',
    titleEn: 'Brahmaputra & Ganga Basin Flash Flood Warning',
    titleBn: 'ব্রহ্মপুত্র ও গঙ্গা অববাহিকায় আকস্মিক বন্যা সতর্কতা',
    descriptionEn: 'River basin surging +1.65m above danger level with 18hr evacuation window for 142k Indian farmers.',
    descriptionBn: 'অববাহিকায় বিপদসীমার ১.৬৫ মিটার ওপর দিয়ে পানি বৃদ্ধি। ১৪২,০০০ ভারতীয় কৃষকের ফসল রক্ষায় জরুরি অ্যালার্ট।',
    targetTab: 'climate',
    region: 'North-East India',
    highlightMetric: '+1.65m Danger Mark'
  },
  {
    id: 'kufri-blight',
    titleEn: 'Kufri Potato Late Blight AI Pathology',
    titleBn: 'কুফরি আলুর নাবি ধসা এআই প্যাথোলজি স্ক্যান',
    descriptionEn: 'Multi-spectral leaf scan identifies Phytophthora infestans with 96.5% confidence and calculates 24hr intervention window.',
    descriptionBn: 'পাতার ছবিতে ৯৬.৫% নির্ভুলতায় লেইট ব্লাইট রোগ শনাক্তকরণ এবং আগামী ২৪ ঘণ্টার জরুরি ছত্রাকনাশক প্রেসক্রিপশন।',
    targetTab: 'vision',
    region: 'Bengal / UP Belt',
    highlightMetric: '96.5% AI Confidence'
  },
  {
    id: 'iot-irrigation',
    titleEn: 'Autonomous Smart Irrigation Solenoid',
    titleBn: 'স্বয়ংক্রিয় স্মার্ট সেচ ও সয়েল নিউট্রিয়েন্ট - পাঞ্জাব বেল্ট',
    descriptionEn: 'Real-time LoRa telemetry detects moisture drop to 34% and triggers micro-valve automation with live N-P-K readouts.',
    descriptionBn: 'লরা সেন্সরে মাটির আর্দ্রতা ৩৪% এ নেমে যাওয়ায় স্বয়ংক্রিয় ড্রিপ সেচ ভালভ চালু এবং সার বিশ্লেষণ।',
    targetTab: 'iot',
    region: 'Punjab, India',
    highlightMetric: 'Autonomous Valve ON'
  },
  {
    id: 'mandi-arbitrage',
    titleEn: 'APMC & e-NAM Mandi Arbitrage Engine',
    titleBn: 'এপিএমসি মান্ডি দর তারতম্য ও e-NAM লাভ বিশ্লেষণ',
    descriptionEn: 'Detects ₹340/maund price disparity between regional mandis & Azadpur Delhi, unlocking ₹34,000 net profit per truck and bypassing middlemen.',
    descriptionBn: 'আঞ্চলিক মান্ডি ও দিল্লির আজাদপুর টার্মিনাল মান্ডির মাঝে মণে ৩৪০ টাকার ফারাক খুঁজে মধ্যস্বত্বভোগী ছাড়া ট্রাকে ₹৩৪,০০০ অতিরিক্ত লাভ।',
    targetTab: 'market',
    region: 'Delhi-NCR Corridor',
    highlightMetric: '+₹34,000 Net Margin'
  }
];
