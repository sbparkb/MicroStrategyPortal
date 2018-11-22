package com.groto.service;

import java.util.ArrayList;
import java.util.List;

import com.microstrategy.web.objects.WebAttribute;
import com.microstrategy.web.objects.WebDimensionAttribute;
import com.microstrategy.web.objects.WebDisplayUnits;
import com.microstrategy.web.objects.WebElement;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsObjectNode;
import com.microstrategy.web.objects.WebExpression;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebOperatorNode;
import com.microstrategy.webapi.EnumDSSXMLExpressionType;
import com.microstrategy.webapi.EnumDSSXMLFunction;
import com.mstr.business.model.PromptAnswerJson;

public class PromptElementAssist {

	/**
	 * 계층관계 연결로 콤보박스 목록 구성(단일선택)
	 * @param webDisplayUnits
	 * @param elementID
	 * @param seq
	 * @param searchTxt
	 * @return
	 * @throws WebObjectsException
	 */
	ArrayList<PromptAnswerJson> getPromptChildElementList(WebDisplayUnits webDisplayUnits, String elementID,int seq,String searchTxt) 
			throws WebObjectsException {

		List<WebDimensionAttribute> webDimeAttrList = PromptAnswerAssist.getWebDimensionAttributeList(webDisplayUnits);
		WebDimensionAttribute parentDimensionAttribute = webDimeAttrList.get(seq - 1);
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

		/** 검색어가 있으면 검색어로 필터링한다. **/
		if(!"".equals(searchTxt)) {
			childAttribute.getElementSource().setSearchPattern(searchTxt); 
		}

		WebElements childWebElements = childAttribute.getElementSource().getElements();

		WebElement webElement = null;

		PromptAnswerJson promptAnswer = null;
		ArrayList<PromptAnswerJson> promptAnswerList = new ArrayList<PromptAnswerJson>();

		for (int i = 0; i < childWebElements.size(); i++) {

			webElement = childWebElements.get(i);
			promptAnswer = InstanceCreation.cPromptAnswerJson();
			promptAnswer.setObjectID(webElement.getID());
			String[] displayNames = webElement.getDisplayName().split(":");
			promptAnswer.setDisplayName(displayNames[0]);
			promptAnswer.setDisplayUnitType(webElement.getDisplayUnitType());
			promptAnswerList.add(promptAnswer);
		}
		return promptAnswerList;
	}
  
	/**
	 * 계층관계 연결로 콤보박스 목록 구성(다중선택) 
	 * @param webDisplayUnits
	 * @param elementIDs
	 * @param seq
	 * @param page
	 * @param pageSize
	 * @return
	 * @throws WebObjectsException
	 */
	ArrayList<PromptAnswerJson> getPromptChildElementList(
			WebDisplayUnits webDisplayUnits, 
			String[] elementIDs,
			int seq,
			String searchTxt
			) throws WebObjectsException {

		List<WebDimensionAttribute> webDimAttrList = PromptAnswerAssist.getWebDimensionAttributeList(webDisplayUnits);
		WebDimensionAttribute parentDimensionAttribute = webDimAttrList.get(seq - 1);
		WebDimensionAttribute childDimensionAttribute = (WebDimensionAttribute) parentDimensionAttribute.getChildren().item(0);
		WebElement parentElement = null;
		WebElements parentElements = parentDimensionAttribute.getAttribute().getElementSource().getElements();

		WebElements chidWebElements = null;

		PromptAnswerJson promptAnswer = null;
		ArrayList<PromptAnswerJson> promptAnswerList = new ArrayList<PromptAnswerJson>();

		for (int i = 0; i < parentElements.size(); i++) {
			// 복수개 선택 처리

			for (int j = 0; j < elementIDs.length; j++) {
				if (parentElements.get(i).getID().equals(elementIDs[j])) {

					parentElement = parentElements.get(i);

					WebAttribute parentAttribute = parentDimensionAttribute.getAttribute();
					WebAttribute childAttribute = childDimensionAttribute.getAttribute();

					WebExpression childWebExpression = childAttribute.getElementSource().getFilter().getExpression();                

					WebOperatorNode parentOperatorNode =
							childWebExpression.createOperatorNode(EnumDSSXMLExpressionType.DssXmlFilterListQual, EnumDSSXMLFunction.DssXmlFunctionIn);

					childWebExpression.createShortcutNode(parentAttribute, parentOperatorNode);          
					WebElementsObjectNode webElementsObjectNode = childWebExpression.createElementsObjectNode(parentAttribute, parentOperatorNode);

					webElementsObjectNode.getElements().add(parentElement.getElementID(), parentElement.getDisplayName());

					/** 검색어가 있으면 검색어로 필터링한다. **/
					if(!"".equals(searchTxt)) {
						childAttribute.getElementSource().setSearchPattern(searchTxt); 
					}

					chidWebElements = childAttribute.getElementSource().getElements();

					WebElement webElement = null;

					for (int x = 0; x < chidWebElements.size(); x++) {
						webElement = chidWebElements.get(x);
						promptAnswer = InstanceCreation.cPromptAnswerJson();
						promptAnswer.setObjectID(webElement.getID());
						String[] displayNames = webElement.getDisplayName().split(":");          
						promptAnswer.setDisplayName(displayNames[0]);

						promptAnswer.setDisplayUnitType(webElement.getDisplayUnitType());
						if (webDimAttrList.size() != seq + 1) {
							promptAnswer.setParentName(parentElement.getDisplayName());
						}
						promptAnswerList.add(promptAnswer);
					}

					childWebExpression.clear();
				}
			}
		}
		return promptAnswerList;
	}

	/**
	 * 비 계층관계 프롬프트 목록 검색(단일선택)
	 * @param webDisplayUnits
	 * @param elementID
	 * @param seq
	 * @param searchTxt
	 * @return
	 * @throws WebObjectsException
	 */
	ArrayList<PromptAnswerJson> getPromptElementList(WebDisplayUnits webDisplayUnits, String elementID, int seq,String searchTxt) 
		  throws WebObjectsException {

		return null;
  }
}// end of class
