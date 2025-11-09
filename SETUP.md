# Nutribot - Nutrition Tracking Application - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Neon PostgreSQL account
- Git installed

## Step 1: Database Setup (Neon PostgreSQL)

1. **Create Neon Account**: Go to [neon.tech](https://neon.tech) and sign up
2. **Create Database**: Create a new database named `nutribot`
3. **Run Schema**: In Neon SQL Editor, execute the SQL from `database/schema.sql`
4. **Get Connection String**: Copy your connection string (looks like: `postgresql://user:pass@host/nutribot`)

## Step 2: Local Development Setup

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and add your credentials:
```env
DATABASE_URL=your-neon-connection-string
JWT_SECRET=your-random-secret-key-min-32-chars
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```

Backend should be running at `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend should be running at `http://localhost:5173`

## Step 3: Test Locally

1. Open `http://localhost:5173`
2. Sign up with email and password
3. Login with your credentials
4. Add nutrition entries in the dashboard
5. View both tables (users and nutrition_entries)

## Step 4: Deploy to Netlify

### Option A: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Option B: Deploy via Netlify Dashboard

1. **Connect Repository**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Configure Build Settings**:
   - **Branch to deploy**: `main`
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Functions directory**: `netlify/functions`

3. **Set Environment Variables**:
   Go to Site settings → Environment variables and add:
   ```
   DATABASE_URL = your-neon-connection-string
   JWT_SECRET = your-random-secret-key
   ```

4. **Deploy**: Click "Deploy site"

## Step 5: Verify Deployment

1. Visit your Netlify URL
2. Test signup/login flow
3. Test adding nutrition entries
4. Verify both tables display data

## Troubleshooting

### Database Connection Issues
- Ensure your Neon database accepts connections
- Check that DATABASE_URL is correct
- Verify SSL settings in connection string

### Build Failures
- Check Node.js version (must be 18+)
- Ensure all dependencies are in package.json
- Check build logs in Netlify dashboard

### API Not Working
- Verify environment variables are set in Netlify
- Check Functions logs in Netlify dashboard
- Ensure `netlify.toml` is configured correctly

## Architecture

```
Frontend (React) → Netlify Functions → Neon PostgreSQL
                ↓
         Authentication (JWT)
```

## API Endpoints

- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/data` - Insert nutrition entry
- `GET /api/data` - Fetch nutrition entries
- `GET /api/data/users` - Fetch all users

## Database Tables

### Table 1: users
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `created_at` (TIMESTAMP)

### Table 2: nutrition_entries
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → users)
- `food_name` (VARCHAR)
- `calories` (INTEGER)
- `protein` (DECIMAL)
- `carbs` (DECIMAL)
- `fats` (DECIMAL)
- `meal_date` (DATE)
- `created_at` (TIMESTAMP)

## Support

For issues, check:
1. Backend logs: `npm run dev` output
2. Browser console for frontend errors
3. Netlify Function logs
4. Neon database connection status

