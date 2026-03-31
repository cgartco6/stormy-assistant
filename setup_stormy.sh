#!/bin/bash
echo "🌪️  Stormy Ubuntu Setup"
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found"
    exit 1
fi
if [ -f install_stormy.py ]; then
    python3 install_stormy.py
else
    echo "⚠️  install_stormy.py not found. Please download it."
fi
