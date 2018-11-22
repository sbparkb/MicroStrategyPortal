$(document).ready(function(){

	/* left area */
    /*
	$(".open-gnb").on("click", function(e){
		e.preventDefault();
		var hrefval = $(this).attr("href");

		if(hrefval == "#header") {
			var distance = $('#container').css('left');
			if(distance == "auto" || distance == "0px") {
				$(this).addClass("open");
				openSidepage();
			} else {
				closeSidepage();
			}
		}
	}); // end click event handler
	$(".open-gnb").click();
	function openSidepage() {
		$('.header-wrap').css("display", "block");
		$('#container').animate({
			left: '224px',
			width: '1170px',
		}, 400, 'easeOutQuint'); 
	}
	
	function closeSidepage(){
		$('.header-wrap').css("display", "none");
		$(".open-gnb").removeClass("open");
		$('#container').animate({
			left: '0px',
			width: '1394px',
		}, 400, 'easeOutQuint');  
	}
	*/
}); 