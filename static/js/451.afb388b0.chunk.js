(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([[451],{3077:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Page:()=>K});var a=n(55754),s=n(15780),r=n(99019),o=n(92950);const i={"logo-telegram":n.p+"static/media/icon-telegram.2450489f40d03000fe65fc1c6f238d85.svg"};var c=n(45263);const l=(0,o.forwardRef)(((e,t)=>{let{name:n,className:a,...s}=e;const r=a?"anticon "+a:"anticon";return(0,c.jsx)("span",{className:r,...s,children:i[n]?(0,c.jsx)("ion-icon",{ref:t,src:i[n]}):(0,c.jsx)("ion-icon",{ref:t,name:n})})}));var d=n(95418),u=n(19289),p=n(15190);const f={appId:"interdao",url:"https://descartesnetwork.github.io/interdao.so/index.js"},h={development:{...f},staging:{...f},production:{...f}};var y=n(77817),g=n.n(y),w=n(71256);const m=class{constructor(){this._wallet=window.sentre.wallet,this._publicKey=new w.PublicKey("GuestAccount11111111111111111111111111111111"),this._init=async()=>{const e=await this._wallet.getAddress();this._publicKey=new w.PublicKey(e)},this.signTransaction=async e=>this._wallet.signTransaction(e),this.signAllTransactions=async e=>{let t=[];for(const n of e){const e=await this.signTransaction(n);t.push(e)}return t},this._init()}get publicKey(){return console.warn("This is an async getter for interface consistency. Please do not fully rely on this function."),this._publicKey}},b={devnet:{rpc:"https://api.devnet.solana.com",interDao:new(g())(new m)},testnet:{rpc:"https://api.testnet.solana.com",interDao:new(g())(new m)},mainnet:{rpc:"https://ssc-dao.genesysgo.net",interDao:new(g())(new m)}},v={manifest:h[p.OB],sol:b[p.ef]},{sol:{interDao:j}}=v,D="dao",A=(0,u.createAsyncThunk)("dao/getDaos",(async()=>{const{provider:{connection:e},programId:t,account:n}=j.program,a=await e.getProgramAccounts(t,{filters:[{dataSize:n.dao.size}]});let s={};return a.forEach((e=>{let{pubkey:t,account:{data:n}}=e;const a=t.toBase58(),r=j.parseDaoData(n);s[a]=r})),s})),x=(0,u.createAsyncThunk)("dao/getDao",(async(e,t)=>{let{address:n,force:a}=e,{getState:s}=t;if(!d.account.isAddress(n))throw new Error("Invalid address");const{dao:{[n]:r}}=s();if(r&&!a)return{[n]:r};return{[n]:await j.getDaoData(n)}})),k=(0,u.createAsyncThunk)("dao/upsetDao",(async e=>{let{address:t,data:n}=e;if(!d.account.isAddress(t))throw new Error("Invalid address");if(!n)throw new Error("Data is empty");return{[t]:n}})),O=(0,u.createAsyncThunk)("dao/deleteDao",(async e=>{let{address:t}=e;if(!d.account.isAddress(t))throw new Error("Invalid address");return{address:t}})),T=(0,u.createSlice)({name:D,initialState:{},reducers:{},extraReducers:e=>{e.addCase(A.fulfilled,((e,t)=>{let{payload:n}=t;Object.assign(e,n)})).addCase(k.fulfilled,((e,t)=>{let{payload:n}=t;Object.assign(e,n)})).addCase(O.fulfilled,((e,t)=>{let{payload:n}=t;Object.assign(e,n)}))}}).reducer;let I=0;const S=()=>{const{wallet:{address:e}}=(0,s.useWallet)(),t=(0,a.useDispatch)(),n=(0,o.useCallback)((async()=>{try{if(!d.account.isAddress(e))return;await t(A()).unwrap()}catch(n){return window.notify({type:"error",description:"Cannot fetch data of DAOs"})}}),[t,e]),r=(0,o.useCallback)((async()=>{const{sol:{interDao:e}}=v;I=await e.addListener("InitializeDAOEvent",(e=>{let{dao:n}=e;return t(x({address:n.toBase58(),force:!0}))}))}),[t]);return(0,o.useEffect)((()=>(n(),r(),()=>{(async()=>{try{const{sol:{interDao:e}}=v;await e.removeListener(I)}catch(e){}})(),I=0})),[n,r]),(0,c.jsx)(o.Fragment,{})},P=()=>{const{dao:e}=(0,a.useSelector)((e=>e));return console.log(e),(0,c.jsxs)(r.Row,{gutter:[24,24],align:"middle",children:[(0,c.jsx)(r.Col,{span:24,children:(0,c.jsxs)(r.Space,{align:"center",children:[(0,c.jsx)(l,{name:"newspaper-outline"}),(0,c.jsx)(r.Typography.Title,{level:4,children:"App View"})]})}),(0,c.jsx)(S,{})]})};var C=n(85912);const _=(0,u.configureStore)({middleware:e=>e(C.h),devTools:(0,C.$)("interdao"),reducer:{dao:T}}),{manifest:{appId:E}}=v,K=()=>(0,c.jsx)(s.UIProvider,{appId:E,antd:!0,children:(0,c.jsx)(s.WalletProvider,{children:(0,c.jsx)(a.Provider,{store:_,children:(0,c.jsx)(P,{})})})})},85912:(e,t,n)=>{"use strict";n.d(t,{$:()=>o,h:()=>i});var a=n(71256),s=n(48744),r=n.n(s);const o=e=>!1;BigInt.prototype.toJSON=function(){return this.toString()};const i={serializableCheck:{isSerializable:e=>"undefined"===typeof e||null===e||"string"===typeof e||"boolean"===typeof e||"number"===typeof e||Array.isArray(e)||(e=>{if(null===e)return!1;const t=Object.getPrototypeOf(e);return null!==t&&null===Object.getPrototypeOf(t)})(e)||"bigint"===typeof e||e instanceof a.PublicKey||e instanceof r()}}},15190:(e,t,n)=>{"use strict";n.d(t,{Bv:()=>d,OB:()=>c,ef:()=>l});const a="sentre",s=window.localStorage,r=e=>{try{return e?JSON.parse(e):null}catch(t){return null}},o={set:(e,t)=>{let n=r(s.getItem(a));n&&"object"===typeof n||(n={}),n[e]=t,s.setItem(a,JSON.stringify(n))},get:e=>{let t=r(s.getItem(a));return t&&"object"===typeof t?t[e]:null},clear:e=>{o.set(e,null)}},i=o,c="production",l=(()=>{switch(i.get("network")){case"devnet":return"devnet";case"testnet":return"testnet";default:return"mainnet"}})(),d=(()=>{switch(l){case"devnet":return 103;case"testnet":return 102;default:return 101}})()},46601:()=>{},89214:()=>{},85568:()=>{},52361:()=>{},94616:()=>{},55024:()=>{}}]);
//# sourceMappingURL=451.afb388b0.chunk.js.map