package com.groto.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.microstrategy.utils.StringUtils;
import com.microstrategy.web.objects.EnumWebPromptType;
import com.microstrategy.web.objects.WebConstantPrompt;
import com.microstrategy.web.objects.WebDimensionAttribute;
import com.microstrategy.web.objects.WebDisplayUnits;
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
import com.microstrategy.web.objects.WebObjectsPrompt;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.webapi.EnumDSSXMLObjectTypes;
import com.mstr.business.comparator.DimensionComparator;
import com.mstr.business.comparator.DisplayNameComparator;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptInfo;
import com.mstr.business.model.ReportInfo;

class PromptAnswerAssist extends AbstractSessionUserService{
  
  protected static final Logger LOGGER = Logger.getLogger(PromptAnswerAssist.class);

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  List<ReportInfo> getFolderObjectList(WebIServerSession serverSession, String objectID, List<ReportInfo> pList, int pDepth)
      throws WebObjectsException {

    List<ReportInfo> list = pList;

    if (list == null) {
      list = new ArrayList<ReportInfo>();
    }

    int depth = pDepth;

    ReportInfo reportObj = null;

    WebObjectSource objectSource = serverSession.getFactory().getObjectSource();
    WebFolder folder = (WebFolder) objectSource.getObject(objectID, EnumDSSXMLObjectTypes.DssXmlTypeFolder);

    folder.populate();
    list.add(new ReportInfo(folder, depth));

    if (folder.size() > 0 && folder.getChildUnits() != null) {

      WebDisplayUnits units = folder.getChildUnits();
      units.sort(new DisplayNameComparator());

      depth++;

      for (int i = 0; i < units.size(); i++) {
       reportObj = InstanceCreation.cReportInfo();
        if (units.get(i).getDisplayUnitType() == EnumDSSXMLObjectTypes.DssXmlTypeReportDefinition
            || units.get(i).getDisplayUnitType() == EnumDSSXMLObjectTypes.DssXmlTypeDocumentDefinition) {
          reportObj.setObjectID(((WebObjectInfo) units.get(i)).getID());
          reportObj.setDepth(depth);
          list.add(reportObj);
        } else if (units.get(i).getDisplayUnitType() == EnumDSSXMLObjectTypes.DssXmlTypeFolder) {
          list = getFolderObjectList(serverSession, units.get(i).getID(), list, depth);
        }
      }
    }
    return list;
  }
  
  ArrayList<PromptAnswer> getPromptAnswerList(WebPrompt webPrompt, HttpServletRequest request, PromptInfo promptInfo) throws WebObjectsException{
    
    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();

    if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeElements) {    	
      promptAnswerList = createWebPromptTypeElements(webPrompt);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeObjects) {
      promptAnswerList = createWebPromptTypeObjects(webPrompt);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeExpression) {
      promptAnswerList = createWebPromptTypeExpression(webPrompt, promptInfo);
    } else if (promptInfo.getPromptType() == EnumWebPromptType.WebPromptTypeConstant) {
      promptInfo.setWebConPrompt((WebConstantPrompt) webPrompt);
    }
    
