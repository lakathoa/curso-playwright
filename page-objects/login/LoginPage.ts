import { Locator, Page } from "playwright"

export class LoginPage {

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator

    //El constructor es lo que se llama cuando se hace una instancia de esta clase
    constructor(page: Page){ 
        this.usernameTextbox = page.locator('input#username')
        this.passwordTextbox = page.locator('input#password')
        this.loginButton = page.locator('//button[@type=\'submit\']')
    }

    /*
    //metodos se djan públicos para der verlos desde el test
    async fillUsername(){
        await this.usernameTextbox.fill('user')
    }

    async fillPassword(){
        await this.passwordTextbox.fill('pass')
    }

    async clickOnLoginButton(){
        await this.loginButton.click()
    }
    //Hasta este punto sólo se ha definido, faltaría rear la instancia */

    //Vamos a mejorar el código
    private async fillUsername(username: string){
        await this.usernameTextbox.fill(username)
    }

    private async fillPassword(password: string){
        await this.passwordTextbox.fill(password)
    }

    private async clickOnLoginButton(){
        await this.loginButton.click()
    }

    async doLogin(username: string, password: string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLoginButton()
    }
    

}