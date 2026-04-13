import { test, expect } from '@playwright/test';

test('should create a new note and display it in the list', async ({ page }) => {
  await page.goto('/');

  // Клікаємо "Створити нотатку"
  await page.click('a[href="/notes/new"]');
  await expect(page).toHaveURL('/notes/new');

  // Заповнюємо форму
  await page.fill('input[name="name"]', 'E2E Test Note');
  await page.fill('textarea[name="description"]', 'Created by Playwright test');

  // Чекаємо завантаження статусів і обираємо перший
  await page.waitForSelector('select[name="statusId"] option:not([value=""])');
  await page.selectOption('select[name="statusId"]', { index: 1 });

  // Сабмітимо форму
  await page.click('button[type="submit"]');

  // Маємо повернутись на головну і побачити нотатку
  await expect(page).toHaveURL('/');
  await expect(page.locator('text=E2E Test Note')).toBeVisible();
});