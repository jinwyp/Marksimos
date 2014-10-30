// 轮播
function homeSlide() {
	var slide = $('#overview-slide'),
		handle = $('#overview-handle');
	if(!slide.length || !handle.length) return ;
	var interval = 5000,
		count = 0,
		handles = handle.find('li'),
		w = slide.width(),
		moveElem = slide.find('> ul'),
		max = handles.length,
		delay = null,
		loopWidth = w*max,
		interval_elem, current;

	moveElem.html(moveElem.html() + moveElem.html() +  moveElem.html()).css('margin-left', -loopWidth);

	handles.mouseenter(function(){
		var my = $(this);
		current = $(this).index()
		if(my.hasClass('active')) return ;
		current--;
		if(moveElem.is(':animated')) {
			delay = current;
		} else {
			count = current;
			_move();			
		};
	})
	
	slide.add(handle).hover(function(e){
		interval_elem && clearInterval(interval_elem);
		if(e.type == 'mouseleave') {
			interval_elem = setInterval(_move, interval);
			if(delay != null) {
				delay = null;
			};
		};
	});

	function _move() {
		count ++;
		if(count > max-1) {
			count = 0;
			moveElem.css('margin-left', -loopWidth + w);
		};

		moveElem.stop().animate({marginLeft: -loopWidth - count*w}, function() {
			handles.removeClass('active').eq(count).addClass('active');
			if(delay != null) {
				count = delay;
				delay = null;
				_move();
			}
		});
	};

	interval_elem = setInterval(_move, interval);
}

$(function(){
	homeSlide();
})