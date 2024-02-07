(()=>{"use strict";var e,t,r={352:(e,t,r)=>{var n=r(34);t.C=n.createRoot,n.hydrateRoot},556:(e,t,r)=>{var n=r(280),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=n.useSyncExternalStore,c=n.useRef,a=n.useEffect,s=n.useMemo,u=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,r,n,l){var f=c(null);if(null===f.current){var p={hasValue:!1,value:null};f.current=p}else p=f.current;f=s((function(){function e(e){if(!a){if(a=!0,i=e,e=n(e),void 0!==l&&p.hasValue){var t=p.value;if(l(t,e))return c=t}return c=e}if(t=c,o(i,e))return t;var r=n(e);return void 0!==l&&l(t,r)?t:(i=e,c=r)}var i,c,a=!1,s=void 0===r?null:r;return[function(){return e(t())},null===s?void 0:function(){return e(s())}]}),[t,r,n,l]);var d=i(e,f[0],f[1]);return a((function(){p.hasValue=!0,p.value=d}),[d]),u(d),d}},728:(e,t,r)=>{e.exports=r(556)},280:e=>{e.exports=window.React},34:e=>{e.exports=window.ReactDOM}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,o),i.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var i=Object.create(null);o.r(i);var c={};e=e||[null,t({}),t([]),t(t)];for(var a=2&n&&r;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>c[e]=()=>r[e]));return c.default=()=>r,o.d(i,c),i},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=o(280),t=o(352),r=o(728),n=e,i=Symbol.for("react-redux-context"),c="undefined"!=typeof globalThis?globalThis:{};function a(){if(!n.createContext)return{};const e=c[i]??(c[i]=new Map);let t=e.get(n.createContext);return t||(t=n.createContext(null),e.set(n.createContext,t)),t}var s=a();Symbol.for("react.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.server_context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.offscreen"),Symbol.for("react.client.reference");var u={notify(){},get:()=>[]};var l="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?n.useLayoutEffect:n.useEffect;Object.defineProperty,Object.getOwnPropertyNames,Object.getOwnPropertySymbols,Object.getOwnPropertyDescriptor,Object.getPrototypeOf,Object.prototype;function f(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}r.useSyncExternalStoreWithSelector,e.useSyncExternalStore;var p=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),d=()=>Math.random().toString(36).substring(7).split("").join("."),y={INIT:`@@redux/INIT${d()}`,REPLACE:`@@redux/REPLACE${d()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${d()}`};function h(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function m(e,t,r){if("function"!=typeof e)throw new Error(f(2));if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error(f(0));if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error(f(1));return r(m)(e,t)}let n=e,o=t,i=new Map,c=i,a=0,s=!1;function u(){c===i&&(c=new Map,i.forEach(((e,t)=>{c.set(t,e)})))}function l(){if(s)throw new Error(f(3));return o}function d(e){if("function"!=typeof e)throw new Error(f(4));if(s)throw new Error(f(5));let t=!0;u();const r=a++;return c.set(r,e),function(){if(t){if(s)throw new Error(f(6));t=!1,u(),c.delete(r),i=null}}}function b(e){if(!h(e))throw new Error(f(7));if(void 0===e.type)throw new Error(f(8));if("string"!=typeof e.type)throw new Error(f(17));if(s)throw new Error(f(9));try{s=!0,o=n(o,e)}finally{s=!1}return(i=c).forEach((e=>{e()})),e}return b({type:y.INIT}),{dispatch:b,subscribe:d,getState:l,replaceReducer:function(e){if("function"!=typeof e)throw new Error(f(10));n=e,b({type:y.REPLACE})},[p]:function(){const e=d;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(f(11));function r(){const e=t;e.next&&e.next(l())}return r(),{unsubscribe:e(r)}},[p](){return this}}}}}function b(e){const t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const o=t[n];"function"==typeof e[o]&&(r[o]=e[o])}const n=Object.keys(r);let o;try{!function(e){Object.keys(e).forEach((t=>{const r=e[t];if(void 0===r(void 0,{type:y.INIT}))throw new Error(f(12));if(void 0===r(void 0,{type:y.PROBE_UNKNOWN_ACTION()}))throw new Error(f(13))}))}(r)}catch(e){o=e}return function(e={},t){if(o)throw o;let i=!1;const c={};for(let o=0;o<n.length;o++){const a=n[o],s=r[a],u=e[a],l=s(u,t);if(void 0===l)throw t&&t.type,new Error(f(14));c[a]=l,i=i||l!==u}return i=i||n.length!==Object.keys(e).length,i?c:e}}function _(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce(((e,t)=>(...r)=>e(t(...r))))}var v=Symbol.for("immer-nothing"),w=Symbol.for("immer-draftable"),g=Symbol.for("immer-state");function E(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var S=Object.getPrototypeOf;function O(e){return!!e&&!!e[g]}function j(e){return!!e&&(P(e)||Array.isArray(e)||!!e[w]||!!e.constructor?.[w]||M(e)||R(e))}var N=Object.prototype.constructor.toString();function P(e){if(!e||"object"!=typeof e)return!1;const t=S(e);if(null===t)return!0;const r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===N}function x(e,t){0===k(e)?Object.entries(e).forEach((([r,n])=>{t(r,n,e)})):e.forEach(((r,n)=>t(n,r,e)))}function k(e){const t=e[g];return t?t.type_:Array.isArray(e)?1:M(e)?2:R(e)?3:0}function C(e,t){return 2===k(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function z(e,t,r){const n=k(e);2===n?e.set(t,r):3===n?e.add(r):e[t]=r}function M(e){return e instanceof Map}function R(e){return e instanceof Set}function A(e){return e.copy_||e.base_}function T(e,t){if(M(e))return new Map(e);if(R(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);if(!t&&P(e)){if(!S(e)){const t=Object.create(null);return Object.assign(t,e)}return{...e}}const r=Object.getOwnPropertyDescriptors(e);delete r[g];let n=Reflect.ownKeys(r);for(let t=0;t<n.length;t++){const o=n[t],i=r[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(r[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(S(e),r)}function D(e,t=!1){return I(e)||O(e)||!j(e)||(k(e)>1&&(e.set=e.add=e.clear=e.delete=F),Object.freeze(e),t&&x(e,((e,t)=>D(t,!0)))),e}function F(){E(2)}function I(e){return Object.isFrozen(e)}var $,L={};function W(e){const t=L[e];return t||E(0),t}function U(){return $}function B(e,t){t&&(W("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function X(e){K(e),e.drafts_.forEach(q),e.drafts_=null}function K(e){e===$&&($=e.parent_)}function V(e){return $={drafts_:[],parent_:$,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function q(e){const t=e[g];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function G(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];return void 0!==e&&e!==r?(r[g].modified_&&(X(t),E(4)),j(e)&&(e=H(t,e),t.parent_||Q(t,e)),t.patches_&&W("Patches").generateReplacementPatches_(r[g].base_,e,t.patches_,t.inversePatches_)):e=H(t,r,[]),X(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==v?e:void 0}function H(e,t,r){if(I(t))return t;const n=t[g];if(!n)return x(t,((o,i)=>J(e,n,t,o,i,r))),t;if(n.scope_!==e)return t;if(!n.modified_)return Q(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;const t=n.copy_;let o=t,i=!1;3===n.type_&&(o=new Set(t),t.clear(),i=!0),x(o,((o,c)=>J(e,n,t,o,c,r,i))),Q(e,t,!1),r&&e.patches_&&W("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function J(e,t,r,n,o,i,c){if(O(o)){const c=H(e,o,i&&t&&3!==t.type_&&!C(t.assigned_,n)?i.concat(n):void 0);if(z(r,n,c),!O(c))return;e.canAutoFreeze_=!1}else c&&r.add(o);if(j(o)&&!I(o)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;H(e,o),t&&t.scope_.parent_||Q(e,o)}}function Q(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&D(t,r)}var Y={get(e,t){if(t===g)return e;const r=A(e);if(!C(r,t))return function(e,t,r){const n=te(t,r);return n?"value"in n?n.value:n.get?.call(e.draft_):void 0}(e,r,t);const n=r[t];return e.finalized_||!j(n)?n:n===ee(e.base_,t)?(ne(e),e.copy_[t]=oe(n,e)):n},has:(e,t)=>t in A(e),ownKeys:e=>Reflect.ownKeys(A(e)),set(e,t,r){const n=te(A(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const n=ee(A(e),t),c=n?.[g];if(c&&c.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(((o=r)===(i=n)?0!==o||1/o==1/i:o!=o&&i!=i)&&(void 0!==r||C(e.base_,t)))return!0;ne(e),re(e)}var o,i;return e.copy_[t]===r&&(void 0!==r||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty:(e,t)=>(void 0!==ee(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,ne(e),re(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){const r=A(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty(){E(11)},getPrototypeOf:e=>S(e.base_),setPrototypeOf(){E(12)}},Z={};function ee(e,t){const r=e[g];return(r?A(r):e)[t]}function te(e,t){if(!(t in e))return;let r=S(e);for(;r;){const e=Object.getOwnPropertyDescriptor(r,t);if(e)return e;r=S(r)}}function re(e){e.modified_||(e.modified_=!0,e.parent_&&re(e.parent_))}function ne(e){e.copy_||(e.copy_=T(e.base_,e.scope_.immer_.useStrictShallowCopy_))}function oe(e,t){const r=M(e)?W("MapSet").proxyMap_(e,t):R(e)?W("MapSet").proxySet_(e,t):function(e,t){const r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:U(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=n,i=Y;r&&(o=[n],i=Z);const{revoke:c,proxy:a}=Proxy.revocable(o,i);return n.draft_=a,n.revoke_=c,a}(e,t);return(t?t.scope_:U()).drafts_.push(r),r}function ie(e){return O(e)||E(10),ce(e)}function ce(e){if(!j(e)||I(e))return e;const t=e[g];let r;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=T(e,t.scope_.immer_.useStrictShallowCopy_)}else r=T(e,!0);return x(r,((e,t)=>{z(r,e,ce(t))})),t&&(t.finalized_=!1),r}x(Y,((e,t)=>{Z[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Z.deleteProperty=function(e,t){return Z.set.call(this,e,t,void 0)},Z.set=function(e,t,r){return Y.set.call(this,e[0],t,r,e[0])};var ae=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,r)=>{if("function"==typeof e&&"function"!=typeof t){const r=t;t=e;const n=this;return function(e=r,...o){return n.produce(e,(e=>t.call(this,e,...o)))}}let n;if("function"!=typeof t&&E(6),void 0!==r&&"function"!=typeof r&&E(7),j(e)){const o=V(this),i=oe(e,void 0);let c=!0;try{n=t(i),c=!1}finally{c?X(o):K(o)}return B(o,r),G(n,o)}if(!e||"object"!=typeof e){if(n=t(e),void 0===n&&(n=e),n===v&&(n=void 0),this.autoFreeze_&&D(n,!0),r){const t=[],o=[];W("Patches").generateReplacementPatches_(e,n,t,o),r(t,o)}return n}E(1)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...r)=>this.produceWithPatches(t,(t=>e(t,...r)));let r,n;return[this.produce(e,t,((e,t)=>{r=e,n=t})),r,n]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){j(e)||E(8),O(e)&&(e=ie(e));const t=V(this),r=oe(e,void 0);return r[g].isManual_=!0,K(t),r}finishDraft(e,t){const r=e&&e[g];r&&r.isManual_||E(9);const{scope_:n}=r;return B(n,t),G(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}r>-1&&(t=t.slice(r+1));const n=W("Patches").applyPatches_;return O(e)?n(e,t):this.produce(e,(e=>n(e,t)))}};ae.produce;ae.produceWithPatches.bind(ae),ae.setAutoFreeze.bind(ae),ae.setUseStrictShallowCopy.bind(ae),ae.applyPatches.bind(ae),ae.createDraft.bind(ae),ae.finishDraft.bind(ae);var se=e=>Array.isArray(e)?e:[e];Symbol(),Object.getPrototypeOf({});var ue="undefined"!=typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}},le=0,fe=1;function pe(){return{s:le,v:void 0,o:null,p:null}}function de(e,t={}){let r=pe();const{resultEqualityCheck:n}=t;let o,i=0;function c(){let t=r;const{length:c}=arguments;for(let e=0,r=c;e<r;e++){const r=arguments[e];if("function"==typeof r||"object"==typeof r&&null!==r){let e=t.o;null===e&&(t.o=e=new WeakMap);const n=e.get(r);void 0===n?(t=pe(),e.set(r,t)):t=n}else{let e=t.p;null===e&&(t.p=e=new Map);const n=e.get(r);void 0===n?(t=pe(),e.set(r,t)):t=n}}const a=t;let s;if(t.s===fe?s=t.v:(s=e.apply(null,arguments),i++),a.s=fe,n){const e=o?.deref?.()??o;null!=e&&n(e,s)&&(s=e,0!==i&&i--),o="object"==typeof s&&null!==s||"function"==typeof s?new ue(s):s}return a.v=s,s}return c.clearCache=()=>{r=pe(),c.resetResultsCount()},c.resultsCount=()=>i,c.resetResultsCount=()=>{i=0},c}function ye(e,...t){const r="function"==typeof e?{memoize:e,memoizeOptions:t}:e,n=(...e)=>{let t,n=0,o=0,i={},c=e.pop();"object"==typeof c&&(i=c,c=e.pop()),function(e,t="expected a function, instead received "+typeof e){if("function"!=typeof e)throw new TypeError(t)}(c,`createSelector expects an output function after the inputs, but received: [${typeof c}]`);const a={...r,...i},{memoize:s,memoizeOptions:u=[],argsMemoize:l=de,argsMemoizeOptions:f=[],devModeChecks:p={}}=a,d=se(u),y=se(f),h=function(e){const t=Array.isArray(e[0])?e[0]:e;return function(e,t="expected all items to be functions, instead received the following types: "){if(!e.every((e=>"function"==typeof e))){const r=e.map((e=>"function"==typeof e?`function ${e.name||"unnamed"}()`:typeof e)).join(", ");throw new TypeError(`${t}[${r}]`)}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}(e),m=s((function(){return n++,c.apply(null,arguments)}),...d),b=l((function(){o++;const e=function(e,t){const r=[],{length:n}=e;for(let o=0;o<n;o++)r.push(e[o].apply(null,t));return r}(h,arguments);return t=m.apply(null,e),t}),...y);return Object.assign(b,{resultFunc:c,memoizedResultFunc:m,dependencies:h,dependencyRecomputations:()=>o,resetDependencyRecomputations:()=>{o=0},lastResult:()=>t,recomputations:()=>n,resetRecomputations:()=>{n=0},memoize:s,argsMemoize:l})};return Object.assign(n,{withTypes:()=>n}),n}var he=ye(de),me=Object.assign(((e,t=he)=>{!function(e,t="expected an object, instead received "+typeof e){if("object"!=typeof e)throw new TypeError(t)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);const r=Object.keys(e);return t(r.map((t=>e[t])),((...e)=>e.reduce(((e,t,n)=>(e[r[n]]=t,e)),{})))}),{withTypes:()=>me});function be(e){return({dispatch:t,getState:r})=>n=>o=>"function"==typeof o?o(t,r,e):n(o)}var _e=be(),ve=be,we=(((...e)=>{const t=ye(...e),r=Object.assign(((...e)=>{const r=t(...e),n=(e,...t)=>r(O(e)?ie(e):e,...t);return Object.assign(n,r),n}),{withTypes:()=>r})})(de),"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?_:_.apply(null,arguments)});function ge(e,t){function r(...r){if(t){let n=t(...r);if(!n)throw new Error(Me(0));return{type:e,payload:n.payload,..."meta"in n&&{meta:n.meta},..."error"in n&&{error:n.error}}}return{type:e,payload:r[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=t=>function(e){return h(e)&&"type"in e&&"string"==typeof e.type}(t)&&t.type===e,r}"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;var Ee=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};var Se=e=>t=>{setTimeout(t,e)},Oe="undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:Se(10);var je=(e=21)=>{let t="",r=e;for(;r--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t};Symbol.for("rtk-slice-createasyncthunk");var{assign:Ne}=Object,Pe="listenerMiddleware",xe=e=>{let{type:t,actionCreator:r,matcher:n,predicate:o,effect:i}=e;if(t)o=ge(t).match;else if(r)t=r.type,o=r.match;else if(n)o=n;else if(!o)throw new Error(Me(21));return((e,t)=>{if("function"!=typeof e)throw new Error(Me(32))})(i),{predicate:o,type:t,effect:i}},ke=Object.assign((e=>{const{type:t,predicate:r,effect:n}=xe(e);return{id:je(),effect:n,type:t,predicate:r,pending:new Set,unsubscribe:()=>{throw new Error(Me(22))}}}),{withTypes:()=>ke}),Ce=Object.assign(ge(`${Pe}/add`),{withTypes:()=>Ce}),ze=(ge(`${Pe}/removeAll`),Object.assign(ge(`${Pe}/remove`),{withTypes:()=>ze}));function Me(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}Symbol.for("rtk-state-proxy-original");const Re=function(e){const t=function(e){const{thunk:t=!0,immutableCheck:r=!0,serializableCheck:n=!0,actionCreatorCheck:o=!0}=e??{};let i=new Ee;return t&&("boolean"==typeof t?i.push(_e):i.push(ve(t.extraArgument))),i},{reducer:r,middleware:n,devTools:o=!0,preloadedState:i,enhancers:c}=e||{};let a,s;if("function"==typeof r)a=r;else{if(!h(r))throw new Error(Me(1));a=b(r)}s="function"==typeof n?n(t):t();let u=_;o&&(u=we({trace:!1,..."object"==typeof o&&o}));const l=function(...e){return t=>(r,n)=>{const o=t(r,n);let i=()=>{throw new Error(f(15))};const c={getState:o.getState,dispatch:(e,...t)=>i(e,...t)},a=e.map((e=>e(c)));return i=_(...a)(o.dispatch),{...o,dispatch:i}}}(...s),p=(e=>function(t){const{autoBatch:r=!0}=t??{};let n=new Ee(e);return r&&n.push(((e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let o=!0,i=!1,c=!1;const a=new Set,s="tick"===e.type?queueMicrotask:"raf"===e.type?Oe:"callback"===e.type?e.queueNotification:Se(e.timeout),u=()=>{c=!1,i&&(i=!1,a.forEach((e=>e())))};return Object.assign({},n,{subscribe(e){const t=n.subscribe((()=>o&&e()));return a.add(e),()=>{t(),a.delete(e)}},dispatch(e){try{return o=!e?.meta?.RTK_autoBatch,i=!o,i&&(c||(c=!0,s(u))),n.dispatch(e)}finally{o=!0}}})})("object"==typeof r?r:void 0)),n})(l);return m(a,i,u(..."function"==typeof c?c(p):p()))}({reducer:b({})}),Ae=({label:t,children:r})=>(0,e.createElement)("div",{className:"fggc-field-wrapper uk-margin-bottom"},(0,e.createElement)("label",{className:"fggc-field-label uk-form-label uk-text-bold"},t),(0,e.createElement)("div",{className:"fggc-field uk-form-controls"},r)),Te=({label:t,fieldName:r,options:n})=>(0,e.createElement)(Ae,{label:t},(0,e.createElement)("select",{name:r,className:"uk-select"},n.map((t=>(0,e.createElement)("option",{key:t.value,value:t.value},t.name))))),De=({label:t,fieldName:r,options:n})=>(0,e.createElement)(Ae,{label:t},n.map((t=>(0,e.createElement)("div",{key:t.value},(0,e.createElement)("label",null,(0,e.createElement)("input",{className:"uk-radio",type:"radio",name:r,value:t.value})," ",t.name),(0,e.createElement)("br",null))))),Fe=({title:t,children:r})=>(0,e.createElement)("div",{className:"fggc-form__section uk-margin-top"},(0,e.createElement)("h2",null,t),(0,e.createElement)("div",{className:"uk-grid uk-grid-collapse"},r)),Ie=({title:t,width:r,children:n})=>(0,e.createElement)("div",{className:`fggc-form__group ${r}`},t&&(0,e.createElement)("h3",{className:"uk-h5 fggc-form__group__title"},t),(0,e.createElement)("div",{className:"uk-form-horizontal fggc-form__group__content"},n)),$e=({})=>{let t=[{name:"Orpheus",value:"orpheus"},{name:"Orpheus1",value:"orpheus1"}];return(0,e.createElement)("div",{className:"fggc-form"},(0,e.createElement)(Fe,{title:"Choose your guitar"},(0,e.createElement)(Ie,{width:"uk-width-1-2@s"},(0,e.createElement)(Te,{label:"Model",fieldName:"model",options:t}),(0,e.createElement)(De,{label:"Left or Right handed",fieldName:"orientation",options:t}))),(0,e.createElement)(Fe,{title:"Make your choices"},(0,e.createElement)(Ie,{title:"Body",width:"uk-width-1-3@s"},(0,e.createElement)(Te,{label:"Model",fieldName:"model",options:t}),(0,e.createElement)(De,{label:"Left or Right handed",fieldName:"orientation",options:t})),(0,e.createElement)(Ie,{title:"Body",width:"uk-width-1-3@s"},(0,e.createElement)(Te,{label:"Model",fieldName:"model",options:t}),(0,e.createElement)(De,{label:"Left or Right handed",fieldName:"orientation",options:t})),(0,e.createElement)(Ie,{title:"Body",width:"uk-width-1-3@s"},(0,e.createElement)(Te,{label:"Model",fieldName:"model",options:t}),(0,e.createElement)(De,{label:"Left or Right handed",fieldName:"orientation",options:t}))))},Le=document.getElementById("app");(0,t.C)(Le).render((0,e.createElement)((function({store:e,context:t,children:r,serverState:o,stabilityCheck:i="once",identityFunctionCheck:c="once"}){const a=n.useMemo((()=>{const t=function(e,t){let r,n=u,o=0,i=!1;function c(){l.onStateChange&&l.onStateChange()}function a(){o++,r||(r=t?t.addNestedSub(c):e.subscribe(c),n=function(){let e=null,t=null;return{clear(){e=null,t=null},notify(){(()=>{let t=e;for(;t;)t.callback(),t=t.next})()},get(){const t=[];let r=e;for(;r;)t.push(r),r=r.next;return t},subscribe(r){let n=!0;const o=t={callback:r,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){n&&null!==e&&(n=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}())}function s(){o--,r&&0===o&&(r(),r=void 0,n.clear(),n=u)}const l={addNestedSub:function(e){a();const t=n.subscribe(e);let r=!1;return()=>{r||(r=!0,t(),s())}},notifyNestedSubs:function(){n.notify()},handleChangeWrapper:c,isSubscribed:function(){return i},trySubscribe:function(){i||(i=!0,a())},tryUnsubscribe:function(){i&&(i=!1,s())},getListeners:()=>n};return l}(e);return{store:e,subscription:t,getServerState:o?()=>o:void 0,stabilityCheck:i,identityFunctionCheck:c}}),[e,o,i,c]),f=n.useMemo((()=>e.getState()),[e]);l((()=>{const{subscription:t}=a;return t.onStateChange=t.notifyNestedSubs,t.trySubscribe(),f!==e.getState()&&t.notifyNestedSubs(),()=>{t.tryUnsubscribe(),t.onStateChange=void 0}}),[a,f]);const p=t||s;return n.createElement(p.Provider,{value:a},r)}),{store:Re},(0,e.createElement)((()=>(0,e.createElement)("div",{className:"fggc-app"},(0,e.createElement)($e,null))),null)))})()})();