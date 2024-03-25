import { faker } from '@faker-js/faker'

describe('git clone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5)
  }

  beforeEach(() => {
    cy.deleteProjectViaApi();
    cy.createProjectViaAPI(project)
  })

  it('Clone project via SSH', () =>{
    cy.cloneProjectViaSsh(project);
    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  });
});