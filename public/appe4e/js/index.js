$(function(){
	$('#fullpage').fullpage({
		navigation: true,
		navigationPosition: 'right',
		anchors: ['firstPage', 'secondPage', '3rdPage'],
		sectionsColor: ['#fff', '#FF441C', '#fff'],
		navigationColor:'#B3B3B3',
		css3: true,
		scrollingSpeed: 1700,
		easing: 'easeOutBack',
		resize : false,
		scrollOverflow: true,
		loopBottom:true,
		slidesNavigation:true,
		slidesNavPosition:'top',
		slidesNavigationTitle:["What's hcd learning","what can you expect"]
	});
});