import Input from "../components/ui/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import useProjectData from "../utils/ProjectDataContext";
import { downloadObjectAsJson } from "../utils/export-util";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import KPI from "../components/ui/KPI";

export default function Home() {
  const router = useRouter();
  const [projectData, dispatch, loading] = useProjectData();

  const [projectName, setProjectName] = useState("");

  const [showImport, setShowImport] = useState(false);
  const fileInputRef = useRef();

  if (loading || !projectData) {
    return null;
  }

  const handleImportProject = (e) => {
    e.preventDefault();

    if (
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(fileInputRef.current.files[0]);

    reader.onload = () => {
      window.localStorage.setItem("workload_project_data", reader.result);
      router.reload();
    };

    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  if (projectData.id === -1) {
    // new project
    return (
      <div>
        <div>
          <h1 className={"text-2xl font-semibold"}>New Project</h1>
          <p className={"text-slate-300"}>
            Start by creating a new project to which tasks, users and categories
            can be added.
          </p>
          <div className={"mt-8 space-y-8"}>
            <Input
              label={"Name"}
              placeholder={"School of CS Workload"}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <PrimaryButton
              onClick={() =>
                dispatch({ type: "NEW_PROJECT", projectName: projectName })
              }
            >
              Create Project
            </PrimaryButton>
          </div>
          <div className={"mt-8"}>
            {!showImport ? (
              <div className={"group flex items-center space-x-2"}>
                <button
                  className={
                    "text-sm font-medium text-slate-400 group-hover:text-slate-300"
                  }
                  onClick={() => setShowImport(true)}
                >
                  ...or import an existing project
                </button>
                <ArrowSmallRightIcon
                  className={
                    "h-5 w-5 text-slate-500 group-hover:text-slate-400"
                  }
                />
              </div>
            ) : (
              <div>
                <p className={"text-slate-300"}>
                  Select a project JSON file to be imported below.
                </p>
                <input
                  type={"file"}
                  className={"mt-4 block text-slate-400"}
                  ref={fileInputRef}
                />
                <PrimaryButton className={"mt-4"} onClick={handleImportProject}>
                  Import Project
                </PrimaryButton>
              </div>
            )}
          </div>
          <div className={"mt-16 w-[600px]"}>
            <p className={"text-xl font-semibold"}>Instructions</p>
            <p className={"mt-8 text-slate-300"}>
              Start by creating a new project. Create{" "}
              <span className={"text-white"}>tasks</span>,{" "}
              <span className={"text-white"}>users</span> and{" "}
              <span className={"text-white"}>categories</span>, setting
              constraints for each.
            </p>
            <p className={"mt-4 text-slate-300"}>
              A task may belong to a category and tasks are allocated to users.
            </p>
            <p className={"mt-4 text-slate-300"}>
              When you are ready to find a{" "}
              <span className={"text-white"}>solution</span>, select{" "}
              <span className={"text-white"}>Solution Details</span> in the
              sidebar navigation. After generating a solution, a list of which
              task should be completed by which user will be created.
            </p>
            <p className={"mt-4 text-slate-300"}>
              You may wish to adjust tasks, users and categories further. After
              you edit the project&apos;s input data, you may generate an{" "}
              <span className={"text-white"}>updated solution</span> by visiting
              the Solution Details page.
            </p>
            <p className={"mt-4 text-slate-300"}>
              It is possible to <span className={"text-white"}>lock tasks</span>{" "}
              that have been previously allocated. Locking a task will ensure
              the user to which a task has been allocated will remain if you
              generate an updated solution.
            </p>
            <p className={"mt-4 text-slate-300"}>
              You can select and view{" "}
              <span className={"text-white"}>previous solutions</span> using the
              dropdown in the sidebar navigation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>{projectData.name}</h1>
        <p className={"text-slate-300"}>
          An overview of the details of your project are displayed below.
        </p>
        <div className={"mt-8 flex items-center space-x-8"}>
          <KPI name={"Tasks"} value={projectData.tasks.length} />
          <KPI name={"Users"} value={projectData.users.length} />
          <KPI name={"Categories"} value={projectData.categories.length} />
          <KPI
            name={"Solutions"}
            value={
              projectData.output_history ? projectData.output_history.length : 0
            }
          />
        </div>
        <div className={"mt-8 flex items-center space-x-8"}>
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();

              downloadObjectAsJson(
                JSON.parse(
                  window.localStorage.getItem("workload_project_data")
                ),
                "workload-project-" + projectData.id
              );
            }}
          >
            Export Project
          </PrimaryButton>
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();

              window.localStorage.removeItem("workload_project_data");

              router.reload();
            }}
          >
            Delete Project
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
