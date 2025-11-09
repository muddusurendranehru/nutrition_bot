# 🔧 Environment Setup - HOMA FOODS

## Required Environment Variables

Create a `.env` file in your `backend/` directory with the following variables:

```bash
# ============================================
# HOMA FOODS - Environment Variables
# ============================================

# Database Configuration (Required)
DATABASE_URL=postgresql://username:password@host:port/database_name

# JWT Secret (Required) 
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI API Key (Required for Bolt Search)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## 🚀 Quick Setup Instructions

### 1. Database (Neon PostgreSQL)
```bash
# Get your Neon connection string from: https://console.neon.tech/
DATABASE_URL=postgresql://user:pass@ep-example.neon.tech/nutri_bot1
```

### 2. JWT Secret
```bash
# Generate a secure random string
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
```

### 3. OpenAI API Key
```bash
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your-key-here
```

## 🌍 Universal Features Supported

### 📱 Phone Numbers
- **International**: `+91 9963721999`, `+1 5551234567`
- **Local**: `9963721999`
- **Flexible**: `phone_number`, `phone@number`, `phone.number`

### 👤 Names  
- **Indian**: `Lakshmi`, `Rajesh Kumar`
- **International**: `José María`, `李明`, `John Doe`
- **Unicode**: Full international character support

### 🔐 Passwords
- **Standard**: `Password123`
- **Special Chars**: `password@123`, `myPass1!`
- **Requirements**: Minimum 6 chars, 1 letter, 1 number

## 🔍 Search Databases Integrated

| Database | Icon | Foods Available |
|----------|------|----------------|
| **Bolt AI** | 🧠 | AI-powered across all databases |
| **ICMR** | 🇮🇳 | Indian Council of Medical Research |
| **Tara Dalal** | 👩‍🍳 | Indian recipes and nutrition |
| **Chinese CDN** | 🇨🇳 | Chinese food database |
| **American USDA** | 🇺🇸 | American foods and fast food |

## 🧪 Testing Your Setup

### 1. Start Backend
```bash
cd backend
npm install
npm start
```

### 2. Test API
```bash
curl http://localhost:3000/
```

Should return:
```json
{
  "message": "🍎 HOMA FOODS - International Nutrition Database",
  "version": "2.0.0",
  "features": [
    "🔍 AI-Powered Bolt Search Engine",
    "🇮🇳 ICMR Indian Foods Database",
    ...
  ]
}
```

### 3. Start Frontend
```bash
cd frontend  
npm install
npm run dev
```

### 4. Test Features
- ✅ Sign up with: `test@example.com`, `Password123`, name: `Lakshmi`, phone: `+91 9963721999`
- ✅ Search: Try "biryani" in ICMR database
- ✅ Search: Try "pizza" in American database
- ✅ Search: Try "fried rice" in Chinese database

## 🚨 Troubleshooting

### OpenAI API Key Issues
```bash
# Check if key is loaded
console.log(process.env.OPENAI_API_KEY ? 'Enabled' : 'Disabled')
```

### Database Connection Issues
```bash
# Test connection
curl http://localhost:3000/api/health
```

### Phone Validation Issues
- ✅ Valid: `+91 9963721999`, `9963721999`, `phone_number`
- ❌ Invalid: `abc123`, `++91`, empty spaces only

## 🎯 Production Deployment

### Render.com
1. Set environment variables in Render dashboard
2. Connect to your GitHub repository
3. Auto-deploy on push

### Environment Variables for Production
```bash
NODE_ENV=production
DATABASE_URL=your_neon_production_url
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_production_jwt_secret
PORT=3000
```

🎉 **You're all set! Your HOMA FOODS international nutrition database is ready!** 🚀

