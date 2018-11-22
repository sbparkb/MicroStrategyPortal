<%--
  - 파일명  : notiView.jsp
  - 화면설명  : 공지 상세 화면
  - 작성자  : 김용철
  --%>
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

<style type="text/css">
	
	/* common.css */
    html { min-width:800px; } 
 
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center,
	dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, texarea {margin:0; border:0; padding:0;}
	
	body { font-family:'Malgun Gothic','돋움',Dotum; line-height:18px; font-size:13px; color:#333; word-break:break-all; }
	ol, ul { list-style:none; }
	button { }
	.hidden, legend, caption { width:0; height:0; line-height:0; font-size:0px; float:left; position:absolute; visibility:hidden; overflow:hidden; display:none; }
	p { }
	strong{ font-weight:bold; }
	address { font-style:normal; }
	img { vertical-align:middle; }
 
	#container { width:800px; margin:0 auto; float:left}

    #container #footer {position: absolute; bottom: 10px; right:30px; height: 30px; float:right}
	
	.btn-area { text-align:center; }
 	</style>
	
</head>
</head>
<script type="text/javascript">
 
$(document).ready(function(){
	 

});


function saveCokie() {
    setCookie("noti${bbsInfo.bbsSeqNo }","N", 7);
    window.close();

}
</script>

<body>
 
	<div id="wrapper">
	<div id="container-wrap">
		<div id="container">
		
			<!-- 게시판 view 시작 -->
			<div class="contents-box">
				<div class="cont-head">
					<h4>공지사항</h4>
				</div>

				<div class="board-wrap" style="margin-bottom: 10px;">
 
					<table class="view-wrap">
						<colgroup>
							<col width="14%" />
							<col width="86%" />
						</colgroup>
						<tr>
							<th>제목</th>
							<td><c:out value="${bbsInfo.bbsSj }"></c:out></td>
						</tr>
						<!-- 
						<tr>
							<th>첨부파일</th>
							<td>
								<c:if test="${fn:length(bbsInfo.files) > 0 }">
								<div class="preview">
									<ul class="fileList">
										<c:forEach items="${bbsInfo.files }" var="i">
											<c:if test="${i.delYn ne 'Y'}">
												<li>
													<span class="file_name"><a href="<spring:message code='URL.WEB.SERVER'/>/file/fileDown.do?fileName=${i.atchFileNm }&atchFileSeqNo=${i.atchFileSeqNo}&originalName=${i.dsplyNm }">${i.dsplyNm }</a> <small class="filesize">(${i.atchFileSize }KB)</small></span>
													<span class="date">${i.registDate }</span>
												</li>
											</c:if>
										</c:forEach>
									</ul>
								</div>
							</c:if>
							</td>
						</tr>
						 -->
						<tr>
							<th>내용</th>
							<td>${bbsInfo.bbsCn }</td>
 						</tr>
					</table>
					<div class="btn-area">
						
					</div>
				</div>
				

			</div>
		<div id="footer">
			<input type="checkbox" name="Notice" onClick="saveCokie();">&nbsp;<a href="#" onCLick="saveCokie();return false;">7일간 이 창을 다시 열지않음</a>&nbsp;&nbsp; 
  			<input type="button" value="닫기" onclick="javascript:window.close();">
  		</div>	

			<!-- 게시판 view 끝 -->
			</div>
		</div>
		<jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" />

	</div>
		
</body>
 
	
</html>