    return promptAnswerList;
  }
  
  private ArrayList<PromptAnswer> createWebPromptTypeElements(WebPrompt webPrompt) throws WebObjectsException{
    
    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();
    
    WebElementsPrompt webElementsPrompt = null;
    WebElements originalElements = null;
    WebElement webElement = null;
    WebElementSource elementSource =null;
    WebElements defaultElements = null;
    
    webElementsPrompt = (WebElementsPrompt) webPrompt;
    originalElements = webElementsPrompt.getSuggestedAnswers();
        
    if (originalElements == null || originalElements.size() == 0) {
      elementSource = webElementsPrompt.getOrigin().getElementSource();
      webElementsPrompt.getSuggestedAnswers();
      
      elementSource.setBlockBegin(0);
      elementSource.setBlockCount(10000);
      
      originalElements = elementSource.getElements() ;
    }

    defaultElements = webElementsPrompt.getDefaultAnswer();
  
    PromptAnswer promptAnswer = null;
    for (int eleIndex = 0; originalElements != null && eleIndex < originalElements.size(); eleIndex++) {

      webElement = originalElements.get(eleIndex);
      promptAnswer = InstanceCreation.cPromptAnswer();      
      promptAnswer.setObjectID(webElement.getID());
      String [] displayNames = webElement.getDisplayName().split(":");
      promptAnswer.setDisplayName(displayNames[0]);
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
      String[]  displayNames = webObjectInfo.getDisplayName().split(":");
      promptAnswer.setDisplayName(displayNames[0]);
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
  
  private ArrayList<PromptAnswer> createWebPromptTypeExpression(WebPrompt webPrompt, PromptInfo promptInfo) throws WebObjectsException{

    ArrayList<PromptAnswer> promptAnswerList = new ArrayList<PromptAnswer>();
    
    // 계층형 처리 ( select box )
    WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;

    WebDisplayUnits webDisplayUnits = null;
    WebElements webElements = null;
    WebElement webElement = null;

    List<WebDimensionAttribute> webDimAttrList = new ArrayList<WebDimensionAttribute>();
    
    if (expressionPrompt.getOrigin() != null) {
      webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();

      if (webDisplayUnits != null) {

        webDimAttrList = getWebDimensionAttributeList(webDisplayUnits);

        List<PromptAnswer> expElementList = new ArrayList<PromptAnswer>();
        PromptAnswer element =  null;
        // 계층형의 경우 자식 attribute수 셋팅
        promptInfo.setChildUnitCnt(webDimAttrList.size());

        int dimAttrCount = 0;
        PromptAnswer promptAnswer = null;
        
        for (WebDimensionAttribute webDimensionAttribute : webDimAttrList) {
          
          dimAttrCount++;
          promptAnswer = InstanceCreation.cPromptAnswer();
          promptAnswer.setObjectID(webDimensionAttribute.getID());
          String[] displayNames = webDimensionAttribute.getDisplayName().split(":");
          promptAnswer.setDisplayName(displayNames[0]);
          promptAnswer.setDisplayUnitType(webDimensionAttribute.getDisplayUnitType());

          // 계층의 영문명 조회
          promptAnswer.setDimensionName(webDimensionAttribute.getDimension().getName());
          promptAnswer.setCustomAnswer(false);
          
          if (dimAttrCount == 1) {
            expElementList.clear();
            webElements = webDimensionAttribute.getAttribute().getElementSource().getElements();
            
            for (int i = 0; i < webElements.size(); i++) {
              
              webElement = webElements.get(i);
              element = InstanceCreation.cPromptAnswer();
              element.setObjectID(webElement.getID());
              displayNames = webElement.getDisplayName().split(":");
              element.setDisplayName(displayNames[0]);
              element.setDisplayUnitType(webElement.getDisplayUnitType());
              element.setElement(webElement);
              expElementList.add(element);
            }
            promptAnswer.setExpElementList(expElementList);
          }
          
          promptAnswerList.add(promptAnswer);
        } 
      }
    }
    
    return promptAnswerList;
  }

  /***
   * getDisplayStyleValue
   * @param webPrompt
   * @return
   */
  static int getDisplayStyleValue(WebPrompt webPrompt) {
    String strDisplayStyle = "";
    int displayStyleValue = 0;
    if (webPrompt != null) {
      strDisplayStyle = webPrompt.getDisplayProperties().getByName("DisplayStyle").getValue();
      if (StringUtils.isEqual(strDisplayStyle, "Text box")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_TEXT_BOX;
      } else if (StringUtils.isEqualIgnoreCase(strDisplayStyle, "Option button")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_OPT_BTN;
      } else if (StringUtils.isEqualIgnoreCase(strDisplayStyle, "CheckBox")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_CART;
      } else if (StringUtils.isEqualIgnoreCase(strDisplayStyle, "List")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_LIST;
      } else if (StringUtils.isEqualIgnoreCase(strDisplayStyle, "Pull down")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_PULL_DOWN;
      } else if (StringUtils.isEqualIgnoreCase(strDisplayStyle, "Cart")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_CART;
      } else if (StringUtils.isEqualIgnoreCase(strDisplayStyle, "Tree")) {
        displayStyleValue = PromptStyle.DISPLAY_STYLE_TREE;
      }
    }
    return displayStyleValue;
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

}// end of class
