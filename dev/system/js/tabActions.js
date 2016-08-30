define(function() {
	//存放tab标签的数组
	var tabArray = [];

	/*tab 标签事件 begin*/
	function tabEventListen() {
		//关闭普通标签
		$('.u-tab-list').on('click', '.u-tab-close', function() {

			//多余标签移至普通标签
			if ($('.tab-num').html() > 0) {
				var html = tabArray[5].html;
				$('.m-tab-down .u-tab-list-1').eq(0).remove();
				$('.m-tab .u-tab-list').append(html);
			}

			// 从数组中移除标签
			for (var i = 0; i < tabArray.length; i++)
				if ($(this).attr('data-id') == tabArray[i].id) {
					tabArray.splice(i, 1);
					break;
				}

			$(this).parents('.u-tab-list-1').remove();

			//减少多余标签数量及隐藏多余标签
			var tab_num = $('.tab-num').html();
			if (tab_num > 0) {
				$('.tab-num').html(--tab_num);
			}
			if (tab_num === 0) $('.m-tab-num').hide();
		})

		//多余标签模块 显示和隐藏
		$('.u-tab-num').click(function() {

			if ($('.m-tab-down').css('left') == '-128px')
				$('.m-tab-down').animate({
					left: -140,
					opacity: 0
				}, 400, function() {
					$('.m-tab-down').hide();
				});
			else {
				$('.m-tab-down').show();
				$('.m-tab-down').animate({
					left: -128,
					opacity: 1
				})
			}
		})

		//点击删除多余标签
		$('.u-tab-down-list').on('click', ' .u-tab-close', function() {
			// 从数组中移除标签
			for (var i = 0; i < tabArray.length; i++)
				if ($(this).attr('data-id') == tabArray[i].id) {
					tabArray.splice(i, 1);
					break;
				}

			$(this).parents('.u-tab-list-1').remove();

			//多余标签数量
			var tab_num = $('.tab-num').html();
			$('.tab-num').html(--tab_num);
			if (tab_num === 0) $('.m-tab-num').hide();
		})
	}
	/*tab 标签事件 end*/

	/*动态添加 tab begin*/
	function addTabEvent(max_num) {
		//点击菜单添加标签
		$('.m-menu-bd').on('click', 'a', function() {
			var text = $(this).find('.menu-text').html(),
				menu_id = $(this).attr('data-menuId'),
				tab_html = '';

			//判断menu_id是否为空	
			if (!menu_id) return;

			for (var i = 0; i < tabArray.length; i++)
				if (tabArray[i].id == menu_id) {
					return;
				}

			if ($('.u-tab-list').children().length < max_num) {
				tab_html = "<li class='u-tab-list-1'><a><span class='u-tab-list-text'>" + text + "</span><span class='u-tab-close' data-id='" + menu_id + "'><i class='fa fa-close'></i></span></a></li>";
				$('.u-tab-list').append(tab_html);

			} else { //显示标签数量

				//判断元素是否隐藏
				if ($('.m-tab-num').is(':hidden')) {
					$('.m-tab-num').show();
				}

				var tab_num = $('.tab-num').html();
				$('.tab-num').html(++tab_num);

				tab_html = "<li class='u-tab-list-1'><a><span class='u-tab-list-text'>" + text + "</span><span class='u-tab-close' data-id='" + menu_id + "'><i class='fa fa-close'></i></span></a></li>";
				$('.u-tab-down-list').append(tab_html);
			}

			//将标签存放进数组
			tabArray.push({
				id: menu_id,
				html: tab_html
			});

		})

		function loadMainContent(url) {
			$.get(url, function(data) {
				console.log(data)
			});
		}
	}
	/*动态添加 tab end*/

	return {
		tabEventListen: tabEventListen,
		addTabEvent: addTabEvent
	}
})