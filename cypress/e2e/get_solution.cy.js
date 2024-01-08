describe("Generate solution when click on get solution link", () => {
  const project_data = {
    id: 1,
    name: "Testing Project",
    tasks: [],
    users: [],
    categories: [],
    output_history: [],
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
});
