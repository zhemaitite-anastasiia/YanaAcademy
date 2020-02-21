"use strict";
var header = jQuery('.main_header'),
	header_holder = jQuery('.header_holder'),
	footer = jQuery('.main_footer'),
	main_wrapper = jQuery('.main_wrapper'),
	site_wrapper = jQuery('.site_wrapper'),
	nav = jQuery('nav.main_nav'),
	menu = nav.find('ul.menu'),
	html = jQuery('html'),
	body = jQuery('body'),
	myWindow = jQuery(window),
	is_masonry = jQuery('.is_masonry'),
	fl_container = jQuery('.fl-container'),
	socials_wrapper = jQuery('.socials_wrapper'),
	gt3_imgs2preload = [],
	gt3_pp_array = {},
	aside_menu_nav = jQuery('.aside_main_nav'),
	aside_menu = jQuery('.aside_main_nav ul.menu'),
	aside_header_title = jQuery('.aside_header .header_title');
var timeout;
var menuStep = 200,
	menuGround = aside_menu_nav.height(),
	menuThisTop = 0,
	deltaY = 0;

jQuery(document).ready(function($) {
	/*Aside Header Mark */
	if (jQuery('.aside_header').size() > 0) {
		jQuery('html').addClass('with_aside_header');
	}
	/* Comments */
	if (jQuery('ol.commentlist').size() > 0) {
		jQuery('ol.commentlist li').each(function(){
			if (jQuery(this).children('ul.children').size() > 0) {
				jQuery(this).addClass('has_replays');
			}
		})
	}

	gt3_fullWidthRow();

	// Image Bg
	var title_block_wrapper_tag = jQuery('.title_block_wrapper');
	if (title_block_wrapper_tag.size() > 0 && typeof title_block_wrapper_tag.attr('data-image-src') !== 'undefined') {
		title_block_wrapper_tag.css({'background-image': 'url('+title_block_wrapper_tag.attr('data-image-src')+')'});
	}

	/* 404 */
	if (jQuery('#wpadminbar').size() > 0) {
		jQuery('html').addClass('has_admin_bar');
	}
	if (jQuery('.wrapper_404').size() > 0) {
		jQuery('html').addClass('page_404');
	}
	if (jQuery('.wrapper_pp').size() > 0) {
		jQuery('html').addClass('page_pp');
	}

	/* Link # to Void(0) */
	jQuery("a[href='#']").each(function () {
		jQuery(this).attr('href', 'javascript:void(0)');
	});

	/* Form Buttons */
	jQuery('.main_wrapper input[type="button"]').each(function(){
		jQuery(this).wrap('<div class="gt3_form_button_wrapper"/>');
	});
	jQuery('.main_wrapper input[type="reset"]').each(function(){
		jQuery(this).wrap('<div class="gt3_form_button_wrapper"/>');
	});
	jQuery('.main_wrapper input[type="submit"]').each(function(){
		jQuery(this).wrap('<div class="gt3_form_button_wrapper"><span></span></div>');
	});
	jQuery('.count_container_wrapper input[type="submit"]').each(function(){
		jQuery(this).wrap('<div class="gt3_form_button_wrapper"><span></span></div>');
	});
	jQuery('.content_pp input[type="submit"]').each(function(){
		jQuery(this).wrap('<div class="gt3_form_button_wrapper"><span></span></div>');
	});
	jQuery('.footer_widgets input[type="submit"]').each(function(){
		jQuery(this).wrap('<div class="gt3_form_button_wrapper"><span></span></div>');
	});

	if (jQuery('.simple_sticky').size() > 0) {
		if (jQuery('#wpadminbar').size() > 0) {
			var check_height = jQuery('.header_tagline').height(),
				setFixedTop = -1*jQuery('.header_tagline').height() + jQuery('#wpadminbar').height(),
				setDefTop = jQuery('#wpadminbar').height();
		} else {
			var check_height = jQuery('.header_tagline').height(),
				setFixedTop = -1*jQuery('.header_tagline').height(),
				setDefTop = 0;
		}
		if (myWindow.scrollTop() >= check_height) {
			jQuery('html').addClass('header_fixed');
			jQuery('.simple_sticky').css('top', setFixedTop+'px');
		} else {
			jQuery('html').removeClass('header_fixed');
			jQuery('.simple_sticky').css('top', '0px');
		}
		myWindow.on('scroll', function(){
			if (jQuery('#wpadminbar').size() > 0) {
				var check_height = jQuery('.header_tagline').height(),
					setFixedTop = -1*jQuery('.header_tagline').height() + jQuery('#wpadminbar').height(),
					setDefTop = jQuery('#wpadminbar').height();
			} else {
				var check_height = jQuery('.header_tagline').height(),
					setFixedTop = -1*jQuery('.header_tagline').height(),
					setDefTop = 0;
			}
			if (myWindow.scrollTop() >= check_height) {
				jQuery('html').addClass('header_fixed');
				jQuery('.simple_sticky').css('top', setFixedTop+'px');
			} else {
				jQuery('html').removeClass('header_fixed');
				jQuery('.simple_sticky').css('top', '0px');
			}
		});
	}
	//Menu
	if (header.size() > 0) {
		jQuery('.btn_menu').on('click', function(){
			if (myWindow.width() > 943) {
				html.toggleClass('aside_menu_showed');
			} else {
				html.toggleClass('aside_mobile_menu_showed');
			}
		});

		if (jQuery('.aside_header').size() > 0) {
			jQuery('.aside_iphone_mobile_menu').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');
			jQuery('.mobile_menu').html(aside_menu_nav.find('ul.menu').html());
		} else {
			header.append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');
			jQuery('.mobile_menu').html(nav.find('ul.menu').html());
		}
		jQuery('.mobile_menu_wrapper').hide();
		jQuery('.btn_mobile_menu').on('click', function() {
			jQuery('.mobile_menu_wrapper').stop().slideToggle(300);
			jQuery('html').toggleClass('mobile_menu_opened');
		});
	}
	if (jQuery('.swipebox').size() > 0) {
		jQuery('html').addClass('gt3_swipe_box');
		jQuery('.swipebox').swipebox_pg();
	}
	if (jQuery('.gt3_video_button').size() > 0) {
		jQuery('html').addClass('gt3_swipe_box');
		jQuery('.gt3_video_button').find('a').swipebox_pg();
	}
	if (jQuery('.fadeOnLoad').size() > 0) {
		setTimeout("jQuery('.fadeOnLoad').animate({'opacity' : '1'}, 500)", 500);
	}
	gt3_content_update();

	if (jQuery('.bg404').size() > 0) {
		html.addClass('page404');
	}

	if(jQuery('.gt3_js_bg_img').size() > 0) {
		jQuery('.gt3_js_bg_img').each(function(){
			jQuery(this).css('background-image', 'url('+jQuery(this).attr('data-src')+')');
		});
	}
	if(jQuery('.gt3_js_bg_color').size() > 0) {
		jQuery('.gt3_js_bg_color').each(function(){
			jQuery(this).css('background-color', jQuery(this).attr('data-bgcolor'));
		});
	}
	if(jQuery('.gt3_js_color').size() > 0) {
		jQuery('.gt3_js_color').each(function(){
			jQuery(this).css('color', jQuery(this).attr('data-color'));
		});
	}
	if(jQuery('.gt3_js_transition').size() > 0) {
		jQuery('.gt3_js_transition').each(function(){
			var transition_time = jQuery(this).attr('data-transition') + 'ms';
			jQuery(this).css({'transition-duration': transition_time});
		});
	}

	if (jQuery('.personal_preloader').size() > 0) {
		if (jQuery('.gt3_preloader_content').size() > 0) {
			jQuery('.gt3_preloader_content').remove();
		}
		init_personal_preloader();
	}

	if (jQuery('.global_count_wrapper').size() > 0 ) {
		html.addClass('page_coming_soon');
		jQuery('.bg_coundown').css('background-image', 'url('+ jQuery('.bg_coundown').attr('data-bg') +')');
	}
	jQuery('.nivoSlider').each(function(){
		jQuery(this).nivoSlider({
			directionNav: true,
			controlNav: false,
			effect:'fade',
			pauseTime:4000,
			slices: 1
		});
	});
	if (aside_menu.size() > 0) {
		var set_column_width = 100/aside_menu.children('li').size();
		aside_menu.children('li').css('width', set_column_width+'%');
	}

	aside_menu_nav.on('mousewheel',function(event){
		if (jQuery(this).hasClass('overflowed_menu')) {
			deltaY = event.originalEvent.deltaY;
			menuStep = -1 * deltaY * 10;
			var thisObj = aside_menu;
			var menuGround = aside_menu_nav.height() - thisObj.height();
			thisObj.removeClass('reached_top');
			thisObj.removeClass('reached_ground');
			var menuThisTop = parseInt(thisObj.css('top'));
			if (deltaY > 0) {
				if ((menuThisTop + menuStep) > menuGround) {
					thisObj.css('top', menuThisTop + menuStep + 'px');
				} else {
					thisObj.css('top', menuGround + 'px');
					thisObj.addClass('reached_ground');
				}
			}
			if (deltaY < 0) {
				if (menuThisTop + menuStep < 0) {
					thisObj.css('top', menuThisTop + menuStep + 'px');
				} else {
					thisObj.css('top', '0px');
					thisObj.addClass('reached_top');
				}
			}
			event.preventDefault();
		}
	});
	jQuery('.header_search_toggler').on('click',function(){
		jQuery('.header_tagline').toggleClass('show_header_search');
	});

	function gt3_popup_video () {
		if (jQuery(".swipebox-video").length) {
			jQuery( '.swipebox-video' ).swipebox( {
				useCSS : true, // false will force the use of jQuery for animations
				useSVG : true, // false to force the use of png for buttons
				initialIndexOnArray : 0, // which image index to init when a array is passed
				hideCloseButtonOnMobile : false, // true will hide the close button on mobile devices
				removeBarsOnMobile : true, // false will show top bar on mobile devices
				hideBarsDelay : 3000, // delay before hiding bars on desktop
				videoMaxWidth : 1140,
				autoplayVideos: false,
				beforeOpen: function() {}, // called before opening
				afterOpen: null, // called after opening
				afterClose: function() {}, // called after closing
				loopAtEnd: false // true will return to the first image after the last image is reached
			} );
		}
	}
	//Back2Top
	if (myWindow.scrollTop() > 0) {
		jQuery('.back2top').addClass('show2top');
	} else {
		jQuery('.back2top').removeClass('show2top');
	}
	myWindow.on('scroll', function(){
		if (myWindow.scrollTop() > 0) {
			jQuery('.back2top').addClass('show2top');
		} else {
			jQuery('.back2top').removeClass('show2top');
		}
	});
	jQuery('.back2top').on('click', function(){
		jQuery('html, body').stop().animate({scrollTop: 0}, 400);
	});
	jQuery('.featured_video_play').on('click', function(){
		jQuery(this).parents('.featured_video_wrapper').addClass('show_video');
		jQuery(this).parents('.featured_video_wrapper').find('iframe')[0].src += "&autoplay=1";
	});

	// GT3 Flicker Widget
	gt3_flickr_widget ();

	// Coming Soon
	if (jQuery('#countdown').size() > 0) {
		var year = jQuery('.countdown_wrapper').data('year'),
			month = jQuery('.countdown_wrapper').data('month'),
			day = jQuery('.countdown_wrapper').data('day');

		var austDay = new Date(year, month-1, day); //year, month-1, day
		jQuery('#countdown').countdown({
			until: austDay,
			padZeroes: true
		});
	}

	// Sidebar hover
	if (jQuery('.sidepanel').size() > 0) {
		jQuery('.sidepanel').each(function () {
			jQuery(this).find('li > a').mouseenter(function(){
				jQuery(this).parent().addClass('active_list_item');
			}).mouseleave(function(){
				jQuery(this).parent().removeClass('active_list_item');
			});
		});
	}

	// GT3 Counter
	if (jQuery('.gt3_module_counter').length) {
		gt3_initCounter();
	}

	// GT3 Message Box
	if (jQuery('.gt3_message_box').length) {
		gt3_message_close();
	}

	// GT3 Testimonials List
	gt3_testimonials_list ();

	// Gt3 ajax_sorting
	var ajax_sorting_block_html = jQuery('.ajax_sorting_block');
	if (ajax_sorting_block_html.length) {
		ajax_sorting_block_html.each(function(){
			jQuery(".load_more_works").on("click", function(){

				var this_parent_container = jQuery(this).parents('.gt3_module_portfolio'),
					append_container = this_parent_container.find('.ajax_sorting_block'),
					posts_per_page = append_container.attr('data-posts_per_page'),
					view_type = append_container.attr('data-view_type'),
					posts_per_line = append_container.attr('data-posts_per_line'),
					post_type_terms = append_container.attr('data-post_type_terms'),
					order = append_container.attr('data-order'),
					orderby = append_container.attr('data-orderby'),
					image_proportions = append_container.attr('data-image_proportions'),
					items_per_click = append_container.attr('data-items_per_click'),
					posts_already_showed = append_container.attr('data-already_showed');

				gt3_get_posts("gt3_get_posts", this_parent_container, append_container, "portfolio", items_per_click, posts_already_showed, view_type, posts_per_line, post_type_terms, order, orderby, image_proportions);

				posts_already_showed = parseInt(posts_already_showed, 10) + parseInt(items_per_click, 10);
				append_container.attr('data-already_showed', posts_already_showed);
				return false;
			});
		});
	}

	// Flexslider Update
	gt3_flex_update();

	// Landing
	var landing_tag = jQuery('.landing_container'),
		small_circle_landing_tag = jQuery('.small_circle_landing');
	if (landing_tag.length) {
		var landing_img_url = landing_tag.attr('data-src');
		landing_tag.css('background-image', 'url("'+landing_img_url+'")');
		var small_circle_h = small_circle_landing_tag.width() + 30,
			large_circle_w = jQuery('.large_circle_landing').width()/2*0.7071;
		small_circle_landing_tag.find('a').css({'height': small_circle_h + 'px', 'line-height': small_circle_h + 'px', 'width': small_circle_h + 'px'});
		small_circle_landing_tag.css({'margin-left': large_circle_w + 'px', 'margin-top': large_circle_w + 'px'});
	}

	gt3_team_isotope();
	gt3_team_load_more_init();


	// GT3 Popup Video
	gt3_popup_video ();

});


