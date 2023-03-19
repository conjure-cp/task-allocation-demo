import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import PrimaryButton from "../ui/PrimaryButton";
import useProjectData from "../../utils/ProjectDataContext";
import { useRouter } from "next/router";
import { handleGenerate } from "../../utils/generation-handler";

export default function UnsavedChangesMenu() {
  const router = useRouter();
  const [projectData, dispatch, loading] = useProjectData();

  if (loading || !projectData.unsaved_changes) {
    return null;
  }

  // banner shown on all pages
  if (router.pathname !== "/output") {
    return (
      <div
        className={
          "mb-8 flex items-center justify-between border border-slate-600 bg-slate-800 py-3 px-5"
        }
      >
        <div className={"flex items-center space-x-4"}>
          <ExclamationTriangleIcon className={"h-6 w-6 text-slate-400"} />
          <div>
            <p className={"text-sm font-semibold text-slate-300"}>
              There are unsaved changes in this project.
            </p>
            <p className={"text-sm text-slate-400"}>
              When viewing a solution, note that this may be outdated. Generate
              a new solution to reflect the changes made to the inputs.
            </p>
          </div>
        </div>
        <div>
          <Link href={"/output"}>
            <PrimaryButton
              className={"border-slate-500 text-sm text-slate-300"}
            >
              Solution Details
            </PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={"mb-8 border border-slate-600 bg-slate-800 py-3 px-5"}>
      <WarningText />
      <div className={"mt-8 ml-10"}>
        <p className={"w-[700px] text-slate-300"}>
          Create a new solution based on your previous output combined with
          changes made to tasks, categories and users. Any tasks locked below
          will retain their existing assignment.
        </p>
        <PrimaryButton
          className={"mt-8 text-sm"}
          onClick={(e) => handleGenerate(e, projectData, dispatch, router)}
        >
          Update Solution
        </PrimaryButton>
      </div>
    </div>
  );
}

function WarningText() {
  return (
    <div className={"flex items-center space-x-4"}>
      <ExclamationTriangleIcon className={"h-6 w-6 text-slate-400"} />
      <div>
        <p className={"text-sm font-semibold text-slate-300"}>
          There are unsaved changes in this project.
        </p>
        <p className={"text-sm text-slate-400"}>
          When viewing a solution, note that this may be outdated. Generate a
          new solution to reflect the changes made to the inputs.
        </p>
      </div>
    </div>
  );
}
