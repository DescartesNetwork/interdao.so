(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([[922],{75196:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Page:()=>A});var i=s(55754),n=s(15780),a=s(92950),r=s(99019);const c={"logo-telegram":s.p+"static/media/icon-telegram.2450489f40d03000fe65fc1c6f238d85.svg"};var o=s(45263);const l=(0,a.forwardRef)(((e,t)=>{let{name:s,className:i,...n}=e;const a=i?"anticon "+i:"anticon";return(0,o.jsx)("span",{className:a,...n,children:c[s]?(0,o.jsx)("ion-icon",{ref:t,src:c[s]}):(0,o.jsx)("ion-icon",{ref:t,name:s})})}));var u=s(19289);const h="main",d=(0,u.createAsyncThunk)("main/increaseCounter",(async(e,t)=>{let{getState:s}=t;const{main:{counter:i}}=s();return{counter:i+1}})),f=(0,u.createSlice)({name:h,initialState:{counter:0},reducers:{},extraReducers:e=>{e.addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer;var p=s(15190);const m={appId:"interdao",url:"https://descartesnetwork.github.io/interdao.so/index.js"},g={devnet:{node:"https://api.devnet.solana.com",spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"},testnet:{node:"https://api.testnet.solana.com",spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"},mainnet:{node:"https://api.mainnet-beta.solana.com",spltAddress:"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",splataAddress:"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"}},v={manifest:{development:{...m},staging:{...m},production:{...m}}[p.OB],sol:g[p.ef]};var w=s(3007);const{manifest:{appId:y}}=v,b=()=>{const{wallet:{address:e}}=(0,n.useWallet)(),t=(0,i.useDispatch)(),{counter:s}=(0,i.useSelector)((e=>e.main)),c=(0,a.useMemo)((()=>(0,w.f)(e,y)),[e]),u=(0,a.useCallback)((()=>t(d())),[t]);return(0,a.useEffect)((()=>{c&&c.setItem("counter",s)}),[c,s]),(0,o.jsxs)(r.Row,{gutter:[24,24],align:"middle",children:[(0,o.jsx)(r.Col,{span:24,children:(0,o.jsxs)(r.Space,{align:"center",children:[(0,o.jsx)(l,{name:"newspaper-outline"}),(0,o.jsx)(r.Typography.Title,{level:4,children:"App View"})]})}),(0,o.jsx)(r.Col,{span:24,children:(0,o.jsxs)(r.Typography.Text,{children:["Address: ",e]})}),(0,o.jsx)(r.Col,{children:(0,o.jsxs)(r.Typography.Text,{children:["Counter: ",s]})}),(0,o.jsx)(r.Col,{children:(0,o.jsx)(r.Button,{onClick:u,children:"Increase"})})]})};var I=s(85912);const j=(0,u.configureStore)({middleware:e=>e(I.h),devTools:(0,I.$)("interdao"),reducer:{main:f}}),{manifest:{appId:k}}=v,A=()=>(0,o.jsx)(n.UIProvider,{appId:k,antd:!0,children:(0,o.jsx)(n.WalletProvider,{children:(0,o.jsx)(i.Provider,{store:j,children:(0,o.jsx)(b,{})})})})},85912:(e,t,s)=>{"use strict";s.d(t,{$:()=>i,h:()=>n});const i=e=>!1;BigInt.prototype.toJSON=function(){return this.toString()};const n={serializableCheck:{isSerializable:e=>"undefined"===typeof e||null===e||"string"===typeof e||"boolean"===typeof e||"number"===typeof e||Array.isArray(e)||(e=>{if(null===e)return!1;const t=Object.getPrototypeOf(e);return null!==t&&null===Object.getPrototypeOf(t)})(e)||"bigint"===typeof e}}},3007:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o,f:()=>l});var i=s(15454),n=s.n(i),a=s(95418),r=s(83868);class c{constructor(e){if(this.dbName=void 0,this.driver=void 0,this.ipfs=void 0,this.createInstance=e=>n().createInstance({driver:this.driver,name:this.dbName,storeName:e}),this.dropInstance=async e=>{const t=this.createInstance(e);return await t.clear(),await n().dropInstance({name:this.dbName,storeName:e})},this.all=async()=>{let e={};const t=(await this.createInstance("sentre").getItem("appIds")||[]).flat().concat(["sentre"]);for(const s of t){e[s]={};const t=this.createInstance(s);await t.iterate(((t,i)=>{e[s][i]=t}))}return e},this.fetch=async e=>await this.ipfs.get(e),this.backup=async()=>{const e=await this.all();return await this.ipfs.set(e)},this.restore=async e=>{const t=await this.fetch(e);for(const s in t){const e=await this.createInstance(s);for(const i in t[s]){const n=t[s][i];await e.setItem(i,n)}}return t},!a.account.isAddress(e))throw new Error("Invalid address");this.dbName=e,this.driver=[n().WEBSQL,n().LOCALSTORAGE],this.ipfs=new r.Z}}const o=c,l=(e,t)=>a.account.isAddress(e)?new c(e).createInstance(t):void 0},83868:(e,t,s)=>{"use strict";s.d(t,{Z:()=>c});var i=s(32642),n=s(45268),a=s(97429).Buffer;class r{constructor(){this._ipfs=async()=>{try{return window.ipfs||(window.ipfs=await(0,i.Ue)()),window.ipfs}catch(e){return await(0,n.sA)(500),await this._ipfs()}},this.get=async e=>{if(!r.isCID(e))throw new Error("Invalid CID");const t=await this._ipfs(),s=await t.cat(e);let i="";for await(const n of s)i+=a.from(n).toString();return JSON.parse(i)},this.set=async e=>{if(!e)throw new Error("Empty data");const t=JSON.stringify(e),s=await this._ipfs(),{path:i}=await s.add(t);return i}}}r.isCID=e=>{try{return!!e&&i.bf.multihash(e)}catch(t){return!1}};const c=r},15190:(e,t,s)=>{"use strict";s.d(t,{Bv:()=>u,OB:()=>o,ef:()=>l});const i="sentre",n=window.localStorage,a=e=>{try{return e?JSON.parse(e):null}catch(t){return null}},r={set:(e,t)=>{let s=a(n.getItem(i));s&&"object"===typeof s||(s={}),s[e]=t,n.setItem(i,JSON.stringify(s))},get:e=>{let t=a(n.getItem(i));return t&&"object"===typeof t?t[e]:null},clear:e=>{r.set(e,null)}},c=r,o="production",l=(()=>{switch(c.get("network")){case"devnet":return"devnet";case"testnet":return"testnet";default:return"mainnet"}})(),u=(()=>{switch(l){case"devnet":return 103;case"testnet":return 102;default:return 101}})()},45268:(e,t,s)=>{"use strict";s.d(t,{sA:()=>l});s(95418),s(16200),s(15190);const i={ttl:3e4},n={limit:{calls:10,time:1e3},cache:i};class a{constructor(e){this.key="",this.resolveQueue=[],this.rejectQueue=[],this.key=e}add(e,t){this.resolveQueue.push(e),this.rejectQueue.push(t)}resolves(e){for(;this.resolveQueue.length>0;){this.resolveQueue.shift()(e)}}rejects(e){for(;this.rejectQueue.length>0;){this.rejectQueue.shift()(e)}}}class r{static set(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;this.mapCache.set(e,t),setTimeout((()=>{this.mapCache.delete(e)}),s.ttl)}static get(e){return this.mapCache.get(e)}}r.mapCache=new Map;class c{static getSingleFlight(e){const t=JSON.stringify(e);if(this.mapInstance.has(t)){const e=this.mapInstance.get(t);if(e)return e}let s=new o(e);return this.mapInstance.set(t,s),s}static async load(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};"object"===typeof e&&(e=JSON.stringify(e));let i=c.getSingleFlight(s);c.mapInstance.set(e,i);const n=new a(e);return i.load(n,t)}}c.mapInstance=new Map;class o{constructor(e){this.config=void 0,this.intervalRequest=void 0,this.timeLogs=[],this.mapRequestCalling=new Map,this.requestQueue=[],this.config=Object.assign(n,e)}async load(e,t){const s=r.get(e.key);if(s)return Promise.resolve(s);let i=!1,n=this.mapRequestCalling.get(e.key);return n||(n=e,i=!0,this.mapRequestCalling.set(n.key,n)),new Promise(((e,s)=>{if(!n)return s("Not found request!");n.add(e,s),i&&this.fetch(n,t)}))}fetch(e,t){if(!this.validateLimit())return this.addRequestQueue(e,t);this.createTimeLogs(),t().then((t=>{r.set(e.key,t,this.config.cache),e.resolves(t)})).catch((t=>{e.rejects(t)})).finally((()=>{this.mapRequestCalling.delete(e.key),this.fetchRequestQueue(t)}))}fetchRequestQueue(e){if(!this.validateLimit())return;const t=this.requestQueue.shift();t&&this.load(t,e),0===this.requestQueue.length&&this.intervalRequest&&clearInterval(this.intervalRequest)}addRequestQueue(e,t){var s;this.requestQueue.push(e),this.intervalRequest=setInterval((()=>{this.fetchRequestQueue(t)}),null===(s=this.config.limit)||void 0===s?void 0:s.time)}validateLimit(){return!0}createTimeLogs(){var e;if(!this.config.limit)return;const t=(new Date).getTime();this.timeLogs.push(t),this.timeLogs.length>(null===(e=this.config.limit)||void 0===e?void 0:e.calls)&&this.timeLogs.shift()}}const l=e=>new Promise((t=>setTimeout(t,e)))},35883:()=>{},46601:()=>{},89214:()=>{},5696:()=>{},85568:()=>{},64009:()=>{},42611:()=>{},88795:()=>{},89408:()=>{},57600:()=>{},21724:()=>{},62678:()=>{},25819:()=>{},52361:()=>{},94616:()=>{},55024:()=>{}}]);
//# sourceMappingURL=922.dc5fe5e9.chunk.js.map