jQuery(window).load(function() {
	gt3_isotope_team ();
	gt3_fullWidthRow();
});

function gt3_fullWidthRow() {
	var $document_width  = jQuery(window).width();
	jQuery(window).unbind("resize.vcRowBehaviour").off("resize.vcRowBehaviour");

	if ($document_width > 960){
		var gap = 100;
	}
	if ( gap && jQuery('.aside_menu_block').length ){
		var $elements = jQuery('[data-vc-full-width="true"]');
		jQuery.each($elements, function(key, item) {
			var $el = jQuery(this);
			$el.addClass("vc_hidden");
			var $el_full = $el.next(".vc_row-full-width"),
				$el_rev_slider 	= $el.find('.rev_slider_wrapper');
			if ( $el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")),$el_full.length) {
				var el_margin_left = parseInt($el.css("margin-left"), 10),
					el_margin_right = parseInt($el.css("margin-right"), 10);
				if ( !$el_rev_slider.length /*&& !$el.hasClass('vc_row-no-padding') && !$el.hasClass('vc_row-padding-gap')*/ ) {
					var offset = 0 - $el_full.offset().left - el_margin_left + parseInt(gap),
						width = $document_width - gap;
				}else{
					var offset = 0 - $el_full.offset().left - el_margin_left,
						width = $document_width;
					if ($el_rev_slider.length) {
						$el.addClass('gt3_detect_rev_slider');
					}
				}

				if ($el.css({
					position: "relative",
					left: offset,
					"box-sizing": "border-box",
					width: width
				}),
				!$el.data("vcStretchContent")) {
					var padding = -1 * offset;
					0 > padding && (padding = 0);
					var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
					0 > paddingRight && (paddingRight = 0),
					$el.css({
						"padding-left": padding + "px",
						"padding-right": paddingRight + "px"
					})
				}
				$el.attr("data-vc-full-width-init", "true"),
				$el.removeClass("vc_hidden"),
				jQuery(document).trigger("vc-full-width-row-single", {
					el: $el,
					offset: offset,
					marginLeft: el_margin_left,
					marginRight: el_margin_right,
					elFull: $el_full,
					width: width
				})
			}
		}),
		jQuery(document).trigger("vc-full-width-row", $elements);
	}
}

