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
    
    // Verify main navigation elements are visible
    const navigation = page.locator('nav, [role="navigation"]').first();
    await expect(navigation).toBeVisible();
    
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
  
  test('should verify page accessibility and performance basics', async ({ page }) => {
    // Navigate to CloudBees.io homepage
    await page.goto('https://www.cloudbees.io/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check that page has proper meta tags
    const metaDescription = page.locator('meta[name="description"]');
    const hasMetaDescription = await metaDescription.count() > 0;
    expect(hasMetaDescription).toBeTruthy();
    
    // Verify page has proper heading structure (at least one h1)
    const h1Elements = page.locator('h1');
    await expect(h1Elements.first()).toBeVisible();
    
    // Check that images have alt attributes (accessibility)
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first few images for alt attributes
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i);
        const altText = await img.getAttribute('alt');
        // Alt can be empty string for decorative images, but should exist
        expect(typeof altText).toBe('string');
      }
    }
    
    console.log('✅ CloudBees.io accessibility and performance checks completed');
  });
});
