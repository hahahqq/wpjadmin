<template>
  <div>
    <!-- 意见反馈 -->
    <div class="m-bottom-md">
      <el-date-picker
        v-model="dateBE"
        type="daterange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <div class="inline-block m-left-md m-right-xs">状态</div>
      <el-select v-model="pageData.Status" placeholder="请选择" style="width:150px;">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="未受理" value="0"></el-option>
        <el-option label="已受理" value="1"></el-option>
      </el-select>
      <el-button type="primary" class="m-left-md" @click="getNewData" :loading="loading">查 询</el-button>
    </div>
    <!--列表-->
    <el-table
      border
      :data="pagelist"
      v-loading="loading"
      max-height="500"
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;"
    >
      <el-table-column prop="VIPNAME" label="会员" width="130"></el-table-column>
      <el-table-column prop="MOBILENO" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="SEXNAME" label="性别" width="80"></el-table-column>
      <el-table-column prop="COMPANYNAME" label="公司"></el-table-column>
      <el-table-column prop="SHOPNAME" label="店铺" width="130"></el-table-column>
      <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button size="small" type="primary" @click="handleReply(scope.$index, scope.row)">回复</el-button>
            <el-button
              size="small"
              type="primary"
              @click="ruleForm.VipId = scope.row.VIPID;showAddItem = true"
            >新增</el-button>
          </el-button-group>
          <div class="hide">{{scope.row}}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
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
      <!-- <div class="text-center clearfix">
        <span class="inline-block">共{{pagination.TotalNumber}}条，每页{{pagination.PageSize}}条</span>
      </div> -->
    </div>
    <!-- item -->
    <el-dialog title="会员回访详情" :visible.sync="showItem" width="770px" style="max-width:100%;">
      <item-page @closeModal="showItem=false" :pageState="showItem"></item-page>
    </el-dialog>
    <el-dialog title="新增意见反馈" :visible.sync="showAddItem" width="400px" style="max-width:100%;">
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="店铺" prop="ShopId">
            <el-select v-model="ruleForm.ShopId" placeholder="请选择店铺" class="full-width">
              <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" prop="Remark">
            <el-input type="textarea" v-model="ruleForm.Remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd" :loading="addItemIng">保 存</el-button>
            <el-button @click="showAddItem=false;ruleForm.Remark=''">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 意见受理 -->
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
let _ = require("lodash");
export default {
  data() {
    return {
      pagelist: [],
      loading: true,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: {
        VipId: "",
        BeginDate: "",
        EndDate: "",
        PN: 1,
        Status: "-1" // -1=all 0=未受理,1=已受理
      },
      dateBE: [],
      multipleSelection: [],
      showItem: false,
      showItemIng: false,
      replyItemIng: false,
      addItemIng: false,
      showAddItem: false,
      ruleForm: {
        ShopId: "",
        VipId: "",
        Remark: ""
      },
      rules:{
         ShopId: [
            { required: true, message: '请选择店铺', trigger: 'change' }
          ],
          Remark: [
            { required: true, message: '请填写内容', trigger: 'blur' }
          ],
      },
    };
  },
  computed: {
    ...mapGetters({
      dataList: "sOpinionList",
      dataListState: "sOpinionListState",
      dataState: "sOpinionState",
      dataItem: "sOpinionItem",
      shopList: "shopList"
    })
  },
  watch: {
    dataListState(data) {
      if (this.loading) {
        this.loading = false;
        this.pagelist = [...this.dataList];
        if (data.success) {
          this.pagination = {
            TotalNumber: data.paying.TotalNumber,
            PageNumber: data.paying.PageNumber,
            PageSize: data.paying.PageSize,
            PN: data.paying.PN
          };
        }
      }
    },
    dataState(data) {
      if (data.success && this.showItemIng) {
        this.showItem = true;
        this.showItemIng = false;
      }
      if (this.replyItemIng) {
        this.replyItemIng = false;
        this.$message({
          message: data.message,
          type: data.success ? "success" : "error"
        });
      }
      if(this.addItemIng){
         this.addItemIng = false;
        this.$message({
          message: data.message,
          type: data.success ? "success" : "error"
        });
        if(data.success){
          this.pageData.PN =1;
      this.getNewData();
        }
      }
    }
  },
  methods: {
    formatDate: function(row, column) {
      return row.BILLDATE ? this.filterTime(new Date(row.BILLDATE)) : "";
    },
    formatSex: function(row, column) {
      //性别显示转换
      return row.SEX == 0 ? "男" : "女";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData();
    },
    getNewData() {
      if (this.dateBE.length > 0) {
        this.pageData.BeginDate = this.dateBE[0];
        this.pageData.EndDate = this.dateBE[1];
      } else {
        this.pageData.BeginDate = "1";
        this.pageData.EndDate = "9999999999999";
      }
      this.$store.dispatch("getSOpinionList", this.pageData).then(() => {
        this.loading = true;
      });
    },
    handleAdd() {
      this.$store.dispatch('addSOpinionItem',this.ruleForm).then(()=>{
        this.addItemIng = true
      })
    },
    handleEdit(idx, item) {
      if (this.dataItem && this.dataItem.id == item.VIPID) {
        this.showItemIng = false;
        this.showItem = true;
        return;
      }
      this.$store.dispatch("getSOpinionItem", item).then(() => {
        this.showItemIng = true;
      });
    },
    handleReply(idx, item) {
      this.$prompt("", "回复内容", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
        inputPattern: /\S/,
        inputErrorMessage: "内容不能为空"
      })
        .then(({ value }) => {
          this.$store
            .dispatch("replySOpinionItem", {
              BILLID: item.BILLID,
              Remark: value
            })
            .then(() => {
              this.replyItemIng = true;
            });
        })
        .catch(() => {});
    }
  },
  components: {
    itemPage: () => import("@/components/service/opinionItem")
  },
  beforeCreate() {
    let list = this.$store.state.sOpinion.sOpinionList;
    if (list.length == 0) {
      this.$store.dispatch("getSOpinionList", { Status: "-1" });
    }
  },
  mounted() {
    if (this.dataList.length > 0) {
      this.pagelist = [...this.dataList];
      this.loading = false;
    }
    this.$store.dispatch("getShopList", {});
  }
};
</script>
