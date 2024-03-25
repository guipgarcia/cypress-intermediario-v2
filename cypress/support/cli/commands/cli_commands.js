Cypress.Commands.add('cloneProjectViaSsh', project =>{
    const domain = Cypress.config('baseUrl').replace('http://', '')
    
    cy.exec(`cd cypress/downloads/ && git clone git@${domain}:${Cypress.env('user_name')}/${project.name}.git`, { failOnNonZeroExit: false })
});