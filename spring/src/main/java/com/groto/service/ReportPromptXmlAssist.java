package com.groto.service;

import java.util.List;

import org.apache.log4j.Logger;

import com.groto.cmm.util.StringUtil;
import com.microstrategy.utils.StringUtils;
import com.microstrategy.web.objects.EnumWebPromptType;
import com.microstrategy.web.objects.WebAttribute;
import com.microstrategy.web.objects.WebConstantPrompt;
import com.microstrategy.web.objects.WebDimensionAttribute;
import com.microstrategy.web.objects.WebDisplayUnits;
import com.microstrategy.web.objects.WebElement;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsObjectNode;
import com.microstrategy.web.objects.WebElementsPrompt;
import com.microstrategy.web.objects.WebExpression;
import com.microstrategy.web.objects.WebExpressionPrompt;
import com.microstrategy.web.objects.WebFolder;
import com.microstrategy.web.objects.WebObjectInfo;
import com.microstrategy.web.objects.WebObjectSource;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebObjectsPrompt;
import com.microstrategy.web.objects.WebOperatorNode;
import com.microstrategy.web.objects.WebPrompt;
import com.microstrategy.webapi.EnumDSSXMLExpressionType;
import com.microstrategy.webapi.EnumDSSXMLFunction;
import com.mstr.business.model.PromptAnswer;
import com.mstr.business.model.PromptInfo;

public class ReportPromptXmlAssist {
	
  protected static final Logger LOGGER = Logger.getLogger(ReportPromptXmlAssist.class);

