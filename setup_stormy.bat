@echo off
echo 🌪️ Stormy Windows Setup
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found
    exit /b 1
)
if exist install_stormy.py (
    python install_stormy.py
) else (
    echo ⚠️ install_stormy.py not found. Please download it first.
)
pause
