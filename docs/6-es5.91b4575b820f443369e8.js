!function(){function t(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var o=Object.prototype.toString.call(t).slice(8,-1);"Object"===o&&t.constructor&&(o=t.constructor.name);if("Map"===o||"Set"===o)return Array.from(t);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return e(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function r(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{SDng:function(e,o,a){"use strict";a.r(o),a.d(o,"PlayersModule",function(){return S});var i,c=a("tyNb"),l=a("PCNd"),s=a("l7P3"),d=a("/LE6"),u=a("fXoL"),b=a("cDy8"),f=a("MutI"),h=a("ofXK"),p=((i=function(){function e(){n(this,e)}return r(e,[{key:"transform",value:function(e){return t(e.keys()).sort()}}]),e}()).\u0275fac=function(t){return new(t||i)},i.\u0275pipe=u.Nb({name:"sortMapByKeyAlphabeticallyPipe",type:i,pure:!0}),i);function y(t,e){if(1&t){var n=u.Vb();u.Ub(0,"mat-list-item",2),u.bc("click",function(){u.mc(n);var t=e.$implicit;return u.dc().showModal(t)}),u.vc(1),u.Tb()}if(2&t){var o=e.$implicit;u.Db(1),u.wc(o)}}function m(t,e){if(1&t&&(u.Ub(0,"th"),u.vc(1),u.Tb()),2&t){var n=e.$implicit;u.Db(1),u.wc(n)}}function g(t,e){if(1&t&&(u.Ub(0,"td"),u.vc(1),u.Tb()),2&t){var n=e.$implicit;u.Db(1),u.wc(n)}}function v(t,e){if(1&t&&(u.Ub(0,"tr"),u.uc(1,g,2,1,"td",6),u.Tb()),2&t){var n=e.$implicit;u.Db(1),u.ic("ngForOf",n)}}function w(t,e){if(1&t){var n=u.Vb();u.Ub(0,"div",3),u.Ub(1,"div",4),u.Ub(2,"span",5),u.bc("click",function(){return u.mc(n),u.dc().closeModal()}),u.vc(3,"\xd7"),u.Tb(),u.Ub(4,"h2"),u.vc(5),u.Tb(),u.Ub(6,"table"),u.Ub(7,"thead"),u.Ub(8,"tr"),u.uc(9,m,2,1,"th",6),u.Tb(),u.Tb(),u.Ub(10,"tbody"),u.uc(11,v,2,1,"tr",6),u.Tb(),u.Tb(),u.Tb(),u.Tb()}if(2&t){var o=u.dc();u.Db(5),u.wc(o.modalHeader),u.Db(4),u.ic("ngForOf",o.modalTableHeader),u.Db(2),u.ic("ngForOf",o.modalTableBody)}}var M,P,k,O=((P=function(){function t(){n(this,t),this.showPlayerStatsModal=!1}return r(t,[{key:"showModal",value:function(t){var e=this.statsForEachPlayer.get(t),n=e.values().next().value;this.buildModalHeader(n,t),this.buildModalTableHeader(n),this.buildModalTableBody(e),this.showPlayerStatsModal=!0}},{key:"closeModal",value:function(){this.showPlayerStatsModal=!1}},{key:"buildModalHeader",value:function(t,e){this.modalHeader="".concat(e," #").concat(t["#"])}},{key:"buildModalTableHeader",value:function(t){var e=this;this.modalTableHeader=["Season"],Object.keys(t).forEach(function(t){e.shouldIgnoreStatisticKey(t)||e.modalTableHeader.push(t)})}},{key:"buildModalTableBody",value:function(t){var e=this;this.modalTableBody=[],t.forEach(function(t,n){var o=[n];Object.keys(t).forEach(function(n){e.shouldIgnoreStatisticKey(n)||o.push(t[n])}),e.modalTableBody.push(o)})}},{key:"shouldIgnoreStatisticKey",value:function(t){return"Player"===t||"#"===t||!b.a["hitting-standard"].includes(t)}}]),t}()).\u0275fac=function(t){return new(t||P)},P.\u0275cmp=u.Ib({type:P,selectors:[["players-list"]],inputs:{statsForEachPlayer:"statsForEachPlayer"},decls:4,vars:4,consts:[[3,"click",4,"ngFor","ngForOf"],["class","modal",4,"ngIf"],[3,"click"],[1,"modal"],[1,"modal-content"],[1,"close",3,"click"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(u.Ub(0,"mat-list"),u.uc(1,y,2,1,"mat-list-item",0),u.ec(2,"sortMapByKeyAlphabeticallyPipe"),u.Tb(),u.uc(3,w,12,3,"div",1)),2&t&&(u.Db(1),u.ic("ngForOf",u.fc(2,2,e.statsForEachPlayer)),u.Db(2),u.ic("ngIf",e.showPlayerStatsModal))},directives:[f.a,h.j,h.k,f.b],pipes:[p],styles:[".mat-list-item[_ngcontent-%COMP%]{color:#010150;font-size:x-large}.mat-list-item[_ngcontent-%COMP%]:hover{text-decoration:underline}.modal[_ngcontent-%COMP%]{position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content[_ngcontent-%COMP%]{background-color:#fefefe;margin:15% auto;padding:20px;border:1px solid #888;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.close[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700}.close[_ngcontent-%COMP%]:focus, .close[_ngcontent-%COMP%]:hover{color:#000;text-decoration:none;cursor:pointer}table[_ngcontent-%COMP%]{border:3px solid #000;border-collapse:collapse;text-align:center;width:100%;overflow:hidden}th[_ngcontent-%COMP%]{border-bottom:2px solid #000;background-color:#d3d3d3;border-right:1px solid #000;height:50px;padding-left:.75rem;padding-right:.75rem}td[_ngcontent-%COMP%]{border:1px solid #000}"]}),P),T=((M=function(){function t(e){n(this,t),this.store=e,this.title="Saints Players"}return r(t,[{key:"ngOnInit",value:function(){this.errorMessage$=this.store.pipe(Object(s.q)(d.a)),this.statsForEachPlayer$=this.store.pipe(Object(s.q)(d.d))}}]),t}()).\u0275fac=function(t){return new(t||M)(u.Ob(s.h))},M.\u0275cmp=u.Ib({type:M,selectors:[["players-shell"]],decls:4,vars:4,consts:[[1,"w3-text-black"],[3,"statsForEachPlayer"]],template:function(t,e){1&t&&(u.Ub(0,"h1",0),u.vc(1),u.Tb(),u.Pb(2,"players-list",1),u.ec(3,"async")),2&t&&(u.Db(1),u.wc(e.title),u.Db(1),u.ic("statsForEachPlayer",u.fc(3,2,e.statsForEachPlayer$)))},directives:[O],pipes:[h.b],encapsulation:2,changeDetection:0}),M),x=a("hctd"),F=[{path:"",component:T}],S=((k=function t(){n(this,t)}).\u0275mod=u.Mb({type:k}),k.\u0275inj=u.Lb({factory:function(t){return new(t||k)},imports:[[l.a,c.b.forChild(F),x.a]]}),k)}}])}();