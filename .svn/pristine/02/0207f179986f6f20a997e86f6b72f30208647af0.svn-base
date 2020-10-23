<template>
  <div class="goodsAdd" v-loading="loading">
    <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="套餐名称" prop="Name" class="half">
        <el-input v-model="ruleForm.Name" autocomplete="on" clearable placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="套餐价格" prop="Price" class="half">
        <el-input v-model="ruleForm.Price" autocomplete="off" clearable placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="有效天数" class="half">
        <el-input v-model="ruleForm.ValidDay" placeholder="请输入有效天数" @keyup.native="number" style="width:75%;float:left"></el-input>
        <el-button type="primary" @click="ruleForm.ValidDay='无限期限'" style="width:25%;float:left">不限</el-button>
      </el-form-item>
      <el-form-item label="备注信息" class="half">
        <el-input v-model="ruleForm.Remark" placeholder="备注信息"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" class="clearfix">
        <el-switch v-model="ruleForm.Status" inactive-color="#13ce66" active-color="#ff4949" inactive-text="开启" active-text="关闭">
        </el-switch>
      </el-form-item>
      <el-form-item label="套餐商品">
        <el-button type="primary" @click="showAddserversgoods=true;">添加商品</el-button>
        <span class="pull-right">共{{total}}项服务组成套餐，合计￥{{TotalPrice}}</span>
      </el-form-item>
      <el-form-item>
        <el-table border v-if="ruleForm.GoodsList.length>0" :data="ruleForm.GoodsList" header-row-class-name="bg-f1f2f3" style="width: 100%;">
          <el-table-column prop="GoodsName" label="服务项目">
          </el-table-column>
          <el-table-column prop="Price" label="售价">
          </el-table-column>
          <el-table-column :formatter="row => row.Qty" label="次数">
            <template slot-scope="scope">
              <div class="sumchange">
                <i class="el-icon-remove jiajianbtn" @click="addjiajianhao(1,scope.row.GoodsId)"></i>
                <span class="getqty">{{scope.row.Qty}}</span>
                <i class="el-icon-circle-plus jiajianbtn" @click="addjiajianhao(2,scope.row.GoodsId)"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170" fixed="right">
            <template slot-scope="scope">
              <el-button size="small" @click="addjiajianhao(1,scope.row.GoodsId,'alldel')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" :loading="loading">保 存</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </el-form-item>
    </el-form>
    <!-- add -->
    <el-dialog title="服务商品" width="770px" :visible.sync="showAddserversgoods" append-to-body>
      <add-servers-goods @closeModal="showAddserversgoods=false" @resetList="showAddserversgoods=false;" @handlerClickadd="handlerclickadd"></add-servers-goods>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    dataType: {
      type: String,
      default: function() {
        return 'add'
      }
    }
  },
  data() {
    let checkNumber = (rule, value, callback) => {
      let myreg = /^[1-9]\d*\,\d*|[1-9]\d*$/;
      if (!myreg.test(value)) {
        callback(new Error("请输入正确的数值"));
      } else {
        callback();
      }

    };
    return {
      taocanID: '',
      showAddserversgoods: false,
      total: 0,
      TotalPrice: 0,
      ruleForm: {
        Code: "",
        Name: "",
        ValidDay: "",
        Price: '',
        Status: false,
        GoodsList: []
      },
      rules: {
        Name: [{
          required: true,
          message: "请输入名称",
          trigger: "blur"
        }],
        Price: [{
          required: true,
          validator: checkNumber,
          trigger: "blur"
        }],
        ValidDay: [{
          type: "number",
          trigger: "blur"
        }]
      },
      loading: false
    };
  },

  computed: {
    ...mapGetters({
      goodsstemaealgsaveState: 'goodsstemaealgsaveState',
      goodsstemaealgdetailsState: "goodsstemaealgdetailsState",
    })
  },
  watch: {
    goodsstemaealgsaveState(data) {
      if (data.success) {
        this.$emit("resetList");
      } else {
        this.$message(data.message);
        loading: false
      }
    },
    goodsstemaealgdetailsState(data) {
      if (data.success) {
        let obj = data.data.obj;
        let GoodsList = data.data.GoodsList;
        this.taocanID = obj.ID;
        this.ruleForm.Name = obj.NAME;
        this.ruleForm.Code = obj.CODE;
        this.ruleForm.ValidDay = obj.VALIDDAY;
        this.ruleForm.Price = obj.PRICE;
        this.ruleForm.Status = obj.ISSTOP;
        this.ruleForm.Remark = obj.REMARK;
        for (let i = 0; i < GoodsList.length; i++) {
          this.ruleForm.GoodsList.push({
            Id: GoodsList[i].ID,
            GoodsId: GoodsList[i].GOODSID,
            GoodsName: GoodsList[i].GOODSNAME,
            Price: GoodsList[i].PRICE,
            Qty: GoodsList[i].QTY,
            CycelDay: GoodsList[i].CYCELDAY,
            Remark: GoodsList[i].REMARK
          })
        };
        this.jisuantotal();

      } else {
        this.$message(data.message);
        loading: false
      }

    }

  },
  methods: {
    number() {
      this.ruleForm.ValidDay = this.ruleForm.ValidDay.replace(/[^\.\d]/g, '');
      this.ruleForm.ValidDay = this.ruleForm.ValidDay.replace('.', '');
    },
    handlerclickadd(data) {
      this.ruleForm.GoodsList = [];
      for (let i = 0; i < data.length; i++) {
        this.ruleForm.GoodsList.push({
          Id: '',
          GoodsId: data[i].ID,
          GoodsName: data[i].NAME,
          Price: data[i].PRICE,
          Qty: 1,
          CycelDay: 0,
          Remark: ''
        })
      };
      this.jisuantotal();

    },
    addjiajianhao(status, GoodsId, alldel) {
      let GoodsList = this.ruleForm.GoodsList;
      for (let i = 0; i < GoodsList.length; i++) {
        if (GoodsList[i].GoodsId == GoodsId) {
          if (status == 1) {
            GoodsList[i].Qty = GoodsList[i].Qty - 1;
            if (GoodsList[i].Qty == 0 || alldel == 'alldel') {
              GoodsList.splice(i, 1);
            }
          } else {
            GoodsList[i].Qty = GoodsList[i].Qty + 1;
          }
          this.jisuantotal();
          break;
        } else {
          if ((i + 1) < GoodsList.length) {
            continue;
          } else {
            break;
          }
        }
      };
    },
    jisuantotal() {
      let GoodsList = this.ruleForm.GoodsList;
      this.total = GoodsList.length;
      this.TotalPrice = 0;
      for (let i in GoodsList) {
        this.TotalPrice += GoodsList[i].Price * GoodsList[i].Qty;
      }
      // return this.total;
    },
    closeModal(type) {
      Object.assign(this.$data, this.$options.data());
      if (type == "resetList") {
        this.$emit("resetList");
      } else {
        this.$emit("closeModal");
      }
    },
    submitForm() {
      let _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.sendDataFun();
        } else {
          return false;
        }
      });
    },
    sendDataFun() {
      let GoodsDetaila = {}
      for (let i = 0; i < this.ruleForm.GoodsList.length; i++) {
        GoodsDetaila[i] = this.ruleForm.GoodsList[i]
      }
      let sendData = {
        Id: this.dataType == 'edit' ? this.taocanID : '',
        Code: '',
        Name: this.ruleForm.Name,
        Price: this.ruleForm.Price,
        ValidDay: this.ruleForm.ValidDay == '无限期限' ? 0 : this.ruleForm.ValidDay,
        Remark: this.ruleForm.Remark,
        GoodsList: JSON.stringify(GoodsDetaila),
        IsValidDay: this.ruleForm.ValidDay == '无限期限' ? 0 : 1,
        IsStop: this.ruleForm.Status == false ? 0 : 1


      }
      this.$store
        .dispatch("getGoodssetmealgsave", sendData)
        .then(() => {});
    }
  },
  mounted() {

  },
  components: {
    addServersGoods: () => import("@/components/goods/addserversgoods"),
    // itemPage: () => import("./item")

  },
  beforeCreate() {
    // let list1 = this.$store.state.unit.unitList;
    // if (list1.length == 0) {
    // this.$store.dispatch("getUnitList", {}).then(() => {});
    // }


  }
};

</script>
<style>
.goodsAdd .half {
  width: 50%;
  margin-right: 0px;
  float: left;
}

.goodsAdd .half .el-date-editor.el-input {
  width: 100% !important;
}

.goodsAdd .el-form-item__content {
  line-height: 40px;
}

</style>
