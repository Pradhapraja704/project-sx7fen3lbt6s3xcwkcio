# LexiFix - AI-Powered Chat Application

**Export Date:** November 3, 2025
**Version:** 1.0.0

## 📋 Overview

LexiFix is a modern WhatsApp-style chat application with AI-powered text refinement capabilities. It features a complete authentication system, professional dark theme, and intelligent text improvement features.

## 🚀 Quick Start

### For Development (Source Code)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### For Production Deployment (Built Files)
The `dist/` folder contains the production-ready files that can be deployed to any static hosting service.

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
VITE_APP_ID=your_superdev_app_id
VITE_SUPERDEV_BASE_URL=https://your-superdev-instance.com
```

### Superdev Setup
1. Create a Superdev account and project
2. Enable authentication for your project
3. Copy the App ID and Base URL to your environment variables

## 🎨 Features

### ✅ Authentication System
- Email-based login and registration
- Protected routes requiring authentication
- Password strength validation
- Form validation and error handling
- Session management with localStorage

### ✅ Chat Features
- Real-time messaging with Superdev backend
- AI-powered text refinement
- WhatsApp-style message bubbles
- Message history and persistence
- Typing indicators and status updates

### ✅ UI/UX
- Professional dark theme (#0f0f0f, #1a1a1a, #2d2d2d, #4a9eff)
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Loading states and error handling
- shadcn/ui component library

### ✅ Test Accounts
Built-in test accounts for easy development testing:
- **User 1:** test1@lexifix.com / test123
- **User 2:** test2@lexifix.com / test123

Create test accounts:
```bash
npm run seed:test-users
```

Or manually register at: http://localhost:8080/register

## 📁 Project Structure

```
lexifix/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ChatHeader.tsx   # App header with branding
│   │   ├── ChatInput.tsx    # Message input with AI refinement
│   │   ├── MessageList.tsx  # Message display container
│   │   ├── MessageBubble.tsx # Individual message component
│   │   └── ProtectedRoute.tsx # Route protection wrapper
│   ├── pages/               # Application pages
│   │   ├── Login.tsx        # Login page
│   │   ├── Register.tsx     # Registration page
│   │   ├── Index.tsx        # Main chat interface
│   │   └── NotFound.tsx     # 404 page
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.tsx      # Authentication state management
│   ├── services/            # API and business logic
│   │   └── authService.ts   # Authentication service
│   ├── lib/                 # Utility libraries
│   │   └── superdev/        # Superdev client configuration
│   └── entities/            # Database entities
├── scripts/                 # Build and utility scripts
│   └── seedTestData.ts      # Test data seeding script
├── dist/                    # Production build output
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🌐 Deployment Options

### 1. Static Hosting (Recommended for Production)
Deploy the `dist/` folder to:
- **Vercel:** Connect your Git repository
- **Netlify:** Drag and drop the `dist/` folder
- **GitHub Pages:** Use GitHub Actions for auto-deployment
- **Firebase Hosting:** `firebase deploy`
- **AWS S3 + CloudFront:** Static website hosting

### 2. Vercel Deployment (One-Click)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### 4. Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security Considerations

- Authentication handled by Superdev backend
- Environment variables for sensitive configuration
- JWT tokens stored in localStorage
- Protected routes prevent unauthorized access
- Input validation on all forms
- XSS protection through React's built-in safeguards

## 📱 Mobile Responsiveness

- Fully responsive design
- Touch-friendly interface
- Optimized for mobile browsers
- Progressive Web App ready

## 🛠️ Development Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "seed:test-users": "ts-node scripts/seedTestData.ts"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Authentication not working:**
   - Check Superdev configuration
   - Verify environment variables
   - Ensure `requiresAuth: true` in client config

3. **Dark theme not applying:**
   - Clear browser cache
   - Check CSS variables in index.css
   - Verify Tailwind configuration

4. **Test accounts not working:**
   - Run `npm run seed:test-users`
   - Or manually register accounts
   - Check Superdev backend connection

## 📞 Support

For issues and questions:
1. Check this README for common solutions
2. Review the console for error messages
3. Verify environment configuration
4. Test with fresh browser session

## 📄 License

This project is built with open-source technologies and follows standard web development practices.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Superdev**