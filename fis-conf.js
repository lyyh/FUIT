/*设置编译范围*/
fis.set('project.files', ['dev/**']);


/*设置发布路径*/
fis.match(/\/dev\/(.*)/i, {
    release: '/FUIT/$1', /*所有资源发布时产出到 /FUIT 目录下*/
    url: '/FUIT/$1' /*所有资源访问路径设置*/
});

/*模块化加载器配置*/
fis.match('::package', {
  postpackager: fis.plugin('loader', {
    // allInOne: true, //js&css打包成一个文件
    sourceMap: true, //是否生成依赖map文件
    useInlineMap: true //是否将sourcemap作为内嵌脚本输出
  })
});

/*指定模块化插件*/
fis.hook('amd', {
    paths: {
        $: '/dev/common/lib/js/jquery',
        domready: '/dev/common/lib/js/domReady',
        bs: '/dev/common/lib/bootstrap/js/bootstrap',
        mk: '/dev/common/lib/js/mock',
        handlebars:"/dev/common/lib/js/handlebars",
        loadModule: '/dev/system/js/loadModule',
        loadMenus: '/dev/system/js/loadMenus',
        tabActions: '/dev/system/js/tabActions',
        conf: '/dev/system/conf'
    },
    shim: {
        bs:{
          deps:['$'],
          exports: 'bs'
        } ,
        handlebars: {
            exports: 'Handlebars'
        },
        $: {
          deps: ['$'],
          exports: '$'
        },
        tabActions: {
          deps: ['$'],
          exports: 'tabActions'
        }
    }
});

/*指定哪些目录下的文件执行define包裹*/
fis.match('/dev/system/**', {
  isMod: true
});

fis.match('/dev/modules/**', {
  isMod: true
});


/*预编译less*/
fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
})

/*加 md5*/
// fis.match('*.{js,css,png}', {
//   useHash: true
// });

/*对 CSS 进行图片合并*/
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

/*压缩js*/
// fis.match('*.js', {
//   // fis-optimizer-uglify-js 插件进行压缩，已内置
//   optimizer: fis.plugin('uglify-js')
// });

/*压缩css*/
fis.match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

/*压缩png*/
fis.match('*.{png,jpg,jpeg}', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

/*自动给 css 属性添加前缀，让标准的 css3 支持更多的浏览器.*/
fis.match('*.{css,less,scss}', {
  preprocessor: fis.plugin('autoprefixer', {
    "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
    "cascade": true
  })
})

/*支持 es6、es7 或者 jsx 编译成 es5*/
fis.match('*.js', {
  parser: fis.plugin('babel-5.x')
})

/*可直接在js中require文件，如图片、json、静态文件*/
fis.match('*.{js,es,es6,jsx,ts,tsx}', {
  preprocessor: fis.plugin('js-require-file')
})

/*开发过程中不进行压缩*/
fis.media('debug').match('*.{js,css,png}', {
  useHash: false,
  useSprite: false,
  optimizer: null
})

