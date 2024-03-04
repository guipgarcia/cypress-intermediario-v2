import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }
describe('Homepage scenarios', options ,()=>{
    beforeEach(() =>{
        cy.deleteProjectViaApi();
        cy.visit('localhost');
        cy.title().should('eq', 'Sign in · GitLab');
        cy.login();
      });

    it('Logout from GitLab', ()=>{
        cy.logoutFromApplication();
    });
    
    it('Create a new project', ()=> {
        const project = {
            name :  `project-${faker.datatype.uuid()}`,
            description : faker.random.words(5)
        }
        cy.createNewProjectViaHeader(project);
    });

    it('Create a new issue', () =>{
        const issue = {
            name : `issue-${faker.datatype.uuid()}`,
            description : faker.random.words(3),
            project : {
                name :  `project-${faker.datatype.uuid()}`,
                description : faker.random.words(5)
            }
        }
        cy.createProjectViaAPI(issue.project);
        cy.createNewIssue(issue);
    });



    
});