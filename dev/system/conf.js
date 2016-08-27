/*
	加载页面路径
*/
define(['$'],function($){
	var base_path = '/FUIT',
		config = [{
		type: 'sim',
		hd_url: base_path + '/modules/pc/head/head_2/head-2.html',
		side_url: base_path + '/modules/pc/side/side_1/side-1.html',
		side_sm_url: base_path +'/modules/pc/side/side_1/side-1-sm.html'
	}]

	return {
		configs: config
	}
})