#!/bin/bash

# CodeAnt AI Coverage Verification Script

echo "🔍 Verifying CodeAnt AI Coverage Setup..."
echo ""

# Check if coverage directory exists
if [ -d "coverage" ]; then
    echo "✅ Coverage directory exists"
else
    echo "❌ Coverage directory not found. Run 'npm run test:coverage' first."
    exit 1
fi

# Check for cobertura XML file
if [ -f "coverage/cobertura-coverage.xml" ]; then
    echo "✅ cobertura-coverage.xml found"
    
    # Get file size
    file_size=$(wc -c < "coverage/cobertura-coverage.xml")
    echo "📊 File size: $file_size bytes"
    
    # Check XML structure
    if grep -q "<?xml version" "coverage/cobertura-coverage.xml"; then
        echo "✅ Valid XML format detected"
    else
        echo "❌ Invalid XML format"
        exit 1
    fi
    
    # Check for coverage data
    if grep -q "coverage" "coverage/cobertura-coverage.xml"; then
        echo "✅ Coverage data present"
    else
        echo "❌ No coverage data found"
        exit 1
    fi
    
else
    echo "❌ cobertura-coverage.xml not found"
    echo "💡 Make sure Jest is configured with 'cobertura' reporter"
    exit 1
fi

# Check for other coverage files
echo ""
echo "📁 Coverage files present:"
ls -la coverage/ | grep -E "\.(xml|html|json|info)$"

echo ""
echo "🎉 CodeAnt AI integration is ready!"
echo "📤 Upload file: coverage/cobertura-coverage.xml"
echo "🔗 GitHub Actions workflow: .github/workflows/coverage.yml"
