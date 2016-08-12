var Vue = require('vue');
var Modal = require('./components/modal.vue');

new Vue({
	el: '#app',
	data: {
		name: 'lenq!',
		showModal: false
	},
	components: {
		'modal': Modal
	}
});