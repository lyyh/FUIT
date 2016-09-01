define(function() {
	//存放tab标签的数组
	var tabArray = [],
		max_num = 0;

	/*tab 标签事件 begin*/
	function tabEventListen() {
		//点击首页标签
		$('.m-tab-indexPage').click(function() {
			//去掉其他的点击效果
			$('.u-tab-list-1').removeClass('z-sel')
			$(this).addClass('z-sel');
			//隐藏多余标签模块
			(function() {
				//是否隐藏多余标签
				if ($('.m-tab-down').css('left') == '-128px') {
					$('.m-tab-down').animate({
						left: -140,
						opacity: 0
					}, 400, function() {
						$('.m-tab-down').hide();
					});
				}
			})();
		})

		//关闭普通标签
		$('.u-tab-list').on('click', '.u-tab-close', function() {

			//多余标签移至普通标签
			if ($('.tab-num').html() > 0) {
				var html = tabArray[max_num].html;
				$('.m-tab-down .u-tab-list-1').eq(0).remove();
				$('.m-tab .u-tab-list').append(html);
			}

			// 从数组中移除标签
			for (var i = 0; i < tabArray.length; i++){
				if ($(this).data('id') == tabArray[i].id) {
					tabArray.splice(i, 1);
					break;
				}
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
			for (var i = 0; i < tabArray.length; i++){
				if ($(this).attr('data-id') == tabArray[i].id) {
					tabArray.splice(i, 1);
					break;
				}
			}
			$(this).parents('.u-tab-list-1').remove();

			//多余标签数量
			var tab_num = $('.tab-num').html();
			$('.tab-num').html(--tab_num);
			if (tab_num === 0) $('.m-tab-num').hide();
		})

		//标签点击效果
		$('.u-tab-list,.u-tab-down-list').on('click', '.u-tab-list-1', function() {
			//是否隐藏多余标签
			(function() {
				//是否隐藏多余标签
				if ($('.m-tab-down').css('left') == '-128px') {
					$('.m-tab-down').animate({
						left: -140,
						opacity: 0
					}, 400, function() {
						$('.m-tab-down').hide();
					});
				}
			})();

			//去掉其他的点击效果
			$('.u-tab-list-1,.m-tab-indexPage').removeClass('z-sel')
			$(this).addClass('z-sel');
		})
	}
	/*tab 标签事件 end*/

	/*动态添加 tab begin*/
	function addTabEvent(maxNum) {
		max_num = maxNum;
		//点击菜单添加标签(大侧栏)
		$('.m-menu-bd,.m-menu-bd-sm').on('click', 'a', function() {
			var text = $(this).find('.menu-text').html(),
				menu_id = $(this).attr('data-menuid'),
				tab_html = '';

			//判断menu_id是否为空	
			if (!menu_id) return;
			if (!text) text = $(this).data('text');

			//判断标签是否存在，若存在赋予点击状态
			for (var i = 0; i < tabArray.length; i++)
				if (tabArray[i].id == menu_id) {
					for (var j = 0; j < $('.u-tab-close').length; j++)
						if ($('.u-tab-close').eq(j).data('id') == menu_id) {
							//去掉其他的点击效果
							$('.u-tab-list-1').removeClass('z-sel')
							$('.u-tab-close').eq(j).parents('.u-tab-list-1').addClass('z-sel');

							//是否隐藏多余标签
							if ($('.m-tab-down').css('left') == '-128px') {
								$('.m-tab-down').animate({
									left: -140,
									opacity: 0
								}, 400, function() {
									$('.m-tab-down').hide();
								});
							}
						}
					return;
				}

			$('.u-tab-list-1,.m-tab-indexPage').removeClass('z-sel');
			if ($('.u-tab-list').children().length < max_num) {
				tab_html = "<li class='u-tab-list-1 z-sel'><a><span class='u-tab-list-text'>" + text + "</span><span class='u-tab-close' data-id='" + menu_id + "'><i class='fa fa-close'></i></span></a></li>";
				$('.u-tab-list').append(tab_html);

			} else { //显示标签数量

				//判断元素是否隐藏
				if ($('.m-tab-num').is(':hidden')) {
					$('.m-tab-num').show();
				}

				var tab_num = $('.tab-num').html();
				$('.tab-num').html(++tab_num);

				tab_html = "<li class='u-tab-list-1 z-sel'><a><span class='u-tab-list-text'>" + text + "</span><span class='u-tab-close' data-id='" + menu_id + "'><i class='fa fa-close'></i></span></a></li>";
				$('.u-tab-down-list').append(tab_html);
			}

			//将标签存放进数组
			tabArray.push({
				id: menu_id,
				html: tab_html
			});

		})

		//ajax加载
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