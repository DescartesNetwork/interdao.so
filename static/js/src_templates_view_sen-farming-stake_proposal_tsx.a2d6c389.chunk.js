"use strict";(globalThis.webpackChunkinter_dao=globalThis.webpackChunkinter_dao||[]).push([["src_templates_view_sen-farming-stake_proposal_tsx"],{60237:(e,s,A)=>{A.d(s,{Z:()=>k});var a=A(92950),i=A(4550),t=A.n(i),r=A(32671),n=A(54653),m=A(45055),o=A(18863),l=A(48544),p=A(22423),c=A(15799),d=A(75406),x=A(45263);const g=e=>{let{proposalAddress:s,...A}=e;const a=(0,m.useHistory)(),{metaData:i}=(0,p.Z)(s),{status:t}=(0,c.Z)(s);return(0,x.jsx)(r.Card,{bordered:!1,onClick:()=>a.push(d.z.proposalDetails.generatePath({proposalAddress:s})),className:"proposal-card",bodyStyle:{padding:"24px 12px 0 0",minHeight:150},hoverable:!0,...A,children:(0,x.jsxs)(r.Row,{gutter:[8,8],children:[(0,x.jsx)(r.Col,{span:24,children:(0,x.jsxs)(r.Row,{children:[(0,x.jsx)(r.Col,{flex:"auto",children:(0,x.jsx)(r.Typography.Title,{level:4,children:null!==i&&void 0!==i&&i.title?i.title:o.util.shortenAddress(s)})}),(0,x.jsx)(r.Col,{children:(0,x.jsx)(l.Z,{status:t})})]})}),(0,x.jsx)(r.Col,{xs:24,md:20,children:A.children}),(0,x.jsx)(r.Col,{span:24,children:(0,x.jsx)(r.Typography.Paragraph,{style:{margin:0},type:"secondary",ellipsis:{rows:2},children:null===i||void 0===i?void 0:i.description})})]})})};var h=A(74939),I=A(99370);const S=e=>{let{configs:s,value:A}=e;return"mint-select"===s.type?(0,x.jsx)(n.Z,{label:s.title,value:(0,x.jsx)(r.Typography.Text,{className:"t-16",children:(0,x.jsxs)(r.Space,{children:[(0,x.jsx)(h.Z,{mintAddress:A}),(0,x.jsx)(I.Z,{mintAddress:A})]})})}):"number"===s.type?(0,x.jsx)(n.Z,{className:"t-16",label:s.title,value:A||"--"}):null};var y=A(32670);const k=e=>{let{proposalAddress:s,configs:A,background:i}=e;const m=(0,y.Z)(s),{metaData:o}=(0,p.Z)(s);if(!m||null===o||void 0===o||!o.templateData)return(0,x.jsx)(r.Spin,{spinning:!0});const l=1e3*m.endDate.toNumber(),c=o.templateData;return(0,x.jsx)(g,{proposalAddress:s,style:{background:i},children:(0,x.jsxs)(r.Row,{gutter:[12,12],children:[(0,x.jsx)(r.Col,{xs:12,md:6,children:(0,x.jsx)(n.Z,{label:"Template",value:(0,x.jsx)(r.Typography.Text,{className:"t-16",children:o.templateConfig.title})})}),(0,x.jsx)(r.Col,{xs:12,md:6,children:(0,x.jsx)(n.Z,{label:"End time",value:l&&(0,x.jsx)(r.Typography.Text,{className:"t-16",children:t()(l).format("hh:mm A, MMM Do, YYYY")})})}),A.components.map((e=>{const s=e.prefix;return(0,x.jsxs)(a.Fragment,{children:[s&&(0,x.jsx)(r.Col,{xs:12,md:6,children:(0,x.jsx)(S,{configs:s,value:c[s.id]})}),("mint-select"===e.type||"number"===e.type)&&(0,x.jsx)(r.Col,{xs:12,md:6,children:(0,x.jsx)(S,{configs:e,value:c[e.id]})})]},e.id)}))]})})}},57511:(e,s,A)=>{A.d(s,{U6:()=>a,aK:()=>i});const a={name:A(96706).s.SenFarmingStake,title:"Sen/Farming Stake",components:[{title:"Farm Address",type:"address",id:"farm"},{title:"Amount",type:"number",id:"amount",prefix:{id:"mint",type:"mint-select",disabled:!0}}]},i={devnet:{senFarmingProgram:"6LaxnmWdYUAJvBJ4a1R8rrsvCRtaY7b43zKiNAU2k3Nx"},testnet:{senFarmingProgram:"6LaxnmWdYUAJvBJ4a1R8rrsvCRtaY7b43zKiNAU2k3Nx"},mainnet:{senFarmingProgram:"E6Vc9wipgm8fMXHEYwgN7gYdDbyvpPBUiTNy67zPKuF4"}}},947:(e,s,A)=>{A.r(s),A.d(s,{default:()=>l});var a=A(32671),i=A(32670),t=A(22423),r=A(60237),n=A(57511),m=A(7818),o=A(45263);const l=e=>{let{proposalAddress:s}=e;const A=(0,i.Z)(s),{metaData:l}=(0,t.Z)(s);return A&&l?(0,o.jsx)(r.Z,{proposalAddress:s,configs:n.U6,background:`url(${m})`}):(0,o.jsx)(a.Spin,{spinning:!0})}},7818:e=>{e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=src_templates_view_sen-farming-stake_proposal_tsx.a2d6c389.chunk.js.map