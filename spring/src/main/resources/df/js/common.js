//var winWidth, winHeight, winPos;

$(function($) {
    //winWidth = $(window).width();
    //winHeight = $(window).height();
    //winPos = $(window).scrollTop();
    /* LNB*/
    	$(".lnb > ul > li > a").each(function() {
    		$(this).click(function(e) {
    			if ( $(this).parent().hasClass("nochild") ) {
    			} else {
    				if ( $(this).hasClass("on") ) {
    					$(this).next("ul").slideUp(10).end().removeClass("on"); // 161114 netive G-Daerigon
    				} else {
    					e.preventDefault();
    					$(".lnb a.on + ul").slideUp(10);
    					$(".lnb > ul > li > a").removeClass("on");
    					$(this).next("ul").slideDown(10).end().addClass("on");
    				}
    				setTimeout(function() {
    				    leftResize();
    				}, 100); //  100ms(0.1sec)  3000ms(3초) 
 
    				
     			}
    			//mCustomScrollbars();  // scrollbars size
    			
    			//$("#mcs_container").mCustomScrollbar("vertical",50,"easeOutCirc",1.05,"auto","yes","yes",5).CustomScroller("resize");
    		});
    	});

});

//left OpenClose
function aopen(){
	var ele = $("div.ui_wrap div.fixed_menu_left");
	if(ele.hasClass("close")){
		if(ele.hasClass("close")){
			ele.removeClass("close");
		}
		if(!ele.hasClass("open")){
			ele.addClass("open");
		}

	}else{
		if(ele.hasClass("open")){
			ele.removeClass("open");
		}
		if(!ele.hasClass("close")){
			ele.addClass("close");
		}
	}

	setContentClass();
}

function aclose(){
	var ele = $("div.ui_wrap div.aside_widget");
	if(ele.hasClass("close")){
		if(ele.hasClass("close")){
			ele.removeClass("close");
		}
		if(!ele.hasClass("open")){
			ele.addClass("open");
		}

	}else{
		if(ele.hasClass("open")){
			ele.removeClass("open");
		}
		if(!ele.hasClass("close")){
			ele.addClass("close");
		}
	}

	setContentClass();
}

function setContentClass(){
	var ele = null, sClass = "";
	if($("div.ui_wrap div.fixed_menu_left").hasClass("open")){
		if($("div.ui_wrap div.aside_widget").hasClass("open")){
			sClass = "open";
		}else{
			sClass = "open_l";
		}
	}else{
		if($("div.ui_wrap div.aside_widget").hasClass("open")){
			sClass = "open_r";
		}else{
			sClass = "close";
		}
	}
	ele = $("div.ui_wrap div.containerwrap");
	if(ele.hasClass("close")){
		ele.removeClass("close");
	}
	if(ele.hasClass("open")){
		ele.removeClass("open");
	}
	if(ele.hasClass("open_l")){
		ele.removeClass("open_l");
	}
	if(ele.hasClass("open_r")){
		ele.removeClass("open_r");
	}
	ele.addClass(sClass);
}


function leftResize() {
    
	//alert('111');
	$(window).trigger('resize');
	//mCustomScrollbars("resize");
}