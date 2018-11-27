<%
 /*
  * NCSubscriptions_Edit_Content.jsp
  * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
  */
%>

<%@ page errorPage="Error_Content.jsp"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="/webUtilTL.tld" prefix="web"%>

<web:resource type="javascript" name="NCScripts.js"/>
<%-- Render the output to create/edit an email subscription. --%>
<web:ifFeature type="bean" value="alertEditor" name="show-alerts-editor">
	<web:then>
		<web:displayBean bean="alertEditor" styleName="AlertsSubscriptionEditStyle" />
	</web:then>
	<web:else>
		<web:displayBean bean="subFrame" styleName="SubscriptionFrameStyle" />
	</web:else>
</web:ifFeature>	
<%--
  Have the 'attFormsQual' and the 'metricQualLevel' editors available
  in case the page needs them.
--%>
<web:displayGuiComponent name="attFormsQual"/>
<web:displayGuiComponent name="metricQualLevel"/>
<web:displayGuiComponent name="elementPicker"/>
<web:displayGuiComponent name="contactsBrowser"/>
<web:displayGuiComponent name="alertsObjSelector"/>
<web:displayGuiComponent name="thresholdsFormatEditor"/>

<web:ifFeature name="dhtml"><web:then>
<web:updateManager scope="com.microstrategy.web.app.beans.EnumExecutionScope.EDIT_SUBSCRIPTION_SCOPE" bean="ncSub" />
<jsp:include page='/jsp/CommonDescriptors.jsp' flush="true"/>
<web:clientSideDescriptor IDs = "2946,2947,2948,3878,5158,5865,5969,5976,5977,5978,5979,5980,5981,5982,6036,6181" />
</web:then></web:ifFeature>