function init_personal_preloader() {
	if (jQuery('.shift_block2preload').size() > 0) {
		//Run Preloading Shift Items
		init_pp4shift();
	}
	if (jQuery('.fs_block2preload').size() > 0) {
		init_pp4fs_slider();
	}
	if (jQuery('.stripe_block2preload').size() > 0) {
		init_pp4stripe_slider();
	}
	if (jQuery('.flow_block2preload').size() > 0) {
		init_pp4flow_slider();
	}
	if (jQuery('.ribbon_block2preload').size() > 0) {
		init_pp4ribbon_slider();
	}
	if (jQuery('.circles_block2preload').size() > 0) {
		init_pp4circles_slider();
	}
}
function init_pp4ribbon_slider() {
	if (jQuery('.ribbon_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.ribbon_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('ribbon_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4ribbon_slider();
				});
			};
		}(new Image(), $this_obj.find('img').attr('src')));

		if ($this_obj.parents('.ribbon_slider_wrapper').find('.ribbon_slide1').hasClass('block_loaded') && !$this_obj.parents('.ribbon_slider_wrapper').find('.ribbon_slider').hasClass('started')) {
			$this_obj.parents('.ribbon_slider_wrapper').find('.ribbon_slider').addClass('started');
			setup_ribbon($this_obj.parents('.ribbon_slider_wrapper').attr('data-uniqid'));
		}
	}
}

