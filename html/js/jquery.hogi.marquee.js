"use strict";

(function($) {

	if (!window.console) {
		window.console = function() {
		}
	}

	$.fn.marquee = function(options) {
		var $marquee = $(this);
		var pause = false;
		var $container;
		var $containerInner;
		var $containerOuter;
		var innerContainerWidth = 0;
		var isNextOperator = false;
		var marqueeWidth = $marquee.width();
		var speed = 6;

		if (!initContainer())
			return false;

		function initContainer() {
			if (!$marquee || !$marquee.size())
				return false;

			$marquee.addClass("marquee");
			$containerInner = $marquee.find(options.container);

			if (!$containerInner || !$containerInner.size()) {
				console.log("container를 찾을 수 없습니다. [" + options.container + "]");

				return false;
			}

			$containerInner.wrap($("<div class=\"marquee-container\">"));
			$container = $containerInner.parent().wrap($("<div class=\"marquee-container-outer\">"));
			$containerOuter = $container.parent();
			$containerInner.addClass("marquee-container-inner");

			$containerInner.find(">*").each(function() {
				innerContainerWidth += $(this).outerWidth(true);
			});

			$containerInner.css({
				"width" : innerContainerWidth
			});

			$container.append($containerInner.clone());

			$container.css({
				"width" : innerContainerWidth * 2
			});

			if (options.speed && parseInt(options.speed) > 0)
				speed = parseInt(options.speed);

			return true;
		}

		initPrevAndNext();

		function initPrevAndNext() {
			if (options.prev) {
				var $prev;

				if (typeof options.prev === 'object')
					$prev = options.prev;
				else
					$prev = $marquee.find(options.prev);

				if ($prev && $prev.size()) {
					$prev.on("mouseenter", function() {
						isNextOperator = true;
					});
				}
			}
			if (options.next) {
				var $next;

				if (typeof options.next === 'object')
					$next = options.next;
				else
					$next = $marquee.find(options.next);

				if ($next && $next.size()) {
					$next.on("mouseenter", function() {
						isNextOperator = false;
					});
				}
			}
		}

		setInterval(function() {
			if (pause)
				return;

			var left = parseInt($container.css("left"));

			if (isNextOperator && left < -innerContainerWidth) {
				left = 0;
			} else if (!isNextOperator && left > marqueeWidth - innerContainerWidth) {
				left = marqueeWidth - innerContainerWidth * 2;
			}

			if (isNextOperator) {
				$container.css("left", left - 1);
			} else {
				$container.css("left", left + 1);
			}
		}, speed);

		$containerOuter.on("mouseenter", function() {
			pause = true;
		});

		$containerOuter.on("mouseleave", function() {
			pause = false;
		});
	}

})(jQuery);