$(function(){

    $( document ).ready(function() {

        var $top_container = $('.top-container');
        var $yes_container = $('.yes-container');
        var $no_container = $('.no-container');
        var $choose_top = $('.choose-top');
        var $yes_menu2 = $('#yes-menu2');
        var $yes_menu3 = $('#yes-menu3');
        var $no_menu2 = $('#no-menu2');
        var $no_menu3 = $('#no-menu3');
        var keep_going = true;
        var is_desk_active = false;
        var window_hight = $(window).height();

        var init = function() {
            // $('.all-body').css({height: window_hight});
            // $top_container.css({height: window_hight});
        }

        var bxSlider = function() {

            var sliderSets = $('.sliderWrap');

            function initSliders(targetSlider, targetPager) {
              $(targetSlider).bxSlider({
                mode: 'fade',
                pagerCustom: targetPager
              });
            }

            $(sliderSets).each(function() {
              var targetSlider = "#" + $(this).children('.bxslider').attr('id');
              var targetPager = "#" + $(this).children('.bx-pager').attr('id');

              initSliders(targetSlider, targetPager);
            });
        }

        var yes_no_flash = function () {

            var top_is_hide = $('.top-container').hasClass('top-is-hide');

            if(top_is_hide) {
                return false;
            }
            setTimeout(function () {

                var $choose_top1 = $('.choose-top1');
                var $choose_top2 = $('.choose-top2');
                var $cover1 = $('.top-cover1');
                var $cover2 = $('.top-cover2');
                var is_hide = $choose_top2.hasClass('is_hide');

                if(!is_hide && keep_going) {
                    $choose_top2.css({opacity: '0'});
                    $choose_top2.addClass('is_hide');
                    $choose_top1.css({opacity: '1'});
                    $choose_top1.removeClass('is_hide');
                    $cover1.css({opacity: '0.4'});
                    $cover2.css({opacity: '0.4'});
                } else if(is_hide && keep_going) {
                    $choose_top2.css({opacity: '1'});
                    $choose_top2.removeClass('is_hide');
                    $choose_top1.css({opacity: '0'});
                    $choose_top1.addClass('is_hide');
                    $cover1.css({opacity: '0.4'});
                    $cover2.css({opacity: '0.4'});
                }

                yes_no_flash();
            }, 600);
        }

        var stop_flash = function() {

            $choose_top.off('mouseenter').on('mouseenter', function() {
                keep_going = false;
            });

            $choose_top.off('mouseleave').on('mouseleave', function() {
                keep_going = true;
            });

        }

        var top_hover = function() {

            var $cover1 = $('.top-cover1');
            var $cover2 = $('.top-cover2');

            $choose_top.hover(function() {

                var yes_or_no = $(this).attr('id');

                $choose_top.removeClass('is_hide').css({opacity: '0'});
                $(this).css({opacity: '1'});

                if(yes_or_no === 'yes') {
                    $cover1.css({opacity: '0'});
                    $cover2.css({opacity: '0.4'});
                }
                else if(yes_or_no === 'no') {
                    $cover1.css({opacity: '0.4'});
                    $cover2.css({opacity: '0'});
                }
            });
        }

        var plus_hover = function() {

            var $plus = $('.plus');

            $plus.off('mouseenter').on('mouseenter', function() {
                $(this).removeClass('is_open').addClass('is_open');
            });

            $plus.off('mouseleave').on('mouseleave', function() {
                $(this).removeClass('is_open');
            });

        }

        var yes_no_click = function() {

            $choose_top.off('click').on('click', function() {

                var click_type = $(this).attr('id');

                if(click_type === 'yes') {

                    keep_going = false;

                    $('html,body').animate({
                        scrollTop:$('.top_bg').offset().top
                    }, 0);

                    tabs_init(click_type);

                    // 漸淡
                    $top_container.animate({opacity: "0"}, 1000);

                    // yes 上推
                    $yes_container.show().animate({top: (0 - window_hight)}, {
                        duration: 500,
                        complete: function(){

                            // firefox 底部破版修正
                            $('.all-body').css({height: '2113px'});
                            $top_container.hide().removeClass('top-is-hide').addClass('top-is-hide');
                            $yes_container.css({top: '0px'}).removeClass('menu-active').addClass('menu-active');
                            $no_container.removeClass('menu-active');
                        }
                    });

                }
                else if(click_type === 'no') {

                    keep_going = false;

                    $('html,body').animate({
                        scrollTop:$('.top_bg').offset().top
                    }, 0);

                    tabs_init(click_type);

                    // 漸淡
                    $top_container.animate({opacity: "0"}, 1000);

                    // no 上推
                    $no_container.show().animate({top: (0 - window_hight)}, {
                        duration: 500,
                        complete: function(){

                            // firefox 底部破版修正
                            $('.all-body').css({height: '2365px'});
                            $top_container.hide().removeClass('top-is-hide').addClass('top-is-hide');
                            $no_container.css({top: '0px'}).removeClass('menu-active').addClass('menu-active');
                            $yes_container.removeClass('menu-active');
                        }
                    });
                }

            });
        }

        //按鈕背景藍色水動畫
        var yes_circle_animate = function() {

            var $btn_circle = $('.btn-yes-circle');
            var $btn_circle_hover = '';

            $btn_circle.off('mouseenter').on('mouseenter', function() {
                $btn_circle_hover = $(this).find('.circle-bg');
                $btn_circle_hover.animate({top: "-16px"}, "slow");
            });
            $btn_circle.off('mouseleave').on('mouseleave', function() {
                $btn_circle_hover = $(this).find('.circle-bg');
                $btn_circle_hover.animate({top: "80px"}, "slow");
            });
        }

        var desk_animate = function() {

            var $desk_wrap = $('.desk-wrap');
            var $topic_top = $('.no_topic_02').offset().top;
            // var $yes_topic_top = $('.yes_bg_03').offset().top;
            // var $no_topic_top = $('.no_bg_03').offset().top;


            $(window).scroll(function() {

                var no_container_is_open = $no_container.hasClass('menu-active');
                var yes_container_is_open = $yes_container.hasClass('menu-active');

                if(no_container_is_open) {

                    var show_desk_top = $topic_top + window_hight;
                    var position = $(window).scrollTop();
                    // console.log(position + "+" + show_desk_top);
                    // console.log(is_desk_active);

                    var top_no_fixed = 800;
                    var now =  $(window).scrollTop();
                    var $no_bg_02 = $('.no_bg_02');



                    if(position > show_desk_top && !is_desk_active) {

                        is_desk_active = true;

                        $desk_wrap.removeClass('active').addClass('active');
                        $no_menu2.removeClass('tab-active');
                        $no_menu3.removeClass('tab-active').addClass('tab-active');
                    }
                    else if(position <= show_desk_top) {

                        is_desk_active = false;

                        $desk_wrap.removeClass('active');
                        $no_menu3.removeClass('tab-active');

                        // yes & no 背景圖 fixed 拿掉
                        if(now > top_no_fixed) {
                            $no_bg_02.removeClass('no_fixed').addClass('no_fixed');
                            $no_menu2.removeClass('tab-active');
                        }
                        else if(now <= top_no_fixed) {
                            $no_bg_02.removeClass('no_fixed');

                            if(now == 0) {
                                $no_menu2.removeClass('tab-active').addClass('tab-active');
                            }
                        }
                    }
                }
                else if(yes_container_is_open) {

                    var top_no_fixed = 825;
                    var now =  $(window).scrollTop();
                    var $yes_bg_02 = $('.yes_bg_02');

                    if(now > top_no_fixed) {
                        $yes_bg_02.removeClass('no_fixed').addClass('no_fixed');
                        $yes_menu2.removeClass('tab-active');
                        $yes_menu3.removeClass('tab-active').addClass('tab-active');
                    }
                    else if(now <= top_no_fixed) {
                        $yes_bg_02.removeClass('no_fixed');

                        if(now == 0) {
                            $yes_menu2.removeClass('tab-active').addClass('tab-active');
                            $yes_menu3.removeClass('tab-active');
                        }
                    }
                }
            });

        }

        var menu_event = function() {

            var $btn_yes_or_no = $('.btn-yes-or-no');
            var $btn_index = $('.btn-index');

            $btn_yes_or_no.off('click').on('click', function() {

                var menu_name = $(this).attr('id');

                if(menu_name === "yes-menu4") {
                    $yes_container.hide().removeClass('menu-active');
                    $no_container.show().addClass('menu-active');
                    $('.all-body').css({height: '2365px'});
                    $('html,body').animate({
                        scrollTop:$('.no_bg_01').offset().top
                    }, 0);
                }
                else if (menu_name === "no-menu4") {
                    $yes_container.show().addClass('menu-active');
                    $no_container.hide().removeClass('menu-active');
                    $('.all-body').css({height: '2113px'});
                    $('html,body').animate({
                        scrollTop:$('.yes_bg_01').offset().top
                    }, 0);
                }

            });

            $yes_menu2.click(function(){
                $('html,body').animate({
                    scrollTop:$('.yes_bg_01').offset().top
                }, 500);
            });

            $yes_menu3.click(function(){
                $('html,body').animate({
                    scrollTop:$('.yes_topic_02').offset().top + 100
                }, 500);
            });

            $no_menu2.click(function(){
                $('html,body').animate({
                    scrollTop:$('.no_bg_01').offset().top
                }, 500);
            });

            $no_menu3.click(function(){
                $('html,body').animate({
                    scrollTop:$('.no_topic_02').offset().top + 80
                }, 500);
            });

           $btn_index.off('click').on('click', function() {
                $yes_container.hide().removeClass('menu-active');
                $no_container.hide().removeClass('menu-active');
                $('.all-body').css({height: 1000});
                $top_container.show().removeClass('top-is-hide');
                $top_container.animate({opacity: "1"}, 500);
                keep_going = true;
                yes_no_flash();
                $('html,body').animate({
                    scrollTop:$('.top_bg').offset().top
                }, 0);
           });

        }

        var tabs_init = function(type) {
            $('.menu').removeClass('tab-active');

            if(type === 'yes') {
                $yes_menu2.addClass('tab-active');
            }
            else {
                $no_menu2.addClass('tab-active');
            }
        }

        // index
        init();
        yes_no_flash();
        stop_flash();
        top_hover();
        yes_no_click();

        // yes
        bxSlider();
        yes_circle_animate();

        // no
        desk_animate();

        // yes & no
        plus_hover();

        // menu
        menu_event();

    });


});