import {test, expect} from '@playwright/test'
import { LoginPage } from '../page-objects/login/LoginPage';
import { AddTransactionPage } from '../page-objects/transacctions/AddTransactionPage';
import { faker } from '@faker-js/faker';
import { NavigateTo } from '../page-objects/navigate/NavigateTo';

test('login', async({page})=> {

    await test.step('Navigate to login page', async() => {
        const navigateTo = new NavigateTo(page)
        await navigateTo.loginPage()
    })

    const transactionDate = '2025-02-01'
    const transactionAmount = faker.number.int({min: 500, max: 5000}).toString()
    const transactionDescription = faker.food.description()

    await test.step('Login', async() => {
        const loginPage = new LoginPage (page)
        await loginPage.doLogin('user', 'pass')
    })
    
    await test.step('Add Transaction', async() => {
        const addTransactionPage = new AddTransactionPage (page) //instancia de la clase
        await addTransactionPage.addTransaction(transactionDate, transactionAmount, transactionDescription)

        expect(await addTransactionPage.getActualDate("1")).toEqual(transactionDate)
        expect(await addTransactionPage.getActualAmount("1")).toEqual(transactionAmount)
        expect(await addTransactionPage.getActualDescription("1")).toEqual(transactionDescription)
    })
    

    //await page.pause()
});

/*
test('login', async({page})=> {
    //await page.goto('http://127.0.0.1:5500/login.html')

    const navigateTo = new NavigateTo(page)
    await navigateTo.loginPage()

    /*await page.locator('input#username').fill('user') //localic el elemnto e ingrese el texto user
    await page.locator('input#password').fill('pass')
    await page.locator('//button[@type=\'submit\']').click()

    const loginPage = new LoginPage (page)
    /* Estos los dejo de ejemplo, anteriormente el¿n la clase se habían dejado públicos pero cambiaron a privados
    await loginPage.fillUsername()
    await loginPage.fillPassword()
    await loginPage.clickOnLoginButton()

    //ahora vamos a hacer uso de la funcion doLogin
    await loginPage.doLogin('user', 'pass')

    /////////TERMINA EL LOGIN///////

    /*await page.waitForTimeout(4_000)
    await page.locator('//button[contains(text(), \'Añadir transacción\')]').click()
    await page.waitForTimeout(4_000)

    await page.locator('id=date').fill('2025-02-07')
    await page.locator('id=amount').fill('120000')
    await page.locator('id=description').fill('test')
    await page.locator('//button[contains(text(), \'Guardar\')]').click()

    const addTransactionPagePage = new AddTransactionPage (page) //instancia de la clase
    const transactionDate = '2025-02-01'
    const transactionAmount = faker.number.int({min: 500, max: 5000}).toString()
    const transactionDescription = faker.food.description()
    await addTransactionPagePage.addTransaction(transactionDate, transactionAmount, transactionDescription)

    const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
    const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
    const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()

    expect(actualDate).toEqual(transactionDate)
    expect(actualAmount).toEqual(transactionAmount)
    expect(actualDescription).toEqual(transactionDescription)

    //await page.pause()
});
*/