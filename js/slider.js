(function( $ ) {
	$.fn.slide = function() {
		var $self = $(this);
		var $ul = $(".slider-list",this);
		// var moveDots = $();
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
		
		console.log($ul);
		// ドットナビゲーションを追加する
		$(this).append('<ul class="slider-dots"></ul>');
		var items = this.find('.slider-item').length;

		// データ属性で何番目か取得する
		$('.slider-item',this).each(function(i){
			$(this).attr('data-index',i);
			$('.slider-dots').append('<li><button type="button" data-dots-item="'+i+'">'+i+'</button></li>');
		});

		//ドットナビゲーション
		$('.slider-dots button',this).click(function(){
			$(this).addClass('active');
			console.log($(this).attr('data-dots-item'));
			var selectedItem = $(this).attr('data-dots-item');
			$('.slider-item').removeClass('active');
			var $item = $(".slider-item").removeClass("active");
			var attr = $('.slider-item').attr('data-index');
			$('.slider-item')
			.removeClass("active")
			.each(function(){
				if($(this).attr("data-index") === selectedItem){
					$(this).addClass("active")
				}
			});
			var amountItem = $ul.find('.active').attr('data-index');
			var amount = parseInt(amountItem);
			var direction = 'none';
			moveTo(amount,direction);
			// $('.slider-item').eq(selectedItem).addClass('active');
		});

		// 幅の取得
		var width = this.children().width();
		var itemsWidth = items * width;
		$('.slider-item',this).width(width);
		$('.slider-list',this).width(itemsWidth);

		$('.slider-item:first-child').addClass('active');

		// 左右に送る
		$('.slider-arrow-next button').click(function(){
			$('.slider-arrow-prev button').prop('disabled',false);
			var amountItem = $ul.find('.active').attr('data-index');
			var amount = parseInt(amountItem)+1;
			var direction = 'next';
			moveTo(amount,direction);

			if ($('.slider-item.active').is(':last-child')){
				$(this).prop('disabled',true);
			} else {
				$(this).prop('disabled',false);
			}
			
		});

		$('.slider-arrow-prev button').click(function(){
			$('.slider-arrow-next button').prop('disabled',false);
			var amountItem = $ul.find('.active').attr('data-index');
			var amount = parseInt(amountItem)-1;
			var direction = 'prev';
			moveTo(amount,direction);
			if ($('.slider-item.active').is(':first-child')){
				$(this).prop('disabled',true);
			} else {
				$(this).prop('disabled',false);
			}
		});

	};
})( jQuery );