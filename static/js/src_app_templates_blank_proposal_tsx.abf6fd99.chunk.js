"use strict";(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([["src_app_templates_blank_proposal_tsx"],{39827:(A,o,p)=>{p.r(o),p.d(o,{default:()=>q});var t=p(55754),l=p(4550),a=p.n(l),i=p(94751),r=p(96316),s=p(39564);var d=p(45263);const q=A=>{let{proposalAddress:o}=A;const p=(0,t.useSelector)((A=>A.proposal[o])).endDate.toNumber();return(0,d.jsx)(s.Z,{proposalAddress:o,style:{background:"url(data:image/png;base64,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)"},children:(0,d.jsxs)(i.Row,{gutter:[12,12],children:[(0,d.jsx)(i.Col,{xs:12,md:6,children:(0,d.jsx)(r.Z,{label:"Template",value:(0,d.jsx)(i.Typography.Text,{className:"t-16",children:"Blank"})})}),(0,d.jsx)(i.Col,{xs:12,md:6,children:(0,d.jsx)(r.Z,{label:"End time",value:p&&(0,d.jsx)(i.Typography.Text,{className:"t-16",children:a()(p).format("hh:mm A, MMM Do, YYYY")})})})]})})}},39564:(A,o,p)=>{p.d(o,{Z:()=>e});var t=p(55754),l=p(45055),a=p(94751),i=p(95486),r=p(86164),s=p(81347),d=p(72410),q=p(34559),m=p(45263);const{manifest:{appId:R}}=r.Z,e=A=>{let{proposalAddress:o,...p}=A;const r=(0,l.useHistory)(),e=(0,t.useSelector)((A=>A.proposal[o])),{metaData:V}=(0,i.Z)(o),{status:h}=(0,d.Z)(o),u=e.dao.toBase58();return(0,m.jsx)(a.Card,{bordered:!1,onClick:()=>r.push(`/app/${R}/dao/${u}/proposal/${o}`),className:"proposal-card",bodyStyle:{padding:"24px 0",minHeight:150},hoverable:!0,...p,children:(0,m.jsxs)(a.Row,{gutter:[8,8],children:[(0,m.jsx)(a.Col,{span:24,children:(0,m.jsxs)(a.Row,{children:[(0,m.jsx)(a.Col,{flex:"auto",children:(0,m.jsx)(a.Typography.Title,{level:4,children:null!==V&&void 0!==V&&V.title?V.title:(0,q.Xn)(o)})}),(0,m.jsx)(a.Col,{children:(0,m.jsx)(s.Z,{status:h})})]})}),(0,m.jsx)(a.Col,{xs:24,md:20,children:p.children}),(0,m.jsx)(a.Col,{span:24,children:(0,m.jsx)(a.Typography.Paragraph,{style:{margin:0},type:"secondary",ellipsis:{rows:2},children:null===V||void 0===V?void 0:V.description})})]})})}}}]);
//# sourceMappingURL=src_app_templates_blank_proposal_tsx.abf6fd99.chunk.js.map