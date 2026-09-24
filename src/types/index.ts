export type Language = 'bn' | 'en';

export type ActiveTab = 'overview' | 'vision' | 'climate' | 'iot' | 'market' | 'judge';

export interface CropDisease {
  id: string;
  nameEn: string;
  nameBn: string;
  cropEn: string;
  cropBn: string;
  pathogenType: 'fungal' | 'bacterial' | 'viral' | 'pest';
  severity: 'low' | 'moderate' | 'critical';
  confidence: number;
  affectedAreaPercentage: number;
  symptomsEn: string[];
  symptomsBn: string[];
  organicTreatmentEn: string;
  organicTreatmentBn: string;
  chemicalTreatmentEn: string;
  chemicalTreatmentBn: string;
  urgencyDays: number;
  audioGuidanceBn: string;
  audioGuidanceEn: string;
  boxCoordinates: { x: number; y: number; w: number; h: number; label: string }[];
  sampleImage: string;
}

export interface ClimateBasinAlert {
  id: string;
  regionEn: string;
  regionBn: string;
  hazardType: 'flash_flood' | 'drought' | 'salinity_intrusion' | 'pest_surge';
  severity: 'normal' | 'advisory' | 'warning' | 'critical';
  riverLevelMeters: number;
  dangerLevelMeters: number;
  predictedSurgeHours: number;
  rainfallMm24h: number;
  salinityPpt: number;
  affectedFarmersEstimate: number;
  recommendedActionEn: string;
  recommendedActionBn: string;
}

export interface IoTSensorNode {
  id: string;
  name: string;
  batteryLevel: number;
  signalStrengthDbm: number;
  soilMoisturePct: number;
  soilTemperatureC: number;
  soilPh: number;
  nitrogenPpm: number;
  phosphorusPpm: number;
  potassiumPpm: number;
  electricalConductivityMsCm: number;
  irrigationStatus: 'idle' | 'irrigating' | 'scheduled';
  lastPingSecsAgo: number;
}

export interface MandiMarketQuote {
  cropId: string;
  cropNameEn: string;
  cropNameBn: string;
  variety: string;
  localMandiNameEn: string;
  localMandiNameBn: string;
  localPricePerMaund: number; // 40kg standard
  centralMandiNameEn: string;
  centralMandiNameBn: string;
  centralPricePerMaund: number;
  netProfitPerTruck: number;
  recommendedAction: 'sell_locally' | 'transport_to_central' | 'hold_cold_storage';
  nearestStorageEn: string;
  nearestStorageBn: string;
  storageAvailableTons: number;
}

export interface DemoScenario {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  targetTab: ActiveTab;
  region: string;
  highlightMetric: string;
}
