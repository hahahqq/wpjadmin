<template>
  <div>
    <el-row>
      <el-col :span="16">
          <el-row>
              <el-col :span="10">
                  <el-button-group>
                      <el-button
                          plain
                          v-for="(label,i) in ['今天','昨天','本月','上月','其它']"
                          :key="i"
                          @click="chooseDate(i)"
                          type="primary"
                          size="small"
                          :class="{'isActive':chooseDateIdx==i}"
                      >{{label}}</el-button>
                  </el-button-group>
              </el-col>
              <el-col :span="12">
                  <div v-if="isShowDate">
                      <el-date-picker
                          ref="dateBE"
                          size="small"
                          v-model="dateBE"
                          @change="chooseDate2"
                          type="daterange"
                          value-format="timestamp"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          style="width:400px;"
                          class="inline-block"
                      ></el-date-picker>
                  </div>
              </el-col>
          </el-row>
      </el-col>

      <el-col :span="8" class="text-right">
        <el-button
            type="primary"
            size="small"
            class="m-left-sm"
            plain
            v-if="isExport"
            @click="exportState()"
        >
            <i class="el-icon-upload el-icon--right"></i> 导出表格
        </el-button>

        <el-dropdown @command="shopCheckfun" class="m-left-sm">
          <el-button type="primary" size="small" plain>
            <span v-text="shopCheckText?shopCheckText:'请选择店铺'"></span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="isAll" :command="-1">全部店铺</el-dropdown-item>
            <el-dropdown-item v-for="(item,i) in shopList" :key="i" :command="i">{{item.NAME}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import dayjs from 'dayjs'
export default {
  props: {
    isAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shopCheckText: "",
      shopCheckidx: "",
      ruleFrom: {
        ShopId: "",
        BeginDate: this.getTimeStamp(),
        EndDate: new Date().getTime()
      },
      isShowDate: false,
      dateBE: [],
      chooseDateIdx: 0,
      isExport: false
    };
  },
  computed: {
    ...mapGetters({
      shopList: "shopList"
    })
  },
  methods: {
    getNewData() {
      console.log(this.ruleFrom)
      this.$emit("getNewData", this.ruleFrom);
    },
    shopCheckfun(index) {
      if (index == -1) {
        this.shopCheckidx = -1;
        this.shopCheckText = "全部店铺";
        let str = "";
        for (let i = 0; i < this.shopList.length; i++) {
          str += this.shopList[i].ID;
          if (i < this.shopList.length - 1) {
            str += ",";
          }
        }
        this.ruleFrom.ShopId = str;
        this.$store.dispatch("selectingShop", {});
      } else {
        this.shopCheckidx = index;
        this.shopCheckText = this.shopList[index].NAME;
        this.ruleFrom.ShopId = this.shopList[index].ID;
        this.$store.dispatch("selectingShop", {
          ID: this.shopList[index].ID,
          NAME: this.shopList[index].NAME
        });
      }
      this.getNewData();
    },
    chooseDate(i) {
      this.chooseDateIdx = i;
      if (i < 4) {
        this.isShowDate = false;
      }
      switch (i) {
        case 0:
          this.ruleFrom.BeginDate = this.getTimeStamp();
          this.ruleFrom.EndDate = new Date().getTime();
          this.getNewData();
          break;
        case 1:
          this.ruleFrom.BeginDate = this.getTimeStamp(1);
          this.ruleFrom.EndDate = this.ruleFrom.BeginDate+ 86400000 - 1;
          this.getNewData();
          break;
        case 2:
          let arr2 = this.getAroundMonth();
          this.ruleFrom.BeginDate = new Date(arr2[0]).getTime();
          this.ruleFrom.EndDate = this.getTimeStampstatuesOutput(arr2[1])+ 86400000 - 1;
          this.getNewData();
          break;
        case 3:
          // let arr3 = this.getAroundMonth(this.getCustomDay(-28));
          // this.ruleFrom.BeginDate = new Date(arr3[0]).getTime();
          // this.ruleFrom.EndDate = this.getTimeStampstatuesOutput(arr3[1])+ 86400000 - 1;
          var nowdays = new Date();  
          var year = nowdays.getFullYear();  
          var month = nowdays.getMonth();  
          if(month==0) {
              month=12;
              year=year-1;
          }  
          if (month < 10) {  
              month = "0" + month;
          }
          var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
          var myDate = new Date(year, month, 0);  //上个月最后一天
          var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
          this.ruleFrom.BeginDate = dayjs(firstDay).valueOf()
          this.ruleFrom.EndDate = dayjs(lastDay).valueOf()

          this.getNewData();
          break;
        case 4:
          this.isShowDate = !this.isShowDate;
          break;
      }
    },
    chooseDate2(v) {
      this.ruleFrom.BeginDate = v[0];
      this.ruleFrom.EndDate = v[1];
      this.getNewData();
    },
    defaultData() {
      let rname = this.$route.meta.name
      console.log(rname)

      // aname = [
          // "sale",
          // "goods",
          // "member",
          // "defray",
          // "adjustment",
          // "order",
          // 'achievement',
          // 'surplus',
          // 'checkout',
          // 'crossStore',
          // 'saleInquiry',
          // 'sort',
      // ];
      // console.log(rname)
      // this.isExport = aname.indexOf(rname) > -1 ? true : false;
      // console.log(rname,this.isExport)

      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList", {});
      }
      // this.ruleFrom = {
      //   ShopId: getHomeData().shop.ID,
      //   BeginDate: this.getTimeStamp(),
      //   EndDate: new Date().getTime()
      // };
      // console.log(this.ruleFrom)
      // this.shopCheckText = getHomeData().shop.NAME;
      // this.getNewData()
    }
  },
  mounted() {
    this.defaultData();
    if (this.shopList.length == 0) {
      this.$store.dispatch("getShopList", {});
    }

    // var timeStamp = new Date(new Date().setHours(0, 0, 0, 0));
    // var theDayAgo = timeStamp - 86400 * 0 * 1000;

    this.ruleFrom = {
      ShopId: getHomeData().shop.ID,
      BeginDate: new Date(new Date().setHours(0, 0, 0, 0)) - 86400 * 0 * 1000,
      EndDate: new Date().getTime()
    };
    this.getNewData()
    
  }
};
</script>