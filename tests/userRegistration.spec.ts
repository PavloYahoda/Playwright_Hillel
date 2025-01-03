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
        await homePage.openRegisterForm();
    });

    test.describe('Success scenario', () => {
        test('User registration with valid data', async ({ page }) => {
            registrationForm = new RegistrationForm(page);
            garagePage = new GaragePage(page);
            await registrationForm.fillRegistrationForm(testUser.firstName, testUser.lastName, testUser.email, testUser.password);
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
            registrationForm = new RegistrationForm(page);
            await registrationForm.fillRegistrationForm('John', 'Gaspar', 'john.gaspar@mail.com', testUser.password);
            await registrationForm.submitRegistrationForm();
            const alertText = await registrationForm.getAlertText();
            expect(alertText).toBe('User already exists');
        });
        test.describe('Name field validations', () => {
            test('Empty field: Name is required', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm('', testUser.lastName, testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Name required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });
            test('Wrong data: Name is invalid', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm('John Gaspar', testUser.lastName, testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Name is invalid');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });
            test('Wrong lenght (1 character) of Name', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm('J', testUser.lastName, testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });
            test('Wrong lenght (21 characters) of Name', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm('JohnGasparJohnGasparJ', testUser.lastName, testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('Name');
            });     
        });
        test.describe('Last Name field validations', () => {
            test('Empty field: Last Name is required', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm(testUser.firstName, '', testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name required');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });
            test('Wrong data: Last Name is invalid', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm(testUser.firstName, 'John Gaspar', ,testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name is invalid');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });
            test('Wrong lenght (1 character) of Last Name', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm(testUser.firstName, 'J',testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });
            test('Wrong lenght (21 characters) of Last Name', async ({ page }) => {
                registrationForm = new RegistrationForm(page);
                await registrationForm.fillRegistrationForm(testUser.firstName, 'JohnGasparJohnGasparJ',testUser.email, testUser.password);
                await registrationForm.verifyErrorMessageTextAndRedColor('Last name has to be from 2 to 20 characters long');
                await registrationForm.verifyFieldIsHighlightedByBorderColor('LastName');
            });     
        });     
    });
});
