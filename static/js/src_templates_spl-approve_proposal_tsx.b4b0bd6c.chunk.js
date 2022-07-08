"use strict";(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([["src_templates_spl-approve_proposal_tsx"],{57263:(A,r,l)=>{l.d(r,{Z:()=>m});var e=l(55754),a=l(45055),d=l(58879),t=l(94751),n=l(48544),o=l(22423),s=l(71276),u=l(15799),h=l(85731),p=l(45263);const{manifest:{appId:b}}=s.Z,m=A=>{let{proposalAddress:r,...l}=A;const s=(0,a.useHistory)(),m=(0,e.useSelector)((A=>A.proposal[r])),{metaData:f}=(0,o.Z)(r),{status:X}=(0,u.Z)(r),v=m.dao.toBase58(),{daoNameUrl:c}=(0,h.Z)(v);return(0,p.jsx)(t.Card,{bordered:!1,onClick:()=>s.push(`/app/${b}/dao/${v}/${c}/proposal/${r}`),className:"proposal-card",bodyStyle:{padding:"24px 0",minHeight:150},hoverable:!0,...l,children:(0,p.jsxs)(t.Row,{gutter:[8,8],children:[(0,p.jsx)(t.Col,{span:24,children:(0,p.jsxs)(t.Row,{children:[(0,p.jsx)(t.Col,{flex:"auto",children:(0,p.jsx)(t.Typography.Title,{level:4,children:null!==f&&void 0!==f&&f.title?f.title:d.util.shortenAddress(r)})}),(0,p.jsx)(t.Col,{children:(0,p.jsx)(n.Z,{status:X})})]})}),(0,p.jsx)(t.Col,{xs:24,md:20,children:l.children}),(0,p.jsx)(t.Col,{span:24,children:(0,p.jsx)(t.Typography.Paragraph,{style:{margin:0},type:"secondary",ellipsis:{rows:2},children:null===f||void 0===f?void 0:f.description})})]})})}},62761:(A,r,l)=>{l.d(r,{m:()=>d});var e=l(92950),a=l(22423);const d=A=>{const[r,l]=(0,e.useState)({}),{metaData:d,loading:t}=(0,a.Z)(A),n=(0,e.useCallback)((()=>d&&!t&&d.templateData?l(d.templateData):l({})),[t,d]);return(0,e.useEffect)((()=>{n()}),[n]),r}},96862:(A,r,l)=>{l.r(r),l.d(r,{default:()=>b});var e=l(55754),a=l(4550),d=l.n(a),t=l(94751),n=l(42201),o=l(29863),s=l(57263),u=l(62761),h=l(86910),p=l(45263);const b=A=>{let{proposalAddress:r}=A;const l=(0,e.useSelector)((A=>A.proposal[r])),a=(0,u.m)(r),b=1e3*l.endDate.toNumber(),m=a.mint;return(0,p.jsx)(s.Z,{proposalAddress:r,style:{background:`url(${h})`},children:(0,p.jsxs)(t.Row,{gutter:[12,12],children:[(0,p.jsx)(t.Col,{xs:12,md:6,children:(0,p.jsx)(o.Z,{label:"Template",value:(0,p.jsx)(t.Typography.Text,{className:"t-16",children:"SPL/Approve"})})}),(0,p.jsx)(t.Col,{xs:12,md:6,children:(0,p.jsx)(o.Z,{label:"Token",value:(0,p.jsx)(t.Typography.Text,{className:"t-16",children:(0,p.jsxs)(t.Space,{children:[(0,p.jsx)(n.gj,{mintAddress:m}),(0,p.jsx)(n.Z$,{mintAddress:m})]})})})}),(0,p.jsx)(t.Col,{xs:12,md:6,children:(0,p.jsx)(o.Z,{className:"t-16",label:"Amount",value:(null===a||void 0===a?void 0:a.amount)||"--"})}),(0,p.jsx)(t.Col,{xs:12,md:6,children:(0,p.jsx)(o.Z,{label:"End time",value:b&&(0,p.jsx)(t.Typography.Text,{className:"t-16",children:d()(b).format("hh:mm A, MMM Do, YYYY")})})})]})})}},86910:A=>{A.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=src_templates_spl-approve_proposal_tsx.b4b0bd6c.chunk.js.map