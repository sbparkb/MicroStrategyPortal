<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="java.util.Locale" %>
<%@ page import="java.util.List" %>
<%@ page import="com.mstr.business.model.*" %>
<%@ page import="com.groto.cmm.util.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<header>
<title>타이틀틀틀</title>
</header>
<jsp:include page="/WEB-INF/views/mstr/bbs/common.jsp" />
<script type="text/javascript" src="../../df/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="<spring:message code="URL.IMG.SERVER"/>javascript/jquery.selectbox-0.2.js"></script>
<script>
var top_url = parent.location.href;
$(document).ready(function(){
    if(top_url.indexOf("bbs") > 0){
	parent.location.href = "../../error/400.do";
    }
    
	$("#viewTitle").text("공지사항");
	$("#container").css("width", "100%");
	// RESET 버튼 클릭시 처리
	$("#reset").on("click", function(){
		$("input[type!=button]").each(function(){
			$(this).val("");
		});
		$("textarea").text("");
		$("textarea").val("");
	});
	
	if("${params.searchType}" != ""){
		$("#searchType").find("option[value=${params.searchType}]").attr("selected", true);
	}
	
	$("#searchVal").on("keyup", function(e){
		if(e.keyCode == 13){
			fncSearch();
		}
	});
	
	
	$("#searchType").on("change", function(){
		if($(this).find("option:selected").val() == null || $(this).find("option:selected").val() == ""){
			$("#searchVal").val("");
		}
	});
	
	/* select box */
	$(".select_box").selectbox();

});

// 게시글 등록 페이지 이동
var fncWrite	 		= function(){
	$("#searchForm").attr("action", "<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsReg.do");
	$("#searchForm").attr("method", "post");
	$("#searchForm").submit();
}


// 게시글 정보 조회 및 수정 페이지 이동
var fncBbsDetail		= function(bbsSeqNo, bbsId){
	$("#searchForm").attr("action", "<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsDet.do");
	$("#searchForm").attr("method", "post");
	$("#searchForm").append("<input type='hidden' name='bbsSeqNo' value='"+bbsSeqNo+"' />");
	$("#searchForm").submit();
}
// 리스트 데이터 검색
var fncSearch			= function(){
	var type			= $("#searchType").find("option:selected").val();
	var value			= $("#searchVal").val();
	
	// 검색어 유효성 체크
	if(value == null || value == ""){
		alert("검색어를 입력해 주세요.");
		return;
	}
	
	// 검색 조건 유효성 체크
	if((type == null || type == "") && (value == null || value == "")){
		alert("검색 조건을 선택해 주세요.");
		return;
	}
	
	if((type == null || type == "") && (value != null && value != "")){
		$("#searchType").find("option[value=title]").prop("selected", true);
	}
	
	var searchForm		= $("#searchForm");
	searchForm.attr("action", "<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsList.do");
	searchForm.attr("method", "post");
	searchForm.submit();

}
//전체 데이터 조회
var fncSearchAll			= function(){
	$("#searchVal").val("");
	$("#searchType").find("option").first().prop("select", true);
	var searchForm		= $("#searchForm");
	searchForm.attr("action", "<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsList.do");
	searchForm.attr("method", "post");
	searchForm.submit();
}
</script>
<body>
<c:set var="nonZeroNotice" value = "0" />
	<div id="wrapper" style ="max-width: 1280px;">
		<div id="container-wrap">
			<div id="container">
				<!-- 게시판 리스트 시작 -->
				<div class="contents-box">
					<div class="cont-head">
						<h4>${board.bbsName }</h4>
						<div class="search-box">
							<form id="searchForm">
									
						 <!-- 
						 		<input type="hidden" name="pageNo" id="pageNo" value="${params.pageNo }" />
						 
								<input type="hidden" name="bbsId" id="bbsId" value="${board.bbsId }" />
								-->
						<input type="hidden" name="bbsId" id="bbsId" value="BBS00001" />
						
								<ul>
									<li class="sh-form">
										<select name="searchType" id="searchType" class="select_box" tabindex="1">
											<option value="title">제목</option>
											<option value="contents">내용</option>
											<option value="registerId">작성자</option>
										</select>
									</li>
									<li class="sh-form">
										<div class="search-box-input">
											<input class="search" type="text" id="searchVal" name="searchVal" placeholder="검색어를 입력해 주세요."  value="${params.searchVal }" style="width:205px;" />
											<input class="search-submit" type="submit" id="regist" onclick="javascript:fncSearch()" value="" />
										</div>
									</li>
									<button class="btn-snapshot" id="btnSave" style="height: 29px; margin-left:3px; background: #3b3b3b;" onclick="javascript:fncSearchAll(); return false;">전체</button>
