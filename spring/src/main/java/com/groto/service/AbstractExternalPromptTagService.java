package com.groto.service;

import java.io.Serializable;
import java.util.List;

import com.groto.cmm.util.DateUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.cmm.util.CmmUtil;
import com.microstrategy.web.objects.WebConstantPrompt;
import com.microstrategy.webapi.EnumDSSXMLObjectSubTypes;
import com.mstr.business.model.CustomAnswer;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptInfo;

/**
 *  Class Name  : AbstractExternalPromptTagService
 *  Description : 프롬프트 태그 서비스 추상 클래스
 *  
 *  Modification Information
 * 
 *  Mod Date      Modifier Description
 *  -----------   -------- ---------------------------
 *  2012. 3. 9.	   jjpark		Generation
 *
 *  @author jjpark
 *  @since 2012. 3. 9.
 *  @version 1.0
 */
public abstract class AbstractExternalPromptTagService extends AbstractSessionUserService implements ExternalPromptTagService, Serializable {

  private static final long serialVersionUID = -8935681738311186775L;

  public abstract String getTableLayout() throws Exception;

  /*
   * 프롬프트 HTML 가져오기 (DISPLAY 용)
   * 
   * @see
   * com.groto.service.ExternalPromptTagService#getPromptTagByDisplayStyle(com.mstr.business.model
   * .PromptInfo, java.lang.String, java.lang.String)
   */
  public String getPromptTagByDisplayStyle(PromptInfo promptInfo, String objectId, String locale) throws Exception {

    String promptTag = "";   
    return promptTag;
  }

  
  public String getPromptTagByDisplayStyle(PromptInfo promptInfo, String objectId, String locale, String nextMean, String prevMean) { 

    StringBuffer promptTag = new StringBuffer();
    
    // 프롬프트 스타일 변경
    String messageString = "mstr.config.prompt.display-style-" + promptInfo.getDisplayStyleValue()+ ".value";
    int newDisplayStyleValue = Integer.parseInt(SystemMessage.getMessage(messageString, new String[] {"0"}));
    if (newDisplayStyleValue == 0) {
      newDisplayStyleValue = promptInfo.getDisplayStyleValue();
    }
           
    switch (newDisplayStyleValue) {
    
      case PromptStyle.DISPLAY_STYLE_TEXT_BOX:
        promptTagStyle(promptTag, promptInfo, objectId, nextMean, prevMean);
        break;
 
      case PromptStyle.DISPLAY_STYLE_LIST:
        promptTag.append(createPromptTagForList(promptInfo, nextMean)); // nextmean 추가 
        break;

      case PromptStyle.DISPLAY_STYLE_PULL_DOWN:
        promptTag.append(createPromptTagForPullDown(promptInfo, nextMean, prevMean)); // nextmean 추가 
        break;

      case PromptStyle.DISPLAY_STYLE_CART:
        promptTag.append(createPromptTagForCart(promptInfo));
        break;

      // 계층형의 경우 웹옵션에서 카트로 설정 해줘야 함
      case PromptStyle.DISPLAY_STYLE_TREE:
        promptTag.append(createPromptTagForTree(promptInfo, objectId));
        break;

      default:
    }

    return promptTag.toString();
  }
  
  private void promptTagStyle(StringBuffer promptTag, PromptInfo promptInfo, String objectId, String nextMean, String prevMean){
    
    ExternalPromptAssist assist = new ExternalPromptAssist();
    
    WebConstantPrompt webConProm = (WebConstantPrompt) promptInfo.getWebConPrompt();
    String typeVal = assist.webComPrompType(webConProm);
    
    // 달력
    if (StringUtil.isEqual(promptInfo.getMin(), "8") && StringUtil.isEqual(promptInfo.getMax(), "8")) {
      promptTag.append(createPromptTagForTextBoxWithCalendarDay(promptInfo, typeVal, objectId, nextMean, prevMean));  // nextmean 추가 
      // 달력
    } else if (webConProm.getSubType() == EnumDSSXMLObjectSubTypes.DssXmlSubTypePromptDate) {
      String str = createPromptTagForTextBoxWithCalendarDay(promptInfo, typeVal, objectId, nextMean, prevMean);  // nextmean 추가 
      promptTag.append(str);
      // 월 6자리고 yymm 표시가 있는 경우
    } else if (StringUtil.isEqual(promptInfo.getMin(), "6") && StringUtil.isEqual(promptInfo.getMax(), "6")
        && promptInfo.getMeaning().toLowerCase().contains("yymm")) {
      String str =  createPromptTagForTextBoxWithCalendarMonth(promptInfo, typeVal, objectId, nextMean, prevMean);  // nextmean 추가 
      promptTag.append(str);
    } else {
      promptTag.append(createPromptTagForTextBox(promptInfo, typeVal, objectId, nextMean, prevMean));  // nextmean 추가 
    }
  }
  
