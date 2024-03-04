const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`
Cypress.Commands.add('getAllProjects', ()=>{
    cy.request({
        method: 'GET',
        url: `/api/v4/projects/`,
        headers: {Authorization: accessToken}
    });
});

Cypress.Commands.add('createProjectViaAPI', project=>{
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/`,
        body:{
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },
        headers: {Authorization: accessToken}
    });
});

Cypress.Commands.add('deleteProjectViaApi', ()=>{
    cy.getAllProjects().then(response =>
            response.body.forEach(project =>
            cy.request({
                method: 'DELETE',
                url: `/api/v4/projects/${project.id}`,
                headers: {Authorization: accessToken}
            })
        )
    );
});

Cypress.Commands.add('createIssueViaAPI', issue=>{
    let id;
    cy.createProjectViaAPI(issue.project).then(response=>
        cy.request({
            method:'POST',
            url: `/api/v4/projects/${response.body.id}/issues`,
            body:{
                title: issue.title,
                description: issue.description
            },
            headers: {Authorization: accessToken}
    }))
});
