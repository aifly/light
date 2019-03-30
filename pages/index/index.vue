<template>
	<section v-if='show' class="lt-full zmiti-index" v-tap='[entryMain]' :style="{background:'url('+imgs.index+') no-repeat center bottom',backgroundSize:'cover'}" >
		<div class='zmiti-fm'>
			<img :src="imgs.fm" alt="">
		</div>

		<div class='zmiti-index-title'>
			<img :src="imgs.title" alt="">
		</div>
		<div class='zmiti-text'>
			{{text}}
		</div>
	</section>
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
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				text:''
			}
		},
		components:{
		},
		
		methods:{
			entryMain(){
				this.obserable.trigger({
					type:'showMain'
				})
			}
		},
		mounted(){
			var iNow = 0;
			var {obserable} = this;
			obserable.trigger({
				type:'playVoice',
				data:'print'
			});
			var t = setInterval(()=>{
				if(iNow>=window.config.text.length){
					clearInterval(t);
					obserable.trigger({
						type:'pauseVoice',
						data:'print'
					});

					setTimeout(() => {
						this.entryMain();
					}, 4000);
				}
			
				
				this.text = window.config.text.substring(0,iNow);
				iNow++;
			},120);


		}
	}
</script>	 