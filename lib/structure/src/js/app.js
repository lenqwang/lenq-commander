import Vue from 'vue';
import VueRouter from 'vue-router';
import Foo from './components/foo.vue';
import Bar from './components/bar.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	history: true,
	saveScrollPosition: true
});

router.map({
	'/foo': {
		component: Foo
	},
	'/bar': {
		component: Bar
	}
});

const App = Vue.extend(require('./components/app2.vue'));

router.start(App, '#app');

window.router = router;