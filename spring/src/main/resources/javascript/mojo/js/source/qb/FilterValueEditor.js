(function(){mstrmojo.requiresCls("mstrmojo.hash","mstrmojo.HTMLButton","mstrmojo.HBox","mstrmojo.Label","mstrmojo.Editor");mstrmojo.requiresDescs(221,1442,3393,5282,9124,12407);var $H=mstrmojo.hash,$CSS=mstrmojo.css,$DOM=mstrmojo.dom,$DESC=mstrmojo.desc,$ARR=mstrmojo.array,CSS_CLASS_ON="on";var LIST_OPERATOR={2219:[" IN "],2220:["[Not In]"]},STRING_OPERATOR={525:[" LIKE "],526:["[Not Like]"],686:[" Contains "],2784:["[Not Contains]"],687:["[Begins With]"],2785:["[Not Begins With]"],688:["[Ends with]"],2786:["[Not ends with]"]},LOGICAL_OPERATORS=$H.copy(LIST_OPERATOR,{520:["="],612:["<>"],521:[">"],523:["<"],522:[">="],524:["<="],Between:[" between ","AND"],"Not between":["[Not Between]","AND"]});LOGICAL_OPERATORS=$H.copy(STRING_OPERATOR,LOGICAL_OPERATORS);var TEXT_AND=mstrmojo.desc(5282,"AND"),OPERATOR_TEXT={Between:[TEXT_AND],"Not between":[TEXT_AND]};var EXAMPLE_TXT={numeric:{2219:["1234,12345,123456"],2220:["1234,12345,123456"],520:["123456"],612:["123456"],521:["123456"],523:["123456"],522:["123456"],524:["123456"],Between:["1234","123456"],"Not between":["1234","123456"],525:["1%4_6"],526:["1%4_6"],686:["1%4_6"],2784:["1%4_6"],687:["1%4_6"],2785:["1%4_6"],688:["1%4_6"],2786:["1%4_6"]},vchar:{2219:["abcde,abcdef"],2220:["abcde,abcdef"],520:["abcde"],612:["abcde"],521:["aa"],523:["zz"],522:["aa"],524:["zz"],Between:["aa","zz"],"Not between":["mn","zz"],525:["a%d_f"],526:["a%d_f"],686:["a%d_f"],2784:["a%d_f"],687:["a%d_f"],2785:["a%d_f"],688:["a%d_f"],2786:["a%d_f"]},date:{2219:["2014-02-14,2014-12-25 00:00:00"],2220:["2014-02-14,2014-12-25 00:00:00"],520:["2014-12-25"],612:["2014-12-25"],521:["2014-12-25"],523:["2014-12-25"],522:["2014-12-25"],524:["2014-12-25"],Between:["2014-02-14","2014-12-25"],"Not between":["2014-02-14","2014-12-25"],525:["2014-0_-25%"],526:["2014-0_-25%"],686:["2014-0_-25%"],2784:["2014-0_-25%"],687:["2__4-"],2785:["2__4-"],688:["-25%"],2786:["-25%"]}};var SEP=",",SINGLE_QUOTE="'",DOUBLE_QUOTE='"',HAS_QUOTE={"'":1,'"':1},LEFT_PARENTHESIS="(",RIGHT_PARENTHESIS=")";function getDateTimeFormat(value){var length=value.length;value=value.substring(HAS_QUOTE[value[0]]?1:0,(HAS_QUOTE[value[length-1]]?length-1:length));return[SINGLE_QUOTE,value,SINGLE_QUOTE].join("");}function preprocessBigDecimalValue(value){var result=value.toString();if(result.match(/#\d+#/)){return result;}return"#"+result+"#";}function preprocessDateTimeValue(dtvalue){var tempArray=dtvalue.split(SEP),result=[];$ARR.forEach(tempArray,function(value){result.push(getDateTimeFormat(value));});return result.join(SEP);}function preprocessListValue(value,isString){var tokens,newTokens=[],newValue=value;if(isString){tokens=value.split(SEP);$ARR.forEach(tokens,function(token){newTokens.push(DOUBLE_QUOTE+token+DOUBLE_QUOTE);});newValue=newTokens.join(SEP);}return LEFT_PARENTHESIS+newValue+RIGHT_PARENTHESIS;}mstrmojo.qb.FilterValueEditor=mstrmojo.declare(mstrmojo.Editor,null,{scriptClass:"mstrmojo.qb.FilterValueEditor",init:function init(props){this._super(props);this.help=this.help||(mstrApp&&mstrApp.helpTopics&&mstrApp.helpTopics.filterValue)||"Enter_Value_dialog_box.htm";},zIndex:100,title:mstrmojo.desc(9124,"Enter Value"),cssClass:"mstrmojo-qb-filtervalue-editor",help:"",column:null,operatorID:null,paraNum:null,MAX_PARA_NUM:2,children:[{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-qb-filtervalue-box",alias:"box",children:[{scriptClass:"mstrmojo.Label",alias:"label0",cssClass:"mstrmojo-qb-filtervalue-name1",cssDisplay:""},{scriptClass:"mstrmojo.TextBox",alias:"input0",cssClass:"mstrmojo-qb-filtervalue-textbox1",cssDisplay:""},{scriptClass:"mstrmojo.Label",alias:"label1",cssClass:"mstrmojo-qb-filtervalue-name2",cssDisplay:""},{scriptClass:"mstrmojo.TextBox",alias:"input1",cssClass:"mstrmojo-qb-filtervalue-textbox2",cssDisplay:""}]},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-qb-filterexample-box",alias:"exampleBox",children:[{scriptClass:"mstrmojo.Label",alias:"exampleLabel",cssClass:"mstrmojo-qb-example-label",text:mstrmojo.desc(3993,"Example:")},{scriptClass:"mstrmojo.Label",alias:"exampleLabel0",cssClass:"mstrmojo-qb-example-name0",cssDisplay:""},{scriptClass:"mstrmojo.Label",alias:"exampleAndLabel",cssClass:"mstrmojo-qb-example-and-label",text:TEXT_AND,cssDisplay:""},{scriptClass:"mstrmojo.Label",alias:"exampleLabel1",cssClass:"mstrmojo-qb-example-name1",cssDisplay:""}]},{scriptClass:"mstrmojo.Label",alias:"err",cssClass:"mstrmojo-qb-filtervalue-errmsg",text:""},{scriptClass:"mstrmojo.HBox",cssClass:"mstrmojo-Editor-buttonBox",slot:"buttonNode",alias:"buttonBox",children:[{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",cssText:"float:right;",text:mstrmojo.desc(1442,"OK"),alias:"ok",onclick:function onclick(){var filterEditor=this.parent.parent,box=filterEditor.box,operatorID=filterEditor.operatorID,filterValue,isDateTime=filterEditor.isDateTime,isBigDecimal=filterEditor.isBigDecimal,isStringData=filterEditor.isString,expression,paraNum=filterEditor.paraNum,filterValueArr=[],i,bracket_column="["+filterEditor.column+"]",exprArr,isStringOperator=STRING_OPERATOR.hasOwnProperty(operatorID),isListOperator=LIST_OPERATOR.hasOwnProperty(operatorID),operatorArr;if(paraNum<=0||paraNum>filterEditor.MAX_PARA_NUM){return ;}for(i=0;i<paraNum;i++){filterValue=box["input"+i].value;if(filterValue===""){return ;}if(isDateTime&&!isStringOperator){filterValue=preprocessDateTimeValue(filterValue);}else{if(isBigDecimal){filterValue=preprocessBigDecimalValue(filterValue);}}if(isListOperator){filterValue=preprocessListValue(filterValue,isStringData);}else{if(isStringOperator||isStringData){filterValue=DOUBLE_QUOTE+filterValue+DOUBLE_QUOTE;}}filterValueArr.push(filterValue);}operatorArr=LOGICAL_OPERATORS[operatorID];if(!operatorArr||operatorArr.length!==paraNum){return ;}for(i=0,exprArr=[bracket_column];i<paraNum;i++){exprArr.push(" ",operatorArr[i]," ",filterValueArr[i]);}expression=exprArr.join("");mstrApp.getRootController().parseExpression({expr:expression,qbrex:2,cIndex:1,vo:1},{success:function(res){if(res&&res.mi){var mi=res.mi,errormsg=mi.reject_error_description;if(errormsg){if(isDateTime&&mi.reject_error_code===-2147214817){errormsg=$DESC(12407,"(Please enter a valid date/time value.)");}filterEditor.err.set("text",errormsg);}else{filterEditor.close();mstrApp.getRootController().addNewFilter({et:"*",expr:mi.items,n:expression,sqltp:mi.exp.sqltp});mstrApp.getRootController().refreshConditionDialog();}}}});}},{scriptClass:"mstrmojo.HTMLButton",cssClass:"mstrmojo-Editor-button",text:mstrmojo.desc(221,"Cancel"),alias:"cancel",onclick:function(evt){var e=this.parent.parent;if(e.onCancel){e.onCancel();}e.close();}}]}],onOpen:function onOpen(){var box=this.box,paraNum=this.paraNum,maxParaNum=this.MAX_PARA_NUM,i,label,input,textArr,buttonBox=this.buttonBox,buttons,expBox=this.exampleBox,expAndLabel=expBox.exampleAndLabel,expTextArr,isDateTime=this.isDateTime,isString=this.isString;textArr=[this.n].concat(OPERATOR_TEXT[this.operatorID]||[]);var type=isDateTime?"date":(isString?"vchar":"numeric");expTextArr=EXAMPLE_TXT[type][this.operatorID]||[];this.err.set("text","");box.input0.focus();$CSS.toggleClass(this.editorNode,"multi",paraNum>1);for(i=0;i<maxParaNum;i++){label=box["label"+i];label.set("text",textArr[i]||"");input=box["input"+i];input.set("value","");$CSS.toggleClass(label.domNode,CSS_CLASS_ON,i<paraNum);$CSS.toggleClass(input.domNode,CSS_CLASS_ON,i<paraNum);label=expBox["exampleLabel"+i];label.set("text",expTextArr[i]||"");$CSS.toggleClass(label.domNode,CSS_CLASS_ON,i<paraNum);$CSS.toggleClass(expAndLabel.domNode,CSS_CLASS_ON,i<paraNum);}if($DOM.isIE7||$DOM.isIE8){buttons=[buttonBox.ok,buttonBox.cancel];for(i=0;i<buttons.length;i++){buttons[i].inputNode.style.minWidth=(paraNum===1)?"70px":"";}}}});}());