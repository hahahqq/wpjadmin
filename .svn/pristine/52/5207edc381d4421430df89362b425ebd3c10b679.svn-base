<template>
    <el-container class="bg-white">
        <el-header
            :height="elHeight"
            class="no-padding box-shadow- border-bottom row-flex flex-between flex-items-center"
        >
            <div :style="{width: leftW,'min-width': leftW}" class="border-right p-left-md">
                <el-button type="text" class="font-16" @click="$router.back()">返回</el-button>
            </div>
            <div
                class="el-main"
                style="background-color:white;height:100%;margin:0;overflow:hidden"
            >
                <el-button type="text" class="font-16" @click="isEdit=true">
                    <span>网店模板标题</span>
                    <i class="el-icon-edit-outline"></i>
                </el-button>
            </div>
            <div :style="{width: rightW,'min-width': rightW}" class="border-left p-left-md">
                <el-button
                    type="primary"
                    size="small"
                    plain
                    icon="el-icon-menu"
                    @click="isColor=true"
                >全局风格</el-button>
            </div>
            <el-dialog append-to-body title="模板信息" :visible.sync="isEdit" width="500px" class="theme1">
                <el-form :model="form" label-width="100px" label-position="left">
                    <el-form-item label="页面标题：">
                        <el-input
                            v-model="form.name"
                            autocomplete="off"
                            maxlength="40"
                            placeholder="最多可输入40个字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="页面描述：">
                        <el-input
                            type="textarea"
                            v-model="form.remark"
                            placeholder="用户通过微信分享给朋友时，会自动显示页面描述"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isEdit=false">取 消</el-button>
                    <el-button type="primary" @click="isEdit=false">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog append-to-body title="全局风格" :visible.sync="isColor" width="872px" class="theme1">
                <set-theme @closeModel="isColor=false"></set-theme>
            </el-dialog>
        </el-header>
        <el-container :style="{height: height+'px'}">
            <el-aside :width="leftW" id="leftAside" style="background:white;">
                <div v-for="(item,i) in assemblyDiv" :key="i">
                    <div class="padding-sm marginTB-xs font-16 text-center">
                        <span>{{item.title}}</span>
                    </div>
                    <ul class="component-item">
                        <li
                            class="component-item-li"
                            v-for="(citem, index) in item.data"
                            :key="index"
                            @click="selectWidget(citem.type,citem.hidden)"
                            v-show="!citem.hidden"
                        >
                            <p>
                                <i class="iconfont" :class="citem.icon"></i>
                            </p>
                            <p class="text">{{ citem.name }}</p>
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-main id="p-main" style="height:100%;margin:auto">
                <div class="phone-box">
                    <div class="phone-head">
                        <img :src="imgPhoneArr[0]" alt class="block" />
                        <img :src="imgPhoneArr[1]" alt class="block" />
                    </div>
                    <div class="phone-content">
                        <Layout ref="layout"></Layout>
                    </div>
                    <div class="phone-foot">
                        <img :src="imgPhoneArr[2]" alt class="block" />
                    </div>
                </div>
            </el-main>
            <el-aside :width="rightW" id="rightAside" style="overflow-y: scroll;background:white">
                <layout-config></layout-config>
            </el-aside>
        </el-container>
        <el-footer
            :height="elHeight"
            class="border-top text-center relative"
            :style="{'padding-left':leftW,'padding-right':rightW}"
        >
            <div class="p-top-sm">
                <el-button
                    type="primary"
                    size="small"
                    plain
                    @click="clearData"
                    class="absolute"
                    :style="{'left':leftW}"
                >清空</el-button>
                <div class="block">
                    <el-button type="primary" size="small" plain icon="el-icon-view">预览</el-button>
                    <el-button type="primary" size="small" plain @click="savePage">保存</el-button>
                    <el-button type="primary" size="small" plain>保存并应用</el-button>
                </div>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
import Vue from "vue";
Vue.prototype.bus = new Vue();

import Layout from "./layout.vue";
import LayoutConfig from "./layoutConfig.vue";
import SetTheme from "./setTheme.vue";
import { allWidget } from "./js/allWidget.js";

export default {
    data() {
        return {
            imgPhoneArr: [
                require("./images/decoration/phonehead.png"),
                require("./images/decoration/phonehead2.png"),
                require("./images/decoration/phonefoot.png")
            ],
            assemblyDiv: [
                { title: "媒体组件", data: allWidget.mediaComponents },
                { title: "商城组件", data: allWidget.storeComponents },
                { title: "工具组件", data: allWidget.utilsComponents }
            ],
            height: window.innerHeight - 120,
            elHeight: "60px",
            leftW: "270px",
            rightW: "400px",
            myArray: [
                { name: "111", id: 1, order: 1, fixed: true },
                { name: "222", id: 2, order: 2, fixed: false },
                { name: "333", id: 3, order: 3, fixed: false }
            ],
            form: {
                name: "",
                remark: ""
            },
            isEdit: false,
            isColor: false
        };
    },
    methods: {
        selectWidget(type, hidden) {
            if (hidden) return;
            for (var key in allWidget) {
                for (var index = 0; index < allWidget[key].length; index++) {
                    var element = allWidget[key][index];
                    if (element.type == type) {
                        console.log(element);
                        this.$refs.layout.handleClickAdd(element);
                    }
                }
            }
        },
        clearData: function() {
            this.$refs.layout.deleteAllWidget();
        },
        savePage: function() {
            var data = {
                data: this.$refs.layout.pageData,
                pageCode: this.$route.query.id
            };
            console.log(data);
            let arr = [...this.$refs.layout.pageData];
            // arr[1].value.list[0].image = '';
            // arr[1].value.list[1].image = '';
            // arr[1].value.list[2].image = '';
            // arr[1].value.list[3].image = '';

            console.log(arr.length, JSON.stringify(arr));
            //   JsPost(this.saveUrl, data, function (res) {
            //     if (res.status) {
            //       layer.msg(res.msg, { time: 1300 }, function () {
            //       });
            //     } else {
            //       layer.msg(res.msg);
            //     }
            //   })
        }
    },
    created() {
        this.height = window.innerHeight - 190;
        console.log(111);
    },
    beforeDestroy() {
        console.log(888);
    },
    components: {
        Layout,
        LayoutConfig,
        SetTheme
    }
};
</script>
<style scoped>
#p-main {
    background: #eef4f8;
    overflow-y: auto;
}
.phone-box {
    width: 375px;
    min-height: 667px;
    margin: auto;
}
.phone-box .phone-content {
    background-color: #f4f4f4;
    height: 100%;
    margin-top: -2px;
    margin-bottom: -2px;
}

.component-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    text-align: center;
    width: 100%;
    border-top: 1px solid #555;
}
.component-item-li {
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
    padding: 15px;
    width: 90px;
    height: 90px;
}

#leftAside::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}

#leftAside {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
}
</style>