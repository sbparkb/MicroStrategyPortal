<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--@ page import="com.groto.cmm.util.Tool" --%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="java.util.Locale" %>
<%@ page import="java.util.*" %>
<%@ page import="com.mstr.business.model.*" %>

<%@ page import="com.groto.cmm.util.SystemMessage" %>
<%@ page import="com.groto.cmm.util.StringUtil" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="sep" uri="/sepMstrTL.tld"%>
<%
	String contextRoot = request.getContextPath();
	String contextDoc = contextRoot + "/resource";
	
	String context 				= request.getContextPath();
	String sessionid			= (String) request.getSession().getAttribute( "usrSmgr" );
	ArrayList<ReportInfo> list			= (ArrayList<ReportInfo>)(request.getAttribute("list"));
	//System.out.println("list size = " + list.size());
	
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<jsp:include page="/WEB-INF/views/mstr/common/common.jsp" />
<style type="text/css">
html {height: 100%;}
body {height: 100%;}
#container #content-area { padding:0; }
</style>
<script type="text/javascript">
$(document).ready(function(){
	//$("#loadingDiv").hide();
});
function reportExecute(objpath){
	parent.ftn_linkReportSearch(objpath);
	parent.ftn_linkReport2 (id,type,subType, isShortcut, targetId, targetType, targetsubType, name);
}
</script>
<body>
	<div style="width:100%; height:100%;">
 	<!-- container -->
	<div id="container" style="width:99%; height: 100%; margin-top:24px; background: #fff;">
				<div style="margin-top:20px; background:#fff;  overflow:auto; height:-webkit-calc(100% - 44px); height:-moz-calc(100% - 44px);  height:calc(100% - 44px);">
				 
				<table class="style-1">
					<colgroup>
						<col width="6%">
						<col width="20%">
						<col width="28%">
						<col width="12%">
						<col width="34%">
					</colgroup>
					<thead>
						<tr>
							<th>No</th>
							<th>리포트 명</th>
							<th>위치</th>
							<th>최근 수정일</th>
							<th>설명</th>
						</tr>
					</thead>
					<tbody>
					<% if(list != null && list.size() > 0){
						int count = 0;
					     for(ReportInfo rb : list){ 
					     	count++;
					     %>
						<tr>
							<td><%= count %></td>
							<td>
							<%--<a href="javascript:reportExecute('<%= rb.getObjPath() %>');"><%= rb.getDisplayName() %></a> --%>
							<a href="javascript:parent.ftn_linkReport2('<%= rb.getObjectID() %>', '<%= rb.getDisplayUnitType() %>', '<%= rb.getSubType() %>', 
								'false', 'null', '0','0',  '<%= rb.getDisplayName() %>');"><%= rb.getDisplayName() %></a>
							</td>
							<td><%= rb.getDisplayPathName() %></td>
							<td><%= rb.getModificationTime() %></td>
							<td><%= rb.getDescription() %></td>
						</tr>
						<%}
					  }else{%>
						<tr>
							<td colspan=5>검색된 리포트가 없습니다.</td>
						</tr>
					<%} %>
						
					</tbody>
				</table>
			</div>		
			</div>
	</div>
	<!-- //container -->
<jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" />
	
</div>

</body>
</html>

