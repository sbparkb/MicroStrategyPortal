(function(){mstrmojo.requiresCls("mstrmojo.css");var $CSS=mstrmojo.css;mstrmojo._HasLassoSelector=mstrmojo.provide("mstrmojo._HasLassoSelector",{_mixinName:"mstrmojo._HasLassoSelector",draggable:true,ownAvatar:true,lassoDiv:undefined,ondragstart:function ondragstart(context){var lassoDiv=this.lassoDiv=document.createElement("div");$CSS.addClass(lassoDiv,"lassoDiv");this.containerNode.appendChild(lassoDiv);this.resizeLasso(context);if(this._super){this._super(context);}},ondragmove:function ondragmove(evt){this.resizeLasso(evt);if(this._super){this._super(evt);}},ondragend:function ondragend(evt){var lassoDiv=this.lassoDiv;if(lassoDiv){lassoDiv.parentNode.removeChild(lassoDiv);delete this.lassoDiv;}if(this._super){this._super(evt);}},resizeLasso:function resizeLasso(evt){var lassoDiv=this.lassoDiv,containerPos=mstrmojo.dom.position(this.containerNode),lds=lassoDiv.style,targetPos=evt.tgt,sourceX=evt.src.pos.x,sourceY=evt.src.pos.y,targetY=(targetPos&&targetPos.pos.y)||sourceY,targetX=(targetPos&&targetPos.pos.x)||sourceX,boundingBox={x:(Math.min(sourceX,targetX)-containerPos.x),y:(Math.min(sourceY,targetY)-containerPos.y),h:(targetPos?Math.abs(targetY-sourceY):0),w:(targetPos?Math.abs(targetX-sourceX):0)};lds.left=boundingBox.x+"px";lds.top=boundingBox.y+"px";lds.height=boundingBox.h+"px";lds.width=boundingBox.w+"px";this.onSelectedBoundingBox(boundingBox);},onSelectedBoundingBox:mstrmojo.emptyFn});}());