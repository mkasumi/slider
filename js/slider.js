(function( $ ) {
	$.fn.slide = function() {

	var items = this.find('.slider-item').length;

	// データ属性で何番目か取得する
	$('.slider-item').each(function(i){
		$(this).attr('data-index',i);
	});

	var width = this.children().width();
	var itemsWidth = items * width;
	$('.slider-item').width(width);
	$('.slider-list').width(itemsWidth);

	$('.slider-item:first-child').addClass('active');

	$('.slider-arrow-next button').click(function(){
		$('.slider-arrow-prev button').prop('disabled',false);
		var amountItem = $('.slider-list').find('.active').attr('data-index');
		var amount = parseInt(amountItem)+1;
		$('.slider-list').css('transform','translateX(-'+ width * amount +'px)');
		$('.slider-item.active').removeClass('active').next().addClass('active');

		if ($('.slider-item.active').is(':last-child')){
			$(this).prop('disabled',true);
		} else {
			$(this).prop('disabled',false);
		}
		
	});

	$('.slider-arrow-prev button').click(function(){
		$('.slider-arrow-next button').prop('disabled',false);
		var amountItem = $('.slider-list').find('.active').attr('data-index');
		var amount = parseInt(amountItem)-1;
		$('.slider-list').css('transform','translateX(-'+ width * amount +'px)');
		$('.slider-item.active').removeClass('active').prev().addClass('active');
		if ($('.slider-item.active').is(':first-child')){
			$(this).prop('disabled',true);
		} else {
			$(this).prop('disabled',false);
		}
	});

	};
})( jQuery );