const options = { env: { snapshotOnly: true } }
describe('Gitlab login scenarios', options, () => {
  beforeEach(() =>{
    cy.deleteProjectViaApi();
    cy.visit('localhost')
    cy.title().should('eq', 'Sign in · GitLab');
  });

  it('Login with right credentials', () => {
    cy.loginWithRightCredentials();
  });

  it('Login with wrong username' , ()=>{
    cy.loginWithWrongUsername();
  });
  
  it('Login with wrong password' , ()=>{
    cy.loginWithWrongPassword();
  });

  it('Login with empty username', () =>{
    cy.loginWithEmptyUsername();
  });

  it('Login with empty password', () =>{
   cy.loginWithEmptyPassword();
  });

  it('Login with empty credentials', () =>{
    cy.loginWithEmptyCredentials();
  });
})