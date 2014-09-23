$(function(){
	$('#fullpage').fullpage({
		navigation: true,
		navigationPosition: 'right',
		anchors: ['firstPage', 'secondPage', '3rdPage'],
		sectionsColor: ['#fff', '#1BBC9B', '#7E8F7C'],
		css3: true,
		scrollingSpeed: 1700,
		easing: 'easeOutBack',
		resize : false,
		scrollOverflow: true
	});
});