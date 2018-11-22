package com.groto.tags;

import java.io.IOException;
import java.io.Serializable;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.groto.cmm.exception.PromptException;
import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.service.ExternalPromptTagService;
import com.groto.service.impl.DefaultExternalReportServiceImpl;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.mstr.business.model.PromptInfo;

/**
 * Class Name : GBIPromptTag Description : GBI 프롬프트 Tag(JSTL)
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2015. 9. 23.
 * lastpice Generation
 * 
 * @author lastpice
 * @since 2015. 9. 23. 오후 1:33:07
 * @version 1.0
 */

@Repository
public class GBIPromptTag extends BodyTagSupport implements Serializable {

  private static final long serialVersionUID = 3800946314907421924L;

  private transient final Logger logger = LoggerFactory.getLogger(getClass());

  /**
   * 리포트 ObjectID(required)
   */
  private String objectID = "";

  /**
   * 리포트 displayUnitType(required)
   */
  private int displayUnitType;

  private String subType = "";

  private String locale = "";

  private String sessionid = "";

  private transient final String webServerUrl = SystemMessage.getMessage("URL.WEB.SERVER");

  // Report Service Interface
  @Autowired
  DefaultExternalReportServiceImpl reportService;

  // Prompt Service Interface
  @Autowired
  ExternalPromptTagService promptTagService;

  /**
   * @return the objectID
   */
  public String getObjectID() {
    return objectID;
  }

  /**
   * @param objectID the objectID to set
   */
  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  /**
   * @return the displayUnitType
   */
  public int getDisplayUnitType() {
    return displayUnitType;
  }

  /**
   * @param displayUnitType the displayUnitType to set
   */
  public void setDisplayUnitType(int displayUnitType) {
    this.displayUnitType = displayUnitType;
  }


  public String getSubType() {
    return subType;
  }

  public void setSubType(String subType) {
    this.subType = subType;
  }

  public String getLocale() {
    return locale;
  }

  public void setLocale(String locale) {
    this.locale = locale;
  }


  public String getSessionid() {
    return sessionid;
  }

  public void setSessionid(String sessionid) {
    this.sessionid = sessionid;
  }

  public int doStartTag() throws JspTagException {

    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();

    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    serverSession.restoreState(String.valueOf(request.getSession().getAttribute("usrSmgr1")));

    // =====================================================================
    // 스프링 설정
    // =====================================================================
    WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(pageContext.getServletContext());

    boolean[] enableDisplayStyle = new boolean[8];

    List<PromptInfo> promptInfoList = null;

    JspWriter writer = this.pageContext.getOut();

    String reportServiceName = SystemMessage.getMessage("mstr.config.external.report-service-name");
    String promptTagServiceName = "";

    StringBuffer tags = new StringBuffer();

    try {
      if (StringUtil.isNotEmpty(objectID)) {

        // =============================================================
        // 서비스 설정
        // =============================================================
        reportService = (DefaultExternalReportServiceImpl) webApplicationContext.getBean(reportServiceName);

        String contextPath = pageContext.getServletContext().getContextPath();
        promptTagServiceName = SystemMessage.getMessage("mstr.config.external.prompt-tag.default-service-name");
        promptTagService = (ExternalPromptTagService) webApplicationContext.getBean(promptTagServiceName);

        // =============================================================
        // 프롬프트 태그 생성
        // =============================================================
        promptInfoList = reportService.getReportPromptList(sessionid, objectID, displayUnitType, request);
        if (promptInfoList == null || promptInfoList.size() <= 0) {
          return EVAL_PAGE;
        }
        
        tags.append(startTagString(promptInfoList, request, enableDisplayStyle, contextPath));
        
      }
      writer.print(tags.toString());
    } catch (PromptException pe) {
      tags.append(promptTagService.getPromptExceptionTag(pe.getMessage(), SystemMessage.getMessage("mstr.config.prompt.validate-script-name")));
      logger.error("PromptException:" + CmmUtil.exMessage(pe));
      try {
        writer.print(tags.toString());
      } catch (IOException e) {
        logger.error(CmmUtil.exMessage(e));
      }
    } catch (IOException e) {
      logger.error("IOException:" + CmmUtil.exMessage(e));
    } finally {
      try {
        serverSession.closeSession();
      } catch (WebObjectsException e) {
        logger.error("WebObjectsException:" + CmmUtil.exMessage(e));
      }
    }
    return EVAL_PAGE;
  }