  void getReportPromptXML(WebPrompt webPrompt, PromptInfo promptInfo, List<PromptAnswer> promptAnswerList, WebObjectSource objectSource)
      throws WebObjectsException {

    if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeConstant) {
      getWebPromptTypeConstantXML(webPrompt, promptInfo);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeElements) {
      getWebPromptTypeElementsXML(webPrompt, promptInfo);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeObjects) {
      getWebPromptTypeObjectsXML(webPrompt, promptInfo, promptAnswerList, objectSource);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeExpression) {
      getWebPromptTypeExpressionXML(webPrompt, promptInfo);
    }
  }

  private void getWebPromptTypeConstantXML(WebPrompt webPrompt, PromptInfo promptInfo) {
    WebConstantPrompt webConstantPrompt = (WebConstantPrompt) webPrompt;
    if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
      webConstantPrompt.setAnswer(promptInfo.getMstrParamValues()[0]);
    }
  }

  private void getWebPromptTypeElementsXML(WebPrompt webPrompt, PromptInfo promptInfo) throws WebObjectsException {
    WebElementsPrompt webElementsPrompt = (WebElementsPrompt) webPrompt;
    WebElements webElements = webElementsPrompt.getAnswer();
    webElements.clear();

    if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
      for (String paramString : promptInfo.getMstrParamValues()) {
        if (!paramString.equals("")) {
          webElements.add(paramString);
        }
      }
    }
    webElementsPrompt.validate();
  }

  private void getWebPromptTypeObjectsXML(WebPrompt webPrompt, PromptInfo promptInfo, List<PromptAnswer> promptAnswerList,
      WebObjectSource objectSource) throws WebObjectsException {
    WebObjectsPrompt webObjectsPrompt = (WebObjectsPrompt) webPrompt;
    WebObjectInfo webObjectInfo = null;
    WebFolder webFolder = webObjectsPrompt.getAnswer();
    webFolder.clear();
    if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
      for (PromptAnswer promptAnswer : promptAnswerList) {
        for (String paramString : promptInfo.getMstrParamValues()) {
          if (paramString.equals(promptAnswer.getObjectID())) {
            webObjectInfo = objectSource.getObject(paramString, promptAnswer.getObjectType());
            webFolder.add(webObjectInfo);
          }
        }
      }
    }
    webObjectsPrompt.validate();
  }

  private void getWebPromptTypeExpressionXML(WebPrompt webPrompt, PromptInfo promptInfo) throws WebObjectsException {
    WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;
    if (expressionPrompt.getOrigin() != null) {
      WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();
      if (webDisplayUnits != null) {
       
        List<WebDimensionAttribute> webDimAttrList = PromptAnswerAssist.getWebDimensionAttributeList(webDisplayUnits);
        WebExpression webExpression = expressionPrompt.getAnswer();
        webExpression.clear();

        WebOperatorNode operatorNode =
            webExpression.createOperatorNode(EnumDSSXMLExpressionType.DssXmlFilterListQual, EnumDSSXMLFunction.DssXmlFunctionIn);
        operatorNode.setExpressionType(EnumDSSXMLExpressionType.DssXmlFilterSingleBaseFormQual);
        // 마지막 입력 값 Index 저장
        int lastIndex = 0;
        if (promptInfo.getMstrParamValues() != null) {
          for (String paramValue : promptInfo.getMstrParamValues()) {
            if (StringUtil.isEmpty(paramValue)) {
              break;
            }
            lastIndex++;
          }
        }

        getWebPromptTypeExpression(webDimAttrList, promptInfo, operatorNode, webExpression, expressionPrompt, lastIndex);

      }
    }
    expressionPrompt.validate();
  }

  private void getWebPromptTypeExpression(List<WebDimensionAttribute> webDimAttrList,
      PromptInfo promptInfo, WebOperatorNode operatorNode, WebExpression pWebExpression, WebExpressionPrompt expressionPrompt, int pLastIndex)
      throws WebObjectsException {

    int lastIndex = pLastIndex;
    WebElement element = null;
    WebAttribute webAttribute = null;
    WebDimensionAttribute webDimensionAttribute = null;
    WebElementsObjectNode webElementsObjectNode = null;
    WebExpression webExpression = pWebExpression;

    if (webDimAttrList != null && webDimAttrList.size() > 0) {
      for (int i = 0; i < webDimAttrList.size(); i++) {
        // XML 생성 시 마지막 입력 값만 셋팅
        if (i == lastIndex - 1) {
          webDimensionAttribute = webDimAttrList.get(i);
          String elementID = promptInfo.getMstrParamValues()[i];
          WebElements elements = webDimensionAttribute.getAttribute().getElementSource().getElements();
          for (int j = 0; j < elements.size(); j++) {
            if (elements.get(j).getID().equals(elementID)) {
              element = elements.get(j);
            }
          }
          webAttribute = webDimensionAttribute.getAttribute();
          webExpression.createShortcutNode(webAttribute, operatorNode);
          if (StringUtils.isNotEmpty(elementID) && element != null) {
            webElementsObjectNode = webExpression.createElementsObjectNode(webAttribute, operatorNode);
            webElementsObjectNode.getElements().add(element.getElementID(), element.getDisplayName());
          }
          expressionPrompt.setAnswer(webExpression);
        }
      }
    }
  }

  void getReportIdPromptXML(WebPrompt webPrompt, PromptInfo promptInfo, List<PromptAnswer> promptAnswerList, WebObjectSource objectSource)
      throws WebObjectsException {

    if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeConstant) {    	
      getIdWebPromptTypeConstantXML(webPrompt, promptInfo);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeElements) {
      getIdWebPromptTypeElementsXML(webPrompt, promptInfo);      
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeObjects) {
      getIdWebPromptTypeObjectsXML(webPrompt, promptInfo, promptAnswerList, objectSource);
    } else if (webPrompt.getPromptType() == EnumWebPromptType.WebPromptTypeExpression) {
      getIdWebPromptTypeExpressionXML(webPrompt, promptInfo);
    }
  }

  private void getIdWebPromptTypeConstantXML(WebPrompt webPrompt, PromptInfo promptInfo) {
    WebConstantPrompt webConstantPrompt = (WebConstantPrompt) webPrompt;

    if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
      webConstantPrompt.setAnswer(promptInfo.getMstrParamValues()[0]);
    }
  }

  private void getIdWebPromptTypeElementsXML(WebPrompt webPrompt, PromptInfo promptInfo) throws WebObjectsException {
    WebElementsPrompt webElemPrompt = (WebElementsPrompt) webPrompt;
    WebElements wElements = webElemPrompt.getAnswer();
    wElements.clear();
    
    if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
      for (String paramString : promptInfo.getMstrParamValues()) {    	  
        wElements.add(paramString);
      }
    }
    webElemPrompt.validate();
  }

  private void getIdWebPromptTypeObjectsXML(WebPrompt webPrompt, PromptInfo promptInfo, List<PromptAnswer> promptAnswerList,
      WebObjectSource objectSource) throws WebObjectsException, IllegalArgumentException {
    WebObjectsPrompt webObjectsPrompt = (WebObjectsPrompt) webPrompt;
    WebObjectInfo webObjectInfo = null;
    WebFolder webFolder = webObjectsPrompt.getAnswer();
    webFolder.clear();
    if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
      for (PromptAnswer promptAnswer : promptAnswerList) {
        for (String paramString : promptInfo.getMstrParamValues()) {
          if (paramString.equals(promptAnswer.getObjectID())) {
            webObjectInfo = objectSource.getObject(paramString, promptAnswer.getObjectType());
            webFolder.add(webObjectInfo);
          }
        }
      }
    }
    webObjectsPrompt.validate();
  }


  private void getIdWebPromptTypeExpressionXML(WebPrompt webPrompt, PromptInfo promptInfo) throws WebObjectsException,
      UnsupportedOperationException, IndexOutOfBoundsException, IllegalArgumentException {

    WebExpressionPrompt expressionPrompt = (WebExpressionPrompt) webPrompt;

   /* if (expressionPrompt.getOrigin() != null) {
      WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();
      if (webDisplayUnits != null) {
        List<WebDimensionAttribute> webDimAttrList = PromptAnswerAssist.getWebDimensionAttributeList(webDisplayUnits);
        WebExpression webExpression = expressionPrompt.getAnswer();
        webExpression.clear();

        WebOperatorNode operatorNode =
            webExpression.createOperatorNode(EnumDSSXMLExpressionType.DssXmlFilterListQual, EnumDSSXMLFunction.DssXmlFunctionIn);
        operatorNode.setExpressionType(EnumDSSXMLExpressionType.DssXmlFilterSingleBaseFormQual);
        if (promptInfo.getMstrParamValues() != null) {
          for (String paramValue : promptInfo.getMstrParamValues()) {
            if (StringUtil.isEmpty(paramValue)) {
              break;
            }
          }
        }

        getIdWebPromptTypeExpressionInnerA(expressionPrompt, promptInfo, webDimAttrList, webExpression, operatorNode);
      }
    }*/
    
    if (expressionPrompt.getOrigin() != null) {
        WebDisplayUnits webDisplayUnits = expressionPrompt.getOrigin().getChildUnits();
        if (webDisplayUnits != null) {
        	
          List<WebDimensionAttribute> webDimensionAttrList = PromptAnswerAssist.getWebDimensionAttributeList(webDisplayUnits);
          // List<WebDimensionAttribute> webDimensionAttributeList =
          // dimensionSort(webDisplayUnits);
/*          WebDimensionAttribute webDimensionAttribute = null;
          WebElement element = null;
          WebElements elements = null;
          WebAttribute webAttribute = null;
          WebElementsObjectNode webElementsObjectNode = null;
          String elementID = "";*/

          WebExpression webExpression = expressionPrompt.getAnswer();
          webExpression.clear();

          WebOperatorNode operatorNode =
              webExpression.createOperatorNode(EnumDSSXMLExpressionType.DssXmlFilterListQual, EnumDSSXMLFunction.DssXmlFunctionIn);
          operatorNode.setExpressionType(EnumDSSXMLExpressionType.DssXmlFilterSingleBaseFormQual);
          
          ReportPromptExprXmlAssist innerAssist = new ReportPromptExprXmlAssist();
          if (webDimensionAttrList != null && webDimensionAttrList.size() > 0 && promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
        	  innerAssist.getIdWebPromptExprObjXml(webDimensionAttrList, promptInfo, expressionPrompt, webExpression, operatorNode);  
          }
/*
          if (webDimensionAttrList != null && webDimensionAttrList.size() > 0) {
            for (int i = webDimensionAttrList.size() - 1; i >= 0; i--) {
              boolean isSelect = false;
              int cnt = 0;
              // XML 생성 시 마지막 입력 값만 셋팅
              if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
                for (int k = promptInfo.getMstrParamValues().length - 1; k >= 0; k--) {
                  webDimensionAttribute = webDimensionAttrList.get(i);
                  elementID = promptInfo.getMstrParamValues()[k];
                  elements = webDimensionAttribute.getAttribute().getElementSource().getElements();
                  for (int j = 0; j < elements.size(); j++) {
                    if (elements.get(j).getID().equals(elementID)) {
                      element = elements.get(j);
                      webAttribute = webDimensionAttribute.getAttribute();
                      if (StringUtils.isNotEmpty(elementID) && element != null) {
                        if (cnt == 0) {
                          webExpression.createShortcutNode(webAttribute, operatorNode);
                        }
                        webElementsObjectNode = webExpression.createElementsObjectNode(webAttribute, operatorNode);
                        webElementsObjectNode.getElements().add(element.getElementID(), element.getDisplayName());
                        cnt++;
                        isSelect = true;
                      }
                    }
                  }
                  expressionPrompt.setAnswer(webExpression);
                }
                // }
                if (isSelect) {
                  break;
                }
              }
            }
          }
*/
        }
      }

    expressionPrompt.validate();
  }

}// end of class
