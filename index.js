var interdao;(()=>{"use strict";var e={57253:(e,t,_)=>{var r={"./bootstrap":()=>Promise.all([_.e("vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_sentre_antd-ionicon_dist_index-4f1828"),_.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_moment_moment_js"),_.e("vendors-node_modules_interdao_core_dist_app_index_js-node_modules_sentre_react-lazyload_lib_i-42a44b"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),_.e("src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--8814ba")]).then((()=>()=>_(5501)))},s=(e,t)=>(_.R=t,t=_.o(r,e)?r[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),_.R=void 0,t),o=(e,t)=>{if(_.S){var r="default",s=_.S[r];if(s&&s!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return _.S[r]=e,_.I(r,t)}};_.d(t,{get:()=>s,init:()=>o})}},t={};function _(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(o.exports,o,o.exports,_),o.loaded=!0,o.exports}_.m=e,_.c=t,_.amdO={},_.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return _.d(t,{a:t}),t},(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;_.t=function(r,s){if(1&s&&(r=this(r)),8&s)return r;if("object"===typeof r&&r){if(4&s&&r.__esModule)return r;if(16&s&&"function"===typeof r.then)return r}var o=Object.create(null);_.r(o);var n={};e=e||[null,t({}),t([]),t(t)];for(var a=2&s&&r;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>n[e]=()=>r[e]));return n.default=()=>r,_.d(o,n),o}})(),_.d=(e,t)=>{for(var r in t)_.o(t,r)&&!_.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},_.f={},_.e=e=>Promise.all(Object.keys(_.f).reduce(((t,r)=>(_.f[r](e,t),t)),[])),_.u=e=>"static/js/"+e+"."+{"vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js":"0415df62","vendors-node_modules_react-router_esm_react-router_js":"2ba56844","vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_sentre_antd-ionicon_dist_index-4f1828":"a1c829cc","vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-55fa97":"d6618658",webpack_sharing_consume_default_react_react:"504524ec","webpack_sharing_consume_default_react-dom_react-dom":"3febe6d2","webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":"8fba0186","node_modules_react_jsx-runtime_js":"3f093e85","vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_moment_moment_js":"2f23e107","vendors-node_modules_antd_es_index_js":"64b5b496","node_modules_copy-to-clipboard_index_js-node_modules_babel_runtime_helpers_esm_objectWithoutP-919b09":"18203233","vendors-node_modules_react-dom_index_js":"8e44dcc3","vendors-node_modules_react-redux_es_index_js":"49e48d09",node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js:"759c67da","node_modules_prop-types_index_js-node_modules_react-router-dom_esm_react-router-dom_js":"cba1fcaf",node_modules_react_index_js:"b231be6d","vendors-node_modules_interdao_core_dist_app_index_js-node_modules_sentre_react-lazyload_lib_i-42a44b":"ee5503fe","src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--8814ba":"5d7cf39d","node_modules_react-router-dom_esm_react-router-dom_js":"8f0d6984","_18f2-_0b7d-_25ed-_8131-_3fc0-_e4dd-_7bec-_ec71-_df0e-_887c-_c738-_9820-_7d1a-_b254-_ed1b-_d1-147343":"558cb81d",src_templates_blank_create_tsx:"bfb50cb2","src_templates_spl-approve_create_tsx":"415aba6e","src_templates_spl-transfer_create_tsx":"f69f112e",src_templates_blank_proposal_tsx:"4ba5aab9","src_templates_spl-approve_proposal_tsx":"9609ec4d","src_templates_spl-transfer_proposal_tsx":"bc9124fe",src_templates_undefined_proposal_tsx:"4e772dc6",src_templates_blank_info_tsx:"dfa09409","src_templates_spl-approve_info_tsx":"7108d57b","src_templates_spl-transfer_info_tsx":"5589eaf3",src_templates_undefined_info_tsx:"9a9aac21"}[e]+".chunk.js",_.miniCssF=e=>"static/css/"+e+"."+{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-55fa97":"1fca13ca","src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--8814ba":"0283573d"}[e]+".chunk.css",_.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),_.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={},t="interdao:";_.l=(r,s,o,n)=>{if(e[r])e[r].push(s);else{var a,d;if(void 0!==o)for(var i=document.getElementsByTagName("script"),u=0;u<i.length;u++){var c=i[u];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==t+o){a=c;break}}a||(d=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,_.nc&&a.setAttribute("nonce",_.nc),a.setAttribute("data-webpack",t+o),a.src=r),e[r]=[s];var l=(t,_)=>{a.onerror=a.onload=null,clearTimeout(m);var s=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),s&&s.forEach((e=>e(_))),t)return t(_)},m=setTimeout(l.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=l.bind(null,a.onerror),a.onload=l.bind(null,a.onload),d&&document.head.appendChild(a)}}})(),_.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},_.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{_.S={};var e={},t={};_.I=(r,s)=>{s||(s=[]);var o=t[r];if(o||(o=t[r]={}),!(s.indexOf(o)>=0)){if(s.push(o),e[r])return e[r];_.o(_.S,r)||(_.S[r]={});var n=_.S[r],a="interdao",d=(e,t,_,r)=>{var s=n[e]=n[e]||{},o=s[t];(!o||!o.loaded&&(!r!=!o.eager?r:a>o.from))&&(s[t]={get:_,from:a,eager:!!r})},i=[];if("default"===r)d("@reduxjs/toolkit","1.8.2",(()=>_.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>_(57853))))),d("@sentre/senhub","3.0.28",(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_sentre_antd-ionicon_dist_index-4f1828"),_.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-55fa97"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),_.e("node_modules_react_jsx-runtime_js")]).then((()=>()=>_(62526))))),d("antd","4.21.4",(()=>Promise.all([_.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_moment_moment_js"),_.e("vendors-node_modules_antd_es_index_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom"),_.e("node_modules_copy-to-clipboard_index_js-node_modules_babel_runtime_helpers_esm_objectWithoutP-919b09")]).then((()=>()=>_(47598))))),d("react-dom","17.0.2",(()=>Promise.all([_.e("vendors-node_modules_react-dom_index_js"),_.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>_(81108))))),d("react-redux","7.2.8",(()=>Promise.all([_.e("vendors-node_modules_react-redux_es_index_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("webpack_sharing_consume_default_react-dom_react-dom"),_.e("node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js")]).then((()=>()=>_(59771))))),d("react-router-dom","5.3.3",(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("webpack_sharing_consume_default_react_react"),_.e("node_modules_prop-types_index_js-node_modules_react-router-dom_esm_react-router-dom_js")]).then((()=>()=>_(9402))))),d("react","17.0.2",(()=>_.e("node_modules_react_index_js").then((()=>()=>_(7276)))));return i.length?e[r]=Promise.all(i).then((()=>e[r]=1)):e[r]=1}}})(),(()=>{var e;_.g.importScripts&&(e=_.g.location+"");var t=_.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),_.p=e})(),(()=>{var e=e=>{var t=e=>e.split(".").map((e=>+e==e?+e:e)),_=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),r=_[1]?t(_[1]):[];return _[2]&&(r.length++,r.push.apply(r,t(_[2]))),_[3]&&(r.push([]),r.push.apply(r,t(_[3]))),r},t=(t,_)=>{t=e(t),_=e(_);for(var r=0;;){if(r>=t.length)return r<_.length&&"u"!=(typeof _[r])[0];var s=t[r],o=(typeof s)[0];if(r>=_.length)return"u"==o;var n=_[r],a=(typeof n)[0];if(o!=a)return"o"==o&&"n"==a||"s"==a||"u"==o;if("o"!=o&&"u"!=o&&s!=n)return s<n;r++}},r=e=>{var t=e[0],_="";if(1===e.length)return"*";if(t+.5){_+=0==t?">=":-1==t?"<":1==t?"^":2==t?"~":t>0?"=":"!=";for(var s=1,o=1;o<e.length;o++)s--,_+="u"==(typeof(a=e[o]))[0]?"-":(s>0?".":"")+(s=2,a);return _}var n=[];for(o=1;o<e.length;o++){var a=e[o];n.push(0===a?"not("+d()+")":1===a?"("+d()+" || "+d()+")":2===a?n.pop()+" "+n.pop():r(a))}return d();function d(){return n.pop().replace(/^\((.+)\)$/,"$1")}},s=(t,_)=>{if(0 in t){_=e(_);var r=t[0],o=r<0;o&&(r=-r-1);for(var n=0,a=1,d=!0;;a++,n++){var i,u,c=a<t.length?(typeof t[a])[0]:"";if(n>=_.length||"o"==(u=(typeof(i=_[n]))[0]))return!d||("u"==c?a>r&&!o:""==c!=o);if("u"==u){if(!d||"u"!=c)return!1}else if(d)if(c==u)if(a<=r){if(i!=t[a])return!1}else{if(o?i>t[a]:i<t[a])return!1;i!=t[a]&&(d=!1)}else if("s"!=c&&"n"!=c){if(o||a<=r)return!1;d=!1,a--}else{if(a<=r||u<c!=o)return!1;d=!1}else"s"!=c&&"n"!=c&&(d=!1,a--)}}var l=[],m=l.pop.bind(l);for(n=1;n<t.length;n++){var p=t[n];l.push(1==p?m()|m():2==p?m()&m():p?s(p,_):!m())}return!!m()},o=(e,_)=>{var r=e[_];return Object.keys(r).reduce(((e,_)=>!e||!r[e].loaded&&t(e,_)?_:e),0)},n=(e,t,_,s)=>"Unsatisfied version "+_+" from "+(_&&e[t][_].from)+" of shared singleton module "+t+" (required "+r(s)+")",a=(e,t,_,r)=>{var a=o(e,_);return s(r,a)||"undefined"!==typeof console&&console.warn&&console.warn(n(e,_,a,r)),d(e[_][a])},d=e=>(e.loaded=1,e.get()),i=e=>function(t,r,s,o){var n=_.I(t);return n&&n.then?n.then(e.bind(e,t,_.S[t],r,s,o)):e(t,_.S[t],r,s,o)},u=i(((e,t,r,s,o)=>t&&_.o(t,r)?a(t,0,r,s):o())),c={},l={92950:()=>u("default","react",[1,17,0,2],(()=>_.e("node_modules_react_index_js").then((()=>()=>_(7276))))),12181:()=>u("default","react-dom",[1,17,0,2],(()=>_.e("vendors-node_modules_react-dom_index_js").then((()=>()=>_(81108))))),55754:()=>u("default","react-redux",[1,7,2,5],(()=>Promise.all([_.e("vendors-node_modules_react-redux_es_index_js"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(59771))))),45055:()=>u("default","react-router-dom",[1,5,3,0],(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("node_modules_react-router-dom_esm_react-router-dom_js")]).then((()=>()=>_(9402))))),94751:()=>u("default","antd",[1,4,21,0],(()=>Promise.all([_.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js-node_modules_moment_moment_js"),_.e("vendors-node_modules_antd_es_index_js"),_.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>_(47598))))),19289:()=>u("default","@reduxjs/toolkit",[1,1,6,2],(()=>_.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>_(57853))))),12069:()=>u("default","@sentre/senhub",[4,2,2,2],(()=>Promise.all([_.e("vendors-node_modules_react-router_esm_react-router_js"),_.e("vendors-node_modules_senswap_sen-js_dist_index_js-node_modules_sentre_antd-ionicon_dist_index-4f1828"),_.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-55fa97"),_.e("webpack_sharing_consume_default_react-dom_react-dom"),_.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),_.e("_18f2-_0b7d-_25ed-_8131-_3fc0-_e4dd-_7bec-_ec71-_df0e-_887c-_c738-_9820-_7d1a-_b254-_ed1b-_d1-147343")]).then((()=>()=>_(62526)))))},m={webpack_sharing_consume_default_react_react:[92950],"webpack_sharing_consume_default_react-dom_react-dom":[12181],"webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":[55754,45055,94751,19289],"src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--8814ba":[12069]};_.f.consumes=(e,t)=>{_.o(m,e)&&m[e].forEach((e=>{if(_.o(c,e))return t.push(c[e]);var r=t=>{c[e]=0,_.m[e]=r=>{delete _.c[e],r.exports=t()}},s=t=>{delete c[e],_.m[e]=r=>{throw delete _.c[e],t}};try{var o=l[e]();o.then?t.push(c[e]=o.then(r).catch(s)):r(o)}catch(n){s(n)}}))}})(),(()=>{var e=e=>new Promise(((t,r)=>{var s=_.miniCssF(e),o=_.p+s;if(((e,t)=>{for(var _=document.getElementsByTagName("link"),r=0;r<_.length;r++){var s=(n=_[r]).getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(s===e||s===t))return n}var o=document.getElementsByTagName("style");for(r=0;r<o.length;r++){var n;if((s=(n=o[r]).getAttribute("data-href"))===e||s===t)return n}})(s,o))return t();((e,t,_,r)=>{var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onerror=s.onload=o=>{if(s.onerror=s.onload=null,"load"===o.type)_();else{var n=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.href||t,d=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=n,d.request=a,s.parentNode.removeChild(s),r(d)}},s.href=t,document.head.appendChild(s)})(e,o,t,r)})),t={interdao:0};_.f.miniCss=(_,r)=>{t[_]?r.push(t[_]):0!==t[_]&&{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-55fa97":1,"src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--8814ba":1}[_]&&r.push(t[_]=e(_).then((()=>{t[_]=0}),(e=>{throw delete t[_],e})))}})(),(()=>{var e={interdao:0};_.f.j=(t,r)=>{var s=_.o(e,t)?e[t]:void 0;if(0!==s)if(s)r.push(s[2]);else if(/^webpack_sharing_consume_default_re(act(\-dom_react\-dom|_react)|duxjs_toolkit_reduxjs_toolkit\-webpack_sharing_consume_defau\-e4c479)$/.test(t))e[t]=0;else{var o=new Promise(((_,r)=>s=e[t]=[_,r]));r.push(s[2]=o);var n=_.p+_.u(t),a=new Error;_.l(n,(r=>{if(_.o(e,t)&&(0!==(s=e[t])&&(e[t]=void 0),s)){var o=r&&("load"===r.type?"missing":r.type),n=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+n+")",a.name="ChunkLoadError",a.type=o,a.request=n,s[1](a)}}),"chunk-"+t,t)}};var t=(t,r)=>{var s,o,[n,a,d]=r,i=0;if(n.some((t=>0!==e[t]))){for(s in a)_.o(a,s)&&(_.m[s]=a[s]);if(d)d(_)}for(t&&t(r);i<n.length;i++)o=n[i],_.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var r=_(57253);interdao=r})();
//# sourceMappingURL=index.js.map