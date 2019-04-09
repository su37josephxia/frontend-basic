module.exports = {
    themeConfig: {
        sidebar: [
            {
                title: 'JS基础 （ECMA 262标准）',
                collapsable: true,
                children: [
                    '/ch01.md',
                    '/ch02.md',
                    '/ch03.md',
                    '/ch04.md',
                    '/ch18.md',
                    '/ch05.md',
                    'this_call_apply_bind_总结.md'
                ]
            },
            {
                title: 'JS Web API (W3C标准)',
                collapsable: true,
                children: [
                    '/ch06.md',
                    '/ch07.md',
                    '/ch08.md',
                    '/ch09.md',
                    '/ch10.md',
                ]
            },

            {
                title: 'Linux知识',
                collapsable: false,
                children: [
                    '/Linux命令.md'
                ]
            },
            {
                title: '算法',
                children: [['/算法_去重_排序_递归.md', '一道面试题引发的思考']]
            }
        ]
    }
}