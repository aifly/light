<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-index-main-ui" @touchmove='touchmove' :style="{background:'url('+imgs.bg+') no-repeat center center ',backgroundSize:'cover'}" >
			<div class='zmiti-fm'>
				<img :src="imgs.fm" alt="">
			</div>
			<div class='zmiti-index-ui' v-if='!loaded && showLoading' v-show='false'>
				<div class='zmiti-index-C'>
					<div class='zmiti-index-bar '  :style="{webkitTransform:'scale('+(width)+',1)'}">  </div>
				</div>
				<div class='zmiti-progress'>
					{{parseInt(width*100)}}%
				</div>
			</div>

			<div class='zmiti-match' :style="matchStyle"  @touchstart='touchstart' @touchend='touchend' >
				<img :src="imgs[showFlame?'match1':'match']" alt="">
				<div class="candle-flame" :class="{'active':showFlame}"></div>
			</div>

			<canvas class='zmiti-canvas' :width="viewW" :height="viewH" ref='canvas'>

			</canvas>

			<img ref='point' style='position:fixed;left:-100px;opacity:0;z-index:-1;' :src="imgs.point" alt="">


			<div class="candle " v-if='false' :class="{'out':light}" >
				<div class="zmiti-candle-body">
					<img :src="imgs.candle" alt="">
				</div>
				<!-- 火焰 -->
				<div class="candle-flame"></div>
				<!-- 烟雾 -->
				
			</div>


			<div class='zmiti-share-page lt-full'  :style="{background:'url('+imgs.share+') no-repeat center bottom ',backgroundSize:'cover'}" >
				<div class='lt-full' :style="{background:'url('+imgs.shadow1+') no-repeat center center ',backgroundSize:'cover'}" ></div>
				<div class='zmiti-share-title'>
					<img :src="imgs.shareTitle" alt="">
				</div>
				<div class='zmiti-share-text'>
					<img :src="imgs.text" alt="">
				</div>
				<div class='zmiti-share-audio'>
					<img :src="imgs.audio" alt="">
				</div>

				<div class='zmiti-qrcode'>
					<img :src="imgs.qrcode" alt="">
				</div>

				<div class='zmiti-share-pv'>
					您为英烈点燃了 <span>{{pv}}</span> 盏灯
				</div>
			</div>
		
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Point from '../lib/point';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				className:"",
				pv:1234,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				loaded:false,
				currentTime:'',
				light:false,//是否点亮
				currentDate:"",
				showLoading:true,
				canMove:false,
				points:[],
				showFlame:false,
				matchStyle:{
					left:'200px',
					top:'500px',
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

			 
			
		},
		mounted(){

			this.obserable.on('hideloading',()=>{
				this.loaded = true;
				this.showLoading = false;
			});
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



		}
	}
</script>