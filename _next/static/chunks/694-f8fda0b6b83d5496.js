"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[694],{6381:(e,s,t)=>{t.d(s,{A:()=>l});var a=t(4848);function l(e){let{label:s,placeholder:t,width:l="w-72",divClassName:i,className:r,...n}=e;return(0,a.jsxs)("div",{className:i,children:[(0,a.jsx)("p",{className:"text-xs font-semibold uppercase tracking-wider text-slate-400",children:s}),(0,a.jsx)("input",{type:"text",className:"mt-1 ".concat(l," border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm placeholder-slate-500 ").concat(r),placeholder:t,...n})]})}},4937:(e,s,t)=>{t.d(s,{A:()=>l});var a=t(4848);function l(e){let{label:s,placeholder:t,children:l,...i}=e;return(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-xs font-semibold uppercase tracking-wider text-slate-400",children:s}),(0,a.jsxs)("select",{required:!0,className:"mt-1 w-72 border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm invalid:text-slate-500",...i,children:[(0,a.jsx)("option",{value:-1,disabled:!0,children:t}),l]})]})}},7661:(e,s,t)=>{t.d(s,{A:()=>l});var a=t(4848);function l(e){let{children:s,className:t}=e;return(0,a.jsx)("td",{className:"py-4 px-4 ".concat(t),children:s})}},5120:(e,s,t)=>{t.d(s,{A:()=>l});var a=t(4848);function l(e){let{children:s}=e;return(0,a.jsx)("th",{className:"py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",children:s})}},4694:(e,s,t)=>{t.d(s,{E:()=>h,P:()=>p});var a=t(4848),l=t(6381),i=t(4937),r=t(6540),n=t(5410),c=t(4600),d=t(7661),x=t(5120),o=t(639),m=t(7053);function h(e){let{onSubmit:s}=e;return(0,a.jsx)(u,{initialName:"",initialCategories:[],initialDisallowedTasks:[],initialTasks:[],handleSubmit:s,buttonText:"Create User"})}function p(e){let{user:s,onSubmit:t}=e;return(0,a.jsx)(u,{initialName:s.name,initialCategories:s.categories,initialDisallowedTasks:s.task_blacklist,initialTasks:s.preferences,handleSubmit:t,buttonText:"Save User"})}function u(e){let{initialName:s,initialCategories:t,initialDisallowedTasks:n,initialTasks:c,handleSubmit:d,buttonText:h}=e,[p,u]=(0,r.useState)(1),[g,b,k]=(0,o.A)(),[y,A]=(0,r.useState)(s),[S,w]=(0,r.useState)(-1),[C,T]=(0,r.useState)(t),[D,I]=(0,r.useState)(""),[R,P]=(0,r.useState)(n),[_,E]=(0,r.useState)(-1),[F,Y]=(0,r.useState)(c),B=(e,s)=>{T(t=>t.map(t=>t.id===e?{id:t.id,percentage:s}:t))},J=e=>{T(s=>s.filter(s=>s.id!==e))},U=e=>{R.includes(e)?P(s=>s.filter(s=>s!==e)):P(s=>[...s,e])},q=e=>{Y(s=>s.filter(s=>parseInt(s)!==parseInt(e)))};return(0,a.jsxs)("div",{className:"mt-8",children:[(0,a.jsxs)("div",{className:"flex space-x-8",children:[(0,a.jsx)(N,{id:1,currentStep:p,children:"Basic details"}),(0,a.jsx)(N,{id:2,currentStep:p,children:"Task categories"}),(0,a.jsx)(N,{id:3,currentStep:p,children:"Possible tasks"}),(0,a.jsx)(N,{id:4,currentStep:p,children:"Task preferences"})]}),(0,a.jsxs)("div",{className:"mt-12",children:[1===p&&(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(l.A,{label:"Name",placeholder:"John Smith",value:y,onChange:e=>A(e.target.value)})}),2===p&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("p",{className:"text-slate-300",children:"Some description about what task categories are, why they are assigned, etc."}),(0,a.jsxs)("div",{className:"mt-12 flex space-x-40",children:[(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("p",{className:"font-medium",children:"Selected categories"}),(0,a.jsxs)("div",{className:"mt-4 flex items-center space-x-4",children:[(0,a.jsx)(i.A,{placeholder:"Select...",value:S,onChange:e=>w(e.target.value),children:g.categories.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))}),(0,a.jsx)("button",{className:"border py-2 px-2 hover:underline",onClick:e=>{if(e.preventDefault(),C.includes(e=>e.id===parseInt(S))){w(-1);return}T(e=>[...e,{id:parseInt(S),percentage:0}]),w(-1)},children:"Add"})]}),(0,a.jsxs)("div",{className:"mt-8 min-h-[176px] border",children:[0===C.length&&(0,a.jsx)("div",{className:"flex h-[176px] w-full items-center justify-center",children:(0,a.jsx)("p",{className:"text-sm text-slate-400",children:"Select categories to be allocated."})}),C.map(e=>(0,a.jsx)(j,{category:e,categories:g.categories,onSave:B,onRemove:J},e.id))]}),(0,a.jsxs)("p",{className:"mt-8 text-sm text-slate-500",children:["This user has"," ",C.map(e=>parseInt(e.percentage)).reduce((e,s)=>e+s,0),"% of their tasks allocated to categories.",(0,a.jsx)("br",{}),"Any remaining space will be filled by tasks outside of the specified categories."]})]}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("p",{className:"font-medium",children:"Create category"}),(0,a.jsx)("p",{className:"text-slate-300",children:"Tasks can be added to a newly created category later."}),(0,a.jsx)(l.A,{label:"Name",placeholder:"Some category",divClassName:"mt-8",value:D,onChange:e=>I(e.target.value)}),(0,a.jsx)("button",{className:"mt-8 border p-2 hover:underline",onClick:e=>{e.preventDefault(),b({type:"ADD_CATEGORY",name:D}),I("")},children:"Create"})]})]})]}),3===p&&(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("table",{className:"mt-4 w-1/2 divide-y-2 divide-slate-600 border border-slate-600",children:[(0,a.jsx)("thead",{className:"bg-slate-800",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)(x.A,{children:"Task"}),(0,a.jsx)(x.A,{children:"Allowed"})]})}),(0,a.jsx)("tbody",{className:"divide-y divide-slate-600",children:g.tasks.map(e=>(0,a.jsx)(f,{task:e,isDisallowed:R.includes(e.id),onToggle:U},e.id))})]})}),4===p&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("p",{className:"font-medium",children:"Task preferences"}),(0,a.jsxs)("div",{id:"taskPerference",className:"mt-4 flex items-center space-x-4",children:[(0,a.jsx)(i.A,{placeholder:"Select...",value:_,onChange:e=>E(e.target.value),children:g.tasks.map(e=>(0,a.jsx)("option",{value:e.id,children:e.name},e.id))}),(0,a.jsx)("button",{className:"border py-2 px-2 hover:underline",onClick:e=>{if(e.preventDefault(),F.includes(_)){E(-1);return}Y(e=>[...e,_]),E(-1)},children:"Add"})]}),(0,a.jsx)("div",{className:"mt-4",children:0===F.length?(0,a.jsx)("p",{className:"text-sm text-slate-300",children:"There are currently no tasks preferences."}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m.JY,{onDragEnd:e=>{if(!e.destination||e.destination.index===e.source.index)return;let s=Array.from(F),[t]=s.splice(e.source.index,1);s.splice(e.destination.index,0,t),Y(s)},children:(0,a.jsxs)("table",{className:"w-2/3 divide-y-2 divide-slate-600 border border-slate-600",children:[(0,a.jsx)("thead",{className:"bg-slate-800",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)(x.A,{children:"Rank"}),(0,a.jsx)(x.A,{children:"Task"}),(0,a.jsx)(x.A,{})]})}),(0,a.jsx)(m.gL,{droppableId:"table",children:e=>(0,a.jsxs)("tbody",{className:"divide-y divide-slate-600",ref:e.innerRef,...e.droppableProps,children:[F.map((e,s)=>(0,a.jsx)(m.sx,{draggableId:e.toString(),index:s,children:(t,l)=>(0,a.jsx)(v,{rank:s+1,task:g.tasks.find(s=>s.id===parseInt(e)),onRemove:q,provided:t,snapshot:l})},e.toString())),e.placeholder]})})]})}),(0,a.jsx)("p",{className:"mt-8 text-sm text-slate-500",children:"Click and drag tasks into preference order."})]})})]}),(0,a.jsx)("button",{id:"continueButton",onClick:e=>{e.preventDefault(),p<4?u(p+1):d(y,R,F,C)},className:"mt-12 border py-2 px-2 hover:underline",children:4===p?h:"Continue"})]})]})}function j(e){let{category:s,categories:t,onSave:i,onRemove:d}=e,[x,o]=(0,r.useState)(!1),[m,h]=(0,r.useState)(s.percentage);return(0,a.jsxs)("div",{className:"flex items-center justify-between border px-6 py-4",children:[(0,a.jsx)("p",{children:t.find(e=>e.id===parseInt(s.id)).name}),x?(0,a.jsxs)("div",{className:"inline-flex items-center space-x-2",children:[(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(l.A,{className:"block",width:"w-28",value:m,onChange:e=>h(e.target.value)}),(0,a.jsx)("div",{className:"pointer-events-none absolute inset-y-0 right-0 mt-1 flex items-center pr-3",children:(0,a.jsx)("span",{className:"text-sm text-slate-400",children:"%"})})]}),(0,a.jsx)("button",{onClick:e=>{e.preventDefault(),i(s.id,m),o(!1)},children:(0,a.jsx)(n.A,{className:"h-5 w-5"})}),(0,a.jsx)("button",{onClick:e=>{e.preventDefault(),d(s.id)},children:(0,a.jsx)(c.A,{className:"h-5 w-5"})})]}):(0,a.jsxs)("button",{className:"text-sm underline",onClick:e=>o(!0),children:[s.percentage,"%"]})]})}function f(e){let{task:s,isDisallowed:t,onToggle:l}=e;return(0,a.jsxs)("tr",{children:[(0,a.jsxs)(d.A,{className:"flex flex-col items-start space-y-1",children:[(0,a.jsx)("p",{children:s.name}),(0,a.jsx)("p",{className:"text-sm text-slate-400",children:s.description})]}),(0,a.jsx)(d.A,{children:(0,a.jsx)("div",{className:"flex items-center space-x-4",children:(0,a.jsx)("button",{className:"text-sm underline",onClick:e=>{e.preventDefault(),l(s.id)},children:t?"No":"Yes"})})})]})}function v(e){let{rank:s,task:t,onRemove:l,provided:i,snapshot:r}=e;return(0,a.jsxs)("tr",{ref:i.innerRef,className:r.isDragging?"table":"",...i.draggableProps,...i.dragHandleProps,children:[(0,a.jsx)(d.A,{className:"w-24",children:(0,a.jsx)("span",{className:"bg-slate-800 py-1 px-2 text-xs font-medium uppercase tracking-wider",children:(0,a.jsx)("code",{children:s})})}),(0,a.jsxs)(d.A,{className:"flex flex-col items-start space-y-1",children:[(0,a.jsx)("p",{children:t.name}),(0,a.jsx)("p",{className:"text-sm text-slate-400",children:t.description})]}),(0,a.jsx)(d.A,{children:(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsx)("button",{className:"text-sm hover:underline",onClick:e=>{e.preventDefault(),l(t.id)},children:"Remove"})})})]})}function N(e){let{id:s,children:t,currentStep:l}=e,i=s<=l;return(0,a.jsxs)("div",{className:"flex-1 border-t-4 ".concat(i?"border-slate-400":"border-slate-600"," py-4"),children:[(0,a.jsxs)("p",{className:"text-sm font-medium ".concat(i?"text-slate-400":"text-slate-500"),children:["Step ",s]}),(0,a.jsx)("p",{className:"font-medium ".concat(i?"text-slate-300":"text-slate-400"),children:t})]})}}}]);