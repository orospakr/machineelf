/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

if(typeof YAHOO=="undefined"){var YAHOO={};}
YAHOO.namespace=function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=YAHOO;for(j=(d[0]=="YAHOO")?1:0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}
return o;};YAHOO.log=function(msg,cat,src){var l=YAHOO.widget.Logger;if(l&&l.log){return l.log(msg,cat,src);}else{return false;}};YAHOO.register=function(name,mainClass,data){var mods=YAHOO.env.modules;if(!mods[name]){mods[name]={versions:[],builds:[]};}
var m=mods[name],v=data.version,b=data.build,ls=YAHOO.env.listeners;m.name=name;m.version=v;m.build=b;m.versions.push(v);m.builds.push(b);m.mainClass=mainClass;for(var i=0;i<ls.length;i=i+1){ls[i](m);}
if(mainClass){mainClass.VERSION=v;mainClass.BUILD=b;}else{YAHOO.log("mainClass is undefined for module "+name,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(name){return YAHOO.env.modules[name]||null;};YAHOO.env.ua=function(){var o={ie:0,opera:0,gecko:0,webkit:0};var ua=navigator.userAgent,m;if((/KHTML/).test(ua)){o.webkit=1;}
m=ua.match(/AppleWebKit\/([^\s]*)/);if(m&&m[1]){o.webkit=parseFloat(m[1]);}
if(!o.webkit){m=ua.match(/Opera[\s\/]([^\s]*)/);if(m&&m[1]){o.opera=parseFloat(m[1]);}else{m=ua.match(/MSIE\s([^;]*)/);if(m&&m[1]){o.ie=parseFloat(m[1]);}else{m=ua.match(/Gecko\/([^\s]*)/);if(m){o.gecko=1;m=ua.match(/rv:([^\s\)]*)/);if(m&&m[1]){o.gecko=parseFloat(m[1]);}}}}}
return o;}();(function(){YAHOO.namespace("util","widget","example");if(typeof YAHOO_config!="undefined"){var l=YAHOO_config.listener,ls=YAHOO.env.listeners,unique=true,i;if(l){for(i=0;i<ls.length;i=i+1){if(ls[i]==l){unique=false;break;}}
if(unique){ls.push(l);}}}})();YAHOO.lang={isArray:function(o){if(o){var l=YAHOO.lang;return l.isNumber(o.length)&&l.isFunction(o.splice)&&!l.hasOwnProperty(o.length);}
return false;},isBoolean:function(o){return typeof o==='boolean';},isFunction:function(o){return typeof o==='function';},isNull:function(o){return o===null;},isNumber:function(o){return typeof o==='number'&&isFinite(o);},isObject:function(o){return(o&&(typeof o==='object'||YAHOO.lang.isFunction(o)))||false;},isString:function(o){return typeof o==='string';},isUndefined:function(o){return typeof o==='undefined';},hasOwnProperty:function(o,prop){if(Object.prototype.hasOwnProperty){return o.hasOwnProperty(prop);}
return!YAHOO.lang.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop];},_IEEnumFix:function(r,s){if(YAHOO.env.ua.ie){var add=["toString","valueOf"];for(i=0;i<add.length;i=i+1){var fname=add[i],f=s[fname];if(YAHOO.lang.isFunction(f)&&f!=Object.prototype[fname]){r[fname]=f;}}}},extend:function(subc,superc,overrides){if(!superc||!subc){throw new Error("YAHOO.lang.extend failed, please check that "+"all dependencies are included.");}
var F=function(){};F.prototype=superc.prototype;subc.prototype=new F();subc.prototype.constructor=subc;subc.superclass=superc.prototype;if(superc.prototype.constructor==Object.prototype.constructor){superc.prototype.constructor=superc;}
if(overrides){for(var i in overrides){subc.prototype[i]=overrides[i];}
YAHOO.lang._IEEnumFix(subc.prototype,overrides);}},augmentObject:function(r,s){if(!s||!r){throw new Error("Absorb failed, verify dependencies.");}
var a=arguments,i,p,override=a[2];if(override&&override!==true){for(i=2;i<a.length;i=i+1){r[a[i]]=s[a[i]];}}else{for(p in s){if(override||!r[p]){r[p]=s[p];}}
YAHOO.lang._IEEnumFix(r,s);}},augmentProto:function(r,s){if(!s||!r){throw new Error("Augment failed, verify dependencies.");}
var a=[r.prototype,s.prototype];for(var i=2;i<arguments.length;i=i+1){a.push(arguments[i]);}
YAHOO.lang.augmentObject.apply(this,a);},dump:function(o,d){var l=YAHOO.lang,i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=', ',ARROW=' => ';if(!l.isObject(o)||o instanceof Date||("nodeType"in o&&"tagName"in o)){return o;}else if(l.isFunction(o)){return FUN;}
d=(l.isNumber(d))?d:3;if(l.isArray(o)){s.push("[");for(i=0,len=o.length;i<len;i=i+1){if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}
if(s.length>1){s.pop();}
s.push("]");}else{s.push("{");for(i in o){if(l.hasOwnProperty(o,i)){s.push(i+ARROW);if(l.isObject(o[i])){s.push((d>0)?l.dump(o[i],d-1):OBJ);}else{s.push(o[i]);}
s.push(COMMA);}}
if(s.length>1){s.pop();}
s.push("}");}
return s.join("");},substitute:function(s,o,f){var i,j,k,key,v,meta,l=YAHOO.lang,saved=[],token,DUMP='dump',SPACE=' ',LBRACE='{',RBRACE='}';for(;;){i=s.lastIndexOf(LBRACE);if(i<0){break;}
j=s.indexOf(RBRACE,i);if(i+1>=j){break;}
token=s.substring(i+1,j);key=token;meta=null;k=key.indexOf(SPACE);if(k>-1){meta=key.substring(k+1);key=key.substring(0,k);}
v=o[key];if(f){v=f(key,v,meta);}
if(l.isObject(v)){if(l.isArray(v)){v=l.dump(v,parseInt(meta,10));}else{meta=meta||"";var dump=meta.indexOf(DUMP);if(dump>-1){meta=meta.substring(4);}
if(v.toString===Object.prototype.toString||dump>-1){v=l.dump(v,parseInt(meta,10));}else{v=v.toString();}}}else if(!l.isString(v)&&!l.isNumber(v)){v="~-"+saved.length+"-~";saved[saved.length]=token;}
s=s.substring(0,i)+v+s.substring(j+1);}
for(i=saved.length-1;i>=0;i=i-1){s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g");}
return s;},trim:function(s){try{return s.replace(/^\s+|\s+$/g,"");}catch(e){return s;}},merge:function(){var o={},a=arguments,i;for(i=0;i<a.length;i=i+1){YAHOO.lang.augmentObject(o,a[i],true);}
return o;},isValue:function(o){var l=YAHOO.lang;return(l.isObject(o)||l.isString(o)||l.isNumber(o)||l.isBoolean(o));}};YAHOO.util.Lang=YAHOO.lang;YAHOO.lang.augment=YAHOO.lang.augmentProto;YAHOO.augment=YAHOO.lang.augmentProto;YAHOO.extend=YAHOO.lang.extend;YAHOO.register("yahoo",YAHOO,{version:"2.3.0",build:"442"});
(function(){var Y=YAHOO.util,getStyle,setStyle,id_counter=0,propertyCache={},reClassNameCache={};var isOpera=YAHOO.env.ua.opera,isSafari=YAHOO.env.ua.webkit,isGecko=YAHOO.env.ua.gecko,isIE=YAHOO.env.ua.ie;var patterns={HYPHEN:/(-[a-z])/i,ROOT_TAG:/^body|html$/i};var toCamel=function(property){if(!patterns.HYPHEN.test(property)){return property;}
if(propertyCache[property]){return propertyCache[property];}
var converted=property;while(patterns.HYPHEN.exec(converted)){converted=converted.replace(RegExp.$1,RegExp.$1.substr(1).toUpperCase());}
propertyCache[property]=converted;return converted;};var getClassRegEx=function(className){var re=reClassNameCache[className];if(!re){re=new RegExp('(?:^|\\s+)'+className+'(?:\\s+|$)');reClassNameCache[className]=re;}
return re;};if(document.defaultView&&document.defaultView.getComputedStyle){getStyle=function(el,property){var value=null;if(property=='float'){property='cssFloat';}
var computed=document.defaultView.getComputedStyle(el,'');if(computed){value=computed[toCamel(property)];}
return el.style[property]||value;};}else if(document.documentElement.currentStyle&&isIE){getStyle=function(el,property){switch(toCamel(property)){case'opacity':var val=100;try{val=el.filters['DXImageTransform.Microsoft.Alpha'].opacity;}catch(e){try{val=el.filters('alpha').opacity;}catch(e){}}
return val/100;case'float':property='styleFloat';default:var value=el.currentStyle?el.currentStyle[property]:null;return(el.style[property]||value);}};}else{getStyle=function(el,property){return el.style[property];};}
if(isIE){setStyle=function(el,property,val){switch(property){case'opacity':if(YAHOO.lang.isString(el.style.filter)){el.style.filter='alpha(opacity='+val*100+')';if(!el.currentStyle||!el.currentStyle.hasLayout){el.style.zoom=1;}}
break;case'float':property='styleFloat';default:el.style[property]=val;}};}else{setStyle=function(el,property,val){if(property=='float'){property='cssFloat';}
el.style[property]=val;};}
var testElement=function(node,method){return node&&node.nodeType==1&&(!method||method(node));};YAHOO.util.Dom={get:function(el){if(!el||el.tagName||el.item){return el;}
if(YAHOO.lang.isString(el)){return document.getElementById(el);}
if(el.splice){var c=[];for(var i=0,len=el.length;i<len;++i){c[c.length]=Y.Dom.get(el[i]);}
return c;}
return el;},getStyle:function(el,property){property=toCamel(property);var f=function(element){return getStyle(element,property);};return Y.Dom.batch(el,f,Y.Dom,true);},setStyle:function(el,property,val){property=toCamel(property);var f=function(element){setStyle(element,property,val);};Y.Dom.batch(el,f,Y.Dom,true);},getXY:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var parentNode=null;var pos=[];var box;var doc=el.ownerDocument;if(el.getBoundingClientRect){box=el.getBoundingClientRect();return[box.left+Y.Dom.getDocumentScrollLeft(el.ownerDocument),box.top+Y.Dom.getDocumentScrollTop(el.ownerDocument)];}
else{pos=[el.offsetLeft,el.offsetTop];parentNode=el.offsetParent;var hasAbs=this.getStyle(el,'position')=='absolute';if(parentNode!=el){while(parentNode){pos[0]+=parentNode.offsetLeft;pos[1]+=parentNode.offsetTop;if(isSafari&&!hasAbs&&this.getStyle(parentNode,'position')=='absolute'){hasAbs=true;}
parentNode=parentNode.offsetParent;}}
if(isSafari&&hasAbs){pos[0]-=el.ownerDocument.body.offsetLeft;pos[1]-=el.ownerDocument.body.offsetTop;}}
parentNode=el.parentNode;while(parentNode.tagName&&!patterns.ROOT_TAG.test(parentNode.tagName))
{if(Y.Dom.getStyle(parentNode,'display').search(/^inline|table-row.*$/i)){pos[0]-=parentNode.scrollLeft;pos[1]-=parentNode.scrollTop;}
parentNode=parentNode.parentNode;}
return pos;};return Y.Dom.batch(el,f,Y.Dom,true);},getX:function(el){var f=function(el){return Y.Dom.getXY(el)[0];};return Y.Dom.batch(el,f,Y.Dom,true);},getY:function(el){var f=function(el){return Y.Dom.getXY(el)[1];};return Y.Dom.batch(el,f,Y.Dom,true);},setXY:function(el,pos,noRetry){var f=function(el){var style_pos=this.getStyle(el,'position');if(style_pos=='static'){this.setStyle(el,'position','relative');style_pos='relative';}
var pageXY=this.getXY(el);if(pageXY===false){return false;}
var delta=[parseInt(this.getStyle(el,'left'),10),parseInt(this.getStyle(el,'top'),10)];if(isNaN(delta[0])){delta[0]=(style_pos=='relative')?0:el.offsetLeft;}
if(isNaN(delta[1])){delta[1]=(style_pos=='relative')?0:el.offsetTop;}
if(pos[0]!==null){el.style.left=pos[0]-pageXY[0]+delta[0]+'px';}
if(pos[1]!==null){el.style.top=pos[1]-pageXY[1]+delta[1]+'px';}
if(!noRetry){var newXY=this.getXY(el);if((pos[0]!==null&&newXY[0]!=pos[0])||(pos[1]!==null&&newXY[1]!=pos[1])){this.setXY(el,pos,true);}}};Y.Dom.batch(el,f,Y.Dom,true);},setX:function(el,x){Y.Dom.setXY(el,[x,null]);},setY:function(el,y){Y.Dom.setXY(el,[null,y]);},getRegion:function(el){var f=function(el){if((el.parentNode===null||el.offsetParent===null||this.getStyle(el,'display')=='none')&&el!=document.body){return false;}
var region=Y.Region.getRegion(el);return region;};return Y.Dom.batch(el,f,Y.Dom,true);},getClientWidth:function(){return Y.Dom.getViewportWidth();},getClientHeight:function(){return Y.Dom.getViewportHeight();},getElementsByClassName:function(className,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag),re=getClassRegEx(className);for(var i=0,len=elements.length;i<len;++i){if(re.test(elements[i].className)){nodes[nodes.length]=elements[i];if(apply){apply.call(elements[i],elements[i]);}}}
return nodes;},hasClass:function(el,className){var re=getClassRegEx(className);var f=function(el){return re.test(el.className);};return Y.Dom.batch(el,f,Y.Dom,true);},addClass:function(el,className){var f=function(el){if(this.hasClass(el,className)){return false;}
el.className=YAHOO.lang.trim([el.className,className].join(' '));return true;};return Y.Dom.batch(el,f,Y.Dom,true);},removeClass:function(el,className){var re=getClassRegEx(className);var f=function(el){if(!this.hasClass(el,className)){return false;}
var c=el.className;el.className=c.replace(re,' ');if(this.hasClass(el,className)){this.removeClass(el,className);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},replaceClass:function(el,oldClassName,newClassName){if(!newClassName||oldClassName===newClassName){return false;}
var re=getClassRegEx(oldClassName);var f=function(el){if(!this.hasClass(el,oldClassName)){this.addClass(el,newClassName);return true;}
el.className=el.className.replace(re,' '+newClassName+' ');if(this.hasClass(el,oldClassName)){this.replaceClass(el,oldClassName,newClassName);}
el.className=YAHOO.lang.trim(el.className);return true;};return Y.Dom.batch(el,f,Y.Dom,true);},generateId:function(el,prefix){prefix=prefix||'yui-gen';var f=function(el){if(el&&el.id){return el.id;}
var id=prefix+id_counter++;if(el){el.id=id;}
return id;};return Y.Dom.batch(el,f,Y.Dom,true)||f.apply(Y.Dom,arguments);},isAncestor:function(haystack,needle){haystack=Y.Dom.get(haystack);if(!haystack||!needle){return false;}
var f=function(node){if(haystack.contains&&node.nodeType&&!isSafari){return haystack.contains(node);}
else if(haystack.compareDocumentPosition&&node.nodeType){return!!(haystack.compareDocumentPosition(node)&16);}else if(node.nodeType){return!!this.getAncestorBy(node,function(el){return el==haystack;});}
return false;};return Y.Dom.batch(needle,f,Y.Dom,true);},inDocument:function(el){var f=function(el){if(isSafari){while(el=el.parentNode){if(el==document.documentElement){return true;}}
return false;}
return this.isAncestor(document.documentElement,el);};return Y.Dom.batch(el,f,Y.Dom,true);},getElementsBy:function(method,tag,root,apply){tag=tag||'*';root=(root)?Y.Dom.get(root):null||document;if(!root){return[];}
var nodes=[],elements=root.getElementsByTagName(tag);for(var i=0,len=elements.length;i<len;++i){if(method(elements[i])){nodes[nodes.length]=elements[i];if(apply){apply(elements[i]);}}}
return nodes;},batch:function(el,method,o,override){el=(el&&el.tagName)?el:Y.Dom.get(el);if(!el||!method){return false;}
var scope=(override)?o:window;if(el.tagName||(!el.item&&!el.slice)){return method.call(scope,el,o);}
var collection=[];for(var i=0,len=el.length;i<len;++i){collection[collection.length]=method.call(scope,el[i],o);}
return collection;},getDocumentHeight:function(){var scrollHeight=(document.compatMode!='CSS1Compat')?document.body.scrollHeight:document.documentElement.scrollHeight;var h=Math.max(scrollHeight,Y.Dom.getViewportHeight());return h;},getDocumentWidth:function(){var scrollWidth=(document.compatMode!='CSS1Compat')?document.body.scrollWidth:document.documentElement.scrollWidth;var w=Math.max(scrollWidth,Y.Dom.getViewportWidth());return w;},getViewportHeight:function(){var height=self.innerHeight;var mode=document.compatMode;if((mode||isIE)&&!isOpera){height=(mode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight;}
return height;},getViewportWidth:function(){var width=self.innerWidth;var mode=document.compatMode;if(mode||isIE){width=(mode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth;}
return width;},getAncestorBy:function(node,method){while(node=node.parentNode){if(testElement(node,method)){return node;}}
return null;},getAncestorByClassName:function(node,className){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return Y.Dom.hasClass(el,className);};return Y.Dom.getAncestorBy(node,method);},getAncestorByTagName:function(node,tagName){node=Y.Dom.get(node);if(!node){return null;}
var method=function(el){return el.tagName&&el.tagName.toUpperCase()==tagName.toUpperCase();};return Y.Dom.getAncestorBy(node,method);},getPreviousSiblingBy:function(node,method){while(node){node=node.previousSibling;if(testElement(node,method)){return node;}}
return null;},getPreviousSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getPreviousSiblingBy(node);},getNextSiblingBy:function(node,method){while(node){node=node.nextSibling;if(testElement(node,method)){return node;}}
return null;},getNextSibling:function(node){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getNextSiblingBy(node);},getFirstChildBy:function(node,method){var child=(testElement(node.firstChild,method))?node.firstChild:null;return child||Y.Dom.getNextSiblingBy(node.firstChild,method);},getFirstChild:function(node,method){node=Y.Dom.get(node);if(!node){return null;}
return Y.Dom.getFirstChildBy(node);},getLastChildBy:function(node,method){if(!node){return null;}
var child=(testElement(node.lastChild,method))?node.lastChild:null;return child||Y.Dom.getPreviousSiblingBy(node.lastChild,method);},getLastChild:function(node){node=Y.Dom.get(node);return Y.Dom.getLastChildBy(node);},getChildrenBy:function(node,method){var child=Y.Dom.getFirstChildBy(node,method);var children=child?[child]:[];Y.Dom.getNextSiblingBy(child,function(node){if(!method||method(node)){children[children.length]=node;}
return false;});return children;},getChildren:function(node){node=Y.Dom.get(node);if(!node){}
return Y.Dom.getChildrenBy(node);},getDocumentScrollLeft:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);},getDocumentScrollTop:function(doc){doc=doc||document;return Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);},insertBefore:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
return referenceNode.parentNode.insertBefore(newNode,referenceNode);},insertAfter:function(newNode,referenceNode){newNode=Y.Dom.get(newNode);referenceNode=Y.Dom.get(referenceNode);if(!newNode||!referenceNode||!referenceNode.parentNode){return null;}
if(referenceNode.nextSibling){return referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}else{return referenceNode.parentNode.appendChild(newNode);}}};})();YAHOO.util.Region=function(t,r,b,l){this.top=t;this[1]=t;this.right=r;this.bottom=b;this.left=l;this[0]=l;};YAHOO.util.Region.prototype.contains=function(region){return(region.left>=this.left&&region.right<=this.right&&region.top>=this.top&&region.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(region){var t=Math.max(this.top,region.top);var r=Math.min(this.right,region.right);var b=Math.min(this.bottom,region.bottom);var l=Math.max(this.left,region.left);if(b>=t&&r>=l){return new YAHOO.util.Region(t,r,b,l);}else{return null;}};YAHOO.util.Region.prototype.union=function(region){var t=Math.min(this.top,region.top);var r=Math.max(this.right,region.right);var b=Math.max(this.bottom,region.bottom);var l=Math.min(this.left,region.left);return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+"}");};YAHOO.util.Region.getRegion=function(el){var p=YAHOO.util.Dom.getXY(el);var t=p[1];var r=p[0]+el.offsetWidth;var b=p[1]+el.offsetHeight;var l=p[0];return new YAHOO.util.Region(t,r,b,l);};YAHOO.util.Point=function(x,y){if(YAHOO.lang.isArray(x)){y=x[1];x=x[0];}
this.x=this.right=this.left=this[0]=x;this.y=this.top=this.bottom=this[1]=y;};YAHOO.util.Point.prototype=new YAHOO.util.Region();YAHOO.register("dom",YAHOO.util.Dom,{version:"2.3.0",build:"442"});
YAHOO.util.CustomEvent=function(type,oScope,silent,signature){this.type=type;this.scope=oScope||window;this.silent=silent;this.signature=signature||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}
var onsubscribeType="_YUICEOnSubscribe";if(type!==onsubscribeType){this.subscribeEvent=new YAHOO.util.CustomEvent(onsubscribeType,this,true);}};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(fn,obj,override){if(!fn){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}
if(this.subscribeEvent){this.subscribeEvent.fire(fn,obj,override);}
this.subscribers.push(new YAHOO.util.Subscriber(fn,obj,override));},unsubscribe:function(fn,obj){if(!fn){return this.unsubscribeAll();}
var found=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,obj)){this._delete(i);found=true;}}
return found;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return true;}
var args=[],ret=true,i,rebuild=false;for(i=0;i<arguments.length;++i){args.push(arguments[i]);}
var argslength=args.length;if(!this.silent){}
for(i=0;i<len;++i){var s=this.subscribers[i];if(!s){rebuild=true;}else{if(!this.silent){}
var scope=s.getScope(this.scope);if(this.signature==YAHOO.util.CustomEvent.FLAT){var param=null;if(args.length>0){param=args[0];}
ret=s.fn.call(scope,param,s.obj);}else{ret=s.fn.call(scope,this.type,args,s.obj);}
if(false===ret){if(!this.silent){}
return false;}}}
if(rebuild){var newlist=[],subs=this.subscribers;for(i=0,len=subs.length;i<len;++i){s=subs[i];newlist.push(subs[i]);}
this.subscribers=newlist;}
return true;},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}
this.subscribers=[];return i;},_delete:function(index){var s=this.subscribers[index];if(s){delete s.fn;delete s.obj;}
this.subscribers[index]=null;},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,override){this.fn=fn;this.obj=YAHOO.lang.isUndefined(obj)?null:obj;this.override=override;};YAHOO.util.Subscriber.prototype.getScope=function(defaultScope){if(this.override){if(this.override===true){return this.obj;}else{return this.override;}}
return defaultScope;};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){if(obj){return(this.fn==fn&&this.obj==obj);}else{return(this.fn==fn);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var loadComplete=false;var DOMReady=false;var listeners=[];var unloadListeners=[];var legacyEvents=[];var legacyHandlers=[];var retryCount=0;var onAvailStack=[];var legacyMap=[];var counter=0;var webkitKeymap={63232:38,63233:40,63234:37,63235:39};return{POLL_RETRYS:4000,POLL_INTERVAL:10,EL:0,TYPE:1,FN:2,WFN:3,OBJ:3,ADJ_SCOPE:4,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:YAHOO.env.ua.ie,_interval:null,startInterval:function(){if(!this._interval){var self=this;var callback=function(){self._tryPreloadAttach();};this._interval=setInterval(callback,this.POLL_INTERVAL);}},onAvailable:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:false});retryCount=this.POLL_RETRYS;this.startInterval();},onDOMReady:function(p_fn,p_obj,p_override){if(DOMReady){setTimeout(function(){var s=window;if(p_override){if(p_override===true){s=p_obj;}else{s=p_override;}}
p_fn.call(s,"DOMReady",[],p_obj);},0);}else{this.DOMReadyEvent.subscribe(p_fn,p_obj,p_override);}},onContentReady:function(p_id,p_fn,p_obj,p_override){onAvailStack.push({id:p_id,fn:p_fn,obj:p_obj,override:p_override,checkReady:true});retryCount=this.POLL_RETRYS;this.startInterval();},addListener:function(el,sType,fn,obj,override){if(!fn||!fn.call){return false;}
if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=this.on(el[i],sType,fn,obj,override)&&ok;}
return ok;}else if(YAHOO.lang.isString(el)){var oEl=this.getEl(el);if(oEl){el=oEl;}else{this.onAvailable(el,function(){YAHOO.util.Event.on(el,sType,fn,obj,override);});return true;}}
if(!el){return false;}
if("unload"==sType&&obj!==this){unloadListeners[unloadListeners.length]=[el,sType,fn,obj,override];return true;}
var scope=el;if(override){if(override===true){scope=obj;}else{scope=override;}}
var wrappedFn=function(e){return fn.call(scope,YAHOO.util.Event.getEvent(e),obj);};var li=[el,sType,fn,wrappedFn,scope];var index=listeners.length;listeners[index]=li;if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);if(legacyIndex==-1||el!=legacyEvents[legacyIndex][0]){legacyIndex=legacyEvents.length;legacyMap[el.id+sType]=legacyIndex;legacyEvents[legacyIndex]=[el,sType,el["on"+sType]];legacyHandlers[legacyIndex]=[];el["on"+sType]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),legacyIndex);};}
legacyHandlers[legacyIndex].push(li);}else{try{this._simpleAdd(el,sType,wrappedFn,false);}catch(ex){this.lastError=ex;this.removeListener(el,sType,fn);return false;}}
return true;},fireLegacyEvent:function(e,legacyIndex){var ok=true,le,lh,li,scope,ret;lh=legacyHandlers[legacyIndex];for(var i=0,len=lh.length;i<len;++i){li=lh[i];if(li&&li[this.WFN]){scope=li[this.ADJ_SCOPE];ret=li[this.WFN].call(scope,e);ok=(ok&&ret);}}
le=legacyEvents[legacyIndex];if(le&&le[2]){le[2](e);}
return ok;},getLegacyIndex:function(el,sType){var key=this.generateId(el)+sType;if(typeof legacyMap[key]=="undefined"){return-1;}else{return legacyMap[key];}},useLegacyEvent:function(el,sType){if(this.webkit&&("click"==sType||"dblclick"==sType)){var v=parseInt(this.webkit,10);if(!isNaN(v)&&v<418){return true;}}
return false;},removeListener:function(el,sType,fn){var i,len;if(typeof el=="string"){el=this.getEl(el);}else if(this._isValidCollection(el)){var ok=true;for(i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],sType,fn)&&ok);}
return ok;}
if(!fn||!fn.call){return this.purgeElement(el,false,sType);}
if("unload"==sType){for(i=0,len=unloadListeners.length;i<len;i++){var li=unloadListeners[i];if(li&&li[0]==el&&li[1]==sType&&li[2]==fn){unloadListeners[i]=null;return true;}}
return false;}
var cacheItem=null;var index=arguments[3];if("undefined"==typeof index){index=this._getCacheIndex(el,sType,fn);}
if(index>=0){cacheItem=listeners[index];}
if(!el||!cacheItem){return false;}
if(this.useLegacyEvent(el,sType)){var legacyIndex=this.getLegacyIndex(el,sType);var llist=legacyHandlers[legacyIndex];if(llist){for(i=0,len=llist.length;i<len;++i){li=llist[i];if(li&&li[this.EL]==el&&li[this.TYPE]==sType&&li[this.FN]==fn){llist[i]=null;break;}}}}else{try{this._simpleRemove(el,sType,cacheItem[this.WFN],false);}catch(ex){this.lastError=ex;return false;}}
delete listeners[index][this.WFN];delete listeners[index][this.FN];listeners[index]=null;return true;},getTarget:function(ev,resolveTextNode){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(node){if(node&&3==node.nodeType){return node.parentNode;}else{return node;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}
return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}
return y;},getXY:function(ev){return[this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else if(ev.type=="mouseover"){t=ev.fromElement;}}
return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(ex){this.lastError=ex;return t;}}
return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}
c=c.caller;}}
return ev;},getCharCode:function(ev){var code=ev.keyCode||ev.charCode||0;if(YAHOO.env.ua.webkit&&(code in webkitKeymap)){code=webkitKeymap[code];}
return code;},_getCacheIndex:function(el,sType,fn){for(var i=0,len=listeners.length;i<len;++i){var li=listeners[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==sType){return i;}}
return-1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+counter;++counter;el.id=id;}
return id;},_isValidCollection:function(o){try{return(o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");}catch(e){return false;}},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",this),_load:function(e){if(!loadComplete){loadComplete=true;var EU=YAHOO.util.Event;EU._ready();EU._tryPreloadAttach();}},_ready:function(e){if(!DOMReady){DOMReady=true;var EU=YAHOO.util.Event;EU.DOMReadyEvent.fire();EU._simpleRemove(document,"DOMContentLoaded",EU._ready);}},_tryPreloadAttach:function(){if(this.locked){return false;}
if(this.isIE){if(!DOMReady){this.startInterval();return false;}}
this.locked=true;var tryAgain=!loadComplete;if(!tryAgain){tryAgain=(retryCount>0);}
var notAvail=[];var executeItem=function(el,item){var scope=el;if(item.override){if(item.override===true){scope=item.obj;}else{scope=item.override;}}
item.fn.call(scope,item.obj);};var i,len,item,el;for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&!item.checkReady){el=this.getEl(item.id);if(el){executeItem(el,item);onAvailStack[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=onAvailStack.length;i<len;++i){item=onAvailStack[i];if(item&&item.checkReady){el=this.getEl(item.id);if(el){if(loadComplete||el.nextSibling){executeItem(el,item);onAvailStack[i]=null;}}else{notAvail.push(item);}}}
retryCount=(notAvail.length===0)?0:retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return true;},purgeElement:function(el,recurse,sType){var elListeners=this.getListeners(el,sType);if(elListeners){for(var i=0,len=elListeners.length;i<len;++i){var l=elListeners[i];this.removeListener(el,l.type,l.fn,l.index);}}
if(recurse&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],recurse,sType);}}},getListeners:function(el,sType){var results=[],searchLists;if(!sType){searchLists=[listeners,unloadListeners];}else if(sType=="unload"){searchLists=[unloadListeners];}else{searchLists=[listeners];}
for(var j=0;j<searchLists.length;++j){var searchList=searchLists[j];if(searchList&&searchList.length>0){for(var i=0,len=searchList.length;i<len;++i){var l=searchList[i];if(l&&l[this.EL]===el&&(!sType||sType===l[this.TYPE])){results.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.OBJ],adjust:l[this.ADJ_SCOPE],index:i});}}}}
return(results.length)?results:null;},_unload:function(e){var EU=YAHOO.util.Event,i,j,l,len,index;for(i=0,len=unloadListeners.length;i<len;++i){l=unloadListeners[i];if(l){var scope=window;if(l[EU.ADJ_SCOPE]){if(l[EU.ADJ_SCOPE]===true){scope=l[EU.OBJ];}else{scope=l[EU.ADJ_SCOPE];}}
l[EU.FN].call(scope,EU.getEvent(e),l[EU.OBJ]);unloadListeners[i]=null;l=null;scope=null;}}
unloadListeners=null;if(listeners&&listeners.length>0){j=listeners.length;while(j){index=j-1;l=listeners[index];if(l){EU.removeListener(l[EU.EL],l[EU.TYPE],l[EU.FN],index);}
j=j-1;}
l=null;EU.clearCache();}
for(i=0,len=legacyEvents.length;i<len;++i){legacyEvents[i][0]=null;legacyEvents[i]=null;}
legacyEvents=null;EU._simpleRemove(window,"unload",EU._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&(dd.scrollTop||dd.scrollLeft)){return[dd.scrollTop,dd.scrollLeft];}else if(db){return[db.scrollTop,db.scrollLeft];}else{return[0,0];}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(el,sType,fn,capture){el.addEventListener(sType,fn,(capture));};}else if(window.attachEvent){return function(el,sType,fn,capture){el.attachEvent("on"+sType,fn);};}else{return function(){};}}(),_simpleRemove:function(){if(window.removeEventListener){return function(el,sType,fn,capture){el.removeEventListener(sType,fn,(capture));};}else if(window.detachEvent){return function(el,sType,fn){el.detachEvent("on"+sType,fn);};}else{return function(){};}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;if(EU.isIE){YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var el,d=document,b=d.body;if(("undefined"!==typeof YAHOO_config)&&YAHOO_config.injecting){el=document.createElement("script");var p=d.getElementsByTagName("head")[0]||b;p.insertBefore(el,p.firstChild);}else{d.write('<scr'+'ipt id="_yui_eu_dr" defer="true" src="//:"><'+'/script>');el=document.getElementById("_yui_eu_dr");}
if(el){el.onreadystatechange=function(){if("complete"===this.readyState){this.parentNode.removeChild(this);YAHOO.util.Event._ready();}};}else{}
el=null;}else if(EU.webkit){EU._drwatch=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._drwatch);EU._drwatch=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}
EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}
YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(p_type,p_fn,p_obj,p_override){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(ce){ce.subscribe(p_fn,p_obj,p_override);}else{this.__yui_subscribers=this.__yui_subscribers||{};var subs=this.__yui_subscribers;if(!subs[p_type]){subs[p_type]=[];}
subs[p_type].push({fn:p_fn,obj:p_obj,override:p_override});}},unsubscribe:function(p_type,p_fn,p_obj){this.__yui_events=this.__yui_events||{};var evts=this.__yui_events;if(p_type){var ce=evts[p_type];if(ce){return ce.unsubscribe(p_fn,p_obj);}}else{for(var i in evts){var ret=true;if(YAHOO.lang.hasOwnProperty(evts,i)){ret=ret&&evts[i].unsubscribe(p_fn,p_obj);}}
return ret;}
return false;},unsubscribeAll:function(p_type){return this.unsubscribe(p_type);},createEvent:function(p_type,p_config){this.__yui_events=this.__yui_events||{};var opts=p_config||{};var events=this.__yui_events;if(events[p_type]){}else{var scope=opts.scope||this;var silent=(opts.silent);var ce=new YAHOO.util.CustomEvent(p_type,scope,silent,YAHOO.util.CustomEvent.FLAT);events[p_type]=ce;if(opts.onSubscribeCallback){ce.subscribeEvent.subscribe(opts.onSubscribeCallback);}
this.__yui_subscribers=this.__yui_subscribers||{};var qs=this.__yui_subscribers[p_type];if(qs){for(var i=0;i<qs.length;++i){ce.subscribe(qs[i].fn,qs[i].obj,qs[i].override);}}}
return events[p_type];},fireEvent:function(p_type,arg1,arg2,etc){this.__yui_events=this.__yui_events||{};var ce=this.__yui_events[p_type];if(!ce){return null;}
var args=[];for(var i=1;i<arguments.length;++i){args.push(arguments[i]);}
return ce.fire.apply(ce,args);},hasEvent:function(type){if(this.__yui_events){if(this.__yui_events[type]){return true;}}
return false;}};YAHOO.util.KeyListener=function(attachTo,keyData,handler,event){if(!attachTo){}else if(!keyData){}else if(!handler){}
if(!event){event=YAHOO.util.KeyListener.KEYDOWN;}
var keyEvent=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(typeof attachTo=='string'){attachTo=document.getElementById(attachTo);}
if(typeof handler=='function'){keyEvent.subscribe(handler);}else{keyEvent.subscribe(handler.fn,handler.scope,handler.correctScope);}
function handleKeyPress(e,obj){if(!keyData.shift){keyData.shift=false;}
if(!keyData.alt){keyData.alt=false;}
if(!keyData.ctrl){keyData.ctrl=false;}
if(e.shiftKey==keyData.shift&&e.altKey==keyData.alt&&e.ctrlKey==keyData.ctrl){var dataItem;var keyPressed;if(keyData.keys instanceof Array){for(var i=0;i<keyData.keys.length;i++){dataItem=keyData.keys[i];if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);break;}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);break;}}}else{dataItem=keyData.keys;if(dataItem==e.charCode){keyEvent.fire(e.charCode,e);}else if(dataItem==e.keyCode){keyEvent.fire(e.keyCode,e);}}}}
this.enable=function(){if(!this.enabled){YAHOO.util.Event.addListener(attachTo,event,handleKeyPress);this.enabledEvent.fire(keyData);}
this.enabled=true;};this.disable=function(){if(this.enabled){YAHOO.util.Event.removeListener(attachTo,event,handleKeyPress);this.disabledEvent.fire(keyData);}
this.enabled=false;};this.toString=function(){return"KeyListener ["+keyData.keys+"] "+attachTo.tagName+
(attachTo.id?"["+attachTo.id+"]":"");};};YAHOO.util.KeyListener.KEYDOWN="keydown";YAHOO.util.KeyListener.KEYUP="keyup";YAHOO.register("event",YAHOO.util.Event,{version:"2.3.0",build:"442"});YAHOO.register("yahoo-dom-event", YAHOO, {version: "2.3.0", build: "442"});
// JavaScript Dropdown - replacement for Selects using
// replaceSelect(mirroredSelect)
// works standalone too tho.
// this version is based on Yahoo UI using yahoo, dom, event.

