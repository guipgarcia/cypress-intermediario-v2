
import HomePageElements  from "../pages/home_page";
const map = new HomePageElements;

Cypress.Commands.add('logoutFromApplication', ()=>{
    cy.visit('http://localhost/')
    cy.get(map.user_avatar())
    .should('be.visible').click();

    cy.get(map.sign_out_option())
    .should('be.visible').click();

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
});


Cypress.Commands.add('createNewProjectViaHeader', project=>{
    cy.visit('/projects/new')

    cy.get(map.project_name()).should('be.visible')
    .type(project.name).should('have.value', project.name);

    cy.get(map.project_description()).should('be.visible')
    .type(project.description).should('have.value', project.description);

    cy.get(map.init_with_read_me()).should('be.visible')
    .check().should('be.checked');

    cy.get(map.create_project_button()).should('be.visible').click();

    cy.get(map.project_created_with_success_message()).should('be.visible').should('have.text', "Project '"+project.name+"' was successfully created.");
});


Cypress.Commands.add('createNewIssue', issue =>{
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`);

    cy.get(map.issue_title()).should('be.visible')
    .type(issue.name).should('have.value', issue.name)

    cy.get(map.issue_description()).should('be.visible')
    .type(issue.description).should('have.value', issue.description)

    cy.get(map.submit_issue()).should('be.visible')
    .click();

    cy.get(map.issue_created_with_success_message()).should('have.text', issue.name)
});