  public String getPromptExceptionTag(String errorMessage, String validateScriptName) {
    
    StringBuffer promptTag = new StringBuffer(1000);
    promptTag.append("<div id='comment' class='comment'><p class='bold'>")
    .append(SystemMessage.getMessage("message.config.exception.message-1"))
    .append("</p><p class='bold'>").append(errorMessage)
    .append("</p><p class='bold'>").append(SystemMessage.getMessage("message.config.exception.message-2"))
    .append("</p></div><script>function ")
    .append(validateScriptName).append("() { return false; }</script>");
    return promptTag.toString();
  }
 
  public abstract List<CustomAnswer> getCustomAnswerForTree() throws Exception;

  /**
   * DISPLAY_STYLE_TEXT_BOX
   * 
   * @param promptInfo
   * @return
   */
  protected String createPromptTagForTextBox(PromptInfo promptInfo, String typeVal, String objectId) {
   
    StringBuffer promptTag = new StringBuffer(1000);

    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
    String attrName = "";
    String id = "";
    String readOnly = "";
    String mean = promptInfo.getMeaning();
    
    ExternalPromptAssist assist = new ExternalPromptAssist();
    
    promptTag.append(assist.promptTagTextBox(promptInfo, mean));

    // 달력 from-to
    if ((promptInfo.getChildUnitCnt() == 1 || promptInfo.getChildUnitCnt() == 3 || promptInfo.getChildUnitCnt() == 5)
        && mean.toLowerCase().contains("to")) {
      promptTag.append("&nbsp;&nbsp;~&nbsp;&nbsp;");
    }

    attrName = assist.promptTagTextAttr(promptInfo, mean);

    String maxLength = "";
    if ("date".equals(typeVal)) {
      id = "date" + promptInfo.getChildUnitCnt();
      readOnly = "";
    } else if ("int".equals(typeVal)) {
      id = "text" + promptInfo.getChildUnitCnt();
      readOnly = " onKeyPress=\"return numbersonly(event);\" ";
      maxLength = "maxlength='10'";
    } else {
      id = "text" + promptInfo.getChildUnitCnt();
      readOnly = "";
      maxLength = "maxlength='10'";
    }

    promptTag.append( "<input id='").append(id)
    .append("' type='text' mstrtype='").append(typeVal)
    .append("' class='text-field' name='").append(promptParamName)
    .append(promptInfo.getPin()).append("' ").append(readOnly).append(attrName);
    if (StringUtil.isNotEmpty(promptInfo.getMax())) {
      promptTag.append(" maxlength='").append(promptInfo.getMax()).append('\'');
    }
    promptTag.append("value='").append(promptInfo.getWebConPrompt().getDefaultAnswer()).append('\'')
    .append(maxLength).append("/></dd>");
    return promptTag.toString();
  }
  
