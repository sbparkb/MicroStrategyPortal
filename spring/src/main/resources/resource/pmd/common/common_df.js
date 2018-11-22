/**
 * 
 */
	var lnbHtml				= "";
	 
	var noFabric = true;
	//AJAX Deferred 사용하여 AJAX 호출
	function callAjax(ajaxInfo){
		var dfd = $.Deferred();
		$.ajax(ajaxInfo).done(function(data){
			dfd.resolve(data);
		}).error(function(xhr, status, error){
			dfd.reject(xhr);
			fncfail(xhr);
		});
		
		return dfd.promise();
	}
	
	var fncfail=function(xhr) {
	
		if(opener){
			window.close();
			if(xhr.status==404){
				opener.location.href = URL_WEB_SERVER + "/error/404.do";
			}else if(xhr.status==500){
				opener.location.href = URL_WEB_SERVER + "/error/500.do";
			}else{
				opener.location.href = URL_WEB_SERVER + "/error/exception.do";
			}
		}else{
			if(xhr.status==404){
				top.location.href = URL_WEB_SERVER + "/error/404.do";
			}else if(xhr.status==500){
				top.location.href = URL_WEB_SERVER + "/error/500.do";
			}else{
				top.location.href = URL_WEB_SERVER + "/error/exception.do";
			}
			
		}
	};
	
	$(document).ready(function(){
		
		
		if(MESSAGE != null && MESSAGE != ""){
			alert(MESSAGE);
		}
 
	});
