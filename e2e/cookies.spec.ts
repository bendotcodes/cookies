import { test, expect } from '@playwright/test';

test('load and save cookies', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Hello Pacman' }),
  ).toBeHidden();

  await page.getByRole('textbox').fill('Pacman');
  await expect(
    page.getByRole('heading', { name: 'Hello Pacman' }),
  ).toBeVisible();

  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Hello Pacman' }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(
    page.getByRole('heading', { name: 'Hello Pacman' }),
  ).toBeHidden();
});
