<template>
   <el-container>
      <el-header style="height:50px;">
         <headerPage></headerPage>
      </el-header>

      <el-container>
         <el-aside width="100px">
            <section style="min-width:100px;">
               <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
            </section>
         </el-aside>

         <el-container>
            <div class="content-new-fex">
               <div class="content-eighty">
                  <div class="content-center">
                     <el-button type="primary" size="small" @click="handleDeal({})">添加会员折扣</el-button>
                  </div>
               </div>

               <div class="content-table4">
                  <div class="content-table-center">
                     <!--列表-->
                     <el-table :data="pagelist" size='small'
                        v-loading="loading" element-loading-text='数据加载中...'
                        max-height="500"
                     >
                        <el-table-column prop="NAME" label="折扣类型"></el-table-column>
                        <el-table-column prop="DISCOUNT" label="折扣比例" :formatter="formatfun">
                        </el-table-column>
                        <!-- <el-table-column prop="SERVICEDISCOUNT" label="服务折扣比例" :formatter="formatfun2">
                        </el-table-column> -->
                        <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作">
                           <template slot-scope="scope">
                              <el-button type='text' size="small" @click="handleDeal(scope.row)">编辑</el-button>
                              <el-button type='text' size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                           </template>
                        </el-table-column>
                     </el-table>
                  </div>
               </div>

               <el-dialog title="会员等级" :visible.sync="dialogVisible" width="400px">
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                     <el-form-item label="等级名称" prop="Name">
                        <el-input v-model="form.Name" placeholder="请输入等级名称"></el-input>
                     </el-form-item>
                     <el-form-item label="折扣" prop="Discount">
                        <el-input placeholder="值范围1~100内" v-model.number="form.Discount" type="number" min="1" max="10">
                        <template slot="append">%</template>
                        </el-input>
                     </el-form-item>
                     <!-- <el-form-item label="服务折扣" prop="ServiceDiscount">
                        <el-input placeholder="值范围1~100内" v-model.number="form.ServiceDiscount" type="number" min="1" max="10">
                        <template slot="append">%</template>
                        </el-input>
                     </el-form-item> -->
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
         </el-container>

      </el-container>
  </el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_MEMBER from "@/mixins/member";

export default {
  mixins: [MIXINS_MEMBER.MEMBER_MENU],
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
      //   ServiceDiscount: [
      //     {
      //       required: true,
      //       validator: checkNumber,
      //       trigger: "blur"
      //     }
      //   ]
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
          ServiceDiscount: parseFloat(item.DISCOUNT) * 100,
         //  ServiceDiscount: parseFloat(item.SERVICEDISCOUNT) * 100,
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
          _this.form.ServiceDiscount = _this.form.Discount
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
  },
  components:{
    headerPage: () => import("@/components/header")
  }
};
</script>

<style scoped>
.el-main{
  height: 660px!important;
}
.member-header{
  display: flex;
  align-items: center;
  height: 50px;
}
.center-title{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #d7d7d7;
}
.center-cont{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.el-header{
  padding: 0 !important;
}

.shop{
  height: 50px;
}

.el-header, .el-footer {
  background-color: #fff;
  color: #333;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  border-right:  solid 1px #F366D7!important;
}
</style>
