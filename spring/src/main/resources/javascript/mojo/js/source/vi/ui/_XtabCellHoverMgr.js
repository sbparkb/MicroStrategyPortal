(function(){mstrmojo.requiresCls("mstrmojo._XtabCellHoverMgr","mstrmojo.dom");var $DOM=mstrmojo.dom;mstrmojo.vi.ui._XtabCellHoverMgr=mstrmojo.declare(mstrmojo._XtabCellHoverMgr,null,{scriptClass:"mstrmojo.vi.ui._XtabCellHoverMgr",oncontextmenu:function oncontextmenu(e,hWin,target){this._super(e,hWin,target);var xtab=this.parent,td=this.getEvtTargetCell(e,hWin,xtab,target);if(!td||!this.shouldShowPopup(xtab,td,true)){$DOM.preventDefault(hWin,e);$DOM.stopPropogation(hWin,e);}},processRightClick:function processRightClick(e,hWin,td){this.parent.doSelection(e,hWin,td);},shouldShowPopup:function shouldShowPopup(xtab,td,isRightClick){var cell=xtab.getCellForNode(td),result=false,actionType=cell&&cell.at;if(cell){if(!xtab.model.canShowCellMenu(cell)){return false;}result=this._super(xtab,td,isRightClick);if(!result&&actionType!==undefined){td.mstrShowPopup=result=true;}}return result;},showHvrBtn:function showHvrBtn(xtab,td){var cellInfo,result=false;if(this._super(xtab,td)){cellInfo=xtab.model.getCellInfo(xtab.getCellForNode(td));result=(cellInfo.isMetric&&cellInfo.isHeader)||(!cellInfo.isMetric&&cellInfo.isTitle);}return result;}});}());