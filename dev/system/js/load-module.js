define(['$','conf'],function($,conf){
	var hdhtml_url = conf.url;

	/*加载页面 begin*/
	function loadHtml(obj){
		if(obj.type == 'sim')loadSimPage(obj);
		else if(obj.type == 'cex')loadCexPage(obj);
	}
	/*加载页面 end*/
	function loadSimPage(obj){
		var side = obj.side,
			main = obj.main,
			head = obj.head,
			body = obj.body,
			objArray = [{
				hdhtml_url: hdhtml_url,
				hd_sel: '#' + head
			}]

		ajaxLoad(objArray)
	}

	/*页面类型 begin*/

	/*页面类型 end*/
	/*ajax 加载 being*/
	function ajaxLoad(objArr){
		objArr.forEach(function(item){
			console.log(item.hdhtml_url)
			console.log(item.hd_sel)

			$.get(item.hdhtml_url, function(data) {
				$(item.hd_sel).append(data)
			});
		})
		
	}
	/*ajax 加载 end*/

	return {
		loadHtml: loadHtml
	}
})