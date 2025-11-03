#!/bin/bash

# LexiFix Deployment Script
# This script helps you deploy LexiFix to various platforms

echo "🚀 LexiFix Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Show deployment options
echo ""
echo "🌐 Deployment Options:"
echo "======================"
echo "1. Vercel (Recommended):"
echo "   - Push to GitHub and import to vercel.com"
echo "   - Or use: npx vercel --prod"
echo ""
echo "2. Netlify:"
echo "   - Drag the 'dist/' folder to netlify.com"
echo "   - Or use: npx netlify deploy --prod --dir=dist"
echo ""
echo "3. Surge.sh:"
echo "   cd dist && surge --domain lexifix-yourname.surge.sh"
echo ""
echo "4. GitHub Pages:"
echo "   - Run: npm run deploy:gh-pages"
echo ""
echo "5. Docker:"
echo "   - docker build -t lexifix ."
echo "   - docker run -p 80:80 lexifix"
echo ""

# Check environment variables
echo "🔧 Environment Setup:"
echo "======================"
if [ -z "$VITE_APP_ID" ] || [ -z "$VITE_SUPERDEV_BASE_URL" ]; then
    echo "⚠️  Warning: Environment variables not set!"
    echo "Please set:"
    echo "  VITE_APP_ID=your_superdev_app_id"
    echo "  VITE_SUPERDEV_BASE_URL=https://your-superdev-instance.com"
    echo ""
    echo "For Vercel: Add in project settings"
    echo "For Netlify: Add in site settings"
    echo "For local: Create .env file"
else
    echo "✅ Environment variables found!"
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo "============================="
echo "☐ Test the app locally: npm run dev"
echo "☐ Create Superdev account and project"
echo "☐ Set environment variables"
echo "☐ Choose hosting platform"
echo "☐ Deploy to production"
echo "☐ Test all functionality"
echo "☐ Create test accounts (npm run seed:test-users)"
echo ""

echo "🎉 LexiFix is ready for deployment!"
echo "==================================="
echo "Files in 'dist/' folder: $(ls -1 dist | wc -l) files"
echo "Build size: $(du -sh dist/ | cut -f1)"
echo ""
echo "Happy deploying! 🚀"