<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>MAIN</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="/custom/jquery.3.3.1.js"></script>
<script>
	$(document).ready(function() {

		$('#leftMenu').on('click', 'li', function(event) {
			var id = $(this).attr('id');
			var type = $(this).attr('data-type');
			event.stopPropagation(); //상위 태그 이벤트로 전파 방지
			
			if(type == '8'){
				if($(this).hasClass('open')){
					$(this).children().remove();
					$(this).removeClass('open');
				}else{
					$.ajax({
						method : "POST",
						url : "/menuPrc",
						context: $(this),
						data : {objId : id}
					}).done(function(data) {				
						var obj = JSON.parse(data);
						var size = obj.length;
						var ul = '<ul>';
						for(var i = 0; i < size; i++){
							if(obj[i].type =='8'){
								ul += "<li id='"+obj[i].id+"' data-type='"+obj[i].type+"'>["+obj[i].disp+"]</li>";	
							}else{
								ul += "<li id='"+obj[i].id+"' data-type='"+obj[i].type+"'>"+obj[i].disp+"</li>";
							}					
						}				
						ul += "</ul>";
						$(this).append(ul);
						$(this).addClass('open');
					});
				}
			}else{
				$('#reportRun').attr('src','/reportRun?id='+id+'&type='+type);
			}

		}); //leftMenu click
	}); //ready
</script>
</head>
<body>
<div id="leftMenu" style="float: left;">
<ul>
${leftMenu}
</ul>
</div>
<div id="report" style="float: left;">
<iframe id="reportRun" src="" style="width:800px;height: 600px;">
</iframe>
</div>
</body>
</html>