function init_pp4flow_slider() {
	if (jQuery('.flow_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.flow_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('flow_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4flow_slider();
				});
			};
		}(new Image(), $this_obj.find('img').attr('src')));

		if ($this_obj.parents('.flow_slider_wrapper').find('.flow_slide1').hasClass('block_loaded') && !$this_obj.parents('.flow_slider_wrapper').find('.flow_slider').hasClass('started')) {
			$this_obj.parents('.flow_slider_wrapper').find('.flow_slider').addClass('started');
			setup_flow($this_obj.parents('.flow_slider_wrapper').attr('data-uniqid'));
		}
		if ($this_obj.parents('.flow_slider_wrapper').find('.flow_block2preload').size() < 1) {
			$this_obj.parents('.flow_slider').removeClass('wait4load').animate({
				'z-index': '3'
			}, 500, function() {
				flow_slider.removeClass('wait4load2');
			});
		}
	} else {
		flow_slider.removeClass('wait4load').animate({
			'z-index': '3'
		}, 500, function() {
			flow_slider.removeClass('wait4load2');
		});
	}
}

function init_pp4circles_slider() {
	if (jQuery('.circles_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.circles_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('circles_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4circles_slider();
				});
			};
		}(new Image(), $this_obj.find('img').attr('src')));

		if ($this_obj.parents('.circles_slider_wrapper').find('.circles_slide1').hasClass('block_loaded') && !$this_obj.parents('.circles_slider_wrapper').find('.circles_slider').hasClass('started')) {
			$this_obj.parents('.circles_slider_wrapper').find('.circles_slider').addClass('started');
			setup_circles($this_obj.parents('.circles_slider_wrapper').attr('data-uniqid'));
		}
		if ($this_obj.parents('.circles_slider_wrapper').find('.circles_block2preload').size() < 1) {
			setup_circles($this_obj.parents('.circles_slider_wrapper').attr('data-uniqid'));
			$this_obj.parents('.circles_slider').removeClass('wait4load');
		}
	} else {
		setup_circles('all');
		circles_slider.removeClass('wait4load');
	}
}
function init_pp4stripe_slider() {
	if (jQuery('.stripe_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.stripe_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.attr('style', 'background-image:url('+ $this_obj.attr('data-src') +')').removeClass('stripe_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4stripe_slider();
				});
			};
		}(new Image(), $this_obj.attr('data-src')));

		if ($this_obj.parents('.stripe_gallery_wrapper').find('.stripe_slide1').hasClass('block_loaded') && !$this_obj.parents('.stripe_gallery_wrapper').find('.stripe_slider').hasClass('started')) {
			$this_obj.parents('.stripe_gallery_wrapper').find('.stripe_slider').addClass('started');
			setup_stripe_gallery($this_obj.parents('.stripe_gallery_wrapper').attr('data-uniqid'));
		}
	} else {
		stripe_slider.removeClass('wait4load');
	}
}

