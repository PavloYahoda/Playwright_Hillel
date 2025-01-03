import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
/*

/// <reference types="cypress" />

const randomUser = Cypress.Helper.generateRandomUser();

//Locators:
const btnSignUp = '.btn-primary';
const fieldName = "[name='name']";
const fieldLastName = "[name='lastName']";
const fieldEmail = "[name='email']";
const fieldPassword = "[name='password']";
const fieldReEnterPassword = "[name='repeatPassword']";
const errorMessage = '.invalid-feedback > p';
const btnRegister = 'Register';
const btnLogOut = '.btn.btn-link.text-danger.btn-sidebar.sidebar_btn';
const alert = '.alert-danger';


describe('Register form validations', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {

            auth: {

                username: 'guest',

                password: 'welcome2qauto',

            },
        });
        cy.get(btnSignUp).click();
    });

    describe('Name field validations', () => {
        it('Empty field: Name is required. Also check text color, border color', () => {
            cy.get(fieldName)
                .focus()
                .blur();

            cy.get(errorMessage)
                .should('include.text', 'Name required')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data: Name is invalid.  Also check text color, border color', () => {
            cy.get(fieldName)
                .type('John Gaspar ')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Name is invalid')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong lenght (1 character): Name has to be from 2 to 20 characters long.  Also check text color, border color', () => {
            cy.get(fieldName)
                .type('J')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Name has to be from 2 to 20 characters long')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong lenght (21 characters): Name has to be from 2 to 20 characters long.  Also check text color, border color', () => {
            cy.get(fieldName)
                .type('JohnGasparJohnGasparJ')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Name has to be from 2 to 20 characters long')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    describe('Last Name field validations', () => {
        it('Empty field: Last name is required. Also check text color, border color', () => {
            cy.get(fieldLastName)
                .focus()
                .blur();

            cy.get(errorMessage)
                .should('include.text', 'Last name required')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldLastName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data: Last name is invalid.  Also check text color, border color', () => {
            cy.get(fieldLastName)
                .type('John Gaspar ')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Last name is invalid')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldLastName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong lenght (1 character): Last name has to be from 2 to 20 characters long.  Also check text color, border color', () => {
            cy.get(fieldLastName)
                .type('J')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Last name has to be from 2 to 20 characters long')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldLastName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong lenght (21 characters): Last name has to be from 2 to 20 characters long.  Also check text color, border color', () => {
            cy.get(fieldLastName)
                .type('JohnGasparJohnGasparJ')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Last name has to be from 2 to 20 characters long')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldLastName).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    describe('Email field validation', () => {
        it('Empty field: Email is required. Also check text color, border color', () => {
            cy.get(fieldEmail)
                .focus()
                .blur();

            cy.get(errorMessage)
                .should('include.text', 'Email required')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldEmail).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no @): Email is incorrect', () => {
            cy.get(fieldEmail)
                .type('john.gaspargmail.com')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Email is incorrect')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldEmail).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (two @): Email is incorrect', () => {
            cy.get(fieldEmail)
                .type('john@gaspar@gmail.com')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Email is incorrect')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldEmail).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no dot after @): Email is incorrect', () => {
            cy.get(fieldEmail)
                .type('john.gaspar@gmailcom')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Email is incorrect')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldEmail).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    describe('Password field validation', () => {
        it('Empty field: Password is required. Also check text color, border color', () => {
            cy.get(fieldPassword)
                .focus()
                .blur();

            cy.get(errorMessage)
                .should('include.text', 'Password required')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Wrong lenght (7 characters): Password is incorrect', () => {
            cy.get(fieldPassword)
                .type('Sj4v_f8')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Wrong lenght (16 characters): Password is incorrect', () => {
            cy.get(fieldPassword)
                .type('Sj4v_f8#Sj4v_f8!')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no capital letter): Password is incorrect', () => {
            cy.get(fieldPassword)
                .type('sj4v_f8#')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no small letter): Password is incorrect', () => {
            cy.get(fieldPassword)
                .type('SJ4V_F8#')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no integer): Password is incorrect', () => {
            cy.get(fieldPassword)
                .type('SJaV_Fn#')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    describe('Re-enter password field validation', () => {
        it('Empty field: Re-Enter password is required. Also check text color, border color', () => {
            cy.get(fieldReEnterPassword)
                .focus()
                .blur();

            cy.get(errorMessage)
                .should('include.text', 'Re-enter password required')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong lenght (7 characters): Re-Enter password is incorrect', () => {
            cy.get(fieldReEnterPassword)
                .type('Sj4v_f8')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Wrong lenght (16 characters): Re-Enter password is incorrect', () => {
            cy.get(fieldReEnterPassword)
                .type('Sj4v_f8#Sj4v_f8!')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no capital letter): Re-Enter password is incorrect', () => {
            cy.get(fieldReEnterPassword)
                .type('sj4v_f8#')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no small letter): Re-Enter password is incorrect', () => {
            cy.get(fieldReEnterPassword)
                .type('SJ4V_F8#')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Wrong data (no integer): Re-Enter password is incorrect', () => {
            cy.get(fieldReEnterPassword)
                .type('SJaV_Fn#')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('Match: Password and Re-Enter password are not the same', () => {
            cy.get(fieldPassword).type('Sj4v_f8#');

            cy.get(fieldReEnterPassword)
                .type('Sj4v_f8!')
                .tab();

            cy.get(errorMessage)
                .should('include.text', 'Passwords do not match')
                .and('have.css', 'color', 'rgb(220, 53, 69)');

            cy.get(fieldReEnterPassword).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });
    describe('Register button validations: some field is empty', () => {
        it('Empty Name, other are correct', () => {
            //cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Empty Last Name, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            //cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Empty Email, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            //cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Empty Password, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            //cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Empty Re-Enter password, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            //cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
    });
    describe('Register button validations: some field is incorrect', () => {
        it('Name is incorrect, other are correct', () => {
            cy.get(fieldName).type('John Gaspar');           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Last Name is incorrect, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type('John Gaspar');           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Email is incorrect, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type('john@gaspar@gmail.com');           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Password is incorrect, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
        it('Re-Enter password is incorrect, other are correct', () => {
            cy.get(fieldName).type(randomUser.firstName);           
            cy.get(fieldLastName).type(randomUser.lastName);           
            cy.get(fieldEmail).type(randomUser.email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8!');           
            cy.get('.btn-primary').contains('Register').should('have.attr', 'disabled');
        });
    });
    describe('User creation validations', () => {

        let email = randomUser.email;

        it('Create user with correct data', () => {
            cy.get(fieldName).type('John');           
            cy.get(fieldLastName).type('Gaspar');           
            cy.get(fieldEmail).type(email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').click();
            cy.get('h1').contains('Garage').should('be.visible');
            cy.get(btnLogOut).click();
        });
        it('User already exists', () => {
            cy.get(fieldName).type('John');           
            cy.get(fieldLastName).type('Gaspar');           
            cy.get(fieldEmail).type(email);           
            cy.get(fieldPassword).type('Sj4v_f8#');           
            cy.get(fieldReEnterPassword).type('Sj4v_f8#');           
            cy.get('.btn-primary').contains('Register').click();
            cy.get(alert)
            .should('include.text', 'User already exists')
            .and('have.css', 'color', 'rgb(114, 28, 36)');
        });
    });
});

*/