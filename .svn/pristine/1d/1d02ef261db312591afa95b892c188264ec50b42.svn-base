<template>
  <div class="t-botton-timescountc" style="height: 100%;" ref="elememtt">
    <div class="f-botton-fs" style="height: 100%;">
      <el-row :gutter="24" style="height: 100%;">
        <el-col :span="8" style="border-right: 10px solid rgba(234, 226, 213, 1);height: 100%;position: relative;">
          <dropdown @getmemberID="getmemberID" :details="datalistval"></dropdown>
          <div class="timescountc_left overflowscroll" ref="addsockheight">
            <ul class="productNav">
              <li style="width: 50%;"><span>品名</span></li>
              <li style="width: 50%;" class="text-center">
                <span class="" id="">消费次数</span>
              </li>
            </ul>
            <ul id="addshopList">
              <li class="danpintr" v-for="(item,i) in addobjCountList" :key="i">
                <div class="cateringProductNamebox"><span>{{item.goodsname}}</span></div>
                <div class="cateringProductNamebox text-center">
                  <div class="sumchange">
                    <i class="el-icon-remove jiajianbtn" @click="addjiajianhao(1,item.Qty,item.maxcalccount,item.GoodsId)"></i>
                    <span class="getqty">{{item.Qty}}</span>
                    <i class="el-icon-circle-plus jiajianbtn" @click="addjiajianhao(2,item.Qty,item.maxcalccount,item.GoodsId)" ></i>
                  </div>
                </div>
                <div class="cateringProductMoreinfo" @click="selectYJemployee(item)"><i class="el-icon-warning" v-if="item.showempremark ==undefined || item.showempremark =='' "></i><i style="color: #67c23a;" class="el-icon-circle-check"  v-else></i>{{(item.showempremark ==undefined || item.showempremark =='') ? '选择业绩员':item.showempremark}}</div>
              </li>
            </ul>
          </div>
          <div class="timescountc_left_footer" ref="footer">
            <div class="footer_top" style="margin: 12px 0;">
              <span style="width:50%;    display: inline-block;">合计</span>
              <span class="text-center pull-right" style="width:50%;display: inline-block;">{{total}}次</span>
            </div>
            <p>
              <el-checkbox v-model="checkedreceipt">打印小票</el-checkbox>
            </p>
            <p>
              <el-checkbox v-model="IsSms">短信通知</el-checkbox>
            </p>
            <div class="pull-right" style="margin-top: -44px;">
              <el-button type="info" @click="closeModal">取消</el-button>
              <el-button type="danger" @click="timescountsok">结账</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="16" style="height: 100%;" class="overflowscroll">
          <div class="right" style="height: 100%;">
            <el-row :gutter="20" class="timescountc_right">
              <el-col :span="12" style="margin-bottom:15px;" v-for="(item,i) in objCount" :key="i">
                <div class="tablelcenter" @click="addobjcountsum(item)">
                  <div class="menu-img">
                  <img :src='item.showgoodsimg'  width="55" height="55" onerror="this.src='static/images/shopmore.png'">
                    <div class="titlename">
                      <p data-icon="10">{{item.GOODSNAME}}</p>
                      <p class="list2">
                        <span>有效期至 {{item.INVALIDDATE}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="menu-txt com_color">
                    <strong>x{{item.CALCCOUNT}}</strong>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 业绩员工 -->
    <el-dialog v-if="showyjemployee" title="业绩员工" :visible.sync="showyjemployee" width="700px">
      <yjemployee @showyjemployee="showyjemployee=false" :shopitemList="shopitemList" @Receiveyjemployee="Receiveyjemployee"></yjemployee>
    </el-dialog>
    <!-- 业绩员工 -->
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define"
import { getDayindate } from "@/util/Printing"
import dropdown from "@/components/ssmember/dropdown"
import yjemployee from "@/components/employee/YJemployee";

export default {
  data() {
    return {
      searchText: '',
      memberId: '',
      objCount: [],
      addobjCountList: [],
      total: 0,
      checkedreceipt: false,
      IsSms: false,
      showyjemployee: false,
      ruleFormsock: {},
      shopitemList: {},
      datalistval: {},

    };
  },
  computed: {
    ...mapGetters({
      memberState: "memberState",
      employeeList: "employeeList",
      timescountcconsumptionState: "timescountcconsumptionState",
    })
  },
  watch: {
    memberState(data) {
      if (data.success) {
        this.objCount = data.data.objCount;
        for (let i = 0; i < this.objCount.length; i++) {
          this.objCount[i].showgoodsimg = GOODS_IMGURL+ this.objCount[i].GOODSID + '.png';
        }
      }
    },
    timescountcconsumptionState(data) {
      if (data.success) {
        this.$message('计次消费成功');
        this.datalistval = {};
        this.addobjCountList = [];
        this.objCount = [];
        this.total = 0;
        this.memberId = '';
        let qresurl = this.$store.state.commodityc.saveQRcodeIMG;
        getDayindate('601020407', data.data.OutBillId, 2, qresurl);
      } else {
        this.$message(data.message);

      }
    }

  },
  methods: {
    setcommonHeightb() {
      var elememtheight = this.$refs.elememtt.offsetHeight;
      var footerheight = this.$refs.footer.offsetHeight;
      this.$refs.addsockheight.style.height = (elememtheight - footerheight - 96) + 'px';
    },
    getmemberDetail(item) {
      this.$store.dispatch('getMemberItem', item).then(() => {})
    },
    getmemberID(data) {
      this.addobjCountList = [];
      this.memberId = data;
      let item = {
        ID: this.memberId
      }
      this.getmemberDetail(item);

    },
    addobjcountsum(item) {
      item.GOODSMODE=1;
      item.ID=item.GOODSID;
      this.setcommonHeightb();
      let count = 1;
      if (this.addobjCountList.length > 0) {
        for (let i = 0; i < this.addobjCountList.length; i++) {
          if (this.addobjCountList[i].GoodsId == item.GOODSID) {
            if (this.addobjCountList[i].Qty >= item.CALCCOUNT) {
              this.$message({
                showClose: true,
                message: '消费次数不能大于商品次数'
              });

            } else {
              this.addobjCountList[i].Qty = this.addobjCountList[i].Qty + 1;
            }
            break;
          } else {
            if ((i + 1) < this.addobjCountList.length) {
              continue;
            } else {
              this.addobjCountList.push({
                goodsname: item.GOODSNAME,
                Qty: count,
                GoodsId: item.GOODSID,
                maxcalccount: item.CALCCOUNT,
                Price: item.PRICE,
                itemObj: item
              })
              break;
            }
          }
        };

      } else {
        this.addobjCountList.push({
          goodsname: item.GOODSNAME,
          Qty: count,
          GoodsId: item.GOODSID,
          maxcalccount: item.CALCCOUNT,
          Price: item.PRICE,
          itemObj: item
        })
      }
      this.jisuantotal();
    },
    jisuantotal() {
      this.total = 0;
      for (let i in this.addobjCountList) {
        this.total += this.addobjCountList[i].Qty;
      }
      return this.total;
    },
    addjiajianhao(status, calccount, maxcalccount, GoodsId) {
      if (status == 2) {
        if (calccount >= maxcalccount) {
          this.$message({
            showClose: true,
            message: '消费次数不能大于商品次数'
          });
          return;
        }
      }
      for (let i = 0; i < this.addobjCountList.length; i++) {
        if (this.addobjCountList[i].GoodsId == GoodsId) {
          if (status == 1) {
            this.addobjCountList[i].Qty = this.addobjCountList[i].Qty - 1;
            if (this.addobjCountList[i].Qty == 0) {
              this.addobjCountList.splice(i, 1);
            }
          } else {
            this.addobjCountList[i].Qty = this.addobjCountList[i].Qty + 1;
          }
          this.jisuantotal();
          break;
        } else {
          if ((i + 1) < this.addobjCountList.length) {
            continue;
          } else {
            break;
          }
        }
      };
    },
    closeModal() {
      this.total=0;
      this.memberId='';
       this.objCount=[];
       this.addobjCountList=[];
       this.datalistval={};

    },
    timescountsok() {
      if (this.memberId == '') {
        this.$message('请选择会员');
        return;
      }
      if (this.addobjCountList.length == 0) {
        this.$message('请选择商品');
        return;
      }
      let IsSms = this.IsSms == true ? 1 : 0;
      let GoodsDetaila = {}
      for (let i = 0; i < this.addobjCountList.length; i++) {
        Vue.delete(this.addobjCountList[i], 'itemObj');
        GoodsDetaila[i] = this.addobjCountList[i]
      }
      let AllsendData = {
        GoodsDetail: JSON.stringify(GoodsDetaila),
        VipId: this.memberId,
        Remark: '',
        IsSms: IsSms,
        IsCheck: 1
      }
      this.$store.dispatch("gettimescountcconsumption", AllsendData).then(() => {});

    },
    selectYJemployee(item) {
      this.showyjemployee = true;
      this.shopitemList = item;
    },
    Receiveyjemployee(item1, item2, GoodsId) {
      this.showyjemployee = false;
      for (let i = 0; i < this.addobjCountList.length; i++) {
        if (this.addobjCountList[i].GoodsId == GoodsId) {
          this.addobjCountList[i].showempremark = item2.join(',');
          let newObj = {};
          if (item1.length > 1) {
            for (var k = 0; k < item1.length; k++) {
              Object.assign(newObj, item1[k]);
            };
          } else {
            Object.assign(newObj, item1[0]);
          }
          Object.assign(this.addobjCountList[i], newObj);
          break;
        } else {
          if ((i + 1) < this.addobjCountList.length) {
            continue;
          } else {
            break;
          }
        }
      };

    },



  },
  components: {
    dropdown,
    yjemployee


  },
};

</script>
<style scoped>
.employee_ms .el-form-item__content {
  width: 70%;
}

.f-botton-fs .el-form-item__label {
  text-align: left !important;
}

.f-botton-fs .fastc_top {
  margin-top: 50px;
}

.f-botton-fssock .el-dialog__body {
  padding: 5px 20px;

}

.employeetitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  overflow: hidden;
  color: #130606;
  text-align: center;
}

