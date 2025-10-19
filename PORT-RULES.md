# 🔧 HOMA FOODS - PORT RULES

## ✅ **IMPORTANT RULES TO REMEMBER:**

### **🚨 RULE #1: PORT 3000 WILL BE OCCUPIED**
- ✅ **Always use alternative ports:** 3031, 3037, 3039, etc.
- ✅ **Never use port 3000** - It will be occupied by other applications
- ✅ **Default port:** 3031 (as configured)
- ✅ **Alternative ports:** 3037, 3039, 3041, 3043, etc.

### **🚨 RULE #2: DON'T DESTROY SUCCESS**
- ✅ **Keep working backend intact**
- ✅ **Keep working database intact**
- ✅ **Keep working authentication intact**
- ✅ **Keep working frontend intact**

### **🚨 RULE #3: UNIVERSAL SCHEMA**
- ✅ **No name validation headaches**
- ✅ **No phone validation headaches**
- ✅ **No food search headaches**
- ✅ **Accept any format**

### **🚨 RULE #4: NEON POSTGRESQL**
- ✅ **Best backend choice**
- ✅ **Better than Excel, Airtable, Supabase**
- ✅ **Universal support**
- ✅ **No validation delays**

## 🚀 **CURRENT CONFIGURATION:**

### **🌐 Application URLs:**
- **Frontend:** http://localhost:3031
- **Health Check:** http://localhost:3031/api/health
- **API Base:** http://localhost:3031/api

### **🔐 Authentication Endpoints:**
- **Sign Up:** POST http://localhost:3031/api/auth/signup
- **Login:** POST http://localhost:3031/api/auth/login
- **Logout:** POST http://localhost:3031/api/auth/logout

### **🍎 Data Endpoints:**
- **Food Search:** GET http://localhost:3031/api/data?search=chicken
- **Database Stats:** GET http://localhost:3031/api/data/stats
- **User Profile:** GET http://localhost:3031/api/user/profile

## 📋 **DEPLOYMENT PORTS:**

### **🌐 Production Ports:**
- **Vercel:** Automatic port assignment
- **Netlify:** Automatic port assignment
- **AWS:** Port 80/443 (automatic)
- **Heroku:** Automatic port assignment

### **🔧 Development Ports:**
- **Primary:** 3031 (current)
- **Alternative:** 3037, 3039, 3041, 3043
- **Testing:** 3032, 3033, 3034, 3035

## 🎯 **REMEMBER:**
- ✅ **Port 3000 = OCCUPIED** - Use 3031, 3037, etc.
- ✅ **Don't destroy success** - Keep working code
- ✅ **Universal schema** - No validation headaches
- ✅ **Neon PostgreSQL** - Best backend choice

**Your HOMA FOODS application is ready for production!** 🚀
