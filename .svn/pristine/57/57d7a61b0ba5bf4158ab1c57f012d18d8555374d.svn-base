<template>
    <div v-loading="loading">
        <div>
            <el-button type="primary" size="mini" icon="el-icon-plus">添加</el-button>
        </div>
        <!--列表-->
        <div class="paddingTB-md">
            <el-table border :data="pageList">
                <el-table-column prop="NAME" label="名称" width="120" sortable></el-table-column>
                <el-table-column prop="CODE" label="编码" width="130"></el-table-column>
                <el-table-column prop="REMARK" label="描述" width="200"></el-table-column>
                <el-table-column prop="STYLE" label="布局样式" sortable></el-table-column>
                <el-table-column prop="CATEGORY" label="布局类型" sortable></el-table-column>
                <el-table-column prop="STATUS" label="状态"></el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="dealItem(scope.row.CODE,'edit')"
                        >编辑</el-button>
                        <el-button
                            type="warning"
                            size="mini"
                            @click="dealItem(scope.row.CODE,'del')"
                            v-if="!scope.row.STATUS"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            pageList: [
                {
                    NAME: "11",
                    CODE: 111,
                    REMARK: "rrrr",
                    STYLE: "绿蓝白",
                    CATEGORY: "移动端",
                    STATUS: 1
                },
                {
                    NAME: "22",
                    CODE: 222,
                    REMARK: "sss",
                    STYLE: "绿蓝白",
                    CATEGORY: "移动端",
                    STATUS: 0
                }
            ]
        };
    },
    methods: {
        dealItem(id, type) {
            if (type == "edit") {
                this.$router.push({
                    path: "/mall/decorationItem",
                    query: { id: id }
                });
            }
        }
    }
};
</script>