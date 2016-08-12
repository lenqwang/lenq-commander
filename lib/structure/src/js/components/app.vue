<template>
	<h1>Hello {{title}}</h1>
	<div class="container">
		<ul>
			<li v-for="book in books">{{book.name}} - {{book.count}}</li>
		</ul>
	</div>
</template>

<style lang="less?outputStyle=expanded" scoped>
	.container {
		background-color: fade(#fff, 60%);
	}
</style>

<script>
	export default {
		data() {
			return {
				title: 'Vue',
				books: [
					{
						name: 'think in javascript',
						count: 2
					},
					{
						name: 'node.js',
						count: 1
					}
				]
			}
		}
	};
</script>