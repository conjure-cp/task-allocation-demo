export function convertInput(projectData) {
  return {
    nb_tasks: projectData.tasks.length,
    nb_users: projectData.users.length,
    nb_categories: projectData.categories.length,
    tasks: projectData.tasks.reduce((acc, cur) => {
      acc[cur.id + 1] = { category: cur.category + 1, weight: cur.weight };
      return acc;
    }, {}),
    users: projectData.users.reduce((acc, cur) => {
      acc[cur.id + 1] = {
        forbidden_tasks: cur.task_blacklist.map((x) => x + 1),
        task_preferences: cur.preferences.map((x) => x + 1),
        category_percentages: cur.categories.reduce((catAcc, catCur) => {
          catAcc[catCur.id + 1] = catCur.percentage;
          return catAcc;
        }, {}),
      };
      return acc;
    }, {}),
    partial_assignment: projectData.locked_tasks
      ? projectData.locked_tasks.reduce((acc, cur) => {
        acc[cur + 1] = projectData.output_history.find(
          (oh) => oh.output_id === projectData.current_selected_output_id
        ).solution.assignment[cur + 1];
        return acc;
      }, {})
      : [],
  };
}

export const SUBMIT_URL = "https://conjure-aas.cs.st-andrews.ac.uk/submit";
export const GET_URL = "https://conjure-aas.cs.st-andrews.ac.uk/get";

export const ESSENCE_MODEL =
  "language Essence 1.3\n" +
  "\n" +
  "letting M be 1000000\n" +
  "\n" +
  "given nb_tasks: int\n" +
  "given nb_users: int\n" +
  "given nb_categories: int\n" +
  "\n" +
  "letting TASK be domain int(1..nb_tasks)\n" +
  "letting USER be domain int(1..nb_users)\n" +
  "letting CATEGORY be domain int(1..nb_categories)\n" +
  "\n" +
  "given tasks:\n" +
  "        function (total) TASK --> record {category : CATEGORY, weight : int}\n" +
  "given users:\n" +
  "        function (total) USER -->\n" +
  "            record {category_percentages : function CATEGORY --> int,\n" +
  "                    forbidden_tasks : set of TASK,\n" +
  "                    task_preferences : sequence of TASK}\n" +
  "\n" +
  "\n" +
  "find assignment : function (total) TASK --> USER\n" +
  "find user_tasks : function (total) USER --> set of TASK\n" +
  "\n" +
  "$ channelling\n" +
  "such that forAll (t,u) in assignment . t in user_tasks(u)\n" +
  "such that forAll (u,ts) in user_tasks . forAll t in ts . assignment(t) = u\n" +
  "\n" +
  "\n" +
  "$ weights\n" +
  "find user_total_weight : function (total) USER --> int(0..M)\n" +
  "such that\n" +
  "    [ user_total_weight(u) = sum([ tasks(t)[weight] | t <- user_tasks(u) ])\n" +
  "    | u : USER\n" +
  "    ]\n" +
  "\n" +
  "find weight_violations : int(0..M)\n" +
  "such that\n" +
  "    weight_violations =\n" +
  "    sum([ |user_total_weight(u1) - user_total_weight(u2)|\n" +
  "        | u1 : USER\n" +
  "        , u2 : USER\n" +
  "        , u1 < u2\n" +
  "        ])\n" +
  "\n" +
  "$ category_percentages\n" +
  "find category_counts : function (total) USER --> function (total) CATEGORY --> int(0..nb_tasks)\n" +
  "such that\n" +
  "    [ category_counts(u)(c) = sum t in ts . toInt(c = tasks(t)[category])\n" +
  "    | (u,ts) <- user_tasks\n" +
  "    , c : CATEGORY\n" +
  "    ]\n" +
  "find category_violations : int(0..M)\n" +
  "$ add up the absolute values of (u1/c1 - u2/c2) for every u,c pair\n" +
  "such that\n" +
  "    category_violations =\n" +
  "    sum([ |c1percent * category_counts(u2)(c2) -\n" +
  "           c2percent * category_counts(u1)(c1)|\n" +
  "        | u1 : USER\n" +
  "        , (c1, c1percent) <- users(u1)[category_percentages]\n" +
  "        , u2 : USER\n" +
  "        , (c2, c2percent) <- users(u2)[category_percentages]\n" +
  "        , (u1, c1) <lex (u2, c2)\n" +
  "        ])\n" +
  "\n" +
  "$ forbidden_tasks\n" +
  "such that\n" +
  "    [assignment(u) != t | (u, rec) <- users, t <- rec[forbidden_tasks]]\n" +
  "\n" +
  "$ task_preferences\n" +
  "find preference_violations : int(0..M)\n" +
  "$ count the number of places where i is not in the user_tasks set, but j is\n" +
  "such that\n" +
  "    preference_violations =\n" +
  "    sum([ toInt(!(i in user_tasks(u)) /\\ j in user_tasks(u))\n" +
  "        | u : USER\n" +
  "        , i : int(1..|users(u)[task_preferences]|)\n" +
  "        , j : int(1..|users(u)[task_preferences]|)\n" +
  "        , i < j\n" +
  "        ])\n" +
  "\n" +
  "\n" +
  "find opt : int(1..M)\n" +
  "such that opt = 1000 * weight_violations + category_violations + 100 * preference_violations\n" +
  "minimising opt\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "\n" +
  "given partial_assignment : function TASK --> USER\n" +
  "such that forAll (t, u) in partial_assignment . assignment(t) = u\n" +
  "\n" +
  "\n";
