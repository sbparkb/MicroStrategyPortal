package com.groto.service;

import java.util.List;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.SystemMessage;
import com.microstrategy.web.objects.WebConstantPrompt;
import com.microstrategy.webapi.EnumDSSXMLObjectSubTypes;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptInfo;

class ExternalPromptAssist extends AbstractSessionUserService{

  private static final long serialVersionUID = 1L;

  String webComPrompType(WebConstantPrompt webConProm){
    
    if (webConProm.getSubType() == EnumDSSXMLObjectSubTypes.DssXmlSubTypePromptDate) {
      return "date";
    } else if (webConProm.getSubType() == EnumDSSXMLObjectSubTypes.DssXmlSubTypePromptDouble
        || webConProm.getSubType() == EnumDSSXMLObjectSubTypes.DssXmlSubTypePromptLong) {
      return  "int";
    }  
    
    return "";
  }
   
   StringBuffer promptTagTextBox(PromptInfo promptInfo, String mean){
     
     StringBuffer promptTag = new StringBuffer(2000);
     
     if ((promptInfo.getChildUnitCnt() == 0 || promptInfo.getChildUnitCnt() == 2 || promptInfo.getChildUnitCnt() == 4)
         && mean.toLowerCase().contains("from")) {
       promptTag.append("<dt class='wd10' ");
       if (promptInfo.isRequired()) {
         promptTag.append(" style='color:red;'>");
       } else {
         promptTag.append('>');
       }
       promptTag.append(promptInfo.getTitle().split("\\(")[0])
       .append("</dt><dd class='wd22' >");
     } else if (!mean.toLowerCase().contains("from") && !mean.toLowerCase().contains("to")) {
       promptTag.append("<dt class='wd10' ");
       if (promptInfo.isRequired()) {
         promptTag.append(" style='color:red;'>");
       } else {
         promptTag.append('>');
       }
       promptTag.append(promptInfo.getTitle().split("\\(")[0]).append("</dt><dd class='text-field' >");
     }
     
     return promptTag;
   }
   
   String promptTagTextAttr(PromptInfo promptInfo, String mean){
     String attrName = "";
     if (mean.contains("date") && mean.split("date").length > 1) {
       attrName = " datetype='" + promptInfo.getMeaning().split("date")[1].replaceAll("\\(", "").replaceAll("\\)", "").toLowerCase() + "' ";
     }
     return attrName;
   }
   
   void promptTagPullDown(StringBuffer pPromptTag, PromptInfo promptInfo , String nextMean, String prevMean, String pIsFilter){
     
     StringBuffer promptTag = pPromptTag;
     String isMulti = "multi";
     String isFilter = pIsFilter;
     String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
     
     // 싱글 멀티 설정
     if (Integer.parseInt(CmmUtil.nvl(promptInfo.getMax(), "0")) == 1) {
       isMulti = "single";
     }

     String mean = promptInfo.getMeaning();
     promptTag.append(createFromToTagStart( promptInfo,  mean ,  nextMean, prevMean))
     .append("<select name='").append(promptParamName).append(promptInfo.getPin()).append('\'');
     if (promptInfo.getMeaning().contains("date")) {
       promptTag.append("datetype='").append(promptInfo.getMeaning().split("date")[1].replaceAll("\\(", "").replaceAll("\\)", "")).append('\'');
     }
     promptTag.append("id='").append(promptParamName).append(promptInfo.getPin()).append("' displaytype='").append(isMulti).append("' class=\"SlectBox\" ");
     if (isMulti.equals("multi")) {
       isFilter = "true";
       promptTag.append(" multiple='multiple'");
     }
  
     promptTag.append("filter='").append(isFilter).append("'  desc='").append(promptInfo.getId()).append("'>");

     if (isMulti.equals("single") && !promptInfo.isRequired()) {
       promptTag.append("<option value=''>  선   택  </option>");
     }
     for (PromptAnswer promptAnswer : promptInfo.getPromptAnswerList()) {
       promptTag.append("<option value='").append(promptAnswer.getObjectID()).append('\'');
       if (promptAnswer.isDefaultAnswer()) {
         promptTag.append(" selected");
       }
       promptTag.append("> ").append(promptAnswer.getDisplayName()).append("</option>");
     }
     promptTag.append("</select>").append(createFromToTagEnd(mean , nextMean));
     
   }
   
