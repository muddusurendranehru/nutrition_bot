@echo off
echo ========================================
echo  Quick Deploy - Only New Dashboard Files
echo ========================================
echo.

cd C:\Users\pc\nutrition_bot

echo Step 1: Staging only the files we need...
git add frontend/App.jsx
git add frontend/pages/Dashboard_NEW.jsx

echo.
echo Step 2: Committing...
git commit -m "Deploy NEW Dashboard v4.0 - Skip GitHub secrets issue"

echo.
echo Step 3: Creating clean branch...
git checkout -b deploy-v4-clean 2>nul
git add frontend/App.jsx frontend/pages/Dashboard_NEW.jsx
git commit -m "New Dashboard v4.0"

echo.
echo Step 4: Pushing to GitHub...
git push origin deploy-v4-clean

echo.
echo ✅ Done! Now on Render:
echo    1. Settings → Branch: change to 'deploy-v4-clean'
echo    2. Deploys → Redeploy
echo    3. Wait 3 minutes
echo    4. Check for 'v4.0' in title
echo.
pause

