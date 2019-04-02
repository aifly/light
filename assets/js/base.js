﻿window.imgs = {
	logo: "./assets/images/logo1.png",
	play: "./assets/images/play2.png",
	arrow: "./assets/images/arrow.png",
	match: "./assets/images/match.png",
	match1: "./assets/images/match1.png",
	point: "./assets/images/point.png",
	title: "./assets/images/title.png",
	top: "./assets/images/top.jpg",
	topBg:'./assets/images/top-bg.jpg',
	bei: "./assets/images/bei.png",

	bottom: "./assets/images/bottom.png",
	ran: "./assets/images/ran.png",
	deng: "./assets/images/deng.png",
	fm: "./assets/images/fm.png",
	fm1: "./assets/images/fm1.png",
	audio: "./assets/images/audio.png",
	text1: "./assets/images/xi1.png",
	text2: "./assets/images/xi2.png",
	text3: "./assets/images/xi3.png",
	tip: "./assets/images/tip2.png",
	hand: "./assets/images/hand1.png",
	qrcode: "./assets/images/qrcode1.png",
	candles: "./assets/images/candles.png",
	candle: "./assets/images/candle.png",
	candle1: "./assets/images/candle1.png",
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
	audio1:'./assets/music/audio1.mp3',
	audio2:'./assets/music/audio2.mp3',
	audio3:'./assets/music/audio3.mp3',
   	baseUrl: "https://testxlive.xinhuaapp.com",
   	host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   	secretKey: "e9469538b0623783f38c585821459454",
   	text: [
	   '他们',
	   '用鲜血和生命为共和国奠基',
	   '以奉献与牺牲为人民谋福祉',
	   '',
	   '清明节',
	   '让我们',
	   '点一盏灯',
	   '让英雄丰碑矗立心中',
	   '让英雄精神薪火相传'
   ]
 };
 
  
var musics = {
	music: {
		src: './assets/music/bg3.mp3',
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
	 },
	 audio1: {
	 	src: './assets/music/audio1.mp3',
	 	autoplay: true,
	 	name: 'audio1',
	 },
	 audio2: {
	 	src: './assets/music/audio2.mp3',
	 	autoplay: true,
	 	name: 'audio2',
	 },
	 audio3: {
	 	src: './assets/music/audio3.mp3',
	 	autoplay: true,
	 	name: 'audio3',
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