(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{3454:function(d,e,a){"use strict";var b,c;d.exports=(null==(b=a.g.process)?void 0:b.env)&&"object"==typeof(null==(c=a.g.process)?void 0:c.env)?a.g.process:a(7663)},8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(441)}])},3174:function(d,b,a){"use strict";var e=a(603),f=a(5893),g=a(7294),c=a(2470),h=a.n(c);b.Z=function(a){var b=(0,e.Z)(g.useState(a.default),2),i=b[0],l=b[1],c=(0,e.Z)(g.useState(null),2),d=c[0],m=c[1];g.useEffect(function(){a.onChange&&a.onChange(a.default)},[]);var j=g.useRef(null),k=function(f){m(null);var b=Number.parseFloat(f.target.value);if(isNaN(b)){l("custom");var d=j.current;if(null===d)return;var c=d.valueAsNumber;isNaN(c)&&m("Not a Number");var e=a.validator(c);null!==e?(m(e),a.onChange&&a.onChange(null)):a.onChange&&a.onChange(c)}else l(b),a.onChange&&a.onChange(b)};return(0,f.jsxs)("div",{className:h().container,children:[(0,f.jsx)("div",{className:h().paramName,children:a.name}),a.presets.map(function(g){var c=(0,e.Z)(g,2),b=c[0],d=c[1];return(0,f.jsxs)("div",{children:[(0,f.jsx)("input",{type:"radio",name:a.name,value:d,checked:i===d,id:b,onChange:k}),(0,f.jsx)("label",{htmlFor:b,children:b})]},b)}),(0,f.jsxs)("div",{className:h().customInputContainer,children:[(0,f.jsx)("input",{type:"radio",name:a.name,value:"custom",id:"custom",checked:"custom"===i,onChange:k}),(0,f.jsx)("input",{type:"number",name:"custom-value",id:"custom-value",className:h().customValueInput,onChange:function(d){m(null),l("custom");var b=d.target.valueAsNumber,c=a.validator(b);null!==c?(m(c),a.onChange&&a.onChange(null)):a.onChange&&a.onChange(b)},ref:j})]}),d&&(0,f.jsx)("div",{children:d})]})}},9536:function(a,c,b){"use strict";b.a(a,async function(h,f){try{b.d(c,{"B$":function(){return S},Bf:function(){return N},Dz:function(){return W},FR:function(){return K},Ih:function(){return H},Kp:function(){return O},Or:function(){return $},RA:function(){return L},S1:function(){return A},XE:function(){return U},Xn:function(){return F},bx:function(){return T},dF:function(){return D},fY:function(){return Z},gB:function(){return P},gk:function(){return J},jn:function(){return R},pR:function(){return Y},q1:function(){return Q},rB:function(){return M},ug:function(){return G},vm:function(){return X},xO:function(){return V},yS:function(){return C},yq:function(){return I}});var i,j,k,o=b(2670),p=b(2222),d=b(7887);a=b.hmd(a);var e=h([d]);d=(e.then?(await e)():e)[0];var g=Array(32).fill(void 0);function q(a){return g[a]}g.push(void 0,null,!0,!1);var r=g.length;function s(b){var a,c=q(b);return(a=b)<36||(g[a]=r,r=a),c}function t(a){var c,b=void 0===a?"undefined":(0,p.Z)(a);if("number"==b||"boolean"==b||null==a)return"".concat(a);if("string"==b)return'"'.concat(a,'"');if("symbol"==b){var g=a.description;return null==g?"Symbol":"Symbol(".concat(g,")")}if("function"==b){var d=a.name;return"string"==typeof d&&d.length>0?"Function(".concat(d,")"):"Function"}if(Array.isArray(a)){var h=a.length,e="[";h>0&&(e+=t(a[0]));for(var f=1;f<h;f++)e+=", "+t(a[f]);return e+="]"}var i=/\[object ([^\]]+)\]/.exec(toString.call(a));if(!(i.length>1))return toString.call(a);if(c=i[1],"Object"==c)try{return"Object("+JSON.stringify(a)+")"}catch(j){return"Object"}return(0,o.Z)(a,Error)?"".concat(a.name,": ").concat(a.message,"\n").concat(a.stack):c}var u=0;function v(){return 0===i.byteLength&&(i=new Uint8Array(d.memory.buffer)),i}var l=new("undefined"==typeof TextEncoder?(0,a.require)("util").TextEncoder:TextEncoder)("utf-8"),w="function"==typeof l.encodeInto?function(a,b){return l.encodeInto(a,b)}:function(a,c){var b=l.encode(a);return c.set(b),{read:a.length,written:b.length}};function x(b,g,h){if(void 0===h){var e=l.encode(b),f=g(e.length);return v().subarray(f,f+e.length).set(e),u=e.length,f}for(var c=b.length,d=g(c),j=v(),a=0;a<c;a++){var i=b.charCodeAt(a);if(i>127)break;j[d+a]=i}if(a!==c){0!==a&&(b=b.slice(a)),d=h(d,c,c=a+3*b.length);var k=v().subarray(d+a,d+c),m=w(b,k);a+=m.written}return u=a,d}function y(){return 0===j.byteLength&&(j=new Int32Array(d.memory.buffer)),j}var m=new("undefined"==typeof TextDecoder?(0,a.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});function z(a,b){return m.decode(v().subarray(a,a+b))}function A(){d.init()}function B(b){r===g.length&&g.push(g.length+1);var a=r;return r=g[a],g[a]=b,a}function C(f,g,h,i){try{var c,a=d.__wbindgen_add_to_stack_pointer(-16);d.drawAsciiArtFromImage(a,B(f),B(g),B(h),i);var b=y()[a/4+0],e=y()[a/4+1],j=y()[a/4+2],k=y()[a/4+3];if(k)throw s(j);return 0!==b&&(c=z(b,e).slice(),d.__wbindgen_free(b,1*e)),c}finally{d.__wbindgen_add_to_stack_pointer(16)}}function D(f,g,h,i){try{var c,a=d.__wbindgen_add_to_stack_pointer(-16);d.drawAsciiArtFromVideo(a,B(f),B(g),B(h),i);var b=y()[a/4+0],e=y()[a/4+1],j=y()[a/4+2],k=y()[a/4+3];if(k)throw s(j);return 0!==b&&(c=z(b,e).slice(),d.__wbindgen_free(b,1*e)),c}finally{d.__wbindgen_add_to_stack_pointer(16)}}function E(a,b){try{return a.apply(this,b)}catch(c){d.__wbindgen_exn_store(B(c))}}function F(a,b){console.log(z(a,b))}function G(a){s(a)}function H(){var a=Error();return B(a)}function I(a,b){var c=q(b).stack,e=x(c,d.__wbindgen_malloc,d.__wbindgen_realloc),f=u;y()[a/4+1]=f,y()[a/4+0]=e}function J(a,b){try{console.error(z(a,b))}finally{d.__wbindgen_free(a,b)}}function K(a,b){q(a).width=b>>>0}function L(a,b){q(a).height=b>>>0}function M(){return E(function(b,c,d){var e,a=q(b).getContext(z(c,d));return null==(e=a)?0:B(a)},arguments)}function N(c,e){var a,f,b,g=(a=q(e).data,b=(f=d.__wbindgen_malloc)(1*a.length),v().set(a,b/1),u=a.length,b),h=u;y()[c/4+1]=h,y()[c/4+0]=g}function O(){return E(function(c,e,f){var a,b,g=new ImageData((a=c,b=e,(0===k.byteLength&&(k=new Uint8ClampedArray(d.memory.buffer)),k).subarray(a/1,a/1+b)),f>>>0);return B(g)},arguments)}function P(a){return q(a).videoWidth}function Q(a){return q(a).videoHeight}function R(a){return(0,o.Z)(q(a),CanvasRenderingContext2D)}function S(a,b){q(a).imageSmoothingEnabled=0!==b}function T(){return E(function(a,b,c,d,e,f){q(a).drawImage(q(b),c,d,e,f)},arguments)}function U(){return E(function(a,b,c,d,e,f){q(a).drawImage(q(b),c,d,e,f)},arguments)}function V(){return E(function(a,b,c,d,e){var f=q(a).getImageData(b,c,d,e);return B(f)},arguments)}function W(){return E(function(a,b,c,d){q(a).putImageData(q(b),c,d)},arguments)}function X(a){return q(a).width}function Y(a){return q(a).height}function Z(a,b){var c=t(q(b)),e=x(c,d.__wbindgen_malloc,d.__wbindgen_realloc),f=u;y()[a/4+1]=f,y()[a/4+0]=e}function $(a,b){throw Error(z(a,b))}m.decode(),j=new Int32Array(d.memory.buffer),i=new Uint8Array(d.memory.buffer),k=new Uint8ClampedArray(d.memory.buffer),f()}catch(n){f(n)}})},441:function(a,c,b){"use strict";b.a(a,async function(f,d){try{b.r(c);var l=b(7568),m=b(2670),n=b(603),g=b(4051),o=b.n(g),p=b(5893),h=b(9008),q=b.n(h),i=b(6134),r=b.n(i),s=b(7294),e=b(9536),t=b(3174),u=b(3991),v=b(3454),a=f([e]);function w(b){var a;return new Promise((a=(0,l.Z)(o().mark(function a(c,d){var e,f,g;return o().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=new u.$,a.next=3,e.readAsDataURL(b);case 3:if(f=a.sent){a.next=6;break}return a.abrupt("return",d("Failed to create data url from the passed file"));case 6:return g=new u.E,a.prev=7,a.next=10,g.loadDataUrl(f.toString());case 10:c(g.element),a.next=16;break;case 13:a.prev=13,a.t0=a.catch(7),d("Invalid image");case 16:case"end":return a.stop()}},a,null,[[7,13]])})),function(b,c){return a.apply(this,arguments)}))}e=(a.then?(await a)():a)[0];var j=function(){s.useEffect(function(){e.S1()},[]);var k,a=(0,n.Z)(s.useState(null),2),b=a[0],E=a[1],c=(0,n.Z)(s.useState(null),2),d=c[0],F=c[1],f=(0,n.Z)(s.useState(null),2),g=f[0],G=f[1],h=(0,n.Z)(s.useState(null),2),H=h[0],u=h[1],i=(0,n.Z)(s.useState(null),2),I=i[0],x=i[1],y=s.useRef(null),z=s.useRef(null),A=s.useRef(null),B=s.useRef(null),C=s.useRef(null),j=(k=(0,l.Z)(o().mark(function a(){var b,c,d,f,g,h,i,j,k;return o().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(null!==H){a.next=2;break}return a.abrupt("return");case 2:if(null!==I){a.next=4;break}return a.abrupt("return");case 4:if(b=y.current,null!==b){a.next=7;break}return a.abrupt("return");case 7:if(c=b.files,null!==c){a.next=10;break}return a.abrupt("return");case 10:if(0!==c.length){a.next=12;break}return a.abrupt("return");case 12:if(d=c[0],F(null),G(null),E(null),!d.type.startsWith("image")){a.next=35;break}return f=URL.createObjectURL(d),F(f),a.prev=20,a.next=23,w(d);case 23:g=a.sent,a.next=30;break;case 26:return a.prev=26,a.t0=a.catch(20),E(a.t0),a.abrupt("return");case 30:h=z.current,i=A.current,h&&i&&(j=e.yS(g,h,i,H))&&E(j),a.next=36;break;case 35:d.type.startsWith("video")&&(k=URL.createObjectURL(d),G(k));case 36:case"end":return a.stop()}},a,null,[[20,26]])})),function(){return k.apply(this,arguments)}),D=function(){if(null!==H&&null!==I){var a=C.current;if(null!==a&&!a.paused&&!a.ended){var b=z.current,c=A.current;if(b&&c)try{var d=e.dF(a,b,c,H);d&&E(d)}catch(f){(0,m.Z)(f,DOMException)||console.error(f)}setTimeout(function(){D()},1e3/I)}}};return(0,p.jsxs)("div",{className:r().container,children:[(0,p.jsxs)(q(),{children:[(0,p.jsx)("title",{children:"Ascii Image Generator"}),(0,p.jsx)("meta",{name:"description",content:"Image \u2192 ASCII Characters"}),(0,p.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"".concat(v.env.BASE_PATH||"","/apple-touch-icon.png")}),(0,p.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"".concat(v.env.BASE_PATH||"","/favicon-32x32.png")}),(0,p.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"".concat(v.env.BASE_PATH||"","/favicon-16x16.png")}),(0,p.jsx)("link",{rel:"manifest",href:"".concat(v.env.BASE_PATH||"","/site.webmanifest")})]}),(0,p.jsxs)("main",{className:r().main,children:[(0,p.jsx)("h1",{children:"ASCII Image Generator"}),(0,p.jsxs)("div",{className:r().paramConfigs,children:[(0,p.jsx)(t.Z,{name:"Max Output Size",default:600,presets:[["600",600],["1024",1024],["1920",1920],],validator:function(a){return a<=0?"Output size must be greater than 0":null},onChange:u}),(0,p.jsx)(t.Z,{name:"Frame Rate",default:24,presets:[["10Hz",10],["24Hz",24],["60Hz",60],],validator:function(a){return a<=0?"Frame rate must be greater than 0":null},onChange:x})]}),(0,p.jsx)("canvas",{className:r().inputCanvas,ref:z}),(0,p.jsx)("canvas",{className:r().outputCanvas,ref:A}),b&&(0,p.jsx)("p",{className:r().error,children:b}),(0,p.jsx)("button",{onClick:j,children:"Regenerate"}),(0,p.jsxs)("div",{className:r().previewContainer,children:[(0,p.jsx)("div",{className:r().previewContainerTitle,children:"Preview"}),d&&(0,p.jsx)("img",{className:r().preview,src:d,ref:B}),g&&(0,p.jsx)("video",{className:r().preview,autoPlay:!0,controls:!0,onPlay:D,src:g,ref:C})]}),(0,p.jsx)("input",{type:"file",name:"file-input",accept:"image/*,video/*",ref:y,onChange:j})]})]})};c.default=j,d()}catch(k){d(k)}})},3991:function(c,a,b){"use strict";function d(a,b){if(!(a instanceof b))throw TypeError("Cannot call a class as a function")}b.d(a,{"$":function(){return e},E:function(){return f}});var e=function(){function a(){d(this,a),this.fileReader=new FileReader}return a.prototype.readAsDataURL=function(a){var b=this;return new Promise(function(c,d){b.fileReader.addEventListener("loadend",function(b){var a=b.target;return c(null==a?void 0:a.result)}),b.fileReader.addEventListener("error",function(b){var a=b.target;return d(null==a?void 0:a.error)}),b.fileReader.readAsDataURL(a)})},a}(),f=function(){function a(){d(this,a),this.element=new Image}return a.prototype.loadDataUrl=function(a){var b=this;return new Promise(function(c,d){b.element.addEventListener("load",function(){c()}),b.element.addEventListener("error",function(a){d(a)}),b.element.src=a})},a}()},6134:function(a){a.exports={container:"Home_container__Ennsq",main:"Home_main__EtNt2",footer:"Home_footer__7dKhS",title:"Home_title__FX7xZ",description:"Home_description__Qwq1f",code:"Home_code__aGV0U",grid:"Home_grid__c_g6N",card:"Home_card__7oz7W",logo:"Home_logo__80mSr",inputCanvas:"Home_inputCanvas__PQk9G",outputCanvas:"Home_outputCanvas___F9hr",asciiImageContainer:"Home_asciiImageContainer__4Wdwz",paramConfigs:"Home_paramConfigs__ccLxO",fileInput:"Home_fileInput__mZZMh",preview:"Home_preview__bCxO_",previewContainer:"Home_previewContainer__l8nIv",previewContainerTitle:"Home_previewContainerTitle__qioV2"}},2470:function(a){a.exports={customInputContainer:"ParamConfigurator_customInputContainer__cJ9eK",customValueInput:"ParamConfigurator_customValueInput__kCq13",paramName:"ParamConfigurator_paramName__DOzlR"}},7663:function(a){!function(){var d={308:function(c){var e,f,g,a=c.exports={};function h(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function j(a){if(e===setTimeout)return setTimeout(a,0);if((e===h||!e)&&setTimeout)return e=setTimeout,setTimeout(a,0);try{return e(a,0)}catch(b){try{return e.call(null,a,0)}catch(c){return e.call(this,a,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:h}catch(a){e=h}try{f="function"==typeof clearTimeout?clearTimeout:i}catch(b){f=i}}();var k=[],l=!1,m=-1;function n(){l&&g&&(l=!1,g.length?k=g.concat(k):m=-1,k.length&&o())}function o(){if(!l){var b=j(n);l=!0;for(var a=k.length;a;){for(g=k,k=[];++m<a;)g&&g[m].run();m=-1,a=k.length}g=null,l=!1,function(a){if(f===clearTimeout)return clearTimeout(a);if((f===i||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(a);try{f(a)}catch(b){try{return f.call(null,a)}catch(c){return f.call(this,a)}}}(b)}}function d(a,b){this.fun=a,this.array=b}function b(){}a.nextTick=function(c){var b=Array(arguments.length-1);if(arguments.length>1)for(var a=1;a<arguments.length;a++)b[a-1]=arguments[a];k.push(new d(c,b)),1!==k.length||l||j(o)},d.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=b,a.addListener=b,a.once=b,a.off=b,a.removeListener=b,a.removeAllListeners=b,a.emit=b,a.prependListener=b,a.prependOnceListener=b,a.listeners=function(a){return[]},a.binding=function(a){throw Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(a){throw Error("process.chdir is not supported")},a.umask=function(){return 0}}},e={};function b(a){var f=e[a];if(void 0!==f)return f.exports;var c=e[a]={exports:{}},g=!0;try{d[a](c,c.exports,b),g=!1}finally{g&&delete e[a]}return c.exports}b.ab="//";var c=b(308);a.exports=c}()},9008:function(a,c,b){a.exports=b(5443)},7568:function(c,a,b){"use strict";function d(c,d,e,f,g,h,i){try{var a=c[h](i),b=a.value}catch(j){e(j);return}a.done?d(b):Promise.resolve(b).then(f,g)}function e(a){return function(){var b=this,c=arguments;return new Promise(function(f,g){var h=a.apply(b,c);function e(a){d(h,f,g,e,i,"next",a)}function i(a){d(h,f,g,e,i,"throw",a)}e(void 0)})}}b.d(a,{Z:function(){return e}})},2670:function(c,a,b){"use strict";function d(b,a){return null!=a&&"undefined"!=typeof Symbol&&a[Symbol.hasInstance]?!!a[Symbol.hasInstance](b):b instanceof a}b.d(a,{Z:function(){return d}})},603:function(c,a,b){"use strict";function d(c,a){(null==a||a>c.length)&&(a=c.length);for(var b=0,d=Array(a);b<a;b++)d[b]=c[b];return d}function e(a,b){return function(a){if(Array.isArray(a))return a}(a)||function(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}(a,b)||function(a,c){if(a){if("string"==typeof a)return d(a,c);var b=Object.prototype.toString.call(a).slice(8,-1);if("Object"===b&&a.constructor&&(b=a.constructor.name),"Map"===b||"Set"===b)return Array.from(b);if("Arguments"===b||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b))return d(a,c)}}(a,b)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}b.d(a,{Z:function(){return e}})},2222:function(c,a,b){"use strict";function d(a){return a&&a.constructor===Symbol?"symbol":typeof a}b.d(a,{Z:function(){return d}})},7887:function(a,c,b){"use strict";b.a(a,async function(g,f){try{var d=b(9536),e=g([d]),[d]=e.then?(await e)():e;await b.v(c,a.id,"b5bc1560223a207e",{"./ascii_image_bg.js":{"__wbg_log_99e7a041de2f27aa":d.Xn,"__wbindgen_object_drop_ref":d.ug,"__wbg_new_693216e109162396":d.Ih,"__wbg_stack_0ddaca5d1abfb52f":d.yq,"__wbg_error_09919627ac0992f5":d.gk,"__wbg_setwidth_59ddc312219f205b":d.FR,"__wbg_setheight_70833966b4ed584e":d.RA,"__wbg_getContext_b506f48cb166bf26":d.rB,"__wbg_data_798d534e165849ee":d.Bf,"__wbg_newwithu8clampedarray_9c1ae19e8e194f7c":d.Kp,"__wbg_videoWidth_9e6a6bb55214f1b2":d.gB,"__wbg_videoHeight_ab0933a1a4623b5d":d.q1,"__wbg_instanceof_CanvasRenderingContext2d_9037c3eea625e27b":d.jn,"__wbg_setimageSmoothingEnabled_3dbb2403930baf85":d.B$,"__wbg_drawImage_565b9cb9006e09aa":d.bx,"__wbg_drawImage_146adeabdd845320":d.XE,"__wbg_getImageData_50f6c1b814306c32":d.xO,"__wbg_putImageData_f71b039a7f3a0d8a":d.Dz,"__wbg_width_b3baef9029f2d68b":d.vm,"__wbg_height_49e8ad5f84fefbd1":d.pR,"__wbindgen_debug_string":d.fY,"__wbindgen_throw":d.Or}}),f()}catch(h){f(h)}},1)}},function(a){a.O(0,[774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])