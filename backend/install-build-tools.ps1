# Script to help install better-sqlite3 on Windows
# This script attempts to configure the environment for building native modules

Write-Host "Checking Visual Studio installation..." -ForegroundColor Cyan

# Check multiple possible VS paths
$vsPaths = @(
    "C:\Program Files\Microsoft Visual Studio\2022\Community",
    "C:\Program Files\Microsoft Visual Studio\18\Community",
    "C:\Program Files (x86)\Microsoft Visual Studio\2022\Community",
    "C:\Program Files (x86)\Microsoft Visual Studio\18\Community"
)

$vsPath = $null
foreach ($path in $vsPaths) {
    if (Test-Path $path) {
        $vsPath = $path
        break
    }
}

if ($vsPath) {
    Write-Host "Visual Studio 2022 Community found!" -ForegroundColor Green
    
    # Try to find vcvars64.bat
    $vcvarsPath = Join-Path $vsPath "VC\Auxiliary\Build\vcvars64.bat"
    if (Test-Path $vcvarsPath) {
        Write-Host "C++ Build Tools found!" -ForegroundColor Green
        Write-Host "Attempting to rebuild better-sqlite3..." -ForegroundColor Cyan
        
        # Set environment variables for node-gyp
        $env:npm_config_msvs_version = "2022"
        
        # Try to rebuild
        npm rebuild better-sqlite3
    } else {
        Write-Host "C++ Build Tools not found. You need to install 'Desktop development with C++' workload." -ForegroundColor Yellow
        Write-Host "Please:" -ForegroundColor Yellow
        Write-Host "1. Open Visual Studio Installer" -ForegroundColor Yellow
        Write-Host "2. Click Modify on Visual Studio 2022 Community" -ForegroundColor Yellow
        Write-Host "3. Check 'Desktop development with C++' workload" -ForegroundColor Yellow
        Write-Host "4. Click Modify to install" -ForegroundColor Yellow
    }
} else {
    Write-Host "Visual Studio 2022 Community not found at expected path." -ForegroundColor Red
    Write-Host "Please install Visual Studio 2022 Community with C++ workload." -ForegroundColor Yellow
}

Write-Host "`nNote: You're using Node.js 24, but this project recommends Node.js 18-22." -ForegroundColor Yellow
Write-Host "Consider using nvm-windows to switch to Node.js 22 for better compatibility." -ForegroundColor Yellow
