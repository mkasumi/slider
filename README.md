# slider
シンプルなスライダーのjQueryプラグインです。

## オプション
| オプション         | 初期値          | 機能            |
| --------------- |:---------------|:---------------|
| slider          | slider-list    | スライダーのクラス名を指定します |
| sliderItem      | slider-item    | スライダーのアイテムのクラス名を指定します |
| dotsItem        | slider-dots    | ドットナビゲーションのクラス名を指定します |
| arrowItem       | slider-arrow   | 矢印ナビゲーションのクラス名を指定します |
| dots            | true           | ドットナビゲーションを有効にします。trueまたはfalseを選択できます。 |
| arrows          | true           | 矢印ナビゲーションを有効にします。trueまたはfalseを選択できます。 |
| throttleTime    | 200            | 要素がレスポンシブしたときのアニメーションの発火するタイミングを指定します。 |

## 使い方
~~~~
<script>
$(function(){
	$('.js-slider').slide({
		slider: 'slider-list',
		sliderItem: 'slider-item',
		dotsItem: 'slider-dots',
		arrowItem: 'slider-arrow',
		dots: 'true',
		arrows: 'true',
		throttleTime: 200
	})
});
</script>
~~~~

slider,sliderItem,dotsItem,arrowItemではクラス名が変更できます。変更をしたら、CSSファイルも変更してください。


### CSS
~~~~
<link rel="stylesheet" type="text/css" href="css/slider.min.css">
~~~~
### JS
~~~~
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/slider.js"></script>
~~~~
