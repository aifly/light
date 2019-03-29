<template>
	<section v-if='show' class="lt-full zmiti-index" :style="{background:'url('+imgs.index+') no-repeat center bottom',backgroundSize:'cover'}" >
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
		},
		mounted(){
			var iNow = 0;
			var t = setInterval(()=>{
				if(iNow>=window.config.text.length){
					clearInterval(t);
				}
				this.text = window.config.text.substring(0,iNow);
				iNow++;
			},80);


		}
	}
</script>	