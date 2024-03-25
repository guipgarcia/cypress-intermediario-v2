import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }
describe('Homepage scenarios', options ,()=>{
    const issue = {
        title : `issue-${faker.datatype.uuid()}`,
        description : faker.random.words(3),
        project : {
            name :  `project-${faker.datatype.uuid()}`,
            description : faker.random.words(5)
        }
    }

    const label = {
        name: `label-${faker.random.word()}`,
        color: '#ffaabb'
    }

    const milestone = {
        title: `milestone-${faker.random.word()}`
    }
    
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
        cy.createNewProjectViaHeader(issue.project);
    });

    it('Create a new issue', () =>{
        cy.createProjectViaAPI(issue.project);
        cy.createNewIssue(issue);
    });
    
    it('Create a new label', () =>{
        cy.createLabelViaAPI(issue, label);
        cy.addLabelToAnIssue(label);
    })

    it('Create a new milestone', () =>{
        cy.createMilestoneViaAPI(issue, milestone);
        cy.addMilestoneToAnIssue(milestone);
    });
});