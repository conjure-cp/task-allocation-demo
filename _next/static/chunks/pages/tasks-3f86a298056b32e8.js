(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[689],{6670:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tasks",function(){return t(5486)}])},2083:function(e,s,t){"use strict";t.d(s,{Z:function(){return i}});var n=t(5893);function i(e){let{children:s,disabled:t=!1,...i}=e;return(0,n.jsx)("button",{disabled:t,className:"text-sm ".concat(t?"opacity-50":"hover:underline"),...i,children:s})}},2213:function(e,s,t){"use strict";t.d(s,{Z:function(){return i}});var n=t(5893);function i(e){let{children:s,className:t}=e;return(0,n.jsx)("td",{className:"py-4 px-4 ".concat(t),children:s})}},1367:function(e,s,t){"use strict";t.d(s,{Z:function(){return i}});var n=t(5893);function i(e){let{children:s}=e;return(0,n.jsx)("th",{className:"py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",children:s})}},71:function(e,s,t){"use strict";t.d(s,{Z:function(){return i}});var n=t(5893);function i(e){let{children:s,className:t,...i}=e;return(0,n.jsx)("p",{className:"inline-block bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider ".concat(t),...i,children:s})}},5486:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return u}});var n=t(5893),i=t(1664),c=t.n(i),r=t(7480),a=t(2213),l=t(1367),d=t(71),o=t(2083);function u(){let[e,s,t]=(0,r.Z)(),i=e=>{s({type:"REMOVE_TASK",taskId:e})},a=e=>{s({type:"DUPLICATE_TASK",task:e})};return t?null:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:"Tasks Data"}),(0,n.jsx)("p",{className:"text-slate-300",children:"Some description about how tasks data is used or whatever."})]}),(0,n.jsxs)("div",{className:"mt-8",children:[(0,n.jsx)(c(),{href:"/tasks/new",className:"border py-2 px-2 hover:underline",children:"New Task"}),(0,n.jsx)("div",{className:"mt-4",children:e.tasks&&0!==e.tasks.length?(0,n.jsxs)("table",{className:"w-full divide-y-2 divide-slate-600 border border-slate-600",children:[(0,n.jsx)("thead",{className:"bg-slate-800",children:(0,n.jsxs)("tr",{children:[(0,n.jsx)(l.Z,{children:"Task"}),(0,n.jsx)(l.Z,{children:"Category"}),(0,n.jsx)(l.Z,{children:"Weight"}),(0,n.jsx)(l.Z,{})]})}),(0,n.jsx)("tbody",{className:"divide-y divide-slate-600",children:e.tasks.map(s=>(0,n.jsx)(x,{task:s,onRemove:i,onDuplicate:a,category:e.categories.find(e=>e.id===s.category),disabledActions:e.locked_tasks.includes(s.id)},s.id))})]}):(0,n.jsx)("p",{className:"text-sm text-slate-300",children:"There are currently no tasks in your project."})})]})]})}function x(e){let{task:s,category:t,onRemove:i,onDuplicate:r,disabledActions:l}=e;return(0,n.jsxs)("tr",{children:[(0,n.jsxs)(a.Z,{className:"flex flex-col items-start space-y-1",children:[(0,n.jsx)(c(),{href:"/tasks/".concat(s.id),children:(0,n.jsx)("button",{className:"hover:underline",children:s.name})}),(0,n.jsx)("p",{className:"text-sm text-slate-400",children:s.description})]}),(0,n.jsx)(a.Z,{children:t?t.name:(0,n.jsx)("span",{className:"text-sm text-slate-400",children:"None"})}),(0,n.jsx)(a.Z,{children:(0,n.jsxs)(d.Z,{children:[s.weight," Points"]})}),(0,n.jsx)(a.Z,{children:(0,n.jsxs)("div",{className:"flex items-center justify-end space-x-4",children:[(0,n.jsx)(c(),{href:l?"#":"/tasks/".concat(s.id,"/edit"),children:(0,n.jsx)(o.Z,{disabled:l,children:"Edit"})}),(0,n.jsx)(o.Z,{onClick:e=>{e.preventDefault(),r(s)},children:"Duplicate"}),(0,n.jsx)(o.Z,{onClick:e=>{e.preventDefault(),i(s.id)},disabled:l,children:"Remove"})]})})]})}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=6670)}),_N_E=e.O()}]);