  protected String createPromptTagForTextBox(PromptInfo promptInfo, String typeVal, String objectId, String nextMean, String prevMean) {

    StringBuffer promptTag = new StringBuffer(1000);
    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
    String attrName = "";
    String id = "";
    String readOnly = "";

    String mean = promptInfo.getMeaning();

    promptTag.append(createFromToTagStart( promptInfo,  mean ,  nextMean, prevMean));
    
    if (mean.contains("date") && mean.split("date").length > 1) {
      attrName = " datetype='" + promptInfo.getMeaning().split("date")[1].replaceAll("\\(", "").replaceAll("\\)", "").toLowerCase() + "' ";
    }
    
    String maxLength = "";
    if ("date".equals(typeVal)) {
      id = "date" + promptInfo.getChildUnitCnt();
      readOnly = "";
    } else if ("int".equals(typeVal)) {
      id = "text" + promptInfo.getChildUnitCnt();
      readOnly = " onKeyPress=\"return numbersonly(event);\" ";
      maxLength = "maxlength='10'";
    } else {
      id = "text" + promptInfo.getChildUnitCnt();
      readOnly = "";
      maxLength = "maxlength='10'";
    }

    promptTag.append("<input id='").append(id).append("' type='text' mstrtype='")
    .append(typeVal).append("' class='text-field' name='").append(promptParamName).append(promptInfo.getPin())
    .append("' ").append(readOnly).append(attrName);
    
    if (StringUtil.isNotEmpty(promptInfo.getMax())) {
      promptTag.append(" maxlength='").append(promptInfo.getMax()).append('\'');
    }
    
    String val = promptInfo.getWebConPrompt().getDefaultAnswer();
  
    if ( val == null ) val = "";
 
    promptTag.append("value='").append(val).append('\'')
    .append(maxLength).append("/>")
    .append(createFromToTagEnd(mean , nextMean));
    
    return promptTag.toString();
  }  
 
  protected String createPromptTagForTextBoxWithCalendarDay(PromptInfo promptInfo, String typeVal, String objectId, String nextMean, String prevMean) {
    
    String yesterday = "";

    if (promptInfo.isDefaultAnswer()) { // 칼렌더 기본 값이 있으면 셋팅 해야 한다. bae
      WebConstantPrompt wcp = promptInfo.getWebConPrompt();
      if (!"".equals(wcp.getDefaultAnswer())) {
        yesterday = wcp.getDefaultAnswer();
      }
    } else {
      yesterday = DateUtil.getDate(-1, "yyyy-MM-dd");
    }

    StringBuffer promptTag = new StringBuffer(1000);
    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
 
    String textBoxName = promptParamName + promptInfo.getPin();
    String attrName = "";
    String mean = promptInfo.getMeaning();

    if (promptInfo.getMeaning().contains("date")) {
      attrName = " datetype='" + promptInfo.getMeaning().split("date")[1].replaceAll("\\(", "").replaceAll("\\)", "").toLowerCase() + "' ";
    }
    promptTag.append(createFromToTagStart( promptInfo,  mean ,  nextMean, prevMean))
    .append("<input type='text' maxlength='10' id='datepicker")
    .append(promptInfo.getChildUnitCnt() + 1)
    .append("' name='").append(textBoxName).append("' desc='")
    .append(promptInfo.getId()).append("' class='cal-field' ")
    .append(attrName).append( " value='").append(yesterday).append("' mstrtype='")
    .append(typeVal).append("' />")
    .append(createFromToTagEnd(mean , nextMean));

    return promptTag.toString();
  }

  
  /**
   * DISPLAY_STYLE_TEXT_BOX - Month Calendar 월 달력
   * 
   * @param promptInfo
   * @return
   */
  protected String createPromptTagForTextBoxWithCalendarMonth(PromptInfo promptInfo, String typeVal, String objectId, String nextMean, String prevMean) {
  
    StringBuffer promptTag = new StringBuffer(1000);
    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
    String textBoxName = promptParamName + promptInfo.getPin();
 
    java.util.Date prevMonth = com.groto.cmm.util.DateUtil.rollDays(new java.util.Date(), -1);

    String strDefaultMonth = com.groto.cmm.util.DateUtil.formatDate(prevMonth, "yyyyMM");
 
    String mean = promptInfo.getMeaning();

    promptTag.append(createFromToTagStart( promptInfo,  mean ,  nextMean, prevMean))
    .append("<input type='text' maxlength='6'  class='text-field' id='monthpicker_")
    .append(textBoxName).append("' name='").append(textBoxName).append("' value='")
    .append(strDefaultMonth).append("' desc='").append(promptInfo.getId()).append("'   mstrtype='").append(typeVal).append("'/>")
    .append(createFromToTagEnd(mean , nextMean));
    
    return promptTag.toString();
  }
  
