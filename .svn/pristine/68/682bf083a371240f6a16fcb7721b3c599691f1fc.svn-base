<template>
    <div>
        <component v-bind:is="componentName" ref="order" v-on:changeCom="changeComFun"></component>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import orderListPage from "./list";
import orderItemPage from "./item";
export default {
    components:{
        orderListPage,orderItemPage
    },
    data() {
        return {
            componentName: "orderListPage",
        };
    },
    methods:{
        changeComFun(v) {
            this.componentName = v == 2 ? "orderItemPage" : "orderPage";
        },
    }
};
</script>
<style scoped>
.div-tabel {
    display: table;
    border-spacing: 20px; /*边距*/
    width: 100%;
}
.div-tabel-row {
    display: table-row;
}
.div-table-cell {
    display: table-cell;
}
</style>
