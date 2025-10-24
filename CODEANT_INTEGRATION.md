# CodeAnt AI Integration Guide

This project is configured to upload Jest coverage metrics to CodeAnt AI for automated code review and analysis.

## 📁 Coverage Files Generated

When you run `npm run test:coverage`, the following files are generated in the `/coverage` directory:

```
coverage/
├── lcov-report/           # HTML visualization
├── cobertura-coverage.xml # CodeAnt AI upload format
├── coverage-final.json    # JSON format
├── lcov.info             # LCOV format
└── index.html            # Coverage dashboard
```

## 🔧 Configuration

### Jest Configuration
The Jest configuration in `jest.config.js` includes:
- **Cobertura Reporter**: Generates `cobertura-coverage.xml`
- **Coverage Thresholds**: 50% minimum coverage
- **Coverage Directory**: `coverage/`
- **File Inclusion**: All TypeScript/JavaScript files in `app/`

### Package.json Scripts
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests for CI/CD with coverage

## 🚀 GitHub Actions Integration

### Workflow File
The GitHub Actions workflow (`.github/workflows/coverage.yml`) is configured to:
1. Run tests with coverage on push/PR to main/dev branches
2. Upload coverage data to CodeAnt AI
3. Use the `cobertura-coverage.xml` file for upload

### Required Setup
1. **Get CodeAnt AI Access Token**:
   - Sign up at [CodeAnt AI](https://codeant.ai)
   - Generate an access token from your dashboard

2. **Add GitHub Secret**:
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CODEANT_ACCESS_TOKEN`
   - Value: Your CodeAnt AI access token

## 📊 Coverage Metrics

### Current Coverage Status
- **Overall Coverage**: 65.15% statements, 56% branches, 52.17% functions, 64.28% lines
- **Flip Cards Component**: 95.55% statements, 82.35% branches, 100% functions, 97.29% lines
- **Utility Functions**: 100% coverage across all metrics

### Coverage Thresholds
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

## 🔍 How CodeAnt AI Uses Coverage Data

CodeAnt AI analyzes the `cobertura-coverage.xml` file to:
- Identify untested code paths
- Suggest test improvements
- Provide code quality insights
- Generate automated code reviews
- Track coverage trends over time

## 🛠️ Manual Testing

### Run Coverage Locally
```bash
# Run tests with coverage
npm run test:coverage

# Check generated files
ls coverage/
```

### Verify Cobertura XML
```bash
# Check if cobertura file exists
ls coverage/cobertura-coverage.xml

# View XML content (first 20 lines)
head -20 coverage/cobertura-coverage.xml
```

## 📈 Improving Coverage

### Add More Tests
1. Create test files in `__tests__/` directories
2. Test edge cases and error conditions
3. Add integration tests for complex components
4. Use `npm run test:watch` for TDD workflow

### Coverage Best Practices
- Aim for 80%+ coverage on critical components
- Focus on testing business logic over UI elements
- Use meaningful test descriptions
- Mock external dependencies appropriately

## 🔗 Resources

- [CodeAnt AI Documentation](https://docs.codeant.ai)
- [Jest Coverage Documentation](https://jestjs.io/docs/configuration#coveragereporters-arraystring--string-options)
- [Cobertura XML Format](http://cobertura.sourceforge.net/xml/coverage-04.dtd)
