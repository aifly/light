<template>
	<transition name='loading'>
		<section v-if='show'  class="lt-full zmiti-index-main-ui"  @touchstart='touchstart' @touchend='touchend' @touchmove='touchmove' :style="{background:'url('+imgs.bg+') no-repeat center center ',backgroundSize:'cover'}" >
			<div class='lt-full'>
				
				<transition name='match'>
					<div class='zmiti-match' v-if='showMatch' :class='{"transition":matchMoved}' :style="matchStyle"  >
						<img :src="imgs[showFlame?'match1':'match']" alt="">
						<div class="candle-flame" :class="{'active':showFlame}"></div>
					</div>
				</transition>

				<transition name='tip'>
					<div class="zmiti-tip " v-if='!showCandle'>
						<img :src="imgs.tip" alt="">
					</div>
				</transition>
				<transition name='tip'>
					<div class="zmiti-tip zmiti-hand active" v-if='!showCandle'>
						<img :src="imgs.hand" alt="">
					</div>
				</transition>

				<canvas class='zmiti-canvas' :width="viewW" :height="viewH" ref='canvas'>

				</canvas>

				<img ref='point' style='position:fixed;left:-100px;opacity:0;z-index:-1;' :src="imgs.point" alt="">

				
				<transition name='candle'>
					<div class="candle " v-if='showCandle' :class="{'out':!light}" >
						<div class="zmiti-candle-body">
							<img :src="imgs.candle" alt="">
						</div>
						<!-- 火焰 -->
						<div class="candle-flame"></div>
						<!-- 烟雾 -->
						
					</div>
				</transition>

				<div class='zmiti-share-audio flash' v-show='showAudio' v-tap='[playAudio]'>
					<img :src="imgs.audio" alt="">
					<audio :src='audios[randomIndex]' ref='audio'></audio>
				</div>


				<div class='zmiti-share-page lt-full'  ref='page' :style="{width:viewW+'px',height:viewH+'px',WebkitFilter:'blur('+(createImg?'10px':0)+')',background:'url('+imgs['share'+(randomIndex+1)]+') no-repeat center bottom ',backgroundSize:'cover'}" :class='{"active":showSharePage,"hideShadow":hideShadow}'  >
					<div class='zmiti-fm'>
						<img :src="imgs.fm" alt="">
					</div>
					<div class='lt-full'>
						<img :src="imgs.shadow1" alt="">
					</div>
					<div class='zmiti-share-title'>
						<img :src="imgs.shareTitle" alt="">
					</div>
					<div class='zmiti-share-text'>
						<img :src="imgs['text'+(randomIndex+1)]" alt="">
					</div>
					

					<div class='zmiti-qrcode' v-if='!showCandle'>
						<img :src="imgs.qrcode" alt="">
					</div>

					<div class='zmiti-share-pv' v-if='!showCandle'>
						您为英烈点燃了 <span>{{pv}}</span> 盏灯
					</div>
				</div>

				<transition name='createimg'>
					<div class='lt-full zmiti-createimg' v-if='createImg' :style="{width:viewW*.7+'px',height:viewH*.7+70+'px'}">
						<div class='zmiti-img' >
							<img :src="createImg" alt="">
						</div>
						<div>
							<div v-tap='[restart]'>再点一次</div>
							<div v-tap='[showMaskPage]'>邀请好友点灯</div>
						</div>

						<div class='zmiti-create-tip'>长按保存图片</div>
					</div>
				</transition>
			</div>
			<div class='zmiti-mask' v-if='showMask' @touchstart='showMask = false'>
				<img :src="imgs.arrow" alt="">
			</div>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Point from '../lib/point';
	import '../lib/html2canvas';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				className:"",
				showAudio:false,
				pv:1234,
				showSharePage:false,
				matchMoved:false,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
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
				matchStyle:{
					left:'200px',
					top:'400px',
					zIndex:101
					
				},
				imgWidth:300,
				imgHeight:217,
				last:200
			}
		},
		components:{
		},
		
		methods:{


			playAudio(){
				this.$refs['audio'].play();
				this.$refs['audio'].addEventListener('ended',()=>{
					setTimeout(() => {
						this.html2img();
					}, 1000);
				})
			},	

			restart(){
				this.matchStyle={
					left:'200px',
					top:'400px',
					zIndex:101
					
				};
				this.light = true;
				this.showSharePage = false;
				this.createImg = '';
				this.showMatch = true;
				this.hideShadow = false;
				this.matchMoved = false;
				this.showMask = false;
				this.showFlame = false;
				this.showCandle = false;
				this.showAudio = false;
				setTimeout(()=>{
					this.light = false;
				},100)
				this.randomIndex = Math.random()*3|0;


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
				e.preventDefault();
				this.canMove = true;
				var e = e.changedTouches[0];
				this.startX = e.pageX;
				this.startY = e.pageY;

				this.disX = this.startX - parseFloat(this.matchStyle.left);
				this.disY = this.startY - parseFloat(this.matchStyle.top);
				this.matchStyle.zIndex = 0;


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
				this.matchStyle.left = left + 'px';
				this.matchStyle.top = top + 'px';
				var s = this;
				for(var i = 0;i<200;i++){
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
				this.matchStyle.zIndex = 101;
				this.showCandle = true;
				this.showFlame = true;

				setTimeout(() => {
					this.matchMoved = true;
					this.matchStyle = {
						left:'350px',
						top:this.viewH - 232 - this.imgHeight + 'px',
					}

					setTimeout(() => {
						this.showMatch = false;
						this.light = true;//点亮蜡烛
						this.showSharePage = true;

						setTimeout(() => {
							this.showCandle = false;
							this.showAudio = true;
							 
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
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                        console.log(dt);
                    });
			},
			html2img(){
				var s = this;
				var {obserable} = this;

				//document.title = '开始截图....'
				this.hideShadow = true;
				setTimeout(()=>{
					//this.showLoading = true;
					var ref = 'page';
					var dom = this.$refs[ref];


					this.showAudio = false;

					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {

							obserable.trigger({
								type:'playVoice',
								data:'photo'
							});
					        var src = canvas.toDataURL();
							//s.mergeImg = '';
							//s.createImg = src;
							s.createImg = src;
					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},100);
			},
			
		},
		mounted(){
			this.updatePv();
			this.getPv();
			this.obserable.on('showMain',()=>{
				this.loaded = true;
				this.show = true;
				setTimeout(() => {
					this.showLoading = false;
					this.initCanvas();
					var s = this;
					(function render(){
						(window.requestAnimationFrame || window.webkitRequestAnimationFrame)(render);
						s.context.clearRect(0,0,s.viewW,s.viewH);

						s.points.forEach((item,i)=>{
							item.animate(()=>{
								s.points.splice(i,1);
							});
						})
					})();
				}, 10);
			});

			this.randomIndex = Math.random()*3|0;

		}
	}
</script>