.timescountc_left ul.productNav {
  padding: 0 12px;
  overflow: hidden;
  height: 26px;
  line-height: 26px;
  color: #795548;
  background-color: rgba(251, 120, 154, 0.3294117);
}

.timescountc_left ul.productNav li {
  float: left;
}

.timescountc_left ul#addshopList {
  padding: 0 12px;
}

.timescountc_left ul#addshopList li {
  margin-top: 6px;
  width: 100%;
  overflow: hidden;
  padding: 4px 0;
}

.timescountc_left ul#addshopList li .cateringProductMoreinfo {
  overflow: hidden;
  width: 100%;
  float: left;
  color: #9E9E9E;
  font-size: 12px;
  margin-top: 5px;
  cursor: pointer;
}

.timescountc_left ul#addshopList .cateringProductNamebox {
  width: 50%;
  float: left;
}

.timescountc_left_footer {
  position: absolute;
  bottom: 12px;
  left: 22px;
  right: 22px;
  border-top: 3px solid #eae2d5;
  background: #fff;
}

/*模板样式*/
.timescountc_right .tablelcenter {
  height: 70px;
  overflow: hidden;
  position: relative;
  border: 1px solid #9E9E9E;
  padding: 8px;
  cursor: pointer;
}

.timescountc_right .tablelcenter .menu-img img {
  height: 50px;
  width: 50px;
  vertical-align: middle;
  border: 0;
  float: left;
  margin-right: 5px;
}

.timescountc_right .tablelcenter .menu-txt {
  position: absolute;
  top: 12px;
  right: 20px;
}

</style>
