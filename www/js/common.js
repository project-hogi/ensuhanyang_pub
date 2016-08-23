$(function() {
	$('.main_visual').each(function() {
		var $visual = $(this);
		var $visualContent = $('>.visual-content', $visual);
		var options = {
			slides : '>li',
			timeout : 2400,
			fx : 'fade',
			log : false,
			pauseOnHover : false,
			pagerActiveClass : 'on'
		};
		var $prev = $('.btn_prev', $visual).each(function() {
			options.prev = this;
		});
		var $next = $('.btn_next', $visual).each(function() {
			var $this = $(this);

			options.next = this;

			setTimeout(function() {
				$this.click();
			}, 1000);
		});
		var $pager = $('.btn_pager', $visual).each(function() {
			options.pager = this;
			options.pagerTemplate = '';
			options.pagerEvent = 'mouseover';
		});

		var $pauseAndPlay = $('.btn_pager_play', $visual);

		$pauseAndPlay.on("click", function(event) {
			event.preventDefault();

			if ($pauseAndPlay.hasClass("on")) {
				$pauseAndPlay.removeClass("on");
				$visualContent.cycle("resume");
			} else {
				$pauseAndPlay.addClass("on");
				$visualContent.cycle("pause");
			}
		});

		$visualContent.cycle(options);
	});

	var lan_ch = false;
	$("#language ul").hide()

	$("#language p").click(function() {
		if (lan_ch == false) {
			$("#language ul").slideDown()
			lan_ch = true;
		} else if (lan_ch == true) {
			$("#language ul").slideUp()
			lan_ch = false;
		}
	})

	$(".gnb li").mouseover(function() {
		$(this).siblings('li').removeClass("on");
		$(this).addClass("on");
	});

	$('.check_circle li').first().addClass('on')

	$('.notice ul li').hover(function() {
		$('.notice ul li').removeClass('on');
		$(this).addClass('on');
	});
	$('.notice ul li').on('mouseleave', function() {
		$('.notice ul li').removeClass('on');
	});

	/*
	 * $('.tab li').on('click',function(){ $('.tab li').removeClass('selected')
	 * $(this).addClass('selected'); })
	 */

	$('.sitemap_open').on('click', function() {
		$('body').addClass('on')
		$('.sitemap').css('display', 'block');
	})
	$('.sitemap_close').on('click', function() {
		$('body').removeClass('on');
		$('.sitemap').css('display', 'none');
	});

	$(".rolling").marquee({
		container : '>ul',
		prev : '.roll_prev',
		next : '.roll_next',
	});
})
