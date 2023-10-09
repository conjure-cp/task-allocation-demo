(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[161],{5190:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/categories",function(){return s(6740)}])},8716:function(e,t,s){"use strict";s.d(t,{Z:function(){return TableData}});var a=s(5893);function TableData(e){let{children:t,className:s}=e;return(0,a.jsx)("td",{className:"py-4 px-4 ".concat(s),children:t})}},128:function(e,t,s){"use strict";s.d(t,{Z:function(){return TableHeader}});var a=s(5893);function TableHeader(e){let{children:t}=e;return(0,a.jsx)("th",{className:"py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",children:t})}},6740:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return CategoriesPage}});var a=s(5893),n=s(2680),r=s(1664),i=s.n(r),l=s(128),c=s(8716);function CategoriesPage(){let[e,t,s]=(0,n.Z)(),handleRemove=e=>{t({type:"REMOVE_CATEGORY",category:parseInt(e)})},handleDuplicate=e=>{t({type:"DUPLICATE_CATEGORY",category:e})};return s?null:(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-2xl font-semibold",children:"Categories Data"}),(0,a.jsx)("p",{className:"text-slate-300",children:"Some description about how categories data is used or whatever."})]}),(0,a.jsxs)("div",{className:"mt-8",children:[(0,a.jsx)(i(),{href:"/categories/new",className:"border py-2 px-2 hover:underline",children:"New Category"}),(0,a.jsx)("div",{className:"mt-4",children:e.categories&&0!==e.categories.length?(0,a.jsxs)("table",{className:"w-full divide-y-2 divide-slate-600 border border-slate-600",children:[(0,a.jsx)("thead",{className:"bg-slate-800",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)(l.Z,{children:"Category"}),(0,a.jsx)(l.Z,{children:"Tasks"}),(0,a.jsx)(l.Z,{})]})}),(0,a.jsx)("tbody",{className:"divide-y divide-slate-600",children:e.categories.map(t=>(0,a.jsx)(CategoryRow,{category:t,tasks:e.tasks,handleRemove:handleRemove,handleDuplicate:handleDuplicate},t.id))})]}):(0,a.jsx)("p",{className:"text-sm text-slate-300",children:"There are currently no categories in your project."})})]})]})}function CategoryRow(e){let{category:t,tasks:s,handleRemove:n,handleDuplicate:r}=e,l=s.filter(e=>e.category===t.id).length;return(0,a.jsxs)("tr",{children:[(0,a.jsx)(c.Z,{className:"flex flex-col items-start space-y-1",children:(0,a.jsx)(i(),{href:"/categories/".concat(t.id),children:(0,a.jsx)("button",{className:"hover:underline",children:t.name})})}),(0,a.jsx)(c.Z,{children:0!==l?(0,a.jsx)("span",{className:"bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider",children:l}):(0,a.jsx)("span",{className:"text-sm text-slate-400",children:"None"})}),(0,a.jsx)(c.Z,{children:(0,a.jsxs)("div",{className:"flex items-center justify-end space-x-4",children:[(0,a.jsx)(i(),{href:"/categories/".concat(t.id,"/edit"),children:(0,a.jsx)("button",{className:"text-sm hover:underline",children:"Edit"})}),(0,a.jsx)("button",{className:"text-sm hover:underline",onClick:e=>{e.preventDefault(),r(t)},children:"Duplicate"}),(0,a.jsx)("button",{className:"text-sm hover:underline",onClick:e=>{e.preventDefault(),n(t.id)},children:"Remove"})]})})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5190)}),_N_E=e.O()}]);