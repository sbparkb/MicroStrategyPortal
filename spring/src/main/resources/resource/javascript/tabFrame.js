(function($) {
	
	$(document).ready(function() {
		$("#tabstrip").on('mousedown', 'li', function(event){
			 
			var no = event.which;
			if(no == 3){
				$('.tap_menu').addClass('hide');
				toggleTab($(this));
				$(this).children('.tap_menu').removeClass('hide');				
			}else{				
				if (!$(event.target).is('dd a')) {
					$("#tabstrip li .tap_menu").addClass('hide');
				}				
			}
		});
	
	});
			
})(jQuery);	

function closeTab(event){
	
	var li = $(event).parent();
	var tabUl = li.parent();
	var id = li.attr('id');	
 
	var frdLi = null; 
	
	if(li.prev().index() < 0){
		frdLi = li.next();
	}else{
		frdLi = li.prev();
	}
	toggleTab(frdLi);
 
	
	li.remove(); //탭 삭제
	var body = document.getElementById("mainFrame");	
	
	//top.frames["mainFrame"].removeIframe(id);
	$('iframe[name="'+id+'"]', body.contentDocument).remove();
	
 
	///탭을 종료해서 4개 이하가 되면 숨겨진 탭을 한 개 더 보여준다. 
	var size = $('#tabstrip li:not(.hide)').size();
	if(size < 5){
		$('#tabstrip li.hide').first().removeClass('hide');
	}
 
	
}

function toggleTab(event){
	var li = $(event);
	var id = li.attr('id');
	
	
	if ( $("#"+id, "#tabstrip").length <= 0 ) {
		//alert('없음');
		return;
	}
		
 	$('#tabstrip li').removeClass('mouse_on');
	$('#tabstrip li .tab_close').hide();
	$('#tabstrip li').addClass('mouse_off');
	$('#tabstrip li a').addClass('tab');
	
	li.removeClass('mouse_off');
	li.removeClass('hide');
	li.addClass('mouse_on');
	li.children('span').show();
	
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
	
	var curLi = $('#tabstrip li.mouse_on');
	
	if(curLi.index() > 0){
		toggleTab(curLi.prev());
	}
	
	var notHideSize = $('#tabstrip li:not(.hide)').size();
	if(notHideSize > 5){
		$('#tabstrip li:not(.hide)').last().addClass('hide');
	}
}

function next(){
			
	var curLi = $('#tabstrip li.mouse_on');
		
	if(curLi.index() < $('#tabstrip li').size()-1){
		toggleTab(curLi.next());
	}
	
	var notHideSize = $('#tabstrip li:not(.hide)').size();
	if(notHideSize > 5){
		$('#tabstrip li:not(.hide)').first().addClass('hide');
	}
	
}