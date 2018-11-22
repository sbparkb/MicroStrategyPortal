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
var uploadObj;

var top_url = parent.location.href;
$(document).ready(function(){
    if(top_url.indexOf("bbs") > 0){
		parent.location.href = "../../error/400.do";
    }
	$("#viewTitle").text("공지사항");
	uploadObj  = $("#mulitplefileuploader").uploadFile(settings);	//파일업로더 
	
	$("#noticeYn").on("click", function(){
		if($(this).is(":checked")){
		    $("#noticeYmdDiv input").show();
		    $("#noticeYmdDiv span").show();
		    $("#noticeYmdDiv img").show();
		}else{
		    $("#noticeYmdDiv input").hide();
		    $("#noticeYmdDiv span").hide();
		    $("#noticeYmdDiv img").hide();
			$("#noticeYmdDiv").find("input").each(function(){
				$(this).val("");
			});
		}
	});
});

var XSSfilter = function (content) {
    return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};


// 사용자 등록 수행
var fncRegistBbs 	= function(){
	var noticeStrYmd		= $("#datepicker").val();
	var noticeEndYmd		= $("#datepicker1").val();
	
	
	// 제목 유효성 확인
	if($("#bbsSj").val() == null || $("#bbsSj").val() == ""){
		alert("제목을 입력해 주세요.");
		$("#bbsSj").focus();
		return;
	}
	
	// 공지 설정 관련 유효성 확인
	if($("#noticeYn").is(":checked")){
		if(noticeStrYmd == null || noticeStrYmd == ""){
			alert("공지 시작일을 선택해 주세요.");
			$("#datepicker").focus();
			return;
		}
		
		if(noticeEndYmd == null || noticeEndYmd == ""){
			alert("공지 종료일을 선택해 주세요.");
			$("#datepicker1").focus();
			return;
		}
		
		noticeStrYmd		= noticeStrYmd.replace(/-/g, "");
		noticeEndYmd		= noticeEndYmd.replace(/-/g, "");
		
		if(noticeStrYmd > noticeEndYmd){
			alert("공지 시작일이 공지 종료일보다 클수 없습니다.");
			$("#datepicker").focus();
			return;
		}
		$("#noticeStrYmd").val(noticeStrYmd);
		$("#noticeEndYmd").val(noticeEndYmd);
		
	}
	
	
	oEditors.getById["bbsCn"].exec("UPDATE_CONTENTS_FIELD", []);
	
	// 에디터 내용 유효성 확인 에디터가 html 편집 모드가 아닌경우 <p>&nbsp;</p> 값이 들어와서 데이터가 있는걸로 인식됨
	if($("#bbsCn").val() == null || $("#bbsCn").val() == "" || $("#bbsCn").val() == "<p>&nbsp;</p>"){
		alert("내용을 입력해 주세요.");
		$("#bbsCn").focus();
		return;
	}
	
	$("#fileName").val(fileNamedata);
	$("#dsplyName").val(dsplyName);
	$("#fileExt").val(fileExt);
	$("#tempPath").val(tempPath);
	$("#filesizedata").val(sizedata);	
	$("#Resiform").submit();
}
// 게시판 리스트 이동
var fncMoveToList 	= function(){
	$("#searchForm").submit();
}



</script>

