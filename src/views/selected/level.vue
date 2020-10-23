<template>
  <div class="level">
    <div class="m-bottom-sm">
      <el-button size="small" @click="handleDeal({})" type='default' icon="el-icon-plus">新增等级</el-button>
      <div class="hide">{{dataList}}</div>
    </div>
    <!--列表-->
    <el-table border :data="pagelist" size='small'
    v-loading="loading" element-loading-text='数据加载中...' header-row-class-name="bg-f1f2f3"
    max-height="500"
    >
      <el-table-column prop="NAME" label="等级名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="DISCOUNT" label="产品折扣比例" :formatter="formatfun">
      </el-table-column>
      <el-table-column prop="SERVICEDISCOUNT" label="服务折扣比例" :formatter="formatfun2">
      </el-table-column>
      <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="small" @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
            <el-button size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </el-button-group>
          <div class="hide">{{scope.row}}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="会员等级" :visible.sync="dialogVisible" width="400px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="等级名称" prop="Name">
          <el-input v-model="form.Name" placeholder="请输入等级名称"></el-input>
        </el-form-item>
        <el-form-item label="产品折扣" prop="Discount">
          <el-input placeholder="值范围1~100内" v-model.number="form.Discount" type="number" min="1" max="10">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="服务折扣" prop="ServiceDiscount">
          <el-input placeholder="值范围1~100内" v-model.number="form.ServiceDiscount" type="number" min="1" max="10">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.Remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dealData" :loading='loading'>保存</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (value > 100 || value < 1) {
          callback(new Error("请输入1~100内数值"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      pagelist: [],
      loading: false,
      dialogVisible: false,
      form: {
        Name: "",
        Discount: "",
        ServiceDiscount: "",
        Remark: ""
      },
      rules: {
        Name: [
          {
            required: true,
            message: "请输入等级名称",
            trigger: "blur"
          }
        ],
        Discount: [
          {
            required: true,
            validator: checkNumber,
            trigger: "blur"
          }
        ],
        ServiceDiscount: [
          {
            required: true,
            validator: checkNumber,
            trigger: "blur"
          }
        ]
      },
      dealType: "add"
    };
  },
  computed: {
    ...mapGetters({
      dataList: "levelList",
      dataListState: "levelListState",
      dataState: "levelState",
      dealState: "dealLevelState"
    })
  },
  watch: {
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.pagelist = [...this.dataList];
      }
    },
    dealState(data) {
      if (data.success) {
        this.pagelist = [...this.dataList];
        this.$store.dispatch('clearMember',2)
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
      this.dialogVisible = false;
      this.getNewData();
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getLevelList").then(() => {
        this.loading = true;
      });
    },
    formatfun: function(row, column) {
      return row.DISCOUNT * 100 +'%' ;
    },
    formatfun2: function(row, column) {
      return row.SERVICEDISCOUNT * 100 +'%' ;
    },
    handleDeal(item) {
      if (this.$refs.form) this.$refs.form.resetFields();
      if (Object.keys(item).length > 0) {
        this.form = Object.assign({}, item, {
          Id: item.ID,
          Name: item.NAME,
          Discount: parseFloat(item.DISCOUNT) * 100,
          ServiceDiscount: parseFloat(item.SERVICEDISCOUNT) * 100,
          Remark: item.REMARK
        });
        this.dealType = "edit";
      } else {
        this.form = {
          Name: "",
          Discount: "",
          ServiceDiscount: "",
          Remark: ""
        };
        this.dealType = true;
      }
      this.dialogVisible = true;
    },
    dealData() {
      var _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.$store.dispatch("dealLevelItem", _this.form).then(() => {
            _this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDel(index, item) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delLevelItem", { index: index, data: item }).then(() => {
          this.loading = true;
          this.dealType = "del";
        })
      }).catch(()=>{})
    }
  },
  mounted() {
    if (this.dataList.length == 0) {
      this.getNewData();
    } else {
      this.pagelist = [...this.dataList];
    }
  }
};
</script>
