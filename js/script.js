var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
		if (windowwidth > 768){
			//PC用
			var responsiveImage = [
				{ src: './img/bg_01.jpg'},
				{ src: './img/bg_02.jpg'},
				{ src: './img/bg_03.jpg'}
			];
		} else {
			//タブレットサイズ（768px）用
			var responsiveImage = [
				{ src: './img/bg_sp01.jpg' },
				{ src: './img/bg_sp02.jpg' },
				{ src: './img/bg_sp03.jpg' }
			];
		}

//Vegas全体の設定
$('#slider').vegas({
		overlay: 'https://cdnjs.cloudflare.com/ajax/libs/vegas/2.4.4/overlays/06.png',//画像の上に網線やドットのオーバーレイパターン画像を指定。
		transition: 'blur',
		transitionDuration: 2000,
		delay: 10000,
		animationDuration: 20000,
		animation: 'kenburns',//スライドアニメーションの種類。
		slides: responsiveImage,//画像設定を読む
	});


/* リンクをクリック->背景が暗くなり動画や画像やテキストを表示 */
//モーダル設定
$(".btn-view2").modaal({
	overlay_close:true,//モーダル背景クリック時に閉じるか
	before_open:function(){
		$('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
        $.scrollify.disable();
	},
	after_close:function(){
		$('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
        $.scrollify.enable();
	}
});


/* サムネイルをクリックするとグループ化された画像一覧表示 */
//画像をクリックしたら現れる画面の設定	
$(".btn-view").modaal({
	fullscreen:'true',
	before_open:function(){
		$('html').css('overflow-y','hidden');/* 縦スクロールバー非表示 */
        $.scrollify.disable();
	},
	after_close:function(){
		$('html').css('overflow-y','scroll');
        $.scrollify.enable();
	}
});


/* スクロールして1画面移動 */
$.scrollify({
	//1ページスクロールさせたいエリアクラス名設定
	section : ".box",
	//スクロールバー表示・非表示設定
	scrollbars:"false",
	interstitialSection : "#header",
	easing: "swing",
    scrollSpeed: 300,
	
	//ページネーション設定
	before:function(i,panels) {
      var ref = panels[i].attr("data-section-name");
      $(".pagination .active").removeClass("active");
      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterRender:function() {
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
		//1ページスクロールさせるエリアクラス名指定
      $(".box").each(function(i) {
        activeClass = "";
        if(i===$.scrollify.currentIndex()) {
          activeClass = "active";
        }
        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
      });
      pagination += "</ul>";
	  //はじめのエリアにページネーション表示
      $("#box1").append(pagination);
      $(".pagination a").on("click",$.scrollify.move);
    }

  });

// 動きのきっかけとなるアニメーションの名前定義
function fadeAnime(){
    //ぼかしから表示
	$('.blurTrigger').each(function(){
		var elemPos = $(this).offset().top-50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('blur');
		}else{
		$(this).removeClass('blur');
		}
		});
}

/* テキスト1文字づつ出現*/
// eachTextAnimeにappeartextというクラス名を設定
function EachTextAnimeControl() {
	$('.eachTextAnime').each(function () {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			                   //↓appeartextというクラス名を設定
			$(this).addClass("appeartext");
		} else {
			$(this).removeClass("appeartext");
		}
	});
}

/* 以下関数群*/
// 画面をスクロールし動かす場合の設定
$(window).scroll(function () {
	//テキストが1文字づつ出現の関数を呼ぶ
	EachTextAnimeControl();
    fadeAnime();
});

// ページが読み込まれたらすぐに動かす。
$(window).on('load', function () {
    
	/* プログレスバー＋数字カウントアップ＋画面開く*/
	//テキストのカウントアップ+バー設定
		//id名指定
	var bar = new ProgressBar.Line(splash_text, {
		easing: 'easeInOut',
		duration: 1000,
		strokeWidth: 0.2,
		color: '#fff',
		trailWidth: 0.2,
		trailColor: '#bbb',
		text: {
			//中央に配置する
			style: {
				position: 'absolute',
				left: '50%',
				top: '50%',
				padding: '0',
				//バーより上に配置
				margin: '-30px 0 0 0',
				transform:'translate(-50%,-50%)',
				'font-size':'1rem',
				color: '#fff',
			},
			autoStyleContainer: false
		},
		step: function(state, bar) {
			bar.setText(Math.round(bar.value() * 100) + ' %');
		}
	});

	//プログレスバーのアニメーション開始
	bar.animate(1.0, function () {
		//フェードアウトしローディングテキスト削除
		$("#splash_text").fadeOut(10);
		$("#splash").fadeOut('slow',function(){
		});
		});
});
