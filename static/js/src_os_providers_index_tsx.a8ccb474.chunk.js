"use strict";(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([["src_os_providers_index_tsx"],{80039:(e,t,s)=>{s.r(t),s.d(t,{AccountProvider:()=>I,MintProvider:()=>U,PoolProvider:()=>f,UIProvider:()=>d,WalletProvider:()=>v,useAccount:()=>P,useMint:()=>V,usePool:()=>y,useUI:()=>h,useWallet:()=>x,withAccount:()=>j,withMint:()=>Q,withPool:()=>g,withUI:()=>u,withWallet:()=>b});var a=s(92950),n=s(94751),r=s(87358),i=s(87482),l=s(45263);const o=(0,a.createContext)({}),d=e=>{let{children:t,appId:s,style:d={},antd:c=!1}=e;const u=(0,r.u5)(),h=(0,r.Qy)((e=>e.ui)),p=(0,a.useCallback)((async function(){return await u((0,i.AY)(...arguments)).unwrap()}),[u]),f=(0,a.useMemo)((()=>({ui:h,setBackground:p})),[h,p]),w=c?{getPopupContainer:()=>document.getElementById(s),..."object"===typeof c?c:{}}:void 0;return(0,l.jsx)(o.Provider,{value:f,children:(0,l.jsx)("section",{id:s,style:{backgroundColor:"transparent",...d},children:w?(0,l.jsx)(n.ConfigProvider,{...w,children:t}):t})})},c=e=>{let{children:t}=e;return(0,l.jsx)(o.Consumer,{children:e=>a.Children.map(t,(t=>(0,a.cloneElement)(t,{...e})))})},u=e=>{class t extends a.Component{render(){const{forwardedRef:t,...s}=this.props;return(0,l.jsx)(c,{children:(0,l.jsx)(e,{ref:t,...s})})}}return(0,a.forwardRef)(((e,s)=>(0,l.jsx)(t,{...e,ref:s})))},h=()=>(0,a.useContext)(o),p=(0,a.createContext)({}),f=e=>{let{children:t}=e;const s=(0,r.Qy)((e=>e.pools)),n=(0,a.useMemo)((()=>({pools:s})),[s]);return(0,l.jsx)(p.Provider,{value:n,children:t})},w=e=>{let{children:t}=e;return(0,l.jsx)(p.Consumer,{children:e=>a.Children.map(t,(t=>(0,a.cloneElement)(t,{...e})))})},g=e=>{class t extends a.Component{render(){const{forwardedRef:t,...s}=this.props;return(0,l.jsx)(w,{children:(0,l.jsx)(e,{ref:t,...s})})}}return(0,a.forwardRef)(((e,s)=>(0,l.jsx)(t,{...e,ref:s})))},y=()=>(0,a.useContext)(p),m=(0,a.createContext)({}),v=e=>{let{children:t}=e;const s=(0,r.Qy)((e=>e.wallet)),n=(0,a.useMemo)((()=>({wallet:s})),[s]);return(0,l.jsx)(m.Provider,{value:n,children:t})},k=e=>{let{children:t}=e;return(0,l.jsx)(m.Consumer,{children:e=>a.Children.map(t,(t=>(0,a.cloneElement)(t,{...e})))})},b=e=>{class t extends a.Component{render(){const{forwardedRef:t,...s}=this.props;return(0,l.jsx)(k,{children:(0,l.jsx)(e,{ref:t,...s})})}}return(0,a.forwardRef)(((e,s)=>(0,l.jsx)(t,{...e,ref:s})))},x=()=>(0,a.useContext)(m),C=(0,a.createContext)({}),I=e=>{let{children:t}=e;const s=(0,r.Qy)((e=>e.accounts)),n=(0,a.useMemo)((()=>({accounts:s})),[s]);return(0,l.jsx)(C.Provider,{value:n,children:t})},A=e=>{let{children:t}=e;return(0,l.jsx)(C.Consumer,{children:e=>a.Children.map(t,(t=>(0,a.cloneElement)(t,{...e})))})},j=e=>{class t extends a.Component{render(){const{forwardedRef:t,...s}=this.props;return(0,l.jsx)(A,{children:(0,l.jsx)(e,{ref:t,...s})})}}return(0,a.forwardRef)(((e,s)=>(0,l.jsx)(t,{...e,ref:s})))},P=()=>(0,a.useContext)(C);var S=s(95418),T=s(33015),E=s(94757),R=s.n(E),Z=s(67845),O=s(63805);const M=e=>({symbol:"SOL",name:"Solana",address:"11111111111111111111111111111111",decimals:9,chainId:e,extensions:{coingeckoId:"solana"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"}),W=e=>({symbol:"SNTR",name:"Sentre",address:"5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ",decimals:9,chainId:e,extensions:{coingeckoId:"sentre"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M/logo.png"}),B=[M(103),W(103),{symbol:"wBTC",name:"Wrapped Bitcoin",address:"8jk4eJymMfNZV9mkRNxJEt2VJ3pRvdJvD5FE94GXGBPM",decimals:9,chainId:103,extensions:{coingeckoId:"bitcoin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/qfnqNqs3nCAHjnyCgLRDbBtq4p2MtHZxw8YjSyYhPoL/logo.png"},{symbol:"wETH",name:"Ethereum",address:"27hdcZv7RtuMp75vupThR3T4KLsL61t476eosMdoec4c",decimals:9,chainId:103,extensions:{coingeckoId:"ethereum"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/FeGn77dhg1KXRRFeSwwMiykZnZPw5JXW6naf2aQgZDQf/logo.png"},{symbol:"UNI",name:"Uniswap",address:"FVZFSXu3yn17YdcxLD72TFDUqkdE5xZvcW18EUpRQEbe",decimals:9,chainId:103,extensions:{coingeckoId:"uniswap"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/3MVa4e32PaKmPxYUQ6n8vFkWtCma68Ld7e7fTktWDueQ/logo.png"},{symbol:"USDC",name:"USD Coin",address:"2z6Ci38Cx6PyL3tFrT95vbEeB3izqpoLdxxBkJk2euyj",decimals:9,chainId:103,extensions:{coingeckoId:"usd-coin"},logoURI:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"}];const D=new class{constructor(){var e=this;this.tokenMap=void 0,this.engine=void 0,this.chainId=void 0,this.cluster=void 0,this.loading=void 0,this.queue=void 0,this._init=async()=>this.tokenMap.size&&this.engine?[this.tokenMap,this.engine]:new Promise((async e=>{if(this.loading)return this.queue.push(e);this.loading=!0;let t=await(await(new Z.DK).resolve()).filterByChainId(this.chainId).getList();for("devnet"===this.cluster&&(t=t.concat(B)),t="testnet"===this.cluster?t.concat([W(102),M(102)]):t.concat([M(101)]),t.forEach((e=>this.tokenMap.set(e.address,e))),this.engine=R()((function(){this.ref("address"),this.field("symbol"),this.field("name"),t.forEach((e=>this.add(e)))})),e([this.tokenMap,this.engine]);this.queue.length;)this.queue.shift()([this.tokenMap,this.engine]);this.loading=!1})),this.all=async()=>{const[e]=await this._init();return Array.from(e.values())},this.findByAddress=async e=>{const[t]=await this._init();return t.get(e)},this.find=async function(t){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;const[a,n]=await e._init();let r=[];if(!t)return[];const i=t+"~1";return n.search(i).forEach((e=>{let{ref:t}=e;if(r.findIndex((e=>{let{address:s}=e;return s===t}))<0){const e=a.get(t);e&&r.push(e)}})),0===s?r:r.slice(0,s)},this.tokenMap=new Map,this.engine=void 0,this.chainId=O.Bv,this.cluster=O.ef,this.loading=!1,this.queue=[],this._init()}},L=(0,a.createContext)({}),U=e=>{let{children:t}=e;const s=(0,r.u5)(),n=(0,r.Qy)((e=>e.mints)),i=(0,r.Qy)((e=>e.pools)),o=(0,a.useCallback)((async function(){return await s((0,T.ih)(...arguments)).unwrap()}),[s]),d=(0,a.useCallback)((async e=>{var t;if(!S.account.isAddress(e))throw new Error("Invalid mint address");const s=await D.findByAddress(e);if(void 0!==(null===s||void 0===s?void 0:s.decimals))return s.decimals;if(Object.values(i).findIndex((t=>{let{mint_lpt:s}=t;return s===e}))>=0)return 9;const a=await o({address:e});if(null!==(t=a[e])&&void 0!==t&&t.decimals)return a[e].decimals;throw new Error("Cannot find mint decimals")}),[o,i]),c=(0,a.useMemo)((()=>({mints:n,getMint:o,getDecimals:d,tokenProvider:D})),[n,o,d]);return(0,l.jsx)(L.Provider,{value:c,children:t})},q=e=>{let{children:t}=e;return(0,l.jsx)(L.Consumer,{children:e=>a.Children.map(t,(t=>(0,a.cloneElement)(t,{...e})))})},Q=e=>{class t extends a.Component{render(){const{forwardedRef:t,...s}=this.props;return(0,l.jsx)(q,{children:(0,l.jsx)(e,{ref:t,...s})})}}return(0,a.forwardRef)(((e,s)=>(0,l.jsx)(t,{...e,ref:s})))},V=()=>(0,a.useContext)(L)},65090:(e,t,s)=>{s.d(t,{ZP:()=>c});var a=s(19289),n=s(95418);const r="accounts",i=(0,a.createAsyncThunk)(`${r}/getAccounts`,(async e=>{let{owner:t}=e;if(!n.account.isAddress(t))throw new Error("Invalid owner/wallet address");const{splt:s}=window.sentre,a=n.account.fromAddress(t),{value:r}=await s.connection.getTokenAccountsByOwner(a,{programId:s.spltProgramId});let i={};return r.forEach((e=>{let{pubkey:t,account:{data:a}}=e;const n=t.toBase58(),r=s.parseAccountData(a);return i[n]=r})),i})),l=(0,a.createAsyncThunk)(`${r}/getAccount`,(async(e,t)=>{let{address:s}=e,{getState:a}=t;if(!n.account.isAddress(s))throw new Error("Invalid account address");const{accounts:{[s]:r}}=a();if(r)return{[s]:r};const{splt:i}=window.sentre;return{[s]:await i.getAccountData(s)}})),o=(0,a.createAsyncThunk)(`${r}/upsetAccount`,(async e=>{let{address:t,data:s}=e;if(!n.account.isAddress(t))throw new Error("Invalid address");if(!s)throw new Error("Data is empty");return{[t]:s}})),d=(0,a.createAsyncThunk)(`${r}/deleteAccount`,(async e=>{let{address:t}=e;if(!n.account.isAddress(t))throw new Error("Invalid address");return{address:t}})),c=(0,a.createSlice)({name:r,initialState:{},reducers:{},extraReducers:e=>{e.addCase(i.fulfilled,((e,t)=>{let{payload:s}=t;return s})).addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;delete e[s.address]}))}}).reducer},5105:(e,t,s)=>{s.d(t,{ZP:()=>c});var a=s(19289),n=s(95418),r=s(3007);const i="flags",l=(0,a.createAsyncThunk)("flags/loadVisited",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const i=new r.Z(a).createInstance("sentre");return{visited:await i.getItem("visited")||!1}})),o=(0,a.createAsyncThunk)("flags/updateVisited",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet");const i=new r.Z(a).createInstance("sentre");return await i.setItem("visited",e),{visited:e}})),d=(0,a.createAsyncThunk)("flags/updateLoading",(async e=>({loading:e}))),c=(0,a.createSlice)({name:i,initialState:{visited:!0,loading:!0},reducers:{},extraReducers:e=>{e.addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},87358:(e,t,s)=>{s.d(t,{Qy:()=>y,u5:()=>g});var a=s(55754),n=s(19289),r=s(38703),i=s(22027),l=s(87482),o=s(5105),d=s(58851),c=s(21028),u=s(65090),h=s(33015),p=s(92871),f=s(33361),w=s(51865);(0,a.createStoreHook)(r.RootContext);const g=(0,a.createDispatchHook)(r.RootContext),y=(0,a.createSelectorHook)(r.RootContext);(0,n.configureStore)({middleware:e=>e(i.h),devTools:(0,i.$)("sentre"),reducer:{ui:l.ZP,flags:o.ZP,page:d.ZP,wallet:c.ZP,accounts:u.ZP,mints:h.ZP,pools:p.ZP,search:f.ZP,walkthrough:w.ZP}})},58851:(e,t,s)=>{s.d(t,{ZP:()=>k});var a=s(19289),n=s(95418),r=s(3007),i=s(55852),l=s(63805);const{register:{senreg:o,extra:d,devAppId:c}}=i.Z,u=(e,t)=>t&&Array.isArray(t)?("development"!==l.OB||t.includes(c)||t.unshift(c),t.filter((t=>e[t]))):[],h="page",p={register:{},appIds:[]},f=(0,a.createAsyncThunk)("page/loadRegister",(async()=>({register:{...await(async()=>{try{const e=await fetch(o);return await e.json()}catch(e){return{}}})(),...d}}))),w=(0,a.createAsyncThunk)("page/installManifest",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{appIds:r,register:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");if(r.includes(e.appId))throw new Error("Cannot run sandbox for an installed application.");const l=[...r];l.push(e.appId);const o={...i};return o[e.appId]=e,{appIds:l,register:o}})),g=(0,a.createAsyncThunk)("page/loadPage",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{register:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");const l=new r.Z(a).createInstance("sentre");return{appIds:u(i,await l.getItem("appIds")||p.appIds)}})),y=(0,a.createAsyncThunk)("page/updatePage",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{register:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");e=u(i,e);const l=new r.Z(a).createInstance("sentre");return await l.setItem("appIds",e),{appIds:e}})),m=(0,a.createAsyncThunk)("page/installApp",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{appIds:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");if(i.includes(e))return{};const l=[...i];l.push(e);const o=new r.Z(a).createInstance("sentre");return await o.setItem("appIds",l),{appIds:l}})),v=(0,a.createAsyncThunk)("page/uninstallApp",(async(e,t)=>{let{getState:s}=t;const{wallet:{address:a},page:{appIds:i}}=s();if(!n.account.isAddress(a))throw new Error("Wallet is not connected yet.");if(!i.includes(e))return{};const l=i.filter((t=>t!==e)),o=new r.Z(a),d=o.createInstance("sentre");return await d.setItem("appIds",l),await o.dropInstance(e),{appIds:l}})),k=(0,a.createSlice)({name:h,initialState:p,reducers:{},extraReducers:e=>{e.addCase(f.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(w.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(g.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(y.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(m.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(v.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},92871:(e,t,s)=>{s.d(t,{ZP:()=>u});var a=s(19289),n=s(95418),r=s(55852);const{sol:{taxmanAddress:i}}=r.Z,l="pools",o=(0,a.createAsyncThunk)("pools/getPools",(async()=>{const{swap:e}=window.sentre,t=await e.connection.getProgramAccounts(e.swapProgramId,{filters:[{dataSize:257},{memcmp:{bytes:i,offset:65}}]});let s={};return t.forEach((t=>{let{pubkey:a,account:{data:n}}=t;const r=a.toBase58(),i=e.parsePoolData(n);s[r]=i})),s})),d=(0,a.createAsyncThunk)("pools/getPool",(async(e,t)=>{let{address:s}=e,{getState:a}=t;if(!n.account.isAddress(s))throw new Error("Invalid pool address");const{pools:{[s]:r}}=a();if(r)return{[s]:r};const{swap:i}=window.sentre;return{[s]:await i.getPoolData(s)}})),c=(0,a.createAsyncThunk)("pools/upsetPool",(async e=>{let{address:t,data:s}=e;if(!n.account.isAddress(t))throw new Error("Invalid pool address");if(!s)throw new Error("Data is empty");return{[t]:s}})),u=(0,a.createSlice)({name:l,initialState:{},reducers:{},extraReducers:e=>{e.addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;return s})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},33361:(e,t,s)=>{s.d(t,{ZP:()=>d});var a=s(19289);const n="search",r=(0,a.createAsyncThunk)("search/setVisible",(async e=>({visible:e}))),i=(0,a.createAsyncThunk)("search/setValue",(async e=>({value:e}))),l=(0,a.createAsyncThunk)("search/setLoading",(async e=>({loading:e}))),o=(0,a.createAsyncThunk)("search/setDisabled",(async e=>({disabled:e}))),d=(0,a.createSlice)({name:n,initialState:{visible:!1,value:"",loading:!1,disabled:!1},reducers:{},extraReducers:e=>{e.addCase(r.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(i.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},87482:(e,t,s)=>{s.d(t,{AY:()=>u,ZP:()=>h});var a=s(19289);const n=()=>{const e=window.innerWidth;return e<576?"xs":e<768?"sm":e<992?"md":e<1200?"lg":e<1400?"xl":"xxl"},r="ui",i={theme:window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark",width:window.innerWidth,infix:n(),touchable:"ontouchstart"in window||navigator.maxTouchPoints>0,visibleActionCenter:!1,visibleInstaller:!1,background:{light:"",dark:""}},l=(0,a.createAsyncThunk)("ui/setTheme",(async e=>({theme:e}))),o=(0,a.createAsyncThunk)("ui/resize",(async()=>({width:window.innerWidth,infix:n()}))),d=(0,a.createAsyncThunk)("ui/setVisibleActionCenter",(async e=>({visibleActionCenter:e}))),c=(0,a.createAsyncThunk)("ui/setVisibleInstaller",(async e=>({visibleInstaller:e}))),u=(0,a.createAsyncThunk)("ui/setBackground",(async e=>({background:e}))),h=(0,a.createSlice)({name:r,initialState:i,reducers:{},extraReducers:e=>{e.addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(o.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(d.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(u.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},51865:(e,t,s)=>{s.d(t,{ZP:()=>o});var a=s(19289);let n;!function(e){e[e.Default=0]="Default",e[e.NewComer=1]="NewComer"}(n||(n={}));const r="walkthrough",i={type:n.Default,run:!1,step:0},l=(0,a.createAsyncThunk)(`${r}/setWalkthrough`,(async e=>({...e}))),o=(0,a.createSlice)({name:r,initialState:i,reducers:{},extraReducers:e=>{e.addCase(l.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},21028:(e,t,s)=>{s.d(t,{ZP:()=>w});var a=s(19289),n=s(95418),r=s(55852),i=s(90951);const l=async e=>{const{sol:{node:t,spltAddress:s,splataAddress:a,swapAddress:l}}=r.Z;window.sentre={wallet:e||new i.kI,lamports:new n.Lamports(t),splt:new n.SPLT(s,a,t),swap:new n.Swap(l,s,a,t)}},o="wallet",d={visible:!1,address:"",lamports:BigInt(0)},c=(0,a.createAsyncThunk)("wallet/openWallet",(async()=>({visible:!0}))),u=(0,a.createAsyncThunk)("wallet/closeWallet",(async()=>({visible:!1}))),h=(0,a.createAsyncThunk)("wallet/connectWallet",(async e=>{if(!e)throw new Error("Invalid wallet instance");await l(e);const t=await e.getAddress(),s=await window.sentre.lamports.getLamports(t);return{address:t,lamports:BigInt(s),visible:!1}})),p=(0,a.createAsyncThunk)("wallet/updateWallet",(async e=>{let{lamports:t}=e;return{lamports:t}})),f=(0,a.createAsyncThunk)("wallet/disconnectWallet",(async()=>{await(async()=>{var e;null!==(e=window.sentre)&&void 0!==e&&e.wallet&&window.sentre.wallet.disconnect(),await l()})(),window.location.reload()})),w=(0,a.createSlice)({name:o,initialState:d,reducers:{},extraReducers:e=>{e.addCase(c.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(u.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(h.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(p.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)})).addCase(f.fulfilled,((e,t)=>{let{payload:s}=t;Object.assign(e,s)}))}}).reducer},90951:(e,t,s)=>{s.d(t,{kI:()=>a.Z});var a=s(58181),n=s(99715),r=s(95418),i=s(97429).Buffer;class l extends n.Z{constructor(e,t){super(l.extractSecretKey(e,t),t)}}l.extractSecretKey=(e,t)=>{const s=r.account.fromKeystore(e,t);if(!s)throw new Error("Invalid ketstore or password");return i.from(s.secretKey).toString("hex")};s(6051),s(37344),s(2491),s(13974),s(31669),s(60766),s(80781)}}]);
//# sourceMappingURL=src_os_providers_index_tsx.a8ccb474.chunk.js.map