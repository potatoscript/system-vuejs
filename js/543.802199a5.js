"use strict";(self["webpackChunksystem_vuejs"]=self["webpackChunksystem_vuejs"]||[]).push([[543],{9543:function(t,e,a){a.r(e),a.d(e,{default:function(){return H}});var l=a(3396),o=a(7139),n=a(9242);const i={class:"justify-content-center mx-5"},s={class:"input-group"},d=(0,l._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-plus-square",viewBox:"0 0 16 16"},[(0,l._)("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"}),(0,l._)("path",{d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"})],-1),m=[d],p={class:"mx-3 pt-2"},r={class:"table table-striped"},c=(0,l._)("th",null,"ID",-1),h=["onClick"],u=(0,l._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-pencil-fill",viewBox:"0 0 16 16"},[(0,l._)("path",{d:"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"})],-1),_=[u],y=["onClick"],w=(0,l._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[(0,l._)("path",{"fill-rule":"evenodd",d:"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"})],-1),b=[w],g={class:"modal-body"},v={class:"input-group mb-3"},C={class:"input-group-text"},D={class:"input-group mb-3"},f={class:"input-group-text"},k={class:"input-group mb-3"},I={class:"input-group-text"};function z(t,e,a,d,u,w){const z=(0,l.up)("input-modal-view");return(0,l.wg)(),(0,l.iD)("div",i,[(0,l._)("div",s,[(0,l._)("button",{type:"button",class:"btn btn-primary m-2 fload-end","data-bs-toggle":"modal","data-bs-target":"#inputModal",onClick:e[0]||(e[0]=t=>w.addClick())},m),(0,l._)("div",p,[(0,l._)("h4",null,(0,o.zw)(u.ja_Master),1)])]),(0,l._)("table",r,[(0,l._)("thead",null,[(0,l._)("tr",null,[c,(0,l._)("th",null,(0,o.zw)(u.ja_Name),1),(0,l._)("th",null,(0,o.zw)(u.ja_Department),1),(0,l._)("th",null,(0,o.zw)(u.ja_Position),1)])]),(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(u.employees,(t=>((0,l.wg)(),(0,l.iD)("tr",{key:t.employeeId},[(0,l._)("td",null,(0,o.zw)(t.employeeId),1),(0,l._)("td",null,(0,o.zw)(t.name),1),(0,l._)("td",null,(0,o.zw)(t.department),1),(0,l._)("td",null,(0,o.zw)(t.position),1),(0,l._)("td",null,[(0,l._)("button",{type:"button",class:"btn btn-light mr-1","data-bs-toggle":"modal","data-bs-target":"#inputModal",onClick:e=>w.editClick(t)},_,8,h),(0,l._)("button",{type:"button",class:"btn btn-light mr-1",onClick:e=>w.deleteClick(t.employeeId)},b,8,y)])])))),128))])]),(0,l.Wm)(z,{Title:u.modalTitle,Id:u.EmployeeId,onCreateData:w.createClick,onUpdateData:w.updateClick},{modalBody:(0,l.w5)((()=>[(0,l._)("div",g,[(0,l._)("div",v,[(0,l._)("span",C,(0,o.zw)(u.ja_Name),1),(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=t=>u.Name=t)},null,512),[[n.nr,u.Name]])]),(0,l._)("div",D,[(0,l._)("span",f,(0,o.zw)(u.ja_Department),1),(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[2]||(e[2]=t=>u.Department=t)},null,512),[[n.nr,u.Department]])]),(0,l._)("div",k,[(0,l._)("span",I,(0,o.zw)(u.ja_Position),1),(0,l.wy)((0,l._)("input",{type:"text",class:"form-control","onUpdate:modelValue":e[3]||(e[3]=t=>u.Position=t)},null,512),[[n.nr,u.Position]])])])])),_:1},8,["Title","Id","onCreateData","onUpdateData"])])}var j=a(815),E=a(6265),N=a.n(E),P=a(8566),V=a(504),x=a(6676),M={components:{InputModalView:V.Z},data(){return{Department:"",EmployeeId:0,employees:[],ja_Create:P.Qj,ja_Department:P.yE,ja_Edit:P.I8,ja_Master:P.Qz,ja_Name:P.VG,ja_New:P.J1,ja_Position:P.Ly,ja_Update:P.BN,modalTitle:"",Name:"",Position:""}},methods:{addClick(){this.modalTitle=P.J1,this.EmployeeId=0,this.Name="",this.Position="",this.Department=""},createClick(){const t=this;N().post(j.Z.API_URL+"Employee/create-employee",{Name:this.Name,Department:this.Department,Position:this.Position}).then((()=>{document.getElementById("modal-close-btn").click(),t.refreshData()})).catch((t=>{alert("No Connection "+t)}))},deleteClick(t){const e=this;confirm(P.TX)&&N()["delete"](j.Z.API_URL+"Employee/delete-employee-by-id/"+t).then((()=>{document.getElementById("modal-close-btn").click(),e.refreshData()})).catch((t=>{alert("No Connection "+t)}))},editClick(t){this.modalTitle=P.I8,this.EmployeeId=t.employeeId,this.Name=t.name,this.Position=t.position,this.Department=t.department},refreshData(){const t=this;N().get(j.Z.API_URL+"Employee/read-all-employees").then((e=>{t.employees=e.data})).catch((e=>{console.log(e),t.employees=x[0].gt}))},updateClick(){const t=this;N().put(j.Z.API_URL+"Employee/update-employee-by-id/",{EmployeeId:this.EmployeeId,Name:this.Name,Department:this.Department,Position:this.Position,Email:this.Email}).then((()=>{document.getElementById("modal-close-btn").click(),t.refreshData()})).catch((t=>{alert("No Connection "+t)}))}},mounted:function(){this.refreshData()}},U=a(89);const B=(0,U.Z)(M,[["render",z]]);var H=B}}]);
//# sourceMappingURL=543.802199a5.js.map