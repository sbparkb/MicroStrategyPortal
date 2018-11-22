package com.groto.tags;

import java.util.List;

import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.InstanceCreation;
import com.groto.service.PromptStyle;
import com.mstr.business.model.PromptInfo;

public class GBIPromptTagAssist {

	void treeStringAppend(StringBuffer promptTagBuf2, StringBuffer treeAjaxScriptBuf, boolean enableDisplayStyle[], String promptAjaxActionName) {
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_TREE] && StringUtil.isNotEmpty(promptAjaxActionName)) {
			promptTagBuf2.append(treeAjaxScriptBuf.toString());
		}
	}

	boolean promptExceptionList(PromptInfo promptInfo, StringBuffer promptTagBuf , String meaning, String nextMean, int promptCnt){
		if (promptCnt % 3 == 2 && PromptStyle.DISPLAY_STYLE_TREE == promptInfo.getDisplayStyleValue()) {
			promptTagBuf.append("  <td><!--tree1--></td><td><!--tree2--></td><td><!--search--></td></tr>");
			return true;
		} else if (promptCnt % 3 == 2 && meaning.toLowerCase().contains("from") && nextMean.toLowerCase().contains("to")) {
			promptTagBuf.append("  <td><!--cal1--></td><td><!--cal2--></td><td><!--search--></td></tr>");
			return true;
		}
		return false;
	}

	int displayStyleValue(PromptInfo promptInfo){

		String[] styleParams = new String[] {"0"};
		int newDisplayStyleValue = Integer.parseInt(SystemMessage.getMessage("mstr.config.prompt.display-style-" + promptInfo.getDisplayStyleValue() + ".value", styleParams));
		if (newDisplayStyleValue == 0) {
			newDisplayStyleValue = promptInfo.getDisplayStyleValue();
		}
		return newDisplayStyleValue;
	}

	int rowCntMin(int rowCnt){
		if (rowCnt < 1) return 1;
		return rowCnt;
	}

	int treePromptCnt(PromptInfo promptInfo){
		if (PromptStyle.DISPLAY_STYLE_TREE == promptInfo.getDisplayStyleValue()) {
			return 1;
		}
		return 0;
	}

	int rowCarriageCnt(StringBuffer promptTagBuf, int promptCnt){
		if (promptCnt != 0 && (promptCnt % 3) == 2) {
			promptTagBuf.append("<td><!--search2--></td></tr>");
			return 1;
		}
		return 0;
	}   

	String validatePromptName(String validateScriptName){
		String validatePromptName = "validatePrompt";
		if (StringUtil.isEqual(validateScriptName, validatePromptName)) {
			validatePromptName = "validatePromptTemp";
		}
		return validatePromptName;
	}

	int oneLineRowCnt(StringBuffer promptTagBuf1, int promptCnt){

		if ((promptCnt - 1) % 3 < 2) {
			for (int i = (promptCnt - 1) % 3; i < 2; i++) {
				promptTagBuf1.append("<td><!--end1--></td><td><!--end2--></td>");
			}
			promptTagBuf1.append("<td><!--search_end--></td></tr>");
			return 1;
		}
		return 0;
	}

	int lineOfStart(StringBuffer promptTagBuf, int promptCnt){
		if (promptCnt == 0 || (promptCnt % 3) == 0) {
			promptTagBuf.append("<tr>");
			return 0;
		}
		return promptCnt;
	}

	String nextMeanStr(List<PromptInfo> promptInfoList, int maxSize, int i){
		String nextMean = "";
		PromptInfo nextInfo = null;
		if (i < maxSize - 1) {
			nextInfo = promptInfoList.get(i + 1);
			nextMean = nextInfo.getMeaning();
		}
		return nextMean;
	}   

	String prevMeanStr(List<PromptInfo> promptInfoList, int i){
		String prevMean = "";
		if (i > 0) {
			prevMean = promptInfoList.get(i - 1).getMeaning();      
		}
		return prevMean;
	}   

	boolean[] isEnableDisplayStyle(boolean[] pEnableDisplayStyle, int newDisplayStyleValue){

		boolean[] enableDisplayStyle = pEnableDisplayStyle;

		switch (newDisplayStyleValue) {

		case PromptStyle.DISPLAY_STYLE_TEXT_BOX:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_TEXT_BOX] = true;
			break;

		case PromptStyle.DISPLAY_STYLE_OPT_BTN:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_OPT_BTN] = true;
			break;

		case PromptStyle.DISPLAY_STYLE_CHECKBOX:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_CHECKBOX] = true;
			break;

		case PromptStyle.DISPLAY_STYLE_LIST:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_LIST] = true;
			break;

		case PromptStyle.DISPLAY_STYLE_PULL_DOWN:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_PULL_DOWN] = true;
			break;

		case PromptStyle.DISPLAY_STYLE_CART:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_CART] = true;
			break;

		case PromptStyle.DISPLAY_STYLE_TREE:
			enableDisplayStyle[PromptStyle.DISPLAY_STYLE_TREE] = true;
			break;

		default:
		}

		return enableDisplayStyle;
	}

	int getCalCnt(int newDisplayStyleValue){

		switch (newDisplayStyleValue) {

		case PromptStyle.DISPLAY_STYLE_TEXT_BOX:
			return 1;

		case PromptStyle.DISPLAY_STYLE_OPT_BTN:
			return 0;

		case PromptStyle.DISPLAY_STYLE_CHECKBOX:
			return 0;

		case PromptStyle.DISPLAY_STYLE_LIST:
			return 0;

		case PromptStyle.DISPLAY_STYLE_PULL_DOWN:
			return 0;

		case PromptStyle.DISPLAY_STYLE_CART:
			return 0;

		case PromptStyle.DISPLAY_STYLE_TREE:
			return 0;

		default: return 0;
		}
	}

	StringBuffer validateTagStr(PromptInfo promptInfo, String validatePromptName, String promptParamName){

		StringBuffer validateTagBuf = new StringBuffer(1000);

		String currDate = com.groto.cmm.util.DateUtil.getDate();
		validateTagBuf.append("var currDate = '' + ")
		.append(currDate)
		.append("; if(!")
		.append(validatePromptName)
		.append("('")
		.append(promptParamName)
		.append(promptInfo.getOrgPIN())
		.append("',")
		.append(promptInfo.isRequired())
		.append(",'")
		.append(promptInfo.getMin())
		.append("','")
		.append(promptInfo.getMax())
		.append("','")
		.append(promptInfo.getDisplayStyleValue())
		.append("')) { alert('")
		.append(SystemMessage.getMessage("error.config.prompt.message", InstanceCreation.cStringArray("[@] 프롬프트에 응답할 때 오류가 발생했습니다. 응답을 검토해 보십시오.")).replace("@", promptInfo.getTitle()).replaceAll("\'", "\""));

		if (promptInfo.getDisplayStyleValue() != PromptStyle.DISPLAY_STYLE_OPT_BTN
				&& promptInfo.getDisplayStyleValue() != PromptStyle.DISPLAY_STYLE_PULL_DOWN
				&& promptInfo.getDisplayStyleValue() != PromptStyle.DISPLAY_STYLE_TREE) {

			validateTagBuf
			.append("\\n\\n")
			.append(SystemMessage.getMessage("error.config.prompt.min-text", InstanceCreation.cStringArray(StringUtil.NVL(promptInfo.getMin(),SystemMessage.getMessage("error.config.prompt.null-text")))))
			.append(", ")
			.append(SystemMessage.getMessage("error.config.prompt.max-text",InstanceCreation.cStringArray(StringUtil.NVL(promptInfo.getMax(),SystemMessage.getMessage("error.config.prompt.null-text")))));
		}

		validateTagBuf.append("'); return false; }");

		return validateTagBuf;
	}

	String getScriptString(boolean enableDisplayStyle[], String contextPath, String cartCloseImage, String cartOpenImage,
			String validatePromptName) {

		StringBuffer promptTag = new StringBuffer(2000);

		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_CART]) {
			promptTag
			.append(
					"\nfunction togglePromptList(divID, imgID) {  var divDisplay = jQuery('#' + divID).css('display');if(divDisplay == 'none') {    jQuery('#' + imgID).attr('src', '")
			.append(contextPath).append(cartCloseImage)
			.append("');    jQuery('#' + divID).slideToggle('show');} else {    jQuery('#' + imgID).attr('src', '").append(contextPath)
			.append(cartOpenImage).append("');    jQuery('#' + divID).slideToggle('hide');  }}");
		}
		promptTag.append("\nfunction ").append(validatePromptName)
		.append("(objName, isRequired, min, max, displayStyle) {  var cnt = 0;  if (false) {");
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_TEXT_BOX]) {
			promptTag
			.append(" } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_TEXT_BOX)
			.append(
					") {    if (isRequired) {     cnt = jQuery('input[name=' + objName + ']').val().length;   if ((cnt > max || cnt < min) || cnt == 0) {return false;}   }");
		}
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_OPT_BTN]) {
			promptTag
			.append(" } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_OPT_BTN)
			.append(
					") {    if (isRequired) {     cnt = jQuery('input:radio[name=' + objName + ']:checked').length;     if(cnt < 1) {return false;}   }");
		}
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_CHECKBOX]) {
			promptTag
			.append(" } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_CHECKBOX)
			.append(
					") {    cnt = jQuery('input:checkbox[name=' + objName + ']:checked').length;    if (max == 'null') max = cnt;   if (min == 'null') min = cnt;   if (isRequired) {     if (cnt > max || cnt < min) {return false;}   } else {      if (cnt > max) {return false;}    }");
		}
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_LIST]) {
			promptTag
			.append(" } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_LIST)
			.append(
					") {    cnt = jQuery('select[name=' + objName + '] > option:selected').length;    if (max == 'null') max = cnt;   if (min == 'null') min = cnt;   if (isRequired) { if (cnt > max || cnt < min) return false;   } else {      if (cnt > max) {return false;}   }");
		}
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_PULL_DOWN]) {
			promptTag
			.append(" } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_PULL_DOWN)
			.append(
					") {    if (isRequired) {     if(jQuery('select[name=' + objName + '] > option:selected').val() == '') {return false;}    }");
		}
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_CART]) {
			promptTag
			.append(" } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_CART)
			.append(") {    cnt = $('select[name='+objName+'] option:selected').length;   if (max == 'null') max = cnt;   if (min == 'null') min = cnt;   if (isRequired) {     if (cnt > max || cnt < min || cnt == '0') return false;   } else {      if (cnt > max) {return false;}    }");
		}
		if (enableDisplayStyle[PromptStyle.DISPLAY_STYLE_TREE]) {
			promptTag
			.append("   } else if (displayStyle == ")
			.append(PromptStyle.DISPLAY_STYLE_TREE)
			.append(
					") {    if (isRequired) {     var isOkay  = false;      $('select[name*=' + objName + ']').each(function(){       if($(this).find('option:selected').size() > 0 ){          isOkay = true;        }     });     if(!isOkay){        return false;     }   }");
		}

		return promptTag.toString();
	}
}
