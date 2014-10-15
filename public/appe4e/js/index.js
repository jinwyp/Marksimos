$(function(){

	var initPage=function(){
		$('#index').fullpage({
			navigation: true ,
			navigationPosition: 'right',
			anchors: ['firstPage', 'secondPage', 'thirdPage'],
			sectionsColor: ['#fff', '#FF441C', '#fff'],
			navigationColor:'#B3B3B3',
			css3: true,
			scrollOverflow: true,
			loopBottom:true,
			keyboardScrolling:false,
			scrollingSpeed: 500,
			resize:false
		}); 
		$('#section1').show();
		$('#section2').show();
	}

	if($("#index").length!=0){
		$('#section1').hide();
		$('#section2').hide();
		setTimeout(initPage, 100);
	}

	if($("#company-register").length!=0){
		$("#company-register").fullpage({
			navigation: true ,
			navigationPosition: 'left',
			anchors: ['step1', 'step2', 'step3'],
			sectionsColor: ['#fff', '#fff', '#fff'],
			navigationColor:'#B3B3B3',
			navigationTooltips:['','',''],
			css3: true,
			scrollOverflow: true,
			loopBottom:true,
			keyboardScrolling:false,
			scrollingSpeed: 500,
			resize:false,
			afterResize:function(){
				$('#fp-nav').css('left',($('.e4e-logo').offset().left+15)+'px');
			}
		});
	}


	if($("#student-register").length!=0){
		$("#student-register").fullpage({
			navigation: true,
			navigationPosition: 'left',
			anchors: ['step1', 'step2'],
			sectionsColor: ['#fff', '#fff'],
			navigationColor:'#B3B3B3',
			navigationTooltips:['',''],
			css3: true,
			scrollOverflow: true,
			loopBottom:true,
			keyboardScrolling:false,
			scrollingSpeed: 500,
			resize:false,
			afterResize:function(){
				$('#fp-nav').css('left',($('.e4e-logo').offset().left+15)+'px');
			}
		});
	}

	if($("#success").length!=0){
		$("#success").fullpage({
			sectionsColor: ['#fff'],
			navigationColor:'#B3B3B3',
			css3: true,
			easing: 'easeOutBack',
			scrollOverflow: true,
			loopBottom:true,
			keyboardScrolling:false
		});
	}

	$(".next").click(function(){
		$.fn.fullpage.moveSectionDown();
	});

	$('.prev-step').click(function(){
		$.fn.fullpage.moveSlideLeft();
	});

	$('.next-step').click(function(){
		$.fn.fullpage.moveSlideRight();
	});

	$('.form_date').click(function(){
		$('.form_date').datetimepicker({
	        weekStart: 1,
	        todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0,
			bootcssVer: 3
	    });
	})

	var startTime,endTime;
	$('.my-flipin-x').hover(
		function () {
			startTime=new Date().getTime();
			if(!$(this).hasClass('hover-flipin-x')){
				$(this).addClass("hover-flipin-x");
			}
		},
		function () {
			endTime=new Date().getTime();
			if(endTime-startTime>100){
				setTimeout(function(){
	               $('.my-flipin-x').removeClass("hover-flipin-x");
	            },1200);
			}
		}
	);
	$('.my-flipin-y').hover(
		function () {
			startTime=new Date().getTime();
			if(!$(this).hasClass('hover-flipin-y')){
				$(this).addClass("hover-flipin-y");
			}
		},
		function () {
			endTime=new Date().getTime();
			if(endTime-startTime>100){
				setTimeout(function(){
	               $('.my-flipin-y').removeClass("hover-flipin-y");
	            },1200);
			}
		}
	);

});