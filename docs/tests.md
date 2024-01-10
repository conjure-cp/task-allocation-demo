# Testing Documentation for Task-Allocation Demo

## Testing Scenarios

### Creating item from each Page

**Test Steps:**

### Getting solution for Satisfiable Project Tests

**Project Setup:**
- **Project**: Project Management in a Software Development Team
- **Scenario**: Allocating various development tasks among team members based on their skills, availability, and current workload.

**Project Data:**

**Tasks:**

| Task ID | Task Name           | Category      | Weight |
|---------|---------------------|---------------|--------|
| 0       | Code Feature A      | Development   | 2      |
| 1       | Debug Module B      | Development   | 3      |
| 2       | Write Unit Tests    | Testing       | 1    |
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


**JSON Object:**

```javascript
{
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
}
```

**Test Steps:**

1. Load the satisfiable project data into the system.
2. Navigate to Solution page by clicking `get Solution Detail` Link
3. Click on `Generate Solution` Button to generate solution
4. Render the solution on the page

### Getting solution for Unsatisfiable Project Tests

Getting Solution for Unsatisfiable Project Tests
Project: Class Assignments in a School

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

```javascript

{
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
```

