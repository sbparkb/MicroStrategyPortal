(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.FieldSet","mstrmojo.txEditor.CSIUpdateStatementPanel","mstrmojo.txEditor.CSIInsertStatementPanel","mstrmojo.txEditor.CSIDeleteStatementPanel","mstrmojo.txEditor.CommonComponent");var $H=mstrmojo.hash,_TC=mstrmojo.txEditor.CommonComponent,_ST=_TC.STATEMENT_TYPE;mstrmojo.txEditor.CSIStatementManipulationPanel=mstrmojo.declare(mstrmojo.FieldSet,null,{scriptClass:"mstrmojo.txEditor.CSIStatementManipulationPanel",cssClass:"mstrmojo-TransactionEditor-CSIStatementManipulationPanel",markupMethods:$H.copy({onheightChange:function(){if(this.height){this.domNode.style.height=this.height+"px";this.upSta.set("height",this.height);this.inSta.set("height",this.height);this.deSta.set("height",this.height);}}},$H.copy(mstrmojo.FieldSet.prototype.markupMethods)),children:[{scriptClass:"mstrmojo.txEditor.CSIUpdateStatementPanel",alias:"upSta",bindings:{visible:function(){return this.parent.parent.statementType===_ST.STATEMENT_UPDATE;}}},{scriptClass:"mstrmojo.txEditor.CSIInsertStatementPanel",alias:"inSta",bindings:{visible:function(){return this.parent.parent.statementType===_ST.STATEMENT_INSERT;}}},{scriptClass:"mstrmojo.txEditor.CSIDeleteStatementPanel",alias:"deSta",bindings:{visible:function(){return this.parent.parent.statementType===_ST.STATEMENT_DELETE;}}}]});}());