import{_ as C}from"./ErrorModal.85fa5f97.js";import{f as F,g as j,B,u as D,r as R,h as n,o as h,d as f,w as r,a as t,j as o,t as m,n as $,T as L,i as N,e as U}from"./entry.3e678935.js";import{_ as A}from"./icon-avatar-add.391090ef.js";const G={class:"container mx-auto h-screen flex justify-center items-center"},M={class:"w-full lg:w-1/3 px-10 lg:px-0"},S={class:"flex justify-center items-center mx-auto mb-4 w-40"},T={class:"relative"},V=["src"],z=t("img",{src:A,alt:"",class:"absolute right-0 bottom-0 pb-2"},null,-1),E={class:"font-normal mb-3 text-3xl text-white text-center"},H=t("p",{class:"text-white text-center font-light"}," Silahkan unggah foto diri anda ",-1),O={class:"mb-4 mt-6"},q={class:"mb-3"},I=["disabled"],J={class:"mb-4"},K=t("h3",{class:"font-bold text-lg text-rose-800"},"Gagal Upload !",-1),P={class:"py-4"},Z=F({__name:"unggah",setup(Q){const{token:g,data:b}=j(),i=B(),{$api:v}=D(),s=R({url:"/avatar.jpg",selectedFiles:void 0}),c=n(null),x=a=>{const e=a.target.files[0];s.url=URL.createObjectURL(e),s.selectedFiles=e},w=async()=>{let a=new FormData;a.append("avatar",s==null?void 0:s.selectedFiles);try{(await v.user.avatar(g.value,a)).is_uploaded&&await i.push("/daftar-sukses")}catch{d.value="Gagal upload foto",l.value=!0}},d=n(""),l=n(!1);return(a,e)=>{const y=C,k=U;return h(),f(k,{name:"auth"},{default:r(()=>{var u;return[t("div",G,[t("div",M,[t("div",S,[t("div",T,[t("div",{class:"cursor-pointer",onClick:e[0]||(e[0]=_=>{var p;return(p=o(c))==null?void 0:p.click()})},[t("img",{src:o(s).url,alt:"",class:"rounded-full border-white border-4"},null,8,V),z,t("input",{ref_key:"file",ref:c,type:"file",style:{display:"none"},accept:"image/*",onChange:x},null,544)])])]),t("h2",E," Hi, "+m((u=o(b))==null?void 0:u.name),1),H,t("div",O,[t("div",q,[t("button",{disabled:o(s).selectedFiles===void 0,class:$([o(s).selectedFiles===void 0?"opacity-50 cursor-not-allowed":"","block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 text-lg rounded-full"]),onClick:w}," Daftar ",10,I)])]),t("div",null,[t("div",J,[t("button",{class:"block w-full bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light px-6 py-4 text-lg rounded-full",onClick:e[1]||(e[1]=_=>o(i).push({path:"/daftar-sukses"}))}," Lewati ")])])])]),(h(),f(L,{to:"body"},[N(y,{show:o(l),onClose:e[2]||(e[2]=_=>l.value=!1)},{header:r(()=>[K]),body:r(()=>[t("p",P,m(o(d)),1)]),_:1},8,["show"])]))]}),_:1})}}});export{Z as default};