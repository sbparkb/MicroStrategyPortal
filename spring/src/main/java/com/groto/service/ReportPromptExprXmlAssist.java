package com.groto.service;

import java.util.List;

import com.microstrategy.utils.StringUtils;
import com.microstrategy.web.objects.WebAttribute;
import com.microstrategy.web.objects.WebDimensionAttribute;
import com.microstrategy.web.objects.WebElement;
import com.microstrategy.web.objects.WebElements;
import com.microstrategy.web.objects.WebElementsObjectNode;
import com.microstrategy.web.objects.WebExpression;
import com.microstrategy.web.objects.WebExpressionPrompt;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebOperatorNode;
import com.mstr.business.model.PromptInfo;

public class ReportPromptExprXmlAssist {

	void getIdWebPromptExprObjXml(
			List<WebDimensionAttribute> webDimensionAttrList
			, PromptInfo promptInfo
			, WebExpressionPrompt expressionPrompt
			, WebExpression webExpression
			, WebOperatorNode operatorNode) throws WebObjectsException{

		WebDimensionAttribute webDimensionAttribute = null;
		WebElement element = null;
		WebElements elements = null;
		WebAttribute webAttribute = null;
		WebElementsObjectNode webElementsObjectNode = null;
		String elementID = "";
		ReportPromptExprXmlElemAssist assist = new ReportPromptExprXmlElemAssist();

		for (int i = webDimensionAttrList.size() - 1; i >= 0; i--) {
			boolean isSelect = false;
			int cnt = 0;
			// XML 생성 시 마지막 입력 값만 셋팅
			//if (promptInfo.getMstrParamValues() != null && promptInfo.getMstrParamValues().length > 0) {
				for (int k = promptInfo.getMstrParamValues().length - 1; k >= 0; k--) {
					webDimensionAttribute = webDimensionAttrList.get(i);
					elementID = promptInfo.getMstrParamValues()[k];
					elements = webDimensionAttribute.getAttribute().getElementSource().getElements();
					for (int j = 0; j < elements.size(); j++) {
						if (elements.get(j).getID().equals(elementID)) {
							element = elements.get(j);
							webAttribute = webDimensionAttribute.getAttribute();
							if (StringUtils.isNotEmpty(elementID) && element != null) {
								assist.getIdWebPromptExprElemXml(cnt, webExpression, webAttribute, webElementsObjectNode, operatorNode, element);
								/*if (cnt == 0) {
										webExpression.createShortcutNode(webAttribute, operatorNode);
									}
									webElementsObjectNode = webExpression.createElementsObjectNode(webAttribute, operatorNode);
									webElementsObjectNode.getElements().add(element.getElementID(), element.getDisplayName());*/
								cnt++;
								isSelect = true;
							}
						}
					}
					expressionPrompt.setAnswer(webExpression);
				}

				if (isSelect) {
					break;
				}
			//}
		}
	}
}
