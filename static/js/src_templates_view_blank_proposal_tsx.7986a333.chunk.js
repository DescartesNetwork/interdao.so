"use strict";(globalThis.webpackChunkinter_dao=globalThis.webpackChunkinter_dao||[]).push([["src_templates_view_blank_proposal_tsx"],{60237:(s,A,e)=>{e.d(A,{Z:()=>y});var a=e(92950),i=e(4550),l=e.n(i),t=e(32671),o=e(54653),p=e(45055),n=e(18863),r=e(48544),m=e(22423),c=e(15799),x=e(79621),d=e(45263);const g=s=>{let{proposalAddress:A,...e}=s;const a=(0,p.useHistory)(),{metaData:i}=(0,m.Z)(A),{status:l}=(0,c.Z)(A);return(0,d.jsx)(t.Card,{bordered:!1,onClick:()=>a.push(x.z.proposalDetails.generatePath({proposalAddress:A})),className:"proposal-card",bodyStyle:{padding:"24px 12px 0 0",minHeight:150},hoverable:!0,...e,children:(0,d.jsxs)(t.Row,{gutter:[8,8],children:[(0,d.jsx)(t.Col,{span:24,children:(0,d.jsxs)(t.Row,{children:[(0,d.jsx)(t.Col,{flex:"auto",children:(0,d.jsx)(t.Typography.Title,{level:4,children:null!==i&&void 0!==i&&i.title?i.title:n.util.shortenAddress(A)})}),(0,d.jsx)(t.Col,{children:(0,d.jsx)(r.Z,{status:l})})]})}),(0,d.jsx)(t.Col,{xs:24,md:20,children:e.children}),(0,d.jsx)(t.Col,{span:24,children:(0,d.jsx)(t.Typography.Paragraph,{style:{margin:0},type:"secondary",ellipsis:{rows:2},children:null===i||void 0===i?void 0:i.description})})]})})};var h=e(74939),I=e(99370);const k=s=>{let{configs:A,value:e}=s;return"mint-select"===A.type?(0,d.jsx)(o.Z,{label:A.title,value:(0,d.jsx)(t.Typography.Text,{className:"t-16",children:(0,d.jsxs)(t.Space,{children:[(0,d.jsx)(h.Z,{mintAddress:e}),(0,d.jsx)(I.Z,{mintAddress:e})]})})}):"number"===A.type?(0,d.jsx)(o.Z,{className:"t-16",label:A.title,value:e||"--"}):null};var S=e(32670);const y=s=>{let{proposalAddress:A,configs:e,background:i}=s;const p=(0,S.Z)(A),{metaData:n}=(0,m.Z)(A);if(!p||null===n||void 0===n||!n.templateData)return(0,d.jsx)(t.Spin,{spinning:!0});const r=1e3*p.endDate.toNumber(),c=n.templateData;return(0,d.jsx)(g,{proposalAddress:A,style:{background:i},children:(0,d.jsxs)(t.Row,{gutter:[12,12],children:[(0,d.jsx)(t.Col,{xs:12,md:6,children:(0,d.jsx)(o.Z,{label:"Template",value:(0,d.jsx)(t.Typography.Text,{className:"t-16",children:n.templateConfig.title})})}),(0,d.jsx)(t.Col,{xs:12,md:6,children:(0,d.jsx)(o.Z,{label:"End time",value:r&&(0,d.jsx)(t.Typography.Text,{className:"t-16",children:l()(r).format("hh:mm A, MMM Do, YYYY")})})}),e.components.map((s=>{const A=s.prefix;return(0,d.jsxs)(a.Fragment,{children:[A&&(0,d.jsx)(t.Col,{xs:12,md:6,children:(0,d.jsx)(k,{configs:A,value:c[A.id]})}),("mint-select"===s.type||"number"===s.type)&&(0,d.jsx)(t.Col,{xs:12,md:6,children:(0,d.jsx)(k,{configs:s,value:c[s.id]})})]},s.id)}))]})})}},24971:(s,A,e)=>{e.d(A,{f:()=>a});const a={name:e(96706).s.BlankTemplate,title:"Blank",components:[]}},37576:(s,A,e)=>{e.r(A),e.d(A,{default:()=>r});var a=e(32671),i=e(32670),l=e(22423),t=e(60237),o=e(24971),p=e(7818),n=e(45263);const r=s=>{let{proposalAddress:A}=s;const e=(0,i.Z)(A),{metaData:r}=(0,l.Z)(A);return e&&r?(0,n.jsx)(t.Z,{proposalAddress:A,configs:o.f,background:`url(${p})`}):(0,n.jsx)(a.Spin,{spinning:!0})}},7818:s=>{s.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=src_templates_view_blank_proposal_tsx.7986a333.chunk.js.map