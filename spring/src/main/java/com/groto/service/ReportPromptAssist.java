package com.groto.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.groto.cmm.util.CmmUtil;
import com.groto.cmm.util.StringUtil;
import com.groto.cmm.util.SystemMessage;
import com.microstrategy.web.objects.EnumWebDocumentViewMode;
import com.microstrategy.web.objects.EnumWebPromptType;
import com.microstrategy.web.objects.EnumWebReportExecutionModes;
import com.microstrategy.web.objects.WebAttribute;
import com.microstrategy.web.objects.WebDimensionAttribute;
import com.microstrategy.web.objects.WebDisplayUnits;
import com.microstrategy.web.objects.WebDocumentInstance;
import com.microstrategy.web.objects.WebElement;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsObjectNode;
import com.microstrategy.web.objects.WebElementsPrompt;
import com.microstrategy.web.objects.WebExpression;
import com.microstrategy.web.objects.WebExpressionPrompt;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsPrompt;
import com.microstrategy.web.objects.WebOperatorNode;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.web.objects.WebPrompts;
import com.microstrategy.web.objects.WebReportInstance;
import com.microstrategy.webapi.EnumDSSXMLExpressionType;
import com.microstrategy.webapi.EnumDSSXMLFunction;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.microstrategy.webapi.EnumDSSXMLResultFlags;
import com.mstr.business.comparator.DimensionComparator;
import com.mstr.business.model.CustomAnswer;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptInfo;

class ReportPromptAssist extends AbstractSessionUserService{
  
