(function(){mstrmojo.requiresCls("mstrmojo.func","mstrmojo.Editor","mstrmojo.List","mstrmojo.ME.MetricEditBox","mstrmojo.ME.FunctionSelector","mstrmojo.qb.FunctionWizard","mstrmojo.MenuButton","mstrmojo.qb.FFsqlToken","mstrmojo.array");mstrmojo.requiresDescs(221,2827,2919,4449,5891,9105,9106,9107,9108,9109,9110,9925);var $STRING=mstrmojo.string,$H=mstrmojo.hash,$ARRAY=mstrmojo.array,$VSTATUS={VALID:0,UNKNOWN:1,VALIDATING:2,ERROR:3},$VSTATUSCSS={0:"valid",1:"unknown",2:"validating",3:"error"},$VSTATUSDESC={0:mstrmojo.desc(9105,"Valid Expression Formula."),1:mstrmojo.desc(9106,"Require Validation?"),2:mstrmojo.desc(9107,"Validation in Progress..."),3:mstrmojo.desc(9108,"Validation Failed with Syntax Error")},ENUM_EXPRESSION_TYPE_NEW_COLUMN=0,ENUM_EXPRESSION_TYPE_EXISTING_COLUMN=3;function mapErrorCode(code){return(code?$VSTATUS.ERROR:$VSTATUS.VALID);}function getTokenString(items){var tokens=[];$ARRAY.forEach(items,function(item){tokens.push(item.v);});return tokens.join("").replace(/<\s/g,"<").replace(/>\s/g,">");}function postprocessTokenStream(tokens){var last=tokens[tokens.length-1],i,it,newItems=[],newV="";if(tokens[0]&&tokens[0].tp!==64){newItems.push({v:"",tp:64,lv:3,sta:1});}$ARRAY.forEach(tokens,function(item){if(!item.oi){newV+=item.v;}else{if(!$STRING.isEmpty(newV)){newItems.push({v:newV,tp:2,lv:1});newV="";}newItems.push($H.copy(item,{lv:1,tp:2,sta:1}));}});if(!$STRING.isEmpty(newV)){newItems.push({v:newV,tp:2,lv:1});newV="";}if(last&&last.tp!==-1){newItems.push({v:"",tp:-1,lv:2,sta:1});}return{omit:newItems,cn:newItems.length};}function getTokenStreamXML(tokens){var tks=postprocessTokenStream(tokens),props={v:true,tp:true,lv:true,n:true,did:true,t:true,st:true,cn:true,mi:true,omit:true,extra:true,tknctx:true,sqlti:true,tindex:true,cli:true,sta:true,ix:true},config={getArrItemName:function(){return"tkn";},isSerializable:function(nodeName){return(props[nodeName])?true:false;}};return mstrApp.getRootController().exprjson2xml("mi",tks,config);}function validateExpression(callback){var tokenStreamXML="",qbrex=1,expression="",inputBox=this.exprEditBox.inputBox;if(inputBox.doubleByte){expression=inputBox.editNode.innerText||inputBox.editNode.textContent;inputBox.ime=false;}else{if(this.oi.type!==0&&this.oi.type!==3){expression=getTokenString(inputBox.items);qbrex=2;}else{tokenStreamXML=getTokenStreamXML(inputBox.items);}}var me=this;mstrApp.getRootController().parseExpression({expr:expression,tKnStrm:tokenStreamXML,isNew:true,qbrex:qbrex,vo:1},{success:function(res){if(res&&res.mi&&res.mi.items){var stp=res.mi.exp.sqltp;if(stp!==null){me.sqltp=stp;}me.exprEditBox.handleValidation(res.mi,false);if(!res.mi.reject_error_code&&callback&&callback.success){callback.success(res);}else{if(callback&&callback.failure){callback.failure(res);}}}}});}function _addSpaceToTokenStream(tokens){var newTokens=[],len=tokens.length;$ARRAY.forEach(tokens,function(token,i){var value=token.v;if(typeof value!=="string"&&value.toString){value=token.v=value.toString();}if(token.orf){if(i>0&&value.slice(0,1)!==" "){newTokens.push({v:" "});}newTokens.push(token);if(i<len-1&&value.slice(-1)!==" "){newTokens.push({v:" "});}}else{newTokens.push(token);}});$ARRAY.forEach(newTokens,function(token,i){tokens[i]=token;});}function preprocessTokenStream(tokens){if(!tokens.length){return ;}var last=tokens[tokens.length-1];if(last&&last.tp===-1){tokens.pop();}if(tokens[0]&&(tokens[0].tp===64||(tokens[0].tp===36&&tokens[0].v==="$"))){tokens.splice(0,1);}_addSpaceToTokenStream(tokens);}function brackets(name){return["[",name,"]"].join("");}mstrmojo.qb.ExpressionEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.qb.ExpressionEditor",cssClass:"mstrmojo-MetricEditor mstrmojo-qb-ExpressionEditor",zIndex:70,title:mstrmojo.desc(4449,"Expression"),functionSelector:{scriptClass:"mstrmojo.ME.FunctionSelector"},wizard:{scriptClass:"mstrmojo.qb.FunctionWizard"},model:null,selFuncItem:null,onfunclistChange:function onfunclistChange(){this.toolBox.toolBar.func.set("cm",[{n:mstrmojo.desc(9925,"Functions"),did:-3,fns:this.funclist}]);},onOpen:function onOpen(){var me=this,oi=this.oi,meb=this.exprEditBox,tib=meb.inputBox;tib.customFunctionMode=false;tib.doubleByte=false;oi.isSave=false;this.set("funclist",(this.funclist||mstrApp.getRootController().getFunctionList()));var cds={items:mstrApp.getRootController().getSuggestionItems(false),isComplete:true};tib.set("candidates",cds);me.set("candidates",cds);meb.set("iStatus","");meb.set("vStatus",0);var expressionTitle={0:mstrmojo.desc(4449,"Expression"),1:mstrmojo.desc(9109,"Filter Expression"),3:mstrmojo.desc(4449,"Expression")},HelpTopic={0:(mstrApp.helpTopics&&mstrApp.helpTopics.expression)||"expression_dialog_box.htm",3:(mstrApp.helpTopics&&mstrApp.helpTopics.expression)||"expression_dialog_box.htm"};this.set("title",[expressionTitle[oi.type]||"",oi.n].join(""));this.set("help",HelpTopic[oi.type]||((mstrApp.helpTopics&&mstrApp.helpTopics.condition)||"new_condition_dialog_box.htm"));var token;if(oi&&oi.tkn){token=$H.clone(oi.tkn);preprocessTokenStream(token);tib.set("items",token);}if(oi&&oi.selFuncItem){me.openPopup("wizard",{fctOi:oi.selFuncItem,zIndex:me.zIndex+10,insertOnFinish:function(tks){tib.insertTokens(tks);}});}},onClose:function onClose(){var inputBox=this.exprEditBox.inputBox;inputBox.set("items",[]);inputBox.itemcount=0;},children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-toolBox",alias:"toolBox",children:[{scriptClass:"mstrmojo.Label",cssText:"font-size: 10pt",text:mstrmojo.desc(4449,"Expression")+":"},{scriptClass:"mstrmojo.ToolBar",cssClass:"mstrmojo-oivmSprite grouped",alias:"toolBar",cssText:"float: right",children:[{scriptClass:"mstrmojo.MenuButton",alias:"func",iconClass:"tbInsert",title:mstrmojo.desc(2919,"Insert"),zIndex:80,itemIdField:"did",itemField:"n",itemChildrenField:"fns",isSeparatorItem:function isSeparatorItem(item){return item[this.itemIdField]===-1;},executeCommand:function executeCommand(item){var me=this.parent.parent.parent,meb=me.exprEditBox.inputBox;if(item.did===-999){me.openPopup("functionSelector",{functions:me.funclist,zIndex:me.zIndex+10,openWizard:function(item){me.openPopup("wizard",{fctOi:item,zIndex:me.zIndex+10,insertOnFinish:function(tks){meb.insertTokens(tks);}});}});}else{me.openPopup("wizard",{fctOi:item,zIndex:me.zIndex+10,insertOnFinish:function(tks){meb.insertTokens(tks);}});}}},{scriptClass:"mstrmojo.Button",title:mstrmojo.desc(9110,"Syntax Validation"),iconClass:"tbValidate",onclick:function(){validateExpression.call(this.parent.parent.parent);}},{scriptClass:"mstrmojo.Button",title:mstrmojo.desc(2827,"Clear"),iconClass:"tbClear",onclick:function(){var me=this.parent.parent.parent,empty=[];me.oi.tkn=empty;me.exprEditBox.inputBox.clearTokens(empty);me.exprEditBox.resizeInputBox();}}]}]},{scriptClass:"mstrmojo.ME.MetricEditBox",alias:"exprEditBox",cssText:"height:132px;",children:[{scriptClass:"mstrmojo.ME.TokenInputBox",alias:"inputBox",slot:"editNode",browseItemVisible:false,renderBlockSize:1000,item2textCss:function item2textCss(data){return" mstrmojo-qb-SuggestIcon t"+data.t;},itemFunction:function itemFunction(item,idx,w){return new mstrmojo.ME.MetricToken({data:item,brackets:brackets,isDelimiter:function isDelimiter(){return this.data.isDelimiter||(this.length()===1&&mstrmojo.qb.FFsqlToken.isDelimiter(this.data.v));}});},isDelimiter:mstrmojo.qb.FFsqlToken.isDelimiter}],markupMethods:{onvStatusChange:function(){var s=this.vStatus,vn=this.vStatusNode;vn.className="mstrmojo-MEBox-vStatus "+$VSTATUSCSS[s];vn.innerHTML=$VSTATUSDESC[s];},oniStatusChange:function(){this.iStatusNode.innerHTML=this.iStatus;this.resizeInputBox();}},handleValidation:function handleValidation(r,isSaved){if(!r){this.set("vStatus",$VSTATUS.ERROR);return ;}r.vs=mapErrorCode(r.reject_error_code);this.set("vStatus",r.vs);this.set("iStatus",r.reject_error_description||"");var tokens=r.items,n_tkns=[],tokenvalue,SEP=".",speratorIndex,tbn;$ARRAY.forEach(tokens,function(token,idx){n_tkns[idx]={};if(token.tp===304&&!/^'.*'$/.test(token.v)){token.v=["'",token.v,"'"].join("");}if(token.tp===309){tokenvalue=token.v;speratorIndex=tokenvalue.lastIndexOf(SEP);if(speratorIndex>=1){token.v=tokenvalue;n_tkns[idx].oi={tn:tokenvalue.slice(0,speratorIndex),rn:tokenvalue.slice(speratorIndex+1),tp:26};}else{n_tkns[idx].oi={tn:null,rn:tokenvalue,tp:26};}}if(token.orf){n_tkns[idx].oi=token.orf;token.v=[" ",token.v," "].join("");}n_tkns[idx].v=!token.v||(typeof token.v)==="string"?token.v:token.v.toString();n_tkns[idx].sta=token.sta;});this.inputBox.set("items",n_tkns);this.resizeInputBox();if(!isSaved){this.inputBox.focus();}},resizeInputBox:function resizeInputBox(){var inputBoxNode=this.inputBox.domNode,statusNode=this.iStatusNode.parentNode,originHeight=parseInt(this.domNode.clientHeight,10)-7,statusHeight=statusNode.offsetHeight;if(inputBoxNode){inputBoxNode.style.height=originHeight-statusHeight+"px";}}},{scriptClass:"mstrmojo.HBox",cssText:"float: right; border-collapse: separate;margin:10px 0px;",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(5891,"Save"),onclick:function(){var me=this.parent.parent,oi=me.oi,exprtype=oi.type,wce=oi.w,ib=me.exprEditBox.inputBox,expr_s=getTokenString(ib.items),callback={success:function success(){me.close();}};oi.isSave=true;switch(exprtype){case ENUM_EXPRESSION_TYPE_NEW_COLUMN:validateExpression.call(me,{success:function success(){mstrApp.getRootController().addColumnWithExpression(wce,expr_s,ib.items,callback);}});break;case ENUM_EXPRESSION_TYPE_EXISTING_COLUMN:validateExpression.call(me,{success:function success(){mstrApp.getRootController().editColumnExpression(oi.cIndex,expr_s,ib.items,callback);}});break;default:validateExpression.call(me,mstrmojo.func.wrapMethods(oi.callbacks,callback));}}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(221,"Cancel"),onclick:function(){this.parent.parent.close();}}]}]});}());