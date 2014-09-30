$(function(){
	if($("#index").length!=0){
		$('#index').fullpage({
			navigation: true,
			navigationPosition: 'right',
			anchors: ['firstPage', 'secondPage', '3rdPage'],
			sectionsColor: ['#fff', '#FF441C', '#fff'],
			navigationColor:'#B3B3B3',
			css3: true,
			scrollingSpeed: 1700,
			resize : false,
			scrollOverflow: true,
			loopBottom:true
		}); 
	}

	if($("#company-register").length!=0){
		$("#company-register").fullpage({
			navigation: true,
			navigationPosition: 'left',
			anchors: ['step1', 'step2', 'step3'],
			sectionsColor: ['#fff', '#fff', '#fff'],
			navigationColor:'#B3B3B3',
			navigationTooltips:['','',''],
			/*navigationTooltipsEN:['Company Details','Communication Details','Job Profiles'],
			navigationTooltipsCN:['公司基本信息','通信细节','工作信息'],*/
			css3: true,
			scrollingSpeed: 1700,
			resize : false,
			scrollOverflow: true,
			loopBottom:true,
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
			/*navigationTooltipsEN:['Basic Details','Profile Details'],
			navigationTooltipsCN:['基本信息','个人资料'],*/
			css3: true,
			scrollingSpeed: 1700,
			resize : false,
			scrollOverflow: true,
			loopBottom:true,
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
			scrollingSpeed: 1700,
			easing: 'easeOutBack',
			resize : false,
			scrollOverflow: true,
			loopBottom:true
		});
	}

	$(".next").click(function(){
		$.fn.fullpage.moveSectionDown();
	});

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