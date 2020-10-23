<template id="select-link">
    <div>
        <el-form-item label="链接类型：">
            <el-select v-model="selectType" placeholder="请选择" @change="changeSelect">
                <el-option v-for="(val,key,i) in linkType" :key="i" :label="val" :value="key" v-show="i>0"></el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="链接指向：">
            <div v-if="selectType==1">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="http开头为webview跳转，其他为站内页面跳转"
                    v-model="linkUrl"
                    @change="updateLinkValue"
                ></el-input>
            </div>
            <div v-else class="el-input">
                <input
                    type="text"
                    v-model="id"
                    class="selectLinkVal- input__inner"
                    :readonly="true"
                    @click="selectLink"
                    placeholder="请选择"
                />
            </div>
        </el-form-item> -->
    </div>
</template>
<script>
export default {
    props: ["type", "id"],
    data: function() {
        var linkType = {
            1: "URL链接",
            2: "首页",
            3: "我的",
            4: "搜索",
            5: "商品",
            6: "搜索",
            7: "购物车",
            8: "订单"
        };
        return {
            linkType: linkType,
            linkUrl: this.id || "",
            selectType: this.type ? "" + this.type : Object.keys(linkType)[0]
        };
    },
    watch: {
        type(newVal, oldVal) {
            this.selectType = newVal;
            if (newVal == 1) {
                this.linkUrl = this.id;
            }
        }
    },
    mounted() {
        if (!this.type) {
            this.$emit("update:type", Object.keys(this.linkType)[0]);
        }
    },
    methods: {
        selectLink: function() {
            this.$emit("choose-link");
        },
        changeSelect: function() {
            this.$emit("update:type", this.selectType);
            this.$emit("update:id", "");
        },
        updateLinkValue: function() {
            this.$emit("update:id", this.linkUrl);
        }
    }
};
</script>
<style scoped>
@import "./css/style.css";
.input__inner{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    cursor: pointer;
}
</style>