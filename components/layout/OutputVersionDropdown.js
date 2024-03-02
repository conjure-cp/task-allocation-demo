import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import useProjectData from "../../utils/ProjectDataContext";
import moment from "moment";

export default function OutputVersionDropdown() {
  const [projectData, dispatch, loading] = useProjectData();

  if (loading) {
    return null;
  }

  if (!projectData.current_selected_output_id) {
    return <p className={"text-sm text-slate-300"}>None</p>;
  }

  const sortedHistory = projectData.output_history
    .slice(0)
    .map((h, i) => {
      return {
        idx: i + 1,
        entry: h,
      };
    })
    .reverse();

  return (
    <Menu as={"div"} className={"relative inline-block w-full"}>
      <Menu.Button
        className={
          "group inline-flex w-full items-center justify-between border border-slate-700/75 bg-slate-900/50 py-2 px-3 text-sm hover:border-slate-600"
        }
      >
        <span className={"text-slate-200 group-hover:text-slate-100"}>
          Solution #
          {
            sortedHistory.find(
              (p) =>
                p.entry.output_id == projectData.current_selected_output_id,
            ).idx
          }
        </span>
        <ChevronDownIcon
          className={"h-5 w-5 text-slate-300 group-hover:text-slate-200"}
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={
            "absolute left-0 mt-2 w-full origin-top-left border border-slate-700/75 bg-slate-900/50 shadow-md backdrop-blur"
          }
        >
          {sortedHistory.map((h) => (
            <OutputVersionItem
              key={h.entry.output_id}
              idx={h.idx}
              output={h.entry}
              isCurrent={
                h.entry.output_id === projectData.current_selected_output_id
              }
              dispatch={dispatch}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function OutputVersionItem({ output, isCurrent, dispatch, idx }) {
  const isFail = output.status !== "ok";

  const handleClick = (e) => {
    dispatch({
      type: "SELECT_OUTPUT_VERSION",
      versionId: output.output_id,
    });
  };

  return (
    <Menu.Item disabled={isCurrent}>
      {({ active }) => (
        <button
          className={`flex w-full items-center justify-between py-2 px-3 text-left backdrop-blur ${
            !isCurrent
              ? "text-slate-400 hover:bg-slate-800/75"
              : "text-slate-400/60"
          }`}
          onClick={handleClick}
        >
          <div className={"flex flex-col"}>
            <span>Solution #{idx}</span>
            <span className={"text-sm"}>{moment(output.date).fromNow()}</span>
          </div>
          {isFail ? (
            <ExclamationCircleIcon className={"h-4 w-4"} />
          ) : (
            <CheckIcon className={"h-4 w-4"} />
          )}
        </button>
      )}
    </Menu.Item>
  );
}
