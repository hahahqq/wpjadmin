
拖放插件
npm install --save vuedraggable

UI
element-ui




router
 {
        path: '/decoration',
        name: '商城',
        component: () => import('@/views/decoration/index.vue'),
        children: [
          { path: '', redirect: 'list', hidden: true },
          { path: 'list', name: '布局列表', component: () => import('@/views/decoration/list') },
          { path: 'item', name: '布局详情', component: () => import('@/views/decoration/page'), hidden: true },
        ],
        meta: { title: '商城布局', iconCls: 'el-icon-s-shop' }
      },