(function(){mstrmojo.requiresCls("mstrmojo.Widget","mstrmojo.dom","mstrmojo.hash","mstrmojo.css");var $DOM=mstrmojo.dom,$HASH=mstrmojo.hash,$CSS=mstrmojo.css;mstrmojo.Button=mstrmojo.declare(mstrmojo.Widget,null,{scriptClass:"mstrmojo.Button",iconClass:"",innerIconClass:"",title:"",text:"&nbsp;",enabled:true,selected:false,markupString:'<div id="{@id}" class="mstrmojo-Button {@cssClass} {@iconClass}" title="{@title}" style="{@cssText}" mstrAttach:touchstart,click,mousedown,mouseup><div class="mstrmojo-Button-text {@innerIconClass}"></div></div>',markupSlots:{textNode:function(){return this.domNode.firstChild;}},markupMethods:{onvisibleChange:mstrmojo.Widget.visibleMarkupMethod,onenabledChange:function(){$CSS.toggleClass(this.domNode,"disabled",!this.enabled);},onselectedChange:function(){$CSS.toggleClass(this.domNode,"selected",this.selected);},ontextChange:function(){this.textNode.innerHTML=this.text;},ontitleChange:function(){this.domNode.title=this.title;},onwidthChange:mstrmojo.Widget.widthMarkupMethod},oniconClassChange:function oniconClassChange(evt){var domNode=this.domNode;if(this.hasRendered&&domNode){domNode.className=domNode.className.replace(evt.valueWas,"")+" "+evt.value;}},onclick:mstrmojo.emptyFn,ontouchend:function ontouchend(evt){this.onclick(evt);}});mstrmojo.Button.newIconButton=function newIconButton(t,c,fn,b,ps){var btn={scriptClass:"mstrmojo.Button",title:t,cssClass:c,text:"",onclick:fn};if(b){btn.bindings=b;}$HASH.copy(ps,btn);return btn;};function newButtonConfigHelper(t,fn,cssClass,buttonProps){var classes=[];if(cssClass){classes.push(cssClass);}var cssClassProp=buttonProps&&buttonProps.cssClass;if(cssClassProp){classes.push(cssClassProp);delete buttonProps.cssClass;}var btn={scriptClass:"mstrmojo.Button",cssClass:classes.join(" "),text:t};if(fn){btn.onclick=fn;}return $HASH.copy(buttonProps,btn);}mstrmojo.Button.newInteractiveButton=function newInteractiveButton(t,fn,haloColor,ps){var btn={glowClass:"glow"};if(haloColor&&($DOM.isFF||$DOM.isWK)){$HASH.copy({onmousedown:function onmousedown(){$CSS.applyShadow(this.domNode,0,0,10,haloColor);},onmouseup:function onmouseup(){$CSS.removeShadow(this.domNode);}},btn);}return newButtonConfigHelper(t,fn,"mstrmojo-InteractiveButton",$HASH.copy(ps,btn));};mstrmojo.Button.newWebButton=function newWebButton(text,fn,isHotButton,buttonProps){return newButtonConfigHelper(text,fn,"mstrmojo-WebButton"+(isHotButton?" hot":""),buttonProps);};mstrmojo.Button.newActionButton=function(t,fn,buttonProps){var btn=mstrmojo.Button.newWebButton(t,fn,false,buttonProps);btn.cssClass=btn.cssClass+" action-button";return btn;};}());