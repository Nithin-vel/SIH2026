export const getConditionFromCode = (code) => {
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Clear";
};

export const generateForecastArray = (dailyData) => {
  if (!dailyData || !dailyData.time) return [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return dailyData.time.slice(0, 7).map((timeStr, idx) => {
    // Append T12:00:00 to avoid timezone shift on local parsing
    const dateObj = new Date(timeStr + 'T12:00:00');
    const dayName = idx === 0 ? "Today" : daysOfWeek[dateObj.getDay()];
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const code = dailyData.weather_code[idx];
    const condition = getConditionFromCode(code);
    const rainProb = dailyData.precipitation_probability_max[idx] || 0;
    
    let advisory = "Ideal for general farm operations.";
    if (rainProb > 70) advisory = "Avoid pesticide/foliar spraying. Ensure drainage.";
    else if (rainProb > 40) advisory = "Delay irrigation; monitor moisture.";
    else if (condition === "Clear" || condition === "Partly Cloudy") advisory = "Optimal for intercultural hoeing & weeding.";
    
    return {
      day: dayName,
      date: dateStr,
      tempMax: Math.round(dailyData.temperature_2m_max[idx]),
      tempMin: Math.round(dailyData.temperature_2m_min[idx]),
      condition,
      rainProb,
      advisory
    };
  });
};

export const generateAdvisories = (dailyData, currentData) => {
  const advisories = [];
  if (!dailyData || !dailyData.time) return advisories;

  const tomorrowRain = dailyData.precipitation_probability_max[1] || 0;
  const tomorrowMax = dailyData.temperature_2m_max[1] || 30;
  const currentWind = currentData?.windSpeed || 0;
  
  // 1. Rain & Moisture Advisory
  if (tomorrowRain > 60) {
    advisories.push({
      id: 'adv_1', icon: '🌧', title: 'Heavy Rain Precaution (Tomorrow)',
      desc: `High rainfall probability tomorrow (${tomorrowRain}%). Halt all foliar sprays of pesticides, insecticides, and top-dress fertilizers. Ensure primary field drainage ditches are unblocked.`,
      severity: 'high', bg: '#fff7ed', color: '#c2410c'
    });
  } else if (tomorrowRain > 30) {
    advisories.push({
      id: 'adv_1', icon: '🌦', title: 'Moderate Showers Expected (Tomorrow)',
      desc: `A ${tomorrowRain}% chance of rain tomorrow. Plan your fertilizer applications after the showers to prevent nutrient leaching.`,
      severity: 'medium', bg: '#fefce8', color: '#a16207'
    });
  } else {
    advisories.push({
      id: 'adv_1', icon: '☀️', title: 'Dry Spell Outlook (Next 48h)',
      desc: `Low rainfall probability (${tomorrowRain}%) over the next 48 hours. Favorable window for foliar nutrient sprays and pesticide application.`,
      severity: 'low', bg: '#f0fdf4', color: '#16a34a'
    });
  }
  
  // 2. Irrigation Advisory
  if (tomorrowRain > 50) {
    advisories.push({
      id: 'adv_2', icon: '💧', title: 'Irrigation Scheduling Advisory',
      desc: `Incoming rainfall tomorrow (${tomorrowRain}%) will meet crop water requirements. Skip automated evening drip cycles to conserve groundwater and prevent root hypoxia.`,
      severity: 'medium', bg: '#f0f9ff', color: '#0369a1'
    });
  } else if (tomorrowMax >= 34) {
     advisories.push({
      id: 'adv_2', icon: '💧', title: 'Heat Stress Irrigation Advisory',
      desc: `High temperatures expected tomorrow (${Math.round(tomorrowMax)}°C). Increase drip irrigation cycle by 20% to prevent flower drop and wilt in sensitive crops.`,
      severity: 'high', bg: '#fff7ed', color: '#c2410c'
    });
  } else {
     advisories.push({
      id: 'adv_2', icon: '💧', title: 'Routine Irrigation Maintained',
      desc: `Moderate temperatures tomorrow (${Math.round(tomorrowMax)}°C) and low rainfall. Maintain standard drip cycles. Check soil moisture sensors if available.`,
      severity: 'low', bg: '#f8fafc', color: '#475569'
    });
  }

  // 3. Wind Advisory
  if (currentWind > 25) {
    advisories.push({
      id: 'adv_3', icon: '💨', title: 'High Wind & Staking Advisory',
      desc: `Current strong gusts (${Math.round(currentWind)} km/h). Check supporting stakes for tall crops like banana bunches and sugarcane ratoons to prevent lodging.`,
      severity: 'high', bg: '#fff7ed', color: '#c2410c'
    });
  } else if (currentWind > 15) {
    advisories.push({
      id: 'adv_3', icon: '💨', title: 'Moderate Wind Alert',
      desc: `Current breezy conditions (${Math.round(currentWind)} km/h). Avoid fine-mist foliar spraying today to prevent chemical drift to adjacent fields.`,
      severity: 'medium', bg: '#fefce8', color: '#a16207'
    });
  } else {
    advisories.push({
      id: 'adv_3', icon: '🍃', title: 'Calm Wind Conditions',
      desc: `Current low wind speed (${Math.round(currentWind)} km/h). Ideal microclimate for precise drone spraying and manual pest control applications today.`,
      severity: 'low', bg: '#f0fdf4', color: '#16a34a'
    });
  }
  
  // 4. Disease / Heat Window
  if (tomorrowRain > 40 && tomorrowMax > 28) {
     advisories.push({
      id: 'adv_4', icon: '🦠', title: 'Fungal Disease Alert (Tomorrow)',
      desc: `Tomorrow's warm and humid conditions (${Math.round(tomorrowMax)}°C, ${tomorrowRain}% rain chance) are highly conducive to fungal spore germination. Scout foliage.`,
      severity: 'high', bg: '#fff7ed', color: '#c2410c'
    });
  } else if (tomorrowRain <= 30 && tomorrowMax > 32) {
     advisories.push({
      id: 'adv_4', icon: '☀️', title: 'Heat & Pest Alert (Tomorrow)',
      desc: `Tomorrow's dry and hot microclimate (${Math.round(tomorrowMax)}°C). Watch out for sucking pests like thrips and whiteflies which thrive in dry heat.`,
      severity: 'medium', bg: '#fefce8', color: '#a16207'
    });
  } else {
     advisories.push({
      id: 'adv_4', icon: '🌱', title: 'Optimal Crop Development',
      desc: `Tomorrow's balanced temperature (${Math.round(tomorrowMax)}°C) limits extreme pest pressure. Good window for preventive organic interventions (e.g., Neem oil spray).`,
      severity: 'low', bg: '#f8fafc', color: '#475569'
    });
  }

  return advisories;
};

// Also generate a critical alert object for the dashboard banner
export const generateCriticalAlert = (advisories) => {
  const highPriority = advisories.find(a => a.severity === 'high');
  if (highPriority) {
     return {
       type: "warning",
       title: highPriority.title,
       message: highPriority.desc,
       urgency: "High"
     };
  }
  return {
     type: "info",
     title: "Stable Weather Ahead",
     message: "No severe weather alerts for your farm location. Proceed with scheduled agricultural activities.",
     urgency: "Low"
  };
};
