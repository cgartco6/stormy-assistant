# setup_stormy.ps1
Write-Host "🌪️  Stormy Windows Setup" -ForegroundColor Cyan

# Check if Python exists
try { python --version } catch { Write-Host "❌ Python not found" -ForegroundColor Red; exit 1 }

# Run the Python mega script
if (Test-Path "install_stormy.py") {
    python install_stormy.py
} else {
    Write-Host "⚠️  install_stormy.py not found. Downloading..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/yourusername/stormy/main/install_stormy.py" -OutFile "install_stormy.py"
    python install_stormy.py
}
