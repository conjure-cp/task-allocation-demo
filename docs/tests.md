# Testing Documentation for Task-Allocation Demo

### Test 1: Render the Home Page When Opening the Demo

#### Context 1: When No Project Data Exists

| Test Case             | Description                                     | Steps                                            |
|-----------------------|-------------------------------------------------|--------------------------------------------------|
|  **Check for Complete UI**      | Verifies that the options to create or import a project are displayed when no project data is present. | Visit the home page and check for the presence of the 'Create Project' button and the option to import an existing project.  |
| **Create a New Project** | Tests the functionality to create a new project and ensures staying on the home page after creation. | Visit the home page, enter a project name, click the 'Create Project' button, and verify the URL.                            |
| **Import a Project**  | Tests the functionality to import a project.                                                     | [Wait to be tested]                                                                                                        |


#### Context 2: When Project Data Exists

| Test Case             | Description                                     | Steps                                            |
|-----------------------|-------------------------------------------------|--------------------------------------------------|
|  **Check for Complete UI**     | Ensures that project data and options are correctly displayed when project data is present. | Visit the home page, check for the display of project data, and verify the presence of 'Export Project' and 'Delete Project' buttons.  | 

### Test 2: Creating a New Category on the Category Page

| Test Case             | Description                                     | Steps                                           |
|-----------------------|-------------------------------------------------|-------------------------------------------------|
| **Navigate to Categories and Check UI Elements**| Tests the ability to navigate to the categories page and check the UI elements.           | Navigate to the categories page, click on 'New Category' link, enter a category name, and click the 'Create Category' button.    |


### Test 3: Creating a New Task on the Task Page
| Test Case             | Description                                     | Steps                                           |
|-----------------------|-------------------------------------------------|-------------------------------------------------|
| **Start Creating a New Task**        | Tests the creation of a new task by filling out the task creation form.     | Navigate to the tasks page, click on 'New Task' link, fill out the task form with name, description, category, and weight, and click the 'Create Task' button. |

### Test 4: Creating a New User on the User Page
| Test Case             | Description                                     | Steps                                           |
|-----------------------|-------------------------------------------------|-------------------------------------------------|
| **Start Creating a New User**        | Tests the creation of a new user through a multi-step form.                       | Navigate to the users page, click on 'New User' link, fill out the user form including name and task preferences, and click the 'Create User' button.  |

### Test 5: Getting solution for Satisfiable Project Tests

**Project Setup:**
- **Project**: Project Management in a Software Development Team
- **Scenario**: Allocating various development tasks among team members based on their skills, availability, and current workload.

**Project Data:**

**Tasks:**

| Task ID | Task Name           | Category      | Weight |
|---------|---------------------|---------------|--------|
| 0       | Code Feature A      | Development   | 2      |
| 1       | Debug Module B      | Development   | 3      |
| 2       | Write Unit Tests    | Testing       | 1      |
| 3       | Conduct Code Review | Documentation | 5      |
| 4       | Document Feature C  | Documentation | 1      |

**Users:**

| User ID | Name   | Preferences | Allowed Tasks | Blacklisted Tasks                  |
|---------|--------|-------------|---------------|-----------------------------------|
| 0       | Alice  | Development | Code Feature A | Write Unit Tests, Code Review, Doc C |
| 1       | Bob    | Development | Debug Module B | Code Feature A, Unit Tests, Code Review, Doc C |
| 2       | Charlie| Testing     | Write Unit Tests | Code Feature A, Debug B, Code Review, Doc C |
| 3       | David  | Documentation| Code Review, Doc C | Code Feature A, Debug B, Unit Tests |

**Categories:**

| Category ID | Name           |
|-------------|----------------|
| 0           | Development    |
| 1           | Testing        |
| 2           | Documentation  |


**Test Steps:**

1. Load the satisfiable project data into the system.
2. Navigate to Solution page by clicking `get Solution Detail` Link
3. Click on `Generate Solution` Button to generate solution
4. Render the solution on the page

**Note**

Step 4 wait to be tested when server is back up

### Test 6: Getting solution for Unsatisfiable Project Tests

**Project Setup:**
- **Project**: Class Assignments in a School
- **Scenario**: Scenario: Assigning subjects to teachers based on their specialisations and schedule availability. The problem is unsatisfiable due to lack of supervision stuffs.

**Project Data:**

**Tasks:**

| Task ID | Task Name           | Category    | Weight |
|---------|---------------------|-------------|--------|
| 0       | Teach Math          | Teaching    | 4      |
| 1       | Teach Science       | Teaching    | 3      |
| 2       | Teach History       | Teaching    | 5      |
| 3       | Supervise Laboratory| Supervision | 2      |
| 4       | Monitor Recess      | Supervision | 4      |

**Users:**

| User ID | Name        | Preferences | Allowed Task  | Blacklisted Tasks                                   |
|---------|-------------|-------------|---------------|----------------------------------------------------|
| 0       | Mr. Smith   | Teaching    | Teach Math    | Teach Science, Teach History, Supervise Lab, Monitor Recess |
| 1       | Ms. Johnson | Teaching    | Teach Science | Teach Math, Teach History, Supervise Lab, Monitor Recess |
| 2       | Mr. Brown   | Teaching    | Teach History | Teach Math, Teach Science, Supervise Lab, Monitor Recess |

**Categories:**

| Category ID | Name       |
|-------------|------------|
| 0           | Teaching   |
| 1           | Supervision|

**Test Steps:**

1. Load the unsatisfiable project data into the system.
2. Navigate to Solution page by clicking `get Solution Detail` Link
3. Click on `Generate Solution` Button to generate solution
4. Render the failed prompt on the page

**Note**

Step 4 wait to be tested when server is back up