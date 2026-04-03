# Mind-Safe India - Product Requirements Document
**Version:** 1.0  
**Target:** AI Agentic Hackathon 2026  
**Platform:** Progressive Web App (Mobile-First)

## Vision Statement
Zepto-speed e-waste disposal meets enterprise-grade data security through autonomous AI agents.

## Core Value Proposition
A 10-minute, doorstep e-waste solution using a multi-agent system that autonomously handles device appraisal, price negotiation, secure data destruction, and logistics—all through a simple chat interface.

---

## 1. Multi-Agent Architecture

### Agent 1: Concierge Agent (The Interface)
**Role:** User interaction, intent routing, and workflow orchestration  
**Technology:** Gemini 1.5 Flash (Text/Voice)  
**Responsibilities:**
- Greet users and identify intent (Sell vs. Recycle)
- Extract device information from natural language
- Route requests to specialized agents
- Maintain conversation context throughout the journey

### Agent 2: Visual Appraisal Agent (The Eyes)
**Role:** Device identification and damage assessment  
**Technology:** Gemini 1.5 Pro Vision (Multimodal)  
**Responsibilities:**
- Analyze device photos/video from browser camera
- Identify exact make, model, and year
- Detect physical damage (cracks, burns, port damage)
- Assign condition grade (A/B/C/D)
- Estimate battery health from visual cues

### Agent 3: Negotiator Agent (The Deal-Maker)
**Role:** Price discovery and vendor negotiation  
**Technology:** LangGraph / CrewAI  
**Responsibilities:**
- Query multiple vendor APIs for pricing
- Autonomously negotiate higher prices based on device condition
- Factor in data-wipe certificate value
- Present single best offer to user
- Handle counter-offers and price adjustments

### Agent 4: Security Guardian Agent (The Trust Officer)
**Role:** Data sanitization and certification  
**Technology:** NIST 800-88 compliance, SHA-256 hashing  
**Responsibilities:**
- Oversee multi-pass data overwriting process
- Perform cryptographic erasure for SSDs
- Generate tamper-proof wipe certificates
- Create SHA-256 hash of destruction process
- Sign certificates with private key

### Agent 5: Dispatch Agent (The Coordinator)
**Role:** Logistics and real-time tracking  
**Technology:** Mapbox SDK, Geolocation API  
**Responsibilities:**
- Match user location with nearest technician
- Calculate optimal routes considering traffic
- Provide real-time ETA updates
- Handle technician reassignment if needed
- Batch nearby pickups for efficiency

### Agent 6: Sustainability Agent (The Accountant)
**Role:** Environmental impact calculation  
**Technology:** Custom algorithms + public databases  
**Responsibilities:**
- Calculate CO2 emissions prevented
- Track toxic materials diverted from landfills
- Measure water conservation impact
- Update user's personal eco-dashboard
- Aggregate global impact metrics

---

## 2. User Journey (Mobile Web)

### Phase 1: Landing (0-5 seconds)
**UI:** Single action home screen with large button: "Securely Dispose a Device"  
**Alternative:** Text input: "Or just tell me what you have..."  
**Agent:** Concierge Agent activates

### Phase 2: Visual Appraisal (5-30 seconds)
**UI:** Full-screen camera view with live AI feedback  
**Action:** User captures 3-4 photos or 10-second video  
**Agent:** Visual Appraisal Agent processes in real-time  
**Output:** Device identified, condition graded, preliminary value shown

### Phase 3: Autonomous Negotiation (30-45 seconds)
**UI:** "Deal Card" with animated agent activity  
**Display:** Live updates: "Checking 3 vendors... Negotiating... Secured +₹500"  
**Agent:** Negotiator Agent works in background  
**Output:** Single best price with reasoning

### Phase 4: Booking & Dispatch (45-60 seconds)
**UI:** One-tap "Book 10-Min Pickup" button  
**Action:** User confirms, provides minimal details (address auto-filled via geolocation)  
**Agent:** Dispatch Agent assigns nearest technician  
**Output:** Live tracking map with ETA

### Phase 5: Secure Wipe & Certification (On-site)
**UI:** Dark "Security Mode" screen with progress circle  
**Display:** "NIST 800-88 Purge in progress... 80%"  
**Agent:** Security Guardian oversees wipe process  
**Output:** Green checkmark + "Download Certificate" button

### Phase 6: Impact Dashboard (Post-completion)
**UI:** Eco-widget showing environmental impact  
**Display:** "12kg CO2 saved • 0.5kg toxic waste diverted"  
**Agent:** Sustainability Agent calculates metrics  
**Output:** Updated personal impact dashboard

---

## 3. Technical Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (mobile-first)
- **UI Components:** shadcn/ui (app-like components)
- **State Management:** Zustand or React Context

### AI & Agent Orchestration
- **LLM:** Google Gemini 1.5 Flash (chat) + Pro (vision)
- **Agent Framework:** LangGraph or CrewAI
- **Function Calling:** Native Gemini function calling
- **Context Sharing:** Common Context Hub (Redis or in-memory)

### Backend
- **Runtime:** Node.js / Next.js API Routes
- **Database:** Supabase (free tier)
- **Real-time:** WebSockets for live tracking
- **Authentication:** Supabase Auth

### PWA Features
- **Manifest:** manifest.json for "Add to Home Screen"
- **Service Worker:** For offline capability and push notifications
- **Camera Access:** WebRTC / MediaDevices API
- **Geolocation:** Browser Geolocation API

### Security & Compliance
- **Data Wipe:** NIST 800-88 standard simulation
- **Hashing:** SHA-256 for certificate generation
- **Signing:** OpenSSL or Web Crypto API
- **Storage:** Encrypted certificate storage

