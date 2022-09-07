(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([["src_templates_zeta-create_create_tsx"],{20662:(t,a,e)=>{"use strict";e.d(a,{i:()=>s,l:()=>o});var n=e(27906),r=e(40106);let s;!function(t){t.tokenAccount="token-account",t.decimalize="decimalize"}(s||(s={}));const o={[s.tokenAccount]:{call:async t=>n.utils.token.associatedAddress({mint:new n.web3.PublicKey(t.mint),owner:new n.web3.PublicKey(t.owner)})},[s.decimalize]:{call:async t=>{const{splt:a}=window.sentre,e=await a.getMintData(t.mint);return r.default.decimalize(t.amount,e.decimals)}}}},74596:(t,a,e)=>{"use strict";e.d(a,{h:()=>f});var n=e(92950),r=e(55754),s=e(45055),o=e(71276),i=e(62919),c=e(27906),u=e(71256),m=e(41165),l=e(11439),d=e(54121),g=e(20662);const p=(t,a)=>{switch(a){case"u8":case"u32":return Number(t);case"u64":return new c.BN(t);default:throw new Error("Invalid type of arg: "+a)}},y=async(t,a)=>{const e=await(t=>{const a=new u.Connection(m.rpc,{commitment:"confirmed"}),e=new c.AnchorProvider(a,new l.Z,{commitment:"confirmed"});return new c.Program({instructions:[{name:t.ixName,accounts:t.accounts,args:t.args}],name:"program-parser",version:"0.0.0"},t.programId,e)})(t),n=await(async(t,a)=>{const e=t.accounts,n={};for(const r of e)if((0,d.tq)(r)){const t=r.rule.configs,e={};for(const n in t)e[n]=a[t[n]];const s=await g.l[r.rule.name].call({...e});n[r.name]=s}else n[r.name]=new u.PublicKey(a[r.name]);return n})(t,a),r=await(async(t,a)=>{const e=[];for(const n of t.args){let t=a[n.name];if((0,d.ny)(n)){const e=n.rule.configs,r={};for(const t in e)r[t]=a[e[t]];t=await g.l[n.rule.name].call({...r})}e.push(p(t,n.type))}return e})(t,a),s=await e.methods[t.ixName].call(void 0,...r).accounts(n).instruction();return t.anchor||(s.data=s.data.slice(8,s.data.length)),s};var w=e(85731);const{manifest:{appId:h}}=o.Z,f=()=>{const t=(0,r.useDispatch)(),a=(0,s.useHistory)(),{daoAddress:e}=(0,s.useParams)(),{daoNameUrl:o}=(0,w.Z)(e);return{confirm:(0,n.useCallback)((async(n,r)=>{const s=await y(n,r),c=await((t,a)=>{const e={};for(let n=0;n<t.accounts.length;n++){const r=t.accounts[n];e[r.name]={isMaster:r.isMaster,isSigner:r.isSigner,isWritable:r.isMut,pubkey:a.keys[n].pubkey}}return{name:t.name,data:a.data,accounts:e,programId:new u.PublicKey(t.programId)}})(n,s);return await t((0,i.St)(n.name)),await t((0,i.Rm)(c)),await t((0,i.yx)(!1)),await t((0,i.mS)(r)),a.push(`/app/${h}/dao/${e}/${o}/new-proposal`)}),[e,o,t,a]),close:(0,n.useCallback)((async()=>{await t((0,i.JJ)())}),[t])}}},37583:(t,a,e)=>{"use strict";e.r(a),e.d(a,{default:()=>d});var n=e(92950),r=e(94751),s=e(54121),o=e(93642);let i;!function(t){t.zetaGroup="zetaGroup",t.systemProgram="systemProgram",t.zetaProgram="zetaProgram",t.payer="payer",t.authority="authority",t.marginAccount="marginAccount"}(i||(i={}));const c={name:s.sR.ZetaCreate,ixName:"initializeMarginAccount",anchor:!0,accounts:[{name:i.marginAccount,isMut:!0,isSigner:!1,isMaster:!1},{name:i.authority,isMut:!1,isSigner:!0,isMaster:!0},{name:i.payer,isMut:!0,isSigner:!0,isMaster:!0},{name:i.zetaProgram,isMut:!1,isSigner:!1,isMaster:!1},{name:i.systemProgram,isMut:!1,isSigner:!1,isMaster:!1},{name:i.zetaGroup,isMut:!1,isSigner:!1,isMaster:!1}],args:[],programId:o.Rn.toBase58()};var u=e(74596),m=e(22734),l=e(45263);const d=t=>{let{daoAddress:a=""}=t;const e=(0,m.K)(a),{confirm:s,close:d}=(0,u.h)(),[g,p]=(0,n.useState)(!1),y=(0,n.useCallback)((async()=>{try{if(!e)throw new Error("Invalid DAO data");p(!0);const t=e.master.toBase58(),{marginAccount:a,zetaGroup:n,systemProgram:r,zetaProgram:u}=await(0,o.r$)(t),m={[i.zetaGroup]:n.toBase58(),[i.marginAccount]:a.toBase58(),[i.authority]:t,[i.payer]:t,[i.systemProgram]:r.toBase58(),[i.zetaProgram]:u.toBase58()};return s(c,m)}catch(t){window.notify({type:"error",description:t.message})}finally{p(!1)}}),[s,e]);return e?(0,l.jsxs)(r.Row,{gutter:[24,24],justify:"space-between",style:{height:"100%"},children:[(0,l.jsx)(r.Col,{span:24,children:(0,l.jsx)(r.Typography.Text,{type:"secondary",children:"Margin account must be created first to store assets and then can perform other transactions"})}),(0,l.jsx)(r.Col,{span:24,children:(0,l.jsx)(r.Row,{style:{height:"100%"},align:"bottom",children:(0,l.jsx)(r.Col,{span:24,style:{textAlign:"right"},children:(0,l.jsxs)(r.Space,{children:[(0,l.jsx)(r.Button,{type:"text",onClick:d,children:"Close"}),(0,l.jsx)(r.Button,{type:"primary",onClick:y,loading:g,children:"Continue"})]})})})})]}):(0,l.jsx)(r.Empty,{description:"Invalid DAO data"})}},93642:(t,a,e)=>{"use strict";e.d(a,{L5:()=>c,Rn:()=>u,r$:()=>m});var n=e(41165),r=e(71256),s=e(27906),o=e(98210),i=e(46029);const c=n.net,u="devnet"===c?new r.PublicKey("BG3oRikW8d16YjUEmX3ZxHm9SiJzrGtMhsSR8aCw1Cd7"):new r.PublicKey("ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD"),m=async t=>{const a=new r.Connection(n.rpc);await o.Exchange.load(u,c,a,o.utils.defaultCommitment(),void 0,0);const e=(0,i.toPublicKey)(t),m=o.Exchange.programId,l=o.Exchange.zetaGroupAddress,[d]=await o.utils.getMarginAccount(m,l,e);return{zetaGroup:l,marginAccount:d,systemProgram:s.web3.SystemProgram.programId,zetaProgram:m}}},87027:()=>{},34154:()=>{},55555:()=>{},15590:()=>{},74080:()=>{},47306:()=>{}}]);
//# sourceMappingURL=src_templates_zeta-create_create_tsx.68af9f96.chunk.js.map