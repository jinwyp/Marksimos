//阻止a的默认跳转
function preventEvent(){
	$(document).on('click','a[href=#none]',function(e){
		e.preventDefault();
	});
}

//显示隐藏div
function elemHover(){
	var elem=$('.Hover');
	if(!elem.length) return;
	elem.hover(function(e){
		$(this)[e.type=='mouseenter'?'addClass':'removeClass']('active');
	})
}

//不支持placeholder的浏览器，作js模仿
function placeHolder(){
	if('placeholder' in document.createElement('input')) return;//支持则返回
	var elem=$('[placeholder]');
	if(!elem.length) return;
	elem.each(function(){
		$(this).addClass('empty');//默认加上empty，说明没有输入内容
		var defautValue=$(this).attr('placeholder');
		$(this).click(function(){
			var val=$(this).val();
			if(val==defautValue){
				$(this).val('');
			};
			$(this).removeClass('empty');//点击的时候去掉empty
		}).blur(function(){
			var val=$(this).val();
			if(!$.trim(val)){//为空时则还原，加上empty
				$(this).val(defautValue);
				$(this).addClass('empty');
			};
		}).val(defautValue);//默认加上value值
	})
}

//tab切换
function tagChange(){
	var elem=$('.TabNav');
	if(!elem.length) return;
	elem.each(function(){
		var self = $(this),
		    lis = self.find('li'),
		    wrap = self.closest('Tab'),
		    wrap = wrap.size() > 0 ? wrap : $('body'),
		    panels = wrap.find('.TabPanel');
		lis.mouseenter(function(){
			var my = $(this);
			if(my.hasClass('active')) return;
			var count = my.index();
			my.addClass('active').siblings().removeClass('active');
			panels.hide().eq(count).show();
		});
		function _init(){
			var count = self.find('.active').index();
			panels.hide();
			if (count!==null){
				panels.eq(count).show();
			} else {
				lis.first().addClass('active');
				panels.eq(0).show();
			}
		};
		_init();
	})
}

// 主导航显示效果
function navigation() {
	var elem = $('.navigation  .cell-has');
	if(!elem.length) return;
	elem.each(function(){
		var my = $(this),
			panel = my.find('.panel');
		my.mouseenter(function(){
			if(my.hasClass('active')) return ;
			my.addClass('active');
			panel.fadeIn(300);
		}).mouseleave(function(){
			my.removeClass('active');
			panel.stop().removeAttr('style');
		});
	})
}

// 加入我们右侧选中
function jionus() {
	var elem = $('.joinUs  .aside li');
	if(!elem.length) return;

	elem.click(function(event) {
		elem.each(function(){
			$(this).removeClass('active');
		});

		$(this).addClass("active");
	});

}



$(function(){
	tagChange();
	preventEvent();
	elemHover();
	placeHolder();
	navigation();
	jionus();
})