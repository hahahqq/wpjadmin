import { getLodop } from "@/assets/js/LodopFuncs"; //导入模块
// 数值型，单位是pt；字符：1in = 2.54cm = 25.4mm = 72pt = 96px

var LODOP;
var space = "2%", // 页边距
   fontSize = 10, // 字体大小
   rowHeight = fontSize * 1.7, //行距
   hPos = rowHeight,
   dividingLine_height = rowHeight / 2,
   QRcode_imgWH = 110;
var totalMoney = 0; // 商品总额

const printingFun = function(billData, goodsList, vipData, QRcodeUrl) {
   let PrintType = localStorage.getItem("printType") ? localStorage.getItem("printType") : 0; // //小票规格 0=50mm , 1=80mm
   let pageWidth = PrintType == 1 ? "80mm" : "58mm",
      arr = new Array();
   hPos = rowHeight;

   LODOP = getLodop();
   LODOP.PRINT_INIT("微商城订单打印");
   LODOP.SET_PRINT_PAGESIZE(3, pageWidth, "10mm", "CreateCustomPage");
   LODOP.SET_PRINT_STYLE("FontSize", fontSize); // 设置打印字体
   LODOP.SET_PRINT_STYLE("ItemType", 1);

   PrintLODOP_Text(hPos, 0, "100%", rowHeight, billData.SHOPNAME, {
      FontSize: fontSize + 2,
      Alignment: 2,
      Bold: 1
   });
   hPos += rowHeight * 2;

   dividingLine(pageWidth, "订单信息");
   arr = [
      {
         label: "订单编号",
         value: billData.BILLNO
      },
      {
         label: "下单时间",
         value: formatTime(new Date(billData.BILLDATE))
      },
      {
         label: "下单方式",
         value: billData.PAYTYPENAME
      },
      {
         label: "会员编号",
         value: vipData.CODE
      },
      {
         label: "收货人",
         value: billData.RECEIPTNAME
      }
   ];
   printing_row(arr, 0, "30%", "70%");

   dividingLine(pageWidth, "消费明细");
   printing_goods(goodsList);

   dividingLine(pageWidth);
   arr = [
      {
         label: "商品总额",
         value: "¥" + totalMoney
      },
      {
         label: "优惠券",
         value: "- ¥" + billData.CURRMONEY
      },
      {
         label: "运费",
         value: "¥" + billData.FREIGHTMONEY
      },
      {
         label: "合计付款",
         value: "¥" + billData.PAYMONEY
      }
   ];
   printing_row(arr, 0, "30%", "70%");

   dividingLine(pageWidth);
   PrintLODOP_Text(hPos, 0, "100%", rowHeight, "谢谢惠顾，欢迎下次光临！", { Alignment: 2 });
   hPos += rowHeight;

   if (QRcodeUrl) {
      LODOP.ADD_PRINT_IMAGE(
         hPos,
         0,
         QRcode_imgWH,
         QRcode_imgWH,
         "<img border='0' src='" + QRcodeUrl + "' />"
      );
      LODOP.SET_PRINT_STYLEA(0, "Stretch", 1); // 图片截取缩放模式,1=扩展（可变形）缩放
      LODOP.SET_PRINT_STYLEA(0, "Horient", 2); // 纸张水平方向居中
   }

   // LODOP.PREVIEW();
   LODOP.PRINT();
};

function printing_goods(goodsList) {
   totalMoney = 0;
   for (let i = 0; i < goodsList.length; i++) {
      if (i > 0) hPos += rowHeight * 0.2;
      totalMoney += parseFloat(goodsList[i].totalMoney);
      let arr = [
            {
               label: goodsList[i].NAME,
               value: "¥" + goodsList[i].PRICE
            },
            {
               label: "规格",
               value: goodsList[i].COLOR + " - " + goodsList[i].SIZE
            },
            {
               label: "数量",
               value: goodsList[i].QTY
            },
            {
               label: "小计",
               value: "¥" + goodsList[i].totalMoney
            }
         ],
         No = i + 1 + ".";

      PrintLODOP_Text(hPos, space, "10%", rowHeight, No, {});
      printing_row(arr, "5%", "50%", "45%");
   }
}

function printing_row(arr, Left, w1, w2) {
   let leftW = parseInt(w1) - parseInt(space) + "%",
      rightW = parseInt(w2) - parseInt(space) + "%",
      leftS = parseInt(Left) + parseInt(space) + "%",
      rightS = parseInt(Left) + parseInt(space) + parseInt(leftW) + "%";

   for (let i = 0; i < arr.length; i++) {
      PrintLODOP_Text(hPos, leftS, leftW, rowHeight, arr[i].label, { Alignment: 1 });
      PrintLODOP_Text(hPos, rightS, rightW, rowHeight, arr[i].value, { Alignment: 3 });
      hPos += rowHeight;
   }
}

// 分割线
function dividingLine(width, title) {
   hPos += dividingLine_height;
   LODOP.ADD_PRINT_HTM(hPos, 1, width, 1, "<div style='border-top:1px dashed #000;'></div>");

   let fsize = fontSize,
      vh = hPos - fontSize / 2;
   if (title) {
      let str =
         "<div style='text-align:center;font-size:" +
         fsize +
         "px'><span style='background:white;display:inline-block;color:#333;padding:0 " +
         fsize / 2 +
         "px;'>" +
         title +
         "</span></div>";
      LODOP.ADD_PRINT_HTM(vh, 0, "RightMargin:0", fsize, str);
      hPos += fsize / 3;
   }
   hPos += dividingLine_height;
}

// 增加纯文本打印项
function PrintLODOP_Text(Top, Left, Width, Height, strContent, style) {
   LODOP.ADD_PRINT_TEXT(Top, Left, Width, Height, strContent);
   LODOP.SET_PRINT_STYLEA(0, "TextNeatRow", style.TextNeatRow ? 1 : 0);
   if (style.FontSize) LODOP.SET_PRINT_STYLEA(0, "FontSize", style.FontSize);
   if (style.Alignment) LODOP.SET_PRINT_STYLEA(0, "Alignment", style.Alignment); // 1-左靠齐  2-居中  3-右靠齐
   if (style.LineSpacing) LODOP.SET_PRINT_STYLEA(0, "LineSpacing", style.LineSpacing);
   if (style.Bold) LODOP.SET_PRINT_STYLEA(0, "Bold", style.Bold);
}

function formatTime(date) {
   let seperator1 = "-";
   let seperator2 = ":";
   let y = date.getFullYear();
   let m = date.getMonth() + 1;
   m = m < 10 ? "0" + m : m;
   let d = date.getDate();
   d = d < 10 ? "0" + d : d;
   let hh = date.getHours();
   hh = hh < 10 ? "0" + hh : hh;
   let mm = date.getMinutes();
   mm = mm < 10 ? "0" + mm : mm;
   let ss = date.getSeconds();
   ss = ss < 10 ? "0" + ss : ss;
   return y + seperator1 + m + seperator1 + d + " " + hh + seperator2 + mm + seperator2 + ss;
}

export { printingFun };
