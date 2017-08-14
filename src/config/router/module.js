/**
 * Created by sailengsi on 2017/7/12.
 */
import {
	Home,
	Content,
	Modules
} from '../../components/';

module.exports = [{
	path: '/module',
	name: '系统功能',
	icon: 'inbox',
	component: Home,
	redirect: '/module/acManage',
	children: [{
		path: 'acManage',
		name: '认证中心管理',
		icon: 'inbox',
		component: Content,
		redirect: '/module/acManage/home',
		children: [{
			path: 'home',
			name: '首页',
			icon: 'reorder',
			hidden:true,
			component: Modules.Module.AcManage.HomePage
		}, {
			path: 'speManage',
			name: '专家管理',
			icon: 'reorder',
			component: Modules.Module.AcManage.SpeManage
		}, {
			path: 'addExpert',
			name: '添加专家',
			icon: 'reorder',
			hidden:true,
			component: Modules.Module.AcManage.AddExpert
		}, {
			path: 'bussManage',
			name: '商家管理',
			icon: 'reorder',
			component: Modules.Module.AcManage.BussManage
		},{
			path: 'addBusiness',
			name: '添加商家',
			icon: 'reorder',
			hidden:true,
			component: Modules.Module.AcManage.AddBusiness
		}, {
			path: 'weather',
			name: '气象站信息管理',
			icon: 'reorder',
			component: Modules.Module.AcManage.Weather
		}, {
			path: 'addWeStation',
			name: '添加气象站',
			icon: 'reorder',
			hidden:true,
			component: Modules.Module.AcManage.AddWeStation
		},{
			path: 'setExGroup',
			name: '专家组设定',
			icon: 'reorder',
			component: Modules.Module.AcManage.SetExGroup
		},{
			path: 'news',
			name: '新闻后台管理',
			icon: 'reorder',
			component: Modules.Module.AcManage.NewsManage
		},{
			path: 'addNews',
			name: '添加新闻',
			icon: 'reorder',
			hidden:true,
			component: Modules.Module.AcManage.AddNews
		}]
	}, {
		path: 'cquality',
		name: '气候品质认证',
		icon: 'inbox',
		component: Content,
		redirect: '/module/cquality/epScore',
		children: [{
			path: 'edit',
			name: '专家评分',
			icon: 'edit',
			component: Modules.Module.Cquality.EpScore
		}, {
			path: 'certApplica',
			name: '认证申请',
			icon: 'edit',
			component: Modules.Module.Cquality.CertApplica
		},{
			path: 'apply',
			name: '新增认证申请',
			icon: 'edit',
			hidden:true,
			component: Modules.Module.Cquality.Apply
		},{
			path: 'examApplica',
			name: '审批认证申请',
			icon: 'edit',
			component: Modules.Module.Cquality.ExamApplica
		},{
			path: 'epGroup',
			name: '专家组分配',
			icon: 'edit',
			component: Modules.Module.Cquality.Epgroup
		}, {
			path: 'embodiment',
			name: '实施方案',
			icon: 'edit',
			component: Modules.Module.Cquality.Embodiment
		},{
			path: 'dataManage',
			name: '数据管理',
			icon: 'reorder',
			component: Modules.Module.Cquality.DataManage
		}, {
			path: 'qualityFile',
			name: '品质档案',
			icon: 'reorder',
			component: Modules.Module.Cquality.QualityFile
		}, {
			path: 'projectFile',
			name: '项目归档',
			icon: 'reorder',
			component: Modules.Module.Cquality.ProjectFile
		},{
			path: 'progress',
			name: '进度查询',
			icon: 'reorder',
			component: Modules.Module.Cquality.Progress
		}]
	}, {
		path: 'certModManage',
		name: '认证模型管理',
		icon: 'inbox',
		component: Content,
		redirect: '/module/certModManage/meteorElement',
		children: [{
			path: 'meteorElement',
			name: '气象要素',
			icon: 'edit',
			component: Modules.Module.CertModManage.MeteorElement
		}, {
			path: 'productInfo',
			name: '产品信息',
			icon: 'edit',
			component: Modules.Module.CertModManage.ProductInfo
		},{
			path: 'setModule',
			name: '模型制定',
			icon: 'edit',
			component: Modules.Module.CertModManage.SetModule
		}, {
			path: 'modGrade',
			name: '模型等级',
			icon: 'edit',
			component: Modules.Module.CertModManage.ModGrade
		}]
	}, {
		path: 'traceability',
		name: '农网溯源',
		icon: 'inbox',
		component: Content,
		redirect: '/module/traceability/',
		children: [{
			path: 'traApply',
			name: '溯源申请',
			icon: 'reorder',
			component: Modules.Module.Traceability.TraApply
		},{
			path: 'traCheck',
			name: '溯源审核',
			icon: 'reorder',
			component: Modules.Module.Traceability.TraCheck
		},{
			path: 'progressCheck',
			name: '进度查询',
			icon: 'reorder',
			component: Modules.Module.Traceability.ProgressCheck
		}]
	}, {
		path: 'sys',
		name: '系统管理',
		icon: 'inbox',
		component: Content,
		redirect: '/module/sys/modManage',
		children: [{
			path: 'modManage',
			name: '模块管理',
			icon: 'reorder',
			component: Modules.Module.Sys.ModManage
		}, {
			path: 'roleManage',
			name: '角色管理',
			icon: 'reorder',
			component: Modules.Module.Sys.RoleManage
		}, {
			path: 'userManage',
			name: '用户管理',
			icon: 'reorder',
			component: Modules.Module.Sys.UserManage
		}, {
			path: 'dictManage',
			name: '字典管理',
			icon: 'reorder',
			component: Modules.Module.Sys.DictManage
		}, {
			path: 'logManage',
			name: '日志管理',
			icon: 'reorder',
			component: Modules.Module.Sys.LogManage
		}, {
			path: 'areaManage',
			name: '地区管理',
			icon: 'reorder',
			component: Modules.Module.Sys.AreaManage
		}]
	}, {
		path: 'certLabelManage',
		name: '认证标签管理',
		icon: 'inbox',
		component: Content,
		redirect: '/demo/certLabelManage/',
		children: [{
			path: 'labelManage',
			name: '标签管理',
			icon: 'reorder',
			component: Modules.Module.CertLabelManage.LabelManage
		}, {
			path: 'labelApply',
			name: '标签申请',
			icon: 'reorder',
			component: Modules.Module.CertLabelManage.LabelApply
		}, {
			path: 'codeAnalyze',
			name: '二维码扫描分析',
			icon: 'reorder',
			component: Modules.Module.CertLabelManage.CodeAnalyze
		},{
			path: 'lineEcharts',
			name: '二维码扫描分析',
			icon: 'reorder',
			hidden:true,
			component: Modules.Module.CertLabelManage.LineEcharts
		}]
	},{
		path: 'companyCenter',
		name: '企业资讯中心',
		icon: 'inbox',
		component: Content,
		redirect: '/module/companyCenter/newsCenter',
		children: [{
			path: 'newsCenter',
			name: '新闻中心',
			icon: 'edit',
			component: Modules.Module.CompanyCenter.NewsCenter
		},{
			path: 'updateNews',
			name: '新闻中心',
			icon: 'edit',
			hidden:true,
			component: Modules.Module.CompanyCenter.UpdateNews
		}, {
			path: 'productCenter',
			name: '产品中心',
			icon: 'edit',
			component: Modules.Module.CompanyCenter.ProductCenter
		}, {
			path: 'imgManage',
			name: '产品图片管理',
			icon: 'edit',
			component: Modules.Module.CompanyCenter.ImgManage
		}]
	}]
}];
    