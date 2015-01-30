$(function () {
    $('.switch-button a').each(function (idx) {
        $(this).on('mouseenter', function (e) {           
            $('.switch-button .selected').removeClass("selected");
            $(this).addClass("selected");
            if (idx === 1) {
                $(".pic-1,.pic-2,.pic-3").stop().animate({'margin-top':'-275px'}, 500, 'swing');
            }
            else {
                $(".pic-1,.pic-2,.pic-3").stop().animate({ 'margin-top': '20px' }, 500,'swing');
            }
        });
    });
    if ($.browser && $.browser.msie && $.browser.version < 10) {
        $(".pic").on("mouseenter mouseleave", function (e) {
            if (e.type === 'mouseenter') {
                $(this).find('.back').stop().fadeIn(100, function () { 
                    $(this).parent().find('.front').hide();
                });
            }
            else { 
                $(this).find('.front').show();
                $(this).find('.back').stop().fadeOut(100);
            }
        }).trigger("mouseleave");
    }

    $(window).on('resize', function () {
        if ($('header').height() + $('footer').height() + $('main').height() < $(window).height()) {
            $('footer').addClass('b2c-footer-fix');
        }
        else { 
            $('footer').removeClass('b2c-footer-fix');
        }
    }).trigger('resize');
});