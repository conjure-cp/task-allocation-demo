describe("Creating a new user on the User Page", () => {
  const project_data = {
    id: 0,
    name: "Testing Project",
    tasks: [{ id: 0, name: "Task", description: "Descrption", weight: 1 }],
    users: [],
    categories: [{ id: 0, name: "Planning" }],
    output_history: [],
    locked_tasks: [],
  };

  beforeEach(() => {
    // Visiting the home page before each test
    cy.visit("/");
    // Set up with a Testing Project
    cy.window().then((win) => {
      win.localStorage.setItem(
        "workload_project_data",
        JSON.stringify(project_data),
      );
    });
  });

  it("starts creating a new user by clicking New User Button", () => {
    cy.get("#nav-users").as("navUserButton");
    cy.get("@navUserButton").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/users");

    // 1. click on new user link
    cy.get("#newUserLink").click();

    // Step 1
    // Filling Create new user form
    // Find the 'Name' field by label and type into it
    cy.contains("p", "Name").next("input").type("User Name");

    cy.get("#continueButton").click();

    // Step 2
    cy.get("#continueButton").click();

    // Step 3
    cy.get("#continueButton").click();

    // Step 4
    // Select the first task from the dropdown
    cy.get("#taskPerference select").then(($select) => {
      // Get the value of the first option
      const firstOptionValue = $select.find("option").eq(1).val();

      // Select the first option using its value
      cy.get("#taskPerference select").select(firstOptionValue);
    });

    // Click the 'Create User' button
    cy.get("#continueButton").click();
  });
});