function init_pp4fs_slider() {
	if (jQuery('.fs_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.fs_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('fs_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4fs_slider();
				});
			};
		}(new Image(), $this_obj.attr('data-src')));

		if ($this_obj.parents('.fs_gallery_wrapper').find('.fs_slide1').hasClass('block_loaded') && !$this_obj.parents('.fs_gallery_wrapper').find('.fs_slider').hasClass('started')) {
			$this_obj.parents('.fs_gallery_wrapper').find('.fs_slider').addClass('started');
			setup_fs_gallery($this_obj.parents('.fs_gallery_wrapper').attr('data-uniqid'));
		}
	} else {
		fs_slider.removeClass('wait4load');
	}
}
function init_pp4shift() {
	if (jQuery('.shift_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.shift_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('shift_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4shift();
				});
			};
		}(new Image(), $this_obj.attr('data-src')));

		if (($this_obj.parents('.shift_gallery_wrapper').find('.odd_slide1').hasClass('block_loaded') && $this_obj.parents('.shift_gallery_wrapper').find('.even_slide1').hasClass('block_loaded')) && !$this_obj.parents('.shift_gallery_wrapper').find('.shift_gallery').hasClass('started')) {
			$this_obj.parents('.shift_gallery_wrapper').find('.shift_gallery').addClass('started');
			setup_shift_gallery($this_obj.parents('.shift_gallery_wrapper').attr('data-uniqid'));
		}
	} else {
		shift_gallery_wrapper.find('.shift_gallery').removeClass('wait4load');
	}
}

jQuery(window).resize(function() {
	gt3_content_update();
	if(jQuery('.swipebox').size() > 0) {
	}

	gt3_fullWidthRow();

	// Portfolio Masonry
	gt3_portfolio_is_masonry()

	// Flexslider Update
	gt3_flex_update();

	// Landing
	var landing_tag = jQuery('.landing_container'),
		small_circle_landing_tag = jQuery('.small_circle_landing');
	if (landing_tag.length) {
		var large_circle_w = jQuery('.large_circle_landing').width()/2*0.7071;
		small_circle_landing_tag.css({'margin-left': large_circle_w + 'px', 'margin-top': large_circle_w + 'px'});
	}
});
jQuery(window).load(function() {
	gt3_content_update();

	// Gt3 ajax_sorting
	var ajax_sorting_block_html = jQuery('.ajax_sorting_block');
	if (ajax_sorting_block_html.length) {
		ajax_sorting_block_html.each(function(){

			var this_parent_container = jQuery(this).parents('.gt3_module_portfolio'),
				append_container = this_parent_container.find('.ajax_sorting_block'),
				posts_per_page = append_container.attr('data-posts_per_page'),
				view_type = append_container.attr('data-view_type'),
				posts_per_line = append_container.attr('data-posts_per_line'),
				post_type_terms = append_container.attr('data-post_type_terms'),
				order = append_container.attr('data-order'),
				orderby = append_container.attr('data-orderby'),
				image_proportions = append_container.attr('data-image_proportions'),
				items_per_click = append_container.attr('data-items_per_click'),
				posts_already_showed = append_container.attr('data-already_showed');

			gt3_get_posts("gt3_get_posts", this_parent_container, append_container, "portfolio", posts_per_page, posts_already_showed, view_type, posts_per_line, post_type_terms, order, orderby, image_proportions);
			posts_already_showed = parseInt(posts_already_showed, 10) + parseInt(posts_per_page, 10);
			append_container.attr('data-already_showed', posts_already_showed);
		});
		ajax_sorting_block_html.isotope();
		ajax_sorting_block_html.isotope("layout");
		setTimeout("jQuery('.ajax_sorting_block').isotope('layout')", 500);
	}

	// Portfolio Masonry
	gt3_portfolio_is_masonry();
	var module_portfolio_html = jQuery('.gt3_module_portfolio');
	if (module_portfolio_html.length) {
		module_portfolio_html.each(function() {
			jQuery(this).find(".optionset li").eq(0).find("a").click();
		});
	}

	// Flexslider Update
	gt3_flex_update();

	if (jQuery('.contentarea .wpb_flexslider').length) {
		jQuery('.wpb_flexslider .flex-control-nav').fadeIn();
	}

	// Landing
	var landing_tag = jQuery('.landing_container');
	if (landing_tag.length) {
		landing_tag.addClass('landing_ready');
	}

});

