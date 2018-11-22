package com.groto.service;

import com.microstrategy.web.objects.WebAttribute;
import com.microstrategy.web.objects.WebElement;
import com.microstrategy.web.objects.WebElementsObjectNode;
import com.microstrategy.web.objects.WebExpression;
import com.microstrategy.web.objects.WebObjectsException;
import com.microstrategy.web.objects.WebOperatorNode;

public class ReportPromptExprXmlElemAssist {

	void  getIdWebPromptExprElemXml(int cnt
			, WebExpression webExpression
			, WebAttribute webAttribute
			, WebElementsObjectNode pWebElementsObjectNode
			, WebOperatorNode operatorNode
			, WebElement element
			) throws WebObjectsException{

		if (cnt == 0) {
			webExpression.createShortcutNode(webAttribute, operatorNode);
		}
		
		WebElementsObjectNode webElementsObjectNode = pWebElementsObjectNode;
		webElementsObjectNode = webExpression.createElementsObjectNode(webAttribute, operatorNode);
		webElementsObjectNode.getElements().add(element.getElementID(), element.getDisplayName());
	}
}
