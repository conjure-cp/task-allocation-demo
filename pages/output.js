import useProjectData from "../utils/ProjectDataContext";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import OutputStats from "../components/output/OutputStats";
import OutputTableViews from "../components/output/OutputTableViews";
import { handleGenerate } from "../utils/generation-handler";
import axios from "axios";
import { GET_URL } from "../utils/model";

export default function OutputPage() {
  const router = useRouter();
  const [projectData, dispatch, loading] = useProjectData();

  const calledWait = useRef(false);

  useEffect(() => {
    const wait = async () => {
      let timer = setInterval(async () => {
        const res = await axios.post(
          GET_URL,
          {
            appName: "task-allocation",
            jobid: projectData.output_history.find(
              (o) => o.output_id === projectData.current_selected_output_id
            ).job_id,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.data && res.data.status && res.data.status !== "wait") {
          clearInterval(timer);

          dispatch({
            type: "ADD_OUTPUT",
            output: res.data,
          });
        }
      }, 3000);
    };

    if (
      !loading &&
      projectData.current_selected_output_id &&
      projectData.output_history &&
      projectData.output_history.some(
        (o) =>
          o.output_id === projectData.current_selected_output_id &&
          o.status === "wait"
      ) &&
      !calledWait.current
    ) {
      calledWait.current = true;
      wait();
    }
  }, [loading, projectData, dispatch]);

  if (loading) {
    return null;
  }

  const currentOutput = projectData.output_history
    ? projectData.output_history.find(
        (x) => x.output_id === projectData.current_selected_output_id
      )
    : null;

  // empty state
  if (!currentOutput || !currentOutput.status) {
    return (
      <PageLayout>
        <div className={"flex justify-center"}>
          <div className={"flex flex-col items-center"}>
            <ChartBarSquareIcon className={"h-12 w-12 text-slate-500"} />
            <p className={"text-medium mt-2"}>No output allocation</p>
            <p className={"text-sm text-slate-400"}>
              Get started by generating the first output allocation from your
              input.
            </p>
            <PrimaryButton
              className={"mt-6"}
              onClick={(e) => handleGenerate(e, projectData, dispatch, router)}
            >
              Generate Solution
            </PrimaryButton>
          </div>
        </div>
      </PageLayout>
    );
  }

  // waiting state
  if (currentOutput.status === "wait") {
    return (
      <PageLayout>
        <div className={"flex justify-center"}>
          <div className={"flex flex-col items-center"}>
            <LoadingSpinner />
            <p className={"text-medium mt-2"}>Generating solution...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  // output failed state
  if (currentOutput.status !== "ok") {
    return (
      <PageLayout>
        <div className={"flex justify-center"}>
          <div className={"flex flex-col items-center"}>
            <ChartBarSquareIcon className={"h-12 w-12 text-slate-500"} />
            <p className={"text-medium mt-2"}>Failed output allocation</p>
            <p className={"text-sm text-slate-400"}>
              It was not possible to find a solution to output version #
              {currentOutput.output_id} with the supplied inputs.
            </p>
            {/*<PrimaryButton className={"mt-6"}>*/}
            {/*  Back to last sol??*/}
            {/*</PrimaryButton>*/}
          </div>
        </div>
      </PageLayout>
    );
  }

  const solution = currentOutput.solution;
  const oldSolutionState = currentOutput.state;

  return (
    <PageLayout>
      <OutputStats projectData={projectData} solution={solution} />
      <OutputTableViews
        solution={solution}
        oldSolutionState={oldSolutionState}
      />
    </PageLayout>
  );
}

function PageLayout({ children }) {
  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>Solution Allocation</h1>
        <p className={"text-slate-300"}>
          See recommended task allocations below which may be edited.
        </p>
      </div>
      <div className={"mt-8"}>{children}</div>
    </div>
  );
}
