<template>
	<transition name='loading'>
		<section v-if='show'  class="lt-full zmiti-index-main-ui"  @touchstart='touchstart' @touchend='touchend' @touchmove='touchmove' :style="{background:'url('+imgs.bg+') no-repeat center center ',backgroundSize:'cover'}" >
			<div class='zmiti-bg lt-full' :class='{"active":light}' :style="{background:'url('+imgs.postBg+') no-repeat center center',backgroundSize:'cover'}">
				<transition name='title'>
					<div class='zmiti-title'>
						<img :src="imgs.title" alt="">
					</div>
				</transition>
			</div>
			<div class='lt-full' ref='page1' :style="{WebkitFilter:'blur('+(createImg?'10px':0)+')'}">
				
				<div class='zmiti-fm'>
					<img :src="imgs.fm1" alt="">
				</div>
				

				 
				<div class='zmiti-qrcode' v-if='showQrcode'>
					<img :src="imgs.qrcode" alt="">
				</div>
				<transition name='xi'>
					<div class='zmiti-xi1' v-if='light'>
						<img :src="imgs['text'+(randomIndex+1)]" alt="">
						<div class='zmiti-deng'>
							<img :src="imgs.ran" alt="">
							<span>{{pv}}</span>
							<img :src="imgs.deng" alt="">
						</div>
						<div class='zmiti-share-audio ' v-show='showAudio' v-tap='[playAudio]'>
							<img :src="imgs['audio'+(isPlaying?'1':'')]" alt="">
							
						</div>
					</div>
				</transition>

				<div class='zmiti-candles'>
					<transition name='candles'>
						<div class='zmiti-candles1' v-if='!light'>
							<img :src="imgs['candles1']" alt="" />
						</div>
					</transition>
					<transition name='candles'>
						<div class='zmiti-candles2' v-if='light'>
							<img :src="imgs['candles']" alt="" />
						</div>
					</transition>
				</div>

				<transition name='match' >
					<div class='zmiti-match' v-if='showMatch && !showTip' :class='{"transition":matchMoved}' :style="matchStyle"  >
						<img :src="imgs[showFlame?'match1':'match']" alt="">
						<div class="candle-flame" :class="{'active':showFlame}"></div>
					</div>
				</transition>

				<div  v-if='showTip'>
					<transition name='tip'>
						<div class="zmiti-tip " v-if='!showCandle' >
							<img :src="imgs.tip" alt="">
						</div>
					</transition>
					<transition name='tip'>
						<div class="zmiti-tip zmiti-hand active" v-if='!showCandle'>
							<img :src="imgs.hand" alt="">
						</div>
					</transition>
				</div>

				<canvas v-show='!light' class='zmiti-canvas' :width="viewW" :height="viewH" ref='canvas'>

				</canvas>

				<img ref='point' style='position:fixed;left:-100px;opacity:0;z-index:-1;' :src="imgs.point" alt="">

				
				<transition name='candle' >
					<div class="candle ":class="{'out':!light,'light':light}" >
						<div class="zmiti-candle-body">
							<img :src="imgs[showCandle1?'candle1':'candle']" alt="">
						</div>
						<!-- 火焰 -->
						<div class="candle-flame "  v-if='!showQrcode' ></div>
						<!-- 烟雾 -->
						
					</div>
				</transition>


				 

			</div>
			'>
			<transition name='createimg'>
				<div class='lt-full zmiti-createimg'  v-if='createImg' :style="{width:Math.min(1234,viewH)/1334*viewH*.5+'px',height:(Math.min(1234,viewH)/1334*viewH*.5/750)*1334+60+'px'}">
					<div class='zmiti-img' >
						<img :src="createImg" alt="" >
					</div>
					<div>
						<div v-tap='[restart]'>再点一次</div>
						<div v-tap='[showMaskPage]'>邀请好友点灯</div>
					</div>

					<div class='zmiti-create-tip'>长按保存图片</div>
				</div>
			</transition>
			<div class='zmiti-mask' v-if='showMask' @touchstart='showMask = false'>
				<img :src="imgs.arrow" alt="">
			</div>
			<img ref='ran' :src="imgs.ran" alt=""  :style="{position:'fixed',zIndex:-1,opacity:0,left:'-750px'}">
			<img ref='deng' :src="imgs.deng" alt="" :style="{position:'fixed',zIndex:-1,opacity:0,left:'-750px'}">
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Point from '../lib/point';
	//import '../lib/html2canvas';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				className:"",
				showAudio:false,
				pv:1234,
				isAndroid:navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				showQrcode:false,
				showSharePage:false,
				matchMoved:false,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,

				showCandle1:false,
				show:false,
				loaded:false,
				currentTime:'',
				light:false,//是否点亮
				showLoading:true,
				canMove:false,
				points:[],
				randomIndex:0,
				audios:[window.config.audio1,window.config.audio2,window.config.audio3],
				showMatch:true,
				showMask:false,
				showFlame:false,
				showCandle:false,
				createImg:'',
				hideShadow:false,
				showTip:true,
				matchStyle:{
					left:'200px',
					top:window.innerHeight*.6+'px',
					zIndex:201
					
				},
				imgWidth:200,
				imgHeight:145,
				last:200,
				isPlaying:false,
			}
		},
		components:{
		},
		watch:{
			randomIndex(val){
				this.obserable.trigger({
					type:'randomAudio',
					data:val
				});
			}
		},
		
		methods:{


			imgClick(){
			},


			creatCanvas(){

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var s = this;
				var img = new Image();
					
				img.onload = function(){
					canvas.width  = this.width;
					canvas.height = this.height;
					context.drawImage(this,0,0,canvas.width,canvas.height);
					var ran = new Image();
					ran.onload = function(){
						context.drawImage(this,60,canvas.height*.7);

						var deng = new Image();
						deng.onload = function(){
							context.drawImage(this,330+(s.pv+'').length*25,canvas.height*.7);
							context.fillStyle = '#fff';
							context.font="40px Georgia";
							context.fillText(s.pv,330,canvas.height*.72);
							s.createImg = canvas.toDataURL();
						}
						deng.src = s.imgs.deng;
					}
					ran.src = s.imgs.ran;


				}
				img.src = this.imgs['poster'+(this.randomIndex+1)];

			},
			playAudio(){

				

				var {obserable} = this;
				var audio = obserable.trigger({
					type:'playCusAudio',
					data:'audio'
				});

				this.isPlaying = true;
				

				this.obserable.trigger({
					type:"setBgVolume",
					data:0.1
				});
				audio.muted = false;
				audio.play();
				audio &&audio.addEventListener('ended',()=>{
					audio.pause();
					audio.muted = true;
					this.isPlaying = false;
					setTimeout(() =>  {
						this.html2img();
					}, 1000);

					return;
					this.obserable.trigger({
						type:"setBgVolume",
						data:1
					});
					this.obserable.trigger({
						type:"toggleBgMusic",
						data:true
					}); 
				})
			},	

			restart(){
				this.matchStyle={
					left:'200px',
					top:window.innerHeight*.6+'px',
					zIndex:201
					
				};
				this.light = true;
				this.showSharePage = false;
				this.createImg = '';
				this.showMatch = true;
				this.isPlaying = false;
				this.hideShadow = false;
				this.matchMoved = false;
				this.showCandle1 = false;
				this.showMask = false;
				this.showFlame = false;
				this.showCandle = false;
				this.showAudio = false;
				this.showQrcode = false;
				setTimeout(()=>{
					this.light = false;
				},100)
				this.randomIndex = Math.random()*3|0;
				this.updatePv();


			},


			showMaskPage(){
				this.showMask = true;
			},

			initCanvas(){
				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');
				this.context = context;

			},

			touchstart(e){
				
				if(this.showTip){
					this.showTip = false;
					return;
				}
				this.canMove = true;
				var e = e.changedTouches[0];
				this.startX = e.pageX;
				this.startY = e.pageY;

				this.disX = this.startX - parseFloat(this.matchStyle.left);
				this.disY = this.startY - parseFloat(this.matchStyle.top);
				//this.matchStyle.zIndex = 0;


			},
			touchmove(e){
				if(!this.canMove ||this.showCandle || this.light ){
					return;
				}
				var e = e.changedTouches[0];
				this.endX = e.pageX;
				this.endY = e.pageY;
			
				var left = this.endX - this.disX;
				var top = this.endY - this.disY;
				
				top = Math.max(this.viewH - 640,top);
				this.matchStyle.left = left + 'px';
				this.matchStyle.top = top + 'px';
				var s = this;
				for(var i = 0;i<160;i++){
					var p = new Point({
						img:s.$refs['point'],
						context:s.context,
						x:zmitiUtil.r(Math.max(200,parseFloat(s.matchStyle.left)*.94),parseFloat(s.matchStyle.left)+30),
						y: parseFloat(s.matchStyle.top) + s.imgHeight
					});
					s.points.push(p);
				} 

			},
			touchend(e){
				if(this.createImg ||this.showCandle || this.light){
					return;
				}

				this.canMove = false;
				this.matchStyle.zIndex = 201;
				this.showCandle = true;
				this.showFlame = true;

				setTimeout(() => {
					this.matchMoved = true;
					this.matchStyle = {
						left:'350px',
						top:this.viewH - 145 - this.imgHeight + 'px',
					}

					setTimeout(() => {
						this.showMatch = false;
						this.light = true;//点亮蜡烛
						this.showSharePage = true;

						setTimeout(() => {
							//this.showCandle = false;
							this.showAudio = true;
							setTimeout(()=>{
								this.playAudio();
							},100)
						}, 3000);
					}, 1500);
				},1000);
			},
			imgStart(e){
				e.preventDefault(); 
			},
			entryIndex(){
				clearInterval(this.timer);
				this.obserable.trigger({
					type:'toggleBgMusic',
					data:true
				});
				this.show = false;
				clearInterval(this.t);
				this.obserable.trigger({
					type:'showIndexTitle'
				})
			},
			updatePv(){
				var s = this;

                axios.post('http://h5.wenming.cn/v1/wmshare/h5_view/?h5id=ypb-qmj&appsecret=c9GxtUre3kOJCgvp&sign=1', {})
				.then(function (data) {//sign:2 表示两位数随机
                        var dt = data.data;
						if(dt.getret === 0){
							s.pv = dt.data.num1;
							console.log(dt.data)
							//wxHandlercallback('','请为英烈点燃第'+s.pv+'盏灯');
							
						}
                    });

 				axios.post('https://xlive.xinhuaapp.com/xhs-security-activity/activity/num/updateNum', {
                        "secretKey": window.config.secretKey, // 请求秘钥
                        "nm": "ypb-qmj" // 
                    }).then(function (data) {
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                    });

				return;
                axios.post('http://api.zmiti.com/v2/custom/update_pvnum/?customid=76', {
                    }).then(function (data) {
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
					console.log(data);
					if(dt.getret === 0){
						s.pv = dt.randtotalpv;

						wxHandlercallback('','请为英烈点燃第'+s.pv+'盏灯');
					}
                        console.log(dt);
                    });

 
			},
			getPv(){
				return;
				var s = this;
                axios.post('https://xlive.xinhuaapp.com/xhs-security-activity/activity/num/updateNum', {
                        "secretKey": window.config.secretKey, // 请求秘钥
                        "nm": "light" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                    }).then(function (data) {
                        console.log(data,'11111234');
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                    });
			},
			html2img(ref = 'page1'){
				var s = this;
				var {obserable} = this;

				window.ss = this;

				//document.title = '开始截图....'
				this.hideShadow = true;
				this.showQrcode = true;
				this.showCandle1 = true;
				this.showAudio = false;

				obserable.trigger({
					type:'playVoice',
					data:'photo'
				});

				this.creatCanvas();

				return;

				/*  */
 
				setTimeout(()=>{
					//this.showLoading = true;
					var dom = this.$refs[ref];
					
					/* html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var src = canvas.toDataURL();
							//s.mergeImg = '';
							//s.createImg = src;
							
							if(!s.isAndroid){
								obserable.trigger({
									type:'playVoice',
									data:'photo'
								});
							}
							
							s.createImg = src;
					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					}) */
				},100);
			},
			
		},
		mounted(){
			this.updatePv();
			this.getPv();
			this.obserable.on('showMain',()=>{
				
				setTimeout(()=>{
					this.showTip = false;
				},4000)
				this.loaded = true;
				this.show = true;
				setTimeout(() => {
					this.showLoading = false;
					this.initCanvas();
					var s = this;
					(function render(){
						(window.requestAnimationFrame || window.webkitRequestAnimationFrame)(render);
						if(!s.light){
							s.context.clearRect(0,0,s.viewW,s.viewH);

							s.points.forEach((item,i)=>{
								item.animate(()=>{
									s.points.splice(i,1);
								});
							})
						}
					
					})();
				}, 10);
			});



			this.randomIndex = (Math.random()*3)|0;
			

		}
	}
</script>