import Input from "../components/ui/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import useProjectData from "../utils/ProjectDataContext";
import { downloadObjectAsJson } from "../utils/export-util";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [projectData, dispatch, loading] = useProjectData();

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
            <Input label={"Name"} placeholder={"School of CS Workload"} />
            <PrimaryButton onClick={() => dispatch({ type: "NEW_PROJECT" })}>
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
        <div className={"mt-8 space-y-8"}>
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
        </div>
      </div>
    </div>
  );
}
