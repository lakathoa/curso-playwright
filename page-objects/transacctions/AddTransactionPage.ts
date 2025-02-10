import { Locator, Page } from "@playwright/test"

export class AddTransactionPage{

    private readonly addTransacctionButton: Locator
    private readonly transactionDate: Locator
    private readonly transactionAmount: Locator
    private readonly transactionDescription: Locator
    private readonly saveTransactionButton: Locator

    private readonly page:Page
    private actualDateRow: Locator
    private actualAmountRow: Locator
    private actualDescriptionRow: Locator

    //El constructor es lo que se llama cuando se hace una instancia de esta clase
    constructor(page: Page){ 
        this.page = page
        this.addTransacctionButton = page.locator('//button[contains(text(), \'Añadir transacción\')]')
        this.transactionDate = page.locator('id=date')
        this.transactionAmount = page.locator('id=amount')
        this.transactionDescription = page.locator('id=description')
        this.saveTransactionButton = page.locator('//button[contains(text(), \'Guardar\')]')
    }


    async addTransaction(transactionDate: string, transactionAmount: string, transactionDescription: string){
        await this.addTransacctionButton.page().waitForTimeout(4000);
        await this.addTransacctionButton.click()
        await this.transactionDate.page().waitForTimeout(4000);
        await this.transactionDate.fill(transactionDate)
        await this.transactionAmount.fill(transactionAmount)
        await this.transactionDescription.fill(transactionDescription)
        await this.saveTransactionButton.click()
    }

    async getActualDate(row: string){
        this.actualDateRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[1]`)
        return await this.actualDateRow.textContent()
    }

    async getActualAmount(row: string){
        this.actualAmountRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[2]`)
        return await this.actualAmountRow.textContent()
    }

    async getActualDescription(row: string){
        this.actualDescriptionRow = this.page.locator(`//tbody[@id='transactions-list']//tr[${row}]//td[3]`)
        return await this.actualDescriptionRow.textContent()
    }

}