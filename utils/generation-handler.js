import axios from "axios";
import { convertInput, ESSENCE_MODEL, SUBMIT_URL } from "./model";

export const handleGenerate = async (e, projectData, dispatch, router) => {
  e.preventDefault();

  const res = await axios.post(
    SUBMIT_URL,
    {
      solver: "cadical",
      model: ESSENCE_MODEL,
      data: JSON.stringify(convertInput(projectData)),
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

  router.reload();
};