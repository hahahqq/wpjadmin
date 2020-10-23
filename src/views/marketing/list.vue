<template>
<el-container>
  <el-header style="height:50px; padding: 0">
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
            <el-row>
              <el-col :span="12">
                <el-button size="small" @click="handleNew">新增</el-button>
              </el-col>
              <el-col :span="12" style="text-align:right">
              <span class="overall-font">状态&nbsp;&nbsp;</span>
              <el-select v-model="value" placeholder="请选择" size="small" @change="handleCommand">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-col>
            </el-row>

          </div>
        </div>

        <div class="content-table4">
          <div class="content-table-center">

            <!-- 列表 -->
            <component :is="componentName" :dataList="dataList" @handleStop="handleStop_fun" @handleEdit="handleEdit_fun"></component>
            <!-- 分页 -->
            <div class="m-top-sm clearfix elpagination">
              <el-pagination 
                background
                @size-change="handlePageChange" 
                @current-change="handlePageChange"
                :current-page.sync="pagination.PN"
                :page-size="pagination.PageSize"
                layout="total,prev,pager,next,jumper"
                :total="pagination.TotalNumber" 
                class="text-right">
              </el-pagination>
            </div>
          </div>
        </div>
        
        <el-dialog :title="dealType=='add'?'新增'+title:'编辑'+title" :visible.sync="showItem" width="70%" style="max-width:100%">
          <component :is="componentName2" @closeModal="showItem=false" @resetList="showItem=false" :dealType="{type:dealType,state:showItem}"></component>
        </el-dialog>
      </div>
    </el-container>
  </el-container>
</el-container>

</template>
<script>
  import {
    mapState,
    mapGetters 
  } from "vuex";
  import MIXINS_MARKETING from "@/mixins/marketing.js";
  export default {
    mixins: [MIXINS_MARKETING.MARKETING_MENU],
    data() {
      return {
        componentName: "",
        componentName2: "",
        obj: "",
        title: "",
        dealType:'add',
        loading: false,
        loadingShop: false,
        loadingItem: false,
        showItem: false,
        pagination: {
          TotalNumber: 0,
          PageNumber: 0,
          PageSize: 20,
          PN: 0
        },
        pageData: {
          PN: 1,
          IsValid: "-1", // -1=全部，0=有效，1=失效。APP后台传入-1，微信公从号传入0,
        },
        options: [{
          value: '-1',
          label: '全部'
        }, {
          value: '0',
          label: '有效'
        }, {
          value: '1',
          label: '失效'
        }],
        value: ''
      };
    },
    computed: {
      ...mapGetters({
        dataArr: "marketingListARR",
        dataListState: "marketingListState",
        dataList: "marketingList",
        dataState: "marketingState",
        dataItem: "marketingItem"
      })
    },
    watch: {
      dataListState(data) { 
        this.loading = false;
        if (data.success) {
          this.pagination = {
            TotalNumber: data.paying.TotalNumber,
            PageNumber: data.paying.PageNumber,
            PageSize: data.paying.PageSize,
            PN: data.paying.PN
          };
        }
      },
      dataState(data) {
        if (data.success && this.loadingShop) {
          this.loadingShop = false;
          this.getNewData(1);
        }
        if (data.success && this.loadingItem) {
          this.loadingItem = false;
          this.showItem = true;
          console.log(this.dataItem);
        }
      }
    },
    methods: {
      handlePageChange: function (currentPage) {
        if (this.pageData.PN == currentPage || this.loading) {
          return;
        }
        this.pageData.PN = parseInt(currentPage);
        this.loading = true;
        this.getNewData(0);
      },
      handleCommand(command) {
        this.pageData.IsValid = command;
        this.getNewData(1);
      },
      getNewData(type) {
        let data = {
          'IsValid': this.pageData.IsValid,
          'PN': type == 1 ? 1 : this.pageData.PN
        };
        this.$store.dispatch("getMarketingList", {
          obj: this.obj,
          data: data
        });
      },
      handleNew() {
        this.$store.dispatch("clearMarketingData", 2).then(() => {
          this.dealType = 'add'
          this.showItem = true;
        });
      },
      handleStop_fun: function (data) {
        this.$confirm("是否停止该优惠?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$store.dispatch("stopMarketingAction", {
            obj: this.obj,
            data: data
          }).then(() => {
            this.loadingShop = true;
          });
        }).catch(() => { })
      },
      handleNotStop_fun(data){
        this.$confirm('是否恢复该优惠?','提示',{
          confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
          this.$store.dispatch('notStopMarketingAction',{
            obj: this.obj,
            data: data
          }).then(()=>{
            this.loadingShop = true
          })
        })
      },
      handleEdit_fun: function (data) {
        this.$store.dispatch("getMarketingItem", {
          obj: this.obj,
          data: data
        }).then(() => {
          this.dealType = 'edit'
          this.loadingItem = true;
        })
      }
    },
    beforeCreate() {
      let obj = this.$route.params.type;
      let list = this.$store.state.marketing.marketingListARR[obj].List;
      if (list.length == 0) {
        this.$store.dispatch("getMarketingList", {
          obj: obj,
          data: {  IsValid: "-1"}
        });
      } else {
        this.$store.dispatch("setMarketingList", obj);
      }
    },
    created() {
      this.obj = this.$route.params.type;
      this.componentName = this.obj + "Page";
      this.componentName2 = this.obj + "Item";
      this.title = this.dataArr[this.obj].title;
    },
    components: {
      couponPage: () => import("@/components/marketing/coupon"),
      couponItem: () => import("@/components/marketing/couponItem"),
      goodsPage: () => import("@/components/marketing/goods"),
      goodsItem: () => import("@/components/marketing/goodsItem"),
      promotionPage: () => import("@/components/marketing/promotion"),
      promotionItem: () => import("@/components/marketing/promotionItem"),
      headerPage: () => import("@/components/header")
    }
  };

</script>


<style scoped>
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
        display: flex;
        align-items: center;
        height: 50px;
        position: relative;
    }
    .shop .name{
        position: absolute;
        right: 50px;
        height: 50px;
        line-height: 50px;
        width: 150px;
        text-align: center;
        top: 0;
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
    }

    .content-eightys{
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        background: #fff;
    }
</style>