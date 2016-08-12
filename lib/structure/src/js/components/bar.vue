<template>
	<div class="container">
		<p>我是bar</p>
		<button type="button" class="btn" @click="viewEvent">
			<span>点击我查看对象</span>
		</button>
	</div>
</template>

<style lang="less" scoped>
	.container {
		width: 100vw;
		height: 100vh;
		background-color: fade(#f60, 30%);
	}

	.btn {
		border: none;
		background-color: transparent;
		color: #f60;
		outline: none
	}
</style>

<script>
	export default {
		data() {
			return {}
		},

		methods: {
			viewEvent(e) {
				console.log(e.currentTarget, e.target);
			}
		}
	}
</script>