<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/WEB-INF/views/mstr/upload/excel_comm.jsp" />
<style type="text/css">
	
	/* common.css */
    html { min-width:1024px; } 
 
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
 
	#container { width:1024px; margin:0 auto; }
	
	
	/* 엑셀 업로드 */

	.contents-box { padding:1px 1px; }
	.contents-box .cont-head { margin-bottom:12px; }

	.board-wrap { margin-bottom:12px; padding:0 32px;  }
	.board-wrap	table.write-wrap { width:100%; margin:0; border-collapse:separate; border-spacing:0; border:1px solid #b0b0b0; word-break:break-all; }
	.board-wrap	table.write-wrap th { background:#f7f7f7; font-size:13px; line-height:18px; padding:6px 0; color:#333; text-align:center; font-weight:bold; border-bottom:1px solid #ebf2fa; border-right:1px solid #e8e8e8; }
	.board-wrap	table.write-wrap td { padding:8px 0 8px 20px; font-size:12px; line-height:20px; border-bottom:1px solid #efefef; }
	.board-wrap	table.write-wrap td input.text_field { padding:5px 8px; margin-right:8px; border:1px solid #a4a4a4; min-height:14px; background-color:#fff; }
	.board-wrap	table.write-wrap td div.file-box { height:128px; overflow-y:scroll; }

	
	.contents-box .cont-head { position:relative; padding:10px 10px 10px 32px; }
	
	.btn-area { text-align:center; }
 	</style>
	
</head>
<script type="text/javascript">
var isCheckIdDuplicate		= true;
var uploadObj;
 
$(document).ready(function(){
 
	var options1 = { 
			
		    type: "POST",
	        dataType: 'json',	
		 
		    beforeSend: function() 
		    {
		    	/* 
		        $("#progress").show();
		        //clear everything
		        $("#bar").width('0%');
		        $("#message").html("");
		        $("#percent").html("0%");
		        */
		    	$('html').css("cursor","wait");   
		    },
		    /*
		    uploadProgress: function(event, position, total, percentComplete) 
		    {
		        $("#bar").width(percentComplete+'%');
		        $("#percent").html(percentComplete+'%');
		 
		    },
		    */
		    success: function(responseData, statusText, xhr, $form)
		    {
		    	/*
		        $("#bar").width('100%');
		        $("#percent").html('100%');
		        
		        console.log(responseData); 
		        */
		        
		        var result = responseData['result'];
		        var rtnmessage = responseData['message'];
		        
		        if(result == 'fail') {
		        	alert(rtnmessage);
		        } else {
 					alert('업로드 성공 했습니다.');
 		        }
		        
		        $file = $form.find("input[name='myfile']");
		        //alert($file.attr("name"));
		    
				var agent = navigator.userAgent.toLowerCase();
 
				if (agent.indexOf("chrome") != -1) {
				    $file.val('');
				} else {
				    $file.replaceWith($file.clone());
				}
 
		       //alert(responseData['result']);   // sucess, fail
		 
		    },
		    complete: function(response) 
		    {
		    	$('html').css("cursor","auto");   
		        //$("#message").html("<font color='green'>"+response.responseText+"</font>");
		    },
		    error: function()
		    {
		    	$('html').css("cursor","auto");   
		        alert('에러가 발생했습니다. 다시 업로드 하세요!');
		 
		    }
		}; 
	
	
	$("form input[name='myfile']").live("change", function(){ 
		//alert('change');
		if($(this).val() != null){
    		$(this.form).ajaxForm(options1).submit();
 		}
	});
 
	
});
 
 
</script>

<body>



	<div id="wrapper">
			<div id="container-wrap">
				<div id="container">
					<!-- 게시판 write 시작 -->
					<div class="contents-box">
						<div class="cont-head">
							<h4>엑셀 업로드</h4>
						</div>

<c:forEach var="item" items="${list}" varStatus="status">
		
						<div class="board-wrap">
							<form id="myForm" action="<spring:message code='URL.WEB.SERVER'/>/upload/excelSave.ajax" method="post" enctype="multipart/form-data">
							<input type="hidden" name="excelType"   value="${item.EXCEL_ID}" />
								<table class="write-wrap">
									<colgroup>
										<col width="14%" />
										<col width="86%" />
									</colgroup>
									<tr>
										<th>구분</th>
										<td>${item.EXCEL_NAME} : [<a href="../excel/${item.EXCEL_ID}_Sample.xlsx">양식</a>] &nbsp; &nbsp; &nbsp; &nbsp; ※보안이 걸려 있으면 업로드 오류가 발생합니다.</td>
									</tr>
									<tr>
										<th>내용</th>
										<td><textarea rows="2" cols="100" style="border:0;font-family:'Malgun Gothic','돋움',Dotum;font-size: 12px;overflow:hidden">${item.EXCEL_DESC}</textarea></td>
									</tr>
									<tr class="file-box">
										<th>엑셀첨부</th>
										<td><input type="file" name="myfile" id="myfile" size="90"> </td>
									</tr>
								</table>
							</form>
						</div>  
</c:forEach>								
								
 
					</div>
					<!-- 게시판 write 끝 -->
			</div>
		</div>
		<jsp:include page="/WEB-INF/views/mstr/common/footer.jsp" />
	</div>
<div id="progress" style="display:none;">
        <div id="bar"></div>
        <div id="percent"></div >
</div>
<div id="message" style="display:none;"></div>
</body>
 
</html>