function jsDropdown(/*array*/ opts, selected, cssClass) {
	if(opts == undefined) return false;
	if(selected == undefined) selected=0;
	if(cssClass == undefined) cssClass="";
	
	elementContainer ='div';
	classContainer =  cssClass+' jsSelect';
	elementButton ='div';
	classButton = 'dropbutton';
	elementList ='ul';
	classList = 'optionList';
	classListExpanded = 'expanded';
	elementListItem ='li';
	classActiveListItem = 'active';
	classFirstListItem = 'first';
	classLastListItem = 'last';
	mouseOverClass = 'hover';
	
	var that = this;
	var option = opts;
	var selectedOption = selected;
	var expanded = false;
	var blockclose = false;
	
	this.onClickAnywhere = function() {
		if(blockclose) {
			blockclose = false;
			}
		else if(expanded) {
			this.collapse();
			}
		}
	YAHOO.util.Event.addListener(document, "click", this.onClickAnywhere, this, true); 
	
	this.setOption = function(obj) {
		for (var i=0; i<sListItem.length; i++) {
			if(sListItem[i] == obj) {
				if(selectedOption!=i) {
					selectedOption=i;
					sCurrentSelectedText.nodeValue=option[selectedOption];
					YAHOO.util.Dom.addClass(sListItem[i], classActiveListItem);
					this.onChange();
					}
				}
			else YAHOO.util.Dom.removeClass(sListItem[i], classActiveListItem);
			}
		}
	this.onChange = function() {
		//alert("Changed! "+selectedOption);
		}
	this.expand = function() {
		expanded = true;
		YAHOO.util.Dom.addClass(sList, classListExpanded);
		YAHOO.util.Dom.addClass(sCurrentSelected, classListExpanded);
		}
	this.collapse = function() {
		YAHOO.util.Dom.removeClass(sList, classListExpanded);
		YAHOO.util.Dom.removeClass(sCurrentSelected, classListExpanded);
		expanded = false;
		}
	
	//generate Nodes
	var sContainer = document.createElement(elementContainer);
	YAHOO.util.Dom.addClass(sContainer, classContainer);
	
	var sCurrentSelected = document.createElement(elementButton);
	sContainer.appendChild(sCurrentSelected);
	sCurrentSelected.onclick = function() {
		if(!expanded) {
			that.expand();
			blockclose = true;
			}
		else that.collapse();
		}
	YAHOO.util.Dom.addClass(sCurrentSelected, classButton);
	sCurrentSelected.onmouseover = function() {
		YAHOO.util.Dom.addClass(this, mouseOverClass);
		}
	sCurrentSelected.onmouseout = function() {
		YAHOO.util.Dom.removeClass(this, mouseOverClass);
		}
	var sCurrentSelectedText = document.createTextNode(option[selectedOption]);
	sCurrentSelected.appendChild(sCurrentSelectedText);

	var sList = document.createElement(elementList);
	sContainer.appendChild(sList);
	YAHOO.util.Dom.addClass(sList, classList);

	var sListItem = new Array();
	for (var i=0; i<option.length; i++) {
		sListItem[i] = document.createElement(elementListItem);
		sList.appendChild(sListItem[i]);
		var sListItemText = document.createTextNode(option[i]);
		sListItem[i].appendChild(sListItemText);
		sListItem[i].onclick = function() {
			that.setOption(this);
			that.collapse();
			};
			
		YAHOO.util.Dom.removeClass(sListItem[i], classActiveListItem);
		if (i == 0) {
			YAHOO.util.Dom.addClass(sListItem[i], classFirstListItem);
			}
		if (i == option.length-1) {
			YAHOO.util.Dom.addClass(this, mouseOverClass);
			YAHOO.util.Dom.addClass(sListItem[i], classLastListItem);
			}
		if (i == selectedOption) {
			YAHOO.util.Dom.addClass(sListItem[i], classActiveListItem);
			}
		sListItem[i].onmouseover = function() {
			YAHOO.util.Dom.addClass(this, mouseOverClass);
			};
		sListItem[i].onmouseout = function() {
			YAHOO.util.Dom.removeClass(this, mouseOverClass);
			};
		}
		
	this.getSelectContainer = function() {
		return sContainer;
		}
	this.getCurrentSelected = function() {
		return sCurrentSelected;
		}
	this.getListItem = function(i) {
		return sListItem[i];
		}
	this.getSelected = function() {
		return selectedOption;
		}
		
	return this;
	}

function replaceSelect(mirroredSelect) {
	var o = mirroredSelect.options;
	opts=new Array();
	for (var i=0; i<o.length; i++) {
		opts[i]=o[i].text;
		}
	var selOpt = (!mirroredSelect.selectedIndex) ? 0 : mirroredSelect.selectedIndex;
	var selClass = mirroredSelect.className;
	var replacement = new jsDropdown(opts, selOpt, selClass);
	YAHOO.util.Dom.addClass(mirroredSelect, 'replaced');
	
	replacement.onChange = function() {
		mirroredSelect.selectedIndex = this.getSelected();
		mirroredSelect.onchange();
		};
		 
	this.focusMirrored = function() {
		mirroredSelect.focus();
		};
	YAHOO.util.Event.addListener(replacement.getCurrentSelected(), "click", this.focusMirrored, this, true);
		
	mirroredSelect.onfocus = function() {
		YAHOO.util.Dom.addClass(replacement.getSelectContainer(), 'focused');
		};
	mirroredSelect.onblur = function() {
		YAHOO.util.Dom.removeClass(replacement.getSelectContainer(), 'focused');
		};

	this.changeMirrored = function() {
		replacement.setOption(replacement.getListItem(this.selectedIndex));
		};	
	YAHOO.util.Event.addListener(mirroredSelect, "change", this.changeMirrored); 

	mirroredSelect.onkeyup = function(e) {
			replacement.setOption(replacement.getListItem(this.selectedIndex));
		};
	mirroredSelect.onkeypress = function(e) {
		if(e.keyCode == 13)
		mirroredSelect.onchange;
		};
	mirroredSelect.parentNode.insertBefore(replacement.getSelectContainer(),mirroredSelect);
	}var Dom=YAHOO.util.Dom;
		
