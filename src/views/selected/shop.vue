<template>
  <div >
    <div class="content-eighty">
        <div class="content-center">
          <div class="shop-bottom">
            <el-button size="small" type="primary" @click="handleDeal({})" icon="el-icon-plus">新增</el-button>
          </div>
        </div>
    </div>

    <div class="content-table4">
      <div class="content-table-center">
        <!--列表-->
        <el-table
          border size='small'
          :data="pagelist"
          v-loading="loading"
          height="500"
          header-row-class-name="bg-f1f2f3"
        >
          <el-table-column prop="SHOPNAME" label="店铺名称"></el-table-column>
          <el-table-column prop="MANAGER" label="联系人"></el-table-column>
          <el-table-column prop="PHONENO" label="联系电话"></el-table-column>
          <el-table-column prop="ADDRESS" label="地址"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="small" type="text" @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
                <el-button
                  size="small"
                  type="text"
                  v-if="!scope.row.ISINIT"
                  @click="handleDel(scope.$index, scope.row)"
                  icon="el-icon-delete"
                >删除</el-button>
              </el-button-group>
              <div class="hide">{{scope.row}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- deal -->
    <el-dialog :title="dealType=='add'?'新增店铺':'编辑店铺'" :visible.sync="dialogVisible" width="600px">
      <editShopPage
        @closeModal="dialogVisible=false"
        @resetList="dialogVisible=false;getNewData()"
        :propsData="{state:dialogVisible}"
      ></editShopPage>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      pagelist: [],
      loading: false,
      dialogVisible: false,
      dealType: "add"
    };
  },
  computed: {
    ...mapGetters({
      dataList: "shopList",
      dataListState: "shopListState",
      dataState: "shopState",
      dealState: "dealShopState"
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
        this.getNewData();
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getShopList").then(() => {
        this.loading = true;
      });
    },
    handleDeal(item) {
      this.$store.dispatch("selectingShop", item).then(() => {
        this.dialogVisible = true;
        this.dealType = Object.keys(item).length > 0 ? "edit" : "add";
      });
    },
    handleDel(index, item) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delShopItem", { index: index, data: item }).then(() => {
          this.loading = false;
          this.dealType = "del";
        });
      })
    }
  },
  components: {
    editShopPage: () => import("@/components/setup/editShop")
  },
  mounted() {
    this.getNewData();
    // if (this.dataList.length == 0) {
    //   this.getNewData();
    // } else {
    //   this.pagelist = [...this.dataList];
    // }
  }
};
</script>

<style scoped>
.shop-list{
  width: 100%;
  position: relative;
}
.shop-bottom{
  display: flex;
  align-items: center;
  height: 80px;
  background: #fff;
}
.seach-input{
  position: absolute;
  right: 30px;
}
.shop-table{
  margin-top: 20px;
  background: #fff;
}
</style>


