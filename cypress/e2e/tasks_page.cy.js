describe('The solution page when click on Show Solution Detail link', () => {

    const project_data = {
        id: 1,
        name: 'Testing Project',
        tasks: [],
        users: [],
        categories:[{"id":0,"name":"Planning"}],
        output_history: []
    };

    before(() => {
        // Visiting the home page before each test
        cy.visit('/')
        // Set up with a Testing Project
        cy.window().then((win) => {
            win.localStorage.setItem('workload_project_data', JSON.stringify(project_data));
        });
    })
  
    it('starts create a new task by clicking New Task Button', () => {
        cy.get('#nav-tasks').as('navTasksButton');
        cy.get('@navTasksButton').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/tasks')
       
        // 1. click on new task link
        cy.get('#newTaskLink').click()

        // 2. Filling Create new task form
        // Find the 'Name' field by label and type into it
        cy.contains('p', 'Name').next('input').type('Task Name')
        // Find the 'Description' field by label and type into it
        cy.contains('p', 'Description').next('input').type('Task Description')
        // Selecting the first category in the dropdown
        cy.get('select').select('Planning')
        // Find the 'Weight' field by label and type into it
        cy.contains('p', 'Weight').next('input').type('5')
        // Click the Create Task button
        cy.get('#createTaskButton').click()

    })

})