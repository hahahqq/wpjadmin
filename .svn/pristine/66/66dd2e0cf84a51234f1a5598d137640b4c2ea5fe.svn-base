<template>
    <el-row>
        <el-col :span="16" class="header-left-area">
            <div class="center-title">{{$route.meta.title}}</div>
            <!-- 目前用于商城 -->
            <div v-if="$route.meta.buttonGroup && $route.meta.buttonGroup.length>0">
                <div class="center-cont">
                    <ul class="center-cont-ul">
                        <li
                            v-for="(item,i) in $route.meta.buttonGroup"
                            :key="i"
                            :class="{'selected font-600 text-theme':item.value.indexOf($route.path)>-1}"
                        >
                            <router-link :to="{ path: item.value }" class="block item">
                                <span>{{item.label}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <el-breadcrumb separator="/" class="center-cont">
                    <template v-if="$route.meta.breadcrumb && $route.meta.breadcrumb.length>0">
                        <el-breadcrumb-item
                            v-for="(item,i) in $route.meta.breadcrumb"
                            :key="i"
                            :to="{ path: item.value }"
                        >
                            <span class="font-600" style="color:#137deb">{{item.label}}</span>
                        </el-breadcrumb-item>
                    </template>
                    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </el-col>
        <el-col :span="8" class="header-right-area">
            <header-right-area></header-right-area>
        </el-col>
    </el-row>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import headerRightArea from "@/components/header/right.vue";
export default {
    data() {
        return {};
    },
    components: {
        headerRightArea,
    },
};
</script>

<style scoped>
.header-left-area {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ebedf0;
    background: #fff;
    font-size:14px;
}
.center-title {
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
}
.center-cont {
    width: 300px;
    text-align: left;
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
}

.header-right-area {
    line-height: 50px;
    height: 50px;
    text-align: right;
    padding-right: 20px;
    border-bottom: 1px solid #ebedf0;
    background: #fff;
    font-size:14px;
}

.center-cont-ul li {
    display: inline-block;
    width: 58px;
    text-align: center;
    margin-right: 25px;
    position: relative;
}
/* .center-cont-ul li.selected {
    color: #2589ff;
    font-weight: bold;
} */
.center-cont-ul li.selected::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 6px;
    width: 100%;
    height: 2px;
    background-color: currentColor;
}
</style>
