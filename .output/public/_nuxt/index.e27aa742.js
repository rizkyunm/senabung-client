import{_ as p,a as v}from"./Footer.1fa0ed34.js";import{_ as f,o as a,c as o,a as t,b as s,f as k,u as y,h as w,v as $,y as A,i as c,j as d,z as B,A as N,E as C,G as _,t as r,D as L}from"./entry.248a4b76.js";import"./nuxt-link.e2e226c1.js";const T={},D={class:"call-to-action bg-green-progress pt-60 pb-20"},R={class:"container mx-auto"},S={class:"w-full text-center"},j=t("h1",{class:"text-5xl text-white font-semibold"},[s(" Bantu orang disekitarmu "),t("br"),s(" dengan meringankan bebannya bersama ")],-1);function V(m,n){return a(),o("section",D,[t("div",R,[t("div",S,[j,t("button",{class:"inline-block bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-4 mt-8 text-lg rounded-full",onClick:n[0]||(n[0]=i=>m.$router.push({path:"/register"}))}," Mulai Galang Dana ")])])])}const M=f(T,[["render",V]]),U=""+globalThis.__publicAssetsURL("testimonial-line.svg"),F=""+globalThis.__publicAssetsURL("testimonial-1-icon.png"),K=""+globalThis.__publicAssetsURL("testimonial-2-icon.png"),z=""+globalThis.__publicAssetsURL("testimonial-3-icon.png"),E={class:"landing-page"},G={class:"hero-section py-5"},I={class:"container mx-auto relative"},H={class:"flex flex-col items-center text-center py-5 lg:py-20 px-5"},q=t("h1",{class:"md:text-4xl text-lg text-orange-button font-bold md:mb-5 mb-2"},[s(" Bersama Senabung Indonesia "),t("br"),s(" Kurangi Kelaparan dan Tebarkan Kebahagiaan ")],-1),J=t("p",{class:"text-white text-sm md:text-xl font-medium md:mb-8 mb-2 italic"},[s(' "Dan sedekah akan memadamkan kesalahan '),t("br"),s(" sebagaimana air memadamkan api.” ")],-1),O={key:0,class:"container mx-auto pt-20"},P=_('<div class="flex justify-between items-center"><div class="w-auto"><h2 class="text-3xl font-bold text-teal-800 mb-8"> Mari bantu ringankan beban mereka. </h2></div><div class="w-auto mt-5"><a class="text-teal-800 hover:underline text-md font-semibold" href="">Lihat Semua</a></div></div>',1),Q={class:"grid grid-cols-3 gap-4 mt-3"},W={class:"h-56"},X=["src"],Y={class:"card-body"},Z={class:"card-title text-3xl font-medium text-gray-900 mt-5"},tt={class:"text-md font-light text-gray-900 h-12"},et={class:"relative pt-4 progress-bar"},st={class:"overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 h-3 rounded-lg"},at={class:"flex progress-info"},ot={class:"ml-auto font-semibold"},nt=["onClick"],it=t("div",{class:"cta-clip -mt-20"},null,-1),lt=_('<section class="container mx-auto py-24"><div class="flex justify-between items-center"><div class="w-auto"><h2 class="text-3xl text-teal-800 font-bold mb-8"> Lihat do&#39;a dari para <br> orang baik </h2></div></div><div class="flex mb-10"><div class="w-2/12 flex justify-center items-start"><img src="'+U+'" alt=""></div><div class="w-8/12 mt-16"><h2 class="text-3xl text-gray-900 font-light"> “Bismillah semoga Allah selalu memudahkan segala urusan kami, semoga kami selalu berada dalam lindungan-Nya.” </h2><div class="testimonial-info mt-8"><div class="name text-xl font-semibold">Hamba Allah</div><div class="title text-xl font-light text-gray-400">Depok</div></div><div class="testimonial-icon mt-10"><img src="'+F+'" alt="" class="w-20 mr-5 inline-block testimonial-user rounded-full"><img src="'+K+'" alt="" class="w-20 mr-5 inline-block testimonial-user rounded-full"><img src="'+z+'" alt="" class="w-20 mr-5 inline-block testimonial-user active rounded-full"></div></div><div class="w-2/12"></div></div></section>',1),ut=k({__name:"index",setup(m){const{$api:n}=y();let i=w([]);const h=$().public.apiBase;return A(async()=>{try{i.value=await n.campaign.list()}catch(l){console.error(l)}}),(l,u)=>{const b=p,x=M,g=v;return a(),o("div",E,[t("section",G,[t("div",I,[c(b)]),t("div",H,[q,J,t("button",{class:"block bg-orange-button hover:bg-orange-hover text-white font-semibold px-12 py-3 md:text-xl text-md rounded-full",onClick:u[0]||(u[0]=e=>l.$router.push({path:"/"}))}," Mulai Berdonasi ")])]),d(i)?(a(),o("section",O,[P,t("div",Q,[(a(!0),o(B,null,N(d(i),e=>(a(),o("div",{key:e.id,class:"card border border-gray-500 rounded-20"},[t("figure",W,[t("img",{src:d(h)+"/"+e.image_url,alt:"",class:""},null,8,X)]),t("div",Y,[t("h4",Z,r(e.name),1),t("p",tt,r(e.short_description),1),t("div",et,[t("div",st,[t("div",{style:L("width: "+e.current_amount/e.goal_amount*100+"%"),class:"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"},null,4)])]),t("div",at,[t("div",null,r(e.current_amount/e.goal_amount*100)+"% ",1),t("div",ot," Rp "+r(new Intl.NumberFormat().format(e.goal_amount)),1)]),t("button",{class:"text-center mt-5 button-cta block w-full bg-orange-button hover:bg-orange-hover text-white font-semibold px-6 py-2 text-lg rounded-full",onClick:rt=>l.$router.push({name:"donasi-id",params:{id:e.id}})}," Donasi Sekarang ",8,nt)])]))),128))])])):C("",!0),it,c(x),lt,c(g)])}}});export{ut as default};
