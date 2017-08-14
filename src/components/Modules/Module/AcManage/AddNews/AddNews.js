import {
	gbs
} from 'config/settings.js';

module.exports = {
	name   : 'addNews',
	data() {
		return {
			newsType:[],

			article_data: {
				NewsTitle  : '',
				NewsKey   : '',
				NewsCategory:'',
				status : true,
				Text: '',
			},
			temp        : {
				Text: ''
			},
			rules       : {
				 NewsTitle: [{
                    required: true,
                    message : '新闻标题不能为空！',
                    trigger : 'blur'
                }],
                NewsCategory: [{
                    required: true,
                    message : '新闻类别必选！',
                    trigger : 'blur'
                }],
                NewsKey: [{
                    required: true,
                    message : '关键字不能为空！',
                    trigger : 'blur'
                }],
                Text:[{
                    required: true,
                    message : '新闻内容不能为空！',
                    trigger : 'blur'
                }]
			},
			wangEditor  : {
				bar: [
					'source', '|',
					'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
					'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
					'link', 'unlink', 'table', 'emotion', '|',
					'img',
					'video',
					// 'location',
					'insertcode', '|',
					'undo', 'redo'
				]
			}
		}
	},
	methods: {
		getNewsCategory(){
               let _this = this;
               this.axios.post('/index.php?r=AuthCenter/news/get-all-news-group')
                .then((res)=>{
                var hh = JSON.parse(res.request.response); 
                    _this.newsType = hh.data;
               });
		},
		reBack(){
			this.$router.push('/module/acManage/news');
		},
		/**
		 * 提交表单
		 * @param  {string} formName 表单名称
		 */
		onSubmit(formName){
			var ref = this.$refs[formName];
			var _this = this;
			ref.validate((valid) => {
				if (valid) {
					if (!this.temp.Text) {
						if ((this.article_data.Text.indexOf('<iframe') == -1 || this.article_data.Text.indexOf('</iframe>') == -1) && (this.article_data.Text.indexOf('<img') == -1)) {
							this.$message.error('文章内容不能为空！');
							return;
						}
						return;
					}
					this.axios.post('/index.php?r=AuthCenter/news/add-news',_this.article_data)
					.then((res)=>{
						var hh = JSON.parse(res.request.response);
						if(hh.status===200){
							//this.$message.success("添加成功！");
							this.$message({
								message:'添加成功！',
								type:'success'
							});
							this.$router.push('/module/acManage/news');
						}else{
							this.$message({
								message:hh.msg,
								type:'error'
							})
						}
					});
				}
			});
		}
		,
		setContent(html, text){
			this.article_data.Text = html;
			this.temp.Text         = text;
		}
		,
		reset_article(article){
			this.$refs[article].resetFields();
		}
	},

	mounted(){
		this.getNewsCategory();
		var self   = this;
		var editor = new wangEditor('article');

		editor.config.uploadImgFileName = 'article';
		editor.config.uploadImgUrl = gbs.host + '/index.php?r=common/upload';
		// 配置自定义参数（举例）
		/*editor.config.uploadParams = {
			token   : this.$store.state.user.userinfo.token,
			username: this.$store.state.user.userinfo.username
		};*/

		// 自定义load事件
		editor.config.uploadImgFns.onload = (data) => {
			if (data.status === 200) {
				//alert(data.data.url);
				// 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
			//	var originalName = editor.uploadImgOriginalName || '';
				var originalName = editor.uploadImgOriginalName || '';
				// 如果 resultText 是图片的url地址，可以这样插入图片：
				editor.command(null, 'insertHtml', '<img src="' + gbs.host + data.data.url + '" alt="' + originalName + '" style="max-width:80%;"/>');
			} else {
				if (data.status === 404) {
					this.$message.error('上传错误信息：token无效！');
				} else {
					this.$message.error('上传错误信息：' + data.msg);
				}
			}

		};

		editor.config.uploadImgFns.onerror = (xhr) => {
			this.$message.error('上传错误信息：网络错误！');
		};

		editor.config.menus = this.wangEditor.bar;

		//编辑器改变事件时，同步更新文章内容
		editor.onchange = function () {

			var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
				html = this.$txt.html();

			self.setContent(html, text);
		};

		editor.config.hideLinkImg = true;

		//自定义上传图片错误事件
		editor.create();

		/*if (this.$route.query.id) {
			var data = {
				id: this.$route.query.id
			};
			this.$$api_article_findArticle(data, (data) => {
				// console.log(data);

				this.article_data        = data.article_info;
				this.article_data.status = data.article_info.status == 1 ? true : false;
				this.article_data.tabs   = data.article_info.tabs.split(',');

				$("#article").html(this.article_data.Text);
			});
		}*/
	}
}