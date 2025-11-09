# Netlify Deployment Guide - Nutribot

## Quick Deploy Checklist

### ✅ Step 1: Prepare Database (Neon)

1. Create account at [neon.tech](https://neon.tech)
2. Create database named: `nutribot`
3. Run SQL from `database/schema.sql` in Neon SQL Editor
4. Copy your connection string

### ✅ Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Nutribot Application"
git branch -M main
git remote add origin https://github.com/yourusername/nutrition_bot.git
git push -u origin main
```

### ✅ Step 3: Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize
4. Select your `nutrition_bot` repository

### ✅ Step 4: Configure Build Settings

Use these exact settings:

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | (leave empty) |
| **Build command** | `npm run build` |
| **Publish directory** | `frontend/dist` |
| **Functions directory** | `netlify/functions` |

### ✅ Step 5: Environment Variables

Go to **Site settings** → **Environment variables** → **Add a variable**

Add these two variables:

```
DATABASE_URL = postgresql://user:password@host.neon.tech/nutribot?sslmode=require
JWT_SECRET = your-super-secret-random-string-at-least-32-characters
```

**Important**: 
- Get `DATABASE_URL` from your Neon dashboard
- Generate a random `JWT_SECRET` (minimum 32 characters)

### ✅ Step 6: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (2-3 minutes)
3. Netlify will provide you with a URL like: `https://your-app-name.netlify.app`

### ✅ Step 7: Test Your Deployment

1. Visit your Netlify URL
2. Click "Sign up here"
3. Register with email and password
4. Login with your credentials
5. Test adding nutrition entries
6. Verify data appears in tables

## Build Settings Summary

Here's what to enter in the Netlify build settings form:

```yaml
Branch to deploy:     main
Base directory:       (empty)
Build command:        npm run build
Publish directory:    frontend/dist
Functions directory:  netlify/functions
```

## Environment Variables Required

```env
DATABASE_URL = <your-neon-postgresql-connection-string>
JWT_SECRET = <your-secret-key-minimum-32-characters>
```

## Troubleshooting

### Build Fails

**Error**: "Cannot find module"
- **Solution**: Check that all dependencies are listed in `package.json`
- **Action**: Trigger redeploy after checking files

**Error**: "Build exceeded timeout"
- **Solution**: This is rare but might happen on first deploy
- **Action**: Trigger redeploy, Netlify caches dependencies

### Function Errors

**Error**: "Database connection failed"
- **Solution**: Check DATABASE_URL environment variable
- **Action**: Ensure Neon database is active and accepts connections

**Error**: "JWT must be provided"
- **Solution**: Check JWT_SECRET environment variable
- **Action**: Ensure it's at least 32 characters long

### Frontend Issues

**Error**: "Failed to fetch"
- **Solution**: Check browser console for CORS errors
- **Action**: Ensure Functions are deployed correctly

**Error**: "Blank page after login"
- **Solution**: Check that routes are configured properly
- **Action**: Verify `netlify.toml` redirects are correct

## Post-Deployment

### Verify Everything Works

- [ ] Sign up creates new user
- [ ] Login authenticates user
- [ ] Dashboard loads correctly
- [ ] Can insert nutrition entries
- [ ] Nutrition entries display in table
- [ ] Users table shows registered users
- [ ] Logout clears session
- [ ] Protected routes redirect to login

### Optional: Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow instructions to configure DNS

## Architecture

```
User → Netlify Edge → React Frontend (Static)
                   ↓
                   → Netlify Functions (Serverless API)
                   ↓
                   → Neon PostgreSQL (Database)
```

## Features Implemented

✅ **Database**: 2 tables with UUID primary keys
- `users` - Authentication table
- `nutrition_entries` - Data table

✅ **Backend**: Complete REST API
- Signup with email + password + confirm password
- Login with email + password
- Protected routes with JWT middleware
- Insert data endpoint
- Fetch data endpoint

✅ **Frontend**: React SPA
- Sign Up page (3 fields)
- Login page (2 fields)
- Dashboard with insert form
- Data display tables
- Logout functionality

✅ **Deployment**: Netlify-ready
- Serverless functions
- Environment variables
- Build configuration
- Redirects for SPA routing

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Neon Docs**: https://neon.tech/docs
- **React Router**: https://reactrouter.com
- **Express**: https://expressjs.com

## Success Metrics

Your deployment is successful when:

1. ✅ Database contains both tables
2. ✅ Can sign up new users
3. ✅ Can login existing users
4. ✅ Dashboard displays after login
5. ✅ Can add nutrition entries
6. ✅ Tables display data with UUIDs
7. ✅ Logout redirects to login

## Next Steps

After successful deployment:

1. Share your Netlify URL
2. Invite team members
3. Monitor usage in Netlify dashboard
4. Check database size in Neon
5. Set up custom domain (optional)

---

**🎉 You're all set! Your Nutribot Application is live!**

