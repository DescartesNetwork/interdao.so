"use strict";(globalThis.webpackChunkinterdao=globalThis.webpackChunkinterdao||[]).push([["src_templates_spl-approve_info_tsx"],{52822:(e,l,s)=>{s.d(l,{Z:()=>c});var t=s(92950),n=s(51518),a=s.n(n),o=s(12069),r=s(94751),i=s(69716),d=s(45263);const c=e=>{let{value:l}=e;const[s,n]=(0,t.useState)(!1);return(0,d.jsx)(r.Tooltip,{title:"Copied",visible:s,children:(0,d.jsx)(a(),{text:l,children:(0,d.jsx)(i.Z,{style:{cursor:"pointer"},name:"copy-outline",onClick:async()=>{n(!0),await o.util.asyncWait(1500),n(!1)}})})})}},62761:(e,l,s)=>{s.d(l,{m:()=>a});var t=s(92950),n=s(22423);const a=e=>{const[l,s]=(0,t.useState)({}),{metaData:a,loading:o}=(0,n.Z)(e),r=(0,t.useCallback)((()=>a&&!o&&a.templateData?s(a.templateData):s({})),[o,a]);return(0,t.useEffect)((()=>{r()}),[r]),l}},90125:(e,l,s)=>{s.r(l),s.d(l,{default:()=>c});var t=s(12069),n=s(94751),a=s(42201),o=s(48302),r=s(52822),i=s(62761),d=s(45263);const c=e=>{let{proposalAddress:l}=e;const s=(0,i.m)(l),c=s.mint,u=(null===s||void 0===s?void 0:s.source)||"",p=(null===s||void 0===s?void 0:s.delegate)||"";return(0,d.jsxs)(n.Row,{gutter:[12,12],children:[(0,d.jsx)(n.Col,{span:24,children:(0,d.jsx)(o.Z,{label:"Template",value:"SPL/Approve"})}),(0,d.jsx)(n.Col,{span:24,children:(0,d.jsx)(o.Z,{label:"Token",value:(0,d.jsxs)(n.Space,{children:[(0,d.jsx)(a.gj,{mintAddress:c}),(0,d.jsx)(a.Z$,{mintAddress:c})]})})}),(0,d.jsx)(n.Col,{span:24,children:(0,d.jsx)(o.Z,{label:"Amount",value:(null===s||void 0===s?void 0:s.amount)||"--"})}),(0,d.jsx)(n.Col,{span:24,children:(0,d.jsx)(o.Z,{label:"Source's Wallet Address",value:(0,d.jsxs)(n.Space,{size:10,children:[(0,d.jsx)(n.Typography.Text,{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>window.open(t.util.explorer(u),"_blank"),children:t.util.shortenAddress(u)}),(0,d.jsx)(r.Z,{value:u})]})})}),(0,d.jsx)(n.Col,{span:24,children:(0,d.jsx)(o.Z,{label:"Delegate's Wallet Address",value:(0,d.jsxs)(n.Space,{size:10,children:[(0,d.jsx)(n.Typography.Text,{style:{cursor:"pointer",textDecoration:"underline"},onClick:()=>window.open(t.util.explorer(p),"_blank"),children:t.util.shortenAddress(p)}),(0,d.jsx)(r.Z,{value:p})]})})})]})}}}]);
//# sourceMappingURL=src_templates_spl-approve_info_tsx.7108d57b.chunk.js.map