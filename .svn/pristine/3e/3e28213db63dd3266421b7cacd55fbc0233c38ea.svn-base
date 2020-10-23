import Vue from "vue";

import { GOODS_IMGURL } from "@/util/define.js";
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
   return new Promise(resolve => {
      var img = new Image();
      img.onload = function() {
         if (this.complete == true) {
            resolve(true);
            img = null;
         }
      };
      img.onerror = function() {
         resolve(false);
         img = null;
      };
      img.src = url;
   });
};
const isIntNum = function(val) {
   var regPos = /^\d+$/; // 正整数
   if (regPos.test(val)) {
      return true;
   } else {
      return false;
   }
};

export default {
   install(Vue) {
      Vue.directive("real-img", async function(el, binding) {
         if (binding.value) {
            let imgURL = binding.value;
            if (isIntNum(imgURL)) {
               //获取图片地址
               imgURL = GOODS_IMGURL + imgURL + ".png";
            }
            let exist = await imageIsExist(imgURL);
            if (exist) {
               el.setAttribute("src", imgURL + "?v=11");
            }
         }
      });
      Vue.directive("check", function(el, binding) {
         if (binding.value) {
            el.setAttribute("checked", binding.value);
         } else {
            el.removeAttribute("checked");
         }
      });

      Vue.directive("inputDisabled", function(el, binding) {
         if (!binding.value) {
            el.setAttribute("disabled", "disabled");
         } else {
            el.removeAttribute("disabled");
         }
      });

      Vue.directive("setHeight", function(el, binding) {
         let height = window.innerHeight;
         let topspace = 0;
         let bottomspace = 0;
         if (typeof binding.value == "object") {
            let value = binding.value;
            let top = value.top ? value.top : 0;
            let bottom = value.bottom ? value.bottom : 0;
            topspace = isNaN(top) ? window.innerHeight * parseFloat(top.split("%")[0]) * 0.01 : top;
            bottomspace = isNaN(bottom)
               ? window.innerHeight * parseFloat(bottom.split("%")[0]) * 0.01
               : bottom;
            if (window.innerWidth >= 768) {
               // header = 58
               topspace += 14;
            } else if (window.innerWidth >= 481) {
               // header = 54
               topspace += 10;
            } else {
               // header = 44
            }
            height = window.innerHeight - topspace - bottomspace;
         }
         el.firstChild.style.display = "block";
         el.firstChild.style.height = height + "px";
         el.firstChild.style.setProperty("overflow-y", "scroll");
         el.style.paddingTop = topspace + "px";
         el.style.paddingBottom = bottomspace + "px";
      });

      Vue.directive("screenHeight", {
         inserted: function(el, binding) {
            el.style.height = window.innerHeight + "px";
         }
      });
   }
};
