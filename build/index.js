(()=>{"use strict";var e,t,n={338:(e,t,n)=>{var r=n(795);t.H=r.createRoot,r.hydrateRoot},154:(e,t,n)=>{var r=n(609),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=r.useSyncExternalStore,c=r.useRef,a=r.useEffect,s=r.useMemo,u=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,l){var f=c(null);if(null===f.current){var d={hasValue:!1,value:null};f.current=d}else d=f.current;f=s((function(){function e(e){if(!a){if(a=!0,i=e,e=r(e),void 0!==l&&d.hasValue){var t=d.value;if(l(t,e))return c=t}return c=e}if(t=c,o(i,e))return t;var n=r(e);return void 0!==l&&l(t,n)?t:(i=e,c=n)}var i,c,a=!1,s=void 0===n?null:n;return[function(){return e(t())},null===s?void 0:function(){return e(s())}]}),[t,n,r,l]);var p=i(e,f[0],f[1]);return a((function(){d.hasValue=!0,d.value=p}),[p]),u(p),p}},418:(e,t,n)=>{e.exports=n(154)},609:e=>{e.exports=window.React},795:e=>{e.exports=window.ReactDOM}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return n[e](i,i.exports,o),i.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"==typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"==typeof n.then)return n}var i=Object.create(null);o.r(i);var c={};e=e||[null,t({}),t([]),t(t)];for(var a=2&r&&n;"object"==typeof a&&!~e.indexOf(a);a=t(a))Object.getOwnPropertyNames(a).forEach((e=>c[e]=()=>n[e]));return c.default=()=>n,o.d(i,c),i},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=o(609),t=o(338),n=o(418),r=e,i=Symbol.for("react-redux-context"),c="undefined"!=typeof globalThis?globalThis:{};function a(){if(!r.createContext)return{};const e=c[i]??(c[i]=new Map);let t=e.get(r.createContext);return t||(t=r.createContext(null),e.set(r.createContext,t)),t}var s=a();function u(e=s){return function(){return r.useContext(e)}}var l=u(),f=()=>{throw new Error("uSES not initialized!")},d=(e,t)=>e===t;function p(e=s){const t=e===s?l:u(e),n=(e,n={})=>{const{equalityFn:o=d,devModeChecks:i={}}="function"==typeof n?{equalityFn:n}:n,{store:c,subscription:a,getServerState:s,stabilityCheck:u,identityFunctionCheck:l}=t(),p=(r.useRef(!0),r.useCallback({[e.name]:t=>e(t)}[e.name],[e,u,i.stabilityCheck])),y=f(a.addNestedSub,c.getState,s||c.getState,p,o);return r.useDebugValue(y),y};return Object.assign(n,{withTypes:()=>n}),n}var y=p();Symbol.for("react.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.server_context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.offscreen"),Symbol.for("react.client.reference");var m={notify(){},get:()=>[]};var h="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?r.useLayoutEffect:r.useEffect;Object.defineProperty,Object.getOwnPropertyNames,Object.getOwnPropertySymbols,Object.getOwnPropertyDescriptor,Object.getPrototypeOf,Object.prototype;function g(e=s){const t=e===s?l:u(e),n=()=>{const{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var b=g();function _(e=s){const t=e===s?b:g(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var v,w=_();function E(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}v=n.useSyncExternalStoreWithSelector,f=v,e.useSyncExternalStore;var S=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),O=()=>Math.random().toString(36).substring(7).split("").join("."),C={INIT:`@@redux/INIT${O()}`,REPLACE:`@@redux/REPLACE${O()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${O()}`};function j(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function N(e,t,n){if("function"!=typeof e)throw new Error(E(2));if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error(E(0));if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error(E(1));return n(N)(e,t)}let r=e,o=t,i=new Map,c=i,a=0,s=!1;function u(){c===i&&(c=new Map,i.forEach(((e,t)=>{c.set(t,e)})))}function l(){if(s)throw new Error(E(3));return o}function f(e){if("function"!=typeof e)throw new Error(E(4));if(s)throw new Error(E(5));let t=!0;u();const n=a++;return c.set(n,e),function(){if(t){if(s)throw new Error(E(6));t=!1,u(),c.delete(n),i=null}}}function d(e){if(!j(e))throw new Error(E(7));if(void 0===e.type)throw new Error(E(8));if("string"!=typeof e.type)throw new Error(E(17));if(s)throw new Error(E(9));try{s=!0,o=r(o,e)}finally{s=!1}return(i=c).forEach((e=>{e()})),e}return d({type:C.INIT}),{dispatch:d,subscribe:f,getState:l,replaceReducer:function(e){if("function"!=typeof e)throw new Error(E(10));r=e,d({type:C.REPLACE})},[S]:function(){const e=f;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(E(11));function n(){const e=t;e.next&&e.next(l())}return n(),{unsubscribe:e(n)}},[S](){return this}}}}}function k(e){const t=Object.keys(e),n={};for(let r=0;r<t.length;r++){const o=t[r];"function"==typeof e[o]&&(n[o]=e[o])}const r=Object.keys(n);let o;try{!function(e){Object.keys(e).forEach((t=>{const n=e[t];if(void 0===n(void 0,{type:C.INIT}))throw new Error(E(12));if(void 0===n(void 0,{type:C.PROBE_UNKNOWN_ACTION()}))throw new Error(E(13))}))}(n)}catch(e){o=e}return function(e={},t){if(o)throw o;let i=!1;const c={};for(let o=0;o<r.length;o++){const a=r[o],s=n[a],u=e[a],l=s(u,t);if(void 0===l)throw t&&t.type,new Error(E(14));c[a]=l,i=i||l!==u}return i=i||r.length!==Object.keys(e).length,i?c:e}}function x(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce(((e,t)=>(...n)=>e(t(...n))))}function P(e){return j(e)&&"type"in e&&"string"==typeof e.type}var T=Symbol.for("immer-nothing"),R=Symbol.for("immer-draftable"),M=Symbol.for("immer-state");function A(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var z=Object.getPrototypeOf;function D(e){return!!e&&!!e[M]}function I(e){return!!e&&($(e)||Array.isArray(e)||!!e[R]||!!e.constructor?.[R]||B(e)||L(e))}var F=Object.prototype.constructor.toString();function $(e){if(!e||"object"!=typeof e)return!1;const t=z(e);if(null===t)return!0;const n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===F}function V(e,t){0===q(e)?Object.entries(e).forEach((([n,r])=>{t(n,r,e)})):e.forEach(((n,r)=>t(r,n,e)))}function q(e){const t=e[M];return t?t.type_:Array.isArray(e)?1:B(e)?2:L(e)?3:0}function U(e,t){return 2===q(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function W(e,t,n){const r=q(e);2===r?e.set(t,n):3===r?e.add(n):e[t]=n}function B(e){return e instanceof Map}function L(e){return e instanceof Set}function G(e){return e.copy_||e.base_}function X(e,t){if(B(e))return new Map(e);if(L(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);if(!t&&$(e)){if(!z(e)){const t=Object.create(null);return Object.assign(t,e)}return{...e}}const n=Object.getOwnPropertyDescriptors(e);delete n[M];let r=Reflect.ownKeys(n);for(let t=0;t<r.length;t++){const o=r[t],i=n[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(n[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(z(e),n)}function K(e,t=!1){return J(e)||D(e)||!I(e)||(q(e)>1&&(e.set=e.add=e.clear=e.delete=H),Object.freeze(e),t&&V(e,((e,t)=>K(t,!0)))),e}function H(){A(2)}function J(e){return Object.isFrozen(e)}var Q,Y={};function Z(e){const t=Y[e];return t||A(0),t}function ee(){return Q}function te(e,t){t&&(Z("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function ne(e){re(e),e.drafts_.forEach(ie),e.drafts_=null}function re(e){e===Q&&(Q=e.parent_)}function oe(e){return Q={drafts_:[],parent_:Q,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function ie(e){const t=e[M];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function ce(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];return void 0!==e&&e!==n?(n[M].modified_&&(ne(t),A(4)),I(e)&&(e=ae(t,e),t.parent_||ue(t,e)),t.patches_&&Z("Patches").generateReplacementPatches_(n[M].base_,e,t.patches_,t.inversePatches_)):e=ae(t,n,[]),ne(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==T?e:void 0}function ae(e,t,n){if(J(t))return t;const r=t[M];if(!r)return V(t,((o,i)=>se(e,r,t,o,i,n))),t;if(r.scope_!==e)return t;if(!r.modified_)return ue(e,r.base_,!0),r.base_;if(!r.finalized_){r.finalized_=!0,r.scope_.unfinalizedDrafts_--;const t=r.copy_;let o=t,i=!1;3===r.type_&&(o=new Set(t),t.clear(),i=!0),V(o,((o,c)=>se(e,r,t,o,c,n,i))),ue(e,t,!1),n&&e.patches_&&Z("Patches").generatePatches_(r,n,e.patches_,e.inversePatches_)}return r.copy_}function se(e,t,n,r,o,i,c){if(D(o)){const c=ae(e,o,i&&t&&3!==t.type_&&!U(t.assigned_,r)?i.concat(r):void 0);if(W(n,r,c),!D(c))return;e.canAutoFreeze_=!1}else c&&n.add(o);if(I(o)&&!J(o)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;ae(e,o),t&&t.scope_.parent_||ue(e,o)}}function ue(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&K(t,n)}var le={get(e,t){if(t===M)return e;const n=G(e);if(!U(n,t))return function(e,t,n){const r=pe(t,n);return r?"value"in r?r.value:r.get?.call(e.draft_):void 0}(e,n,t);const r=n[t];return e.finalized_||!I(r)?r:r===de(e.base_,t)?(me(e),e.copy_[t]=he(r,e)):r},has:(e,t)=>t in G(e),ownKeys:e=>Reflect.ownKeys(G(e)),set(e,t,n){const r=pe(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const r=de(G(e),t),c=r?.[M];if(c&&c.base_===n)return e.copy_[t]=n,e.assigned_[t]=!1,!0;if(((o=n)===(i=r)?0!==o||1/o==1/i:o!=o&&i!=i)&&(void 0!==n||U(e.base_,t)))return!0;me(e),ye(e)}var o,i;return e.copy_[t]===n&&(void 0!==n||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_[t]=!0),!0},deleteProperty:(e,t)=>(void 0!==de(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,me(e),ye(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){const n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:r.enumerable,value:n[t]}:r},defineProperty(){A(11)},getPrototypeOf:e=>z(e.base_),setPrototypeOf(){A(12)}},fe={};function de(e,t){const n=e[M];return(n?G(n):e)[t]}function pe(e,t){if(!(t in e))return;let n=z(e);for(;n;){const e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=z(n)}}function ye(e){e.modified_||(e.modified_=!0,e.parent_&&ye(e.parent_))}function me(e){e.copy_||(e.copy_=X(e.base_,e.scope_.immer_.useStrictShallowCopy_))}function he(e,t){const n=B(e)?Z("MapSet").proxyMap_(e,t):L(e)?Z("MapSet").proxySet_(e,t):function(e,t){const n=Array.isArray(e),r={type_:n?1:0,scope_:t?t.scope_:ee(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=r,i=le;n&&(o=[r],i=fe);const{revoke:c,proxy:a}=Proxy.revocable(o,i);return r.draft_=a,r.revoke_=c,a}(e,t);return(t?t.scope_:ee()).drafts_.push(n),n}function ge(e){return D(e)||A(10),be(e)}function be(e){if(!I(e)||J(e))return e;const t=e[M];let n;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=X(e,t.scope_.immer_.useStrictShallowCopy_)}else n=X(e,!0);return V(n,((e,t)=>{W(n,e,be(t))})),t&&(t.finalized_=!1),n}V(le,((e,t)=>{fe[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),fe.deleteProperty=function(e,t){return fe.set.call(this,e,t,void 0)},fe.set=function(e,t,n){return le.set.call(this,e[0],t,n,e[0])};var _e=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,n)=>{if("function"==typeof e&&"function"!=typeof t){const n=t;t=e;const r=this;return function(e=n,...o){return r.produce(e,(e=>t.call(this,e,...o)))}}let r;if("function"!=typeof t&&A(6),void 0!==n&&"function"!=typeof n&&A(7),I(e)){const o=oe(this),i=he(e,void 0);let c=!0;try{r=t(i),c=!1}finally{c?ne(o):re(o)}return te(o,n),ce(r,o)}if(!e||"object"!=typeof e){if(r=t(e),void 0===r&&(r=e),r===T&&(r=void 0),this.autoFreeze_&&K(r,!0),n){const t=[],o=[];Z("Patches").generateReplacementPatches_(e,r,t,o),n(t,o)}return r}A(1)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...n)=>this.produceWithPatches(t,(t=>e(t,...n)));let n,r;return[this.produce(e,t,((e,t)=>{n=e,r=t})),n,r]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){I(e)||A(8),D(e)&&(e=ge(e));const t=oe(this),n=he(e,void 0);return n[M].isManual_=!0,re(t),n}finishDraft(e,t){const n=e&&e[M];n&&n.isManual_||A(9);const{scope_:r}=n;return te(r,t),ce(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const r=t[n];if(0===r.path.length&&"replace"===r.op){e=r.value;break}}n>-1&&(t=t.slice(n+1));const r=Z("Patches").applyPatches_;return D(e)?r(e,t):this.produce(e,(e=>r(e,t)))}},ve=_e.produce;_e.produceWithPatches.bind(_e),_e.setAutoFreeze.bind(_e),_e.setUseStrictShallowCopy.bind(_e),_e.applyPatches.bind(_e),_e.createDraft.bind(_e),_e.finishDraft.bind(_e);var we=e=>Array.isArray(e)?e:[e];Symbol(),Object.getPrototypeOf({});var Ee="undefined"!=typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}},Se=0,Oe=1;function Ce(){return{s:Se,v:void 0,o:null,p:null}}function je(e,t={}){let n=Ce();const{resultEqualityCheck:r}=t;let o,i=0;function c(){let t=n;const{length:c}=arguments;for(let e=0,n=c;e<n;e++){const n=arguments[e];if("function"==typeof n||"object"==typeof n&&null!==n){let e=t.o;null===e&&(t.o=e=new WeakMap);const r=e.get(n);void 0===r?(t=Ce(),e.set(n,t)):t=r}else{let e=t.p;null===e&&(t.p=e=new Map);const r=e.get(n);void 0===r?(t=Ce(),e.set(n,t)):t=r}}const a=t;let s;if(t.s===Oe?s=t.v:(s=e.apply(null,arguments),i++),a.s=Oe,r){const e=o?.deref?.()??o;null!=e&&r(e,s)&&(s=e,0!==i&&i--),o="object"==typeof s&&null!==s||"function"==typeof s?new Ee(s):s}return a.v=s,s}return c.clearCache=()=>{n=Ce(),c.resetResultsCount()},c.resultsCount=()=>i,c.resetResultsCount=()=>{i=0},c}function Ne(e,...t){const n="function"==typeof e?{memoize:e,memoizeOptions:t}:e,r=(...e)=>{let t,r=0,o=0,i={},c=e.pop();"object"==typeof c&&(i=c,c=e.pop()),function(e,t="expected a function, instead received "+typeof e){if("function"!=typeof e)throw new TypeError(t)}(c,`createSelector expects an output function after the inputs, but received: [${typeof c}]`);const a={...n,...i},{memoize:s,memoizeOptions:u=[],argsMemoize:l=je,argsMemoizeOptions:f=[],devModeChecks:d={}}=a,p=we(u),y=we(f),m=function(e){const t=Array.isArray(e[0])?e[0]:e;return function(e,t="expected all items to be functions, instead received the following types: "){if(!e.every((e=>"function"==typeof e))){const n=e.map((e=>"function"==typeof e?`function ${e.name||"unnamed"}()`:typeof e)).join(", ");throw new TypeError(`${t}[${n}]`)}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}(e),h=s((function(){return r++,c.apply(null,arguments)}),...p),g=l((function(){o++;const e=function(e,t){const n=[],{length:r}=e;for(let o=0;o<r;o++)n.push(e[o].apply(null,t));return n}(m,arguments);return t=h.apply(null,e),t}),...y);return Object.assign(g,{resultFunc:c,memoizedResultFunc:h,dependencies:m,dependencyRecomputations:()=>o,resetDependencyRecomputations:()=>{o=0},lastResult:()=>t,recomputations:()=>r,resetRecomputations:()=>{r=0},memoize:s,argsMemoize:l})};return Object.assign(r,{withTypes:()=>r}),r}var ke=Ne(je),xe=Object.assign(((e,t=ke)=>{!function(e,t="expected an object, instead received "+typeof e){if("object"!=typeof e)throw new TypeError(t)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);const n=Object.keys(e);return t(n.map((t=>e[t])),((...e)=>e.reduce(((e,t,r)=>(e[n[r]]=t,e)),{})))}),{withTypes:()=>xe});function Pe(e){return({dispatch:t,getState:n})=>r=>o=>"function"==typeof o?o(t,n,e):r(o)}var Te=Pe(),Re=Pe,Me=((...e)=>{const t=Ne(...e),n=Object.assign(((...e)=>{const n=t(...e),r=(e,...t)=>n(D(e)?ge(e):e,...t);return Object.assign(r,n),r}),{withTypes:()=>n});return n})(je),Ae="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?x:x.apply(null,arguments)};function ze(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw new Error(ut(0));return{type:e,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>P(t)&&t.type===e,n}function De(e){return["type","payload","error","meta"].indexOf(e)>-1}"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;var Ie=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Fe(e){return I(e)?ve(e,(()=>{})):e}function $e(e,t,n){if(e.has(t)){let r=e.get(t);return n.update&&(r=n.update(r,t,e),e.set(t,r)),r}if(!n.insert)throw new Error(ut(10));const r=n.insert(t,e);return e.set(t,r),r}var Ve=e=>t=>{setTimeout(t,e)},qe="undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:Ve(10);function Ue(e){const t={},n=[];let r;const o={addCase(e,n){const r="string"==typeof e?e:e.type;if(!r)throw new Error(ut(28));if(r in t)throw new Error(ut(29));return t[r]=n,o},addMatcher:(e,t)=>(n.push({matcher:e,reducer:t}),o),addDefaultCase:e=>(r=e,o)};return e(o),[t,n,r]}var We=(e=21)=>{let t="",n=e;for(;n--;)t+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return t},Be=Symbol.for("rtk-slice-createasyncthunk");function Le(e,t){return`${e}/${t}`}function Ge({creators:e}={}){const t=e?.asyncThunk?.[Be];return function(e){const{name:n,reducerPath:r=n}=e;if(!n)throw new Error(ut(11));const o=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},i=Object.keys(o),c={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(e,t){const n="string"==typeof e?e:e.type;if(!n)throw new Error(ut(12));if(n in c.sliceCaseReducersByType)throw new Error(ut(13));return c.sliceCaseReducersByType[n]=t,a},addMatcher:(e,t)=>(c.sliceMatchers.push({matcher:e,reducer:t}),a),exposeAction:(e,t)=>(c.actionCreators[e]=t,a),exposeCaseReducer:(e,t)=>(c.sliceCaseReducersByName[e]=t,a)};function s(){const[t={},n=[],r]="function"==typeof e.extraReducers?Ue(e.extraReducers):[e.extraReducers],o={...t,...c.sliceCaseReducersByType};return function(e,t){let i,[a,s,u]=Ue((e=>{for(let t in o)e.addCase(t,o[t]);for(let t of c.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)}));if("function"==typeof e)i=()=>Fe(e());else{const t=Fe(e);i=()=>t}function l(e=i(),t){let n=[a[t.type],...s.filter((({matcher:e})=>e(t))).map((({reducer:e})=>e))];return 0===n.filter((e=>!!e)).length&&(n=[u]),n.reduce(((e,n)=>{if(n){if(D(e)){const r=n(e,t);return void 0===r?e:r}if(I(e))return ve(e,(e=>n(e,t)));{const r=n(e,t);if(void 0===r){if(null===e)return e;throw new Error(ut(9))}return r}}return e}),e)}return l.getInitialState=i,l}(e.initialState)}i.forEach((r=>{const i=o[r],c={reducerName:r,type:Le(n,r),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"===e._reducerDefinitionType}(i)?function({type:e,reducerName:t,createNotation:n},r,o){let i,c;if("reducer"in r){if(n&&!function(e){return"reducerWithPrepare"===e._reducerDefinitionType}(r))throw new Error(ut(17));i=r.reducer,c=r.prepare}else i=r;o.addCase(e,i).exposeCaseReducer(t,i).exposeAction(t,c?ze(e,c):ze(e))}(c,i,a):function({type:e,reducerName:t},n,r,o){if(!o)throw new Error(ut(18));const{payloadCreator:i,fulfilled:c,pending:a,rejected:s,settled:u,options:l}=n,f=o(e,i,l);r.exposeAction(t,f),c&&r.addCase(f.fulfilled,c),a&&r.addCase(f.pending,a),s&&r.addCase(f.rejected,s),u&&r.addMatcher(f.settled,u),r.exposeCaseReducer(t,{fulfilled:c||He,pending:a||He,rejected:s||He,settled:u||He})}(c,i,a,t)}));const u=e=>e,l=new Map;let f;function d(e,t){return f||(f=s()),f(e,t)}function p(){return f||(f=s()),f.getInitialState()}function y(t,n=!1){function r(e){let r=e[t];return void 0===r&&n&&(r=p()),r}function o(t=u){const r=$e(l,n,{insert:()=>new WeakMap});return $e(r,t,{insert:()=>{const r={};for(const[o,i]of Object.entries(e.selectors??{}))r[o]=Xe(i,t,p,n);return r}})}return{reducerPath:t,getSelectors:o,get selectors(){return o(r)},selectSlice:r}}const m={name:n,reducer:d,actions:c.actionCreators,caseReducers:c.sliceCaseReducersByName,getInitialState:p,...y(r),injectInto(e,{reducerPath:t,...n}={}){const o=t??r;return e.inject({reducerPath:o,reducer:d},n),{...m,...y(o,!0)}}};return m}}function Xe(e,t,n,r){function o(o,...i){let c=t(o);return void 0===c&&r&&(c=n()),e(c,...i)}return o.unwrapped=e,o}var Ke=Ge();function He(){}var Je=D;function Qe(e){const t=Ye(((t,n)=>e(n)));return function(e){return t(e,void 0)}}function Ye(e){return function(t,n){const r=t=>{var r;P(r=n)&&Object.keys(r).every(De)?e(n.payload,t):e(n,t)};return Je(t)?(r(t),t):ve(t,r)}}function Ze(e,t){return t(e)}function et(e){return Array.isArray(e)||(e=Object.values(e)),e}function tt(e,t,n){e=et(e);const r=[],o=[];for(const i of e){const e=Ze(i,t);e in n.entities?o.push({id:e,changes:i}):r.push(i)}return[r,o]}function nt(e){function t(t,n){const r=Ze(t,e);r in n.entities||(n.ids.push(r),n.entities[r]=t)}function n(e,n){e=et(e);for(const r of e)t(r,n)}function r(t,n){const r=Ze(t,e);r in n.entities||n.ids.push(r),n.entities[r]=t}function o(e,t){let n=!1;e.forEach((e=>{e in t.entities&&(delete t.entities[e],n=!0)})),n&&(t.ids=t.ids.filter((e=>e in t.entities)))}function i(t,n){const r={},o={};if(t.forEach((e=>{e.id in n.entities&&(o[e.id]={id:e.id,changes:{...o[e.id]?o[e.id].changes:null,...e.changes}})})),(t=Object.values(o)).length>0){const o=t.filter((t=>function(t,n,r){const o=r.entities[n.id];if(void 0===o)return!1;const i=Object.assign({},o,n.changes),c=Ze(i,e),a=c!==n.id;return a&&(t[n.id]=c,delete r.entities[n.id]),r.entities[c]=i,a}(r,t,n))).length>0;o&&(n.ids=Object.values(n.entities).map((t=>Ze(t,e))))}}function c(t,r){const[o,c]=tt(t,e,r);i(c,r),n(o,r)}return{removeAll:Qe((function(e){Object.assign(e,{ids:[],entities:{}})})),addOne:Ye(t),addMany:Ye(n),setOne:Ye(r),setMany:Ye((function(e,t){e=et(e);for(const n of e)r(n,t)})),setAll:Ye((function(e,t){e=et(e),t.ids=[],t.entities={},n(e,t)})),updateOne:Ye((function(e,t){return i([e],t)})),updateMany:Ye(i),upsertOne:Ye((function(e,t){return c([e],t)})),upsertMany:Ye(c),removeOne:Ye((function(e,t){return o([e],t)})),removeMany:Ye(o)}}var{assign:rt}=Object,ot="listenerMiddleware",it=e=>{let{type:t,actionCreator:n,matcher:r,predicate:o,effect:i}=e;if(t)o=ze(t).match;else if(n)t=n.type,o=n.match;else if(r)o=r;else if(!o)throw new Error(ut(21));return((e,t)=>{if("function"!=typeof e)throw new Error(ut(32))})(i),{predicate:o,type:t,effect:i}},ct=Object.assign((e=>{const{type:t,predicate:n,effect:r}=it(e);return{id:We(),effect:r,type:t,predicate:n,pending:new Set,unsubscribe:()=>{throw new Error(ut(22))}}}),{withTypes:()=>ct}),at=Object.assign(ze(`${ot}/add`),{withTypes:()=>at}),st=(ze(`${ot}/removeAll`),Object.assign(ze(`${ot}/remove`),{withTypes:()=>st}));function ut(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}Symbol.for("rtk-state-proxy-original");const lt=function(e={}){const{selectId:t,sortComparer:n}={sortComparer:!1,selectId:e=>e.id,...e},r=n?function(e,t){const{removeOne:n,removeMany:r,removeAll:o}=nt(e);function i(t,n){const r=(t=et(t)).filter((t=>!(Ze(t,e)in n.entities)));0!==r.length&&u(r,n)}function c(e,t){0!==(e=et(e)).length&&u(e,t)}function a(t,n){let r=!1;for(let o of t){const t=n.entities[o.id];if(!t)continue;r=!0,Object.assign(t,o.changes);const i=e(t);o.id!==i&&(delete n.entities[o.id],n.entities[i]=t)}r&&l(n)}function s(t,n){const[r,o]=tt(t,e,n);a(o,n),i(r,n)}function u(t,n){t.forEach((t=>{n.entities[e(t)]=t})),l(n)}function l(n){const r=Object.values(n.entities);r.sort(t);const o=r.map(e),{ids:i}=n;(function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length&&n<t.length;n++)if(e[n]!==t[n])return!1;return!0})(i,o)||(n.ids=o)}return{removeOne:n,removeMany:r,removeAll:o,addOne:Ye((function(e,t){return i([e],t)})),updateOne:Ye((function(e,t){return a([e],t)})),upsertOne:Ye((function(e,t){return s([e],t)})),setOne:Ye((function(e,t){return c([e],t)})),setMany:Ye(c),setAll:Ye((function(e,t){e=et(e),t.entities={},t.ids=[],i(e,t)})),addMany:Ye(i),updateMany:Ye(a),upsertMany:Ye(s)}}(t,n):nt(t),o=function(e){return{getInitialState:function(t={},n){const r=Object.assign({ids:[],entities:{}},t);return n?e.setAll(r,n):r}}}(r);return{selectId:t,sortComparer:n,...o,getSelectors:function(e,t={}){const{createSelector:n=Me}=t,r=e=>e.ids,o=e=>e.entities,i=n(r,o,((e,t)=>e.map((e=>t[e])))),c=(e,t)=>t,a=(e,t)=>e[t],s=n(r,(e=>e.length));if(!e)return{selectIds:r,selectEntities:o,selectAll:i,selectTotal:s,selectById:n(o,c,a)};const u=n(e,o);return{selectIds:n(e,r),selectEntities:u,selectAll:n(e,i),selectTotal:n(e,s),selectById:n(u,c,a)}},...r}}(),ft={guitars:[],sections:[],totalPrice:0,selectedGuitarID:"",selectedOptions:lt.getInitialState(),error:""},dt=Ke({name:"data",initialState:ft,reducers:{load_data:(e,t)=>{e.guitars=t.payload.guitars,e.sections=t.payload.sections},setTotalPrice:(e,t)=>{e.totalPrice=t.payload.totalPrice},setSelectedGuitarID:(e,t)=>{e.selectedGuitarID=t.payload.selectedGuitarID},upsertSelectedOptions:(e,t)=>{lt.upsertOne(e.selectedOptions,t)},deleteSelectedOptions:e=>{lt.removeAll(e.selectedOptions)},setError:(e,t)=>({...t.payload})}}),pt=dt.reducer,{load_data:yt,setTotalPrice:mt,setSelectedGuitarID:ht,upsertSelectedOptions:gt,deleteSelectedOptions:bt,setError:_t}=dt.actions,vt=e=>e.data,wt=e=>vt(e).guitars,Et=e=>vt(e).sections,St=e=>vt(e).totalPrice,Ot=e=>vt(e).selectedGuitarID,Ct=e=>vt(e).selectedOptions,jt=e=>vt(e).error,Nt=function(e){const t=function(e){const{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:o=!0}=e??{};let i=new Ie;return t&&("boolean"==typeof t?i.push(Te):i.push(Re(t.extraArgument))),i},{reducer:n,middleware:r,devTools:o=!0,preloadedState:i,enhancers:c}=e||{};let a,s;if("function"==typeof n)a=n;else{if(!j(n))throw new Error(ut(1));a=k(n)}s="function"==typeof r?r(t):t();let u=x;o&&(u=Ae({trace:!1,..."object"==typeof o&&o}));const l=function(...e){return t=>(n,r)=>{const o=t(n,r);let i=()=>{throw new Error(E(15))};const c={getState:o.getState,dispatch:(e,...t)=>i(e,...t)},a=e.map((e=>e(c)));return i=x(...a)(o.dispatch),{...o,dispatch:i}}}(...s),f=(e=>function(t){const{autoBatch:n=!0}=t??{};let r=new Ie(e);return n&&r.push(((e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let o=!0,i=!1,c=!1;const a=new Set,s="tick"===e.type?queueMicrotask:"raf"===e.type?qe:"callback"===e.type?e.queueNotification:Ve(e.timeout),u=()=>{c=!1,i&&(i=!1,a.forEach((e=>e())))};return Object.assign({},r,{subscribe(e){const t=r.subscribe((()=>o&&e()));return a.add(e),()=>{t(),a.delete(e)}},dispatch(e){try{return o=!e?.meta?.RTK_autoBatch,i=!o,i&&(c||(c=!0,s(u))),r.dispatch(e)}finally{o=!0}}})})("object"==typeof n?n:void 0)),r})(l);return N(a,i,u(..."function"==typeof c?c(f):f()))}({reducer:k({data:pt})}),kt=w;let xt=function(e){return e.GUITARS="guitars",e.FIELDS="fields",e}({});const Pt=({title:t,children:n})=>(0,e.createElement)("div",{className:"fggc-form__section uk-margin-top"},(0,e.createElement)("h2",{className:"uk-h4 uk-margin-small-bottom"},t),(0,e.createElement)("div",{className:"uk-grid uk-grid-collapse fggc-grid-match"},n)),Tt=({id:t,title:n,width:r,hideTitle:o,children:i})=>(0,e.createElement)("div",{className:`fggc-form__group fggc-form__group-${t} ${r}`},!o&&n&&(0,e.createElement)("h3",{className:"uk-h5 fggc-form__group__title"},n),(0,e.createElement)("div",{className:"uk-form-horizontal fggc-form__group__content"},i)),Rt=()=>(0,e.createElement)("div",{className:"fggc-form__loader"},(0,e.createElement)("div",{className:"spinner-block"},(0,e.createElement)("div",{className:"spinner-wrapper"},(0,e.createElement)("div",{className:"spinner"})))),Mt=({price:t})=>(0,e.createElement)(e.Fragment,null,t&&`${t} €`),At=({totalPrice:t})=>(0,e.createElement)("div",{className:"fggc-price-estimate uk-margin-top"},(0,e.createElement)("span",{className:"fggc-price-estimate__label"},fggc_customizer_data.price_estimate_label,":")," ",(0,e.createElement)(Mt,{price:t})," ",(0,e.createElement)("span",{className:"fggc-price-estimate__tax-text"},"(",fggc_customizer_data.price_estimate_tax_text,")"),(0,e.createElement)("input",{type:"hidden",name:"price_estimate",value:t})),zt=({label:t,isTextControls:n,children:r})=>{const o=n?"uk-form-controls-text":"";return(0,e.createElement)("div",{className:"fggc-field-wrapper uk-margin-small-bottom"},t&&(0,e.createElement)("label",{className:"fggc-field-label uk-form-label uk-text-bold"},t),(0,e.createElement)("div",{className:`fggc-field uk-form-controls ${o}`},r))},Dt=({price:t})=>(0,e.createElement)(e.Fragment,null,t&&(0,e.createElement)(e.Fragment,null,"+",(0,e.createElement)(Mt,{price:t}))),It=({id:t,label:n,fieldName:r,isRequired:o,options:i,onChange:c,onChangeValue:a})=>{const s=kt(),[u,l]=(0,e.useState)(""),[f,d]=(0,e.useState)("");return(0,e.useEffect)((()=>{d(i[0].value),l(i[0].id),i.forEach((e=>{e.default&&(d(e.value),l(e.id))}))}),[i]),(0,e.useEffect)((()=>{a&&a(r,u)}),[i,u]),(0,e.useEffect)((()=>{const e={id:t,option:i.find((e=>e.id==u))};s(gt(e))}),[i,f,u]),(0,e.createElement)(zt,{label:n},(0,e.createElement)("select",{name:r,className:"uk-select",onChange:e=>{if(c)c(e);else{const t=e.target,n=(t.name,t.value),r=t.options[t.selectedIndex].dataset.id;l(r),d(n)}},required:o,value:f},i.map((t=>(0,e.createElement)("option",{key:t.id,value:t.value,"data-id":t.id,"data-price":t.price},t.label," ",(0,e.createElement)(Dt,{price:t.price}))))))},Ft=({id:t,label:n,fieldName:r,isRequired:o,options:i,onChange:c,onChangeValue:a})=>{const s=kt(),[u,l]=(0,e.useState)("");(0,e.useEffect)((()=>{l(""),i.forEach((e=>{e.default&&l(e.id)}))}),[i]),(0,e.useEffect)((()=>{a&&a(r,u)}),[u]),(0,e.useEffect)((()=>{const e={id:t,option:i.find((e=>e.id==u))};s(gt(e))}),[u]);const f=e=>{if(c)c(e);else{const t=e.target,n=(t.name,t.value,t.dataset.id);l(n)}};return(0,e.createElement)(zt,{label:n,isTextControls:!0},i.map((t=>(0,e.createElement)("div",{key:t.id,className:"fggc-field__radio"},(0,e.createElement)("label",null,(0,e.createElement)("input",{className:"uk-radio",type:"radio",name:r,value:t.value,required:o,checked:u==t.id,"data-id":t.id,"data-price":t.price,onChange:f}),(0,e.createElement)("span",{className:"label"}," ",t.label," ",(0,e.createElement)(Dt,{price:t.price})))))))},$t=({label:t,fieldName:n,onChange:r})=>(0,e.createElement)(zt,{label:t},(0,e.createElement)("textarea",{name:n,className:"uk-textarea",onChange:e=>{if(r)r(e);else{const t=e.target;t.name,t.value}},placeholder:t})),Vt=({id:t,label:n,fieldName:r,isRequired:o,options:i,onChange:c})=>(0,e.createElement)(zt,{label:n},(0,e.createElement)("input",{type:"email",name:r,className:"uk-input",onChange:e=>{if(c)c(e);else{const t=e.target;t.name,t.value}},placeholder:n,required:o,autoComplete:"off"})),qt=({id:t,label:n,fieldName:r,isRequired:o,options:i,onChange:c})=>(0,e.createElement)(zt,{label:n},(0,e.createElement)("input",{type:"text",name:r,className:"uk-input",onChange:e=>{if(c)c(e);else{const t=e.target;t.name,t.value}},placeholder:n,required:o,autoComplete:"off"})),Ut=({field:t,index:n,onChange:r,onChangeValue:o})=>{const[i,c]=(0,e.useState)("");(0,e.useEffect)((()=>{o&&o(t.fieldName,i)}),[i]);const a=e=>{if(r)r(e);else{const t=e.target;c(t.value)}};return(0,e.createElement)(e.Fragment,null,((t,n)=>{let r;switch(t.type){case"select":r=(0,e.createElement)(It,{key:n,...t,onChangeValue:o});break;case"radio":r=(0,e.createElement)(Ft,{key:n,...t,onChangeValue:o});break;case"textarea":r=(0,e.createElement)($t,{key:n,...t,onChange:a});break;case"email":r=(0,e.createElement)(Vt,{key:n,...t,onChange:a});break;case"text":r=(0,e.createElement)(qt,{key:n,...t,onChange:a})}return r})(t,n))},Wt=({guitars:t,sections:n,onGuitarChange:r,onChangeValue:o})=>{let i=n.find((e=>e.type===xt.GUITARS));return(0,e.createElement)("div",{className:"fggc-form-guitar-section"},i&&i.groups.length>0&&(0,e.createElement)(Pt,{key:i.id,title:i.title},i.groups.map((n=>(0,e.createElement)(Tt,{key:n.id,...n},(0,e.createElement)(It,{id:"model",label:"Model",fieldName:"model",isRequired:!0,options:t,onChange:r,onChangeValue:o}),n.fields.map((t=>(0,e.createElement)(Ut,{key:t.id,field:t,index:t.id,onChangeValue:o}))))))))},Bt=({})=>{const t=kt(),[n,r]=(0,e.useState)(!0),[o,i]=(0,e.useState)(0),[c,a]=(0,e.useState)({}),[s,u]=(0,e.useState)(""),l=y(wt),f=y(Et),d=y(St),p=y(Ot),m=y(Ct),h=y(jt),g=e=>{var n;r(!0),t(bt()),t((n=e,async e=>{try{let t=fggc_customizer_data.action,r=`${fggc_customizer_data.url}?action=${t}`;n&&(r=`${r}&model=${n}`);const o=await fetch(r);if(o.status>=400&&o.status<500)throw new Error;{const t=await o.json();console.log(t),e(yt(t));let r=t.guitars.find((e=>e.id==n));r||(r=t.guitars[0]),r&&e(ht({selectedGuitarID:r.id}))}}catch(t){const n=fggc_customizer_data.error_message;e(_t({...ft,error:n}))}})).finally((()=>{r(!1)}))};(0,e.useEffect)((()=>{const e=window.location.search,t=new URLSearchParams(e).get("model");g(t)}),[]),(0,e.useEffect)((()=>{const e=l.find((e=>e.value==p)),n=Number(e&&e.basePrice?e.basePrice:0);i(n),t(mt({totalPrice:n}))}),[p]),(0,e.useEffect)((()=>{const e=m.ids,n=m.entities;let r=0;e.forEach((e=>{n[e].option?.price&&(r+=Number(n[e].option.price))}));const i=Number(o)+Number(r);t(mt({totalPrice:i}))}),[o,m]),(0,e.useEffect)((()=>{a({...c,model:p})}),[p]);const b=(e,t)=>{a({...c,[e]:t})};return(0,e.createElement)("div",{className:"fggc-form"},n&&(0,e.createElement)(Rt,null),h&&(0,e.createElement)("div",{className:"fggc-form-error"},h),s&&(0,e.createElement)("div",{className:"fggc-form-error"},s),(0,e.createElement)("form",{onChange:e=>{const t=e.target,n=t.name,r=t.value;a({...c,[n]:r})},onSubmit:e=>{e.preventDefault(),(async()=>{const e=fggc_customizer_data.form_submit_action,t=fggc_customizer_data.security,n=`${fggc_customizer_data.url}`,r=new URLSearchParams;r.append("security",t),r.append("action",e),r.append("data",JSON.stringify(c));const o={body:r,headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST"};try{const e=await fetch(n,o);if(e.status>=400&&e.status<500)throw new Error;{const t=await e.json();console.log(t),u(t?.message)}}catch(e){const t=fggc_customizer_data.error_message;u(t)}})()}},(0,e.createElement)(Wt,{guitars:l,sections:f,onGuitarChange:e=>{const n=e.target,r=n.name,o=n.value;"model"===r&&(g(o),a({...c,[r]:o}),t(ht({selectedGuitarID:o})))},onChangeValue:b}),f&&f.map((t=>t.type===xt.FIELDS&&t.groups.length>0&&(0,e.createElement)(Pt,{key:t.id,title:t.title},t.groups.map((t=>(0,e.createElement)(Tt,{key:t.id,...t},t.fields.map((t=>(0,e.createElement)(Ut,{key:t.id,field:t,index:t.id,onChangeValue:b}))))))))),!!d&&(0,e.createElement)(At,{totalPrice:d}),(0,e.createElement)("button",{type:"submit",className:"uk-button uk-button-primary uk-margin-top"},"Submit")))},Lt=document.getElementById("app");(0,t.H)(Lt).render((0,e.createElement)((function({store:e,context:t,children:n,serverState:o,stabilityCheck:i="once",identityFunctionCheck:c="once"}){const a=r.useMemo((()=>{const t=function(e,t){let n,r=m,o=0,i=!1;function c(){u.onStateChange&&u.onStateChange()}function a(){o++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=function(){let e=null,t=null;return{clear(){e=null,t=null},notify(){(()=>{let t=e;for(;t;)t.callback(),t=t.next})()},get(){const t=[];let n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0;const o=t={callback:n,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){r&&null!==e&&(r=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}())}function s(){o--,n&&0===o&&(n(),n=void 0,r.clear(),r=m)}const u={addNestedSub:function(e){a();const t=r.subscribe(e);let n=!1;return()=>{n||(n=!0,t(),s())}},notifyNestedSubs:function(){r.notify()},handleChangeWrapper:c,isSubscribed:function(){return i},trySubscribe:function(){i||(i=!0,a())},tryUnsubscribe:function(){i&&(i=!1,s())},getListeners:()=>r};return u}(e);return{store:e,subscription:t,getServerState:o?()=>o:void 0,stabilityCheck:i,identityFunctionCheck:c}}),[e,o,i,c]),u=r.useMemo((()=>e.getState()),[e]);h((()=>{const{subscription:t}=a;return t.onStateChange=t.notifyNestedSubs,t.trySubscribe(),u!==e.getState()&&t.notifyNestedSubs(),()=>{t.tryUnsubscribe(),t.onStateChange=void 0}}),[a,u]);const l=t||s;return r.createElement(l.Provider,{value:a},n)}),{store:Nt},(0,e.createElement)((()=>(0,e.createElement)("div",{className:"fggc-app"},(0,e.createElement)(Bt,null))),null)))})()})();