import { faker } from '@faker-js/faker'
describe('Home tests via API',()=>{
    beforeEach(()=>{
        cy.deleteProjectViaApi()
    });

    it('Create a project via API', ()=>{
        const project ={
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.createProjectViaAPI(project)
        .then(response=>{
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal(project.name);
            expect(response.body.description).to.equal(project.description);
        });
    });

    it.only('Create an issue via API',()=>{
        const issue = {
           title: `issue-${faker.datatype.uuid()}`,
           description: faker.random.words(3),
           project:{
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
           }     
        }
        cy.createIssueViaAPI(issue).then(response=>{
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(issue.title);
            expect(response.body.description).to.equal(issue.description);
        });
    })
});