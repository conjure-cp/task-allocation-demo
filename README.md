# Task allocation

## Description

Simple user interface for workload planning paired with a backend constraint programming model to find optimal and balanced workloads for users.

Created as a dissertation project at the University of St Andrews.

## Running Instructions

Requires an environment with NodeJS and NPM installed.

#### Running in Production

To start the production server, use the following command:

1. Install dependencies

`npm install`

2. Build

`npm run build`

3. Run

`npm run start`

The application will now be available at /task-allocation.

#### Running in Development

To start the development server, use the following command:

`npm run dev`

This will start the application in development mode. Open http://localhost:3000 to view the application in the browser. The page will reload if you make edits.

## Testing

#### Run E2E Tests

First, start the server

```bash
npm run build
npm run dev
```

and then open another terminal to run

```bash
npm run e2e:headless
```

#### Run Component Tests

```bash
npm run component:headless
```

#### Or

```bash
npm run cypress
```

## User Interface

Below are some screenshots of the project UI:

### Home Page

![Home Page](docs/screenshots/homepage.png)

This is the homepage with no existing project

### Project Page

![Project Page](docs/screenshots/project.png)

This is the project page showing the project details

## Example GIFs

### Create new project

![Create Project](docs/screenshots/create-project.gif)

Create a new project named **Project Management System**

### Create new category

![Create Category](docs/screenshots/create-categories.gif)

Create a new category named **Planning**

### Create new task

![Create Task](docs/screenshots/create-task.gif)

Create a new task named **Design the database schema** under the **Planning** category

### Create new user

![Create User](docs/screenshots/create-user.gif)

Create a user named **John Smith** managing the **Planning** tasks. He prefers to take over the **Design database schema** task.

## Generated asset comparison

Pull requests build the base and head revisions in the same environment and
compare every generated HTML, JavaScript (`.js`, `.mjs`, `.cjs`), and CSS file in
`out/`. The check fails on any byte or filename difference, including asset
hashes; nothing is normalized. Changed files appear in the job summary, and the
`generated-assets-diff` artifact contains the recursive diff. Intentional output
changes therefore also fail this comparison and need review.

For this CI job only, both revisions use the same Next.js build ID through
`generateBuildId` before compilation. This removes random build inputs without
rewriting or filtering the generated files. Deployment builds keep their normal
build IDs.

## License

This project is licensed under the Mozilla Public License 2.0. For full license information, please see the [LICENSE](./LICENSE) file in the repository.
