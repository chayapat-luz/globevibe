# GLOBEVIBE Deployment Guide

This guide will help you deploy your GLOBEVIBE website to the internet using GitHub and Vercel.

## Prerequisites

Before you start, make sure you have:
- A GitHub account (create one at https://github.com)
- Git installed on your computer
- Your Icon.jpg file ready in the `/public/assets/` folder

## Step 1: Add Your Icon Image

First, add your icon image to the project:

```
1. Place your icon file at: globevibe/public/assets/Icon.jpg
2. Make sure the filename is exactly "Icon.jpg" (capital I)
```

## Step 2: Initialize Git Repository

Open your terminal/command prompt in the globevibe folder and run:

```bash
cd "C:\Users\HP\OneDrive\เอกสาร\my project\globevibe"
git init
```

## Step 3: Create a GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Repository name: `globevibe` (or any name you prefer)
5. Keep it **Public** (required for free Vercel hosting)
6. **Do NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

## Step 4: Connect Your Project to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: GLOBEVIBE website ready for deployment"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/globevibe.git

# Push your code to GitHub
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 5: Deploy to Vercel

Vercel is a free hosting platform perfect for Next.js applications.

### Option A: Deploy via Vercel Website (Recommended)

1. Go to https://vercel.com
2. Click "Sign Up" and sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Find and select your `globevibe` repository
5. Click "Import"
6. Vercel will auto-detect Next.js settings:
   - Framework Preset: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
7. Click "Deploy"
8. Wait 2-3 minutes for deployment to complete
9. You'll get a live URL like: `https://globevibe.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: globevibe
# - Directory: . (press Enter)
# - Want to modify settings? No
```

## Step 6: Access Your Live Website

After deployment completes, Vercel will give you a URL like:
- `https://globevibe-xxx.vercel.app`
- or your custom domain if you set one up

## Updating Your Website

Whenever you make changes:

```bash
# Save your changes
git add .
git commit -m "Description of your changes"
git push

# Vercel will automatically redeploy!
```

## Custom Domain (Optional)

To use your own domain name:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Enter your domain name
4. Follow the DNS configuration instructions

## Troubleshooting

### Issue: Git push fails

```bash
# Try this if push fails
git pull origin main --allow-unrelated-histories
git push
```

### Issue: Vercel build fails

Check these:
- All required files are committed
- Icon.jpg is in `/public/assets/`
- No syntax errors in your code
- Run `npm run build` locally first to test

### Issue: Images not showing

- Make sure all images are in `/public/assets/`
- Check file names match exactly (case-sensitive)
- Verify Icon.jpg exists

## Your Website URLs

- **Local Development**: http://localhost:3000
- **GitHub Repository**: https://github.com/YOUR_USERNAME/globevibe
- **Live Website**: https://globevibe-xxx.vercel.app (from Vercel)

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- GitHub Help: https://docs.github.com

---

**Your GLOBEVIBE website is now live and accessible to the world! 🌏✨**
