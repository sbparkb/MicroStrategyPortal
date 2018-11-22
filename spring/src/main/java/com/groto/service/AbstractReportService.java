package com.groto.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.groto.session.MSTRSessionUserImpl;
import com.groto.web.rpt.vo.MstrParam;
import com.microstrategy.utils.StringUtils;
import com.microstrategy.web.objects.EnumWebDocumentViewMode;
import com.microstrategy.web.objects.EnumWebReportExecutionModes;
import com.microstrategy.web.objects.SimpleList;
import com.microstrategy.web.objects.WebDisplayUnits;
import com.microstrategy.web.objects.WebDocumentInstance;
import com.microstrategy.web.objects.WebElement;
import com.microstrategy.web.objects.WebElementSource;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsPrompt;
import com.microstrategy.web.objects.WebExpressionPrompt;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsFactory;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.objects.WebPrompts;
import com.microstrategy.web.objects.WebReportInstance;
import com.microstrategy.web.objects.WebSearch;
import com.microstrategy.webapi.EnumDSSXMLFolderNames;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.microstrategy.webapi.EnumDSSXMLResultFlags;
import com.microstrategy.webapi.EnumDSSXMLSearchDomain;
import com.microstrategy.webapi.EnumDSSXMLSearchFlags;
import com.mstr.business.comparator.DisplayNameComparator;
import com.mstr.business.model.FolderInfo;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptAnswerJson;
import com.mstr.business.model.PromptInfo;
import com.mstr.business.model.ReportInfo;

/**
 * Class Name : AbstractReportService.java Description : Description
 * 
 * Modification Information
 * 
 * Mod Date Modifier Description ----------- -------- --------------------------- 2012. 6. 18. jju
 * Generation
 * 
 * @author jju
 * @since 2012. 6. 18.
 * @version 1.0
 */
@SuppressWarnings("unused")
public abstract class AbstractReportService extends AbstractSessionUserService implements BaseReportService, Serializable {

  private static final long serialVersionUID = 4871752769880837297L;

  protected static final Logger LOGGER = Logger.getLogger(AbstractReportService.class);

  private static final String MSTR_PROMPT_PARAM_NAME = SystemMessage.getMessage("mstr.config.prompt.param-name");

  public String getProjectID() throws Exception {
    String projectID = "";
    try {
      projectID = getServerSession().getProjectID();
    } catch (WebObjectsException e) {
      projectID = "";
    }
    return projectID;
  }

  public String getSharedReportsFolderID() throws WebObjectsException {
    WebObjectSource objectSource = getServerSession().getFactory().getObjectSource();
    String sharedReportsFolderID = objectSource.getFolderID(EnumDSSXMLFolderNames.DssXmlFolderNamePublicReports);
    return sharedReportsFolderID;
  }

  public boolean isPublicReportsFolder(String objectID) {
    try {
      WebObjectSource objectSource = getServerSession().getFactory().getObjectSource();
      return StringUtils.isEqual(objectID, objectSource.getFolderID(EnumDSSXMLFolderNames.DssXmlFolderNamePublicReports));
    } catch (WebObjectsException e) {
      LOGGER.error("Error isPublicReports: " + CmmUtil.exMessage(e));
    }
    return false;
  }

  public List<FolderInfo> getFolderList(String objectID) throws Exception {
    List<FolderInfo> folderList = null;
    return folderList;
  }

  public ReportInfo getSimpleReportInfo(String objectID, int displayUnitType) throws Exception {
    if (StringUtils.isNotEmpty(objectID)) {
      return new ReportInfo(getOriginReportInfo(objectID, displayUnitType));
    }
    return null;
  }

