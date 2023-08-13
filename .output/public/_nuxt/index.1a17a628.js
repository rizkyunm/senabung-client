import{_ as v,a as f}from"./Footer.cc62e973.js";import{_ as k,o as s,c as o,a as t,b as a,f as y,u as w,r as $,h as A,x as N,i as m,j as r,v as h,y as L,z as B,G as g,t as c,A as C}from"./entry.3e678935.js";import"./nuxt-link.19ed2f35.js";const T={},j={class:"call-to-action bg-green-progress pt-60 pb-20"},S={class:"container mx-auto"},D={class:"w-full text-center"},R=t("h1",{class:"text-5xl text-white font-semibold"},[a(" Bantu orang disekitarmu "),t("br"),a(" dengan meringankan bebannya bersama ")],-1);function V(_,n){return s(),o("section",j,[t("div",S,[t("div",D,[R,t("button",{class:"inline-block bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 mt-8 text-lg rounded-full",onClick:n[0]||(n[0]=i=>_.$router.push({path:"/register"}))}," Mulai Galang Dana ")])])])}const F=k(T,[["render",V]]),M=""+globalThis.__publicAssetsURL("testimonial-line.svg"),U=""+globalThis.__publicAssetsURL("testimonial-1-icon.png"),K=""+globalThis.__publicAssetsURL("testimonial-2-icon.png"),z=""+globalThis.__publicAssetsURL("testimonial-3-icon.png"),G={class:"landing-page"},I={class:"hero-section py-5"},E={class:"container mx-auto relative"},H={class:"flex flex-col items-center text-center py-5 lg:py-20 px-5"},q=t("h1",{class:"md:text-4xl text-lg text-orange-button font-bold md:mb-5 mb-2"},[a(" Bersama Senabung Indonesia "),t("br"),a(" Kurangi Kelaparan dan Tebarkan Kebahagiaan ")],-1),J=t("p",{class:"text-white text-sm md:text-xl font-medium md:mb-8 mb-2 italic"},[a(' "Dan sedekah akan memadamkan kesalahan '),t("br"),a(" sebagaimana air memadamkan api.” ")],-1),O={key:0,class:"container mx-auto relative"},P=t("div",{class:"flex justify-center mt-3 h-96"},[t("span",{class:"loading loading-spinner loading-lg align-middle"})],-1),Q=[P],W={key:1,class:"container mx-auto pt-20"},X=g('<div class="flex justify-between items-center"><div class="w-auto"><h2 class="text-3xl font-bold text-teal-800 mb-8"> Mari bantu ringankan beban mereka. </h2></div><div class="w-auto mt-5"><a class="text-teal-800 hover:underline text-md font-semibold" href="/donasi">Lihat Semua</a></div></div>',1),Y={class:"grid grid-cols-3 gap-4 mt-3"},Z={class:"h-56"},tt=["src"],et={class:"card-body"},st={class:"card-title text-3xl font-medium text-orange-button mt-5"},ot={class:"text-md font-light text-gray-900 h-12"},at={class:"relative pt-4 progress-bar"},nt={class:"overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 h-3 rounded-lg"},it={class:"flex progress-info text-green-progress font-semibold"},lt={class:"ml-auto"},rt=["onClick"],ct=t("div",{class:"cta-clip -mt-20"},null,-1),dt=g('<section class="container mx-auto py-24"><div class="flex justify-between items-center"><div class="w-auto"><h2 class="text-3xl text-teal-800 font-bold mb-8"> Lihat do&#39;a dari para <br> orang baik </h2></div></div><div class="flex mb-10"><div class="w-2/12 flex justify-center items-start"><img src="'+M+'" alt=""></div><div class="w-8/12 mt-16"><h2 class="text-3xl text-gray-900 font-light"> “Bismillah semoga Allah selalu memudahkan segala urusan kami, semoga kami selalu berada dalam lindungan-Nya.” </h2><div class="testimonial-info mt-8"><div class="name text-xl font-semibold">Hamba Allah</div><div class="title text-xl font-light text-gray-400">Depok</div></div><div class="testimonial-icon mt-10"><img src="'+U+'" alt="" class="w-20 mr-5 inline-block testimonial-user rounded-full"><img src="'+K+'" alt="" class="w-20 mr-5 inline-block testimonial-user rounded-full"><img src="'+z+'" alt="" class="w-20 mr-5 inline-block testimonial-user active rounded-full"></div></div><div class="w-2/12"></div></div></section>',1),gt=y({__name:"index",setup(_){const{$api:n}=w();let i=$([]);const d=A(!1);return N(async()=>{try{i=await n.campaign.highlight(),d.value=!0}catch(l){console.error(l)}}),(l,u)=>{const b=v,x=F,p=f;return s(),o("div",G,[t("section",I,[t("div",E,[m(b)]),t("div",H,[q,J,t("button",{class:"block bg-orange-button hover:bg-orange-hover text-white font-semibold px-12 py-3 md:text-xl text-md rounded-full",onClick:u[0]||(u[0]=e=>l.$router.push({path:"/donasi"}))}," Mulai Berdonasi ")])]),r(d)?h("",!0):(s(),o("section",O,Q)),r(i)&&r(d)?(s(),o("section",W,[X,t("div",Y,[(s(!0),o(L,null,B(r(i),e=>(s(),o("div",{key:e.id,class:"card border border-gray-500 rounded-20"},[t("figure",Z,[t("img",{src:e.campaign_image,alt:"",class:""},null,8,tt)]),t("div",et,[t("h4",st,c(e.name),1),t("p",ot,c(e.short_description),1),t("div",at,[t("div",nt,[t("div",{style:C("width: "+e.current_amount/e.goal_amount*100+"%"),class:"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-progress progress-striped"},null,4)])]),t("div",it,[t("div",null,c((e.current_amount/e.goal_amount*100).toFixed(2))+"% ",1),t("div",lt," Rp "+c(new Intl.NumberFormat().format(e.goal_amount)),1)]),t("button",{class:"text-center mt-5 button-cta block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-2 text-lg rounded-full",onClick:mt=>l.$router.push({path:"/donasi/"+e.slug})}," Donasi Sekarang ",8,rt)])]))),128))])])):h("",!0),ct,m(x),dt,m(p)])}}});export{gt as default};
