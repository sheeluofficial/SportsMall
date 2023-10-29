"use strict";(self.webpackChunkfrotend=self.webpackChunkfrotend||[]).push([[473],{57966:function(e,r,n){var t=n(4942),a=(n(72791),n(38596)),i=n(26513),o=n(98008),s=n(67025),d=n(91523),l=n(80184),c=(0,a.Z)((function(e){var r,n;return{navbar:(0,t.Z)({display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:999,background:"#ffffff",width:"100%",padding:"1.5rem 1rem 1rem 1rem",boxShadow:"1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.3)"},e.breakpoints.between("999"),{flexDirection:"row",alignItems:"center",padding:"1rem"}),menuIcon:(0,t.Z)({display:"none"},e.breakpoints.down("999"),{display:"block",fontSize:"2rem","& svg":{fontSize:"2rem","&:hover":{color:"#ed1c24"}},"&:hover":{transform:"scale(1.1)"}}),dashboardHead:(r={fontSize:"2rem",fontWeight:900,color:"black",textShadow:"2px 2px 4px rgba(0, 0, 0, 0.1)"},(0,t.Z)(r,e.breakpoints.down("sm"),{fontSize:"1.5rem",marginBottom:"0.5rem"}),(0,t.Z)(r,e.breakpoints.down("999"),{fontSize:"1.8rem",marginBottom:0}),(0,t.Z)(r,e.breakpoints.down("xs"),{marginRight:"1.5rem",fontSize:"1.8rem"}),r),contactButton:(n={padding:"10px 30px",borderRadius:"20px",boxShadow:"0px 2px 8px 0px #0000000a",cursor:"pointer",fontWeight:600,fontSize:"16px",color:"#fff",letterSpacing:"1px",background:"#414141",transition:"background-color 0.3s",marginRight:"2rem"},(0,t.Z)(n,e.breakpoints.down("sm"),{fontSize:"14px",padding:"8px 14px"}),(0,t.Z)(n,e.breakpoints.between("sm","md"),{fontSize:"14px",padding:"7px 15px"}),(0,t.Z)(n,e.breakpoints.down("xs"),{display:"none"}),(0,t.Z)(n,"&:hover",{background:"#ed1c24"}),n),headerBottom__logo_main:{height:"3.5rem",alignSelf:"center",paddingLeft:"25px","& img":{height:"100%",width:"auto"}}}}));r.Z=function(e){var r=e.toggleHandler,t=c();return(0,l.jsxs)("nav",{className:t.navbar,children:[(0,l.jsx)(s.Z,{className:t.menuIcon,onClick:r,children:(0,l.jsx)(o.Z,{fontSize:"2rem"})}),(0,l.jsx)("div",{className:t.dashboardHead,children:(0,l.jsx)(d.rU,{to:"/admin/dashboard",style:{textDecoration:"none",color:"none",width:"100%",height:"100%"},children:(0,l.jsx)("img",{src:n(35756),alt:"logo",className:t.headerBottom__logo_main})})}),(0,l.jsx)(d.rU,{to:"/contact",style:{textDecoration:"none",color:"none"},children:(0,l.jsx)(i.Z,{className:t.contactButton,children:"Contact Us"})})]})}},66473:function(e,r,n){n.r(r);var t=n(29439),a=n(72791),i=(n(72113),n(5151)),o=n(91523),s=n(59434),d=n(76622),l=n(56534),c=n(64880),m=n(65308),x=n(50069),h=n(21079),u=n(57407),p=n(81397),g=n(57966),f=n(20018),b=n(80184);r.default=function(){var e=(0,s.I0)(),r=(0,c.k6)(),n=(0,l.VY)(),j=(0,s.v9)((function(e){return e.allOrders})),v=j.error,N=j.loading,w=j.orders,S=(0,s.v9)((function(e){return e.deleteUpdateOrder})),Z=S.error,k=S.isDeleted,y=(0,a.useState)(!1),z=(0,t.Z)(y,2),B=z[0],I=z[1];(0,a.useEffect)((function(){var e=function(){window.innerWidth>999&&B&&I(!1)};return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[B]),(0,a.useEffect)((function(){v&&(n.error(v),e((0,d.b9)())),Z&&(n.error(Z),e((0,d.b9)())),k&&(n.success("Order Deleted Successfully"),r.push("/admin/orders"),e({type:f.zE})),e((0,d.zk)())}),[e,v,n,k,Z]);var C=[{field:"id",headerName:"Order ID",minWidth:120,flex:.7,headerClassName:"column-header"},{field:"status",headerName:"Status",minWidth:100,flex:.8,headerClassName:"column-header hide-on-mobile",renderCell:function(e){var r="Delivered"===e.value?"green":"red";return(0,b.jsx)("div",{style:{color:r,fontWeight:600},children:e.value})}},{field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:120,flex:.8,headerClassName:"column-header hide-on-mobile"},{field:"amount",headerName:"Amount",type:"number",minWidth:120,flex:.8,headerClassName:"column-header hide-on-mobile"},{field:"actions",headerName:"Actions",flex:1.5,sortable:!1,minWidth:150,headerClassName:"column-header1",renderCell:function(r){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o.rU,{to:"/admin/order/".concat(r.getValue(r.id,"id")),children:(0,b.jsx)(h.Z,{className:"icon-"})}),(0,b.jsx)(o.rU,{onClick:function(){return n=r.getValue(r.id,"id"),void e((0,d.wH)(n));var n},children:(0,b.jsx)(u.Z,{className:"iconbtn"})})]})}}],D=[];return w&&w.forEach((function(e){D.push({id:e._id,itemsQty:e.orderItems.length,amount:e.totalPrice,status:e.orderStatus})})),(0,b.jsx)(b.Fragment,{children:N?(0,b.jsx)(x.Z,{}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(m.Z,{title:"ALL Orders - Admin"}),(0,b.jsxs)("div",{className:"product-list",style:{marginTop:0},children:[(0,b.jsx)("div",{className:B?"toggleBox":"listSidebar",children:(0,b.jsx)(p.Z,{})}),(0,b.jsxs)("div",{className:"list-table",children:[(0,b.jsx)(g.Z,{toggleHandler:function(){console.log("toggle"),I(!B)}}),(0,b.jsxs)("div",{className:"productListContainer",children:[(0,b.jsx)("h4",{id:"productListHeading",children:"ALL ORDERS"}),(0,b.jsx)(i._$r,{rows:D,columns:C,pageSize:10,disableSelectionOnClick:!0,className:"productListTable",autoHeight:!0})]})]})]})]})})}},81397:function(e,r,n){n(72791);var t=n(64880),a=n(91523),i=n(60220),o=n(4567),s=n(5849),d=n(97235),l=n(32338),c=n(59140),m=n(42419),x=n(41992),h=n(15776),u=n(74865),p=n(37541),g=n(68535),f=n(59434),b=n(80184),j=(0,d.Z)((function(e){return{sidebar:{backgroundColor:"#fff",padding:"2rem 0",boxShadow:"2px 10px 6px rgba(0, 0, 0, 0.4)",borderRadius:"5px",margin:"0 auto",width:"100%"},avatar11:{width:"80px",height:"80px",border:"5px solid #414141",margin:"0 auto",marginBottom:"1rem",display:"flex",justifyContent:"center",alignItems:"center"},name:{fontWeight:"500",textAlign:"center",fontSize:"1rem"},email:{color:"#414141",marginBottom:"1.5rem",textAlign:"center",fontSize:"0.9rem"},divider:{height:"2px",width:"75%",backgroundColor:"#414141",margin:"2rem"},button:{marginLeft:"2rem !important",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)",backgroundColor:"#292929 !important",color:"white   !important",width:"70%     !important",padding:"0.8rem 2rem   !important",borderRadius:"4px !important","&:hover":{backgroundColor:"#ed1c24 !important",color:"white !important"}},sideBarMenu:{listStyleType:"none",padding:0,margin:"3rem  10px",width:"100%"},sideBarMenuItem:{display:"flex",alignItems:"center",padding:"0.9rem 1rem",borderRadius:"2px",marginTop:"1.3rem",width:"75%",boxShadow:"4px 4px 8px rgba(0, 0, 0, 0.3)","&:hover":{backgroundColor:"#ed1c24",boxShadow:"2px 2px 6px rgba(0, 0, 0, 0.4)","& svg":{color:"white"},"& span":{color:"white !important"}},"& svg":{color:"#414141",fontSize:"26px",margin:"0 20px  0 "},"& span":{color:"#414141",fontSize:"1rem",fontWeight:"500",marginLeft:"1rem",textDecoration:"none",textDecorationLine:"none",transition:"color 0.3s ease"}}}}));r.Z=function(){var e=j(),r=(0,f.v9)((function(e){return e.userData})),n=r.user,d=r.loading,v=(0,t.k6)();return(0,b.jsx)(b.Fragment,{children:!d&&(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)("div",{className:e.sidebar,children:[(0,b.jsx)(i.Z,{src:n&&n.avatar.url,alt:"User Avatar",className:e.avatar11}),(0,b.jsx)(o.Z,{variant:"subtitle1",className:e.name,children:n&&n.name}),(0,b.jsx)(o.Z,{variant:"subtitle2",className:e.email,children:n&&n.email}),(0,b.jsx)("div",{className:e.divider}),(0,b.jsxs)("ul",{className:e.sideBarMenu,children:[(0,b.jsx)(a.rU,{to:"/admin/dashboard",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(l.Z,{fontSize:"large"}),(0,b.jsxs)("span",{className:e.sideBarMenuItem_text,children:[" ","Dashboard"]})]})}),(0,b.jsx)(a.rU,{to:"/",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(p.Z,{fontSize:"large"}),(0,b.jsx)("span",{className:e.sideBarMenuItem_text,children:"Home"})]})}),(0,b.jsx)(a.rU,{to:"/admin/products",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(c.Z,{fontSize:"large"}),(0,b.jsxs)("span",{className:e.sideBarMenuItem_text,children:[" ","Products"]})]})}),(0,b.jsx)(a.rU,{to:"/admin/new/product",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(m.Z,{fontSize:"large"}),(0,b.jsx)("span",{className:e.sideBarMenuItem_text,children:"Add Product"})]})}),(0,b.jsx)(a.rU,{to:"/admin/orders",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(x.Z,{fontSize:"large"}),(0,b.jsx)("span",{className:e.sideBarMenuItem_text,children:"Orders"})]})}),(0,b.jsx)(a.rU,{to:"/admin/reviews",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(h.Z,{fontSize:"large"}),(0,b.jsx)("span",{className:e.sideBarMenuItem_text,children:"Reviews"})]})}),(0,b.jsx)(a.rU,{to:"/contact",style:{color:"inherit",textDecoration:"none"},children:(0,b.jsxs)("li",{className:e.sideBarMenuItem,children:[(0,b.jsx)(g.Z,{fontSize:"large"}),(0,b.jsx)("span",{className:e.sideBarMenuItem_text,children:"Contact"})]})})]}),(0,b.jsx)("div",{className:e.divider}),(0,b.jsxs)(s.Z,{className:e.button,onClick:function(){v.push("/account")},variant:"contained",children:[(0,b.jsx)(u.Z,{fontSize:"large",style:{marginRight:"10px"}}),"Account"]})]})})})}},72113:function(){}}]);
//# sourceMappingURL=473.d3f323ad.chunk.js.map