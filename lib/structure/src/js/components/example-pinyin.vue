<template>
	<h3>{{title}} example</h3>
	<div class="container">
		<input type="text" v-model="keyword">
		<ul>
			<li v-for="item in items | filterPinyin keyword">
				{{item.name}}
			</li>
		</ul>
	</div>
</template>

<script>
	import pinyin from 'pinyin';

	export default {
		data() {
			return {
				title: 'pinyin',
				keyword: '',
				items: [
					{ name: '中国' },
					{ name: '香港' },
					{ name: '台湾' },
					{ name: '北京' },
					{ name: '上饶' }
				]
			}
		},
		filters: {
			filterPinyin(arr, search) {
				var res = [];

				arr.filter(function(i) {
					console.log(i.name);
				});
			}
		}
	}
</script>