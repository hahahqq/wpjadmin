// import NotFound from '@/views/404.vue'
import Main from '@/views/Main.vue'
let routes = [{
        path: '',
        redirect: {
            path: '/login'
        },
        hidden: true,
    },
    {
        path: '/login',
        // component: Login,
        component: () => import('@/views/login/index.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-home', //图标样式class
        leaf: true, //只有一个节点
        hidden: false,
        children: [{
            path: '/home',
            component: () => import('@/views/home/index.vue'),
            name: '首页'
        }]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-sitemap',
        leaf: true,
        hidden: false,
        children: [{
            path: '/checkout',
            component: () => import('@/views/checkout/index.vue'),
            name: '收银'
        }]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-group',
        leaf: true,
        children: [{
                path: '/member',
                component: () => import('@/views/member/member.vue'),
                name: '会员',
                redirect: {
                    path: '/member/MemberList',
                },
                hidden: true
            },
            {
                path: '/member/MemberList',
                component: () => import("@/views/member/member.vue"),
                name: '会员列表',
                meta: {
                    name: 'shop',
                    parent: 'member',
                    title: '会员中心'
                }
            },
            {
                path: '/member/discount',
                component: () => import('@/views/member/discount.vue'),
                name: '会员折扣',
                meta: {
                    name: 'shop',
                    parent: 'member',
                    title: '会员中心',
                    line: true
                }
            },
            {
                path: '/member/reminder',
                component: () => import('@/views/member/reminder.vue'),
                name: '会员提醒',
                meta: {
                    name: 'shop',
                    parent: 'member',
                    title: '会员中心',
                    line: false
                }
            },
        ]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-laptop',
        leaf: true,
        children: [{
                path: '/good',
                component: () => import('@/views/goods/list.vue'),
                name: '商品',
                redirect: {
                    path: '/good/GoodList',
                },
                hidden: true
            },
            {
                path: '/good/GoodList',
                component: () => import('@/views/goods/list.vue'),
                name: '商品列表',
                meta: {
                    name: 'shop',
                    parent: 'good',
                    title: '商品中心'
                }
            },
            {
                path: '/good/GoodsType',
                component: () => import('@/views/selected/category.vue'),
                name: '商品分类',
                meta: {
                    name: 'shop',
                    parent: 'good',
                    title: '商品中心'
                }
            },
            {
                path: '/good/Goodsunit',
                component: () => import('@/views/selected/unit.vue'),
                name: '商品单位',
                meta: {
                    name: 'shop',
                    parent: 'good',
                    title: '商品中心'
                }
            },
            {
                path: '/good/GoodsBarCode',
                component: () => import('@/views/goods/goodBarCode.vue'),
                name: '单品条码',
                meta: {
                    name: 'shop',
                    parent: 'good',
                    title: '商品中心'
                }
            },
            {
                path: '/good/codePrinter',
                component: () => import('@/views/goods/codePrinter.vue'),
                name: '条码打印',
                meta: {
                    name: 'shop',
                    parent: 'good',
                    title: '商品中心'
                },
                hidden: true
            },

        ]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-comments-alt',
        leaf: true,
        children: [{
                path: '/stock',
                component: () => import('@/views/stock/warehousing'),
                name: '库存',
                redirect: {
                    path: '/stock/warehousing',
                },
                hidden: true
            },
            {
                path: '/stock/warehousing',
                component: () => import('@/views/stock/warehousing'),
                name: '采购入库',
                meta: {
                    name: 'stock',
                    parent: 'stock',
                    title: '库存管理'
                }
            }, {
                path: '/stock/return',
                component: () => import('@/views/stock/return'),
                name: '采购退货',
                meta: {
                    name: 'stock',
                    parent: 'stock',
                    title: '库存管理'
                }
            },
            {
                path: '/stock/allocation',
                component: () => import('@/views/stock/allocation'),
                name: '库存调拨',
                meta: {
                    name: 'stock',
                    parent: 'stock',
                    title: '库存管理'
                }
            },
            {
                path: '/stock/inventory',
                component: () => import('@/views/stock/inventory'),
                name: '库存盘点',
                meta: {
                    name: 'stock',
                    parent: 'stock',
                    title: '库存管理'
                }
            },
            {
                path: '/stock/supplier',
                component: () => import('@/views/setup/supplier.vue'),
                name: '供应商管理',
                meta: {
                    name: 'stock',
                    parent: 'stock',
                    title: '库存管理'
                }
            },
            {
                path: '/stock/query',
                component: () => import('@/views/stock/query'),
                name: '库存查询',
                meta: {
                    name: 'stock',
                    parent: 'stock',
                    title: '库存管理'
                }
            }
        ]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-tasks',
        leaf: true,
        children: [{
            path: '/service',
            component: () => import('@/views/service/service.vue'),
            name: '服务'
        }, ],
        hidden: true
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-signal',
        leaf: true,
        hidden: false,
        children: [{
                path: '/marketing',
                component: () => import('@/views/marketing/index.vue'),
                name: '营销',
                redirect: {
                    path: '/marketing/bespeakList',
                },
                hidden: true
            },
            {
                path: '/marketing/bespeakList',
                component: () => import('@/views/marketing/index.vue'),
                name: '拓客工具',
                meta: {
                    name: 'marketing',
                    parent: 'marketing',
                    title: '营销中心'
                }
            },
            {
                path: '/marketing/:type',
                component: () => import('@/views/marketing/list'),
                name: '优惠券',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/memberCoupon',
                component: () => import('@/views/marketing/memberCoupon'),
                name: '定向优惠券',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/RegisterGifts',
                component: () => import('@/views/marketing/RegisterGifts'),
                name: '注册有礼',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/weiXinVipCard',
                component: () => import('@/views/marketing/weiXinVipCard'),
                name: '微信会员卡',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/Recharge',
                component: () => import('@/views/marketing/Recharge'),
                name: '充值赠送',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/Specials',
                component: () => import('@/views/marketing/Specials'),
                name: '限时特价',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/lotGroup',
                component: () => import('@/views/marketing/lotgroup'),
                name: '批量发券',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/groupSMS',
                component: () => import('@/views/marketing/groupSMS'),
                name: '群发短信',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }, {
                path: '/IntegralReset',
                component: () => import('@/views/marketing/IntegralReset'),
                name: '积分清零',
                hidden: true,
                meta: { parent: 'marketing', title: '营销中心' }
            }
        ]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-credit-card',
        leaf: true,
        children: [{
                path: '/defray',
                component: () => import('@/views/defray/defray.vue'),
                name: '支出',
                redirect: {
                    path: '/defray/defrayList',
                },
                hidden: true
            }, {
                path: '/defray/defrayList',
                component: () => import('@/views/defray/defray.vue'),
                name: '支出明细',
                meta: {
                    parent: 'defray',
                    title: '支出中心',
                }
            }, {
                path: '/defray/payment',
                component: () => import('@/views/selected/payment.vue'),
                name: '支出项目',
                meta: {
                    parent: 'defray',
                    title: '支出中心',
                }
            },
            {
                path: '/defray/account',
                component: () => import('@/views/defray/account.vue'),
                name: '支付账户',
                meta: {
                    parent: 'defray',
                    title: '支出中心',
                }
            }, {
                path: '/defray/defrayReport',
                component: () => import('@/views/ReportAnalysis/defrayReport.vue'),
                name: '支付分析',
                meta: {
                    parent: 'defray',
                    title: '支出中心'
                }
            }
        ]
    },

    // mall
    {
        path: '/',
        component: Main,
        name: 'mall',
        iconCls: 'icon-inbox',
        leaf: true,
        hidden: true,
        children: [{
                path: '/malls',
                name: '商城',
                redirect: { path: '/mall/home' },
                hidden: true
            },
            {
                path: '/mall/',
                component: (resolve) => require(['@/views/mall/index.vue'], resolve),
                name: '',
                children: [{
                        path: '',
                        redirect: { path: '/mall/home' },
                        hidden: true
                    },
                    {
                        path: 'home',
                        component: (resolve) => require(['@/views/mall/home'], resolve),
                        name: '商城首页',
                        meta: {
                            name: 'home',
                            parent: 'malls',
                            title: '商城管理'
                        }
                    },
                    {
                        path: 'orderList',
                        component: (resolve) => require(['@/views/mall/order/list'], resolve),
                        name: '订单管理',
                        meta: {
                            name: 'orderList',
                            parent: 'malls',
                            title: '商城管理',
                        }
                    },
                    {
                        path: 'orderItem',
                        component: (resolve) => require(['@/views/mall/order/item'], resolve),
                        name: '订单详情',
                        meta: {
                            name: 'orderList',
                            parent: 'malls',
                            title: '商城管理',
                            breadcrumb: [{ label: '订单管理', value: '/mall/orderList' }]
                        },
                        hidden: true
                    },
                    {
                        path: 'refundList',
                        component: (resolve) => require(['@/views/mall/refund'], resolve),
                        name: '售后管理',
                        meta: {
                            name: 'refundList',
                            parent: 'malls',
                            title: '商城管理',
                        }
                    },
                    {
                        path: 'refundItem',
                        component: (resolve) => require(['@/views/mall/refund/item'], resolve),
                        name: '售后订单详情',
                        meta: {
                            name: 'refundList',
                            parent: 'malls',
                            title: '商城管理',
                            breadcrumb: [{ label: '售后管理', value: '/mall/refundList' }]
                        },
                        hidden: true
                    },
                    {
                        path: 'goods',
                        component: (resolve) => require(['@/views/mall/goods'], resolve),
                        name: '商品上架',
                        meta: {
                            name: 'goods',
                            parent: 'malls',
                            title: '商城管理',
                            line: true
                        }
                    },
                    {
                        path: 'setting',
                        component: () => import('@/views/mall/setting'),
                        name: '商城管理',
                        meta: {
                            name: 'setting',
                            parent: 'malls',
                            title: '商城管理',
                        }
                    },
                    // {
                    //   path: 'decorationList',
                    //   name: '商城布局',
                    //   component: () => import('@/views/mall/decoration/list'),
                    //   meta: { name: 'decoration', parent: 'malls', title: '商城管理' }
                    // },
                    // {
                    //   path: 'decorationItem',
                    //   name: '商城布局',
                    //   component: () => import('@/views/mall/decoration/page'),
                    //   meta: { name: 'decoration', parent: 'malls', title: '商城管理' },
                    //   hidden: true
                    // },
                    {
                        path: 'setup',
                        component: (resolve) => require(['@/views/mall/setup'], resolve),
                        name: '交易设置',
                        meta: {
                            name: 'setup',
                            parent: 'malls',
                            title: '商城管理',
                        }
                    },
                    {
                        path: 'freight',
                        component: (resolve) => require(['@/views/mall/freight/index-old.vue'], resolve),
                        name: '运费设置',
                        meta: {
                            name: 'freight',
                            parent: 'malls',
                            title: '商城管理',
                        }
                    },
                    // {
                    //   path: 'freight',
                    //   component: (resolve) => require(['@/views/mall/freight'], resolve),
                    //   name: '配送设置',
                    //   meta: {
                    //     name: 'freight',
                    //     parent: 'malls',
                    //     title: '商城管理',
                    //     buttonGroup: [
                    //       { label: '快递发货', value: '/mall/freight' },
                    //       { label: '到店自提', value: '/mall/extract' }
                    //     ]
                    //   }
                    // },
                    {
                        path: 'extract',
                        component: (resolve) => require(['@/views/mall/extract'], resolve),
                        name: '到店自提',
                        meta: {
                            name: 'freight',
                            parent: 'malls',
                            title: '商城管理',
                            buttonGroup: [
                                { label: '快递发货', value: '/mall/freight' },
                                { label: '到店自提', value: '/mall/extract' }
                            ]
                        },
                        hidden: true
                    },
                    {
                        path: 'postage',
                        component: (resolve) => require(['@/views/mall/postage'], resolve),
                        name: '包邮设置',
                        meta: {
                            name: 'postage',
                            parent: 'malls',
                            title: '商城管理',
                        }
                    },

                ]
            },
        ]
    },
    // mall -^
    {
        path: '/',
        component: Main,
        name: 'report',
        iconCls: 'icon-bar-chart',
        leaf: true,
        children: [{
                path: '/reports',
                component: () => import('@/views/reports/reports.vue'),
                name: '报表',
                redirect: {
                    path: '/reports/management/business'
                },
                hidden: true
            },
            {
                path: '/reports/management/business',
                component: () => import('@/views/reports/management/business'),
                name: '经营报表',
                meta: {
                    title: '报表中心',
                    line: false,
                    name: 'business',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/analysis/shop',
                component: () => import('@/views/reports/analysis/shop'),
                name: '店铺分析',
                meta: {
                    title: '报表中心',
                    name: 'shopReport',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/analysis/sale',
                component: () => import('@/views/reports/analysis/sale'),
                name: '销售分析',
                meta: {
                    title: '报表中心',
                    name: 'sale',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/analysis/goods',
                component: () => import('@/views/reports/analysis/goods'),
                name: '商品分析',
                meta: {
                    title: '报表中心',
                    name: 'goods',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/reportsTable/membertable',
                component: () => import('@/views/reports/reportsTable/membertable'),
                name: '会员分析',
                meta: {
                    title: '报表中心',
                    name: 'defray',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/employee/achievement',
                component: () => import('@/views/reports/employee/achievement'),
                name: '员工分析',
                meta: {
                    title: '报表中心',
                    name: 'achievement',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/analysis/defray',
                component: () => import('@/views/reports/analysis/defray'),
                name: '支出分析',
                meta: {
                    title: '报表中心',
                    name: 'defray',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/stock/statisticsReport',
                component: () => import('@/views/reports/analysis/statisticsReport.vue'),
                name: '统计报表',
                meta: {
                    title: '报表中心',
                    name: 'defray',
                    parent: 'reports'
                }
            },
            {
                path: '/reports/query',
                component: () => import('@/views/stock/query'),
                name: '库存报表',
                meta: {
                    name: 'stock',
                    parent: 'reports',
                    title: '报表中心'
                }
            },
        ]
    },
    {
        path: '/',
        component: Main,
        name: '',
        iconCls: 'icon-cogs',
        leaf: true,
        children: [{
                path: '/setup',
                component: () => import('@/views/setup/index.vue'),
                name: '设置',
                redirect: {
                    path: '/setup/myshop',
                },
                hidden: true
            },
            {
                path: '/setup/myshop',
                component: () => import('@/views/setup/myShop.vue'),
                name: '我的店铺',
                meta: {
                    name: 'myshop',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            {
                path: '/setup/shop',
                component: () => import('@/views/setup/shop.vue'),
                name: '店铺管理',
                meta: {
                    name: 'shop',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            {
                path: '/setup/employee',
                component: () => import('@/views/setup/employee.vue'),
                name: '员工管理',
                meta: {
                    name: 'employee',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            {
                path: '/setup/user',
                component: () => import('@/views/setup/user'),
                name: '用户管理',
                meta: {
                    name: 'user',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            {
                path: '/setup/integral',
                component: () => import('@/views/setup/integral.vue'),
                name: '积分设置',
                meta: {
                    name: 'integral',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            // {
            //   path: '/setup/supplier',
            //   component: () => import('@/views/setup/supplier.vue'),
            //   name: '供应商管理',
            //   meta: {
            //     name: 'supplier',
            //     parent: 'setup',
            //     title: '系统设置'
            //   },
            //   hidden: true
            // },
            {
                path: '/setup/print',
                component: () => import('@/views/setup/print'),
                name: '打印设置',
                meta: {
                    name: 'print',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            {
                path: '/setup/parameter',
                component: () => import('@/views/setup/parameter.vue'),
                name: '参数设置',
                meta: {
                    name: 'parameter',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
            {
                path: '/setup/system',
                component: () => import('@/views/setup/system'),
                name: '系统重置',
                meta: {
                    name: 'system',
                    parent: 'setup',
                    title: '系统设置'
                }
            },
        ]
    }
];

export default routes;
