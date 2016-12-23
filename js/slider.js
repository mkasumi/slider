(function( $ ) {
	$.fn.slide = function(option) {
		var defaults = {
			slider:'.slider-list',
			dots: 'true',
			arrows: 'true'
		};
		var option = $.extend({}, defaults, option);

		var $self = $(this);
		var $ul = $(defaults.slider,this);
		var moveTo = function(amount,direction){
			$ul.css('transform','translateX(-'+ width * amount +'px)');
			if (direction === 'next') {
				$('.slider-item.active').removeClass('active').next().addClass('active');
			} else if (direction === 'prev') {
				$('.slider-item.active').removeClass('active').prev().addClass('active');
			} else if (direction === 'none') {
				$('.slider-item.active').removeClass('active').addClass('active');
			}
		}
		var arrowDisable = function(){
			if ($('.slider-item.active').is(':last-child')){
				$('.slider-arrow-prev button').prop('disabled',false);
				$('.slider-arrow-next button').prop('disabled',true);
			} else if ($('.slider-item.active').is(':first-child')){
				$('.slider-arrow-next button').prop('disabled',false);
				$('.slider-arrow-prev button').prop('disabled',true);
			} else {
				$('.slider-arrow-prev button').prop('disabled',false);
				$('.slider-arrow-next button').prop('disabled',false);
			}
		}

		var items = this.find('.slider-item').length;

		// データ属性で何番目か取得する
		$('.slider-item',this).each(function(i){
			$(this).attr('data-index',i);
			$('.slider-dots').append('<li><button type="button" data-dots-item="'+i+'">'+i+'</button></li>');
		});

		//ドットナビゲーション
		if ( defaults.dots === 'true') {
			// ドットナビゲーションを追加する
			$(this).append('<ul class="slider-dots"></ul>');
			$('.slider-dots button',this).click(function(){
				$('.slider-dots button').removeClass('active');
				$(this).addClass('active');

				var selectedItem = $(this).attr('data-dots-item');
				$('.slider-item').removeClass('active');

				var $item = $('.slider-item').removeClass('active');
				var attr = $('.slider-item').attr('data-index');
				$('.slider-item')
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

		// 幅の取得
		var width = this.children().width();
		var itemsWidth = items * width;
		$('.slider-item',this).width(width);
		$('.slider-list',this).width(itemsWidth);

		$('.slider-item:first-child').addClass('active');

		if ( defaults.arrows === 'true') {
			$(this).append('<ul class="slider-arrow"><li class="slider-arrow-prev"><button type="button">前へ</button></li><li class="slider-arrow-next"><button type="button">次へ</button></li></ul>');
			// 次に送る
			$('.slider-arrow-next button').click(function(){
				$('.slider-arrow-prev button').prop('disabled',false);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)+1;
				var direction = 'next';
				moveTo(amount,direction);
				arrowDisable();
			});

			// 前へ送る
			$('.slider-arrow-prev button').click(function(){
				$('.slider-arrow-next button').prop('disabled',false);
				var amountItem = $ul.find('.active').attr('data-index');
				var amount = parseInt(amountItem)-1;
				var direction = 'prev';
				moveTo(amount,direction);
				arrowDisable();
			});
		}

		return(this);

	};
})( jQuery );