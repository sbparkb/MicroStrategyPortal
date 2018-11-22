(function(){mstrmojo.requiresCls("mstrmojo._CanValidate","mstrmojo.num","mstrmojo.hash","mstrmojo.expr","mstrmojo.Table","mstrmojo.Pulldown","mstrmojo.txEditor.CommonComponent","mstrmojo.txEditor.Container","mstrmojo.txEditor.Table");mstrmojo.requiresDescs(527,2069,3691,5258,6076,6079,7899,8263,9904,9905,9906);var _N=mstrmojo.num,_H=mstrmojo.hash,_V=mstrmojo.validation,_TR=_V.TRIGGER,_SC=_V.STATUSCODE,_TC=mstrmojo.txEditor.CommonComponent,_TCLT=_TC.LIST_TYPES,_TCRU=_TC.RW_UNIT_TYPE,_DTP=mstrmojo.expr.DTP;mstrmojo.txEditor.ListPropertiesPanel=mstrmojo.declare(mstrmojo.txEditor.Container,null,{scriptClass:"mstrmojo.txEditor.ListPropertiesPanel",cssClass:"mstrmojo-TransactionEditor-Panel list",refreshChildren:function(){_TC.setChildrenVisibility(this,false);_TC.setChildrenVisibility(this,true);},children:[{scriptClass:"mstrmojo.txEditor.Table",layout:[{cells:[{colSpan:3}]},{cells:[{},{colSpan:2}]},{cells:[{},{colSpan:2}]},{cells:[{},{},{}]}],children:[_TC.createRequiredCheckBox({slot:"0,0"}),_TC.createLabel({slot:"1,0",cssClass:"mstrmojo-TransactionEditor-Label list"},mstrmojo.desc(5258)),{slot:"1,1",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,defaultText:" ",defaultSelection:-1,itemIdField:"st",getVisibility:function(){var tp=mstrmojo.all.teModel.rwTxs.tp,items=[_TCLT.LIST_TYPE_PULLDOWN],i,len;if(tp===_TCRU.RW_UNIT_FIELDGROUP){items.push(_TCLT.LIST_TYPE_RADIOLIST);}for(i=0,len=items.length;i<len;i++){items[i]={st:items[i],n:_TC.LIST_NAMES[items[i]]};}this.set("items",items);this.set("value",mstrmojo.all.teModel.currentTxInput.ctl.pr.st);return true;},onvalueChange:function(){if(this.visible){var rwTxs=mstrmojo.all.teModel.rwTxs,_value=this.value,dfv=mstrmojo.array.filter(rwTxs.dfvs,function(arr){return arr.t===_TC.CTRL_TYPES.CTRL_LIST&&arr.st===_value;})[0],pr=_H.make(_H.clone(dfv),mstrmojo.Obj),ctl=_H.make({pr:pr,dirty:-1},mstrmojo.Obj);mstrmojo.all.teModel.currentTxInput.set("ctl",ctl);this.parent.parent.refreshChildren();}}},_TC.createLabel({slot:"2,0",cssClass:"mstrmojo-TransactionEditor-Label list",getVisibility:function(){return mstrmojo.all.teModel.currentTxInput.ctl.pr.st===_TCLT.LIST_TYPE_RADIOLIST;}},mstrmojo.desc(9904)),{slot:"2,1",alias:"disPicker",scriptClass:"mstrmojo.Pulldown",popupToBody:true,popupZIndex:112,itemIdField:"v",items:[{n:mstrmojo.desc(2069),v:0},{n:mstrmojo.desc(3691),v:1}],getVisibility:function(){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr,ipr=pr.ipr,visibility=pr.st===_TCLT.LIST_TYPE_RADIOLIST;if(visibility){this.set("value",(ipr===undefined)?null:(ipr===1?0:1));}return visibility;},defaultText:" ",defaultSelection:-1,onvalueChange:function(){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr;pr.set("ipr",(this.value===0)?1:(pr.ipr===1?0:pr.ipr));}},_TC.createLabel({slot:"3,0",cssClass:"mstrmojo-TransactionEditor-Label list",getVisibility:function(){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr;return pr.st===_TCLT.LIST_TYPE_RADIOLIST&&pr.ipr!==1;},bindings:{visible:"this.parent.disPicker.value === 1"}},mstrmojo.desc(9905)),_TC.createTextInput({slot:"3,1",size:14,dtp:_DTP.VARCHAR,required:false,min:2,max:999999,_initValue:function(){var ipr=mstrmojo.all.teModel.currentTxInput.ctl.pr.ipr;this.set("value",ipr?_N.parseInteger(ipr):"");},_isVisible:function(){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr;return pr.st===_TCLT.LIST_TYPE_RADIOLIST&&pr.ipr!==1;},bindings:{visible:"this.parent.disPicker.value === 1"},onvisibleChange:function(){if(this.visible){this._initValue();}},constraints:{trigger:_TR.ALL,validator:function(v){if(v===""||(_N.isInt(v)&&_N.parseInteger(v)>=this.min&&_N.parseInteger(v)<=this.max)){return{code:_SC.VALID};}if(_N.isInt(v)){return{code:_SC.INVALID,msg:mstrmojo.desc(6079).replace("#","").replace("##",this.min).replace("###",this.max)};}return{code:_SC.INVALID,msg:mstrmojo.desc(7899).replace(/#/,mstrmojo.desc(6076))};}},updateModel:function(v){mstrmojo.all.teModel.currentTxInput.ctl.pr.ipr=(v==="")?0:v;}}),_TC.createLabel({slot:"3,2",cssClass:"mstrmojo-TransactionEditor-Label list hint",getVisibility:function(){var pr=mstrmojo.all.teModel.currentTxInput.ctl.pr;return pr.st===_TCLT.LIST_TYPE_RADIOLIST&&pr.ipr!==1;},bindings:{visible:"this.parent.disPicker.value === 1"}},mstrmojo.desc(9906))]},{scriptClass:"mstrmojo.txEditor.ValuesPropsPanel",rowHeaders:[mstrmojo.desc(527),mstrmojo.desc(8263)]}]});}());