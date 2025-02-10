import {test, expect} from '@playwright/test'

test('registration', async({page})=> {

    await page.goto('http://127.0.0.1:5501/register.html')

    await page.locator("id=name").fill('Lady')
    await page.locator("id=last-name").fill('Orozco')
    await page.locator("xpath=//label[contains(., 'Edad')]/following-sibling::input").fill('10')
    await page.locator("id=country").selectOption('Colombia')
    await page.locator("input[value='F']").click()
    await page.locator("id=email").fill('test@gmail.com')
    await page.locator("id=monday").click()
    await page.locator("id=picture").setInputFiles('images/adtranLogo.jpeg')
    
    //Vamos a validar eventos 
    const [summaryPage] = await Promise.all(
        [
            page.waitForEvent('popup'),
            page.locator("id=save-btn").click()
        ]
    )

    await summaryPage.waitForLoadState()
    await expect(summaryPage).toHaveTitle('Summary')
    

    await page.pause()

})