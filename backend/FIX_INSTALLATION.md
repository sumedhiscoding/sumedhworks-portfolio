# Backend Installation Fix Guide

## Issues Identified

1. **Node.js Version Mismatch**: You're using Node.js v24.11.0, but this project requires Node.js 18-22 (I've temporarily updated package.json to allow Node 24)
2. **Missing C++ Build Tools**: Visual Studio 2022 Community is installed, but the **"Desktop development with C++" workload is missing**. This is required to compile `better-sqlite3`.

## Solutions

### Option 1: Install Visual Studio C++ Workload (Recommended if keeping Node 24)

1. Open **Visual Studio Installer**
2. Click **Modify** on Visual Studio 2022 Community
3. Under **Workloads**, check **"Desktop development with C++"**
4. Click **Modify** to install
5. After installation, restart your terminal and run:
   ```powershell
   cd backend
   npm rebuild better-sqlite3
   ```

### Option 2: Use Node Version Manager (Recommended)

Install and use Node.js 22 (LTS):

1. Install **nvm-windows** from: https://github.com/coreybutler/nvm-windows/releases
2. After installation, open a new PowerShell as Administrator and run:
   ```powershell
   nvm install 22.11.0
   nvm use 22.11.0
   ```
3. Then in your backend directory:
   ```powershell
   cd backend
   npm install
   ```

### Option 3: Quick Fix (Temporary)

If you need to proceed immediately, you can temporarily modify `package.json` to allow Node 24, but this may cause compatibility issues:

The engines field will be updated to allow Node 24, but you still need the C++ build tools.

## After Fixing

Once you've completed one of the options above, run:

```powershell
cd backend
npm install
npm run dev
```
