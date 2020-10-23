<template>
  <div>
    <el-button-group class="m-bottom-sm">
      <el-button
        type="default"
        @click="pageData.IsEmpMoney='-1';getNewData()"
        :class="{'active':pageData.IsEmpMoney=='-1'}"
      >全部</el-button>
      <el-button
        type="default"
        @click="pageData.IsEmpMoney='1';getNewData()"
        :class="{'active':pageData.IsEmpMoney=='1'}"
      >已设置</el-button>
      <el-button
        type="default"
        @click="pageData.IsEmpMoney='0';getNewData()"
        :class="{'active':pageData.IsEmpMoney=='0'}"
      >未设置</el-button>
    </el-button-group>

    <!--列表-->
    <el-table
      border
      :data="pagelist"
      v-loading="loading"
      max-height="500"
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;"
    >
      <el-table-column prop="ISEMPMONEY" label="状态" width="120" :formatter="formatStatus"></el-table-column>
      <el-table-column prop="NAME" label="商品"></el-table-column>
      <el-table-column label="提成方式">
        <template slot-scope="scope">
          <!-- <div>
            <span v-text="scope.row.EMPMODE1==1?'按消费金额':'按固定金额'"></span>
            <span v-text="scope.row.EMPMODE1==1?scope.row.EMPMONEY1 * 100:scope.row.EMPMONEY1"></span>
            <span v-text="scope.row.EMPMODE1==1?'%':'元'"></span>
          </div>-->
          <div>{{scope.row.EMPMONEYREMARK}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="提成方式二">
        <template slot-scope="scope">
          <div>
            <span v-text="scope.row.EMPMODE2==1?'按消费金额':'按固定金额'"></span>
            <span v-text="scope.row.EMPMODE2==1?scope.row.EMPMONEY2 * 100:scope.row.EMPMONEY2"></span>
            <span v-text="scope.row.EMPMODE2==1?'%':'元'"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提成方式三">
        <template slot-scope="scope">
          <div>
            <span v-text="scope.row.EMPMODE3==1?'按消费金额':'按固定金额'"></span>
            <span v-text="scope.row.EMPMODE3==1?scope.row.EMPMONEY3 * 100:scope.row.EMPMONEY3"></span>
            <span v-text="scope.row.EMPMODE3==1?'%':'元'"></span>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" width="90" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
      <el-pagination background
        @size-change="handlePageChange"
        @current-change="handlePageChange"
        :current-page.sync="pagination.PN"
        :page-size="pagination.PageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.TotalNumber"
        class="text-center"
      ></el-pagination>
      <!-- <div class="text-center clearfix">
        <span class="inline-block">共{{pagination.TotalNumber}}条，每页{{pagination.PageSize}}条</span>
      </div> -->
    </div>
    <!-- edit -->
    <el-dialog title="商品" :visible.sync="isShowEdit" append-to-body width="400px">
      <div>
        <div class="clearfix m-bottom-md">
          <img :src="img" class="pull-left m-right-sm" style="width:48px;">
          <div class="font-16 font-600">{{activeItem.NAME}}</div>
          <div class="m-top-sm">&yen;{{activeItem.PRICE}}</div>
        </div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-position="left"
          label-width="90px"
        >
          <el-form-item :label="pageMode==1?'员工1':'提成方式'">
            <el-input v-model.number="ruleForm.Money1" type="number" min="0">
              <el-select
                slot="prepend"
                v-model="ruleForm.Mode1"
                placeholder="请选择"
                style="width:120px"
              >
                <el-option label="按消费金额" :value="1"></el-option>
                <el-option label="按固定金额" :value="0"></el-option>
              </el-select>
              <span slot="append" class="inline-block" v-text="ruleForm.Mode1==1?'%':'元'"></span>
            </el-input>
          </el-form-item>
          <el-form-item label="员工2" v-if="pageMode==1">
            <el-input v-model.number="ruleForm.Money2" type="number" min="0">
              <el-select
                slot="prepend"
                v-model="ruleForm.Mode2"
                placeholder="请选择"
                style="width:120px"
              >
                <el-option label="按消费金额" :value="1"></el-option>
                <el-option label="按固定金额" :value="0"></el-option>
              </el-select>
              <span slot="append" class="inline-block" v-text="ruleForm.Mode2==1?'%':'元'"></span>
            </el-input>
          </el-form-item>
          <el-form-item label="员工3" v-if="pageMode==1">
            <el-input v-model.number="ruleForm.Money3" type="number" min="0">
              <el-select
                slot="prepend"
                v-model="ruleForm.Mode3"
                placeholder="请选择"
                style="width:120px"
              >
                <el-option label="按消费金额" :value="1"></el-option>
                <el-option label="按固定金额" :value="0"></el-option>
              </el-select>
              <span slot="append" class="inline-block" v-text="ruleForm.Mode3==1?'%':'元'"></span>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading">确 定</el-button>
            <el-button @click="isShowEdit=false;resetForm()">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import img from "@/assets/default.png";
export default {
  props: {
    pageState: {
      type: Boolean,
      default: false
    },
    pageMode: {
      type: [String, Number],
      default: 0 // 0=商品 1=服务
    }
  },
  data() {
    return {
      img: img,
      pagelist: [],
      loading: false,
      pageData: {
        PN: 1,
        IsEmpMoney: "-1", // -1=all  1=是 0=否
        Status: -1,
        Mode: 0
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      ruleForm: {
        GoodsId: "",
        Mode1: 0, // 0=按金额，1=按比例
        Money1: 0, // 提成金额或提成比例(0.08=8%)
        Mode2: 0,
        Money2: 0,
        Mode3: 0,
        Money3: 0
      },
      rules: {},
      isShowEdit: false,
      activeItem: {}
    };
  },
  computed: {
    ...mapGetters({
      dataList: "goodsList",
      dataListState: "goodsListState",
      dataState: "goodsConsumeState"
    })
  },
  watch: {
    pageState(v) {
      if (v) {
        this.pageData.PN = 1;
        this.pageData.Mode = this.pageMode;
        this.getNewData();
      }
    },
    dataListState(data) {
      console.log(data);
      this.loading = false;
      this.pagelist = [...this.dataList];
      if (data.success) {
        this.defaultData();
      }
    },
    dataState(data) {
      this.loading = false;
      this.isShowEdit = false;
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
      if (data.success) {
        this.pageData.PN = 1;
        this.getNewData();
        this.resetForm();
      }
    }
  },
  methods: {
    closeModal(type) {
      if (type == "resetList") {
        this.$emit("resetList");
      } else {
        this.$emit("closeModal");
      }
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
    formatStatus(row) {
      return row.ISEMPMONEY ? "已设置" : "未设置";
    },
    defaultData() {
      this.pagelist = [...this.dataList];
      this.pagination = {
        TotalNumber: this.dataListState.paying.TotalNumber,
        PageNumber: this.dataListState.paying.PageNumber,
        PageSize: this.dataListState.paying.PageSize,
        PN: this.dataListState.paying.PN
      };
      this.pageData.PN = this.dataListState.paying.PN;
    },
    handleEdit(item) {
      console.log(item);
      this.activeItem = Object.assign({}, item);
      this.ruleForm.Mode1 = this.activeItem.EMPMODE1;
      this.ruleForm.Mode2 = this.activeItem.EMPMODE2;
      this.ruleForm.Mode3 = this.activeItem.EMPMODE3;
      this.ruleForm.Money1 =
        this.activeItem.EMPMODE1 == 1
          ? parseFloat(this.activeItem.EMPMONEY1) * 100
          : parseFloat(this.activeItem.EMPMONEY1);
      this.ruleForm.Money2 =
        this.activeItem.EMPMODE2 == 1
          ? parseFloat(this.activeItem.EMPMONEY2) * 100
          : parseFloat(this.activeItem.EMPMONEY2);
      this.ruleForm.Money3 =
        this.activeItem.EMPMODE3 == 1
          ? parseFloat(this.activeItem.EMPMONEY3) * 100
          : parseFloat(this.activeItem.EMPMONEY3);
      this.isShowEdit = true;
    },
    onSubmit() {
      let sendData = Object.assign({}, this.ruleForm, {
        GoodsId: this.activeItem.ID,
        Money1:
          this.ruleForm.Mode1 == 1
            ? parseFloat(this.ruleForm.Money1 / 100)
            : parseFloat(this.ruleForm.Money1),
        Money2:
          this.ruleForm.Mode2 == 1
            ? parseFloat(this.ruleForm.Money2 / 100)
            : parseFloat(this.ruleForm.Money2),
        Money3:
          this.ruleForm.Mode3 == 1
            ? parseFloat(this.ruleForm.Money3 / 100)
            : parseFloat(this.ruleForm.Money3)
      });
      if (this.pageMode != 1) {
        sendData.Mode2 = 0;
        sendData.Money2 = 0;
        sendData.Mode3 = 0;
        sendData.Money3 = 0;
      }
      console.log(sendData);
      this.$store.dispatch("setGoodsConsume", sendData).then(() => {
        this.loading = true;
      });
    },
    resetForm() {
      this.ruleForm = {
        GoodsId: "",
        Mode1: 0, // 0=按金额，1=按比例
        Money1: 0, // 提成金额或提成比例(0.08=8%)
        Mode2: 0,
        Money2: 0,
        Mode3: 0,
        Money3: 0
      };
      this.activeItem = {};
    }
  },
  mounted() {
    // if (this.dataList.length == 0) {
    //   this.getNewData();
    // } else {
    this.defaultData();
    // }
  }
};
</script>
<style <style scoped>
.active {
  color: #fb789a;
  border-color: rgba(251, 120, 154, 0.7);
  background-color: rgba(251, 120, 154, 0.1);
}
</style>

