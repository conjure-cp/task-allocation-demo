describe("Generate solution for Project Management", () => {

  const project_data = {
    "id": 0,
    "name": "Project Management",
    "tasks": [
        {
            "id": 0,
            "name": " Code feature A",
            "description": "",
            "category": 0,
            "weight": 2
        },
        {
            "id": 1,
            "name": "Debug module B",
            "description": "",
            "category": 0,
            "weight": 3
        },
        {
            "id": 2,
            "name": "Write unit tests",
            "description": "",
            "category": 1,
            "weight": 1
        },
        {
            "id": 3,
            "name": "Conduct code review",
            "description": "",
            "category": 2,
            "weight": 5
        },
        {
            "id": 4,
            "name": "Document feature C",
            "description": "",
            "category": 2,
            "weight": 1
        }
    ],
    "users": [
        {
            "id": 0,
            "name": "Alice",
            "categories": [
                {
                    "id": 0,
                    "percentage": 0
                }
            ],
            "task_blacklist": [
                2,
                3,
                4
            ],
            "preferences": [
                0
            ]
        },
        {
            "id": 1,
            "name": "Bob",
            "categories": [
                {
                    "id": 0,
                    "percentage": 0
                }
            ],
            "task_blacklist": [
                2,
                3,
                4,
                0
            ],
            "preferences": [
                1
            ]
        },
        {
            "id": 2,
            "name": "Charlie",
            "categories": [
                {
                    "id": 1,
                    "percentage": 0
                }
            ],
            "task_blacklist": [
                0,
                1,
                4,
                3
            ],
            "preferences": [
                2
            ]
        },
        {
            "id": 3,
            "name": "David",
            "task_blacklist": [
                0,
                1,
                2
            ],
            "preferences": [
                3,
                4
            ],
            "categories": [
                {
                    "id": 2,
                    "percentage": 0
                }
            ]
        }
    ],
    "categories": [
        {
            "id": 0,
            "name": "Development"
        },
        {
            "id": 1,
            "name": "Testing"
        },
        {
            "id": 2,
            "name": "Documentation"
        }
    ],
    "locked_tasks": []
  };

  beforeEach(() => {
    cy.visit("/");
    cy.window().then((win) => {
      win.localStorage.setItem(
        "workload_project_data",
        JSON.stringify(project_data),
      );
    });
  });

  it("should successfully generate a solution for Project Management", () => {
    cy.get("#nav-solution").as("navSolutionButton");
    cy.get("@navSolutionButton").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/output");

    // Click on Generate Solution
    // [pending waiting server to back up]
  });
});

describe("Generate solution for Class Assignments in a School", () => {

  const school_project_data = {
    "id": 0,
    "name": "Class Assignments in a School",
    "tasks": [
        {
            "id": 0,
            "name": "Teach Math",
            "description": "",
            "category": 0,
            "weight": 4
        },
        {
            "id": 1,
            "name": " Teach Science",
            "description": "",
            "category": 0,
            "weight": 3
        },
        {
            "id": 2,
            "name": "Teach History",
            "description": "",
            "category": 0,
            "weight": 5
        },
        {
            "id": 3,
            "name": "Supervise Laboratory",
            "description": "",
            "category": 1,
            "weight": 2
        },
        {
            "id": 4,
            "name": "Monitor Recess",
            "description": "",
            "category": 1,
            "weight": 4
        }
    ],
    "users": [
        {
            "id": 0,
            "name": "Mr. Smith",
            "task_blacklist": [
                1,
                2,
                3,
                4
            ],
            "preferences": [
                0
            ],
            "categories": [
                {
                    "id": 0,
                    "percentage": 0
                }
            ]
        },
        {
            "id": 1,
            "name": "Ms. Johnson",
            "task_blacklist": [
                0,
                2,
                3,
                4
            ],
            "preferences": [
                1
            ],
            "categories": [
                {
                    "id": 0,
                    "percentage": 0
                }
            ]
        },
        {
            "id": 2,
            "name": "Mr. Brown",
            "task_blacklist": [
                0,
                1,
                3,
                4
            ],
            "preferences": [
                2
            ],
            "categories": [
                {
                    "id": 0,
                    "percentage": 0
                }
            ]
        }
    ],
    "categories": [
        {
            "id": 0,
            "name": "Teaching"
        },
        {
            "id": 1,
            "name": "Supervision"
        }
    ],
    "locked_tasks": []
  }
  

  beforeEach(() => {
    cy.visit("/");
    cy.window().then((win) => {
      win.localStorage.setItem(
        "workload_project_data",
        JSON.stringify(school_project_data),
      );
    });
  });

  it("should failed generate a solution for Class Assignments in a School", () => {
    cy.get("#nav-solution").as("navSolutionButton");
    cy.get("@navSolutionButton").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/output");

    // Click on Generate Solution
    // [pending waiting server to back up]
  });
});