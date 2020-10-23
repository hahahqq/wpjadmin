<template>
  <div class="t-botton-timescountc" style="height: 100%;" ref="elememt">
    <div class="f-botton-fs" style="height: 100%;">
      <el-row :gutter="24" style="height: 100%;">
        <el-col :span="8" style="border-right: 10px solid rgba(234, 226, 213, 1);height: 100%;position: relative;">
          <dropdown @getmemberID="getmemberID" :details="datalistval"></dropdown>
          <div class="timescountc_left overflowscroll" ref="addsockheight">
            <ul class="productNav">
              <li style="width: 30%;"><span>品名</span></li>
              <li style="width: 15%;"><span>单价</span></li>
              <li style="width: 20%;" class="text-center"><span>数量</span></li>
              <li style="width: 15%;"><span>实销价</span></li>
              <li style="width: 20%;"><span>小计</span></li>
            </ul>
            <ul id="addshopList">
              <li class="danpintr" v-for="(item,i) in addobjCountList" :key="i" v-if="addobjCountList.length>0">
                <div class="cateringProductNamebox" style="width: 30%;"><span>{{item.goodsname}}</span></div>
                <div class="cateringProductNamebox" style="width: 15%;"><span>{{item.retailprice}}</span></div>
                <div class="cateringProductNamebox text-center" style="width: 20%;">
                  <div class="sumchange">
                    <i class="el-icon-remove jiajianbtn" @click="addjiajianhao(1,item.calccount,item.maxcalccount,item.GoodsId)"></i>
                    <span class="getqty">{{item.Qty}}</span>
                    <i class="el-icon-circle-plus jiajianbtn" @click="addjiajianhao(2,item.calccount,item.maxcalccount,item.GoodsId)"></i>
                  </div>
                </div>
                <div class="cateringProductNamebox" style="width: 15%;cursor: pointer;" @click="changeDP({GoodsId:item.GoodsId,label:'实销价',value:item.Price,dpstatus:2})"><span>{{item.Price}}</span></div>
                <div class="cateringProductNamebox" style="width: 20%;"><span>{{(item.Price*item.Qty).toFixed(2)}}</span></div>
                <div class="cateringProductMoreinfo">
                  <div class="validityleft pull-left">
                    <span>有效期</span>
                    <span>{{item.showInvalidDate}}</span>
                  </div>
                  <div class="validityright">
                    <span class="el-tag" v-for="(itemd,index) in selectTimedata" :key='index' :class="{'selected':index==item.statusactive}" @click="selectmouthTime(index,item.GoodsId,itemd.mouthday)" >{{itemd.name}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="timescountc_left_footer" ref="footer">
            <div class="footer_top" style="margin: 12px 0;">
              <span style="width:36%;    display: inline-block;">合计</span>
              <span style="display: inline-block;">{{total}}</span>
              <span class="text-center pull-right" style="display: inline-block;">{{TotalPrice}}</span>
            </div>
            <div style="    margin: 5px 0;">
              <span>业绩员工</span>
              <el-input style="width:72%;" placeholder="请选择业绩员工" auto-complete="off" :disabled="true" class="Choiceinput" v-model="ruleFormsock.AllselecteSaleEmpId" @click.native="selecteSaleEmpId"></el-input>
            </div>
            <div class="f_commodityc-left">
              <el-button type="info" @click="closeModal">清空</el-button>
              <div class="pull-right">
                <el-button type="danger" @click="co_reckoning">充值</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <!--  <div class="search_sock">
            <el-input type="default" v-model="searchText" placeholder="输入商品名称/编码" style="width: 45%;">
              <el-button slot="append" type="default" @click="searchfun2(1)">查询</el-button>
            </el-input>
          </div> -->
          <div class="classification_List">
            <div class="Tswiper-container">
              <ul class="swiper-wrapper" id="activityList">
                  <li class="swiper-slide" @click="ck_commoditycflList('','ok')" :class="{'selected':index==current}">全部</li>
                  <li class="swiper-slide" v-for="(item,index) in commoditycflList" :key="index" @click="ck_commoditycflList(item.ID,index)" :class="{'selected':index==current}">{{item.NAME}}</li>
              </ul>
            </div>
          </div>
          <div class="commodityc_rightsock">
            <div class="tablelist scrollstyle" v-loading="loading">
              <el-row :gutter="20" class="timescountc_right">
                <el-col :span="6" style="margin-bottom:10px;" v-for="(item,i) in pagelist" :key="i">
                  <div class="tablelcenter" @click="addcommodityc(item)">
                    <div class="menu-img">
                      <img :src='item.showgoodsimg'  width="55" height="55" onerror="this.src='static/images/shopmore.png'">
                      <div class="titlename">
                        <p data-icon="10" style="font-size: 12px;">{{item.NAME}}</p>
                        <strong class="com_color" style="position: absolute;bottom: 8px;">￥{{item.PRICE}}</strong>
                      </div>
                    </div>
                    <div class="menu-txt com_color">
                      <strong style="font-size: 12px;"><i style="background: #ff5722;color: #fff;padding: 0 3px;border-radius: 6px;font-size: 12px;">库</i>{{item.STOCKQTY}}</strong>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="men_porioven pull-right" style="margin-top:-10px;" v-if='pagination.TotalNumber > 20'>
            <div class="m-top-sm clearfix elpagination" >
              <el-pagination
                background
                @size-change="handlePageChange"
                @current-change="handlePageChange"
                :current-page.sync="pagination.PN"
                :page-size="pagination.PageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagination.TotalNumber"
                class="text-center"
              ></el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 选择业绩员工 -->
    <el-dialog title="选择业绩员工" :visible.sync="dialogFormVisible">
      <div class="employeetitle">充值金额：<i class="com_color">{{TotalPrice}}</i>元，按金额的<i class="com_color">{{ruleFormsock.getfastcExtract}}</i>提成，员工可的<i class="com_color">{{ruleFormsock.ExtractMoney}}</i>元提成</div>
      <div class="dialog-footer employee_ms">
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[0]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" class="half" width="30%">
                <el-select v-model="ruleForm[0].SaleEmpIdfirst" placeholder="" class="full-width" @change="SaleEmpIdfirst">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%" class="half">
                <el-input v-model="ruleForm[0].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成" class="half">
                <el-input v-model="ruleForm[0].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[1]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" class="half" width="30%">
                <el-select v-model="ruleForm[1].SaleEmpIdsecond" placeholder="" class="full-width" @change="SaleEmpIdsecond">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%" class="half">
                <el-input v-model="ruleForm[1].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成" class="half">
                <el-input v-model="ruleForm[1].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[2]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" class="half" width="30%">
                <el-select v-model="ruleForm[2].SaleEmpIdthird" placeholder="" class="full-width" @change="SaleEmpIdthird">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%" class="half">
                <el-input v-model="ruleForm[2].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成" class="half">
                <el-input v-model="ruleForm[2].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getAllSaleEmpId">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择业绩员工 -->
    <!-- 充值界面 -->
    <el-dialog v-if="showRecharge" title="收银" :visible.sync="showRecharge" width="700px">
      <recharge @closeModalrecharge="showRecharge=false" :totalprice="TotalPrice" :isselectvip="VipId" @CashRecharge="CashRecharge"></recharge>
    </el-dialog>
    <!-- 充值界面 -->
  </div>
</template>
<script>
import Vue from 'vue';
import { GOODS_IMGURL } from "@/util/define"
import { getDayindate } from "@/util/Printing";
import { mapState, mapGetters } from "vuex";
import dropdown from "@/components/ssmember/dropdown"
import yjemployee from "@/components/employee/YJemployee";
import recharge from "@/components/Recharge/Recharge";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


export default {
  data() {
    return {
      timescountrstatus: false,
      getgoodsIMGURL: '',
      current: 'ok',
      index: 'ok',
      searchText: '',
      VipId: '',
      objCount: [],
      addobjCountList: [],
      total: 0,
      TotalPrice: 0,
      checkedreceipt: false,
      checkedmessage: false,
      pagelist: [],
      selectTimedata: [{
          name: '1个月',
          mouthday: 1
        }, {
          name: '6个月',
          mouthday: 6
        },
        {
          name: '1年',
          mouthday: 12
        }, {
          name: '永久有效',
          mouthday: 'ok'
        }
      ],
      loading: false,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: {
        PN: 1,
        Filter: "",
        Status: -1,
        Mode: 1,
        TypeID: "", //商品类别ID
        DescType: 0
      },
      showyjemployee: false,
      showRecharge: false,
      shopitemList: {},
      datalistval: {},
      showTishi: '',
      ruleFormsock: {
        getfastcExtract: '',
        Remark: '',
        ExtractMoney: '',
        AllselecteSaleEmpId: ''

      },
      ruleForm: [{
          SaleEmpIdfirst: "",
          share: '',
          Extract: '',
          Name: ''
        },
        {
          SaleEmpIdsecond: "",
          share: '',
          Extract: '',
          Name: ''
        },
        {
          SaleEmpIdthird: "",
          share: '',
          Extract: '',
          Name: ''
        }
      ],
      SaleEmpMoneyArray: [],
      dialogFormVisible: false,
      showRecharge: false
    };
  },
  computed: {
    ...mapGetters({
      memberState: "memberState",
      employeeList: "employeeList",
      commoditycflListState: "commoditycflListState",
      commoditycflList: "commoditycflList",
      dataList: "goodsList",
      dataListStateTitle: "goodsListState",
      setmealrtimesrechargeState: "setmealrtimesrechargeState",
      storagevaluerroyaltyState: "storagevaluerroyaltyState",
    })
  },
  watch: {
    memberState(data) {
      if (data.success) {
        this.objCount = data.data.objCount;
      }
    },
    storagevaluerroyaltyState(data) {
      if (data.success) {
        this.ruleFormsock.getfastcExtract = data.data.EmpAddRate * 100 + '%';
        this.ruleFormsock.ExtractMoney = (this.TotalPrice * data.data.EmpAddRate).toFixed(2);
      }
    },
    dataListStateTitle(data) {
      this.loading = false;
      this.isFilter = false;
      this.pagelist = [...this.dataList];
      this.getgoodsIMGURL = GOODS_IMGURL;
      for (let i = 0; i < this.pagelist.length; i++) {
        this.pagelist[i].showgoodsimg = this.getgoodsIMGURL + this.pagelist[i].ID + '.png';
      };
      if (data.success) {
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
      }
    },
    setmealrtimesrechargeState(data) {
      if (this.timescountrstatus) {
        if (data.success) {
          this.$message('计次充值成功');
          this.VipId = '';
          this.setmealrPrice = '';
          this.setmealrName = '';
          this.rechargecount = '';
          this.writetime = '';
          this.addobjCountList = [];
          this.GoodsPackId = '';
          this.datalistval = {};
          this.SaleEmpMoneyArray = [];
          this.rechargeGoodsList = [];
          this.ruleFormsock.AllselecteSaleEmpId = '';
          this.timescountrstatus = false;
          this.total = 0;
          this.TotalPrice = 0;
          let qresurl = this.$store.state.commodityc.saveQRcodeIMG;
          getDayindate('91020223', data.data.BillId, 5, qresurl);
        } else {
          this.$message(data.message);
          this.timescountrstatus = false;
        }

      }

    }

  },
  methods: {
    clickme: function() {
      var that = this;
      that.$nextTick(function() {
        var mySwiper = new Swiper(".Tswiper-container", {
          slidesPerView: 6,
          paginationClickable: !0,
          spaceBetween: 4,
          freeMode: !0,
        });
      })
      this.$store.dispatch("getGoodsList", { Status: -1, Mode: 1, Filter: '', PN: 1 });
    },
    ck_commoditycflList(flID, index) { //触发分类
      this.current = index;
      this.pageData.TypeID = flID;
      this.pageData.PN = 1;
      this.getNewData();
    },
    selectmouthTime(index, shopID, mouthday) {
      let InvalidDate = mouthday == 'ok' ? '' : this.getMouthorYearDay(mouthday);
      if (this.addobjCountList.length > 0) {
        for (let i = 0; i < this.addobjCountList.length; i++) {
          if (this.addobjCountList[i].GoodsId == shopID) {
            this.addobjCountList[i].statusactive = index;
            if (InvalidDate == '') {
              this.addobjCountList[i].IsInvalid = 0;
              this.addobjCountList[i].InvalidDate = '';
              this.addobjCountList[i].showInvalidDate = '永久有效';
            } else {
              this.addobjCountList[i].IsInvalid = 1;
              this.addobjCountList[i].InvalidDate = this.getTimeStampstatuesOutput(InvalidDate);
              this.addobjCountList[i].showInvalidDate = InvalidDate;

            }
            break;
          } else {
            if ((i + 1) < this.addobjCountList.length) {
              continue;
            }
          }
        };

      }

    },
    getmemberDetail(item) {
      this.$store.dispatch('getMemberItem', item).then(() => {})
    },
    getmemberID(data) {
      this.VipId = data;
    },
    getNewData() {
      this.$store.dispatch("getGoodsList", this.pageData).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData();
    },
    searchfun: _.debounce(function() {
      this.searchfun2(0);
    }, 1000),
    searchfun2(type) {
      if (type == 1 && !this.searchText) {
        return;
      }
      this.pageData.Filter = this.searchText;
      this.getNewData();
    },


    addcommodityc(item) {
      this.setcommonHeight();
      let count = 1;
      if (this.addobjCountList.length > 0) {
        for (let i = 0; i < this.addobjCountList.length; i++) {
          if (this.addobjCountList[i].GoodsId == item.ID) {
            this.addobjCountList[i].Qty = this.addobjCountList[i].Qty + 1;
            break;
          } else {
            if ((i + 1) < this.addobjCountList.length) {
              continue;
            } else {
              this.addobjCountList.push({
                goodsname: item.NAME,
                Qty: count,
                GoodsId: item.ID,
                retailprice: item.PRICE,
                Discount: 1,
                Price: item.PRICE,
                itemObj: item,
                statusactive: 3,
                IsInvalid: 0,
                InvalidDate: '',
                showInvalidDate: '永久有效'
              })
              break;
            }
          }
        };

      } else {
        this.addobjCountList.push({
          goodsname: item.NAME,
          Qty: count,
          GoodsId: item.ID,
          retailprice: item.PRICE,
          Discount: 1,
          Price: item.PRICE,
          itemObj: item,
          statusactive: 3,
          IsInvalid: 0,
          InvalidDate: '',
          showInvalidDate: '永久有效'
        })
      }
      this.jisuantotal();
    },
    jisuantotal() {
      this.total = 0;
      this.TotalPrice = 0;
      for (let i in this.addobjCountList) {
        this.total += this.addobjCountList[i].Qty;
        this.TotalPrice += this.addobjCountList[i].Price * this.addobjCountList[i].Qty;
      }
    },
    addjiajianhao(status, calccount, maxcalccount, GoodsId) {
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
      this.VipId = '';
      this.datalistval = {};
      this.addobjCountList = [];
      this.ruleFormsock.AllselecteSaleEmpId = '';
      this.total = '';
      this.TotalPrice = '';

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
    co_reckoning() {
      if (this.VipId == '') {
        this.$message('请选择会员');
        return;
      }
      this.showRecharge = true;
    },

    CashRecharge(data) {
      this.showRecharge = false;
      let GoodsDetaila = {}
      for (let i = 0; i < this.addobjCountList.length; i++) {
        Vue.delete(this.addobjCountList[i], 'itemObj');
        GoodsDetaila[i] = this.addobjCountList[i]
      }
      let GoodsDetailayuangong = {}
      for (let i = 0; i < this.SaleEmpMoneyArray.length; i++) {
        GoodsDetailayuangong[i] = this.SaleEmpMoneyArray[i]
      }
      let otherdata = {
        GoodsList: JSON.stringify(GoodsDetaila),
        SaleEmpMoney: JSON.stringify(GoodsDetailayuangong),
        VipId: this.VipId,
        Remark: '',
        GoodsPackId: ''
      }
      let AllsendData = Object.assign({}, otherdata, data);
      this.$store.dispatch("getsetmealrtimesrechargeState", AllsendData).then(() => {
        this.timescountrstatus = true;

      });
    },
    setcommonHeight() {
      var elememtheight = this.$refs.elememt.offsetHeight;
      var footerheight = this.$refs.footer.offsetHeight;
      this.$refs.addsockheight.style.height = (elememtheight - footerheight - 96) + 'px';
    },
    selecteSaleEmpId() {
      if (this.addobjCountList.length == 0) {
        this.$message('请选择商品');
        return
      } else {
        this.$store.dispatch("getstoragevaluerroyaltyState", {}).then(() => {});

        this.dialogFormVisible = true;
        // this.ruleFormsock.ExtractMoney=(this.ruleFormsock.consumptionMoney*0.1).toFixed(1);
        this.ruleForm[0].SaleEmpIdfirst = '';
        this.ruleForm[1].SaleEmpIdsecond = '';
        this.ruleForm[2].SaleEmpIdthird = '';
        this.ruleForm[0].share = '';
        this.ruleForm[1].share = '';
        this.ruleForm[2].share = '';
        this.ruleForm[0].Extract = '';
        this.ruleForm[1].Extract = '';
        this.ruleForm[2].Extract = '';

      }

    },
    SaleEmpIdfirst(vId) {
      if (this.ruleForm[1].SaleEmpIdsecond == '' && this.ruleForm[2].SaleEmpIdthird == '') {
        this.ruleForm[0].share = 100;
        this.ruleForm[0].Extract = this.ruleFormsock.ExtractMoney;
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[0].Name = obj.NAME;

    },
    SaleEmpIdsecond(vId) {
      if (this.ruleForm[1].SaleEmpIdsecond != '') {
        this.ruleForm[0].share = 50;
        this.ruleForm[1].share = 50;
        this.ruleForm[0].Extract = this.ruleFormsock.ExtractMoney * 0.5;
        this.ruleForm[1].Extract = this.ruleFormsock.ExtractMoney * 0.5;
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[1].Name = obj.NAME;

    },
    SaleEmpIdthird(vId) {
      if (this.ruleForm[1].SaleEmpIdsecond != '' && this.ruleForm[1].SaleEmpIdsecond != '') {
        this.ruleForm[0].share = 33.33;
        this.ruleForm[1].share = 33.33;
        this.ruleForm[2].share = 33.33;
        this.ruleForm[0].Extract = Math.ceil(this.ruleFormsock.ExtractMoney * 33) / 100;
        this.ruleForm[1].Extract = Math.ceil(this.ruleFormsock.ExtractMoney * 33) / 100;
        this.ruleForm[2].Extract = Math.ceil(this.ruleFormsock.ExtractMoney * 33) / 100;
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[2].Name = obj.NAME;
    },
    getAllSaleEmpId() {
      let showEmpIdsock = [];

      if (this.ruleForm[0].SaleEmpIdfirst != '') {
        this.SaleEmpMoneyArray.push({
          EmpId: this.ruleForm[0].SaleEmpIdfirst,
          Money: this.ruleForm[0].Extract
        })
        let NamePrice = this.ruleForm[0].Name + this.ruleForm[0].Extract + '元';
        showEmpIdsock.push(NamePrice);

      }
      if (this.ruleForm[1].SaleEmpIdsecond != '') {
        this.SaleEmpMoneyArray.push({
          EmpId: this.ruleForm[1].SaleEmpIdsecond,
          Money: this.ruleForm[1].Extract
        })
        let NamePrice = this.ruleForm[1].Name + this.ruleForm[1].Extract + '元';
        showEmpIdsock.push(NamePrice);

      }
      if (this.ruleForm[2].SaleEmpIdthird != '') {
        this.SaleEmpMoneyArray.push({
          EmpId: this.ruleForm[2].SaleEmpIdthird,
          Money: this.ruleForm[2].Extract
        })
        let NamePrice = this.ruleForm[2].Name + this.ruleForm[2].Extract + '元';
        showEmpIdsock.push(NamePrice);
      }
      this.ruleFormsock.AllselecteSaleEmpId = showEmpIdsock.join(',');
      this.dialogFormVisible = false;

    },
    changeDP(item) {
      this.$prompt('请输入' + item.label + '内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.value
      }).then(({ value }) => {
        let inputvalue = this.onlyInputnumber(value);
        this.changeaddobjCountListDate(item.GoodsId, Number(inputvalue), item.dpstatus);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    changeaddobjCountListDate(GoodsId, value, dpstatus) {
      for (let i = 0; i < this.addobjCountList.length; i++) {
        if (this.addobjCountList[i].GoodsId == GoodsId) {
          this.addobjCountList[i].Price = value;
          this.addobjCountList[i].Discount = (this.addobjCountList[i].Price / this.addobjCountList[i].retailprice).toFixed(2);
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

  },
  components: {
    dropdown,
    yjemployee,
    recharge



  },




};

</script>
<style scoped>
.t-botton-timescountc .validityright {
  float: right;
  padding-right: 12px;
}

.t-botton-timescountc .el-tag {
  line-height: 20px;
  height: inherit;
  padding: 0 5px;
  margin-left: 5px;
}

.t-botton-timescountc .el-tag.selected {
  background: #fb789a;
  color: #fff;
}


.classification_List {
  overflow: hidden;
  border-bottom: 2px solid #ccc;
}

.classification_List ul li {
  float: left;
  width: 55px;
  text-align: center;
  cursor: pointer;
  line-height: 38px;
  width: 73px !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.classification_List ul li.selected {
  color: #ec5566;
  border-bottom: 2px solid #ec5566;
}

.commodityc_rightsock {
  margin-top: 12px;
}

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
  /*padding: 0 12px;*/
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
  /*padding: 0 12px;*/
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

.timescountc_left ul#addshopList li .cateringProductMoreinfo .validityleft {
  line-height: 25px;
}

.timescountc_left ul#addshopList li .cateringProductMoreinfo .validityleft span:last-child {
  border-bottom: 1px solid red;
  padding: 0 12px;
  padding-bottom: 2px;
}

.timescountc_left ul#addshopList .cateringProductNamebox {
  width: 16%;
  float: left;
}

.timescountc_left_footer {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-top: 3px solid #eae2d5;
  background: #fff;
  padding: 0 22px;
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
  bottom: 9px;
  right: 8px;
  padding-top: 25px;
}

</style>
