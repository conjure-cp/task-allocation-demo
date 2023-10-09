import axios from "axios";
import { convertInput, ESSENCE_MODEL, SUBMIT_URL } from "./model";

export const handleGenerate = async (e, projectData, dispatch, router) => {
  e.preventDefault();

  const res = await axios.post(
    SUBMIT_URL,
    {
      appName: "task-allocation",
      solver: "chuffed",
      model: ESSENCE_MODEL,
      data: JSON.stringify(convertInput(projectData)),
      conjureOptions: ["--solver-options='-t 10000'"] // use a time limit of 10 seconds
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  dispatch({
    type: "WAIT_OUTPUT",
    job_id: parseInt(res.data.jobid),
  });

};
