# Share Your Local Development Server

## Option 1: ngrok (Recommended - Instant Shareable Link)

### Step 1: Install ngrok
Download from: https://ngrok.com/download
Or install via:
```bash
# Windows (using Chocolatey)
choco install ngrok

# Or download directly from ngrok.com
```

### Step 2: Make sure your dev server is running
```bash
npm run dev
```
(Should be running on http://localhost:3000)

### Step 3: In a NEW terminal, run ngrok
```bash
ngrok http 3000
```

### Step 4: Get Your Shareable Link
You'll see something like:
```
Forwarding    https://abc123.ngrok.app -> http://localhost:3000
```

**Share this link:** `https://abc123.ngrok.app`

✅ Works on any device, anywhere in the world
✅ HTTPS enabled (required for camera access)
✅ Updates live as you make changes
✅ Free tier available

---

## Option 2: Local Network Sharing (Same WiFi Only)

### Step 1: Find your local IP address
```bash
# Windows
ipconfig
```
Look for "IPv4 Address" (usually something like 192.168.1.x)

### Step 2: Make sure dev server is running
```bash
npm run dev
```

### Step 3: Share the link
If your IP is `192.168.1.100`, share:
```
http://192.168.1.100:3000
```

⚠️ Only works for devices on the same WiFi network
⚠️ Camera might not work (needs HTTPS)

---

## Option 3: VS Code Port Forwarding (If using VS Code)

### Step 1: Make sure dev server is running
```bash
npm run dev
```

### Step 2: In VS Code
1. Open the "Ports" tab (bottom panel)
2. Right-click on port 3000
3. Select "Port Visibility" → "Public"
4. Copy the forwarded address

You'll get a link like:
```
https://abc123-3000.preview.app.github.dev
```

---

## Option 4: Cloudflare Tunnel (Free, No Account Needed)

### Step 1: Install cloudflared
Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

### Step 2: Run tunnel
```bash
cloudflared tunnel --url http://localhost:3000
```

You'll get a shareable link instantly!

---

## Recommended: ngrok

**Why ngrok is best for development:**
- ✅ Instant HTTPS (camera will work)
- ✅ Works anywhere (not just local network)
- ✅ Live updates as you code
- ✅ Free tier is generous
- ✅ Easy to use

**Quick Setup:**
1. Download ngrok: https://ngrok.com/download
2. Extract and run: `ngrok http 3000`
3. Share the https link you get
4. Keep making changes - they'll show live!

---

## For Your Hackathon

**Best workflow:**
1. Keep `npm run dev` running in one terminal
2. Run `ngrok http 3000` in another terminal
3. Share the ngrok link with judges/testers
4. Make changes in your code
5. Changes appear instantly on the shared link
6. When ready to deploy permanently, use Vercel

---

## Troubleshooting

### Camera not working on shared link?
- Make sure you're using HTTPS (ngrok provides this)
- HTTP links won't allow camera access for security

### Link stopped working?
- ngrok free tier links expire when you close the terminal
- Just run `ngrok http 3000` again to get a new link

### Want a permanent link during development?
- Sign up for free ngrok account
- Get a static domain that doesn't change
- Or use Vercel for permanent deployment

---

## Quick Command

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Share it
ngrok http 3000
```

Then share the https://xxxxx.ngrok.app link! 🚀
