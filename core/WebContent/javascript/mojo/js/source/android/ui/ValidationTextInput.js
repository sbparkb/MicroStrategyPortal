(function(){mstrmojo.requiresCls("mstrmojo.android.ui.TextInput","mstrmojo.ValidationTextBox","mstrmojo.hash");mstrmojo.android.ui.ValidationTextInput=mstrmojo.declare(mstrmojo.android.ui.TextInput,null,{scriptClass:"mstrmojo.android.ui.ValidationTextInput",valProps:null,getTextCfg:function getTextCfg(){return mstrmojo.hash.copy(this.valProps,{scriptClass:"mstrmojo.ValidationTextBox",onEnter:function(){var parent=this.parent,fnEnter=parent.onEnter;if(fnEnter){if(this.isValid()){fnEnter.call(parent,this.value);}}},onvalidationStatusChange:function(){var status=this.validationStatus,code=status&&status.code,errorLabel=this.parent.lblErr,msg=code?status.msg:"";errorLabel.set("text",msg);errorLabel.set("visible",!!msg);}});},validate:function validate(){return this.txt.validate();},isValid:function isValid(){return this.txt.isValid();}});}());