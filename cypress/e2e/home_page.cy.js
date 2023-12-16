describe('The home page when opening the demo', () => {
  context('when no project data exists', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
    })

    // 1. check for ui
    it('should display options to create or import a project', () => {
      cy.visit('/')
      // Check for the presence of the 'Create Project' button
      cy.contains('Create Project').should('exist')
      // Check for the presence of the import project option
      cy.contains('...or import an existing project').should('exist')
    })

    // 2. create a new project
    it('allows creating a new project', () => {
      cy.visit('/');
      // Check for a text box for the project name and type a test project name
      cy.get('input[name="projectName"]').type('Test Project Name')
      cy.get('#createProjectButton').click()
      // Assert that after creating a new project, we stay at the home page
      cy.url().should('include', '/')

    });

    // 3 importing a project
    it('allows importing a project', () => {
        cy.visit('/');
        // Steps for testing project import
    });

    it('stays at dashboard page when click on the tasks link', () => {
      cy.get('#nav-tasks').should('be.visible').click()
      cy.url().should('eq', '/')
    })
  
    it('stays at dashboard page when click on the users link', () => {
      cy.get('#nav-users').should('be.visible').click()
      cy.url().should('eq', '/')
    })
  
    it('stays at dashboard page when click on the categories link', () => {
      cy.get('#nav-categories').should('be.visible').click()
      cy.url().should('eq', '/')
    })
  })

  context('when project data exists', () => {

    const project_data = {
      id: 1,
      name: 'Testing Project',
      tasks: [],
      users: [],
      categories: [],
      output_history: []
    };

    beforeEach(() => {
      // assuming after the previous test, the project data is stored already
      cy.window().then((win) => {
        win.localStorage.setItem('workload_project_data', JSON.stringify(project_data));
      });
    })

    // 1. check for complete ui
    it('should display project data and options', () => {
      cy.visit('/')

      // 1.1 Content Section
      // Check for the display of project data (KPIs, project name, etc.)
      cy.get('div').contains('Tasks').should('exist')
      cy.get('div').contains('Users').should('exist')
      // complete additional checks for other KPIs and project data here

      // Check for the presence of 'Export Project' and 'Delete Project' buttons
      cy.get('#exportProjectButton').should('exist')
      cy.get('#deleteProjectButton').should('exist')

    })

    it('navigates to the Tasks page', () => {
      cy.get('#nav-tasks').debug().click();
      cy.url().should('include', '/tasks')
    })
  
    it('navigates to the Users page', () => {
      cy.get('#nav-users').should('be.visible').click()
      cy.url().should('include', '/users')
    })
  
    it('navigates to the Categories page', () => {
      cy.get('#nav-categories').should('be.visible').click()
      cy.url().should('include', '/categories')
    })

    it('return to the dashboard', () => {
      cy.get('#nav-project').should('be.visible').click()
      cy.url().should('eq', '/')
    })
  })
})