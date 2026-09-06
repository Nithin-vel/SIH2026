# 🌾 Farmogram AI — Smart India Hackathon (SIH) Prototype

> **Farmogram = Agriculture Community + Agricultural Decision Support**  
> A farmer-centric platform assisting Indian cultivators from pre-sowing to post-harvest through actionable decision-support tools and verified peer-to-peer knowledge sharing.

---

## 🌟 Key Concept & Agronomic Architecture

### 1. Unified Ecosystem
* **Pre-Sowing**: Smart Crop Advisor, Profit & Cost Calculator, Soil Texture Profiling, Government Subsidies.
* **Cultivation**: Agro-meteorological Weather Advisory, Irrigation Scheduling, Expert Q&A Forum.
* **Protection**: AI Leaf Vision Disease Detection with cultural, organic, and chemical remedy protocols.
* **Harvest & Post-Harvest**: Live Mandi APMC Market Intelligence, Price Trends, and Quality Grading.

### 2. Crucial Agronomic Model Distinction
* **Zero Pseudo-Science**: Removed claims that soil type alone determines a "soil health score" or "soil efficiency percentage".
* **Scientific Multi-Factor Matrix**: **Soil Type** is modeled as **one agronomic input** in conjunction with:
  * Local seasonal weather forecasts
  * Water budget & irrigation method
  * Crop rotation and nitrogen fixation
  * APMC mandi demand projections

---

## 🚀 Application Structure & Pages

1. **🌾 Farmogram Home (`/`)**: Dashboard hero greeting, localized microclimate summary, high-priority agricultural advisory banner, quick tool tiles, and the Community Knowledge Feed with short Agri-Reels.
2. **🌱 Smart Crop Advisor**: Multi-factor decision matrix (Soil Type, Season, Weather, Water, Previous Crop) yielding matched variety, best sowing window, and financial projections.
3. **🌦 Weather Advisory**: Hyperlocal 7-day forecast with precipitation probability, wind alerts, soil moisture indices, and practical spraying advisories.
4. **🦠 Crop Disease Detection**: Foliar lesion scanner with drag-and-drop image upload, scanning simulation, confidence score, symptoms checklist, organic/chemical treatment steps, and official KVK expert disclaimers.
5. **💧 Irrigation Recommendation**: Phenological stage-aware water management engine based on plant growth cycles, evapotranspiration, and forecasted rain events.
6. **📈 Market Intelligence**: Live APMC Mandi price tracker across Tamil Nadu (Coimbatore, Erode, Salem, Madurai, Thanjavur), price trend indicators (↑/↓), daily arrivals volume, and 15-day price momentum.
7. **💰 Profit Calculator**: Reactive investment and ROI calculator analyzing seed, fertilizer, labour, machinery, yield, and break-even selling price.
8. **🏛 Government Schemes**: Directory of central and state agricultural welfare schemes (PM-KISAN, PMKSY Drip Subsidy, PMFBY, SMAM, Free Power) with eligibility criteria, required document checklists, and application deadlines.
9. **👨‍🌾 Expert Q&A**: Agricultural forum where farmers ask questions with photo attachments, answered by verified TNAU scientists and agronomists.
10. **🔔 Notifications Center**: Categorized real-time alerts for weather warnings, mandi price surges, expert responses, and scheme deadlines.
11. **👤 Farmer Profile**: Editable farm configuration (land area, dominant soil type, irrigation system, active crops, personal bio) and historical advice tracking.
12. **🛡️ Admin Dashboard**: Dedicated SIH panel for evaluators featuring system telemetry, flagged content moderation queue, and expert agronomist verification.
13. **🔐 Login & Registration**: Seamless onboarding with one-click demo login buttons for both **Farmer Murugan** and **SIH Evaluator/Admin**.

---

## 🛠️ Technology Stack

* **Core**: React 18 & JavaScript (ES Modules)
* **Build System**: Vite
* **Icons**: Lucide React
* **Styling**: Modern Vanilla CSS with CSS Custom Properties, Glassmorphism, Micro-animations, and Responsive Breakpoints (Zero Tailwind dependency).
* **State Management**: React Context (`AuthContext` & `AppStateContext`) with `localStorage` persistence.

---

## 💻 Running the Application Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Open browser at:
http://localhost:5173
```

---

## 🏆 Smart India Hackathon Presentation Guide
* **One-Click Demo Login**: Use the preset buttons on the login screen to enter immediately as **Farmer Murugan** or switch to the **Admin Portal**.
* **Role Switcher**: Click the **"🌾 Farmer View" / "🛡️ Admin View"** badge in the sidebar to toggle between farmer and jury moderation views at any time.
* **Sample Presets**: Crop Advisor and Disease Detection include pre-configured test buttons for instant demonstrations during live pitching.
