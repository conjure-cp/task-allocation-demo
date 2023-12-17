describe('The solution page when click on Show Solution Detail link', () => {

    const project_data = {
        id: 1,
        name: 'Testing Project',
        tasks: [],
        users: [],
        categories: [],
        output_history: []
    };

    beforeEach(() => {
        // Visiting the home page before each test
        cy.visit('/')
        // Set up with a Testing Project
        cy.window().then((win) => {
            win.localStorage.setItem('workload_project_data', JSON.stringify(project_data));
        });
    })
  
    it('navigates to tasks and checks UI elements', () => {
        cy.get('#nav-tasks').should('be.visible').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/tasks')
    })

    it('starts creating new tasks by clicking on the New Task button', () => {
        cy.get('#nav-tasks').should('be.visible').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/tasks')
    })
  
 
  
})
  