   void promptTagCart(String isMulti, StringBuffer pPromptTag, PromptInfo promptInfo){
     
     String isFilter = "false";
     StringBuffer promptTag = pPromptTag;
     
     if ("multi".equals(isMulti)) {
       isFilter = "true";
       promptTag.append(" multiple='multiple' ");
     }

     promptTag.append(" filter='").append(isFilter).append("'  desc='").append(promptInfo.getId()).append( "'>");

     if (isMulti.equals("single") && !promptInfo.isRequired()) {
       promptTag.append("<option value=''>  전    체  </option>");
     }

     for (PromptAnswer promptAnswer : promptInfo.getPromptAnswerList()) {
       promptTag.append("<option value='").append(promptAnswer.getObjectID()).append('\'');
       if (promptAnswer.isDefaultAnswer()) {
         promptTag.append(" selected");
       }
       promptTag.append("> ").append(promptAnswer.getDisplayName()).append("</option>");
     }
     
     promptTag.append("</select></td>");
     
   }
   
   void tagTreeAnswerElem(StringBuffer pPromptTag, PromptAnswer pPromptAnswer
       , PromptInfo promptInfo
       , String promptParamName, String pIsMulti, String pIsFilter
       , int index, int max, int answerSize, boolean useCustomAnswer){
     
     StringBuffer promptTag = pPromptTag;
     PromptAnswer promptAnswer = pPromptAnswer;
     String isFilter = pIsFilter;
     String isMulti = pIsMulti;
     
     if (max == 1) {
       isMulti = "single";
     }

     // 타이틀 설정
     if (index > 0) {
       promptTag.append("&nbsp;&nbsp;");
     }
     
     /*** 브랜드, 캠페인번호 애트리뷰트를 사용하는 경우에는 콤보박스를 사용하지 않고, input 태그로 별도 처리한다. */
     String objId = promptAnswer.getObjectID();
     
	 StringBuffer mstrIdBuff = new StringBuffer();
	 mstrIdBuff.append(promptParamName).append("ID").append(promptInfo.getPin()).append('_').append(index + 1);
	 String mstrId = mstrIdBuff.toString();
     
     if("5399455F4AFD2DAE725A1AB98248AE8E".equals(objId) || "0701A3314BEE40F220CA98A45D75B99C".equals(objId)) {
    	 assitTagTreeLargeAnswerElem(promptTag, promptInfo, promptAnswer, mstrId, isMulti, promptParamName, index);
     }else {
    	 assitTagTreeAnswerElem(promptTag, promptInfo, promptAnswer, mstrId, isMulti, isFilter, promptParamName, index, answerSize, useCustomAnswer);
     }
     
   }
   
   private void assitTagTreeAnswerElem(
		   StringBuffer promptTag, 
		   PromptInfo promptInfo, 
		   PromptAnswer promptAnswer, 
		   String mstrId, 
		   String isMulti, 
		   String pIsFilter,
		   String promptParamName, 
		   int index,
		   int answerSize, 
		   boolean useCustomAnswer) {
	   
	   String isFilter = pIsFilter;
	   promptTag.append("<select placeholder='").append(promptAnswer.getDisplayName())
       .append("' attrId='").append(promptAnswer.getObjectID()).append("' nextId='") .append(promptParamName)
       .append("ID").append(promptInfo.getPin()).append('_').append(index + 2)
       .append("' class=\"SlectBox\"  id='")
       .append(mstrId).append('\'');
	   
       promptTag.append("  name='").append(promptParamName).append('_').append(index + 1).append("' ");
       
       promptTag.append( " displaytype='").append(isMulti).append("' ");
       
       if (isMulti.equals("multi")) {
         promptTag.append(" multiple='multiple'");
         isFilter = "true";
       }

       if (isFilter.equals("true")) {
         promptTag.append(" filter='true' ");
       }

       if (index < (answerSize - 1) && (!useCustomAnswer || !promptAnswer.isCustomAnswer())) {
         promptTag.append( " onchange='getChildCustomElementList(this.id, \"")
         .append(promptParamName)
         .append("ID").append(promptInfo.getPin()).append('_').append(index + 2).append("\", \"")
         .append(isMulti).append("\", \"").append(promptInfo.getReportID()).append("\");'  ");
       }
       
       promptTag.append(" >");
   }
		      