  /**
   * DISPLAY_STYLE_OPTION_BUTTON
   * 
   * @param promptInfo
   * @return
   * @throws Exception
   */
  protected String createPromptTagForOptionButton(PromptInfo promptInfo) throws Exception {
    return createPromptInnerTable(promptInfo, PromptStyle.DISPLAY_STYLE_OPT_BTN);
  }

  /**
   * DISPLAY_STYLE_CHECKBOX
   * 
   * @param promptInfo
   * @return
   * @throws Exception
   */
  protected String createPromptTagForCheckbox(PromptInfo promptInfo) throws Exception {
    return createPromptInnerTable(promptInfo, PromptStyle.DISPLAY_STYLE_CHECKBOX);
  }

  protected String createPromptTagForList(PromptInfo promptInfo  , String nextMean) {
    StringBuffer promptTag = new StringBuffer(1000);
    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
    promptTag.append("<th ");
    if (promptInfo.isRequired()) {
      promptTag.append(" style='color:red;' ");
    } 
    promptTag.append('>')
    .append(promptInfo.getTitle().split("\\(")[0])
    .append("</th><td><select name='")
    .append(promptParamName).append(promptInfo.getPin()).append("' class=\"SlectBox\" placeholder=\"\">");
    
    for (PromptAnswer promptAnswer : promptInfo.getPromptAnswerList()) {
      promptTag.append("<option value='").append(promptAnswer.getObjectID()).append('\'');
      if (promptAnswer.isDefaultAnswer()) {
        promptTag.append(" selected");
      }
      promptTag.append("> ").append(promptAnswer.getDisplayName()).append("</option>");
    }
    promptTag.append("</select></td>");
    
    return promptTag.toString();
  }
  
  protected String createPromptTagForPullDown(PromptInfo promptInfo , String nextMean, String prevMean) {
    
    StringBuffer promptTag = new StringBuffer(1000);
    ExternalPromptAssist assist = new ExternalPromptAssist();
    
    String isFilter = "false"; // select-box 필터 사용 여부

     /** 검색 기능 어트리뷰트 **/
    for (int jj = 0; jj < SystemMessage.getMessage("mstr.config.en-srch-att-name").split("[|]").length; jj++) {
        if (!isFilter.equals("true") && promptInfo.getName().equals(SystemMessage.getMessage("mstr.config.en-srch-att-name").split("[|]")[jj])) {
          isFilter = "true";
          continue;
        }
    }
    for (int jj = 0; jj < SystemMessage.getMessage("mstr.config.kr-srch-att-name").split("[|]").length; jj++) {
        if (!isFilter.equals("true") && promptInfo.getDisplayName().equals(SystemMessage.getMessage("mstr.config.kr-srch-att-name").split("[|]")[jj])) {
          isFilter = "true";
          continue;
        }
    }
 
    /** 검색 기능 어트리뷰트 **/
    assist.promptTagPullDown(promptTag, promptInfo, nextMean, prevMean, isFilter);
 
    return promptTag.toString();
  }
  
  /**
   * DISPLAY_STYLE_CART (일반적인 생성)
   * 
   * @param promptInfo
   * @return
   * @throws Exception
   */
  protected String createPromptTagForCart(PromptInfo promptInfo){

    String isFilter = "false"; // select-box 필터 사용 여부
    StringBuffer promptTag = new StringBuffer(1000);

    /** 검색 기능 어트리뷰트 **/
    for (int jj = 0; jj < SystemMessage.getMessage("mstr.config.en-srch-att-name").split("[|]").length; jj++) {
        if (!isFilter.equals("true") && promptInfo.getName().equals(SystemMessage.getMessage("mstr.config.en-srch-att-name").split("[|]")[jj])) {
          isFilter = "true";
          continue;
        }
    }
    for (int jj = 0; jj < SystemMessage.getMessage("mstr.config.kr-srch-att-name").split("[|]").length; jj++) {
        if (!isFilter.equals("true") && promptInfo.getDisplayName().equals(SystemMessage.getMessage("mstr.config.kr-srch-att-name").split("[|]")[jj])) {
          isFilter = "true";
          continue;
        }
    }

    // 타이틀 설정
    promptTag.append("<th scope='row' ");
    if (promptInfo.isRequired()) {
      promptTag.append(" style='color:red;' ");
    } 
    
    promptTag.append('>')
    .append(promptInfo.getTitle().split("\\(")[0])
    .append("</th><td>");
      
    assistPromptTagForCart(promptInfo, promptTag);
    
    return promptTag.toString();
  }
  
