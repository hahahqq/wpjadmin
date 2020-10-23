

const default_banner = require("../images/empty-banner.png");
const default_img = require("../images/empty.png");
const default_bg = require("../images/default-bg.png");
const allWidget = {
  "mediaComponents": [
    {
      "type": "imgSingle",
      "name": "图片",
      "value": {
        "list": [{
          "image": default_banner,
          "name":'',
          "linkType": '',
          "linkValue": '',
          "buttonShow": false,
          "buttonText": '',
          "buttonColor": "#FFFFFF",
          "textColor": "#000000"
        }]
      },
      "icon": "icon-zhaopiantubiao",
      "hidden": false
    },
    {
      "type": "imgSlide",
      "name": "图片轮播",
      "value": {
        "duration": 2500,
        "list": [
          {
            "image": default_banner,
            "name":'',
            "linkType": '',
            "linkValue": '',
            "show":true
          },
          {
            "image": default_banner,
            "name":'',
            "linkType": '',
            "linkValue": '',
            "show":true
          }
        ]
      },
      "icon": "icon-lunbo",
      "hidden": false
    },
    {
      "type": "imgWindow",
      "name": "图片分组",
      "value": {
        "style": 2,  // 0 橱窗  2 两列 3三列 4四列
        "margin": 0,
        "list": [
          {
            "image": default_banner,
            "name":'',
            "linkType": '',
            "linkValue": '',
            "show":false
          },
          {
            "image": default_banner,
            "name":'',
            "linkType": '',
            "linkValue": '',
            "show":false
          }, {
            "image": default_banner,
            "name":'',
            "linkType": '',
            "linkValue": '',
            "show":false
          },
          {
            "image": default_banner,
            "name":'',
            "linkType": '',
            "linkValue": '',
            "show":false
          }
        ]
      },
      "icon": "icon-zidongchuchuang50",
      "hidden": false
    },
    {
      "type": "video",
      "name": "视频组",
      "value": {
        "autoplay": "false",
        "list": [{
          "image": default_banner,
          "url": "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400",
          "linkType": '',
          "linkValue": ''
        }]
      },
      "icon": "icon-shipin",
      "hidden": true
    },
    {
      "type": "article",
      "name": "文章组",
      "value": {
        "list": [
          {
            "title": ''
          }
        ]
      },
      "icon": "icon-wenzhang1",
      "hidden": true
    },
    {
      "type": "articleClassify",
      "name": "文章分类",
      "value": {
        "limit": 3,
        "articleClassifyId": ''
      },
      "icon": "icon-wenzhangfenlei",
      "hidden": true
    }
  ],
  "storeComponents": [
    {
      "type": "shopInfo",
      "name": "网店信息",
      "value": {
        "image": default_bg,
        "type": 'round', // round:圆弧 square:方形
        "style": {
          "align": 'left', // left:居左 center:居中 right:居右 
          "radius": 0,
        },
        "name": true,
        "address": true
      },
      "icon": "icon-sousuokuang",
      "hidden": false
    },
    {
      "type": "search",
      "name": "搜索框",
      "value": {
        "keywords": '请输入关键字搜索',
        "style": 'round' // round:圆弧 radius:圆角 square:方形
      },
      "icon": "icon-sousuokuang",
      "hidden": false
    },
    {
      "type": "notice",
      "name": "公告组",
      "value": {
        "type": 'auto', //choose手动选择， auto 自动获取
        "list": [
          {
            "title": "这里是第一条公告的标题",
            "content": "",
            "id": ''
          }
        ]
      },
      "icon": "icon-gonggao",
      "hidden": true
    },
    {
      "type": "navBar",
      "name": "导航组",
      "value": {
        "limit": 4, 
        "list": [
          {
            "image": default_img,
            "text": "按钮1",
            "linkType": '',
            "linkValue": '',
            "show":false
          },
          {
            "image": default_img,
            "text": "按钮2",
            "linkType": '',
            "linkValue": '',
            "show":false
          },
          {
            "image": default_img,
            "text": "按钮3",
            "linkType": '',
            "linkValue": '',
            "show":false
          },
          {
            "image": default_img,
            "text": "按钮4",
            "linkType": '',
            "linkValue": '',
            "show":false
          }
        ]
      },
      "icon": "icon-daohangliebiao",
      "hidden": false
    },
    {
      "type": "footerNavBar",
      "name": "底部导航",
      "value": {
        "limit": 5, // 限制为5个内
        "list": [
          {
            "image": default_img,
            "text": "首页",
            "linkType": '',
            "linkValue": '/home',
            "show":false
          },
          {
            "image": default_img,
            "text": "我的",
            "linkType": '',
            "linkValue": '/user',
            "show":false
          },
        ]
      },
      "icon": "icon-daohangliebiao",
      "hidden": false
    },
    {
      "type": "goods",
      "name": "商品组",
      "value": {
        "title": '商品组名称',
        "lookMore": "true",
        "type": "auto", //auto自动获取  choose 手动选择
        "classifyId": '', //所选分类id
        "brandId": '', //所选品牌id
        "limit": 10,
        "display": "list", //list , slide
        "column": 2, //分裂数量
        "nameHeight":1,
        "buyNow":false, // 购买按钮
        "list": [
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
          {
            "image": default_banner,
            "name": '',
            "price": ''
          }
        ]
      },
      "icon": "icon-shangpin",
      "hidden": false
    },
    {
      "type": "groupPurchase",
      "name": "团购秒杀",
      "value": {
        "title": '活动名称',
        "limit": '10',
        "list": [
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
        ]
      },
      "icon": "icon-tuangou",
      "hidden": true
    },
    {
      "type": "pintuan",
      "name": "拼团",
      "value": {
        "title": '活动名称',
        "limit": '10',
        "list": [
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
          {
            "image": default_banner,
            "name": '',
            "price": ''
          },
        ]
      },
      "icon": "icon-pintuan",
      "hidden": true
    },
    {
      "type": "coupon",
      "name": "优惠券组",
      "value": {
        "limit": '2'
      },
      "icon": "icon-tubiao-youhuiquan",
      "hidden": true
    },
    {
      "type": "record",
      "name": "购买记录",
      "value": {
        "style": {
          "top": 20,
          "left": 0
        }
      },
      "icon": "icon-jilu",
      "hidden": true
    }
  ],
  "utilsComponents": [
    {
      "type": "blank",
      "name": "辅助空白",
      "value": {
        "height": 20,
        "backgroundColor": "#FFFFFF"
      },
      "icon": 'icon-kongbai',
      "hidden": false
    },
    {
      "type": "textarea",
      "name": "文本域",
      "value": '',
      "icon": 'icon-fuwenben',
      "hidden": false
    }]
};

const getWidgetName = function (type) {
  let item = {}
  for (let key in allWidget) {
    for (let i = 0; i < allWidget[key].length; i++) {
      if (allWidget[key][i].type == type) {
        item = Object.assign({}, allWidget[key][i]);
      }
    }
  }
  return item;
}
export { allWidget, getWidgetName, default_banner, default_bg,default_img }