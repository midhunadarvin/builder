import { expect } from '@playwright/test';
import { excludeTestFor, test } from '../helpers/index.js';

test.describe('State binding', () => {
  test.describe('inside repeater', () => {
    test('writing to state should update binding', async ({ page, packageName, sdk }) => {
      test.fail(
        excludeTestFor({ angular: true }, sdk),
        'Angular Gen2 event binding not working for other blocks than button.'
      );
      // hydration errors
      test.fail(packageName === 'gen1-next14-pages');

      // flaky, can't `test.fail()`
      test.skip(
        packageName === 'react-native' ||
          packageName === 'solid' ||
          packageName === 'solid-start' ||
          packageName === 'svelte' ||
          packageName === 'sveltekit' ||
          packageName === 'nextjs-sdk-next-app' ||
          packageName === 'vue' ||
          packageName === 'nuxt'
      );

      await page.goto('/state-binding/', { waitUntil: 'networkidle' });
      await expect(page.locator('text=initial Name')).toBeVisible();
      const buttonLocator = page.getByText('first');
      await expect(buttonLocator).toBeVisible();
      await buttonLocator.click();
      await expect(page.locator('text=repeated set')).toBeVisible();
    });
  });
});
