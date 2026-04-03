# 🚀 Deploy with GitHub + Vercel - Complete Guide

Deploy your website using Git and GitHub for automatic deployments!

---

## 📋 What You'll Need

- GitHub account (free) - https://github.com/signup
- Vercel account (free) - https://vercel.com/signup
- Git installed on your computer

---

## 🎯 Step-by-Step Guide

### Step 1: Check if Git is Installed

Open your terminal (Git Bash on Windows) and run:

```bash
git --version
```

If you see a version number, you're good! If not, install Git:
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt-get install git`

---

### Step 2: Initialize Git Repository

In your project folder, run:

```bash
# Initialize git (if not already done)
git init

# Check status
git status
```

You should see all your files listed as "untracked".

---

### Step 3: Create .gitignore File

Make sure you have a `.gitignore` file to exclude sensitive files:

```bash
# Check if .gitignore exists
cat .gitignore
```

If it doesn't exist or is incomplete, create/update it:

```
# .gitignore
node_modules/
.next/
.env.local
.env*.local
.vercel
*.log
.DS_Store
```

---

### Step 4: Commit Your Code

```bash
# Add all files
git add .

# Check what will be committed
git status

# Commit with a message
git commit -m "Initial commit - Mind-Safe India platform"
```

---

### Step 5: Create GitHub Repository

1. **Go to GitHub**
   - Visit: https://github.com/new
   - Or click the "+" icon → "New repository"

2. **Fill in Details**
   - Repository name: `mind-safe-india`
   - Description: `AI-powered e-waste disposal platform with live tracking`
   - Visibility: **Public** (for hackathon) or Private
   - **DO NOT** initialize with README (you already have code)

3. **Click "Create repository"**

---

### Step 6: Push to GitHub

GitHub will show you commands. Copy and run them:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/mind-safe-india.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

---

### Step 7: Verify on GitHub

1. Refresh your GitHub repository page
2. You should see all your files!
3. Check that `.env.local` is NOT there (it should be ignored)

---

### Step 8: Deploy to Vercel

Now the fun part - deploy to Vercel!

1. **Go to Vercel**
   - Visit: https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - You'll see your GitHub repositories
   - Find `mind-safe-india`
   - Click "Import"

3. **Configure Project**
   - Project Name: `mind-safe-india` (auto-filled)
   - Framework Preset: `Next.js` (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Install Command: `npm install` (auto-filled)

4. **Add Environment Variables** (Optional)
   - Click "Environment Variables" dropdown
   - Add variable:
     - Name: `GEMINI_API_KEY`
     - Value: `your_gemini_api_key_here`
   - Click "Add"
   - Leave blank if you don't have the key yet

5. **Deploy!**
   - Click "Deploy"
   - Watch the build logs (exciting!)
   - Wait 2-3 minutes

6. **Success! 🎉**
   - You'll see: "Congratulations! Your project has been deployed"
   - Your live URL: `https://mind-safe-india.vercel.app`
   - Click "Visit" to see your live site!

---

## 🔄 Automatic Deployments

Now the magic happens! Every time you push to GitHub, Vercel automatically deploys!

### Make a Change

```bash
# Edit a file (e.g., change some text)
# Then commit and push:

git add .
git commit -m "Update homepage text"
git push
```

### Watch It Deploy

1. Go to https://vercel.com/dashboard
2. You'll see a new deployment starting
3. Wait 2-3 minutes
4. Your changes are LIVE!

**No manual deployment needed!** 🎉

---

## 🌿 Working with Branches

### Create a Feature Branch

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes
# Commit changes
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push -u origin feature/new-feature
```

### Preview Deployment

Vercel automatically creates a **preview URL** for every branch!

1. Go to your GitHub repository
2. You'll see a comment from Vercel bot with preview URL
3. Test your changes on the preview URL
4. If good, merge to main

### Merge to Main

```bash
# Switch back to main
git checkout main

# Merge your feature branch
git merge feature/new-feature

# Push to GitHub
git push

# Your changes are now LIVE on production!
```

---

## 🔑 Managing Environment Variables

### Add Variables in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click your project
3. Go to "Settings" → "Environment Variables"
4. Click "Add New"
5. Enter:
   - Name: `GEMINI_API_KEY`
   - Value: `your_actual_key`
   - Environment: Select all (Production, Preview, Development)
6. Click "Save"
7. Redeploy (Vercel will prompt you)

### Pull Variables Locally (Optional)

```bash
# Install Vercel CLI
npm install -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.local
```

Now your local `.env.local` has the same variables as production!

---

## 📊 Monitoring Deployments

### Vercel Dashboard

Visit: https://vercel.com/dashboard

You can see:
- All deployments
- Build logs
- Performance metrics
- Visitor analytics
- Domain settings

### GitHub Integration

On every commit, you'll see:
- ✅ Vercel deployment status
- 🔗 Preview URL
- 📊 Build logs

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain

1. **Buy a Domain** (optional)
   - Namecheap, GoDaddy, Google Domains
   - Or use free Vercel subdomain

2. **Add to Vercel**
   - Go to Project Settings → Domains
   - Enter your domain: `mindsafe.in`
   - Click "Add"

3. **Configure DNS**
   - Add records shown by Vercel
   - Wait 5-30 minutes for DNS propagation

4. **Done!**
   - Your site is now at `https://mindsafe.in`
   - SSL certificate automatically added