/**
  * This is the Javascript-function mirroring the PHP Helpfunctions::getTimestring() formatting function.
	* Takes a given JS-timestamp (in milliseconds!) and converts it to human-readable string representation, like "1d:12h:34m:21s".
	* short Version, accepts a number of digits max.
	* On complaints blame Lutz.
	* @param int
	* @return string
	*/
function getTimestring(timestamp, maxDigits, delimiter, approx, showunits, zerofill) {
		if (typeof timestamp == "undefined") { timestamp=0;	}
		if (typeof maxDigits == "undefined") { maxDigits=2;	}
		if (typeof delimiter == "undefined") { delimiter=" ";	}
		if (typeof approx == "undefined") { approx="";	}
		if (typeof showunits == "undefined") { showunits=true;	}
		if (typeof zerofill == "undefined") { zerofill=false;	}
		
		var timeunits = new Array();
		timeunits['day'] = 60*60*24;
		timeunits['hour'] = 60*60;
		timeunits['minute'] = 60;
		timeunits['second'] = 1;
		var loca = new Array();
		loca['day'] = (showunits) ? LocalizationStrings['timeunits']['short']['day'] : "";
		loca['hour'] = (showunits) ? LocalizationStrings['timeunits']['short']['hour'] : "";
		loca['minute'] = (showunits) ? LocalizationStrings['timeunits']['short']['minute'] : "";
		loca['second'] = (showunits) ? LocalizationStrings['timeunits']['short']['second'] : "";
		
		timestamp = Math.floor(timestamp/1000);
		var timestring="";
		for (var k in timeunits) {
			var nv = Math.floor(timestamp/timeunits[k]);
			if(maxDigits>0 && (nv>0 || (zerofill && timestring != ""))) {
				timestamp=timestamp-nv*timeunits[k];
				if(timestring != "") {
					timestring+=delimiter;
					if(nv<10 && nv>0 && zerofill) { nv="0"+nv; }
					if(nv==0) { nv="00"; }
				}
				timestring+=nv+loca[k];
				maxDigits--;
			}
		}
		if(timestamp >0) {
			timestring=approx+timestring;
		}
		return timestring;
	}

/*
 * a simple interval timer
 * fires "update" and "finished" events
 */
function Timer(enddate, currentdate, interval) {
	if (!YAHOO.lang.isValue(enddate)) { alert("Timer enddate not a value. Variable is: "+enddate);	}
	if (!YAHOO.lang.isValue(currentdate)) { currentdate=(new Date()).getTime()*1000;	} //Mistake handled gracefully
	if (typeof interval == "undefined") { interval=500;	}
	if(this.enddate<this.currenttime) return false;
	
	var that=this;
	this.enddate = enddate*1000;
	this.serverTimeDiff=currentdate*1000-(new Date()).getTime();
	this.currenttime=(new Date()).getTime()+this.serverTimeDiff;
	
	this.tm;
	this.createEvent("update", this); 
	this.createEvent("finished", this);
	this.updatefrequency = 1000;
	
	this.ls = Math.floor(this.currenttime/this.updatefrequency);
	this.onUpdate = function() {
		this.currenttime=(new Date()).getTime()+this.serverTimeDiff;
		if(this.ls != Math.floor(this.currenttime/this.updatefrequency) && this.enddate>this.currenttime) {
			this.ls = Math.floor(this.currenttime/this.updatefrequency);
			this.fireEvent("update");
			}
		else if(this.enddate<this.currenttime) {
			this.fireEvent("finished");
			clearTimeout(this.tm);
			}
		}
	this.startTimer = function() {
  	this.tm=setTimeout(function() { that.startTimer.call(that); }, interval);
		this.onUpdate();
		};
	this.stopTimer = function() {
  	this.tm=clearTimeout(this.iv);
		};
	}
YAHOO.augment(Timer, YAHOO.util.EventProvider);

//factory for a progress bar. adds progress in percent and sets width of some element
function getProgressBar(config) {
	var pbar= new Timer(config.enddate, config.currentdate, config.interval);
	pbar.startdate = config.startdate*1000;
	pbar.duration = pbar.enddate-pbar.startdate;
	pbar.barEl=Dom.get(config.bar);
	pbar.progress=((pbar.currenttime-pbar.startdate)/pbar.duration)*100;
	
	Dom.setStyle(pbar.barEl, "width", pbar.progress+"%");
	pbar.subscribe("update", function() {
		this.progress=Math.floor(((this.currenttime-this.startdate)/this.duration)*100);
		Dom.setStyle(this.barEl, "width", this.progress+"%");
		});
	pbar.subscribe("finished", function() {
		Dom.setStyle(this.barEl, "width", "100%");
		});
	pbar.startTimer();
	return pbar;
	}

/* factory for a countdown based on Timer.
 * formats a timestring and inserts it into an element
 * timestring formatting function is added as formattime.
 * the first parameter passed to the time formatting function is always the JS-timstamp to format, determined by the countdown timer.
 * all additional parameters after the countdown config object are passed through to the time formatting function.
 */
function getCountdown(config /*, time formatting args*/) {
	var cnt= new Timer(config.enddate, config.currentdate, config.interval);
	cnt.formattime = getTimestring;
	cnt.startdate = config.startdate*1000;
	cnt.El=Dom.get(config.el);
	cnt.args=getCountdown.arguments;
	cnt.subscribe("update", function() {
		var timeargs =	[this.enddate-Math.floor(this.currenttime/1000)*1000];	
		for(i=1;i<this.args.length;i++) {
			timeargs.push(this.args[i]);
		}
		//this.El.innerHTML=this.formattime(this.enddate-Math.floor(this.currenttime/1000)*1000);
		this.El.innerHTML=this.formattime.apply(this, timeargs);
		});
	cnt.subscribe("finished", function() {
		this.El.innerHTML="-";
		});
	cnt.startTimer();
	return cnt;
	}
    
    
    
    /**
 *  returns an formated time string
 *
 *  @param int  timestamp in _milli_sekunden
 *  @param str  format zB: 'd.m.Y G:i:s' oder 'm/d/Y H:i' -> unterstuetzt die Buchstaben dmYy GHis
 *  @see http://de3.php.net/date
 */