<%-- 									<img class="search-all" src="<spring:message code='URL.IMG.SERVER'/>images/btn_gnb_add.png" width="35" height="29" onclick="javascript:fncSearchAll(); return false;" title="전체 보기"/> --%>
								</ul>
							</form>
						</div>
					</div>

					<div class="board-wrap">
						<table class="list-wrap">
							<colgroup>
								<col width="6%" />
								<col width="59%" />
								<col width="12%" />
								<col width="8%" />
								<!-- 
								<col width="8%" />
								 -->
								<col width="15%" />
							</colgroup>
							<tr>
								<th>번호</th>
								<th>제목</th>
								<th>작성자</th>
								<!-- 
								<th>첨부</th>
								 -->
								<th>조회수</th>
								<th class="last">작성일</th>
							</tr>
							<c:choose>
									<c:when test="${fn:length(list) > 0 }">
										<c:forEach var="i" items="${list }">
										<c:choose>
											<c:when test="${sessionScope.MSTRSessionUser.webAdminGrp eq CmmCode.ADMIN_USER_ID.key }">
											<c:set var="nonZeroNotice" value ="${nonZeroNotice+1}" />
												<tr  style="<c:if test="${i.isNotice eq '1' }">background:#ffffff; </c:if>" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='#ffffff'" >
													<td><c:choose><c:when test="${i.isNotice eq '1'}">공지<!-- <img src="<spring:message code='URL.IMG.SERVER' />images/notice_1.png" /> --></c:when><c:otherwise>${i.bbsSeqNo }</c:otherwise> </c:choose></td>
													<td style="text-align:left; padding-left:20px;" title="${i.bbsSj }"><a href="javascript:fncBbsDetail('${i.bbsSeqNo }', '${i.bbsId }')">${fn:substring(i.bbsSj, 0, 75)}<c:if test="${i.cometCnt > 0 }"> (${i.cometCnt }) </c:if> </a></td>
													<td>${i.registName }</td>
													<!-- 
													<td><c:if test="${i.atchFileYn eq 'Y' }" ><img src="<spring:message code='URL.IMG.SERVER' />images/icon_disk.gif" alt="첨부파일" /></c:if></td>
													 -->
													<td>${i.readCnt }</td>
													<td class="last">${fn:substring(i.registDate, 0, 4)}-${fn:substring(i.registDate, 4, 6)}-${fn:substring(i.registDate, 6, 8)}</td>													
												</tr>
									 		</c:when>
											
											<c:otherwise>
												<c:if test="${i.isNotice eq '1'}">
													<c:set var="nonZeroNotice" value ="${nonZeroNotice+1}" />
													<tr style="background:#ffffff;" >
														<td>공지</td>
														<td style="text-align:left; padding-left:20px;" title="${i.bbsSj }"><a href="javascript:fncBbsDetail('${i.bbsSeqNo }', '${i.bbsId }')">${fn:substring(i.bbsSj, 0, 75)}<c:if test="${i.cometCnt > 0 }"> (${i.cometCnt }) </c:if> </a></td>
														<td>${i.registName }</td>
														<!-- 
														<td><c:if test="${i.atchFileYn eq 'Y' }" ><img src="<spring:message code='URL.IMG.SERVER' />images/icon_disk.gif" alt="첨부파일" /></c:if></td>
														 -->
														<td>${i.readCnt }</td>
														<td class="last">${fn:substring(i.registDate, 0, 4)}-${fn:substring(i.registDate, 4, 6)}-${fn:substring(i.registDate, 6, 8)}</td>
													</tr>
												</c:if>
											</c:otherwise>
										</c:choose>									
										</c:forEach>
										<c:if test ="${nonZeroNotice eq  0}" >
											<tr>
												<td colspan="6">게시글이 없습니다.</td>
											</tr>
										</c:if>
									</c:when>
									<c:otherwise>
										<tr>
											<td colspan="6">게시글이 없습니다.</td>
										</tr>
									</c:otherwise>
									
									
							</c:choose>
						</table>
						<jsp:include page="/WEB-INF/views/mstr/common/paging.jsp" />
						<c:if test="${sessionScope.MSTRSessionUser.webAdminGrp eq CmmCode.ADMIN_USER_ID.key }">
							<div class="btn-area">
								<button class="btn-write" onClick="javascript:fncWrite();">글쓰기</button>
							</div>
						</c:if>
					</div>
				</div>
				<!-- 게시판 리스트 끝 -->
			</div>
		</div>
		<jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" />
	</div>


</body>
</html>