  public WebObjectInfo getOriginReportInfo(String objectID, int displayUnitType) throws Exception {

    try {

      if (StringUtils.isNotEmpty(objectID)) {

        WebObjectSource objectSource = getServerSession().getFactory().getObjectSource();
        WebObjectInfo webObjectInfo = null;

        if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition) {

          webObjectInfo = objectSource.getObject(objectID, EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition);

        } else {

          webObjectInfo = objectSource.getObject(objectID, EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition);
        }

        webObjectInfo.populate();

        return webObjectInfo;
      }

    } catch (WebObjectsException e) {
      LOGGER.error(CmmUtil.exMessage(e));
    }
    return null;
  }

  public List<ReportInfo> getFolderObjectList(String objectID) throws Exception {

    if (StringUtils.isNotEmpty(objectID)) {
      return new PromptAnswerAssist().getFolderObjectList(getServerSession(), objectID, null, 1);
    }

    return null;
  }

  // 2017-04-21 검색 방식 수정
  public List<ReportInfo> searchReportList(String searchText) throws WebObjectsException {

    List<ReportInfo> list = new ArrayList<ReportInfo>();

    if (StringUtils.isEmpty(searchText))
      return list;

    WebObjectSource objectSource = getServerSession().getFactory().getObjectSource();

    /* 특정 폴더ID이후 검색 */
    String folderId = SystemMessage.getMessage("mstr.config.default.folderId");
    if (folderId == null || "".equals(folderId)) {
      folderId = objectSource.getFolderID(EnumDSSXMLFolderNames.DssXmlFolderNamePublicReports); // 공유폴더
                                                                                                // 아이디를
                                                                                                // 얻는다.
    }

    // search for a particular report
    WebSearch nameSearch = objectSource.getNewSearchObject();
    nameSearch.setNamePattern("*" + searchText + "*");
    nameSearch.setSearchFlags(EnumDSSXMLSearchFlags.DssXmlSearchRootRecursive | EnumDSSXMLSearchFlags.DssXmlSearchNameWildCard);
    nameSearch.setAsync(false);
    nameSearch.types().add(new Integer(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition));
    nameSearch.types().add(new Integer(EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition));
    nameSearch.setDomain(EnumDSSXMLSearchDomain.DssXmlSearchDomainProject);

    WebFolder nameResultsFolder = null;
    nameSearch.setSearchRoot(folderId); /* 특정 폴더ID이후 검색 */
    nameSearch.submit();
    nameResultsFolder = nameSearch.getResults();

    SimpleList parentList = null;
    StringBuffer objIds = new StringBuffer();
    StringBuffer strDisplayPaths = new StringBuffer();
    
    ReportInfo rb =null;

    if (nameResultsFolder != null && nameResultsFolder.size() > 0) {

      for (int i = 0; i < nameResultsFolder.size(); i++) {
        objIds.setLength(0);
        strDisplayPaths.setLength(0);
        nameResultsFolder.get(i).populate();
        parentList = nameResultsFolder.get(i).getAncestors();

        for (int k = 0; k < parentList.size(); k++) {
          WebObjectInfo parent = (WebObjectInfo) parentList.item(k);
          if (objIds.length() < 1) {
            objIds.append(parent.getID());
            strDisplayPaths.append(parent.getDisplayName().substring(parent.getDisplayName().indexOf(".") + 1));
          } else {
            objIds.append('|').append(parent.getID());
            strDisplayPaths.append(" > ").append(parent.getDisplayName().substring(parent.getDisplayName().indexOf(".") + 1));
          }
        }
        objIds.append('|').append(nameResultsFolder.get(i).getID());

        rb = InstanceCreation.cReportInfo(nameResultsFolder.get(i));
        rb.setOwner(nameResultsFolder.get(i).getOwner().getDisplayName());
        rb.setObjPath(objIds.toString());
        rb.setDisplayPathName(strDisplayPaths.toString());
        rb.setDisplayName(nameResultsFolder.get(i).getDisplayName().substring(nameResultsFolder.get(i).getDisplayName().indexOf(".") + 1));
        list.add(rb);
      }

    }

    Collections.sort(list, new DisplayNameComparator());

    return list;
  }

  // =========================================================================
  // PROMPT
  // =========================================================================

  /**
   * 일반 적으로 사용하는 PromptList (tag, xml)
   * 
   * @param sessionID
   * @param objectID
   * @param displayUnitType
   * @param request
   * @param customAnswerList
   * @return
   */
  public List<PromptInfo> getReportPromptList(String sessionID, String objectID, int displayUnitType, HttpServletRequest pRequest) {

    List<PromptInfo> promptInfoList = null;

    HttpServletRequest request = pRequest;

    if (request == null) {
      request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    MSTRSessionUserImpl user =
        (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

    WebReportInstance reportInstance = null;
    WebDocumentInstance documentInstance = null;

    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();

    PromptAnswerAssist assist = new PromptAnswerAssist();

    try {

      promptInfoList = new ArrayList<PromptInfo>();
      
      WebPrompts webPrompts = null;

      serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
      serverSession.setServerPort(0);
      serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
      serverSession.setLogin(user.getMstrUserID());
      serverSession.setPassword(user.getMstrUserPW());
      serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
      serverSession.setAuthMode(1);
      serverSession.restoreState(String.valueOf(request.getSession().getAttribute("usrSmgr1")));

      if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
        documentInstance = serverSession.getFactory().getDocumentSource().getNewInstance(objectID);
        documentInstance.setAsync(false); // 동기 모드
        documentInstance.setViewMode(EnumWebDocumentViewMode.DocumentViewModeHTML);
      } else {
        reportInstance = serverSession.getFactory().getReportSource().getNewInstance(objectID);
        reportInstance.setAsync(false);
        reportInstance.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_DEFAULT);
        reportInstance.setResultFlags(EnumDSSXMLResultFlags.DssXmlResultGrid + EnumDSSXMLResultFlags.DssXmlResultPageTreeStyle);
        webPrompts = reportInstance.getPrompts();
      }

      if(webPrompts != null){
        
        getPromptInfoList(webPrompts, promptInfoList, request, objectID);        
        webPrompts.setClosed(true);
      }

    } catch (WebObjectsException ex) {
      LOGGER.error(CmmUtil.exMessage(ex));
      return null;
    } finally {
      try {
        serverSession.closeSession();
      } catch (WebObjectsException e) {
        LOGGER.error(CmmUtil.exMessage(e));
      }
    }

    return promptInfoList;
  }
  
  private void getPromptInfoList(WebPrompts webPrompts
      , List<PromptInfo> promptInfoList
      , HttpServletRequest request
      , String objectID
      ) throws WebObjectsException{
    
    PromptInfo promptInfo = null;
    List<PromptAnswer> promptAnswerList = null;
    
    PromptAnswerAssist assist = new PromptAnswerAssist();

    WebPrompt webPrompt = null;
    
    for (int idx = 0; idx < webPrompts.size(); idx++) {

      webPrompt = webPrompts.get(idx);
      webPrompt.populate();

      promptInfo = InstanceCreation.cPromptInfo();
      promptInfo.setReportID(objectID); // 상위 리포트ID/다큐먼트
      promptInfo.setOrgPIN(webPrompt.getPIN()); // orginal Pin
      promptInfo.setPin(webPrompt.getPIN());
      promptInfo.setName(webPrompt.getName());
      promptInfo.setTitle(webPrompt.getTitle());
      promptInfo.setMeaning(webPrompt.getMeaning());
      promptInfo.setRequired(webPrompt.isRequired());
      promptInfo.setMin(webPrompt.getMin());
      promptInfo.setMax(webPrompt.getMax());
      promptInfo.setOriginalAnswer(webPrompt.hasOriginalAnswer());
      promptInfo.setDefaultAnswer(webPrompt.hasDefaultAnswer());
      promptInfo.setDisplayStyleValue(PromptAnswerAssist.getDisplayStyleValue(webPrompt));

      // 추가 속성
      promptInfo.setDescription(webPrompt.getDescription());
      promptInfo.setDisplayName(webPrompt.getDisplayName());
      promptInfo.setDisplayUnitType(webPrompt.getDisplayUnitType());
      promptInfo.setId(webPrompt.getID());
      promptInfo.setPromptType(webPrompt.getPromptType());
      promptInfo.setType(webPrompt.getType());
      promptInfo.setChildUnitCnt(1);

      // request 객체가 있을 경우에만 실행(createPromptXML 에서 호출)
      MstrParam param = (MstrParam) request.getAttribute("mstrParam");
      if (request != null && param != null ) {

        String paramName = null;
        paramName = MSTR_PROMPT_PARAM_NAME + promptInfo.getPin();
        
        HashMap<String, String[]> hm = param.getHm();
        
        if (hm.get(paramName) != null) {
          promptInfo.setMstrParamValues(hm.get(paramName));              
        }
      }

      promptAnswerList = assist.getPromptAnswerList(webPrompt, request, promptInfo);
      
      if(promptAnswerList != null) {
    	  promptInfo.setPromptAnswerList(promptAnswerList);
    	  promptInfoList.add(promptInfo);    	      	  
      }
    }
  }

  /**
   * 각 어트리뷰의 항목을 복수개 선택 할 경우
   * 
   * @param sessionID
   * @param objectID
   * @param elementID
   * @param pin
   * @param seq
   * @return
   * @throws Exception
   */
  private List<PromptAnswerJson> getPromptChildElementMultiList(
		  String objectID, 
		  String[] elementIDs, 
		  int pin, 
		  int seq, 
		  int displayUnitType,
		  String searchTxt
		  ) {

    List<PromptAnswerJson> promptAnswerList = null;
    PromptAnswerJson promptAnswer = null;
    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    MSTRSessionUserImpl user =
        (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();
    serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
    serverSession.setServerPort(0);
    serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
    serverSession.setLogin(user.getMstrUserID());
    serverSession.setPassword(user.getMstrUserPW());
    serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
    serverSession.setAuthMode(1);

    PromptElementAssist assist = new PromptElementAssist();

    try {
      WebReportInstance reportInstance = null;
      WebDocumentInstance documentInstance = null;
      WebPrompts webPrompts = null;

      if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
        documentInstance = factory.getDocumentSource().getNewInstance(objectID);

        documentInstance.setAsync(false);
        documentInstance.setViewMode(EnumWebDocumentViewMode.DocumentViewModeHTML);
        webPrompts = documentInstance.getPrompts();
      } else { 
        reportInstance = factory.getReportSource().getNewInstance(objectID);
        reportInstance.setAsync(false);
        reportInstance.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_DEFAULT);
        reportInstance.setResultFlags(EnumDSSXMLResultFlags.DssXmlResultGrid + EnumDSSXMLResultFlags.DssXmlResultPageTreeStyle);
        webPrompts = reportInstance.getPrompts();
      }

      WebPrompt webPrompt = webPrompts.findPromptByPIN(pin);
      promptAnswerList = new ArrayList<PromptAnswerJson>();
      WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;
      if (expressionPrompt.getOrigin() != null) {

        WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();
        if (webDisplayUnits != null) {
           promptAnswerList = assist.getPromptChildElementList(webDisplayUnits, elementIDs, seq, searchTxt);
        }
      }

      // 다큐먼트 프롬프트 메세지 종료
      documentInstClose(documentInstance);

    } catch (WebObjectsException ex) {
      LOGGER.error("Error while fetching prompt contents: " + CmmUtil.exMessage(ex));
    } finally {
      closeServerSession();
    }

    return promptAnswerList;
  }



  /**
   * 각 어트리뷰의 항목을 한개만 선택 할 경우
   * 
   * @param objectID
   * @param elementID
   * @param pin
   * @param seq
   * @return
   * @throws WebObjectsException
   * @throws Exception
   */
  private List<PromptAnswerJson> getPromptChildElementList(String objectID, String elementID, int pin, int seq, int displayUnitType, String searchTxt) 
		  throws WebObjectsException {

	  List<PromptAnswerJson> promptAnswerList = null;
	  PromptAnswerJson promptAnswer = null;
	  HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	  MSTRSessionUserImpl user =
			  (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

	  WebObjectsFactory factory = WebObjectsFactory.getInstance();
	  WebIServerSession serverSession = factory.getIServerSession();
	  serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
	  serverSession.setServerPort(0);
	  serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
	  serverSession.setLogin(user.getMstrUserID());
	  serverSession.setPassword(user.getMstrUserPW());
	  serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
	  serverSession.setAuthMode(1);

	  WebReportInstance reportInstance = null;
	  WebDocumentInstance documentInstance = null;
	  WebPrompts webPrompts = null;

	  String[] displayNames = null;
	  try {

		  if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
			  documentInstance = factory.getDocumentSource().getNewInstance(objectID);
			  documentInstance.setAsync(false);
			  webPrompts = documentInstance.getPrompts();
		  }else {
			  reportInstance = factory.getReportSource().getNewInstance(objectID);
			  reportInstance.setAsync(false);
			  reportInstance.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_DEFAULT);
			  reportInstance.setResultFlags(EnumDSSXMLResultFlags.DssXmlResultGrid + EnumDSSXMLResultFlags.DssXmlResultPageTreeStyle);
			  webPrompts = reportInstance.getPrompts();	
		  }

		  promptAnswerList = new ArrayList<PromptAnswerJson>(); 
		  WebPrompt webPrompt = webPrompts.findPromptByPIN(pin);
		  WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;

		  PromptElementAssist assist = new PromptElementAssist();

		  if (expressionPrompt.getOrigin() != null) {

			  WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();
			  if (webDisplayUnits != null) {
				  promptAnswerList = assist.getPromptChildElementList(webDisplayUnits, elementID, seq, searchTxt);
			  }
		  }

		  // 다큐먼트 프롬프트 메세지 종료
		  documentInstClose(documentInstance);
	  } catch (WebObjectsException ex) {
		  documentInstClose(documentInstance);
		  LOGGER.error("Error while fetching prompt contents: " + CmmUtil.exMessage(ex));
	  } finally {
		  String usrSmgr = StringUtil.defaultString((String) request.getSession().getAttribute("usrSmgr1"), "");
		  if (!"".equals(usrSmgr)) {
			  serverSession.closeSession();
		  }
	  }
	  return promptAnswerList;
  }

  /**
   * 각 어트리뷰의 항목을 한개만 선택 할 경우
   * 
   * @param objectID
   * @param elementID
   * @param pin
   * @param seq
   * @return
   * @throws WebObjectsException
   * @throws Exception
   */
  private List<PromptAnswerJson> getPromptElementList(String objectID, int pin, int displayUnitType, String searchTxt) 
		  throws WebObjectsException {

	  List<PromptAnswerJson> promptAnswerList = null;
	  PromptAnswerJson promptAnswer = null;
	  HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	  MSTRSessionUserImpl user = (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);

	  WebObjectsFactory factory = WebObjectsFactory.getInstance();
	  WebIServerSession serverSession = factory.getIServerSession();
	  serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
	  serverSession.setServerPort(0);
	  serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
	  serverSession.setLogin(user.getMstrUserID());
	  serverSession.setPassword(user.getMstrUserPW());
	  serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
	  serverSession.setAuthMode(1);

	  WebReportInstance reportInstance = null;
	  WebDocumentInstance documentInstance = null;
	  WebPrompts webPrompts = null;

	  try {

		  if (displayUnitType == EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
			  documentInstance = factory.getDocumentSource().getNewInstance(objectID);
			  documentInstance.setAsync(false);
			  webPrompts = documentInstance.getPrompts();
		  }else {
			  reportInstance = factory.getReportSource().getNewInstance(objectID);
			  reportInstance.setAsync(false);
			  reportInstance.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_DEFAULT);
			  reportInstance.setResultFlags(EnumDSSXMLResultFlags.DssXmlResultGrid + EnumDSSXMLResultFlags.DssXmlResultPageTreeStyle);
			  webPrompts = reportInstance.getPrompts();	
		  }

		  promptAnswerList = new ArrayList<PromptAnswerJson>(); 
		  WebPrompt webPrompt = webPrompts.findPromptByPIN(pin);

		  WebElementsPrompt webElementsPrompt = (WebElementsPrompt) webPrompt;
		  WebElementSource elementSource = webElementsPrompt.getOrigin().getElementSource();

		  /** 검색어가 있으면 검색어로 필터링한다. **/
		  if(!"".equals(searchTxt)) {
			  elementSource.setSearchPattern(searchTxt);
		  }

		  WebElements elements = elementSource.getElements();
		  
		  if(elements != null && elements.size() > 0) {
			  int totalSize = elements.size();			  
			  for (int i = 0; i < totalSize; i++) {	
				  WebElement webElement = elements.get(i);
				  promptAnswer = InstanceCreation.cPromptAnswerJson();
				  promptAnswer.setObjectID(webElement.getID());
				  String[] displayNames = webElement.getDisplayName().split(":");
				  promptAnswer.setDisplayName(displayNames[0]);
				  promptAnswer.setDisplayUnitType(webElement.getDisplayUnitType());
				  promptAnswerList.add(promptAnswer);
			  }			  
		  }  		  

		  // 다큐먼트 프롬프트 메세지 종료
		  documentInstClose(documentInstance);
	  } catch (WebObjectsException ex) {
		  documentInstClose(documentInstance);
		  LOGGER.error("Error while fetching prompt contents: " + CmmUtil.exMessage(ex));
	  } finally {
		  String usrSmgr = StringUtil.defaultString((String) request.getSession().getAttribute("usrSmgr1"), "");
		  if (!"".equals(usrSmgr)) {
			  serverSession.closeSession();
		  }
	  }
	  return promptAnswerList;
  }

  private void documentInstClose(WebDocumentInstance documentInstance) {
	  try {
		  if (documentInstance != null && documentInstance.getMessage() != null && documentInstance.getMessage(true) != null) {
			  documentInstance.getPrompts().setClosed(true);
			  documentInstance.getMessage().removeFromInbox();
		  }
	  } catch (WebObjectsException e) {
		  LOGGER.error(CmmUtil.exMessage(e));
	  }
  }
  
  public String createReportPromptXML(String sessionID, String objectID, int displayUnitType, HttpServletRequest request) throws WebObjectsException {

    String strPromptXML = "";

    WebReportInstance reportInstance = null;
    WebDocumentInstance documentInstance = null;
    MSTRSessionUserImpl user = null;

    WebObjectsFactory factory = WebObjectsFactory.getInstance();
    WebIServerSession serverSession = factory.getIServerSession();

    ReportPromptXmlAssist assist = new ReportPromptXmlAssist();

    if (request != null) {
      user = (MSTRSessionUserImpl) ((HttpServletRequest) request).getSession().getAttribute(MSTRSessionUserImpl.ATTRIBUTE_NAME);
      serverSession.setServerName(SystemMessage.getMessage("mstr.config.default.server-name"));
      serverSession.setServerPort(0);
      serverSession.setProjectName(SystemMessage.getMessage("mstr.config.default.project-name"));
      serverSession.setLogin(user.getMstrUserID());
      serverSession.setPassword(user.getMstrUserPW());
      serverSession.setApplicationType(com.microstrategy.webapi.EnumDSSXMLApplicationType.DssXmlApplicationCustomApp);
      serverSession.setAuthMode(1);
    }

    WebObjectSource objectSource = factory.getObjectSource();

    WebPrompt webPrompt = null;
    WebPrompts webPrompts = null;

    if (displayUnitType == 55) { // document
      documentInstance = factory.getDocumentSource().getNewInstance(objectID);

      documentInstance.setAsync(false);
      WebObjectInfo objInfo = objectSource.getObject(objectID, EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition, true);

      if (objInfo.getViewMediaSettings().getAvailableModes() == 24613) {
        ((HttpServletRequest) request).setAttribute("VI_DASHBOARD", "true");
      }
      webPrompts = documentInstance.getPrompts();
    } else { // report
      reportInstance = factory.getReportSource().getNewInstance(objectID);
      reportInstance.setAsync(false);
      reportInstance.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_DEFAULT);

      reportInstance.setResultFlags(EnumDSSXMLResultFlags.DssXmlResultGrid);
      webPrompts = reportInstance.getPrompts();
    }
    
    List<PromptAnswer> promptAnswerList = null;
    List<PromptInfo> promptInfoList = getReportPromptList(sessionID, objectID, displayUnitType, request);

    if(promptInfoList != null){    	
      for (PromptInfo promptInfo : promptInfoList) {
        webPrompt = webPrompts.findPromptByPIN(promptInfo.getPin());
        promptAnswerList = promptInfo.getPromptAnswerList();                
        
        assist.getReportIdPromptXML(webPrompt, promptInfo, promptAnswerList, objectSource);
      }
      strPromptXML = webPrompts.getShortAnswerXML();
      webPrompts.setClosed(true);
    }
    
    // 다큐먼트 프롬프트 메세지 종료
    instanceClose(documentInstance, reportInstance);
    return strPromptXML;
  }

  private void instanceClose(WebDocumentInstance documentInstance, WebReportInstance reportInstance) throws WebObjectsException {
    if (documentInstance != null && documentInstance.getMessage() != null && documentInstance.getMessage(true) != null) {
      documentInstance.getMessage().removeFromInbox();
    }

    if (reportInstance != null && reportInstance.getMessage() != null && reportInstance.getMessage(true) != null) {
      reportInstance.getMessage().removeFromInbox();
    }
  }

  public List<PromptAnswerJson> getPromptChildElementList(@RequestParam Map<String, String> map) 
		  throws WebObjectsException {

	  String objectID = map.get("objectID");
	  String elementID = map.get("elementID");
	  String mstrParamID = map.get("mstrParamID");
	  String multiElementID = map.get("multiElementID");
	  String searchTxt = map.get("searchTxt");      
	  searchTxt = StringUtil.defaultString(searchTxt, "");
	  String scrollPage = map.get("scrollPage");
	  scrollPage = StringUtil.defaultString(scrollPage, "0"); 
	  int page = Integer.parseInt(scrollPage); 
	  int defaultPageSize = Integer.parseInt(StringUtil.defaultString(SystemMessage.getMessage("mstr.config.moreCnt"),"25"));

	  int displayUnitType = Integer.parseInt(StringUtil.defaultString(map.get("displayUnitType"),"0"));

	  mstrParamID = mstrParamID.replace(MSTR_PROMPT_PARAM_NAME + "ID", "");

	  String[] tmpMstrParamID = mstrParamID.split("_");
	  String[] multiElementIDs = null;
	  if (!multiElementID.isEmpty()) {
		  multiElementIDs = multiElementID.split(",");
	  }

	  String strPIN = tmpMstrParamID[0];
	  String strSEQ = tmpMstrParamID[1];
	  try {
		  int pin = Integer.parseInt(strPIN);
		  int seq = Integer.parseInt(strSEQ);
		  List<PromptAnswerJson> list;
		  if (elementID.isEmpty()) {
			  list = getPromptChildElementMultiList(objectID, multiElementIDs, pin, seq, displayUnitType, searchTxt);        	
		  } else {
			  list = getPromptChildElementList(objectID, elementID, pin, seq, displayUnitType, searchTxt);
		  }

		  /** 디폴트 페이지 정보가 있는 경우 사이즈만큼 씩만 페이징 한다. **/
		  List<PromptAnswerJson> retList = new ArrayList<PromptAnswerJson>();        
		  return CmmUtil.promptPaging(list, retList, page, defaultPageSize);
	  } catch (NumberFormatException nfe) {
		  LOGGER.error("Error getPromptChildElementList: " + CmmUtil.exMessage(nfe));
	  }
	  return null;
  }

  public List<PromptAnswerJson> getPromptElementList(@RequestParam Map<String, String> map) 
		  throws WebObjectsException {

	  String objectID = map.get("objectID");	  
	  String searchTxt = map.get("searchTxt");      
	  searchTxt = StringUtil.defaultString(searchTxt, "");
	  String scrollPage = map.get("scrollPage");
	  scrollPage = StringUtil.defaultString(scrollPage, "0"); 
	  int page = Integer.parseInt(scrollPage); 
	  int defaultPageSize = Integer.parseInt(StringUtil.defaultString(SystemMessage.getMessage("mstr.config.moreCnt"),"25"));

	  int displayUnitType = Integer.parseInt(StringUtil.defaultString(map.get("displayUnitType"),"0"));
	  int pin =  Integer.parseInt(StringUtil.defaultString(map.get("pin"),"0"));	  	 

	  try {		  
		  List<PromptAnswerJson> list = getPromptElementList(objectID, pin, displayUnitType, searchTxt);

		  /** 디폴트 페이지 정보가 있는 경우 사이즈만큼 씩만 페이징 한다. **/
		  List<PromptAnswerJson> retList = new ArrayList<PromptAnswerJson>();        
		  return CmmUtil.promptPaging(list, retList, page, defaultPageSize);

	  } catch (NumberFormatException nfe) {
		  LOGGER.error("Error getPromptElementList: " + CmmUtil.exMessage(nfe));
	  }
	  return null;
  }  
  
}// end of class
