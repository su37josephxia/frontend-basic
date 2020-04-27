const plugin = require('vuepress-plugin-baidu-google-analytics')
module.exports = {
    plugins: [
        // '@vuepress/active-header-links',
        ['vuepress-plugin-baidu-google-analytics', {
            hm: 'e66bb2ffeef58a94caced7c0bbcd4926',
            ga: 'UA-138065799-1',
            ignore_hash: false
        }]
    ],

    title: '前端大班车',
    // head: [
    //     ['link', { rel: 'icon', href: '/logo.png' }]
    //   ],
    ga: 'UA-138065799-1',
    description: '',
    themeConfig: {
        displayAllHeaders: false,
        nav: [
            { text: 'Vue3.0', link: 'http://localhost:8081/vue3/' },
            { text: '掘金专栏', link: 'https://juejin.im/user/593e0a32a0bb9f006b560bad' },
            { text: 'GitHub', link: 'https://github.com/su37josephxia/frontend-basic' },
        ],
        sidebar: {
            // Vue3子站
            '/vue3/': [
                '',
                '如何读源码',
                'CompositionAPI',
                '响应式实现对比',
                '虚拟Dom',
                'Fragment',
                'Teleport',
                'Suspense',
                'TypeScript支持',
                '自定义渲染器',
                '性能提升',

            ],
            '/': [
                // '',        /* / */
                ['/vue3/', 'Vue3资料合集(2012新)'],
                ['/document/database/', 'SQL基础'],
                {
                    title: 'Linux基础',
                    collapsable: false,
                    children: [
                        '/document/server/Linux命令.md',
                        '/document/server/实战阿里云.md',
                        '/document/server/实战Mac.md',
                    ]
                },
                {
                    title: 'JS基础 （ECMA 262标准）',
                    collapsable: false,
                    children: [
                        '/document/doc/变量类型和计算.md',
                        '/document/doc/原型和原型链.md',
                        '/document/doc/异步和单线程.md',
                        '/document/doc/异常处理_error对象.md',
                        '/document/doc/其他知识.md',
                        // '/闭包和作用域.md',
                        '/document/doc/this_call_apply_bind_总结.md'
                    ]
                },
                {
                    title: 'JS Web API (W3C标准)',
                    collapsable: false,
                    children: [
                        '/document/doc/DOM操作.md',
                        '/document/doc/BOM操作.md',
                        '/document/doc/事件.md',
                        '/document/doc/Ajax_XMLHttpRequest.md',
                        '/document/doc/存储.md',
                    ]
                },
                {
                    title: 'HTTP基础',
                    collapsable: false,
                    children: [
                        '/document/node/cache/HTTP缓存.md',
                        // '/document/doc/存储.md',
                    ]
                },

                // ['../','ABC']
                // {
                //     title: 'DevOps',
                //     collapsable: false,
                //     children: [
                //         '/Linux命令.md',
                //         '/Nginx配置.md'
                //     ]
                // },
                // {
                //     title: '算法',
                //     collapsable: false,
                //     children: [['/算法_去重_排序_递归.md', '一道面试题引发的思考']]
                // },
                // {
                //     title: '开源',
                //     collapsable: false,
                //     children: [
                //         '/从零到一开发一个开源项目.md',
                //     ]
                // },
            ],
            

        }



    },
    // plugins: [
    //     'vuepress-plugin-baidu-autopush',
    //     ['baidu-tongji', {
    //         hm: 'e66bb2ffeef58a94caced7c0bbcd4926'
    //     }]
    // ]

    // plugins: ['vuepress-plugin-baidu-tongji', {
    //     hm: 'e66bb2ffeef58a94caced7c0bbcd4926'
    // }]



}