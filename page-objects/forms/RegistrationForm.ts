import { Locator, Page, expect } from "@playwright/test";


export class RegistrationForm {
    readonly page: Page;

    readonly fieldName: Locator;
    readonly fieldLastName: Locator;
    readonly fieldEmail: Locator;
    readonly fieldPassword: Locator;
    readonly fieldReEnterPassword: Locator;
    readonly btnRegister: Locator;
    readonly errorMessage: Locator;
    readonly alert: Locator;


    constructor(page: Page) {
        this.page = page;
        
        this.fieldName = page.locator('[name="name"]');
        this.fieldLastName = page.locator('[name="lastName"]');
        this.fieldEmail = page.locator('[name="email"]');
        this.fieldPassword = page.locator('[name="password"]');
        this.fieldReEnterPassword = page.locator('[name="repeatPassword"]');
        this.btnRegister = page.getByText('Register');
        this.errorMessage = page.locator('.invalid-feedback > p');
        this.alert = page.locator('.alert-danger');
    }

    async fillRegistrationForm(name:string, lastName:string, email:string, password:string, reEnterPassword:string) {
        await this.fieldName.fill(name);
        await this.fieldLastName.fill(lastName);
        await this.fieldEmail.fill(email);
        await this.fieldPassword.fill(password);
        await this.fieldReEnterPassword.fill(reEnterPassword);    
    }

    async fillNameField(name:string) {
        await this.fieldName.fill(name);
        await this.fieldName.blur();   
    }

    async fillLastNameField(lastName:string) {
        await this.fieldLastName.fill(lastName);   
        await this.fieldLastName.blur();   
    }

    async fillEmailField(email:string) {
        await this.fieldEmail.fill(email);   
        await this.fieldEmail.blur();   
    }

    async fillPasswordField(password:string) {
        await this.fieldPassword.fill(password);   
        await this.fieldPassword.blur();   
    }

    async fillReEnterPasswordField(reEnterPassword:string) {
        await this.fieldReEnterPassword.fill(reEnterPassword);  
        await this.fieldReEnterPassword.blur();  
    }

    async submitRegistrationForm() {
        await this.btnRegister.click();
    }

    async getAlertText(){
        return this.alert.innerText();
    }

    async verifyErrorMessageTextAndRedColor(expectedText: string) {
        await expect(this.errorMessage).toHaveText(expectedText);
        const color = await this.errorMessage.evaluate(el => getComputedStyle(el).color);
        expect(color).toBe('rgb(220, 53, 69)');
    }

    /**
     * 
     * @param fieldName - should be one of this: Name, LastName, Email, Password, ReEnterPassword
     */
    async verifyFieldIsHighlightedByBorderColor(fieldName:string){
         
        let fieldLocator;

        if (fieldName == 'Name'){
            fieldLocator = this.fieldName;
        }
        if (fieldName == 'LastName'){
            fieldLocator = this.fieldLastName;
        }
        if (fieldName == 'Email'){
            fieldLocator = this.fieldEmail;
        }
        if (fieldName == 'Password'){
            fieldLocator = this.fieldPassword;
        }
        if (fieldName == 'ReEnterPassword'){
            fieldLocator = this.fieldReEnterPassword;
        }

        const borderColor = await fieldLocator.evaluate(el => getComputedStyle(el).borderColor);
        //expect(borderColor).toBe('rgb(220, 53, 69)');

    }
}