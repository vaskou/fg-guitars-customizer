(()=>{"use strict";var e,t,r={352:(e,t,r)=>{var n=r(34);t.C=n.createRoot,n.hydrateRoot},556:(e,t,r)=>{var n=r(280),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},c=n.useSyncExternalStore,i=n.useRef,a=n.useEffect,s=n.useMemo,u=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,r,n,l){var f=i(null);if(null===f.current){var p={hasValue:!1,value:null};f.current=p}else p=f.current;f=s((function(){function e(e){if(!a){if(a=!0,c=e,e=n(e),void 0!==l&&p.hasValue){var t=p.value;if(l(t,e))return i=t}return i=e}if(t=i,o(c,e))return t;var r=n(e);return void 0!==l&&l(t,r)?t:(c=e,i=r)}var c,i,a=!1,s=void 0===r?null:r;return[function(){return e(t())},null===s?void 0:function(){return e(s())}]}),[t,r,n,l]);var d=c(e,f[0],f[1]);return a((function(){p.hasValue=!0,p.value=d}),[d]),u(d),d}},728:(e,t,r)=>{e.exports=r(556)},280:e=>{e.exports=window.React},34:e=>{e.exports=window.ReactDOM}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var c=n[e]={exports:{}};return r[e](c,c.exports,o),c.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var c=Object.create(null);o.r(c);var i={};e=e||[null,t({}),t([]),t(t)];for(var a=2&n&&r;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,o.d(c,i),c},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=o(280),t=o(352),r=o(728),n=e,c=Symbol.for("react-redux-context"),i="undefined"!=typeof globalThis?globalThis:{};function a(){if(!n.createContext)return{};const e=i[c]??(i[c]=new Map);let t=e.get(n.createContext);return t||(t=n.createContext(null),e.set(n.createContext,t)),t}var s=a();function u(e=s){return function(){return n.useContext(e)}}var l=u(),f=()=>{throw new Error("uSES not initialized!")},p=(e,t)=>e===t;function d(e=s){const t=e===s?l:u(e),r=(e,r={})=>{const{equalityFn:o=p,devModeChecks:c={}}="function"==typeof r?{equalityFn:r}:r,{store:i,subscription:a,getServerState:s,stabilityCheck:u,identityFunctionCheck:l}=t(),d=(n.useRef(!0),n.useCallback({[e.name]:t=>e(t)}[e.name],[e,u,c.stabilityCheck])),y=f(a.addNestedSub,i.getState,s||i.getState,d,o);return n.useDebugValue(y),y};return Object.assign(r,{withTypes:()=>r}),r}var y=d();Symbol.for("react.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.server_context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.offscreen"),Symbol.for("react.client.reference");var h={notify(){},get:()=>[]};var m="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?n.useLayoutEffect:n.useEffect;Object.defineProperty,Object.getOwnPropertyNames,Object.getOwnPropertySymbols,Object.getOwnPropertyDescriptor,Object.getPrototypeOf,Object.prototype;function b(e=s){const t=e===s?l:u(e),r=()=>{const{store:e}=t();return e};return Object.assign(r,{withTypes:()=>r}),r}var _=b();function g(e=s){const t=e===s?_:b(e),r=()=>t().dispatch;return Object.assign(r,{withTypes:()=>r}),r}var w,v=g();function E(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}w=r.useSyncExternalStoreWithSelector,f=w,e.useSyncExternalStore;var S=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),O=()=>Math.random().toString(36).substring(7).split("").join("."),j={INIT:`@@redux/INIT${O()}`,REPLACE:`@@redux/REPLACE${O()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${O()}`};function C(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function k(e,t,r){if("function"!=typeof e)throw new Error(E(2));if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error(E(0));if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error(E(1));return r(k)(e,t)}let n=e,o=t,c=new Map,i=c,a=0,s=!1;function u(){i===c&&(i=new Map,c.forEach(((e,t)=>{i.set(t,e)})))}function l(){if(s)throw new Error(E(3));return o}function f(e){if("function"!=typeof e)throw new Error(E(4));if(s)throw new Error(E(5));let t=!0;u();const r=a++;return i.set(r,e),function(){if(t){if(s)throw new Error(E(6));t=!1,u(),i.delete(r),c=null}}}function p(e){if(!C(e))throw new Error(E(7));if(void 0===e.type)throw new Error(E(8));if("string"!=typeof e.type)throw new Error(E(17));if(s)throw new Error(E(9));try{s=!0,o=n(o,e)}finally{s=!1}return(c=i).forEach((e=>{e()})),e}return p({type:j.INIT}),{dispatch:p,subscribe:f,getState:l,replaceReducer:function(e){if("function"!=typeof e)throw new Error(E(10));n=e,p({type:j.REPLACE})},[S]:function(){const e=f;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(E(11));function r(){const e=t;e.next&&e.next(l())}return r(),{unsubscribe:e(r)}},[S](){return this}}}}}function N(e){const t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const o=t[n];"function"==typeof e[o]&&(r[o]=e[o])}const n=Object.keys(r);let o;try{!function(e){Object.keys(e).forEach((t=>{const r=e[t];if(void 0===r(void 0,{type:j.INIT}))throw new Error(E(12));if(void 0===r(void 0,{type:j.PROBE_UNKNOWN_ACTION()}))throw new Error(E(13))}))}(r)}catch(e){o=e}return function(e={},t){if(o)throw o;let c=!1;const i={};for(let o=0;o<n.length;o++){const a=n[o],s=r[a],u=e[a],l=s(u,t);if(void 0===l)throw t&&t.type,new Error(E(14));i[a]=l,c=c||l!==u}return c=c||n.length!==Object.keys(e).length,c?i:e}}function x(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce(((e,t)=>(...r)=>e(t(...r))))}var P=Symbol.for("immer-nothing"),R=Symbol.for("immer-draftable"),T=Symbol.for("immer-state");function M(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object.getPrototypeOf;function A(e){return!!e&&!!e[T]}function D(e){return!!e&&(I(e)||Array.isArray(e)||!!e[R]||!!e.constructor?.[R]||L(e)||q(e))}var F=Object.prototype.constructor.toString();function I(e){if(!e||"object"!=typeof e)return!1;const t=z(e);if(null===t)return!0;const r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===F}function $(e,t){0===W(e)?Object.entries(e).forEach((([r,n])=>{t(r,n,e)})):e.forEach(((r,n)=>t(n,r,e)))}function W(e){const t=e[T];return t?t.type_:Array.isArray(e)?1:L(e)?2:q(e)?3:0}function U(e,t){return 2===W(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function B(e,t,r){const n=W(e);2===n?e.set(t,r):3===n?e.add(r):e[t]=r}function L(e){return e instanceof Map}function q(e){return e instanceof Set}function V(e){return e.copy_||e.base_}function X(e,t){if(L(e))return new Map(e);if(q(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);if(!t&&I(e)){if(!z(e)){const t=Object.create(null);return Object.assign(t,e)}return{...e}}const r=Object.getOwnPropertyDescriptors(e);delete r[T];let n=Reflect.ownKeys(r);for(let t=0;t<n.length;t++){const o=n[t],c=r[o];!1===c.writable&&(c.writable=!0,c.configurable=!0),(c.get||c.set)&&(r[o]={configurable:!0,writable:!0,enumerable:c.enumerable,value:e[o]})}return Object.create(z(e),r)}function K(e,t=!1){return H(e)||A(e)||!D(e)||(W(e)>1&&(e.set=e.add=e.clear=e.delete=G),Object.freeze(e),t&&$(e,((e,t)=>K(t,!0)))),e}function G(){M(2)}function H(e){return Object.isFrozen(e)}var J,Q={};function Y(e){const t=Q[e];return t||M(0),t}function Z(){return J}function ee(e,t){t&&(Y("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function te(e){re(e),e.drafts_.forEach(oe),e.drafts_=null}function re(e){e===J&&(J=e.parent_)}function ne(e){return J={drafts_:[],parent_:J,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function oe(e){const t=e[T];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function ce(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];return void 0!==e&&e!==r?(r[T].modified_&&(te(t),M(4)),D(e)&&(e=ie(t,e),t.parent_||se(t,e)),t.patches_&&Y("Patches").generateReplacementPatches_(r[T].base_,e,t.patches_,t.inversePatches_)):e=ie(t,r,[]),te(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==P?e:void 0}function ie(e,t,r){if(H(t))return t;const n=t[T];if(!n)return $(t,((o,c)=>ae(e,n,t,o,c,r))),t;if(n.scope_!==e)return t;if(!n.modified_)return se(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;const t=n.copy_;let o=t,c=!1;3===n.type_&&(o=new Set(t),t.clear(),c=!0),$(o,((o,i)=>ae(e,n,t,o,i,r,c))),se(e,t,!1),r&&e.patches_&&Y("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function ae(e,t,r,n,o,c,i){if(A(o)){const i=ie(e,o,c&&t&&3!==t.type_&&!U(t.assigned_,n)?c.concat(n):void 0);if(B(r,n,i),!A(i))return;e.canAutoFreeze_=!1}else i&&r.add(o);if(D(o)&&!H(o)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;ie(e,o),t&&t.scope_.parent_||se(e,o)}}function se(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&K(t,r)}var ue={get(e,t){if(t===T)return e;const r=V(e);if(!U(r,t))return function(e,t,r){const n=pe(t,r);return n?"value"in n?n.value:n.get?.call(e.draft_):void 0}(e,r,t);const n=r[t];return e.finalized_||!D(n)?n:n===fe(e.base_,t)?(ye(e),e.copy_[t]=he(n,e)):n},has:(e,t)=>t in V(e),ownKeys:e=>Reflect.ownKeys(V(e)),set(e,t,r){const n=pe(V(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const n=fe(V(e),t),i=n?.[T];if(i&&i.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(((o=r)===(c=n)?0!==o||1/o==1/c:o!=o&&c!=c)&&(void 0!==r||U(e.base_,t)))return!0;ye(e),de(e)}var o,c;return e.copy_[t]===r&&(void 0!==r||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty:(e,t)=>(void 0!==fe(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,ye(e),de(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){const r=V(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty(){M(11)},getPrototypeOf:e=>z(e.base_),setPrototypeOf(){M(12)}},le={};function fe(e,t){const r=e[T];return(r?V(r):e)[t]}function pe(e,t){if(!(t in e))return;let r=z(e);for(;r;){const e=Object.getOwnPropertyDescriptor(r,t);if(e)return e;r=z(r)}}function de(e){e.modified_||(e.modified_=!0,e.parent_&&de(e.parent_))}function ye(e){e.copy_||(e.copy_=X(e.base_,e.scope_.immer_.useStrictShallowCopy_))}function he(e,t){const r=L(e)?Y("MapSet").proxyMap_(e,t):q(e)?Y("MapSet").proxySet_(e,t):function(e,t){const r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:Z(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=n,c=ue;r&&(o=[n],c=le);const{revoke:i,proxy:a}=Proxy.revocable(o,c);return n.draft_=a,n.revoke_=i,a}(e,t);return(t?t.scope_:Z()).drafts_.push(r),r}function me(e){return A(e)||M(10),be(e)}function be(e){if(!D(e)||H(e))return e;const t=e[T];let r;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=X(e,t.scope_.immer_.useStrictShallowCopy_)}else r=X(e,!0);return $(r,((e,t)=>{B(r,e,be(t))})),t&&(t.finalized_=!1),r}$(ue,((e,t)=>{le[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),le.deleteProperty=function(e,t){return le.set.call(this,e,t,void 0)},le.set=function(e,t,r){return ue.set.call(this,e[0],t,r,e[0])};var _e=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,r)=>{if("function"==typeof e&&"function"!=typeof t){const r=t;t=e;const n=this;return function(e=r,...o){return n.produce(e,(e=>t.call(this,e,...o)))}}let n;if("function"!=typeof t&&M(6),void 0!==r&&"function"!=typeof r&&M(7),D(e)){const o=ne(this),c=he(e,void 0);let i=!0;try{n=t(c),i=!1}finally{i?te(o):re(o)}return ee(o,r),ce(n,o)}if(!e||"object"!=typeof e){if(n=t(e),void 0===n&&(n=e),n===P&&(n=void 0),this.autoFreeze_&&K(n,!0),r){const t=[],o=[];Y("Patches").generateReplacementPatches_(e,n,t,o),r(t,o)}return n}M(1)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...r)=>this.produceWithPatches(t,(t=>e(t,...r)));let r,n;return[this.produce(e,t,((e,t)=>{r=e,n=t})),r,n]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){D(e)||M(8),A(e)&&(e=me(e));const t=ne(this),r=he(e,void 0);return r[T].isManual_=!0,re(t),r}finishDraft(e,t){const r=e&&e[T];r&&r.isManual_||M(9);const{scope_:n}=r;return ee(n,t),ce(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}r>-1&&(t=t.slice(r+1));const n=Y("Patches").applyPatches_;return A(e)?n(e,t):this.produce(e,(e=>n(e,t)))}},ge=_e.produce;_e.produceWithPatches.bind(_e),_e.setAutoFreeze.bind(_e),_e.setUseStrictShallowCopy.bind(_e),_e.applyPatches.bind(_e),_e.createDraft.bind(_e),_e.finishDraft.bind(_e);var we=e=>Array.isArray(e)?e:[e];Symbol(),Object.getPrototypeOf({});var ve="undefined"!=typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}},Ee=0,Se=1;function Oe(){return{s:Ee,v:void 0,o:null,p:null}}function je(e,t={}){let r=Oe();const{resultEqualityCheck:n}=t;let o,c=0;function i(){let t=r;const{length:i}=arguments;for(let e=0,r=i;e<r;e++){const r=arguments[e];if("function"==typeof r||"object"==typeof r&&null!==r){let e=t.o;null===e&&(t.o=e=new WeakMap);const n=e.get(r);void 0===n?(t=Oe(),e.set(r,t)):t=n}else{let e=t.p;null===e&&(t.p=e=new Map);const n=e.get(r);void 0===n?(t=Oe(),e.set(r,t)):t=n}}const a=t;let s;if(t.s===Se?s=t.v:(s=e.apply(null,arguments),c++),a.s=Se,n){const e=o?.deref?.()??o;null!=e&&n(e,s)&&(s=e,0!==c&&c--),o="object"==typeof s&&null!==s||"function"==typeof s?new ve(s):s}return a.v=s,s}return i.clearCache=()=>{r=Oe(),i.resetResultsCount()},i.resultsCount=()=>c,i.resetResultsCount=()=>{c=0},i}function Ce(e,...t){const r="function"==typeof e?{memoize:e,memoizeOptions:t}:e,n=(...e)=>{let t,n=0,o=0,c={},i=e.pop();"object"==typeof i&&(c=i,i=e.pop()),function(e,t="expected a function, instead received "+typeof e){if("function"!=typeof e)throw new TypeError(t)}(i,`createSelector expects an output function after the inputs, but received: [${typeof i}]`);const a={...r,...c},{memoize:s,memoizeOptions:u=[],argsMemoize:l=je,argsMemoizeOptions:f=[],devModeChecks:p={}}=a,d=we(u),y=we(f),h=function(e){const t=Array.isArray(e[0])?e[0]:e;return function(e,t="expected all items to be functions, instead received the following types: "){if(!e.every((e=>"function"==typeof e))){const r=e.map((e=>"function"==typeof e?`function ${e.name||"unnamed"}()`:typeof e)).join(", ");throw new TypeError(`${t}[${r}]`)}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}(e),m=s((function(){return n++,i.apply(null,arguments)}),...d),b=l((function(){o++;const e=function(e,t){const r=[],{length:n}=e;for(let o=0;o<n;o++)r.push(e[o].apply(null,t));return r}(h,arguments);return t=m.apply(null,e),t}),...y);return Object.assign(b,{resultFunc:i,memoizedResultFunc:m,dependencies:h,dependencyRecomputations:()=>o,resetDependencyRecomputations:()=>{o=0},lastResult:()=>t,recomputations:()=>n,resetRecomputations:()=>{n=0},memoize:s,argsMemoize:l})};return Object.assign(n,{withTypes:()=>n}),n}var ke=Ce(je),Ne=Object.assign(((e,t=ke)=>{!function(e,t="expected an object, instead received "+typeof e){if("object"!=typeof e)throw new TypeError(t)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);const r=Object.keys(e);return t(r.map((t=>e[t])),((...e)=>e.reduce(((e,t,n)=>(e[r[n]]=t,e)),{})))}),{withTypes:()=>Ne});function xe(e){return({dispatch:t,getState:r})=>n=>o=>"function"==typeof o?o(t,r,e):n(o)}var Pe=xe(),Re=xe,Te=(((...e)=>{const t=Ce(...e),r=Object.assign(((...e)=>{const r=t(...e),n=(e,...t)=>r(A(e)?me(e):e,...t);return Object.assign(n,r),n}),{withTypes:()=>r})})(je),"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?x:x.apply(null,arguments)});function Me(e,t){function r(...r){if(t){let n=t(...r);if(!n)throw new Error(Ye(0));return{type:e,payload:n.payload,..."meta"in n&&{meta:n.meta},..."error"in n&&{error:n.error}}}return{type:e,payload:r[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=t=>function(e){return C(e)&&"type"in e&&"string"==typeof e.type}(t)&&t.type===e,r}"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;var ze=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Ae(e){return D(e)?ge(e,(()=>{})):e}function De(e,t,r){if(e.has(t)){let n=e.get(t);return r.update&&(n=r.update(n,t,e),e.set(t,n)),n}if(!r.insert)throw new Error(Ye(10));const n=r.insert(t,e);return e.set(t,n),n}var Fe=e=>t=>{setTimeout(t,e)},Ie="undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:Fe(10);function $e(e){const t={},r=[];let n;const o={addCase(e,r){const n="string"==typeof e?e:e.type;if(!n)throw new Error(Ye(28));if(n in t)throw new Error(Ye(29));return t[n]=r,o},addMatcher:(e,t)=>(r.push({matcher:e,reducer:t}),o),addDefaultCase:e=>(n=e,o)};return e(o),[t,r,n]}var We=(e=21)=>{let t="",r=e;for(;r--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t},Ue=Symbol.for("rtk-slice-createasyncthunk");function Be(e,t){return`${e}/${t}`}function Le(e,t,r,n){function o(o,...c){let i=t(o);return void 0===i&&n&&(i=r()),e(i,...c)}return o.unwrapped=e,o}var qe=function({creators:e}={}){const t=e?.asyncThunk?.[Ue];return function(e){const{name:r,reducerPath:n=r}=e;if(!r)throw new Error(Ye(11));const o=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},c=Object.keys(o),i={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(e,t){const r="string"==typeof e?e:e.type;if(!r)throw new Error(Ye(12));if(r in i.sliceCaseReducersByType)throw new Error(Ye(13));return i.sliceCaseReducersByType[r]=t,a},addMatcher:(e,t)=>(i.sliceMatchers.push({matcher:e,reducer:t}),a),exposeAction:(e,t)=>(i.actionCreators[e]=t,a),exposeCaseReducer:(e,t)=>(i.sliceCaseReducersByName[e]=t,a)};function s(){const[t={},r=[],n]="function"==typeof e.extraReducers?$e(e.extraReducers):[e.extraReducers],o={...t,...i.sliceCaseReducersByType};return function(e,t){let c,[a,s,u]=$e((e=>{for(let t in o)e.addCase(t,o[t]);for(let t of i.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of r)e.addMatcher(t.matcher,t.reducer);n&&e.addDefaultCase(n)}));if("function"==typeof e)c=()=>Ae(e());else{const t=Ae(e);c=()=>t}function l(e=c(),t){let r=[a[t.type],...s.filter((({matcher:e})=>e(t))).map((({reducer:e})=>e))];return 0===r.filter((e=>!!e)).length&&(r=[u]),r.reduce(((e,r)=>{if(r){if(A(e)){const n=r(e,t);return void 0===n?e:n}if(D(e))return ge(e,(e=>r(e,t)));{const n=r(e,t);if(void 0===n){if(null===e)return e;throw new Error(Ye(9))}return n}}return e}),e)}return l.getInitialState=c,l}(e.initialState)}c.forEach((n=>{const c=o[n],i={reducerName:n,type:Be(r,n),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"===e._reducerDefinitionType}(c)?function({type:e,reducerName:t,createNotation:r},n,o){let c,i;if("reducer"in n){if(r&&!function(e){return"reducerWithPrepare"===e._reducerDefinitionType}(n))throw new Error(Ye(17));c=n.reducer,i=n.prepare}else c=n;o.addCase(e,c).exposeCaseReducer(t,c).exposeAction(t,i?Me(e,i):Me(e))}(i,c,a):function({type:e,reducerName:t},r,n,o){if(!o)throw new Error(Ye(18));const{payloadCreator:c,fulfilled:i,pending:a,rejected:s,settled:u,options:l}=r,f=o(e,c,l);n.exposeAction(t,f),i&&n.addCase(f.fulfilled,i),a&&n.addCase(f.pending,a),s&&n.addCase(f.rejected,s),u&&n.addMatcher(f.settled,u),n.exposeCaseReducer(t,{fulfilled:i||Ve,pending:a||Ve,rejected:s||Ve,settled:u||Ve})}(i,c,a,t)}));const u=e=>e,l=new Map;let f;function p(e,t){return f||(f=s()),f(e,t)}function d(){return f||(f=s()),f.getInitialState()}function y(t,r=!1){function n(e){let n=e[t];return void 0===n&&r&&(n=d()),n}function o(t=u){const n=De(l,r,{insert:()=>new WeakMap});return De(n,t,{insert:()=>{const n={};for(const[o,c]of Object.entries(e.selectors??{}))n[o]=Le(c,t,d,r);return n}})}return{reducerPath:t,getSelectors:o,get selectors(){return o(n)},selectSlice:n}}const h={name:r,reducer:p,actions:i.actionCreators,caseReducers:i.sliceCaseReducersByName,getInitialState:d,...y(n),injectInto(e,{reducerPath:t,...r}={}){const o=t??n;return e.inject({reducerPath:o,reducer:p},r),{...h,...y(o,!0)}}};return h}}();function Ve(){}var{assign:Xe}=Object,Ke="listenerMiddleware",Ge=e=>{let{type:t,actionCreator:r,matcher:n,predicate:o,effect:c}=e;if(t)o=Me(t).match;else if(r)t=r.type,o=r.match;else if(n)o=n;else if(!o)throw new Error(Ye(21));return((e,t)=>{if("function"!=typeof e)throw new Error(Ye(32))})(c),{predicate:o,type:t,effect:c}},He=Object.assign((e=>{const{type:t,predicate:r,effect:n}=Ge(e);return{id:We(),effect:n,type:t,predicate:r,pending:new Set,unsubscribe:()=>{throw new Error(Ye(22))}}}),{withTypes:()=>He}),Je=Object.assign(Me(`${Ke}/add`),{withTypes:()=>Je}),Qe=(Me(`${Ke}/removeAll`),Object.assign(Me(`${Ke}/remove`),{withTypes:()=>Qe}));function Ye(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}Symbol.for("rtk-state-proxy-original");const Ze=qe({name:"data",initialState:{guitars:[],sections:[]},reducers:{load_data:(e,t)=>{e.guitars=t.payload.guitars,e.sections=t.payload.sections}}}),et=Ze.reducer,{load_data:tt}=Ze.actions,rt=e=>e.data,nt=e=>rt(e).guitars,ot=e=>rt(e).sections,ct=function(e){const t=function(e){const{thunk:t=!0,immutableCheck:r=!0,serializableCheck:n=!0,actionCreatorCheck:o=!0}=e??{};let c=new ze;return t&&("boolean"==typeof t?c.push(Pe):c.push(Re(t.extraArgument))),c},{reducer:r,middleware:n,devTools:o=!0,preloadedState:c,enhancers:i}=e||{};let a,s;if("function"==typeof r)a=r;else{if(!C(r))throw new Error(Ye(1));a=N(r)}s="function"==typeof n?n(t):t();let u=x;o&&(u=Te({trace:!1,..."object"==typeof o&&o}));const l=function(...e){return t=>(r,n)=>{const o=t(r,n);let c=()=>{throw new Error(E(15))};const i={getState:o.getState,dispatch:(e,...t)=>c(e,...t)},a=e.map((e=>e(i)));return c=x(...a)(o.dispatch),{...o,dispatch:c}}}(...s),f=(e=>function(t){const{autoBatch:r=!0}=t??{};let n=new ze(e);return r&&n.push(((e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let o=!0,c=!1,i=!1;const a=new Set,s="tick"===e.type?queueMicrotask:"raf"===e.type?Ie:"callback"===e.type?e.queueNotification:Fe(e.timeout),u=()=>{i=!1,c&&(c=!1,a.forEach((e=>e())))};return Object.assign({},n,{subscribe(e){const t=n.subscribe((()=>o&&e()));return a.add(e),()=>{t(),a.delete(e)}},dispatch(e){try{return o=!e?.meta?.RTK_autoBatch,c=!o,c&&(i||(i=!0,s(u))),n.dispatch(e)}finally{o=!0}}})})("object"==typeof r?r:void 0)),n})(l);return k(a,c,u(..."function"==typeof i?i(f):f()))}({reducer:N({data:et})}),it=v,at=({label:t,children:r})=>(0,e.createElement)("div",{className:"fggc-field-wrapper uk-margin-bottom"},t&&(0,e.createElement)("label",{className:"fggc-field-label uk-form-label uk-text-bold"},t),(0,e.createElement)("div",{className:"fggc-field uk-form-controls"},r)),st=({price:e})=>e?`(+${e} €)`:"",ut=({id:t,label:r,fieldName:n,isRequired:o,options:c,onChange:i})=>(0,e.createElement)(at,{label:r},(0,e.createElement)("select",{name:n,className:"uk-select",onChange:e=>{if(i)i(e);else{const t=e.target;t.name,t.value}},required:o},c.map((t=>(0,e.createElement)("option",{key:t.value,value:t.value,defaultValue:t.default?t.value:"","data-price":t.price},t.name," ",(0,e.createElement)(st,{price:t.price})))))),lt=({id:t,label:r,fieldName:n,isRequired:o,options:c,onChange:i})=>{const[a,s]=(0,e.useState)("");(0,e.useEffect)((()=>{c.map((e=>(e.default&&s(e.value),e)))}),[c]);const u=e=>{if(i)i(e);else{const t=e.target,r=(t.name,t.value);s(r)}};return(0,e.createElement)(at,{label:r},c.map((t=>(0,e.createElement)("div",{key:t.value},(0,e.createElement)("label",null,(0,e.createElement)("input",{className:"uk-radio",type:"radio",name:n,value:t.value,required:o,checked:a===t.value,onChange:u}),(0,e.createElement)("span",{className:"label"}," ",t.name," ",(0,e.createElement)(st,{price:t.price}))),(0,e.createElement)("br",null)))))},ft=({title:t,children:r})=>(0,e.createElement)("div",{className:"fggc-form__section uk-margin-top"},(0,e.createElement)("h2",null,t),(0,e.createElement)("div",{className:"uk-grid uk-grid-collapse fggc-grid-match"},r)),pt=({title:t,width:r,children:n})=>(0,e.createElement)("div",{className:`fggc-form__group ${r}`},t&&(0,e.createElement)("h3",{className:"uk-h5 fggc-form__group__title"},t),(0,e.createElement)("div",{className:"uk-form-horizontal fggc-form__group__content"},n)),dt=({label:t,fieldName:r,onChange:n})=>(0,e.createElement)(at,{label:t},(0,e.createElement)("textarea",{name:r,className:"uk-textarea",onChange:e=>{if(n)n(e);else{const t=e.target;t.name,t.value}},placeholder:t})),yt=()=>(0,e.createElement)("div",{className:"fggc-form__loader"},(0,e.createElement)("div",{className:"spinner-block"},(0,e.createElement)("div",{className:"spinner-wrapper"},(0,e.createElement)("div",{className:"spinner"}))));var ht=function(e){return e.GUITARS="guitars",e.FIELDS="fields",e}(ht||{});const mt=({})=>{const t=it(),[r,n]=(0,e.useState)(!0),o=y(nt),c=y(ot),i=(e="")=>{var r;n(!0),t((r=e,async e=>{try{let t=fggc_customizer_data.action,n=`${fggc_customizer_data.url}?action=${t}`;r&&(n=`${n}&model=${r}`);const o=await fetch(n);if(o.status>=400&&o.status<500);else{const t=await o.json();console.log(t),e(tt(t))}}catch(e){}})).finally((()=>{n(!1)}))};(0,e.useEffect)((()=>{i()}),[t]);const a=(t,r)=>{let n;switch(t.type){case"select":n=(0,e.createElement)(ut,{key:r,...t});break;case"radio":n=(0,e.createElement)(lt,{key:r,...t});break;case"textarea":n=(0,e.createElement)(dt,{key:r,label:t.label,fieldName:t.fieldName})}return n},s=e=>{const t=e.target,r=t.name,n=t.value;"model"===r&&i(n)};return(0,e.createElement)("div",{className:"fggc-form"},r&&(0,e.createElement)(yt,null),(0,e.createElement)("form",null,(t=>{let r=t.find((e=>e.type===ht.GUITARS));return(0,e.createElement)("div",{className:"fggc-form-guitar-section"},r&&r.groups.length>0&&(0,e.createElement)(ft,{key:r.id,title:r.title},r.groups.map((t=>(0,e.createElement)(pt,{key:t.id,title:t.title,width:t.width},(0,e.createElement)(ut,{id:"model",label:"Model",fieldName:"model",isRequired:!0,options:o,onChange:s}),t.fields.map((e=>a(e,e.id))))))))})(c),c&&c.map((t=>t.type===ht.FIELDS&&t.groups.length>0&&(0,e.createElement)(ft,{key:t.id,title:t.title},t.groups.map((t=>(0,e.createElement)(pt,{key:t.id,title:t.title,width:t.width},t.fields.map((e=>a(e,e.id))))))))),!r&&(0,e.createElement)("button",{type:"submit",className:"uk-button uk-button-primary uk-margin-top"},"Submit")))},bt=document.getElementById("app");(0,t.C)(bt).render((0,e.createElement)((function({store:e,context:t,children:r,serverState:o,stabilityCheck:c="once",identityFunctionCheck:i="once"}){const a=n.useMemo((()=>{const t=function(e,t){let r,n=h,o=0,c=!1;function i(){u.onStateChange&&u.onStateChange()}function a(){o++,r||(r=t?t.addNestedSub(i):e.subscribe(i),n=function(){let e=null,t=null;return{clear(){e=null,t=null},notify(){(()=>{let t=e;for(;t;)t.callback(),t=t.next})()},get(){const t=[];let r=e;for(;r;)t.push(r),r=r.next;return t},subscribe(r){let n=!0;const o=t={callback:r,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){n&&null!==e&&(n=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}())}function s(){o--,r&&0===o&&(r(),r=void 0,n.clear(),n=h)}const u={addNestedSub:function(e){a();const t=n.subscribe(e);let r=!1;return()=>{r||(r=!0,t(),s())}},notifyNestedSubs:function(){n.notify()},handleChangeWrapper:i,isSubscribed:function(){return c},trySubscribe:function(){c||(c=!0,a())},tryUnsubscribe:function(){c&&(c=!1,s())},getListeners:()=>n};return u}(e);return{store:e,subscription:t,getServerState:o?()=>o:void 0,stabilityCheck:c,identityFunctionCheck:i}}),[e,o,c,i]),u=n.useMemo((()=>e.getState()),[e]);m((()=>{const{subscription:t}=a;return t.onStateChange=t.notifyNestedSubs,t.trySubscribe(),u!==e.getState()&&t.notifyNestedSubs(),()=>{t.tryUnsubscribe(),t.onStateChange=void 0}}),[a,u]);const l=t||s;return n.createElement(l.Provider,{value:a},r)}),{store:ct},(0,e.createElement)((()=>(0,e.createElement)("div",{className:"fggc-app"},(0,e.createElement)(mt,null))),null)))})()})();