(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.dom","mstrmojo.css");var _C=mstrmojo.css;var _D=mstrmojo.dom;function _createAvatar(w){var d=document.createElement("div"),s=d.style,dn=w.domNode;d.className="mstrmojo-qb-SplitPanel-avatar";s.height=dn.clientHeight+"px";dn.appendChild(d);w.avatar=d;return d;}mstrmojo.qb.SplitPanel=mstrmojo.declare(mstrmojo.Container,[mstrmojo._HasLayout],{scriptClass:"mstrmojo.qb.SplitPanel",draggable:true,dropZone:false,marginSpan:10,minSpan:200,leftItemVisible:true,rightItemVisible:true,lp:25,markupString:'<div id="{@id}" class="mstrmojo-SplitPanel {@cssClass}" style="{@cssText}" ><table cellpadding=0 cellspacing=0><tr><td><div></div></td><td style="padding-left:{@marginSpan}px;"><div class="mstrmojo-qb-SplitPanel-resizeHandle" style="height:{@height};width:{@marginSpan}px;margin-left:-{@marginSpan}px;" ></div><div></div></td></tr></table></div>',markupSlots:{leftItem:function(){return this.domNode.firstChild.firstChild.firstChild.firstChild.firstChild;},rightItem:function(){return this.domNode.firstChild.firstChild.firstChild.children[1].children[1];}},getDragData:function getDragData(ctxt){var s=ctxt.src,n=s.node;if(n.className&&n.className.indexOf("mstrmojo-qb-SplitPanel-resizeHandle")>=0){var pos=_D.position(this.domNode);return{node:n,x:pos.x,y:pos.y,w:pos.w,h:pos.h};}else{if(this._super){return this.dropZone&&this._super(ctxt);}}return null;},allowDrop:function allowDrop(ctxt){var s=ctxt.src,d=s&&s.data;if(d&&d.node){return true;}else{return this.dropZone;}},ondragmove:function odm(ctxt){var s=ctxt.src,d=s&&s.data;if(d&&d.node){var t=ctxt.tgt,av=this.avatar;if(av){av.style.left=Math.min(Math.max(d.x+this.minSpan,t.pos.x),d.x+d.w-this.minSpan)+"px";}}},isDragValid:function isDragValid(context){var s=context.src,d=s&&s.data;return !!(d&&d.node);},ondragstart:function ondragstart(context){var s=context.src,d=s&&s.data;var av=this.avatar||_createAvatar(this);this.ownAvatar=true;av.style.left=s.pos.x+"px";av.style.top=d.y+"px";av.style.display="block";av.style.zIndex="9999";av.style.height=d.h+"px";},ondragend:function ondragend(ctxt){var s=ctxt.src,d=s&&s.data;if(d&&d.node){var av=this.avatar;if(av){av.style.display="none";var deltaX=parseInt(av.style.left)-d.x-this.marginSpan/2,wid=this.domNode.clientWidth;this.lp=deltaX*100/wid;this.layoutConfig.w={leftItem:this.lp+"%",rightItem:100-this.lp+"%"};this.doLayout();}this.ownAvatar=false;}},children:[{scripClass:"mstrmojo.Box",slot:"leftItem"},{scripClass:"mstrmojo.Box",slot:"rightItem"}],layoutConfig:{w:{leftItem:"20%",rightItem:"80%"},h:{leftItem:"100%",rightItem:"100%"}},afterLayout:function(){if(this.domNode){var st=this.domNode.firstChild.firstChild.firstChild.children[1].children[0].style;if(this.leftItemVisible&&this.rightItemVisible){st.display="block";this.children[0].set("visible",true);this.children[1].set("visible",true);st.height=this.height;var liw=parseInt(this.children[0].width);this.children[0].set("width",liw+"px");this.rightItem.style.width=parseInt(this.width)-liw-this.marginSpan+"px";this.children[1].set("width",this.rightItem.style.width);}else{st.display="none";if(this.leftItemVisible){this.children[0].set("width",this.width);this.children[1].set("visible",false);}else{this.children[1].set("width",this.width);this.children[0].set("visible",false);var td=this.rightItem.parentNode;td.style["padding-left"]="0px";}}}},_set_leftItemVisible:function(n,v){if(this.leftItemVisible!=v){this.leftItemVisible=v;if(v){this.layoutConfig.w={leftItem:this.lp+"%",rightItem:100-this.lp+"%"};if(this.rightItem){var td=this.rightItem.parentNode;td.style["padding-left"]=this.marginSpan+"px";}}else{this.layoutConfig.w={leftItem:"0%",rightItem:"100%"};if(this.rightItem){var td=this.rightItem.parentNode;td.style["padding-left"]="0px";}}this.doLayout();}},_set_rightItemVisible:function(n,v){if(this.rightItemVisible!=v){this.rightItemVisible=v;if(v){this.layoutConfig.w={leftItem:this.lp+"%",rightItem:100-this.lp+"%"};}else{this.layoutConfig.w={leftItem:"100%",rightItem:"0%"};}this.doLayout();}},postBuildRendering:function(){if(this._super){this._super();}this.height=this.domNode.clientHeight+"px";}});})();