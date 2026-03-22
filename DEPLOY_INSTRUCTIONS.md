# Portfolio Deployment Instructions

## Changes Made

1. ✅ **Hero Section** - Removed LinkedIn link, kept only GitHub
2. ✅ **Project Slider** - Created interactive slider with navigation arrows and dot indicators
3. ✅ **Working Links** - Added your actual GitHub and demo URLs for each project
4. ✅ **Education Section** - Removed Class XII, added Class X with 91.8% grade

## Project Links Configured

### Codebase Cartographer
- Code: https://github.com/Meet00028/Codebase-Cartographer
- Demo: https://codebase-cartographer.vercel.app

### Thrift Store
- Code: https://github.com/Meet00028/Thrift-Store
- Demo: https://thrift-store-demo.vercel.app

### News App
- Code: https://github.com/Meet00028/News-App
- Demo: https://news-app-demo.vercel.app

---

## Step 1: Push to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download and install GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "File" → "Add local repository"
4. Select the portfolio folder
5. Click "Publish repository"
6. Name it "Portfolio" and make it public
7. Click "Publish Repository"

### Option B: Using Command Line

Open terminal/command prompt and run:

```bash
# Navigate to the portfolio folder
cd path/to/portfolio

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/Meet00028/Portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

If prompted for password, use a GitHub Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select "repo" scope
4. Generate and copy the token
5. Use it as your password

---

## Step 2: Deploy on Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/
2. Sign up/login with your GitHub account
3. Click "Add New Project"
4. Import your "Portfolio" repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

---

## File Structure

```
portfolio/
├── public/              # Static assets (images)
├── src/
│   ├── App.tsx         # Main application with all sections
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles
│   └── ...
├── dist/               # Build output (for deployment)
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## Custom Domain (Optional)

To use a custom domain on Vercel:
1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS configuration instructions

---

## Need Help?

If you encounter any issues:
1. Make sure Node.js is installed: https://nodejs.org/
2. Run `npm install` in the portfolio folder before building
3. Check that all project images are in the `public` folder

Your portfolio is ready to go! 🚀
