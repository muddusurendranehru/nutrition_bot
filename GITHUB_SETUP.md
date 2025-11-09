# 🚀 GitHub Setup & Deployment Guide

## 📋 Step 1: Check Your Files

You have two options:

### Option A: Use Our Aligned Files (Recommended ✅)
The files in this workspace are **perfectly aligned**:
- Database: `customers`, `fruits` with INTEGER IDs
- Backend: All routes match database
- Frontend: All forms match backend
- Middleware: JWT with `customerId`

### Option B: Use Bolt Files
If you downloaded from Bolt, **check these critical alignments**:

1. **Database Schema** - Does Bolt use:
   - Table names: `customers` & `fruits`? (not users/nutrition_entries)
   - INTEGER IDs? (not UUID)
   - Field: `glycemic_index`?

2. **Backend Routes** - Does Bolt use:
   - JWT payload: `customerId` (not userId)?
   - Middleware: `req.customer` (not req.user)?
   - API endpoints: `/api/data/customers` (not /api/data/users)?

3. **Frontend Forms** - Does Bolt use:
   - Field: `fruit_name` (not food_name)?
   - Field: `proteins` (not protein)?
   - Field: `glycemic_index`?

**If Bolt files don't match, use our files!**

---

## 📁 Step 2: Prepare Your Project Structure

Make sure you have these files in your `nutrition_bot` folder:

```
nutrition_bot/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── data.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SignUp.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── netlify/
│   └── functions/
│       ├── api.js
│       └── package.json
│
├── database/
│   └── schema.sql
│
├── netlify.toml
├── package.json
├── .gitignore
├── README.md
├── ALIGNMENT_CHECK.md
└── SIMPLE_SETUP.md
```

---

## 🔧 Step 3: Create .gitignore (Root Level)

Create `.gitignore` in the root folder:

```gitignore
# Dependencies
node_modules/
**/node_modules/

# Environment variables
.env
.env.local
.env.production
**/.env

# Logs
*.log
npm-debug.log*

# Build outputs
dist/
build/
**/dist/
**/build/

# Netlify
.netlify/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
```

---

## 🔐 Step 4: Create Environment Variable Template

Create `backend/.env.example`:

```env
# Neon PostgreSQL Connection
DATABASE_URL=postgresql://username:password@host.region.aws.neon.tech/nutribot?sslmode=require

# JWT Secret (min 32 characters)
JWT_SECRET=your-super-secret-random-key-at-least-32-characters-long

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**⚠️ IMPORTANT: Never commit your actual .env file!**

---

## 📦 Step 5: Initialize Git & Push to GitHub

### 5.1 Initialize Git

Open terminal/command prompt in your `nutrition_bot` folder:

```bash
# Initialize git repository
git init

# Check what files will be committed
git status
```

### 5.2 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Repository name: `nutrition_bot`
4. Description: `Nutribot - Fruit Tracking App with Glycemic Index`
5. Select: **Public** or **Private**
6. **Don't** check "Initialize with README" (we already have one)
7. Click **"Create repository"**

### 5.3 Add & Commit Files

```bash
# Add all files
git add .

# Check what's staged
git status

# Commit with message
git commit -m "Initial commit - Nutribot with INTEGER IDs and glycemic index"

