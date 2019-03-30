﻿window.imgs = {
  logo: "./assets/images/logo1.png",
  play: "./assets/images/play.png",
  play1: "./assets/images/play1.png",
  arrow: "./assets/images/arrow.png",
  match: "./assets/images/match.png",
  match1: "./assets/images/match1.png",
  point: "./assets/images/point.png",
  title: "./assets/images/title.png",
  fm: "./assets/images/fm.png",
  audio: "./assets/images/audio.png",
  text1: "./assets/images/text1.png",
  text2: "./assets/images/text2.png",
  text3: "./assets/images/text3.png",
  tip: "./assets/images/tip.png",
  qrcode: "./assets/images/qrcode.png",
  candle: "./assets/images/candle.png",
	bg: "./assets/images/bg.jpg",
	shadow1: "./assets/images/shadow1.png",
	share1: "./assets/images/share1.jpg",
	share2: "./assets/images/share2.jpg",
	share3: "./assets/images/share3.jpg",
	shareTitle: "./assets/images/share-title.png",
	index:'./assets/images/index.jpg',
	
};


 
 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   baseUrl: "https://testxlive.xinhuaapp.com",
   host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
   text: "清明是中华民族古老的节日，既是一个扫墓祭祖的肃穆节日，也是人们亲近自然、踏青游玩、享受春天乐趣的欢乐节日。"
 };
 
  
var musics = {
	music: {
		src: './assets/music/bg1.mp3',
		autoplay: true,
		name: 'bg2',
		loop: true
	},
  print: {
  	src: './assets/music/print.mp3',
  	autoplay: true,
  	loop: true,
  	name: 'print',
	},
	 photo: {
	 	src: './assets/music/photo.mp3',
	 	autoplay: true,
	 	name: 'photo',
	 }
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();