export default function NewTaskPage() {
  return (
    <div>
      <div>
        <h1 className={"text-2xl font-semibold"}>New Task</h1>
        <p className={"text-slate-300"}>
          Some description about how tasks data is used or whatever.
        </p>
      </div>
      <div className={"mt-8 space-y-8"}>
        <Input label={"Name"} placeholder={"Director of Studies"} />
        <Input
          label={"Description"}
          placeholder={"Oversee all academics within the school."}
          width={"w-96"}
        />
        <Select label={"Category"} placeholder={"Select..."}>
          <option>Test A</option>
          <option>Test B</option>
          <option>Test C</option>
        </Select>
        <Input label={"Weight"} placeholder={"1+"} />
        <button className={"border py-1 px-2 hover:underline"}>
          Create Task
        </button>
      </div>
    </div>
  );
}

function Input({ label, placeholder, width = "w-72" }) {
  return (
    <div>
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {label}
      </p>
      <input
        type={"text"}
        className={`mt-1 ${width} border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm placeholder-slate-500`}
        placeholder={placeholder}
      />
    </div>
  );
}

function Select({ label, placeholder, children }) {
  return (
    <div>
      <p
        className={
          "text-xs font-semibold uppercase tracking-wider text-slate-400"
        }
      >
        {label}
      </p>
      <select
        required
        className={
          "mt-1 w-72 border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm invalid:text-slate-500"
        }
      >
        <option value={""} disabled selected>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
}
