(function(){mstrmojo.requiresCls("mstrmojo.Container","mstrmojo.css");var C_PREFIX="",R_PREFIX="row-",TABLE=mstrmojo.css.DISPLAY_TABLE;mstrmojo.Table=mstrmojo.declare(mstrmojo.Container,null,{scriptClass:"mstrmojo.Table",cellCssClass:"",rows:-1,cols:-1,_trows:-1,cellPadding:0,cellSpacing:0,layout:null,markupString:'<table id="{@id}" class="mstrmojo-Table {@cssClass}" style="{@cssText}" cellpadding="{@cellPadding}" cellspacing="{@cellSpacing}">{@tableHtml}</table>',markupSlots:{containerNode:function(){return this.domNode;}},markupMethods:{onvisibleChange:function(){this.domNode.style.display=this.visible?TABLE:"none";}},preBuildRendering:function preBR(){var rs=[],ccc=this.cellCssClass;if(this.layout){var rlen=this._trows=this.layout.length;for(var i=0;i<rlen;i++){var r=this.layout[i],cells=r.cells,clen=cells.length,cs=[];for(var j=0;j<clen;j++){var c=cells[j],att="";att+=((c.cssClass||ccc)?' class="'+(c.cssClass||ccc)+'"':"");att+=(c.cssText?' style="'+c.cssText+'"':"");att+=(c.rowSpan?' rowspan="'+c.rowSpan+'"':"");att+=(c.colSpan?' colspan="'+c.colSpan+'"':"");cs[j]="<td"+att+"></td>";}var rAtt="";rAtt+=(r.cssClass?' class="'+r.cssClass+'"':"");rAtt+=(r.cssText?' style="'+r.cssText+'"':"");rs[i]="<tr"+rAtt+">"+cs.join("")+"</tr>";}}else{this._trows=this.rows;var att=(ccc?' class="'+ccc+'"':""),cs=[];for(var i=0;i<this.rows;i++){for(var j=0;j<this.cols;j++){cs[j]="<td"+att+"></td>";}rs[i]="<tr>"+cs.join("")+"</tr>";}}this.tableHtml=rs.join("");if(this._super){this._super();}},postBuildRendering:function postBuildRendering(){if(this._trows){var slots={},trs=this.containerNode.rows,rlen=trs.length;for(var i=0;i<rlen;i++){var cells=trs[i].cells,clen=cells.length;slots[R_PREFIX+i]=trs[i];for(var j=0;j<clen;j++){slots[C_PREFIX+i+","+j]=cells[j];}}this.addSlots(slots);}this._super();},childRenderCheck:function childRndrChk(child){if(child&&!child.hasRendered){var slotName=child.slot||this.defaultChildSlot;return !!this[slotName]||slotName.match(/^([\d]+),([\d]+)$/);}return false;},on_child_change_rendering:function onChldChngRndr(obj){var child=(obj&&obj.src)||obj,d=child&&child.domNode;if(d){var s=child.slot;if(!this[s]){var match=s&&s.match(/^([\d]+),([\d]+)$/);if(match){var ri=parseInt(match[1],10),ci=parseInt(match[2],10),cn=this.containerNode,rslot=this[(R_PREFIX+ri)],slots=[];if(!rslot){var rs=cn.rows,rlen=rs&&rs.length||0;for(var i=rlen;i<=ri;i++){slots[R_PREFIX+i]=cn.insertRow();}rslot=slots[R_PREFIX+ri];}var cLen=rslot.cells&&rslot.cells.length||0;for(var i=cLen;i<=ci;i++){var td=rslot.insertCell(i);slots[C_PREFIX+ri+","+i]=td;if(this.cellCssClass){td.className=this.cellCssClass;}}this.addSlots(slots);}}}this._super(obj);}});})();