define(['$'],function(){
	/*tab 标签事件 begin*/
	function tabEventListen(tabbox,tab,close_name){
		//关闭标签
		$(tabbox).on('click',close_name,function(){
			$(this).parents(tab).remove();
		})
	}
	/*tab 标签事件 end*/

	/*动态添加 tab begin*/
	function addTabEvent(){
		$('.m-menu-bd').on('click','a',function(){
			console.log($('.u-tab-list').children().length)
			if($('.u-tab-list').children().length < 5){
				var text = $(this).find('.menu-text').html(),
			    	tab_html = "<li class='u-tab-list-1'><a><span>" + text + "</span><span class='tab-close'><i class='fa fa-close'></i></span></a></li>";

			 	$('.u-tab-list').append(tab_html);
			}
		})

		function loadMainContent(url){
			$.get(url, function(data) {
				console.log(data)
			});
		}
	}
	/*动态添加 tab end*/
	return{
		tabEventListen: tabEventListen,
		addTabEvent: addTabEvent
	}
})