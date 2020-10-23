<template>
  <el-container>
    <div class="content-new-fex">
      <div class="content-table5">
        <div class="content-table-center">
          <el-tabs v-model="activeName" type="card" @tab-click='handleClick'>
              <el-tab-pane label="生日提醒" name='first'></el-tab-pane>
              <el-tab-pane label="过期提醒" name='second'></el-tab-pane>
          </el-tabs>

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

          <div v-if="activeName == 'first'" style="margin-top:10px">
            <el-table 
            border
            :height="tableHeight"
            :data="birthdayList"
            header-row-class-name="bg-f1f2f3"
            class="full-width"
            >
              <el-table-column label="会员名" prop="NAME"></el-table-column>
              <el-table-column label="手机号" prop="MOBILENO"></el-table-column>
              <el-table-column label="生日时间">
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.BIRTHDATE) | time}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-else style="margin-top:10px">
            <el-table 
            border
            :height="tableHeight"
            :data="validityList"
            header-row-class-name="bg-f1f2f3"
            class="full-width"
            >
              <el-table-column label="会员名" prop="NAME"></el-table-column>
              <el-table-column label="手机号" prop="MOBILENO"></el-table-column>
              <el-table-column label="到期日期" >
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.INVALIDDATE) | time}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-show="pagination.TotalNumber " class="m-top-sm clearfix elpagination">
              <el-pagination
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
      </div>
    </div>
  </el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import { getHomeData,getUserInfo } from '@/api/index'
import MIXINS_CLEAR from "@/mixins/clearAllData";
import dayjs from 'dayjs'
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE,MIXINS_CLEAR.LOGOUT],
  data() {
    return {
      activeName: 'first',
      tableHeight: document.body.clientHeight - 230,
      dateBE: [],
      isShowDate: false,
      birthdayList:[],
      validityList:[],
      ruleFrom: {
        BeginDate: this.getTimeStamp(),
        EndDate: new Date().getTime()
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      PN: 1,
      chooseDateIdx: 0
    };
  },
  computed: {
    ...mapGetters({
      memberbrithday:'memberbrithday',
      memberValidityState: 'memberValidityState'
    })
  },
  watch: {
    memberbrithday(data){
      console.log(data)
      this.birthdayList=data.DataArr
      this.pagination = {
        PN: data.PN,
        PageNumber: data.PageNumber,
        PageSize: data.PageSize,
        TotalNumber: data.TotalNumber
      }
    },
    memberValidityState(data){
      console.log(data)
      this.validityList=data.DataArr
      this.pagination = {
        PN: data.PN,
        PageNumber: data.PageNumber,
        PageSize: data.PageSize,
        TotalNumber: data.TotalNumber
      }
    }
  },
  methods: {
    handlePageChange: function(currentPage) {
      this.PN = parseInt(currentPage)
      this.getNewData()
    },
    handleClick(e){
      this.activeName = e.name
      this.chooseDateIdx = 0
      this.isShowDate = false
      this.dateBE = []
      let sendData = {
        PN:1,
        BeginDate: new Date(new Date().setHours(0, 0, 0, 0)) - 86400 * 0 * 1000,
        EndDate: new Date().getTime()
      }

      if(e.name == 'first'){
        this.$store.dispatch("getMemberBirthday", sendData)
      }else{
        this.$store.dispatch("getMemberValidity", sendData)
      }

    },  
    getNewData() {
      let sendData = {
        PN: this.PN,
        BeginDate: this.ruleFrom.BeginDate,
        EndDate: this.ruleFrom.EndDate
      }
      if(this.activeName == 'first'){
        this.$store.dispatch("getMemberBirthday", sendData)
      }else{
        this.$store.dispatch("getMemberValidity", sendData)
      }
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
  },
  mounted() {
    let sendData = {
      PN:1,
      BeginDate: new Date(new Date().setHours(0, 0, 0, 0)) - 86400 * 0 * 1000,
      EndDate: new Date().getTime()
    }
    this.$store.dispatch("getMemberBirthday", sendData)
    
  },
  components: {

  }
};
</script>
<style scoped>
.el-header{
  padding: 0 !important;
}
.el-main{
  padding: 0px !important;
}
.center-title{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #d7d7d7;
}
.center-cont{
  text-align: center;
  height: 35px;
  line-height: 35px;
  margin-left: 25px;
}
.center-cont-ul{
  display: flex;
}
.center-cont-ul li{
  width: 58px;
  text-align: center;
  margin-right: 25px;
}
.center-cont-ul li.selected {
    color: #2589FF;
    border-bottom: 2px solid #2589FF;
}
.el-header{
  padding: 0 !important;
}
.shop{
  line-height: 50px;
  height: 50px;
  text-align: right;
  padding-right: 20px;
  border-bottom: 1px solid #d7d7d7;
  background: #fff;
}
</style>