  protected static final Logger LOGGER = Logger.getLogger(AbstractSessionUserService.class);

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  ArrayList<PromptAnswer> getReportPromptList(WebPrompt webPrompt, HttpServletRequest request, PromptInfo promptInfo, String objectID,
      List<CustomAnswer> customAnswerList, String displayUnitType) throws WebObjectsException {

    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();

    if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeElements) {
      promptAnswerList = createWebPromptTypeElements(webPrompt);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeObjects) {
      promptAnswerList = createWebPromptTypeObjects(webPrompt);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeExpression) {
      createWebPromptTypeExpression(webPrompt, objectID, customAnswerList, displayUnitType);
    }
    return promptAnswerList;
  }
  
  private ArrayList<PromptAnswer> createWebPromptTypeElements(WebPrompt webPrompt) throws WebObjectsException{
    
    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();

    WebElementsPrompt webElementsPrompt = (WebElementsPrompt) webPrompt;
    WebElements originalElements = null;
    WebElements defaultElements = null;
    WebElement webElement = null;

    originalElements = webElementsPrompt.getSuggestedAnswers();
    if (originalElements == null || originalElements.size() == 0) {
      originalElements = webElementsPrompt.getOrigin().getElementSource().getElements();
    }

    defaultElements = webElementsPrompt.getDefaultAnswer();

    PromptAnswer promptAnswer = null;
    for (int eleIndex = 0; eleIndex < originalElements.size(); eleIndex++) {

      webElement = originalElements.get(eleIndex);

      promptAnswer = InstanceCreation.cPromptAnswer();
      promptAnswer.setObjectID(webElement.getID());
      promptAnswer.setElementID(webElement.getElementID());
      promptAnswer.setElementType(webElement.getElementType());
      promptAnswer.setDisplayName(webElement.getDisplayName());
      promptAnswer.setDisplayUnitType(webElement.getDisplayUnitType());
      if (defaultElements != null) {
        for (int i = 0; i < defaultElements.size(); i++) {
          if (webElement.equals(defaultElements.get(i))) {
            promptAnswer.setDefaultAnswer(true);
          }
        }
      }
      promptAnswerList.add(promptAnswer);
    }
    
    return promptAnswerList;
  }
  
  private ArrayList<PromptAnswer> createWebPromptTypeObjects(WebPrompt webPrompt){

    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();
    WebObjectsPrompt webObjectsPrompt = (WebObjectsPrompt) webPrompt;
    WebFolder originalFolder = webObjectsPrompt.getSuggestedAnswers();
    WebFolder defaultFolder = webObjectsPrompt.getDefaultAnswer();
    WebObjectInfo webObjectInfo = null;

    PromptAnswer promptAnswer = null;
    for (int folderIndex = 0; folderIndex < originalFolder.size(); folderIndex++) {

      webObjectInfo = originalFolder.get(folderIndex);

      promptAnswer = InstanceCreation.cPromptAnswer();
      promptAnswer.setObjectID(webObjectInfo.getID());
      promptAnswer.setObjectType(webObjectInfo.getType());
      promptAnswer.setDisplayName(webObjectInfo.getDisplayName());
      promptAnswer.setDisplayUnitType(webObjectInfo.getDisplayUnitType());
      
      if (defaultFolder != null) {
        for (int i = 0; i < defaultFolder.size(); i++) {
          if (webObjectInfo.equals(defaultFolder.get(i))) {
            promptAnswer.setDefaultAnswer(true);
          }
        }
      }
      promptAnswerList.add(promptAnswer);
    }
    
    return promptAnswerList;
  }
  
  private ArrayList<PromptAnswer> createWebPromptTypeExpression(WebPrompt webPrompt, String objectID, List<CustomAnswer> customAnswerList, String displayUnitType) throws WebObjectsException{
    
    ArrayList<PromptAnswer> promptAnswerList = null;
    
    WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;
    WebDisplayUnits webDisplayUnits = null;

    String defaultErrorKey = SystemMessage.getMessage("mstr.config.prompt.display-style-7.custom-answer.error-key");
    String defaultErrorValue = SystemMessage.getMessage("mstr.config.prompt.display-style-7.custom-answer.error-value");
    
    boolean useCustomAnswer =
        Boolean.parseBoolean(SystemMessage.getMessage("mstr.config.prompt.display-style-7.custom-answer.enable", new String[] {"false"}));

    List<WebDimensionAttribute> webDimAttrList = new ArrayList<WebDimensionAttribute>();

    if (expressionPrompt.getOrigin() != null) {

      webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();

      if (webDisplayUnits != null) {

        webDimAttrList = ReportPromptAssist.getWebDimensionAttributeList(webDisplayUnits);
        
        promptAnswerList = getAnswerExistsList(webDimAttrList, customAnswerList, useCustomAnswer, defaultErrorKey, defaultErrorValue, webPrompt, objectID, displayUnitType);
      }
    }
    
    return promptAnswerList;
  }
  
  private ArrayList<PromptAnswer> getAnswerExistsList(List<WebDimensionAttribute> webDimAttrList,  
      List<CustomAnswer> customAnswerList,
      boolean useCustomAnswer, String defaultErrorKey, String defaultErrorValue,
      WebPrompt webPrompt, String objectID, String displayUnitType
      ) throws WebObjectsException{
    
    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();
    PromptAnswer element = null;
    PromptAnswer promptAnswer = new PromptAnswer();
    List<PromptAnswer> expElementList = new ArrayList<PromptAnswer>();
    WebElements webElements = null;
    WebElement webElement = null;
    CustomAnswer customAnswer = null;
    
    int dimAttrCount = 0;
    String customAnswerKey = "";
    String prevDimAttributeID = "";
    String parentElementID = "";
    String errorKey = "";
    String errorValue = "";
    
    for (WebDimensionAttribute webDimensionAttribute : webDimAttrList) {

      dimAttrCount++;

      promptAnswer = InstanceCreation.cPromptAnswer();
      promptAnswer.setObjectID(webDimensionAttribute.getID());
      promptAnswer.setDisplayName(webDimensionAttribute.getDisplayName());
      promptAnswer.setDisplayUnitType(webDimensionAttribute.getDisplayUnitType());
      promptAnswer.setCustomAnswer(false);

      if (useCustomAnswer && customAnswerList != null && customAnswerList.size() > 0) {

        expElementList.clear();
        webElements = webDimensionAttribute.getAttribute().getElementSource().getElements();

        if (customAnswerList.size() >= dimAttrCount) {

          customAnswer = customAnswerList.get(dimAttrCount - 1);
          customAnswerKey = webDimensionAttribute.getID() + ":" + customAnswer.getKey();
          expElementList  = getCustomElemList(webElements, customAnswerKey);

          // customAnswer 값이 없을 경우 오류 메시지로 대체
          if (expElementList.size() == 0) {

            errorKey = webDimensionAttribute.getID() + ":" + StringUtil.NVL(customAnswer.getErrorKey(), defaultErrorKey);
            errorValue = StringUtil.NVL(customAnswer.getErrorValue(), defaultErrorValue);

            element = InstanceCreation.cPromptAnswer();
            element.setObjectID(errorKey);
            element.setDisplayName(errorValue);
            expElementList.add(element);
          }

          promptAnswer.setCustomAnswer(true);
          promptAnswer.setExpElementList(expElementList);

        } else {

          // 마지막 응답 값 다음 첫번째 항목은 전체 출력
          if (dimAttrCount == customAnswerList.size() + 1) {
            parentElementID = prevDimAttributeID + ":" + customAnswerList.get(dimAttrCount - 2).getKey();
            expElementList = this.getPromptChildElementList(objectID, parentElementID, webPrompt.getPIN(), dimAttrCount - 1, displayUnitType);
            promptAnswer.setExpElementList(expElementList);
          }
        }

      } else {

        // 별도 응답 값이 없을 경우 첫번째 항목만 출력
        if (dimAttrCount == 1) {
          expElementList.clear();
          webElements = webDimensionAttribute.getAttribute().getElementSource().getElements();
          expElementList = getNonCustomElemList(webElements);
          promptAnswer.setExpElementList(expElementList);
        }
      }
      promptAnswerList.add(promptAnswer);

      // 이전 DimensionAttributeID 저장
      prevDimAttributeID = webDimensionAttribute.getID();
    }
    
    return promptAnswerList;
  }
  
  private List<PromptAnswer> getCustomElemList(WebElements webElements, String customAnswerKey){
    
    WebElement webElement = null;
    PromptAnswer element = null;
    List<PromptAnswer> expElementList = new ArrayList<PromptAnswer>();
    
    for (int i = 0; i < webElements.size(); i++) {
      webElement = webElements.get(i);
      if (StringUtil.isEqualIgnoreCase(customAnswerKey, webElement.getID())) {
        element = InstanceCreation.cPromptAnswer();
        element.setObjectID(webElement.getID());
        element.setDisplayName(webElement.getDisplayName());
        element.setDisplayUnitType(webElement.getDisplayUnitType());
        expElementList.add(element);
      }
    }
    
    return expElementList;
  }
  
  private List<PromptAnswer> getNonCustomElemList(WebElements webElements){
    
    WebElement webElement = null;
    PromptAnswer element = null;
    List<PromptAnswer> expElementList = new ArrayList<PromptAnswer>();
    
    for (int i = 0; i < webElements.size(); i++) {
      webElement = webElements.get(i);
      element = InstanceCreation.cPromptAnswer();
      element.setObjectID(webElement.getID());
      element.setDisplayName(webElement.getDisplayName());
      element.setDisplayUnitType(webElement.getDisplayUnitType());
      expElementList.add(element);
    }
    
    return expElementList;
  }
  
  static List<WebDimensionAttribute> getWebDimensionAttributeList(WebDisplayUnits webDisplayUnits) {
    
    List<WebDimensionAttribute> list = new ArrayList<WebDimensionAttribute>();
    
    if (webDisplayUnits != null && webDisplayUnits.size() > 0) {
      
      for (int i = 0; i < webDisplayUnits.getChildCount(); i++) {
        
        list.add((WebDimensionAttribute) webDisplayUnits.get(i));
        
      }
      Collections.sort(list, new DimensionComparator());
    }
    return list;
  }
  
  private List<PromptAnswer> getPromptChildElementList(String objectID, String elementID, int pin, int seq, String displayUnitType) {

    List<PromptAnswer> promptAnswerList = null;

    try {
      if (displayUnitType.equals(String.valueOf(EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition))) {
        promptAnswerList = getPromptChildReportDef(objectID, elementID, pin,seq);
      } else {
        promptAnswerList = getPromptChildNotReportDef(objectID, elementID, pin,seq);
      }

    } catch (WebObjectsException ex) {
      LOGGER.error("Error while fetching prompt contents 1: " + CmmUtil.exMessage(ex));
    } finally {
      closeServerSession();
    }
    return promptAnswerList;
  }
  
  /**
   * PMD 대응 - 복잡도 감소를 위해 메소드 분리 - DssXmlTypeReportDefinition
   * @throws IllegalArgumentException 
   * @throws UnsupportedOperationException 
   * @throws IndexOutOfBoundsException 
   * @throws WebObjectsException 
   */
  private ArrayList<PromptAnswer> getPromptChildReportDef(String objectID, String elementID, int pin, int seq) 
      throws WebObjectsException, IndexOutOfBoundsException, UnsupportedOperationException, IllegalArgumentException{

    WebReportInstance reportInstance = getServerSession().getFactory().getReportSource().getNewInstance(objectID);

    reportInstance.setAsync(false);
    reportInstance.setExecutionMode(EnumWebReportExecutionModes.REPORT_MODE_DEFAULT);
    reportInstance.setResultFlags(EnumDSSXMLResultFlags.DssXmlResultGrid + EnumDSSXMLResultFlags.DssXmlResultPageTreeStyle);
   
    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();
    WebPrompts webPrompts = reportInstance.getPrompts();

    WebPrompt webPrompt = webPrompts.findPromptByPIN(pin);
    WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;
    PromptAnswer promptAnswer = null;

    if (expressionPrompt.getOrigin() != null) {

      WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();

      if (webDisplayUnits != null) {

        List<WebDimensionAttribute> webDimAttrList = ReportPromptAssist.getWebDimensionAttributeList(webDisplayUnits);

        WebDimensionAttribute parentDimensionAttribute = webDimAttrList.get(seq - 1);
        WebDimensionAttribute childDimensionAttribute = (WebDimensionAttribute) parentDimensionAttribute.getChildren().item(0);

        WebElement parentElement = null;
        WebElements parentElements = parentDimensionAttribute.getAttribute().getElementSource().getElements();


        for (int i = 0; i < parentElements.size(); i++) {

          if (parentElements.get(i).getID().equals(elementID)) {
            parentElement = parentElements.get(i);
          }
        }

        WebAttribute parentAttribute = parentDimensionAttribute.getAttribute();
        WebAttribute childAttribute = childDimensionAttribute.getAttribute();

        WebExpression webExpression = childAttribute.getElementSource().getFilter().getExpression();
        webExpression.clear();

        WebOperatorNode parentOperatorNode =
            webExpression.createOperatorNode(EnumDSSXMLExpressionType.DssXmlFilterListQual, EnumDSSXMLFunction.DssXmlFunctionIn);
        webExpression.createShortcutNode(parentAttribute, parentOperatorNode);
        WebElementsObjectNode webElementsObjectNode = webExpression.createElementsObjectNode(parentAttribute, parentOperatorNode);
        webElementsObjectNode.getElements().add(parentElement.getElementID(), parentElement.getDisplayName());

        WebElements webElements = childAttribute.getElementSource().getElements();
        WebElement webElement = null;

        for (int i = 0; i < webElements.size(); i++) {
          webElement = webElements.get(i);
          promptAnswer = InstanceCreation.cPromptAnswer();
          promptAnswer.setObjectID(webElement.getID());
          promptAnswer.setDisplayName(webElement.getDisplayName());
          promptAnswer.setDisplayUnitType(webElement.getDisplayUnitType());
          promptAnswerList.add(promptAnswer);
        }
      }
    }
    
    return promptAnswerList;
  }
  
  /**
   * PMD 대응 - 복잡도 감소를 위해 메소드 분리 NOT - DssXmlTypeReportDefinition 
   * @throws IllegalArgumentException 
   * @throws UnsupportedOperationException 
   * @throws IndexOutOfBoundsException 
   * @throws WebObjectsException 
   */
  private ArrayList<PromptAnswer> getPromptChildNotReportDef(String objectID, String elementID, int pin, int seq) 
      throws WebObjectsException, IndexOutOfBoundsException, UnsupportedOperationException, IllegalArgumentException{
    
    WebDocumentInstance documentInstance = getServerSession().getFactory().getDocumentSource().getNewInstance(objectID);

    documentInstance.setAsync(false);
    documentInstance.setViewMode(EnumWebDocumentViewMode.DocumentViewModeHTML);
    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();
    WebPrompts webPrompts = documentInstance.getPrompts();

    WebPrompt webPrompt = webPrompts.findPromptByPIN(pin);
    WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;
    PromptAnswer promptAnswer = null;
    
    if (expressionPrompt.getOrigin() != null) {

      WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();

      if (webDisplayUnits != null) {

        List<WebDimensionAttribute> webDimAttrList = ReportPromptAssist.getWebDimensionAttributeList(webDisplayUnits);

        WebDimensionAttribute parentDimensionAttribute = webDimAttrList.get(seq - 1);
        WebDimensionAttribute childDimensionAttribute = (WebDimensionAttribute) parentDimensionAttribute.getChildren().item(0);

        WebElement parentElement = null;
        WebElements parentElements = parentDimensionAttribute.getAttribute().getElementSource().getElements();

        for (int i = 0; i < parentElements.size(); i++) {

          if (parentElements.get(i).getID().equals(elementID)) {
            parentElement = parentElements.get(i);
          }
        }

        WebAttribute parentAttribute = parentDimensionAttribute.getAttribute();
        WebAttribute childAttribute = childDimensionAttribute.getAttribute();

        WebExpression webExpression = childAttribute.getElementSource().getFilter().getExpression();
        webExpression.clear();

        WebOperatorNode parentOperatorNode =
            webExpression.createOperatorNode(EnumDSSXMLExpressionType.DssXmlFilterListQual, EnumDSSXMLFunction.DssXmlFunctionIn);
        webExpression.createShortcutNode(parentAttribute, parentOperatorNode);
        WebElementsObjectNode webElementsObjectNode = webExpression.createElementsObjectNode(parentAttribute, parentOperatorNode);
        webElementsObjectNode.getElements().add(parentElement.getElementID(), parentElement.getDisplayName());

        WebElements webElements = childAttribute.getElementSource().getElements();
        WebElement webElement = null;

        for (int i = 0; i < webElements.size(); i++) {
          webElement = webElements.get(i);
          promptAnswer = InstanceCreation.cPromptAnswer();
          promptAnswer.setObjectID(webElement.getID());
          promptAnswer.setDisplayName(webElement.getDisplayName());
          promptAnswer.setDisplayUnitType(webElement.getDisplayUnitType());
          promptAnswerList.add(promptAnswer);
        }
      }
    }
    return promptAnswerList;
  }

}// end of class