### Maps & Logistics
- **Mapping:** Mapbox GL JS (free tier)
- **Routing:** Mapbox Directions API
- **Geocoding:** Browser Geolocation + Mapbox Geocoding

---

## 4. UI Design Principles

### Simplicity Rules
1. **One Action Per Screen:** Never show more than one primary button
2. **Zero Forms:** Use AI to extract information from conversation
3. **Agent Toasts:** Small bottom notifications showing agent activity
4. **Progress Over Loading:** Show what the agent is doing, not just "Loading..."

### Mobile-First Components
- **Bottom Sheets:** For camera, pricing, confirmation
- **Fixed Bottom Bar:** For primary actions (always visible)
- **Card-Based:** Each step is a card in the vertical feed
- **Haptic Feedback:** Vibrations on key moments (device detected, price secured)

### Color & Branding
- **Primary:** Trust blue (#0066FF) for security elements
- **Success:** Eco green (#10B981) for sustainability
- **Dark Mode:** Security screens use dark theme
- **Light Mode:** Default for browsing and chat

---

## 5. Key Features & Requirements

### Must-Have (MVP for Hackathon)
✅ Chat-based device submission  
✅ Camera-based visual appraisal  
✅ Automated price negotiation (simulated vendors)  
✅ Real-time pickup tracking (simulated driver)  
✅ Wipe certificate generation with SHA-256 hash  
✅ Personal eco-impact dashboard  

### Nice-to-Have (If Time Permits)
- Voice input for hands-free operation
- Multi-device batch processing
- Certificate verification portal (public)
- Blockchain anchoring for certificates
- SMS/WhatsApp notifications

---

## 6. Success Metrics (For Judges)

### Autonomy Score
**Target:** 90%+ of workflow completed without human admin intervention  
**Measurement:** Track agent decisions vs. user clicks

### Speed Benchmark
**Target:** < 45 seconds from landing to price offer  
**Measurement:** Time from page load to "Book Pickup" button appearance

### Trust Verification
**Target:** 100% certificate authenticity  
**Measurement:** SHA-256 hash verification on public portal

### User Simplicity
**Target:** Zero forms, < 3 user inputs total  
**Measurement:** Count of required user actions

---

## 7. Technical Architecture

### Agent Communication Flow
```
User Input → Concierge Agent → Intent Classification
                ↓
        Visual Appraisal Agent (if device scan needed)
                ↓
        Negotiator Agent (price discovery)
                ↓
        Dispatch Agent (logistics)
                ↓
        Security Guardian (data wipe)
                ↓
        Sustainability Agent (impact calculation)
                ↓
        Concierge Agent (final confirmation to user)
```

### Common Context Hub
All agents share state through a central hub:
- User session data
- Device information
- Current workflow stage
- Negotiation history
- Pickup status
- Certificate data

---

## 8. Security & Compliance

### Data Protection
- End-to-end encryption for user data
- Zero-knowledge architecture (agents don't store personal data)
- GDPR-compliant data handling

### Wipe Standards
- **NIST 800-88 Compliance:** Multi-pass overwriting
- **Crypto-Erase:** Hardware encryption key deletion
- **Verification:** SHA-256 hash of wipe process
- **Certification:** Digitally signed proof of destruction

---

## 9. Deployment Strategy

### Hosting (Free Tier)
- **Platform:** Vercel or Netlify
- **Database:** Supabase (PostgreSQL)
- **CDN:** Automatic via Vercel/Netlify
- **SSL:** Automatic HTTPS

### PWA Installation
- Manifest.json for "Add to Home Screen"
- Service Worker for offline capability
- App-like experience (no browser chrome)

---

## 10. Hackathon Demo Script

### The 2-Minute Pitch
1. **Problem (15s):** "India generates 3.2M tons of e-waste yearly. 95% is handled by informal sector with zero data security."
2. **Solution (30s):** "Mind-Safe uses 6 autonomous AI agents to provide Zepto-speed pickup with military-grade data destruction."
3. **Demo (60s):** 
   - Open PWA on phone (no app store)
   - Chat: "I have an old iPhone"
   - Camera scans device automatically
   - Price appears: "₹12,500 (negotiated up from ₹12,000)"
   - Book pickup, show live map
   - Display wipe certificate with hash
4. **Impact (15s):** "Each device saves 12kg CO2. We provide cryptographic proof, not just promises."

### Key Talking Points
- **Agentic Orchestration:** Show agent communication logs
- **Trust Technology:** Explain SHA-256 + digital signatures
- **Real-World Execution:** Emphasize physical pickup, not just chat
- **Regulatory Ready:** NIST 800-88 compliance for enterprise clients

---

## 11. Differentiation from Competitors

### vs. Traditional E-Waste Apps
- **Speed:** 10 minutes vs. 3-5 days
- **Trust:** Cryptographic proof vs. verbal promises
- **UX:** Zero forms vs. 10+ field forms

### vs. Zepto/Dunzo
- **Specialization:** Secure data handling, not just logistics
- **Certification:** Legal proof of destruction
- **Sustainability:** Environmental impact tracking

---

## 12. Future Roadmap (Post-Hackathon)

### Phase 2: Enterprise
- Bulk device management dashboard
- IT admin portal for corporate clients
- Compliance reporting for audits

### Phase 3: Marketplace
- Refurbished device marketplace
- Parts resale platform
- B2B recycling partnerships

### Phase 4: Scale
- Multi-city expansion
- Franchise model for pickup agents
- API for third-party integration

---




**Show the Agents Working:** In your demo, use a split-screen or inspector panel that shows the agent logs. Let judges see the Negotiator Agent actually negotiating in real-time.

**The Trust Factor:** Your wipe certificate is your killer feature. Make it downloadable, verifiable, and beautiful. This is what separates you from every other logistics app.
