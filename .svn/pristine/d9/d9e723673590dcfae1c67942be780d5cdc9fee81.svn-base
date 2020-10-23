<template>
    <div class="vue-dropdown default-theme">
        <div class="search-module clearfix">
            <input
                class="search-text"
                v-model="searchText"
                @keyup="search_mb"
                placeholder="输入会员手机号/卡号"
                v-show="inputShow"
            />
        </div>
        <div class="ssmemberul" :memberid="memberdetails.ID" v-if="memberdetails.ID!=null">
            <div class="ssmemberul-cont">
                <div class="ssmemberul-imgUrl">
                    <img
                        :src="memberdetails.IMAGEURL"
                        onerror="this.src='static/images/merberpic.png'"
                    />
                </div>
                <div class="ssmemberul-massge">
                    <div>
                        <span class="ssmemberul-cont-name">{{memberdetails.NAME}}</span>
                        <span class="ssmemberul-cont-phone">{{memberdetails.MOBILENO}}</span>
                        <span class="ssmemberul-cont-ka">{{memberdetails.LEVELNAME}}</span>
                    </div>
                    <div class="ssmemberul-cont-text">
                        <span>余额 : {{memberdetails.MONEY}}</span>
                        <span style="margin-left:20px;">积分 : {{memberdetails.INTEGRAL}}</span>
                    </div>
                </div>
                <i class="el-icon-delete" @click="delClick"></i>
            </div>
        </div>
        <ul class="list-module">
            <li v-for="(item,index) in datalist" @click="appClick(item)" :key="index">
                <img :src="item.showgoodsimg" onerror="this.src='static/images/merberpic.png'" />
                <div class="itmeright">
                    <div class="item_dright-left">
                        <div class="name">{{item.NAME}}</div>
                        <div class="phone">{{item.MOBILENO}}</div>
                    </div>
                    <div class="item_dright-right">
                        <div>余额：{{item.MONEY}}</div>
                        <div>积分：{{item.INTEGRAL}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
let _ = require("lodash");
import { VIPIMAGESIMG } from "@/util/define";
import { mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            loading: false,
            searchText: "",
            inputShow: true,
            datalist: [],
            pageData: {
                PN: 1,
                Filter: "",
            },
            memberdetails: this.details || {},
            showAddNew: false,
            isshowtatus: false,
            tableData: [],
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0,
            },
        };
    },
    props: ["details"],
    computed: {
        ...mapGetters({
            getssmemberdListState: "ssmemberdListState",
        }),
    },
    watch: {
        getssmemberdListState(data) {
            this.loading = false;
            if (data.success) {
                if (this.isshowtatus) {
                    this.datalist = [...data.data.PageData.DataArr];
                    for (let i = 0; i < this.datalist.length; i++) {
                        if (
                            this.datalist[i].IMAGEURL == undefined ||
                            this.datalist[i].IMAGEURL == ""
                        ) {
                            this.datalist[i].showgoodsimg =
                                VIPIMAGESIMG + this.datalist[i].ID + ".png";
                        } else {
                            this.datalist[i].showgoodsimg = this.datalist[
                                i
                            ].IMAGEURL;
                        }
                    }
                } else {
                    this.datalist = [];
                }

                this.tableData = [...data.data.PageData.DataArr];
                this.pagination = {
                    TotalNumber: data.data.PageData.TotalNumber,
                    PageNumber: data.data.PageData.PageNumber,
                    PageSize: data.data.PageData.PageSize,
                    PN: data.data.PageData.PN,
                };
            }
        },
        details(data) {
            console.log("会员信息有吗还放假", data);
            if (data.ID == undefined) {
                this.inputShow = true;
                this.memberdetails.ID = null;
            }
            this.memberdetails = this.details;
            this.$store.state.dropdown.ssmemberopenID = "";
        },
    },
    methods: {
        delClick() {
            this.$emit("changeMemberIDnull", 1);
            this.$store.dispatch("selectingMember", {});
            this.memberdetails = {};
            this.inputShow = true;
        },
        formatDateTime: function (row, column) {
            return row.BIRTHDATE == undefined
                ? ""
                : this.filterTimeOut(row.BIRTHDATE);
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
        // searchfun: _.debounce(function() {
        //   this.searchfun2();
        // }, 1000),
        searchfun2() {
            if (!this.searchText) {
                return;
            }
            console.log(this.pageData.Filter);
            this.pageData.Filter = this.searchText;
            this.getNewData();
        },
        appClick(data) {
            this.inputShow = false;
            this.searchText = "";
            this.datalist = [];
            this.memberdetails = data;
            this.$emit("getmemberID", data.ID, data);
            if (
                data.OPENID == undefined ||
                data.OPENID == "" ||
                data.OPENID == "0"
            ) {
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
        handlePageChange: function (currentPage) {
            this.isshowtatus = false;
            this.showAddNew = true;
            this.pageData.PN = currentPage;
            this.getNewData();
        },
    },
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
            height: 55px;
            padding-right: 2em;
            padding-left: 0.5em;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid #ccc;
            border: none !important;
            font-size: 12px;
            color: #2f2f2f;

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
        margin-top: 30px;
        /* border: solid #76b7ef 2px; */
        border-top: 0;

        li {
            padding: 10px;
            overflow: hidden;
            // border-bottom: 1px solid #ccc;
            position: relative;

            img {
                width: 40px;
                height: 40px;
                float: left;
                margin-right: 6px;
            }

            // .itmeright {
            //   width: 100%;
            //   position: absolute;
            //   left: 0;
            //   top: 7px;
            //   box-sizing: border-box;
            //   padding-left: 50px;
            //   padding-right: 6px;
            // }
            .itmeright {
                align-items: center;
                display: flex;
                width: 90%;
                position: absolute;
                left: 0;
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
    height: 50px;
    width: 100%;
    background: #fff;
    height: 60px;
    //  border: solid 1px #00a0e9;
}
.ssmemberul-cont {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
    display: flex;
    align-items: center;
    height: 60px;
}
.ssmemberul-imgUrl img {
    height: 35px;
    width: 35px;
    border-radius: 100%;
}
.ssmemberul-massge {
    margin-left: 10px;
    font-size: 12px;
}
.el-icon-delete {
    position: absolute;
    right: 15px;
}
.ssmemberul-cont-name {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}
.ssmemberul-cont-ka {
    margin-left: 130px;
    font-size: 8px !important;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    background: rgba(37, 137, 255, 1);
    border-radius: 2px;
}
.ssmemberul-cont-text {
    font-size: 12px;
    font-family: HelveticaCyr Upright;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 5px;
}
.ssmemberul-cont-phone {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: rgba(153, 153, 153, 1);
}
.item_dright-left .name {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 50%;
    overflow: hidden;
    display: inline-block;
    font-weight: bold;
}
.item_dright-left .phone {
    color: #a7a7a8;
    font-size: 12px;
}
.item_dright-right {
    width: 30%;
    text-align: left;
    color: #a7a7a8;
    font-size: 12px;
}
.item_dright-left {
    width: 70%;
    margin-left: 10px;
}
input::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size: 12px;
}
::-webkit-scrollbar {
    width: 3px;
}
::-webkit-scrollbar-track {
    background-color: #e3e3e5;
}
::-webkit-scrollbar-thumb {
    background-color: #979799;
}
</style>
