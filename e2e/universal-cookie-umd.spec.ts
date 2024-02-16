import { test, expect } from '@playwright/test';

declare global {
  const UniversalCookie: any; // should import the right type but was not able to make it work
}

test('UMD build works properly', async ({ page }) => {
  await page.goto('/');
  await page.addScriptTag({
    path: './packages/universal-cookie/umd/universalCookie.js',
  });

  const result = await page.evaluate(() => {
    const cookies = new UniversalCookie();
    cookies.set('testCookie', 'helloWorld');
    const retrievedValue = cookies.get('testCookie');
    return retrievedValue;
  });

  expect(result).toBe('helloWorld');

  const cookieValue = await page.evaluate(() =>
    new UniversalCookie().get('testCookie'),
  );
  expect(cookieValue).toBe('helloWorld');
});

test('UMD minified build works properly', async ({ page }) => {
  await page.goto('/');
  await page.addScriptTag({
    path: './packages/universal-cookie/umd/universalCookie.min.js',
  });

  const result = await page.evaluate(() => {
    const cookies = new UniversalCookie();
    cookies.set('testCookie', 'helloWorld');
    const retrievedValue = cookies.get('testCookie');
    return retrievedValue;
  });

  expect(result).toBe('helloWorld');

  const cookieValue = await page.evaluate(() =>
    new UniversalCookie().get('testCookie'),
  );
  expect(cookieValue).toBe('helloWorld');
});