   private void assitTagTreeLargeAnswerElem(
		   StringBuffer promptTag, 
		   PromptInfo promptInfo, 
		   PromptAnswer promptAnswer, 
		   String mstrId, 
		   String isMulti, 
		   String promptParamName, 
		   int index ) {

	   promptTag.append("<input data-css=cascade type=text style='padding-right:20px;width:142px; height: 26px; float:left;margin-left:5px;' onkeydown=\"if(event.keyCode==13) { ");
	   if("single".equals(isMulti)) {
		   promptTag.append("openCssSingleSearchDiv('").append(mstrId).append("',1); }\"");
	   }else {
		   promptTag.append("openCssSearchDiv('").append(mstrId).append("',1); }\"");
	   }
	   promptTag.append(" attrId='").append(promptAnswer.getObjectID()).append("' id='")
	   .append(mstrId).append('\'');
	   if(promptInfo.isCustTag()) {
		   promptTag.append(" data-name='").append(promptParamName).append(promptInfo.getOrgPIN() +index).append("' ");
	   } else {
		   promptTag.append(" data-name='").append(promptParamName).append(promptInfo.getPin()).append("' ");
	   }
	   promptTag.append( " displaytype='").append(isMulti).append("' reportId='").append(promptInfo.getReportID()).append('\'');
	   if("single".equals(isMulti)) {
		   promptTag.append(" autocomplete=\"off\" /><img onclick='openCssSingleSearchDiv(\"");
	   }else {
		   promptTag.append(" autocomplete=\"off\" /><img onclick='openCssSearchDiv(\"");
	   }
	   promptTag.append(mstrId).append("\",1);' style='margin-top:6px;cursor:pointer;' src='/resource/images/btn_search3.png'>");

	   if("single".equals(isMulti)) {
		   promptTag.append("<img onclick='clearTxt(\"").append(mstrId).append("\");' style='margin-top:7px;margin-left:-40px;opacity:0.5;cursor:pointer;' src='/df/images/ico_trash.png'>");  
	   }else {
		   promptTag.append("<img onclick='clearParam(\"").append(mstrId).append("\");' style='margin-top:5px;margin-left:-20px;float:left;opacity:0.5;cursor:pointer;' src='/df/images/ico_trash.png'>");
	   }         

	   if(promptInfo.isCustTag()) {
		   promptTag.append("<select name='").append(promptParamName).append(promptInfo.getOrgPIN() +index).append("' ");	 
	   }else {
		   promptTag.append("<select name='").append(promptParamName).append(promptInfo.getPin()).append("' ");
	   }

	   if("single".equals(isMulti)) {
		   promptTag.append(' ');
	   }else {
		   promptTag.append(" multiple='multiple' ");
	   }
	   promptTag.append("style='display:none;'></select>" );
   }
   
   void tagTreeElemList(StringBuffer pPromptTag, PromptAnswer promptAnswer, String isMulti){
     
     StringBuffer promptTag = pPromptTag;
     
     List<PromptAnswer> elementList = promptAnswer.getExpElementList();
     
     if (!isMulti.equals("multi")) {
       promptTag.append("<option value='' title='")
       .append(promptAnswer.getDisplayName())
       .append("'>")
       .append(promptAnswer.getDisplayName())
       .append("</option>");
     }
     
     if (elementList != null && elementList.size() > 0) {
       for (PromptAnswer element : elementList) {

         promptTag.append( "<option value='").append(element.getObjectID()).append("' title='").append(element.getDisplayName()).append('\'');

         // 디폴트 응답값
         if (promptAnswer.isDefaultAnswer()) {
           promptTag.append(" selected");
         }

         promptTag.append(" >").append(element.getDisplayName().split("\\:")[0]).append("</option>");
       }
     }
   }
   
