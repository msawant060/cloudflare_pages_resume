# Resume Application Setup Script (Windows)
# This script helps set up the Docker environment for the resume application

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     Resume Application - Docker Setup                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

# Check Docker
$dockerInstalled = $false
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker is installed: $dockerVersion" -ForegroundColor Green
        $dockerInstalled = $true
    }
} catch {
    Write-Host "❌ Docker is not installed" -ForegroundColor Red
}

# Check Docker Compose
$composeInstalled = $false
try {
    $composeVersion = docker-compose --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Docker Compose is installed: $composeVersion" -ForegroundColor Green
        $composeInstalled = $true
    }
} catch {
    Write-Host "❌ Docker Compose is not installed" -ForegroundColor Red
}

Write-Host ""

if (-not $dockerInstalled -or -not $composeInstalled) {
    Write-Host "⚠️  Missing prerequisites. Please install:" -ForegroundColor Yellow
    Write-Host "  • Docker Desktop: https://www.docker.com/products/docker-desktop/" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

# Create .env file
Write-Host "📝 Setting up environment variables..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ Created .env file from .env.example" -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env.example not found" -ForegroundColor Red
    }
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""

# Create required directories
Write-Host "📁 Creating required directories..." -ForegroundColor Yellow
@(
    "backend",
    "nginx/conf.d"
) | ForEach-Object {
    if (-not (Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
        Write-Host "✅ Created directory: $_" -ForegroundColor Green
    }
}

Write-Host ""

# Build and start services
Write-Host "🚀 Building and starting services..." -ForegroundColor Yellow
Write-Host "This may take a few minutes on first run..." -ForegroundColor Gray
Write-Host ""

docker-compose build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build services" -ForegroundColor Red
    exit 1
}

docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start services" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check service status
Write-Host ""
Write-Host "📊 Service Status:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "✅ Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Access your applications:" -ForegroundColor Cyan
Write-Host "  • Frontend:   http://localhost:3000" -ForegroundColor Gray
Write-Host "  • Backend:    http://localhost:5000" -ForegroundColor Gray
Write-Host "  • API:        http://localhost/api" -ForegroundColor Gray
Write-Host "  • pgAdmin:    http://localhost:5050" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Default pgAdmin credentials:" -ForegroundColor Cyan
Write-Host "  • Email:      admin@example.com" -ForegroundColor Gray
Write-Host "  • Password:   admin" -ForegroundColor Gray
Write-Host ""
Write-Host "🔧 Useful commands:" -ForegroundColor Cyan
Write-Host "  • make help           - Show all available commands" -ForegroundColor Gray
Write-Host "  • docker-compose logs - View service logs" -ForegroundColor Gray
Write-Host "  • docker-compose ps   - Check service status" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 For more information, see DOCKER_README.md" -ForegroundColor Gray
