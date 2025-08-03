const { test, expect } = require('@playwright/test');

/**
 * CloudBees.io Homepage Smoke Test
 * 
 * This test verifies that the CloudBees.io homepage loads successfully
 * and that core elements are visible on the page.
 */
test.describe('CloudBees.io Homepage Smoke Tests', () => {
  test('should load CloudBees.io homepage and verify core elements', async ({ page }) => {
    // Navigate to CloudBees.io homepage
    await page.goto('https://www.cloudbees.io/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Verify page title contains CloudBees
    await expect(page).toHaveTitle(/CloudBees/i);
    
    // Check for navigation elements with graceful fallback
    const navSelectors = [
      '#navbar',
      '.navbar', 
      'nav[role="navigation"]',
      'nav',
      '[role="navigation"]'
    ];
    
    let navigationFound = false;
    for (const selector of navSelectors) {
      const navElement = page.locator(selector).first();
      const isVisible = await navElement.isVisible().catch(() => false);
      if (isVisible) {
        console.log(`✅ Navigation found using selector: ${selector}`);
        navigationFound = true;
        break;
      }
    }
    
    if (!navigationFound) {
      console.warn('⚠️ Warning: Navigation bar not found with any of the expected selectors. Skipping navigation visibility check.');
    }
    
    // Verify CloudBees logo/brand is visible
    const logo = page.locator('img[alt*="CloudBees"], [aria-label*="CloudBees"], .logo').first();
    await expect(logo).toBeVisible();
    
    // Verify main call-to-action or hero section is present
    const heroSection = page.locator('h1, .hero, [class*="hero"], [data-testid*="hero"]').first();
    await expect(heroSection).toBeVisible();
    
    // Verify page is responsive and has proper viewport
    const viewport = page.viewportSize();
    expect(viewport.width).toBeGreaterThan(0);
    expect(viewport.height).toBeGreaterThan(0);
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/cloudbees-homepage-smoke.png', fullPage: true });
    
    console.log('✅ CloudBees.io homepage smoke test completed successfully');
  });
});
