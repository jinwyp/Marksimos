$(function(){
	if($("#register").length!=0){
		$("#register").fullpage({
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
});