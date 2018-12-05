<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.groto.cmm.util.SystemMessage"%>
<%@ page import="com.groto.session.MSTRSessionUserImpl"%>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="java.util.List" %>
<%@ page import="com.microstrategy.webapi.EnumDSSXMLObjectTypes" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fn" uri = "http://java.sun.com/jsp/jstl/functions" %>
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/javascript/jquery-1.8.3.min.js"></script>
<form action="<spring:message code='URL.WEB.SERVER' />/servlet/mstrWeb" id="mstrForm" name="mstrForm" method="post" accept-charset="utf-8">
 	<c:choose>
 		<c:when test="${fn:escapeXml(popYn) eq 'Y' and fn:escapeXml(execType) eq 'mstr'}">
    	<textarea style='display:none' name='promptsAnswerXML'></textarea>
    	</c:when>
    	<c:otherwise>
    	<textarea style='display:none' name='promptsAnswerXML'>${fn:escapeXml(strPromptXML)}</textarea>
    	</c:otherwise>
    </c:choose>
    
	<input type="hidden" name="usrSmgr" id="usrSmgr" value="${fn:escapeXml(usrSmgr1)}" />
	<input type='hidden' name='Server' value='<spring:message code="mstr.config.default.server-name" />'/>
	<input type='hidden' name='Project' value='<spring:message code="mstr.config.default.project-name" />'/>
	<input type='hidden' name='Port' value='0'/>
	<input type='hidden' name='evt' value='${fn:escapeXml(evt)}'/>
	<input type='hidden' name='src' value='${fn:escapeXml(src)}'/>
	<input type='hidden' name='${fn:escapeXml(objectName)}' value='${fn:escapeXml(objectID)}'/> 
	<input type="hidden" name="isBiWeb" value="N" />	
 
 <c:if test="${fn:escapeXml(popYn) ne 'Y'}">
 	<c:choose>
 		<c:when test="${fn:escapeXml(displayUnitType) eq '55'}">
 			<input type="hidden" name="currentViewMedia" value="1" />
			<input type="hidden" name="visMode" value="1" />
			<c:if test="${fn:escapeXml(VI_DASHBOARD) eq 'true'}">
				<input type="hidden" name="share" value="1" />
			</c:if>
			<input type='hidden' name='hiddenSections' value='dockTop,dockLeft,path,header,footer,toolbar' />
 		</c:when>
 		<c:otherwise>
 			<input type="hidden" name="reportViewMode" value="1" />
			<input type='hidden' name='hiddenSections' value='dockTop,dockLeft,path,header,footer,toolbar' />
 		</c:otherwise> 		
 	</c:choose>
 	<c:if test="${fn:escapeXml(newWeb) ne 'Y'}">
		<input type="hidden" name="newWeb" value="Y" />
	</c:if>
 </c:if>
</form>
<input type="hidden" id="promptUrl" value="${fn:escapeXml(repUrl)}"/>
<input type="hidden" id="promptsAnswerXML" value="${fn:escapeXml(strPromptXML)}" />
<script src="${fn:escapeXml(pageContext.request.contextPath)}/resource/pmd/common/docExecution.js"></script>