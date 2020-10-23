import { getLodop } from '@/assets/js/LodopFuncs' //导入模块
import commonSend from '@/api/api'
import { getHomeData, getUserInfo } from '@/api/index'
import dayjs from 'dayjs'
let LODOP;
let qrcSrcimg;

const getOpenMoneyBox = function(){  //打开收钱箱
  LODOP = getLodop();
  LODOP.PRINT_INIT("");
  LODOP.SEND_PRINT_RAWDATA(String.fromCharCode(27,112,1,128,128))
}

const getDayindate = function(InterfaceCode, BillId, ItemsHeaderType,qrcSrc) {
  qrcSrcimg = qrcSrc;
  let homeInfo = getHomeData();
  let sendData = {
    InterfaceCode: InterfaceCode,
    CompanyId: homeInfo.shop.COMPANYID,
    ShopId: homeInfo.shop.ID,
    BillId: BillId
  };
  commonSend.commonSend('get', function(data) {
    if (data.success) {
      var dayinjson = data.data;
      BillIdPrinting(dayinjson, ItemsHeaderType);
    }
  }, sendData)
}

const BillIdPrinting = function(dayinjson, ItemsHeaderType) {
  LODOP = getLodop();
  if (LODOP != undefined) {
    if (typeof(LODOP.VERSION) != "undefined") {
      GoodsConsumption(dayinjson, ItemsHeaderType);
    }
  }
}
const dealFilterDate = function(dealname) {
  if (dealname == undefined) {
    return '';
  } else {
    return dealname;
  }

}
const GoodsConsumption = function(dayinjson, ItemsHeaderType) {
  const printType = localStorage.getItem('printType') || ''
  console.log(printType)
  let pageWidth = printType == 1 ? 800 : 500  //小票宽度 

  let hPos = 10, //小票上边距  
    rowHeight = 20, //小票行距
    xianHeight = 6,
    leftwidth = 60,
    printrulestatus = 1;
  let Objvalue = dayinjson.Obj;
  let COMPANYNAME = dealFilterDate(Objvalue.COMPANYNAME);
  let SHOPNAME = dealFilterDate(Objvalue.SHOPNAME);
  let BILLNO = dealFilterDate(Objvalue.BILLNO);
  let BILLDATE = dealFilterDate(Objvalue.BILLDATE);
  let USERNAME = dealFilterDate(Objvalue.USERNAME);
  let GOODSQTY = dealFilterDate(Objvalue.GOODSQTY);
  let GOODSMONEY = dealFilterDate(Objvalue.GOODSMONEY);
  let FAVORMONEY = dealFilterDate(Objvalue.FAVORMONEY);
  let PAYMONEY = dealFilterDate(Objvalue.PAYMONEY);
  let PAYTYPENAME = dealFilterDate(Objvalue.PAYTYPENAME);
  let VIPCODE = dealFilterDate(Objvalue.VIPCODE);
  let VIPNAME = dealFilterDate(Objvalue.VIPNAME);
  let CURRMONEY = dealFilterDate(Objvalue.CURRMONEY);
  let REMARK = dealFilterDate(Objvalue.REMARK);
  let SHOPTEL = dealFilterDate(Objvalue.SHOPTEL);
  let SHOPADDRESS = dealFilterDate(Objvalue.SHOPADDRESS);
  let GETINTEGRAL = dealFilterDate(Objvalue.GETINTEGRAL);
  let VIPINTEGRAL = dealFilterDate(Objvalue.VIPINTEGRAL);
  let SUMSALEMONEY = dealFilterDate(Objvalue.SUMSALEMONEY);
  let ADDMONEY = dealFilterDate(Objvalue.ADDMONEY);
  let GIFTMONEY = dealFilterDate(Objvalue.GIFTMONEY);
  let ADDSUMMONEY = dealFilterDate(Objvalue.ADDSUMMONEY);
  LODOP.PRINT_INIT("");
  LODOP.SET_PRINT_PAGESIZE(3, pageWidth, 25, '');
  LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  let companynamewidth = parseInt((180 - COMPANYNAME.length * 12) / 2);
  LODOP.ADD_PRINT_TEXT(hPos, companynamewidth, pageWidth, rowHeight, COMPANYNAME);
  hPos += 30;
  showPrintrules(1);
  let shopTypename = '';
  if (ItemsHeaderType == 1 || ItemsHeaderType == 2 || ItemsHeaderType == 3) {
    shopTypename = SHOPNAME + '消费小票';
  } else if(ItemsHeaderType == 14){
    shopTypename = '采购入库'
  } else if(ItemsHeaderType == 15){
    shopTypename = '采购退货'
  } else if(ItemsHeaderType == 16){
    shopTypename = '库存调拨'
  } else {
    shopTypename = SHOPNAME + '充值小票';
  }
  let xiaofeiheight = parseInt((180 - shopTypename.length * 12) / 2);
  LODOP.ADD_PRINT_TEXT(hPos, xiaofeiheight, pageWidth, rowHeight, shopTypename);
  showPrintrules(1);
  hPos += 25;
  if(ItemsHeaderType == 14 || ItemsHeaderType == 15){
    hPos = PrintLODOPcommon(ItemsHeaderType == 14 ? '采购单号:' : '退货单号:', BILLNO, hPos);
    hPos = PrintLODOPcommon(ItemsHeaderType == 14 ? '采购日期:' : '退货日期:',  dayjs(BILLDATE).format('YYYY-MM-DD'), hPos);
    hPos = PrintLODOPcommon('店 铺 :', SHOPNAME, hPos);
    hPos = PrintLODOPcommon('供应商:', dealFilterDate(Objvalue.SUPPLIERNAME), hPos)
    hPos = PrintLODOPcommon('制单人:',USERNAME, hPos)
  }else if(ItemsHeaderType == 16){
    hPos = PrintLODOPcommon('调拨单号:', BILLNO, hPos);
    hPos = PrintLODOPcommon('调拨日期:',  dayjs(BILLDATE).format('YYYY-MM-DD'), hPos);
    hPos = PrintLODOPcommon('调出店铺:', SHOPNAME, hPos);
    hPos = PrintLODOPcommon('调入店铺:', dealFilterDate(Objvalue.INSHOPNAME), hPos)
    hPos = PrintLODOPcommon('制 单 人:',USERNAME, hPos)
  }else{
    hPos = PrintLODOPcommon(ItemsHeaderType == 4 ? '充值单号' : '结账单号:', BILLNO, hPos);
    hPos = PrintLODOPcommon(ItemsHeaderType == 4 ? '充值日期' : '结账日期:',  dayjs(BILLDATE).format('YYYY-MM-DD'), hPos);
    hPos = PrintLODOPcommon('收银员:', USERNAME, hPos);
  }
  hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
  if (ItemsHeaderType == 1 || ItemsHeaderType == 3) {
    if (ItemsHeaderType == 1) {
      let leftw0 = 1, leftw1 = 50, leftw2 = 80, leftw3 = 115, leftw4 = 150;
      LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, "商品");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, "折扣");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, "单价");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, "数量");
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw4, pageWidth, rowHeight, "小计");
      showPrintrules(printrulestatus);
      hPos += rowHeight;

      for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
        let goodNameCodeColorSize = dayinjson.GoodsObj[i].GOODSNAME + '(' + dayinjson.GoodsObj[i].GOODSCODE +'-' + dayinjson.GoodsObj[i].COLORNAME + '-' + dayinjson.GoodsObj[i].SIZENAME + ')'
        LODOP.ADD_PRINT_TEXT(hPos, 1, 180, rowHeight, goodNameCodeColorSize)
        LODOP.SET_PRINT_STYLEA(0,'TextNeatRow', true)
        LODOP.SET_PRINT_STYLEA(0,"LineSpacing",0.3);
        showPrintrules(printrulestatus);
        let height = String(goodNameCodeColorSize).length / 15
        hPos += 16 * height;
        let goodsPrice = dayinjson.GoodsObj[i].GOODSPRICE,
          DISCOUNT = dayinjson.GoodsObj[i].DISCOUNT,
          PRICE = dayinjson.GoodsObj[i].PRICE,
          qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0',
          money = dayinjson.GoodsObj[i].MONEY ? String(dayinjson.GoodsObj[i].MONEY) : '0';
        LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, 16, '￥'+goodsPrice);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, 16, DISCOUNT);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, 16, PRICE);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, 16, qty);
        LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
        // showPrintrules(printrulestatus);

        LODOP.ADD_PRINT_TEXT(hPos, leftw4, pageWidth, 16, money);
        showPrintrules(printrulestatus);
        hPos += rowHeight;
      }
      
      hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
      hPos = PrintLODOPcommon('商品总数:', GOODSQTY, hPos);
      hPos = PrintLODOPcommon('合计金额:', GOODSMONEY, hPos);
    }
    if (ItemsHeaderType == 3) {
      hPos = PrintLODOPcommon('消费金额:', SUMSALEMONEY, hPos);
    }
    hPos = PrintLODOPcommon('优惠金额:', FAVORMONEY, hPos);
    hPos = PrintLODOPcommon('应付金额:', PAYMONEY, hPos);
    hPos = PrintLODOPcommon('支付方式:', PAYTYPENAME, hPos);
  } else if (ItemsHeaderType == 2) {
    let leftw0 = 1,
      leftw1 = 120,
      leftw2 = 180,
      leftw3 = 230;
    LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, "商品");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, "单价");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, "消费");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, "剩余");
    showPrintrules(printrulestatus);
    hPos += rowHeight;
    for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
      let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
        PRICE = dayinjson.GoodsObj[i].PRICE,
        CURCOUNT = dayinjson.GoodsObj[i].CURCOUNT,
        qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0';
        let height = String(goodsName).length / 5
        let ROWHEIGHT = rowHeight * Math.ceil(height);

      LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, ROWHEIGHT, goodsName);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, PRICE);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, qty);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, CURCOUNT);
      showPrintrules(printrulestatus);
      hPos += ROWHEIGHT;
    }
  } else if (ItemsHeaderType == 5) {
    let leftw0 = 1, leftw1 = 150;
    for (let i = 0; i < dayinjson.GoodsList.length; i++) {
      let goodsName = dayinjson.GoodsList[i].GOODSNAME,
        qty = dayinjson.GoodsList[i].QTY ? String(dayinjson.GoodsList[i].QTY) : '0';
      LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, goodsName);
      showPrintrules(printrulestatus);
      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, qty);
      showPrintrules(printrulestatus);
      hPos += rowHeight;
    }
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    hPos = PrintLODOPcommon('支付方式:', PAYTYPENAME, hPos);

  } else if (ItemsHeaderType == 4) {
    hPos = PrintLODOPcommon('充值金额:', ADDMONEY, hPos);
    hPos = PrintLODOPcommon('赠送金额:', GIFTMONEY, hPos);
    hPos = PrintLODOPcommon('充值合计:', ADDSUMMONEY, hPos);
    hPos = PrintLODOPcommon('支付方式:', PAYTYPENAME, hPos);
  } else if(ItemsHeaderType == 14 || ItemsHeaderType == 15 || ItemsHeaderType == 16){  // 14：采购入库   15：采购退货   16：库存调拨
    let param = dayinjson.GoodsObj, map = {}, dest = [];
    for (let i = 0; i < param.length; i++) {
      let ai = param[i];
      if(!map[ai.GOODSID]){
        dest.push({
            GOODSID: ai.GOODSID,
            name: ai.GOODSNAME,
            code: ai.GOODSCODE,
            data: [ai]
        });
        map[ai.GOODSID] = ai;
      }else{
          for(var j = 0; j < dest.length; j++){
              var dj = dest[j];
              if(dj.GOODSID == ai.GOODSID){
                  dj.data.push(ai);
                  break;
              }
          }
      }
    }

    let agentPermission = getUserInfo().List
    let ISPURVIEW = agentPermission.filter(element => element.MODULECODE == '91040112');
    let showPurPrice = true
    if(getUserInfo().IsBoss != true && ISPURVIEW[0].ISPURVIEW == 0){
      showPurPrice = false
    }else{
      showPurPrice = true
    }

    let leftw0 = 1, leftw1 = 80, leftw2 = 110, leftw3 = 150
    LODOP.ADD_PRINT_TEXT(hPos, leftw0, 80, rowHeight, "商品");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, "数量");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, "单价");
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, "金额");
    showPrintrules(printrulestatus)
    hPos += rowHeight;
    for(let i = 0; i< dest.length; i++){  
      let goodNameCode = dest[i].code + '-' + dest[i].name
      LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, goodNameCode)
      LODOP.SET_PRINT_STYLEA(0,'TextNeatRow', true)
      LODOP.SET_PRINT_STYLEA(0,"LineSpacing",0.5);
      showPrintrules(printrulestatus);
      let height = String(goodNameCode).length / 15
      hPos += rowHeight * Math.ceil(height);
      for (let j = 0; j < dest[i].data.length; j++) {
        let colorSizeName = dest[i].data[j].COLORNAME + '-' + dest[i].data[j].SIZENAME,
        PRICE = showPurPrice == true ? dest[i].data[j].PRICE : '****',
        qty = dest[i].data[j].QTY ? String(dest[i].data[j].QTY) : '0',
        money = showPurPrice == true ? String(dest[i].data[j].MONEY) : '****';

        let height = String(goodNameCode).length / 15
        let ROWHEIGHT = rowHeight * Math.ceil(height);
        
        LODOP.ADD_PRINT_TEXT(hPos, leftw0, 60, ROWHEIGHT, colorSizeName);
        LODOP.SET_PRINT_STYLEA(0,'TextNeatRow', true)
        LODOP.SET_PRINT_STYLEA(0,"LineSpacing",0.5);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, qty);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw2, pageWidth, rowHeight, PRICE);
        showPrintrules(printrulestatus);
        LODOP.ADD_PRINT_TEXT(hPos, leftw3, pageWidth, rowHeight, money);
        showPrintrules(printrulestatus);
        hPos += ROWHEIGHT
      }
    }
    if(ItemsHeaderType == 14 || ItemsHeaderType == 15){
      hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
      hPos = PrintLODOPcommon('优惠金额:', dealFilterDate(Objvalue.BREAKSMONEY), hPos);
      hPos = PrintLODOPcommon('其它费用:', dealFilterDate(Objvalue.OTHERMONEY), hPos);
    }
    
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '合计：')
    showPrintrules(printrulestatus)
    LODOP.ADD_PRINT_TEXT(hPos, 80, pageWidth, rowHeight, GOODSQTY )
    showPrintrules(printrulestatus)
    LODOP.ADD_PRINT_TEXT(hPos, 140, pageWidth, rowHeight, showPurPrice == true ? GOODSMONEY : '****' )
    showPrintrules(printrulestatus)
    hPos += rowHeight
  }
  if(ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16){
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    hPos = PrintLODOPcommon('会员卡号:', VIPCODE, hPos);
    hPos = PrintLODOPcommon('会员姓名:', VIPNAME, hPos);
    hPos = PrintLODOPcommon('储值余额:', CURRMONEY, hPos);
  }
  if (ItemsHeaderType != 4 && ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16) {
    hPos = PrintLODOPcommon('积分(本次/剩余):', GETINTEGRAL + '/' + VIPINTEGRAL, hPos, 105);
  }
  if(String(REMARK).length != 0 && REMARK != undefined){
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '备注:');
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, 35, pageWidth, rowHeight, REMARK);
    showPrintrules(printrulestatus);
    hPos += rowHeight;
  }

  hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);

  if(ItemsHeaderType == 14){
    hPos = PrintLODOPcommon('结算账户:', dealFilterDate(Objvalue.PAYTYPENAME) , hPos)
    hPos = PrintLODOPcommon('实付金额:', dealFilterDate(Objvalue.SUPPLIERBILLCURMONEY), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '欠供应商款:');
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, 72, pageWidth, rowHeight, dealFilterDate(Objvalue.SUPPLIERCURMONEY));
    showPrintrules(printrulestatus);
    hPos += rowHeight
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    hPos = PrintLODOPcommon('打印时间:', dayjs(new Date()).format('YYYY-MM-DD HH:mm'), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, '')
  }else if(ItemsHeaderType == 15){
    hPos = PrintLODOPcommon('退款账户:', dealFilterDate(Objvalue.PAYTYPENAME), hPos)
    hPos = PrintLODOPcommon('实退金额:', dealFilterDate(Objvalue.SUPPLIERBILLCURMONEY), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '欠供应商款:');
    showPrintrules(printrulestatus);
    LODOP.ADD_PRINT_TEXT(hPos, 72, pageWidth, rowHeight, dealFilterDate(Objvalue.SUPPLIERCURMONEY));
    showPrintrules(printrulestatus);
    hPos += rowHeight
    hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);
    hPos = PrintLODOPcommon('打印时间:', dayjs(new Date()).format('YYYY-MM-DD HH:mm'), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, '')
  }else if(ItemsHeaderType == 16){
    hPos = PrintLODOPcommon('打印时间:', dayjs(new Date()).format('YYYY-MM-DD HH:mm'), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, '')
  }

  if(ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16){
    hPos = PrintLODOPcommon('联系电话:', SHOPTEL, hPos);
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '联系地址:')
    showPrintrules(printrulestatus)
    LODOP.ADD_PRINT_TEXT(hPos, 65, 110, rowHeight, SHOPADDRESS)
    LODOP.SET_PRINT_STYLEA(0,'TextNeatRow', true)
    LODOP.SET_PRINT_STYLEA(0,"LineSpacing",0.5);
    showPrintrules(printrulestatus);
    let height = String(SHOPADDRESS).length / 10
    hPos += rowHeight * Math.ceil(height);
    hPos += 20
    LODOP.ADD_PRINT_TEXT(hPos, 20, pageWidth, rowHeight, "谢谢惠顾，欢迎下次光临1!");
    showPrintrules(printrulestatus);
    hPos += 30;
    LODOP.ADD_PRINT_IMAGE(hPos, 30, 250, 120, "<img border='0' style='height: 120px; ' src='" + qrcSrcimg + "' />");
    showPrintrules(printrulestatus);
    hPos += 200;
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
    // LODOP.ADD_PRINT_HTM(hPos, 65, pageWidth, 80, " ") // <div style='margin-top: 50px; display:table'>122</div>
    LODOP.ADD_PRINT_TEXT(hPos, 20, pageWidth, 80, " ");
    showPrintrules(1);
    hPos += 80
  }
  // LODOP.PRINT();
  LODOP.PREVIEW()
}

