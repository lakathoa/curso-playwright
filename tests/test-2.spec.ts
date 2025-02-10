import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5502/');
  await page.getByRole('button', { name: 'Añadir al carrito' }).first().click();
  await page.getByRole('button', { name: 'Añadir al carrito' }).first().dblclick();
  await page.getByRole('button', { name: 'Añadir al carrito' }).first().click();
  await page.getByRole('button', { name: 'Añadir al carrito' }).first().click();
  await page.getByRole('button', { name: 'Añadir al carrito' }).nth(1).click();
  await page.getByRole('button', { name: 'Añadir al carrito' }).nth(2).click();
  await page.getByRole('button', { name: 'Ver Carrito' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Nombre:' }).click();
  await page.getByRole('textbox', { name: 'Nombre:' }).fill('ladt');
  await page.getByRole('textbox', { name: 'Nombre:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Correo electrónico:' }).fill('jlkdsjf@gmail');
  await page.getByRole('textbox', { name: 'Correo electrónico:' }).press('Enter');
  await page.getByRole('textbox', { name: 'Correo electrónico:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Dirección de entrega:' }).fill('dsfdsfs 112dsfd');
  await page.getByRole('textbox', { name: 'Dirección de entrega:' }).click();
  await page.locator('div').filter({ hasText: 'Información de pago' }).nth(2).click();
  await page.getByRole('link', { name: 'Información de pago' }).click();
});