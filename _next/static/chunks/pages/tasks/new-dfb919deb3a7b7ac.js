(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[823],{9992:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tasks/new",function(){return a(3289)}])},9752:function(e,t,a){"use strict";a.d(t,{C:function(){return l},M:function(){return c}});var n=a(5893),i=a(570),s=a(5637),r=a(7294);function l(e){let{projectData:t,onSubmit:a}=e;return(0,n.jsx)(o,{projectData:t,handleSubmit:a,initialName:"",initialDescription:"",initialCategory:-1,initialWeight:"",buttonText:"Create Task"})}function c(e){let{projectData:t,task:a,onSubmit:i}=e;return(0,n.jsx)(o,{projectData:t,handleSubmit:i,initialName:a.name,initialDescription:a.description,initialCategory:a.category,initialWeight:a.weight,buttonText:"Save Task"})}function o(e){let{projectData:t,handleSubmit:a,initialName:l,initialDescription:c,initialCategory:o,initialWeight:u,buttonText:d}=e,[h,p]=(0,r.useState)(l),[x,m]=(0,r.useState)(c),[f,b]=(0,r.useState)(o),[g,j]=(0,r.useState)(u);return(0,n.jsxs)("form",{className:"mt-8 space-y-8",onSubmit:e=>{e.preventDefault(),a(h,x,parseInt(f),parseInt(g))},children:[(0,n.jsx)(i.Z,{label:"Name",placeholder:"Director of Studies",value:h,onChange:e=>p(e.target.value)}),(0,n.jsx)(i.Z,{label:"Description",placeholder:"Oversee all academics within the school.",width:"w-[600px]",value:x,onChange:e=>m(e.target.value)}),(0,n.jsx)(s.Z,{label:"Category",placeholder:"Select...",value:f,onChange:e=>b(e.target.value),children:t.categories&&t.categories.map(e=>(0,n.jsx)("option",{value:e.id,children:e.name},e.id))}),(0,n.jsx)(i.Z,{label:"Weight",placeholder:"1+",type:"number",value:g,onChange:e=>j(e.target.value)}),(0,n.jsx)("button",{className:"border py-2 px-2 hover:underline",children:d})]})}},570:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var n=a(5893);function i(e){let{label:t,placeholder:a,width:i="w-72",divClassName:s,className:r,...l}=e;return(0,n.jsxs)("div",{className:s,children:[(0,n.jsx)("p",{className:"text-xs font-semibold uppercase tracking-wider text-slate-400",children:t}),(0,n.jsx)("input",{type:"text",className:"mt-1 ".concat(i," border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm placeholder-slate-500 ").concat(r),placeholder:a,...l})]})}},5637:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var n=a(5893);function i(e){let{label:t,placeholder:a,children:i,...s}=e;return(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:"text-xs font-semibold uppercase tracking-wider text-slate-400",children:t}),(0,n.jsxs)("select",{required:!0,className:"mt-1 w-72 border border-white/5 bg-slate-800/75 py-2.5 px-4 text-sm invalid:text-slate-500",...s,children:[(0,n.jsx)("option",{value:-1,disabled:!0,children:a}),i]})]})}},3289:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return l}});var n=a(5893),i=a(7480),s=a(9752),r=a(1163);function l(){let[e,t,a]=(0,i.Z)(),l=(0,r.useRouter)();return a?null:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:"New Task"}),(0,n.jsx)("p",{className:"text-slate-300",children:"Some description about how tasks data is used or whatever."})]}),(0,n.jsx)(s.C,{projectData:e,onSubmit:(e,a,n,i)=>{t({type:"ADD_TASK",name:e,description:a,category:n,weight:i}),l.push("/tasks")}})]})}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=9992)}),_N_E=e.O()}]);