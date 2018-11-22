<%--
  - 파일명  : bbsDet.jsp
  - 화면설명  : 게시글 상세 화면
  - 작성자  : 김용철
  --%>
<%@page import="com.groto.cmm.util.CmmUtil"%>
<%@page import="com.groto.cmm.util.CmmCode"%>
<%@page import="com.groto.web.bbs.vo.CmmnBbsVO"%>
<%@page import="com.groto.session.MSTRSessionUserImpl"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/WEB-INF/views/mstr/bbs/common.jsp" />
</head>
<script type="text/javascript">
var isCheckIdDuplicate		= true;
$(document).ready(function(){

 
});

// 게시판 리스트 이동
var fncMoveToList 	= function(){
	$("#searchForm").submit();
}

<%
	if(((MSTRSessionUserImpl)session.getAttribute("MSTRSessionUser")).getUserId().equals(((CmmnBbsVO)request.getAttribute("bbsInfo")).getRegistId()) || CmmCode.ADMIN_USER_ID.getKey().equals(((MSTRSessionUserImpl)session.getAttribute("MSTRSessionUser")).getWebAdminGrp())){
%>
// 게시글 수정 수행
var fncModifyBbs	= function(){
	if(confirm("게시글을 수정 하시겠습니까?")){
		$("#searchForm").append("<input type='hidden' name='bbsSeqNo' value='${bbsInfo.bbsSeqNo}' />");
		$("#searchForm").attr("action", "<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsMod.do");
		$("#searchForm").submit();
	}
}

// 게시글 삭제 수행
var fncDeleteBbs	= function(){
	if(confirm("게시글을 삭제 하시겠습니까?")){
		ajaxInfo = {
				url:"<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsDelPrc.ajax",
	 			dataType:"json",
				type:"POST",
				data:{
					"bbsId"			:"${bbsInfo.bbsId}",
					"bbsSeqNo"		:"${bbsInfo.bbsSeqNo}",
				}
		};
		ajax = callAjax(ajaxInfo);
		ajax.done(function(r){
			var result = r.result;
			if(result == 'success'){
				alert("게시글이 삭제 되었습니다.");
				$("#searchForm").submit();
			}else{
				alert(r.failMessage);
				location.reload(true);
			}
		});
	}
}
<%
	}
%> 
  

</script>

<body>
<form id="mstrPromptForm">
	<input type="hidden" id="promptsAnswerXML" name="promptsAnswerXML" value="" />
</form>
	<div id="wrapper">
	<div id="container-wrap">
		<div id="container" style ="margin-left: 0px">
			<!-- 게시판 view 시작 -->
			<div class="contents-box">
				<div class="cont-head">
					<h4>${board.bbsName } 상세
					<div style="float:right; display: inline;">
							<button class="btn-list" id="listBtn" onclick="javascript:fncMoveToList()">목록</button>
						</div></h4>
				</div>
				
				<div class="board-wrap" style="margin-bottom: 10px;">
 
					<table class="view-wrap">
						<colgroup>
							<col width="14%" />
							<col width="36%" />
							<col width="14%" />
							<col width="36%" />
						</colgroup>
						<tr>
							<th>제목</th>
							<td colspan="3">${bbsInfo.bbsSj }</td>
						</tr>
						<tr>
							
							<th>작성자</th>
							<td>${bbsInfo.registName }&nbsp;&nbsp;&nbsp;<!-- (수정자:${bbsInfo.updtId}) --></td>
							<th>작성일</th>
							<td>${fn:substring(bbsInfo.registDate, 0, 4)}-${fn:substring(bbsInfo.registDate, 5, 7)}-${fn:substring(bbsInfo.registDate, 8, 10)}</td>
						</tr>
						<tr>
							<th>내용</th>
							<td colspan="3">${bbsInfo.bbsCn }</td>
 
						</tr>
					</table>
					<div class="btn-area">
						<div style="float:left;">
							<button class="btn-list" id="listBtn" onclick="javascript:fncMoveToList()">목록</button>
						</div>						
						<c:if test="${sessionScope.MSTRSessionUser.userId eq bbsInfo.registId || sessionScope.MSTRSessionUser.webAdminGrp == CmmCode.ADMIN_USER_ID.key}">
							<button class="btn-modify" id="registBtn" onclick="javascript:fncModifyBbs()">수정</button>
							<button class="btn-delete" id="deleteBtn" onclick="javascript:fncDeleteBbs()">삭제</button>
						</c:if>
						
					</div>
				</div>
 
			</div>
			<!-- 게시판 view 끝 -->
			</div>
		</div>
<!-- 		<iframe id="report" name='report' src="" frameborder="2" scrolling="auto" style="width:95%; height:700px;border:0px;"> </iframe> -->
		<jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" />
	</div>
		
</body>

	<form id="searchForm" action="<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsList.do" method="post">
		<input type="hidden" name="bbsId" id="bbsId" value="${board.bbsId }" />
	</form>
	
	
</html>