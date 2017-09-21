前端框架基本配置
1. 先下载代码到本地：
　　git clone https://github.com/zysusu/webApp.git
2. 需要本地安装了node.js，在项目目录（若不修改则是vue2）下，在node命令行输入：npm install 安装依赖。
3. 部署模式：先打开项目，找到vue2/config目录，打开index.js，将proxyTable里的所以内容注释掉，变成：
proxyTable: {
           /* '/slsAdminApi': {
              target: 'http://exam.cuit.edu.cn:9999/WebApp/basic/web',    
    .........      
	        }*/
        },
然后打开vue2/src/config/settings.js,将host值设置为对应的后台项目地址，如：http://192.168.169.182/WebApp/basic/web；
然后在node命令行输入：npm run build
Build之后，打开dist目录，找到dist/static/img,复制里面所有的图片；然后在dist/static/css下新建目录static，然后打开static再新建目录img，然后将刚刚复制的所有图片粘贴到dist/static/css/static/img。然后就可以压缩打包dist目录，部署到服务器上啦。

4. 本地开发模式（修改代码）：先打开项目，找到vue2/config目录，打开index.js，将proxyTable的target值修改为对应的后台项目地址，如：http://192.168.169.182/WebApp/basic/web；
然后在node命令行输入：npm run dev
5. 注意事项，关于我们和联系我们由后台返回数据，必须要求这两个选项的后台新闻都各自只有一条。
6. 首页的轮播图暂时是写死的。为img01-img05