<body>
	<div id="wrapper">
			<div id="container-wrap">
				<div id="container" style ="margin-left: 0px">
					<!-- 게시판 write 시작 -->
					<div class="contents-box">
						<div class="cont-head">
							<h4>${board.bbsName } 작성</h4>
						</div>
		
						<div class="board-wrap">
							<form id="Resiform"  name="Resiform" method="post" action="<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsRegPrc.do">
								<input  type="hidden" name="dsplyName" id="dsplyName"/>
								<input  type="hidden" name="fileExt" id="fileExt"/>
								<input  type="hidden" name="tempPath" id="tempPath"/>
								<input  type="hidden" name="filesizedata" id="filesizedata"/>
								<input  type="hidden" name="fileNamedata" id="fileName"/>
								<input type="hidden" name="bbsId" id="bbsId" value="${board.bbsId }" />
								<input type="hidden" name="noticeStrYmd" id="noticeStrYmd" value="" />
								<input type="hidden" name="noticeEndYmd" id="noticeEndYmd" value="" />
								<table class="write-wrap">
									<colgroup>
										<col width="14%" />
										<col width="4%" />
										<col width="82%" />
									</colgroup>
									<tr>
										<th>제목</th>
										<td colspan="2"><input type="text" title=" " id="bbsSj"  name="bbsSj" placeholder="제목" maxlength="80" style="width:50%;"  class="text_field"/></td>
									</tr>
									<tr>
										<th>공지 여부</th>
										<td><input type="checkbox" id="noticeYn" name="noticeYn" value="Y"  checked="checked"/></td>
										<td id="noticeYmdDiv" >
											<input type="text" class="text_field" id="datepicker"  readonly/> <span>~</span> <input type="text" class="text_field" id="datepicker1"  readonly/>
										</td>
									</tr>
									<tr style="display:none">
										<th>머릿말</th>
										<td>
											<div style="width: 20%;">
											<select name="bbsDivCode" id="bbsDivCode" class="select_box">
											</select>
											</div> 
										</td>
									</tr>
									<tr>
										<th>내용</th>
										<td colspan="2"><textarea name="bbsCn" id="bbsCn" rows="10" cols="100" style="display:none;"></textarea></td>
									</tr>
								</table>
							</form>
							<div class="btn-area">
								<button class="btn-complete" onClick="javascript:fncRegistBbs()">확인</button>
								<button class="btn-cancel" onClick="javascript:fncMoveToList()">취소</button>
							</div>
						</div>
					</div>
					<!-- 게시판 write 끝 -->
			</div>
		</div>
		<jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" />
	</div>
</body>

	<form id="filedel" name="filedel" >
		<input  type="hidden" name="filedelNamedata" id="filedelNamedata"/>
		<input  type="hidden" name="tempdelPath" id="tempdelPath"/>
	</form>
	<form id="searchForm" action="<spring:message code='URL.WEB.SERVER'/>/service/bbs/bbsList.do" method="post">
		<input type="hidden" name="bbsId" id="bbsId" value="${board.bbsId }" />
	</form>
	
	
<script type="text/javascript">
var oEditors = [];

// 추가 글꼴 목록
//var aAdditionalFontSet = [["MS UI Gothic", "MS UI Gothic"], ["Comic Sans MS", "Comic Sans MS"],["TEST","TEST"]];

nhn.husky.EZCreator.createInIFrame({
	oAppRef: oEditors,
	elPlaceHolder: "bbsCn",
	sSkinURI: "<spring:message code='URL.IMG.SERVER'/>editor/SmartEditor2Skin.html",	
	htParams : {
		bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
		bUseVerticalResizer : true,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
		bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
		//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
		fOnBeforeUnload : function(){
			//alert("완료!");
		}
	}, //boolean
	fOnAppLoad : function(){
		//예제 코드
		//oEditors.getById["bbsCn"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
	},
	fCreator: "createSEditor2"
});

function pasteHTML() {
	var sHTML = "<span style='color:#FF0000;'>이미지도 같은 방식으로 삽입합니다.<\/span>";
	oEditors.getById["bbsCn"].exec("PASTE_HTML", [sHTML]);
}

function showHTML() {
	var sHTML = oEditors.getById["bbsCn"].getIR();
	alert(sHTML);
}
	
function submitContents(elClickedObj) {
	oEditors.getById["bbsCn"].exec("UPDATE_CONTENTS_FIELD", []);	// 에디터의 내용이 textarea에 적용됩니다.
	
	// 에디터의 내용에 대한 값 검증은 이곳에서 document.getElementById("bbsCn").value를 이용해서 처리하면 됩니다.
	
	try {
		elClickedObj.form.submit();
	} catch(e) {}
}

function setDefaultFont() {
	var sDefaultFont = '궁서';
	var nFontSize = 24;
	oEditors.getById["bbsCn"].setDefaultFont(sDefaultFont, nFontSize);
}
</script>
</html>