const PrintLODOPcommon = function(Printtitle, Printcontent, hPos, leftwidth) {
  if (false) {
    var pageWidth = 800, rowHeight = 21, leftwidth = leftwidth == undefined ? 80 : leftwidth;
  } else {
    var pageWidth = 580, rowHeight = 17, leftwidth = leftwidth == undefined ? 65 : leftwidth;
  }
  var title = String(Printtitle), text = String(Printcontent);
  LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, title);
  showPrintrules(1);
  LODOP.ADD_PRINT_TEXT(hPos, leftwidth, pageWidth, rowHeight, text);
  hPos += rowHeight;
  showPrintrules(1);
  return hPos;
}
const PrintLODOPcommonbold = function(hPos, pageWidth, xianHeight) {
  LODOP.ADD_PRINT_HTM(hPos, 1, pageWidth, 1, "<div style='border-top:1px dashed #000; padding-left:40px'></div>");
  hPos += xianHeight * 1.5;
  return hPos;
}
// 匹配不同打印规则
const showPrintrules = function(rulestatus) {
  if (rulestatus == 11) {
    fontsizebold(12);
  } else {
    // LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  }
}

// 字体加粗显示
const fontsizebold = function(fontsize) {
  LODOP.SET_PRINT_STYLE("FontColor", "#00ff00");
  LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", fontsize);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
}

// 增加纯文本打印项
// const PrintLODOP_Text = function (Top, Left, Width, Height, strContent, style) {
//   LODOP.ADD_PRINT_TEXT(Top, Left, Width, Height, strContent);
//   LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", style.TextNeatRow ? 1 : 0);
//   if (style.FontSize) LODOP.SET_PRINT_STYLEA(0, "FontSize", style.FontSize);
//   if (style.Alignment) LODOP.SET_PRINT_STYLEA(0, "Alignment", style.Alignment);
//   if (style.LineSpacing) LODOP.SET_PRINT_STYLEA(0, "LineSpacing", style.LineSpacing);
//   if (style.Bold) LODOP.SET_PRINT_STYLEA(0, "Bold", style.Bold);

// };

export { getDayindate , getOpenMoneyBox }
