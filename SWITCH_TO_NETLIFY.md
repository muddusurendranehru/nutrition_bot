# Switch to Netlify - 5 Minutes Setup

## Why Netlify?
✅ **10x faster deploys** (30 seconds vs 5 minutes)  
✅ **Auto-deploy on GitHub push**  
✅ **No complex settings** - it just works  
✅ **Free tier** - generous limits  
✅ **Already configured** - netlify.toml exists!  

## Quick Setup (5 Steps):

### Step 1: Create Netlify Account
1. Go to: https://app.netlify.com
2. Click "Sign up" → Use GitHub (same account as your repo)
3. Done!

### Step 2: Connect Repository
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify
4. Select your `nutrition_bot` repository
5. Click on the repo

### Step 3: Build Settings (Auto-filled from netlify.toml!)
Netlify should AUTO-DETECT these from `netlify.toml`:
- **Branch to deploy:** `main`
- **Base directory:** (empty)
- **Build command:** `cd frontend && npm install && npm run build`
- **Publish directory:** `frontend/dist`

If not auto-filled, enter them manually.

### Step 4: Environment Variables
Go to **Site settings** → **Environment variables** → **Add variable**

Add ONE variable:
```
VITE_API_URL = https://homa-foods-nutrition.onrender.com/api
```

### Step 5: Deploy!
1. Click **"Deploy site"**
2. Wait **30 seconds** (not 5 minutes!)
3. Done! You get a URL like: `https://your-app-name.netlify.app`

## That's it! 

✅ Netlify deploys in **30 seconds**  
✅ Every GitHub push = auto-deploy  
✅ No manual redeploy needed  
✅ See "✨ NEW VERSION v4.0 ✨" immediately  

## Update API URL (After Deploy)

Once deployed, your frontend needs to point to your Render backend:

1. Netlify Dashboard → Your Site → **Site settings**
2. **Environment variables** → Add:
   ```
   VITE_API_URL = https://homa-foods-nutrition.onrender.com/api
   ```
3. **Trigger deploy** → **Clear cache and deploy site**

## Benefits vs Render:

| Feature | Render | Netlify |
|---------|--------|---------|
| Deploy time | 5 min | 30 sec |
| Auto-deploy | Manual | ✅ Auto |
| Build cache | Messy | ✅ Smart |
| Free tier | Sleeps | ✅ Always on |
| Complexity | High | ✅ Low |

**Switch to Netlify = Save 10 hours of headache!**

