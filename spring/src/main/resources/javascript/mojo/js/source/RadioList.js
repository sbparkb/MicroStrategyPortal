(function(){mstrmojo.requiresCls("mstrmojo._InputList","mstrmojo._InputListHoriz");mstrmojo.RadioList=mstrmojo.declare(mstrmojo._InputList,null,{scriptClass:"mstrmojo.RadioList",inputType:"radio",cssClass:"mstrmojo-RadioList",itemCssClass:"mstrmojo-RadioList-item",onenabledChange:function onenabledChange(evt){for(var i=0;i<this.items.length;i++){this._getItemNode(i).firstChild.disabled=!evt.value;}}});mstrmojo.RadioListHoriz=mstrmojo.declare(mstrmojo._InputListHoriz,null,{scriptClass:"mstrmojo.RadioListHoriz",inputType:"radio",cssClass:"mstrmojo-RadioListHoriz",itemCssClass:"mstrmojo-RadioListHoriz-item"});})();