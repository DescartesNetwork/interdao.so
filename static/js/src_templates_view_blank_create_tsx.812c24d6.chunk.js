"use strict";(globalThis.webpackChunkinter_dao=globalThis.webpackChunkinter_dao||[]).push([["src_templates_view_blank_create_tsx"],{329:(e,a,t)=>{t.d(a,{h:()=>i});var s=t(45055),n=t(92950),r=t(55754),l=t(50794),o=t(62919),c=t(79621);const i=()=>{const e=(0,r.useDispatch)(),a=(0,s.useHistory)();return{confirm:(0,n.useCallback)((async(t,s,n,r)=>{const i=l.web3.Keypair.generate().publicKey,u={templateConfig:s,templateData:n,serializedTxs:r.map((e=>(e.recentBlockhash=i.toBase58(),e.feePayer=i,e.serialize({requireAllSignatures:!1}).toString("base64")))),daoAddress:t};await e((0,o.vr)(u)),a.push(c.z.createProposal.generatePath({}))}),[e,a]),close:(0,n.useCallback)((async()=>{await e((0,o.JJ)())}),[e])}}},24971:(e,a,t)=>{t.d(a,{f:()=>s});const s={name:t(96706).s.BlankTemplate,title:"Blank",components:[]}},72821:(e,a,t)=>{t.r(a),t.d(a,{default:()=>d});var s=t(50794),n=t(32671),r=t(24971),l=t(329),o=t(22734),c=t(51845),i=t(45263),u=t(97429).Buffer;const d=e=>{let{daoAddress:a="",defaultData:t}=e;const d=(0,o.K)(a),{confirm:p,close:h}=(0,l.h)();return(0,i.jsxs)(n.Row,{gutter:[24,24],children:[(0,i.jsx)(n.Col,{span:24}),(0,i.jsx)(n.Col,{span:24,style:{textAlign:"right"},children:(0,i.jsxs)(n.Space,{children:[(0,i.jsx)(n.Button,{type:"text",onClick:h,children:"Close"}),(0,i.jsx)(n.Button,{type:"primary",onClick:async()=>{try{const e=new s.web3.TransactionInstruction({keys:[{pubkey:null===d||void 0===d?void 0:d.master,isSigner:!0,isWritable:!0}],data:u.from("Dao proposal blank","utf-8"),programId:new s.web3.PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")});return p(a,r.f,{},[(new s.web3.Transaction).add(e)])}catch(e){(0,c.cB)(e)}},children:"Continue"})]})})]})}}}]);
//# sourceMappingURL=src_templates_view_blank_create_tsx.812c24d6.chunk.js.map