  private StringBuffer startTagString(List<PromptInfo> promptInfoList, HttpServletRequest request, boolean pEnableDisplayStyle[], String contextPath)
  throws PromptException, IOException
  {

    String cartOpenImage = SystemMessage.getMessage("mstr.config.prompt.display-style-6.down-img");
    String cartCloseImage = SystemMessage.getMessage("mstr.config.prompt.display-style-6.up-img");

    // =====================================================================
    // 파라메터 설정
    // =====================================================================
    String promptParamName = SystemMessage.getMessage("mstr.config.prompt.param-name");
    String promptAjaxActionName = SystemMessage.getMessage("mstr.config.prompt.ajax-action-name");
    String validateScriptName = SystemMessage.getMessage("mstr.config.prompt.validate-script-name");

    // 프롬프트 전체 생성 태그
    StringBuffer promptTagBuf = new StringBuffer(5000);

    // 유효성 체크용 스크립트
    StringBuffer validateTagBuf = new StringBuffer(3000);

    // 계층 구조가 포함될 경우 ajax 로직 생성 스크립트
    StringBuffer treeAjaxScriptBuf = new StringBuffer();

    int newDisplayStyleValue = 0;

    boolean[] enableDisplayStyle = pEnableDisplayStyle;

    // 프롬프트 항목별 유효성 체크 함수명
    GBIPromptTagAssist assist = new GBIPromptTagAssist();
    String validatePromptName = assist.validatePromptName(validateScriptName);

    int calCnt = 0;
    int paramCnt = 0;

    int promptCnt = 0;
    int maxSize = promptInfoList.size();
    int rowCnt = 0;

    for (int i = 0; i < maxSize; i++) {

      PromptInfo promptInfo = promptInfoList.get(i);

      /**
       * 브랜드 선택 예외처리
       */
      if ("7F3D52764CF7C596D6A8D6A42BF04775".equals(promptInfo.getId()) && i + 1 < maxSize
	        && "브랜드(선택)".equals(((PromptInfo) promptInfoList.get(i + 1)).getName())) {
	      // 브랜드(선택):name
	      // 브랜드(선택):DisplayName
	      // tree 구조
	      List<PromptInfo> tempInfoList =
	          reportService.getReportPromptList(sessionid, "4108D07642AD63F9F47DEC98438FB1BA", displayUnitType, request);
	      if (tempInfoList.size() > 0) {
	        int orgPIN = promptInfo.getOrgPIN();
	        promptInfo = tempInfoList.get(0); //계층구조 프롬프트는 계층이 여러개여도 프롬프트 사이즈는 1개로 간주된다.    	
	        promptInfo.setOrgPIN(orgPIN);
	        promptInfo.setCustTag(true);
	        int answerSize = promptInfo.getPromptAnswerList().size();

	        for (int delCnt = 1; delCnt < answerSize; delCnt++) {
	          promptInfoList.remove(i + 1); // 다음프롬프트 삭제용 // custom 갯수만큼 삭제
	          maxSize--; 
	          paramCnt++;
	        }
	      }
	    }

      String nextMean = assist.nextMeanStr(promptInfoList, maxSize, i);
      String prevMean = assist.prevMeanStr(promptInfoList, i);

      paramCnt++; //파라미터 카운트증가

      // 프롬프트 스타일 변경
      newDisplayStyleValue = assist.displayStyleValue(promptInfo);      

      // ChildUnitCnt 달력 출력 건수로 사용
      promptInfo.setChildUnitCnt(calCnt);
      // 프롬프트 HTML 가져오기

      String meaning = promptInfo.getMeaning();
      if(assist.promptExceptionList(promptInfo, promptTagBuf, meaning, nextMean, promptCnt)) {
    	  promptCnt = 0;
    	  rowCnt++;
      }

      promptCnt = assist.lineOfStart(promptTagBuf, promptCnt);

      // 여러개 한꺼번에 돌릴경우 에서 에러가 나온다.
      // tag 값 설정한다. bae
      // select, calendar
      String tag = promptTagService.getPromptTagByDisplayStyle(promptInfo, objectID, locale, nextMean, prevMean);
      promptTagBuf.append(tag);

      // tree 프롬프트 카운트 처리
      promptCnt = promptCnt + assist.treePromptCnt(promptInfo);

      // row 끝처리
      rowCnt = rowCnt + assist.rowCarriageCnt(promptTagBuf, promptCnt);

      promptCnt++;

      //display style true /false 설정
      enableDisplayStyle = assist.isEnableDisplayStyle(enableDisplayStyle, newDisplayStyleValue);
      
      calCnt = calCnt + assist.getCalCnt(newDisplayStyleValue);

      //유효성 체크 내용
      validateTagBuf.append(assist.validateTagStr(promptInfo, validatePromptName, promptParamName));
    }

    StringBuffer promptTagBuf1 = new StringBuffer(1000);

    //한 줄 일 때 처리
    rowCnt = rowCnt + assist.oneLineRowCnt(promptTagBuf1, promptCnt);

    //rowCnt가 1보다 작을 때는 무조건 1
    rowCnt = assist.rowCntMin(rowCnt);

    promptTagBuf1.append("<table class='type") .append(rowCnt) 
        .append("'><colgroup>                        <col  style='width:110px;'>      <col  style='width:19%;'>        <col  style='width:110px;'>      <col  style='width:19%;'>        <col  style='width:110px;'>      <col  style='width:19%;'>        <col  style='width:120px;'>    </colgroup><tbody>                         <tr height='1px' style='height:1px'><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><a href='javascript:jsDelayStart();' class='searchBtn type")
        .append(rowCnt).append("'>조 회</a>  ")
        .append(promptTagBuf)
        .append("</tbody></table><input type='hidden' id='paramCnt' name='paramCnt' value='")
        .append(paramCnt).append("'/><script>$('div.s_type1', $('#searchwrap')).removeClass('s_type1').addClass('s_type")
        .append(rowCnt).append("');</script>");

    StringBuffer treeAjax1 = new StringBuffer(500);
    treeAjax1
    .append(
        "\n/* custom select-box */ function getChildCustomElementList(selID, nextSelectID, isMulti, objectID) { if($('#'+nextSelectID).attr('type') == 'text'){ return false; } var promptName = $('#'+nextSelectID).attr('name'); $('div .sumo_' + promptName + ' select[id='+nextSelectID+']').parent().find('ul.options').empty(); if(objectID == null || objectID == '')  objectID = '")
        .append(objectID)
        .append("';   var elementID = jQuery('#' + selID).val();  var mstrParamID = selID;    jQuery('select').each(function() { ");

    StringBuffer treeAjax2 = new StringBuffer(500);
    // 현재 계층에 해당 되는 select-box의 option만 초기화
    treeAjax2
    .append("     if(selID.split('_')[0] == this.id.split('_')[0]){         if(selID.split('_')[1] < this.id.split('_')[1]){ this.sumo.removeAll();  jQuery('option:gt(0)', this.sumo).remove();         jQuery('option:eq(0)', this.sumo).remove();       }     }   });");

    StringBuffer treeAjax3 = new StringBuffer(500);
    treeAjax3
    .append("   if(jQuery('#' + selID).val() == '') return;   var multiElementID = '';     var obj = eval('document.all.'+selID);     var selLen = obj.length;   for (i=0; i < selLen; i++) {   if(obj.options[i].selected == true && obj.options[i].value != 'undefined' ){      if(multiElementID !=''){        multiElementID += ',' + obj.options[i].value;     }else{        multiElementID += obj.options[i].value;     }   }  } /* for */ if(multiElementID == '' || multiElementID.length <= 0){    return false; }");

    StringBuffer treeAjax4 = new StringBuffer(500);
    treeAjax4
    .append(" jQuery.getJSON('")
    .append(webServerUrl)
    .append("/service/")
    .append(promptAjaxActionName)
    .append(
        "', {   objectID : objectID,    elementID : '',   multiElementID : multiElementID,    mstrParamID : mstrParamID,    displayUnitType : $('#displayUnitType').val() }, function(data) {   callback_childElementList(selID, data, nextSelectID, isMulti, objectID); });}  /* function */");

    StringBuffer treeAjax5 = new StringBuffer(500);
    treeAjax5
    .append("\n/* call back */ function callback_childElementList(selID, data, nextSelectID, isMulti, objectID) {  $('#'+nextSelectID)[0].sumo.reload();   if(isMulti != 'multi'){    $('#'+nextSelectID).append(\"<option value=''>선  택</option>\");  }  if (data.length > 0 && nextSelectID != '') {    for ( var i = 0; i < data.length; i++) {      $('#'+nextSelectID)[0].sumo.add(data[i].objectID, data[i].displayName); }}}");

    treeAjaxScriptBuf.append(treeAjax1).append(treeAjax2).append(treeAjax3).append(treeAjax4).append(treeAjax5);

    // =============================================================
    // 스크립트 생성
    // =============================================================
    StringBuffer promptTagBuf2 = new StringBuffer(100);
    promptTagBuf2.append("\n<script>");
    assist.treeStringAppend(promptTagBuf2, treeAjaxScriptBuf, enableDisplayStyle, promptAjaxActionName);
    promptTagBuf2.append(assist.getScriptString(enableDisplayStyle, contextPath, cartCloseImage, cartOpenImage, validatePromptName))
    .append(" } return true;}\nfunction " + validateScriptName + "() {").append(validateTagBuf)
    .append("return true;}\n</script>");

    promptTagBuf1.append(promptTagBuf2);

    return promptTagBuf1;
  }
}