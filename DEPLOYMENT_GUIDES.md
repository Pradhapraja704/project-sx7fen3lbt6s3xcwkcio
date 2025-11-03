# LexiFix Deployment Guides

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended - Easiest)

**Method 1: Git Repository**
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables:
   - `VITE_APP_ID`: Your Superdev App ID
   - `VITE_SUPERDEV_BASE_URL`: Your Superdev URL
6. Click "Deploy"

**Method 2: CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 2. Netlify (Drag & Drop)

**Method 1: Drag & Drop**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the entire `dist/` folder to the deploy area
4. Add environment variables in site settings

**Method 2: CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages

1. Create `gh-pages` branch:
```bash
git checkout -b gh-pages
git add -f dist/
git commit -m "Add production build"
git subtree push --prefix dist origin gh-pages
```

2. Enable GitHub Pages in repository settings
3. Select `gh-pages` branch as source

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### 5. Surge.sh

```bash
# Install Surge
npm install -g surge

# Deploy
cd dist
surge --domain lexifix-yourname.surge.sh
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  lexifix:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_APP_ID=${VITE_APP_ID}
      - VITE_SUPERDEV_BASE_URL=${VITE_SUPERDEV_BASE_URL}
```

### Run with Docker
```bash
docker build -t lexifix .
docker run -p 80:80 lexifix
```

## ☁️ Cloud Platform Deployment

### AWS S3 + CloudFront

1. **Create S3 Bucket:**
   - Go to AWS S3 console
   - Create bucket with your app name
   - Enable static website hosting

2. **Upload Files:**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Set Bucket Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Google Cloud Platform

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash

# Deploy to App Engine
gcloud app deploy
```

### Microsoft Azure

```bash
# Install Azure CLI
npm install -g azure-cli

# Login
az login

# Deploy to Static Web Apps
az staticwebapp create \
  --name lexifix \
  --resource-group my-resource-group \
  --source https://github.com/yourusername/lexifix \
  --location centralus \
  --sku free
```

## 🔧 Environment Setup

### Required Environment Variables
```bash
VITE_APP_ID=your_superdev_app_id
VITE_SUPERDEV_BASE_URL=https://your-superdev-instance.com
```

### For Each Platform:

**Vercel:**
- Project Settings → Environment Variables
- Add variables before deployment

**Netlify:**
- Site settings → Build & deploy → Environment
- Add variables in Environment variables section

**GitHub Pages:**
- Repository Settings → Secrets and variables → Actions
- Add as repository secrets

**Firebase:**
- `firebase functions:config:set`
- Or use `.firebaserc` configuration

## 📱 Mobile App Deployment

### Progressive Web App (PWA)
Add to `public/manifest.json`:
```json
{
  "name": "LexiFix",
  "short_name": "LexiFix",
  "description": "AI-Powered Chat with Text Refinement",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f0f0f",
  "theme_color": "#4a9eff",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Capacitor (Native Apps)
```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios

# Initialize
npx cap init "LexiFix" "com.lexifix.app"

# Build
npm run build

# Sync
npx cap sync

# Run on Android
npx cap run android

# Run on iOS
npx cap run ios
```

## 🔍 Pre-Deployment Checklist

### ✅ Before Deployment:
- [ ] Run `npm run build` successfully
- [ ] Test all functionality locally
- [ ] Set environment variables
- [ ] Update `index.html` metadata
- [ ] Optimize images and assets
- [ ] Test on mobile devices
- [ ] Check console for errors
- [ ] Verify authentication flow
- [ ] Test dark theme consistency

### ✅ After Deployment:
- [ ] Test all URLs load correctly
- [ ] Check mobile responsiveness
- [ ] Verify authentication works
- [ ] Test AI refinement feature
- [ ] Check page loading speed
- [ ] Validate HTML/CSS
- [ ] Test browser compatibility

## 🚨 Common Deployment Issues

### Build Errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working:
- Ensure variables are prefixed with `VITE_`
- Check platform-specific variable naming
- Restart deployment after adding variables

### Assets Not Loading:
- Verify asset paths are correct
- Check base URL in `vite.config.ts`
- Ensure files are in `dist/` folder

### Authentication Issues:
- Verify Superdev configuration
- Check CORS settings
- Ensure `requiresAuth: true` is set

## 📊 Monitoring and Analytics

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Vercel Analytics
- Enabled by default on Vercel
- Check dashboard for insights

### Netlify Analytics
- Enable in site settings
- Add tracking code to `index.html`

---

**Choose the deployment method that best fits your needs. For most users, Vercel or Netlify provide the easiest and fastest deployment experience.**