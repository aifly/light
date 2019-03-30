<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-loading1" >
			<div class='zmiti-fm'>
				<img :src="imgs.fm" alt="">
			</div>
			<div class='zmiti-loading-ui' v-if='!loaded && showLoading' >
				<div class='zmiti-progress'>
					<span>为英烈点燃一盏灯</span>{{parseInt(width*100)}}%
				</div>
				<div class='zmiti-loading-C'>
					<div class='zmiti-loading-bar '  :style="{webkitTransform:'scale('+(width)+',1)'}">  </div>
				</div>
				
			</div>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
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
				showLoading:true,
				
			}
		},
		components:{
		},
		
		methods:{

		
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
			

			
			this.obserable.on('hideloading1',()=>{
				this.loaded = true;
				this.showLoading = false;
				this.show = false;
			});
			



		}
	}
</script>