import { getLodop } from '@/assets/js/LodopFuncs' //导入模块
import commonSend from '@/api/api'
import { getHomeData, getPrintData, getOthersData, getUserInfo } from '@/api/index'
import dayjs from 'dayjs'

let LODOP;
let qrcSrcimg;
var scaling = 0.375,
  pageTop = 10, //小票上边距
  pageLeft = 20, //小票左边距
  pageWidth = 0, //小票规格 50mm , 80mm
  printW = 0, // 内容宽度
  rowHeight = 20, //小票行距
  lineHeight = 6, // 分割线高度
  pageLabel = 45, // 标签左边距
  printValueW = 0, // 文本内容右宽度
  fontSize = 12;

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
  let pringInfo = getPrintData(); // 打印设置
  console.log("打印小票数据",pringInfo)
  let printtype = getOthersData().printtype ? parseInt(getOthersData().printtype) : 0; //小票宽度   0=580,1=800
  let printnum = getOthersData().printnum ? parseInt(getOthersData().printnum) : 1; // 打印数量

  console.log("打印数量",printnum)

  const printType = localStorage.getItem('printType') || ''
  pageWidth = printType == 1 ? 800 : 580  //小票宽度
  printW = pageWidth * scaling; // 内容宽度
  printValueW = (pageWidth - (pageLabel + pageLeft) * 2) * scaling; // 文本内容右宽度

  if (Object.keys(pringInfo).length == 0) {
    pringInfo =
      {
        "ddList": [{ "label": "标题", "value": "店来客美业通", "isShow": true }, { "label": "注脚", "value": "谢谢惠顾，欢迎下次光临!", "isShow": true }, { "label": "店铺二维码", "value": "data:image/png;base64,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", "isShow": true }],
        "ddList1": [{ "label": "结账单号：", "value": "1000000", "isShow": true }, { "label": "结账日期：", "value": "2014-06-19 15:04", "isShow": true }, { "label": "收银员：", "value": "小张", "isShow": true }],
        "ddList3": [{ "label": "会员卡号：", "value": "000001", "isShow": true }, { "label": "会员姓名：", "value": "陈生", "isShow": true }, { "label": "会员余额：", "value": "678", "isShow": true }, { "label": "积分(本次/剩余)：", "value": "256/32555", "isShow": true }],
        "ddList4": [{ "label": "联系电话：", "value": "", "isShow": true }, { "label": "联系地址：", "value": "", "isShow": true }],
        "ssList": [{ "name": "收银员", "checked": true, "list": 1, "no": 2 }, { "name": "店铺电话", "checked": true, "list": 4, "no": 0 }, { "name": "店铺地址", "checked": true, "list": 4, "no": 1 }, { "name": "会员卡号", "checked": true, "list": 3, "no": 0 }, { "name": "会员姓名", "checked": true, "list": 3, "no": 1 }, { "name": "会员余额", "checked": true, "list": 3, "no": 2 }, { "name": "会员积分", "checked": true, "list": 3, "no": 3 }]
      }
  }

  console.log(pringInfo)

  let hPos = 10 //小票上边距
    // rowHeight = 20, //小票行距
    // xianHeight = 6,
    // leftwidth = 60,
    // printrulestatus = 1;  
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
  LODOP.SET_PRINT_PAGESIZE(3, 800, 600, '');
  LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

  if (!pringInfo || pringInfo.ddList[0].isShow) { // 标题
    PrintLODOP_Text(hPos, 0, printW, rowHeight, COMPANYNAME, {
      FontSize: fontSize + 2, Alignment: 2, Bold: 1
    });
  }
  hPos += 30;

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
  PrintLODOP_Text(hPos, 0, printW, rowHeight, shopTypename, {
    FontSize: fontSize, Alignment: 2, Bold: 1
  });
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

    if (!pringInfo || pringInfo.ddList1[2].isShow) { // 收银员
      hPos = PrintLODOPcommon('收银员:', USERNAME, hPos);
    }
  }
  // hPos = dividingLine(hPos, pageWidth);
  // hPos = PrintLODOPcommonbold(hPos, pageWidth, xianHeight);

  addBorderLine(hPos, pageWidth)

  hPos += rowHeight

  let gw1 = pageLeft + pageLabel - 5, gw2 = 35;
  if (ItemsHeaderType == 1 || ItemsHeaderType == 3) {
    if (ItemsHeaderType == 1) {
      if (pageWidth == 800) {
        gw1 = (printW / 8) * 3 / 2;
        gw2 = (printW / 8) * 5 / 4;
      }
      PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "商品", { });
      PrintLODOP_Text(hPos, gw1, pageWidth, rowHeight, "折扣", { });
      PrintLODOP_Text(hPos, gw1 + gw2 * 1 - 5, gw2, rowHeight, "单价", { Alignment: 2 });
      PrintLODOP_Text(hPos, gw1 + gw2 * 2 - 10, gw2, rowHeight, "数量", { Alignment: 2});
      PrintLODOP_Text(hPos, gw1 + gw2 * 3 - 10, pageWidth, rowHeight, "小计", {  });
      hPos += rowHeight;

      for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
        let goodNameCodeColorSize = dayinjson.GoodsObj[i].GOODSNAME + '(' + dayinjson.GoodsObj[i].GOODSCODE +'-' + dayinjson.GoodsObj[i].COLORNAME + '-' + dayinjson.GoodsObj[i].SIZENAME + ')'
        let height = String(goodNameCodeColorSize).length / (pageWidth == 800 ? 25 : 20)
        let ROWHEIGHT = 16 * Math.ceil(height);

        PrintLODOP_Text(hPos, 0, printW, ROWHEIGHT, goodNameCodeColorSize, {});
        hPos += ROWHEIGHT;
        
        let goodsPrice = dayinjson.GoodsObj[i].GOODSPRICE,
          DISCOUNT = dayinjson.GoodsObj[i].DISCOUNT,
          PRICE = dayinjson.GoodsObj[i].PRICE,
          qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0',
          money = dayinjson.GoodsObj[i].MONEY ? String(dayinjson.GoodsObj[i].MONEY) : '0';

        PrintLODOP_Text(hPos, 1, gw1 + 5, rowHeight, goodsPrice, { TextNeatRow: true, LineSpacing: 0.3 });
        PrintLODOP_Text(hPos, gw1, pageWidth, rowHeight, DISCOUNT, {});
        PrintLODOP_Text(hPos, gw1 + gw2 * 1 - 5, gw2, rowHeight, PRICE, { Alignment: 2 });
        PrintLODOP_Text(hPos, gw1 + gw2 * 2 - 15, gw2 + 10, rowHeight, qty, { Alignment: 2 });
        PrintLODOP_Text(hPos, gw1 + gw2 * 3 - 10, pageWidth, rowHeight, money, { });
        hPos += 25;
      }
      
      addBorderLine(hPos, pageWidth)

      hPos += rowHeight

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
    if (pageWidth == 800) {
      gw1 = (printW / 8) * 3;
      gw2 = (printW / 8) * 5 / 3;
    }

    PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "商品", { Alignment: 2 });
    PrintLODOP_Text(hPos, gw1, gw2, rowHeight, "单价", { Alignment: 2 });
    PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, "消费", { Alignment: 2 });
    PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, "剩余", { Alignment: 2 });

    hPos += rowHeight;
    for (let i = 0; i < dayinjson.GoodsObj.length; i++) {
      let goodsName = dayinjson.GoodsObj[i].GOODSNAME,
        PRICE = dayinjson.GoodsObj[i].PRICE,
        CURCOUNT = dayinjson.GoodsObj[i].CURCOUNT,
        qty = dayinjson.GoodsObj[i].QTY ? String(dayinjson.GoodsObj[i].QTY) : '0';
        let height = String(goodsName).length / (pageWidth == 800 ? 7 : 5);
        let ROWHEIGHT = rowHeight * Math.ceil(height);
      PrintLODOP_Text(hPos, 1, gw1, ROWHEIGHT, goodsName, { TextNeatRow: true, LineSpacing: 0.3});
      PrintLODOP_Text(hPos, gw1, gw2, rowHeight, PRICE, { Alignment: 2 });
      PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, qty, { Alignment: 2 });
      PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, CURCOUNT, { Alignment: 2 });
      hPos += ROWHEIGHT;
    }
  } else if (ItemsHeaderType == 5) {
    let leftw0 = 1, leftw1 = 150;
    for (let i = 0; i < dayinjson.GoodsList.length; i++) {
      let goodsName = dayinjson.GoodsList[i].GOODSNAME,
        qty = dayinjson.GoodsList[i].QTY ? String(dayinjson.GoodsList[i].QTY) : '0';
      LODOP.ADD_PRINT_TEXT(hPos, leftw0, pageWidth, rowHeight, goodsName);
      LODOP.ADD_PRINT_TEXT(hPos, leftw1, pageWidth, rowHeight, qty);
      hPos += rowHeight;
    }
    addBorderLine(hPos, pageWidth)
    hPos += rowHeight

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

    if (pageWidth == 800) {
      gw1 = (printW / 8) * 3; 
      gw2 = (printW / 8) * 5 / 3;
    }
    PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, "商品", {  });
    PrintLODOP_Text(hPos, gw1, gw2, rowHeight, "数量", { Alignment: 2 });
    PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, "单价", { Alignment: 2 });
    PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, "金额", { Alignment: 2 });
    hPos += rowHeight;
    for(let i = 0; i< dest.length; i++){  
      let goodNameCode = dest[i].code + '-' + dest[i].name
      LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, goodNameCode)
      LODOP.SET_PRINT_STYLEA(0,'TextNeatRow', true)
      LODOP.SET_PRINT_STYLEA(0,"LineSpacing",0.5);
      LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
      let height = String(goodNameCode).length / (pageWidth == 800 ? 17 : 15);
      hPos += rowHeight * Math.ceil(height);
      for (let j = 0; j < dest[i].data.length; j++) {
        let colorSizeName = dest[i].data[j].COLORNAME + '-' + dest[i].data[j].SIZENAME,
        PRICE = showPurPrice == true ? dest[i].data[j].PRICE : '****',
        qty = dest[i].data[j].QTY ? String(dest[i].data[j].QTY) : '0',
        money = showPurPrice == true ? String(dest[i].data[j].MONEY) : '****';

        let height = String(colorSizeName).length / (pageWidth == 800 ? 7 : 5);
        let ROWHEIGHT = rowHeight * Math.ceil(height);
        PrintLODOP_Text(hPos, 1, gw1, ROWHEIGHT, colorSizeName, { TextNeatRow: true, LineSpacing: 0.3 });
        PrintLODOP_Text(hPos, gw1, gw2, rowHeight, qty, { Alignment: 2 });
        PrintLODOP_Text(hPos, gw1 + gw2, gw2, rowHeight, PRICE, { Alignment: 2 });
        PrintLODOP_Text(hPos, gw1 + gw2 * 2, gw2, rowHeight, money, { Alignment: 2 });

        hPos += ROWHEIGHT
      }
    }
    if(ItemsHeaderType == 14 || ItemsHeaderType == 15){
      addBorderLine(hPos, pageWidth)
      hPos += rowHeight

      hPos = PrintLODOPcommon('优惠金额:', dealFilterDate(Objvalue.BREAKSMONEY), hPos);
      hPos = PrintLODOPcommon('其它费用:', dealFilterDate(Objvalue.OTHERMONEY), hPos);
    }
  
    addBorderLine(hPos, pageWidth)
    hPos += rowHeight

    PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, '合计：', {  });
    PrintLODOP_Text(hPos, 80, pageWidth, rowHeight, GOODSQTY, {  });
    PrintLODOP_Text(hPos, 140, pageWidth, rowHeight, showPurPrice == true ? PAYMONEY : '****', { });

    hPos += rowHeight
  }
  if(ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16){
    addBorderLine(hPos, pageWidth)
    hPos += rowHeight

    if (!pringInfo || pringInfo.ddList3[0].isShow) { // 
      hPos = PrintLODOPcommon('会员卡号:', VIPCODE, hPos);
    }
    if (!pringInfo || pringInfo.ddList3[1].isShow) { // 
      hPos = PrintLODOPcommon('会员姓名:', VIPNAME, hPos);
    }
    if (!pringInfo || pringInfo.ddList3[2].isShow) { // 
      hPos = PrintLODOPcommon('储值余额:', CURRMONEY, hPos);
    }
  }

  if (ItemsHeaderType != 4 && ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16) {
    if (!pringInfo || pringInfo.ddList3[3].isShow) { // 
      hPos = PrintLODOPcommon('积分(本次/剩余):', GETINTEGRAL + '/' + VIPINTEGRAL, hPos, 109);
    }
  }

  if(String(REMARK).length != 0 && REMARK != undefined){
    addBorderLine(hPos, pageWidth)
    hPos += rowHeight

    PrintLODOP_Text(hPos, 1, pageWidth, rowHeight, '备注:', { });
    PrintLODOP_Text(hPos, pageLabel + pageLeft, printValueW, rowHeight, REMARK, {
      TextNeatRow: true, LineSpacing: 0.5, Bold: 1
    });
    let height = String(REMARK).length / 9;
    hPos += rowHeight * Math.ceil(height);
  }

  addBorderLine(hPos, pageWidth)
  hPos += rowHeight

  if(ItemsHeaderType == 14){
    hPos = PrintLODOPcommon('结算账户:', dealFilterDate(Objvalue.PAYTYPENAME) , hPos)
    hPos = PrintLODOPcommon('实付金额:', dealFilterDate(Objvalue.SUPPLIERBILLCURMONEY), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '欠供应商款:');
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(hPos, 72, pageWidth, rowHeight, dealFilterDate(Objvalue.SUPPLIERCURMONEY));
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    
    addBorderLine(hPos, pageWidth)

    hPos += rowHeight

    hPos = PrintLODOPcommon('打印时间:', dayjs(new Date()).format('YYYY-MM-DD HH:mm'), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, '')
  }else if(ItemsHeaderType == 15){
    hPos = PrintLODOPcommon('退款账户:', dealFilterDate(Objvalue.PAYTYPENAME), hPos)
    hPos = PrintLODOPcommon('实退金额:', dealFilterDate(Objvalue.SUPPLIERBILLCURMONEY), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, rowHeight, '欠供应商款:');
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    LODOP.ADD_PRINT_TEXT(hPos, 72, pageWidth, rowHeight, dealFilterDate(Objvalue.SUPPLIERCURMONEY));
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

    addBorderLine(hPos, pageWidth)

    hPos += rowHeight

    hPos = PrintLODOPcommon('打印时间:', dayjs(new Date()).format('YYYY-MM-DD HH:mm'), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, '')
  }else if(ItemsHeaderType == 16){
    hPos = PrintLODOPcommon('打印时间:', dayjs(new Date()).format('YYYY-MM-DD HH:mm'), hPos)
    LODOP.ADD_PRINT_TEXT(hPos, 65, pageWidth, 60, '')
  }

  if(ItemsHeaderType != 14 && ItemsHeaderType != 15 && ItemsHeaderType != 16){

    if (!pringInfo || pringInfo.ddList4[0].isShow) { //联系电话
      hPos = PrintLODOPcommon('联系电话:', SHOPTEL, hPos);
    }
    
    LODOP.ADD_PRINT_TEXT(hPos, 65, 110, rowHeight, SHOPADDRESS)
    LODOP.SET_PRINT_STYLEA(0,'TextNeatRow', true)
    LODOP.SET_PRINT_STYLEA(0,"LineSpacing",0.5);
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    let height = String(SHOPADDRESS).length / (pageWidth == 800 ? 12 : 10);
    hPos += rowHeight * Math.ceil(height);
    hPos += 20
    if (!pringInfo || pringInfo.ddList[1].isShow) { // 注脚
      let title = "谢谢惠顾，欢迎下次光临!"
      PrintLODOP_Text(hPos, 0, printW, rowHeight, title, { Alignment: 2});
    }

    hPos += 30;
    if (!pringInfo || pringInfo.ddList[2].isShow) { // 店铺二维码
    let iw = (printW - 120) / 2;
    LODOP.ADD_PRINT_IMAGE(hPos, iw, 250, 120, "<img border='0' style='height: 120px; ' src='" + qrcSrcimg + "' />");
    LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    hPos += 200;
    LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
    LODOP.ADD_PRINT_TEXT(hPos, 20, pageWidth, 80, " ");
    }
    showPrintrules(1);
    hPos += 80
  }
  LODOP.SET_PRINT_COPIES(printnum);
  LODOP.PRINT();
  // LODOP.PREVIEW()
  // LODOP.PRINT_DESIGN()
}

const addBorderLine = function(hPos, pageWidth){
  LODOP.ADD_PRINT_TEXT(hPos, 1, pageWidth, 10, '-------------------------------------')
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
const PrintLODOP_Text = function (Top, Left, Width, Height, strContent, style) {
  LODOP.ADD_PRINT_TEXT(Top, Left, Width, Height, strContent);
  LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", style.TextNeatRow ? 1 : 0);
  if (style.FontSize) LODOP.SET_PRINT_STYLEA(0, "FontSize", style.FontSize);
  if (style.Alignment) LODOP.SET_PRINT_STYLEA(0, "Alignment", style.Alignment);
  if (style.LineSpacing) LODOP.SET_PRINT_STYLEA(0, "LineSpacing", style.LineSpacing);
  if (style.Bold) LODOP.SET_PRINT_STYLEA(0, "Bold", style.Bold);

};

// 分割线
const dividingLine = function (top, width) {
  LODOP.ADD_PRINT_HTM(top, 1, width, 1, "<div style='border-top:1px dashed #000;'></div>");
  return (top + lineHeight * 1.5);
}



export { getDayindate , getOpenMoneyBox }
