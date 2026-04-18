# Builds Your Mind - Frontend

React.js frontend for Builds Your Mind - Eco-Friendly Educational Kits.

## 🛠️ Tech Stack

- React 18
- Vite (Build tool)
- Tailwind CSS
- Framer Motion (Animations)
- React Router DOM
- React Hook Form
- Axios
- Docker + Nginx

## 📁 Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Loading.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── DistributorProgram.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ODMServices.jsx
│   │   ├── OEMServices.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   └── RetailerProgram.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .env.production
├── docker-compose.yml
├── Dockerfile
├── index.html
├── nginx.conf
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Development Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

Development server runs at: `http://localhost:3000`

## 📦 Production Build

### Option 1: Static Build

```bash
# Set production API URL
cp .env.production .env

# Build for production
npm run build

# Preview build
npm run preview
```

Output will be in `dist/` folder. Deploy to any static hosting (Vercel, Netlify, S3, etc.)

### Option 2: Docker Deployment

```bash
# Copy production env
cp .env.production .env

# Build and run with Docker
docker-compose up -d --build

# View logs
docker-compose logs -f
```

## 🐳 Docker Commands

```bash
# Build image
docker build -t buildsyourmind-frontend \
  --build-arg VITE_API_URL=https://api.buildsyourmind.in/api .

# Run container
docker run -d -p 80:80 --name bym-frontend buildsyourmind-frontend

# Stop container
docker stop bym-frontend

# Remove container
docker rm bym-frontend
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| About | `/about` | Company info |
| Products | `/products` | Product catalog |
| Product Detail | `/products/:slug` | Single product |
| OEM Services | `/oem-services` | OEM info |
| ODM Services | `/odm-services` | ODM info |
| Distributor | `/distributor-program` | Distributor program |
| Retailer | `/retailer-program` | Retailer program |
| Contact | `/contact` | Contact form |
| 404 | `*` | Not found |

## 🎨 Styling

### Color Palette

```css
--eco-forest: #1B4332;  /* Primary dark */
--eco-leaf: #2D5A27;    /* Secondary */
--eco-moss: #40916C;    /* Accent */
--eco-sage: #74C69D;    /* Light accent */
--eco-mint: #B7E4C7;    /* Very light */
--eco-cream: #F8FDF5;   /* Background */
```

### Fonts

- **Display**: Playfair Display (headings)
- **Body**: Source Sans Pro (text)

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |

## 📡 API Integration

API service located at `src/services/api.js`:

```javascript
import { getProducts, submitEnquiry } from './services/api';

// Get products
const products = await getProducts({ category: 'stem' });

// Submit enquiry
await submitEnquiry({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello'
});
```

## 🚢 Deployment Options

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

### AWS S3 + CloudFront

```bash
# Build
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Docker + VPS

```bash
# On your server
git clone <repo>
cd frontend
docker-compose up -d --build
```

## 🔒 Security Headers

Nginx configuration includes:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## 📄 License

© 2024 Builds Your Mind - Harmono Pvt. Ltd.
