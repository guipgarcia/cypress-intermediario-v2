// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPageElements from '../pages/login_page';
const map = new LoginPageElements;
let username = Cypress.env("user_name"),
password = Cypress.env("user_password");


Cypress.Commands.add('login', ({cacheSession = true } = {},) => {
    const login = () => {
        cy.visit('/users/sign_in')
        cy.loginWithRightCredentials();
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.eq', '/users/sign_in')
    }

    const options ={
        cacheAcrossSpecs: true,
        validate,
    }
    
    if (cacheSession) {
        cy.session(username, login, options)
      } else {
        login()
      }
});


Cypress.Commands.add('loginWithRightCredentials', function(){
    cy.fillUsername(username)
    cy.fillPassword(password);
    cy.clickSignInButton();
    cy.title().should('eq', 'Projects · Dashboard · GitLab')
    cy.get(map.user_avatar()).should('be.visible');
});

Cypress.Commands.add('loginWithWrongUsername', ()=>{
    cy.fillUsername(username+"wrong")
    cy.fillPassword(password)
    cy.clickSignInButton();
    cy.get(map.failed_login()).should('have.text', 'Invalid Login or password.');
});

Cypress.Commands.add('loginWithWrongPassword', ()=>{
    cy.fillUsername(username)
    cy.fillPassword(password+"wrong")
    cy.clickSignInButton();
    cy.get(map.failed_login()).should('be.visible').should('have.text', 'Invalid Login or password.');
});

Cypress.Commands.add('loginWithEmptyUsername', ()=>{
    cy.fillPassword(password)
    cy.clickSignInButton();
    cy.get(map.login_required()).should('be.visible').should('have.text', 'This field is required.');
});

Cypress.Commands.add('loginWithEmptyPassword', ()=>{
    cy.fillUsername(username)
    cy.clickSignInButton();
    cy.get(map.password_required()).should('be.visible').should('have.text', 'This field is required.');
});

Cypress.Commands.add('loginWithEmptyCredentials', ()=>{
    cy.clickSignInButton();
    cy.get(map.login_required()).should('be.visible').should('have.text', 'This field is required.');
    cy.get(map.password_required()).should('be.visible').should('have.text', 'This field is required.');
});


// ### REUSABLES ###//
Cypress.Commands.add('fillUsername', function(username){
    cy.get(map.login_field()).should('be.visible')
    .type(username).should('have.value', username)
});

Cypress.Commands.add('fillPassword', function(password){
    cy.get(map.password_field()).should('be.visible')
    .type(password, {log: false})
});

Cypress.Commands.add('clickSignInButton', ()=>{
    cy.get(map.sign_in_button()).should('be.visible')
    .click();
});