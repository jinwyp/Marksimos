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
	})

});