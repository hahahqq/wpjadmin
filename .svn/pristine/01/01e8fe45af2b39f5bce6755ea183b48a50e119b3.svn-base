import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
// page
import login from './modules/login'
import member from './modules/member'
import member2 from './modules/member/index'
import goods from './modules/goods'
import service from './modules/service'
import sIntention from './modules/service/intention'
import sOpinion from './modules/service/opinion'
import service_nourishing from './modules/service/nourishing'
import marketing from './modules/marketing'
import defray from './modules/defray'
import account from './modules/defray/account'
// report
import report from './modules/report/index.js'
import report_business from './modules/report/management/business'
import report_surplus from './modules/report/management/surplus'
import report_checkout from './modules/report/management/checkout'
import report_shop from './modules/report/management/shop'
import report_sale from './modules/report/analysis/sale'
import report_goods from './modules/report/analysis/goods'
import report_member from './modules/report/analysis/member'
import report_defray from './modules/report/analysis/defray'
import report_achievement from './modules/report/employee/achievement'
import report_order from './modules/report/employee/order'
import report_sort from './modules/report/employee/sort'
import report_registered from './modules/report/member/registered'
import report_balance from './modules/report/member/balance'
import report_adjustment from './modules/report/member/adjustment'
//stock
import stock_query from './modules/stock/query'//库存查询
//retail
import retail_query from './modules/retail/query'//库存查询

// setup
import setup from './modules/setup/index'
import setup_myinfo from './modules/setup/myinfo'
import setup_user from './modules/setup/user'
import setup_integral from './modules/setup/integral'
import setup_royalty from './modules/setup/royalty'
import setup_parameter from './modules/setup/parameter'
import address from './modules/other/address'
import upload from './modules/other/upload'
//ssmember
import dropdown from './modules/ssmember/dropdown'
//checkout
import commodityc from './modules/checkout/commodityc'
import timescountc from './modules/checkout/timescountc'
import fastc from './modules/checkout/fastc'
import storagevaluer from './modules/checkout/storagevaluer'
import setmealr from './modules/checkout/setmealr'
import guadanc from './modules/checkout/guadanc'
//recharge
import recharge from './modules/recharge/recharge'
import barcodepay from './modules/recharge/barcodepay'
import couponlist from './modules/recharge/couponlist'
//home 
import home from './modules/home'

// selected
import shop from './modules/selected/shop'
import employee from './modules/selected/employee'
import level from './modules/selected/level'
import unit from './modules/selected/unit'
import category from './modules/selected/category'
import payment from './modules/selected/payment'
import supplier from './modules/selected/supplier'

// 消费结账
import ccindex from './modules/consumptionCheckout/index'

// 库存管理
import stock from './modules/stock'
import stock_warehousing from './modules/stock/warehousing'
import stock_return from './modules/stock/return'
import stock_allocation from './modules/stock/allocation'
import stock_inventory from './modules/stock/inventory'

//颜色档案
import color from './modules/color/color'
import size from './modules/size/size'

// mall
import mall from './modules/mall/index.js'
import mall_goods from './modules/mall/goods.js'
import mall_order from './modules/mall/order.js'
import mall_setup from './modules/mall/setup.js'
import mall_freight from './modules/mall/freight.js'


Vue.use(Vuex)

const state = {
  isChangePropsState:false,
  isPopupPage:{
    masker:false,
    first:false,
    second:false,
    third:false,
    fourth:false,
    fifth:false,
  },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    login,
    member,member2,
    shop,employee,level,unit,category,payment,supplier,
    goods,
    service,sIntention,sOpinion,service_nourishing,
    marketing,
    stock,stock_warehousing,stock_return,stock_allocation,stock_inventory,
    defray,account,
    report,
    report_business,report_surplus,report_checkout,
    report_sale,report_goods,report_member,report_defray,
    report_achievement,report_order,report_sort,
    report_registered,report_balance,report_adjustment,
    setup,setup_myinfo,setup_user,setup_integral,setup_royalty,
    address,
    upload,
    commodityc,timescountc,fastc,storagevaluer,setmealr,guadanc,dropdown,recharge,home,
    ccindex,barcodepay,couponlist,setup_parameter,
    stock_query,retail_query,color,size,
    report_shop,
    mall,mall_goods,mall_order,mall_setup,mall_freight,
  },
})
