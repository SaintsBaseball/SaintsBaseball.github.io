(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{SDng:function(t,e,o){"use strict";o.r(e),o.d(e,"PlayersModule",function(){return P});var c=o("tyNb"),n=o("PCNd"),a=o("l7P3"),i=o("/LE6"),s=o("fXoL"),r=o("cDy8"),l=o("MutI"),d=o("ofXK");let b=(()=>{class t{transform(t){return[...t.keys()].sort()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=s.Nb({name:"sortMapByKeyAlphabeticallyPipe",type:t,pure:!0}),t})();function h(t,e){if(1&t){const t=s.Vb();s.Ub(0,"mat-list-item",2),s.bc("click",function(){s.mc(t);const o=e.$implicit;return s.dc().showModal(o)}),s.vc(1),s.Tb()}if(2&t){const t=e.$implicit;s.Db(1),s.wc(t)}}function u(t,e){if(1&t&&(s.Ub(0,"th"),s.vc(1),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.wc(t)}}function p(t,e){if(1&t&&(s.Ub(0,"td"),s.vc(1),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.wc(t)}}function f(t,e){if(1&t&&(s.Ub(0,"tr"),s.uc(1,p,2,1,"td",6),s.Tb()),2&t){const t=e.$implicit;s.Db(1),s.ic("ngForOf",t)}}function g(t,e){if(1&t){const t=s.Vb();s.Ub(0,"div",3),s.Ub(1,"div",4),s.Ub(2,"span",5),s.bc("click",function(){return s.mc(t),s.dc().closeModal()}),s.vc(3,"\xd7"),s.Tb(),s.Ub(4,"h2"),s.vc(5),s.Tb(),s.Ub(6,"table"),s.Ub(7,"thead"),s.Ub(8,"tr"),s.uc(9,u,2,1,"th",6),s.Tb(),s.Tb(),s.Ub(10,"tbody"),s.uc(11,f,2,1,"tr",6),s.Tb(),s.Tb(),s.Tb(),s.Tb()}if(2&t){const t=s.dc();s.Db(5),s.wc(t.modalHeader),s.Db(4),s.ic("ngForOf",t.modalTableHeader),s.Db(2),s.ic("ngForOf",t.modalTableBody)}}let y=(()=>{class t{constructor(){this.showPlayerStatsModal=!1}showModal(t){const e=this.statsForEachPlayer.get(t),o=e.values().next().value;this.buildModalHeader(o,t),this.buildModalTableHeader(o),this.buildModalTableBody(e),this.showPlayerStatsModal=!0}closeModal(){this.showPlayerStatsModal=!1}buildModalHeader(t,e){this.modalHeader=`${e} #${t["#"]}`}buildModalTableHeader(t){this.modalTableHeader=["Season"],Object.keys(t).forEach(t=>{this.shouldIgnoreStatisticKey(t)||this.modalTableHeader.push(t)})}buildModalTableBody(t){this.modalTableBody=[],t.forEach((t,e)=>{const o=[e];Object.keys(t).forEach(e=>{this.shouldIgnoreStatisticKey(e)||o.push(t[e])}),this.modalTableBody.push(o)})}shouldIgnoreStatisticKey(t){return"Player"===t||"#"===t||!r.a["hitting-standard"].includes(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Ib({type:t,selectors:[["players-list"]],inputs:{statsForEachPlayer:"statsForEachPlayer"},decls:4,vars:4,consts:[[3,"click",4,"ngFor","ngForOf"],["class","modal",4,"ngIf"],[3,"click"],[1,"modal"],[1,"modal-content"],[1,"close",3,"click"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(s.Ub(0,"mat-list"),s.uc(1,h,2,1,"mat-list-item",0),s.ec(2,"sortMapByKeyAlphabeticallyPipe"),s.Tb(),s.uc(3,g,12,3,"div",1)),2&t&&(s.Db(1),s.ic("ngForOf",s.fc(2,2,e.statsForEachPlayer)),s.Db(2),s.ic("ngIf",e.showPlayerStatsModal))},directives:[l.a,d.j,d.k,l.b],pipes:[b],styles:[".mat-list-item[_ngcontent-%COMP%]{color:#010150;font-size:x-large}.mat-list-item[_ngcontent-%COMP%]:hover{text-decoration:underline}.modal[_ngcontent-%COMP%]{position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content[_ngcontent-%COMP%]{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.close[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700}.close[_ngcontent-%COMP%]:focus, .close[_ngcontent-%COMP%]:hover{color:#000;text-decoration:none;cursor:pointer}table[_ngcontent-%COMP%]{border:3px solid #000;border-collapse:collapse;text-align:center;width:100%;overflow:hidden}th[_ngcontent-%COMP%]{border-bottom:2px solid #000;background-color:#d3d3d3;border-right:1px solid #000;height:50px;padding-left:.75rem;padding-right:.75rem}td[_ngcontent-%COMP%]{border:1px solid #000}"]}),t})(),m=(()=>{class t{constructor(t){this.store=t,this.title="Saints Players"}ngOnInit(){this.errorMessage$=this.store.pipe(Object(a.q)(i.a)),this.statsForEachPlayer$=this.store.pipe(Object(a.q)(i.d))}}return t.\u0275fac=function(e){return new(e||t)(s.Ob(a.h))},t.\u0275cmp=s.Ib({type:t,selectors:[["players-shell"]],decls:4,vars:4,consts:[[1,"w3-text-black"],[3,"statsForEachPlayer"]],template:function(t,e){1&t&&(s.Ub(0,"h1",0),s.vc(1),s.Tb(),s.Pb(2,"players-list",1),s.ec(3,"async")),2&t&&(s.Db(1),s.wc(e.title),s.Db(1),s.ic("statsForEachPlayer",s.fc(3,2,e.statsForEachPlayer$)))},directives:[y],pipes:[d.b],encapsulation:2,changeDetection:0}),t})();var w=o("hctd");const M=[{path:"",component:m}];let P=(()=>{class t{}return t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({factory:function(e){return new(e||t)},imports:[[n.a,c.b.forChild(M),w.a]]}),t})()}}]);