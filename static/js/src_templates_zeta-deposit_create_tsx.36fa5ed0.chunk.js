(globalThis.webpackChunkinter_dao=globalThis.webpackChunkinter_dao||[]).push([["src_templates_zeta-deposit_create_tsx"],{91011:(e,t,a)=>{"use strict";a.d(t,{Jg:()=>l,pC:()=>m,Y2:()=>p});var s=a(92950),n=a(55754),r=a(45055),o=a(94751),i=a(62919),c=a(22734),u=a(45263);const l=e=>{let{id:t,title:a,defaultValue:l,...d}=e;const m=(0,n.useDispatch)(),g=(0,n.useSelector)((e=>e.template.data[t])),{daoAddress:p}=(0,r.useParams)(),h=(0,c.K)(p);(0,s.useEffect)((()=>{l&&void 0===g&&m((0,i.mS)({[t]:l.toString()}))}),[l,m,t,g]);const y=g===(null===h||void 0===h?void 0:h.master.toBase58());return(0,u.jsxs)(o.Space,{direction:"vertical",size:4,style:{width:"100%"},children:[(0,u.jsx)(o.Typography.Text,{type:"secondary",children:a}),(0,u.jsx)(o.Input,{className:"border-less",placeholder:"Input Address",value:g,onChange:e=>m((0,i.mS)({[t]:e.target.value})),prefix:y?(0,u.jsx)(o.Button,{type:"dashed",size:"small",style:{marginLeft:-4,marginRight:2,borderWidth:.5},children:"Master"}):(0,u.jsx)(s.Fragment,{}),...d})]})};var d=a(82309);const m=e=>{let{id:t,title:a,defaultValue:r,disabled:c=!1}=e;const l=(0,n.useDispatch)(),m=(0,n.useSelector)((e=>e.template.data[t]));return(0,s.useEffect)((()=>{r&&void 0===m&&l((0,i.mS)({[t]:r.toString()}))}),[r,l,t,m]),(0,u.jsxs)(o.Space,{direction:"vertical",size:4,style:{width:"100%"},children:[a&&(0,u.jsx)(o.Typography.Text,{type:"secondary",children:a}),(0,u.jsx)(d.Qc,{value:m,onChange:e=>{l((0,i.mS)({[t]:e}))},style:{marginLeft:-7},disabled:c})]})};var g=a(33968);const p=e=>{let{id:t,title:a,defaultValue:r,...c}=e;const l=(0,n.useDispatch)(),d=(0,n.useSelector)((e=>e.template.data[t]));return(0,s.useEffect)((()=>{r&&void 0===d&&l((0,i.mS)({[t]:r.toString()}))}),[r,l,t,d]),(0,u.jsxs)(o.Space,{direction:"vertical",size:4,style:{width:"100%"},children:[(0,u.jsx)(o.Typography.Text,{type:"secondary",children:a}),(0,u.jsx)(g.Z,{className:"border-less",placeholder:"Input Amount",defaultValue:d,onValue:e=>l((0,i.mS)({[t]:e})),...c})]})}},20662:(e,t,a)=>{"use strict";a.d(t,{i:()=>r,l:()=>o});var s=a(27906),n=a(40106);let r;!function(e){e.tokenAccount="token-account",e.decimalize="decimalize"}(r||(r={}));const o={[r.tokenAccount]:{call:async e=>s.utils.token.associatedAddress({mint:new s.web3.PublicKey(e.mint),owner:new s.web3.PublicKey(e.owner)})},[r.decimalize]:{call:async e=>{const{splt:t}=window.sentre,a=await t.getMintData(e.mint);return n.default.decimalize(e.amount,a.decimals)}}}},74596:(e,t,a)=>{"use strict";a.d(t,{h:()=>x});var s=a(92950),n=a(55754),r=a(45055),o=a(71276),i=a(62919),c=a(27906),u=a(71256),l=a(46062),d=a(11439),m=a(54121),g=a(20662);const p=(e,t)=>{switch(t){case"u8":case"u32":return Number(e);case"u64":return new c.BN(e);default:throw new Error("Invalid type of arg: "+t)}},h=async(e,t)=>{const a=await(e=>{const t=new u.Connection(l.rpc,{commitment:"confirmed"}),a=new c.AnchorProvider(t,new d.Z,{commitment:"confirmed"});return new c.Program({instructions:[{name:e.ixName,accounts:e.accounts,args:e.args}],name:"program-parser",version:"0.0.0"},e.programId,a)})(e),s=await(async(e,t)=>{const a=e.accounts,s={};for(const n of a)if((0,m.tq)(n)){const e=n.rule.configs,a={};for(const s in e)a[s]=t[e[s]];const r=await g.l[n.rule.name].call({...a});s[n.name]=r}else s[n.name]=new u.PublicKey(t[n.name]);return s})(e,t),n=await(async(e,t)=>{const a=[];for(const s of e.args){let e=t[s.name];if((0,m.ny)(s)){const a=s.rule.configs,n={};for(const e in a)n[e]=t[a[e]];e=await g.l[s.rule.name].call({...n})}a.push(p(e,s.type))}return a})(e,t),r=await a.methods[e.ixName].call(void 0,...n).accounts(s).instruction();return e.anchor||(r.data=r.data.slice(8,r.data.length)),r};var y=a(85731);const{manifest:{appId:w}}=o.Z,x=()=>{const e=(0,n.useDispatch)(),t=(0,r.useHistory)(),{daoAddress:a}=(0,r.useParams)(),{daoNameUrl:o}=(0,y.Z)(a);return{confirm:(0,s.useCallback)((async(s,n)=>{const r=await h(s,n),c=await((e,t)=>{const a={};for(let s=0;s<e.accounts.length;s++){const n=e.accounts[s];a[n.name]={isMaster:n.isMaster,isSigner:n.isSigner,isWritable:n.isMut,pubkey:t.keys[s].pubkey}}return{name:e.name,data:t.data,accounts:a,programId:new u.PublicKey(e.programId)}})(s,r);return await e((0,i.St)(s.name)),await e((0,i.Rm)(c)),await e((0,i.yx)(!1)),await e((0,i.mS)(n)),t.push(`/app/${w}/dao/${a}/${o}/new-proposal`)}),[a,o,e,t]),close:(0,s.useCallback)((async()=>{await e((0,i.JJ)())}),[e])}}},93642:(e,t,a)=>{"use strict";a.d(t,{L5:()=>c,Rn:()=>u,r$:()=>l});var s=a(46062),n=a(71256),r=a(27906),o=a(98210),i=a(46029);const c=s.net,u="devnet"===c?new n.PublicKey("BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7"):new n.PublicKey("ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD"),l=async e=>{const t=new n.Connection(s.rpc);await o.Exchange.load(u,c,t,o.utils.defaultCommitment(),void 0,0);const a=(0,i.toPublicKey)(e),l=o.Exchange.programId,d=o.Exchange.zetaGroupAddress,[m]=await o.utils.getMarginAccount(l,d,a);return{zetaGroup:d,marginAccount:m,systemProgram:r.web3.SystemProgram.programId,zetaProgram:l}}},27863:(e,t,a)=>{"use strict";a.r(t),a.d(t,{USDC_MINT_ADDRESS:()=>f,default:()=>k});var s=a(92950),n=a(55754),r=a(46062),o=a(94751),i=a(91011),c=a(20662),u=a(54121),l=a(93642);let d;!function(e){e.zetaGroup="zetaGroup",e.marginAccount="marginAccount",e.vault="vault",e.userTokenAccount="userTokenAccount",e.socializedLossAccount="socializedLossAccount",e.authority="authority",e.tokenProgram="tokenProgram",e.state="state",e.greeks="greeks",e.amount="amount",e.mint="zetaDepositMint"}(d||(d={}));const m={name:u.sR.ZetaDeposit,ixName:"deposit",anchor:!0,accounts:[{name:d.zetaGroup,isMut:!1,isSigner:!1,isMaster:!1},{name:d.marginAccount,isMut:!0,isSigner:!1,isMaster:!1},{name:d.vault,isMut:!0,isSigner:!1,isMaster:!1},{name:d.userTokenAccount,isMut:!0,isSigner:!1,isMaster:!1},{name:d.socializedLossAccount,isMut:!0,isSigner:!1,isMaster:!1},{name:d.authority,isMut:!1,isSigner:!0,isMaster:!0},{name:d.tokenProgram,isMut:!1,isSigner:!1,isMaster:!1},{name:d.state,isMut:!1,isSigner:!1,isMaster:!1},{name:d.greeks,isMut:!1,isSigner:!1,isMaster:!1}],args:[{name:d.amount,type:"u64",rule:{name:c.i.decimalize,configs:{amount:d.amount,mint:d.mint}}}],programId:l.Rn.toBase58()};var g=a(74596),p=a(22734),h=a(27906),y=a(71256),w=a(98210),x=a(46029);var A=a(45263);const f={testnet:"",devnet:"6PEh8n3p7BbCTykufbq1nSJYAZvUp6gSwEANAs1ZhsCX",mainnet:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},k=e=>{let{daoAddress:t=""}=e;const a=(0,p.K)(t),c=(0,n.useSelector)((e=>e.template.data)),{confirm:u,close:k}=(0,g.h)(),[v,S]=(0,s.useState)(!1),b=(0,s.useCallback)((async()=>{try{if(!a)throw new Error("Invalid DAO data");S(!0);const{zetaGroup:e,marginAccount:t,vault:s,userTokenAccount:n,socializedLossAccount:o,authority:i,tokenProgram:g,state:p,greeks:A}=await(async e=>{const t=new y.Connection(r.rpc);await w.Exchange.load(l.Rn,l.L5,t,w.utils.defaultCommitment(),void 0,0);const a=(0,x.toPublicKey)(e),s=w.Exchange.programId,n=w.Exchange.zetaGroupAddress,[o]=await w.utils.getMarginAccount(s,n,a);return{zetaGroup:n,marginAccount:o,vault:w.Exchange.vaultAddress,userTokenAccount:await w.utils.getAssociatedTokenAddress(w.Exchange.usdcMintAddress,a),socializedLossAccount:w.Exchange.socializedLossAccountAddress,authority:a,tokenProgram:h.utils.token.TOKEN_PROGRAM_ID,state:w.Exchange.stateAddress,greeks:w.Exchange.zetaGroup.greeks}})(a.master.toBase58()),f={[d.zetaGroup]:e.toBase58(),[d.marginAccount]:t.toBase58(),[d.vault]:s.toBase58(),[d.userTokenAccount]:n.toBase58(),[d.socializedLossAccount]:o.toBase58(),[d.authority]:i.toBase58(),[d.tokenProgram]:g.toBase58(),[d.state]:p.toBase58(),[d.greeks]:A.toBase58()};return u(m,{...f,...c})}catch(e){window.notify({type:"error",description:e.message})}finally{S(!1)}}),[u,a,c]),z=!c[d.amount];return a?(0,A.jsxs)(o.Row,{gutter:[24,24],justify:"space-between",style:{height:"100%"},children:[(0,A.jsx)(o.Col,{span:24,children:(0,A.jsx)(i.Y2,{id:d.amount,title:"Deposit",prefix:(0,A.jsx)(i.pC,{id:d.mint,defaultValue:f[r.net],disabled:!0})})}),(0,A.jsx)(o.Col,{span:24,children:(0,A.jsx)(o.Row,{style:{height:"100%"},align:"bottom",children:(0,A.jsx)(o.Col,{span:24,style:{textAlign:"right"},children:(0,A.jsxs)(o.Space,{children:[(0,A.jsx)(o.Button,{type:"text",onClick:k,children:"Close"}),(0,A.jsx)(o.Button,{type:"primary",onClick:b,disabled:z,loading:v,children:"Continue"})]})})})})]}):(0,A.jsx)(o.Empty,{description:"Invalid DAO data"})}},87027:()=>{},34154:()=>{},55555:()=>{},15590:()=>{},74080:()=>{},47306:()=>{}}]);
//# sourceMappingURL=src_templates_zeta-deposit_create_tsx.36fa5ed0.chunk.js.map