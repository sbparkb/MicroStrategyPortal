(function(){mstrmojo.requiresCls("mstrmojo._HasLayout","mstrmojo.Box","mstrmojo.css","mstrmojo.HBox","mstrmojo.string","mstrmojo.TextBox");var $CSS=mstrmojo.css,$DOM=mstrmojo.dom,STR_UPDATE_TABLES=mstrmojo.desc(505,"Update"),CLEAR_ICON_CSS_CLASS="clear";mstrmojo.warehouse.ui.SearchBox=mstrmojo.declare(mstrmojo.Box,null,{scriptClass:"mstrmojo.warehouse.ui.SearchBox",cssClass:"mstrmojo-wh-SearchBox",tableBox:undefined,inputBox:undefined,clearBtn:undefined,refreshBtn:undefined,children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-wh-SearchBox-contents",alias:"tableBox",children:[{scriptClass:"mstrmojo.TextBox",cssClass:"mstrmojo-wh-sb-input",alias:"inputBox",oldText:"",onkeydown:function onkeydown(){this.oldText=this.value;},onkeyup:function onkeyup(){var $this=this,input=this.value,clearBtn=this.parent.clearBtn,timeoutId=this._searchTimeoutId,hasText=this._hasText=input.length>0;if(this.oldText!==input){$CSS.toggleClass(clearBtn.domNode,[CLEAR_ICON_CSS_CLASS],hasText);window.clearTimeout(timeoutId);this._searchTimeoutId=window.setTimeout(function(){$this.parent.parent.triggerSearch();},this.searchDelay);}}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-sb-btn",alias:"clearBtn",onclick:function onclick(){var p=this.parent;if(p.inputBox._hasText){p.parent.clearSearch();}else{p.parent.triggerSearch();}}},{scriptClass:"mstrmojo.Label",cssClass:"mstrmojo-wh-sb-refresh",alias:"refreshBtn",visible:false,onclick:function onclick(){if(this.parent.parent._onRefresh){this.parent.parent._onRefresh();}},title:STR_UPDATE_TABLES,tooltipOpenDelay:0,useRichTooltip:true,updateTooltipConfig:function(){var pos=$DOM.position(this.domNode);this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-A",top:Math.max(pos.y+40,0),left:Math.max(pos.x+2,0),posType:mstrmojo.tooltip.POS_TOPLEFT,content:this.title});}}]}],title:"",tooltipOpenDelay:0,useRichTooltip:true,_preSearch:undefined,_onRefresh:undefined,searchDelay:-1,init:function init(props){this._super(props);var searchDelay=this.searchDelay;if(searchDelay===-1||isNaN(searchDelay)){this.searchDelay=parseInt(mstrApp.getSearchAutoCompleteDelay(),10);}},postBuildRendering:function postBuildRendering(){this._super();this.tableBox.inputBox.domNode.maxLength=248;this.tableBox.inputBox.value="";},clearSearch:function clearSearch(avoidTrigger){if(!this.hasRendered){return ;}this.tableBox.inputBox.set("value","");$CSS.removeClass(this.tableBox.clearBtn.domNode,[CLEAR_ICON_CSS_CLASS]);delete this.tableBox.inputBox._hasText;if(!avoidTrigger){this.triggerSearch();}},triggerSearch:function triggerSearch(){var canSearch=true;if(this._preSearch){canSearch=this._preSearch();}if(canSearch){this.raiseEvent({name:"searchTriggered",searchValue:mstrmojo.string.trim(this.tableBox.inputBox.value)});}},showTooltip:function showTooltip(e,win){var me=this,t=$DOM.findAncestorByAttr($DOM.eventTarget(win,e),"tooltip",true,this.domNode),content=t&&t.value;if(!me.hasOpenTooltip&&content){var position=$DOM.position(t.node);me.richTooltip={cssClass:"vi-regular vi-tooltip-A",content:content,top:Math.max(position.y+40,0),left:Math.max(position.x+2,0),posType:mstrmojo.tooltip.POS_TOPLEFT};this._super(e,win);}}});}());