function gt3_content_update() {
	//Aside Menu Update
	if (aside_menu_nav.size() > 0) {
		var set_aside_nav_height = jQuery('.aside_menu_block').height() - jQuery('.aside_menu_block_top').height() - jQuery('.aside_menu_footer').height();
		aside_menu_nav.height(set_aside_nav_height);
		if (aside_menu_nav.find('ul.menu').height() > set_aside_nav_height) {
			aside_menu_nav.addClass('overflowed_menu');
			aside_menu_nav.removeClass('contained_menu');

			var thisObj = aside_menu;
			var menuGround = aside_menu_nav.height() - thisObj.height();
			thisObj.removeClass('reached_top');
			thisObj.removeClass('reached_ground');
			var menuThisTop = parseInt(thisObj.css('top'));

			if (menuThisTop <= menuGround) {
				thisObj.addClass('reached_ground');
			}
			if (menuThisTop >= 0) {
				thisObj.addClass('reached_top');
			}
		} else {
			aside_menu_nav.addClass('contained_menu');
			aside_menu_nav.removeClass('overflowed_menu');
		}
	}
	if (aside_header_title.size() > 0) {
		var btn_menu_height = jQuery('.aside_header .btn_menu').height() + parseInt(jQuery('.aside_header .btn_menu').css('margin-top')),
			socials_height = jQuery('.aside_header .header_socials').height() + parseInt(jQuery('.aside_header .header_socials').css('margin-bottom')),
			setTop = (jQuery('.aside_header').height() - btn_menu_height - socials_height)/2 + btn_menu_height;
		aside_header_title.css('top', setTop+'px');
	}
	if (header_holder.size() > 0) {
		header_holder.height(header.height());
	}
	if(jQuery('.gt3_js_width').size() > 0) {
		jQuery('.gt3_js_width').each(function(){
			if (jQuery(this).attr('data-width') == '100%') {
				jQuery(this).css('width', '100%');
			} else {
				jQuery(this).width(parseInt(jQuery(this).attr('data-width')));
			}
		});
	}
	if (jQuery('.gt3_stripes').size() > 0) {
		if (myWindow.width() > 760) {
			jQuery('.gt3_stripes').each(function(){
				var set_width = Math.floor(jQuery(this).width()/jQuery(this).find('.gt3_stripe').size());
				jQuery(this).find('.gt3_stripe').width(set_width);
			});
		} else {
			jQuery('.gt3_stripes').each(function(){
				var set_height = Math.floor(jQuery(this).height()/jQuery(this).find('.gt3_stripe').size());
				jQuery(this).find('.gt3_stripe').height(set_height);
			});
		}
	}
	if(jQuery('.gt3_js_height').size() > 0) {
		jQuery('.gt3_js_height').each(function(){
			if (jQuery(this).attr('data-height') == '100%') {
				jQuery(this).height(jQuery(window).height());
				if (jQuery(this).find('.gt3_js_height_child').size() > 0) {
					jQuery(this).find('.gt3_js_height_child').height(jQuery(window).height());
				}
			} else {
				jQuery(this).height(parseInt(jQuery(this).attr('data-height')));
				if (jQuery(this).find('.gt3_js_height_child').size() > 0) {
					jQuery(this).find('.gt3_js_height_child').height(parseInt(jQuery(this).attr('data-height')));
				}
			}
		});
	}
	if (jQuery('.thumbs_grid_gallery').size() > 0) {
		jQuery('.thumbs_grid_gallery').each(function(){
			var set_pad = parseInt(jQuery(this).attr('data-pad'))/2;
			jQuery(this).css('margin', -1*set_pad+'px');
			jQuery(this).find('.thumbs_grid_item').css('margin', set_pad+'px');
		});
	}
	if (jQuery('.gt3_related_posts').size() > 0) {
		jQuery('.gt3_related_posts').each(function(){
			var set_pad = -1*parseInt(jQuery(this).attr('data-pad'));
			jQuery(this).css('margin-left', set_pad+'px');
		});
	}
	if (jQuery('.gt3_related_post_item_inner').size() > 0) {
		jQuery('.gt3_related_post_item_inner').each(function(){
			var set_pad = parseInt(jQuery(this).attr('data-pad'));
			jQuery(this).css('padding-left', set_pad+'px');
		});
	}
	if (jQuery('.gt3_home_promo').size() > 0) {
		jQuery('.gt3_home_promo').each(function(){
			var setHeight = myWindow.height();
			if (jQuery('#wpadminbar').size() > 0) {
				setHeight = setHeight - jQuery('#wpadminbar').height();
			}
			jQuery(this).height(setHeight);
		});
	}
}

// GT3 Flicker Widget
function gt3_flickr_widget () {
	if (jQuery('.flickr_widget_wrapper').length) {
		jQuery('.flickr_widget_wrapper').each(function () {
			var flickrid = jQuery(this).attr('data-flickrid');
			var widget_id = jQuery(this).attr('data-widget_id');
			var widget_number = jQuery(this).attr('data-widget_number');
			jQuery(this).addClass('flickr_widget_wrapper_'+flickrid);

			jQuery.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id="+widget_id+"&lang=en-us&format=json&jsoncallback=?", function(data){
				jQuery.each(data.items, function(i,item){
					if(i<widget_number){
						jQuery("<img/>").attr("src", item.media.m).appendTo(".flickr_widget_wrapper_"+flickrid).wrap("<div class=\'flickr_badge_image\'><a href=\'" + item.link + "\' target=\'_blank\'></a></div>");
					}
				});
			});
		});
	}
}

function mouseStop() {
	html.removeClass('mouse_move');
}

// -------------------- //
// --- GT3 COMPOSER --- //
// -------------------- //

// GT3 Counter
function gt3_initCounter() {
	if (jQuery('.gt3_module_counter').length) {
		if (jQuery(window).width() > 760) {
			var waypoint = new Waypoint({
				element: document.getElementsByClassName('gt3_module_counter'),
				handler: function(direction) {},
				offset: 'bottom-in-view'
			});
			waypoint.context.refresh();

			jQuery('.gt3_module_counter').each(function(){
				if (jQuery(this).offset().top < jQuery(window).height()) {
					var cur_this = jQuery(this);
					if (!jQuery(this).hasClass('done')) {
						var stat_count = cur_this.find('.stat_count'),
							set_count = stat_count.attr('data-value'),
							counter_suffix = stat_count.attr('data-suffix'),
							counter_prefix = stat_count.attr('data-prefix');

						jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
							var data = Math.floor(now);
							stat_count.text(counter_prefix + data + counter_suffix);
						}
						});
						jQuery(this).addClass('done');
					}
				} else {
					var cur_this = jQuery(this);
					jQuery(this).waypoint(function(){
						if (!cur_this.hasClass('done')) {
							var stat_count = cur_this.find('.stat_count'),
								set_count = stat_count.attr('data-value'),
								counter_suffix = stat_count.attr('data-suffix'),
								counter_prefix = stat_count.attr('data-prefix');
							cur_this.find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
								var data = Math.floor(now);
								stat_count.text(counter_prefix + data + counter_suffix);
							}
							});
							cur_this.addClass('done');
						}
					},{offset: 'bottom-in-view'});
				}
			});
		} else {
			jQuery('.gt3_module_counter').each(function(){
				var stat_count = jQuery(this).find('.stat_count'),
					set_count = stat_count.attr('data-value'),
					counter_suffix = stat_count.attr('data-suffix'),
					counter_prefix = stat_count.attr('data-prefix');
				jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
					var data = Math.floor(now);
					stat_count.text(counter_prefix + data + counter_suffix);
				}
				});
			},{offset: 'bottom-in-view'});
		}
	}
}

