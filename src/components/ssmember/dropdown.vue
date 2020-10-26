<template>
  <div class="vue-dropdown default-theme">
    <div class="search-module clearfix">
      <span class="select_member" @click="select_member">选择</span>
      <input
        class="search-text"
        v-model="searchText"
        @keyup="search_mb"
        placeholder="输入会员手机号/卡号"
      />
    </div>
    <ul class="list-module" v-loading="loading" v-show="datalist.length > 0">
      <li v-for="(item, index) in datalist" @click="appClick(item)" :key="index">
        <img :src="item.showgoodsimg" onerror="this.src='static/images/merberpic.png'" />
        <div class="itmeright">
          <div class="item_dright">
            <span
              style="
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 50%;
                overflow: hidden;
                display: inline-block;
              "
            >
              {{ item.NAME }}({{ item.CODE }})
            </span>
            <span class="pull-right">余额：{{ item.MONEY }}</span>
          </div>
          <div class="item_dright">
            <span>{{ item.MOBILENO }}</span>
            <span class="pull-right">积分：{{ item.INTEGRAL }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="ssmemberul" :memberid="memberdetails.ID">
      <ul>
        <li>
          <span>姓名:</span>
          <span>{{ memberdetails.NAME }}</span>
        </li>
        <li>
          <span>等级:</span>
          <span>{{ memberdetails.LEVELNAME }}</span>
        </li>
        <li>
          <span>余额:</span>
          <span>{{ memberdetails.MONEY }}</span>
        </li>
        <li>
          <span>积分:</span>
          <span>{{ memberdetails.INTEGRAL }}</span>
        </li>
      </ul>
    </div>
    <!-- 选择会员分页 -->
    <el-dialog :visible.sync="showAddNew" style="max-height: 600px">
      <el-table :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column prop="NAME" label="会员名称" width="140" sortable></el-table-column>
        <el-table-column prop="LEVELNAME" label="折扣类型" width="140"></el-table-column>
        <el-table-column prop="MOBILENO" label="手机号码" width="140"></el-table-column>
        <el-table-column
          prop="BIRTHDATE"
          label="生日"
          width="140"
          :formatter="formatDateTime"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <span @click="handleEdit(scope.$index, scope.row)" class="sm_color">选择</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="m-top-sm clearfix elpagination" v-if="pagination.TotalNumber > 20">
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
    </el-dialog>
    <!-- 选择会员分页 -->
  </div>
</template>
<script>
let _ = require("lodash");
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      searchText: "",
      datalist: [],
      pageData: {
        PN: 1,
        Filter: ""
      },
      memberdetails: this.details || {},
      showAddNew: false,
      isshowtatus: false,
      tableData: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      }
    };
  },
  props: ["details"],
  computed: {
    ...mapGetters({
      getssmemberdListState: "ssmemberdListState"
    })
  },
  watch: {
    getssmemberdListState(data) {
      let ip = JSON.parse(sessionStorage.getItem("serverIP"));
      console.log(ip);
      this.loading = false;
      if (data.success) {
        if (this.isshowtatus) {
          this.datalist = [...data.data.PageData.DataArr];
          for (let i = 0; i < this.datalist.length; i++) {
            if (this.datalist[i].IMAGEURL == undefined || this.datalist[i].IMAGEURL == "") {
              let VIPIMAGESIMG = ip + "/resources/vipimages/";
              this.datalist[i].showgoodsimg = VIPIMAGESIMG + this.datalist[i].ID + ".png";
            } else {
              this.datalist[i].showgoodsimg = this.datalist[i].IMAGEURL;
            }
          }
        } else {
          this.datalist = [];
        }

        this.tableData = [...data.data.PageData.DataArr];
        console.log(this.tableData);
        this.pagination = {
          TotalNumber: data.data.PageData.TotalNumber,
          PageNumber: data.data.PageData.PageNumber,
          PageSize: data.data.PageData.PageSize,
          PN: data.data.PageData.PN
        };
      }
    },
    details() {
      this.memberdetails = this.details;
      this.$store.state.dropdown.ssmemberopenID = "";
    }
  },
  methods: {
    formatDateTime: function (row, column) {
      return row.BIRTHDATE == undefined ? "" : this.filterTimeOut(row.BIRTHDATE);
    },
    search_mb() {
      this.isshowtatus = true;
      // this.searchfun();
      this.searchfun2();
    },
    getNewData() {
      this.$store.dispatch("getSsmemberdList", this.pageData).then(() => {
        this.loading = true;
      });
    },
    searchfun2() {
      if (!this.searchText) {
        return;
      }
      this.pageData.Filter = this.searchText;
      this.getNewData();
    },
    appClick(data) {
      this.searchText = "";
      this.datalist = [];
      this.memberdetails = data;
      this.$emit("getmemberID", data.ID);
      if (data.OPENID == undefined || data.OPENID == "" || data.OPENID == "0") {
        this.$store.state.dropdown.ssmemberopenID = "";
      } else {
        this.$store.state.dropdown.ssmemberopenID = data.OPENID;
      }
    },
    select_member() {
      this.isshowtatus = false;
      this.showAddNew = true;
      this.pageData.Filter = "";
      this.getNewData();
    },
    handleEdit(index, rows) {
      this.memberdetails = rows;
      this.$emit("getmemberID", rows.ID);
      this.showAddNew = false;
      if (rows.OPENID == undefined || rows.OPENID == "" || rows.OPENID == "0") {
        this.$store.state.dropdown.ssmemberopenID = "";
      } else {
        this.$store.state.dropdown.ssmemberopenID = rows.OPENID;
      }
    },
    handlePageChange: function (currentPage) {
      this.isshowtatus = false;
      this.showAddNew = true;
      this.pageData.PN = currentPage;
      this.getNewData();
    }
  }
};
</script>
<style lang="scss" scoped>
.vue-dropdown.default-theme {
  position: relative;

  .select_member {
    height: 30px;
    background: #fb789a;
    position: absolute;
    right: 0px;
    line-height: 30px;
    padding: 0 10px;
    color: #fff;
    top: 0;
    cursor: pointer;
  }

  &._self-show {
    display: block !important;
  }

  .search-module {
    position: relative;

    .search-text {
      width: 100%;
      height: 30px;
      padding-right: 2em;
      padding-left: 0.5em;
      box-shadow: none;
      border: 1px solid #ccc;

      &:focus {
        border-color: #2198f2;
      }
    }

    .search-icon {
      position: absolute;
      top: 24%;
      right: 0.5em;
      color: #aaa;
    }
  }

  .list-module {
    max-height: 260px;
    overflow-y: auto;
    position: absolute;
    background: #fff;
    width: 100%;
    z-index: 999;
    border: solid #76b7ef 2px;
    border-top: 0;

    li {
      padding: 6px;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      position: relative;

      img {
        width: 40px;
        height: 40px;
        float: left;
        margin-right: 6px;
      }

      .itmeright {
        width: 100%;
        position: absolute;
        left: 0;
        top: 7px;
        box-sizing: border-box;
        padding-left: 50px;
        padding-right: 6px;
      }

      &._self-hide {
        display: none;
      }

      margin-top: 0.5em;
      padding: 0.5em;

      &:hover {
        cursor: pointer;
        color: #fff;
        background: #00a0e9;
      }
    }
  }
}

.tip__nodata {
  font-size: 12px;
  margin-top: 1em;
}

.ssmemberul {
  margin: 16px 0;
  overflow: hidden;
  border-bottom: 2px solid rgb(204, 204, 204);
  padding-bottom: 8px;

  ul li {
    float: left;
    width: 25%;
    text-align: center;
    font-size: 13px;

    span:nth-child(2) {
      color: red;
    }
  }
}
</style>