  private void assistPromptTagForCart(PromptInfo promptInfo, StringBuffer promptTag) {

	  String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
	  String isMulti = "multi";
	  // 싱글 멀티 설정
	  if (Integer.parseInt(CmmUtil.nvl(promptInfo.getMax(), "0")) == 1) {
		  isMulti = "single";
	  }
	  
	  String objId = promptInfo.getId();
	  /*** 캠페인번호 프롬프트인 경우 콤보박스를 사용하지 않고, input 태그로 별도 처리한다. */
	  /*** 여행사 코드도 대량 데이터이므로 처리에 추가 2018.10.29 */
	  if("F0F8D7F9429E9AE25B4919806FF8D1A3".equals(objId) || "42B786E141C0B3CF21D118A1C3E31571".equals(objId)) {
		  promptTag.append("<input type=text id='")
		  .append(promptParamName).append(promptInfo.getPin())
		  .append("' data-name='").append(promptParamName).append(promptInfo.getPin())
		  .append("' data-pin='").append(promptInfo.getPin())
		  .append("' style='width:142px; height: 26px; float:left;padding-right:24px;' onkeydown=\"if(event.keyCode==13) { ");

		  if("single".equals(isMulti)) {
			  promptTag.append("openSingleSearchDiv('").append(promptParamName).append(promptInfo.getPin()).append("',1); }\"");
		  }else {
			  promptTag.append("openSearchDiv('").append(promptParamName).append(promptInfo.getPin()).append("',1); }\"");
		  }    	

		  promptTag.append( " displaytype='").append(isMulti)
		  .append("' reportId='").append(promptInfo.getReportID()).append('\'');

		  if("single".equals(isMulti)) {
			  promptTag.append(" autocomplete=\"off\" /><img onclick='openSingleSearchDiv(\"");
		  }else {
			  promptTag.append(" autocomplete=\"off\" /><img onclick='openSearchDiv(\"");
		  }
		  promptTag.append(promptParamName).append(promptInfo.getPin()).append("\",1); 'style='margin-top:6px;margin-left:5px;cursor:pointer;' src='/resource/images/btn_search3.png'>");

		  if("single".equals(isMulti)) {
			  promptTag.append("<img onclick='clearTxt(\"").append(promptParamName).append(promptInfo.getPin()).append("\");' style='margin-top:7px;margin-left:-40px;opacity:0.5;cursor:pointer;' src='/df/images/ico_trash.png'>");
		  }else {
			  promptTag.append("<img onclick='clearParam(\"").append(promptParamName).append(promptInfo.getPin()).append("\");' style='margin-top:5px;margin-left:-20px;float:left;opacity:0.5;cursor:pointer;' src='/df/images/ico_trash.png'>");
		  }

		  promptTag.append("<select name='").append(promptParamName).append(promptInfo.getPin());
		  if("single".equals(isMulti)) {
			  promptTag.append("' ");
		  }else {
			  promptTag.append("' multiple='multiple' ");
		  }
		  promptTag.append("style='display:none;'></select>" );   
	  }else {
		  promptTag.append("<select name='")
		  .append(promptParamName)
		  .append(promptInfo.getPin())
		  .append("' class=\"SlectBox\" id='")
		  .append(promptParamName)
		  .append(promptInfo.getPin())
		  .append("' displaytype='").append(isMulti).append('\'');

		  ExternalPromptAssist assist = new ExternalPromptAssist();
		  assist.promptTagCart(isMulti, promptTag, promptInfo);  
	  }
  }
  
