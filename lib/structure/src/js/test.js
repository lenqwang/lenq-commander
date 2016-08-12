var Vue = require('vue');

// var ExampleZoom = require('./components/example-zoom.vue');
var ExamplePinyin = require('./components/example-pinyin.vue');

var MyComponent = Vue.extend({
	template: '<div>A custom component</div>'
});

Vue.component('my-component', MyComponent);

new Vue({
	el: 'body',
	data: {
		title: 'Hello Vue!'
	},
	components: {
		// 'example-zoom': ExampleZoom,
		'example-pinyin': ExamplePinyin
	},
	methods: {
		getRequest: function() {
			alert('outch');
			var myImage = this.$els.myImage;

			var myHeaders = new Headers();
			var myInit = {
				method: 'GET',
				headers: myHeaders,
				mode: 'cors',
				cache: 'default'
			};

			fetch('flowers.jpg', myInit)
				.then(function(response) {
					return response.blob();
				})
				.then(function(myBlob) {
					var objectURL = URL.createObjectURL(myBlob);

					myImage.src = objectURL;
				});
		}
	}
});