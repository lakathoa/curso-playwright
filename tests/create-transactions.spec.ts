import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('create transactions', async({page})=> {
    await page.goto('http://127.0.0.1:5500/login.html')

    await page.locator('input#username').fill('user') //localic el elemnto e ingrese el texto user
    await page.locator('input#password').fill('pass')
    await page.locator('//button[@type=\'submit\']').click()

    for(let i=0; i<=10; i++){
        await page.waitForTimeout(4_000)
        await page.locator('//button[contains(text(), \'Añadir transacción\')]').click()
        await page.waitForTimeout(4_000)

        await page.locator('id=date').fill('2025-02-07')
        await page.locator('id=amount').fill(faker.number.int({min: 100, max: 200}).toString())
        await page.locator('id=description').fill(faker.person.firstName())
        await page.locator('//button[contains(text(), \'Guardar\')]').click()
    }
    await page.pause()
})

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).click();
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  await page.getByRole('textbox', { name: 'Contraseña:' }).click();
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2025-02-10');
  await page.getByRole('spinbutton', { name: 'Monto:' }).click();
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('10000');
  await page.getByRole('textbox', { name: 'Descripción:' }).click();
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('test decp');
  await page.getByRole('button', { name: 'Guardar' }).click();
});