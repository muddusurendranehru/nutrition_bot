# 🔗 Connecting Bolt to GitHub - Complete Guide

## 📋 Option 1: Check if Bolt is Already Connected to GitHub

### In Bolt.new Interface:

1. **Look for GitHub icon** in Bolt interface (usually top-right corner)
2. **Check if it shows:**
   - ✅ "Connected to GitHub" or your GitHub username
   - ❌ "Connect to GitHub" button

### If Already Connected:
- You'll see your GitHub username or avatar
- You can directly push projects from Bolt to GitHub
- Skip to "Option 3: Push Bolt Project to GitHub"

### If NOT Connected:
- Follow "Option 2: Connect Bolt to GitHub"

---

## 🔌 Option 2: Connect Bolt to GitHub (If Not Connected)

### Method A: Through Bolt Interface

1. **Look for GitHub button** in Bolt (usually top-right)
2. **Click** "Connect to GitHub" or GitHub icon
3. **Authorize** Bolt to access your GitHub account
4. **Grant permissions** Bolt needs:
   - Read/write repository access
   - Create repositories
   - Commit code
5. **Confirm** connection

### Method B: Bolt May Auto-Prompt

When you try to export/push code, Bolt will:
1. **Detect** you're not connected
2. **Show popup:** "Connect GitHub to continue"
3. **Click** "Connect GitHub"
4. **Follow** authorization flow

---

## 📤 Option 3: Push Bolt Project to GitHub

### Method A: Using Bolt's Built-in GitHub Push

#### Step 1: In Bolt Interface

1. **Look for export/share button** (usually near code editor)
2. **Click** "Push to GitHub" or "Export to GitHub"
3. **Choose options:**
   - Repository name: `nutrition_bot`
   - Description: `Nutribot - Fruit Tracking App`
   - Public or Private
4. **Click** "Create Repository" or "Push"

#### Step 2: Bolt Creates Repo

- Bolt automatically creates GitHub repository
- Commits all files
- Pushes code to GitHub
- Gives you the repository URL

#### Step 3: Verify on GitHub