---

## 🐛 Troubleshooting

### Git Issues

**"fatal: not a git repository"**
```bash
git init
```

**"remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/mind-safe-india.git
```

**Authentication failed**
```bash
# Use GitHub Personal Access Token instead of password
# Generate at: https://github.com/settings/tokens
```

### Push Issues

**"failed to push some refs"**
```bash
# Pull first, then push
git pull origin main --rebase
git push
```

**Large files rejected**
```bash
# Check .gitignore includes node_modules and .next
# Remove from git if accidentally added:
git rm -r --cached node_modules
git rm -r --cached .next
git commit -m "Remove large files"
git push
```

### Vercel Issues

**Build failed**
- Check build logs in Vercel dashboard
- Run `npm run build` locally to see errors
- Fix errors and push again

**Environment variables not working**
- Make sure they're added in Vercel dashboard
- Redeploy after adding variables
- Check spelling (case-sensitive)

---

## 📝 Useful Git Commands

```bash
# Check status
git status

# See commit history
git log --oneline

# See what changed
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout main

# List all branches
git branch -a

# Delete branch
git branch -d branch-name

# Pull latest changes
git pull

# Push changes
git push
```

---

## 🎓 Best Practices

### Commit Messages

Use clear, descriptive messages:

```bash
# Good
git commit -m "Add live tracking feature"
git commit -m "Fix chatbot API integration"
git commit -m "Update pricing calculation logic"

# Bad
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

### Commit Often

```bash
# Commit after each feature/fix
git add .
git commit -m "Add feature X"
git push
```

### Use Branches

```bash
# For new features
git checkout -b feature/tracking-map

# For bug fixes
git checkout -b fix/pricing-bug

# For experiments
git checkout -b experiment/new-ui
```

### Never Commit Secrets

Make sure `.gitignore` includes:
- `.env.local`
- `.env*.local`
- API keys
- Passwords
- Sensitive data

---

## 🎯 Complete Workflow Example

### Day 1: Initial Setup

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mind-safe-india.git
git push -u origin main

# Deploy to Vercel (via dashboard)
# Visit vercel.com and import from GitHub
```

### Day 2: Add New Feature

```bash
# Create feature branch
git checkout -b feature/new-pricing

# Make changes to code
# Test locally: npm run dev

# Commit and push
git add .
git commit -m "Add new pricing algorithm"
git push -u origin feature/new-pricing

# Check preview URL from Vercel
# If good, merge to main
git checkout main
git merge feature/new-pricing
git push

# Automatically deploys to production!
```

### Day 3: Quick Fix

```bash
# Make quick fix on main
git checkout main

# Edit file
# Test: npm run dev

# Commit and push
git add .
git commit -m "Fix typo in homepage"
git push

# Live in 2 minutes!
```

---

## ✅ Deployment Checklist

### Before First Push

- [ ] Git initialized (`git init`)
- [ ] `.gitignore` file exists
- [ ] `.env.local` in `.gitignore`
- [ ] All changes committed
- [ ] GitHub repository created
- [ ] Remote added (`git remote add origin`)

### Before Each Push

- [ ] Code works locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes committed with clear message
- [ ] No sensitive data in code

### After Deployment

- [ ] Site loads correctly
- [ ] All features work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Share URL with team

---

## 🎉 You're All Set!

Your workflow is now:

1. **Make changes** to your code
2. **Commit** with `git commit`
3. **Push** with `git push`
4. **Vercel automatically deploys** in 2-3 minutes
5. **Your site is updated!**

---

## 📞 Quick Reference

### First Time Setup

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mind-safe-india.git
git push -u origin main
```

Then deploy via Vercel dashboard.

### Daily Workflow

```bash
# Make changes
git add .
git commit -m "Description of changes"
git push
```

That's it! Vercel handles the rest.

---

## 🔗 Useful Links

- **Your GitHub Repo**: https://github.com/YOUR_USERNAME/mind-safe-india
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Live Site**: https://mind-safe-india.vercel.app
- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com

---

**Status**: Ready to Deploy with Git! 🚀
**Time to Live**: 10 minutes
**Auto-Deploy**: ✅ Yes
**Cost**: $0 (Free)

Let's get your code on GitHub and deploy! 🎉
