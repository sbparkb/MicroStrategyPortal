function closeTab(event){
	
	var li = $(event).parent();
	var tabUl = li.parent();
	var id = li.attr('id');	
 
	//alert('id :' + id);
	
	var frdLi = null; 
	
	if(li.prev().index() < 0){
		frdLi = li.next();
	}else{
		frdLi = li.prev();
	}
	
	toggleTab(frdLi.children('span').children('a'));
 
	li.remove(); //탭 삭제
	var body = document.getElementById("mainFrame");	
	
	//top.frames["mainFrame"].removeIframe(id);
	$('iframe[name="'+id+'"]', body.contentDocument).remove();
	
 
	///탭을 종료해서 4개 이하가 되면 숨겨진 탭을 한 개 더 보여준다. 
	var size = $('#tabstrip li:not(.hide)').size();
	if(size < 6){
		$('#tabstrip li.hide').first().removeClass('hide');
	}
	
	// back img display
	size = $('#tabstrip li:not(.hide)').size();
	if(size == 0) {
	    	//alert('1111');
		$('#backImg').css('display', 'block');
		$('#contentwrap').css('display', 'none');
	}	
 
}

function toggleTab(event){
    
        var alink = $(event);
	var li = alink.parent().parent();
	var span = alink.parent();
	var id = li.attr('id');
	
	//alert('id :' + id);
	
	if ( $("#"+id, "#tabstrip").length <= 0 ) {
		//alert('없음');
		return;
	}

	// 전체 tab disable
	$('#tabstrip li span').removeClass('on');
	//$('#tabstrip li a.btnClose').hide();
	
	span.addClass('on');
	li.removeClass('hide');
	/*
 	$('#tabstrip li').removeClass('mouse_on');
	$('#tabstrip li .tab_close').hide();
	$('#tabstrip li').addClass('mouse_off');
	$('#tabstrip li a').addClass('tab');
 
	li.removeClass('mouse_off');
	li.removeClass('hide');
	li.addClass('mouse_on');
	li.children('span').show();
	*/
	
	//console.log('iframe[name="'+id+'"]');
	var body = document.getElementById("mainFrame");
	$('iframe', body.contentDocument).hide();
	$('iframe[name="'+id+'"]', body.contentDocument).show();	
}

function closeOther(sId){
/*	
	var conf = confirm("현재 탭을 제외하고 모든 탭을 닫으시겠습니까?");
	if(!conf) return;
	
	$('#tabstrip li').each(function(){
		if(!$(this).hasClass('mouse_on')){
			$(this).remove();
			
			var body = document.getElementById("mainFrame");			
			$('iframe[name="'+$(this).attr('id')+'"]', body.contentDocument).remove();
		}
	});
	
	$('#tabstrip .tap_menu').addClass('hide');
*/
}

function closeAll(){
	/*
	var conf = confirm("모든 탭을 닫으시겠습니까?");
	if(!conf) return;
	
	$('#tabstrip li').remove();
	
	var body = document.getElementById("mainFrame");			
	$('iframe', body.contentDocument).remove();
	*/
}

function prev(){
	
	var curLi = $('#tabstrip li span.on').parent();
	
	if(curLi.index() > 0){
		toggleTab(curLi.prev().children('span').children('a'));
	}
	
	var notHideSize = $('#tabstrip li:not(.hide)').size();
	if(notHideSize > 6){
		$('#tabstrip li:not(.hide)').last().addClass('hide');
	}
}

function next(){
			
	var curLi = $('#tabstrip li span.on').parent();
		
	if(curLi.index() < $('#tabstrip li').size()-1){
		toggleTab(curLi.next().children('span').children('a'));
	}
	
	var notHideSize = $('#tabstrip li:not(.hide)').size();
	if(notHideSize > 6){
		$('#tabstrip li:not(.hide)').first().addClass('hide');
	}
}