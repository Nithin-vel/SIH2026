export const CROPS_DB = [
  // CEREALS
  { 
    name: "Paddy", water_requirement: "high", soil_ph_range: {min: 5.0, max: 8.0, optimal_min: 5.5, optimal_max: 6.5}, temp_range: {min: 20, max: 40, optimal_min: 25, optimal_max: 35}, 
    regions: ["Tamil Nadu", "Andhra Pradesh", "Punjab", "West Bengal", "Uttar Pradesh", "Odisha", "Chhattisgarh", "Karnataka", "Kerala", "Telangana", "Bihar"],
    agronomic_trait: "It thrives in submerged soil conditions and requires high moisture retention for its extensive shallow root system."
  },
  { 
    name: "Wheat", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 10, max: 30, optimal_min: 15, optimal_max: 25}, 
    regions: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Bihar", "Gujarat", "Maharashtra"],
    agronomic_trait: "It is a robust winter crop that depends on cool temperatures during its vegetative stage for optimal tillering."
  },
  { 
    name: "Maize", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 8.0, optimal_min: 6.0, optimal_max: 7.2}, temp_range: {min: 15, max: 35, optimal_min: 21, optimal_max: 27}, 
    regions: ["Karnataka", "Madhya Pradesh", "Bihar", "Tamil Nadu", "Telangana", "Maharashtra", "Andhra Pradesh"],
    agronomic_trait: "It is highly responsive to nitrogen and requires well-drained loamy soils to prevent root rot."
  },
  { 
    name: "Millets", water_requirement: "low", soil_ph_range: {min: 5.0, max: 8.5, optimal_min: 5.5, optimal_max: 7.5}, temp_range: {min: 20, max: 45, optimal_min: 26, optimal_max: 35}, 
    regions: ["Rajasthan", "Maharashtra", "Karnataka", "Andhra Pradesh", "Tamil Nadu", "Gujarat", "Haryana"],
    agronomic_trait: "It is exceptionally drought-resistant and can efficiently utilize deep soil moisture in arid conditions."
  },
  { 
    name: "Sorghum (Jowar)", water_requirement: "low", soil_ph_range: {min: 5.5, max: 8.5, optimal_min: 6.0, optimal_max: 7.5}, temp_range: {min: 20, max: 40, optimal_min: 25, optimal_max: 32}, 
    regions: ["Maharashtra", "Karnataka", "Andhra Pradesh", "Madhya Pradesh", "Rajasthan"],
    agronomic_trait: "It possesses a unique wax-coated leaf structure that minimizes transpiration, making it highly resilient to dry spells."
  },
  
  // PULSES
  { 
    name: "Pigeon Pea (Tur)", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 8.0, optimal_min: 6.0, optimal_max: 7.5}, temp_range: {min: 20, max: 40, optimal_min: 25, optimal_max: 35}, 
    regions: ["Maharashtra", "Karnataka", "Madhya Pradesh", "Gujarat", "Uttar Pradesh"],
    agronomic_trait: "Its deep taproot system allows it to access deeper soil profiles, aiding in biological nitrogen fixation."
  },
  { 
    name: "Gram (Chickpea)", water_requirement: "low", soil_ph_range: {min: 6.0, max: 8.0, optimal_min: 6.5, optimal_max: 7.5}, temp_range: {min: 10, max: 30, optimal_min: 15, optimal_max: 25}, 
    regions: ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Uttar Pradesh", "Karnataka"],
    agronomic_trait: "It secretes malic acid from its leaves which naturally deters certain pests, while enriching soil fertility."
  },
  { 
    name: "Lentil (Masoor)", water_requirement: "low", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 10, max: 30, optimal_min: 15, optimal_max: 25}, 
    regions: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "West Bengal"],
    agronomic_trait: "It is a short-duration pulse that acts as an excellent rotational crop for restoring soil nitrogen."
  },

  // OILSEEDS
  { 
    name: "Groundnut", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 6.5}, temp_range: {min: 15, max: 40, optimal_min: 25, optimal_max: 30}, 
    regions: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Maharashtra", "Rajasthan"],
    agronomic_trait: "It forms its seed pods underground (geocarpy), which necessitates loose, friable soil for optimal penetration."
  },
  { 
    name: "Soybean", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 20, max: 40, optimal_min: 25, optimal_max: 30}, 
    regions: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka", "Telangana"],
    agronomic_trait: "It has high symbiotic nitrogen-fixing capabilities but is highly sensitive to waterlogging."
  },
  { 
    name: "Mustard", water_requirement: "low", soil_ph_range: {min: 6.0, max: 7.5, optimal_min: 6.5, optimal_max: 7.0}, temp_range: {min: 10, max: 30, optimal_min: 15, optimal_max: 25}, 
    regions: ["Rajasthan", "Haryana", "Madhya Pradesh", "Uttar Pradesh", "West Bengal"],
    agronomic_trait: "It acts as a natural bio-fumigant, improving soil health by suppressing soil-borne pathogens."
  },
  { 
    name: "Sunflower", water_requirement: "medium", soil_ph_range: {min: 6.0, max: 8.0, optimal_min: 6.5, optimal_max: 7.5}, temp_range: {min: 20, max: 35, optimal_min: 25, optimal_max: 30}, 
    regions: ["Karnataka", "Andhra Pradesh", "Maharashtra", "Tamil Nadu", "Bihar"],
    agronomic_trait: "It exhibits heliotropism (following the sun) and possesses an extremely deep root system that mines nutrients effectively."
  },

  // COMMERCIAL / CASH CROPS
  { 
    name: "Cotton", water_requirement: "medium", soil_ph_range: {min: 5.8, max: 8.0, optimal_min: 6.0, optimal_max: 7.5}, temp_range: {min: 15, max: 40, optimal_min: 25, optimal_max: 32}, 
    regions: ["Gujarat", "Maharashtra", "Telangana", "Andhra Pradesh", "Haryana", "Punjab", "Tamil Nadu"],
    agronomic_trait: "It performs best in deep black soils (regur) which have high moisture retention capabilities during the boll-forming stage."
  },
  { 
    name: "Sugarcane", water_requirement: "high", soil_ph_range: {min: 5.0, max: 8.5, optimal_min: 6.0, optimal_max: 7.5}, temp_range: {min: 20, max: 40, optimal_min: 25, optimal_max: 35}, 
    regions: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Bihar", "Gujarat"],
    agronomic_trait: "It is a heavy feeder that requires sustained, long-duration irrigation to maximize sucrose accumulation."
  },
  { 
    name: "Jute", water_requirement: "high", soil_ph_range: {min: 5.0, max: 7.0, optimal_min: 5.5, optimal_max: 6.5}, temp_range: {min: 24, max: 38, optimal_min: 28, optimal_max: 35}, 
    regions: ["West Bengal", "Bihar", "Assam", "Odisha"],
    agronomic_trait: "It flourishes in hot, humid climates and depends heavily on pre-monsoon showers for early vegetative growth."
  },
  { 
    name: "Tobacco", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 20, max: 35, optimal_min: 25, optimal_max: 30}, 
    regions: ["Andhra Pradesh", "Gujarat", "Karnataka", "Uttar Pradesh", "Bihar"],
    agronomic_trait: "It requires well-drained, slightly acidic soils, as waterlogging can instantly damage its extensive root network."
  },

  // PLANTATION & SPICES
  { 
    name: "Tea", water_requirement: "high", soil_ph_range: {min: 4.5, max: 6.5, optimal_min: 5.0, optimal_max: 6.0}, temp_range: {min: 15, max: 30, optimal_min: 20, optimal_max: 25}, 
    regions: ["Assam", "West Bengal", "Tamil Nadu", "Kerala"],
    agronomic_trait: "It is highly sensitive to stagnant water and demands sloped terrains with consistently high humidity."
  },
  { 
    name: "Coffee", water_requirement: "high", soil_ph_range: {min: 5.0, max: 7.0, optimal_min: 6.0, optimal_max: 6.5}, temp_range: {min: 15, max: 30, optimal_min: 20, optimal_max: 25}, 
    regions: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"],
    agronomic_trait: "It thrives under filtered shade and relies on a delicate balance of alternating dry and wet periods for blossom induction."
  },
  { 
    name: "Rubber", water_requirement: "high", soil_ph_range: {min: 4.5, max: 6.5, optimal_min: 5.0, optimal_max: 6.0}, temp_range: {min: 20, max: 35, optimal_min: 25, optimal_max: 30}, 
    regions: ["Kerala", "Tamil Nadu", "Tripura", "Assam"],
    agronomic_trait: "It requires a highly distributed annual rainfall pattern to sustain continuous latex production."
  },
  { 
    name: "Coconut", water_requirement: "high", soil_ph_range: {min: 5.5, max: 8.0, optimal_min: 6.0, optimal_max: 7.5}, temp_range: {min: 20, max: 35, optimal_min: 25, optimal_max: 30}, 
    regions: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Goa", "Maharashtra", "West Bengal"],
    agronomic_trait: "It is highly tolerant to salinity and relies on sandy coastal loams that offer rapid water drainage."
  },
  
  // HORTICULTURE
  { 
    name: "Tomato", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 10, max: 35, optimal_min: 21, optimal_max: 27}, 
    regions: ["Andhra Pradesh", "Madhya Pradesh", "Karnataka", "Gujarat", "Odisha", "Tamil Nadu"],
    agronomic_trait: "It is highly sensitive to extreme heat, which can cause sudden flower drop and prevent fruit setting."
  },
  { 
    name: "Potato", water_requirement: "medium", soil_ph_range: {min: 5.0, max: 7.0, optimal_min: 5.5, optimal_max: 6.5}, temp_range: {min: 15, max: 30, optimal_min: 18, optimal_max: 24}, 
    regions: ["Uttar Pradesh", "West Bengal", "Bihar", "Gujarat", "Madhya Pradesh"],
    agronomic_trait: "It requires loose, highly aerated soils to allow unrestricted tuber expansion without physical resistance."
  },
  { 
    name: "Onion", water_requirement: "medium", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 15, max: 35, optimal_min: 20, optimal_max: 30}, 
    regions: ["Maharashtra", "Karnataka", "Gujarat", "Bihar", "Madhya Pradesh"],
    agronomic_trait: "It relies on specific photoperiods (day length) to trigger bulb initiation rather than just foliage growth."
  },
  { 
    name: "Banana", water_requirement: "high", soil_ph_range: {min: 5.5, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 15, max: 40, optimal_min: 26, optimal_max: 30}, 
    regions: ["Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh", "Karnataka", "Kerala"],
    agronomic_trait: "It is extremely wind-sensitive due to its shallow roots, requiring sheltered micro-climates and heavy potassium feeding."
  },
  { 
    name: "Turmeric", water_requirement: "medium", soil_ph_range: {min: 5.0, max: 7.5, optimal_min: 6.0, optimal_max: 7.0}, temp_range: {min: 20, max: 35, optimal_min: 25, optimal_max: 30}, 
    regions: ["Telangana", "Maharashtra", "Tamil Nadu", "Gujarat", "Odisha", "Andhra Pradesh"],
    agronomic_trait: "It demands highly friable and well-drained soils to prevent rhizome rot during the prolonged curing phase."
  }
];
