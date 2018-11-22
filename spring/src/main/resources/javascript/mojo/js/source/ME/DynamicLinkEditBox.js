(function(){mstrmojo.requiresCls("mstrmojo.array","mstrmojo.hash","mstrmojo.ME.MetricToken","mstrmojo.ME.MetricEditBox","mstrmojo.ME.DynamicLinkTokenInputBox","mstrmojo.ME.AttributeEditBox","mstrmojo.mstr.EnumDSSXMLTokenTypes","mstrmojo.mstr.EnumDSSXMLTokenStates");var $ARR=mstrmojo.array,$HASH=mstrmojo.hash,V_STATUS=mstrmojo.ME.MetricEditBox.VALIDATION_STATUS,prepareInsertToken=mstrmojo.ME.AttributeEditBox.prepareInsertToken,validateSyntax=mstrmojo.ME.AttributeEditBox.validateSyntax,DSS_TOKEN_TYPE=mstrmojo.mstr.EnumDSSXMLTokenTypes,DSS_TOKEN_STATE=mstrmojo.mstr.EnumDSSXMLTokenStates,ARG_DELIMITER=mstrmojo.ME.MetricToken.argDelimiter,addDoubleQuotationMark=function addDoubleQuotationMark(str){str=str||"";return'"'+str+'"';},removeDoubleQuotationMark=function removeDoubleQuotationMark(str){if(!str){return str;}return str.replace(/^"(.*)"$/,"$1");},preProcessBackendTks=function preProcessBackendTks(tokens){return $ARR.filter(tokens,function(tk){return !((tk.tp===DSS_TOKEN_TYPE.SimpPrefixFun&&tk.v==="Concat")||(tk.tp===DSS_TOKEN_TYPE.LeftParen&&tk.v==="(")||(tk.tp===DSS_TOKEN_TYPE.Comma&&tk.v===",")||(tk.tp===DSS_TOKEN_TYPE.Semicolon&&tk.v===";")||(tk.tp===DSS_TOKEN_TYPE.RightParen&&tk.v===")"));});},convertBackendTksToDisplayTks=function convertBackendTksToDisplayTks(tokens){var newTokens=[];$ARR.forEach(tokens,function(token){if(token.tp===DSS_TOKEN_TYPE.AttrFormRef||token.sta===DSS_TOKEN_STATE.Error){newTokens.push({v:"{",isDelimiter:true});newTokens.push(token);newTokens.push({v:"}",isDelimiter:true});}else{token.v=removeDoubleQuotationMark(token.v);token.isRawStr=true;newTokens.push(token);}});return newTokens;},convertRawStr=function convertRawStr(token){if(token.isRawStr){token.v=token.v.replace(/"/g,"'");token.v=addDoubleQuotationMark(token.v);token.isRawStr=false;}return token;},wrapWithConcat=function wrapWithConcat(tokens){if(tokens.length===1){convertRawStr(tokens[0]);return tokens;}var index,newTokens=[{v:"Concat(",isRawStr:false,isNew:true}];for(index=0;index<tokens.length;index++){newTokens.push(convertRawStr(tokens[index]));newTokens.push({v:ARG_DELIMITER,isRawStr:false,isNew:true,isDelimiter:true});}newTokens[newTokens.length-1].v=")";return newTokens;},preprocessDisplayTokens=function preprocessDisplayTokens(tokens){if(!$ARR.isArray(tokens)){return undefined;}var newTokens=[],tokenInserted=false,hasLeftCurlyBrace=false,token,idx,LEFT_CURLY="{",RIGHT_CURLY="}";for(idx=0;idx<tokens.length;idx++){token=tokens[idx];if(token.v===LEFT_CURLY){if(hasLeftCurlyBrace){return undefined;}hasLeftCurlyBrace=true;tokenInserted=false;}else{if(token.v===RIGHT_CURLY){if(!hasLeftCurlyBrace){return undefined;}tokenInserted=false;hasLeftCurlyBrace=false;}else{if(tokenInserted&&hasLeftCurlyBrace){return undefined;}token.isRawStr=!hasLeftCurlyBrace;token.isNew=true;newTokens.push(token);tokenInserted=true;}}}return !hasLeftCurlyBrace?newTokens:undefined;},constructBackendToken=function constructBackendToken(tokens){if(!tokens||tokens.length===0){return[];}var token=tokens[0];token.isNew=true;token=wrapWithConcat(tokens);return[].concat(token);};mstrmojo.ME.DynamicLinkEditBox=mstrmojo.declare(mstrmojo.ME.MetricEditBox,[],{children:[{scriptClass:"mstrmojo.ME.DynamicLinkTokenInputBox",alias:"inputBox",slot:"editNode",renderOnScroll:false,renderBlockSize:0,bindings:{browseItemVisible:"this.parent.browseItemVisible",candidates:"this.parent.candidates"}}],ontokensModify:function(){this.set("cValid",this.inputBox.items.length>0);this.set("dirty",true);this.localValidate();},defaultOnTokensModify:mstrmojo.emptyFn,clear:function clear(){this.inputBox.set("items",[]);this.inputBox.resetTokensCache();this.set("vStatus",V_STATUS.UNKNOWN);this.set("iStatus","");},postBuildRendering:function postBuildRendering(){if(this._super){this._super();}this.clear();},onObjectInsert:function onObjectInsert(oi){var tib=this.inputBox;var token=prepareInsertToken(oi);var tokens=[token];if(oi.t===12&&token.ift&&token.exv){tokens=[{v:"{",isDelimiter:true,isNew:true}].concat(tokens).concat([{v:"}",isDelimiter:true,isNew:true}]);}var lastTokenIdx=tib.insertTokens(tokens);if(this.ontokensModify){this.ontokensModify();}if(oi.t===12&&token.ift&&!token.exv){var widgets=tib.ctxtBuilder.itemWidgets,iw=widgets[lastTokenIdx];if(iw){tib.startTokenSuggestion(iw);}}},backendValidate:function backendValidate(fn){var me=this,valcallback=function(tokens){me.set("vStatus",tokens.vs);me.set("iStatus",tokens.rjed||"");var displayTks={};$HASH.copy(tokens,displayTks);displayTks.items=convertBackendTksToDisplayTks(preProcessBackendTks(tokens.items));me.updateInputBoxItems(displayTks);me.handleValidation(displayTks);if(fn){fn(tokens.items,tokens.vs===V_STATUS.VALID);}};me.set("vStatus",V_STATUS.VALIDATING);validateSyntax(null,{items:constructBackendToken(preprocessDisplayTokens(this.inputBox.items)||[])},false,valcallback);},localValidate:function localValidate(){var displayTks=this.inputBox.items;if(displayTks.length>0){if(!preprocessDisplayTokens(displayTks)){this.set("vStatus",V_STATUS.ERROR);this.set("iStatus","");return ;}}this.set("vStatus",V_STATUS.UNKNOWN);this.set("iStatus","");}});mstrmojo.ME.DynamicLinkEditBox.preProcessBackendTks=preProcessBackendTks;mstrmojo.ME.DynamicLinkEditBox.convertBackendTksToDisplayTks=convertBackendTksToDisplayTks;mstrmojo.ME.DynamicLinkEditBox.addDoubleQuotationMark=addDoubleQuotationMark;mstrmojo.ME.DynamicLinkEditBox.removeDoubleQuotationMark=removeDoubleQuotationMark;mstrmojo.ME.DynamicLinkEditBox.preprocessDisplayTokens=preprocessDisplayTokens;mstrmojo.ME.DynamicLinkEditBox.constructBackendToken=constructBackendToken;}());