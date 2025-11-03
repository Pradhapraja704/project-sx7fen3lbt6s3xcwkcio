# LexiFix Troubleshooting Guide

## 🚨 White Blank Page Issue

If you're seeing a white blank page, here are the steps to fix it:

### 1. **Check Browser Console**
1. Open your browser (Chrome, Firefox, etc.)
2. Go to http://localhost:8080
3. Press `F12` to open Developer Tools
4. Click on the "Console" tab
5. Look for any red error messages

### 2. **Common Issues & Solutions**

#### **Issue: Environment Variables Missing**
**Error:** `VITE_APP_ID` or `VITE_SUPERDEV_BASE_URL` not defined

**Solution:**
1. Create a `.env` file in the project root
2. Add these variables:
```env
VITE_APP_ID=your_superdev_app_id
VITE_SUPERDEV_BASE_URL=https://your-superdev-url.com
```

#### **Issue: Superdev Connection Error**
**Error:** Network or connection issues with Superdev

**Solution:**
1. Check your internet connection
2. Verify your Superdev credentials
3. Temporarily disable authentication for testing:
```typescript
// In src/lib/superdev/client.ts
requiresAuth: false, // Set to false temporarily
```

#### **Issue: Authentication Redirect Loop**
**Error:** Page keeps redirecting between login and main app

**Solution:**
1. Clear browser localStorage:
```javascript
// In browser console
localStorage.clear()
```

#### **Issue: React Component Error**
**Error:** React component failed to render

**Solution:**
1. Check the ErrorBoundary for error details
2. Look for specific component errors in console
3. Try disabling authentication temporarily

### 3. **Debug Steps**

#### **Step 1: Basic Setup Check**
```bash
# Make sure you're in the right directory
cd project-sx7fen3lbt6s3xcwkcio

# Install dependencies
npm install

# Check if server starts
npm run dev
```

#### **Step 2: Environment Setup**
```bash
# Check if .env file exists
ls -la .env

# If not, create it with temp values
echo "VITE_APP_ID=temp_app_id" > .env
echo "VITE_SUPERDEV_BASE_URL=https://temp.superdev.url" >> .env
```

#### **Step 3: Test Without Authentication**
```typescript
// In src/lib/superdev/client.ts
export const superdevClient = createSuperdevClient({
  appId: "temp_app_id",
  requiresAuth: false, // Disable auth
  baseUrl: "https://temp.superdev.url",
  loginUrl: "https://temp.superdev.url/auth/app-login?app_id=temp_app_id",
});
```

#### **Step 4: Test Routes Individually**
Try these URLs:
- http://localhost:8080/login
- http://localhost:8080/register
- http://localhost:8080/

### 4. **Common Console Errors & Fixes**

#### **"Cannot read property 'map' of undefined"**
**Fix:** Check if messages array is initialized properly
```typescript
// In Index.tsx
const [messages, setMessages] = useState([]);
```

#### **"useAuth must be used within an AuthProvider"**
**Fix:** Make sure AuthProvider wraps your App component
```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

#### **"Network error" with Superdev**
**Fix:** Check Superdev configuration and internet connection

### 5. **Reset Project State**

If nothing else works, try a complete reset:

```bash
# Clear cache
rm -rf node_modules package-lock.json
rm -rf dist

# Reinstall
npm install

# Reset environment
echo "VITE_APP_ID=temp_app_id" > .env
echo "VITE_SUPERDEV_BASE_URL=https://temp.superdev.url" >> .env

# Restart server
npm run dev
```

### 6. **Development Mode vs Production**

#### **Development Mode**
- Authentication temporarily disabled
- Error boundaries show detailed errors
- Hot reload enabled
- Console logs visible

#### **Production Mode**
- Authentication enabled
- Error boundaries show user-friendly messages
- Optimized build
- Console logs minimized

### 7. **Quick Fix Script**

Create a quick fix script:
```bash
#!/bin/bash
echo "🔧 Fixing LexiFix..."
echo "VITE_APP_ID=temp_app_id" > .env
echo "VITE_SUPERDEV_BASE_URL=https://temp.superdev.url" >> .env
sed -i 's/requiresAuth: true,/requiresAuth: false,/' src/lib/superdev/client.ts
echo "✅ Fixed! Try running npm run dev"
```

### 8. **Get Help**

If you're still stuck:

1. **Check Console:** Always check browser console first
2. **Verify Environment:** Ensure all variables are set
3. **Test Components:** Try accessing individual routes
4. **Reset Project:** Complete reset if needed
5. **Check Logs:** Look at server logs in terminal

### 9. **Success Checklist**

✅ Application loads without errors
✅ Routes work correctly
✅ Login/register pages display
✅ Dark theme applied
✅ No console errors
✅ Responsive design works

---

**💡 Pro Tip: The most common issue is missing environment variables. Always check your `.env` file first!**