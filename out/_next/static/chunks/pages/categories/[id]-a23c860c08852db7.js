(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[609],{3464:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/categories/[id]",function(){return s(1794)}])},1832:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});var n=s(5893);function i(e){let{children:t,className:s,...i}=e;return(0,n.jsx)("button",{className:"text-sm hover:underline ".concat(s),...i,children:t})}},5834:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});var n=s(5893);function i(e){let{children:t,className:s}=e;return(0,n.jsx)("td",{className:"py-4 px-4 ".concat(s),children:t})}},744:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});var n=s(5893);function i(e){let{children:t}=e;return(0,n.jsx)("th",{className:"py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400",children:t})}},1794:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return o}});var n=s(5893),i=s(1163),r=s(1881),c=s(1664),a=s.n(c),l=s(1832),d=s(744),u=s(5834);function o(){let e=(0,i.useRouter)(),{id:t}=e.query,[s,c,u]=(0,r.Z)(),o=s.categories.find(e=>e.id===parseInt(t));return u||!o?null:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:"pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500",children:"Category"}),(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:o.name})]}),(0,n.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,n.jsx)(a(),{href:"/categories/".concat(t,"/edit"),children:(0,n.jsx)(l.Z,{children:"Edit"})}),(0,n.jsx)(l.Z,{onClick:t=>{t.preventDefault(),e.push("/categories").then(()=>{c({type:"DUPLICATE_CATEGORY",category:o})})},children:"Duplicate"}),(0,n.jsx)(l.Z,{onClick:t=>{t.preventDefault(),e.push("/categories").then(()=>{c({type:"REMOVE_CATEGORY",categoryId:o.id})})},children:"Remove"})]})]}),(0,n.jsx)("div",{className:"mt-8",children:(0,n.jsxs)("table",{className:"w-1/2 divide-y-2 divide-slate-600 border border-slate-600",children:[(0,n.jsx)("thead",{className:"bg-slate-800",children:(0,n.jsx)("tr",{children:(0,n.jsx)(d.Z,{children:"Task"})})}),(0,n.jsx)("tbody",{className:"divide-y divide-slate-600",children:s.tasks.filter(e=>e.category===o.id).map(e=>(0,n.jsx)(x,{task:e},e.id))})]})})]})}function x(e){let{task:t}=e;return(0,n.jsx)("tr",{children:(0,n.jsxs)(u.Z,{className:"flex flex-col items-start space-y-1",children:[(0,n.jsx)(a(),{href:"/tasks/".concat(t.id),children:(0,n.jsx)("button",{className:"hover:underline",children:t.name})}),(0,n.jsx)("p",{className:"text-sm text-slate-400",children:t.description})]})})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=3464)}),_N_E=e.O()}]);