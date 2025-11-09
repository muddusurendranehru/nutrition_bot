# Nutribot - Fruit Tracking Application 🍊

A simple full-stack fruit nutrition tracker with **INTEGER primary keys** and glycemic index tracking.

## 🏗️ Project Structure

```
nutrition_bot/
├── backend/          # Express API server
├── frontend/         # React application
├── database/         # SQL schemas
└── netlify/          # Netlify Functions
```

## 📊 Database Setup (Neon PostgreSQL)

### Simple Schema - INTEGER IDs

**Database Name**: `nutribot`

**Table 1: customers** (Authentication)
```sql
id              SERIAL PRIMARY KEY
email           VARCHAR(255) UNIQUE
password        VARCHAR(255)
created_at      TIMESTAMP
```

**Table 2: fruits** (Data)
```sql
id              SERIAL PRIMARY KEY
customer_id     INTEGER (FK → customers)
fruit_name      VARCHAR(255)
calories        INTEGER
carbs           DECIMAL
proteins        DECIMAL
glycemic_index  INTEGER
created_at      TIMESTAMP
```

### Setup Steps:

1. **Create Database**: Create database named `nutribot` in Neon
2. **Run Schema**: Execute `database/schema.sql` in Neon SQL Editor
3. **Get Connection String**: Copy your connection string (ends with `/nutribot`)

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Neon database URL
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Authentication Flow

1. **Sign Up**: Email + Password + Confirm Password → Creates customer account
2. **Login**: Email + Password → JWT token → Redirect to Dashboard
3. **Dashboard**: Add fruits, view data, logout

## 🍎 Dashboard Features

### Add Fruit Form:
- Fruit name (required)
- Calories
- Carbs (grams)
- Proteins (grams)
- Glycemic Index (color-coded: green ≤55, orange 56-69, red ≥70)

### View Data:
- **Table 1**: All registered customers (ID, email, created date)
- **Table 2**: Your fruits with nutritional info and glycemic index

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register customer
- `POST /api/auth/login` - Login customer
- `POST /api/auth/logout` - Logout customer

### Data
- `POST /api/data` - Add fruit entry
- `GET /api/data` - Fetch customer's fruits
- `GET /api/data/customers` - Fetch all customers

## 🌐 Netlify Deployment

**Build Settings:**
- Branch: `main`
- Build command: `npm run build`
- Publish directory: `frontend/dist`
- Functions directory: `netlify/functions`

**Environment Variables:**
- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens (min 32 chars)

## 📝 Key Features

✅ **Simple INTEGER IDs** - No UUIDs, just auto-incrementing integers  
✅ **2 Tables** - customers & fruits  
✅ **Glycemic Index** - Color-coded health indicator  
✅ **JWT Auth** - Secure token-based authentication  
✅ **Password Hashing** - Bcrypt for security  
✅ **Protected Routes** - Middleware enforces login  
✅ **Responsive UI** - Beautiful gradient design  

## 🍊 Example Fruit Data

| Fruit | Calories | Carbs | Proteins | Glycemic Index |
|-------|----------|-------|----------|----------------|
| Orange | 47 | 12g | 0.9g | 43 (Low) |
| Apple | 52 | 14g | 0.3g | 36 (Low) |
| Banana | 89 | 23g | 1.1g | 51 (Low) |
| Watermelon | 30 | 8g | 0.6g | 72 (High) |

## 📚 Documentation

- `SETUP.md` - Complete local setup guide
- `NETLIFY_DEPLOYMENT.md` - Step-by-step deployment
- `database/schema.sql` - Database tables

---

**Made with ❤️ for healthy living!**
