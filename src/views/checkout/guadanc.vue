<template>
  <div class="guadanc-sock" style="height: 100%">
    <div class="g-guadanc-sock" style="height: 100%">
      <el-row :gutter="24" style="height: 100%">
        <el-col
          :span="5"
          style="border-right: 10px solid rgba(234, 226, 213, 1); height: 100%; padding-right: 0"
          class="overflowscroll"
        >
          <div class="section-left overflowscroll">
            <div class="leftconent">
              <ul>
                <li
                  v-for="(item, index) in BillList"
                  :key="index"
                  @click="tabxListclick(index, item)"
                  :class="{ active: curtab == index }"
                >
                  <div class="leftconent_List">
                    <p>
                      <span>{{ item.BILLNO }}</span>
                      <span class="pull-right">{{ item.VIPNAME }}</span>
                    </p>
                    <p>{{ new Date(item.BILLDATE) | timehf }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="shop_box overflowscroll" :loading="loading" style="max-height: 350px">
            <el-table
              border
              v-if="GoodsObj.length > 0"
              :data="GoodsObj"
              header-row-class-name="bg-f1f2f3"
              v-loading="loading"
              style="width: 100%"
            >
              <el-table-column prop="GOODSNAME" label="商品名称"></el-table-column>
              <el-table-column prop="GOODSPRICE" label="零售价"></el-table-column>
              <el-table-column prop="QTY" label="数量"></el-table-column>
              <el-table-column prop="DISCOUNT" label="折扣"></el-table-column>
              <el-table-column prop="PRICE" label="实销价"></el-table-column>
              <el-table-column prop="MONEY" label="小计"></el-table-column>
            </el-table>
          </div>
          <div class="footer" style="margin-top: 15px" v-if="BillList.length > 0">
            <div class="pull-right">
              <el-button type="success" @click="deleteAll" :loading="delloading">删除</el-button>
              <el-button type="danger" @click="Ordercollection">取单</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      delloading: false,
      curtab: 0,
      ListObj: {},
      BillList: [],
      GoodsObj: [],
      BillId: ""
    };
  },
  computed: {
    ...mapGetters({
      guadancxlistState: "guadancxlistState",
      guadancdlistState: "guadancdlistState",
      delState: "delState"
    })
  },
  watch: {
    guadancxlistState(data) {
      if (data.success) {
        this.curtab = 0;
        this.BillList = [...data.data.BillList];
        if (this.BillList.length > 0) {
          this.BillId = this.BillList[0].BILLID;
          this.getguadanList(this.BillList[0].BILLID);
        } else {
          this.GoodsObj = [];
        }
      }
    },
    guadancdlistState(data) {
      this.loading = false;
      if (data.success) {
        this.ListObj = data.data.Obj;
        this.GoodsObj = [...data.data.GoodsObj];
      }
    },
    delState(data) {
      this.delloading = false;
      if (data.success) {
        this.$store.dispatch("getguadancxlistState", {}).then(() => {});
      }
      this.$message({
        type: data.success ? "success" : "error",
        message: data.message
      });
    }
  },
  methods: {
    tabxListclick(index, item) {
      this.loading = true;
      this.curtab = index;
      this.BillId = item.BILLID;
      this.getguadanList(item.BILLID);
    },
    getguadanList(BILLID) {
      this.$store.dispatch("getguadancdlistState", { BillId: BILLID }).then(() => {});
    },
    deleteAll() {
      this.$store.dispatch("delguadancdlistState", { BillId: this.BillId });
    },
    Ordercollection() {
      this.$emit("routertabclick");
    }
  },
  components: {},
  beforeCreate() {}
};
</script>
<style scoped>
.guadanc-sock .section-left .leftconent ul li {
  position: relative;
  padding: 10px 12px;
  color: #fff;
  background: #ccc;
  cursor: pointer;
}

.guadanc-sock .section-left .leftconent ul li.active {
  background: #fb789a;
}

.guadanc-sock .section-left .leftconent ul li p {
  margin: 0;
  line-height: 1.8;
}
</style>