// GT3 Message Box
function gt3_message_close(){
	jQuery(".gt3_message_box-closable").each(function(){
		var element = jQuery(this);
		element.find('.gt3_message_box__close').on('click',function(){
			element.slideUp(300);
		})
	})
}

// Gt3 Testimonials
function gt3_testimonials_list () {
	if (jQuery('.module_testimonial.active-carousel').length) {
		jQuery('.module_testimonial.active-carousel').each(function(){
			var cur_slidesToShow = jQuery(this).attr('data-slides-per-line')*1;
			var cur_sliderAutoplay = jQuery(this).attr('data-autoplay-time')*1;
			var cur_fade = jQuery(this).attr('data-slider-fade') == 1;
			jQuery(this).find('.testimonials_rotator').slick({
				slidesToShow: cur_slidesToShow,
				slidesToScroll: cur_slidesToShow,
				autoplay: true,
				autoplaySpeed: cur_sliderAutoplay,
				speed: 500,
				dots: true,
				fade: cur_fade,
				focusOnSelect: true,
				arrows: false,
				infinite: true,
				asNavFor: jQuery(this).find('.testimonials-photo-wrapper'),
				responsive: [
				{
				  breakpoint: 800,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
				]
			});
			jQuery(this).find('.testimonials-photo-wrapper').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: jQuery(this).find('.testimonials_rotator'),
				dots: false,
				centerMode: true,
				focusOnSelect: true
			})
		});
	}
}

// Post Likes
jQuery(document).on("click", ".post_likes_add", function(event) {
	var gallery_likes_this = jQuery(this);
	if (!jQuery.cookie(gallery_likes_this.attr('data-modify')+gallery_likes_this.attr('data-attachid'))) {
		jQuery.post(gt3_ajaxurl, {
			action:'add_like_attachment',
			attach_id:jQuery(this).attr('data-attachid')
		}, function (response) {
			jQuery.cookie(gallery_likes_this.attr('data-modify')+gallery_likes_this.attr('data-attachid'), 'true', { expires: 7, path: '/' });
			gallery_likes_this.addClass('already_liked');
			gallery_likes_this.find('i').removeClass('fa-heart-o').addClass('fa-heart');
			gallery_likes_this.find('span').text(response);
		});
	}
});

// Portfolio Ajax
function gt3_get_posts(action, this_parent_container, append_container, post_type, posts_count, posts_already_showed, template, posts_per_line, selected_terms, order, orderby, image_proportions) {
	jQuery.post(gt3_ajaxurl, {
		action: action,
		post_type: post_type,
		posts_count: posts_count,
		posts_already_showed: posts_already_showed,
		template: template,
		posts_per_line: posts_per_line,
		selected_terms: selected_terms,
		orderby: orderby,
		image_proportions: image_proportions,
		order: order
	})
	.done(function (data) {
		if (data.length < 1) {
			this_parent_container.find(".load_more_works").hide("fast").parent().addClass("all_loaded");
		}
		append_container.isotope("insert", jQuery(data), function () {
			append_container.isotope("layout");
			setTimeout("jQuery('.ajax_sorting_block').isotope('layout')", 1000);
		});
		if (jQuery('.ajax_sorting_block').length) {
			jQuery('.ajax_sorting_block').isotope("layout");
			setTimeout("jQuery('.ajax_sorting_block').isotope('layout')", 1000);
		}
	});
}

// Portfolio Masonry
function gt3_portfolio_is_masonry() {
	var module_portfolio_html = jQuery('.gt3_module_portfolio');
	if (module_portfolio_html.length) {
		module_portfolio_html.each(function() {
			if (jQuery(this).find('.filter_block').length && jQuery(this).find('.ajax_sorting_block').length) {
				jQuery(this).find(".optionset li a").on("click", function(){
					jQuery(this).parents('.gt3_module_portfolio').find(".optionset li a").removeClass("selected");
					jQuery(this).parents('.gt3_module_portfolio').find(".optionset li").removeClass("selected");
					jQuery(this).addClass("selected");
					jQuery(this).parent().addClass("selected");
					var filterSelector = jQuery(this).attr("data-option-value");
					jQuery(this).parents('.gt3_module_portfolio').find(".sorting_block").isotope({
						filter: filterSelector
					});
					return false;
				});
			} else {
				jQuery(this).find('.sorting_block').isotope();
			}
		});
	}
}

