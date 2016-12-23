(function( $ ) {
	$.fn.slide = function(option) {
		var defaults = {
			slider:'slider-list',
			sliderItem: 'slider-item',
			dotsItem: 'slider-dots',
			arrowItem: 'slider-arrow',
			dots: 'true',
			arrows: 'true'
		};
		var option = $.extend({}, defaults, option);

		var $self = $(this);
		var $ul = $('.' + defaults.slider,this);
		var items = this.find('.' + defaults.sliderItem).length;
		var moveTo = function(amount,direction){
			$ul.css('transform','translateX(-'+ width * amount +'px)');
			if (direction === 'next') {
				$('.' + defaults.sliderItem +'.active').removeClass('active').next().addClass('active');
			} else if (direction === 'prev') {
				$('.' + defaults.sliderItem +'.active').removeClass('active').prev().addClass('active');
			} else if (direction === 'none') {
				$('.' + defaults.sliderItem +'.active').removeClass('active').addClass('active');
			}
		}
		var arrowDisable = function(){
			if ($('.' + defaults.sliderItem +'.active').is(':last-child')){
				$('.'+ defaults.arrowItem +'-prev button').prop('disabled',false);
				$('.'+ defaults.arrowItem +'-next button').prop('disabled',true);
			} else if ($('.' + defaults.sliderItem +'.active').is(':first-child')){
				$('.'+ defaults.arrowItem +'-next button').prop('disabled',false);
				$('.'+ defaults.arrowItem +'-prev button').prop('disabled',true);
			} else {
				$('.'+ defaults.arrowItem +'-prev button').prop('disabled',false);
				$('.'+ defaults.arrowItem +'-next button').prop('disabled',false);
			}
		}

		// データ属性で何番目か取得する
		$('.' + defaults.sliderItem,this).each(function(i){
			$(this).attr('data-index',i);
		});

		// 幅の取得
		var width = this.children().width();
		var itemsWidth = items * width;
		$('.' + defaults.sliderItem,this).width(width);
		$('.' + defaults.slider,this).width(itemsWidth);

		$('.' + defaults.sliderItem +':first-child').addClass('active');

		if ( defaults.arrows === 'true') {
			$(this).append('<ul class="'+ defaults.arrowItem +'"><li class="slider-arrow-prev"><button type="button">前へ</button></li><li class="slider-arrow-next"><button type="button">次へ</button></li></ul>');
			// 次に送る
			$('.'+ defaults.arrowItem +'-next button').click(function(){
				$('.'+ defaults.arrowItem +'-prev button').prop('disabled',false);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)+1;
				var direction = 'next';
				moveTo(amount,direction);
				arrowDisable();
			});

			// 前へ送る
			$('.'+ defaults.arrowItem +'-prev button').click(function(){
				$('.'+ defaults.arrowItem +'-next button').prop('disabled',false);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)-1;
				var direction = 'prev';
				moveTo(amount,direction);
				arrowDisable();
			});
		}

		//ドットナビゲーション
		if ( defaults.dots === 'true') {
			// ドットナビゲーションを追加する
			$(this).append('<ul class="'+ defaults.dotsItem +'"></ul>');
			// データ属性で何番目か取得する
			$('.' + defaults.sliderItem,this).each(function(i){
				$('.' +defaults.dotsItem).append('<li><button type="button" data-dots-item="'+i+'">'+i+'</button></li>');
			});
			$('.' +defaults.dotsItem + ' button',this).click(function(){
				$('.' +defaults.dotsItem + ' button').removeClass('active');
				$(this).addClass('active');

				var selectedItem = $(this).attr('data-dots-item');
				$('.' + defaults.sliderItem).removeClass('active');

				var $item = $('.' + defaults.sliderItem).removeClass('active');
				var attr = $('.' + defaults.sliderItem).attr('data-index');
				$('.' + defaults.sliderItem)
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


		return(this);

	};
})( jQuery );