function getFormatedDate(timestamp, format) {
    var currTime = new Date();  
    currTime.setTime(timestamp);
    str = format;
    str = str.replace('d', dezInt(currTime.getDate(),2));
    str = str.replace('m', dezInt(currTime.getMonth()+1,2));
    str = str.replace('Y', currTime.getFullYear());
    str = str.replace('y', currTime.getFullYear().toString().substr(2,4));
    str = str.replace('G', currTime.getHours());
    str = str.replace('H', dezInt(currTime.getHours(), 2));
    str = str.replace('i', dezInt(currTime.getMinutes(), 2));
    str = str.replace('s', dezInt(currTime.getSeconds(), 2));
    return str;
}


    /*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

YAHOO.util.Attribute=function(hash,owner){if(owner){this.owner=owner;this.configure(hash,true);}};YAHOO.util.Attribute.prototype={name:undefined,value:null,owner:null,readOnly:false,writeOnce:false,_initialConfig:null,_written:false,method:null,validator:null,getValue:function(){return this.value;},setValue:function(value,silent){var beforeRetVal;var owner=this.owner;var name=this.name;var event={type:name,prevValue:this.getValue(),newValue:value};if(this.readOnly||(this.writeOnce&&this._written)){return false;}
if(this.validator&&!this.validator.call(owner,value)){return false;}
if(!silent){beforeRetVal=owner.fireBeforeChangeEvent(event);if(beforeRetVal===false){return false;}}
if(this.method){this.method.call(owner,value);}
this.value=value;this._written=true;event.type=name;if(!silent){this.owner.fireChangeEvent(event);}
return true;},configure:function(map,init){map=map||{};this._written=false;this._initialConfig=this._initialConfig||{};for(var key in map){if(key&&YAHOO.lang.hasOwnProperty(map,key)){this[key]=map[key];if(init){this._initialConfig[key]=map[key];}}}},resetValue:function(){return this.setValue(this._initialConfig.value);},resetConfig:function(){this.configure(this._initialConfig);},refresh:function(silent){this.setValue(this.value,silent);}};(function(){var Lang=YAHOO.util.Lang;YAHOO.util.AttributeProvider=function(){};YAHOO.util.AttributeProvider.prototype={_configs:null,get:function(key){var configs=this._configs||{};var config=configs[key];if(!config){return undefined;}
return config.value;},set:function(key,value,silent){var configs=this._configs||{};var config=configs[key];if(!config){return false;}
return config.setValue(value,silent);},getAttributeKeys:function(){var configs=this._configs;var keys=[];var config;for(var key in configs){config=configs[key];if(Lang.hasOwnProperty(configs,key)&&!Lang.isUndefined(config)){keys[keys.length]=key;}}
return keys;},setAttributes:function(map,silent){for(var key in map){if(Lang.hasOwnProperty(map,key)){this.set(key,map[key],silent);}}},resetValue:function(key,silent){var configs=this._configs||{};if(configs[key]){this.set(key,configs[key]._initialConfig.value,silent);return true;}
return false;},refresh:function(key,silent){var configs=this._configs;key=((Lang.isString(key))?[key]:key)||this.getAttributeKeys();for(var i=0,len=key.length;i<len;++i){if(configs[key[i]]&&!Lang.isUndefined(configs[key[i]].value)&&!Lang.isNull(configs[key[i]].value)){configs[key[i]].refresh(silent);}}},register:function(key,map){this.setAttributeConfig(key,map);},getAttributeConfig:function(key){var configs=this._configs||{};var config=configs[key]||{};var map={};for(key in config){if(Lang.hasOwnProperty(config,key)){map[key]=config[key];}}
return map;},setAttributeConfig:function(key,map,init){var configs=this._configs||{};map=map||{};if(!configs[key]){map.name=key;configs[key]=new YAHOO.util.Attribute(map,this);}else{configs[key].configure(map,init);}},configureAttribute:function(key,map,init){this.setAttributeConfig(key,map,init);},resetAttributeConfig:function(key){var configs=this._configs||{};configs[key].resetConfig();},fireBeforeChangeEvent:function(e){var type='before';type+=e.type.charAt(0).toUpperCase()+e.type.substr(1)+'Change';e.type=type;return this.fireEvent(e.type,e);},fireChangeEvent:function(e){e.type+='Change';return this.fireEvent(e.type,e);}};YAHOO.augment(YAHOO.util.AttributeProvider,YAHOO.util.EventProvider);})();(function(){var Dom=YAHOO.util.Dom,AttributeProvider=YAHOO.util.AttributeProvider;YAHOO.util.Element=function(el,map){if(arguments.length){this.init(el,map);}};YAHOO.util.Element.prototype={DOM_EVENTS:null,appendChild:function(child){child=child.get?child.get('element'):child;this.get('element').appendChild(child);},getElementsByTagName:function(tag){return this.get('element').getElementsByTagName(tag);},hasChildNodes:function(){return this.get('element').hasChildNodes();},insertBefore:function(element,before){element=element.get?element.get('element'):element;before=(before&&before.get)?before.get('element'):before;this.get('element').insertBefore(element,before);},removeChild:function(child){child=child.get?child.get('element'):child;this.get('element').removeChild(child);return true;},replaceChild:function(newNode,oldNode){newNode=newNode.get?newNode.get('element'):newNode;oldNode=oldNode.get?oldNode.get('element'):oldNode;return this.get('element').replaceChild(newNode,oldNode);},initAttributes:function(map){},addListener:function(type,fn,obj,scope){var el=this.get('element');scope=scope||this;el=this.get('id')||el;var self=this;if(!this._events[type]){if(this.DOM_EVENTS[type]){YAHOO.util.Event.addListener(el,type,function(e){if(e.srcElement&&!e.target){e.target=e.srcElement;}
self.fireEvent(type,e);},obj,scope);}
this.createEvent(type,this);}
YAHOO.util.EventProvider.prototype.subscribe.apply(this,arguments);},on:function(){this.addListener.apply(this,arguments);},subscribe:function(){this.addListener.apply(this,arguments);},removeListener:function(type,fn){this.unsubscribe.apply(this,arguments);},addClass:function(className){Dom.addClass(this.get('element'),className);},getElementsByClassName:function(className,tag){return Dom.getElementsByClassName(className,tag,this.get('element'));},hasClass:function(className){return Dom.hasClass(this.get('element'),className);},removeClass:function(className){return Dom.removeClass(this.get('element'),className);},replaceClass:function(oldClassName,newClassName){return Dom.replaceClass(this.get('element'),oldClassName,newClassName);},setStyle:function(property,value){var el=this.get('element');if(!el){return this._queue[this._queue.length]=['setStyle',arguments];}
return Dom.setStyle(el,property,value);},getStyle:function(property){return Dom.getStyle(this.get('element'),property);},fireQueue:function(){var queue=this._queue;for(var i=0,len=queue.length;i<len;++i){this[queue[i][0]].apply(this,queue[i][1]);}},appendTo:function(parent,before){parent=(parent.get)?parent.get('element'):Dom.get(parent);this.fireEvent('beforeAppendTo',{type:'beforeAppendTo',target:parent});before=(before&&before.get)?before.get('element'):Dom.get(before);var element=this.get('element');if(!element){return false;}
if(!parent){return false;}
if(element.parent!=parent){if(before){parent.insertBefore(element,before);}else{parent.appendChild(element);}}
this.fireEvent('appendTo',{type:'appendTo',target:parent});},get:function(key){var configs=this._configs||{};var el=configs.element;if(el&&!configs[key]&&!YAHOO.lang.isUndefined(el.value[key])){return el.value[key];}
return AttributeProvider.prototype.get.call(this,key);},setAttributes:function(map,silent){var el=this.get('element');for(var key in map){if(!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){this.setAttributeConfig(key);}}
for(var i=0,len=this._configOrder.length;i<len;++i){if(map[this._configOrder[i]]){this.set(this._configOrder[i],map[this._configOrder[i]],silent);}}},set:function(key,value,silent){var el=this.get('element');if(!el){this._queue[this._queue.length]=['set',arguments];if(this._configs[key]){this._configs[key].value=value;}
return;}
if(!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){_registerHTMLAttr.call(this,key);}
return AttributeProvider.prototype.set.apply(this,arguments);},setAttributeConfig:function(key,map,init){var el=this.get('element');if(el&&!this._configs[key]&&!YAHOO.lang.isUndefined(el[key])){_registerHTMLAttr.call(this,key,map);}else{AttributeProvider.prototype.setAttributeConfig.apply(this,arguments);}
this._configOrder.push(key);},getAttributeKeys:function(){var el=this.get('element');var keys=AttributeProvider.prototype.getAttributeKeys.call(this);for(var key in el){if(!this._configs[key]){keys[key]=keys[key]||el[key];}}
return keys;},createEvent:function(type,scope){this._events[type]=true;AttributeProvider.prototype.createEvent.apply(this,arguments);},init:function(el,attr){_initElement.apply(this,arguments);}};var _initElement=function(el,attr){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._configOrder=[];attr=attr||{};attr.element=attr.element||el||null;this.DOM_EVENTS={'click':true,'dblclick':true,'keydown':true,'keypress':true,'keyup':true,'mousedown':true,'mousemove':true,'mouseout':true,'mouseover':true,'mouseup':true,'focus':true,'blur':true,'submit':true};var isReady=false;if(YAHOO.lang.isString(el)){_registerHTMLAttr.call(this,'id',{value:attr.element});}
if(Dom.get(el)){isReady=true;_initHTMLElement.call(this,attr);_initContent.call(this,attr);}
YAHOO.util.Event.onAvailable(attr.element,function(){if(!isReady){_initHTMLElement.call(this,attr);}
this.fireEvent('available',{type:'available',target:attr.element});},this,true);YAHOO.util.Event.onContentReady(attr.element,function(){if(!isReady){_initContent.call(this,attr);}
this.fireEvent('contentReady',{type:'contentReady',target:attr.element});},this,true);};var _initHTMLElement=function(attr){this.setAttributeConfig('element',{value:Dom.get(attr.element),readOnly:true});};var _initContent=function(attr){this.initAttributes(attr);this.setAttributes(attr,true);this.fireQueue();};var _registerHTMLAttr=function(key,map){var el=this.get('element');map=map||{};map.name=key;map.method=map.method||function(value){el[key]=value;};map.value=map.value||el[key];this._configs[key]=new YAHOO.util.Attribute(map,this);};YAHOO.augment(YAHOO.util.Element,AttributeProvider);})();YAHOO.register("element",YAHOO.util.Element,{version:"2.3.0",build:"442"});/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

(function(){YAHOO.widget.TabView=function(el,attr){attr=attr||{};if(arguments.length==1&&!YAHOO.lang.isString(el)&&!el.nodeName){attr=el;el=attr.element||null;}
if(!el&&!attr.element){el=_createTabViewElement.call(this,attr);}
YAHOO.widget.TabView.superclass.constructor.call(this,el,attr);};YAHOO.extend(YAHOO.widget.TabView,YAHOO.util.Element);var proto=YAHOO.widget.TabView.prototype;var Dom=YAHOO.util.Dom;var Event=YAHOO.util.Event;var Tab=YAHOO.widget.Tab;proto.CLASSNAME='yui-navset';proto.TAB_PARENT_CLASSNAME='yui-nav';proto.CONTENT_PARENT_CLASSNAME='yui-content';proto._tabParent=null;proto._contentParent=null;proto.addTab=function(tab,index){var tabs=this.get('tabs');if(!tabs){this._queue[this._queue.length]=['addTab',arguments];return false;}
index=(index===undefined)?tabs.length:index;var before=this.getTab(index);var self=this;var el=this.get('element');var tabParent=this._tabParent;var contentParent=this._contentParent;var tabElement=tab.get('element');var contentEl=tab.get('contentEl');if(before){tabParent.insertBefore(tabElement,before.get('element'));}else{tabParent.appendChild(tabElement);}
if(contentEl&&!Dom.isAncestor(contentParent,contentEl)){contentParent.appendChild(contentEl);}
if(!tab.get('active')){tab.set('contentVisible',false,true);}else{this.set('activeTab',tab,true);}
var activate=function(e){YAHOO.util.Event.preventDefault(e);var silent=false;if(this==self.get('activeTab')){silent=true;}
self.set('activeTab',this,silent);};tab.addListener(tab.get('activationEvent'),activate);tab.addListener('activationEventChange',function(e){if(e.prevValue!=e.newValue){tab.removeListener(e.prevValue,activate);tab.addListener(e.newValue,activate);}});tabs.splice(index,0,tab);};proto.DOMEventHandler=function(e){var el=this.get('element');var target=YAHOO.util.Event.getTarget(e);var tabParent=this._tabParent;if(Dom.isAncestor(tabParent,target)){var tabEl;var tab=null;var contentEl;var tabs=this.get('tabs');for(var i=0,len=tabs.length;i<len;i++){tabEl=tabs[i].get('element');contentEl=tabs[i].get('contentEl');if(target==tabEl||Dom.isAncestor(tabEl,target)){tab=tabs[i];break;}}
if(tab){tab.fireEvent(e.type,e);}}};proto.getTab=function(index){return this.get('tabs')[index];};proto.getTabIndex=function(tab){var index=null;var tabs=this.get('tabs');for(var i=0,len=tabs.length;i<len;++i){if(tab==tabs[i]){index=i;break;}}
return index;};proto.removeTab=function(tab){var tabCount=this.get('tabs').length;var index=this.getTabIndex(tab);var nextIndex=index+1;if(tab==this.get('activeTab')){if(tabCount>1){if(index+1==tabCount){this.set('activeIndex',index-1);}else{this.set('activeIndex',index+1);}}}
this._tabParent.removeChild(tab.get('element'));this._contentParent.removeChild(tab.get('contentEl'));this._configs.tabs.value.splice(index,1);};proto.toString=function(){var name=this.get('id')||this.get('tagName');return"TabView "+name;};proto.contentTransition=function(newTab,oldTab){newTab.set('contentVisible',true);oldTab.set('contentVisible',false);};proto.initAttributes=function(attr){YAHOO.widget.TabView.superclass.initAttributes.call(this,attr);if(!attr.orientation){attr.orientation='top';}
var el=this.get('element');if(!YAHOO.util.Dom.hasClass(el,this.CLASSNAME)){YAHOO.util.Dom.addClass(el,this.CLASSNAME);}
this.setAttributeConfig('tabs',{value:[],readOnly:true});this._tabParent=this.getElementsByClassName(this.TAB_PARENT_CLASSNAME,'ul')[0]||_createTabParent.call(this);this._contentParent=this.getElementsByClassName(this.CONTENT_PARENT_CLASSNAME,'div')[0]||_createContentParent.call(this);this.setAttributeConfig('orientation',{value:attr.orientation,method:function(value){var current=this.get('orientation');this.addClass('yui-navset-'+value);if(current!=value){this.removeClass('yui-navset-'+current);}
switch(value){case'bottom':this.appendChild(this._tabParent);break;}}});this.setAttributeConfig('activeIndex',{value:attr.activeIndex,method:function(value){this.set('activeTab',this.getTab(value));},validator:function(value){return!this.getTab(value).get('disabled');}});this.setAttributeConfig('activeTab',{value:attr.activeTab,method:function(tab){var activeTab=this.get('activeTab');if(tab){tab.set('active',true);this._configs['activeIndex'].value=this.getTabIndex(tab);}
if(activeTab&&activeTab!=tab){activeTab.set('active',false);}
if(activeTab&&tab!=activeTab){this.contentTransition(tab,activeTab);}else if(tab){tab.set('contentVisible',true);}},validator:function(value){return!value.get('disabled');}});if(this._tabParent){_initTabs.call(this);}
this.DOM_EVENTS.submit=false;this.DOM_EVENTS.focus=false;this.DOM_EVENTS.blur=false;for(var type in this.DOM_EVENTS){if(YAHOO.lang.hasOwnProperty(this.DOM_EVENTS,type)){this.addListener.call(this,type,this.DOMEventHandler);}}};var _initTabs=function(){var tab,attr,contentEl;var el=this.get('element');var tabs=_getChildNodes(this._tabParent);var contentElements=_getChildNodes(this._contentParent);for(var i=0,len=tabs.length;i<len;++i){attr={};if(contentElements[i]){attr.contentEl=contentElements[i];}
tab=new YAHOO.widget.Tab(tabs[i],attr);this.addTab(tab);if(tab.hasClass(tab.ACTIVE_CLASSNAME)){this._configs.activeTab.value=tab;this._configs.activeIndex.value=this.getTabIndex(tab);}}};var _createTabViewElement=function(attr){var el=document.createElement('div');if(this.CLASSNAME){el.className=this.CLASSNAME;}
return el;};var _createTabParent=function(attr){var el=document.createElement('ul');if(this.TAB_PARENT_CLASSNAME){el.className=this.TAB_PARENT_CLASSNAME;}
this.get('element').appendChild(el);return el;};var _createContentParent=function(attr){var el=document.createElement('div');if(this.CONTENT_PARENT_CLASSNAME){el.className=this.CONTENT_PARENT_CLASSNAME;}
this.get('element').appendChild(el);return el;};var _getChildNodes=function(el){var nodes=[];var childNodes=el.childNodes;for(var i=0,len=childNodes.length;i<len;++i){if(childNodes[i].nodeType==1){nodes[nodes.length]=childNodes[i];}}
return nodes;};})();(function(){var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event;var Tab=function(el,attr){attr=attr||{};if(arguments.length==1&&!YAHOO.lang.isString(el)&&!el.nodeName){attr=el;el=attr.element;}
if(!el&&!attr.element){el=_createTabElement.call(this,attr);}
this.loadHandler={success:function(o){this.set('content',o.responseText);},failure:function(o){}};Tab.superclass.constructor.call(this,el,attr);this.DOM_EVENTS={};};YAHOO.extend(Tab,YAHOO.util.Element);var proto=Tab.prototype;proto.LABEL_TAGNAME='em';proto.ACTIVE_CLASSNAME='selected';proto.DISABLED_CLASSNAME='disabled';proto.LOADING_CLASSNAME='loading';proto.dataConnection=null;proto.loadHandler=null;proto._loading=false;proto.toString=function(){var el=this.get('element');var id=el.id||el.tagName;return"Tab "+id;};proto.initAttributes=function(attr){attr=attr||{};Tab.superclass.initAttributes.call(this,attr);var el=this.get('element');this.setAttributeConfig('activationEvent',{value:attr.activationEvent||'click'});this.setAttributeConfig('labelEl',{value:attr.labelEl||_getlabelEl.call(this),method:function(value){var current=this.get('labelEl');if(current){if(current==value){return false;}
this.replaceChild(value,current);}else if(el.firstChild){this.insertBefore(value,el.firstChild);}else{this.appendChild(value);}}});this.setAttributeConfig('label',{value:attr.label||_getLabel.call(this),method:function(value){var labelEl=this.get('labelEl');if(!labelEl){this.set('labelEl',_createlabelEl.call(this));}
_setLabel.call(this,value);}});this.setAttributeConfig('contentEl',{value:attr.contentEl||document.createElement('div'),method:function(value){var current=this.get('contentEl');if(current){if(current==value){return false;}
this.replaceChild(value,current);}}});this.setAttributeConfig('content',{value:attr.content,method:function(value){this.get('contentEl').innerHTML=value;}});var _dataLoaded=false;this.setAttributeConfig('dataSrc',{value:attr.dataSrc});this.setAttributeConfig('cacheData',{value:attr.cacheData||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig('loadMethod',{value:attr.loadMethod||'GET',validator:YAHOO.lang.isString});this.setAttributeConfig('dataLoaded',{value:false,validator:YAHOO.lang.isBoolean,writeOnce:true});this.setAttributeConfig('dataTimeout',{value:attr.dataTimeout||null,validator:YAHOO.lang.isNumber});this.setAttributeConfig('active',{value:attr.active||this.hasClass(this.ACTIVE_CLASSNAME),method:function(value){if(value===true){this.addClass(this.ACTIVE_CLASSNAME);this.set('title','active');}else{this.removeClass(this.ACTIVE_CLASSNAME);this.set('title','');}},validator:function(value){return YAHOO.lang.isBoolean(value)&&!this.get('disabled');}});this.setAttributeConfig('disabled',{value:attr.disabled||this.hasClass(this.DISABLED_CLASSNAME),method:function(value){if(value===true){Dom.addClass(this.get('element'),this.DISABLED_CLASSNAME);}else{Dom.removeClass(this.get('element'),this.DISABLED_CLASSNAME);}},validator:YAHOO.lang.isBoolean});this.setAttributeConfig('href',{value:attr.href||this.getElementsByTagName('a')[0].getAttribute('href',2)||'#',method:function(value){this.getElementsByTagName('a')[0].href=value;},validator:YAHOO.lang.isString});this.setAttributeConfig('contentVisible',{value:attr.contentVisible,method:function(value){if(value){this.get('contentEl').style.display='block';if(this.get('dataSrc')){if(!this._loading&&!(this.get('dataLoaded')&&this.get('cacheData'))){_dataConnect.call(this);}}}else{this.get('contentEl').style.display='none';}},validator:YAHOO.lang.isBoolean});};var _createTabElement=function(attr){var el=document.createElement('li');var a=document.createElement('a');a.href=attr.href||'#';el.appendChild(a);var label=attr.label||null;var labelEl=attr.labelEl||null;if(labelEl){if(!label){label=_getLabel.call(this,labelEl);}}else{labelEl=_createlabelEl.call(this);}
a.appendChild(labelEl);return el;};var _getlabelEl=function(){return this.getElementsByTagName(this.LABEL_TAGNAME)[0];};var _createlabelEl=function(){var el=document.createElement(this.LABEL_TAGNAME);return el;};var _setLabel=function(label){var el=this.get('labelEl');el.innerHTML=label;};var _getLabel=function(){var label,el=this.get('labelEl');if(!el){return undefined;}
return el.innerHTML;};var _dataConnect=function(){if(!YAHOO.util.Connect){return false;}
Dom.addClass(this.get('contentEl').parentNode,this.LOADING_CLASSNAME);this._loading=true;this.dataConnection=YAHOO.util.Connect.asyncRequest(this.get('loadMethod'),this.get('dataSrc'),{success:function(o){this.loadHandler.success.call(this,o);this.set('dataLoaded',true);this.dataConnection=null;Dom.removeClass(this.get('contentEl').parentNode,this.LOADING_CLASSNAME);this._loading=false;},failure:function(o){this.loadHandler.failure.call(this,o);this.dataConnection=null;Dom.removeClass(this.get('contentEl').parentNode,this.LOADING_CLASSNAME);this._loading=false;},scope:this,timeout:this.get('dataTimeout')});};YAHOO.widget.Tab=Tab;})();YAHOO.register("tabview",YAHOO.widget.TabView,{version:"2.3.0",build:"442"});/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var Event=YAHOO.util.Event;return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(sMethod,args){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}
oDD[sMethod].apply(oDD,args);}}},_onLoad:function(){this.init();Event.on(document,"mouseup",this.handleMouseUp,this,true);Event.on(document,"mousemove",this.handleMouseMove,this,true);Event.on(window,"unload",this._onUnload,this,true);Event.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,sGroup){if(!this.initialized){this.init();}
if(!this.ids[sGroup]){this.ids[sGroup]={};}
this.ids[sGroup][oDD.id]=oDD;},removeDDFromGroup:function(oDD,sGroup){if(!this.ids[sGroup]){this.ids[sGroup]={};}
var obj=this.ids[sGroup];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}
delete this.handleIds[oDD.id];},regHandle:function(sDDId,sHandleId){if(!this.handleIds[sDDId]){this.handleIds[sDDId]={};}
this.handleIds[sDDId][sHandleId]=sHandleId;},isDragDrop:function(id){return(this.getDDById(id))?true:false;},getRelated:function(p_oDD,bTargetsOnly){var oDDs=[];for(var i in p_oDD.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}
if(!bTargetsOnly||dd.isTarget){oDDs[oDDs.length]=dd;}}}
return oDDs;},isLegalTarget:function(oDD,oTargetDD){var targets=this.getRelated(oDD,true);for(var i=0,len=targets.length;i<len;++i){if(targets[i].id==oTargetDD.id){return true;}}
return false;},isTypeOfDD:function(oDD){return(oDD&&oDD.__ygDragDrop);},isHandle:function(sDDId,sHandleId){return(this.handleIds[sDDId]&&this.handleIds[sDDId][sHandleId]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}
return null;},handleMouseDown:function(e,oDD){this.currentTarget=YAHOO.util.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=YAHOO.util.Event.getPageX(e);this.startY=YAHOO.util.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=YAHOO.util.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);var dc=this.dragCurrent;if(dc){dc.b4StartDrag(x,y);}
if(dc){dc.startDrag(x,y);}
this.dragThreshMet=true;},handleMouseUp:function(e){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}
this.stopDrag(e);this.stopEvent(e);}},stopEvent:function(e){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(e);}
if(this.preventDefault){YAHOO.util.Event.preventDefault(e);}},stopDrag:function(e,silent){if(this.dragCurrent&&!silent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}
this.dragCurrent.onMouseUp(e);}
this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){var dc=this.dragCurrent;if(dc){if(YAHOO.util.Event.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}
if(!this.dragThreshMet){var diffX=Math.abs(this.startX-YAHOO.util.Event.getPageX(e));var diffY=Math.abs(this.startY-YAHOO.util.Event.getPageY(e));if(diffX>this.clickPixelThresh||diffY>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}
if(this.dragThreshMet){dc.b4Drag(e);if(dc){dc.onDrag(e);}
if(dc){this.fireEvents(e,false);}}
this.stopEvent(e);}},fireEvents:function(e,isDrop){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}
var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);var pt=new YAHOO.util.Point(x,y);var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var oldOvers=[];var outEvts=[];var overEvts=[];var dropEvts=[];var enterEvts=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}
if(!this.isOverTarget(pt,ddo,this.mode,curRegion)){outEvts.push(ddo);}
oldOvers[i]=true;delete this.dragOvers[i];}
for(var sGroup in dc.groups){if("string"!=typeof sGroup){continue;}
for(i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(!this.isTypeOfDD(oDD)){continue;}
if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode,curRegion)){if(isDrop){dropEvts.push(oDD);}else{if(!oldOvers[oDD.id]){enterEvts.push(oDD);}else{overEvts.push(oDD);}
this.dragOvers[oDD.id]=oDD;}}}}}
this.interactionInfo={out:outEvts,enter:enterEvts,over:overEvts,drop:dropEvts,point:pt,draggedRegion:curRegion,sourceRegion:this.locationCache[dc.id],validDrop:isDrop};if(isDrop&&!dropEvts.length){this.interactionInfo.validDrop=false;dc.onInvalidDrop(e);}
if(this.mode){if(outEvts.length){dc.b4DragOut(e,outEvts);if(dc){dc.onDragOut(e,outEvts);}}
if(enterEvts.length){if(dc){dc.onDragEnter(e,enterEvts);}}
if(overEvts.length){if(dc){dc.b4DragOver(e,overEvts);}
if(dc){dc.onDragOver(e,overEvts);}}
if(dropEvts.length){if(dc){dc.b4DragDrop(e,dropEvts);}
if(dc){dc.onDragDrop(e,dropEvts);}}}else{var len=0;for(i=0,len=outEvts.length;i<len;++i){if(dc){dc.b4DragOut(e,outEvts[i].id);}
if(dc){dc.onDragOut(e,outEvts[i].id);}}
for(i=0,len=enterEvts.length;i<len;++i){if(dc){dc.onDragEnter(e,enterEvts[i].id);}}
for(i=0,len=overEvts.length;i<len;++i){if(dc){dc.b4DragOver(e,overEvts[i].id);}
if(dc){dc.onDragOver(e,overEvts[i].id);}}
for(i=0,len=dropEvts.length;i<len;++i){if(dc){dc.b4DragDrop(e,dropEvts[i].id);}
if(dc){dc.onDragDrop(e,dropEvts[i].id);}}}},getBestMatch:function(dds){var winner=null;var len=dds.length;if(len==1){winner=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(this.mode==this.INTERSECT&&dd.cursorIsOver){winner=dd;break;}else{if(!winner||!winner.overlap||(dd.overlap&&winner.overlap.getArea()<dd.overlap.getArea())){winner=dd;}}}}
return winner;},refreshCache:function(groups){var g=groups||this.ids;for(var sGroup in g){if("string"!=typeof sGroup){continue;}
for(var i in this.ids[sGroup]){var oDD=this.ids[sGroup][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var parent=el.offsetParent;if(parent){return true;}}}catch(e){}
return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}
var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=YAHOO.util.Dom.getXY(el);}catch(e){}
if(!pos){return null;}
x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new YAHOO.util.Region(t,r,b,l);},isOverTarget:function(pt,oTarget,intersect,curRegion){var loc=this.locationCache[oTarget.id];if(!loc||!this.useCache){loc=this.getLocation(oTarget);this.locationCache[oTarget.id]=loc;}
if(!loc){return false;}
oTarget.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||(!intersect&&!dc.constrainX&&!dc.constrainY)){return oTarget.cursorIsOver;}
oTarget.overlap=null;if(!curRegion){var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();curRegion=new YAHOO.util.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);}
var overlap=curRegion.intersect(loc);if(overlap){oTarget.overlap=overlap;return(intersect)?true:oTarget.cursorIsOver;}else{return false;}},_onUnload:function(e,me){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}
this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}
this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var oWrapper=this.elementCache[id];if(!oWrapper||!oWrapper.el){oWrapper=this.elementCache[id]=new this.ElementWrapper(YAHOO.util.Dom.get(id));}
return oWrapper;},getElement:function(id){return YAHOO.util.Dom.get(id);},getCss:function(id){var el=YAHOO.util.Dom.get(id);return(el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return YAHOO.util.Dom.getX(el);},getPosY:function(el){return YAHOO.util.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else if(db){t=db.scrollTop;l=db.scrollLeft;}else{}
return{top:t,left:l};},getStyle:function(el,styleProp){return YAHOO.util.Dom.getStyle(el,styleProp);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(moveEl,targetEl){var aCoord=YAHOO.util.Dom.getXY(targetEl);YAHOO.util.Dom.setXY(moveEl,aCoord);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(a,b){return(a-b);},_timeoutCount:0,_addListeners:function(){var DDM=YAHOO.util.DDM;if(YAHOO.util.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(node,id){if(this.isHandle(id,node.id)){return true;}else{var p=node.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}
return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}
(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;YAHOO.util.DragDrop=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.util.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=Dom.get(this.id);}
return this._domRef;},getDragEl:function(){return Dom.get(this.dragElId);},init:function(id,sGroup,config){this.initTarget(id,sGroup,config);Event.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(id,sGroup,config){this.config=config||{};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof id!=="string"){this._domRef=id;id=Dom.generateId(id);}
this.id=id;this.addToGroup((sGroup)?sGroup:"default");this.handleElId=id;Event.onAvailable(id,this.handleOnAvailable,this,true);this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(iTop,iRight,iBot,iLeft){if(!iRight&&0!==iRight){this.padding=[iTop,iTop,iTop,iTop];}else if(!iBot&&0!==iBot){this.padding=[iTop,iRight,iTop,iRight];}else{this.padding=[iTop,iRight,iBot,iLeft];}},setInitPosition:function(diffX,diffY){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}
var dx=diffX||0;var dy=diffY||0;var p=Dom.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||Dom.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(sGroup){this.groups[sGroup]=true;this.DDM.regDragDrop(this,sGroup);},removeFromGroup:function(sGroup){if(this.groups[sGroup]){delete this.groups[sGroup];}
this.DDM.removeDDFromGroup(this,sGroup);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
Event.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){Event.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var button=e.which||e.button;if(this.primaryButtonOnly&&button>1){return;}
if(this.isLocked()){return;}
this.b4MouseDown(e);this.onMouseDown(e);this.DDM.refreshCache(this.groups);var pt=new YAHOO.util.Point(Event.getPageX(e),Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var target=Event.getTarget(e);return(this.isValidHandleChild(target)&&(this.id==this.handleElId||this.DDM.handleWasClicked(target,this.id)));},getTargetCoord:function(iPageX,iPageY){var x=iPageX-this.deltaX;var y=iPageY-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}
if(x>this.maxX){x=this.maxX;}}
if(this.constrainY){if(y<this.minY){y=this.minY;}
if(y>this.maxY){y=this.maxY;}}
x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return{x:x,y:y};},addInvalidHandleType:function(tagName){var type=tagName.toUpperCase();this.invalidHandleTypes[type]=type;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(cssClass){this.invalidHandleClasses.push(cssClass);},removeInvalidHandleType:function(tagName){var type=tagName.toUpperCase();delete this.invalidHandleTypes[type];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Dom.generateId(id);}
delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(cssClass){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==cssClass){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(node){var valid=true;var nodeName;try{nodeName=node.nodeName.toUpperCase();}catch(e){nodeName=node.nodeName;}
valid=valid&&!this.invalidHandleTypes[nodeName];valid=valid&&!this.invalidHandleIds[node.id];for(var i=0,len=this.invalidHandleClasses.length;valid&&i<len;++i){valid=!Dom.hasClass(node,this.invalidHandleClasses[i]);}
return valid;},setXTicks:function(iStartX,iTickSize){this.xTicks=[];this.xTickSize=iTickSize;var tickMap={};for(var i=this.initPageX;i>=this.minX;i=i-iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageX;i<=this.maxX;i=i+iTickSize){if(!tickMap[i]){this.xTicks[this.xTicks.length]=i;tickMap[i]=true;}}
this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(iStartY,iTickSize){this.yTicks=[];this.yTickSize=iTickSize;var tickMap={};for(var i=this.initPageY;i>=this.minY;i=i-iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
for(i=this.initPageY;i<=this.maxY;i=i+iTickSize){if(!tickMap[i]){this.yTicks[this.yTicks.length]=i;tickMap[i]=true;}}
this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(iLeft,iRight,iTickSize){this.leftConstraint=parseInt(iLeft,10);this.rightConstraint=parseInt(iRight,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(iTickSize){this.setXTicks(this.initPageX,iTickSize);}
this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,iDown,iTickSize){this.topConstraint=parseInt(iUp,10);this.bottomConstraint=parseInt(iDown,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(iTickSize){this.setYTicks(this.initPageY,iTickSize);}
this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}
if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}
if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,tickArray){if(!tickArray){return val;}else if(tickArray[0]>=val){return tickArray[0];}else{for(var i=0,len=tickArray.length;i<len;++i){var next=i+1;if(tickArray[next]&&tickArray[next]>=val){var diff1=val-tickArray[i];var diff2=tickArray[next]-val;return(diff2>diff1)?tickArray[i]:tickArray[next];}}
return tickArray[tickArray.length-1];}},toString:function(){return("DragDrop "+this.id);}};})();YAHOO.util.DD=function(id,sGroup,config){if(id){this.init(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(iPageX,iPageY){var x=iPageX-this.startPageX;var y=iPageY-this.startPageY;this.setDelta(x,y);},setDelta:function(iDeltaX,iDeltaY){this.deltaX=iDeltaX;this.deltaY=iDeltaY;},setDragElPos:function(iPageX,iPageY){var el=this.getDragEl();this.alignElWithMouse(el,iPageX,iPageY);},alignElWithMouse:function(el,iPageX,iPageY){var oCoord=this.getTargetCoord(iPageX,iPageY);if(!this.deltaSetXY){var aCoord=[oCoord.x,oCoord.y];YAHOO.util.Dom.setXY(el,aCoord);var newLeft=parseInt(YAHOO.util.Dom.getStyle(el,"left"),10);var newTop=parseInt(YAHOO.util.Dom.getStyle(el,"top"),10);this.deltaSetXY=[newLeft-oCoord.x,newTop-oCoord.y];}else{YAHOO.util.Dom.setStyle(el,"left",(oCoord.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(el,"top",(oCoord.y+this.deltaSetXY[1])+"px");}
this.cachePosition(oCoord.x,oCoord.y);this.autoScroll(oCoord.x,oCoord.y,el.offsetHeight,el.offsetWidth);},cachePosition:function(iPageX,iPageY){if(iPageX){this.lastPageX=iPageX;this.lastPageY=iPageY;}else{var aCoord=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=aCoord[0];this.lastPageY=aCoord[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var clientH=this.DDM.getClientHeight();var clientW=this.DDM.getClientWidth();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var right=w+x;var toBot=(clientH+st-y-this.deltaY);var toRight=(clientW+sl-x-this.deltaX);var thresh=40;var scrAmt=(document.all)?80:30;if(bot>clientH&&toBot<thresh){window.scrollTo(sl,st+scrAmt);}
if(y<st&&st>0&&y-st<thresh){window.scrollTo(sl,st-scrAmt);}
if(right>clientW&&toRight<thresh){window.scrollTo(sl+scrAmt,st);}
if(x<sl&&sl>0&&x-sl<thresh){window.scrollTo(sl-scrAmt,st);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(YAHOO.util.Event.getPageX(e),YAHOO.util.Event.getPageY(e));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(id,sGroup,config){if(id){this.init(id,sGroup,config);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this,body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}
var div=this.getDragEl(),Dom=YAHOO.util.Dom;if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;s.height="25px";s.width="25px";var _data=document.createElement('div');Dom.setStyle(_data,'height','100%');Dom.setStyle(_data,'width','100%');Dom.setStyle(_data,'background-color','#ccc');Dom.setStyle(_data,'opacity','0');div.appendChild(_data);body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(iPageX,iPageY){var el=this.getEl();var dragEl=this.getDragEl();var s=dragEl.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}
this.setDragElPos(iPageX,iPageY);YAHOO.util.Dom.setStyle(dragEl,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var DOM=YAHOO.util.Dom;var el=this.getEl();var dragEl=this.getDragEl();var bt=parseInt(DOM.getStyle(dragEl,"borderTopWidth"),10);var br=parseInt(DOM.getStyle(dragEl,"borderRightWidth"),10);var bb=parseInt(DOM.getStyle(dragEl,"borderBottomWidth"),10);var bl=parseInt(DOM.getStyle(dragEl,"borderLeftWidth"),10);if(isNaN(bt)){bt=0;}
if(isNaN(br)){br=0;}
if(isNaN(bb)){bb=0;}
if(isNaN(bl)){bl=0;}
var newWidth=Math.max(0,el.offsetWidth-br-bl);var newHeight=Math.max(0,el.offsetHeight-bt-bb);DOM.setStyle(dragEl,"width",newWidth+"px");DOM.setStyle(dragEl,"height",newHeight+"px");}},b4MouseDown:function(e){this.setStartPosition();var x=YAHOO.util.Event.getPageX(e);var y=YAHOO.util.Event.getPageY(e);this.autoOffset(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(e){var DOM=YAHOO.util.Dom;var lel=this.getEl();var del=this.getDragEl();DOM.setStyle(del,"visibility","");DOM.setStyle(lel,"visibility","hidden");YAHOO.util.DDM.moveToEl(lel,del);DOM.setStyle(del,"visibility","hidden");DOM.setStyle(lel,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(id,sGroup,config){if(id){this.initTarget(id,sGroup,config);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.3.0",build:"442"});/*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.0
*/

