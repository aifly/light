<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-index1" @touchmove='touchmove' >
			
			<div class='zmiti-index-ui' v-if='!loaded && showLoading' v-show='false'>
				<div class='zmiti-index-C'>
					<div class='zmiti-index-bar '  :style="{webkitTransform:'scale('+(width)+',1)'}">  </div>
				</div>
				<div class='zmiti-progress'>
					{{parseInt(width*100)}}%
				</div>
			</div>

			<div class='zmiti-match' :style="matchStyle"  @touchstart='touchstart' @touchend='touchend' >
				<img :src="imgs.match" alt="">
				<div class="candle-flame" :class="{'active':showFlame}"></div>
			</div>

			<canvas class='zmiti-canvas' :width="viewW" :height="viewH" ref='canvas'>

			</canvas>

			<img ref='point' style='position:fixed;left:-100px;opacity:0;z-index:-1;' :src="imgs.point" alt="">

			<div class='zmiti-ind'></div>

			<div class="candle " >
				<div class="candle-body"></div>
				<!-- 火焰 -->
				<div class="candle-flame"></div>
				<!-- 烟雾 -->
				
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
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				loaded:false,
				currentTime:'',
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
				imgHeight:165,
				last:200
			}
		},
		components:{
		},
		
		methods:{

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
				if(!this.canMove ){
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
				this.canMove = false;
				this.matchStyle.zIndex = 101;

				this.showFlame = true;
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
			}
			
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