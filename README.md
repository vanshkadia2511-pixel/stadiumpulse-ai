# 🏟️ StadiumPulse AI Assistant

**StadiumPulse AI** is a real-time, production-ready crowd management assistant designed for large-scale sporting and entertainment venues. Using a combination of live sensor data (simulated via Firestore), predictive logic, and conversational AI, StadiumPulse helps venue staff identify bottlenecks, optimize pedestrian flow, and ensure a premium spectator experience.

![StadiumPulse AI Dashboard Preview](https://via.placeholder.com/1200x600?text=StadiumPulse+AI+Dashboard+Preview)

## 🚀 Key Features

- **🧠 Crowd Oracle AI**: A conversational assistant powered by **Gemini 2.0 Flash** that answers complex operational questions (e.g., "Where is the shortest restroom queue?") using real-time stadium context.
- **🗺️ Interactive Heatmap**: A high-fidelity **Google Maps** integration that visualizes crowd density across 12 stadium zones with dynamic color-coding based on live pressure scores.
- **🛣️ Intelligent Pathfinding**: An implementation of **Dijkstra's Algorithm** that calculates the "path of least resistance" between any two points in the venue, accounting for real-time crowd congestion.
- **📉 Pressure Scoring**: A custom algorithm that calculates a 0-100 "Pressure Score" for every zone by analyzing occupancy, wait times, and historical trends.
- **🔥 Live Data Sync**: Powered by **Firebase Cloud Firestore**, providing sub-second updates to the dashboard as crowd conditions change.
- **🛠️ Background Simulator**: A robust demo engine that models realistic crowd movements, allowing for full testing of AI logic without physical sensors.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Vite
- **AI/ML**: Gemini 2.0 Flash (via Google Generative AI SDK)
- **Maps**: Google Maps JavaScript API (@vis.gl/react-google-maps)
- **Backend/DB**: Firebase Firestore, Firebase Authentication
- **Logic**: Custom Graph-based Dijkstra Implementation

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- A Firebase Project
- Google AI (Gemini) API Key
- Google Maps API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/stadiumpulse-ai.git
   cd stadiumpulse-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (use `.env.example` as a template):
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_GEMINI_API_KEY=...
   VITE_MAPS_API_KEY=...
   ```

4. **Seed the Database**
   Initialize your Firestore with the stadium zones:
   ```bash
   npm run seed
   ```

5. **Run the Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```text
stadiumpulse-ai/
├── src/
│   ├── components/       # UI Components (Crowd, Assistant, Map)
│   ├── context/          # StadiumState for global state management
│   ├── data/             # Static stadium graph and mock data
│   ├── firebase/         # Firestore config and service layer
│   ├── hooks/            # Custom React hooks (AI, Data, Algorithms)
│   ├── pages/            # Application views (Dashboard)
│   ├── services/         # External API integrations (Gemini, Maps)
│   └── utils/            # Core logic (Dijkstra, Pressure Scoring)
├── public/               # Static assets and icons
├── Dockerfile            # Cloud Run deployment configuration
├── seed.mjs              # Firestore database initialization script
├── firestore.rules       # Database security policies
├── firestore.indexes.json# Custom database indexes
├── tailwind.config.js    # Visual design system configuration
└── vite.config.js        # Build tool configuration
```

## 📜 License
Distributed under the MIT License.

---
*Built for the PromptWars Challenge — Empowering Venue Management with AI.*
