<template id="style-color">
    <div>
        <div class="head">
            <span class="title">配色方案</span>
            <span class="desp">切换全局风格后，按钮及文字颜色将同步变更</span>
        </div>
        <div class="content">
            <div class="color-content">
                <ul
                    v-for="i in colorList.length"
                    :key="i"
                    @click="activeColor=i"
                    class="config-item"
                    :class="activeColor==i?'showTheme'+i+' active' :'showTheme'+i"
                >
                    <li v-for="j in 3" :key="j" class="item"></li>
                </ul>
            </div>
        </div>
        <div class="foot theme_bg">
            <el-button @click="$emit('closeModel')">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            colorList: [
                ["#fe2278", "#b6c1d4", "#fff"],
                ["#403737", "#ccc2c3", "#fff"],
                ["#564c42", "#f5b800", "#fff"],
                ["#cf3035", "#ddaf72", "#fff"],
                ["#ff4f00", "#ff9400", "#fff"],
                ["#e73f83", "#f1a879", "#fff"],
                ["#e74c5e", "#e0b87f", "#fff"],
                ["#b268bb", "#e0a2e8", "#fff"],
                ["#b19ce2", "#f1a879", "#fff"],
                ["#fda283", "#fbab66", "#fff"],
                ["#dbb865", "#e6577d", "#fff"],
                ["#6b9275", "#fdab66", "#fff"],
                ["#20a4ff", "#52d05c", "#fff"],
                ["#4a72f6", "#c2dd6b", "#fff"],
                ["#654af6", "#a69be6", "#fff"],
                ["#28abfe", "#70dacb", "#fff"],
                ["#0cc59c", "#9899a4", "#fff"],
                ["#6ddbd1", "#6b8492", "#fff"]
            ],
            activeColor: 1,
        };
    },
    methods: {
        submit() {
            let cArr = this.colorList[this.activeColor];
            // this.$el.querySelector(".foot").style.backgroundColor = cArr[0];
            window.document.documentElement.setAttribute(
                "data-theme",
                'theme' + this.activeColor
            );

            console.log(this.colorList[this.activeColor].toString());
            this.$emit('closeModel')
        }
    }
};
</script>

<style scoped lang="scss">
@import "./css/mixin.scss";

.head,
.content {
    margin-bottom: 15px;
}
.foot {
    padding-top: 10px;
    text-align: center;
}
.title {
    font-size: 16px;
    margin-right: 10px;
    color: #555;
}
.desp {
    font-size: 14px;
    color: #999;
}

.color-content {
    display: grid;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 96px);
    grid-gap: 0 48px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 840px;
}

.color-content .config-item {
    position: relative;
    margin: 10px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
}
.color-content .config-item.active {
    outline: 2px solid #8558fa;
}

.color-content .config-item .item {
    width: 32px;
    height: 32px;
    border-left: none;
}

</style>