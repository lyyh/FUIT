define(['$','conf'],function($,conf){

	/*加载页面 begin*/
	function loadHtml(obj){
		if(obj.type == 'sim'){
			conf.configs.forEach(function(item){
				if(item.type == 'sim'){
					loadSimPage(obj,item);
				}
			})
		}
		else if(obj.type == 'cex')loadCexPage(obj);
	}
	/*加载页面 end*/
	//简约型
	function loadSimPage(obj,item){
		var side = obj.side,
			side_sm = obj.side_sm,
			main = obj.main,
			head = obj.head,
			body = obj.body,
			objArray = [{
				url: item.hd_url,
				selector: '#' + head
			},{
				url: item.side_url,
				selector: '#' + side
			},{
				url:item.side_sm_url,
				selector: '#' + side_sm
			}]

		ajaxLoad(objArray)
	}

	//复杂型
	function loadCexPage(obj){

	}
	/*页面类型 begin*/

	/*页面类型 end*/
	/*ajax 加载 being*/
	function ajaxLoad(objArr){
		objArr.forEach(function(item){
			$.get(item.url, function(data) {
				$(item.selector).append(data)
			});
		})
		
	}
	/*ajax 加载 end*/

	return {
		loadHtml: loadHtml
	}
})