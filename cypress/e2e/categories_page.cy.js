describe('Navigation to categories pages from the home page', () => {

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
  
    it('navigates to categories and checks UI elements', () => {
      // Click on the sidebar button for navigating to the page
      cy.get('[data-testid="sidebar-button-for-page-name"]').click()
  
      // Check if URL is updated correctly
      cy.url().should('include', '/page-name')
  
      // Check for UI elements specific to [Page Name]
      // Example: cy.get('[data-testid="specific-element"]').should('exist')
  
      // Add more assertions as per your page's UI and functionalities
    })
  
    // Repeat the structure for other pages
    it('navigates to [Another Page Name] and checks UI elements', () => {
      // Similar structure as above, tailored for another page
    })
  
    // Add more tests for each page you want to test through the sidebar
  })
  