import { useRouter } from "next/router";
import useProjectData from "../utils/ProjectDataContext";
import { useEffect } from "react";

export default function NoProjectGuard({ children }) {
  const router = useRouter();
  const [projectData, dispatch, loading] = useProjectData();

  useEffect(() => {
    if (!loading && projectData.id === -1 && router.pathname !== "/") {
      router.push("/");
    }
  });

  if (loading) {
    return null;
  }

  return (projectData.id !== -1 || router.pathname === "/") && children;
}
