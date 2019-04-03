<template>
	<transition name='index'>
		<section v-if='show' class="lt-full zmiti-index"  :style="{background:'url('+imgs.index+') no-repeat center bottom',backgroundSize:'cover'}" >
			<div class='zmiti-fm'>
				<img :src="imgs.fm" alt="">
			</div>

			<div class='zmiti-index-title'>
				<img :src="imgs.title" alt="">
			</div>
			<div class='zmiti-text'>
				<div v-for="(t,i) in text" :key="i">
					{{t}}
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
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				text:[]
			}
		},
		components:{
		},
		
		methods:{
			entryMain(){
				this.show = false;
				this.obserable.trigger({
					type:'showMain'
				});
			}
		},
		mounted(){
			var iNow = 0;
			var {obserable} = this;
			var i =0;

			

			obserable.on('showMainPage',()=>{

			/* 	var print = obserable.trigger({
					type:'playVoice',
					data:'print'
				}); */

				//console.log(print,111);
				
			/* 	print.muted = false;
				print.play(); */
				var t = setInterval(()=>{
					print.muted = false;
				
					if(iNow>=window.config.text.length){
						clearInterval(t);
						/* obserable.trigger({
							type:'pauseVoice',
							data:'print'
						}); */
						setTimeout(() => {
							this.entryMain();
						}, 2000);
						return;
					}
					if(i>=window.config.text[iNow].length){
						iNow++;
						i = 0;
					}else{
						i++;
						this.text[iNow] = window.config.text[iNow].substring(0,i);
						this.text = this.text.concat([]);
					}

				
					
					//this.text = window.config.text.substring(0,iNow);
					//iNow++;
				},120);
			})



		}
	}
</script>	 