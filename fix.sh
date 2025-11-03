#!/bin/bash

echo "🔧 LexiFix Quick Fix Script"
echo "=========================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📝 Creating environment variables..."
echo "VITE_APP_ID=temp_app_id" > .env
echo "VITE_SUPERDEV_BASE_URL=https://temp.superdev.url" >> .env

echo "🔧 Temporarily disabling authentication for development..."
sed -i 's/requiresAuth: true,/requiresAuth: false,/' src/lib/superdev/client.ts

echo "🧹 Cleaning up cache..."
rm -rf node_modules/.vite

echo "✅ Fix applied! The app should now work without authentication."
echo ""
echo "🚀 To run the application:"
echo "   npm run dev"
echo ""
echo "🌐 Open in browser:"
echo "   http://localhost:8080"
echo ""
echo "📝 Note: This is for development testing only."
echo "   For production, set up proper Superdev credentials."