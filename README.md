# Mind-Safe India 🛡️♻️

AI-powered e-waste management platform with autonomous agents for device appraisal, price negotiation, and secure data destruction.

## Quick Start

```bash
npm install
npm run dev
```

Open https://mind-safe-x2tj.vercel.app/

## Architecture

### Multi-Agent System
- **Concierge Agent:** User interaction & intent routing
- **Visual Appraisal Agent:** Device identification via camera
- **Negotiator Agent:** Autonomous price negotiation
- **Security Guardian:** Data wipe certification
- **Dispatch Agent:** Real-time logistics
- **Sustainability Agent:** Environmental impact tracking

## Tech Stack
- Next.js 14 (App Router)
- Gemini 1.5 (Flash + Pro Vision)
- Tailwind CSS
- Supabase
- Mapbox

## Environment Variables

Create `.env.local`:
```
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
SUPABASE_URL=your_url_here
SUPABASE_KEY=your_key_here
```

## PWA Installation

On mobile, tap "Add to Home Screen" for app-like experience.

## Hackathon Demo

Run the demo script:
1. Open on mobile device
2. Say "I have an old iPhone"
3. Scan device with camera
4. Watch agents negotiate price
5. Book 10-minute pickup
6. Receive wipe certificate

## License
MIT
