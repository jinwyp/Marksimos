/*6个世界级的商业模拟游戏*/
function moniGames(){
	var elem=$('.point-list');
	if(!elem.length) return;
	elem.find('li').hover(function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
}

/*游戏悬浮导航*/
function navChange(nav,elem){
	var nav = $('#navScroll'),
		elem = $('#navScrollAim');

	if(!nav.length||!elem.length) return;
	var isIe6=/MSIE 6/.test(navigator.userAgent),
		pos=elem.offset().top + elem.outerHeight(),
		state=false,
		lis=nav.find('li');
	$(window).scroll(function(){
		var dis=$(window).scrollTop();
		if(dis>=pos){
			nav.show();
			state=true;
		}else{
			nav.hide();
			state=false;
		}
		if(isIe6 && state){
			nav.css('top',dis);
		}
	});
	lis.mouseenter(function(){
		var my = $(this),
			id = my.attr('_address'),
			count = my.index(),
			h = $('#' + id).offset().top;
		if(my.hasClass('on')) return ;
		$('body,html').stop().animate({scrollTop: h}, function(){
			lis.removeClass('active').eq(count).addClass('active');
		});
	})
}

//event页面时间选择
function dateChange(){
	var date=$('#date-pack'),
		tip=$('#EventTip');
	if(!date.length || !date.length) return
	WdatePicker({
		eCont:'date-pack',
		onpicked:function(dp){
			//下面这个是获取点击事件日期的
			//dp.cal.getDateStr()
			tip.show();
		},
		lang:'en-us',
		opposite:true,
		disabledDates:['01']
	});
}

//event页面list选择
function eventList(){
	var list=$('.event-table:not(.event-tip)'),
		professor=$('#EventProfessor');
	if(!list.length||!professor.length) return;
	list.find('tr:not(:eq(0))').mouseenter(function(e){
		var tit=$(this).find('td').eq(1).text();
		$(this).addClass('active');
		professor.find('h4 a').html(tit);
	}).mouseleave(function(event) {
		$(this).removeClass('active')
	});
}

//event页面弹出注册框
function popRegister(){
	var elem=$('.event-table .btn-mod a');
	if(!elem.length) return;
	elem.fancybox({
		padding: 0
	});
	$('#GoFinish').fancybox({
		padding: 0
	});
}

//etales页轮播
function etalesSlide(){
	var elem = $('#etales-slider');
	if(!elem.length) return;
	var moveElem = elem.find('ul'),
		count = 1,
		len = moveElem.find('li').length,
		time = 6000,
		dis = elem.width(),
		setInterval_elem,handles;

	// 创建控制器，即下面圆圈
	_createHandle();
	function _createHandle(){
		var str = '';
		for (var i = 0; i < len; i++){
			str += '<span>' + i + '</span>';
		};
		handles = $('<p class="handle">' + str + '</p>').appendTo(elem).find('span');
		handles.first().addClass('active');
	}

	// 添加各类事件
	elem.hover(function(e){
		setInterval_elem && clearInterval(setInterval_elem);
		if (e.type == 'mouseleave') {
			setInterval_elem = setInterval(_move,time);
		}
	});
	handles.click(function(){
		if(moveElem.is(':animated')) return;
		count = $(this).index();
		_move();
	});

	// 动画效果
	function _move(){
		moveElem.animate({marginLeft:-dis*count},function(){
			handles.removeClass('active').eq(count).addClass('active');
			count = ++count > (len - 1) ? 0 : count;
		})
	};

	// 时间控制器
	setInterval_elem = setInterval(_move,time);
}

// partner ship slide
function partnerSlide() {
	var elem = $('#partnerSlider');
	if(!elem.length) return;
	var wrap = elem.parent(),
		pre = wrap.find('.pre'),
		next = wrap.find('.next'),
		slider = elem.find('ul'),
		lis = slider.find('li'),
		w = elem.outerWidth(),
		liSize = Math.ceil(lis.length / 3),
		maxWidth = liSize*w,
		isScroll = liSize > 1,
		count = 0,
		interval = 3000,
		setInterval_elem;;
	wrap.hover(function(e){
		wrap[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('active');
		if(isScroll) {
			setInterval_elem && clearInterval(setInterval_elem);
			if(e.type == 'mouseleave') {
				setInterval_elem = setInterval(_move, interval);
			};
		};
	});
	if(isScroll) {
		setInterval_elem = setInterval(_move, interval);
	} else {
		next.hide();
		pre.hide();
	};

	slider.html(slider.html() + slider.html() + slider.html());
	slider.css('margin-left' , -maxWidth);

	elem.closest('.partner-slide').hover(function(e){
		$(this)[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('partner-slide-on');
	})
	
	function _move() {
		count++;
		if(count < 0) {
			slider.css('margin-left', -2*maxWidth);
			count = liSize - 1;
		}
		slider.animate({marginLeft: -maxWidth - count*w}, function(){
			if(count >= liSize) {
				slider.css('margin-left', -maxWidth);
				count = 0;
			};
		})
	};
	pre.click(function(){
		if(slider.is(':animated')) return false;
		count = count - 2;
		_move();
		return false;
	});
	next.click(function(){
		if(slider.is(':animated')) return false;
		_move();
		return false;
	});
}

// blog评论控制器
function commOperate() {
	var elem = $('.comment-list .cell');
	if(!elem.length) return ;
	elem.hover(function(e){
		$(this)[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('cell-active');
	});
}

// about us team头像变化
function aboutTeamPhoto(){
	var elems = $('#aboutUsTeam .pic');
	if(!elems.length) return ;
	elems.each(function(){
		var my = $(this),
			move = my.find('.move'),
			h = my.height();
		my.hover(function(e){
			if(e.type == 'mouseenter') {
				move.stop().animate({top: h});
			} else {
				move.stop().animate({top: 0});
			};
		})
	})
}

// 显示新闻详细内容
function newsDetail(){
	var elems = $('.news-list .more'),
	    elems2 = $('.news-list .tit'),
		target = $('#newsDetail');
	if(!elems.length || !target.length) return ;
	elems.click(function(){
		if(target.is(':visible')) {
			target.slideUp();
		} else {
			target.slideDown();
		}
		return false;
	});
    elems2.click(function(){
        if(target.is(':visible')) {
            target.slideUp();
        } else {
            target.slideDown();
        }
        return false;
    });
	target.find('.back').click(function(){
		target.slideUp();
	})
}

$(function(){
	popRegister();
	eventList();
	moniGames();
	dateChange();
	etalesSlide();
	partnerSlide();
	navChange();
	commOperate();
	aboutTeamPhoto();
	newsDetail();
})