(function(){YAHOO.util.Config=function(owner){if(owner){this.init(owner);}
if(!owner){}};var Lang=YAHOO.lang,CustomEvent=YAHOO.util.CustomEvent,Config=YAHOO.util.Config;Config.CONFIG_CHANGED_EVENT="configChanged";Config.BOOLEAN_TYPE="boolean";Config.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(owner){this.owner=owner;this.configChangedEvent=this.createEvent(Config.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=CustomEvent.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(val){return(typeof val==Config.BOOLEAN_TYPE);},checkNumber:function(val){return(!isNaN(val));},fireEvent:function(key,value){var property=this.config[key];if(property&&property.event){property.event.fire(value);}},addProperty:function(key,propertyObject){key=key.toLowerCase();this.config[key]=propertyObject;propertyObject.event=this.createEvent(key,{scope:this.owner});propertyObject.event.signature=CustomEvent.LIST;propertyObject.key=key;if(propertyObject.handler){propertyObject.event.subscribe(propertyObject.handler,this.owner);}
this.setProperty(key,propertyObject.value,true);if(!propertyObject.suppressEvent){this.queueProperty(key,propertyObject.value);}},getConfig:function(){var cfg={},prop,property;for(prop in this.config){property=this.config[prop];if(property&&property.event){cfg[prop]=property.value;}}
return cfg;},getProperty:function(key){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.value;}else{return undefined;}},resetProperty:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event){if(this.initialConfig[key]&&!Lang.isUndefined(this.initialConfig[key])){this.setProperty(key,this.initialConfig[key]);return true;}}else{return false;}},setProperty:function(key,value,silent){var property;key=key.toLowerCase();if(this.queueInProgress&&!silent){this.queueProperty(key,value);return true;}else{property=this.config[key];if(property&&property.event){if(property.validator&&!property.validator(value)){return false;}else{property.value=value;if(!silent){this.fireEvent(key,value);this.configChangedEvent.fire([key,value]);}
return true;}}else{return false;}}},queueProperty:function(key,value){key=key.toLowerCase();var property=this.config[key],foundDuplicate=false,iLen,queueItem,queueItemKey,queueItemValue,sLen,supercedesCheck,qLen,queueItemCheck,queueItemCheckKey,queueItemCheckValue,i,s,q;if(property&&property.event){if(!Lang.isUndefined(value)&&property.validator&&!property.validator(value)){return false;}else{if(!Lang.isUndefined(value)){property.value=value;}else{value=property.value;}
foundDuplicate=false;iLen=this.eventQueue.length;for(i=0;i<iLen;i++){queueItem=this.eventQueue[i];if(queueItem){queueItemKey=queueItem[0];queueItemValue=queueItem[1];if(queueItemKey==key){this.eventQueue[i]=null;this.eventQueue.push([key,(!Lang.isUndefined(value)?value:queueItemValue)]);foundDuplicate=true;break;}}}
if(!foundDuplicate&&!Lang.isUndefined(value)){this.eventQueue.push([key,value]);}}
if(property.supercedes){sLen=property.supercedes.length;for(s=0;s<sLen;s++){supercedesCheck=property.supercedes[s];qLen=this.eventQueue.length;for(q=0;q<qLen;q++){queueItemCheck=this.eventQueue[q];if(queueItemCheck){queueItemCheckKey=queueItemCheck[0];queueItemCheckValue=queueItemCheck[1];if(queueItemCheckKey==supercedesCheck.toLowerCase()){this.eventQueue.push([queueItemCheckKey,queueItemCheckValue]);this.eventQueue[q]=null;break;}}}}}
return true;}else{return false;}},refireEvent:function(key){key=key.toLowerCase();var property=this.config[key];if(property&&property.event&&!Lang.isUndefined(property.value)){if(this.queueInProgress){this.queueProperty(key);}else{this.fireEvent(key,property.value);}}},applyConfig:function(userConfig,init){var sKey,oValue,oConfig;if(init){oConfig={};for(sKey in userConfig){if(Lang.hasOwnProperty(userConfig,sKey)){oConfig[sKey.toLowerCase()]=userConfig[sKey];}}
this.initialConfig=oConfig;}
for(sKey in userConfig){if(Lang.hasOwnProperty(userConfig,sKey)){this.queueProperty(sKey,userConfig[sKey]);}}},refresh:function(){var prop;for(prop in this.config){this.refireEvent(prop);}},fireQueue:function(){var i,queueItem,key,value,property;this.queueInProgress=true;for(i=0;i<this.eventQueue.length;i++){queueItem=this.eventQueue[i];if(queueItem){key=queueItem[0];value=queueItem[1];property=this.config[key];property.value=value;this.fireEvent(key,value);}}
this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(key,handler,obj,override){var property=this.config[key.toLowerCase()];if(property&&property.event){if(!Config.alreadySubscribed(property.event,handler,obj)){property.event.subscribe(handler,obj,override);}
return true;}else{return false;}},unsubscribeFromConfigEvent:function(key,handler,obj){var property=this.config[key.toLowerCase()];if(property&&property.event){return property.event.unsubscribe(handler,obj);}else{return false;}},toString:function(){var output="Config";if(this.owner){output+=" ["+this.owner.toString()+"]";}
return output;},outputEventQueue:function(){var output="",queueItem,q,nQueue=this.eventQueue.length;for(q=0;q<nQueue;q++){queueItem=this.eventQueue[q];if(queueItem){output+=queueItem[0]+"="+queueItem[1]+", ";}}
return output;},destroy:function(){var oConfig=this.config,sProperty,oProperty;for(sProperty in oConfig){if(Lang.hasOwnProperty(oConfig,sProperty)){oProperty=oConfig[sProperty];oProperty.event.unsubscribeAll();oProperty.event=null;}}
this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};Config.alreadySubscribed=function(evt,fn,obj){var nSubscribers=evt.subscribers.length,subsc,i;if(nSubscribers>0){i=nSubscribers-1;do{subsc=evt.subscribers[i];if(subsc&&subsc.obj==obj&&subsc.fn==fn){return true;}}
while(i--);}
return false;};YAHOO.lang.augmentProto(Config,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(el,userConfig){if(el){this.init(el,userConfig);}else{}};var Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Module=YAHOO.widget.Module,m_oModuleTemplate,m_oHeaderTemplate,m_oBodyTemplate,m_oFooterTemplate,EVENT_TYPES={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTORY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},DEFAULT_CONFIG={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true}};Module.IMG_ROOT=null;Module.IMG_ROOT_SSL=null;Module.CSS_MODULE="yui-module";Module.CSS_HEADER="hd";Module.CSS_BODY="bd";Module.CSS_FOOTER="ft";Module.RESIZE_MONITOR_SECURE_URL="javascript:false;";Module.textResizeEvent=new CustomEvent("textResize");function createModuleTemplate(){if(!m_oModuleTemplate){m_oModuleTemplate=document.createElement("div");m_oModuleTemplate.innerHTML=("<div class=\""+
Module.CSS_HEADER+"\"></div>"+"<div class=\""+
Module.CSS_BODY+"\"></div><div class=\""+
Module.CSS_FOOTER+"\"></div>");m_oHeaderTemplate=m_oModuleTemplate.firstChild;m_oBodyTemplate=m_oHeaderTemplate.nextSibling;m_oFooterTemplate=m_oBodyTemplate.nextSibling;}
return m_oModuleTemplate;}
function createHeader(){if(!m_oHeaderTemplate){createModuleTemplate();}
return(m_oHeaderTemplate.cloneNode(false));}
function createBody(){if(!m_oBodyTemplate){createModuleTemplate();}
return(m_oBodyTemplate.cloneNode(false));}
function createFooter(){if(!m_oFooterTemplate){createModuleTemplate();}
return(m_oFooterTemplate.cloneNode(false));}
Module.prototype={constructor:Module,element:null,header:null,body:null,footer:null,id:null,imageRoot:Module.IMG_ROOT,initEvents:function(){var SIGNATURE=CustomEvent.LIST;this.beforeInitEvent=this.createEvent(EVENT_TYPES.BEFORE_INIT);this.beforeInitEvent.signature=SIGNATURE;this.initEvent=this.createEvent(EVENT_TYPES.INIT);this.initEvent.signature=SIGNATURE;this.appendEvent=this.createEvent(EVENT_TYPES.APPEND);this.appendEvent.signature=SIGNATURE;this.beforeRenderEvent=this.createEvent(EVENT_TYPES.BEFORE_RENDER);this.beforeRenderEvent.signature=SIGNATURE;this.renderEvent=this.createEvent(EVENT_TYPES.RENDER);this.renderEvent.signature=SIGNATURE;this.changeHeaderEvent=this.createEvent(EVENT_TYPES.CHANGE_HEADER);this.changeHeaderEvent.signature=SIGNATURE;this.changeBodyEvent=this.createEvent(EVENT_TYPES.CHANGE_BODY);this.changeBodyEvent.signature=SIGNATURE;this.changeFooterEvent=this.createEvent(EVENT_TYPES.CHANGE_FOOTER);this.changeFooterEvent.signature=SIGNATURE;this.changeContentEvent=this.createEvent(EVENT_TYPES.CHANGE_CONTENT);this.changeContentEvent.signature=SIGNATURE;this.destroyEvent=this.createEvent(EVENT_TYPES.DESTORY);this.destroyEvent.signature=SIGNATURE;this.beforeShowEvent=this.createEvent(EVENT_TYPES.BEFORE_SHOW);this.beforeShowEvent.signature=SIGNATURE;this.showEvent=this.createEvent(EVENT_TYPES.SHOW);this.showEvent.signature=SIGNATURE;this.beforeHideEvent=this.createEvent(EVENT_TYPES.BEFORE_HIDE);this.beforeHideEvent.signature=SIGNATURE;this.hideEvent=this.createEvent(EVENT_TYPES.HIDE);this.hideEvent.signature=SIGNATURE;},platform:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1){return"windows";}else if(ua.indexOf("macintosh")!=-1){return"mac";}else{return false;}}(),browser:function(){var ua=navigator.userAgent.toLowerCase();if(ua.indexOf('opera')!=-1){return'opera';}else if(ua.indexOf('msie 7')!=-1){return'ie7';}else if(ua.indexOf('msie')!=-1){return'ie';}else if(ua.indexOf('safari')!=-1){return'safari';}else if(ua.indexOf('gecko')!=-1){return'gecko';}else{return false;}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(DEFAULT_CONFIG.VISIBLE.key,{handler:this.configVisible,value:DEFAULT_CONFIG.VISIBLE.value,validator:DEFAULT_CONFIG.VISIBLE.validator});this.cfg.addProperty(DEFAULT_CONFIG.EFFECT.key,{suppressEvent:DEFAULT_CONFIG.EFFECT.suppressEvent,supercedes:DEFAULT_CONFIG.EFFECT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:DEFAULT_CONFIG.MONITOR_RESIZE.value});},init:function(el,userConfig){var elId,i,child;this.initEvents();this.beforeInitEvent.fire(Module);this.cfg=new Config(this);if(this.isSecure){this.imageRoot=Module.IMG_ROOT_SSL;}
if(typeof el=="string"){elId=el;el=document.getElementById(el);if(!el){el=(createModuleTemplate()).cloneNode(false);el.id=elId;}}
this.element=el;if(el.id){this.id=el.id;}
child=this.element.firstChild;if(child){do{switch(child.className){case Module.CSS_HEADER:this.header=child;break;case Module.CSS_BODY:this.body=child;break;case Module.CSS_FOOTER:this.footer=child;break;}}while((child=child.nextSibling));}
this.initDefaultConfig();Dom.addClass(this.element,Module.CSS_MODULE);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(!Config.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}
this.initEvent.fire(Module);},initResizeMonitor:function(){var oDoc,oIFrame,sHTML;function fireTextResize(){Module.textResizeEvent.fire();}
if(!YAHOO.env.ua.opera){oIFrame=Dom.get("_yuiResizeMonitor");if(!oIFrame){oIFrame=document.createElement("iframe");if(this.isSecure&&Module.RESIZE_MONITOR_SECURE_URL&&YAHOO.env.ua.ie){oIFrame.src=Module.RESIZE_MONITOR_SECURE_URL;}
if(YAHOO.env.ua.gecko){sHTML="<html><head><script "+"type=\"text/javascript\">"+"window.onresize=function(){window.parent."+"YAHOO.widget.Module.textResizeEvent."+"fire();};window.parent.YAHOO.widget.Module."+"textResizeEvent.fire();</script></head>"+"<body></body></html>";oIFrame.src="data:text/html;charset=utf-8,"+
encodeURIComponent(sHTML);}
oIFrame.id="_yuiResizeMonitor";oIFrame.style.position="absolute";oIFrame.style.visibility="hidden";document.body.appendChild(oIFrame);oIFrame.style.width="10em";oIFrame.style.height="10em";oIFrame.style.top=(-1*oIFrame.offsetHeight)+"px";oIFrame.style.left=(-1*oIFrame.offsetWidth)+"px";oIFrame.style.borderWidth="0";oIFrame.style.visibility="visible";if(YAHOO.env.ua.webkit){oDoc=oIFrame.contentWindow.document;oDoc.open();oDoc.close();}}
if(oIFrame&&oIFrame.contentWindow){Module.textResizeEvent.subscribe(this.onDomResize,this,true);if(!Module.textResizeInitialized){if(!Event.on(oIFrame.contentWindow,"resize",fireTextResize)){Event.on(oIFrame,"resize",fireTextResize);}
Module.textResizeInitialized=true;}
this.resizeMonitor=oIFrame;}}},onDomResize:function(e,obj){var nLeft=-1*this.resizeMonitor.offsetWidth,nTop=-1*this.resizeMonitor.offsetHeight;this.resizeMonitor.style.top=nTop+"px";this.resizeMonitor.style.left=nLeft+"px";},setHeader:function(headerContent){var oHeader=this.header||(this.header=createHeader());if(typeof headerContent=="string"){oHeader.innerHTML=headerContent;}else{oHeader.innerHTML="";oHeader.appendChild(headerContent);}
this.changeHeaderEvent.fire(headerContent);this.changeContentEvent.fire();},appendToHeader:function(element){var oHeader=this.header||(this.header=createHeader());oHeader.appendChild(element);this.changeHeaderEvent.fire(element);this.changeContentEvent.fire();},setBody:function(bodyContent){var oBody=this.body||(this.body=createBody());if(typeof bodyContent=="string"){oBody.innerHTML=bodyContent;}else{oBody.innerHTML="";oBody.appendChild(bodyContent);}
this.changeBodyEvent.fire(bodyContent);this.changeContentEvent.fire();},appendToBody:function(element){var oBody=this.body||(this.body=createBody());oBody.appendChild(element);this.changeBodyEvent.fire(element);this.changeContentEvent.fire();},setFooter:function(footerContent){var oFooter=this.footer||(this.footer=createFooter());if(typeof footerContent=="string"){oFooter.innerHTML=footerContent;}else{oFooter.innerHTML="";oFooter.appendChild(footerContent);}
this.changeFooterEvent.fire(footerContent);this.changeContentEvent.fire();},appendToFooter:function(element){var oFooter=this.footer||(this.footer=createFooter());oFooter.appendChild(element);this.changeFooterEvent.fire(element);this.changeContentEvent.fire();},render:function(appendToNode,moduleElement){var me=this,firstChild;function appendTo(element){if(typeof element=="string"){element=document.getElementById(element);}
if(element){element.appendChild(me.element);me.appendEvent.fire();}}
this.beforeRenderEvent.fire();if(!moduleElement){moduleElement=this.element;}
if(appendToNode){appendTo(appendToNode);}else{if(!Dom.inDocument(this.element)){return false;}}
if(this.header&&!Dom.inDocument(this.header)){firstChild=moduleElement.firstChild;if(firstChild){moduleElement.insertBefore(this.header,firstChild);}else{moduleElement.appendChild(this.header);}}
if(this.body&&!Dom.inDocument(this.body)){if(this.footer&&Dom.isAncestor(this.moduleElement,this.footer)){moduleElement.insertBefore(this.body,this.footer);}else{moduleElement.appendChild(this.body);}}
if(this.footer&&!Dom.inDocument(this.footer)){moduleElement.appendChild(this.footer);}
this.renderEvent.fire();return true;},destroy:function(){var parent,e;if(this.element){Event.purgeElement(this.element,true);parent=this.element.parentNode;}
if(parent){parent.removeChild(this.element);}
this.element=null;this.header=null;this.body=null;this.footer=null;Module.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();for(e in this){if(e instanceof CustomEvent){e.unsubscribeAll();}}},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(type,args,obj){var visible=args[0];if(visible){this.beforeShowEvent.fire();Dom.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();Dom.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(type,args,obj){var monitor=args[0];if(monitor){this.initResizeMonitor();}else{Module.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(Module,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(el,userConfig){YAHOO.widget.Overlay.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,CustomEvent=YAHOO.util.CustomEvent,Module=YAHOO.widget.Module,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,Overlay=YAHOO.widget.Overlay,m_oIFrameTemplate,EVENT_TYPES={"BEFORE_MOVE":"beforeMove","MOVE":"move"},DEFAULT_CONFIG={"X":{key:"x",validator:Lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:Lang.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,validator:Lang.isBoolean,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:Lang.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(YAHOO.env.ua.ie==6?true:false),validator:Lang.isBoolean,supercedes:["zindex"]}};Overlay.IFRAME_SRC="javascript:false;";Overlay.IFRAME_OFFSET=3;Overlay.TOP_LEFT="tl";Overlay.TOP_RIGHT="tr";Overlay.BOTTOM_LEFT="bl";Overlay.BOTTOM_RIGHT="br";Overlay.CSS_OVERLAY="yui-overlay";Overlay.windowScrollEvent=new CustomEvent("windowScroll");Overlay.windowResizeEvent=new CustomEvent("windowResize");Overlay.windowScrollHandler=function(e){if(YAHOO.env.ua.ie){if(!window.scrollEnd){window.scrollEnd=-1;}
clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){Overlay.windowScrollEvent.fire();},1);}else{Overlay.windowScrollEvent.fire();}};Overlay.windowResizeHandler=function(e){if(YAHOO.env.ua.ie){if(!window.resizeEnd){window.resizeEnd=-1;}
clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){Overlay.windowResizeEvent.fire();},100);}else{Overlay.windowResizeEvent.fire();}};Overlay._initialized=null;if(Overlay._initialized===null){Event.on(window,"scroll",Overlay.windowScrollHandler);Event.on(window,"resize",Overlay.windowResizeHandler);Overlay._initialized=true;}
YAHOO.extend(Overlay,Module,{init:function(el,userConfig){Overlay.superclass.init.call(this,el);this.beforeInitEvent.fire(Overlay);Dom.addClass(this.element,Overlay.CSS_OVERLAY);if(userConfig){this.cfg.applyConfig(userConfig,true);}
if(this.platform=="mac"&&YAHOO.env.ua.gecko){if(!Config.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}
if(!Config.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}
this.initEvent.fire(Overlay);},initEvents:function(){Overlay.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.beforeMoveEvent=this.createEvent(EVENT_TYPES.BEFORE_MOVE);this.beforeMoveEvent.signature=SIGNATURE;this.moveEvent=this.createEvent(EVENT_TYPES.MOVE);this.moveEvent.signature=SIGNATURE;},initDefaultConfig:function(){Overlay.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.X.key,{handler:this.configX,validator:DEFAULT_CONFIG.X.validator,suppressEvent:DEFAULT_CONFIG.X.suppressEvent,supercedes:DEFAULT_CONFIG.X.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.Y.key,{handler:this.configY,validator:DEFAULT_CONFIG.Y.validator,suppressEvent:DEFAULT_CONFIG.Y.suppressEvent,supercedes:DEFAULT_CONFIG.Y.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.XY.key,{handler:this.configXY,suppressEvent:DEFAULT_CONFIG.XY.suppressEvent,supercedes:DEFAULT_CONFIG.XY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.CONTEXT.key,{handler:this.configContext,suppressEvent:DEFAULT_CONFIG.CONTEXT.suppressEvent,supercedes:DEFAULT_CONFIG.CONTEXT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.FIXED_CENTER.key,{handler:this.configFixedCenter,value:DEFAULT_CONFIG.FIXED_CENTER.value,validator:DEFAULT_CONFIG.FIXED_CENTER.validator,supercedes:DEFAULT_CONFIG.FIXED_CENTER.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.WIDTH.key,{handler:this.configWidth,suppressEvent:DEFAULT_CONFIG.WIDTH.suppressEvent,supercedes:DEFAULT_CONFIG.WIDTH.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.HEIGHT.key,{handler:this.configHeight,suppressEvent:DEFAULT_CONFIG.HEIGHT.suppressEvent,supercedes:DEFAULT_CONFIG.HEIGHT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.ZINDEX.key,{handler:this.configzIndex,value:DEFAULT_CONFIG.ZINDEX.value});this.cfg.addProperty(DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.value,validator:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.validator,supercedes:DEFAULT_CONFIG.CONSTRAIN_TO_VIEWPORT.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.IFRAME.key,{handler:this.configIframe,value:DEFAULT_CONFIG.IFRAME.value,validator:DEFAULT_CONFIG.IFRAME.validator,supercedes:DEFAULT_CONFIG.IFRAME.supercedes});},moveTo:function(x,y){this.cfg.setProperty("xy",[x,y]);},hideMacGeckoScrollbars:function(){Dom.removeClass(this.element,"show-scrollbars");Dom.addClass(this.element,"hide-scrollbars");},showMacGeckoScrollbars:function(){Dom.removeClass(this.element,"hide-scrollbars");Dom.addClass(this.element,"show-scrollbars");},configVisible:function(type,args,obj){var visible=args[0],currentVis=Dom.getStyle(this.element,"visibility"),effect=this.cfg.getProperty("effect"),effectInstances=[],isMacGecko=(this.platform=="mac"&&YAHOO.env.ua.gecko),alreadySubscribed=Config.alreadySubscribed,eff,ei,e,i,j,k,h,nEffects,nEffectInstances;if(currentVis=="inherit"){e=this.element.parentNode;while(e.nodeType!=9&&e.nodeType!=11){currentVis=Dom.getStyle(e,"visibility");if(currentVis!="inherit"){break;}
e=e.parentNode;}
if(currentVis=="inherit"){currentVis="visible";}}
if(effect){if(effect instanceof Array){nEffects=effect.length;for(i=0;i<nEffects;i++){eff=effect[i];effectInstances[effectInstances.length]=eff.effect(this,eff.duration);}}else{effectInstances[effectInstances.length]=effect.effect(this,effect.duration);}}
if(visible){if(isMacGecko){this.showMacGeckoScrollbars();}
if(effect){if(visible){if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();nEffectInstances=effectInstances.length;for(j=0;j<nEffectInstances;j++){ei=effectInstances[j];if(j===0&&!alreadySubscribed(ei.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){ei.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}
ei.animateIn();}}}}else{if(currentVis!="visible"||currentVis===""){this.beforeShowEvent.fire();Dom.setStyle(this.element,"visibility","visible");this.cfg.refireEvent("iframe");this.showEvent.fire();}}}else{if(isMacGecko){this.hideMacGeckoScrollbars();}
if(effect){if(currentVis=="visible"){this.beforeHideEvent.fire();nEffectInstances=effectInstances.length;for(k=0;k<nEffectInstances;k++){h=effectInstances[k];if(k===0&&!alreadySubscribed(h.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){h.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}
h.animateOut();}}else if(currentVis===""){Dom.setStyle(this.element,"visibility","hidden");}}else{if(currentVis=="visible"||currentVis===""){this.beforeHideEvent.fire();Dom.setStyle(this.element,"visibility","hidden");this.hideEvent.fire();}}}},doCenterOnDOMEvent:function(){if(this.cfg.getProperty("visible")){this.center();}},configFixedCenter:function(type,args,obj){var val=args[0],alreadySubscribed=Config.alreadySubscribed,windowResizeEvent=Overlay.windowResizeEvent,windowScrollEvent=Overlay.windowScrollEvent;if(val){this.center();if(!alreadySubscribed(this.beforeShowEvent,this.center,this)){this.beforeShowEvent.subscribe(this.center);}
if(!alreadySubscribed(windowResizeEvent,this.doCenterOnDOMEvent,this)){windowResizeEvent.subscribe(this.doCenterOnDOMEvent,this,true);}
if(!alreadySubscribed(windowScrollEvent,this.doCenterOnDOMEvent,this)){windowScrollEvent.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(type,args,obj){var height=args[0],el=this.element;Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");},configWidth:function(type,args,obj){var width=args[0],el=this.element;Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");},configzIndex:function(type,args,obj){var zIndex=args[0],el=this.element;if(!zIndex){zIndex=Dom.getStyle(el,"zIndex");if(!zIndex||isNaN(zIndex)){zIndex=0;}}
if(this.iframe){if(zIndex<=0){zIndex=1;}
Dom.setStyle(this.iframe,"zIndex",(zIndex-1));}
Dom.setStyle(el,"zIndex",zIndex);this.cfg.setProperty("zIndex",zIndex,true);},configXY:function(type,args,obj){var pos=args[0],x=pos[0],y=pos[1];this.cfg.setProperty("x",x);this.cfg.setProperty("y",y);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},configX:function(type,args,obj){var x=args[0],y=this.cfg.getProperty("y");this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");Dom.setX(this.element,x,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},configY:function(type,args,obj){var x=this.cfg.getProperty("x"),y=args[0];this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.beforeMoveEvent.fire([x,y]);x=this.cfg.getProperty("x");y=this.cfg.getProperty("y");Dom.setY(this.element,y,true);this.cfg.setProperty("xy",[x,y],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([x,y]);},showIframe:function(){var oIFrame=this.iframe,oParentNode;if(oIFrame){oParentNode=this.element.parentNode;if(oParentNode!=oIFrame.parentNode){oParentNode.appendChild(oIFrame);}
oIFrame.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var oIFrame=this.iframe,oElement=this.element,nOffset=Overlay.IFRAME_OFFSET,nDimensionOffset=(nOffset*2),aXY;if(oIFrame){oIFrame.style.width=(oElement.offsetWidth+nDimensionOffset+"px");oIFrame.style.height=(oElement.offsetHeight+nDimensionOffset+"px");aXY=this.cfg.getProperty("xy");if(!Lang.isArray(aXY)||(isNaN(aXY[0])||isNaN(aXY[1]))){this.syncPosition();aXY=this.cfg.getProperty("xy");}
Dom.setXY(oIFrame,[(aXY[0]-nOffset),(aXY[1]-nOffset)]);}},configIframe:function(type,args,obj){var bIFrame=args[0];function createIFrame(){var oIFrame=this.iframe,oElement=this.element,oParent,aXY;if(!oIFrame){if(!m_oIFrameTemplate){m_oIFrameTemplate=document.createElement("iframe");if(this.isSecure){m_oIFrameTemplate.src=Overlay.IFRAME_SRC;}
if(YAHOO.env.ua.ie){m_oIFrameTemplate.style.filter="alpha(opacity=0)";m_oIFrameTemplate.frameBorder=0;}
else{m_oIFrameTemplate.style.opacity="0";}
m_oIFrameTemplate.style.position="absolute";m_oIFrameTemplate.style.border="none";m_oIFrameTemplate.style.margin="0";m_oIFrameTemplate.style.padding="0";m_oIFrameTemplate.style.display="none";}
oIFrame=m_oIFrameTemplate.cloneNode(false);oParent=oElement.parentNode;if(oParent){oParent.appendChild(oIFrame);}else{document.body.appendChild(oIFrame);}
this.iframe=oIFrame;}
this.showIframe();this.syncIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}
function onBeforeShow(){createIFrame.call(this);this.beforeShowEvent.unsubscribe(onBeforeShow);this._iframeDeferred=false;}
if(bIFrame){if(this.cfg.getProperty("visible")){createIFrame.call(this);}
else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(onBeforeShow);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},configConstrainToViewport:function(type,args,obj){var val=args[0];if(val){if(!Config.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}}else{this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(type,args,obj){var contextArgs=args[0],contextEl,elementMagnetCorner,contextMagnetCorner;if(contextArgs){contextEl=contextArgs[0];elementMagnetCorner=contextArgs[1];contextMagnetCorner=contextArgs[2];if(contextEl){if(typeof contextEl=="string"){this.cfg.setProperty("context",[document.getElementById(contextEl),elementMagnetCorner,contextMagnetCorner],true);}
if(elementMagnetCorner&&contextMagnetCorner){this.align(elementMagnetCorner,contextMagnetCorner);}}}},align:function(elementAlign,contextAlign){var contextArgs=this.cfg.getProperty("context"),me=this,context,element,contextRegion;function doAlign(v,h){switch(elementAlign){case Overlay.TOP_LEFT:me.moveTo(h,v);break;case Overlay.TOP_RIGHT:me.moveTo((h-element.offsetWidth),v);break;case Overlay.BOTTOM_LEFT:me.moveTo(h,(v-element.offsetHeight));break;case Overlay.BOTTOM_RIGHT:me.moveTo((h-element.offsetWidth),(v-element.offsetHeight));break;}}
if(contextArgs){context=contextArgs[0];element=this.element;me=this;if(!elementAlign){elementAlign=contextArgs[1];}
if(!contextAlign){contextAlign=contextArgs[2];}
if(element&&context){contextRegion=Dom.getRegion(context);switch(contextAlign){case Overlay.TOP_LEFT:doAlign(contextRegion.top,contextRegion.left);break;case Overlay.TOP_RIGHT:doAlign(contextRegion.top,contextRegion.right);break;case Overlay.BOTTOM_LEFT:doAlign(contextRegion.bottom,contextRegion.left);break;case Overlay.BOTTOM_RIGHT:doAlign(contextRegion.bottom,contextRegion.right);break;}}}},enforceConstraints:function(type,args,obj){var pos=args[0],x=pos[0],y=pos[1],offsetHeight=this.element.offsetHeight,offsetWidth=this.element.offsetWidth,viewPortWidth=Dom.getViewportWidth(),viewPortHeight=Dom.getViewportHeight(),scrollX=Dom.getDocumentScrollLeft(),scrollY=Dom.getDocumentScrollTop(),topConstraint=scrollY+10,leftConstraint=scrollX+10,bottomConstraint=scrollY+viewPortHeight-offsetHeight-10,rightConstraint=scrollX+viewPortWidth-offsetWidth-10;if(x<leftConstraint){x=leftConstraint;}else if(x>rightConstraint){x=rightConstraint;}
if(y<topConstraint){y=topConstraint;}else if(y>bottomConstraint){y=bottomConstraint;}
this.cfg.setProperty("x",x,true);this.cfg.setProperty("y",y,true);this.cfg.setProperty("xy",[x,y],true);},center:function(){var scrollX=Dom.getDocumentScrollLeft(),scrollY=Dom.getDocumentScrollTop(),viewPortWidth=Dom.getClientWidth(),viewPortHeight=Dom.getClientHeight(),elementWidth=this.element.offsetWidth,elementHeight=this.element.offsetHeight,x=(viewPortWidth/2)-(elementWidth/2)+scrollX,y=(viewPortHeight/2)-(elementHeight/2)+scrollY;this.cfg.setProperty("xy",[parseInt(x,10),parseInt(y,10)]);this.cfg.refireEvent("iframe");},syncPosition:function(){var pos=Dom.getXY(this.element);this.cfg.setProperty("x",pos[0],true);this.cfg.setProperty("y",pos[1],true);this.cfg.setProperty("xy",pos,true);},onDomResize:function(e,obj){var me=this;Overlay.superclass.onDomResize.call(this,e,obj);setTimeout(function(){me.syncPosition();me.cfg.refireEvent("iframe");me.cfg.refireEvent("context");},0);},bringToTop:function(){var aOverlays=[],oElement=this.element;function compareZIndexDesc(p_oOverlay1,p_oOverlay2){var sZIndex1=Dom.getStyle(p_oOverlay1,"zIndex"),sZIndex2=Dom.getStyle(p_oOverlay2,"zIndex"),nZIndex1=(!sZIndex1||isNaN(sZIndex1))?0:parseInt(sZIndex1,10),nZIndex2=(!sZIndex2||isNaN(sZIndex2))?0:parseInt(sZIndex2,10);if(nZIndex1>nZIndex2){return-1;}else if(nZIndex1<nZIndex2){return 1;}else{return 0;}}
function isOverlayElement(p_oElement){var oOverlay=Dom.hasClass(p_oElement,Overlay.CSS_OVERLAY),Panel=YAHOO.widget.Panel;if(oOverlay&&!Dom.isAncestor(oElement,oOverlay)){if(Panel&&Dom.hasClass(p_oElement,Panel.CSS_PANEL)){aOverlays[aOverlays.length]=p_oElement.parentNode;}
else{aOverlays[aOverlays.length]=p_oElement;}}}
Dom.getElementsBy(isOverlayElement,"DIV",document.body);aOverlays.sort(compareZIndexDesc);var oTopOverlay=aOverlays[0],nTopZIndex;if(oTopOverlay){nTopZIndex=Dom.getStyle(oTopOverlay,"zIndex");if(!isNaN(nTopZIndex)&&oTopOverlay!=oElement){this.cfg.setProperty("zindex",(parseInt(nTopZIndex,10)+2));}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}
this.iframe=null;Overlay.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);Overlay.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);Overlay.superclass.destroy.call(this);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(userConfig){this.init(userConfig);};var Overlay=YAHOO.widget.Overlay,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Config=YAHOO.util.Config,CustomEvent=YAHOO.util.CustomEvent,OverlayManager=YAHOO.widget.OverlayManager;OverlayManager.CSS_FOCUSED="focused";OverlayManager.prototype={constructor:OverlayManager,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(userConfig){this.cfg=new Config(this);this.initDefaultConfig();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.fireQueue();var activeOverlay=null;this.getActive=function(){return activeOverlay;};this.focus=function(overlay){var o=this.find(overlay);if(o){if(activeOverlay!=o){if(activeOverlay){activeOverlay.blur();}
this.bringToTop(o);activeOverlay=o;Dom.addClass(activeOverlay.element,OverlayManager.CSS_FOCUSED);o.focusEvent.fire();}}};this.remove=function(overlay){var o=this.find(overlay),originalZ;if(o){if(activeOverlay==o){activeOverlay=null;}
originalZ=Dom.getStyle(o.element,"zIndex");o.cfg.setProperty("zIndex",-1000,true);this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));o.hideEvent.unsubscribe(o.blur);o.destroyEvent.unsubscribe(this._onOverlayDestroy,o);if(o.element){Event.removeListener(o.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);}
o.cfg.setProperty("zIndex",originalZ,true);o.cfg.setProperty("manager",null);o.focusEvent.unsubscribeAll();o.blurEvent.unsubscribeAll();o.focusEvent=null;o.blurEvent=null;o.focus=null;o.blur=null;}};this.blurAll=function(){var nOverlays=this.overlays.length,i;if(nOverlays>0){i=nOverlays-1;do{this.overlays[i].blur();}
while(i--);}};this._onOverlayBlur=function(p_sType,p_aArgs){activeOverlay=null;};var overlays=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}
if(overlays){this.register(overlays);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(p_oEvent){var oTarget=Event.getTarget(p_oEvent),oClose=this.close;if(oClose&&(oTarget==oClose||Dom.isAncestor(oClose,oTarget))){this.blur();}
else{this.focus();}},_onOverlayDestroy:function(p_sType,p_aArgs,p_oOverlay){this.remove(p_oOverlay);},register:function(overlay){var mgr=this,zIndex,regcount,i,nOverlays;if(overlay instanceof Overlay){overlay.cfg.addProperty("manager",{value:this});overlay.focusEvent=overlay.createEvent("focus");overlay.focusEvent.signature=CustomEvent.LIST;overlay.blurEvent=overlay.createEvent("blur");overlay.blurEvent.signature=CustomEvent.LIST;overlay.focus=function(){mgr.focus(this);};overlay.blur=function(){if(mgr.getActive()==this){Dom.removeClass(this.element,OverlayManager.CSS_FOCUSED);this.blurEvent.fire();}};overlay.blurEvent.subscribe(mgr._onOverlayBlur);overlay.hideEvent.subscribe(overlay.blur);overlay.destroyEvent.subscribe(this._onOverlayDestroy,overlay,this);Event.on(overlay.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus,null,overlay);zIndex=Dom.getStyle(overlay.element,"zIndex");if(!isNaN(zIndex)){overlay.cfg.setProperty("zIndex",parseInt(zIndex,10));}else{overlay.cfg.setProperty("zIndex",0);}
this.overlays.push(overlay);this.bringToTop(overlay);return true;}else if(overlay instanceof Array){regcount=0;nOverlays=overlay.length;for(i=0;i<nOverlays;i++){if(this.register(overlay[i])){regcount++;}}
if(regcount>0){return true;}}else{return false;}},bringToTop:function(p_oOverlay){var oOverlay=this.find(p_oOverlay),nTopZIndex,oTopOverlay,aOverlays;if(oOverlay){aOverlays=this.overlays;aOverlays.sort(this.compareZIndexDesc);oTopOverlay=aOverlays[0];if(oTopOverlay){nTopZIndex=Dom.getStyle(oTopOverlay.element,"zIndex");if(!isNaN(nTopZIndex)&&oTopOverlay!=oOverlay){oOverlay.cfg.setProperty("zIndex",(parseInt(nTopZIndex,10)+2));}
aOverlays.sort(this.compareZIndexDesc);}}},find:function(overlay){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;if(overlay instanceof Overlay){do{if(aOverlays[i]==overlay){return aOverlays[i];}}
while(i--);}else if(typeof overlay=="string"){do{if(aOverlays[i].id==overlay){return aOverlays[i];}}
while(i--);}
return null;}},compareZIndexDesc:function(o1,o2){var zIndex1=o1.cfg.getProperty("zIndex"),zIndex2=o2.cfg.getProperty("zIndex");if(zIndex1>zIndex2){return-1;}else if(zIndex1<zIndex2){return 1;}else{return 0;}},showAll:function(){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;do{aOverlays[i].show();}
while(i--);}},hideAll:function(){var aOverlays=this.overlays,nOverlays=aOverlays.length,i;if(nOverlays>0){i=nOverlays-1;do{aOverlays[i].hide();}
while(i--);}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(el,userConfig){YAHOO.widget.Tooltip.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,Event=YAHOO.util.Event,Dom=YAHOO.util.Dom,Tooltip=YAHOO.widget.Tooltip,m_oShadowTemplate,DEFAULT_CONFIG={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:Lang.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:Lang.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:Lang.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:Lang.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"}};Tooltip.CSS_TOOLTIP="yui-tt";function restoreOriginalWidth(p_sType,p_aArgs,p_oObject){var sOriginalWidth=p_oObject[0],sNewWidth=p_oObject[1],oConfig=this.cfg,sCurrentWidth=oConfig.getProperty("width");if(sCurrentWidth==sNewWidth){oConfig.setProperty("width",sOriginalWidth);}
this.unsubscribe("hide",this._onHide,p_oObject);}
function setWidthToOffsetWidth(p_sType,p_aArgs){var oBody=document.body,oConfig=this.cfg,sOriginalWidth=oConfig.getProperty("width"),sNewWidth,oClone;if((!sOriginalWidth||sOriginalWidth=="auto")&&(oConfig.getProperty("container")!=oBody||oConfig.getProperty("x")>=Dom.getViewportWidth()||oConfig.getProperty("y")>=Dom.getViewportHeight())){oClone=this.element.cloneNode(true);oClone.style.visibility="hidden";oClone.style.top="0px";oClone.style.left="0px";oBody.appendChild(oClone);sNewWidth=(oClone.offsetWidth+"px");oBody.removeChild(oClone);oClone=null;oConfig.setProperty("width",sNewWidth);oConfig.refireEvent("xy");this.subscribe("hide",restoreOriginalWidth,[(sOriginalWidth||""),sNewWidth]);}}
function onDOMReady(p_sType,p_aArgs,p_oObject){this.render(p_oObject);}
function onInit(){Event.onDOMReady(onDOMReady,this.cfg.getProperty("container"),this);}
YAHOO.extend(Tooltip,YAHOO.widget.Overlay,{init:function(el,userConfig){Tooltip.superclass.init.call(this,el);this.beforeInitEvent.fire(Tooltip);Dom.addClass(this.element,Tooltip.CSS_TOOLTIP);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("beforeShow",setWidthToOffsetWidth);this.subscribe("init",onInit);this.subscribe("render",this.onRender);this.initEvent.fire(Tooltip);},initDefaultConfig:function(){Tooltip.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.PREVENT_OVERLAP.key,{value:DEFAULT_CONFIG.PREVENT_OVERLAP.value,validator:DEFAULT_CONFIG.PREVENT_OVERLAP.validator,supercedes:DEFAULT_CONFIG.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:DEFAULT_CONFIG.SHOW_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.value,validator:DEFAULT_CONFIG.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.HIDE_DELAY.key,{handler:this.configHideDelay,value:DEFAULT_CONFIG.HIDE_DELAY.value,validator:DEFAULT_CONFIG.HIDE_DELAY.validator});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.CONTAINER.key,{handler:this.configContainer,value:document.body});},configText:function(type,args,obj){var text=args[0];if(text){this.setBody(text);}},configContainer:function(type,args,obj){var container=args[0];if(typeof container=='string'){this.cfg.setProperty("container",document.getElementById(container),true);}},_removeEventListeners:function(){var aElements=this._context,nElements,oElement,i;if(aElements){nElements=aElements.length;if(nElements>0){i=nElements-1;do{oElement=aElements[i];Event.removeListener(oElement,"mouseover",this.onContextMouseOver);Event.removeListener(oElement,"mousemove",this.onContextMouseMove);Event.removeListener(oElement,"mouseout",this.onContextMouseOut);}
while(i--);}}},configContext:function(type,args,obj){var context=args[0],aElements,nElements,oElement,i;if(context){if(!(context instanceof Array)){if(typeof context=="string"){this.cfg.setProperty("context",[document.getElementById(context)],true);}else{this.cfg.setProperty("context",[context],true);}
context=this.cfg.getProperty("context");}
this._removeEventListeners();this._context=context;aElements=this._context;if(aElements){nElements=aElements.length;if(nElements>0){i=nElements-1;do{oElement=aElements[i];Event.on(oElement,"mouseover",this.onContextMouseOver,this);Event.on(oElement,"mousemove",this.onContextMouseMove,this);Event.on(oElement,"mouseout",this.onContextMouseOut,this);}
while(i--);}}}},onContextMouseMove:function(e,obj){obj.pageX=Event.getPageX(e);obj.pageY=Event.getPageY(e);},onContextMouseOver:function(e,obj){var context=this;if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
Event.on(context,"mousemove",obj.onContextMouseMove,obj);if(context.title){obj._tempTitle=context.title;context.title="";}
obj.showProcId=obj.doShow(e,context);},onContextMouseOut:function(e,obj){var el=this;if(obj._tempTitle){el.title=obj._tempTitle;obj._tempTitle=null;}
if(obj.showProcId){clearTimeout(obj.showProcId);obj.showProcId=null;}
if(obj.hideProcId){clearTimeout(obj.hideProcId);obj.hideProcId=null;}
obj.hideProcId=setTimeout(function(){obj.hide();},obj.cfg.getProperty("hidedelay"));},doShow:function(e,context){var yOffset=25,me=this;if(YAHOO.env.ua.opera&&context.tagName&&context.tagName.toUpperCase()=="A"){yOffset+=12;}
return setTimeout(function(){if(me._tempTitle){me.setBody(me._tempTitle);}else{me.cfg.refireEvent("text");}
me.moveTo(me.pageX,me.pageY+yOffset);if(me.cfg.getProperty("preventoverlap")){me.preventOverlap(me.pageX,me.pageY);}
Event.removeListener(context,"mousemove",me.onContextMouseMove);me.show();me.hideProcId=me.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var me=this;return setTimeout(function(){me.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(pageX,pageY){var height=this.element.offsetHeight,mousePoint=new YAHOO.util.Point(pageX,pageY),elementRegion=Dom.getRegion(this.element);elementRegion.top-=5;elementRegion.left-=5;elementRegion.right+=5;elementRegion.bottom+=5;if(elementRegion.contains(mousePoint)){this.cfg.setProperty("y",(pageY-height-5));}},onRender:function(p_sType,p_aArgs){function sizeShadow(){var oElement=this.element,oShadow=this._shadow;if(oShadow){oShadow.style.width=(oElement.offsetWidth+6)+"px";oShadow.style.height=(oElement.offsetHeight+1)+"px";}}
function addShadowVisibleClass(){Dom.addClass(this._shadow,"yui-tt-shadow-visible");}
function removeShadowVisibleClass(){Dom.removeClass(this._shadow,"yui-tt-shadow-visible");}
function createShadow(){var oShadow=this._shadow,oElement,Module,nIE,me;if(!oShadow){oElement=this.element;Module=YAHOO.widget.Module;nIE=YAHOO.env.ua.ie;me=this;if(!m_oShadowTemplate){m_oShadowTemplate=document.createElement("div");m_oShadowTemplate.className="yui-tt-shadow";}
oShadow=m_oShadowTemplate.cloneNode(false);oElement.appendChild(oShadow);this._shadow=oShadow;addShadowVisibleClass.call(this);this.subscribe("beforeShow",addShadowVisibleClass);this.subscribe("beforeHide",removeShadowVisibleClass);if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){window.setTimeout(function(){sizeShadow.call(me);},0);this.cfg.subscribeToConfigEvent("width",sizeShadow);this.cfg.subscribeToConfigEvent("height",sizeShadow);this.subscribe("changeContent",sizeShadow);Module.textResizeEvent.subscribe(sizeShadow,this,true);this.subscribe("destroy",function(){Module.textResizeEvent.unsubscribe(sizeShadow,this);});}}}
function onBeforeShow(){createShadow.call(this);this.unsubscribe("beforeShow",onBeforeShow);}
if(this.cfg.getProperty("visible")){createShadow.call(this);}
else{this.subscribe("beforeShow",onBeforeShow);}},destroy:function(){this._removeEventListeners();Tooltip.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(el,userConfig){YAHOO.widget.Panel.superclass.constructor.call(this,el,userConfig);};var Lang=YAHOO.lang,DD=YAHOO.util.DD,Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,Overlay=YAHOO.widget.Overlay,CustomEvent=YAHOO.util.CustomEvent,Config=YAHOO.util.Config,Panel=YAHOO.widget.Panel,m_oMaskTemplate,m_oUnderlayTemplate,m_oCloseIconTemplate,EVENT_TYPES={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},DEFAULT_CONFIG={"CLOSE":{key:"close",value:true,validator:Lang.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(DD?true:false),validator:Lang.isBoolean,supercedes:["visible"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:Lang.isBoolean,supercedes:["visible"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]}};Panel.CSS_PANEL="yui-panel";Panel.CSS_PANEL_CONTAINER="yui-panel-container";function createHeader(p_sType,p_aArgs){if(!this.header){this.setHeader("&#160;");}}
function restoreOriginalWidth(p_sType,p_aArgs,p_oObject){var sOriginalWidth=p_oObject[0],sNewWidth=p_oObject[1],oConfig=this.cfg,sCurrentWidth=oConfig.getProperty("width");if(sCurrentWidth==sNewWidth){oConfig.setProperty("width",sOriginalWidth);}
this.unsubscribe("hide",restoreOriginalWidth,p_oObject);}
function setWidthToOffsetWidth(p_sType,p_aArgs){var nIE=YAHOO.env.ua.ie,oConfig,sOriginalWidth,sNewWidth;if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){oConfig=this.cfg;sOriginalWidth=oConfig.getProperty("width");if(!sOriginalWidth||sOriginalWidth=="auto"){sNewWidth=(this.element.offsetWidth+"px");oConfig.setProperty("width",sNewWidth);this.subscribe("hide",restoreOriginalWidth,[(sOriginalWidth||""),sNewWidth]);}}}
function onElementFocus(){this.blur();}
function addFocusEventHandlers(p_sType,p_aArgs){var me=this;function isFocusable(el){var sTagName=el.tagName.toUpperCase(),bFocusable=false;switch(sTagName){case"A":case"BUTTON":case"SELECT":case"TEXTAREA":if(!Dom.isAncestor(me.element,el)){Event.on(el,"focus",onElementFocus,el,true);bFocusable=true;}
break;case"INPUT":if(el.type!="hidden"&&!Dom.isAncestor(me.element,el)){Event.on(el,"focus",onElementFocus,el,true);bFocusable=true;}
break;}
return bFocusable;}
this.focusableElements=Dom.getElementsBy(isFocusable);}
function removeFocusEventHandlers(p_sType,p_aArgs){var aElements=this.focusableElements,nElements=aElements.length,el2,i;for(i=0;i<nElements;i++){el2=aElements[i];Event.removeListener(el2,"focus",onElementFocus);}}
YAHOO.extend(Panel,Overlay,{init:function(el,userConfig){Panel.superclass.init.call(this,el);this.beforeInitEvent.fire(Panel);Dom.addClass(this.element,Panel.CSS_PANEL);this.buildWrapper();if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.subscribe("showMask",addFocusEventHandlers);this.subscribe("hideMask",removeFocusEventHandlers);this.initEvent.fire(Panel);},initEvents:function(){Panel.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.showMaskEvent=this.createEvent(EVENT_TYPES.SHOW_MASK);this.showMaskEvent.signature=SIGNATURE;this.hideMaskEvent=this.createEvent(EVENT_TYPES.HIDE_MASK);this.hideMaskEvent.signature=SIGNATURE;this.dragEvent=this.createEvent(EVENT_TYPES.DRAG);this.dragEvent.signature=SIGNATURE;},initDefaultConfig:function(){Panel.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.CLOSE.key,{handler:this.configClose,value:DEFAULT_CONFIG.CLOSE.value,validator:DEFAULT_CONFIG.CLOSE.validator,supercedes:DEFAULT_CONFIG.CLOSE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.DRAGGABLE.key,{handler:this.configDraggable,value:DEFAULT_CONFIG.DRAGGABLE.value,validator:DEFAULT_CONFIG.DRAGGABLE.validator,supercedes:DEFAULT_CONFIG.DRAGGABLE.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.UNDERLAY.key,{handler:this.configUnderlay,value:DEFAULT_CONFIG.UNDERLAY.value,supercedes:DEFAULT_CONFIG.UNDERLAY.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.MODAL.key,{handler:this.configModal,value:DEFAULT_CONFIG.MODAL.value,validator:DEFAULT_CONFIG.MODAL.validator,supercedes:DEFAULT_CONFIG.MODAL.supercedes});this.cfg.addProperty(DEFAULT_CONFIG.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:DEFAULT_CONFIG.KEY_LISTENERS.suppressEvent,supercedes:DEFAULT_CONFIG.KEY_LISTENERS.supercedes});},configClose:function(type,args,obj){var val=args[0],oClose=this.close;function doHide(e,obj){obj.hide();}
if(val){if(!oClose){if(!m_oCloseIconTemplate){m_oCloseIconTemplate=document.createElement("span");m_oCloseIconTemplate.innerHTML="&#160;";m_oCloseIconTemplate.className="container-close";}
oClose=m_oCloseIconTemplate.cloneNode(true);this.innerElement.appendChild(oClose);Event.on(oClose,"click",doHide,this);this.close=oClose;}else{oClose.style.display="block";}}else{if(oClose){oClose.style.display="none";}}},configDraggable:function(type,args,obj){var val=args[0];if(val){if(!DD){this.cfg.setProperty("draggable",false);return;}
if(this.header){Dom.setStyle(this.header,"cursor","move");this.registerDragDrop();}
this.subscribe("beforeRender",createHeader);this.subscribe("beforeShow",setWidthToOffsetWidth);}else{if(this.dd){this.dd.unreg();}
if(this.header){Dom.setStyle(this.header,"cursor","auto");}
this.unsubscribe("beforeRender",createHeader);this.unsubscribe("beforeShow",setWidthToOffsetWidth);}},configUnderlay:function(type,args,obj){var UA=YAHOO.env.ua,bMacGecko=(this.platform=="mac"&&UA.gecko),sUnderlay=args[0].toLowerCase(),oUnderlay=this.underlay,oElement=this.element;function createUnderlay(){var nIE;if(!oUnderlay){if(!m_oUnderlayTemplate){m_oUnderlayTemplate=document.createElement("div");m_oUnderlayTemplate.className="underlay";}
oUnderlay=m_oUnderlayTemplate.cloneNode(false);this.element.appendChild(oUnderlay);this.underlay=oUnderlay;nIE=UA.ie;if(nIE==6||(nIE==7&&document.compatMode=="BackCompat")){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}}}
function onBeforeShow(){createUnderlay.call(this);this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(onBeforeShow);}
function destroyUnderlay(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(onBeforeShow);this._underlayDeferred=false;}
if(oUnderlay){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(oUnderlay);this.underlay=null;}}
switch(sUnderlay){case"shadow":Dom.removeClass(oElement,"matte");Dom.addClass(oElement,"shadow");break;case"matte":if(!bMacGecko){destroyUnderlay.call(this);}
Dom.removeClass(oElement,"shadow");Dom.addClass(oElement,"matte");break;default:if(!bMacGecko){destroyUnderlay.call(this);}
Dom.removeClass(oElement,"shadow");Dom.removeClass(oElement,"matte");break;}
if((sUnderlay=="shadow")||(bMacGecko&&!oUnderlay)){if(this.cfg.getProperty("visible")){createUnderlay.call(this);}
else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(onBeforeShow);this._underlayDeferred=true;}}}},configModal:function(type,args,obj){var modal=args[0];if(modal){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);Overlay.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}
this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var oMask=this.mask,oParentNode;if(oMask){this.hideMask();oParentNode=oMask.parentNode;if(oParentNode){oParentNode.removeChild(oMask);}
this.mask=null;}},configKeyListeners:function(type,args,obj){var listeners=args[0],listener,nListeners,i;if(listeners){if(listeners instanceof Array){nListeners=listeners.length;for(i=0;i<nListeners;i++){listener=listeners[i];if(!Config.alreadySubscribed(this.showEvent,listener.enable,listener)){this.showEvent.subscribe(listener.enable,listener,true);}
if(!Config.alreadySubscribed(this.hideEvent,listener.disable,listener)){this.hideEvent.subscribe(listener.disable,listener,true);this.destroyEvent.subscribe(listener.disable,listener,true);}}}else{if(!Config.alreadySubscribed(this.showEvent,listeners.enable,listeners)){this.showEvent.subscribe(listeners.enable,listeners,true);}
if(!Config.alreadySubscribed(this.hideEvent,listeners.disable,listeners)){this.hideEvent.subscribe(listeners.disable,listeners,true);this.destroyEvent.subscribe(listeners.disable,listeners,true);}}}},configHeight:function(type,args,obj){var height=args[0],el=this.innerElement;Dom.setStyle(el,"height",height);this.cfg.refireEvent("iframe");},configWidth:function(type,args,obj){var width=args[0],el=this.innerElement;Dom.setStyle(el,"width",width);this.cfg.refireEvent("iframe");},configzIndex:function(type,args,obj){Panel.superclass.configzIndex.call(this,type,args,obj);var maskZ=0,currentZ=Dom.getStyle(this.element,"zIndex");if(this.mask){if(!currentZ||isNaN(currentZ)){currentZ=0;}
if(currentZ===0){this.cfg.setProperty("zIndex",1);}else{maskZ=currentZ-1;Dom.setStyle(this.mask,"zIndex",maskZ);}}},buildWrapper:function(){var elementParent=this.element.parentNode,originalElement=this.element,wrapper=document.createElement("div");wrapper.className=Panel.CSS_PANEL_CONTAINER;wrapper.id=originalElement.id+"_c";if(elementParent){elementParent.insertBefore(wrapper,originalElement);}
wrapper.appendChild(originalElement);this.element=wrapper;this.innerElement=originalElement;Dom.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var oUnderlay=this.underlay,oElement;if(oUnderlay){oElement=this.element;oUnderlay.style.width=oElement.offsetWidth+"px";oUnderlay.style.height=oElement.offsetHeight+"px";}},registerDragDrop:function(){var me=this;if(this.header){if(!DD){return;}
this.dd=new DD(this.element.id,this.id);if(!this.header.id){this.header.id=this.id+"_h";}
this.dd.startDrag=function(){var offsetHeight,offsetWidth,viewPortWidth,viewPortHeight,scrollX,scrollY,topConstraint,leftConstraint,bottomConstraint,rightConstraint;if(YAHOO.env.ua.ie==6){Dom.addClass(me.element,"drag");}
if(me.cfg.getProperty("constraintoviewport")){offsetHeight=me.element.offsetHeight;offsetWidth=me.element.offsetWidth;viewPortWidth=Dom.getViewportWidth();viewPortHeight=Dom.getViewportHeight();scrollX=Dom.getDocumentScrollLeft();scrollY=Dom.getDocumentScrollTop();topConstraint=scrollY+10;leftConstraint=scrollX+10;bottomConstraint=scrollY+viewPortHeight-offsetHeight-10;rightConstraint=scrollX+viewPortWidth-offsetWidth-10;this.minX=leftConstraint;this.maxX=rightConstraint;this.constrainX=true;this.minY=topConstraint;this.maxY=bottomConstraint;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}
me.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){me.syncPosition();me.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}
me.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){Dom.removeClass(me.element,"drag");}
me.dragEvent.fire("endDrag",arguments);me.moveEvent.fire(me.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var oMask=this.mask;if(!oMask){if(!m_oMaskTemplate){m_oMaskTemplate=document.createElement("div");m_oMaskTemplate.className="mask";m_oMaskTemplate.innerHTML="&#160;";}
oMask=m_oMaskTemplate.cloneNode(true);oMask.id=this.id+"_mask";document.body.insertBefore(oMask,document.body.firstChild);this.mask=oMask;}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";this.hideMaskEvent.fire();Dom.removeClass(document.body,"masked");}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){Dom.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){this.mask.style.height=Dom.getDocumentHeight()+"px";this.mask.style.width=Dom.getDocumentWidth()+"px";}},render:function(appendToNode){return Panel.superclass.render.call(this,appendToNode,this.innerElement);},destroy:function(){Overlay.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){Event.purgeElement(this.close);}
Panel.superclass.destroy.call(this);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(el,userConfig){YAHOO.widget.Dialog.superclass.constructor.call(this,el,userConfig);};var Event=YAHOO.util.Event,CustomEvent=YAHOO.util.CustomEvent,Dom=YAHOO.util.Dom,KeyListener=YAHOO.util.KeyListener,Connect=YAHOO.util.Connect,Dialog=YAHOO.widget.Dialog,Lang=YAHOO.lang,EVENT_TYPES={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},DEFAULT_CONFIG={"POST_METHOD":{key:"postmethod",value:"async"},"BUTTONS":{key:"buttons",value:"none"}};Dialog.CSS_DIALOG="yui-dialog";function removeButtonEventHandlers(){var aButtons=this._aButtons,nButtons,oButton,i;if(Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){i=nButtons-1;do{oButton=aButtons[i];if(oButton instanceof YAHOO.widget.Button){oButton.destroy();}
else if(oButton.tagName.toUpperCase()=="BUTTON"){Event.purgeElement(oButton);Event.purgeElement(oButton,false);}}
while(i--);}}}
YAHOO.extend(Dialog,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){Dialog.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};this.cfg.addProperty(DEFAULT_CONFIG.POST_METHOD.key,{handler:this.configPostMethod,value:DEFAULT_CONFIG.POST_METHOD.value,validator:function(val){if(val!="form"&&val!="async"&&val!="none"&&val!="manual"){return false;}else{return true;}}});this.cfg.addProperty(DEFAULT_CONFIG.BUTTONS.key,{handler:this.configButtons,value:DEFAULT_CONFIG.BUTTONS.value});},initEvents:function(){Dialog.superclass.initEvents.call(this);var SIGNATURE=CustomEvent.LIST;this.beforeSubmitEvent=this.createEvent(EVENT_TYPES.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=SIGNATURE;this.submitEvent=this.createEvent(EVENT_TYPES.SUBMIT);this.submitEvent.signature=SIGNATURE;this.manualSubmitEvent=this.createEvent(EVENT_TYPES.MANUAL_SUBMIT);this.manualSubmitEvent.signature=SIGNATURE;this.asyncSubmitEvent=this.createEvent(EVENT_TYPES.ASYNC_SUBMIT);this.asyncSubmitEvent.signature=SIGNATURE;this.formSubmitEvent=this.createEvent(EVENT_TYPES.FORM_SUBMIT);this.formSubmitEvent.signature=SIGNATURE;this.cancelEvent=this.createEvent(EVENT_TYPES.CANCEL);this.cancelEvent.signature=SIGNATURE;},init:function(el,userConfig){Dialog.superclass.init.call(this,el);this.beforeInitEvent.fire(Dialog);Dom.addClass(this.element,Dialog.CSS_DIALOG);this.cfg.setProperty("visible",false);if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(Dialog);},doSubmit:function(){var oForm=this.form,bUseFileUpload=false,bUseSecureFileUpload=false,aElements,nElements,i,sMethod;switch(this.cfg.getProperty("postmethod")){case"async":aElements=oForm.elements;nElements=aElements.length;if(nElements>0){i=nElements-1;do{if(aElements[i].type=="file"){bUseFileUpload=true;break;}}
while(i--);}
if(bUseFileUpload&&YAHOO.env.ua.ie&&this.isSecure){bUseSecureFileUpload=true;}
sMethod=(oForm.getAttribute("method")||"POST").toUpperCase();Connect.setForm(oForm,bUseFileUpload,bUseSecureFileUpload);Connect.asyncRequest(sMethod,oForm.getAttribute("action"),this.callback);this.asyncSubmitEvent.fire();break;case"form":oForm.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},registerForm:function(){var form=this.element.getElementsByTagName("form")[0],me=this,firstElement,lastElement;if(this.form){if(this.form==form&&Dom.isAncestor(this.element,this.form)){return;}
else{Event.purgeElement(this.form);this.form=null;}}
if(!form){form=document.createElement("form");form.name="frm_"+this.id;this.body.appendChild(form);}
if(form){this.form=form;Event.on(form,"submit",function(e){Event.stopEvent(e);this.submit();this.form.blur();});this.firstFormElement=function(){var f,el,nElements=form.elements.length;for(f=0;f<nElements;f++){el=form.elements[f];if(el.focus&&!el.disabled&&el.type!="hidden"){return el;}}
return null;}();this.lastFormElement=function(){var f,el,nElements=form.elements.length;for(f=nElements-1;f>=0;f--){el=form.elements[f];if(el.focus&&!el.disabled&&el.type!="hidden"){return el;}}
return null;}();if(this.cfg.getProperty("modal")){firstElement=this.firstFormElement||this.firstButton;if(firstElement){this.preventBackTab=new KeyListener(firstElement,{shift:true,keys:9},{fn:me.focusLast,scope:me,correctScope:true});this.showEvent.subscribe(this.preventBackTab.enable,this.preventBackTab,true);this.hideEvent.subscribe(this.preventBackTab.disable,this.preventBackTab,true);}
lastElement=this.lastButton||this.lastFormElement;if(lastElement){this.preventTabOut=new KeyListener(lastElement,{shift:false,keys:9},{fn:me.focusFirst,scope:me,correctScope:true});this.showEvent.subscribe(this.preventTabOut.enable,this.preventTabOut,true);this.hideEvent.subscribe(this.preventTabOut.disable,this.preventTabOut,true);}}}},configClose:function(type,args,obj){var val=args[0];function doCancel(e,obj){obj.cancel();}
if(val){if(!this.close){this.close=document.createElement("div");Dom.addClass(this.close,"container-close");this.close.innerHTML="&#160;";this.innerElement.appendChild(this.close);Event.on(this.close,"click",doCancel,this);}else{this.close.style.display="block";}}else{if(this.close){this.close.style.display="none";}}},configButtons:function(type,args,obj){var Button=YAHOO.widget.Button,aButtons=args[0],oInnerElement=this.innerElement,oButton,oButtonEl,oYUIButton,nButtons,oSpan,oFooter,i;removeButtonEventHandlers.call(this);this._aButtons=null;if(Lang.isArray(aButtons)){oSpan=document.createElement("span");oSpan.className="button-group";nButtons=aButtons.length;this._aButtons=[];for(i=0;i<nButtons;i++){oButton=aButtons[i];if(Button){oYUIButton=new Button({label:oButton.text,container:oSpan});oButtonEl=oYUIButton.get("element");if(oButton.isDefault){oYUIButton.addClass("default");this.defaultHtmlButton=oButtonEl;}
if(Lang.isFunction(oButton.handler)){oYUIButton.set("onclick",{fn:oButton.handler,obj:this,scope:this});}
else if(Lang.isObject(oButton.handler)&&Lang.isFunction(oButton.handler.fn)){oYUIButton.set("onclick",{fn:oButton.handler.fn,obj:((!Lang.isUndefined(oButton.handler.obj))?oButton.handler.obj:this),scope:(oButton.handler.scope||this)});}
this._aButtons[this._aButtons.length]=oYUIButton;}
else{oButtonEl=document.createElement("button");oButtonEl.setAttribute("type","button");if(oButton.isDefault){oButtonEl.className="default";this.defaultHtmlButton=oButtonEl;}
oButtonEl.innerHTML=oButton.text;if(Lang.isFunction(oButton.handler)){Event.on(oButtonEl,"click",oButton.handler,this,true);}
else if(Lang.isObject(oButton.handler)&&Lang.isFunction(oButton.handler.fn)){Event.on(oButtonEl,"click",oButton.handler.fn,((!Lang.isUndefined(oButton.handler.obj))?oButton.handler.obj:this),(oButton.handler.scope||this));}
oSpan.appendChild(oButtonEl);this._aButtons[this._aButtons.length]=oButtonEl;}
oButton.htmlButton=oButtonEl;if(i===0){this.firstButton=oButtonEl;}
if(i==(nButtons-1)){this.lastButton=oButtonEl;}}
this.setFooter(oSpan);oFooter=this.footer;if(Dom.inDocument(this.element)&&!Dom.isAncestor(oInnerElement,oFooter)){oInnerElement.appendChild(oFooter);}
this.buttonSpan=oSpan;}else{oSpan=this.buttonSpan;oFooter=this.footer;if(oSpan&&oFooter){oFooter.removeChild(oSpan);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}
this.cfg.refireEvent("iframe");this.cfg.refireEvent("underlay");},getButtons:function(){var aButtons=this._aButtons;if(aButtons){return aButtons;}},focusFirst:function(type,args,obj){var oElement=this.firstFormElement,oEvent;if(args){oEvent=args[1];if(oEvent){Event.stopEvent(oEvent);}}
if(oElement){try{oElement.focus();}
catch(oException){}}else{this.focusDefaultButton();}},focusLast:function(type,args,obj){var aButtons=this.cfg.getProperty("buttons"),oElement=this.lastFormElement,oEvent;if(args){oEvent=args[1];if(oEvent){Event.stopEvent(oEvent);}}
if(aButtons&&Lang.isArray(aButtons)){this.focusLastButton();}else{if(oElement){try{oElement.focus();}
catch(oException){}}}},focusDefaultButton:function(){var oElement=this.defaultHtmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}},blurButtons:function(){var aButtons=this.cfg.getProperty("buttons"),nButtons,oButton,oElement,i;if(aButtons&&Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){i=(nButtons-1);do{oButton=aButtons[i];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.blur();}
catch(oException){}}}}
while(i--);}}},focusFirstButton:function(){var aButtons=this.cfg.getProperty("buttons"),oButton,oElement;if(aButtons&&Lang.isArray(aButtons)){oButton=aButtons[0];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}}}},focusLastButton:function(){var aButtons=this.cfg.getProperty("buttons"),nButtons,oButton,oElement;if(aButtons&&Lang.isArray(aButtons)){nButtons=aButtons.length;if(nButtons>0){oButton=aButtons[(nButtons-1)];if(oButton){oElement=oButton.htmlButton;if(oElement){try{oElement.focus();}
catch(oException){}}}}}},configPostMethod:function(type,args,obj){var postmethod=args[0];this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){this.beforeSubmitEvent.fire();this.doSubmit();this.submitEvent.fire();this.hide();return true;}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var oForm=this.form,aElements,nTotalElements,oData,sName,oElement,nElements,sType,sTagName,aOptions,nOptions,aValues,oOption,sValue,oRadio,oCheckbox,i,n;function isFormElement(p_oElement){var sTag=p_oElement.tagName.toUpperCase();return((sTag=="INPUT"||sTag=="TEXTAREA"||sTag=="SELECT")&&p_oElement.name==sName);}
if(oForm){aElements=oForm.elements;nTotalElements=aElements.length;oData={};for(i=0;i<nTotalElements;i++){sName=aElements[i].name;oElement=Dom.getElementsBy(isFormElement,"*",oForm);nElements=oElement.length;if(nElements>0){if(nElements==1){oElement=oElement[0];sType=oElement.type;sTagName=oElement.tagName.toUpperCase();switch(sTagName){case"INPUT":if(sType=="checkbox"){oData[sName]=oElement.checked;}
else if(sType!="radio"){oData[sName]=oElement.value;}
break;case"TEXTAREA":oData[sName]=oElement.value;break;case"SELECT":aOptions=oElement.options;nOptions=aOptions.length;aValues=[];for(n=0;n<nOptions;n++){oOption=aOptions[n];if(oOption.selected){sValue=oOption.value;if(!sValue||sValue===""){sValue=oOption.text;}
aValues[aValues.length]=sValue;}}
oData[sName]=aValues;break;}}
else{sType=oElement[0].type;switch(sType){case"radio":for(n=0;n<nElements;n++){oRadio=oElement[n];if(oRadio.checked){oData[sName]=oRadio.value;break;}}
break;case"checkbox":aValues=[];for(n=0;n<nElements;n++){oCheckbox=oElement[n];if(oCheckbox.checked){aValues[aValues.length]=oCheckbox.value;}}
oData[sName]=aValues;break;}}}}}
return oData;},destroy:function(){removeButtonEventHandlers.call(this);this._aButtons=null;var aForms=this.element.getElementsByTagName("form"),oForm;if(aForms.length>0){oForm=aForms[0];if(oForm){Event.purgeElement(oForm);this.body.removeChild(oForm);this.form=null;}}
Dialog.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());(function(){YAHOO.widget.SimpleDialog=function(el,userConfig){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,el,userConfig);};var Dom=YAHOO.util.Dom,SimpleDialog=YAHOO.widget.SimpleDialog,DEFAULT_CONFIG={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};SimpleDialog.ICON_BLOCK="blckicon";SimpleDialog.ICON_ALARM="alrticon";SimpleDialog.ICON_HELP="hlpicon";SimpleDialog.ICON_INFO="infoicon";SimpleDialog.ICON_WARN="warnicon";SimpleDialog.ICON_TIP="tipicon";SimpleDialog.ICON_CSS_CLASSNAME="yui-icon";SimpleDialog.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(SimpleDialog,YAHOO.widget.Dialog,{initDefaultConfig:function(){SimpleDialog.superclass.initDefaultConfig.call(this);this.cfg.addProperty(DEFAULT_CONFIG.ICON.key,{handler:this.configIcon,value:DEFAULT_CONFIG.ICON.value,suppressEvent:DEFAULT_CONFIG.ICON.suppressEvent});this.cfg.addProperty(DEFAULT_CONFIG.TEXT.key,{handler:this.configText,value:DEFAULT_CONFIG.TEXT.value,suppressEvent:DEFAULT_CONFIG.TEXT.suppressEvent,supercedes:DEFAULT_CONFIG.TEXT.supercedes});},init:function(el,userConfig){SimpleDialog.superclass.init.call(this,el);this.beforeInitEvent.fire(SimpleDialog);Dom.addClass(this.element,SimpleDialog.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(userConfig){this.cfg.applyConfig(userConfig,true);}
this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(SimpleDialog);},registerForm:function(){SimpleDialog.superclass.registerForm.call(this);this.form.innerHTML+="<input type=\"hidden\" name=\""+
this.id+"\" value=\"\"/>";},configIcon:function(type,args,obj){var sIcon=args[0],oBody=this.body,sCSSClass=SimpleDialog.ICON_CSS_CLASSNAME,oIcon,oIconParent;if(sIcon&&sIcon!="none"){oIcon=Dom.getElementsByClassName(sCSSClass,"*",oBody);if(oIcon){oIconParent=oIcon.parentNode;if(oIconParent){oIconParent.removeChild(oIcon);oIcon=null;}}
if(sIcon.indexOf(".")==-1){oIcon=document.createElement("span");oIcon.className=(sCSSClass+" "+sIcon);oIcon.innerHTML="&#160;";}else{oIcon=document.createElement("img");oIcon.src=(this.imageRoot+sIcon);oIcon.className=sCSSClass;}
if(oIcon){oBody.insertBefore(oIcon,oBody.firstChild);}}},configText:function(type,args,obj){var text=args[0];if(text){this.setBody(text);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(overlay,attrIn,attrOut,targetElement,animClass){if(!animClass){animClass=YAHOO.util.Anim;}
this.overlay=overlay;this.attrIn=attrIn;this.attrOut=attrOut;this.targetElement=targetElement||overlay.element;this.animClass=animClass;};var Dom=YAHOO.util.Dom,CustomEvent=YAHOO.util.CustomEvent,Easing=YAHOO.util.Easing,ContainerEffect=YAHOO.widget.ContainerEffect;ContainerEffect.FADE=function(overlay,dur){var fade=new ContainerEffect(overlay,{attributes:{opacity:{from:0,to:1}},duration:dur,method:Easing.easeIn},{attributes:{opacity:{to:0}},duration:dur,method:Easing.easeOut},overlay.element);fade.handleStartAnimateIn=function(type,args,obj){Dom.addClass(obj.overlay.element,"hide-select");if(!obj.overlay.underlay){obj.overlay.cfg.refireEvent("underlay");}
if(obj.overlay.underlay){obj.initialUnderlayOpacity=Dom.getStyle(obj.overlay.underlay,"opacity");obj.overlay.underlay.style.filter=null;}
Dom.setStyle(obj.overlay.element,"visibility","visible");Dom.setStyle(obj.overlay.element,"opacity",0);};fade.handleCompleteAnimateIn=function(type,args,obj){Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
if(obj.overlay.underlay){Dom.setStyle(obj.overlay.underlay,"opacity",obj.initialUnderlayOpacity);}
obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};fade.handleStartAnimateOut=function(type,args,obj){Dom.addClass(obj.overlay.element,"hide-select");if(obj.overlay.underlay){obj.overlay.underlay.style.filter=null;}};fade.handleCompleteAnimateOut=function(type,args,obj){Dom.removeClass(obj.overlay.element,"hide-select");if(obj.overlay.element.style.filter){obj.overlay.element.style.filter=null;}
Dom.setStyle(obj.overlay.element,"visibility","hidden");Dom.setStyle(obj.overlay.element,"opacity",1);obj.overlay.cfg.refireEvent("iframe");obj.animateOutCompleteEvent.fire();};fade.init();return fade;};ContainerEffect.SLIDE=function(overlay,dur){var x=overlay.cfg.getProperty("x")||Dom.getX(overlay.element),y=overlay.cfg.getProperty("y")||Dom.getY(overlay.element),clientWidth=Dom.getClientWidth(),offsetWidth=overlay.element.offsetWidth,slide=new ContainerEffect(overlay,{attributes:{points:{to:[x,y]}},duration:dur,method:Easing.easeIn},{attributes:{points:{to:[(clientWidth+25),y]}},duration:dur,method:Easing.easeOut},overlay.element,YAHOO.util.Motion);slide.handleStartAnimateIn=function(type,args,obj){obj.overlay.element.style.left=((-25)-offsetWidth)+"px";obj.overlay.element.style.top=y+"px";};slide.handleTweenAnimateIn=function(type,args,obj){var pos=Dom.getXY(obj.overlay.element),currentX=pos[0],currentY=pos[1];if(Dom.getStyle(obj.overlay.element,"visibility")=="hidden"&&currentX<x){Dom.setStyle(obj.overlay.element,"visibility","visible");}
obj.overlay.cfg.setProperty("xy",[currentX,currentY],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateIn=function(type,args,obj){obj.overlay.cfg.setProperty("xy",[x,y],true);obj.startX=x;obj.startY=y;obj.overlay.cfg.refireEvent("iframe");obj.animateInCompleteEvent.fire();};slide.handleStartAnimateOut=function(type,args,obj){var vw=Dom.getViewportWidth(),pos=Dom.getXY(obj.overlay.element),yso=pos[1],currentTo=obj.animOut.attributes.points.to;obj.animOut.attributes.points.to=[(vw+25),yso];};slide.handleTweenAnimateOut=function(type,args,obj){var pos=Dom.getXY(obj.overlay.element),xto=pos[0],yto=pos[1];obj.overlay.cfg.setProperty("xy",[xto,yto],true);obj.overlay.cfg.refireEvent("iframe");};slide.handleCompleteAnimateOut=function(type,args,obj){Dom.setStyle(obj.overlay.element,"visibility","hidden");obj.overlay.cfg.setProperty("xy",[x,y]);obj.animateOutCompleteEvent.fire();};slide.init();return slide;};ContainerEffect.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=CustomEvent.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=CustomEvent.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=CustomEvent.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=CustomEvent.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(type,args,obj){},handleTweenAnimateIn:function(type,args,obj){},handleCompleteAnimateIn:function(type,args,obj){},handleStartAnimateOut:function(type,args,obj){},handleTweenAnimateOut:function(type,args,obj){},handleCompleteAnimateOut:function(type,args,obj){},toString:function(){var output="ContainerEffect";if(this.overlay){output+=" ["+this.overlay.toString()+"]";}
return output;}};YAHOO.lang.augmentProto(ContainerEffect,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.3.0",build:"442"});		
function resourceStack(config) {
	if(typeof config == "undefined") {
		alert("fatal error in resourceStack - no object!");
		}
	if(typeof config['container'] == "undefined") {
		alert("fatal error in resourceStack - container element not defined!");
		}
	if(typeof config['resourceicon'] == "undefined") {
		alert("fatal error in resourceStack - icon element not defined!");
		}
	if(typeof config['value'] == "undefined") {
		config['value']=0;
		}
	var container = Dom.get(config['container']);
	var icon = Dom.get(config['resourceicon']);
	icon = container.removeChild(icon);
	var iniValue = config['value'];
	if(typeof config['width'] == "undefined") {
		config['width'] = Dom.getStyle(container, "width") ;
		}
	var containerwidth = config['width'];
	
	var icons = new Array();
	
	var addIcon = function() {
		var e = icon.cloneNode(true);
		e.id ="";
		container.appendChild(e);
		icons.push(e);
		return e;
		}
	var removeIcon = function() {
		var e = icons[icons.length-1]
		container.removeChild(e);
		icons.pop();
		return e;
		}
	
	this.setIcons = function(numIcons) {
		if (numIcons==icons.length) return true; // no change required
		while (icons.length > numIcons) { //If too many, cut till fit
			removeIcon();
		}
		
		
		for(i=0;i<numIcons;i++) {
			if(icons.length-1 < i) {
				addIcon();
				}
				
/* RECHNUNG		*/
			var pos=0;
			var overlap = icon.width*numIcons-containerwidth;
			if( overlap <=  0) {
				pos=0;
				}
			else {
				pos=overlap/(numIcons-1);
				if((pos%1) != 0) {
					var roundingInterval=(numIcons-1)/Math.round((pos%1)*(numIcons-1));
					if(Math.floor((i-1)%roundingInterval) == 0) { pos=Math.ceil(pos); } else { pos=Math.floor(pos); }
				}
			}
			if(i >0) {
				Dom.setStyle(icons[i], "margin-left", -pos+"px");
				}
			}
		}
	}
/**
* new Number format
**/
/*
function jsLocaNumberFormat (number, to)
{
  switch (LocalizationStrings['language'])
    {
        case 'de':
            return number_format(number, to, ',', '.');
             break;
        case 'en':
           return number_format(number, to, '.', ',');
             break;
        default:
            return number_format(number,to, ',', ' ');
            break;
    }
  return number;
} */
/**
 *  returns a formated number like php number_format()
 *
 * @see http://de3.php.net/number_format
 */
function number_format (number, decimals, dec_point, thousands_sep)
{
  dec_point      = LocalizationStrings['decimalPoint'];
  thousands_sep  = LocalizationStrings['thousandSeperator'];

  var exponent = "";
  var numberstr = number.toString ();
  var eindex = numberstr.indexOf ("e");
  if (eindex > -1)
  {
    exponent = numberstr.substring (eindex);
    number = parseFloat (numberstr.substring (0, eindex));
  }

  if (decimals != null)
  {
    var temp = Math.pow (10, decimals);
    number = Math.round (number * temp) / temp;
  }
  var sign = number < 0 ? "-" : "";
  var integer = (number > 0 ?
      Math.floor (number) : Math.abs (Math.ceil (number))).toString ();

  var fractional = number.toString ().substring (integer.length + sign.length);
  dec_point = dec_point != null ? dec_point : ".";
  fractional = decimals != null && decimals > 0 || fractional.length > 1 ?
               (dec_point + fractional.substring (1)) : "";
  if (decimals != null && decimals > 0)
  {
    for (i = fractional.length - 1, z = decimals; i < z; ++i)
      fractional += "0";
  }

  thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ?
                  thousands_sep : null;
  if (thousands_sep != null && thousands_sep != "")
  {
    for (i = integer.length - 3; i > 0; i -= 3)
      integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
  }

  return sign + integer + fractional + exponent;
}

/**
 * adds prefix digits to a number ('2'->'02')
 *
 * @param int   number
 * @param int   digits
 * @param str   prefix, default is '0'
 */
function dezInt(num,size,prefix) {
    prefix=(prefix)?prefix:"0";
    var minus=(num<0)?"-":"",
    result=(prefix=="0")?minus:"";
    num=Math.abs(parseInt(num,10));
    size-=(""+num).length;
    for(var i=1;i<=size;i++) {
        result+=""+prefix;
    }
    result+=((prefix!="0")?minus:"")+num;
    return result;
}