   void promptInnerTable(PromptInfo promptInfo, StringBuffer promptTag, String promptParamName){
     
     String inputType = "";
     if (promptInfo != null && promptInfo.getPromptAnswerList() != null && promptInfo.getPromptAnswerList().size() > 0) {
       if (promptInfo.getDisplayStyleValue() == PromptStyle.DISPLAY_STYLE_OPT_BTN) {
         inputType = "radio";
       } else if (promptInfo.getDisplayStyleValue() == PromptStyle.DISPLAY_STYLE_CHECKBOX) {
         inputType = "checkbox";
       }
  
       for (int promCnt = 0; promCnt < promptInfo.getPromptAnswerList().size(); promCnt++) {
         PromptAnswer promptAnswer = promptInfo.getPromptAnswerList().get(promCnt);
  
         promptTag.append( "<input type='").append(inputType).append("' id='")
         .append(promptAnswer.getObjectID()).append( "' name='")
         .append(promptParamName).append(promptInfo.getPin()).append('\'');
         if (promptAnswer.isDefaultAnswer()) {
           promptTag.append(" checked");
         }
         promptTag.append(" value='").append(promptAnswer.getObjectID()).append("' /><label for='").append(promptAnswer.getObjectID())
         .append("' >").append(promptAnswer.getDisplayName()).append("</label>&nbsp;");
  
       }
       promptTag.append("</dd>");       
     }
   }
   
   StringBuffer promptTagTree(PromptInfo promptInfo){
     
     int answerSize = promptInfo.getPromptAnswerList().size();
     PromptAnswer promptAnswer = null;
     String isFilter = "false"; // select-box 필터 사용 여부
     String isMulti = "multi";
     String compNameId = ""; //SystemMessage.getMessage("mstr.config.prompt.compnay-obj-id");
     String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
     boolean useCustomAnswer = Boolean.parseBoolean(SystemMessage.getMessage("mstr.config.prompt.display-style-7.custom-answer.enable", new String[] {"false"}));
     StringBuffer promptTag = new StringBuffer();
     ExternalPromptAssist assist = new ExternalPromptAssist();
     
     for (int i = 0; i < answerSize; i++) {

       promptAnswer = promptInfo.getPromptAnswerList().get(i);
       isMulti = "multi";

       // 회사코드 object-id 의 경우
       if (!promptAnswer.getObjectID().equals(compNameId)) {
         /** 검색 기능 어트리뷰트 **/
         for (int jj = 0; jj < SystemMessage.getMessage("mstr.config.en-srch-att-name").split("[|]").length; jj++) {
             if (!isFilter.equals("true") 
                 && promptInfo.getName().equalsIgnoreCase(SystemMessage.getMessage("mstr.config.en-srch-att-name").split("[|]")[jj])) {
               isFilter = "true";
               continue;
             }
         }
         
         for (int jj = 0; jj < SystemMessage.getMessage("mstr.config.kr-srch-att-name").split("[|]").length; jj++) {

           if (!isFilter.equals("true") && promptInfo.getDisplayName().contains(SystemMessage.getMessage("mstr.config.kr-srch-att-name").split("[|]")[jj])) {
             isFilter = "true";
             continue;
           }
         }

         /** 검색 기능 어트리뷰트 **/
         // 싱글 멀티 설정
         int max = Integer.parseInt(CmmUtil.nvl(promptInfo.getMax(), "0"));
         assist.tagTreeAnswerElem(promptTag, promptAnswer, promptInfo, promptParamName, isMulti, isFilter, i, max, answerSize, useCustomAnswer);
       
         assist.tagTreeElemList(promptTag, promptAnswer, isMulti);
  
         promptTag.append("</select>");
       }
     }
       return promptTag;
   }
   
}//end of class
