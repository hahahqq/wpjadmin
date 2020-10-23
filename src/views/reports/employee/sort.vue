<template>
  <div class="report row-flex flex-start">
    <section style="min-width:130px;margin-left:-10px;">
      <sidebarMenu :activePath="activePath" :routesList="routesList" :width="130"></sidebarMenu>
    </section>
    <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" v-loading="loading">
      <filtePage @getNewData="getNewData"></filtePage>
      <!-- page -->
      <el-tabs v-model="activeName" tab-position="left" class="m-top-lg" style="height: 500px;">
        <el-tab-pane name="first" label="好评排行">
          <!-- table-->
          <el-table
            border
            :data="tebleList"
            max-height="500"
            header-row-class-name="bg-f1f2f3"
            class="full-width"
          >
            <el-table-column prop="NAME" label="名称" width="80"></el-table-column>
            <el-table-column prop="PRAISECOUNT" label="好评数"></el-table-column>
            <el-table-column prop="PRAISERATE" label="好评率%"></el-table-column>
            <el-table-column label="更多" width="80">
              <template slot-scope="props">
                <el-button type="text" @click="getNewList(props.row.ID)" class="no-padding">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="second" label="业绩排行">
          <!-- table-->
          <el-table
            border
            :data="tebleList2"
            max-height="500"
            header-row-class-name="bg-f1f2f3"
            class="full-width"
          >
            <el-table-column prop="NAME" label="名称" width="80"></el-table-column>
            <el-table-column prop="SUMMOENY" label="总金额"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="third" label="预约排行">
          <!-- table-->
          <el-table
            border
            :data="tebleList3"
            max-height="500"
            header-row-class-name="bg-f1f2f3"
            class="full-width"
          >
            <el-table-column prop="NAME" label="名称" width="80"></el-table-column>
            <el-table-column prop="SERVICECOUNT" label="预约数"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </section>
    <el-dialog :title="title" :visible.sync="isShowList" width="90%" style="max-width:100%;">
      <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></listPage>
    </el-dialog>
  </div>
  <!-- 员工排行 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
import defrayVue from "../analysis/defray.vue";
export default {
  mixins: [
    MIXINS_REPORT.SIDERBAR_MENU,
    MIXINS_REPORT.COMMOM_PAGE,
    MIXINS_INDEX.IS_SHOW_POPUP
  ],
  data() {
    return {
      pageList: [],
      tebleList: [],
      tebleList2: [],
      tebleList3: [],
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters({
      dataData: "employeeSortData",
      dataState: "employeeSortState",
      dataList: "employeeSortList",
      dataListState: "employeeSortListState",
      dataListArr: "employeeSortListARR",
      dataData2: "employeeAchievement",
      dataData3: "employeeBespeak"
    })
  },
  watch: {
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    },
    activeName(value) {
      this.getNewData(this.ruleFrom);
    },
    dataData2(data) {
      this.loading = false;
      this.tebleList2 = data.success ? [...data.data.List] : [];
    },
    dataData3(data) {
      this.loading = false;
      this.tebleList3 = data.success ? [...data.data.List] : [];
    }
  },
  methods: {
    getNewData(data) {
      let sendData = Object.assign({}, data);
      let mothed = "getemployeeSortData";
      if (this.activeName == "second") {
        mothed = "getEmployeeAchievement";
      }
      if (this.activeName == "third") {
        mothed = "getEmployeeBespeak";
      }
      this.$store.dispatch(mothed, sendData).then(() => {
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
      });
    },
    getNewList(id) {
      // 员工排行-好评详情
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "defray" },
        data: Object.assign({}, this.ruleFrom, { id: id })
      };
      this.ruleFrom2 = Object.assign({}, sendData);
      this.$store.dispatch("clearemployeeSortList", index).then(() => {
        this.$store.dispatch("getemployeeSortList", sendData);
        this.title = this.dataListArr[index].title;
      });
    },
    defaultData() {
      this.tebleList = [...this.dataData];
    },
    formatSex: function(row, column) {
      return row.SEX == 1 ? "女" : "男";
    }
  },
  // beforeCreate() {
  //   this.$store.dispatch("getemployeeSortData", {});
  // },
  created() {
    this.$store.dispatch("getemployeeSortData", {ShopId: this.theShopId}).then(() => {
        this.loading = true;this.ruleFrom.ShopId = this.theShopId
    });
  },
  components: {
    listPage: () => import("@/components/reports/management/tableList")
  }
};
</script>





