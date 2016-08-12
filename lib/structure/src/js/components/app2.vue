<template>
	<h1>Hellp App!</h1>
	<p>
		<a v-link="{path: '/foo'}">go to foo</a>
		<a v-link="{path: '/bar'}">go to bar</a>
	</p>
	<router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
</template>

<style scoped>
	.view {
	  transition: all .5s ease;
	}
	.test-enter, .test-leave {
	  opacity: 0;
	  transform: translate3d(10px, 0, 0);
	}
	.v-link-active {
	  color: red;
	}
	[v-cloak] {
	  display: none;
	}
</style>

<script>
	export default {
		data() {
			return {
				authenticating: false
			}
		}
	}
</script>