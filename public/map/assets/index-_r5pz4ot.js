(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sa="170",nu=0,Da=1,iu=2,ec=1,nc=2,bn=3,Rn=0,We=1,De=2,Vn=0,Fi=1,Ua=2,Na=3,Oa=4,ru=5,ei=100,su=101,ou=102,au=103,lu=104,cu=200,uu=201,hu=202,fu=203,mo=204,go=205,du=206,pu=207,mu=208,gu=209,_u=210,vu=211,Mu=212,xu=213,yu=214,_o=0,vo=1,Mo=2,Hi=3,xo=4,yo=5,So=6,Eo=7,ic=0,Su=1,Eu=2,Wn=0,bu=1,wu=2,Tu=3,rc=4,Au=5,Ru=6,Cu=7,sc=300,Gi=301,ki=302,bo=303,wo=304,Es=306,ps=1e3,ii=1001,To=1002,Je=1003,Pu=1004,Pr=1005,en=1006,Rs=1007,ri=1008,Cn=1009,oc=1010,ac=1011,xr=1012,oa=1013,li=1014,pn=1015,br=1016,aa=1017,la=1018,Vi=1020,lc=35902,cc=1021,uc=1022,nn=1023,hc=1024,fc=1025,Bi=1026,Wi=1027,ca=1028,ua=1029,dc=1030,ha=1031,fa=1033,ls=33776,cs=33777,us=33778,hs=33779,Ao=35840,Ro=35841,Co=35842,Po=35843,Lo=36196,Io=37492,Do=37496,Uo=37808,No=37809,Oo=37810,Fo=37811,Bo=37812,zo=37813,Ho=37814,Go=37815,ko=37816,Vo=37817,Wo=37818,Xo=37819,Yo=37820,qo=37821,fs=36492,Zo=36494,$o=36495,pc=36283,Ko=36284,Jo=36285,jo=36286,Lu=3200,Iu=3201,mc=0,Du=1,Gn="",Ie="srgb",$i="srgb-linear",bs="linear",fe="srgb",gi=7680,Fa=519,Uu=512,Nu=513,Ou=514,gc=515,Fu=516,Bu=517,zu=518,Hu=519,Qo=35044,Ba="300 es",wn=2e3,ms=2001;class Ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let za=1234567;const gr=Math.PI/180,yr=180/Math.PI;function Tn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Le(i,t,e){return Math.max(t,Math.min(e,i))}function da(i,t){return(i%t+t)%t}function Gu(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function ku(i,t,e){return i!==t?(e-i)/(t-i):0}function _r(i,t,e){return(1-e)*i+e*t}function Vu(i,t,e,n){return _r(i,t,1-Math.exp(-e*n))}function Wu(i,t=1){return t-Math.abs(da(i,t*2)-t)}function Xu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Yu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function qu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Zu(i,t){return i+Math.random()*(t-i)}function $u(i){return i*(.5-Math.random())}function Ku(i){i!==void 0&&(za=i);let t=za+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ju(i){return i*gr}function ju(i){return i*yr}function Qu(i){return(i&i-1)===0&&i!==0}function th(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function eh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function nh(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),u=o((t+n)/2),f=s((t-n)/2),p=o((t-n)/2),d=s((n-t)/2),g=o((n-t)/2);switch(r){case"XYX":i.set(a*u,l*f,l*p,a*c);break;case"YZY":i.set(l*p,a*u,l*f,a*c);break;case"ZXZ":i.set(l*f,l*p,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function un(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ue(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Cs={DEG2RAD:gr,RAD2DEG:yr,generateUUID:Tn,clamp:Le,euclideanModulo:da,mapLinear:Gu,inverseLerp:ku,lerp:_r,damp:Vu,pingpong:Wu,smoothstep:Xu,smootherstep:Yu,randInt:qu,randFloat:Zu,randFloatSpread:$u,seededRandom:Ku,degToRad:Ju,radToDeg:ju,isPowerOfTwo:Qu,ceilPowerOfTwo:th,floorPowerOfTwo:eh,setQuaternionFromProperEuler:nh,normalize:ue,denormalize:un};class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,n,r,s,o,a,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],f=n[7],p=n[2],d=n[5],g=n[8],v=r[0],m=r[3],h=r[6],S=r[1],y=r[4],_=r[7],I=r[2],w=r[5],A=r[8];return s[0]=o*v+a*S+l*I,s[3]=o*m+a*y+l*w,s[6]=o*h+a*_+l*A,s[1]=c*v+u*S+f*I,s[4]=c*m+u*y+f*w,s[7]=c*h+u*_+f*A,s[2]=p*v+d*S+g*I,s[5]=p*m+d*y+g*w,s[8]=p*h+d*_+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,p=a*l-u*s,d=c*s-o*l,g=e*f+n*p+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=f*v,t[1]=(r*c-u*n)*v,t[2]=(a*n-r*o)*v,t[3]=p*v,t[4]=(u*e-r*l)*v,t[5]=(r*s-a*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ps.makeScale(t,e)),this}rotate(t){return this.premultiply(Ps.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ps.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ps=new qt;function _c(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ih(){const i=gs("canvas");return i.style.display="block",i}const Ha={};function pr(i){i in Ha||(Ha[i]=!0,console.warn(i))}function rh(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function sh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function oh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===fe&&(i.r=An(i.r),i.g=An(i.g),i.b=An(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===fe&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Gn?bs:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ga=[.64,.33,.3,.6,.15,.06],ka=[.2126,.7152,.0722],Va=[.3127,.329],Wa=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xa=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[$i]:{primaries:Ga,whitePoint:Va,transfer:bs,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:ka,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:Ga,whitePoint:Va,transfer:fe,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:ka,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});let _i;class ah{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=gs("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=gs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=An(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(An(e[n]/255)*255):e[n]=An(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let lh=0;class vc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Tn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ls(r[o].image)):s.push(Ls(r[o]))}else s=Ls(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ls(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ah.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ch=0;class Fe extends Ki{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,n=ii,r=ii,s=en,o=ri,a=nn,l=Cn,c=Fe.DEFAULT_ANISOTROPY,u=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=Tn(),this.name="",this.source=new vc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ps:t.x=t.x-Math.floor(t.x);break;case ii:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ps:t.y=t.y-Math.floor(t.y);break;case ii:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=sc;Fe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,r=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],f=l[8],p=l[1],d=l[5],g=l[9],v=l[2],m=l[6],h=l[10];if(Math.abs(u-p)<.01&&Math.abs(f-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(f+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,_=(d+1)/2,I=(h+1)/2,w=(u+p)/4,A=(f+v)/4,L=(g+m)/4;return y>_&&y>I?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=w/n,s=A/n):_>I?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=w/r,s=L/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=A/s,r=L/s),this.set(n,r,s,e),this}let S=Math.sqrt((m-g)*(m-g)+(f-v)*(f-v)+(p-u)*(p-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-v)/S,this.z=(p-u)/S,this.w=Math.acos((c+d+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class uh extends Ki{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Fe(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new vc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends uh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Mc extends Fe{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Je,this.minFilter=Je,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class hh extends Fe{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Je,this.minFilter=Je,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const p=s[o+0],d=s[o+1],g=s[o+2],v=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=p,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(f!==v||l!==p||c!==d||u!==g){let m=1-a;const h=l*p+c*d+u*g+f*v,S=h>=0?1:-1,y=1-h*h;if(y>Number.EPSILON){const I=Math.sqrt(y),w=Math.atan2(I,h*S);m=Math.sin(m*w)/I,a=Math.sin(a*w)/I}const _=a*S;if(l=l*m+p*_,c=c*m+d*_,u=u*m+g*_,f=f*m+v*_,m===1-a){const I=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=I,c*=I,u*=I,f*=I}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[o],p=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*f+l*d-c*p,t[e+1]=l*g+u*p+c*f-a*d,t[e+2]=c*g+u*d+a*p-l*f,t[e+3]=u*g-a*f-l*p-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),f=a(s/2),p=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=p*u*f+c*d*g,this._y=c*d*f-p*u*g,this._z=c*u*g+p*d*f,this._w=c*u*f-p*d*g;break;case"YXZ":this._x=p*u*f+c*d*g,this._y=c*d*f-p*u*g,this._z=c*u*g-p*d*f,this._w=c*u*f+p*d*g;break;case"ZXY":this._x=p*u*f-c*d*g,this._y=c*d*f+p*u*g,this._z=c*u*g+p*d*f,this._w=c*u*f-p*d*g;break;case"ZYX":this._x=p*u*f-c*d*g,this._y=c*d*f+p*u*g,this._z=c*u*g-p*d*f,this._w=c*u*f+p*d*g;break;case"YZX":this._x=p*u*f+c*d*g,this._y=c*d*f+p*u*g,this._z=c*u*g-p*d*f,this._w=c*u*f-p*d*g;break;case"XZY":this._x=p*u*f-c*d*g,this._y=c*d*f-p*u*g,this._z=c*u*g+p*d*f,this._w=c*u*f+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],p=n+a+f;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,p=Math.sin(e*u)/c;return this._w=o*f+this._w*p,this._x=n*f+this._x*p,this._y=r*f+this._y*p,this._z=s*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ya.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ya.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),u=2*(a*e-s*r),f=2*(s*n-o*e);return this.x=e+l*c+o*f-a*u,this.y=n+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Is.copy(this).projectOnVector(t),this.sub(Is)}reflect(t){return this.sub(Is.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Is=new R,Ya=new wr;class fi{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(s,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Lr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(t.matrixWorld),this.union(Lr)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ir),Ir.subVectors(this.max,ir),vi.subVectors(t.a,ir),Mi.subVectors(t.b,ir),xi.subVectors(t.c,ir),Nn.subVectors(Mi,vi),On.subVectors(xi,Mi),qn.subVectors(vi,xi);let e=[0,-Nn.z,Nn.y,0,-On.z,On.y,0,-qn.z,qn.y,Nn.z,0,-Nn.x,On.z,0,-On.x,qn.z,0,-qn.x,-Nn.y,Nn.x,0,-On.y,On.x,0,-qn.y,qn.x,0];return!Ds(e,vi,Mi,xi,Ir)||(e=[1,0,0,0,1,0,0,0,1],!Ds(e,vi,Mi,xi,Ir))?!1:(Dr.crossVectors(Nn,On),e=[Dr.x,Dr.y,Dr.z],Ds(e,vi,Mi,xi,Ir))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Mn=[new R,new R,new R,new R,new R,new R,new R,new R],an=new R,Lr=new fi,vi=new R,Mi=new R,xi=new R,Nn=new R,On=new R,qn=new R,ir=new R,Ir=new R,Dr=new R,Zn=new R;function Ds(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Zn.fromArray(i,s);const a=r.x*Math.abs(Zn.x)+r.y*Math.abs(Zn.y)+r.z*Math.abs(Zn.z),l=t.dot(Zn),c=e.dot(Zn),u=n.dot(Zn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const fh=new fi,rr=new R,Us=new R;class Ji{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):fh.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rr.subVectors(t,this.center);const e=rr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(rr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Us.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rr.copy(t.center).add(Us)),this.expandByPoint(rr.copy(t.center).sub(Us))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new R,Ns=new R,Ur=new R,Fn=new R,Os=new R,Nr=new R,Fs=new R;class pa{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Ns.copy(t).add(e).multiplyScalar(.5),Ur.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Ns);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ur),a=Fn.dot(this.direction),l=-Fn.dot(Ur),c=Fn.lengthSq(),u=Math.abs(1-o*o);let f,p,d,g;if(u>0)if(f=o*l-a,p=o*a-l,g=s*u,f>=0)if(p>=-g)if(p<=g){const v=1/u;f*=v,p*=v,d=f*(f+o*p+2*a)+p*(o*f+p+2*l)+c}else p=s,f=Math.max(0,-(o*p+a)),d=-f*f+p*(p+2*l)+c;else p=-s,f=Math.max(0,-(o*p+a)),d=-f*f+p*(p+2*l)+c;else p<=-g?(f=Math.max(0,-(-o*s+a)),p=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+p*(p+2*l)+c):p<=g?(f=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+c):(f=Math.max(0,-(o*s+a)),p=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+p*(p+2*l)+c);else p=o>0?-s:s,f=Math.max(0,-(o*p+a)),d=-f*f+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ns).addScaledVector(Ur,p),d}intersectSphere(t,e){xn.subVectors(t.center,this.origin);const n=xn.dot(this.direction),r=xn.dot(xn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,r=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,r=(t.min.x-p.x)*c),u>=0?(s=(t.min.y-p.y)*u,o=(t.max.y-p.y)*u):(s=(t.max.y-p.y)*u,o=(t.min.y-p.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-p.z)*f,l=(t.max.z-p.z)*f):(a=(t.max.z-p.z)*f,l=(t.min.z-p.z)*f),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,r,s){Os.subVectors(e,t),Nr.subVectors(n,t),Fs.crossVectors(Os,Nr);let o=this.direction.dot(Fs),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,t);const l=a*this.direction.dot(Nr.crossVectors(Fn,Nr));if(l<0)return null;const c=a*this.direction.dot(Os.cross(Fn));if(c<0||l+c>o)return null;const u=-a*Fn.dot(Fs);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,r,s,o,a,l,c,u,f,p,d,g,v,m){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,u,f,p,d,g,v,m)}set(t,e,n,r,s,o,a,l,c,u,f,p,d,g,v,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=p,h[3]=d,h[7]=g,h[11]=v,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/yi.setFromMatrixColumn(t,0).length(),s=1/yi.setFromMatrixColumn(t,1).length(),o=1/yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const p=o*u,d=o*f,g=a*u,v=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=p-v*c,e[9]=-a*l,e[2]=v-p*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*u,d=l*f,g=c*u,v=c*f;e[0]=p+v*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=v+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*u,d=l*f,g=c*u,v=c*f;e[0]=p-v*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=v-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*u,d=o*f,g=a*u,v=a*f;e[0]=l*u,e[4]=g*c-d,e[8]=p*c+v,e[1]=l*f,e[5]=v*c+p,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=v-p*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*f+g,e[10]=p-v*f}else if(t.order==="XZY"){const p=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=p*f+v,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=v*f+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dh,t,ph)}lookAt(t,e,n){const r=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Bn.crossVectors(n,Ze),Bn.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Bn.crossVectors(n,Ze)),Bn.normalize(),Or.crossVectors(Ze,Bn),r[0]=Bn.x,r[4]=Or.x,r[8]=Ze.x,r[1]=Bn.y,r[5]=Or.y,r[9]=Ze.y,r[2]=Bn.z,r[6]=Or.z,r[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],f=n[5],p=n[9],d=n[13],g=n[2],v=n[6],m=n[10],h=n[14],S=n[3],y=n[7],_=n[11],I=n[15],w=r[0],A=r[4],L=r[8],E=r[12],x=r[1],C=r[5],B=r[9],G=r[13],$=r[2],K=r[6],Z=r[10],it=r[14],Y=r[3],ft=r[7],mt=r[11],yt=r[15];return s[0]=o*w+a*x+l*$+c*Y,s[4]=o*A+a*C+l*K+c*ft,s[8]=o*L+a*B+l*Z+c*mt,s[12]=o*E+a*G+l*it+c*yt,s[1]=u*w+f*x+p*$+d*Y,s[5]=u*A+f*C+p*K+d*ft,s[9]=u*L+f*B+p*Z+d*mt,s[13]=u*E+f*G+p*it+d*yt,s[2]=g*w+v*x+m*$+h*Y,s[6]=g*A+v*C+m*K+h*ft,s[10]=g*L+v*B+m*Z+h*mt,s[14]=g*E+v*G+m*it+h*yt,s[3]=S*w+y*x+_*$+I*Y,s[7]=S*A+y*C+_*K+I*ft,s[11]=S*L+y*B+_*Z+I*mt,s[15]=S*E+y*G+_*it+I*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],p=t[10],d=t[14],g=t[3],v=t[7],m=t[11],h=t[15];return g*(+s*l*f-r*c*f-s*a*p+n*c*p+r*a*d-n*l*d)+v*(+e*l*d-e*c*p+s*o*p-r*o*d+r*c*u-s*l*u)+m*(+e*c*f-e*a*d-s*o*f+n*o*d+s*a*u-n*c*u)+h*(-r*a*u-e*l*f+e*a*p+r*o*f-n*o*p+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],p=t[10],d=t[11],g=t[12],v=t[13],m=t[14],h=t[15],S=f*m*c-v*p*c+v*l*d-a*m*d-f*l*h+a*p*h,y=g*p*c-u*m*c-g*l*d+o*m*d+u*l*h-o*p*h,_=u*v*c-g*f*c+g*a*d-o*v*d-u*a*h+o*f*h,I=g*f*l-u*v*l-g*a*p+o*v*p+u*a*m-o*f*m,w=e*S+n*y+r*_+s*I;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=S*A,t[1]=(v*p*s-f*m*s-v*r*d+n*m*d+f*r*h-n*p*h)*A,t[2]=(a*m*s-v*l*s+v*r*c-n*m*c-a*r*h+n*l*h)*A,t[3]=(f*l*s-a*p*s-f*r*c+n*p*c+a*r*d-n*l*d)*A,t[4]=y*A,t[5]=(u*m*s-g*p*s+g*r*d-e*m*d-u*r*h+e*p*h)*A,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*h-e*l*h)*A,t[7]=(o*p*s-u*l*s+u*r*c-e*p*c-o*r*d+e*l*d)*A,t[8]=_*A,t[9]=(g*f*s-u*v*s-g*n*d+e*v*d+u*n*h-e*f*h)*A,t[10]=(o*v*s-g*a*s+g*n*c-e*v*c-o*n*h+e*a*h)*A,t[11]=(u*a*s-o*f*s-u*n*c+e*f*c+o*n*d-e*a*d)*A,t[12]=I*A,t[13]=(u*v*r-g*f*r+g*n*p-e*v*p-u*n*m+e*f*m)*A,t[14]=(g*a*r-o*v*r-g*n*l+e*v*l+o*n*m-e*a*m)*A,t[15]=(o*f*r-u*a*r+u*n*l-e*f*l-o*n*p+e*a*p)*A,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,f=a+a,p=s*c,d=s*u,g=s*f,v=o*u,m=o*f,h=a*f,S=l*c,y=l*u,_=l*f,I=n.x,w=n.y,A=n.z;return r[0]=(1-(v+h))*I,r[1]=(d+_)*I,r[2]=(g-y)*I,r[3]=0,r[4]=(d-_)*w,r[5]=(1-(p+h))*w,r[6]=(m+S)*w,r[7]=0,r[8]=(g+y)*A,r[9]=(m-S)*A,r[10]=(1-(p+v))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=yi.set(r[0],r[1],r[2]).length();const o=yi.set(r[4],r[5],r[6]).length(),a=yi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],ln.copy(this);const c=1/s,u=1/o,f=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=f,ln.elements[9]*=f,ln.elements[10]*=f,e.setFromRotationMatrix(ln),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=wn){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),p=(n+r)/(n-r);let d,g;if(a===wn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===ms)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=wn){const l=this.elements,c=1/(e-t),u=1/(n-r),f=1/(o-s),p=(e+t)*c,d=(n+r)*u;let g,v;if(a===wn)g=(o+s)*f,v=-2*f;else if(a===ms)g=s*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const yi=new R,ln=new ce,dh=new R(0,0,0),ph=new R(1,1,1),Bn=new R,Or=new R,Ze=new R,qa=new ce,Za=new wr;class gn{constructor(t=0,e=0,n=0,r=gn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],p=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Le(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Le(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Le(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Za.setFromEuler(this),this.setFromQuaternion(Za,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gn.DEFAULT_ORDER="XYZ";class ma{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let mh=0;const $a=new R,Si=new wr,yn=new ce,Fr=new R,sr=new R,gh=new R,_h=new wr,Ka=new R(1,0,0),Ja=new R(0,1,0),ja=new R(0,0,1),Qa={type:"added"},vh={type:"removed"},Ei={type:"childadded",child:null},Bs={type:"childremoved",child:null};class Te extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mh++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new R,e=new gn,n=new wr,r=new R(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ce},normalMatrix:{value:new qt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(Ka,t)}rotateY(t){return this.rotateOnAxis(Ja,t)}rotateZ(t){return this.rotateOnAxis(ja,t)}translateOnAxis(t,e){return $a.copy(t).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ka,t)}translateY(t){return this.translateOnAxis(Ja,t)}translateZ(t){return this.translateOnAxis(ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fr.copy(t):Fr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(sr,Fr,this.up):yn.lookAt(Fr,sr,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),Si.setFromRotationMatrix(yn),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qa),Ei.child=t,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vh),Bs.child=t,this.dispatchEvent(Bs),Bs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qa),Ei.child=t,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,t,gh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,_h,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),p=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Te.DEFAULT_UP=new R(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new R,Sn=new R,zs=new R,En=new R,bi=new R,wi=new R,tl=new R,Hs=new R,Gs=new R,ks=new R,Vs=new he,Ws=new he,Xs=new he;class tn{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),cn.subVectors(t,e),r.cross(cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){cn.subVectors(r,e),Sn.subVectors(n,e),zs.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(Sn),l=cn.dot(zs),c=Sn.dot(Sn),u=Sn.dot(zs),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const p=1/f,d=(c*l-a*u)*p,g=(o*u-a*l)*p;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(o,En.y),l.addScaledVector(a,En.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return Vs.setScalar(0),Ws.setScalar(0),Xs.setScalar(0),Vs.fromBufferAttribute(t,e),Ws.fromBufferAttribute(t,n),Xs.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Vs,s.x),o.addScaledVector(Ws,s.y),o.addScaledVector(Xs,s.z),o}static isFrontFacing(t,e,n,r){return cn.subVectors(n,e),Sn.subVectors(t,e),cn.cross(Sn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),cn.cross(Sn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return tn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;bi.subVectors(r,n),wi.subVectors(s,n),Hs.subVectors(t,n);const l=bi.dot(Hs),c=wi.dot(Hs);if(l<=0&&c<=0)return e.copy(n);Gs.subVectors(t,r);const u=bi.dot(Gs),f=wi.dot(Gs);if(u>=0&&f<=u)return e.copy(r);const p=l*f-u*c;if(p<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(bi,o);ks.subVectors(t,s);const d=bi.dot(ks),g=wi.dot(ks);if(g>=0&&d<=g)return e.copy(s);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(wi,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return tl.subVectors(s,r),a=(f-u)/(f-u+(d-g)),e.copy(r).addScaledVector(tl,a);const h=1/(m+v+p);return o=v*h,a=p*h,e.copy(n).addScaledVector(bi,o).addScaledVector(wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Br={h:0,s:0,l:0};function Ys(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=ee.workingColorSpace){if(t=da(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Ys(o,s,t+1/3),this.g=Ys(o,s,t),this.b=Ys(o,s,t-1/3)}return ee.toWorkingColorSpace(this,r),this}setStyle(t,e=Ie){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const n=xc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=An(t.r),this.g=An(t.g),this.b=An(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return ee.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Le(Ne.r*255,0,255))*65536+Math.round(Le(Ne.g*255,0,255))*256+Math.round(Le(Ne.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,r=Ne.g,s=Ne.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Ie){ee.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,r=Ne.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Br);const n=_r(zn.h,Br.h,e),r=_r(zn.s,Br.s,e),s=_r(zn.l,Br.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Ft;Ft.NAMES=xc;let Mh=0;class di extends Ki{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=Tn(),this.name="",this.blending=Fi,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mo,this.blendDst=go,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==mo&&(n.blendSrc=this.blendSrc),this.blendDst!==go&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Sr extends di{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new R,zr=new wt;class Ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Qo,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),r=ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),r=ue(r,this.array),s=ue(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qo&&(t.usage=this.usage),t}}class yc extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Sc extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let xh=0;const Qe=new ce,qs=new Te,Ti=new R,$e=new fi,or=new fi,Pe=new R;class Ee extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_c(t)?Sc:yc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new qt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,n){return Qe.makeTranslation(t,e,n),this.applyMatrix4(Qe),this}scale(t,e,n){return Qe.makeScale(t,e,n),this.applyMatrix4(Qe),this}lookAt(t){return qs.lookAt(t),qs.updateMatrix(),this.applyMatrix4(qs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];$e.setFromBufferAttribute(s),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];or.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors($e.min,or.min),$e.expandByPoint(Pe),Pe.addVectors($e.max,or.max),$e.expandByPoint(Pe)):($e.expandByPoint(or.min),$e.expandByPoint(or.max))}$e.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Pe.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Pe));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Pe.fromBufferAttribute(a,c),l&&(Ti.fromBufferAttribute(t,c),Pe.add(Ti)),r=Math.max(r,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new R,l[L]=new R;const c=new R,u=new R,f=new R,p=new wt,d=new wt,g=new wt,v=new R,m=new R;function h(L,E,x){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,E),f.fromBufferAttribute(n,x),p.fromBufferAttribute(s,L),d.fromBufferAttribute(s,E),g.fromBufferAttribute(s,x),u.sub(c),f.sub(c),d.sub(p),g.sub(p);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(C),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(C),a[L].add(v),a[E].add(v),a[x].add(v),l[L].add(m),l[E].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let L=0,E=S.length;L<E;++L){const x=S[L],C=x.start,B=x.count;for(let G=C,$=C+B;G<$;G+=3)h(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const y=new R,_=new R,I=new R,w=new R;function A(L){I.fromBufferAttribute(r,L),w.copy(I);const E=a[L];y.copy(E),y.sub(I.multiplyScalar(I.dot(E))).normalize(),_.crossVectors(w,E);const C=_.dot(l[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,C)}for(let L=0,E=S.length;L<E;++L){const x=S[L],C=x.start,B=x.count;for(let G=C,$=C+B;G<$;G+=3)A(t.getX(G+0)),A(t.getX(G+1)),A(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);const r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,u=new R,f=new R;if(t)for(let p=0,d=t.count;p<d;p+=3){const g=t.getX(p+0),v=t.getX(p+1),m=t.getX(p+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,d=e.count;p<d;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,p=new c.constructor(l.length*u);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let h=0;h<u;h++)p[g++]=c[d++]}return new Ge(p,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ee,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const p=c[u],d=t(p,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,p=c.length;f<p;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],f=s[c];for(let p=0,d=f.length;p<d;p++)u.push(f[p].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new ce,$n=new pa,Hr=new Ji,nl=new R,Gr=new R,kr=new R,Vr=new R,Zs=new R,Wr=new R,il=new R,Xr=new R;class me extends Te{constructor(t=new Ee,e=new Sr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Wr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Zs.fromBufferAttribute(f,t),o?Wr.addScaledVector(Zs,u):Wr.addScaledVector(Zs.sub(e),u))}e.add(Wr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(s),$n.copy(t.ray).recast(t.near),!(Hr.containsPoint($n.origin)===!1&&($n.intersectSphere(Hr,nl)===null||$n.origin.distanceToSquared(nl)>(t.far-t.near)**2))&&(el.copy(s).invert(),$n.copy(t.ray).applyMatrix4(el),!(n.boundingBox!==null&&$n.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,$n)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,p=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=p.length;g<v;g++){const m=p[g],h=o[m.materialIndex],S=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=S,I=y;_<I;_+=3){const w=a.getX(_),A=a.getX(_+1),L=a.getX(_+2);r=Yr(this,h,t,n,c,u,f,w,A,L),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,h=v;m<h;m+=3){const S=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);r=Yr(this,o,t,n,c,u,f,S,y,_),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=p.length;g<v;g++){const m=p[g],h=o[m.materialIndex],S=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=S,I=y;_<I;_+=3){const w=_,A=_+1,L=_+2;r=Yr(this,h,t,n,c,u,f,w,A,L),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,h=v;m<h;m+=3){const S=m,y=m+1,_=m+2;r=Yr(this,o,t,n,c,u,f,S,y,_),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function yh(i,t,e,n,r,s,o,a){let l;if(t.side===We?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===Rn,a),l===null)return null;Xr.copy(a),Xr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Xr);return c<e.near||c>e.far?null:{distance:c,point:Xr.clone(),object:i}}function Yr(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,Gr),i.getVertexPosition(l,kr),i.getVertexPosition(c,Vr);const u=yh(i,t,e,n,Gr,kr,Vr,il);if(u){const f=new R;tn.getBarycoord(il,Gr,kr,Vr,f),r&&(u.uv=tn.getInterpolatedAttribute(r,a,l,c,f,new wt)),s&&(u.uv1=tn.getInterpolatedAttribute(s,a,l,c,f,new wt)),o&&(u.normal=tn.getInterpolatedAttribute(o,a,l,c,f,new R),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new R,materialIndex:0};tn.getNormal(Gr,kr,Vr,p.normal),u.face=p,u.barycoord=f}return u}class Xn extends Ee{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let p=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function g(v,m,h,S,y,_,I,w,A,L,E){const x=_/A,C=I/L,B=_/2,G=I/2,$=w/2,K=A+1,Z=L+1;let it=0,Y=0;const ft=new R;for(let mt=0;mt<Z;mt++){const yt=mt*C-G;for(let pt=0;pt<K;pt++){const jt=pt*x-B;ft[v]=jt*S,ft[m]=yt*y,ft[h]=$,c.push(ft.x,ft.y,ft.z),ft[v]=0,ft[m]=0,ft[h]=w>0?1:-1,u.push(ft.x,ft.y,ft.z),f.push(pt/A),f.push(1-mt/L),it+=1}}for(let mt=0;mt<L;mt++)for(let yt=0;yt<A;yt++){const pt=p+yt+K*mt,jt=p+yt+K*(mt+1),j=p+(yt+1)+K*(mt+1),at=p+(yt+1)+K*mt;l.push(pt,jt,at),l.push(jt,j,at),Y+=6}a.addGroup(d,Y,E),d+=Y,p+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function ze(i){const t={};for(let e=0;e<i.length;e++){const n=Xi(i[e]);for(const r in n)t[r]=n[r]}return t}function Sh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ec(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Eh={clone:Xi,merge:ze};var bh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends di{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bh,this.fragmentShader=wh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=Sh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class bc extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new R,rl=new wt,sl=new wt;class Ke extends bc{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=yr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(gr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yr*2*Math.atan(Math.tan(gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z)}getViewSize(t,e){return this.getViewBounds(t,rl,sl),e.subVectors(sl,rl)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(gr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ai=-90,Ri=1;class Th extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ke(Ai,Ri,t,e);r.layers=this.layers,this.add(r);const s=new Ke(Ai,Ri,t,e);s.layers=this.layers,this.add(s);const o=new Ke(Ai,Ri,t,e);o.layers=this.layers,this.add(o);const a=new Ke(Ai,Ri,t,e);a.layers=this.layers,this.add(a);const l=new Ke(Ai,Ri,t,e);l.layers=this.layers,this.add(l);const c=new Ke(Ai,Ri,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===wn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,p,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wc extends Fe{constructor(t,e,n,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ah extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new wc(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:en}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Xn(5,5,5),s=new Pn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:We,blending:Vn});s.uniforms.tEquirect.value=e;const o=new me(r,s),a=e.minFilter;return e.minFilter===ri&&(e.minFilter=en),new Th(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const $s=new R,Rh=new R,Ch=new qt;class Qn{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=$s.subVectors(n,e).cross(Rh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta($s),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ch.getNormalMatrix(t),r=this.coplanarPoint($s).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Kn=new Ji,qr=new R;class ga{constructor(t=new Qn,e=new Qn,n=new Qn,r=new Qn,s=new Qn,o=new Qn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wn){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],p=r[7],d=r[8],g=r[9],v=r[10],m=r[11],h=r[12],S=r[13],y=r[14],_=r[15];if(n[0].setComponents(l-s,p-c,m-d,_-h).normalize(),n[1].setComponents(l+s,p+c,m+d,_+h).normalize(),n[2].setComponents(l+o,p+u,m+g,_+S).normalize(),n[3].setComponents(l-o,p-u,m-g,_-S).normalize(),n[4].setComponents(l-a,p-f,m-v,_-y).normalize(),e===wn)n[5].setComponents(l+a,p+f,m+v,_+y).normalize();else if(e===ms)n[5].setComponents(a,f,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Kn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Kn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Kn)}intersectsSprite(t){return Kn.center.set(0,0,0),Kn.radius=.7071067811865476,Kn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Kn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(qr.x=r.normal.x>0?t.max.x:t.min.x,qr.y=r.normal.y>0?t.max.y:t.min.y,qr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Tc(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Ph(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let p=0;for(let d=1;d<f.length;d++){const g=f[p],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++p,f[p]=v)}f.length=p+1;for(let d=0,g=f.length;d<g;d++){const v=f[d];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class Ye extends Ee{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,f=t/a,p=e/l,d=[],g=[],v=[],m=[];for(let h=0;h<u;h++){const S=h*p-o;for(let y=0;y<c;y++){const _=y*f-s;g.push(_,-S,0),v.push(0,0,1),m.push(y/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let S=0;S<a;S++){const y=S+c*h,_=S+c*(h+1),I=S+1+c*(h+1),w=S+1+c*h;d.push(y,_,w),d.push(_,I,w)}this.setIndex(d),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ye(t.width,t.height,t.widthSegments,t.heightSegments)}}var Lh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ih=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Oh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Hh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,tf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ef=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lf="gl_FragColor = linearToOutputTexel( gl_FragColor );",cf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,df=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ef=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,wf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Pf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,If=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Df=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Uf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Of=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ff=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$f=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,td=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,id=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,rd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,od=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ad=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ld=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ud=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,pd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,md=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,_d=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Md=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,yd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ed=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,wd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Td=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ld=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Id=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ud=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Od=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,zd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Gd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Yd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$d=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Kd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,np=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,op=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ap=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,cp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:Lh,alphahash_pars_fragment:Ih,alphamap_fragment:Dh,alphamap_pars_fragment:Uh,alphatest_fragment:Nh,alphatest_pars_fragment:Oh,aomap_fragment:Fh,aomap_pars_fragment:Bh,batching_pars_vertex:zh,batching_vertex:Hh,begin_vertex:Gh,beginnormal_vertex:kh,bsdfs:Vh,iridescence_fragment:Wh,bumpmap_pars_fragment:Xh,clipping_planes_fragment:Yh,clipping_planes_pars_fragment:qh,clipping_planes_pars_vertex:Zh,clipping_planes_vertex:$h,color_fragment:Kh,color_pars_fragment:Jh,color_pars_vertex:jh,color_vertex:Qh,common:tf,cube_uv_reflection_fragment:ef,defaultnormal_vertex:nf,displacementmap_pars_vertex:rf,displacementmap_vertex:sf,emissivemap_fragment:of,emissivemap_pars_fragment:af,colorspace_fragment:lf,colorspace_pars_fragment:cf,envmap_fragment:uf,envmap_common_pars_fragment:hf,envmap_pars_fragment:ff,envmap_pars_vertex:df,envmap_physical_pars_fragment:bf,envmap_vertex:pf,fog_vertex:mf,fog_pars_vertex:gf,fog_fragment:_f,fog_pars_fragment:vf,gradientmap_pars_fragment:Mf,lightmap_pars_fragment:xf,lights_lambert_fragment:yf,lights_lambert_pars_fragment:Sf,lights_pars_begin:Ef,lights_toon_fragment:wf,lights_toon_pars_fragment:Tf,lights_phong_fragment:Af,lights_phong_pars_fragment:Rf,lights_physical_fragment:Cf,lights_physical_pars_fragment:Pf,lights_fragment_begin:Lf,lights_fragment_maps:If,lights_fragment_end:Df,logdepthbuf_fragment:Uf,logdepthbuf_pars_fragment:Nf,logdepthbuf_pars_vertex:Of,logdepthbuf_vertex:Ff,map_fragment:Bf,map_pars_fragment:zf,map_particle_fragment:Hf,map_particle_pars_fragment:Gf,metalnessmap_fragment:kf,metalnessmap_pars_fragment:Vf,morphinstance_vertex:Wf,morphcolor_vertex:Xf,morphnormal_vertex:Yf,morphtarget_pars_vertex:qf,morphtarget_vertex:Zf,normal_fragment_begin:$f,normal_fragment_maps:Kf,normal_pars_fragment:Jf,normal_pars_vertex:jf,normal_vertex:Qf,normalmap_pars_fragment:td,clearcoat_normal_fragment_begin:ed,clearcoat_normal_fragment_maps:nd,clearcoat_pars_fragment:id,iridescence_pars_fragment:rd,opaque_fragment:sd,packing:od,premultiplied_alpha_fragment:ad,project_vertex:ld,dithering_fragment:cd,dithering_pars_fragment:ud,roughnessmap_fragment:hd,roughnessmap_pars_fragment:fd,shadowmap_pars_fragment:dd,shadowmap_pars_vertex:pd,shadowmap_vertex:md,shadowmask_pars_fragment:gd,skinbase_vertex:_d,skinning_pars_vertex:vd,skinning_vertex:Md,skinnormal_vertex:xd,specularmap_fragment:yd,specularmap_pars_fragment:Sd,tonemapping_fragment:Ed,tonemapping_pars_fragment:bd,transmission_fragment:wd,transmission_pars_fragment:Td,uv_pars_fragment:Ad,uv_pars_vertex:Rd,uv_vertex:Cd,worldpos_vertex:Pd,background_vert:Ld,background_frag:Id,backgroundCube_vert:Dd,backgroundCube_frag:Ud,cube_vert:Nd,cube_frag:Od,depth_vert:Fd,depth_frag:Bd,distanceRGBA_vert:zd,distanceRGBA_frag:Hd,equirect_vert:Gd,equirect_frag:kd,linedashed_vert:Vd,linedashed_frag:Wd,meshbasic_vert:Xd,meshbasic_frag:Yd,meshlambert_vert:qd,meshlambert_frag:Zd,meshmatcap_vert:$d,meshmatcap_frag:Kd,meshnormal_vert:Jd,meshnormal_frag:jd,meshphong_vert:Qd,meshphong_frag:tp,meshphysical_vert:ep,meshphysical_frag:np,meshtoon_vert:ip,meshtoon_frag:rp,points_vert:sp,points_frag:op,shadow_vert:ap,shadow_frag:lp,sprite_vert:cp,sprite_frag:up},_t={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},fn={basic:{uniforms:ze([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:ze([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:ze([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:ze([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:ze([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:ze([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:ze([_t.points,_t.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:ze([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:ze([_t.common,_t.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:ze([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:ze([_t.sprite,_t.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:ze([_t.common,_t.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:ze([_t.lights,_t.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};fn.physical={uniforms:ze([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Zr={r:0,b:0,g:0},Jn=new gn,hp=new ce;function fp(i,t,e,n,r,s,o){const a=new Ft(0);let l=s===!0?0:1,c,u,f=null,p=0,d=null;function g(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?e:t).get(y)),y}function v(S){let y=!1;const _=g(S);_===null?h(a,l):_&&_.isColor&&(h(_,1),y=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,y){const _=g(y);_&&(_.isCubeTexture||_.mapping===Es)?(u===void 0&&(u=new me(new Xn(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Xi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Jn.copy(y.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(hp.makeRotationFromEuler(Jn)),u.material.toneMapped=ee.getTransfer(_.colorSpace)!==fe,(f!==_||p!==_.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=_,p=_.version,d=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new me(new Ye(2,2),new Pn({name:"BackgroundMaterial",uniforms:Xi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ee.getTransfer(_.colorSpace)!==fe,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(f!==_||p!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=_,p=_.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function h(S,y){S.getRGB(Zr,Ec(i)),n.buffers.color.setClear(Zr.r,Zr.g,Zr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(S,y=1){a.set(S),l=y,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,h(a,l)},render:v,addToRenderList:m}}function dp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,o=!1;function a(x,C,B,G,$){let K=!1;const Z=f(G,B,C);s!==Z&&(s=Z,c(s.object)),K=d(x,G,B,$),K&&g(x,G,B,$),$!==null&&t.update($,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,_(x,C,B,G),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function f(x,C,B){const G=B.wireframe===!0;let $=n[x.id];$===void 0&&($={},n[x.id]=$);let K=$[C.id];K===void 0&&(K={},$[C.id]=K);let Z=K[G];return Z===void 0&&(Z=p(l()),K[G]=Z),Z}function p(x){const C=[],B=[],G=[];for(let $=0;$<e;$++)C[$]=0,B[$]=0,G[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:B,attributeDivisors:G,object:x,attributes:{},index:null}}function d(x,C,B,G){const $=s.attributes,K=C.attributes;let Z=0;const it=B.getAttributes();for(const Y in it)if(it[Y].location>=0){const mt=$[Y];let yt=K[Y];if(yt===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(yt=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(yt=x.instanceColor)),mt===void 0||mt.attribute!==yt||yt&&mt.data!==yt.data)return!0;Z++}return s.attributesNum!==Z||s.index!==G}function g(x,C,B,G){const $={},K=C.attributes;let Z=0;const it=B.getAttributes();for(const Y in it)if(it[Y].location>=0){let mt=K[Y];mt===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(mt=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(mt=x.instanceColor));const yt={};yt.attribute=mt,mt&&mt.data&&(yt.data=mt.data),$[Y]=yt,Z++}s.attributes=$,s.attributesNum=Z,s.index=G}function v(){const x=s.newAttributes;for(let C=0,B=x.length;C<B;C++)x[C]=0}function m(x){h(x,0)}function h(x,C){const B=s.newAttributes,G=s.enabledAttributes,$=s.attributeDivisors;B[x]=1,G[x]===0&&(i.enableVertexAttribArray(x),G[x]=1),$[x]!==C&&(i.vertexAttribDivisor(x,C),$[x]=C)}function S(){const x=s.newAttributes,C=s.enabledAttributes;for(let B=0,G=C.length;B<G;B++)C[B]!==x[B]&&(i.disableVertexAttribArray(B),C[B]=0)}function y(x,C,B,G,$,K,Z){Z===!0?i.vertexAttribIPointer(x,C,B,$,K):i.vertexAttribPointer(x,C,B,G,$,K)}function _(x,C,B,G){v();const $=G.attributes,K=B.getAttributes(),Z=C.defaultAttributeValues;for(const it in K){const Y=K[it];if(Y.location>=0){let ft=$[it];if(ft===void 0&&(it==="instanceMatrix"&&x.instanceMatrix&&(ft=x.instanceMatrix),it==="instanceColor"&&x.instanceColor&&(ft=x.instanceColor)),ft!==void 0){const mt=ft.normalized,yt=ft.itemSize,pt=t.get(ft);if(pt===void 0)continue;const jt=pt.buffer,j=pt.type,at=pt.bytesPerElement,St=j===i.INT||j===i.UNSIGNED_INT||ft.gpuType===oa;if(ft.isInterleavedBufferAttribute){const dt=ft.data,Ut=dt.stride,et=ft.offset;if(dt.isInstancedInterleavedBuffer){for(let vt=0;vt<Y.locationSize;vt++)h(Y.location+vt,dt.meshPerAttribute);x.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let vt=0;vt<Y.locationSize;vt++)m(Y.location+vt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let vt=0;vt<Y.locationSize;vt++)y(Y.location+vt,yt/Y.locationSize,j,mt,Ut*at,(et+yt/Y.locationSize*vt)*at,St)}else{if(ft.isInstancedBufferAttribute){for(let dt=0;dt<Y.locationSize;dt++)h(Y.location+dt,ft.meshPerAttribute);x.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let dt=0;dt<Y.locationSize;dt++)m(Y.location+dt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let dt=0;dt<Y.locationSize;dt++)y(Y.location+dt,yt/Y.locationSize,j,mt,yt*at,yt/Y.locationSize*dt*at,St)}}else if(Z!==void 0){const mt=Z[it];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(Y.location,mt);break;case 3:i.vertexAttrib3fv(Y.location,mt);break;case 4:i.vertexAttrib4fv(Y.location,mt);break;default:i.vertexAttrib1fv(Y.location,mt)}}}}S()}function I(){L();for(const x in n){const C=n[x];for(const B in C){const G=C[B];for(const $ in G)u(G[$].object),delete G[$];delete C[B]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const C=n[x.id];for(const B in C){const G=C[B];for(const $ in G)u(G[$].object),delete G[$];delete C[B]}delete n[x.id]}function A(x){for(const C in n){const B=n[C];if(B[x.id]===void 0)continue;const G=B[x.id];for(const $ in G)u(G[$].object),delete G[$];delete B[x.id]}}function L(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:E,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function pp(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),e.update(u,n,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,n,1)}function l(c,u,f,p){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],p[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,p,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v]*p[v];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function mp(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==nn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===br&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Cn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==pn&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:I,maxSamples:w}}function gp(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Qn,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const d=f.length!==0||p||n!==0||r;return r=p,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,p){e=u(f,p,0)},this.setState=function(f,p,d){const g=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,h=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const S=s?0:n,y=S*4;let _=h.clippingState||null;l.value=_,_=u(g,p,y,d);for(let I=0;I!==y;++I)_[I]=e[I];h.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,p,d,g){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const h=d+v*4,S=p.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<h)&&(m=new Float32Array(h));for(let y=0,_=d;y!==v;++y,_+=4)o.copy(f[y]).applyMatrix4(S,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function _p(i){let t=new WeakMap;function e(o,a){return a===bo?o.mapping=Gi:a===wo&&(o.mapping=ki),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===bo||a===wo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ah(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Ac extends bc{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Oi=4,ol=[.125,.215,.35,.446,.526,.582],ni=20,Ks=new Ac,al=new Ft;let Js=null,js=0,Qs=0,to=!1;const ti=(1+Math.sqrt(5))/2,Ci=1/ti,ll=[new R(-ti,Ci,0),new R(ti,Ci,0),new R(-Ci,0,ti),new R(Ci,0,ti),new R(0,ti,-Ci),new R(0,ti,Ci),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)];class cl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Js=this._renderer.getRenderTarget(),js=this._renderer.getActiveCubeFace(),Qs=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Js,js,Qs),this._renderer.xr.enabled=to,t.scissorTest=!1,$r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Js=this._renderer.getRenderTarget(),js=this._renderer.getActiveCubeFace(),Qs=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:br,format:nn,colorSpace:$i,depthBuffer:!1},r=ul(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ul(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vp(s)),this._blurMaterial=Mp(s,t,e)}return r}_compileMaterial(t){const e=new me(this._lodPlanes[0],t);this._renderer.compile(e,Ks)}_sceneToCubeUV(t,e,n,r){const a=new Ke(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(al),u.toneMapping=Wn,u.autoClear=!1;const d=new Sr({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new me(new Xn,d);let v=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(al),v=!0);for(let h=0;h<6;h++){const S=h%3;S===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):S===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const y=this._cubeSize;$r(r,S*y,h>2?y:0,y,y),u.setRenderTarget(r),v&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Gi||t.mapping===ki;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new me(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;$r(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ks)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ll[(r-s-1)%ll.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new me(this._lodPlanes[r],c),p=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ni-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):ni;m>ni&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ni}`);const h=[];let S=0;for(let A=0;A<ni;++A){const L=A/v,E=Math.exp(-L*L/2);h.push(E),A===0?S+=E:A<m&&(S+=2*E)}for(let A=0;A<h.length;A++)h[A]=h[A]/S;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=h,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:y}=this;p.dTheta.value=g,p.mipInt.value=y-n;const _=this._sizeLods[r],I=3*_*(r>y-Oi?r-y+Oi:0),w=4*(this._cubeSize-_);$r(e,I,w,3*_,2*_),l.setRenderTarget(e),l.render(f,Ks)}}function vp(i){const t=[],e=[],n=[];let r=i;const s=i-Oi+1+ol.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-Oi?l=ol[o-i+Oi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,p=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,v=3,m=2,h=1,S=new Float32Array(v*g*d),y=new Float32Array(m*g*d),_=new Float32Array(h*g*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,L=w>2?0:-1,E=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];S.set(E,v*g*w),y.set(p,m*g*w);const x=[w,w,w,w,w,w];_.set(x,h*g*w)}const I=new Ee;I.setAttribute("position",new Ge(S,v)),I.setAttribute("uv",new Ge(y,m)),I.setAttribute("faceIndex",new Ge(_,h)),t.push(I),r>Oi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ul(i,t,e){const n=new ci(i,t,e);return n.texture.mapping=Es,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $r(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Mp(i,t,e){const n=new Float32Array(ni),r=new R(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function hl(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function fl(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function _a(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===bo||l===wo,u=l===Gi||l===ki;if(c||u){let f=t.get(a);const p=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new cl(i)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new cl(i)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function yp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&pr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Sp(i,t,e,n){const r={},s=new WeakMap;function o(f){const p=f.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);for(const g in p.morphAttributes){const v=p.morphAttributes[g];for(let m=0,h=v.length;m<h;m++)t.remove(v[m])}p.removeEventListener("dispose",o),delete r[p.id];const d=s.get(p);d&&(t.remove(d),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(f,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,e.memory.geometries++),p}function l(f){const p=f.attributes;for(const g in p)t.update(p[g],i.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const v=d[g];for(let m=0,h=v.length;m<h;m++)t.update(v[m],i.ARRAY_BUFFER)}}function c(f){const p=[],d=f.index,g=f.attributes.position;let v=0;if(d!==null){const S=d.array;v=d.version;for(let y=0,_=S.length;y<_;y+=3){const I=S[y+0],w=S[y+1],A=S[y+2];p.push(I,w,w,A,A,I)}}else if(g!==void 0){const S=g.array;v=g.version;for(let y=0,_=S.length/3-1;y<_;y+=3){const I=y+0,w=y+1,A=y+2;p.push(I,w,w,A,A,I)}}else return;const m=new(_c(p)?Sc:yc)(p,1);m.version=v;const h=s.get(f);h&&t.remove(h),s.set(f,m)}function u(f){const p=s.get(f);if(p){const d=f.index;d!==null&&p.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function Ep(i,t,e){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,d){i.drawElements(n,d,s,p*o),e.update(d,n,1)}function c(p,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,p*o,g),e.update(d,n,g))}function u(p,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,p,0,g);let m=0;for(let h=0;h<g;h++)m+=d[h];e.update(m,n,1)}function f(p,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<p.length;h++)c(p[h]/o,d[h],v[h]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,p,0,v,0,g);let h=0;for(let S=0;S<g;S++)h+=d[S]*v[S];e.update(h,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function bp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function wp(i,t,e){const n=new WeakMap,r=new he;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let p=n.get(a);if(p===void 0||p.count!==f){let x=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;p!==void 0&&p.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let I=a.attributes.position.count*_,w=1;I>t.maxTextureSize&&(w=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const A=new Float32Array(I*w*4*f),L=new Mc(A,I,w,f);L.type=pn,L.needsUpdate=!0;const E=_*4;for(let C=0;C<f;C++){const B=h[C],G=S[C],$=y[C],K=I*w*4*C;for(let Z=0;Z<B.count;Z++){const it=Z*E;g===!0&&(r.fromBufferAttribute(B,Z),A[K+it+0]=r.x,A[K+it+1]=r.y,A[K+it+2]=r.z,A[K+it+3]=0),v===!0&&(r.fromBufferAttribute(G,Z),A[K+it+4]=r.x,A[K+it+5]=r.y,A[K+it+6]=r.z,A[K+it+7]=0),m===!0&&(r.fromBufferAttribute($,Z),A[K+it+8]=r.x,A[K+it+9]=r.y,A[K+it+10]=r.z,A[K+it+11]=$.itemSize===4?r.w:1)}}p={count:f,texture:L,size:new wt(I,w)},n.set(a,p),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function Tp(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Rc extends Fe{constructor(t,e,n,r,s,o,a,l,c,u=Bi){if(u!==Bi&&u!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Bi&&(n=li),n===void 0&&u===Wi&&(n=Vi),super(null,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=l!==void 0?l:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Cc=new Fe,dl=new Rc(1,1),Pc=new Mc,Lc=new hh,Ic=new wc,pl=[],ml=[],gl=new Float32Array(16),_l=new Float32Array(9),vl=new Float32Array(4);function ji(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=pl[r];if(s===void 0&&(s=new Float32Array(r),pl[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ws(i,t){let e=ml[t];e===void 0&&(e=new Int32Array(t),ml[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ap(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Rp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function Cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function Pp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function Lp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;vl.set(n),i.uniformMatrix2fv(this.addr,!1,vl),Ce(e,n)}}function Ip(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;_l.set(n),i.uniformMatrix3fv(this.addr,!1,_l),Ce(e,n)}}function Dp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;gl.set(n),i.uniformMatrix4fv(this.addr,!1,gl),Ce(e,n)}}function Up(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Np(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function Op(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function Fp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function Bp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function zp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function Hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function Gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function kp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(dl.compareFunction=gc,s=dl):s=Cc,e.setTexture2D(t||s,r)}function Vp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Lc,r)}function Wp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Ic,r)}function Xp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Pc,r)}function Yp(i){switch(i){case 5126:return Ap;case 35664:return Rp;case 35665:return Cp;case 35666:return Pp;case 35674:return Lp;case 35675:return Ip;case 35676:return Dp;case 5124:case 35670:return Up;case 35667:case 35671:return Np;case 35668:case 35672:return Op;case 35669:case 35673:return Fp;case 5125:return Bp;case 36294:return zp;case 36295:return Hp;case 36296:return Gp;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Vp;case 35680:case 36300:case 36308:case 36293:return Wp;case 36289:case 36303:case 36311:case 36292:return Xp}}function qp(i,t){i.uniform1fv(this.addr,t)}function Zp(i,t){const e=ji(t,this.size,2);i.uniform2fv(this.addr,e)}function $p(i,t){const e=ji(t,this.size,3);i.uniform3fv(this.addr,e)}function Kp(i,t){const e=ji(t,this.size,4);i.uniform4fv(this.addr,e)}function Jp(i,t){const e=ji(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function jp(i,t){const e=ji(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Qp(i,t){const e=ji(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function tm(i,t){i.uniform1iv(this.addr,t)}function em(i,t){i.uniform2iv(this.addr,t)}function nm(i,t){i.uniform3iv(this.addr,t)}function im(i,t){i.uniform4iv(this.addr,t)}function rm(i,t){i.uniform1uiv(this.addr,t)}function sm(i,t){i.uniform2uiv(this.addr,t)}function om(i,t){i.uniform3uiv(this.addr,t)}function am(i,t){i.uniform4uiv(this.addr,t)}function lm(i,t,e){const n=this.cache,r=t.length,s=ws(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Cc,s[o])}function cm(i,t,e){const n=this.cache,r=t.length,s=ws(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Lc,s[o])}function um(i,t,e){const n=this.cache,r=t.length,s=ws(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Ic,s[o])}function hm(i,t,e){const n=this.cache,r=t.length,s=ws(e,r);Re(n,s)||(i.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Pc,s[o])}function fm(i){switch(i){case 5126:return qp;case 35664:return Zp;case 35665:return $p;case 35666:return Kp;case 35674:return Jp;case 35675:return jp;case 35676:return Qp;case 5124:case 35670:return tm;case 35667:case 35671:return em;case 35668:case 35672:return nm;case 35669:case 35673:return im;case 5125:return rm;case 36294:return sm;case 36295:return om;case 36296:return am;case 35678:case 36198:case 36298:case 36306:case 35682:return lm;case 35679:case 36299:case 36307:return cm;case 35680:case 36300:case 36308:case 36293:return um;case 36289:case 36303:case 36311:case 36292:return hm}}class dm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Yp(e.type)}}class pm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fm(e.type)}}class mm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const eo=/(\w+)(\])?(\[|\.)?/g;function Ml(i,t){i.seq.push(t),i.map[t.id]=t}function gm(i,t,e){const n=i.name,r=n.length;for(eo.lastIndex=0;;){const s=eo.exec(n),o=eo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Ml(e,c===void 0?new dm(a,i,t):new pm(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new mm(a),Ml(e,f)),e=f}}}class ds{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);gm(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function xl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const _m=37297;let vm=0;function Mm(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const yl=new qt;function xm(i){ee._getMatrix(yl,ee.workingColorSpace,i);const t=`mat3( ${yl.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case bs:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Mm(i.getShaderSource(t),o)}else return r}function ym(i,t){const e=xm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Sm(i,t){let e;switch(t){case bu:e="Linear";break;case wu:e="Reinhard";break;case Tu:e="Cineon";break;case rc:e="ACESFilmic";break;case Ru:e="AgX";break;case Cu:e="Neutral";break;case Au:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Kr=new R;function Em(){ee.getLuminanceCoefficients(Kr);const i=Kr.x.toFixed(4),t=Kr.y.toFixed(4),e=Kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function wm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Tm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function mr(i){return i!==""}function El(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Am=/^[ \t]*#include +<([\w\d./]+)>/gm;function ta(i){return i.replace(Am,Cm)}const Rm=new Map;function Cm(i,t){let e=Zt[t];if(e===void 0){const n=Rm.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ta(e)}const Pm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wl(i){return i.replace(Pm,Lm)}function Lm(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Tl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Im(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ec?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===nc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function Dm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Gi:case ki:t="ENVMAP_TYPE_CUBE";break;case Es:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Um(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ki:t="ENVMAP_MODE_REFRACTION";break}return t}function Nm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ic:t="ENVMAP_BLENDING_MULTIPLY";break;case Su:t="ENVMAP_BLENDING_MIX";break;case Eu:t="ENVMAP_BLENDING_ADD";break}return t}function Om(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Fm(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Im(e),c=Dm(e),u=Um(e),f=Nm(e),p=Om(e),d=bm(e),g=wm(s),v=r.createProgram();let m,h,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(mr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(mr).join(`
`),h.length>0&&(h+=`
`)):(m=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),h=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Wn?Sm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,ym("linearToOutputTexel",e.outputColorSpace),Em(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(mr).join(`
`)),o=ta(o),o=El(o,e),o=bl(o,e),a=ta(a),a=El(a,e),a=bl(a,e),o=wl(o),a=wl(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===Ba?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ba?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const y=S+m+o,_=S+h+a,I=xl(r,r.VERTEX_SHADER,y),w=xl(r,r.FRAGMENT_SHADER,_);r.attachShader(v,I),r.attachShader(v,w),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(C){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(v).trim(),G=r.getShaderInfoLog(I).trim(),$=r.getShaderInfoLog(w).trim();let K=!0,Z=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,I,w);else{const it=Sl(r,I,"vertex"),Y=Sl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+it+`
`+Y)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(G===""||$==="")&&(Z=!1);Z&&(C.diagnostics={runnable:K,programLog:B,vertexShader:{log:G,prefix:m},fragmentShader:{log:$,prefix:h}})}r.deleteShader(I),r.deleteShader(w),L=new ds(r,v),E=Tm(r,v)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(v,_m)),x},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=w,this}let Bm=0;class zm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Hm(t),e.set(t,n)),n}}class Hm{constructor(t){this.id=Bm++,this.code=t,this.usedTimes=0}}function Gm(i,t,e,n,r,s,o){const a=new ma,l=new zm,c=new Set,u=[],f=r.logarithmicDepthBuffer,p=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,x,C,B,G){const $=B.fog,K=G.geometry,Z=E.isMeshStandardMaterial?B.environment:null,it=(E.isMeshStandardMaterial?e:t).get(E.envMap||Z),Y=it&&it.mapping===Es?it.image.height:null,ft=g[E.type];E.precision!==null&&(d=r.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const mt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,yt=mt!==void 0?mt.length:0;let pt=0;K.morphAttributes.position!==void 0&&(pt=1),K.morphAttributes.normal!==void 0&&(pt=2),K.morphAttributes.color!==void 0&&(pt=3);let jt,j,at,St;if(ft){const te=fn[ft];jt=te.vertexShader,j=te.fragmentShader}else jt=E.vertexShader,j=E.fragmentShader,l.update(E),at=l.getVertexShaderID(E),St=l.getFragmentShaderID(E);const dt=i.getRenderTarget(),Ut=i.state.buffers.depth.getReversed(),et=G.isInstancedMesh===!0,vt=G.isBatchedMesh===!0,Ht=!!E.map,zt=!!E.matcap,Xt=!!it,U=!!E.aoMap,Nt=!!E.lightMap,Et=!!E.bumpMap,Ot=!!E.normalMap,Tt=!!E.displacementMap,Qt=!!E.emissiveMap,It=!!E.metalnessMap,T=!!E.roughnessMap,M=E.anisotropy>0,k=E.clearcoat>0,nt=E.dispersion>0,st=E.iridescence>0,Q=E.sheen>0,Rt=E.transmission>0,P=M&&!!E.anisotropyMap,z=k&&!!E.clearcoatMap,rt=k&&!!E.clearcoatNormalMap,q=k&&!!E.clearcoatRoughnessMap,J=st&&!!E.iridescenceMap,tt=st&&!!E.iridescenceThicknessMap,ot=Q&&!!E.sheenColorMap,ct=Q&&!!E.sheenRoughnessMap,bt=!!E.specularMap,At=!!E.specularColorMap,Vt=!!E.specularIntensityMap,N=Rt&&!!E.transmissionMap,lt=Rt&&!!E.thicknessMap,D=!!E.gradientMap,V=!!E.alphaMap,gt=E.alphaTest>0,ht=!!E.alphaHash,Gt=!!E.extensions;let oe=Wn;E.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(oe=i.toneMapping);const _e={shaderID:ft,shaderType:E.type,shaderName:E.name,vertexShader:jt,fragmentShader:j,defines:E.defines,customVertexShaderID:at,customFragmentShaderID:St,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:vt,batchingColor:vt&&G._colorsTexture!==null,instancing:et,instancingColor:et&&G.instanceColor!==null,instancingMorph:et&&G.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:dt===null?i.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:$i,alphaToCoverage:!!E.alphaToCoverage,map:Ht,matcap:zt,envMap:Xt,envMapMode:Xt&&it.mapping,envMapCubeUVHeight:Y,aoMap:U,lightMap:Nt,bumpMap:Et,normalMap:Ot,displacementMap:p&&Tt,emissiveMap:Qt,normalMapObjectSpace:Ot&&E.normalMapType===Du,normalMapTangentSpace:Ot&&E.normalMapType===mc,metalnessMap:It,roughnessMap:T,anisotropy:M,anisotropyMap:P,clearcoat:k,clearcoatMap:z,clearcoatNormalMap:rt,clearcoatRoughnessMap:q,dispersion:nt,iridescence:st,iridescenceMap:J,iridescenceThicknessMap:tt,sheen:Q,sheenColorMap:ot,sheenRoughnessMap:ct,specularMap:bt,specularColorMap:At,specularIntensityMap:Vt,transmission:Rt,transmissionMap:N,thicknessMap:lt,gradientMap:D,opaque:E.transparent===!1&&E.blending===Fi&&E.alphaToCoverage===!1,alphaMap:V,alphaTest:gt,alphaHash:ht,combine:E.combine,mapUv:Ht&&v(E.map.channel),aoMapUv:U&&v(E.aoMap.channel),lightMapUv:Nt&&v(E.lightMap.channel),bumpMapUv:Et&&v(E.bumpMap.channel),normalMapUv:Ot&&v(E.normalMap.channel),displacementMapUv:Tt&&v(E.displacementMap.channel),emissiveMapUv:Qt&&v(E.emissiveMap.channel),metalnessMapUv:It&&v(E.metalnessMap.channel),roughnessMapUv:T&&v(E.roughnessMap.channel),anisotropyMapUv:P&&v(E.anisotropyMap.channel),clearcoatMapUv:z&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:rt&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:q&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:ot&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:ct&&v(E.sheenRoughnessMap.channel),specularMapUv:bt&&v(E.specularMap.channel),specularColorMapUv:At&&v(E.specularColorMap.channel),specularIntensityMapUv:Vt&&v(E.specularIntensityMap.channel),transmissionMapUv:N&&v(E.transmissionMap.channel),thicknessMapUv:lt&&v(E.thicknessMap.channel),alphaMapUv:V&&v(E.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(Ot||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!K.attributes.uv&&(Ht||V),fog:!!$,useFog:E.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Ut,skinning:G.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:pt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:oe,decodeVideoTexture:Ht&&E.map.isVideoTexture===!0&&ee.getTransfer(E.map.colorSpace)===fe,decodeVideoTextureEmissive:Qt&&E.emissiveMap.isVideoTexture===!0&&ee.getTransfer(E.emissiveMap.colorSpace)===fe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===De,flipSided:E.side===We,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Gt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&E.extensions.multiDraw===!0||vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return _e.vertexUv1s=c.has(1),_e.vertexUv2s=c.has(2),_e.vertexUv3s=c.has(3),c.clear(),_e}function h(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const C in E.defines)x.push(C),x.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(S(x,E),y(x,E),x.push(i.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function S(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function y(E,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){const x=g[E.type];let C;if(x){const B=fn[x];C=Eh.clone(B.uniforms)}else C=E.uniforms;return C}function I(E,x){let C;for(let B=0,G=u.length;B<G;B++){const $=u[B];if($.cacheKey===x){C=$,++C.usedTimes;break}}return C===void 0&&(C=new Fm(i,x,E,s),u.push(C)),C}function w(E){if(--E.usedTimes===0){const x=u.indexOf(E);u[x]=u[u.length-1],u.pop(),E.destroy()}}function A(E){l.remove(E)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:_,acquireProgram:I,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:L}}function km(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Vm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Al(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Rl(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(f,p,d,g,v,m){let h=i[t];return h===void 0?(h={id:f.id,object:f,geometry:p,material:d,groupOrder:g,renderOrder:f.renderOrder,z:v,group:m},i[t]=h):(h.id=f.id,h.object=f,h.geometry=p,h.material=d,h.groupOrder=g,h.renderOrder=f.renderOrder,h.z=v,h.group=m),t++,h}function a(f,p,d,g,v,m){const h=o(f,p,d,g,v,m);d.transmission>0?n.push(h):d.transparent===!0?r.push(h):e.push(h)}function l(f,p,d,g,v,m){const h=o(f,p,d,g,v,m);d.transmission>0?n.unshift(h):d.transparent===!0?r.unshift(h):e.unshift(h)}function c(f,p){e.length>1&&e.sort(f||Vm),n.length>1&&n.sort(p||Al),r.length>1&&r.sort(p||Al)}function u(){for(let f=t,p=i.length;f<p;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Wm(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new Rl,i.set(n,[o])):r>=s.length?(o=new Rl,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Xm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Ft};break;case"SpotLight":e={position:new R,direction:new R,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Ym(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let qm=0;function Zm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $m(i){const t=new Xm,e=Ym(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);const r=new R,s=new ce,o=new ce;function a(c){let u=0,f=0,p=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,h=0,S=0,y=0,_=0,I=0,w=0,A=0;c.sort(Zm);for(let E=0,x=c.length;E<x;E++){const C=c[E],B=C.color,G=C.intensity,$=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=B.r*G,f+=B.g*G,p+=B.b*G;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(C.sh.coefficients[Z],G);A++}else if(C.isDirectionalLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const it=C.shadow,Y=e.get(C);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,n.directionalShadow[d]=Y,n.directionalShadowMap[d]=K,n.directionalShadowMatrix[d]=C.shadow.matrix,S++}n.directional[d]=Z,d++}else if(C.isSpotLight){const Z=t.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(B).multiplyScalar(G),Z.distance=$,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,n.spot[v]=Z;const it=C.shadow;if(C.map&&(n.spotLightMap[I]=C.map,I++,it.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[v]=it.matrix,C.castShadow){const Y=e.get(C);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=K,_++}v++}else if(C.isRectAreaLight){const Z=t.get(C);Z.color.copy(B).multiplyScalar(G),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=Z,m++}else if(C.isPointLight){const Z=t.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){const it=C.shadow,Y=e.get(C);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,Y.shadowCameraNear=it.camera.near,Y.shadowCameraFar=it.camera.far,n.pointShadow[g]=Y,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=Z,g++}else if(C.isHemisphereLight){const Z=t.get(C);Z.skyColor.copy(C.color).multiplyScalar(G),Z.groundColor.copy(C.groundColor).multiplyScalar(G),n.hemi[h]=Z,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=p;const L=n.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==h||L.numDirectionalShadows!==S||L.numPointShadows!==y||L.numSpotShadows!==_||L.numSpotMaps!==I||L.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+I-w,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,L.directionalLength=d,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=h,L.numDirectionalShadows=S,L.numPointShadows=y,L.numSpotShadows=_,L.numSpotMaps=I,L.numLightProbes=A,n.version=qm++)}function l(c,u){let f=0,p=0,d=0,g=0,v=0;const m=u.matrixWorldInverse;for(let h=0,S=c.length;h<S;h++){const y=c[h];if(y.isDirectionalLight){const _=n.directional[f];_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),f++}else if(y.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const _=n.point[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),p++}else if(y.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function Cl(i){const t=new $m(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Km(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Cl(i),t.set(r,[a])):s>=o.length?(a=new Cl(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Jm extends di{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Lu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class jm extends di{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function e0(i,t,e){let n=new ga;const r=new wt,s=new wt,o=new he,a=new Jm({depthPacking:Iu}),l=new jm,c={},u=e.maxTextureSize,f={[Rn]:We,[We]:Rn,[De]:De},p=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:Qm,fragmentShader:t0}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ee;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new me(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ec;let h=this.type;this.render=function(w,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Vn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const G=h!==bn&&this.type===bn,$=h===bn&&this.type!==bn;for(let K=0,Z=w.length;K<Z;K++){const it=w[K],Y=it.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const ft=Y.getFrameExtents();if(r.multiply(ft),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ft.x),r.x=s.x*ft.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ft.y),r.y=s.y*ft.y,Y.mapSize.y=s.y)),Y.map===null||G===!0||$===!0){const yt=this.type!==bn?{minFilter:Je,magFilter:Je}:{};Y.map!==null&&Y.map.dispose(),Y.map=new ci(r.x,r.y,yt),Y.map.texture.name=it.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const mt=Y.getViewportCount();for(let yt=0;yt<mt;yt++){const pt=Y.getViewport(yt);o.set(s.x*pt.x,s.y*pt.y,s.x*pt.z,s.y*pt.w),B.viewport(o),Y.updateMatrices(it,yt),n=Y.getFrustum(),_(A,L,Y.camera,it,this.type)}Y.isPointLightShadow!==!0&&this.type===bn&&S(Y,L),Y.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(E,x,C)};function S(w,A){const L=t.update(v);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ci(r.x,r.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,L,p,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,L,d,v,null)}function y(w,A,L,E){let x=null;const C=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)x=C;else if(x=L.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=x.uuid,G=A.uuid;let $=c[B];$===void 0&&($={},c[B]=$);let K=$[G];K===void 0&&(K=x.clone(),$[G]=K,A.addEventListener("dispose",I)),x=K}if(x.visible=A.visible,x.wireframe=A.wireframe,E===bn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:f[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,L.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=i.properties.get(x);B.light=L}return x}function _(w,A,L,E,x){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===bn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const G=t.update(w),$=w.material;if(Array.isArray($)){const K=G.groups;for(let Z=0,it=K.length;Z<it;Z++){const Y=K[Z],ft=$[Y.materialIndex];if(ft&&ft.visible){const mt=y(w,ft,E,x);w.onBeforeShadow(i,w,A,L,G,mt,Y),i.renderBufferDirect(L,null,G,mt,w,Y),w.onAfterShadow(i,w,A,L,G,mt,Y)}}}else if($.visible){const K=y(w,$,E,x);w.onBeforeShadow(i,w,A,L,G,K,null),i.renderBufferDirect(L,null,G,K,w,null),w.onAfterShadow(i,w,A,L,G,K,null)}}const B=w.children;for(let G=0,$=B.length;G<$;G++)_(B[G],A,L,E,x)}function I(w){w.target.removeEventListener("dispose",I);for(const L in c){const E=c[L],x=w.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const n0={[_o]:vo,[Mo]:So,[xo]:Eo,[Hi]:yo,[vo]:_o,[So]:Mo,[Eo]:xo,[yo]:Hi};function i0(i,t){function e(){let N=!1;const lt=new he;let D=null;const V=new he(0,0,0,0);return{setMask:function(gt){D!==gt&&!N&&(i.colorMask(gt,gt,gt,gt),D=gt)},setLocked:function(gt){N=gt},setClear:function(gt,ht,Gt,oe,_e){_e===!0&&(gt*=oe,ht*=oe,Gt*=oe),lt.set(gt,ht,Gt,oe),V.equals(lt)===!1&&(i.clearColor(gt,ht,Gt,oe),V.copy(lt))},reset:function(){N=!1,D=null,V.set(-1,0,0,0)}}}function n(){let N=!1,lt=!1,D=null,V=null,gt=null;return{setReversed:function(ht){if(lt!==ht){const Gt=t.get("EXT_clip_control");lt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const oe=gt;gt=null,this.setClear(oe)}lt=ht},getReversed:function(){return lt},setTest:function(ht){ht?dt(i.DEPTH_TEST):Ut(i.DEPTH_TEST)},setMask:function(ht){D!==ht&&!N&&(i.depthMask(ht),D=ht)},setFunc:function(ht){if(lt&&(ht=n0[ht]),V!==ht){switch(ht){case _o:i.depthFunc(i.NEVER);break;case vo:i.depthFunc(i.ALWAYS);break;case Mo:i.depthFunc(i.LESS);break;case Hi:i.depthFunc(i.LEQUAL);break;case xo:i.depthFunc(i.EQUAL);break;case yo:i.depthFunc(i.GEQUAL);break;case So:i.depthFunc(i.GREATER);break;case Eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}V=ht}},setLocked:function(ht){N=ht},setClear:function(ht){gt!==ht&&(lt&&(ht=1-ht),i.clearDepth(ht),gt=ht)},reset:function(){N=!1,D=null,V=null,gt=null,lt=!1}}}function r(){let N=!1,lt=null,D=null,V=null,gt=null,ht=null,Gt=null,oe=null,_e=null;return{setTest:function(te){N||(te?dt(i.STENCIL_TEST):Ut(i.STENCIL_TEST))},setMask:function(te){lt!==te&&!N&&(i.stencilMask(te),lt=te)},setFunc:function(te,sn,_n){(D!==te||V!==sn||gt!==_n)&&(i.stencilFunc(te,sn,_n),D=te,V=sn,gt=_n)},setOp:function(te,sn,_n){(ht!==te||Gt!==sn||oe!==_n)&&(i.stencilOp(te,sn,_n),ht=te,Gt=sn,oe=_n)},setLocked:function(te){N=te},setClear:function(te){_e!==te&&(i.clearStencil(te),_e=te)},reset:function(){N=!1,lt=null,D=null,V=null,gt=null,ht=null,Gt=null,oe=null,_e=null}}}const s=new e,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},p=new WeakMap,d=[],g=null,v=!1,m=null,h=null,S=null,y=null,_=null,I=null,w=null,A=new Ft(0,0,0),L=0,E=!1,x=null,C=null,B=null,G=null,$=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,it=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(Y)[1]),Z=it>=1):Y.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),Z=it>=2);let ft=null,mt={};const yt=i.getParameter(i.SCISSOR_BOX),pt=i.getParameter(i.VIEWPORT),jt=new he().fromArray(yt),j=new he().fromArray(pt);function at(N,lt,D,V){const gt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(N,ht),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<D;Gt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,V,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(lt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return ht}const St={};St[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),St[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),St[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),dt(i.DEPTH_TEST),o.setFunc(Hi),Et(!1),Ot(Da),dt(i.CULL_FACE),U(Vn);function dt(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function Ut(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function et(N,lt){return f[N]!==lt?(i.bindFramebuffer(N,lt),f[N]=lt,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=lt),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function vt(N,lt){let D=d,V=!1;if(N){D=p.get(lt),D===void 0&&(D=[],p.set(lt,D));const gt=N.textures;if(D.length!==gt.length||D[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Gt=gt.length;ht<Gt;ht++)D[ht]=i.COLOR_ATTACHMENT0+ht;D.length=gt.length,V=!0}}else D[0]!==i.BACK&&(D[0]=i.BACK,V=!0);V&&i.drawBuffers(D)}function Ht(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const zt={[ei]:i.FUNC_ADD,[su]:i.FUNC_SUBTRACT,[ou]:i.FUNC_REVERSE_SUBTRACT};zt[au]=i.MIN,zt[lu]=i.MAX;const Xt={[cu]:i.ZERO,[uu]:i.ONE,[hu]:i.SRC_COLOR,[mo]:i.SRC_ALPHA,[_u]:i.SRC_ALPHA_SATURATE,[mu]:i.DST_COLOR,[du]:i.DST_ALPHA,[fu]:i.ONE_MINUS_SRC_COLOR,[go]:i.ONE_MINUS_SRC_ALPHA,[gu]:i.ONE_MINUS_DST_COLOR,[pu]:i.ONE_MINUS_DST_ALPHA,[vu]:i.CONSTANT_COLOR,[Mu]:i.ONE_MINUS_CONSTANT_COLOR,[xu]:i.CONSTANT_ALPHA,[yu]:i.ONE_MINUS_CONSTANT_ALPHA};function U(N,lt,D,V,gt,ht,Gt,oe,_e,te){if(N===Vn){v===!0&&(Ut(i.BLEND),v=!1);return}if(v===!1&&(dt(i.BLEND),v=!0),N!==ru){if(N!==m||te!==E){if((h!==ei||_!==ei)&&(i.blendEquation(i.FUNC_ADD),h=ei,_=ei),te)switch(N){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ua:i.blendFunc(i.ONE,i.ONE);break;case Na:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ua:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Na:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,y=null,I=null,w=null,A.set(0,0,0),L=0,m=N,E=te}return}gt=gt||lt,ht=ht||D,Gt=Gt||V,(lt!==h||gt!==_)&&(i.blendEquationSeparate(zt[lt],zt[gt]),h=lt,_=gt),(D!==S||V!==y||ht!==I||Gt!==w)&&(i.blendFuncSeparate(Xt[D],Xt[V],Xt[ht],Xt[Gt]),S=D,y=V,I=ht,w=Gt),(oe.equals(A)===!1||_e!==L)&&(i.blendColor(oe.r,oe.g,oe.b,_e),A.copy(oe),L=_e),m=N,E=!1}function Nt(N,lt){N.side===De?Ut(i.CULL_FACE):dt(i.CULL_FACE);let D=N.side===We;lt&&(D=!D),Et(D),N.blending===Fi&&N.transparent===!1?U(Vn):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const V=N.stencilWrite;a.setTest(V),V&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Qt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):Ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function Et(N){x!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),x=N)}function Ot(N){N!==nu?(dt(i.CULL_FACE),N!==C&&(N===Da?i.cullFace(i.BACK):N===iu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ut(i.CULL_FACE),C=N}function Tt(N){N!==B&&(Z&&i.lineWidth(N),B=N)}function Qt(N,lt,D){N?(dt(i.POLYGON_OFFSET_FILL),(G!==lt||$!==D)&&(i.polygonOffset(lt,D),G=lt,$=D)):Ut(i.POLYGON_OFFSET_FILL)}function It(N){N?dt(i.SCISSOR_TEST):Ut(i.SCISSOR_TEST)}function T(N){N===void 0&&(N=i.TEXTURE0+K-1),ft!==N&&(i.activeTexture(N),ft=N)}function M(N,lt,D){D===void 0&&(ft===null?D=i.TEXTURE0+K-1:D=ft);let V=mt[D];V===void 0&&(V={type:void 0,texture:void 0},mt[D]=V),(V.type!==N||V.texture!==lt)&&(ft!==D&&(i.activeTexture(D),ft=D),i.bindTexture(N,lt||St[N]),V.type=N,V.texture=lt)}function k(){const N=mt[ft];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function nt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function P(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function z(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function q(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(N){jt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),jt.copy(N))}function ct(N){j.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),j.copy(N))}function bt(N,lt){let D=c.get(lt);D===void 0&&(D=new WeakMap,c.set(lt,D));let V=D.get(N);V===void 0&&(V=i.getUniformBlockIndex(lt,N.name),D.set(N,V))}function At(N,lt){const V=c.get(lt).get(N);l.get(lt)!==V&&(i.uniformBlockBinding(lt,V,N.__bindingPointIndex),l.set(lt,V))}function Vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ft=null,mt={},f={},p=new WeakMap,d=[],g=null,v=!1,m=null,h=null,S=null,y=null,_=null,I=null,w=null,A=new Ft(0,0,0),L=0,E=!1,x=null,C=null,B=null,G=null,$=null,jt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:dt,disable:Ut,bindFramebuffer:et,drawBuffers:vt,useProgram:Ht,setBlending:U,setMaterial:Nt,setFlipSided:Et,setCullFace:Ot,setLineWidth:Tt,setPolygonOffset:Qt,setScissorTest:It,activeTexture:T,bindTexture:M,unbindTexture:k,compressedTexImage2D:nt,compressedTexImage3D:st,texImage2D:J,texImage3D:tt,updateUBOMapping:bt,uniformBlockBinding:At,texStorage2D:rt,texStorage3D:q,texSubImage2D:Q,texSubImage3D:Rt,compressedTexSubImage2D:P,compressedTexSubImage3D:z,scissor:ot,viewport:ct,reset:Vt}}function Pl(i,t,e,n){const r=r0(n);switch(e){case cc:return i*t;case hc:return i*t;case fc:return i*t*2;case ca:return i*t/r.components*r.byteLength;case ua:return i*t/r.components*r.byteLength;case dc:return i*t*2/r.components*r.byteLength;case ha:return i*t*2/r.components*r.byteLength;case uc:return i*t*3/r.components*r.byteLength;case nn:return i*t*4/r.components*r.byteLength;case fa:return i*t*4/r.components*r.byteLength;case ls:case cs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case us:case hs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ro:case Po:return Math.max(i,16)*Math.max(t,8)/4;case Ao:case Co:return Math.max(i,8)*Math.max(t,8)/2;case Lo:case Io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Do:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Oo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case zo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Go:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ko:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Yo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case qo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case fs:case Zo:case $o:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pc:case Ko:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Jo:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function r0(i){switch(i){case Cn:case oc:return{byteLength:1,components:1};case xr:case ac:case br:return{byteLength:2,components:1};case aa:case la:return{byteLength:2,components:4};case li:case oa:case pn:return{byteLength:4,components:1};case lc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function s0(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new wt,u=new WeakMap;let f;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,M){return d?new OffscreenCanvas(T,M):gs("canvas")}function v(T,M,k){let nt=1;const st=It(T);if((st.width>k||st.height>k)&&(nt=k/Math.max(st.width,st.height)),nt<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Q=Math.floor(nt*st.width),Rt=Math.floor(nt*st.height);f===void 0&&(f=g(Q,Rt));const P=M?g(Q,Rt):f;return P.width=Q,P.height=Rt,P.getContext("2d").drawImage(T,0,0,Q,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+Q+"x"+Rt+")."),P}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),T;return T}function m(T){return T.generateMipmaps}function h(T){i.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(T,M,k,nt,st=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Q=M;if(M===i.RED&&(k===i.FLOAT&&(Q=i.R32F),k===i.HALF_FLOAT&&(Q=i.R16F),k===i.UNSIGNED_BYTE&&(Q=i.R8)),M===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.R8UI),k===i.UNSIGNED_SHORT&&(Q=i.R16UI),k===i.UNSIGNED_INT&&(Q=i.R32UI),k===i.BYTE&&(Q=i.R8I),k===i.SHORT&&(Q=i.R16I),k===i.INT&&(Q=i.R32I)),M===i.RG&&(k===i.FLOAT&&(Q=i.RG32F),k===i.HALF_FLOAT&&(Q=i.RG16F),k===i.UNSIGNED_BYTE&&(Q=i.RG8)),M===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RG8UI),k===i.UNSIGNED_SHORT&&(Q=i.RG16UI),k===i.UNSIGNED_INT&&(Q=i.RG32UI),k===i.BYTE&&(Q=i.RG8I),k===i.SHORT&&(Q=i.RG16I),k===i.INT&&(Q=i.RG32I)),M===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),k===i.UNSIGNED_INT&&(Q=i.RGB32UI),k===i.BYTE&&(Q=i.RGB8I),k===i.SHORT&&(Q=i.RGB16I),k===i.INT&&(Q=i.RGB32I)),M===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),k===i.UNSIGNED_INT&&(Q=i.RGBA32UI),k===i.BYTE&&(Q=i.RGBA8I),k===i.SHORT&&(Q=i.RGBA16I),k===i.INT&&(Q=i.RGBA32I)),M===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),M===i.RGBA){const Rt=st?bs:ee.getTransfer(nt);k===i.FLOAT&&(Q=i.RGBA32F),k===i.HALF_FLOAT&&(Q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Q=Rt===fe?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(T,M){let k;return T?M===null||M===li||M===Vi?k=i.DEPTH24_STENCIL8:M===pn?k=i.DEPTH32F_STENCIL8:M===xr&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===li||M===Vi?k=i.DEPTH_COMPONENT24:M===pn?k=i.DEPTH_COMPONENT32F:M===xr&&(k=i.DEPTH_COMPONENT16),k}function I(T,M){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Je&&T.minFilter!==en?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function w(T){const M=T.target;M.removeEventListener("dispose",w),L(M),M.isVideoTexture&&u.delete(M)}function A(T){const M=T.target;M.removeEventListener("dispose",A),x(M)}function L(T){const M=n.get(T);if(M.__webglInit===void 0)return;const k=T.source,nt=p.get(k);if(nt){const st=nt[M.__cacheKey];st.usedTimes--,st.usedTimes===0&&E(T),Object.keys(nt).length===0&&p.delete(k)}n.remove(T)}function E(T){const M=n.get(T);i.deleteTexture(M.__webglTexture);const k=T.source,nt=p.get(k);delete nt[M.__cacheKey],o.memory.textures--}function x(T){const M=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(M.__webglFramebuffer[nt]))for(let st=0;st<M.__webglFramebuffer[nt].length;st++)i.deleteFramebuffer(M.__webglFramebuffer[nt][st]);else i.deleteFramebuffer(M.__webglFramebuffer[nt]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[nt])}else{if(Array.isArray(M.__webglFramebuffer))for(let nt=0;nt<M.__webglFramebuffer.length;nt++)i.deleteFramebuffer(M.__webglFramebuffer[nt]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let nt=0;nt<M.__webglColorRenderbuffer.length;nt++)M.__webglColorRenderbuffer[nt]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[nt]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=T.textures;for(let nt=0,st=k.length;nt<st;nt++){const Q=n.get(k[nt]);Q.__webglTexture&&(i.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(k[nt])}n.remove(T)}let C=0;function B(){C=0}function G(){const T=C;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),C+=1,T}function $(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function K(T,M){const k=n.get(T);if(T.isVideoTexture&&Tt(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){const nt=T.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,T,M);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+M)}function Z(T,M){const k=n.get(T);if(T.version>0&&k.__version!==T.version){j(k,T,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+M)}function it(T,M){const k=n.get(T);if(T.version>0&&k.__version!==T.version){j(k,T,M);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+M)}function Y(T,M){const k=n.get(T);if(T.version>0&&k.__version!==T.version){at(k,T,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+M)}const ft={[ps]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},mt={[Je]:i.NEAREST,[Pu]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Rs]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},yt={[Uu]:i.NEVER,[Hu]:i.ALWAYS,[Nu]:i.LESS,[gc]:i.LEQUAL,[Ou]:i.EQUAL,[zu]:i.GEQUAL,[Fu]:i.GREATER,[Bu]:i.NOTEQUAL};function pt(T,M){if(M.type===pn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===en||M.magFilter===Rs||M.magFilter===Pr||M.magFilter===ri||M.minFilter===en||M.minFilter===Rs||M.minFilter===Pr||M.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ft[M.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ft[M.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ft[M.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,mt[M.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,mt[M.minFilter]),M.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,yt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Je||M.minFilter!==Pr&&M.minFilter!==ri||M.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function jt(T,M){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",w));const nt=M.source;let st=p.get(nt);st===void 0&&(st={},p.set(nt,st));const Q=$(M);if(Q!==T.__cacheKey){st[Q]===void 0&&(st[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),st[Q].usedTimes++;const Rt=st[T.__cacheKey];Rt!==void 0&&(st[T.__cacheKey].usedTimes--,Rt.usedTimes===0&&E(M)),T.__cacheKey=Q,T.__webglTexture=st[Q].texture}return k}function j(T,M,k){let nt=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(nt=i.TEXTURE_3D);const st=jt(T,M),Q=M.source;e.bindTexture(nt,T.__webglTexture,i.TEXTURE0+k);const Rt=n.get(Q);if(Q.version!==Rt.__version||st===!0){e.activeTexture(i.TEXTURE0+k);const P=ee.getPrimaries(ee.workingColorSpace),z=M.colorSpace===Gn?null:ee.getPrimaries(M.colorSpace),rt=M.colorSpace===Gn||P===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let q=v(M.image,!1,r.maxTextureSize);q=Qt(M,q);const J=s.convert(M.format,M.colorSpace),tt=s.convert(M.type);let ot=y(M.internalFormat,J,tt,M.colorSpace,M.isVideoTexture);pt(nt,M);let ct;const bt=M.mipmaps,At=M.isVideoTexture!==!0,Vt=Rt.__version===void 0||st===!0,N=Q.dataReady,lt=I(M,q);if(M.isDepthTexture)ot=_(M.format===Wi,M.type),Vt&&(At?e.texStorage2D(i.TEXTURE_2D,1,ot,q.width,q.height):e.texImage2D(i.TEXTURE_2D,0,ot,q.width,q.height,0,J,tt,null));else if(M.isDataTexture)if(bt.length>0){At&&Vt&&e.texStorage2D(i.TEXTURE_2D,lt,ot,bt[0].width,bt[0].height);for(let D=0,V=bt.length;D<V;D++)ct=bt[D],At?N&&e.texSubImage2D(i.TEXTURE_2D,D,0,0,ct.width,ct.height,J,tt,ct.data):e.texImage2D(i.TEXTURE_2D,D,ot,ct.width,ct.height,0,J,tt,ct.data);M.generateMipmaps=!1}else At?(Vt&&e.texStorage2D(i.TEXTURE_2D,lt,ot,q.width,q.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,q.width,q.height,J,tt,q.data)):e.texImage2D(i.TEXTURE_2D,0,ot,q.width,q.height,0,J,tt,q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){At&&Vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,ot,bt[0].width,bt[0].height,q.depth);for(let D=0,V=bt.length;D<V;D++)if(ct=bt[D],M.format!==nn)if(J!==null)if(At){if(N)if(M.layerUpdates.size>0){const gt=Pl(ct.width,ct.height,M.format,M.type);for(const ht of M.layerUpdates){const Gt=ct.data.subarray(ht*gt/ct.data.BYTES_PER_ELEMENT,(ht+1)*gt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,D,0,0,ht,ct.width,ct.height,1,J,Gt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,D,0,0,0,ct.width,ct.height,q.depth,J,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,D,ot,ct.width,ct.height,q.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else At?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,D,0,0,0,ct.width,ct.height,q.depth,J,tt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,D,ot,ct.width,ct.height,q.depth,0,J,tt,ct.data)}else{At&&Vt&&e.texStorage2D(i.TEXTURE_2D,lt,ot,bt[0].width,bt[0].height);for(let D=0,V=bt.length;D<V;D++)ct=bt[D],M.format!==nn?J!==null?At?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,D,0,0,ct.width,ct.height,J,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,D,ot,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):At?N&&e.texSubImage2D(i.TEXTURE_2D,D,0,0,ct.width,ct.height,J,tt,ct.data):e.texImage2D(i.TEXTURE_2D,D,ot,ct.width,ct.height,0,J,tt,ct.data)}else if(M.isDataArrayTexture)if(At){if(Vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,ot,q.width,q.height,q.depth),N)if(M.layerUpdates.size>0){const D=Pl(q.width,q.height,M.format,M.type);for(const V of M.layerUpdates){const gt=q.data.subarray(V*D/q.data.BYTES_PER_ELEMENT,(V+1)*D/q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,V,q.width,q.height,1,J,tt,gt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,J,tt,q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ot,q.width,q.height,q.depth,0,J,tt,q.data);else if(M.isData3DTexture)At?(Vt&&e.texStorage3D(i.TEXTURE_3D,lt,ot,q.width,q.height,q.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,J,tt,q.data)):e.texImage3D(i.TEXTURE_3D,0,ot,q.width,q.height,q.depth,0,J,tt,q.data);else if(M.isFramebufferTexture){if(Vt)if(At)e.texStorage2D(i.TEXTURE_2D,lt,ot,q.width,q.height);else{let D=q.width,V=q.height;for(let gt=0;gt<lt;gt++)e.texImage2D(i.TEXTURE_2D,gt,ot,D,V,0,J,tt,null),D>>=1,V>>=1}}else if(bt.length>0){if(At&&Vt){const D=It(bt[0]);e.texStorage2D(i.TEXTURE_2D,lt,ot,D.width,D.height)}for(let D=0,V=bt.length;D<V;D++)ct=bt[D],At?N&&e.texSubImage2D(i.TEXTURE_2D,D,0,0,J,tt,ct):e.texImage2D(i.TEXTURE_2D,D,ot,J,tt,ct);M.generateMipmaps=!1}else if(At){if(Vt){const D=It(q);e.texStorage2D(i.TEXTURE_2D,lt,ot,D.width,D.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,J,tt,q)}else e.texImage2D(i.TEXTURE_2D,0,ot,J,tt,q);m(M)&&h(nt),Rt.__version=Q.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function at(T,M,k){if(M.image.length!==6)return;const nt=jt(T,M),st=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+k);const Q=n.get(st);if(st.version!==Q.__version||nt===!0){e.activeTexture(i.TEXTURE0+k);const Rt=ee.getPrimaries(ee.workingColorSpace),P=M.colorSpace===Gn?null:ee.getPrimaries(M.colorSpace),z=M.colorSpace===Gn||Rt===P?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,z);const rt=M.isCompressedTexture||M.image[0].isCompressedTexture,q=M.image[0]&&M.image[0].isDataTexture,J=[];for(let V=0;V<6;V++)!rt&&!q?J[V]=v(M.image[V],!0,r.maxCubemapSize):J[V]=q?M.image[V].image:M.image[V],J[V]=Qt(M,J[V]);const tt=J[0],ot=s.convert(M.format,M.colorSpace),ct=s.convert(M.type),bt=y(M.internalFormat,ot,ct,M.colorSpace),At=M.isVideoTexture!==!0,Vt=Q.__version===void 0||nt===!0,N=st.dataReady;let lt=I(M,tt);pt(i.TEXTURE_CUBE_MAP,M);let D;if(rt){At&&Vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,bt,tt.width,tt.height);for(let V=0;V<6;V++){D=J[V].mipmaps;for(let gt=0;gt<D.length;gt++){const ht=D[gt];M.format!==nn?ot!==null?At?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt,0,0,ht.width,ht.height,ot,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt,bt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):At?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt,0,0,ht.width,ht.height,ot,ct,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt,bt,ht.width,ht.height,0,ot,ct,ht.data)}}}else{if(D=M.mipmaps,At&&Vt){D.length>0&&lt++;const V=It(J[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,bt,V.width,V.height)}for(let V=0;V<6;V++)if(q){At?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,J[V].width,J[V].height,ot,ct,J[V].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,bt,J[V].width,J[V].height,0,ot,ct,J[V].data);for(let gt=0;gt<D.length;gt++){const Gt=D[gt].image[V].image;At?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt+1,0,0,Gt.width,Gt.height,ot,ct,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt+1,bt,Gt.width,Gt.height,0,ot,ct,Gt.data)}}else{At?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,ot,ct,J[V]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,bt,ot,ct,J[V]);for(let gt=0;gt<D.length;gt++){const ht=D[gt];At?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt+1,0,0,ot,ct,ht.image[V]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+V,gt+1,bt,ot,ct,ht.image[V])}}}m(M)&&h(i.TEXTURE_CUBE_MAP),Q.__version=st.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function St(T,M,k,nt,st,Q){const Rt=s.convert(k.format,k.colorSpace),P=s.convert(k.type),z=y(k.internalFormat,Rt,P,k.colorSpace),rt=n.get(M),q=n.get(k);if(q.__renderTarget=M,!rt.__hasExternalTextures){const J=Math.max(1,M.width>>Q),tt=Math.max(1,M.height>>Q);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,Q,z,J,tt,M.depth,0,Rt,P,null):e.texImage2D(st,Q,z,J,tt,0,Rt,P,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Ot(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,st,q.__webglTexture,0,Et(M)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,st,q.__webglTexture,Q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(T,M,k){if(i.bindRenderbuffer(i.RENDERBUFFER,T),M.depthBuffer){const nt=M.depthTexture,st=nt&&nt.isDepthTexture?nt.type:null,Q=_(M.stencilBuffer,st),Rt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,P=Et(M);Ot(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,P,Q,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,P,Q,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Q,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,T)}else{const nt=M.textures;for(let st=0;st<nt.length;st++){const Q=nt[st],Rt=s.convert(Q.format,Q.colorSpace),P=s.convert(Q.type),z=y(Q.internalFormat,Rt,P,Q.colorSpace),rt=Et(M);k&&Ot(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,z,M.width,M.height):Ot(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,z,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,z,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=n.get(M.depthTexture);nt.__renderTarget=M,(!nt.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),K(M.depthTexture,0);const st=nt.__webglTexture,Q=Et(M);if(M.depthTexture.format===Bi)Ot(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(M.depthTexture.format===Wi)Ot(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function et(T){const M=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){const nt=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),nt){const st=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,nt.removeEventListener("dispose",st)};nt.addEventListener("dispose",st),M.__depthDisposeCallback=st}M.__boundDepthTexture=nt}if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ut(M.__webglFramebuffer,T)}else if(k){M.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[nt]),M.__webglDepthbuffer[nt]===void 0)M.__webglDepthbuffer[nt]=i.createRenderbuffer(),dt(M.__webglDepthbuffer[nt],T,!1);else{const st=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=M.__webglDepthbuffer[nt];i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),dt(M.__webglDepthbuffer,T,!1);else{const nt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,st)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function vt(T,M,k){const nt=n.get(T);M!==void 0&&St(nt.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&et(T)}function Ht(T){const M=T.texture,k=n.get(T),nt=n.get(M);T.addEventListener("dispose",A);const st=T.textures,Q=T.isWebGLCubeRenderTarget===!0,Rt=st.length>1;if(Rt||(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=M.version,o.memory.textures++),Q){k.__webglFramebuffer=[];for(let P=0;P<6;P++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[P]=[];for(let z=0;z<M.mipmaps.length;z++)k.__webglFramebuffer[P][z]=i.createFramebuffer()}else k.__webglFramebuffer[P]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let P=0;P<M.mipmaps.length;P++)k.__webglFramebuffer[P]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let P=0,z=st.length;P<z;P++){const rt=n.get(st[P]);rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&Ot(T)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let P=0;P<st.length;P++){const z=st[P];k.__webglColorRenderbuffer[P]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[P]);const rt=s.convert(z.format,z.colorSpace),q=s.convert(z.type),J=y(z.internalFormat,rt,q,z.colorSpace,T.isXRRenderTarget===!0),tt=Et(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,J,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+P,i.RENDERBUFFER,k.__webglColorRenderbuffer[P])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Q){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),pt(i.TEXTURE_CUBE_MAP,M);for(let P=0;P<6;P++)if(M.mipmaps&&M.mipmaps.length>0)for(let z=0;z<M.mipmaps.length;z++)St(k.__webglFramebuffer[P][z],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+P,z);else St(k.__webglFramebuffer[P],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0);m(M)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let P=0,z=st.length;P<z;P++){const rt=st[P],q=n.get(rt);e.bindTexture(i.TEXTURE_2D,q.__webglTexture),pt(i.TEXTURE_2D,rt),St(k.__webglFramebuffer,T,rt,i.COLOR_ATTACHMENT0+P,i.TEXTURE_2D,0),m(rt)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let P=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(P=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(P,nt.__webglTexture),pt(P,M),M.mipmaps&&M.mipmaps.length>0)for(let z=0;z<M.mipmaps.length;z++)St(k.__webglFramebuffer[z],T,M,i.COLOR_ATTACHMENT0,P,z);else St(k.__webglFramebuffer,T,M,i.COLOR_ATTACHMENT0,P,0);m(M)&&h(P),e.unbindTexture()}T.depthBuffer&&et(T)}function zt(T){const M=T.textures;for(let k=0,nt=M.length;k<nt;k++){const st=M[k];if(m(st)){const Q=S(T),Rt=n.get(st).__webglTexture;e.bindTexture(Q,Rt),h(Q),e.unbindTexture()}}}const Xt=[],U=[];function Nt(T){if(T.samples>0){if(Ot(T)===!1){const M=T.textures,k=T.width,nt=T.height;let st=i.COLOR_BUFFER_BIT;const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(T),P=M.length>1;if(P)for(let z=0;z<M.length;z++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let z=0;z<M.length;z++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),P){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[z]);const rt=n.get(M[z]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,rt,0)}i.blitFramebuffer(0,0,k,nt,0,0,k,nt,st,i.NEAREST),l===!0&&(Xt.length=0,U.length=0,Xt.push(i.COLOR_ATTACHMENT0+z),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Xt.push(Q),U.push(Q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Xt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),P)for(let z=0;z<M.length;z++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[z]);const rt=n.get(M[z]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.TEXTURE_2D,rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const M=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Et(T){return Math.min(r.maxSamples,T.samples)}function Ot(T){const M=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Tt(T){const M=o.render.frame;u.get(T)!==M&&(u.set(T,M),T.update())}function Qt(T,M){const k=T.colorSpace,nt=T.format,st=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==$i&&k!==Gn&&(ee.getTransfer(k)===fe?(nt!==nn||st!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function It(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.setTexture2D=K,this.setTexture2DArray=Z,this.setTexture3D=it,this.setTextureCube=Y,this.rebindTextures=vt,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=zt,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Ot}function o0(i,t){function e(n,r=Gn){let s;const o=ee.getTransfer(r);if(n===Cn)return i.UNSIGNED_BYTE;if(n===aa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===la)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===oc)return i.BYTE;if(n===ac)return i.SHORT;if(n===xr)return i.UNSIGNED_SHORT;if(n===oa)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===pn)return i.FLOAT;if(n===br)return i.HALF_FLOAT;if(n===cc)return i.ALPHA;if(n===uc)return i.RGB;if(n===nn)return i.RGBA;if(n===hc)return i.LUMINANCE;if(n===fc)return i.LUMINANCE_ALPHA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===Wi)return i.DEPTH_STENCIL;if(n===ca)return i.RED;if(n===ua)return i.RED_INTEGER;if(n===dc)return i.RG;if(n===ha)return i.RG_INTEGER;if(n===fa)return i.RGBA_INTEGER;if(n===ls||n===cs||n===us||n===hs)if(o===fe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ls)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ls)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===us)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ao||n===Ro||n===Co||n===Po)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ao)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ro)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Co)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lo||n===Io||n===Do)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lo||n===Io)return o===fe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Do)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Uo||n===No||n===Oo||n===Fo||n===Bo||n===zo||n===Ho||n===Go||n===ko||n===Vo||n===Wo||n===Xo||n===Yo||n===qo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Uo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===No)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Bo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ho)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Go)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ko)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qo)return o===fe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fs||n===Zo||n===$o)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===fs)return o===fe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$o)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pc||n===Ko||n===Jo||n===jo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===fs)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ko)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class a0 extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Bt extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const l0={type:"move"};class no{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),h=this._getHandJoint(c,v);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],p=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&p>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(l0)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Bt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const c0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class h0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Fe,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pn({vertexShader:c0,fragmentShader:u0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new me(new Ye(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class f0 extends Ki{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,p=null,d=null,g=null;const v=new h0,m=e.getContextAttributes();let h=null,S=null;const y=[],_=[],I=new wt;let w=null;const A=new Ke;A.viewport=new he;const L=new Ke;L.viewport=new he;const E=[A,L],x=new a0;let C=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let at=y[j];return at===void 0&&(at=new no,y[j]=at),at.getTargetRaySpace()},this.getControllerGrip=function(j){let at=y[j];return at===void 0&&(at=new no,y[j]=at),at.getGripSpace()},this.getHand=function(j){let at=y[j];return at===void 0&&(at=new no,y[j]=at),at.getHandSpace()};function G(j){const at=_.indexOf(j.inputSource);if(at===-1)return;const St=y[at];St!==void 0&&(St.update(j.inputSource,j.frame,c||o),St.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",K);for(let j=0;j<y.length;j++){const at=_[j];at!==null&&(_[j]=null,y[j].disconnect(at))}C=null,B=null,v.reset(),t.setRenderTarget(h),d=null,p=null,f=null,r=null,S=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(h=t.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",$),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(I),r.renderState.layers===void 0){const at={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,at),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new ci(d.framebufferWidth,d.framebufferHeight,{format:nn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let at=null,St=null,dt=null;m.depth&&(dt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=m.stencil?Wi:Bi,St=m.stencil?Vi:li);const Ut={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:s};f=new XRWebGLBinding(r,e),p=f.createProjectionLayer(Ut),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),S=new ci(p.textureWidth,p.textureHeight,{format:nn,type:Cn,depthTexture:new Rc(p.textureWidth,p.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),jt.setContext(r),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(j){for(let at=0;at<j.removed.length;at++){const St=j.removed[at],dt=_.indexOf(St);dt>=0&&(_[dt]=null,y[dt].disconnect(St))}for(let at=0;at<j.added.length;at++){const St=j.added[at];let dt=_.indexOf(St);if(dt===-1){for(let et=0;et<y.length;et++)if(et>=_.length){_.push(St),dt=et;break}else if(_[et]===null){_[et]=St,dt=et;break}if(dt===-1)break}const Ut=y[dt];Ut&&Ut.connect(St)}}const Z=new R,it=new R;function Y(j,at,St){Z.setFromMatrixPosition(at.matrixWorld),it.setFromMatrixPosition(St.matrixWorld);const dt=Z.distanceTo(it),Ut=at.projectionMatrix.elements,et=St.projectionMatrix.elements,vt=Ut[14]/(Ut[10]-1),Ht=Ut[14]/(Ut[10]+1),zt=(Ut[9]+1)/Ut[5],Xt=(Ut[9]-1)/Ut[5],U=(Ut[8]-1)/Ut[0],Nt=(et[8]+1)/et[0],Et=vt*U,Ot=vt*Nt,Tt=dt/(-U+Nt),Qt=Tt*-U;if(at.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Qt),j.translateZ(Tt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ut[10]===-1)j.projectionMatrix.copy(at.projectionMatrix),j.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const It=vt+Tt,T=Ht+Tt,M=Et-Qt,k=Ot+(dt-Qt),nt=zt*Ht/T*It,st=Xt*Ht/T*It;j.projectionMatrix.makePerspective(M,k,nt,st,It,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ft(j,at){at===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(at.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let at=j.near,St=j.far;v.texture!==null&&(v.depthNear>0&&(at=v.depthNear),v.depthFar>0&&(St=v.depthFar)),x.near=L.near=A.near=at,x.far=L.far=A.far=St,(C!==x.near||B!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,B=x.far),A.layers.mask=j.layers.mask|2,L.layers.mask=j.layers.mask|4,x.layers.mask=A.layers.mask|L.layers.mask;const dt=j.parent,Ut=x.cameras;ft(x,dt);for(let et=0;et<Ut.length;et++)ft(Ut[et],dt);Ut.length===2?Y(x,A,L):x.projectionMatrix.copy(A.projectionMatrix),mt(j,x,dt)};function mt(j,at,St){St===null?j.matrix.copy(at.matrixWorld):(j.matrix.copy(St.matrixWorld),j.matrix.invert(),j.matrix.multiply(at.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(at.projectionMatrix),j.projectionMatrixInverse.copy(at.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=yr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(j){l=j,p!==null&&(p.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let yt=null;function pt(j,at){if(u=at.getViewerPose(c||o),g=at,u!==null){const St=u.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let dt=!1;St.length!==x.cameras.length&&(x.cameras.length=0,dt=!0);for(let et=0;et<St.length;et++){const vt=St[et];let Ht=null;if(d!==null)Ht=d.getViewport(vt);else{const Xt=f.getViewSubImage(p,vt);Ht=Xt.viewport,et===0&&(t.setRenderTargetTextures(S,Xt.colorTexture,p.ignoreDepthValues?void 0:Xt.depthStencilTexture),t.setRenderTarget(S))}let zt=E[et];zt===void 0&&(zt=new Ke,zt.layers.enable(et),zt.viewport=new he,E[et]=zt),zt.matrix.fromArray(vt.transform.matrix),zt.matrix.decompose(zt.position,zt.quaternion,zt.scale),zt.projectionMatrix.fromArray(vt.projectionMatrix),zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(),zt.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),et===0&&(x.matrix.copy(zt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),dt===!0&&x.cameras.push(zt)}const Ut=r.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const et=f.getDepthInformation(St[0]);et&&et.isValid&&et.texture&&v.init(t,et,r.renderState)}}for(let St=0;St<y.length;St++){const dt=_[St],Ut=y[St];dt!==null&&Ut!==void 0&&Ut.update(dt,at,c||o)}yt&&yt(j,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),g=null}const jt=new Tc;jt.setAnimationLoop(pt),this.setAnimationLoop=function(j){yt=j},this.dispose=function(){}}}const jn=new gn,d0=new ce;function p0(i,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,Ec(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,S,y,_){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),p(m,h),h.isMeshPhysicalMaterial&&d(m,h,_)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),v(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,S,y):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===We&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===We&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const S=t.get(h),y=S.envMap,_=S.envMapRotation;y&&(m.envMap.value=y,jn.copy(_),jn.x*=-1,jn.y*=-1,jn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),m.envMapRotation.value.setFromMatrix4(d0.makeRotationFromEuler(jn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,S,y){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*S,m.scale.value=y*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function p(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function d(m,h,S){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===We&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function v(m,h){const S=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function m0(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const _=y.program;n.uniformBlockBinding(S,_)}function c(S,y){let _=r[S.id];_===void 0&&(g(S),_=u(S),r[S.id]=_,S.addEventListener("dispose",m));const I=y.program;n.updateUBOMapping(S,I);const w=t.render.frame;s[S.id]!==w&&(p(S),s[S.id]=w)}function u(S){const y=f();S.__bindingPointIndex=y;const _=i.createBuffer(),I=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,I,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function f(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const y=r[S.id],_=S.uniforms,I=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,A=_.length;w<A;w++){const L=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,x=L.length;E<x;E++){const C=L[E];if(d(C,w,E,I)===!0){const B=C.__offset,G=Array.isArray(C.value)?C.value:[C.value];let $=0;for(let K=0;K<G.length;K++){const Z=G[K],it=v(Z);typeof Z=="number"||typeof Z=="boolean"?(C.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,B+$,C.__data)):Z.isMatrix3?(C.__data[0]=Z.elements[0],C.__data[1]=Z.elements[1],C.__data[2]=Z.elements[2],C.__data[3]=0,C.__data[4]=Z.elements[3],C.__data[5]=Z.elements[4],C.__data[6]=Z.elements[5],C.__data[7]=0,C.__data[8]=Z.elements[6],C.__data[9]=Z.elements[7],C.__data[10]=Z.elements[8],C.__data[11]=0):(Z.toArray(C.__data,$),$+=it.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,y,_,I){const w=S.value,A=y+"_"+_;if(I[A]===void 0)return typeof w=="number"||typeof w=="boolean"?I[A]=w:I[A]=w.clone(),!0;{const L=I[A];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return I[A]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function g(S){const y=S.uniforms;let _=0;const I=16;for(let A=0,L=y.length;A<L;A++){const E=Array.isArray(y[A])?y[A]:[y[A]];for(let x=0,C=E.length;x<C;x++){const B=E[x],G=Array.isArray(B.value)?B.value:[B.value];for(let $=0,K=G.length;$<K;$++){const Z=G[$],it=v(Z),Y=_%I,ft=Y%it.boundary,mt=Y+ft;_+=ft,mt!==0&&I-mt<it.storage&&(_+=I-mt),B.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=_,_+=it.storage}}}const w=_%I;return w>0&&(_+=I-w),S.__size=_,S.__cache={},this}function v(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function m(S){const y=S.target;y.removeEventListener("dispose",m);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function h(){for(const S in r)i.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class g0{constructor(t={}){const{canvas:e=ih(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,h=null;const S=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=Wn,this.toneMappingExposure=1;const _=this;let I=!1,w=0,A=0,L=null,E=-1,x=null;const C=new he,B=new he;let G=null;const $=new Ft(0);let K=0,Z=e.width,it=e.height,Y=1,ft=null,mt=null;const yt=new he(0,0,Z,it),pt=new he(0,0,Z,it);let jt=!1;const j=new ga;let at=!1,St=!1;const dt=new ce,Ut=new ce,et=new R,vt=new he,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function Xt(){return L===null?Y:1}let U=n;function Nt(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sa}`),e.addEventListener("webglcontextlost",V,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),U===null){const O="webgl2";if(U=Nt(O,b),U===null)throw Nt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Et,Ot,Tt,Qt,It,T,M,k,nt,st,Q,Rt,P,z,rt,q,J,tt,ot,ct,bt,At,Vt,N;function lt(){Et=new yp(U),Et.init(),At=new o0(U,Et),Ot=new mp(U,Et,t,At),Tt=new i0(U,Et),Ot.reverseDepthBuffer&&p&&Tt.buffers.depth.setReversed(!0),Qt=new bp(U),It=new km,T=new s0(U,Et,Tt,It,Ot,At,Qt),M=new _p(_),k=new xp(_),nt=new Ph(U),Vt=new dp(U,nt),st=new Sp(U,nt,Qt,Vt),Q=new Tp(U,st,nt,Qt),ot=new wp(U,Ot,T),q=new gp(It),Rt=new Gm(_,M,k,Et,Ot,Vt,q),P=new p0(_,It),z=new Wm,rt=new Km(Et),tt=new fp(_,M,k,Tt,Q,d,l),J=new e0(_,Q,Ot),N=new m0(U,Qt,Ot,Tt),ct=new pp(U,Et,Qt),bt=new Ep(U,Et,Qt),Qt.programs=Rt.programs,_.capabilities=Ot,_.extensions=Et,_.properties=It,_.renderLists=z,_.shadowMap=J,_.state=Tt,_.info=Qt}lt();const D=new f0(_,U);this.xr=D,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=Et.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Et.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(Z,it,!1))},this.getSize=function(b){return b.set(Z,it)},this.setSize=function(b,O,W=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=b,it=O,e.width=Math.floor(b*Y),e.height=Math.floor(O*Y),W===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(Z*Y,it*Y).floor()},this.setDrawingBufferSize=function(b,O,W){Z=b,it=O,Y=W,e.width=Math.floor(b*W),e.height=Math.floor(O*W),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(C)},this.getViewport=function(b){return b.copy(yt)},this.setViewport=function(b,O,W,X){b.isVector4?yt.set(b.x,b.y,b.z,b.w):yt.set(b,O,W,X),Tt.viewport(C.copy(yt).multiplyScalar(Y).round())},this.getScissor=function(b){return b.copy(pt)},this.setScissor=function(b,O,W,X){b.isVector4?pt.set(b.x,b.y,b.z,b.w):pt.set(b,O,W,X),Tt.scissor(B.copy(pt).multiplyScalar(Y).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(b){Tt.setScissorTest(jt=b)},this.setOpaqueSort=function(b){ft=b},this.setTransparentSort=function(b){mt=b},this.getClearColor=function(b){return b.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor.apply(tt,arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha.apply(tt,arguments)},this.clear=function(b=!0,O=!0,W=!0){let X=0;if(b){let F=!1;if(L!==null){const ut=L.texture.format;F=ut===fa||ut===ha||ut===ua}if(F){const ut=L.texture.type,xt=ut===Cn||ut===li||ut===xr||ut===Vi||ut===aa||ut===la,Ct=tt.getClearColor(),Pt=tt.getClearAlpha(),Wt=Ct.r,Yt=Ct.g,Lt=Ct.b;xt?(g[0]=Wt,g[1]=Yt,g[2]=Lt,g[3]=Pt,U.clearBufferuiv(U.COLOR,0,g)):(v[0]=Wt,v[1]=Yt,v[2]=Lt,v[3]=Pt,U.clearBufferiv(U.COLOR,0,v))}else X|=U.COLOR_BUFFER_BIT}O&&(X|=U.DEPTH_BUFFER_BIT),W&&(X|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",V,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),z.dispose(),rt.dispose(),It.dispose(),M.dispose(),k.dispose(),Q.dispose(),Vt.dispose(),N.dispose(),Rt.dispose(),D.dispose(),D.removeEventListener("sessionstart",wa),D.removeEventListener("sessionend",Ta),Yn.stop()};function V(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const b=Qt.autoReset,O=J.enabled,W=J.autoUpdate,X=J.needsUpdate,F=J.type;lt(),Qt.autoReset=b,J.enabled=O,J.autoUpdate=W,J.needsUpdate=X,J.type=F}function ht(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Gt(b){const O=b.target;O.removeEventListener("dispose",Gt),oe(O)}function oe(b){_e(b),It.remove(b)}function _e(b){const O=It.get(b).programs;O!==void 0&&(O.forEach(function(W){Rt.releaseProgram(W)}),b.isShaderMaterial&&Rt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,W,X,F,ut){O===null&&(O=Ht);const xt=F.isMesh&&F.matrixWorld.determinant()<0,Ct=Qc(b,O,W,X,F);Tt.setMaterial(X,xt);let Pt=W.index,Wt=1;if(X.wireframe===!0){if(Pt=st.getWireframeAttribute(W),Pt===void 0)return;Wt=2}const Yt=W.drawRange,Lt=W.attributes.position;let ie=Yt.start*Wt,pe=(Yt.start+Yt.count)*Wt;ut!==null&&(ie=Math.max(ie,ut.start*Wt),pe=Math.min(pe,(ut.start+ut.count)*Wt)),Pt!==null?(ie=Math.max(ie,0),pe=Math.min(pe,Pt.count)):Lt!=null&&(ie=Math.max(ie,0),pe=Math.min(pe,Lt.count));const ve=pe-ie;if(ve<0||ve===1/0)return;Vt.setup(F,X,Ct,W,Pt);let ke,ae=ct;if(Pt!==null&&(ke=nt.get(Pt),ae=bt,ae.setIndex(ke)),F.isMesh)X.wireframe===!0?(Tt.setLineWidth(X.wireframeLinewidth*Xt()),ae.setMode(U.LINES)):ae.setMode(U.TRIANGLES);else if(F.isLine){let Dt=X.linewidth;Dt===void 0&&(Dt=1),Tt.setLineWidth(Dt*Xt()),F.isLineSegments?ae.setMode(U.LINES):F.isLineLoop?ae.setMode(U.LINE_LOOP):ae.setMode(U.LINE_STRIP)}else F.isPoints?ae.setMode(U.POINTS):F.isSprite&&ae.setMode(U.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ae.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Et.get("WEBGL_multi_draw"))ae.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Dt=F._multiDrawStarts,vn=F._multiDrawCounts,le=F._multiDrawCount,on=Pt?nt.get(Pt).bytesPerElement:1,mi=It.get(X).currentProgram.getUniforms();for(let qe=0;qe<le;qe++)mi.setValue(U,"_gl_DrawID",qe),ae.render(Dt[qe]/on,vn[qe])}else if(F.isInstancedMesh)ae.renderInstances(ie,ve,F.count);else if(W.isInstancedBufferGeometry){const Dt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,vn=Math.min(W.instanceCount,Dt);ae.renderInstances(ie,ve,vn)}else ae.render(ie,ve)};function te(b,O,W){b.transparent===!0&&b.side===De&&b.forceSinglePass===!1?(b.side=We,b.needsUpdate=!0,Cr(b,O,W),b.side=Rn,b.needsUpdate=!0,Cr(b,O,W),b.side=De):Cr(b,O,W)}this.compile=function(b,O,W=null){W===null&&(W=b),h=rt.get(W),h.init(O),y.push(h),W.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),b!==W&&b.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),h.setupLights();const X=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ut=F.material;if(ut)if(Array.isArray(ut))for(let xt=0;xt<ut.length;xt++){const Ct=ut[xt];te(Ct,W,F),X.add(Ct)}else te(ut,W,F),X.add(ut)}),y.pop(),h=null,X},this.compileAsync=function(b,O,W=null){const X=this.compile(b,O,W);return new Promise(F=>{function ut(){if(X.forEach(function(xt){It.get(xt).currentProgram.isReady()&&X.delete(xt)}),X.size===0){F(b);return}setTimeout(ut,10)}Et.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let sn=null;function _n(b){sn&&sn(b)}function wa(){Yn.stop()}function Ta(){Yn.start()}const Yn=new Tc;Yn.setAnimationLoop(_n),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(b){sn=b,D.setAnimationLoop(b),b===null?Yn.stop():Yn.start()},D.addEventListener("sessionstart",wa),D.addEventListener("sessionend",Ta),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(O),O=D.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,O,L),h=rt.get(b,y.length),h.init(O),y.push(h),Ut.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(Ut),St=this.localClippingEnabled,at=q.init(this.clippingPlanes,St),m=z.get(b,S.length),m.init(),S.push(m),D.enabled===!0&&D.isPresenting===!0){const ut=_.xr.getDepthSensingMesh();ut!==null&&As(ut,O,-1/0,_.sortObjects)}As(b,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ft,mt),zt=D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1,zt&&tt.addToRenderList(m,b),this.info.render.frame++,at===!0&&q.beginShadows();const W=h.state.shadowsArray;J.render(W,b,O),at===!0&&q.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,F=m.transmissive;if(h.setupLights(),O.isArrayCamera){const ut=O.cameras;if(F.length>0)for(let xt=0,Ct=ut.length;xt<Ct;xt++){const Pt=ut[xt];Ra(X,F,b,Pt)}zt&&tt.render(b);for(let xt=0,Ct=ut.length;xt<Ct;xt++){const Pt=ut[xt];Aa(m,b,Pt,Pt.viewport)}}else F.length>0&&Ra(X,F,b,O),zt&&tt.render(b),Aa(m,b,O);L!==null&&(T.updateMultisampleRenderTarget(L),T.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(_,b,O),Vt.resetDefaultState(),E=-1,x=null,y.pop(),y.length>0?(h=y[y.length-1],at===!0&&q.setGlobalState(_.clippingPlanes,h.state.camera)):h=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function As(b,O,W,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)W=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)h.pushLight(b),b.castShadow&&h.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||j.intersectsSprite(b)){X&&vt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ut);const xt=Q.update(b),Ct=b.material;Ct.visible&&m.push(b,xt,Ct,W,vt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||j.intersectsObject(b))){const xt=Q.update(b),Ct=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),vt.copy(b.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),vt.copy(xt.boundingSphere.center)),vt.applyMatrix4(b.matrixWorld).applyMatrix4(Ut)),Array.isArray(Ct)){const Pt=xt.groups;for(let Wt=0,Yt=Pt.length;Wt<Yt;Wt++){const Lt=Pt[Wt],ie=Ct[Lt.materialIndex];ie&&ie.visible&&m.push(b,xt,ie,W,vt.z,Lt)}}else Ct.visible&&m.push(b,xt,Ct,W,vt.z,null)}}const ut=b.children;for(let xt=0,Ct=ut.length;xt<Ct;xt++)As(ut[xt],O,W,X)}function Aa(b,O,W,X){const F=b.opaque,ut=b.transmissive,xt=b.transparent;h.setupLightsView(W),at===!0&&q.setGlobalState(_.clippingPlanes,W),X&&Tt.viewport(C.copy(X)),F.length>0&&Rr(F,O,W),ut.length>0&&Rr(ut,O,W),xt.length>0&&Rr(xt,O,W),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Ra(b,O,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[X.id]===void 0&&(h.state.transmissionRenderTarget[X.id]=new ci(1,1,{generateMipmaps:!0,type:Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float")?br:Cn,minFilter:ri,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const ut=h.state.transmissionRenderTarget[X.id],xt=X.viewport||C;ut.setSize(xt.z,xt.w);const Ct=_.getRenderTarget();_.setRenderTarget(ut),_.getClearColor($),K=_.getClearAlpha(),K<1&&_.setClearColor(16777215,.5),_.clear(),zt&&tt.render(W);const Pt=_.toneMapping;_.toneMapping=Wn;const Wt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),h.setupLightsView(X),at===!0&&q.setGlobalState(_.clippingPlanes,X),Rr(b,W,X),T.updateMultisampleRenderTarget(ut),T.updateRenderTargetMipmap(ut),Et.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let Lt=0,ie=O.length;Lt<ie;Lt++){const pe=O[Lt],ve=pe.object,ke=pe.geometry,ae=pe.material,Dt=pe.group;if(ae.side===De&&ve.layers.test(X.layers)){const vn=ae.side;ae.side=We,ae.needsUpdate=!0,Ca(ve,W,X,ke,ae,Dt),ae.side=vn,ae.needsUpdate=!0,Yt=!0}}Yt===!0&&(T.updateMultisampleRenderTarget(ut),T.updateRenderTargetMipmap(ut))}_.setRenderTarget(Ct),_.setClearColor($,K),Wt!==void 0&&(X.viewport=Wt),_.toneMapping=Pt}function Rr(b,O,W){const X=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ut=b.length;F<ut;F++){const xt=b[F],Ct=xt.object,Pt=xt.geometry,Wt=X===null?xt.material:X,Yt=xt.group;Ct.layers.test(W.layers)&&Ca(Ct,O,W,Pt,Wt,Yt)}}function Ca(b,O,W,X,F,ut){b.onBeforeRender(_,O,W,X,F,ut),b.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(_,O,W,X,b,ut),F.transparent===!0&&F.side===De&&F.forceSinglePass===!1?(F.side=We,F.needsUpdate=!0,_.renderBufferDirect(W,O,X,F,b,ut),F.side=Rn,F.needsUpdate=!0,_.renderBufferDirect(W,O,X,F,b,ut),F.side=De):_.renderBufferDirect(W,O,X,F,b,ut),b.onAfterRender(_,O,W,X,F,ut)}function Cr(b,O,W){O.isScene!==!0&&(O=Ht);const X=It.get(b),F=h.state.lights,ut=h.state.shadowsArray,xt=F.state.version,Ct=Rt.getParameters(b,F.state,ut,O,W),Pt=Rt.getProgramCacheKey(Ct);let Wt=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?k:M).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Wt===void 0&&(b.addEventListener("dispose",Gt),Wt=new Map,X.programs=Wt);let Yt=Wt.get(Pt);if(Yt!==void 0){if(X.currentProgram===Yt&&X.lightsStateVersion===xt)return La(b,Ct),Yt}else Ct.uniforms=Rt.getUniforms(b),b.onBeforeCompile(Ct,_),Yt=Rt.acquireProgram(Ct,Pt),Wt.set(Pt,Yt),X.uniforms=Ct.uniforms;const Lt=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Lt.clippingPlanes=q.uniform),La(b,Ct),X.needsLights=eu(b),X.lightsStateVersion=xt,X.needsLights&&(Lt.ambientLightColor.value=F.state.ambient,Lt.lightProbe.value=F.state.probe,Lt.directionalLights.value=F.state.directional,Lt.directionalLightShadows.value=F.state.directionalShadow,Lt.spotLights.value=F.state.spot,Lt.spotLightShadows.value=F.state.spotShadow,Lt.rectAreaLights.value=F.state.rectArea,Lt.ltc_1.value=F.state.rectAreaLTC1,Lt.ltc_2.value=F.state.rectAreaLTC2,Lt.pointLights.value=F.state.point,Lt.pointLightShadows.value=F.state.pointShadow,Lt.hemisphereLights.value=F.state.hemi,Lt.directionalShadowMap.value=F.state.directionalShadowMap,Lt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Lt.spotShadowMap.value=F.state.spotShadowMap,Lt.spotLightMatrix.value=F.state.spotLightMatrix,Lt.spotLightMap.value=F.state.spotLightMap,Lt.pointShadowMap.value=F.state.pointShadowMap,Lt.pointShadowMatrix.value=F.state.pointShadowMatrix),X.currentProgram=Yt,X.uniformsList=null,Yt}function Pa(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=ds.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function La(b,O){const W=It.get(b);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function Qc(b,O,W,X,F){O.isScene!==!0&&(O=Ht),T.resetTextureUnits();const ut=O.fog,xt=X.isMeshStandardMaterial?O.environment:null,Ct=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:$i,Pt=(X.isMeshStandardMaterial?k:M).get(X.envMap||xt),Wt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Yt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Lt=!!W.morphAttributes.position,ie=!!W.morphAttributes.normal,pe=!!W.morphAttributes.color;let ve=Wn;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ve=_.toneMapping);const ke=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ae=ke!==void 0?ke.length:0,Dt=It.get(X),vn=h.state.lights;if(at===!0&&(St===!0||b!==x)){const je=b===x&&X.id===E;q.setState(X,b,je)}let le=!1;X.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==vn.state.version||Dt.outputColorSpace!==Ct||F.isBatchedMesh&&Dt.batching===!1||!F.isBatchedMesh&&Dt.batching===!0||F.isBatchedMesh&&Dt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Dt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Dt.instancing===!1||!F.isInstancedMesh&&Dt.instancing===!0||F.isSkinnedMesh&&Dt.skinning===!1||!F.isSkinnedMesh&&Dt.skinning===!0||F.isInstancedMesh&&Dt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Dt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Dt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Dt.instancingMorph===!1&&F.morphTexture!==null||Dt.envMap!==Pt||X.fog===!0&&Dt.fog!==ut||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==q.numPlanes||Dt.numIntersection!==q.numIntersection)||Dt.vertexAlphas!==Wt||Dt.vertexTangents!==Yt||Dt.morphTargets!==Lt||Dt.morphNormals!==ie||Dt.morphColors!==pe||Dt.toneMapping!==ve||Dt.morphTargetsCount!==ae)&&(le=!0):(le=!0,Dt.__version=X.version);let on=Dt.currentProgram;le===!0&&(on=Cr(X,O,F));let mi=!1,qe=!1,er=!1;const Me=on.getUniforms(),hn=Dt.uniforms;if(Tt.useProgram(on.program)&&(mi=!0,qe=!0,er=!0),X.id!==E&&(E=X.id,qe=!0),mi||x!==b){Tt.buffers.depth.getReversed()?(dt.copy(b.projectionMatrix),sh(dt),oh(dt),Me.setValue(U,"projectionMatrix",dt)):Me.setValue(U,"projectionMatrix",b.projectionMatrix),Me.setValue(U,"viewMatrix",b.matrixWorldInverse);const Dn=Me.map.cameraPosition;Dn!==void 0&&Dn.setValue(U,et.setFromMatrixPosition(b.matrixWorld)),Ot.logarithmicDepthBuffer&&Me.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Me.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),x!==b&&(x=b,qe=!0,er=!0)}if(F.isSkinnedMesh){Me.setOptional(U,F,"bindMatrix"),Me.setOptional(U,F,"bindMatrixInverse");const je=F.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),Me.setValue(U,"boneTexture",je.boneTexture,T))}F.isBatchedMesh&&(Me.setOptional(U,F,"batchingTexture"),Me.setValue(U,"batchingTexture",F._matricesTexture,T),Me.setOptional(U,F,"batchingIdTexture"),Me.setValue(U,"batchingIdTexture",F._indirectTexture,T),Me.setOptional(U,F,"batchingColorTexture"),F._colorsTexture!==null&&Me.setValue(U,"batchingColorTexture",F._colorsTexture,T));const nr=W.morphAttributes;if((nr.position!==void 0||nr.normal!==void 0||nr.color!==void 0)&&ot.update(F,W,on),(qe||Dt.receiveShadow!==F.receiveShadow)&&(Dt.receiveShadow=F.receiveShadow,Me.setValue(U,"receiveShadow",F.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(hn.envMap.value=Pt,hn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&O.environment!==null&&(hn.envMapIntensity.value=O.environmentIntensity),qe&&(Me.setValue(U,"toneMappingExposure",_.toneMappingExposure),Dt.needsLights&&tu(hn,er),ut&&X.fog===!0&&P.refreshFogUniforms(hn,ut),P.refreshMaterialUniforms(hn,X,Y,it,h.state.transmissionRenderTarget[b.id]),ds.upload(U,Pa(Dt),hn,T)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ds.upload(U,Pa(Dt),hn,T),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Me.setValue(U,"center",F.center),Me.setValue(U,"modelViewMatrix",F.modelViewMatrix),Me.setValue(U,"normalMatrix",F.normalMatrix),Me.setValue(U,"modelMatrix",F.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const je=X.uniformsGroups;for(let Dn=0,Un=je.length;Dn<Un;Dn++){const Ia=je[Dn];N.update(Ia,on),N.bind(Ia,on)}}return on}function tu(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function eu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,O,W){It.get(b.texture).__webglTexture=O,It.get(b.depthTexture).__webglTexture=W;const X=It.get(b);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Et.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,O){const W=It.get(b);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,W=0){L=b,w=O,A=W;let X=!0,F=null,ut=!1,xt=!1;if(b){const Pt=It.get(b);if(Pt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(U.FRAMEBUFFER,null),X=!1;else if(Pt.__webglFramebuffer===void 0)T.setupRenderTarget(b);else if(Pt.__hasExternalTextures)T.rebindTextures(b,It.get(b.texture).__webglTexture,It.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Lt=b.depthTexture;if(Pt.__boundDepthTexture!==Lt){if(Lt!==null&&It.has(Lt)&&(b.width!==Lt.image.width||b.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(b)}}const Wt=b.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(xt=!0);const Yt=It.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Yt[O])?F=Yt[O][W]:F=Yt[O],ut=!0):b.samples>0&&T.useMultisampledRTT(b)===!1?F=It.get(b).__webglMultisampledFramebuffer:Array.isArray(Yt)?F=Yt[W]:F=Yt,C.copy(b.viewport),B.copy(b.scissor),G=b.scissorTest}else C.copy(yt).multiplyScalar(Y).floor(),B.copy(pt).multiplyScalar(Y).floor(),G=jt;if(Tt.bindFramebuffer(U.FRAMEBUFFER,F)&&X&&Tt.drawBuffers(b,F),Tt.viewport(C),Tt.scissor(B),Tt.setScissorTest(G),ut){const Pt=It.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,Pt.__webglTexture,W)}else if(xt){const Pt=It.get(b.texture),Wt=O||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pt.__webglTexture,W||0,Wt)}E=-1},this.readRenderTargetPixels=function(b,O,W,X,F,ut,xt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=It.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xt!==void 0&&(Ct=Ct[xt]),Ct){Tt.bindFramebuffer(U.FRAMEBUFFER,Ct);try{const Pt=b.texture,Wt=Pt.format,Yt=Pt.type;if(!Ot.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ot.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&W>=0&&W<=b.height-F&&U.readPixels(O,W,X,F,At.convert(Wt),At.convert(Yt),ut)}finally{const Pt=L!==null?It.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(b,O,W,X,F,ut,xt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=It.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xt!==void 0&&(Ct=Ct[xt]),Ct){const Pt=b.texture,Wt=Pt.format,Yt=Pt.type;if(!Ot.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ot.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=b.width-X&&W>=0&&W<=b.height-F){Tt.bindFramebuffer(U.FRAMEBUFFER,Ct);const Lt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Lt),U.bufferData(U.PIXEL_PACK_BUFFER,ut.byteLength,U.STREAM_READ),U.readPixels(O,W,X,F,At.convert(Wt),At.convert(Yt),0);const ie=L!==null?It.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(U.FRAMEBUFFER,ie);const pe=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await rh(U,pe,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Lt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ut),U.deleteBuffer(Lt),U.deleteSync(pe),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,O=null,W=0){b.isTexture!==!0&&(pr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,b=arguments[1]);const X=Math.pow(2,-W),F=Math.floor(b.image.width*X),ut=Math.floor(b.image.height*X),xt=O!==null?O.x:0,Ct=O!==null?O.y:0;T.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,xt,Ct,F,ut),Tt.unbindTexture()},this.copyTextureToTexture=function(b,O,W=null,X=null,F=0){b.isTexture!==!0&&(pr("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,b=arguments[1],O=arguments[2],F=arguments[3]||0,W=null);let ut,xt,Ct,Pt,Wt,Yt,Lt,ie,pe;const ve=b.isCompressedTexture?b.mipmaps[F]:b.image;W!==null?(ut=W.max.x-W.min.x,xt=W.max.y-W.min.y,Ct=W.isBox3?W.max.z-W.min.z:1,Pt=W.min.x,Wt=W.min.y,Yt=W.isBox3?W.min.z:0):(ut=ve.width,xt=ve.height,Ct=ve.depth||1,Pt=0,Wt=0,Yt=0),X!==null?(Lt=X.x,ie=X.y,pe=X.z):(Lt=0,ie=0,pe=0);const ke=At.convert(O.format),ae=At.convert(O.type);let Dt;O.isData3DTexture?(T.setTexture3D(O,0),Dt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(T.setTexture2DArray(O,0),Dt=U.TEXTURE_2D_ARRAY):(T.setTexture2D(O,0),Dt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);const vn=U.getParameter(U.UNPACK_ROW_LENGTH),le=U.getParameter(U.UNPACK_IMAGE_HEIGHT),on=U.getParameter(U.UNPACK_SKIP_PIXELS),mi=U.getParameter(U.UNPACK_SKIP_ROWS),qe=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ve.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ve.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Pt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Wt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Yt);const er=b.isDataArrayTexture||b.isData3DTexture,Me=O.isDataArrayTexture||O.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const hn=It.get(b),nr=It.get(O),je=It.get(hn.__renderTarget),Dn=It.get(nr.__renderTarget);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,je.__webglFramebuffer),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Un=0;Un<Ct;Un++)er&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(b).__webglTexture,F,Yt+Un),b.isDepthTexture?(Me&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,It.get(O).__webglTexture,F,pe+Un),U.blitFramebuffer(Pt,Wt,ut,xt,Lt,ie,ut,xt,U.DEPTH_BUFFER_BIT,U.NEAREST)):Me?U.copyTexSubImage3D(Dt,F,Lt,ie,pe+Un,Pt,Wt,ut,xt):U.copyTexSubImage2D(Dt,F,Lt,ie,pe+Un,Pt,Wt,ut,xt);Tt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Me?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(Dt,F,Lt,ie,pe,ut,xt,Ct,ke,ae,ve.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Dt,F,Lt,ie,pe,ut,xt,Ct,ke,ve.data):U.texSubImage3D(Dt,F,Lt,ie,pe,ut,xt,Ct,ke,ae,ve):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,F,Lt,ie,ut,xt,ke,ae,ve.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,F,Lt,ie,ve.width,ve.height,ke,ve.data):U.texSubImage2D(U.TEXTURE_2D,F,Lt,ie,ut,xt,ke,ae,ve);U.pixelStorei(U.UNPACK_ROW_LENGTH,vn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le),U.pixelStorei(U.UNPACK_SKIP_PIXELS,on),U.pixelStorei(U.UNPACK_SKIP_ROWS,mi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,qe),F===0&&O.generateMipmaps&&U.generateMipmap(Dt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(b,O,W=null,X=null,F=0){return b.isTexture!==!0&&(pr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,b=arguments[2],O=arguments[3],F=arguments[4]||0),pr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,W,X,F)},this.initRenderTarget=function(b){It.get(b).__webglFramebuffer===void 0&&T.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),Tt.unbindTexture()},this.resetState=function(){w=0,A=0,L=null,Tt.reset(),Vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class va{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=n}clone(){return new va(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class _0 extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gn,this.environmentIntensity=1,this.environmentRotation=new gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class v0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Qo,this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[n+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Be=new R;class _s{constructor(t,e,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),r=ue(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),r=ue(r,this.array),s=ue(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new _s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ea extends di{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Pi;const ar=new R,Li=new R,Ii=new R,Di=new wt,lr=new wt,Dc=new ce,Jr=new R,cr=new R,jr=new R,Ll=new wt,io=new wt,Il=new wt;class Dl extends Te{constructor(t=new ea){if(super(),this.isSprite=!0,this.type="Sprite",Pi===void 0){Pi=new Ee;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new v0(e,5);Pi.setIndex([0,1,2,0,2,3]),Pi.setAttribute("position",new _s(n,3,0,!1)),Pi.setAttribute("uv",new _s(n,2,3,!1))}this.geometry=Pi,this.material=t,this.center=new wt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Li.setFromMatrixScale(this.matrixWorld),Dc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ii.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Li.multiplyScalar(-Ii.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;Qr(Jr.set(-.5,-.5,0),Ii,o,Li,r,s),Qr(cr.set(.5,-.5,0),Ii,o,Li,r,s),Qr(jr.set(.5,.5,0),Ii,o,Li,r,s),Ll.set(0,0),io.set(1,0),Il.set(1,1);let a=t.ray.intersectTriangle(Jr,cr,jr,!1,ar);if(a===null&&(Qr(cr.set(-.5,.5,0),Ii,o,Li,r,s),io.set(0,1),a=t.ray.intersectTriangle(Jr,jr,cr,!1,ar),a===null))return;const l=t.ray.origin.distanceTo(ar);l<t.near||l>t.far||e.push({distance:l,point:ar.clone(),uv:tn.getInterpolation(ar,Jr,cr,jr,Ll,io,Il,new wt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Qr(i,t,e,n,r,s){Di.subVectors(i,e).addScalar(.5).multiply(n),r!==void 0?(lr.x=s*Di.x-r*Di.y,lr.y=r*Di.x+s*Di.y):lr.copy(Di),i.copy(t),i.x+=lr.x,i.y+=lr.y,i.applyMatrix4(Dc)}class Uc extends Fe{constructor(t=null,e=1,n=1,r,s,o,a,l,c=Je,u=Je,f,p){super(null,o,a,l,c,u,r,s,f,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ul extends Ge{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ui=new ce,Nl=new ce,ts=[],Ol=new fi,M0=new ce,ur=new me,hr=new Ji;class x0 extends me{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ul(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,M0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ui),Ol.copy(t.boundingBox).applyMatrix4(Ui),this.boundingBox.union(Ol)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ui),hr.copy(t.boundingSphere).applyMatrix4(Ui),this.boundingSphere.union(hr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(ur.geometry=this.geometry,ur.material=this.material,ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(n),t.ray.intersectsSphere(hr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ui),Nl.multiplyMatrices(n,Ui),ur.matrixWorld=Nl,ur.raycast(t,ts);for(let o=0,a=ts.length;o<a;o++){const l=ts[o];l.instanceId=s,l.object=this,e.push(l)}ts.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ul(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Uc(new Float32Array(r*this.count),r,this.count,ca,pn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Nc extends di{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vs=new R,Ms=new R,Fl=new ce,fr=new pa,es=new Ji,ro=new R,Bl=new R;class y0 extends Te{constructor(t=new Ee,e=new Nc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)vs.fromBufferAttribute(e,r-1),Ms.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=vs.distanceTo(Ms);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),es.copy(n.boundingSphere),es.applyMatrix4(r),es.radius+=s,t.ray.intersectsSphere(es)===!1)return;Fl.copy(r).invert(),fr.copy(t.ray).applyMatrix4(Fl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=c){const h=u.getX(v),S=u.getX(v+1),y=ns(this,t,fr,l,h,S);y&&e.push(y)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(d),h=ns(this,t,fr,l,v,m);h&&e.push(h)}}else{const d=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=c){const h=ns(this,t,fr,l,v,v+1);h&&e.push(h)}if(this.isLineLoop){const v=ns(this,t,fr,l,g-1,d);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ns(i,t,e,n,r,s){const o=i.geometry.attributes.position;if(vs.fromBufferAttribute(o,r),Ms.fromBufferAttribute(o,s),e.distanceSqToSegment(vs,Ms,ro,Bl)>n)return;ro.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ro);if(!(l<t.near||l>t.far))return{distance:l,point:Bl.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const zl=new R,Hl=new R;class S0 extends y0{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)zl.fromBufferAttribute(e,r),Hl.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+zl.distanceTo(Hl);t.setAttribute("lineDistance",new Kt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Tr extends Fe{constructor(t,e,n,r,s,o,a,l,c){super(t,e,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ln{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const u=n[r],p=n[r+1]-u,d=(o-u)/p;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new wt:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new R,r=[],s=[],o=[],a=new R,l=new ce;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),p<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Le(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(Le(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Oc extends Ln{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new wt){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*u-d*f+this.aX,c=p*f+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class E0 extends Oc{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ma(){let i=0,t=0,e=0,n=0;function r(s,o,a,l){i=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,f){let p=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+f)+(l-a)/f;p*=u,d*=u,r(o,a,p,d)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const is=new R,so=new Ma,oo=new Ma,ao=new Ma;class Qi extends Ln{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new R){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(is.subVectors(r[0],r[1]).add(r[0]),c=is);const f=r[a%s],p=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(is.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=is),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),so.initNonuniformCatmullRom(c.x,f.x,p.x,u.x,g,v,m),oo.initNonuniformCatmullRom(c.y,f.y,p.y,u.y,g,v,m),ao.initNonuniformCatmullRom(c.z,f.z,p.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(so.initCatmullRom(c.x,f.x,p.x,u.x,this.tension),oo.initCatmullRom(c.y,f.y,p.y,u.y,this.tension),ao.initCatmullRom(c.z,f.z,p.z,u.z,this.tension));return n.set(so.calc(l),oo.calc(l),ao.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new R().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Gl(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,l=i*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*i+e}function b0(i,t){const e=1-i;return e*e*t}function w0(i,t){return 2*(1-i)*i*t}function T0(i,t){return i*i*t}function vr(i,t,e,n){return b0(i,t)+w0(i,e)+T0(i,n)}function A0(i,t){const e=1-i;return e*e*e*t}function R0(i,t){const e=1-i;return 3*e*e*i*t}function C0(i,t){return 3*(1-i)*i*i*t}function P0(i,t){return i*i*i*t}function Mr(i,t,e,n,r){return A0(i,t)+R0(i,e)+C0(i,n)+P0(i,r)}class L0 extends Ln{constructor(t=new wt,e=new wt,n=new wt,r=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new wt){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,r.x,s.x,o.x,a.x),Mr(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class I0 extends Ln{constructor(t=new R,e=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new R){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Mr(t,r.x,s.x,o.x,a.x),Mr(t,r.y,s.y,o.y,a.y),Mr(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class D0 extends Ln{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class U0 extends Ln{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class N0 extends Ln{constructor(t=new wt,e=new wt,n=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new wt){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(vr(t,r.x,s.x,o.x),vr(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fc extends Ln{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(vr(t,r.x,s.x,o.x),vr(t,r.y,s.y,o.y),vr(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class O0 extends Ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return n.set(Gl(a,l.x,c.x,u.x,f.x),Gl(a,l.y,c.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new wt().fromArray(r))}return this}}var F0=Object.freeze({__proto__:null,ArcCurve:E0,CatmullRomCurve3:Qi,CubicBezierCurve:L0,CubicBezierCurve3:I0,EllipseCurve:Oc,LineCurve:D0,LineCurve3:U0,QuadraticBezierCurve:N0,QuadraticBezierCurve3:Fc,SplineCurve:O0});class xs extends Ee{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new R,u=new wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,p=3;f<=e;f++,p+=3){const d=n+f/e*r;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[p]/t+1)/2,u.y=(o[p+1]/t+1)/2,l.push(u.x,u.y)}for(let f=1;f<=e;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(a,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xs(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class In extends Ee{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],p=[],d=[];let g=0;const v=[],m=n/2;let h=0;S(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Kt(f,3)),this.setAttribute("normal",new Kt(p,3)),this.setAttribute("uv",new Kt(d,2));function S(){const _=new R,I=new R;let w=0;const A=(e-t)/n;for(let L=0;L<=s;L++){const E=[],x=L/s,C=x*(e-t)+t;for(let B=0;B<=r;B++){const G=B/r,$=G*l+a,K=Math.sin($),Z=Math.cos($);I.x=C*K,I.y=-x*n+m,I.z=C*Z,f.push(I.x,I.y,I.z),_.set(K,A,Z).normalize(),p.push(_.x,_.y,_.z),d.push(G,1-x),E.push(g++)}v.push(E)}for(let L=0;L<r;L++)for(let E=0;E<s;E++){const x=v[E][L],C=v[E+1][L],B=v[E+1][L+1],G=v[E][L+1];(t>0||E!==0)&&(u.push(x,C,G),w+=3),(e>0||E!==s-1)&&(u.push(C,B,G),w+=3)}c.addGroup(h,w,0),h+=w}function y(_){const I=g,w=new wt,A=new R;let L=0;const E=_===!0?t:e,x=_===!0?1:-1;for(let B=1;B<=r;B++)f.push(0,m*x,0),p.push(0,x,0),d.push(.5,.5),g++;const C=g;for(let B=0;B<=r;B++){const $=B/r*l+a,K=Math.cos($),Z=Math.sin($);A.x=E*Z,A.y=m*x,A.z=E*K,f.push(A.x,A.y,A.z),p.push(0,x,0),w.x=K*.5+.5,w.y=Z*.5*x+.5,d.push(w.x,w.y),g++}for(let B=0;B<r;B++){const G=I+B,$=C+B;_===!0?u.push($,$+1,G):u.push($+1,$,G),L+=3}c.addGroup(h,L,_===!0?1:2),h+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ui extends In{constructor(t=1,e=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ui(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xa extends Ee{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],o=[];a(r),c(n),u(),this.setAttribute("position",new Kt(s,3)),this.setAttribute("normal",new Kt(s.slice(),3)),this.setAttribute("uv",new Kt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const y=new R,_=new R,I=new R;for(let w=0;w<e.length;w+=3)d(e[w+0],y),d(e[w+1],_),d(e[w+2],I),l(y,_,I,S)}function l(S,y,_,I){const w=I+1,A=[];for(let L=0;L<=w;L++){A[L]=[];const E=S.clone().lerp(_,L/w),x=y.clone().lerp(_,L/w),C=w-L;for(let B=0;B<=C;B++)B===0&&L===w?A[L][B]=E:A[L][B]=E.clone().lerp(x,B/C)}for(let L=0;L<w;L++)for(let E=0;E<2*(w-L)-1;E++){const x=Math.floor(E/2);E%2===0?(p(A[L][x+1]),p(A[L+1][x]),p(A[L][x])):(p(A[L][x+1]),p(A[L+1][x+1]),p(A[L+1][x]))}}function c(S){const y=new R;for(let _=0;_<s.length;_+=3)y.x=s[_+0],y.y=s[_+1],y.z=s[_+2],y.normalize().multiplyScalar(S),s[_+0]=y.x,s[_+1]=y.y,s[_+2]=y.z}function u(){const S=new R;for(let y=0;y<s.length;y+=3){S.x=s[y+0],S.y=s[y+1],S.z=s[y+2];const _=m(S)/2/Math.PI+.5,I=h(S)/Math.PI+.5;o.push(_,1-I)}g(),f()}function f(){for(let S=0;S<o.length;S+=6){const y=o[S+0],_=o[S+2],I=o[S+4],w=Math.max(y,_,I),A=Math.min(y,_,I);w>.9&&A<.1&&(y<.2&&(o[S+0]+=1),_<.2&&(o[S+2]+=1),I<.2&&(o[S+4]+=1))}}function p(S){s.push(S.x,S.y,S.z)}function d(S,y){const _=S*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function g(){const S=new R,y=new R,_=new R,I=new R,w=new wt,A=new wt,L=new wt;for(let E=0,x=0;E<s.length;E+=9,x+=6){S.set(s[E+0],s[E+1],s[E+2]),y.set(s[E+3],s[E+4],s[E+5]),_.set(s[E+6],s[E+7],s[E+8]),w.set(o[x+0],o[x+1]),A.set(o[x+2],o[x+3]),L.set(o[x+4],o[x+5]),I.copy(S).add(y).add(_).divideScalar(3);const C=m(I);v(w,x+0,S,C),v(A,x+2,y,C),v(L,x+4,_,C)}}function v(S,y,_,I){I<0&&S.x===1&&(o[y]=S.x-1),_.x===0&&_.z===0&&(o[y]=I/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function h(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xa(t.vertices,t.indices,t.radius,t.details)}}class ya extends xa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ya(t.radius,t.detail)}}class Er extends Ee{constructor(t=.5,e=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let f=t;const p=(e-t)/r,d=new R,g=new wt;for(let v=0;v<=r;v++){for(let m=0;m<=n;m++){const h=s+m/n*o;d.x=f*Math.cos(h),d.y=f*Math.sin(h),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=p}for(let v=0;v<r;v++){const m=v*(n+1);for(let h=0;h<n;h++){const S=h+m,y=S,_=S+n+1,I=S+n+2,w=S+1;a.push(y,_,w),a.push(_,I,w)}}this.setIndex(a),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Er(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hi extends Ee{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new R,p=new R,d=[],g=[],v=[],m=[];for(let h=0;h<=n;h++){const S=[],y=h/n;let _=0;h===0&&o===0?_=.5/e:h===n&&l===Math.PI&&(_=-.5/e);for(let I=0;I<=e;I++){const w=I/e;f.x=-t*Math.cos(r+w*s)*Math.sin(o+y*a),f.y=t*Math.cos(o+y*a),f.z=t*Math.sin(r+w*s)*Math.sin(o+y*a),g.push(f.x,f.y,f.z),p.copy(f).normalize(),v.push(p.x,p.y,p.z),m.push(w+_,1-y),S.push(c++)}u.push(S)}for(let h=0;h<n;h++)for(let S=0;S<e;S++){const y=u[h][S+1],_=u[h][S],I=u[h+1][S],w=u[h+1][S+1];(h!==0||o>0)&&d.push(y,_,w),(h!==n-1||l<Math.PI)&&d.push(_,I,w)}this.setIndex(d),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xe extends Ee{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new R,f=new R,p=new R;for(let d=0;d<=n;d++)for(let g=0;g<=r;g++){const v=g/r*s,m=d/n*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(v),f.y=(t+e*Math.cos(m))*Math.sin(v),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),p.subVectors(f,u).normalize(),l.push(p.x,p.y,p.z),c.push(g/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=r;g++){const v=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,h=(r+1)*(d-1)+g,S=(r+1)*d+g;o.push(v,m,S),o.push(m,h,S)}this.setIndex(o),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ar extends Ee{constructor(t=new Fc(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new R,l=new R,c=new wt;let u=new R;const f=[],p=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Kt(f,3)),this.setAttribute("normal",new Kt(p,3)),this.setAttribute("uv",new Kt(d,2));function v(){for(let y=0;y<e;y++)m(y);m(s===!1?e:0),S(),h()}function m(y){u=t.getPointAt(y/e,u);const _=o.normals[y],I=o.binormals[y];for(let w=0;w<=r;w++){const A=w/r*Math.PI*2,L=Math.sin(A),E=-Math.cos(A);l.x=E*_.x+L*I.x,l.y=E*_.y+L*I.y,l.z=E*_.z+L*I.z,l.normalize(),p.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,f.push(a.x,a.y,a.z)}}function h(){for(let y=1;y<=e;y++)for(let _=1;_<=r;_++){const I=(r+1)*(y-1)+(_-1),w=(r+1)*y+(_-1),A=(r+1)*y+_,L=(r+1)*(y-1)+_;g.push(I,w,L),g.push(w,A,L)}}function S(){for(let y=0;y<=e;y++)for(let _=0;_<=r;_++)c.x=y/e,c.y=_/r,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ar(new F0[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class He extends di{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mc,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sa extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class B0 extends Sa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const lo=new ce,kl=new R,Vl=new R;class Bc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ga,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;kl.setFromMatrixPosition(t.matrixWorld),e.position.copy(kl),Vl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vl),e.updateMatrixWorld(),lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Wl=new ce,dr=new R,co=new R;class z0 extends Bc{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new wt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),dr.setFromMatrixPosition(t.matrixWorld),n.position.copy(dr),co.copy(n.position),co.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(co),n.updateMatrixWorld(),r.makeTranslation(-dr.x,-dr.y,-dr.z),Wl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl)}}class H0 extends Sa{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new z0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class G0 extends Bc{constructor(){super(new Ac(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class k0 extends Sa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new G0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Xl=new ce;class V0{constructor(t,e,n=0,r=1/0){this.ray=new pa(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new ma,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Xl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xl),this}intersectObject(t,e=!0,n=[]){return na(t,this,n,e),n.sort(Yl),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)na(t[r],this,n,e);return n.sort(Yl),n}}function Yl(i,t){return i.distance-t.distance}function na(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)na(s[o],t,e,!0)}}class Ni{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Le(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sa);const zc=2.63,W0=1140,X0=790,re=i=>(i-W0)/zc,se=i=>(i-X0)/zc,Hc=i=>[re(i[0]),se(i[1])],kt=(i,t,e,n,r,s,o=null)=>({n:i,cat:n,tint:r,big:s,x:re(t),z:se(e),X:Math.round(re(t)),Z:Math.round(se(e)),gameCoords:o||[Math.round(re(t)),2,Math.round(se(e))]}),Oe=[kt("GUILIN",865,395,"nature",null,null,[-105,2,-130]),kt("PANDA RESERVE",800,437,"nature",null,null,[-130,2,-114]),kt("MT FUJI",693,448,"nature",null,null,[-170,2,-110]),kt("TOKYO",715,495,"city",null,null,[-155,2,-80]),kt("TOKYO",735,527,"city",null,null,[-162,2,-92]),kt("TOKYO TOWER",677,543,"monument",null,null,[-176,2,-74]),kt("SENSO-JI",733,569,"monument",null,null,[-155,2,-64]),kt("FUSHIMI INARI",641,684,"monument",null,null,[-190,4,-20]),kt("GYEONGBOKGUNG",938,435,"monument",null,null,[-74,2,-115]),kt("SEOUL",1003,435,"city",null,null,[-65,2,-95]),kt("GEUNJEONGJEON",968,461,"monument",null,null,[-65,4,-105]),kt("SEOUL",970,488,"city",null,null,[-52,16,-115]),kt("KING SEJONG",969,516,"monument",null,null,[-65,2,-84]),kt("CHEONGGYECHEON",970,545,"nature",null,null,[-65,2,-76]),kt("FORBIDDEN CITY",878,456,"monument",null,null,[-92,4,-107]),kt("TERRACOTTA",868,527,"monument",null,null,[-108,4,-80]),kt("ALPS",1135,474,"nature",null,null,[-2,9,-100]),kt("BIG BEN",1056,585,"monument",null,null,[-32,2,-58]),kt("LONDON",985,615,"city",null,null,[-32,2,-58]),kt("EIFFEL",1209,637,"monument",null,null,[26,2,-38]),kt("CITADEL",1140,790,"transit",null,null,[0,2,-4]),kt("TAJ MAHAL",1350,382,"monument",null,null,[80,4,-135]),kt("HOLLYWOOD",1574,474,"monument",null,null,[165,26,-100]),kt("HOLLYWOOD",1608,538,"monument",null,null,[178,3,-76]),kt("HOLLYWOOD",1537,577,"monument",null,null,[151,2,-61]),kt("RADIATOR SPRINGS",1690,690,"city","red",null,[190,2,-15]),kt("McQUEEN",1650,730,"monument",null,null,[190,2,-15]),kt("NEO YORK",1403,785,"city",null,null,[100,2,0]),kt("DUBAI",1590,890,"city",null,null,[170,2,42]),kt("PALM JUMEIRAH",1700,910,"transit",null,null,[176,5,46]),kt("PALM JUMEIRAH",1820,885,"monument","yellow",null,[213,2,46]),kt("PALM JUMEIRAH",1985,905,"monument",null,null,[324,2,46]),kt("ATLANTIS RESORT",1992,935,"monument","red",null,[324,2,46]),kt("WORLD ISLANDS",2060,850,"nature",null,null,[360,2,46]),kt("WORLD ISLANDS",2087,905,"nature",null,null,[350,2,24]),kt("THE WORLD ISLANDS",2140,968,"nature","yellow",null,[360,2,46]),kt("BURJ AL ARAB",1719,1076,"monument","blue",null,[220,2,110]),kt("BLUEWATERS",1835,1140,"city",null,null,[262,2,146]),kt("AIN DUBAI WHEEL",1829,1192,"monument","blue",null,[262,2,146]),kt("GIZA",733,860,"monument",null,null,[-155,2,36]),kt("MEXICO CITY",864,955,"city",null,null,[-105,2,72]),kt("AIRPORT",1022,915,"transit",null,1,[130,2,80]),kt("AMUSEMENT PARK",1190,1160,"monument",null,1,[15,2,135]),kt("BAR",1103,1215,"city",null,null,[12,2,58]),kt("HARBOR",1005,1190,"transit",null,null,[-32,2,152]),kt("ZOO",898,758,"nature",null,1,[-65,2,0])],Gc={monument:"#ffb547",city:"#5cc8ff",transit:"#b48cff",nature:"#6fdc8c"},Y0={red:"#ff5a4d",yellow:"#ffd84a",blue:"#4aa3ff"},uo=i=>Y0[i.tint]||Gc[i.cat],ho={monument:'<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V10M9.5 21V10M14.5 21V10M19 21V10M2.5 10 12 4l9.5 6"/></svg>',city:'<svg viewBox="0 0 24 24"><path d="M4 21V7l7-3v17M11 21V10l9 3v8M2 21h20M7 10v.01M7 14v.01M15 15v.01M18 17v.01"/></svg>',transit:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l2-4M15 21l-2-4M9 14h.01M15 14h.01"/></svg>',nature:'<svg viewBox="0 0 24 24"><path d="m3 20 6-11 4 6 3-4 5 9H3Z"/></svg>',you:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'},q0={GUILIN:"Karst peaks rising from a misty river.","PANDA RESERVE":"Bamboo groves and giant pandas.","MT FUJI":"Snow-capped sacred volcano.",TOKYO:"Neon blocks of a dense, colourful city.","TOKYO TOWER":"Red-and-white lattice broadcast tower.","SENSO-JI":"Temple gate and pagoda in Asakusa.","FUSHIMI INARI":"A path of vermilion torii gates.",GYEONGBOKGUNG:"Royal palace of the Joseon dynasty.",SEOUL:"Glass towers and neon streets.",GEUNJEONGJEON:"The palace throne hall.","KING SEJONG":"Golden statue of the scholar-king.",CHEONGGYECHEON:"Restored stream through downtown.","FORBIDDEN CITY":"Imperial palace walls and golden roofs.",TERRACOTTA:"The buried clay army.",ALPS:"Snow ridges around an alpine lake.","BIG BEN":"Clock tower beside the London Eye and a bridge.",LONDON:"Brick streets and red buses.",AIRPORT:"Terminal, control tower, runway and parked jets.","AMUSEMENT PARK":"Ferris wheel, roller coaster and carousel.",BAR:"Neon-lit corner bar with outdoor tables.",ZOO:"Elephants, giraffes, lions, penguins and a bird dome.",HARBOR:"Pier with ships, a crane and a lighthouse.",EIFFEL:"Iron lattice tower and its gardens.",CITADEL:"Central fortress and travel hub.","TAJ MAHAL":"White marble mausoleum with a reflecting pool.","RADIATOR SPRINGS":"Desert main street of neon and fins.",McQUEEN:"Racing stadium with a lap track.","NEO YORK":"Skyscraper canyon lit by neon billboards.",DUBAI:"Glass towers around a record-breaking spire.","PALM JUMEIRAH":"Palm-shaped island of fronds and villas.","ATLANTIS RESORT":"Twin-tower resort at the palm crown.","WORLD ISLANDS":"Archipelago of small private islands.","THE WORLD ISLANDS":"Island chain shaped like a world map.","BURJ AL ARAB":"Sail-shaped hotel on its own island.",BLUEWATERS:"Island district beside the big wheel.","AIN DUBAI WHEEL":"One of the tallest observation wheels.",GIZA:"Great pyramids and the Sphinx.","MEXICO CITY":"Stepped pyramid above colourful streets."},Z0=["The hillside HOLLYWOOD sign.","Chinese theatre and red carpet.","Walk of Fame brass stars."],$0=i=>{const t=Oe[i];return t?t.n==="HOLLYWOOD"?Z0[Oe.slice(0,i).filter(e=>e.n==="HOLLYWOOD").length]||"":q0[t.n]||"":""};function K0(){if(typeof location>"u")return{X:-79,Z:70,yaw:200};const i=new URLSearchParams(location.search);return{X:i.has("x")?+i.get("x"):-79,Z:i.has("z")?+i.get("z"):70,yaw:i.has("yaw")?+i.get("yaw"):200}}const we=K0(),fo=(i,t,e=we.X,n=we.Z)=>Math.round(Math.hypot(i-e,t-n)),J0=i=>()=>(i=i*16807%2147483647)/2147483647;function j0(){let i=null;const t={tickers:[],spinners:[],matCache:{},FLAT:[],flags:[],hovered:-1,selected:null,pin:null,filter:"all",topView:!1,carOrbit:null,railCurve:null,train:null,ships:[],smokes:[],clouds:[],lava:null,sun:null,hemiLight:null,placedModels:null,roads:null,railG:null,scene:null,camera:null,renderer:null,controls:null,terrain:null,water:null,waterMat:null,youG:null,arrowG:null,pinG:null,cursor:null,selRing:null,night:{t:0,registry:[],add(e,n={}){t.night.registry.push({mat:e,dayIntensity:n.dayIntensity??e.emissiveIntensity??1,nightIntensity:n.nightIntensity??(n.dayIntensity!=null?n.dayIntensity*2.2:1.8),dayColor:n.dayColor??e.color.clone(),nightColor:n.nightColor??null})}},winTex(){if(i)return i;const e=document.createElement("canvas");e.width=64,e.height=128;const n=e.getContext("2d");n.fillStyle="#000",n.fillRect(0,0,64,128);const r=J0(5);for(let s=4;s<124;s+=8)for(let o=4;o<60;o+=8)r()>.35&&(n.fillStyle=r()>.5?"#ffe7a0":"#bfe4ff",n.fillRect(o,s,4,5));return i=new Tr(e),i.colorSpace=Ie,i},reset(){t.tickers=[],t.spinners=[],t.matCache={},t.FLAT=[],t.flags=[],t.hovered=-1,t.selected=null,t.pin=null,t.filter="all",t.topView=!1,t.carOrbit=null,t.railCurve=null,t.train=null,t.ships=[],t.smokes=[],t.clouds=[],t.lava=null,t.sun=null,t.hemiLight=null,t.night.registry=[],t.night.t=0,i&&(i.dispose(),i=null)}};return t}const mn=(i,t,e)=>Math.max(t,Math.min(e,i)),de=(i,t,e)=>{const n=mn((e-i)/(t-i),0,1);return n*n*(3-2*n)},tr=i=>()=>(i=i*16807%2147483647)/2147483647,rs=(i,t)=>{const e=Math.sin(i*127.1+t*311.7)*43758.5453;return e-Math.floor(e)},kc=(i,t)=>{const e=Math.floor(i),n=Math.floor(t),r=i-e,s=t-n,o=r*r*(3-2*r),a=s*s*(3-2*s);return(rs(e,n)*(1-o)+rs(e+1,n)*o)*(1-a)+(rs(e,n+1)*(1-o)+rs(e+1,n+1)*o)*a},ys=(i,t,e=4)=>{let n=.5,r=0,s=1;for(let o=0;o<e;o++)r+=n*kc(i*s,t*s),s*=2,n*=.5;return r};function Q0(i,t=6){const e=i.length,n=[];for(let r=0;r<e;r++){const s=i[(r-1+e)%e],o=i[r],a=i[(r+1)%e],l=i[(r+2)%e];for(let c=0;c<t;c++){const u=c/t,f=u*u,p=f*u;n.push([0,1].map(d=>.5*(2*o[d]+(-s[d]+a[d])*u+(2*s[d]-5*o[d]+4*a[d]-l[d])*f+(-s[d]+3*o[d]-3*a[d]+l[d])*p)))}}return n}function rn(i,t=6,e=!0){const n=i.map(Hc),r=e?Q0(n,t):n;let s=1e9,o=1e9,a=-1e9,l=-1e9;return r.forEach(c=>{s=Math.min(s,c[0]),o=Math.min(o,c[1]),a=Math.max(a,c[0]),l=Math.max(l,c[1])}),r.bb=[s-40,o-40,a+40,l+40],r}function ql(i,t,e,n=20){const r=[];for(let s=0;s<n;s++){const o=s/n*6.2832;r.push([i+Math.cos(o)*e,t+Math.sin(o)*e])}return r.bb=[i-e-40,t-e-40,i+e+40,t+e+40],r}function Se(i,t,e){const n=e.bb;if(i<n[0]||i>n[2]||t<n[1]||t>n[3])return-999;let r=1e9,s=!1;for(let o=0,a=e.length-1;o<e.length;a=o++){const l=e[o],c=e[a];l[1]>t!=c[1]>t&&i<(c[0]-l[0])*(t-l[1])/(c[1]-l[1])+l[0]&&(s=!s);const u=c[0]-l[0],f=c[1]-l[1],p=i-l[0],d=t-l[1],g=mn((p*u+d*f)/(u*u+f*f||1),0,1),v=p-u*g,m=d-f*g,h=v*v+m*m;h<r&&(r=h)}return(s?1:-1)*Math.sqrt(r)}const tg=rn([[640,430],[700,330],[900,300],[1100,270],[1300,250],[1500,290],[1620,360],[1665,520],[1645,700],[1625,860],[1600,1e3],[1380,1070],[1262,1110],[1245,1260],[1170,1325],[1050,1285],[1030,1135],[900,1120],[760,1080],[640,1e3],[615,800],[600,600]],8),Vc=rn([[790,340],[925,335],[955,565],[830,600],[775,520]]),Wc=rn([[1240,385],[1430,312],[1565,335],[1625,430],[1645,640],[1500,685],[1340,640],[1250,520]]),Xc=rn([[1340,632],[1600,660],[1612,905],[1400,912],[1340,800]]),Ea=rn([[655,842],[800,832],[935,905],[905,1035],[700,975]]),Yc=rn([[680,545],[780,560],[765,640],[690,655]]),qc=rn([[1045,990],[1250,990],[1250,1120],[1170,1170],[1050,1130]]),Zc=rn([[962,856],[1082,856],[1082,974],[962,974]],3),$c=rn([[1076,1105],[1232,1105],[1232,1275],[1076,1275]],3),Kc=rn([[1500,640],[1690,640],[1700,780],[1560,800]]),Jc=[rn([[930,500],[1020,500],[1022,570],[935,572]]),rn([[1338,470],[1362,470],[1362,592],[1338,592]],3),ql(re(710),se(942),9),ql(re(1108),se(500),12)],eg=[[1070,455,110],[1110,425,150],[1152,478,100],[1203,476,120],[1098,510,90],[1172,525,80],[1218,500,90]].map(([i,t,e])=>[re(i),se(t),e*.3]),kn=[re(1181),se(375)],Zl=[re(693),se(440)],$l=[re(1690),se(690)],Kl=[re(1580),se(500)],ng=(()=>{const i=tr(11),t=[],e=re(865),n=se(395);for(let r=0;r<14;r++)t.push([e+(i()-.5)*70,n+(i()-.5)*40,2.8+i()*2.2,11+i()*10]);return t})(),Ss=[re(1770),se(912)],ig=[[Ss[0]+30,Ss[1],130,70],[re(2095),se(900),60,55],[re(1829),se(1175),32,32],[re(1719),se(1078),24,24]],jc=[[re(1719),se(1078),10],[re(1829),se(1175),13],[re(2040),se(862),6],[re(2065),se(832),6],[re(2090),se(885),6],[re(2110),se(845),6],[re(2060),se(905),6],[re(2140),se(968),7],[re(2118),se(915),6]];function Yi(i,t){const e=Se(i,t,tg)+(ys(i*.02+7,t*.02)-.5)*18;let n;e>=0?n=.55+Math.min(1,e/18)*3.4+(ys(i*.05,t*.05)-.38)*7*de(0,26,e):n=.55-16*(1-Math.exp(e/15));const r=de(4,18,e);let s=0;for(const[o,a,l]of eg)s+=l*Math.exp(-Math.pow(Math.hypot(i-o,t-a)/11,1.7));{const o=Math.hypot(i-kn[0],t-kn[1]),a=o/44;a<1&&(s+=60*Math.pow(1-a,1.3)),s-=9*Math.exp(-Math.pow(o/5.5,2))}{const o=Math.hypot(i-Zl[0],t-Zl[1]);s+=34*Math.exp(-Math.pow(o/17,1.5))-3*Math.exp(-Math.pow(o/3,2))}for(const[o,a,l,c]of ng)s+=c*Math.exp(-Math.pow(Math.hypot(i-o,t-a)/l,2));s+=15*(1-de(15,26,Math.hypot(i-$l[0],t-$l[1]))),s+=14*Math.exp(-Math.pow(Math.hypot(i-Kl[0],t-Kl[1])/22,2)),Se(i,t,Ea)>0&&(s+=Math.sin(i*.5+t*.3)*.35+Math.sin(t*.7)*.25),n+=s*r;for(const o of Jc){const a=Se(i,t,o);if(a>-4&&e>0){const l=de(-1,4,a);n=n*(1-l)+-1.5*l}}{const o=Math.hypot(i,t),a=de(4,1.5,Math.abs(o-27));a>0&&(n=n*(1-a)+-1.3*a)}for(const[o,a,l,c]of ig){const u=Math.hypot((i-o)/l,(t-a)/c);if(u<1.6){const f=-2.2-10*de(.8,1.6,u);n<f&&(n=f)}}for(const[o,a,l]of jc){const c=Math.hypot(i-o,t-a)/l;if(c<1.3){const u=1.6*de(1.25,.8,c);u>n&&(n=u)}}return{h:n,d:e}}function rg(i,t=Oe){i.FLAT=[],t.forEach(n=>{if(n.cat==="nature"&&!n.big)return;const r=Yi(n.x,n.z).h;r>.9&&i.FLAT.push({x:n.x,z:n.z,R:n.big?26:n.cat==="city"?20:12,h:Math.max(r,2.2)})});const e=i.FLAT.find(n=>Math.hypot(n.x,n.z)<2);e&&(e.R=22,e.h=2.6)}function dn(i,t,e){let n=Yi(i,t).h;if(e&&e.FLAT)for(const r of e.FLAT){const s=Math.hypot(i-r.x,t-r.z);s<r.R&&(n+=(r.h-n)*de(r.R,r.R*.5,s))}return n}const ye=i=>new Ft(i),xe={g1:ye("#76b347"),g2:ye("#4a8832"),forest:ye("#2a6636"),desert1:ye("#e0983f"),desert2:ye("#c4742e"),slate:ye("#59658a"),giza:ye("#bd6c36"),tokyo:ye("#e277b0"),sand:ye("#e8d08c"),yellow:ye("#f2cb4c"),pink:ye("#d24a86"),mesa:ye("#be5a2a"),rock:ye("#8d8676"),snow:ye("#f4f8ff"),dark:ye("#463f56"),lava:ye("#ff7a1f"),turq:ye("#9ae8d4"),turq2:ye("#2db6c4"),deep:ye("#0f5f89"),deep2:ye("#0a3a66"),white:ye("#ffffff")},sg=new Ft;function og(i,t,e,n,r){const s=ys(i*.04,t*.04),o=kc(i*.9,t*.9);r.copy(xe.g1).lerp(xe.g2,s);const a=de(-3,4,Se(i,t,Vc)),l=de(-3,4,Se(i,t,Wc)),c=de(-2,3,Se(i,t,Xc)),u=de(-3,4,Se(i,t,Ea)),f=de(-2,3,Se(i,t,Yc)),p=de(-3,4,Se(i,t,qc)),d=de(-1,2,Se(i,t,Zc)),g=de(-1,2,Se(i,t,$c)),v=de(-3,4,Se(i,t,Kc));r.lerp(xe.forest,a*.95),r.lerp(sg.copy(xe.desert1).lerp(xe.desert2,s),l),r.lerp(xe.mesa,v*.8),r.lerp(xe.slate,c),r.lerp(xe.giza,u),r.lerp(xe.tokyo,f*.9),r.lerp(xe.sand,p),r.lerp(xe.yellow,d),r.lerp(xe.pink,g);const m=Math.hypot(i-kn[0],t-kn[1]);r.lerp(xe.rock,de(12,22,e)*.9);const h=1-de(8,42,m);if(r.lerp(xe.snow,de(26,34,e+(o-.5)*4)*(1-h)),r.lerp(xe.dark,h*.88),r.lerp(xe.lava,1-de(1.5,9,m)),n>0&&r.lerp(xe.sand,de(7,1.2,n)*.85),e<.55){const y=Math.max(0,.55-e);r.copy(xe.sand).lerp(xe.turq,de(0,2.5,y)).lerp(xe.turq2,de(2,7,y)).lerp(xe.deep,de(6,16,y)).lerp(xe.deep2,de(14,24,y))}n>-2.5&&n<.8&&r.lerp(xe.white,.4*(1-Math.abs(n+.8)/1.8));const S=(o-.5)*.07;r.r+=S,r.g+=S,r.b+=S}const si=-310,ia=470,oi=-270,ra=280,qi=2.2,Ae=Math.round((ia-si)/qi)+1,Ve=Math.round((ra-oi)/qi)+1;function ag(i,t=null){rg(i,Oe);const e=new Float32Array(Ae*Ve*3),n=new Float32Array(Ae*Ve*3),r=new Ft;let s=0;for(let p=0;p<Ve;p++)for(let d=0;d<Ae;d++){const g=si+d*qi,v=oi+p*qi;let m;if(t&&t.length===Ae*Ve)m=t[s];else{m=Yi(g,v).h;for(const y of i.FLAT){const _=Math.hypot(g-y.x,v-y.z);_<y.R&&(m+=(y.h-m)*de(y.R,y.R*.5,_))}}e[s*3]=g,e[s*3+1]=m,e[s*3+2]=v;const h=Yi(g,v);og(g,v,m,h.d,r),n[s*3]=r.r,n[s*3+1]=r.g,n[s*3+2]=r.b,s++}const o=new Uint32Array((Ae-1)*(Ve-1)*6);let a=0;for(let p=0;p<Ve-1;p++)for(let d=0;d<Ae-1;d++){const g=p*Ae+d,v=g+1,m=g+Ae,h=m+1;o[a++]=g,o[a++]=m,o[a++]=v,o[a++]=v,o[a++]=m,o[a++]=h}const l=new Ee;l.setAttribute("position",new Ge(e,3)),l.setAttribute("color",new Ge(n,3)),l.setIndex(new Ge(o,1)),l.computeVertexNormals();const c=l.attributes.normal.array;for(let p=1;p<Ve-1;p++)for(let d=1;d<Ae-1;d++){const g=p*Ae+d,v=e[g*3+1];if(v<.55)continue;const m=de(.86,.62,c[g*3+1]),h=(e[(g-1)*3+1]+e[(g+1)*3+1]+e[(g-Ae)*3+1]+e[(g+Ae)*3+1])/4,S=mn(1-(h-v)*.09,.7,1)*mn(1+(v-h)*.03,.9,1.1),y=n[g*3],_=n[g*3+1],I=n[g*3+2],w=.55*m;n[g*3]=(y+(.52-y)*w)*S,n[g*3+1]=(_+(.47-_)*w)*S,n[g*3+2]=(I+(.4-I)*w)*S}const u=new He({vertexColors:!0,roughness:.95,metalness:0}),f=new me(l,u);return f.receiveShadow=!0,f.castShadow=!0,i.terrain=f,i.pos=e,i.col=n,i.tg=l,{terrain:f,pos:e,col:n,tg:l}}function lg(i){const{pos:t}=i,e=(()=>{const s=new Uint8Array(Ae*Ve*4);for(let a=0;a<Ae*Ve;a++)s[a*4]=mn((t[a*3+1]+8)/16,0,1)*255,s[a*4+3]=255;const o=new Uc(s,Ae,Ve,nn);return o.magFilter=en,o.minFilter=en,o.needsUpdate=!0,o})(),n=new Pn({transparent:!0,depthWrite:!1,uniforms:{t:{value:0},cD:{value:ye("#9cc4dc")},hm:{value:e},box:{value:new he(si,oi,(Ae-1)*qi,(Ve-1)*qi)}},vertexShader:"varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",fragmentShader:`uniform float t;uniform vec3 cD;uniform sampler2D hm;uniform vec4 box;varying vec3 vW;
vec2 G(vec2 p,vec2 d,float k,float a,float s){return d*k*a*cos(dot(d,p)*k+t*s);}
float N(vec2 p){return sin(p.x*1.7+sin(p.y*1.3+t*.4))*sin(p.y*1.9-sin(p.x*1.1-t*.3));}
void main(){
 vec2 p=vW.xz;vec2 uv=(p-box.xy)/box.zw;float ins=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
 float h=texture2D(hm,clamp(uv,0.,1.)).r*16.-8.;float depth=mix(12.,-h,ins);
 float dc=length(cameraPosition-vW);float lod=1.-smoothstep(70.,380.,dc);
 vec2 g=G(p,normalize(vec2(1.,.35)),.22,.9,.9)+G(p,normalize(vec2(-.4,1.)),.37,.55,1.2)+lod*(G(p,normalize(vec2(.7,-.8)),.71,.32,1.6)+G(p,normalize(vec2(-1.,-.2)),1.3,.16,2.1)+G(p,normalize(vec2(.2,1.)),2.4,.07,2.8));
 vec3 n=normalize(vec3(-g.x*.55*(.45+.55*lod),1.,-g.y*.55*(.45+.55*lod)));
 vec3 V=normalize(cameraPosition-vW);vec3 L=normalize(vec3(-.5,.73,.42));
 vec3 sh=vec3(.28,.78,.74),md=vec3(.04,.42,.62),dp=vec3(.015,.11,.28);
 vec3 c=mix(sh,md,smoothstep(.2,3.5,depth));c=mix(c,dp,smoothstep(3.,11.,depth));
 float ndv=clamp(dot(n,V),0.,1.);float fr=.02+.98*pow(1.-ndv,5.);
 vec3 sky=mix(vec3(.36,.6,.88),vec3(.68,.85,.96),pow(1.-ndv,2.));
 c=mix(c,sky,clamp(fr*1.05,0.,.55));
 c+=vec3(.05,.12,.1)*smoothstep(.3,-.6,N(p*.5))*(1.-smoothstep(0.,4.,depth));
 vec3 H=normalize(L+V);c+=vec3(1.,.93,.78)*pow(max(dot(n,H),0.),260.)*1.6*(.12+.88*lod);
 float sw=smoothstep(.55,1.,N(p*.35+t*.05))*.07;c+=sw;
 float shore=1.-smoothstep(0.,1.4,depth+.25*N(p*.9+t*.7));
 float lace=smoothstep(.2,.8,N(p*1.1-t*.5)*.5+.5);c=mix(c,vec3(.95,.99,1.),shore*lace*.9*ins);
 float far=smoothstep(420.,1000.,length(p-vec2(80.,0.)));c=mix(c,cD,far);
 float a=mix(.4,.96,smoothstep(0.,4.5,depth));a=mix(a,1.,far);a=max(a,shore*lace*.85*ins);
 gl_FragColor=vec4(c,a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`}),r=new me(new Ye(5e3,5e3).rotateX(-Math.PI/2),n);return r.position.y=0,r.renderOrder=2,i.water=r,i.waterMat=n,r}const Jt=(i,t,e={})=>{const n=t+"|"+(e.win?1:0)+(e.e||"")+(e.m||0)+(e.r||"")+(e.side||"")+(e.op||"");if(!i.matCache[n]){const r=new He({color:t,roughness:e.r??.82,metalness:e.m??0,emissive:e.e||"#000",emissiveIntensity:e.ei??1,side:e.side?De:Rn,transparent:!!e.op,opacity:e.op??1,...e.win?{emissive:"#fff",emissiveMap:i.winTex(),emissiveIntensity:.5}:{}});i.matCache[n]=r,i.night&&(e.e||e.win)&&i.night.add(r,{dayIntensity:r.emissiveIntensity,nightIntensity:e.win?1.6:r.emissiveIntensity*2.2})}return i.matCache[n]};function ne(i,t,e,n,r,s){const o=new me(i,t);return o.position.set(e,n,r),o.castShadow=!0,o.receiveShadow=!0,s&&s.add(o),o}const H=(i,t,e,n,r,s,o,a,l,c)=>ne(new Xn(e,n,r),Jt(i,s,c),o,a+n/2,l,t),Mt=(i,t,e,n,r,s,o,a,l,c=16,u)=>ne(new In(e,n,r,c),Jt(i,s,u),o,a+r/2,l,t),ge=(i,t,e,n,r,s,o,a,l=16,c)=>ne(new ui(e,n,l),Jt(i,r,c),s,o+n/2,a,t),$t=(i,t,e,n,r,s,o,a,l)=>ne(new hi(e,20,14,0,Math.PI*2,0,l?Math.PI/2:Math.PI),Jt(i,n,a),r,s,o,t);function ai(i,t,e,n,r=7,s=0){const o=Mt(i,t,.3,.5,r,"#8a6a3d",e,s,n,6);o.rotation.z=.12;for(let a=0;a<7;a++){const l=a/7*6.283,c=H(i,t,.7,.12,4.2,"#2f9a3d",e+Math.cos(l)*2,s+r-.4,n+Math.sin(l)*2);c.rotation.y=-l+Math.PI/2,c.rotation.x=.45}}function pi(i,t,e,n,r,s,o,a,l=!0,c=0){const u=tr(a);for(let f=0;f<e;f++){const p=u()*6.283,d=Math.sqrt(u())*n,g=3+u()*4,v=s+Math.pow(u(),1.6)*(o-s);H(i,t,g,v,g*(.8+u()*.5),r[f%r.length],Math.cos(p)*d,c,Math.sin(p)*d,l?{win:1,m:.15,r:.5}:void 0)}}function ba(i,t,e,n,r,s,o=1,a="#b13a2a"){for(let l=0;l<o;l++){const c=1-l*.28;H(i,t,e*c*.8,4.2,n*c*.8,a,0,r+l*8,0);const u=ge(i,t,e*c*.72,4.6,s,0,r+l*8+4.2,0,4);u.rotation.y=Math.PI/4,u.scale.z=n/e}}function Zi(i,t,e,n){const r=new x0(i,t,e.length),s=new Te;return e.forEach((o,a)=>{s.position.set(o[0],o[1],o[2]),s.rotation.set(0,o[3]||0,0),s.scale.setScalar(o[4]||1),s.updateMatrix(),r.setMatrixAt(a,s.matrix)}),r.castShadow=!0,r.receiveShadow=!0,n&&n.add(r),r}function Ts(i,t,e,n,r,s){const o=document.createElement("canvas");o.width=512,o.height=Math.round(512*e/t);const a=o.getContext("2d");a.fillStyle=r,a.fillRect(0,0,o.width,o.height),a.strokeStyle=n,a.lineWidth=8,a.strokeRect(10,10,o.width-20,o.height-20),a.fillStyle=n,a.font="900 "+Math.round(o.height*.52)+"px Arial Black,Arial,sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(i,o.width/2,o.height/2+4);const l=new Tr(o);return l.colorSpace=Ie,new me(new Ye(t,e),new He({map:l,emissiveMap:l,emissive:"#fff",emissiveIntensity:s||.8,side:De,roughness:.5}))}function ss(i,t,e,n,r,s,o,a){const l=new Bt;l.position.set(e,n,r),l.rotation.y=s,l.scale.setScalar(o),t.add(l);const c=Mt(i,l,.9,.9,10,"#f4f6f8",0,0,0,14,{r:.4});c.rotation.x=Math.PI/2,c.position.set(0,1.5,0),$t(i,l,.9,"#f4f6f8",0,1.5,5,{r:.4}).scale.set(1,1,1.4),H(i,l,1.86,.16,8,"#2b4c7e",0,1.9,0),H(i,l,11,.22,2.4,"#dfe4ea",0,1.1,.4),H(i,l,.25,2.8,1.9,a,0,2.5,-4.3),H(i,l,4.2,.2,1.3,"#dfe4ea",0,1.6,-4.4);for(const f of[-2.8,2.8]){const p=Mt(i,l,.55,.55,1.8,"#9aa3ad",0,0,0,10);p.rotation.x=Math.PI/2,p.position.set(f,.75,1.4)}return l}function cg(i,t,e,n,r){const s=new Bt;s.position.set(e,.3,n),s.rotation.y=r,t.add(s),$t(i,s,1.3,"#d6262c",0,1.6,0).scale.set(1,.85,1.6),H(i,s,.5,.5,4,"#d6262c",0,1.7,-3.2),H(i,s,.15,1.4,.6,"#d6262c",0,1.6,-5.2),H(i,s,1.4,.6,.6,"#9fd6f0",0,2,1.5);for(const l of[-.9,.9])H(i,s,.15,.15,3.4,"#333",l,.3,0);Mt(i,s,.1,.1,1,"#333",0,2.6,0,6);const a=new Bt;return a.position.y=3.6,s.add(a),H(i,a,8,.08,.35,"#222",0,0,0),H(i,a,.35,.08,8,"#222",0,0,0),i.tickers.push(l=>{a.rotation.y=l*18}),s}function os(i,t,e,n,r,s,o){const a=new Bt;a.position.set(e,0,n),t.add(a),H(i,a,r,.12,s,o,0,.2,0);const l="#8b5a2b";for(const[f,p,d,g]of[[0,-s/2,r,.18],[0,s/2,r,.18],[-r/2,0,.18,s],[r/2,0,.18,s]])H(i,a,d,.15,g,l,f,1.1,p),H(i,a,d,.15,g,l,f,.65,p);const c=Math.round(r/2.4),u=Math.round(s/2.4);for(let f=0;f<=c;f++)for(const p of[-s/2,s/2])H(i,a,.22,1.5,.22,l,-r/2+f*r/c,.2,p);for(let f=1;f<u;f++)for(const p of[-r/2,r/2])H(i,a,.22,1.5,.22,l,p,.2,-s/2+f*s/u);return a}function Jl(i,t,e,n,r,s){const o=new Bt;o.position.set(e,.2,n),o.rotation.y=r,o.scale.setScalar(s),t.add(o);const a="#8e919b";$t(i,o,1.7,a,0,2.9,0).scale.set(1.5,1.1,1);for(const[u,f]of[[1.3,.7],[1.3,-.7],[-1.3,.7],[-1.3,-.7]])Mt(i,o,.5,.55,2.2,a,u,0,f,10);$t(i,o,1.05,a,2.5,3.3,0);for(const u of[-1,1])$t(i,o,.75,"#80838d",2,3.4,u*1.15).scale.set(.3,1,.9),ge(i,o,.12,1.1,"#f5efe0",3.1,2.55,u*.5,6).rotation.z=-Math.PI/2+.35,$t(i,o,.12,"#111",3.2,3.7,u*.55);const c=new Bt;return c.position.set(3.3,3,0),o.add(c),Mt(i,c,.4,.2,2.6,a,0,-2.6,0,8),Mt(i,o,.08,.1,1.2,a,-2.3,2.2,0,5).rotation.z=.5,c}function jl(i,t,e,n,r,s){const o=new Bt;o.position.set(e,.2,n),o.rotation.y=r,o.scale.setScalar(s),t.add(o);const a="#e9b64a",l="#8a5a1e";for(const[u,f]of[[1,.4],[1,-.4],[-1,.4],[-1,-.4]])Mt(i,o,.17,.2,3.4,a,u,0,f,6);H(i,o,3,1.5,1.2,a,0,3.3,0);for(const[u,f,p]of[[-.8,3.5,.62],[.4,3.2,.62],[-.2,3.7,-.62],[.9,3.4,-.62],[-1,3.1,-.62]])H(i,o,.55,.5,.1,l,u,f,p);const c=new Bt;c.position.set(1.2,4.2,0),c.rotation.z=-.28,o.add(c),Mt(i,c,.3,.45,3.8,a,0,0,0,8),H(i,c,1.1,.6,.62,a,.35,3.85,0),Mt(i,c,.05,.05,.5,l,0,4.5,.15,4),Mt(i,c,.05,.05,.5,l,0,4.5,-.15,4);for(const u of[.8,1.8,2.8])H(i,c,.5,.4,.1,l,0,u,.38);return c}function Ql(i,t,e,n,r,s,o){const a=new Bt;a.position.set(e,.2,n),a.rotation.y=r,a.scale.setScalar(s),t.add(a);const l="#d9a441";H(i,a,2.2,1,.9,l,0,1,0);for(const[c,u]of[[.8,.3],[.8,-.3],[-.8,.3],[-.8,-.3]])H(i,a,.3,1,.3,l,c,0,u);return $t(i,a,.6,l,1.3,1.8,0),o&&$t(i,a,.9,"#8a5a1e",1,1.8,0),Mt(i,a,.07,.07,1.4,l,-1.3,1.1,0,5).rotation.z=.9,a}function ug(i,t,e,n,r){const s=new Bt;return s.position.set(e,.2,n),s.rotation.y=r,t.add(s),$t(i,s,.38,"#1b1b1f",0,.75,0).scale.set(1,1.5,.9),$t(i,s,.3,"#ffffff",.12,.7,0).scale.set(.8,1.4,.8),$t(i,s,.22,"#1b1b1f",0,1.55,0),ge(i,s,.08,.3,"#ff9a1f",.22,1.5,0,6).rotation.z=-Math.PI/2,s}function tc(i,t,e,n,r,s,o){const a=new Bt;a.position.set(e,-1.4,n),a.rotation.y=r,a.scale.setScalar(s),t.add(a),H(i,a,16,3,5,o,0,0,0),H(i,a,16.4,.4,5.4,"#e8c25a",0,3,0);const l=ge(i,a,2.5,4,o,10,0,0,4);l.rotation.z=-Math.PI/2,l.rotation.y=Math.PI/4,l.scale.set(1,1,.8),H(i,a,5,2.4,4.6,"#7a4b25",-6,3.4,0);for(const[c,u]of[[-3,14],[2,16],[7,11]]){Mt(i,a,.25,.3,u,"#3a230f",c,3,0,6);const f=ne(new Ye(5.2,u*.6),Jt(i,"#fff6dc",{side:1}),c+.3,3+u*.62,0,a);f.rotation.y=Math.PI/2}return a}function hg(i,t,e,n,r){const s=new Bt;s.position.set(e,-1,n),s.rotation.y=r,t.add(s),H(i,s,11,1.5,3,"#ffffff",0,0,0,{r:.3});const o=ge(i,s,1.5,3,"#ffffff",6.5,0,0,4);return o.rotation.z=-Math.PI/2,o.rotation.y=Math.PI/4,o.scale.set(1,1,1),H(i,s,4.6,1.3,2.4,"#e8f1f8",-.5,1.5,0),H(i,s,4.7,.5,2.5,"#2b4c7e",-.5,2,0),Mt(i,s,.1,.12,5,"#999",1.8,2.8,0,6),s}function po(i,t,e,n){const r=new Bt;r.position.set(t,.2,e),r.rotation.y=n,i.scene.add(r),H(i,r,18,4,6,"#6b3f1d",0,0,0),H(i,r,6,3,5.4,"#7a4b25",-6,2,0);for(const[s,o]of[[-3,22],[3,26],[8,18]]){Mt(i,r,.35,.4,o,"#3a230f",s,3,0,6);const a=ne(new Ye(7,o*.6),Jt(i,"#fff6dc",{side:1}),s+.3,3+o*.6,0,r);a.rotation.y=Math.PI/2}return i.ships.push(r),r}function fg(i,t){const e="#6b5846";for(const[s,o]of[[1,1],[1,-1],[-1,1],[-1,-1]]){const a=H(t,i,1.7,19,1.7,e,s*5,0,o*5);a.position.y=9.5,a.rotation.z=s*.22,a.rotation.x=-o*.22}for(const s of[1,-1]){ne(new Xe(5.6,.55,6,16,Math.PI),Jt(t,e),0,0,s*6.6,i);const o=ne(new Xe(5.6,.55,6,16,Math.PI),Jt(t,e),s*6.6,0,0,i);o.rotation.y=Math.PI/2}H(t,i,11,1,11,e,0,11,0);const n=Mt(t,i,1.1,3.4,11,e,0,12,0,4);n.rotation.y=Math.PI/4,H(t,i,5.5,.9,5.5,e,0,22.5,0);const r=Mt(t,i,.4,1.1,8,e,0,23.4,0,4);r.rotation.y=Math.PI/4,ge(t,i,.5,6,e,0,31,0,6),$t(t,i,.5,"#ffe08a",0,37.2,0,{e:"#ffd36b",ei:2}),i.scale.setScalar(.95)}function dg(i,t){const e="#f7f0df";H(t,i,34,2,34,"#e9e2d0",0,0,0),H(t,i,13,10,13,e,0,2,0),$t(t,i,6.2,e,0,12,0,{r:.5},!1),ge(t,i,.55,3.5,"#e8c25a",0,17.8,0,8);for(const[n,r]of[[1,1],[1,-1],[-1,1],[-1,-1]])Mt(t,i,.9,1.2,15,e,n*12.5,2,r*12.5,12),$t(t,i,1.4,e,n*12.5,17.4,r*12.5,{},!0),$t(t,i,2.1,e,n*5.2,12,r*5.2,{},!0);ne(new Ye(5,34).rotateX(-Math.PI/2),Jt(t,"#6ecff0",{r:.1,m:.3}),0,2.12,26,i),H(t,i,11,.3,34,"#4f9a42",-11,0,26),H(t,i,11,.3,34,"#4f9a42",11,0,26)}function pg(i,t){for(const[e,n,r,s]of[[0,0,17,20],[22,12,12,14],[-18,14,8,9]]){const o=ge(t,i,r,s,"#d8a85c",e,0,n,4);o.rotation.y=Math.PI/4}H(t,i,6,3.2,11,"#cf9d56",-30,0,-4),H(t,i,4,3,4,"#d8a85c",-30,3.2,-8),ai(t,i,28,-8),ai(t,i,-12,-12,6),ai(t,i,30,26,6)}function mg(i,t){const e=["#e5412d","#ffffff"];let n=0;[[5,3,7],[3,1.8,7],[1.8,.9,6]].forEach(([r,s,o],a)=>{const l=Mt(t,i,s,r,o,e[a%2],0,n,0,4);l.rotation.y=Math.PI/4,n+=o,H(t,i,s*2.3,.7,s*2.3,"#e5412d",0,n-.2,0)}),Mt(t,i,.2,.45,11,"#e5412d",0,n,0,6);for(const[r,s]of[[1,1],[-1,1],[1,-1],[-1,-1]])H(t,i,.6,2.5,.6,"#e5412d",r*4,0,s*4)}function gg(i,t){for(const e of[1,-1])Mt(t,i,.9,1,8,"#c8301f",e*4.5,0,6,10);H(t,i,13,1.3,1.6,"#c8301f",0,8,6),H(t,i,16,.9,3.6,"#2d2623",0,9.3,6),$t(t,i,1.7,"#e2412c",0,4.5,6,{e:"#ff5b3a",ei:.4});for(let e=0;e<5;e++){const n=1-e*.15;H(t,i,7*n,3,7*n,e%2?"#f1e6cf":"#c8301f",0,e*3.9-0,-12);const r=ge(t,i,6.4*n,1.5,"#2d2623",0,e*3.9+3,-12,4);r.rotation.y=Math.PI/4}ge(t,i,.4,5,"#e8c25a",0,19.8,-12,6)}function _g(i,t){for(let e=0;e<14;e++){const n=-e*2.3,r=Math.sin(e*.35)*4,s=new Bt;s.position.set(r,0,n),s.rotation.y=Math.cos(e*.35)*.3,i.add(s);for(const o of[1,-1])Mt(t,s,.45,.5,5,"#e0501b",o*1.9,0,0,8);H(t,s,6,.6,.9,"#e0501b",0,5,0),H(t,s,6.6,.4,1.1,"#222",0,5.6,0)}}function vg(i,t){H(t,i,24,1.6,16,"#a9a7a0",0,0,0);const e=new Bt;e.position.y=1.6,i.add(e),ba(t,e,18,12,0,"#33505a",1,"#b13a2a");for(let n=-2;n<=2;n++)Mt(t,e,.4,.4,4.2,"#8a2a1f",n*3.2,0,5,8)}function Mg(i,t){H(t,i,30,2,20,"#a9a7a0",0,0,0),H(t,i,32,.8,22,"#c9c6bd",0,0,0);const e=new Bt;e.position.y=2,i.add(e),ba(t,e,22,14,0,"#33505a",2,"#b13a2a")}function xg(i,t){H(t,i,9,.5,9,"#c9c6bd",0,0,0),H(t,i,5,2.8,5,"#8d8a82",0,.5,0),H(t,i,2.6,3,2,"#d9ac2e",0,3.3,0,{m:.6,r:.35}),$t(t,i,.9,"#d9ac2e",0,7,0,{m:.6,r:.35}),H(t,i,3.2,.8,2,"#d9ac2e",0,3.3,1.2,{m:.6,r:.35})}function yg(i,t){const e="#a6302a";for(const o of[1,-1])H(t,i,42,5,1.6,e,0,0,o*16),H(t,i,1.6,5,32,e,o*21,0,0),H(t,i,42.5,.7,2,"#e2b83a",0,5,o*16);for(const[o,a]of[[1,1],[1,-1],[-1,1],[-1,-1]]){H(t,i,4,6,4,e,o*21,0,a*16);const l=ge(t,i,4,3,"#e2b83a",o*21,6,a*16,4);l.rotation.y=Math.PI/4}H(t,i,20,2.4,14,"#cfc9ba",0,0,0);const n=new Bt;n.position.y=2.4,i.add(n),ba(t,n,16,10,0,"#e2b83a",2,"#b02a22");const r=new Bt;r.position.set(0,0,-9),i.add(r),H(t,r,10,3,5,"#b02a22",0,0,0),ge(t,r,6,3,"#e2b83a",0,3,0,4).rotation.y=Math.PI/4;const s=new Bt;s.position.set(0,0,9),i.add(s),H(t,s,10,3,5,"#b02a22",0,0,0),ge(t,s,6,3,"#e2b83a",0,3,0,4).rotation.y=Math.PI/4}function Sg(i,t){H(t,i,26,.4,16,"#6b4f3a",0,-.3,0);const e=[];for(let n=0;n<9;n++)for(let r=0;r<5;r++)e.push([-10+n*2.5,.7,-5+r*2.5,0,1]);Zi(new In(.6,.7,2,8),Jt(t,"#a88467"),e.map(n=>[n[0],n[1]+.8,n[2]]),i),Zi(new hi(.55,8,6),Jt(t,"#b8957a"),e.map(n=>[n[0],n[1]+2.3,n[2]]),i)}function Eg(i,t){const e=tr(21);for(let n=0;n<46;n++){const r=(e()-.5)*28,s=(e()-.5)*22,o=6+e()*5;Mt(t,i,.22,.28,o,"#7bbf4a",r,0,s,6)}for(const[n,r]of[[0,5],[4,6.5],[-4,7]])$t(t,i,1.4,"#f6f6f2",n,1.4,r),$t(t,i,.95,"#f6f6f2",n,3,r+.8),$t(t,i,.4,"#222",n-.7,3.9,r+.7),$t(t,i,.4,"#222",n+.7,3.9,r+.7),$t(t,i,.3,"#222",n-.4,3.1,r+1.6),$t(t,i,.3,"#222",n+.4,3.1,r+1.6),H(t,i,.7,1.4,.7,"#222",n-1,0,r+.4),H(t,i,.7,1.4,.7,"#222",n+1,0,r+.4)}function bg(i,t){H(t,i,3.6,20,3.6,"#c9b07a",0,0,0),H(t,i,4.6,4,4.6,"#d8c08a",0,20,0),ge(t,i,3.4,6,"#3f6b5a",0,24,0,4).rotation.y=Math.PI/4;for(const[n,r,s]of[[0,2.4,0],[0,-2.4,Math.PI],[2.4,0,Math.PI/2],[-2.4,0,-Math.PI/2]]){const o=Mt(t,i,1.5,1.5,.25,"#fff8e0",n,20.8,r,24,{e:"#ffe9a8",ei:.5});o.rotation.x=Math.PI/2,o.rotation.z=s,o.position.set(n,22.5,r)}const e=new Bt;e.position.set(16,11,-2),i.add(e),ne(new Xe(9,.4,8,32),Jt(t,"#f2f2f2"),0,0,0,e);for(let n=0;n<24;n++){const r=n/24*6.283;$t(t,e,.8,"#8ec9f2",Math.cos(r)*9,Math.sin(r)*9,0,{op:.8})}H(t,e,.3,18,.3,"#f2f2f2",0,-9,0),e.userData.spin=!0,t.spinners.push(e),Mt(t,i,.5,.9,11,"#dddddd",16,0,-2,6);for(const n of[-27,-9])H(t,i,3,13,3,"#9aa3ad",n,0,12);H(t,i,22,1,3,"#3a6aa8",-18,5,12)}function wg(i,t){Mt(t,i,10,11,18,"#b9b5a8",0,0,0,28),Mt(t,i,11.4,11,1.6,"#a9a598",0,18,0,28),ge(t,i,9,9,"#2f6fc0",0,19.6,0,28);for(let n=0;n<4;n++){const r=n*Math.PI/2+Math.PI/4;Mt(t,i,3.6,4,22,"#b9b5a8",Math.cos(r)*15,0,Math.sin(r)*15,16),ge(t,i,4.4,7,"#2f6fc0",Math.cos(r)*15,22,Math.sin(r)*15,16)}ne(new In(16,16,7,40,1,!0),Jt(t,"#a9a598",{side:1}),0,3.5,0,i),H(t,i,8,9,4,"#9a9688",0,0,16),H(t,i,7,8,10,"#7a4d22",0,-.2,27,void 0),ge(t,i,.3,5,"#e8c25a",0,28,0,6);const e=new me(new Ye(5,3,6,1),Jt(t,"#d6262c",{side:1}));e.position.set(2.6,33,0),i.add(e),Mt(t,i,.15,.15,8,"#333",0,26,0,6)}function Tg(i,t){const e=document.createElement("canvas");e.width=1024,e.height=128;const n=e.getContext("2d");n.font="900 118px Arial Black,Arial,sans-serif",n.fillStyle="#fff",n.textAlign="center",n.textBaseline="middle",n.fillText("HOLLYWOOD",512,68);const r=new Tr(e);r.colorSpace=Ie,r.anisotropy=8;const s=new me(new Ye(56,7),new He({map:r,transparent:!0,alphaTest:.4,side:De,roughness:.5}));s.position.set(0,5.5,0),s.castShadow=!0,i.add(s);for(let o=-3;o<=3;o++)H(t,i,.5,5.6,.5,"#c9c9c9",o*8.5,0,-.5);H(t,i,60,.4,1,"#cfcfcf",0,.2,0)}function Ag(i,t){H(t,i,20,9,13,"#8f2a22",0,0,0),H(t,i,22,1,15,"#2d2623",0,9,0);const e=ge(t,i,9,5,"#2f6f64",0,10,0,4);e.rotation.y=Math.PI/4,e.scale.z=.72;for(const n of[-1,1])Mt(t,i,.6,.7,8,"#c8301f",n*6,0,7.5,8),Mt(t,i,.6,.7,8,"#c8301f",n*2,0,7.5,8),H(t,i,2,2.6,2,"#b9ae96",n*9,0,9.5),$t(t,i,.8,"#b9ae96",n*9,3.3,9.5);ne(new Ye(6,16).rotateX(-Math.PI/2),Jt(t,"#c01530"),0,.15,15.5,i)}function Rg(i,t){H(t,i,34,.35,7,"#a9a9a9",0,0,0);const e=tr(4);for(let n=0;n<9;n++){const r=ne(new xs(1.1,5).rotateX(-Math.PI/2),Jt(t,"#e84f8b",{e:"#c0386f",ei:.3}),-14+n*3.5,.4,(e()-.5)*3,i);r.rotation.y=e()*3,ne(new xs(.55,5).rotateX(-Math.PI/2),Jt(t,"#e8c25a",{m:.7,r:.3}),r.position.x,.42,r.position.z,i)}for(let n=0;n<5;n++)ai(t,i,-14+n*7,-6,8)}function Cg(i,t){const e=["#d9a066","#c8683a","#e0c08a","#b05a35"];for(let n=0;n<7;n++){const r=-18+n*6;H(t,i,5,4+n%3,4,e[n%4],r,0,0),H(t,i,5.6,.6,4.6,"#6b3b22",r,4+n%3,0),n%2&&H(t,i,3.4,1.1,.3,"#ff4f9a",r,5.2+n%3,2.2,{e:"#ff2f80",ei:1})}for(let n=0;n<6;n++)ge(t,i,1,2.6,"#ff7a1a",-8+n*3.2,0,8,10),Mt(t,i,.8,.9,.4,"#fff",-8+n*3.2,1,8,10);Mt(t,i,.15,.15,10,"#555",0,0,13,6),H(t,i,6,1.6,.3,"#d6262c",0,9,13,{e:"#ff2200",ei:.6})}function Pg(i,t){ne(new In(26,24,7,40,1,!0),Jt(t,"#c9c3b2",{side:1}),0,3.5,0,i),ne(new Er(12,19,40).rotateX(-Math.PI/2),Jt(t,"#35353a"),0,.35,0,i);for(let n=0;n<40;n++){const r=n/40*6.283;H(t,i,1.4,.3,1.4,n%2?"#fff":"#d6262c",Math.cos(r)*19.4,0,Math.sin(r)*19.4)}const e=new Bt;e.position.set(15.5,.5,0),i.add(e),H(t,e,5,1.1,2.4,"#d6262c",0,.5,0,{r:.3,m:.3}),H(t,e,2.2,1,2,"#d6262c",-.3,1.6,0,{r:.3,m:.3}),H(t,e,1,.7,1.9,"#8fd0f0",.4,1.7,0);for(const[n,r]of[[1.6,1.2],[1.6,-1.2],[-1.6,1.2],[-1.6,-1.2]]){const s=Mt(t,e,.55,.55,.5,"#111",n,0,r,10);s.rotation.x=Math.PI/2}e.userData.orbit=15.5,t.carOrbit=e;for(let n=0;n<10;n++){const r=n/10*6.283;H(t,i,2,1.4+n%3*.6,3,"#8d8a82",Math.cos(r)*20.6,0,Math.sin(r)*20.6).rotation.y=-r}}function Lg(i,t){pi(t,i,70,46,["#8fa1c4","#6f82aa","#a9b6d3","#5c6a8d"],10,46,77),H(t,i,5,64,5,"#aab6cf",0,0,0,{win:1,m:.2}),ge(t,i,1.2,16,"#c9d4ea",0,64,0,6),[["#ff2fa0",-16,10],["#2fd7ff",0,15],["#ffd22f",16,10],["#7a2fff",8,22]].forEach(([e,n,r],s)=>{const o=ne(new Ye(9,6),Jt(t,e,{e,ei:1.4,side:1}),n,r,24+s%2*3,i);o.rotation.y=(s-1.5)*.2,H(t,i,.4,r-3,.4,"#333",n,0,24+s%2*3)});for(let e=0;e<7;e++){const n=H(t,i,2.4,.9,1.2,"#ffcf1f",-14+e*4.6,.1,32);n.rotation.y=.2*e}}function Ig(i,t){pi(t,i,34,26,["#8fd0f0","#a9e0f5","#6fb6e0","#dfeff9"],8,34,64,!0);const e=["#e8f4fc","#d4eaf8","#c0e0f4"];[[4,2.4,16],[3,1.8,16],[2.2,1.2,14],[1.4,.6,12]].reduce((n,[r,s,o],a)=>(Mt(t,i,s,r,o,e[a%3],0,n,0,3,{m:.5,r:.2}),n+o),0),ge(t,i,.5,14,"#cfe6f5",0,58,0,6)}function Dg(i,t){for(const e of[-1,1]){H(t,i,9,34,9,"#ec9a98",e*9,0,0);const n=ge(t,i,5.6,6,"#f2c14a",e*9,34,0,4);n.rotation.y=Math.PI/4,H(t,i,2,2,2,"#fff",e*9,22,4.6)}H(t,i,18,7,8,"#ec9a98",0,24,0),H(t,i,18.4,1,8.4,"#f2c14a",0,31,0)}function Ug(i,t){Mt(t,i,13,14,3.6,"#e9d8a8",0,-3,0,40),ne(new Xe(13.6,.5,6,48).rotateX(Math.PI/2),Jt(t,"#ffffff",{op:.85}),0,-.9,0,i);for(let _=0;_<7;_++){const I=_/7*6.283+.4;ai(t,i,Math.cos(I)*10.8,Math.sin(I)*10.8,5.5,.6)}const o=new Qi([[-13,-5],[-22,-6.5],[-32,-11],[-44,-17]].map(_=>new R(_[0],0,_[1]))),a=18;for(let _=0;_<a;_++){const I=o.getPoint(_/a),w=o.getPoint((_+1)/a),A=I.distanceTo(w)+.08,L=new Bt;L.position.set((I.x+w.x)/2,0,(I.z+w.z)/2),L.rotation.y=Math.atan2(w.x-I.x,w.z-I.z),i.add(L),H(t,L,3.4,.5,A,"#e6dfcf",0,-.25,0);for(const E of[-1.6,1.6])H(t,L,.14,.7,A,"#ffffff",E,.2,0);_%2===0&&Mt(t,L,.38,.45,3.4,"#cfc8b6",0,-3.4,0,8)}const l=new Bt;l.rotation.y=-.38,i.add(l),H(t,l,22,2.2,17,"#f2e8d0",3,.5,0),H(t,l,23,.3,18,"#2a8cff",3,.4,0,{e:"#2a8cff",ei:1.1});for(let _=0;_<10;_++){const I=7.2-_*.55;H(t,l,I,50/10+.05,I+1.5,"#eef1f5",-5-2.6,2.7+_*(50-2.7)/10,0,{win:1,r:.5})}Mt(t,l,.55,.18,15,"#ffffff",-5-2.6,50,0,10),$t(t,l,.45,"#ffffff",-5-2.6,50+15.2,0,{e:"#ffe9b0",ei:.8});const c=26,u=34,f=(_,I)=>-5+15*Math.pow(1-_,.78)*(1-.32*I*I),p=_=>10.5*Math.pow(1-_,.92)+.15,d=[],g=[];for(let _=0;_<=u;_++){const I=_/u;for(let w=0;w<=c;w++){const A=w/c*2-1;d.push(f(I,A),2.7+I*(50-2.7),A*p(I))}}for(let _=0;_<u;_++)for(let I=0;I<c;I++){const w=_*(c+1)+I,A=w+1,L=w+c+1,E=L+1;g.push(w,L,A,A,L,E)}const v=new Ee;v.setAttribute("position",new Kt(d,3)),v.setIndex(g),v.computeVertexNormals(),ne(v,new He({color:"#f6f8fb",roughness:.35,metalness:.05,transparent:!0,opacity:.82,side:De,emissive:"#7fb6ff",emissiveIntensity:.12}),0,0,0,l);const m=[];for(let _=3;_<=u;_+=4)for(let I=0;I<c;I++){const w=I/c*2-1,A=(I+1)/c*2-1,L=_/u;m.push(f(L,w),2.7+L*(50-2.7),w*p(L),f(L,A),2.7+L*(50-2.7),A*p(L))}for(let _=0;_<=c;_+=2){const I=_/c*2-1;for(let w=0;w<u;w++){const A=w/u,L=(w+1)/u;m.push(f(A,I),2.7+A*(50-2.7),I*p(A),f(L,I),2.7+L*(50-2.7),I*p(L))}}const h=new Ee;h.setAttribute("position",new Kt(m,3)),l.add(new S0(h,new Nc({color:"#b9c8da",transparent:!0,opacity:.75})));const S=t.winTex().clone();S.wrapS=S.wrapT=ps,S.needsUpdate=!0;for(const _ of[-1,1]){const I=[],w=[],A=[];for(let x=0;x<=u;x++){const C=x/u,B=2.7+C*(50-2.7),G=f(C,_),$=_*p(C),K=-5-.2,Z=_*3;for(let it=0;it<=12;it++){const Y=it/12;I.push(K+(G-K)*Y,B,Z+($-Z)*Y),w.push(Y*3,C*14)}}for(let x=0;x<u;x++)for(let C=0;C<12;C++){const B=x*13+C,G=B+1,$=B+12+1,K=$+1;A.push(B,$,G,G,$,K)}const E=new Ee;E.setAttribute("position",new Kt(I,3)),E.setAttribute("uv",new Kt(w,2)),E.setIndex(A),E.computeVertexNormals(),ne(E,new He({color:"#e8eef5",emissive:"#ffffff",emissiveMap:S,emissiveIntensity:.4,roughness:.5,side:De}),0,0,0,l)}H(t,l,1.4,.7,7,"#e2e6ec",-5-1.5,50*.64,5.2),Mt(t,l,3.6,3.6,.45,"#f7f7f7",-5-1.5,50*.64,9.2,28),ne(new Xe(3.1,.14,6,36).rotateX(Math.PI/2),Jt(t,"#d6262c"),-5-1.5,50*.64+.5,9.2,l);const y=Ts("H",3.4,3.4,"#d6262c","#fafafa",.3);y.rotation.x=-Math.PI/2,y.position.set(-5-1.5,50*.64+.5,9.2),l.add(y),H(t,l,9,2.4,5,"#bfe6f7",-1,50*.6,0,{op:.78,r:.2}),H(t,l,9.4,.4,5.4,"#e2e6ec",-1,50*.6-.4,0);for(let _=-2;_<=2;_++)Mt(t,l,.14,.2,2.6+(_+2)%3*.5,"#e8f6ff",12,.6,_*2.2,6,{op:.8})}function Ng(i,t){const e=new Bt;e.position.y=24,i.add(e),ne(new Xe(19,.7,8,48),Jt(t,"#f2f2f4",{m:.4}),0,0,0,e),ne(new Xe(11,.35,6,40),Jt(t,"#f2f2f4"),0,0,0,e);for(let n=0;n<16;n++){const r=n/16*6.283,s=H(t,e,.25,19,.25,"#e8e8ee",0,0,0);s.geometry.translate(0,9.5,0),s.position.y=0,s.rotation.z=r,$t(t,e,1.1,"#5ab0f0",Math.cos(r)*19.4,Math.sin(r)*19.4,0,{e:"#2f8fe0",ei:.6})}e.userData.spin=!0,t.spinners.push(e);for(const n of[-1,1]){const r=H(t,i,1.2,26,1.2,"#e8e8ee",n*5,0,0);r.position.y=13,r.rotation.z=n*.22}}function Og(i,t){for(let e=0;e<5;e++)H(t,i,26-e*4.6,2.6,26-e*4.6,e%2?"#c7b290":"#b7a280",0,e*2.6,0);H(t,i,4,13,2,"#d6c8a8",0,0,13.2).rotation.x=0,H(t,i,4,3,3,"#8a2a1f",0,13,0),pi(t,i,28,24,["#f0a02f","#e0507a","#4aa8d8","#6ac46a","#f0e04f"],3,8,52,!1);for(let e=-1;e<=1;e++)ai(t,i,e*9,-22,6)}function Fg(i,t){H(t,i,46,.3,46,"#8c9099",0,0,0),H(t,i,44,.2,7.5,"#2a2d33",0,.3,10);const e=[];for(let s=-9;s<=9;s++)e.push([s*2.2,.52,10,0,1]);Zi(new Xn(1.2,.05,.3),Jt(t,"#fff"),e,i),H(t,i,3,.2,11,"#33363d",-8,.3,3.5),H(t,i,22,.2,3,"#33363d",3,.3,-.5),H(t,i,20,5,7,"#dfe6ee",-8,.3,-14,{win:1,r:.5}),H(t,i,22,.8,9,"#3f6aa6",-8,5.3,-14);for(const s of[-14,-8,-2])H(t,i,1.3,1.3,5,"#b8c2cf",s,2.6,-8.5);Mt(t,i,1.2,1.7,11,"#e9eef5",6,.3,-16,12),Mt(t,i,2.8,2.2,2.2,"#9fd6f0",6,11.3,-16,10,{e:"#6fb8e0",ei:.5}),ge(t,i,3,1.4,"#c0392b",6,13.5,-16,10),Mt(t,i,.08,.08,3,"#333",6,14.9,-16,6),H(t,i,9,4,8,"#c9ccd2",17,.3,-4),Mt(t,i,4,4,8,"#b9bdc6",17,4.3,-4,16).rotation.x=Math.PI/2,ss(t,i,-14,.3,-4.2,Math.PI,.8,"#d6262c"),ss(t,i,-1,.3,-4.2,Math.PI,.8,"#1f6fd0");const n=ss(t,i,0,.3,10,Math.PI/2,.8,"#2f9a4a");t.tickers.push(s=>{const o=s*.12%1,a=-20+o*40;n.position.x=a,n.position.y=.3+Math.max(0,a-6)*.22,n.rotation.z=Math.max(0,a-6)*.012});const r=ss(t,i,17,.3,8,-.6,.4,"#f2b01e");Mt(t,r,.1,.1,2.2,"#333",0,1.5,5.8,6),Mt(t,i,3.4,3.4,.15,"#44484f",17,.3,-16,24),ne(new Xe(2.6,.18,6,28).rotateX(Math.PI/2),Jt(t,"#fff"),17,.5,-16,i),cg(t,i,17,-16,.5)}function Bg(i,t){const e=new Bt;e.scale.setScalar(.85),i.add(e),H(t,e,40,.25,3,"#f7e8c9",0,.3,0),H(t,e,3,.25,36,"#f7e8c9",0,.3,0);const n=new Bt;n.position.set(-8,.3,-8),e.add(n);const r=new Bt;r.position.y=11,n.add(r),ne(new Xe(9.5,.4,8,40),Jt(t,"#f2f2f4",{m:.3}),0,0,0,r),ne(new Xe(4.8,.25,6,32),Jt(t,"#f2f2f4"),0,0,0,r),Mt(t,r,.9,.9,2.6,"#ddd",0,-1.3,0,10).rotation.x=Math.PI/2;const s=[];for(let h=0;h<12;h++){const S=h/12*6.283,y=H(t,r,.2,9.5,.2,"#e8e8ee",0,0,0);y.geometry.translate(0,4.75,0),y.position.y=0,y.rotation.z=S;const _=new Bt;_.position.set(Math.cos(S)*9.5,Math.sin(S)*9.5,0),r.add(_),H(t,_,1.5,1.3,1.6,["#e53935","#1e88e5","#fdd835","#43a047"][h%4],0,-1.3,0),H(t,_,.1,1,.1,"#999",0,-.2,0),s.push(_)}for(const h of[-1.8,1.8])for(const S of[-1,1]){const y=H(t,n,.8,11.4,.8,"#e8e8ee",S*3.4,0,h);y.position.y=5.7,y.rotation.z=-S*.3}t.tickers.push(h=>{r.rotation.z=-h*.16,s.forEach(S=>S.rotation.z=h*.16)});const o=[],a=28;for(let h=0;h<a;h++){const S=h/a*Math.PI*2,y=10.5+2.8*Math.sin(3*S);o.push(new R(6+Math.cos(S)*y,2.2+4.2*Math.abs(Math.sin(S*2))+2.2*Math.max(0,Math.sin(S*3+1)),4+Math.sin(S)*y*.72))}const l=new Qi(o,!0);ne(new Ar(l,160,.32,6,!0),Jt(t,"#d6262c",{r:.4}),0,.3,0,e);for(let h=0;h<44;h++){const S=l.getPointAt(h/44);H(t,e,.26,S.y,.26,"#e9e9e9",S.x,.3,S.z)}const c=[0,1,2].map(h=>{const S=H(t,e,1.2,.7,1.8,["#ffd23f","#ff7a1a","#ffd23f"][h],0,0,0);return S.geometry.translate(0,.35,0),S});t.tickers.push(h=>{c.forEach((S,y)=>{const _=Math.min(.9999,Math.max(0,((h*.045-y*.012)%1+1)%1)),I=l.getPointAt(_),w=l.getPointAt((_+.004)%1);I&&w&&(S.position.set(I.x,I.y+.55,I.z),S.rotation.y=Math.atan2(w.x-I.x,w.z-I.z))})});const u=new Bt;u.position.set(-10,.3,10),e.add(u);const f=new Bt;u.add(f),Mt(t,f,3.8,3.8,.6,"#f5d9a0",0,0,0,24),Mt(t,f,.4,.4,4.6,"#e8c25a",0,0,0,8),ge(t,f,5,2.8,"#e53935",0,4.6,0,16);const p=[];for(let h=0;h<8;h++){const S=h/8*6.283,y=new Bt;y.position.set(Math.cos(S)*2.8,0,Math.sin(S)*2.8),y.rotation.y=-S,f.add(y),Mt(t,y,.08,.08,3.4,"#e8c25a",0,.6,0,6),H(t,y,.5,.8,1.3,["#fff","#f0a8c8","#8fd0f0","#ffd23f"][h%4],0,1.5,0),p.push([y,S])}t.tickers.push(h=>{f.rotation.y=h*.7,p.forEach(([S,y])=>S.children[1].position.y=1.5+Math.sin(h*2+y*2)*.35)}),[[-17,2,"#e53935"],[-17,-4,"#1e88e5"],[17,4,"#fdd835"]].forEach(([h,S,y])=>{ge(t,e,2.8,3.6,y,h,.3,S,12),Mt(t,e,.06,.06,1.4,"#444",h,3.9,S,5),H(t,e,.9,.5,.05,"#fff",h+.45,5,S)});const d=new Bt;d.position.set(16,.3,-10),e.add(d),Mt(t,d,.5,.6,16,"#6b7ba8",0,0,0,8),H(t,d,1.4,1.4,1.4,"#e53935",0,16,0);const g=new Bt;d.add(g);for(const[h,S]of[[1,0],[-1,0],[0,1],[0,-1]])H(t,g,.7,.5,.7,"#ffd23f",h*1.1,0,S*1.1);t.tickers.push(h=>{g.position.y=2+(Math.sin(h*.9)*.5+.5)*12});for(const h of[-5,5])H(t,e,1.2,7,1.2,"#8e5ad7",h,.3,16);H(t,e,12,1.4,1.2,"#8e5ad7",0,7.3,16);const v=Ts("AMUSEMENT PARK",11,2.2,"#ff6ad5","#1a0f2a",1);v.position.set(0,9.6,16.7),e.add(v);const m=["#e53935","#1e88e5","#fdd835","#43a047","#ff6ad5","#fff"];for(let h=0;h<8;h++){const S=-3.5+h*1,y=13+h%2*.8;Mt(t,e,.02,.02,3.6,"#ddd",S,.3,y,4),$t(t,e,.55,m[h%6],S,4.3,y,{r:.3})}}function zg(i,t){H(t,i,16,6.5,10,"#8b3a2f",0,0,0),H(t,i,16.8,.6,10.8,"#3a2a24",0,6.5,0);for(const s of[-5.5,5.5])H(t,i,2.8,2.4,.15,"#ffd38a",s,1.8,5.05,{e:"#ffb347",ei:1.3});H(t,i,2.2,3.6,.2,"#3a2418",0,0,5.05);const e=H(t,i,15,.5,2.6,"#d6262c",0,4.1,6.2);e.rotation.x=.25;for(let s=-3;s<=3;s+=2)H(t,i,1.9,.52,2.62,"#fff",s*2,4.1,6.2).rotation.x=.25;const n=Ts("BAR",6,2.1,"#ff3df0","#14081c",1.2);n.position.set(0,5.5,5.15),i.add(n);const r=ne(new ui(1.6,2.2,16),Jt(t,"#ff6ad5",{e:"#ff3df0",ei:1.1,op:.9}),6,8.2,0,i);r.rotation.x=Math.PI,Mt(t,i,.08,.08,1.6,"#ffd0f0",6,6.9,0,6),$t(t,i,.28,"#4caf50",6.5,8.9,0,{e:"#3a9a40",ei:.5});for(const s of[-5,0,5]){Mt(t,i,.1,.1,1.2,"#ccc",s,0,9,6),Mt(t,i,.95,.95,.1,"#f1e2b5",s,1.2,9,16);for(const o of[-1.2,1.2])Mt(t,i,.35,.35,.1,"#d6262c",s+o,.8,9,10)}for(const s of[-8.6,8.6])Mt(t,i,.7,.7,1.2,"#7a4a24",s,0,3,12);for(let s=0;s<14;s++){const o=-8+s*1.2307692307692308;$t(t,i,.17,["#ffd23f","#ff7ab6","#7ad7ff"][s%3],o,6.3+Math.sin(s/13*Math.PI)*-.9+.9,6.6,{e:"#ffc24a",ei:1.5})}}function Hg(i,t){H(t,i,26,1,5,"#8a6a3d",11,0,0);for(let s=0;s<9;s++)for(const o of[-2.3,2.3])Mt(t,i,.3,.3,2.4,"#5a3d1e",s*3.2-1,-1,o,6);const e=tc(t,i,6,-8,0,1,"#6b3f1d"),n=hg(t,i,16,7,0),r=tc(t,i,-9,2,.35,.8,"#5a3720");t.tickers.push(s=>{e.position.y=-1.4+Math.sin(s*1.1)*.14,n.position.y=-1+Math.sin(s*1.3+1)*.12,r.position.y=-1.4+Math.sin(s*.9+2)*.15,r.rotation.z=Math.sin(s*.8)*.03}),H(t,i,.8,10,.8,"#e8a02f",20,.9,-3),H(t,i,.8,10,.8,"#e8a02f",20,.9,-5.4),H(t,i,.9,.9,12,"#e8a02f",20,10.6,-3).position.z=-1.8;for(let s=0;s<4;s++)H(t,i,2.4,1.2,1.2,["#d6262c","#1e88e5","#fdd835","#43a047"][s],14+s*2.6,1,-1.6);for(let s=0;s<7;s++)Mt(t,i,2.4-s*.07,2.7-s*.07,2.2,s%2?"#fff":"#d6262c",26,s*2.2-1,-8,14);Mt(t,i,1.6,1.6,1.6,"#fff6c0",26,14.4,-8,12,{e:"#ffe59a",ei:1.6}),ge(t,i,2.2,1.8,"#2d2623",26,16,-8,12)}function Gg(i,t){H(t,i,46,.25,46,"#7fbf5a",0,0,0),H(t,i,40,.3,3,"#ead9ae",0,.1,0),H(t,i,3,.3,40,"#ead9ae",0,.1,0),Mt(t,i,3.2,3.2,.7,"#c9c4b5",0,.2,0,24),Mt(t,i,2.7,2.7,.6,"#59b8e8",0,.55,0,24,{r:.1}),Mt(t,i,.5,.6,2.4,"#c9c4b5",0,.4,0,10),Mt(t,i,.15,.25,1.8,"#e8f6ff",0,2.6,0,6,{op:.8});for(const d of[-5,5])H(t,i,1.4,6,1.4,"#2e7d32",d,.2,21);H(t,i,12.4,1.4,1.4,"#2e7d32",0,6.2,21);const e=Ts("ZOO",9,2.6,"#ffffff","#2e7d32",.5);e.position.set(0,8.9,21),i.add(e);const n=os(t,i,-13,-11,15,12,"#c9b27a");Mt(t,n,2.6,2.6,.15,"#59b8e8",-3,.3,2.5,24,{r:.1});const r=Jl(t,n,1.5,-1,.3,.8);Jl(t,n,-4,-3,-.4,.5);const s=os(t,i,13,-11,13,12,"#b8c77a"),o=jl(t,s,-1.5,0,.3,.8),a=jl(t,s,2.5,-1.5,-.5,.55),l=os(t,i,-13,10,14,11,"#d8c48a");for(const[d,g,v]of[[-4,-3,1.4],[-2.6,-3.8,1],[4,3,1.2]])$t(t,l,v,"#8d8676",d,.6,g).scale.set(1.3,.8,1);Ql(t,l,.5,0,.3,.9,!0),Ql(t,l,-2.5,2.5,-.8,.7,!1);const c=os(t,i,13,10,14,11,"#e9f6fb");Mt(t,c,4.2,4.2,.15,"#59b8e8",1,.3,.5,28,{r:.1});for(const[d,g]of[[-3,-3],[4,-3.5],[-4,3.5]])H(t,c,1.6,1,1.6,"#dff3fb",d,.3,g,{r:.2}).rotation.y=.5;const u=[[-3,-3.5],[-1.7,-4.2],[3.6,-2],[5,2],[-4.5,3],[-2.5,4.3],[5.2,4.2]].map(([d,g],v)=>ug(t,c,d,g,v*.9)),f=new Bt;f.position.set(0,.2,-17),i.add(f),ne(new hi(5.2,24,12,0,Math.PI*2,0,Math.PI/2),new He({color:"#dff1ff",transparent:!0,opacity:.22,side:De,depthWrite:!1,roughness:.1}),0,0,0,f),ne(new hi(5.22,18,9,0,Math.PI*2,0,Math.PI/2),new Sr({color:"#ffffff",wireframe:!0,transparent:!0,opacity:.5}),0,0,0,f),Mt(t,f,.35,.5,3.4,"#7a5a34",0,0,0,8),$t(t,f,2.1,"#3f9a45",0,4.2,0);const p=[0,1,2,3,4,5].map(d=>$t(t,f,.28,["#e53935","#fdd835","#1e88e5","#43a047","#ff7a1a","#ff6ad5"][d],0,3,0));for(const[d,g]of[[-21,-20],[21,-20],[-21,19],[21,19],[-8,17],[8,17]])Mt(t,i,.4,.5,2.6,"#6b4a2a",d,.2,g,6),$t(t,i,2,"#3f9a45",d,3.8,g),$t(t,i,1.4,"#56b04f",d+.8,4.8,g+.3);t.tickers.push(d=>{r.rotation.z=Math.sin(d*1.2)*.25,o.rotation.z=-.28+Math.sin(d*.8)*.07,a.rotation.z=-.28+Math.sin(d*.8+2)*.08,u.forEach((g,v)=>{g.position.y=.2+Math.abs(Math.sin(d*3+v))*.15,g.rotation.z=Math.sin(d*3+v)*.08}),p.forEach((g,v)=>{const m=d*(.9+v*.12)+v,h=2.2+v%3*.8;g.position.set(Math.cos(m)*h,2.2+v%3*.9+Math.sin(d*2+v)*.25,Math.sin(m)*h)})})}function kg(i,t){pi(t,i,32,15,["#ff6fb5","#6fc8ff","#b58fff","#fff0f8"],6,28,12)}function Vg(i,t){pi(t,i,30,15,["#9fb3d6","#c9d4ea","#7f94bb","#e6ecf6"],5,24,41)}function Wg(i,t){pi(t,i,16,16,["#9fb3d6","#c9d4ea","#7f94bb"],6,22,31),Mt(t,i,.6,1,20,"#e8ecf3",0,0,0,10),$t(t,i,2.4,"#dfe6f2",0,21,0,{m:.5,r:.3}),Mt(t,i,.15,.3,8,"#dfe6f2",0,22.5,0,6)}function Xg(i,t){pi(t,i,30,20,["#c9b79a","#a9895f","#9c6b4a","#d8cdb8","#8a5a44"],4,16,19);for(let e=0;e<3;e++)H(t,i,2.6,1.9,1.1,"#d6262c",-6+e*5,.1,14),H(t,i,.9,2.2,.9,"#d6262c",-12+e*4,.1,17)}function Yg(i,t){const e=new Bt;e.position.set(Ss[0],.9,Ss[1]),i.add(e);const n="#f0dfa0";H(t,e,72,1.4,7.5,n,-34,0,0),H(t,e,72,.3,3,"#c9bd8c",-34,1.4,0);const r=[];for(let o=-6;o<=6;o++){const a=o*.11,l=62+Math.cos(a*2)*12,c=Math.cos(a),u=Math.sin(a),f=H(t,e,l,1.2,3.6,n,0,0,0);f.geometry.translate(l/2,0,0),f.position.set(0,.6,0),f.rotation.y=-a;const p=H(t,e,l*.96,.3,2.2,"#58b04c",0,0,0);p.geometry.translate(l*.48,0,0),p.position.set(0,1.35,0),p.rotation.y=-a;for(let d=5;d<l-2;d+=3.4)for(const g of[-1,1]){const v=d,m=g*2.7;r.push([v*c+m*u,1.5,-v*u+m*c,0,1])}}Zi(new Xn(1.5,1.1,1.5),Jt(t,"#fff6e6"),r,e);const s=[];for(let o=0;o<=40;o++){const a=-1.25+2.5*o/40;s.push(new R(Math.cos(a)*84,0,Math.sin(a)*50))}return ne(new Ar(new Qi(s),60,2.4,6),Jt(t,n),0,.6,0,e),e}function qg(i,t){const e=new Bt;i.add(e);for(const[n,r]of jc.slice(2)){const s=new Bt;s.position.set(n,1.5,r),e.add(s),ai(t,s,0,0,5)}return e}function Zg(i,t){const e=tr(99),n=[],r=[],s=Oe.filter(l=>l.cat!=="nature"||l.big);for(let l=0;l<9e3&&n.length+r.length<2600;l++){const c=-250+e()*470,u=-230+e()*430;if(Yi(c,u).d<5)continue;const p=dn(c,u,t);if(p<1.3||p>16||s.some(m=>Math.hypot(c-m.x,u-m.z)<(m.big?32:m.cat==="city"?24:15))||Se(c,u,Wc)>-2||Se(c,u,Xc)>-2||Se(c,u,Ea)>-2||Se(c,u,qc)>-2||Se(c,u,Zc)>-2||Se(c,u,$c)>-2||Se(c,u,Yc)>-2||Se(c,u,Kc)>-2||Jc.some(m=>Se(c,u,m)>-3)||Math.hypot(c,u)<36)continue;const d=Se(c,u,Vc)>0,g=d?1:ys(c*.03,u*.03)>.56?.45:.05;if(e()>g)continue;const v=(d?1.15:.85)+e()*.6;(d||p>9?n:r).push([c,p,u,e()*6,v])}const o=new Bt;i.add(o);const a=(l,c,u,f)=>{const p=Zi(l,new He({roughness:.9,color:"#fff"}),u.map(g=>[g[0],g[1]+f*g[4],g[2],g[3],g[4]]),o),d=new Ft;return u.forEach((g,v)=>{d.set(c[Math.floor(e()*c.length)]),p.setColorAt(v,d)}),p.instanceColor.needsUpdate=!0,p};return a(new ui(2.1,7,7),["#1f6b3a","#2a7d44","#195c34"],n,3.8),a(new ya(2.3,0),["#4aa14a","#5fb34f","#3d9442"],r,3.4),Zi(new In(.35,.45,2.4,5),Jt(t,"#6b4a2a"),[...n,...r].map(l=>[l[0],l[1]+1.1*l[4],l[2],0,l[4]]),o),o}function as(i,t,e,n,r,s={}){const o=i.map(d=>{const g=Hc(d);return new R(g[0],0,g[1])}),a=new Qi(o,!1,"centripetal"),l=Math.max(8,Math.round(a.getLength()/1.4)),c=[],u=[];for(let d=0;d<=l;d++){const g=d/l,v=a.getPoint(g),m=a.getTangent(g),h=-m.z,S=m.x,y=Math.hypot(h,S)||1;for(const _ of[-1,1]){const I=v.x+h/y*t/2*_,w=v.z+S/y*t/2*_;c.push(I,dn(I,w,r)+n,w)}if(d<l){const _=d*2;u.push(_,_+1,_+2,_+1,_+3,_+2)}}const f=new Ee;f.setAttribute("position",new Kt(c,3)),f.setIndex(u),f.computeVertexNormals();const p=new me(f,new He({color:e,roughness:.9,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,emissive:s.e||"#000",emissiveIntensity:s.ei||1,side:De}));return p.receiveShadow=!0,p.renderOrder=1,p.userData.curve=a,p}function $g(i,t){const e=new Bt;i.add(e),t.roads=e,[[[1140,790],[1140,1e3],[1140,1215]],[[1140,790],[1140,700],[1140,625],[1050,590],[960,565]],[[1140,640],[1240,575],[1338,510]],[[1140,790],[1340,790],[1540,790]],[[1075,790],[1e3,778],[925,762]],[[1100,820],[1094,880],[1090,990],[1010,1005],[940,990],[930,925]]].forEach(a=>{e.add(as(a,7.5,"#5c4a36",.42,t),as(a,5.2,"#e8cf93",.5,t))});const r=new Bt;i.add(r),t.railG=r,[[[1150,850],[1165,905],[1190,1e3],[1210,1022],[1330,1034],[1470,1048]],[[1150,850],[1262,872],[1425,870],[1450,885],[1450,1e3],[1486,1004]],[[1450,870],[1530,935],[1600,998]]].forEach((a,l)=>{const c=as(a,3.6,"#5a2a10",.55,t),u=as(a,2.2,"#ffb13b",.62,t,{e:"#ff8a1a",ei:.25});r.add(c,u),l===1&&(t.railCurve=u.userData.curve)});const o=new Bt;for(let a=0;a<4;a++)H(t,o,3,2,5.4,a?"#2f7fe0":"#e84a2f",0,0,-a*6.2,{r:.4});return i.add(o),t.train=o,{roads:e,railG:r,train:o}}function Kg(i,t){po(t,re(530),se(392),.6),po(t,re(1722),se(352),-.5),po(t,re(1e3),se(1380),2.4);{const e=new Bt;e.position.set(re(2040),0,se(235)),i.add(e);for(const[n,r]of[[-6,0],[8,4],[0,-8]]){const s=new Qi([new R(n,-2,r),new R(n+3,12,r),new R(n+9,24,r+2),new R(n+14,18,r)]);ne(new Ar(s,24,1.5,8),Jt(t,"#4d8a3a",{r:.5}),0,0,0,e)}e.userData.sea=1,t.ships.push(e)}{const e=new Bt;e.position.set(re(1262),0,se(1405)),i.add(e),$t(t,e,9,"#2d8f6e",0,0,0,{r:.5}).scale.set(1.8,.8,1),ne(new Xe(14,1,6,30).rotateX(Math.PI/2),Jt(t,"#fff",{op:.6}),0,.3,0,e);const r=H(t,e,12,.8,3,"#2d8f6e",16,2,0);r.rotation.z=.5,t.ships.push(e)}}function Jg(i,t){const e=(()=>{const l=document.createElement("canvas");l.width=l.height=128;const c=l.getContext("2d"),u=c.createRadialGradient(64,64,4,64,64,62);u.addColorStop(0,"rgba(255,255,255,.95)"),u.addColorStop(.5,"rgba(255,255,255,.55)"),u.addColorStop(1,"rgba(255,255,255,0)"),c.fillStyle=u,c.fillRect(0,0,128,128);const f=new Tr(l);return f.colorSpace=Ie,f})(),n=Yi(kn[0],kn[1]).h,r=new H0(16742943,900,70,1.6);r.position.set(kn[0],n+6,kn[1]),i.add(r),t.lava=r,t.volTop=n;const s=[];for(let l=0;l<10;l++){const c=new Dl(new ea({map:e,transparent:!0,depthWrite:!1,color:"#e8e2da"}));c.userData.p=l/10,i.add(c),s.push(c)}t.smokes=s;const o=[],a=tr(5);for(let l=0;l<12;l++){const c=new Dl(new ea({map:e,transparent:!0,depthWrite:!1,opacity:.3})),u=a()*6.283,f=300+a()*280;c.position.set(80+Math.cos(u)*f*1.2,130+a()*90,Math.sin(u)*f*.8),c.scale.set(150+a()*130,60+a()*40,1),c.userData.v=.6+a()*.8,i.add(c),o.push(c)}t.clouds=o}const jg={EIFFEL:fg,"TAJ MAHAL":dg,GIZA:pg,"TOKYO TOWER":mg,"SENSO-JI":gg,"FUSHIMI INARI":_g,GYEONGBOKGUNG:vg,GEUNJEONGJEON:Mg,"KING SEJONG":xg,"FORBIDDEN CITY":yg,TERRACOTTA:Sg,"PANDA RESERVE":Eg,"BIG BEN":bg,LONDON:Xg,AIRPORT:Fg,"AMUSEMENT PARK":Bg,BAR:zg,HARBOR:Hg,ZOO:Gg,CITADEL:wg,"RADIATOR SPRINGS":Cg,McQUEEN:Pg,"NEO YORK":Lg,DUBAI:Ig,"ATLANTIS RESORT":Dg,"BURJ AL ARAB":Ug,"AIN DUBAI WHEEL":Ng,"MEXICO CITY":Og};function Qg(i,t){const e=new Bt;i.add(e),t.placedModels=e;const n={};return Oe.forEach(r=>{n[r.n]=n[r.n]||0;const s=n[r.n]++;let o=jg[r.n];if(r.n==="HOLLYWOOD"&&(o=[Tg,Ag,Rg][s]),r.n==="TOKYO"&&(o=kg),r.n==="SEOUL"&&(o=s===0?Vg:Wg),!o)return;const a=new Bt;let l=Math.max(dn(r.x,r.z,t),.6),c=r.x,u=r.z;(r.n==="ATLANTIS RESORT"||r.n==="BURJ AL ARAB"||r.n==="AIN DUBAI WHEEL")&&(l=1.55),r.n==="HARBOR"&&(l=.4),r.n==="HOLLYWOOD"&&s===0&&(c=re(1574),u=se(474)-2),a.position.set(c,l,u),r.n==="HOLLYWOOD"&&s===0&&(a.position.y=dn(c,u,t)+.5),a.rotation.y=r.n==="ATLANTIS RESORT"?Math.PI/2:0,o(a,t),e.add(a)}),Yg(i,t),qg(i,t),Zg(i,t),$g(i,t),Kg(i,t),Jg(i,t),e}function t_(i,t,e={}){const n=e.onTravel||(()=>{}),r=e.onClose||(()=>{});i.innerHTML=`
    <div id="app">
      <div id="labels"></div>
      <div class="cloud tl"></div><div class="cloud tr"></div><div class="cloud bl"></div><div class="cloud br"></div>
      <div id="title" class="panel"><div class="logo"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg></div><div><h1>World of Lakshya</h1><small id="you-coords">X -79 · Z 70</small></div></div>
      <div id="tabs" class="panel"></div>
      <div id="top-r"><button class="btn" id="wpbtn"><svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg><span>Waypoints</span><b id="wpn"></b></button><button class="btn ib" id="esc" title="Close (Esc)"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
      <div id="hud-left">
        <div id="sel" class="panel"><div class="chiprow"><span id="sel-chip"></span></div><h2 id="sel-n"></h2><p id="sel-b"></p><div class="stats"><div><small>X</small><b id="sel-x1"></b></div><div><small>Z</small><b id="sel-z1"></b></div><div><small>Distance</small><b id="sel-d1"></b></div></div><div class="row"><button class="btn pri" id="sel-go">Travel here</button><button class="btn" id="sel-x">Close</button></div></div>
        <div class="spacer"></div>
        <div id="mini" class="panel"><canvas id="mm" width="456" height="322"></canvas><div id="compass" class="panel"><svg id="dial" viewBox="-50 -50 100 100"><circle r="44" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/><path d="M0,-34 L8,6 L0,0 L-8,6Z" fill="#ff5a4d"/><path d="M0,34 L8,-6 L0,0 L-8,-6Z" fill="rgba(255,255,255,.75)"/><circle r="3" fill="#0b1220" stroke="#fff" stroke-width="1.5"/><text y="-36" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="11" fill="#fff" transform="translate(0,-1)">N</text></svg></div></div>
        <div id="status" class="panel"><i></i><span id="st-t" title="Click the ground to drop a pin; double-click to zoom in">Hover the map</span></div>
      </div>
      <div id="hud-right">
        <div id="drawer" class="panel"><div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="q" placeholder="Search waypoints"><span class="kbd" style="position:absolute;right:10px;top:10px;margin:0">/</span></div><div id="list"></div></div>
        <div class="spacer"></div>
        <div class="brow"><div id="scale" class="panel"><span>50 blocks</span><b id="sc-b"></b></div><div id="zoom" class="panel"><button class="btn" id="z-in" title="Zoom in"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button><button class="btn" id="z-out" title="Zoom out"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button><hr><button class="btn" id="z-you" title="Centre on you"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></button><button class="btn" id="z-reset" title="Reset view"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button></div></div>
      </div>
      <div id="quick" class="panel"><button class="btn" id="q-you"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg><span>You</span></button><button class="btn" id="q-pin"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Pin</span></button><button class="btn" id="q-view"><svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg><span>Top view</span></button><button class="btn on" id="q-rail"><svg viewBox="0 0 24 24"><path d="M7 3 5 21M17 3l2 18M6 8h12M5.5 14h13"/></svg><span>Rail</span></button><button class="btn" id="q-night"><svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span>Night</span></button></div>
      <div id="toast" class="panel"></div>
    </div>
  `;const s=P=>i.querySelector("#"+P),o=s("app"),a=s("labels");let l=null;const c={t:new R(70,0,0),d:640,phi:.9};function u(P,z,rt,q){if(!t.camera||!t.controls)return;const J=Math.max(dn(P,z,t),0),tt=t.camera.position.clone().sub(t.controls.target),ot=new Ni().setFromVector3(tt);rt&&(ot.radius=rt),q!=null&&(ot.phi=q),ot.makeSafe(),l={t0:performance.now(),dur:900,fT:t.controls.target.clone(),tT:new R(P,J,z),fO:tt,tO:new R().setFromSpherical(ot)}}function f(P){if(!l||!t.camera||!t.controls)return;const z=mn((P-l.t0)/l.dur,0,1),rt=z<.5?2*z*z:1-Math.pow(-2*z+2,2)/2;t.controls.target.lerpVectors(l.fT,l.tT,rt);const q=new R().lerpVectors(l.fO,l.tO,rt);t.camera.position.copy(t.controls.target).add(q),z>=1&&(l=null)}const p=new V0;function d(P,z){if(!t.camera)return null;const rt=o.getBoundingClientRect(),q=new wt((P-rt.left)/rt.width*2-1,-((z-rt.top)/rt.height)*2+1);p.setFromCamera(q,t.camera);const J=p.ray.origin,tt=p.ray.direction;let ot=0,ct=0,bt=null;for(ct=0;ct<5e3;ct+=Math.max(2,ct*.01)){const At=J.x+tt.x*ct,Vt=J.y+tt.y*ct,N=J.z+tt.z*ct;if(Vt<=Math.max(dn(At,N,t),0)){let lt=ot,D=ct;for(let gt=0;gt<10;gt++){const ht=(lt+D)/2,Gt=J.x+tt.x*ht,oe=J.y+tt.y*ht,_e=J.z+tt.z*ht;oe<=Math.max(dn(Gt,_e,t),0)?D=ht:lt=ht}const V=(lt+D)/2;bt=new R(J.x+tt.x*V,J.y+tt.y*V,J.z+tt.z*V);break}ot=ct}return bt}let g=null;function v(P){const z=s("toast");z&&(z.textContent=P,z.classList.add("show"),clearTimeout(g),g=setTimeout(()=>z.classList.remove("show"),2600))}function m(P,z,rt){const q=Oe.find(ot=>ot.n===rt&&ot.X===P&&ot.Z===z)||Oe.find(ot=>ot.n===rt),J=q&&q.gameCoords?q.gameCoords:[P,2,z];v(`✦ Travelling to ${rt} · X ${J[0]}, Z ${J[2]}`);const tt={x:J[0],y:J[1],z:J[2],coords:J,name:rt};window.CraftMap&&window.CraftMap.onTravel&&window.CraftMap.onTravel(tt);try{typeof parent<"u"&&parent!==window&&parent.postMessage({source:"craftme-map",type:"travel",...tt},"*")}catch{}window.dispatchEvent(new CustomEvent("craftme:travel",{detail:tt})),n(tt)}function h(){window.CraftMap&&window.CraftMap.onClose&&window.CraftMap.onClose();try{typeof parent<"u"&&parent!==window&&parent.postMessage({source:"craftme-map",type:"close"},"*")}catch{}window.dispatchEvent(new CustomEvent("craftme:close")),r()}const S=[["all","All"],["monument","Monuments"],["city","Cities"],["transit","Transit"],["nature","Nature"]];function y(){const P=s("tabs");P&&(P.innerHTML="",S.forEach(([z,rt])=>{const q=z==="all"?Oe.length:Oe.filter(tt=>tt.cat===z).length,J=document.createElement("button");J.className="seg-b"+(t.filter===z?" on":""),J.innerHTML=`${rt}<em>${q}</em>`,J.onclick=()=>{t.filter=z,y(),_()},P.appendChild(J)}))}function _(){const P=s("q"),z=P?P.value.trim().toLowerCase():"",rt=s("list");if(!rt)return;rt.innerHTML="";const q=Oe.map((tt,ot)=>[tt,ot]).filter(([tt])=>(t.filter==="all"||tt.cat===t.filter)&&tt.n.toLowerCase().includes(z)),J={monument:"Monuments",city:"Cities",transit:"Transit",nature:"Nature"};["monument","city","transit","nature"].forEach(tt=>{const ot=q.filter(([bt])=>bt.cat===tt).sort((bt,At)=>bt[0].n.localeCompare(At[0].n));if(!ot.length)return;const ct=document.createElement("h4");ct.innerHTML=`<span>${J[tt]}</span><span>${ot.length}</span>`,rt.appendChild(ct),ot.forEach(([bt,At])=>{const Vt=document.createElement("div");Vt.innerHTML=`<i style="--c:${uo(bt)}">${ho[bt.cat]}</i><b>${bt.n}</b><span>${fo(bt.X,bt.Z)}m</span>`,Vt.tabIndex=0,Vt.onclick=()=>w(At),Vt.onkeydown=N=>{N.key==="Enter"&&w(At)},Vt.onmouseenter=()=>{t.hovered=At},Vt.onmouseleave=()=>{t.hovered=-1},rt.appendChild(Vt)})}),q.length||(rt.innerHTML='<div style="color:var(--mut);cursor:default">No matches</div>')}function I(P,z,rt,q,J){const tt=s("sel-chip");tt&&(tt.textContent=q==="pin"?"Pin":q||"Waypoint",tt.style.setProperty("--cc",Gc[q]||"#ffd84a"));const ot=s("sel-n"),ct=s("sel-b");ot&&(ot.textContent=P),ct&&(ct.textContent=J||"Custom location. Drop it as a travel point.",ct.style.display="");const bt=s("sel-x1"),At=s("sel-z1"),Vt=s("sel-d1");bt&&(bt.textContent=z),At&&(At.textContent=rt),Vt&&(Vt.textContent=fo(z,rt)+" m");const N=s("sel");if(N){N.classList.add("show");const lt=N.dataset;lt.x=z,lt.z=rt,lt.n=P}}function w(P){const z=Oe[P];t.selected=P,t.pin=null,t.pinG&&(t.pinG.visible=!1),I(z.n,z.X,z.Z,z.cat,$0(P)),u(z.x,z.z,150,.95)}const A=P=>{if(!t.camera||!t.controls)return;const z=t.camera.position.clone().sub(t.controls.target);z.multiplyScalar(P);const rt=mn(z.length(),t.controls.minDistance,t.controls.maxDistance);z.setLength(rt),t.camera.position.copy(t.controls.target).add(z)},L=()=>u(we.X,we.Z,160,.95);s("sel-go").onclick=()=>{const P=s("sel").dataset;m(+P.x,+P.z,P.n)},s("sel-x").onclick=()=>{s("sel").classList.remove("show"),t.selected=null,t.pin=null,t.pinG&&(t.pinG.visible=!1)},s("wpbtn").onclick=()=>s("drawer").classList.toggle("open"),s("esc").onclick=h,s("q").oninput=_,s("q").addEventListener("keydown",P=>{P.key==="Escape"&&(s("q").blur(),s("drawer").classList.remove("open"))}),s("z-in").onclick=()=>A(1/1.4),s("z-out").onclick=()=>A(1.4),s("z-you").onclick=L,s("q-you").onclick=L,s("q-pin").onclick=()=>{t.pin?u(t.pin.x,t.pin.z,150,.95):v("Click the map to drop a pin")},s("q-view").onclick=P=>{if(t.topView=!t.topView,P.currentTarget.lastElementChild.textContent=t.topView?"3D view":"Top view",P.currentTarget.classList.toggle("on",t.topView),t.camera&&t.controls){const z=new Ni().setFromVector3(t.camera.position.clone().sub(t.controls.target));u(t.controls.target.x,t.controls.target.z,z.radius,t.topView?.02:.9)}},s("q-rail").onclick=P=>{t.railG&&(t.railG.visible=!t.railG.visible,t.train&&(t.train.visible=t.railG.visible),P.currentTarget.classList.toggle("on",t.railG.visible),v(t.railG.visible?"Rail line shown":"Rail line hidden"))},s("q-night").onclick=P=>{t.night.target=t.night.target===0?1:0;const z=t.night.target===1;P.currentTarget.classList.toggle("on",z),P.currentTarget.querySelector("span").textContent=z?"Day":"Night",v(z?"🌙 Nightfall falling across realms":"☀️ Dawn breaking over the island")},s("z-reset").onclick=()=>{const P=new Ni(c.d,c.phi,0);u(c.t.x,c.t.z,c.d,c.phi),l&&(l.tO=new R().setFromSpherical(P))},s("wpn").textContent=Oe.length;const E=new He({color:"#d6262c",side:De,roughness:.6,emissive:"#5a0a0a",emissiveIntensity:.35}),x={HARBOR:[8,3.5],ZOO:[10,24],AIRPORT:[-25,16],"AMUSEMENT PARK":[9,17]};t.flags=[],a.innerHTML="",Oe.forEach((P,z)=>{const rt=new Bt,q=P.n==="HARBOR",J=x[P.n],tt=J?P.x+J[0]:P.x+(P.cat==="monument"||P.cat==="city"?9:0),ot=J?P.z+J[1]:P.z+(P.n==="CITADEL"?-26:9),ct=(q?1.5:Math.max(dn(tt,ot,t),.9))+(Math.abs(P.x-239.5)<95&&Math.abs(P.z-45.6)<80?1.4:0);rt.position.set(tt,ct,ot),t.scene.add(rt);const bt=new In(.35,.45,30,8),At=new me(bt,new He({color:"#2a1a0c",roughness:.8}));At.position.y=15,rt.add(At);const Vt=new hi(.8,14,10),N=new me(Vt,new He({color:"#e8c25a",metalness:.8,roughness:.3}));N.position.y=30.4,rt.add(N);const lt=new Ye(11,6.5,10,1);lt.translate(5.5,0,0);const D=new me(lt,E);D.position.set(.4,27,0),D.castShadow=!0,rt.add(D);const V=document.createElement("div");V.className="plq",V.style.setProperty("--c",uo(P)),V.innerHTML="<i>"+ho[P.cat]+"</i><span></span>",V.lastChild.textContent=P.n,a.appendChild(V);const gt={i:z,d:P,g:rt,cl:D,el:V,w:P.n.length*8.6+44,wm:36,top:new R(tt,ct+34,ot),pri:P.cat==="monument"?0:P.cat==="city"?1:2,sx:0,sy:0,on:!0,base0:D.geometry.attributes.position.array.slice()};V.onclick=()=>w(z),V.ondblclick=()=>m(P.X,P.Z,P.n),V.tabIndex=0,V.onkeydown=ht=>{ht.key==="Enter"&&w(z)},V.onmouseenter=()=>{t.hovered=z},V.onmouseleave=()=>{t.hovered=-1},t.flags.push(gt)});const C=new me(new Er(6,7.6,48).rotateX(-Math.PI/2),new Sr({color:"#ffb547",transparent:!0,opacity:.9,depthWrite:!1,depthTest:!1}));C.renderOrder=9,C.visible=!1,t.scene.add(C),t.selRing=C;const B=new Bt;t.scene.add(B),t.youG=B;const G=new me(new Xe(4,.35,8,40).rotateX(Math.PI/2),new He({color:"#ff5a4d",emissive:"#ff3b2d",emissiveIntensity:1.2}));B.add(G);const $=new me(new ui(2.4,6,4),new He({color:"#fff",emissive:"#ffffff",emissiveIntensity:.5}));$.rotation.x=Math.PI/2;const K=new Bt;K.position.y=9,K.add($),B.add(K),t.arrowG=K;const Z=document.createElement("div");Z.className="plq you",Z.innerHTML="<i>"+ho.you+"</i><span>YOU · LAKSHYA</span>",a.appendChild(Z);function it(){const P=Math.max(dn(we.X,we.Z,t),.8);B.position.set(we.X,P,we.Z),K.rotation.y=-we.yaw*Math.PI/180;const z=s("you-coords");z&&(z.textContent=`X ${Math.round(we.X)} · Z ${Math.round(we.Z)}`)}it();const Y=new Bt;Y.visible=!1,t.scene.add(Y),t.pinG=Y;const ft=new me(new ui(1.6,5,10).rotateX(Math.PI),new He({color:"#ffd24a",emissive:"#ffb400",emissiveIntensity:.7}));ft.position.y=3.2,Y.add(ft);const mt=new me(new Er(1.7,2.2,32).rotateX(-Math.PI/2),new Sr({color:"#ffd24a",transparent:!0,opacity:.9,depthWrite:!1}));mt.visible=!1,t.scene.add(mt),t.cursor=mt;const yt=s("mm"),pt=yt?yt.getContext("2d"):null,jt=yt?yt.width:456,j=yt?yt.height:322,at=(()=>{if(!t.pos||!t.col||!t.tg)return null;const P=document.createElement("canvas");P.width=Ae,P.height=Ve;const z=P.getContext("2d"),rt=z.createImageData(Ae,Ve),q=t.tg.attributes.normal.array,J=new R(-.5,.75,.42).normalize(),tt=ot=>(ot=Math.max(0,Math.min(1,ot)),255*(ot<=.0031308?12.92*ot:1.055*Math.pow(ot,1/2.4)-.055));for(let ot=0;ot<Ae*Ve;ot++){const bt=t.pos[ot*3+1]<.55?1:.45+.7*Math.max(0,q[ot*3]*J.x+q[ot*3+1]*J.y+q[ot*3+2]*J.z);rt.data[ot*4]=tt(t.col[ot*3]*bt),rt.data[ot*4+1]=tt(t.col[ot*3+1]*bt),rt.data[ot*4+2]=tt(t.col[ot*3+2]*bt),rt.data[ot*4+3]=255}return z.putImageData(rt,0,0),P})(),St=P=>(P-si)/(ia-si)*jt,dt=P=>(P-oi)/(ra-oi)*j,Ut=new R,et=new R;function vt(){if(!(!pt||!at||!t.camera)){pt.imageSmoothingEnabled=!0,pt.imageSmoothingQuality="high",pt.drawImage(at,0,0,jt,j),pt.beginPath(),[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([P,z],rt)=>{Ut.set(P,z,-1).unproject(t.camera),et.set(P,z,1).unproject(t.camera).sub(Ut).normalize();let q=et.y<-.02?-Ut.y/et.y:900;q=Math.min(q,900);const J=St(Ut.x+et.x*q),tt=dt(Ut.z+et.z*q);rt?pt.lineTo(J,tt):pt.moveTo(J,tt)}),pt.closePath(),pt.fillStyle="rgba(255,255,255,.16)",pt.fill(),pt.strokeStyle="rgba(255,255,255,.95)",pt.lineWidth=2,pt.stroke();for(const P of t.flags){const z=t.filter==="all"||t.filter===P.d.cat;pt.globalAlpha=z?1:.2,pt.beginPath(),pt.arc(St(P.d.x),dt(P.d.z),P.i===t.selected||P.i===t.hovered?7:4.2,0,6.283),pt.fillStyle=uo(P.d),pt.fill(),pt.lineWidth=P.i===t.selected||P.i===t.hovered?3:1.6,pt.strokeStyle=P.i===t.selected||P.i===t.hovered?"#fff":"#0b1220",pt.stroke()}pt.globalAlpha=1,pt.beginPath(),pt.arc(St(we.X),dt(we.Z),6.5,0,6.283),pt.fillStyle="#2f7bff",pt.fill(),pt.lineWidth=3,pt.strokeStyle="#fff",pt.stroke(),t.pin&&(pt.beginPath(),pt.arc(St(t.pin.x),dt(t.pin.z),5,0,6.283),pt.fillStyle="#ffd24a",pt.fill(),pt.lineWidth=2,pt.strokeStyle="#0b1220",pt.stroke())}}const Ht=P=>{if(P.stopPropagation(),!t.camera||!t.controls)return;const z=yt.getBoundingClientRect(),rt=si+(P.clientX-z.left)/z.width*(ia-si),q=oi+(P.clientY-z.top)/z.height*(ra-oi),J=new Ni().setFromVector3(t.camera.position.clone().sub(t.controls.target));u(rt,q,J.radius,J.phi)};yt&&yt.addEventListener("pointerdown",Ht);let zt=0,Xt=0,U=[];const Nt=["title","tabs","top-r","sel","drawer","status","mini","quick","zoom","scale"];function Et(){U=[];for(const P of Nt){const z=s(P);if(!z)continue;const rt=z.getBoundingClientRect();rt.width>0&&rt.height>0&&getComputedStyle(z).display!=="none"&&U.push([rt.left-6,rt.top-6,rt.width+12,rt.height+12])}}const Ot=new R;function Tt(P,z){if(!t.camera)return;zt||(t.flags.forEach(D=>{D.el.classList.remove("mini"),D.el.style.display=""}),t.flags[0]&&t.flags[0].el.offsetWidth&&(t.flags.forEach(D=>{D.w=D.el.offsetWidth+10}),zt=1,document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{zt=0}))),Xt++%12||Et();const rt=(D,V)=>D[0]<V[0]+V[2]&&D[0]+D[2]>V[0]&&D[1]<V[1]+V[3]&&D[1]+D[3]>V[1],q=[],J=D=>{for(const V of q)if(rt(D,V))return!0;return!1},tt=D=>{for(const V of U)if(rt(D,V))return!0;return!1};Ot.set(we.X,B.position.y+18,we.Z).project(t.camera);const ot=Ot.z<1,ct=(Ot.x*.5+.5)*P,bt=(-Ot.y*.5+.5)*z,At=[ct-70,bt-40,140,40],Vt=ot&&!tt(At);Vt&&q.push(At);const N=[...t.flags].sort((D,V)=>(V.i===t.selected)-(D.i===t.selected)||(V.i===t.hovered)-(D.i===t.hovered)||D.pri-V.pri||D.i-V.i);for(const D of N){Ot.copy(D.top).project(t.camera),D.sx=(Ot.x*.5+.5)*P,D.sy=(-Ot.y*.5+.5)*z;const V=t.filter==="all"||t.filter===D.d.cat;D.on=V;let ht=V&&Ot.z<1&&D.sx>-60&&D.sx<P+60&&D.sy>-30&&D.sy<z+60,Gt=!1;const oe=D.i===t.selected||D.i===t.hovered;if(ht){const _e=[D.sx-D.w/2,D.sy-40,D.w,40];if(oe&&!tt(_e))q.push(_e);else if(!oe&&!tt(_e)&&!J(_e))q.push(_e);else{const te=[D.sx-21,D.sy-40,42,40];!tt(te)&&(oe||!J(te))?(q.push(te),Gt=!oe):(oe&&tt(_e),ht=!1)}}D.el.style.display=ht?"":"none",ht&&(D.el.classList.toggle("mini",Gt),D.el.classList.toggle("hov",D.i===t.hovered&&D.i!==t.selected),D.el.style.left=Math.round(D.sx)+"px",D.el.style.top=Math.round(D.sy)+"px",D.el.classList.toggle("sel",D.i===t.selected),D.el.style.zIndex=D.i===t.selected?6:D.i===t.hovered?7:3-D.pri),D.g.visible=V}Z.style.display=Vt?"":"none",Z.style.left=Math.round(ct)+"px",Z.style.top=Math.round(bt)+"px";const lt=t.selected!=null?t.selected:t.hovered;if(lt!=null&&lt>=0&&t.flags[lt]){const D=t.flags[lt].g;C.visible=t.flags[lt].on,C.position.set(D.position.x,D.position.y+.6,D.position.z);const V=1+.12*Math.sin(performance.now()/260);C.scale.setScalar(V),C.material.opacity=t.selected!=null&&lt===t.selected?.95:.55}else C.visible=!1}const Qt=P=>{if(P.target&&P.target.tagName==="INPUT")return;if(P.key==="Escape"){s("drawer")&&s("drawer").classList.contains("open")?s("drawer").classList.remove("open"):s("sel")&&s("sel").classList.contains("show")?s("sel-x").click():h(),P.stopPropagation();return}if(P.key==="KeyM"||P.code==="KeyM"){h(),P.stopPropagation();return}if(P.key==="Enter"&&s("sel")&&s("sel").classList.contains("show")&&document.activeElement===document.body){s("sel-go").click();return}if(P.key==="/"){P.preventDefault(),s("drawer").classList.add("open"),s("q").focus();return}if(!t.camera||!t.controls)return;const z=22*(t.camera.position.distanceTo(t.controls.target)/300),rt=new R;t.camera.getWorldDirection(rt),rt.y=0,rt.normalize();const q=new R().crossVectors(rt,new R(0,1,0)),J=tt=>{t.controls.target.addScaledVector(tt,z),t.camera.position.addScaledVector(tt,z)};if((P.key==="w"||P.key==="ArrowUp")&&J(rt),(P.key==="s"||P.key==="ArrowDown")&&J(rt.clone().negate()),(P.key==="d"||P.key==="ArrowRight")&&J(q),(P.key==="a"||P.key==="ArrowLeft")&&J(q.clone().negate()),(P.key==="+"||P.key==="=")&&A(1/1.3),P.key==="-"&&A(1.3),P.key==="q"||P.key==="e"){const tt=(P.key==="q"?1:-1)*.2,ot=t.camera.position.clone().sub(t.controls.target);ot.applyAxisAngle(new R(0,1,0),tt),t.camera.position.copy(t.controls.target).add(ot)}};window.addEventListener("keydown",Qt);let It=null;const T=P=>{It={x:P.clientX,y:P.clientY},t.renderer&&t.renderer.domElement.classList.add("drag"),l=null},M=P=>{if(t.renderer&&t.renderer.domElement.classList.remove("drag"),!It)return;const z=Math.hypot(P.clientX-It.x,P.clientY-It.y);if(It=null,z>5||t.renderer&&P.target!==t.renderer.domElement)return;const rt=o.getBoundingClientRect();let q=null,J=34;if(t.flags.forEach(bt=>{const At=Math.hypot(bt.sx-(P.clientX-rt.left),bt.sy-(P.clientY-rt.top));At<J&&bt.on&&(J=At,q=bt)}),q){w(q.i);return}const tt=d(P.clientX,P.clientY);if(!tt)return;const ot=Math.round(tt.x),ct=Math.round(tt.z);t.pin={x:tt.x,z:tt.z},t.selected=null,t.pinG.position.set(tt.x,Math.max(tt.y,.8),tt.z),t.pinG.visible=!0,I("Dropped pin",ot,ct,"pin")},k=P=>{const z=d(P.clientX,P.clientY);if(!z){mt.visible=!1;return}mt.visible=!0,mt.position.set(z.x,Math.max(z.y,.6)+.4,z.z);const rt=t.camera.position.distanceTo(z)/110;mt.scale.setScalar(Math.max(.7,rt));const q=Math.round(z.x),J=Math.round(z.z),tt=s("st-t");tt&&(tt.textContent=`X ${q} · Z ${J} · ${fo(q,J)} m`)},nt=()=>{mt.visible=!1},st=P=>{const z=d(P.clientX,P.clientY);if(!z||!t.camera||!t.controls)return;const rt=new Ni().setFromVector3(t.camera.position.clone().sub(t.controls.target));u(z.x,z.z,Math.max(60,rt.radius*.45),Math.min(rt.phi,1))};function Q(P){P.addEventListener("pointerdown",T),window.addEventListener("pointerup",M),P.addEventListener("pointermove",k),P.addEventListener("pointerleave",nt),P.addEventListener("dblclick",st)}function Rt(P){P&&(P.removeEventListener("pointerdown",T),P.removeEventListener("pointermove",k),P.removeEventListener("pointerleave",nt),P.removeEventListener("dblclick",st)),window.removeEventListener("pointerup",M),window.removeEventListener("keydown",Qt),yt&&yt.removeEventListener("pointerdown",Ht)}return y(),_(),{fly:u,stepTween:f,updateLabels:Tt,drawMini:vt,placeYou:it,bindCanvasListeners:Q,unbindCanvasListeners:Rt,toast:v,app:o}}function e_(i,t={}){const e=t.onTravel||(()=>{}),n=t.onClose||(()=>{}),r=j0();let s=null;try{s=new g0({antialias:!0,powerPreference:"high-performance"})}catch(et){throw console.error("WebGL is not available:",et),et}s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.shadowMap.enabled=!0,s.shadowMap.type=nc,s.toneMapping=rc,s.toneMappingExposure=1.25,r.renderer=s;const o=new _0;r.scene=o;const a=document.createElement("canvas");a.width=2,a.height=256;const l=a.getContext("2d"),c=l.createLinearGradient(0,0,0,256);c.addColorStop(0,"#4f9bd9"),c.addColorStop(.55,"#a9d4ee"),c.addColorStop(1,"#d9ecf5"),l.fillStyle=c,l.fillRect(0,0,2,256);const u=new Tr(a);u.colorSpace=Ie,o.background=u,o.fog=new va("#a9d0e6",650,2600);const f=new Ke(40,1,4,6e3);r.camera=f;const p={target:new R,minDistance:22,maxDistance:1200,update(){f.lookAt(this.target)},getAzimuthalAngle(){return Math.atan2(f.position.x-this.target.x,f.position.z-this.target.z)}};r.controls=p;const d=s.domElement,g=new Map;let v="pan",m=0;const h=()=>f.position.clone().sub(p.target);function S(et,vt,Ht){const zt=h();et=mn(zt.length()*et,p.minDistance,p.maxDistance)/zt.length(),f.position.copy(p.target).add(zt.multiplyScalar(et))}const y=et=>et.preventDefault(),_=et=>{try{d.setPointerCapture(et.pointerId)}catch{}if(g.set(et.pointerId,{x:et.clientX,y:et.clientY}),v=et.button===2||et.shiftKey||et.ctrlKey?"rot":"pan",g.size===2){const[vt,Ht]=[...g.values()];m=Math.hypot(vt.x-Ht.x,vt.y-Ht.y)}},I=et=>{const vt=g.get(et.pointerId);if(!vt)return;const Ht=et.clientX-vt.x,zt=et.clientY-vt.y;if(vt.x=et.clientX,vt.y=et.clientY,g.size===2){const[U,Nt]=[...g.values()],Et=Math.hypot(U.x-Nt.x,U.y-Nt.y);m>0&&S(m/Et),m=Et;return}if(g.size>1)return;const Xt=h();if(v==="rot"){const U=new Ni().setFromVector3(Xt);U.theta-=Ht*.006,U.phi=mn(U.phi-zt*.005,.03,1.3),f.position.copy(p.target).add(Xt.setFromSpherical(U))}else{const U=2*Xt.length()*Math.tan(f.fov*Math.PI/360)/d.clientHeight,Nt=new R(-Xt.x,0,-Xt.z).normalize(),Et=new R().crossVectors(Nt,new R(0,1,0)),Ot=Math.max(.3,Math.cos(Math.atan2(Math.hypot(Xt.x,Xt.z),Xt.y))),Tt=new R().addScaledVector(Et,-Ht*U).addScaledVector(Nt,zt*U/Ot);p.target.add(Tt),f.position.add(Tt)}},w=et=>{g.delete(et.pointerId),m=0},A=et=>{et.preventDefault(),S(Math.exp(mn(et.deltaY,-120,120)*.0012),et.clientX,et.clientY)};d.addEventListener("contextmenu",y),d.addEventListener("pointerdown",_),d.addEventListener("pointermove",I),d.addEventListener("pointerup",w),d.addEventListener("pointercancel",w),d.addEventListener("wheel",A,{passive:!1});const L=new B0(14478591,5077562,1.05);o.add(L),r.hemiLight=L;const E=new k0(16773330,2.6);E.position.set(-260,380,220),E.target.position.set(80,0,0),E.castShadow=!0,E.shadow.mapSize.set(4096,4096);const x=E.shadow.camera;x.left=-480,x.right=480,x.top=330,x.bottom=-330,x.near=50,x.far=1200,E.shadow.bias=-4e-4,E.shadow.normalBias=.6,o.add(E,E.target),r.sun=E,ag(r),o.add(r.terrain),lg(r),o.add(r.water),Qg(o,r);const C={t:new R(70,0,0),d:640,phi:.9};p.target.copy(C.t),f.position.set(C.t.x,C.d*Math.cos(C.phi),C.t.z+C.d*Math.sin(C.phi));const B=t_(i,r,{onTravel:et=>{e(et)},onClose:()=>{n()}}),G=B.app;G.prepend(s.domElement),B.bindCanvasListeners(s.domElement);let $=G.clientWidth||window.innerWidth,K=G.clientHeight||window.innerHeight;function Z(){$=G.clientWidth||window.innerWidth,K=G.clientHeight||window.innerHeight,s&&s.setSize($,K),f.aspect=$/K,f.updateProjectionMatrix()}window.addEventListener("resize",Z),Z();function it(et){const vt=new Ft("#4f9bd9").lerp(new Ft("#070c18"),et),Ht=new Ft("#a9d4ee").lerp(new Ft("#10192e"),et),zt=new Ft("#d9ecf5").lerp(new Ft("#192642"),et),Xt=l.createLinearGradient(0,0,0,256);if(Xt.addColorStop(0,"#"+vt.getHexString()),Xt.addColorStop(.55,"#"+Ht.getHexString()),Xt.addColorStop(1,"#"+zt.getHexString()),l.fillStyle=Xt,l.fillRect(0,0,2,256),u.needsUpdate=!0,o.fog&&o.fog.color.copy(new Ft("#a9d0e6").lerp(new Ft("#0f182c"),et)),r.sun&&(r.sun.color.copy(new Ft("#fff0d2").lerp(new Ft("#6f88c9"),et)),r.sun.intensity=Cs.lerp(2.6,.35,et)),r.hemiLight&&(r.hemiLight.color.copy(new Ft("#dcecff").lerp(new Ft("#182542"),et)),r.hemiLight.groundColor.copy(new Ft("#4d7a3a").lerp(new Ft("#080d16"),et)),r.hemiLight.intensity=Cs.lerp(1.05,.28,et)),r.waterMat&&r.waterMat.uniforms.cD&&r.waterMat.uniforms.cD.value.copy(new Ft("#9cc4dc").lerp(new Ft("#0d1726"),et)),r.night&&r.night.registry)for(const U of r.night.registry)U.mat&&(U.mat.emissiveIntensity=Cs.lerp(U.dayIntensity,U.nightIntensity,et))}let Y=null,ft=!1,mt=0;const yt=performance.now();function pt(et){if(ft)return;Y=requestAnimationFrame(pt);const vt=Math.max(0,(et-yt)/1e3);if(B.stepTween(et),p.update(),r.waterMat&&(r.waterMat.uniforms.t.value=vt),r.flags.forEach(Nt=>{if(!Nt.g.visible)return;const Et=Nt.cl.geometry.attributes.position,Ot=Nt.base0;for(let Tt=0;Tt<Et.count;Tt++){const Qt=Ot[Tt*3];Et.setZ(Tt,Math.sin(Qt*.6-vt*4+Nt.i)*.18*Qt),Et.setY(Tt,Ot[Tt*3+1]+Math.sin(Qt*.5-vt*3+Nt.i)*.12*Qt)}Et.needsUpdate=!0}),r.spinners.forEach(Nt=>Nt.rotation.z+=.002),r.tickers.forEach(Nt=>Nt(vt)),r.youG&&(r.youG.children[0].rotation.y+=.02),r.arrowG&&(r.arrowG.position.y=9+Math.sin(vt*2)*1.2),r.carOrbit){const Nt=vt*.9;r.carOrbit.position.set(Math.cos(Nt)*15.5,.5,Math.sin(Nt)*15.5),r.carOrbit.rotation.y=-Nt-Math.PI/2}if(r.railCurve&&r.train){const Nt=Math.min(.9999,Math.max(0,(vt*.02%1+1)%1)),Et=r.railCurve.getPoint(Nt),Ot=r.railCurve.getTangent(Nt);Et&&Ot&&(r.train.position.set(Et.x,dn(Et.x,Et.z,r)+1.9,Et.z),r.train.rotation.y=Math.atan2(Ot.x,Ot.z)+Math.PI)}r.ships.forEach((Nt,Et)=>{Nt.userData.sea?Nt.position.y=Math.sin(vt*1.2)*1.4:(Nt.position.y=.2+Math.sin(vt*1.1+Et)*.5,Nt.rotation.z=Math.sin(vt*.9+Et)*.04)}),r.volTop!=null&&r.smokes.forEach(Nt=>{const Et=(Nt.userData.p+vt*.045)%1;Nt.position.set(15.59+Math.sin(Et*6+Nt.userData.p*9)*4+Et*18,r.volTop+4+Et*70,-157.79+Et*6);const Ot=14+Et*46;Nt.scale.set(Ot,Ot,1),Nt.material.opacity=.7*(1-Et)}),r.clouds.forEach(Nt=>{Nt.position.x+=Nt.userData.v*.04,Nt.position.x>900&&(Nt.position.x=-700)}),r.lava&&(r.lava.intensity=800+Math.sin(vt*5)*160);const Ht=i.querySelector("#dial");Ht&&(Ht.style.transform=`rotate(${p.getAzimuthalAngle()*180/Math.PI}deg)`);const Xt=2*f.position.distanceTo(p.target)*Math.tan(f.fov*Math.PI/360)/K,U=i.querySelector("#sc-b");if(U&&(U.style.width=50/Xt+"px"),r.night&&(r.night.target===void 0&&(r.night.target=0),Math.abs(r.night.t-r.night.target)>.001&&(r.night.t+=(r.night.target-r.night.t)*.06,it(r.night.t))),mt%30===0&&r.placedModels&&r.placedModels.children){const Nt=f.position;r.placedModels.children.forEach(Et=>{Et.userData&&Et.userData.hasLOD&&(Et.visible=Et.position.distanceTo(Nt)<1400)})}B.updateLabels($,K),(mt=mt+1|0)%2===0&&B.drawMini(),s.render(o,f)}Y=requestAnimationFrame(pt);const jt=et=>{if(!et.data||et.data.source!=="craftme-game")return;const{type:vt,x:Ht,z:zt,yaw:Xt}=et.data;vt==="open"?(Ht!=null&&zt!=null&&j(Ht,zt,Xt),St(),dt()):vt==="setPlayer"?Ht!=null&&zt!=null&&j(Ht,zt,Xt):vt==="pause"?at():vt==="resume"&&St()};window.addEventListener("message",jt);function j(et,vt,Ht){we.X=et,we.Z=vt,Ht!=null&&(we.yaw=Ht),B.placeYou()}function at(){ft=!0,Y&&(cancelAnimationFrame(Y),Y=null)}function St(){ft&&(ft=!1,Y=requestAnimationFrame(pt))}function dt(){B.fly(we.X,we.Z,160,.95)}window.CraftMap={setPlayer:j,pause:at,resume:St,isPaused:()=>ft,focusPlayer:dt,waypoints:Oe,onTravel:e,onClose:n};try{typeof parent<"u"&&parent!==window&&parent.postMessage({source:"craftme-map",type:"ready",waypoints:Oe.length},"*")}catch{}function Ut(){at(),window.removeEventListener("resize",Z),window.removeEventListener("message",jt),d.removeEventListener("contextmenu",y),d.removeEventListener("pointerdown",_),d.removeEventListener("pointermove",I),d.removeEventListener("pointerup",w),d.removeEventListener("pointercancel",w),d.removeEventListener("wheel",A),B.unbindCanvasListeners(d),o.traverse(et=>{et.geometry&&et.geometry.dispose(),et.material&&(Array.isArray(et.material)?et.material.forEach(vt=>vt.dispose()):et.material.dispose())}),u&&u.dispose(),s&&(s.dispose(),s.domElement&&s.domElement.parentNode&&s.domElement.parentNode.removeChild(s.domElement)),r.reset(),i.innerHTML=""}return{setPlayer:j,pause:at,resume:St,focusPlayer:dt,dispose:Ut}}const n_=document.getElementById("app-container")||document.body;e_(n_,{onTravel:i=>{console.log("Travel requested:",i)},onClose:()=>{console.log("Close requested")}});
