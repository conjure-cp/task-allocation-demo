describe('The home page when opening the demo', () => {
  it('displays the home page', () => {
    // 1. Visit the home page
    cy.visit('/')

    // 2. Check for a text box for the project name and type a test project name
    cy.get('input[name="projectName"]').type('Test Project Name')

    // 3. Test clicking buttons on the sidebar
    // Assuming you have identifiers (like id, class, or data-testid) for these buttons
    // For example, using a class `.sidebar-button`
    // Replace '.sidebar-button' with the actual identifier of your sidebar buttons
    cy.get('.sidebar-button').each(button => {
      cy.wrap(button).click()
      // Assert that the URL hasn't changed (staying on the home page)
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    // 4. Click button: create project
    // Replace '.create-project-button' with the actual identifier of your 'Create Project' button
    cy.get('.create-project-button').click()

    // 5. Assert that after creating a new project, we stay at the home page
    cy.url().should('include', '/')

    // 6. Describe the components on this page
    // Here you can add assertions for different components present on your home page
    // For example, checking for a header, footer, or other specific elements
    // Replace '.header' and '.footer' with actual identifiers of your components
    cy.get('.header').should('be.visible')
    cy.get('.footer').should('be.visible')

    // 7. go to /tasks when click on click Tasks button on the sidebar
    // 7.1 describe the components on the click page

    // 7. go to /users when click on click Users button on the sidebar
    // 7.1 describe the components on the click page

    // 7. go to /tasks when click on click button on the sidebar
    // 7.1 describe the components on the click page

    // 7. go to /tasks when click on click button on the sidebar
    // 7.1 describe the components on the click page

  })
})
