 import {
    gbs
 } from 'config/settings.js';

module.exports = {
	name   : 'homePage',
	data() {
		return {
			imageUrl:'',
            imgAction:'',
		}
	},
	methods: {
        
	},
	mounted() {
		this.imgAction = gbs.host+"/index.php?r=common/upload";
        this.getProvince();
        this.getCategory();
        this.initRouters();
    },
	watch: {
		$route(to, from){
			this.getView();
		}
	}
}
