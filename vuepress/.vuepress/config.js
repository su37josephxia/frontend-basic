module.exports = {
    title: '前端大班车',
    // head: [
    //     ['link', { rel: 'icon', href: '/logo.png' }]
    //   ],
    ga: 'UA-138065799-1',
    description: '',
    themeConfig: {
        displayAllHeaders: true,
        nav: [
            // { text: '面试', link: '/' },
            // { text: '实战', link: '/abc' },
            // { text: '鸡汤', link: '/abc' },
            { text: 'GitHub', link: 'https://github.com/su37josephxia/frontend-basic' },
        ],
        sidebar: [
            {
                title: 'JS基础 （ECMA 262标准）',
                // collapsable: true,
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
            // {
            //     title: 'JS Web API (W3C标准)',
            //     collapsable: true,
            //     children: [
            //         '/DOM操作.md',
            //         '/BOM操作.md',
            //         '/事件.md',
            //         '/Ajax_XMLHttpRequest.md',
            //         '/存储.md',
            //     ]
            // },
            ['/document/doc/database/','SQL基础'],
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
        ]
    }
}