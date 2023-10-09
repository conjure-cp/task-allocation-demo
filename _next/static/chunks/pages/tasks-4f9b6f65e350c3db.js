(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[689],{6670:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tasks",function(){return t(3436)}])},1690:function(e,s,t){"use strict";t.d(s,{Z:function(){return TaskActionButton}});var n=t(5893);function TaskActionButton(e){let{children:s,disabled:t=!1,...a}=e;return(0,n.jsx)("button",{disabled:t,className:"text-sm ".concat(t?"opacity-50":"hover:underline"),...a,children:s})}},8716:function(e,s,t){"use strict";t.d(s,{Z:function(){return TableData}});var n=t(5893);function TableData(e){let{children:s,className:t}=e;return(0,n.jsx)("td",{className:"py-4 px-4 ".concat(t),children:s})}},128:function(e,s,t){"use strict";t.d(s,{Z:function(){return TableHeader}});var n=t(5893);function TableHeader(e){let{children:s}=e;return(0,n.jsx)("th",{className:"py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",children:s})}},7606:function(e,s,t){"use strict";t.d(s,{Z:function(){return Tag}});var n=t(5893);function Tag(e){let{children:s,className:t,...a}=e;return(0,n.jsx)("p",{className:"inline-block bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider ".concat(t),...a,children:s})}},3436:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return TasksPage}});var n=t(5893),a=t(1664),i=t.n(a),c=t(2680),r=t(8716),l=t(128),d=t(7606),o=t(1690);function TasksPage(){let[e,s,t]=(0,c.Z)(),handleRemove=e=>{s({type:"REMOVE_TASK",taskId:e})},handleDuplicate=e=>{s({type:"DUPLICATE_TASK",task:e})};return t?null:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:"Tasks Data"}),(0,n.jsx)("p",{className:"text-slate-300",children:"Some description about how tasks data is used or whatever."})]}),(0,n.jsxs)("div",{className:"mt-8",children:[(0,n.jsx)(i(),{href:"/tasks/new",className:"border py-2 px-2 hover:underline",children:"New Task"}),(0,n.jsx)("div",{className:"mt-4",children:e.tasks&&0!==e.tasks.length?(0,n.jsxs)("table",{className:"w-full divide-y-2 divide-slate-600 border border-slate-600",children:[(0,n.jsx)("thead",{className:"bg-slate-800",children:(0,n.jsxs)("tr",{children:[(0,n.jsx)(l.Z,{children:"Task"}),(0,n.jsx)(l.Z,{children:"Category"}),(0,n.jsx)(l.Z,{children:"Weight"}),(0,n.jsx)(l.Z,{})]})}),(0,n.jsx)("tbody",{className:"divide-y divide-slate-600",children:e.tasks.map(s=>(0,n.jsx)(TaskRow,{task:s,onRemove:handleRemove,onDuplicate:handleDuplicate,category:e.categories.find(e=>e.id===s.category),disabledActions:e.locked_tasks.includes(s.id)},s.id))})]}):(0,n.jsx)("p",{className:"text-sm text-slate-300",children:"There are currently no tasks in your project."})})]})]})}function TaskRow(e){let{task:s,category:t,onRemove:a,onDuplicate:c,disabledActions:l}=e;return(0,n.jsxs)("tr",{children:[(0,n.jsxs)(r.Z,{className:"flex flex-col items-start space-y-1",children:[(0,n.jsx)(i(),{href:"/tasks/".concat(s.id),children:(0,n.jsx)("button",{className:"hover:underline",children:s.name})}),(0,n.jsx)("p",{className:"text-sm text-slate-400",children:s.description})]}),(0,n.jsx)(r.Z,{children:t?t.name:(0,n.jsx)("span",{className:"text-sm text-slate-400",children:"None"})}),(0,n.jsx)(r.Z,{children:(0,n.jsxs)(d.Z,{children:[s.weight," Points"]})}),(0,n.jsx)(r.Z,{children:(0,n.jsxs)("div",{className:"flex items-center justify-end space-x-4",children:[(0,n.jsx)(i(),{href:l?"#":"/tasks/".concat(s.id,"/edit"),children:(0,n.jsx)(o.Z,{disabled:l,children:"Edit"})}),(0,n.jsx)(o.Z,{onClick:e=>{e.preventDefault(),c(s)},children:"Duplicate"}),(0,n.jsx)(o.Z,{onClick:e=>{e.preventDefault(),a(s.id)},disabled:l,children:"Remove"})]})})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=6670)}),_N_E=e.O()}]);