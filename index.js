var inter_dao;(()=>{"use strict";var e={57253:(e,_,t)=>{var s={"./bootstrap":()=>Promise.all([t.e("vendors-node_modules_copy-to-clipboard_index_js-node_modules_moment_moment_js-node_modules_ba-b5e67b"),t.e("vendors-node_modules_metaplex_js_lib_index_browser_esm_js-node_modules_project-serum_anchor_d-cd6d9d"),t.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js"),t.e("vendors-node_modules_interdao_core_dist_app_index_js-node_modules_sen-use_app_dist_components-3ddd74"),t.e("webpack_sharing_consume_default_react_react"),t.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),t.e("src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--1fc7ce")]).then((()=>()=>t(70011)))},o=(e,_)=>(t.R=_,_=t.o(s,e)?s[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),t.R=void 0,_),r=(e,_)=>{if(t.S){var s="default",o=t.S[s];if(o&&o!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return t.S[s]=e,t.I(s,_)}};t.d(_,{get:()=>o,init:()=>r})}},_={};function t(s){var o=_[s];if(void 0!==o)return o.exports;var r=_[s]={id:s,loaded:!1,exports:{}};return e[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}t.m=e,t.c=_,t.amdO={},t.n=e=>{var _=e&&e.__esModule?()=>e.default:()=>e;return t.d(_,{a:_}),_},(()=>{var e,_=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;t.t=function(s,o){if(1&o&&(s=this(s)),8&o)return s;if("object"===typeof s&&s){if(4&o&&s.__esModule)return s;if(16&o&&"function"===typeof s.then)return s}var r=Object.create(null);t.r(r);var n={};e=e||[null,_({}),_([]),_(_)];for(var d=2&o&&s;"object"==typeof d&&!~e.indexOf(d);d=_(d))Object.getOwnPropertyNames(d).forEach((e=>n[e]=()=>s[e]));return n.default=()=>s,t.d(r,n),r}})(),t.d=(e,_)=>{for(var s in _)t.o(_,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:_[s]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((_,s)=>(t.f[s](e,_),_)),[])),t.u=e=>"static/js/"+e+"."+{"vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js":"e4ed18c4",node_modules_babel_runtime_helpers_esm_defineProperty_js:"4462af22","vendors-node_modules_copy-to-clipboard_index_js-node_modules_moment_moment_js-node_modules_ba-b5e67b":"e3f86772","vendors-node_modules_sentre_connector_dist_index_js":"07172255","vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":"103d9e47","vendors-node_modules_metaplex_js_lib_index_browser_esm_js-node_modules_project-serum_anchor_d-cd6d9d":"8447df3b","webpack_sharing_consume_default_react-dom_react-dom":"078962cc",webpack_sharing_consume_default_react_react:"e7d42047","webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":"59f3fe3e","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-node_modules_react_jsx-r-7486bc":"71cf783a","vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js":"30b80edf","vendors-node_modules_antd_es_index_js":"dce965ec","vendors-node_modules_react-dom_index_js":"f8df3688","vendors-node_modules_react-redux_es_index_js":"1c082276","vendors-node_modules_react-router-dom_esm_react-router-dom_js":"02cd9021","node_modules_prop-types_index_js":"edb2f88d",node_modules_react_index_js:"be82be08","vendors-node_modules_interdao_core_dist_app_index_js-node_modules_sen-use_app_dist_components-3ddd74":"ff91d7d5","src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--1fc7ce":"b4a6ce72","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae-_51ea-_ce41-_8131--cd0403":"9749f198","node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae":"0824cea2",src_templates_view_blank_create_tsx:"7beade1c","src_templates_view_embedded-view_create_tsx":"02efe43d","vendors-node_modules_sentre_farming_dist_app_index_js-node_modules_react-use_esm_useSetState_js":"4cc7e91d","src_templates_view_sen-farming-stake_create_tsx":"eb044809","src_templates_view_spl-approve_create_tsx":"a0060e3a","src_templates_view_spl-transfer_create_tsx":"145f9768",src_templates_view_blank_proposal_tsx:"8f20ef12","src_templates_view_embedded-view_proposal_tsx":"d9e23fd5","src_templates_view_sen-farming-stake_proposal_tsx":"a2d6c389","src_templates_view_spl-approve_proposal_tsx":"e9e5448f","src_templates_view_spl-transfer_proposal_tsx":"080e83c6",src_templates_view_blank_info_tsx:"93a4f5bb","src_templates_view_embedded-view_info_tsx":"45dbf689","src_templates_view_sen-farming-stake_info_tsx":"52fd9684","src_templates_view_spl-approve_info_tsx":"6cb68d03","src_templates_view_spl-transfer_info_tsx":"96d6a849"}[e]+".chunk.js",t.miniCssF=e=>"static/css/"+e+"."+{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":"dab053f2","src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--1fc7ce":"62044038"}[e]+".chunk.css",t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}(),t.o=(e,_)=>Object.prototype.hasOwnProperty.call(e,_),(()=>{var e={},_="inter_dao:";t.l=(s,o,r,n)=>{if(e[s])e[s].push(o);else{var d,a;if(void 0!==r)for(var i=document.getElementsByTagName("script"),c=0;c<i.length;c++){var u=i[c];if(u.getAttribute("src")==s||u.getAttribute("data-webpack")==_+r){d=u;break}}d||(a=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,t.nc&&d.setAttribute("nonce",t.nc),d.setAttribute("data-webpack",_+r),d.src=s),e[s]=[o];var l=(_,t)=>{d.onerror=d.onload=null,clearTimeout(m);var o=e[s];if(delete e[s],d.parentNode&&d.parentNode.removeChild(d),o&&o.forEach((e=>e(t))),_)return _(t)},m=setTimeout(l.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=l.bind(null,d.onerror),d.onload=l.bind(null,d.onload),a&&document.head.appendChild(d)}}})(),t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),t.j="inter_dao",(()=>{t.S={};var e={},_={};t.I=(s,o)=>{o||(o=[]);var r=_[s];if(r||(r=_[s]={}),!(o.indexOf(r)>=0)){if(o.push(r),e[s])return e[s];t.o(t.S,s)||(t.S[s]={});var n=t.S[s],d="inter_dao",a=(e,_,t,s)=>{var o=n[e]=n[e]||{},r=o[_];(!r||!r.loaded&&(!s!=!r.eager?s:d>r.from))&&(o[_]={get:t,from:d,eager:!!s})},i=[];if("default"===s)a("@reduxjs/toolkit","1.8.6",(()=>Promise.all([t.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js"),t.e("node_modules_babel_runtime_helpers_esm_defineProperty_js")]).then((()=>()=>t(57853))))),a("@sentre/senhub","4.3.5",(()=>Promise.all([t.e("vendors-node_modules_copy-to-clipboard_index_js-node_modules_moment_moment_js-node_modules_ba-b5e67b"),t.e("vendors-node_modules_sentre_connector_dist_index_js"),t.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),t.e("vendors-node_modules_metaplex_js_lib_index_browser_esm_js-node_modules_project-serum_anchor_d-cd6d9d"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("webpack_sharing_consume_default_react_react"),t.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),t.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-node_modules_react_jsx-r-7486bc")]).then((()=>()=>t(11739))))),a("antd","4.23.5",(()=>Promise.all([t.e("vendors-node_modules_copy-to-clipboard_index_js-node_modules_moment_moment_js-node_modules_ba-b5e67b"),t.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js"),t.e("vendors-node_modules_antd_es_index_js"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>t(85412))))),a("react-dom","17.0.2",(()=>Promise.all([t.e("vendors-node_modules_react-dom_index_js"),t.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>t(81108))))),a("react-redux","7.2.9",(()=>Promise.all([t.e("vendors-node_modules_react-redux_es_index_js"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("webpack_sharing_consume_default_react_react")]).then((()=>()=>t(59771))))),a("react-router-dom","5.3.4",(()=>Promise.all([t.e("vendors-node_modules_react-router-dom_esm_react-router-dom_js"),t.e("webpack_sharing_consume_default_react_react"),t.e("node_modules_prop-types_index_js")]).then((()=>()=>t(34156))))),a("react","17.0.2",(()=>t.e("node_modules_react_index_js").then((()=>()=>t(7276)))));return i.length?e[s]=Promise.all(i).then((()=>e[s]=1)):e[s]=1}}})(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var _=t.g.document;if(!e&&_&&(_.currentScript&&(e=_.currentScript.src),!e)){var s=_.getElementsByTagName("script");s.length&&(e=s[s.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),(()=>{var e=e=>{var _=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),s=t[1]?_(t[1]):[];return t[2]&&(s.length++,s.push.apply(s,_(t[2]))),t[3]&&(s.push([]),s.push.apply(s,_(t[3]))),s},_=(_,t)=>{_=e(_),t=e(t);for(var s=0;;){if(s>=_.length)return s<t.length&&"u"!=(typeof t[s])[0];var o=_[s],r=(typeof o)[0];if(s>=t.length)return"u"==r;var n=t[s],d=(typeof n)[0];if(r!=d)return"o"==r&&"n"==d||"s"==d||"u"==r;if("o"!=r&&"u"!=r&&o!=n)return o<n;s++}},s=e=>{var _=e[0],t="";if(1===e.length)return"*";if(_+.5){t+=0==_?">=":-1==_?"<":1==_?"^":2==_?"~":_>0?"=":"!=";for(var o=1,r=1;r<e.length;r++)o--,t+="u"==(typeof(d=e[r]))[0]?"-":(o>0?".":"")+(o=2,d);return t}var n=[];for(r=1;r<e.length;r++){var d=e[r];n.push(0===d?"not("+a()+")":1===d?"("+a()+" || "+a()+")":2===d?n.pop()+" "+n.pop():s(d))}return a();function a(){return n.pop().replace(/^\((.+)\)$/,"$1")}},o=(_,t)=>{if(0 in _){t=e(t);var s=_[0],r=s<0;r&&(s=-s-1);for(var n=0,d=1,a=!0;;d++,n++){var i,c,u=d<_.length?(typeof _[d])[0]:"";if(n>=t.length||"o"==(c=(typeof(i=t[n]))[0]))return!a||("u"==u?d>s&&!r:""==u!=r);if("u"==c){if(!a||"u"!=u)return!1}else if(a)if(u==c)if(d<=s){if(i!=_[d])return!1}else{if(r?i>_[d]:i<_[d])return!1;i!=_[d]&&(a=!1)}else if("s"!=u&&"n"!=u){if(r||d<=s)return!1;a=!1,d--}else{if(d<=s||c<u!=r)return!1;a=!1}else"s"!=u&&"n"!=u&&(a=!1,d--)}}var l=[],m=l.pop.bind(l);for(n=1;n<_.length;n++){var p=_[n];l.push(1==p?m()|m():2==p?m()&m():p?o(p,t):!m())}return!!m()},r=(e,t)=>{var s=e[t];return Object.keys(s).reduce(((e,t)=>!e||!s[e].loaded&&_(e,t)?t:e),0)},n=(e,_,t,o)=>"Unsatisfied version "+t+" from "+(t&&e[_][t].from)+" of shared singleton module "+_+" (required "+s(o)+")",d=(e,_,t,s)=>{var d=r(e,t);return o(s,d)||"undefined"!==typeof console&&console.warn&&console.warn(n(e,t,d,s)),a(e[t][d])},a=e=>(e.loaded=1,e.get()),i=e=>function(_,s,o,r){var n=t.I(_);return n&&n.then?n.then(e.bind(e,_,t.S[_],s,o,r)):e(_,t.S[_],s,o,r)},c=i(((e,_,s,o,r)=>_&&t.o(_,s)?d(_,0,s,o):r())),u={},l={12181:()=>c("default","react-dom",[1,17,0,2],(()=>t.e("vendors-node_modules_react-dom_index_js").then((()=>()=>t(81108))))),92950:()=>c("default","react",[1,17,0,2],(()=>t.e("node_modules_react_index_js").then((()=>()=>t(7276))))),55754:()=>c("default","react-redux",[1,7,2,5],(()=>Promise.all([t.e("vendors-node_modules_react-redux_es_index_js"),t.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>t(59771))))),45055:()=>c("default","react-router-dom",[1,5,3,0],(()=>t.e("vendors-node_modules_react-router-dom_esm_react-router-dom_js").then((()=>()=>t(34156))))),32671:()=>c("default","antd",[1,4,23,0],(()=>Promise.all([t.e("vendors-node_modules_ant-design_icons_es_icons_LoadingOutlined_js"),t.e("vendors-node_modules_antd_es_index_js"),t.e("webpack_sharing_consume_default_react-dom_react-dom")]).then((()=>()=>t(85412))))),19289:()=>c("default","@reduxjs/toolkit",[1,1,6,2],(()=>t.e("vendors-node_modules_reduxjs_toolkit_dist_redux-toolkit_esm_js").then((()=>()=>t(57853))))),18863:()=>c("default","@sentre/senhub",[1,4,1,1],(()=>Promise.all([t.e("vendors-node_modules_copy-to-clipboard_index_js-node_modules_moment_moment_js-node_modules_ba-b5e67b"),t.e("vendors-node_modules_sentre_connector_dist_index_js"),t.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),t.e("vendors-node_modules_metaplex_js_lib_index_browser_esm_js-node_modules_project-serum_anchor_d-cd6d9d"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479"),t.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae-_51ea-_ce41-_8131--cd0403")]).then((()=>()=>t(11739))))),41165:()=>c("default","@sentre/senhub",[1,3,2,23],(()=>Promise.all([t.e("vendors-node_modules_sentre_connector_dist_index_js"),t.e("vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140"),t.e("webpack_sharing_consume_default_react-dom_react-dom"),t.e("node_modules_sentre_senhub_dist_components_pageLoader_lazy_recursive-_5aae")]).then((()=>()=>t(11739)))))},m={"webpack_sharing_consume_default_react-dom_react-dom":[12181],webpack_sharing_consume_default_react_react:[92950],"webpack_sharing_consume_default_reduxjs_toolkit_reduxjs_toolkit-webpack_sharing_consume_defau-e4c479":[55754,45055,32671,19289],"src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--1fc7ce":[18863,41165]};t.f.consumes=(e,_)=>{t.o(m,e)&&m[e].forEach((e=>{if(t.o(u,e))return _.push(u[e]);var s=_=>{u[e]=0,t.m[e]=s=>{delete t.c[e],s.exports=_()}},o=_=>{delete u[e],t.m[e]=s=>{throw delete t.c[e],_}};try{var r=l[e]();r.then?_.push(u[e]=r.then(s).catch(o)):s(r)}catch(n){o(n)}}))}})(),(()=>{var e=e=>new Promise(((_,s)=>{var o=t.miniCssF(e),r=t.p+o;if(((e,_)=>{for(var t=document.getElementsByTagName("link"),s=0;s<t.length;s++){var o=(n=t[s]).getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===e||o===_))return n}var r=document.getElementsByTagName("style");for(s=0;s<r.length;s++){var n;if((o=(n=r[s]).getAttribute("data-href"))===e||o===_)return n}})(o,r))return _();((e,_,t,s)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=r=>{if(o.onerror=o.onload=null,"load"===r.type)t();else{var n=r&&("load"===r.type?"missing":r.type),d=r&&r.target&&r.target.href||_,a=new Error("Loading CSS chunk "+e+" failed.\n("+d+")");a.code="CSS_CHUNK_LOAD_FAILED",a.type=n,a.request=d,o.parentNode.removeChild(o),s(a)}},o.href=_,document.head.appendChild(o)})(e,r,_,s)})),_={inter_dao:0};t.f.miniCss=(t,s)=>{_[t]?s.push(_[t]):0!==_[t]&&{"vendors-node_modules_sentre_senhub_dist_index_js-node_modules_sentre_senhub_dist_static_image-97b140":1,"src_bootstrap_app_tsx-src_static_images_system_bg-autonomous_png-src_static_images_system_bg--1fc7ce":1}[t]&&s.push(_[t]=e(t).then((()=>{_[t]=0}),(e=>{throw delete _[t],e})))}})(),(()=>{var e={inter_dao:0};t.f.j=(_,s)=>{var o=t.o(e,_)?e[_]:void 0;if(0!==o)if(o)s.push(o[2]);else if(/^webpack_sharing_consume_default_re(act(\-dom_react\-dom|_react)|duxjs_toolkit_reduxjs_toolkit\-webpack_sharing_consume_defau\-e4c479)$/.test(_))e[_]=0;else{var r=new Promise(((t,s)=>o=e[_]=[t,s]));s.push(o[2]=r);var n=t.p+t.u(_),d=new Error;t.l(n,(s=>{if(t.o(e,_)&&(0!==(o=e[_])&&(e[_]=void 0),o)){var r=s&&("load"===s.type?"missing":s.type),n=s&&s.target&&s.target.src;d.message="Loading chunk "+_+" failed.\n("+r+": "+n+")",d.name="ChunkLoadError",d.type=r,d.request=n,o[1](d)}}),"chunk-"+_,_)}};var _=(_,s)=>{var o,r,[n,d,a]=s,i=0;if(n.some((_=>0!==e[_]))){for(o in d)t.o(d,o)&&(t.m[o]=d[o]);if(a)a(t)}for(_&&_(s);i<n.length;i++)r=n[i],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0},s=globalThis.webpackChunkinter_dao=globalThis.webpackChunkinter_dao||[];s.forEach(_.bind(null,0)),s.push=_.bind(null,s.push.bind(s))})();var s=t(57253);inter_dao=s})();
//# sourceMappingURL=index.js.map