1. **Go to** [github.com](https://github.com)
2. **Check** your repositories
3. **Open** `nutrition_bot` repository
4. **Verify** all files are there

---

### Method B: Download from Bolt, Then Push Manually

If Bolt doesn't have direct GitHub integration or you already downloaded:

#### Step 1: Download Project from Bolt

1. **In Bolt**, look for **"Download"** or **"Export"** button
2. **Download** as ZIP file
3. **Extract** ZIP to your computer
4. **Rename** folder to `nutrition_bot` (if needed)

#### Step 2: Initialize Git and Push

Open terminal/command prompt in the `nutrition_bot` folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit from Bolt"

# Set main branch
git branch -M main

# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/nutrition_bot.git

# Push
git push -u origin main
```

---

## 🔄 Option 4: Test Connection & Sync

### Test if Bolt is Connected to GitHub

#### Method 1: Try to Push

1. **In Bolt**, make a small change to any file
2. **Look for** "Push to GitHub" or "Commit" button
3. **If you can click it** → Connected ✅
4. **If it asks to connect** → Not connected ❌

#### Method 2: Check Settings

1. **Look for** Settings/Preferences in Bolt
2. **Find** "Integrations" or "Connected Services"
3. **Check** if GitHub is listed
4. **Status** should show "Connected"

---

## 🛠️ Troubleshooting

### Problem: "Not Connected" or Can't Find GitHub Button

**Solution:**
- Bolt.new may not have built-in GitHub integration (depends on version)
- Use Method B: Download → Push manually
- This is actually more reliable!

---

### Problem: GitHub Authorization Failed

**Solutions:**
1. **Clear browser cache** and try again
2. **Revoke Bolt permissions** in GitHub:
   - Go to GitHub.com → Settings → Applications → Authorized Apps
   - Find Bolt, revoke access
   - Try connecting again
3. **Use different browser** (Chrome, Firefox, Edge)

---

### Problem: Can't Push - "Permission Denied"

**Solutions:**
1. **Check GitHub permissions:**
   - Make sure Bolt has repository write access
2. **Use Personal Access Token:**
   - GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when pushing

---

### Problem: Repository Already Exists

**Solutions:**

**Option A: Push to existing repo**
```bash
git remote add origin https://github.com/yourusername/nutrition_bot.git
git pull origin main --allow-unrelated-histories
git push origin main
```

**Option B: Use different name**
```bash
git remote add origin https://github.com/yourusername/nutribot-app.git
git push -u origin main
```

**Option C: Delete and recreate**
- Go to GitHub → Repository Settings → Delete
- Create new repository
- Push again

---

## 🎯 Recommended Workflow for Your Situation

Since you **already downloaded files from Bolt**, here's the best approach:

### Step 1: Verify Your Files

Check what you have from Bolt:
```
nutrition_bot/
├── backend/
├── frontend/
├── database/
└── ...
```

### Step 2: Compare with Our Aligned Files

**Critical Question:** Does Bolt use:
- INTEGER IDs or UUID? (Check `database/schema.sql`)
- `customers` table or `users` table?
- `fruits` table or `nutrition_entries` table?
- Has `glycemic_index` field?

**If NO to any → Use OUR files instead of Bolt files**

### Step 3: Choose Files

**Option A: Use OUR aligned files** (Recommended ✅)
- Delete Bolt files
- Use files from this workspace
- Guaranteed alignment

**Option B: Use Bolt files** (Only if they match)
- Verify alignment first
- Read `BOLT_vs_OUR_FILES.md`

### Step 4: Create GitHub Repository

1. **Go to** [github.com](https://github.com)
2. **Click** "+" → "New repository"
3. **Name:** `nutrition_bot`
4. **Description:** `Nutribot - Fruit Tracking App with Glycemic Index`
5. **Choose:** Public or Private
6. **Don't check** "Initialize with README"
7. **Click** "Create repository"
8. **Copy** the repository URL

### Step 5: Push to GitHub

In your `nutrition_bot` folder:

```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - Nutribot app"

# Set main branch
git branch -M main

# Add remote (use YOUR repository URL)
git remote add origin https://github.com/yourusername/nutrition_bot.git

# Push
git push -u origin main
```

### Step 6: Verify on GitHub

1. **Go to** your GitHub repository
2. **Check** all files are uploaded
3. **Verify** folder structure matches

---

## 📊 Quick Decision Chart

```
Do you have Bolt files downloaded?
│
├─ YES → Are they aligned with our schema?
│         │
│         ├─ YES → Use Bolt files, push to GitHub
│         │
│         └─ NO → Use OUR files instead, push to GitHub
│
└─ NO → Use OUR files, push to GitHub
```

---

## ✅ Checklist: Bolt to GitHub Connection

### Before Starting:
- [ ] Have GitHub account
- [ ] Know where Bolt files are saved (if downloaded)
- [ ] Have checked Bolt files vs our files alignment

### If Using Bolt's Direct Push:
- [ ] Bolt is connected to GitHub (see Option 1)
- [ ] Can see "Push to GitHub" button in Bolt
- [ ] Clicked push and repository created
- [ ] Verified files on GitHub

### If Using Manual Method:
- [ ] Downloaded files from Bolt (or using our files)
- [ ] Created GitHub repository at github.com
- [ ] Initialized git in project folder
- [ ] Added all files with `git add .`
- [ ] Committed with `git commit -m "message"`
- [ ] Added remote with `git remote add origin URL`
- [ ] Pushed with `git push -u origin main`
- [ ] Verified files appear on GitHub

---

## 🚀 Next Steps After GitHub Push

### 1. Set Up Neon Database
Run SQL schema to create tables (see `SIMPLE_SETUP.md`)

### 2. Deploy to Netlify
- Connect Netlify to your GitHub repository
- Configure build settings
- Add environment variables
- Deploy!

### 3. Test Application
- Sign up
- Login
- Add fruits
- Verify data

---

## 💡 Pro Tips

### Tip 1: Bolt Updates
If you make changes in Bolt after initial push:
- Download updated files
- Copy to local repository
- Commit and push changes

### Tip 2: Keep Bolt & GitHub in Sync
```bash
# When you update files locally
git add .
git commit -m "Updated feature X"
git push
```

### Tip 3: GitHub Desktop (Alternative)
If you prefer GUI:
1. Download [GitHub Desktop](https://desktop.github.com)
2. Open your project folder
3. Commit and push with buttons

---

## 🎯 Summary: What You Should Do Now

### If Bolt has built-in GitHub:
1. ✅ Click "Connect to GitHub" in Bolt
2. ✅ Authorize Bolt
3. ✅ Click "Push to GitHub"
4. ✅ Done!

### If you downloaded Bolt files:
1. ✅ Check if they match our alignment (see `BOLT_vs_OUR_FILES.md`)
2. ✅ If not aligned → Use OUR files
3. ✅ Create GitHub repository at github.com
4. ✅ Push with git commands (see Step 5 above)
5. ✅ Proceed to deploy on Netlify

---

## ❓ Still Stuck?

### Common Questions:

**Q: Can I use Bolt AND your files?**
A: Yes! Use our backend/database, Bolt's frontend (if you like the styling)

**Q: Bolt files don't match your schema. What do I do?**
A: Use OUR files completely. Bolt files will cause alignment issues.

**Q: I pushed Bolt files already. Can I replace them?**
A: Yes! Delete files, copy our files, commit, and push again.

**Q: Do I need Bolt after pushing to GitHub?**
A: No! Once on GitHub, you can edit locally and push updates.

---

## 📞 Quick Help Commands

```bash
# Check if git is initialized
git status

# Check which remote you're connected to
git remote -v

# See commit history
git log --oneline

# Check current branch
git branch

# Remove wrong remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/yourusername/nutrition_bot.git
```

---

**Ready to push to GitHub? Follow the steps above!** 🚀

Need help with any specific step? Just ask!

