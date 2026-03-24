# Deployment Guide

## ✅ PostgreSQL Configuration Complete

Your backend is now configured to use **PostgreSQL** instead of SQLite. This means:
- ✅ **No Visual Studio required** for deployment
- ✅ **Works on any platform** (Linux, macOS, Windows, Docker, Cloud)
- ✅ **Production-ready** database solution

## 🗄️ Database Connection

**Default Connection String:**
```
postgresql://postgres:postgres@localhost:5432/portfolio
```

This is configured in `config/database.js` and can be overridden with the `DATABASE_URL` environment variable.

## 🚀 Deployment Options

### Option 1: Cloud Platforms (Easiest)

#### Railway
1. Connect your GitHub repository
2. Add environment variable: `DATABASE_URL=your-postgres-connection-string`
3. Railway automatically builds and deploys
4. **No Visual Studio needed!**

#### Render
1. Connect your repository
2. Set `DATABASE_URL` environment variable
3. Render handles the build automatically
4. **No Visual Studio needed!**

#### Heroku
1. Connect your repository
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy - **No Visual Studio needed!**

### Option 2: Docker

Create a `Dockerfile` in the backend directory:

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Build Strapi
RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]
```

Then deploy to any Docker-compatible platform (AWS ECS, Google Cloud Run, Azure Container Instances, etc.)

### Option 3: VPS/Server

1. Install Node.js and PostgreSQL on your server
2. Clone your repository
3. Set `DATABASE_URL` environment variable
4. Run `npm install` (no build tools needed!)
5. Run `npm run build && npm start`

## 🔧 Environment Variables

For production, set these environment variables:

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-generated-keys
ADMIN_JWT_SECRET=your-secret
API_TOKEN_SALT=your-salt
TRANSFER_TOKEN_SALT=your-salt
ENCRYPTION_KEY=your-key
```

## 📝 Local Development

For local development, make sure:
1. PostgreSQL is running
2. Database `portfolio` exists
3. Connection string matches your local setup

You can still use SQLite locally if you prefer (requires Visual Studio C++ tools):
```bash
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## ✨ Benefits of PostgreSQL

- ✅ No native compilation needed
- ✅ Works on all platforms
- ✅ Better for production (concurrent connections, transactions)
- ✅ Easy to scale
- ✅ Works with all cloud providers
