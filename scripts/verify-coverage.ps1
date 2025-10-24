# CodeAnt AI Coverage Verification Script (PowerShell)

Write-Host "🔍 Verifying CodeAnt AI Coverage Setup..." -ForegroundColor Cyan
Write-Host ""

# Check if coverage directory exists
if (Test-Path "coverage") {
    Write-Host "✅ Coverage directory exists" -ForegroundColor Green
} else {
    Write-Host "❌ Coverage directory not found. Run 'npm run test:coverage' first." -ForegroundColor Red
    exit 1
}

# Check for cobertura XML file
if (Test-Path "coverage/cobertura-coverage.xml") {
    Write-Host "✅ cobertura-coverage.xml found" -ForegroundColor Green
    
    # Get file size
    $fileSize = (Get-Item "coverage/cobertura-coverage.xml").Length
    Write-Host "📊 File size: $fileSize bytes" -ForegroundColor Yellow
    
    # Check XML structure
    $xmlContent = Get-Content "coverage/cobertura-coverage.xml" -Raw
    if ($xmlContent -match "<?xml version") {
        Write-Host "✅ Valid XML format detected" -ForegroundColor Green
    } else {
        Write-Host "❌ Invalid XML format" -ForegroundColor Red
        exit 1
    }
    
    # Check for coverage data
    if ($xmlContent -match "coverage") {
        Write-Host "✅ Coverage data present" -ForegroundColor Green
    } else {
        Write-Host "❌ No coverage data found" -ForegroundColor Red
        exit 1
    }
    
} else {
    Write-Host "❌ cobertura-coverage.xml not found" -ForegroundColor Red
    Write-Host "💡 Make sure Jest is configured with 'cobertura' reporter" -ForegroundColor Yellow
    exit 1
}

# Check for other coverage files
Write-Host ""
Write-Host "📁 Coverage files present:" -ForegroundColor Cyan
Get-ChildItem "coverage" -Filter "*.xml" | ForEach-Object { Write-Host "  📄 $($_.Name)" -ForegroundColor White }
Get-ChildItem "coverage" -Filter "*.html" | ForEach-Object { Write-Host "  🌐 $($_.Name)" -ForegroundColor White }
Get-ChildItem "coverage" -Filter "*.json" | ForEach-Object { Write-Host "  📋 $($_.Name)" -ForegroundColor White }
Get-ChildItem "coverage" -Filter "*.info" | ForEach-Object { Write-Host "  ℹ️ $($_.Name)" -ForegroundColor White }

Write-Host ""
Write-Host "🎉 CodeAnt AI integration is ready!" -ForegroundColor Green
Write-Host "📤 Upload file: coverage/cobertura-coverage.xml" -ForegroundColor Yellow
Write-Host "🔗 GitHub Actions workflow: .github/workflows/coverage.yml" -ForegroundColor Yellow