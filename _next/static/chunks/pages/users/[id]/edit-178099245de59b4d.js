(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[110],{965:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/users/[id]/edit",function(){return t(131)}])},131:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return EditUserPage}});var n=t(5893),r=t(5850),u=t(1163),i=t(1881);function EditUserPage(){let e=(0,u.useRouter)(),{id:s}=e.query,[t,a,c]=(0,i.Z)(),d=t.users.find(e=>e.id===parseInt(s));return c||!d?null:(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-2xl font-semibold",children:"Edit User"}),(0,n.jsx)("p",{className:"text-slate-300",children:"Some description about how users data is used or whatever."})]}),(0,n.jsx)(r.h,{onSubmit:(t,n,r,u)=>{a({type:"EDIT_USER",userId:parseInt(s),name:t,categories:u,task_blacklist:n.map(e=>parseInt(e)),preferences:r.map(e=>parseInt(e))}),e.push("/users/".concat(s))},user:d})]})}}},function(e){e.O(0,[630,876,850,774,888,179],function(){return e(e.s=965)}),_N_E=e.O()}]);