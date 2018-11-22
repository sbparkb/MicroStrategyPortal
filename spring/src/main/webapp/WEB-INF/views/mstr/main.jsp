<%@page import="com.groto.cmm.util.SystemMessage"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ page import="com.mstr.business.model.*" %>
<%
	response.setHeader("P3P", "CP='CAO PSA CONi OTR OUR DEM ONL'");
	String contextRoot = SystemMessage.getMessage("URL.WEB.SERVER");
	String contextDoc = contextRoot + "/resource";
	String defaultReport    = ""; // SystemMessage.getMessage("mstr.default.report.id");	
	String defaultType		= ""; //SystemMessage.getMessage("mstr.default.report.type");	
	
	String displayUnitType = "3";
	String subType = "768";
	if("document".equals(defaultType)) {
		displayUnitType = "55";
		subType = "14081";
	}
	
	String[] images			= {};
	String sessionid			= (String) request.getSession().getAttribute( "usrSmgr1" );
	
	String Scheme  = request.getScheme();  // http, https, ftp...
	String ServerName  = request.getServerName();  // 서버네임
	int Port        = request.getServerPort() ;   // port
	
	/*
	if("https".equals(Scheme.toLowerCase())) { // https 면 http로 변경
		contextRoot = "http://"+ServerName;
		//if(Port!=443) {
		//	contextRoot = contextRoot + ":" + Port;
		//}
		contextRoot = contextRoot + SystemMessage.getMessage("URL.WEB.SERVER");
	}
	*/
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script>
//리포트 클릭시 처리
function ftn_linkReport ()
{	
	var formmain = document.frm;
	formmain.submit();		
}

</script>
</head>
<body onload="ftn_linkReport();">
 
	<form name="frm" id="frm" method="post" action="<%=contextRoot%>/service/reportMain.do">
	<%-- 
	<input type='hidden' name='usrSmgr' id='usrSmgr' value='<%= sessionid %>'/>
	<input type='hidden' name='usrSmgr1' id='usrSmgr1' value='<%= sessionid %>'/>
	 --%>
	<input type='hidden' name='objectID' value='<%= defaultReport %>' />
	<input type='hidden' name='displayUnitType' value='<%= displayUnitType %>' />
	<input type='hidden' name='subType' value=''<%= displayUnitType %>' />
	</form>
 
	<!-- report -->
	<form name="frmMulti" id="frmMulti" method="post" action="<spring:message code='URL.WEB.SERVER' />/service/reportMain.do">
	<input type='hidden' name='objectID' value='<%= defaultReport %>' />
	<input type='hidden' name='displayUnitType' value='3' />
	<input type='hidden' name='subType' value='768' />
	</form>	
	<form name="frm3" id="frm3" method="post" action="<spring:message code='URL.WEB.SERVER' />/service/reportView.do">
	<input type='hidden' name='objectID' value='<%= defaultReport %>' />
	<input type='hidden' name='displayUnitType' value='3' />
	<input type='hidden' name='subType' value='768' />
	</form>
	<!-- document -->
	<form name="frmD" id="frmD" method="post" action="<spring:message code='URL.WEB.SERVER' />/service/reportMain.do">
	<input type='hidden' name='objectID' value='<%= defaultReport %>' />
	<input type='hidden' name='displayUnitType' value='55' />
	<input type='hidden' name='subType' value='14081' />
	</form>
	<form name="frm2" id="frm2" method="post" action="<spring:message code='URL.WEB.SERVER' />/servlet/mstrWeb?evt=3002&src=mstrWeb.3002">
	<%-- <input type='hidden' name='usrSmgr' id='usrSmgr' value='<%= sessionid %>'/> --%>
	</form>
	<form name="frm4" id="frm4" method="post" action="<spring:message code='URL.WEB.SERVER' />/service/reportMain.do">
	<input type='hidden' name='objectID' value='<%= defaultReport %>' />
	<input type='hidden' name='displayUnitType' value='3' />
	<input type='hidden' name='subType' value='768' />
	</form>
	
</body>
</html>