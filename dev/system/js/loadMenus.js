define(['$', 'handlebars'], function($, HB) {
	/*注册helper begin*/
	HB.registerHelper('tree', function() {
		var str = '';
		if (this.length){
			str += '<ul>';
			getTreeHtml(this)
			str += '</ul>';
		}
		return new HB.SafeString(str);

		function getTreeHtml(trees){
			trees.forEach(function(item) {
				var level  = item.level,
					offset = 10 * level;

				if(item.children.length){
					str += '<li><a class="subMenu" data-sel="" data-href="'+ item.url +'" ><i class="'+item.icon+'" style="margin-right:'+offset+'px;margin-left:'+ offset +'px"></i><span class="menu-text">' + item.text + '</span><span class="menu-arrow"><i class="fa fa-fw fa-angle-up fa-lg u-sub-menu"></i></span></a>';
					str += '<ul class="z-hide">';
					getTreeHtml(item.children);
					str += '</ul>';
				}
				else str += '<li><a class="subMenu" data-href="'+ item.url +'" data-menuId = "'+item.id+'"><i class="'+item.icon+'" style="margin-right:'+offset+'px;margin-left:'+ offset +'px"></i><span class="menu-text">' + item.text + '</span></a>';
				
				str += '</li>';
			})
		}
	})
	/*注册helper end*/

	/*模板转化成html begin*/
	function initMenus() {
		$.get('/FUIT/system/data/menus.json', function(data, textStatus) {
			if (textStatus == 'success') createMenus(data);
		});
	}


	function createMenus(tree) {
		var source = $("#menusTree").html(), //handlebars模板
			tmpl = HB.compile(source),
			html = tmpl(tree);

		$('.m-menu-bd').append(html); //html插入节点
		menuActions();
	}
	/*模板转化成html end*/
	
	/*绑定菜单事件 begin*/
	function menuActions(){
		/*显示菜单点击效果 begin*/
		$('.m-menu-bd a').click(function(){
			//菜单栏点击效果
			$('.m-menu-bd a:not('+this+')').removeClass('z-sel');
			$(this).toggleClass('z-sel');

		})
		/*显示菜单点击效果 end*/

		/*菜单展开 收缩 begin*/
		$('.subMenu').click(function(){
			$(this).find('.menu-arrow i').toggleClass('fa-angle-down')

			if(!$(this).attr('data-sel')){
				$(this).siblings('ul').slideDown(400)
				$(this).attr('data-sel','1');
			}
			else {
				$(this).siblings('ul').slideUp(400);
				$(this).attr('data-sel','');
			}				
		})
		/*菜单展开 收缩 end*/

		/*侧栏展开 收缩 begin*/
		//收缩
		$('.u-menu-hd').click(function(){
			$('#g-side').animate({left:-280},200);
			$('#g-side-sm').animate({left:0},200);

			$('.g-side-bd').hide(200,function(){
				$('.g-side-bd-sm').css('width','80px');
			});
		})

		//展开
		$('.u-menu-hd-sm').click(function(){
			$('.g-side-bd-sm').css('width',0);

			$('#g-side').animate({left:0},200);
			$('#g-side-sm').animate({left:-80},200)
			$('.g-side-bd').show(200);
		})
		/*侧栏展开 收缩 end*/

	}
	/*绑定菜单事件 end*/
	return {
		initMenus: initMenus
	}
})