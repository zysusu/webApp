/*import {
    ajax as ajax
} from '../../../util/index.js';*/
    export default {
        name: 'left-menu',
        data() {
            return {
                parentMenu:[],
                childMenu:[],
                MenuData:[],
                menu_list: [],
            
                win_size: {
                    height: '',
                }
            }
        },
        methods: {
             checkChildMneu(name2,index){
               // var _this = this;
                var lent = this.childMenu.length;
                for(var j = 0; j<lent; j++){
                  if(name2.trim() == (this.childMenu[j]).trim()){
                        return true;
                    }
                }
                return false;
                //alert(0);
            },
            checkMenuShow(name,index){
                var _this = this;
                var len = _this.MenuData.length;
                for(var i = 0; i<len; i++){
                 /* if(name.trim() === (_this.MenuData[i].CuitMoon_ModuleName).trim()){
                        return true;
                    }*/
                     if(name.trim() === (_this.MenuData[i]).trim()){
                        return true;
                    }
                }
                return false;
            },
           
            getTheMenu(){
                var _this = this;
                this.axios.post("/index.php?r=System/module/get-can-menu")
                .then((res) => {  
                var hh = JSON.parse(res.request.response);
                if(hh.status==200){
                    _this.MenuData = hh.data.first;
                    _this.childMenu = hh.data.second;
                }else{
                   this.$message({
                        showClose: true,
                        message  : '获取菜单失败，请退出后重试！',
                        type     : 'erroe'
                        });
                }
                    
                })
            },
            setSize() {
                this.win_size.height = $(window).height()+100 + "px";
            },
            toggleMenu() {
                this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
            },
            updateCurMenu(route) {
                var route = route || this.$route;
                if (route.matched.length) {
                    var rootPath = route.matched[0].path,
                        fullPath = route.path;
                    this.$store.dispatch('set_cur_route', {
                        rootPath,
                        fullPath
                    });
                    var routes = this.$router.options.routes;
                    for (var i = 0; i < routes.length; i++) {
                        if (routes[i].path === rootPath && !routes[i].hidden) {
                            this.menu_list = routes[i].children;
                            break;
                        }
                    }
                } else {
                    this.$router.push('/404');
                }
            }
        },
        created() {
            this.getTheMenu();
            this.setSize();
            $(window).resize(() => {
                this.setSize();
            });

            this.updateCurMenu();
        },
        mounted() {
            //this.getTheMenu();
           // alert("this:"+this.checkMenuShow('认证模型管理'));
            // console.log(this.$store.state.user.userinfo.access);
        },
        watch: {
            $route(to, from) {
                this.updateCurMenu(to);
            }
        }
    }