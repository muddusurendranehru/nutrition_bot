# 🧪 LOCAL TESTING - Step by Step Guide

## 🚀 **START HERE - Terminal Commands**

### **Step 1: Install Dependencies**
```bash
# Backend - Install OpenAI package
cd backend
npm install
# ✅ Should install openai, axios, validator packages

# Frontend - Install any new packages
cd ../frontend  
npm install
# ✅ Should complete without errors
```

### **Step 2: Configure Environment**
```bash
# In backend/ directory, create/update .env file:
cd backend
```

Create `backend/.env` file with:
```bash
# Your existing Neon database
DATABASE_URL=your_neon_connection_string_here

# Your existing JWT secret
JWT_SECRET=your-existing-jwt-secret

# NEW: OpenAI API Key (only activates on Bolt Search click)
OPENAI_API_KEY=sk-your-openai-key

# Server config
PORT=3000
NODE_ENV=development
```

### **Step 3: Start Servers**
```bash
# Terminal 1: Backend
cd backend
npm start

# ✅ Look for these SUCCESS messages:
# "🚀 HOMA FOODS API server running on http://localhost:3000"
# "🔍 AI-Powered Bolt Search Engine" 
# "⚡ OpenAI Integration: Enabled"
# "🇮🇳 ICMR | 👩‍🍳 Tara Dalal | 🇨🇳 Chinese CDN | 🇺🇸 USDA"
```

```bash
# Terminal 2: Frontend  
cd frontend
npm run dev

# ✅ Should open: http://localhost:5173
# ✅ Look for: "Local: http://localhost:5173/"
```

---

## ✅ **TESTING CHECKLIST**

### **🔐 Test 1: Authentication (CRITICAL)**
- [ ] **Open**: http://localhost:5173
- [ ] **Should redirect to**: Login page
- [ ] **Test Signup**: 
  - Email: `test@example.com`
  - Password: `Password123`
  - Name: `John Doe`
  - Phone: `+91 9963721999`
- [ ] **Should succeed**: Shows success message, redirects to dashboard
- [ ] **Test Login**: Use same credentials
- [ ] **Should work**: Redirects to dashboard

### **🍎 Test 2: Dashboard Loads (CRITICAL)**
- [ ] **Dashboard appears**: Should see "🍎 HOMA FOODS" header
- [ ] **No console errors**: Check browser DevTools (F12)
- [ ] **Two sections**: 
  - International Search section (with Bolt button)
  - Add Food form
- [ ] **Two tables**: 
  - Nutrition Database table
  - Registered Customers table

### **🔍 Test 3: Regular Search (PRESERVE SUCCESS)**
- [ ] **Search box appears**: In Dashboard_SIMPLE version
- [ ] **Type**: "chicken"
- [ ] **Click**: "🔍 Search & Analyze" (NOT Bolt Search)
- [ ] **Should work**: Database search, no AI activation
- [ ] **Results appear**: Shows nutrition data and diabetes analysis
- [ ] **Fast response**: Should be immediate (no waiting for AI)

### **🧠 Test 4: Bolt AI Search (NEW FEATURE)**
- [ ] **Bolt button appears**: "🧠 Bolt Search" button visible
- [ ] **NO auto-activation**: OpenAI should NOT load on page load
- [ ] **Type search**: "healthy diabetic breakfast"
- [ ] **Click**: "🧠 Bolt Search" button
- [ ] **Should show**: "AI Searching..." message
- [ ] **Console check**: Should see "🤖 OpenAI Client initialized for Bolt Search"
- [ ] **AI results**: Should get enhanced results (may take 3-10 seconds)
- [ ] **Fallback works**: If AI fails, should show error but not crash

### **📝 Test 5: Data Operations (DATABASE ALIGNMENT)**
- [ ] **Add Food Form**: Should have fields:
  - Food Name (required)
  - Serving Size
  - Calories  
  - Carbs (g)
  - Proteins (g)
  - Glycemic Index
- [ ] **Test Insert**: Add a food:
  - Food Name: "Test Pizza"
  - Calories: "300"
  - Carbs: "40"
  - Proteins: "15"
  - Glycemic Index: "70"
- [ ] **Should succeed**: Shows "Food added to database successfully!"
- [ ] **Table updates**: Should see new food in Nutrition Database table
- [ ] **Customers table**: Should show registered users

### **📱 Test 6: Mobile Responsive**
- [ ] **Open DevTools**: F12 → Toggle device toolbar (mobile view)
- [ ] **Forms work**: All forms should be touch-friendly
- [ ] **Buttons work**: All buttons should be easily clickable
- [ ] **Tables scroll**: Tables should scroll horizontally on mobile

---

## 🚨 **TROUBLESHOOTING**

### **Backend Won't Start**
```bash
# Check for errors:
cat backend/.env    # Should contain all required variables
npm install         # Re-install dependencies
```

### **OpenAI Not Working**
```bash
# In browser console (F12), look for:
"🤖 OpenAI Client initialized for Bolt Search"  # ✅ Good
"⚠️ OpenAI API key not configured"             # ❌ Check .env file
```

### **Database Connection Failed**
```bash
# Test health endpoint:
curl http://localhost:3000/api/health
# Should return: {"status": "OK", "database": "Connected"}
```

### **Frontend Errors**
```bash
# Check browser console (F12) for:
- No red error messages
- Components load properly
- API calls succeed
```

---

## 🎯 **SUCCESS CRITERIA**

### ✅ **ALL MUST PASS Before GitHub Push:**
1. **Authentication**: Signup/login works with universal validation
2. **Dashboard**: Loads without errors, shows both tables
3. **Regular Search**: Database search works (preserves your success)
4. **Bolt Search**: AI activates only when clicked, no endless loops
5. **Data Operations**: Can add/view foods in nutrition_database
6. **Mobile**: Responsive design works
7. **No Errors**: Clean browser console, no server crashes

### ⚠️ **If ANY Test Fails:**
**STOP! DO NOT PUSH TO GITHUB!**
- Note which test failed
- Check error messages  
- Fix issues locally
- Re-test until all pass
- Only then proceed to GitHub

---

## 🚀 **After All Tests Pass**

You'll be ready for safe GitHub push with confidence that nothing will break your live deployment!

**Ready to start Step 1? Run the backend install command!** 🎯

```bash
cd backend && npm install
```

