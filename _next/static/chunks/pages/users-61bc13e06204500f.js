(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[892],{4964:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/users",function(){return t(1338)}])},1044:function(e,s,t){"use strict";t.d(s,{Z:function(){return r}});var n=t(5893);function r(e){let{children:s,className:t}=e;return(0,n.jsx)("td",{className:"py-4 px-4 ".concat(t),children:s})}},668:function(e,s,t){"use strict";t.d(s,{Z:function(){return r}});var n=t(5893);function r(e){let{children:s}=e;return(0,n.jsx)("th",{className:"py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",children:s})}},1338:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return d}});var n=t(5893),r=t(1664),l=t.n(r),c=t(6723),i=t(1044),a=t(668);function d(){let[e,s,t]=(0,c.Z)(),r=e=>{s({type:"REMOVE_USER",userId:e})},i=e=>{s({type:"DUPLICATE_USER",user:e})};return t?null:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:"Users Data"}),(0,n.jsx)("p",{className:"text-slate-300",children:"Some description about how users data is used or whatever."})]}),(0,n.jsxs)("div",{className:"mt-8",children:[(0,n.jsx)(l(),{href:"/users/new",className:"border py-2 px-2 hover:underline",children:"New User"}),(0,n.jsx)("div",{className:"mt-4",children:e.users&&0!==e.users.length?(0,n.jsxs)("table",{className:"w-full divide-y-2 divide-slate-600 border border-slate-600",children:[(0,n.jsx)("thead",{className:"bg-slate-800",children:(0,n.jsxs)("tr",{children:[(0,n.jsx)(a.Z,{children:"User"}),(0,n.jsx)(a.Z,{children:"Task Categories"}),(0,n.jsx)(a.Z,{children:"Possibilities"}),(0,n.jsx)(a.Z,{children:"Preferences"}),(0,n.jsx)(a.Z,{})]})}),(0,n.jsx)("tbody",{className:"divide-y divide-slate-600",children:e.users.map((s,t)=>(0,n.jsx)(x,{user:s,tasks:e.tasks,categories:e.categories,handleRemove:r,handleDuplicate:i},t))})]}):(0,n.jsx)("p",{className:"text-sm text-slate-300",children:"There are currently no users in your project."})})]})]})}function x(e){let{user:s,tasks:t,categories:r,handleRemove:c,handleDuplicate:a}=e;return(0,n.jsxs)("tr",{children:[(0,n.jsx)(i.Z,{children:(0,n.jsx)(l(),{href:"/users/".concat(s.id),children:(0,n.jsx)("button",{className:"hover:underline",children:s.name})})}),(0,n.jsxs)(i.Z,{className:"flex items-center space-x-4",children:[s.categories.map((e,s)=>s<=2?(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsxs)("p",{className:"text-xs text-slate-500",children:[e.percentage,"%"]}),(0,n.jsx)("p",{className:"text-sm",children:r.find(s=>s.id===e.id)?r.find(s=>s.id===e.id).name:"FIXME"})]},s):null),s.categories.length>3&&(0,n.jsxs)("p",{className:"text-sm text-slate-500",children:["+ ",s.categories.length-3]}),0===s.categories.length?(0,n.jsx)("p",{className:"text-sm text-slate-400",children:"None"}):null]}),(0,n.jsxs)(i.Z,{children:[t.length-s.task_blacklist.length," ",(0,n.jsx)("span",{className:"text-slate-500",children:"/"})," ",t.length]}),(0,n.jsx)(i.Z,{children:(0,n.jsx)("span",{className:"bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider",children:s.preferences&&0!==s.preferences.length?(0,n.jsxs)("span",{children:[s.preferences.length," Allocated"]}):(0,n.jsx)("span",{className:"text-sm text-slate-400",children:"None"})})}),(0,n.jsx)(i.Z,{children:(0,n.jsxs)("div",{className:"flex items-center justify-end space-x-4",children:[(0,n.jsx)(l(),{href:"/users/".concat(s.id,"/edit"),children:(0,n.jsx)("button",{className:"text-sm hover:underline",children:"Edit"})}),(0,n.jsx)("button",{className:"text-sm hover:underline",onClick:e=>{e.preventDefault(),a(s)},children:"Duplicate"}),(0,n.jsx)("button",{className:"text-sm hover:underline",onClick:e=>{e.preventDefault(),c(s.id)},children:"Remove"})]})})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=4964)}),_N_E=e.O()}]);