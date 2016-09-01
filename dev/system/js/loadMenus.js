define(['$', 'handlebars'], function($, HB) {
	/*注册helper begin*/
	//大侧栏菜单
	HB.registerHelper('tree', function() {
		var str = '';
		if (this.length) {
			str += '<ul>';

			//大侧栏菜单
			(function getTreeHtml(trees) {
				trees.forEach(function(item) {
					var level = item.level,
						offset = 10 * level;

					if (item.children.length) {
						str += '<li><a class="subMenu" data-sel="" data-href="' + item.url + '" ><i class="' + item.icon + '" style="margin-right:' + offset + 'px;margin-left:' + offset + 'px"></i><span class="menu-text">' + item.text + '</span><span class="menu-arrow"><i class="fa fa-fw fa-angle-up fa-lg u-sub-menu"></i></span></a>';
						str += '<ul class="z-hide">';
						getTreeHtml(item.children);
						str += '</ul>';
					} else str += '<li><a class="subMenu" data-href="' + item.url + '" data-menuId = "' + item.id + '"><i class="' + item.icon + '" style="margin-right:' + offset + 'px;margin-left:' + offset + 'px"></i><span class="menu-text">' + item.text + '</span></a>';

					str += '</li>';
				})
			})(this)

			str += '</ul>';
		}
		return new HB.SafeString(str);
	})

	//小侧栏菜单
	HB.registerHelper('smTree', function() {
			var str = '';
			if (this.length) {
				str += '<ul class="m-menu-list-sm">';

				//小侧栏一级菜单
				(function(trees) {
					trees.forEach(function(item) {
						var level = item.level,
							offset = 10 * level;

						if (item.children.length) {
							str += '<li class="u-menu-list-sm"><span class="u-list-sm-btn"><i class="fa fa-user fa-2x fa-fw"></i></span>';
							str += '<ul class="z-hide">';

							//小侧栏多级菜单
							(function getChildrenHtml(items) {
								items.forEach(function(item) {
									var level = item.level,
										offset = 200 * (level - 1);

									if (item.children.length) {
										str += '<li class="sm-subMenu"><a  data-sel="" data-href="' + item.url + '" ><i class="' + item.icon + '" style=""></i><span class="menu-text">' + item.text + '</span><span class="menu-arrow"><i class="fa fa-fw fa-angle-up fa-lg u-sub-menu"></i></span></a>';
										str += '<ul class="z-hide" style="margin:0 0 0 ' + offset + 'px">';
										getChildrenHtml(item.children);
										str += '</ul>';
									} else str += '<li class="sm-subMenu"><a data-href="' + item.url + '" data-menuId = "' + item.id + '"><i class="' + item.icon + '" style=""></i><span class="menu-text">' + item.text + '</span></a>';

									str += '</li>';
								})
							})(item.children)

							str += '</ul>';
						} else str += '<li class="u-menu-list-sm"><a class="u-list-sm-subbtn" data-href="' + item.url + '" data-menuId = "' + item.id + '" data-text="' + item.text + '"><i class="fa fa-user fa-2x fa-fw"></i></a>';

						str += '</li>';
					})
				})(this)

				str += '</ul>';
			}
			return new HB.SafeString(str);
		})
		/*注册helper end*/

	/*模板转化成html begin*/
	//初始化菜单
	function initMenus() {
		$.get('/FUIT/system/data/menus.json', function(data, textStatus) {
			if (textStatus == 'success') createMenus(data);
		});
	}

	function createMenus(tree) {
		var source = $("#menusTree").html(), //handlebars模板
			source_sm = $("#smMenusTree").html(),
			tmpl = HB.compile(source),
			tmpl_sm = HB.compile(source_sm),
			html = tmpl(tree),
			html_sm = tmpl_sm(tree);

		$('.m-menu-bd').append(html); //html插入节点
		$('.m-menu-bd-sm').append(html_sm);
		menuActions();
	}
	/*模板转化成html end*/

	/*绑定菜单事件 begin*/
	function menuActions() {
		/*显示菜单点击效果 begin*/
		$('.m-menu-bd a').click(function() {
				//菜单栏点击效果
				$('.m-menu-bd a:not(' + this + ')').removeClass('z-sel');
				$(this).toggleClass('z-sel');

			})
			/*显示菜单点击效果 end*/

		/*菜单展开 收缩 begin*/
		$('.subMenu').click(function() {
				$(this).find('.menu-arrow i').toggleClass('fa-angle-down')

				if (!$(this).attr('data-sel')) {
					$(this).siblings('ul').slideDown(400)
					$(this).attr('data-sel', '1');
				} else {
					$(this).siblings('ul').slideUp(400);
					$(this).attr('data-sel', '');
				}
			})
			/*菜单展开 收缩 end*/

		/*侧栏展开 收缩 begin*/
		//收缩
		$('.u-menu-hd').click(function() {
			$('#g-side').animate({
				left: -280
			}, 200);
			$('#g-side-sm').animate({
				left: 0
			}, 200);

			$('.g-side-bd').hide(200, function() {
				$('.g-side-bd-sm').css('width', '80px');
			});
		})

		//展开
		$('.u-menu-hd-sm').click(function() {
				$('.g-side-bd-sm').css('width', 0);

				$('#g-side').animate({
					left: 0
				}, 200);
				$('#g-side-sm').animate({
					left: -80
				}, 200)
				$('.g-side-bd').show(200);
			})
			/*侧栏展开 收缩 end*/

		/*侧栏缩小 being*/
		//显示下级菜单
		$('.u-menu-list-sm').mouseover(function() {
			$(this).children('ul').show();
		})
		$('.u-menu-list-sm').mouseout(function() {
			$(this).children('ul').hide();
		})
		$('.sm-subMenu').mouseover(function() {
			$(this).children('ul').show();
			$(this).children('a').children('span').eq(1).children('i').addClass('fa-angle-down');
		});
		$('.sm-subMenu').mouseout(function() {
			$(this).children('ul').hide();
			$(this).children('a').children('span').eq(1).children('i').removeClass('fa-angle-down');
		});
		/*侧栏缩小 end*/

	}
	/*绑定菜单事件 end*/
	return {
		initMenus: initMenus
	}
})