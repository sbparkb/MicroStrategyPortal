<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="com.microstrategy.web.objects.rw.EnumRWExecutionModes"%>
<%@ taglib prefix="web" uri="/webUtilTL.tld" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<%@page import="com.groto.cmm.util.SystemMessage"%>
<%--@page import="com.groto.session.MSTRSessionUser"--%>
<%@page import="com.groto.session.MSTRSessionUserImpl"%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="java.util.List" %>
<%@ page import="com.microstrategy.webapi.EnumDSSXMLObjectTypes" %>
<%@ page import="com.microstrategy.web.objects.rw.EnumRWExecutionModes"%> 
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<% 
    response.setHeader("P3P","CP='CAO PSA CONi OTR OUR DEM ONL'");
	String contextRoot = request.getContextPath();
	response.setCharacterEncoding("UTF-8");
	request.setCharacterEncoding("UTF-8");
	String contextDoc = contextRoot + "/resource";
	String strPromptXML 							= (String)request.getAttribute("strPromptXML");
	String objectID 								= (String)request.getAttribute("objectID");
	//String unit 									= (String)request.getAttribute("displayUnitType");
	String isShortcut				= StringUtil.escapeHtmlString( (String) request.getParameter( "isShortcut" ) );
	int displayUnitType 							= 0;//Integer.parseInt(unit);
	if("true".equals(isShortcut)){
		objectID				= StringUtil.escapeHtmlString( (String) request.getParameter( "targetID" ) );
		displayUnitType			= Integer.parseInt((String) request.getParameter( "targetType" ));
	}else{
		displayUnitType			= Integer.parseInt((String) request.getParameter( "displayUnitType" ));
	}
		
	String objectName								= "";
	String evt										= "";
	String src										= "";
	//String userId									= ((MSTRSessionUserImpl)request.getSession().getAttribute(MSTRSessionUser.ATTRIBUTE_NAME)).getMstrUserID();
	//String userPw									= ((MSTRSessionUserImpl)request.getSession().getAttribute(MSTRSessionUser.ATTRIBUTE_NAME)).getMstrUserPW();
	if(displayUnitType == 55){
		objectName 									= "documentID";
		
		evt	= "3069"; 
		src = "mstrWeb.3069";  
		
	}else{
		objectName									= "reportID";
		
		evt	= "3062";  
		src = "mstrWeb.3062";
	}
	String sessionId 								= (String)request.getAttribute("sessionId");
	String newUsrSmgr								= (String) request.getSession().getAttribute( "usrSmgr1" );
	
	strPromptXML 									= strPromptXML.replaceAll("\"", "\'");
	String repUrl 									=  "/servlet/mstrWeb?Server="+SystemMessage.getMessage("mstr.config.default.server-name")+"&Project="+SystemMessage.getMessage("mstr.config.default.project-name");
	repUrl											+= "&Port=0&evt=" + evt + "&src=" + src + "&visMode=0&"+objectName+"="+objectID;
%>
<%-- <jsp:include page="common.jsp" /> --%>
<script src="<%=contextDoc %>/javascript/jquery-1.8.3.min.js"></script>
<form action="<spring:message code='URL.WEB.SERVER' />/servlet/mstrWeb" id="mstrForm" name="mstrForm" method="post" accept-charset="utf-8">
    <textarea style='display:none' name='promptsAnswerXML'><%=strPromptXML.replace("\"", "'")%></textarea>
	<input type="hidden" name="usrSmgr" id="usrSmgr" value="<%=(newUsrSmgr == null || "".equals(newUsrSmgr) ? sessionId : newUsrSmgr) %>" />
	<input type='hidden' name='Server' value='<spring:message code="mstr.config.default.server-name" />'/>
	<input type='hidden' name='Project' value='<spring:message code="mstr.config.default.project-name" />'/>
	<input type='hidden' name='<%=objectName %>' value='<%=objectID%>'/>
	<input type="hidden" id ="evt"                          name="evt"                  value="<%=evt%>"> <!-- 3067 report , 3958 document -->
	<input type="hidden" id ="src"                          name="src"                  value="<%=evt%>">
	<input type="hidden" id ="group"                        name="group"                value="export">
	<input type="hidden" id ="reportViewMode"               name="reportViewMode"       value="1"> <!-- 1 grid , 2 Graph -->
	<input type="hidden" id ="defaultRunMode"               name="defaultRunMode"       value="excelFormattingGrids">
	<input type='hidden' name='hiddensections' value=header,path,dockTop,dockLeft,dockRight,dockBottom,footer />
	<input type="hidden" id ="showOptionsPage"              name="showOptionsPage"      value="false">
    <input type="hidden" id ="executionMode"                name="executionMode"        value="<%=EnumRWExecutionModes.RW_MODE_PDF %>">
</form>
<input type="hidden" id="promptUrl" value="<%=repUrl%>"/>
<input type="hidden" id="promptsAnswerXML" value="<%=strPromptXML %>" />
<script>
$(parent.document).find("#promptsAnswerXML").val($("#promptsAnswerXML").val());
$(parent.document).find("#promptUrl").val($("#promptUrl").val());
// $("#mstrForm").submit();
document.mstrForm.submit();
</script>
<%-- <sep:execution objectID="<%=objectID%>" promptXML="<%=strPromptXML%>" displayUnitType="<%=displayUnitType%>" sessionid="<%=sessionId%>" /> --%>
</body>
</html>