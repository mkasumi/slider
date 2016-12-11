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
		var amountItem = $('.slider-list').find('.active').attr('data-index');
		var amount = parseInt(amountItem)+1;
		console.log('amount' + amount);
		$('.slider-list').css('transform','translateX(-'+ width * amount +'px)');
		$('.active').removeClass('active').next().addClass('active');

		if ($('.active').is(':last-child')){
			$(this).attr('disabled','disabled');
		}
		
	});

	$('.slider-arrow-prev').click(function(){
		var amountItem = $('.slider-list').find('.active').attr('data-index');
		var amount = parseInt(amountItem)-1;
		console.log('amount' + amount);
		$('.slider-list').css('transform','translateX(-'+ width * amount +'px)');
		$('.active').removeClass('active').next().addClass('active');
		if ($('.active').is(':first-child')){
			$(this).attr('disabled','disabled');
		}
	});

	};
})( jQuery );