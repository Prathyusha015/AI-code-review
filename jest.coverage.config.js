{
  "coverageDirectory": "coverage",
  "coverageReporters": [
    "text",
    "text-summary",
    "lcov",
    "html",
    "json",
    "cobertura"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  },
  "collectCoverageFrom": [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/layout.tsx",
    "!app/page.tsx",
    "!app/globals.css",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**"
  ]
}
