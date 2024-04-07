describe("Creating a new Category on the Category Page", () => {
  const project_data = {
    id: 1,
    name: "Testing Project",
    tasks: [],
    users: [],
    categories: [],
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

  it("navigates to categories and checks UI elements", () => {
    cy.get("#nav-categories").as("navCategoryButton");
    cy.get("@navCategoryButton").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/categories");

    // 1. click on new task link
    cy.get("#newCategoryLink").click();

    // 2. Filling Create new Category form
    // Find the 'Name' field by label and type into it
    cy.contains("p", "Name").next("input").type("Planning");
    // Click the Create Category button
    cy.get("#createCategoryButton").click();
  });
});
