@echo off
echo ========================================
echo  Direct Deploy to Render (No GitHub)
echo ========================================
echo.

echo Step 1: Testing locally...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Fix errors first.
    pause
    exit /b 1
)
echo ✅ Local build successful!

echo.
echo Step 2: Files ready for Render
echo.
echo 📁 Built files in: frontend\dist\
echo.
echo ⚠️  Now go to Render:
echo    1. Render Dashboard → Frontend Service
echo    2. Settings → Build & Deploy
echo    3. Change Build Command to: echo "Using pre-built files"
echo    4. Or use Manual Deploy and upload dist folder
echo.
pause

