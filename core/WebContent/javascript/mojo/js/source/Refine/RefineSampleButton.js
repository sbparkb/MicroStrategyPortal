(function(){mstrmojo.requiresCls("mstrmojo.ui.PopupButton","mstrmojo.ui.PopupWidget","mstrmojo.Tooltip","mstrmojo.Slider","mstrmojo.Refine.SampleSlider","mstrmojo.css");mstrmojo.requiresDescs(1302,547,14703,14697,14697,14699,14700,14701,14702,14704,14724);var $NWB=mstrmojo.Button.newWebButton,$HASH=mstrmojo.hash,$CSS=mstrmojo.css;var FULL_TABLE_SIZE_LABEL=mstrmojo.desc(14697,"Full table size: ### rows"),FULL_TABLE_SIZE_TOOLTIP1=mstrmojo.desc(14698,"Increase the sample size by <br>adding samples randomly <br>from the first 100,000 rows."),FULL_TABLE_SIZE_TOOLTIP2=mstrmojo.desc(14699,"Increase the sample size by <br> adding samples randomly.");function handleClickButtons(isFinish){var ctrl=mstrApp.getRootController(),refineCtrl=ctrl.refineApp.rootController,m=refineCtrl.model,tbid=refineCtrl.tableID,pw=this,value=pw.inputbox.textbox.value,listener=null;value=decomma(pw.inputbox.textbox.value);value=parseInt(value,10);if(isFinish&&!isNaN(value)){if(m.hasUploadData){refineCtrl.setSampleData(value);}else{ctrl.dataService.startRefineStage({success:function(){m.hasUploadData=true;refineCtrl.setSampleData(value);},failure:function(res){ctrl.displayError(res&&res.message);}},{did:tbid,flag:4});}listener=m.attachEventListener("sampleStatusChange",this.id,function(){if(m.sampleStatus.total===1000){this.parent.set("useRichTooltip",true);this.parent.set("enabled",false);$CSS.addClass(this.parent.textNode,"_disable-Button");}else{if(m.sampleStatus.total<=value+1000){ctrl.displayError(mstrmojo.desc(14724,"All data from the source has been added in the data wrangler preview"));}}m.detachEventListener(listener);});}pw.close();}function comma(value){return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,");}function decomma(value){return parseInt(value.toString().replace(/,/g,""),10);}mstrmojo.Refine.RefineSampleButton=mstrmojo.declare(mstrmojo.ui.PopupButton,null,{scriptClass:"mstrmojo.Refine.RefineSampleButton",markupString:'<div id="{@id}" style="{@cssText}" class="mstrmojo-Refine-RefineSampleButton mstrmojo-Button mstrmojo-WebHoverButton {@cssClass}" mstrAttach:mousedown,click><div class="mstrmojo-Refine-RefineSampleButton-text mstrmojo-Button-text" title="{@title}" style="{@labelCssText}">{@text}</div><div class="container"></div></div>',markupSlots:{textNode:function textNode(){return this.domNode.firstChild;},containerNode:function containerNode(){return this.domNode.lastChild;}},text:mstrmojo.desc(14700,"Set Sample Size"),anchorSlot:"textNode",children:[],initChildren:function initChildren(){this.children=this.getPopupWidgetRef();this._super();},getPopupWidget:function(){return this.popupWidget;},onPopupWidgetOpened:function(){var ctrl=mstrApp.getRootController(),refineCtrl=ctrl.refineApp.rootController,m=refineCtrl.model,samples=m.sampleStatus,pw=this.getPopupWidget(),slider_children,current,total,formated_total,text=FULL_TABLE_SIZE_LABEL,visible=true,value=0,i,item_num,item_arr=[],sI={};if(!samples){value=1000;text=mstrmojo.desc(14703,"Full table size calculating...");}else{current=samples.current;total=samples.total;formated_total=comma(total);value=Math.max(current,0);text=(total>=100000)?FULL_TABLE_SIZE_LABEL.replace("###",">= 100,000"):FULL_TABLE_SIZE_LABEL.replace("###",formated_total);}pw.inputbox.textbox.set("value",value);pw.inputbox.textbox.set("max",!total||total>11000?10000:parseInt(total,10)-1000);pw.labelbox.label.set("text",text);pw.labelbox.FTShelp.set("_content",(total>=100000)?FULL_TABLE_SIZE_TOOLTIP1:FULL_TABLE_SIZE_TOOLTIP2);pw.labelbox.set("visible",visible);item_num=!total||(total>11000)?10000:parseInt(total,10)-1000;for(i=0;i<=item_num;i++){item_arr[i]={n:i.toString()};}sI[value]=true;slider_children=[{scriptClass:"mstrmojo.Refine.SampleSlider",cssClass:"_sliderBar",alias:"slider_Bar",isHoriz:true,min:0,max:item_num,items:item_arr,width:"195px",selectedIndices:sI,onchange:function(){var v=this.selectedItem.n;this.parent.parent.inputbox.textbox.set("value",v);}},{scriptClass:"mstrmojo.Box",cssClass:"box _sliderLabel",alias:"slider_lable",children:[{scriptClass:"mstrmojo.Label",alias:"label",text:"0",cssDisplay:"inline-block",cssText:"float:left"},{scriptClass:"mstrmojo.Label",alias:"label",text:comma(item_num),cssDisplay:"inline-block",cssText:"float:right"}]}];pw.slider.set("children",slider_children);},getPopupWidgetRef:function(){return{alias:"popupWidget",scriptClass:"mstrmojo.ui.PopupWidget",visible:false,cssClass:"mstrmojo-Refine-RefineSampleButton-Popup",children:[{scriptClass:"mstrmojo.Box",cssClass:"box border",alias:"inputbox",children:[{scriptClass:"mstrmojo.Label",cssClass:"control",text:mstrmojo.desc(547,"Select"),cssDisplay:"inline-block"},{scriptClass:"mstrmojo.ValidationTextBox",cssClass:"control",alias:"textbox",cssDisplay:"inline-block",value:0,min:0,max:10000,valueChangeDelay:200,_validation:{invalid:true,errorCode:"",errorMsg:"",refNode:"",position:"BL",top:"0",left:"0",lasting:2000,closeOnClick:true,highlight:true},_isValid:true,onvalueChange:function(evt){var value=evt.value.toString().replace(/[^0-9,]/g,"");this.set("value",value);if(this._isValid){var sI={};sI[value]=true;if(this.parent.parent.slider.slider_Bar){this.parent.parent.slider.slider_Bar.set("selectedIndices",sI);}}},onInvalid:function(){this.parent.parent.bottom_buttons.children[0].set("enabled",false);this._validation.refNode=this.domNode;this._validation.errorCode=null;this._validation.errorMsg=this.validationStatus.msg;this._validation.left=this.domNode.offsetWidth-this.domNode.clientWidth;this._validation.top="-"+(parseInt(this.domNode.offsetTop,10)+parseInt(this.domNode.offsetHeight,10)+3);this.showWarning(this._validation);this._isValid=false;},onValid:function(){this.parent.parent.bottom_buttons.children[0].set("enabled",true);this.hideWarning();this._isValid=true;},constraints:{trigger:mstrmojo.validation.TRIGGER.VALUESET,validator:function(v){var min=this.min,max=this.max,isEmpty=$HASH.isEmpty(v),value=decomma(v);if(isEmpty){return{code:mstrmojo.validation.STATUSCODE.INVALID,msg:mstrmojo.desc(14701,"Please input a number.")};}value=parseInt(value,10);if(value>=min&&value<=max){return{code:mstrmojo.validation.STATUSCODE.VALID};}max=comma(max);return{code:mstrmojo.validation.STATUSCODE.INVALID,msg:mstrmojo.desc(14702,"The maxinum is ###").replace("###",max)};},invalidCssClass:"invalid"},autoFormat:false,useRichTooltip:true},{scriptClass:"mstrmojo.Label",cssClass:"control",text:mstrmojo.desc(14704,"rows random data or"),cssDisplay:"inline-block"}]},{scriptClass:"mstrmojo.Box",cssClass:"box border _sliderContainer",alias:"slider",children:[]},{scriptClass:"mstrmojo.Box",cssClass:"box border _FTS",alias:"labelbox",children:[{scriptClass:"mstrmojo.Label",alias:"label",text:FULL_TABLE_SIZE_LABEL,cssDisplay:"inline-block",cssText:"float:left"},{scriptClass:"mstrmojo.Label",alias:"FTShelp",cssClass:"control right pc mstrmojo-refine-help",cssDisplay:"inline-block",cssText:"float:right",useRichTooltip:true,_content:"",updateTooltipConfig:function(){this.set("richTooltip",{cssClass:"vi-regular vi-tooltip-C",refNode:this.domNode,posType:mstrmojo.tooltip.POS_TOPLEFT,left:((parseInt(this.parent.domNode.offsetWidth,10)-parseInt(this.domNode.offsetLeft,10)+3)).toString()+"px",content:this._content});}}]},{scriptClass:"mstrmojo.Box",cssClass:"box",alias:"bottom_buttons",cssDisplay:"inline-block",children:[$NWB(mstrmojo.desc(1302,"Finish"),function(){handleClickButtons.call(this.parent.parent,true);},true,{alias:"finish",cssDisplay:"inline-block"}),$NWB(mstrmojo.desc(2140,"Cancel"),function(){handleClickButtons.call(this.parent.parent,false);},false,{cssDisplay:"inline-block"})]}]};}});}());