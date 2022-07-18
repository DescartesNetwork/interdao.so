"use strict";(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([["src_templates_spl-transfer_create_tsx"],{91011:(e,t,a)=>{a.d(t,{Jg:()=>d,pC:()=>m,Y2:()=>h});var n=a(92950),s=a(55754),r=a(45055),i=a(94751),o=a(62919),c=a(22734),l=a(45263);const d=e=>{let{id:t,title:a,defaultValue:d,...u}=e;const m=(0,s.useDispatch)(),p=(0,s.useSelector)((e=>e.template.data[t])),{daoAddress:h}=(0,r.useParams)(),y=(0,c.K)(h);(0,n.useEffect)((()=>{d&&void 0===p&&m((0,o.mS)({[t]:d.toString()}))}),[d,m,t,p]);const g=p===(null===y||void 0===y?void 0:y.master.toBase58());return(0,l.jsxs)(i.Space,{direction:"vertical",size:4,style:{width:"100%"},children:[(0,l.jsx)(i.Typography.Text,{type:"secondary",children:a}),(0,l.jsx)(i.Input,{className:"border-less",placeholder:"Input Address",value:p,onChange:e=>m((0,o.mS)({[t]:e.target.value})),prefix:g?(0,l.jsx)(i.Button,{type:"dashed",size:"small",style:{marginLeft:-4,marginRight:2,borderWidth:.5},children:"Master"}):(0,l.jsx)(n.Fragment,{}),...u})]})};var u=a(42201);const m=e=>{let{id:t,title:a,defaultValue:r,disabled:c=!1}=e;const d=(0,s.useDispatch)(),m=(0,s.useSelector)((e=>e.template.data[t]));return(0,n.useEffect)((()=>{r&&void 0===m&&d((0,o.mS)({[t]:r.toString()}))}),[r,d,t,m]),(0,l.jsxs)(i.Space,{direction:"vertical",size:4,style:{width:"100%"},children:[a&&(0,l.jsx)(i.Typography.Text,{type:"secondary",children:a}),(0,l.jsx)(u.Qc,{value:m,onChange:e=>{d((0,o.mS)({[t]:e}))},style:{marginLeft:-7},disabled:c})]})};var p=a(33968);const h=e=>{let{id:t,title:a,defaultValue:r,...c}=e;const d=(0,s.useDispatch)(),u=(0,s.useSelector)((e=>e.template.data[t]));return(0,n.useEffect)((()=>{r&&void 0===u&&d((0,o.mS)({[t]:r.toString()}))}),[r,d,t,u]),(0,l.jsxs)(i.Space,{direction:"vertical",size:4,style:{width:"100%"},children:[(0,l.jsx)(i.Typography.Text,{type:"secondary",children:a}),(0,l.jsx)(p.Z,{className:"border-less",placeholder:"Input Amount",defaultValue:u,onValue:e=>d((0,o.mS)({[t]:e})),...c})]})}},20662:(e,t,a)=>{a.d(t,{i:()=>r,l:()=>i});var n=a(50794),s=a(40106);let r;!function(e){e.tokenAccount="token-account",e.decimalize="decimalize"}(r||(r={}));const i={[r.tokenAccount]:{call:async e=>n.utils.token.associatedAddress({mint:new n.web3.PublicKey(e.mint),owner:new n.web3.PublicKey(e.owner)})},[r.decimalize]:{call:async e=>{const{splt:t}=window.sentre,a=await t.getMintData(e.mint);return s.default.decimalize(e.amount,a.decimals)}}}},74596:(e,t,a)=>{a.d(t,{h:()=>w});var n=a(92950),s=a(55754),r=a(45055),i=a(71276),o=a(62919),c=a(50794),l=a(71256),d=a(2747),u=a(11439),m=a(54121),p=a(20662);const h=(e,t)=>{switch(t){case"u8":case"u32":return Number(e);case"u64":return new c.BN(e);default:throw new Error("Invalid type of arg: "+t)}},y=async(e,t)=>{const a=await(e=>{const t=new l.Connection(d.rpc,{commitment:"confirmed"}),a=new c.AnchorProvider(t,new u.Z,{commitment:"confirmed"});return new c.Program({instructions:[{name:e.ixName,accounts:e.accounts,args:e.args}],name:"program-parser",version:"0.0.0"},e.programId,a)})(e),n=await(async(e,t)=>{const a=e.accounts,n={};for(const s of a)if((0,m.tq)(s)){const e=s.rule.configs,a={};for(const n in e)a[n]=t[e[n]];const r=await p.l[s.rule.name].call({...a});n[s.name]=r}else n[s.name]=new l.PublicKey(t[s.name]);return n})(e,t),s=await(async(e,t)=>{const a=[];for(const n of e.args){let e=t[n.name];if((0,m.ny)(n)){const a=n.rule.configs,s={};for(const e in a)s[e]=t[a[e]];e=await p.l[n.rule.name].call({...s})}a.push(h(e,n.type))}return a})(e,t),r=await a.methods[e.ixName].call(void 0,...s).accounts(n).instruction();return e.anchor||(r.data=r.data.slice(8,r.data.length)),r};var g=a(85731);const{manifest:{appId:f}}=i.Z,w=()=>{const e=(0,s.useDispatch)(),t=(0,r.useHistory)(),{daoAddress:a}=(0,r.useParams)(),{daoNameUrl:i}=(0,g.Z)(a);return{confirm:(0,n.useCallback)((async(n,s)=>{const r=await y(n,s),c=await((e,t)=>{const a={};for(let n=0;n<e.accounts.length;n++){const s=e.accounts[n];a[s.name]={isMaster:s.isMaster,isSigner:s.isSigner,isWritable:s.isMut,pubkey:t.keys[n].pubkey}}return{name:e.name,data:t.data,accounts:a,programId:new l.PublicKey(e.programId)}})(n,r);return await e((0,o.St)(n.name)),await e((0,o.Rm)(c)),await e((0,o.yx)(!1)),await e((0,o.mS)(s)),t.push(`/app/${f}/dao/${a}/${i}/new-proposal`)}),[a,i,e,t]),close:(0,n.useCallback)((async()=>{await e((0,o.JJ)())}),[e])}}},37311:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var n=a(92950),s=a(55754),r=a(40401),i=a(94751),o=a(91011),c=a(50794),l=a(20662),d=a(54121);let u;!function(e){e.source="source",e.destination="destination",e.authority="authority",e.code="code",e.amount="amount",e.mint="mint"}(u||(u={}));const m={name:d.sR.SplTransfer,ixName:d.sR.SplTransfer,anchor:!1,accounts:[{name:u.source,isMut:!0,isSigner:!1,isMaster:!1,rule:{name:l.i.tokenAccount,configs:{mint:u.mint,owner:u.source}}},{name:u.destination,isMut:!0,isSigner:!1,isMaster:!1,rule:{name:l.i.tokenAccount,configs:{mint:u.mint,owner:u.destination}}},{name:u.authority,isMut:!0,isSigner:!0,isMaster:!0}],args:[{name:u.code,type:"u8"},{name:u.amount,type:"u64",rule:{name:l.i.decimalize,configs:{amount:u.amount,mint:u.mint}}}],programId:c.utils.token.TOKEN_PROGRAM_ID.toBase58()};var p=a(74596),h=a(22734),y=a(45263);const g=e=>{let{daoAddress:t=""}=e;const a=(0,h.K)(t),c=(0,s.useSelector)((e=>e.template.data)),{confirm:l,close:d}=(0,p.h)(),g=(0,n.useCallback)((async()=>{try{if(!a)throw new Error("Invalid DAO data");const e={[u.code]:"3",[u.authority]:a.master.toBase58(),[u.source]:a.master.toBase58()};return l(m,{...e,...c})}catch(e){window.notify({type:"error",description:e.message})}}),[l,a,c]),f=!c[u.amount]||!(0,r.isAddress)(c[u.destination])||!c[u.mint];return a?(0,y.jsxs)(i.Row,{gutter:[24,24],children:[(0,y.jsx)(i.Col,{span:24,children:(0,y.jsx)(o.Y2,{id:u.amount,title:"Transfer",prefix:(0,y.jsx)(o.pC,{id:u.mint})})}),(0,y.jsx)(i.Col,{span:24,children:(0,y.jsx)(o.Jg,{id:u.source,title:"Sender's Wallet Address",placeholder:"Input Sender's Wallet Address",readOnly:!0,defaultValue:a.master.toBase58()})}),(0,y.jsx)(i.Col,{span:24,children:(0,y.jsx)(o.Jg,{id:u.destination,title:"Receiver's Wallet Address",placeholder:"Input Receiver's Wallet Address"})}),(0,y.jsx)(i.Col,{span:24}),(0,y.jsx)(i.Col,{span:24,style:{textAlign:"right"},children:(0,y.jsxs)(i.Space,{children:[(0,y.jsx)(i.Button,{type:"text",onClick:d,children:"Close"}),(0,y.jsx)(i.Button,{type:"primary",onClick:g,disabled:f,children:"Continue"})]})})]}):(0,y.jsx)(i.Empty,{description:"Invalid DAO data"})}}}]);
//# sourceMappingURL=src_templates_spl-transfer_create_tsx.f68987ba.chunk.js.map