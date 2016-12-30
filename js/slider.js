(function( $ ) {
	'use strict';
	$.fn.slide = function(option) {
		var defaults = {
			slider:'slider-list',
			sliderItem: 'slider-item',
			dotsItem: 'slider-dots',
			arrowItem: 'slider-arrow',
			dots: 'true',
			arrows: 'true',
			throttleTime: 200
		};

		var option = $.extend({}, defaults, option);

		var $self = $(this);
		var $ul = $('.' + option.slider,$self);
		var items = this.find('.' + option.sliderItem).length;
		var moveTo = function(amount,direction){
			$ul.css('transform','translateX(-'+ width * amount +'px)');
			if (direction === 'next') {
				$('.' + option.sliderItem +'.active',$self).removeClass('active').next().addClass('active');
				$('.'+ option.dotsItem + ' button.active',$self).removeClass('active').parent().next().find('button').addClass('active');
			} else if (direction === 'prev') {
				$('.' + option.sliderItem +'.active',$self).removeClass('active').prev().addClass('active');
				$('.'+ option.dotsItem + ' button.active',$self).removeClass('active').parent().prev().find('button').addClass('active');
			} else if (direction === 'none') {
				$('.' + option.sliderItem +'.active').removeClass('active').addClass('active');
			}
		}
		var arrowDisable = function(){
			if ($('.' + option.sliderItem +'.active',$self).is(':last-child')){
				$('.'+ option.arrowItem +'-prev button',$self).prop('disabled',false);
				$('.'+ option.arrowItem +'-next button',$self).prop('disabled',true);
			} else if ($('.' + option.sliderItem +'.active',$self).is(':first-child')){
				$('.'+ option.arrowItem +'-next button',$self).prop('disabled',false);
				$('.'+ option.arrowItem +'-prev button',$self).prop('disabled',true);
			} else {
				$('.'+ option.arrowItem +'-prev button',$self).prop('disabled',false);
				$('.'+ option.arrowItem +'-next button',$self).prop('disabled',false);
			}
		}
		var direction = '';
		var startX = 0;
		var swipe = function(action,event){
			if(action === 'start') {
				startX = event.originalEvent.touches[0].pageX;
			} else if (action === 'move') {
				var endX = event.originalEvent.touches[0].pageX;
				var diffX = Math.round(startX - endX);
				$self.data('diffX',diffX);
				var absX = Math.abs(diffX);
				if (diffX > 0) {
					direction = 'next';
					$self.data('direction',diffX);
				} else if (diffX < 0){
					direction = 'prev';
				}
			}
		}
		var swipeEnd = function(){
			if (direction == 'prev'){
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)-1;
				moveTo(amount,'prev');
				arrowDisable();
			} else if (direction === 'next'){
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)+1;
				moveTo(amount,'next');
				arrowDisable();
			}
		}



		// データ属性で何番目か取得する
		$('.' + option.sliderItem,this).each(function(i){
			$(this).attr('data-index',i);
		});

		// 幅の取得
		var width = this.children().width();
		var itemsWidth = items * width;
		$('.' + option.sliderItem,this).width(width);
		$('.' + option.slider,this).width(itemsWidth);

		$('.' + option.sliderItem +':first-child', $self).addClass('active');

		if ( option.arrows === 'true') {
			$(this).append('<ul class="'+ option.arrowItem +'"><li class="slider-arrow-prev"><button type="button">前へ</button></li><li class="slider-arrow-next"><button type="button">次へ</button></li></ul>');
			$('.' + option.arrowItem +'-prev button', $self).prop('disabled',true);
			// 次に送る
			$('.'+ option.arrowItem +'-next button',this).click(function(){
				$('.'+ option.arrowItem +'-prev button', $self).prop('disabled',false);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)+1;
				var direction = 'next';
				moveTo(amount,direction);
				arrowDisable();
			});

			// 前へ送る
			$('.'+ option.arrowItem +'-prev button',this).click(function(){
				$('.'+ option.arrowItem +'-next button', $self).prop('disabled',false);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)-1;
				var direction = 'prev';
				moveTo(amount,direction);
				arrowDisable();
			});
		}

		//ドットナビゲーション
		if ( option.dots === 'true') {
			// ドットナビゲーションを追加する
			$(this).append('<ul class="'+ option.dotsItem +'"></ul>');

			// データ属性で何番目か取得する
			$('.' + option.sliderItem,$self).each(function(i){
				$('.' +option.dotsItem,$self).append('<li><button type="button" data-dots-item="'+i+'">'+i+'</button></li>');
			});
			$('.' + option.dotsItem +' li:first-child button',$self).addClass('active');

			$('.' +option.dotsItem + ' button',$self).click(function(){
				$('.' +option.dotsItem + ' button',$self).removeClass('active');
				$(this).addClass('active');

				var selectedItem = $(this).attr('data-dots-item');
				$('.' + option.sliderItem,self).removeClass('active');

				var $item = $('.' + option.sliderItem,$self).removeClass('active');
				var attr = $('.' + option.sliderItem,$self).attr('data-index');
				$('.' + option.sliderItem,$self)
				.removeClass('active')
				.each(function(){
					if($(this).attr("data-index") === selectedItem){
						$(this).addClass("active");
					}
				});

				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem);
				var direction = 'none';
				moveTo(amount,direction);
				arrowDisable();
			});
		}


		$ul.on('touchstart',function(e){
			swipe('start',e);
		});

		$ul.on('touchmove',function(e){
			swipe('move',e);
		});

		$ul.on('touchend',function(e){
			swipeEnd();
		});

		var timer = false,
			afterTimer = false;
		$(window).resize(function(){
			if (timer !== false) {
				clearTimeout(timer);
				clearTimeout(afterTimer);
			}
			timer = setTimeout(function() {
				$ul.css('transition','none');
				width = $self.width();
				itemsWidth = items * width;
				$('.' + option.sliderItem,$self).width(width);
				$('.' + option.slider,$self).width(itemsWidth);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem);
				moveTo(amount,'none');
			}, option.throttleTime);
			afterTimer = setTimeout(function() {
				$ul.css('transition','');
			}, option.throttleTime + 1);
		});

		return(this);

	};
})( jQuery );
