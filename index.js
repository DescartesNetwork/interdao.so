var interdao;(()=>{"use strict";var e={10205:(e,t,_)=>{var r={"./bootstrap":()=>Promise.all([_.e("vendors-node_modules_chainsafe_libp2p-noise_dist_src_noise_js-node_modules_senswap_sen-js_dis-88f19a"),_.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_copy-to-clipbo-f41099"),_.e("vendors-node_modules_senswap_sen-js_dist_utils_js-node_modules_base64-js_index_js-node_module-343e97"),_.e("vendors-node_modules_sentre_antd-ionicon_dist_customs_js-node_modules_react-copy-to-clipboard-fbb357"),_.e("vendors-node_modules_interdao_core_dist_app_index_js-node_modules_sentre_antd-ionicon_dist_in-bc73d1"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa"),_.e("webpack_sharing_consume_default_react-router-dom_react-router-dom"),_.e("webpack_sharing_consume_default_antd_antd"),_.e("src_app_bootstrap_app_tsx-src_app_static_images_system_avatar_png-src_app_static_images_syste-bf26d4")]).then((()=>()=>_(51843)))},s=(e,t)=>(_.R=t,t=_.o(r,e)?r[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),_.R=void 0,t),o=(e,t)=>{if(_.S){var r="default",s=_.S[r];if(s&&s!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return _.S[r]=e,_.I(r,t)}};_.d(t,{get:()=>s,init:()=>o})}},t={};function _(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(o.exports,o,o.exports,_),o.loaded=!0,o.exports}_.m=e,_.c=t,_.amdO={},_.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return _.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;_.t=function(r,s){if(1&s&&(r=this(r)),8&s)return r;if("object"===typeof r&&r){if(4&s&&r.__esModule)return r;if(16&s&&"function"===typeof r.then)return r}var o=Object.create(null);_.r(o);var a={};e=e||[null,t({}),t([]),t(t)];for(var n=2&s&&r;"object"==typeof n&&!~e.indexOf(n);n=t(n))Object.getOwnPropertyNames(n).forEach((e=>a[e]=()=>r[e]));return a.default=()=>r,_.d(o,a),o}})(),_.d=(e,t)=>{for(var r in t)_.o(t,r)&&!_.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},_.f={},_.e=e=>Promise.all(Object.keys(_.f).reduce(((t,r)=>(_.f[r](e,t),t)),[])),_.u=e=>"static/js/"+e+"."+{"vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js":"0415df62",webpack_sharing_consume_default_react_react:"504524ec","src_os_store_context_ts-_3b660":"9b3543cd","vendors-node_modules_chainsafe_libp2p-noise_dist_src_noise_js-node_modules_senswap_sen-js_dis-88f19a":"ac1b573c","vendors-node_modules_project-serum_sol-wallet-adapter_dist_esm_index_js-node_modules_solana_s-b1e79b":"7c7dabfa","vendors-node_modules_senswap_sen-js_dist_utils_js-node_modules_base64-js_index_js-node_module-343e97":"13e253bc","src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-e7cc55":"4b98eeb4","webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa":"d2416a23","src_os_store_index_ts-src_shared_dataloader_index_ts":"ec2201df",webpack_sharing_consume_default_antd_antd:"1dafcd4d","src_os_providers_index_tsx-src_shared_storage_ts-src_shared_util_ts-node_modules_react_cjs_re-71bd3f":"3ea21c9b","vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_copy-to-clipbo-f41099":"acc42072","vendors-node_modules_antd_es_index_js":"b43e6bd5","webpack_sharing_consume_default_react-dom_react-dom":"3febe6d2",node_modules_babel_runtime_regenerator_index_js:"e0f6cd0a","vendors-node_modules_react-dom_index_js":"8e44dcc3","vendors-node_modules_react-redux_es_index_js":"36eaa414","vendors-node_modules_react-router_esm_react-router_js":"3cc5ea8d","node_modules_prop-types_index_js-node_modules_react-router-dom_esm_react-router-dom_js":"f78469c9",node_modules_react_index_js:"b231be6d","vendors-node_modules_sentre_antd-ionicon_dist_customs_js-node_modules_react-copy-to-clipboard-fbb357":"ba0933b5","vendors-node_modules_interdao_core_dist_app_index_js-node_modules_sentre_antd-ionicon_dist_in-bc73d1":"836469a9","webpack_sharing_consume_default_react-router-dom_react-router-dom":"85c53ac5","src_app_bootstrap_app_tsx-src_app_static_images_system_avatar_png-src_app_static_images_syste-bf26d4":"860f46e4","src_os_store_context_ts-_3b661":"413283b5","node_modules_react-router-dom_esm_react-router-dom_js":"8f0d6984",src_os_providers_index_tsx:"a8ccb474"}[e]+".chunk.js",_.miniCssF=e=>"static/css/"+e+".15908c02.chunk.css",_.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),_.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="interdao:";_.l=(r,s,o,a)=>{if(e[r])e[r].push(s);else{var n,d;if(void 0!==o)for(var i=document.getElementsByTagName("script"),c=0;c<i.length;c++){var u=i[c];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==t+o){n=u;break}}n||(d=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,_.nc&&n.setAttribute("nonce",_.nc),n.setAttribute("data-webpack",t+o),n.src=r),e[r]=[s];var l=(t,_)=>{n.onerror=n.onload=null,clearTimeout(m);var s=e[r];if(delete e[r],n.parentNode&&n.parentNode.removeChild(n),s&&s.forEach((e=>e(_))),t)return t(_)},m=setTimeout(l.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=l.bind(null,n.onerror),n.onload=l.bind(null,n.onload),d&&document.head.appendChild(n)}}})(),_.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},_.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),_.j="interdao",(()=>{_.S={};var e={},t={};_.I=(r,s)=>{s||(s=[]);var o=t[r];if(o||(o=t[r]={}),!(s.indexOf(o)>=0)){if(s.push(o),e[r])return e[r];_.o(_.S,r)||(_.S[r]={});var a=_.S[r],n="interdao",d=(e,t,_,r)=>{var s=a[e]=a[e]||{},o=s[t];(!o||!o.loaded&&(!r!=!o.eager?r:n>o.from))&&(s[t]={get:_,from:n,eager:!!r})},i=[];if("default"===r)d("@reduxjs/toolkit","1.8.2",(()=>_.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>_(57853))))),d("@senhub/context","2.2.2",(()=>Promise.all([_.e("webpack_sharing_consume_default_react_react"),_.e("src_os_store_context_ts-_3b660")]).then((()=>()=>_(23320))))),d("@senhub/providers","2.2.2",(()=>Promise.all([_.e("vendors-node_modules_chainsafe_libp2p-noise_dist_src_noise_js-node_modules_senswap_sen-js_dis-88f19a"),_.e("vendors-node_modules_project-serum_sol-wallet-adapter_dist_esm_index_js-node_modules_solana_s-b1e79b"),_.e("vendors-node_modules_senswap_sen-js_dist_utils_js-node_modules_base64-js_index_js-node_module-343e97"),_.e("webpack_sharing_consume_default_react_react"),_.e("src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-e7cc55"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa"),_.e("src_os_store_index_ts-src_shared_dataloader_index_ts"),_.e("webpack_sharing_consume_default_antd_antd"),_.e("src_os_providers_index_tsx-src_shared_storage_ts-src_shared_util_ts-node_modules_react_cjs_re-71bd3f")]).then((()=>()=>_(80039))))),d("antd","4.21.1",(()=>Promise.all([_.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_copy-to-clipbo-f41099"),_.e("vendors-node_modules_antd_es_index_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom"),_.e("node_modules_babel_runtime_regenerator_index_js")]).then((()=>()=>_(81860))))),d("react-dom","17.0.2",(()=>Promise.all([_.e("vendors-node_modules_react-dom_index_js"),_.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>_(81108))))),d("react-redux","7.2.8",(()=>Promise.all([_.e("vendors-node_modules_react-redux_es_index_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(59771))))),d("react-router-dom","5.3.3",(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("node_modules_prop-types_index_js-node_modules_react-router-dom_esm_react-router-dom_js")]).then((()=>()=>_(9402))))),d("react","17.0.2",(()=>_.e("node_modules_react_index_js").then((()=>()=>_(7276)))));return i.length?e[r]=Promise.all(i).then((()=>e[r]=1)):e[r]=1}}})(),(()=>{var e;_.g.importScripts&&(e=_.g.location+"");var t=_.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),_.p=e})(),(()=>{var e=e=>{var t=e=>e.split(".").map((e=>+e==e?+e:e)),_=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),r=_[1]?t(_[1]):[];return _[2]&&(r.length++,r.push.apply(r,t(_[2]))),_[3]&&(r.push([]),r.push.apply(r,t(_[3]))),r},t=(t,_)=>{t=e(t),_=e(_);for(var r=0;;){if(r>=t.length)return r<_.length&&"u"!=(typeof _[r])[0];var s=t[r],o=(typeof s)[0];if(r>=_.length)return"u"==o;var a=_[r],n=(typeof a)[0];if(o!=n)return"o"==o&&"n"==n||"s"==n||"u"==o;if("o"!=o&&"u"!=o&&s!=a)return s<a;r++}},r=e=>{var t=e[0],_="";if(1===e.length)return"*";if(t+.5){_+=0==t?">=":-1==t?"<":1==t?"^":2==t?"~":t>0?"=":"!=";for(var s=1,o=1;o<e.length;o++)s--,_+="u"==(typeof(n=e[o]))[0]?"-":(s>0?".":"")+(s=2,n);return _}var a=[];for(o=1;o<e.length;o++){var n=e[o];a.push(0===n?"not("+d()+")":1===n?"("+d()+" || "+d()+")":2===n?a.pop()+" "+a.pop():r(n))}return d();function d(){return a.pop().replace(/^\((.+)\)$/,"$1")}},s=(t,_)=>{if(0 in t){_=e(_);var r=t[0],o=r<0;o&&(r=-r-1);for(var a=0,n=1,d=!0;;n++,a++){var i,c,u=n<t.length?(typeof t[n])[0]:"";if(a>=_.length||"o"==(c=(typeof(i=_[a]))[0]))return!d||("u"==u?n>r&&!o:""==u!=o);if("u"==c){if(!d||"u"!=u)return!1}else if(d)if(u==c)if(n<=r){if(i!=t[n])return!1}else{if(o?i>t[n]:i<t[n])return!1;i!=t[n]&&(d=!1)}else if("s"!=u&&"n"!=u){if(o||n<=r)return!1;d=!1,n--}else{if(n<=r||c<u!=o)return!1;d=!1}else"s"!=u&&"n"!=u&&(d=!1,n--)}}var l=[],m=l.pop.bind(l);for(a=1;a<t.length;a++){var p=t[a];l.push(1==p?m()|m():2==p?m()&m():p?s(p,_):!m())}return!!m()},o=(e,_)=>{var r=e[_];return Object.keys(r).reduce(((e,_)=>!e||!r[e].loaded&&t(e,_)?_:e),0)},a=(e,t,_,s)=>"Unsatisfied version "+_+" from "+(_&&e[t][_].from)+" of shared singleton module "+t+" (required "+r(s)+")",n=(e,t,_,r)=>{var n=o(e,_);return s(r,n)||"undefined"!==typeof console&&console.warn&&console.warn(a(e,_,n,r)),d(e[_][n])},d=e=>(e.loaded=1,e.get()),i=e=>function(t,r,s,o){var a=_.I(t);return a&&a.then?a.then(e.bind(e,t,_.S[t],r,s,o)):e(t,_.S[t],r,s,o)},c=i(((e,t,r,s,o)=>t&&_.o(t,r)?n(t,0,r,s):o())),u={},l={92950:()=>c("default","react",[1,17,0,2],(()=>_.e("node_modules_react_index_js").then((()=>()=>_(7276))))),38703:()=>c("default","@senhub/context",[4,2,2,2],(()=>_.e("src_os_store_context_ts-_3b661").then((()=>()=>_(23320))))),55754:()=>c("default","react-redux",[1,7,2,5],(()=>Promise.all([_.e("vendors-node_modules_react-redux_es_index_js"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(59771))))),19289:()=>c("default","@reduxjs/toolkit",[1,1,6,2],(()=>_.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>_(57853))))),94751:()=>c("default","antd",[1,4,21,0],(()=>Promise.all([_.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_copy-to-clipbo-f41099"),_.e("vendors-node_modules_antd_es_index_js"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(81860))))),12181:()=>c("default","react-dom",[1,17,0,2],(()=>_.e("vendors-node_modules_react-dom_index_js").then((()=>()=>_(81108))))),45055:()=>c("default","react-router-dom",[1,5,3,0],(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("node_modules_react-router-dom_esm_react-router-dom_js")]).then((()=>()=>_(9402))))),47229:()=>c("default","@senhub/providers",[4,2,2,2],(()=>Promise.all([_.e("vendors-node_modules_project-serum_sol-wallet-adapter_dist_esm_index_js-node_modules_solana_s-b1e79b"),_.e("src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-e7cc55"),_.e("src_os_providers_index_tsx")]).then((()=>()=>_(80039)))))},m={webpack_sharing_consume_default_react_react:[92950],"src_os_store_devTools_ts-src_os_store_mints_reducer_ts-src_os_view_wallet_lib_cloverWallet_ts-e7cc55":[38703],"webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-3cd5aa":[55754,19289],webpack_sharing_consume_default_antd_antd:[94751],"webpack_sharing_consume_default_react-dom_react-dom":[12181],"webpack_sharing_consume_default_react-router-dom_react-router-dom":[45055],"src_app_bootstrap_app_tsx-src_app_static_images_system_avatar_png-src_app_static_images_syste-bf26d4":[47229]};_.f.consumes=(e,t)=>{_.o(m,e)&&m[e].forEach((e=>{if(_.o(u,e))return t.push(u[e]);var r=t=>{u[e]=0,_.m[e]=r=>{delete _.c[e],r.exports=t()}},s=t=>{delete u[e],_.m[e]=r=>{throw delete _.c[e],t}};try{var o=l[e]();o.then?t.push(u[e]=o.then(r).catch(s)):r(o)}catch(a){s(a)}}))}})(),(()=>{var e=e=>new Promise(((t,r)=>{var s=_.miniCssF(e),o=_.p+s;if(((e,t)=>{for(var _=document.getElementsByTagName("link"),r=0;r<_.length;r++){var s=(a=_[r]).getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(s===e||s===t))return a}var o=document.getElementsByTagName("style");for(r=0;r<o.length;r++){var a;if((s=(a=o[r]).getAttribute("data-href"))===e||s===t)return a}})(s,o))return t();((e,t,_,r)=>{var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onerror=s.onload=o=>{if(s.onerror=s.onload=null,"load"===o.type)_();else{var a=o&&("load"===o.type?"missing":o.type),n=o&&o.target&&o.target.href||t,d=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=a,d.request=n,s.parentNode.removeChild(s),r(d)}},s.href=t,document.head.appendChild(s)})(e,o,t,r)})),t={interdao:0};_.f.miniCss=(_,r)=>{t[_]?r.push(t[_]):0!==t[_]&&{"src_app_bootstrap_app_tsx-src_app_static_images_system_avatar_png-src_app_static_images_syste-bf26d4":1}[_]&&r.push(t[_]=e(_).then((()=>{t[_]=0}),(e=>{throw delete t[_],e})))}})(),(()=>{var e={interdao:0};_.f.j=(t,r)=>{var s=_.o(e,t)?e[t]:void 0;if(0!==s)if(s)r.push(s[2]);else if(/^webpack_sharing_consume_default_(re(act(\-(dom_react|router\-dom_react\-router)\-dom|_react)|duxjs_toolkit_reduxjs_toolkit\-webpack_sharing_consume_defau\-3cd5aa)|antd_antd)$/.test(t))e[t]=0;else{var o=new Promise(((_,r)=>s=e[t]=[_,r]));r.push(s[2]=o);var a=_.p+_.u(t),n=new Error;_.l(a,(r=>{if(_.o(e,t)&&(0!==(s=e[t])&&(e[t]=void 0),s)){var o=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;n.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",n.name="ChunkLoadError",n.type=o,n.request=a,s[1](n)}}),"chunk-"+t,t)}};var t=(t,r)=>{var s,o,[a,n,d]=r,i=0;if(a.some((t=>0!==e[t]))){for(s in n)_.o(n,s)&&(_.m[s]=n[s]);if(d)d(_)}for(t&&t(r);i<a.length;i++)o=a[i],_.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var r=_(10205);interdao=r})();
//# sourceMappingURL=index.js.map