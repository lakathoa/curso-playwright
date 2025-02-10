import {test, expect} from '@playwright/test'

test('registration', async({page}, testInfo)=> {

    await page.goto('http://127.0.0.1:5501/register.html')

    const name='Lady'
    const lasName='Orozco'
    const age='10'
    const country="Colombia"
    const email="test@gmail.com"
    const sex='M'

    await page.locator("id=name").fill(name)
    await page.locator("id=last-name").fill(lasName)
    await page.locator("xpath=//label[contains(., 'Edad')]/following-sibling::input").fill(age)
    await page.locator("id=country").selectOption(country)
    await page.locator(`input[value='${sex}']`).click()
    await page.locator("id=email").fill(email)
    await page.locator("id=monday").click()
    await page.locator("id=picture").setInputFiles('images/adtranLogo.jpeg')

    //await page.screenshot({path: 'screenshots/register1.png', fullPage: true})//de esta manera deja los pantallazos en la carpeta que especificamos 
                        //pero estas no se adjuntan al reporte. entonces mejor se usa lo siguiente

    await testInfo.attach('Resgister1', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })
    
    //Vamos a validar eventos 
    const [summaryPage] = await Promise.all(
        [
            page.waitForEvent('popup'),
            page.locator("id=save-btn").click()
        ]
    )

    await summaryPage.waitForLoadState()
    await expect(summaryPage).toHaveTitle('Summary')
    
    const currentName = await summaryPage.locator("//strong[contains(., 'Nombre')]/ancestor::p").textContent() //Captura todo el renglón 
    const currentLastName = await summaryPage.locator("//strong[contains(., 'Apellido')]/ancestor::p").textContent()
    const currentAge = await summaryPage.locator("//strong[contains(., 'Edad')]/ancestor::p").textContent()

    expect(currentName).toContain(name)//en este caso no se usa toEqual(name) debido a que el locator está capturando todo el renglón
    expect(currentLastName).toContain(lasName)
    expect(currentAge).toContain(age)

    //await summaryPage.screenshot({path: 'screenshots/summary.png', fullPage: true})

    await testInfo.attach('summary', {
        body: await summaryPage.screenshot(),
        contentType: 'image/png'
    })

    await page.pause()

})