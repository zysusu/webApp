import {
	Login,
	Home,
	NotFound,
	Content,
	Modules,
	CodePage,
	HomePage,
	ContentPg
} from '../components/';

module.exports = [{
	path    : '/',
	redirect: to => {
		return 'homePage';
	},
	hidden  : true
}, {
	path     : '/homePage',
	component: HomePage,
	hidden   : true
}, {
	path    : '/',
	redirect: to => {
		return 'login';
	},
	hidden  : true
}, {
	path     : '/login',
	component: Login,
	hidden   : true
}, {
	path    : '/',
	redirect: to => {
		return 'codePage';
	},
	hidden  : true
}, {
	path     : '/codePage',
	component: CodePage,
	hidden   : true
}, {
	path    : '/',
	redirect: to => {
		return 'contentPg';
	},
	hidden  : true
}, {
	path     : '/contentPg',
	component: ContentPg,
	hidden   : true
}, {
	path     : '/404',
	component: Home,
	hidden   : true,
	children : [{
		path     : '',
		component: NotFound
	}]
}]
	 // .concat(require('./router/function.js'))
	 // .concat(require('./router/demo.js'))
	 // .concat(require('./router/components.js'))
	 // .concat(require('./router/adv.js'))	
	 // 注释掉上面三行,则不显示
	 .concat(require('./router/module.js'))
