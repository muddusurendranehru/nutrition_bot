# ⚡ HOMA FOODS - Render Quick Start (5 Minutes)

## 🚀 **FASTEST WAY TO DEPLOY:**

---

## **📱 STEP 1: Go to Render**
```
👉 https://render.com
👉 Click "Get Started" or "Sign In"
👉 Sign up with GitHub (fastest)
```

---

## **📱 STEP 2: Create Web Service**
```
👉 Click "New +" (top right)
👉 Select "Web Service"
👉 Connect GitHub: muddusurendranehru/nutrition_bot
👉 Click "Connect"
```

---

## **📱 STEP 3: Basic Configuration**
```
Name: homa-foods-nutrition
Region: Singapore (or closest to you)
Branch: main
Runtime: Node
Build Command: npm install
Start Command: node index.js
Instance Type: Free (or Starter for $7/month)
```

---

## **📱 STEP 4: Environment Variables**
Click **"Advanced"** → **"Add Environment Variable"**

Copy and paste these 4 variables:

### **Variable 1:**
```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require&channel_binding=require
```

### **Variable 2:**
```
Key: JWT_SECRET
Value: c8e3aa52cd9058cb183f0e4504453137672cc74bf904c863bc084f556bcdd1ddfc504a76f8f7835e3997ff8e7b4dbf83e551d1738713cc9dc8dbbdd02d08a202
```

### **Variable 3:**
```
Key: PORT
Value: 3031
```

### **Variable 4:**
```
Key: NODE_ENV
Value: production
```

---

## **📱 STEP 5: Deploy**
```
👉 Click "Create Web Service"
👉 Wait 5-10 minutes (Render builds your app)
👉 You'll get a URL like: https://homa-foods-nutrition.onrender.com
```

---

## **✅ DONE! Test Your App:**

### **Frontend:**
```
https://homa-foods-nutrition.onrender.com
```

### **Health Check:**
```
https://homa-foods-nutrition.onrender.com/api/health
```

### **Search Food:**
```
https://homa-foods-nutrition.onrender.com/api/data?search=biryani
```

---

## **🎯 WHAT YOU GET:**

✅ **Worldwide Database**: 490+ foods from 7 continents
✅ **Beautiful UI**: Glass morphism design
✅ **Authentication**: Signup/login/logout
✅ **Universal Search**: Regional names (Telugu, Hindi, Chinese)
✅ **Health Scores**: Diabetic ratings, nutrition data
✅ **Automatic HTTPS**: Secure SSL certificates
✅ **Free Hosting**: 750 hours/month (or $7/month for always-on)

---

## **⚠️ FREE TIER NOTES:**

- **Sleeps after 15 minutes** of inactivity
- **Takes 30 seconds** to wake up on first request
- **Perfect for testing** and low-traffic apps
- **Upgrade to Starter** ($7/month) for always-on

---

## **🚀 DEPLOYMENT STATUS:**

✅ **GitHub Repository**: https://github.com/muddusurendranehru/nutrition_bot
✅ **74 Files**: Committed and pushed
✅ **Backend**: Node.js + Express + PostgreSQL
✅ **Frontend**: Beautiful glass morphism UI
✅ **Database**: Neon PostgreSQL with worldwide foods
✅ **Production Ready**: Error handling, connection pooling

---

## **📞 NEED HELP?**

- **Render Support**: https://render.com/docs
- **Your GitHub Repo**: https://github.com/muddusurendranehru/nutrition_bot
- **Local Development**: http://localhost:3031

---

## **🌍 YOUR APP IS READY TO SERVE THE WORLD!**

**Go to [render.com](https://render.com) now and deploy in 5 minutes!** 🚀

