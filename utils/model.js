export function createSolverMappings(projectData) {
  const taskToSolver = createDenseIdMap(projectData.tasks);
  const userToSolver = createDenseIdMap(projectData.users);
  const categoryToSolver = createDenseIdMap(projectData.categories);

  return {
    taskToSolver,
    solverToTask: invertMap(taskToSolver),
    userToSolver,
    solverToUser: invertMap(userToSolver),
    categoryToSolver,
    solverToCategory: invertMap(categoryToSolver),
  };
}

function createDenseIdMap(items) {
  return items.reduce((acc, item, index) => {
    acc[item.id] = index + 1;
    return acc;
  }, {});
}

function invertMap(map) {
  return Object.entries(map).reduce((acc, [id, solverId]) => {
    acc[solverId] = parseInt(id);
    return acc;
  }, {});
}

export function convertInput(
  projectData,
  mappings = createSolverMappings(projectData),
) {
  return {
    nb_tasks: projectData.tasks.length,
    nb_users: projectData.users.length,
    nb_categories: projectData.categories.length,
    tasks: projectData.tasks.reduce((acc, cur) => {
      acc[mappings.taskToSolver[cur.id]] = {
        category: mappings.categoryToSolver[cur.category],
        weight: cur.weight,
      };
      return acc;
    }, {}),
    users: projectData.users.reduce((acc, cur) => {
      acc[mappings.userToSolver[cur.id]] = {
        forbidden_tasks: cur.task_blacklist.map(
          (x) => mappings.taskToSolver[x],
        ),
        task_preferences: cur.preferences.map((x) => mappings.taskToSolver[x]),
        category_percentages: cur.categories.reduce((catAcc, catCur) => {
          catAcc[mappings.categoryToSolver[catCur.id]] = catCur.percentage;
          return catAcc;
        }, {}),
      };
      return acc;
    }, {}),
    partial_assignment: projectData.locked_tasks
      ? projectData.locked_tasks.reduce((acc, cur) => {
          const uiAssignment = projectData.output_history.find(
            (oh) => oh.output_id === projectData.current_selected_output_id,
          ).solution.assignment;
          const userId = parseInt(uiAssignment[cur + 1]) - 1;

          acc[mappings.taskToSolver[cur]] = mappings.userToSolver[userId];
          return acc;
        }, {})
      : [],
  };
}

export function convertSolutionToProjectIds(solution, mappings) {
  if (!solution.assignment) {
    return solution;
  }

  return {
    ...solution,
    assignment: Object.entries(solution.assignment).reduce(
      (acc, [solverTaskId, solverUserId]) => {
        const taskId = mappings.solverToTask[solverTaskId];
        const userId = mappings.solverToUser[solverUserId];

        acc[taskId + 1] = userId + 1;
        return acc;
      },
      {},
    ),
  };
}

export const SUBMIT_URL = "https://conjure-aas.cs.st-andrews.ac.uk/submit";
export const GET_URL = "https://conjure-aas.cs.st-andrews.ac.uk/get";

export const ESSENCE_MODEL = `
language Essence 1.3

letting M be 1000000

given nb_tasks: int
given nb_users: int
given nb_categories: int

letting TASK be domain int(1..nb_tasks)
letting USER be domain int(1..nb_users)
letting CATEGORY be domain int(1..nb_categories)

given tasks:
        function (total) TASK --> record {category : CATEGORY, weight : int}
given users:
        function (total) USER -->
            record {category_percentages : function CATEGORY --> int,
                    forbidden_tasks : set of TASK,
                    task_preferences : sequence of TASK}


find assignment : function (total) TASK --> USER
find user_tasks : function (total) USER --> set of TASK

$ channelling
such that forAll (t,u) in assignment . t in user_tasks(u)
such that forAll (u,ts) in user_tasks . forAll t in ts . assignment(t) = u


$ weights
find user_total_weight : function (total) USER --> int(0..M)
such that
    [ user_total_weight(u) = sum([ tasks(t)[weight] | t <- user_tasks(u) ])
    | u : USER
    ]

find weight_violations : int(0..M)
such that
    weight_violations =
    sum([ |user_total_weight(u1) - user_total_weight(u2)|
        | u1 : USER
        , u2 : USER
        , u1 < u2
        ])

$ category_percentages
find category_counts : function (total) USER --> function (total) CATEGORY --> int(0..nb_tasks)
such that
    [ category_counts(u)(c) = sum t in ts . toInt(c = tasks(t)[category])
    | (u,ts) <- user_tasks
    , c : CATEGORY
    ]
find category_violations : int(0..M)
$ add up the absolute values of (u1/c1 - u2/c2) for every u,c pair
such that
    category_violations =
    sum([ |c1percent * category_counts(u2)(c2) -
           c2percent * category_counts(u1)(c1)|
        | u1 : USER
        , (c1, c1percent) <- users(u1)[category_percentages]
        , u2 : USER
        , (c2, c2percent) <- users(u2)[category_percentages]
        , (u1, c1) <lex (u2, c2)
        ])

$ forbidden_tasks
such that
    [assignment(t) != u | (u, rec) <- users, t <- rec[forbidden_tasks]]

$ task_preferences
find preference_violations : int(0..M)
$ count the number of places where i is not in the user_tasks set, but j is
such that
    preference_violations =
    sum([ toInt(!(i in user_tasks(u)) /\\ j in user_tasks(u))
        | u : USER
        , i : int(1..|users(u)[task_preferences]|)
        , j : int(1..|users(u)[task_preferences]|)
        , i < j
        ])


find opt : int(1..M)
such that opt = 1000 * weight_violations + category_violations + 100 * preference_violations
minimising opt



given partial_assignment : function TASK --> USER
such that forAll (t, u) in partial_assignment . assignment(t) = u`;