// Flexslider Update
function gt3_flex_update() {
	if (jQuery('.contentarea .wpb_flexslider').length) {
		jQuery('.contentarea .wpb_flexslider').each(function() {
			var img_h = jQuery(this).find('img').height();
			jQuery(this).height(img_h);
		});
	}
}

function gt3_isotope_team () {
	if (jQuery(".isotope").length) {
		jQuery(".isotope").isotope({
			itemSelector: ".item-team-member, .gt3_practice_list__item"
		});
		setTimeout(function(){
			jQuery(".isotope").addClass('isotope_loaded');
		},100);

	}
	jQuery(window).on('resize', function() {
		jQuery(".isotope").each(function () {
			jQuery(this).isotope({
				itemSelector: ".item-team-member, .gt3_practice_list__item"
			})
		})
	})
	jQuery(".isotope-filter a").on("click", function (e){
		e.preventDefault();
		var data_filter = this.getAttribute("data-filter");
		jQuery(this).siblings().removeClass("active");
		jQuery(this).addClass("active");
		var grid = this.parentNode.nextElementSibling;
		jQuery(grid).isotope({ filter: data_filter });
	});
}

// team
function gt3_team_isotope(){
	jQuery('.gt3_team_list__posts-container').each(function(){
		var element = jQuery(this);
		var layoutMode = element.hasClass('isotope_packery') ? 'masonry' : 'fitRows';

		element.find('.gt3_team_list__item:not(.image_loaded)').each(function(){
			var element_item = jQuery(this);
			element_item.find('img').imagesLoaded().always(function(instance ){
				jQuery(instance.elements).parents('.gt3_team_list__item').addClass('image_loaded');
			})
		})

		element.isotope({
			itemSelector: '.gt3_team_list__item',
			percentPosition: true,
			masonry: {
				columnWidth: '.gt3_team_list__grid-sizer',
				gutter: '.gt3_team_list__grid-gutter'
			}
		});

		element.imagesLoaded(function(){
			element.isotope({
				itemSelector: '.gt3_team_list__item',
				percentPosition: true,
				masonry: {
					columnWidth: '.gt3_team_list__grid-sizer',
					gutter: '.gt3_team_list__grid-gutter'
				}
			});
		});

		element.parent('.gt3_team_list').find(".gt3_team_list__filter.isotope-filter a").on( 'click', function(){
			var filter_item = jQuery(this);
			filter_item.siblings().removeClass('active');
			filter_item.addClass("active");
			var selector = filter_item.attr('data-filter');
			element.isotope({
				filter: selector
			});
			return false;
		});
	})
}

function gt3_team_load_more_init (){
	var gt3_team_list = jQuery('.gt3_team_list');
	if (gt3_team_list.length) {
		gt3_team_list.each(function(){
			var element = jQuery(this);
			var loadMoreButton = element.find('.gt3_team_load_more');
			var teamContainer = element.find('.gt3_team_list__posts-container');
			var nextPage = 2;
			var max_num_pages = 3;
			if (typeof teamContainer.data('max_num_pages') !== 'undefined' && teamContainer.data('max_num_pages') !== false) {
				max_num_pages = teamContainer.data('max_num_pages');
			}

			loadMoreButton.on('click', function (e) {
				loadMoreButton.addClass('loading');
				e.preventDefault();
				e.stopPropagation();
				if (nextPage <= max_num_pages) {
					var ajaxData = {
						action: 'gt3_get_team_item_from_ajax',
						build_query: teamContainer.attr('data-build_query'),
						team_style: teamContainer.attr('data-team_style'),
						posts_per_line: teamContainer.attr('data-posts_per_line'),
						items_load: teamContainer.attr('data-items_load'),
						post_count: teamContainer.attr('data-post_count')
					};
					ajaxData['next_page'] = nextPage;
					jQuery.ajax({
						type: 'POST',
						data: ajaxData,
						url: ajaxurl,
						success: function (data) {
							loadMoreButton.removeClass('loading');
							if (data != '') {
								var response = jQuery.parseJSON(data);
								var responseHtml = response.html;
								var img_loader = imagesLoaded( teamContainer );
								img_loader.on( "always", function (){
									setTimeout(function() {
										teamContainer
											.append( jQuery(responseHtml) )
											.isotope( 'appended', jQuery(responseHtml) )
											.isotope('reloadItems');
										teamContainer.find('.gt3_team_list__item:not(.image_loaded)').each(function(){
											jQuery(this).imagesLoaded().always(function(instance ){
												jQuery(instance.elements).addClass('image_loaded');
											})
										})
										setTimeout(function(){
											teamContainer.isotope({sortby: 'original-order'});
										},100)
									},200);
								});
								if (Number(response.items_left) <= '0') {
									loadMoreButton.hide(300);
								}
								teamContainer.attr('data-post_count',Number(ajaxData.post_count) + Number(ajaxData.items_load));
							}
						}
					});
				}
			})
		})
	}
}


// youtube video
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerReady(event) {}
function onPlayerStateChange(event) {}
function stopVideo() {
	player.stopVideo();
}
function onYouTubeIframeAPIReady() {
	jQuery('.video_youtube_tag').each(function(){
		var uniqid = jQuery(this).attr('data-uniqid'),
			video_height = jQuery(this).attr('data-video_height'),
			videoid = jQuery(this).attr('data-videoid');

		new YT.Player('player'+uniqid+'', {
			height: video_height,
			width: '100%',
			playerVars: { 'autoplay': 0, 'controls': 1 },
			videoId: videoid,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	});
}