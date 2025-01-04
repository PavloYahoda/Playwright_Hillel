import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { RegistrationForm } from '../page-objects/forms/RegistrationForm';
import { GaragePage } from '../page-objects/pages/GaragePage';
import { UserData } from '../testData/UserData';


test.describe('User registration', () => {
    
    let homePage: HomePage;
    let garagePage: GaragePage;
    let registrationForm: RegistrationForm;
    const testUser = UserData.generateRandomUser();

    test.beforeEach(async ({ page }) => {
        
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
        homePage = new HomePage(page);
        registrationForm = new RegistrationForm(page);
        await homePage.openRegisterForm();
    });

    test.describe('Success scenario', () => {
        test('User registration with valid data', async ({ page }) => {
            garagePage = new GaragePage(page);
            await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, testUser.email, testUser.password, testUser.password);
            await registrationForm.submitRegistrationForm();
            await page.waitForLoadState('networkidle');
            const pageTitle = await garagePage.getTitle();
            const pageAlert = await garagePage.getAlertText();
            expect (pageTitle).toBe('Garage');
            expect (pageAlert).toBe('Registration complete');
        });
    });

    test.describe('Fail scenarios', () => {
        test('User already exists', async ({ page }) => {          
            await registrationForm.fillRegistrationForm('John', 'Gaspar', 'john.gaspar@mail.com', testUser.password, testUser.password);
            await registrationForm.submitRegistrationForm();
            const alertText = await registrationForm.getAlertText();
            expect(alertText).toBe('User already exists');
        });
        test.describe('Name field validations', () => {
            test('Empty field: Name is required', async ({ page }) => {
                await registrationForm.fillNameField('');
                await registrationForm.verifyErrorMessageTextAndRedColor('Name required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });
            test('Wrong data: Name is invalid', async ({ page }) => {
                await registrationForm.fillNameField('John Gaspar');
                await registrationForm.verifyErrorMessageTextAndRedColor('Name is invalid');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });
            test('Wrong lenght (1 character) of Name', async ({ page }) => {
                await registrationForm.fillNameField('J');
                await registrationForm.verifyErrorMessageTextAndRedColor('Name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });
            test('Wrong lenght (21 characters) of Name', async ({ page }) => {
                await registrationForm.fillNameField('JohnGasparJohnGasparJ');
                await registrationForm.verifyErrorMessageTextAndRedColor('Name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });     
        });
        test.describe('Last Name field validations', () => {
            test('Empty field: Last Name is required', async ({ page }) => {
                await registrationForm.fillLastNameField('');
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });
            test('Wrong data: Last Name is invalid', async ({ page }) => {
                await registrationForm.fillLastNameField('John Gaspar');
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name is invalid');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });
            test('Wrong lenght (1 character) of Last Name', async ({ page }) => {
                await registrationForm.fillLastNameField('J');
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });
            test('Wrong lenght (21 characters) of Last Name', async ({ page }) => {
                await registrationForm.fillLastNameField('JohnGasparJohnGasparJ');
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });     
        });
        test.describe('Email field validation', () => {
            test('Empty field: Email is required', async ({ page }) => {
                await registrationForm.fillEmailField('');
                await registrationForm.verifyErrorMessageTextAndRedColor('Email required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Email');
            });
            test('Wrong data (no @)', async ({ page }) => {
                await registrationForm.fillEmailField('john.gaspargmail.com');
                await registrationForm.verifyErrorMessageTextAndRedColor('Email is incorrect');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Email');
            });
            test('Wrong data (two @)', async ({ page }) => {
                await registrationForm.fillEmailField('john@gaspar@gmail.com');
                await registrationForm.verifyErrorMessageTextAndRedColor('Email is incorrect');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Email');
            });
            test('Wrong data (no dot after @)', async ({ page }) => {
                await registrationForm.fillEmailField('john.gaspar@gmailcom');
                await registrationForm.verifyErrorMessageTextAndRedColor('Email is incorrect');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Email');
            });
        });
        test.describe('Password field validation', () => {
            test('Empty field: Password is required', async ({ page }) => {
                await registrationForm.fillPasswordField('');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Password');
            });
            test('Wrong lenght of password (7 characters)', async ({ page }) => {
                await registrationForm.fillPasswordField('Sj4v_f8');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Password');
            });
            test('Wrong lenght of password (16 characters)', async ({ page }) => {
                await registrationForm.fillPasswordField('Sj4v_f8#Sj4v_f8!');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Password');
            });
            test('Wrong data (no capital letter)', async ({ page }) => {
                await registrationForm.fillPasswordField('sj4v_f8#');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Password');
            });
            test('Wrong data (no small letter)', async ({ page }) => {
                await registrationForm.fillPasswordField('SJ4V_F8#');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Password');
            });
            test('Wrong data (no integer)', async ({ page }) => {
                await registrationForm.fillPasswordField('SJaV_Fn#');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Password');
            });
        });
        test.describe('Re-Enter Password field validation', () => {
            test('Empty field: Re-Enter Password is required', async ({ page }) => {
                await registrationForm.fillReEnterPasswordField('');
                await registrationForm.verifyErrorMessageTextAndRedColor('Re-enter password required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
            test('Wrong lenght of Re-Enter Password (7 characters)', async ({ page }) => {
                await registrationForm.fillReEnterPasswordField('Sj4v_f8');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
            test('Wrong lenght of Re-Enter Password (16 characters)', async ({ page }) => {
                await registrationForm.fillReEnterPasswordField('Sj4v_f8#Sj4v_f8!');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
            test('Wrong data of Re-Enter Password (no capital letter)', async ({ page }) => {
                await registrationForm.fillReEnterPasswordField('sj4v_f8#');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
            test('Wrong data of Re-Enter Password(no small letter)', async ({ page }) => {
                await registrationForm.fillReEnterPasswordField('SJ4V_F8#');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
            test('Wrong data of Re-Enter Password(no integer)', async ({ page }) => {
                await registrationForm.fillReEnterPasswordField('SJaV_Fn#');
                await registrationForm.verifyErrorMessageTextAndRedColor('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
            test('Match: Password and Re-Enter password are not the same', async ({ page }) => {
                await registrationForm.fillPasswordField('SJaV_Fn#1');
                await registrationForm.fillReEnterPasswordField('SJaV_Fn#2');
                await registrationForm.verifyErrorMessageTextAndRedColor('Passwords do not match');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('ReEnterPassword');
            });
        });
        test.describe('Register button validations: some field is empty', () => {
            test('Empty Name, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm('', testUser.lastName, testUser.email, testUser.password, testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Empty Last Name, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, '', testUser.email, testUser.password, testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Empty Email, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, '', testUser.password, testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Empty Password, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, testUser.email, '', testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Empty Re-Enter Password, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, testUser.email, testUser.password, '');
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
        });
        test.describe('Register button validations: some field is incorrect', () => {
            test('Name is incorrect, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm('John Gaspar', testUser.lastName, testUser.email, testUser.password, testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Last Name is incorrect, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, 'John Gaspar', testUser.email, testUser.password, testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Email is incorrect, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, 'john@gaspar@gmail.com', testUser.password, testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Password is incorrect, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, testUser.email, 'Sj4v', testUser.password);
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
            test('Re-Enter Password is incorrect, other are correct', async ({ page }) => {
                await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, testUser.email, testUser.password, 'Sj4v');
                await registrationForm.verifyRegisterButtonIsDisabled();
            });
        });   
    });
});