  /**
   * DISPLAY_STYLE_TREE
   * 
   * @param promptInfo
   * @return
   * @throws Exception
   * @description 계층형의 경우 웹옵션을 카트로 지정 하고, 세부 출력 형식은 어트리뷰트별로 하드코딩
   */
  protected String createPromptTagForTree(PromptInfo promptInfo, String company) {
 
    StringBuffer promptTag = new StringBuffer(1000);
    ExternalPromptAssist assist = new ExternalPromptAssist();

    promptTag.append("<th ");
    if (promptInfo.isRequired()) {
      promptTag.append(" style='color:red;' ");
    }  
    promptTag.append('>')
    .append(promptInfo.getTitle().split("\\(")[0])
    .append("</th><td colspan='3'><dd class='datepicker'> ")
    .append(assist.promptTagTree(promptInfo))
    .append("</dd></td>");
    
    return promptTag.toString();
  }
  
  
  /**
   * DISPLAY_STYLE Inner Table
   * 
   * - DISPLAY_STYLE_OPTION_BUTTON - DISPLAY_STYLE_CHECKBOX  
   * 
   * @param promptInfo
   * @param displayStyleValue
   * @return
   */
  protected String createPromptInnerTable(PromptInfo promptInfo, int displayStyleValue) {
   
    StringBuffer promptTag = new StringBuffer(1000);

    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
    
    ExternalPromptAssist assist = new ExternalPromptAssist();
 
    // bae 2017-05-17 커스트 마이징 처리 중
    String meaning = promptInfo.getMeaning();
    // 타이틀 없앰 && 라디오 버튼
    if (meaning.toLowerCase().contains("<notitle>") && displayStyleValue == PromptStyle.DISPLAY_STYLE_OPT_BTN) {
      promptTag.append("<dd class='wd41'>");
    } else {
      promptTag.append("<dt class='wd10'");
      if (promptInfo.isRequired()) {
        promptTag.append(" style='color:red;'>");
      } else {
        promptTag.append('>');
      }
      promptTag.append(promptInfo.getTitle().split("\\(")[0]);
      promptTag.append("</dt><dd class='wd21'>");
    }
    
    assist.promptInnerTable(promptInfo, promptTag, promptParamName);

    return promptTag.toString();
  }
  
  /**
   * DISPLAY_STYLE Inner Table
   * 
   * - DISPLAY_STYLE_OPTION_BUTTON - DISPLAY_STYLE_CHECKBOX - DISPLAY_STYLE_CART
   * 
   * @param promptInfo
   * @param displayStyleValue
   * @return
   */
  protected String createPromptInnerTable_NoTitle(PromptInfo promptInfo, int displayStyleValue) {

    StringBuffer promptTag = new StringBuffer();

    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
 
    String inputType = "";
    if (promptInfo != null && promptInfo.getPromptAnswerList() != null && promptInfo.getPromptAnswerList().size() > 0) {
      if (promptInfo.getDisplayStyleValue() == PromptStyle.DISPLAY_STYLE_OPT_BTN) {
        inputType = "radio";
      } else if (promptInfo.getDisplayStyleValue() == PromptStyle.DISPLAY_STYLE_CHECKBOX) {
        inputType = "checkbox";
      } else if (promptInfo.getDisplayStyleValue() == PromptStyle.DISPLAY_STYLE_CART) {
        inputType = "checkbox";
      }
 
      for (int promCnt = 0; promCnt < promptInfo.getPromptAnswerList().size(); promCnt++) {
        PromptAnswer promptAnswer = promptInfo.getPromptAnswerList().get(promCnt);
        promptTag.append("<input type='").append(inputType).append("' name='").append(promptParamName).append(promptInfo.getPin()).append('\'');
        if (promptAnswer.isDefaultAnswer()) {
          promptTag.append(" checked");
        }
        promptTag.append(" value='").append(promptAnswer.getObjectID()).append("'/>")
        .append(promptAnswer.getDisplayName());
      }
      
    }
    return promptTag.toString();
  }

}