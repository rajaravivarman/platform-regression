# Platform Regression

A comprehensive test automation framework for platform regression testing, built with modern testing tools and best practices.

## Project Description

This repository contains automated test suites designed to ensure platform stability and catch regressions across different environments. The framework supports multiple testing scenarios including API testing, UI testing, and smoke tests to validate critical application functionality.

## Features

- Automated regression testing
- Cross-browser compatibility testing
- API endpoint validation
- Smoke test coverage for critical paths
- Detailed test reporting and analytics
- CI/CD integration ready

## Playwright Smoke Test Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rajaravivarman/platform-regression.git
   cd platform-regression
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Configuration

1. Copy the environment configuration file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your environment-specific values:
   ```
   BASE_URL=https://your-platform-url.com
   TEST_USER_EMAIL=test@example.com
   TEST_USER_PASSWORD=your-test-password
   ```

3. Configure test settings in `playwright.config.js` if needed:
   - Browser settings
   - Timeout configurations
   - Test directories
   - Report formats

### Running Smoke Tests

#### Run all smoke tests:
```bash
npm run test:smoke
```

#### Run smoke tests in headless mode:
```bash
npm run test:smoke:headless
```

#### Run smoke tests with specific browser:
```bash
# Chrome
npx playwright test --project=chromium tests/smoke/

# Firefox
npx playwright test --project=firefox tests/smoke/

# Safari
npx playwright test --project=webkit tests/smoke/
```

#### Run specific smoke test file:
```bash
npx playwright test tests/smoke/login.spec.js
```

### Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

### Smoke Test Coverage

Our smoke tests cover the following critical scenarios:

- ✅ User authentication (login/logout)
- ✅ Homepage loading and navigation
- ✅ Core API endpoints availability
- ✅ Database connectivity
- ✅ Payment gateway integration
- ✅ Search functionality
- ✅ User profile operations
- ✅ File upload/download features

### Debugging Tests

For debugging failed tests:

1. Run tests in headed mode:
   ```bash
   npx playwright test --headed
   ```

2. Use debug mode:
   ```bash
   npx playwright test --debug
   ```

3. Generate trace files:
   ```bash
   npx playwright test --trace on
   ```

### CI/CD Integration

This project includes GitHub Actions workflows for:

- Running smoke tests on pull requests
- Scheduled daily regression runs
- Multi-environment test execution
- Automatic test report generation

### Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests following the existing patterns
4. Ensure all tests pass
5. Submit a pull request

### Test Structure

```
tests/
├── smoke/              # Smoke test suites
├── regression/         # Full regression tests
├── api/               # API-specific tests
├── utils/             # Test utilities and helpers
└── fixtures/          # Test data and fixtures
```

### Support

For questions or issues:
- Create an issue in this repository
- Check the existing documentation
- Review the test examples in the `/tests` directory

### License

This project is licensed under the MIT License - see the LICENSE file for details.