# Set main branch
git branch -M main
```

### 5.4 Connect to GitHub

Replace `yourusername` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/yourusername/nutrition_bot.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
- Use **Personal Access Token** instead of password
- Generate token at: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
- Use token as password when prompted

---

## 🗄️ Step 6: Set Up Neon Database

### 6.1 Drop Old Tables (If Any)

In your Neon SQL Editor for database `nutribot`:

```sql
-- Clean slate
DROP TABLE IF EXISTS nutrition_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS fruits CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
```

### 6.2 Create New Tables

```sql
-- Table 1: customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: fruits
CREATE TABLE fruits (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    fruit_name VARCHAR(255) NOT NULL,
    calories INTEGER,
    carbs DECIMAL(10,2),
    proteins DECIMAL(10,2),
    glycemic_index INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_fruits_customer_id ON fruits(customer_id);
```

### 6.3 Verify Tables

```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should show:
-- customers
-- fruits
```

### 6.4 Get Connection String

1. In Neon dashboard, go to your `nutribot` database
2. Click **"Connection Details"**
3. Copy the **connection string** (should end with `/nutribot`)
4. Example: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/nutribot?sslmode=require`

---

## 🌐 Step 7: Deploy to Netlify

### 7.1 Connect Repository to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Log in or sign up
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Authorize Netlify to access your GitHub
6. Select your `nutrition_bot` repository
7. Click on the repository

### 7.2 Configure Build Settings

**Site settings:**
- **Branch to deploy:** `main`
- **Base directory:** (leave empty)
- **Build command:** `npm run build`
- **Publish directory:** `frontend/dist`
- **Functions directory:** `netlify/functions`

### 7.3 Add Environment Variables

Before deploying, click **"Add environment variables"**:

**Variable 1:**
- Key: `DATABASE_URL`
- Value: Your Neon connection string (from Step 6.4)
  ```
  postgresql://user:pass@ep-xxx.region.aws.neon.tech/nutribot?sslmode=require
  ```

**Variable 2:**
- Key: `JWT_SECRET`
- Value: A random 32+ character string
  ```
  mySuper$ecret!RandomJWTkey2024#NutribotApp123
  ```
  *(Generate your own random string!)*

### 7.4 Deploy

1. Click **"Deploy [site-name]"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-app-name.netlify.app`

---

## ✅ Step 8: Test Your Deployment

### 8.1 Open Your Site

Visit your Netlify URL: `https://your-app-name.netlify.app`

### 8.2 Test Sign Up

1. Click **"Sign up here"**
2. Enter:
   - Email: `test@example.com`
   - Password: `test123`
   - Confirm Password: `test123`
3. Click **"Sign Up"**
4. Should redirect to Dashboard

### 8.3 Test Add Fruit

1. In Dashboard, fill form:
   - Fruit name: `Orange`
   - Calories: `47`
   - Carbs: `12`
   - Proteins: `0.9`
   - Glycemic Index: `43`
2. Click **"Add Fruit"**
3. Should see success message
4. Fruit should appear in table with **green** glycemic index

### 8.4 Verify Database

In Neon SQL Editor:

```sql
-- Check customers
SELECT * FROM customers;
-- Should see: id=1, email=test@example.com

-- Check fruits
SELECT * FROM fruits;
-- Should see: id=1, fruit_name=Orange, glycemic_index=43
```

### 8.5 Test Logout

1. Click **"Logout"** button
2. Should redirect to Login page
3. Try logging in again with same credentials

---

## 🔄 Step 9: Making Changes

### Update Code

```bash
# Make your changes to files

# Check what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push
```

**Netlify will automatically redeploy when you push to GitHub!**

---

## 🛠️ Troubleshooting

### Build Fails on Netlify

**Check:**
1. Netlify build logs for errors
2. Environment variables are set correctly
3. `DATABASE_URL` ends with `/nutribot`
4. `JWT_SECRET` is at least 32 characters

### Database Connection Fails

**Check:**
1. Neon database is active
2. `DATABASE_URL` is correct in Netlify
3. Connection string has `?sslmode=require` at the end
4. Tables exist in database

### Can't Push to GitHub

**Fix:**
1. Use Personal Access Token instead of password
2. Make sure remote is set: `git remote -v`
3. Check if files are staged: `git status`

### Netlify Functions Not Working

**Check:**
1. `netlify.toml` exists in root
2. `netlify/functions/api.js` exists
3. Functions directory set to `netlify/functions`
4. Check Netlify Functions logs

---

## 📋 Quick Reference

### Git Commands
```bash
git status              # Check status
git add .               # Stage all files
git commit -m "msg"     # Commit changes
git push                # Push to GitHub
git pull                # Pull from GitHub
git log --oneline       # View commit history
```

### Netlify Redeploy
```bash
# After pushing to GitHub, Netlify auto-deploys
# Or manually: Netlify Dashboard → Deploys → Trigger deploy
```

### View Logs
- **Backend logs:** Netlify Dashboard → Functions → View logs
- **Build logs:** Netlify Dashboard → Deploys → [deployment] → Deploy log
- **Database:** Neon Dashboard → Monitoring

---

## ✅ Success Checklist

- [ ] Git repository initialized
- [ ] Files pushed to GitHub
- [ ] Neon database created with `customers` & `fruits` tables
- [ ] Netlify connected to GitHub repository
- [ ] Build settings configured correctly
- [ ] Environment variables set (DATABASE_URL, JWT_SECRET)
- [ ] Site deployed successfully
- [ ] Can sign up new customer
- [ ] Can login
- [ ] Can add fruits
- [ ] Can view fruits table with INTEGER IDs
- [ ] Can view customers table
- [ ] Can logout
- [ ] Glycemic index shows correct colors (green/orange/red)

---

## 🎉 You're Live!

Your Nutribot app is now deployed and accessible at:
`https://your-app-name.netlify.app`

Share the link and start tracking fruits! 🍊🍎🍌

---

## 📞 Need Help?

If something doesn't work:
1. Check `ALIGNMENT_CHECK.md` to verify all layers match
2. Check Netlify deploy logs for build errors
3. Check Netlify Function logs for runtime errors
4. Verify database tables in Neon SQL Editor
5. Test API endpoints directly: `https://your-app.netlify.app/api/health`

