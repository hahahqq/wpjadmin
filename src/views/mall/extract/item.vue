<template>
    <div v-loading="loading">
      dddd
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
    props: ["pageState"],
    data() {
        return {
            msg: "",

            map: null,
            loading: false,
            mapZoom: 15,
            mapCenter: { lng: 0, lat: 0 },
            mapLocation: {
                address: undefined,
                coordinate: undefined
            }
        };
    },
    computed: {
        ...mapGetters({
            dataItem: "mallFreightItem",
            dataState: "mallFreightState"
        })
    },
    watch: {
        pageState(v) {
            if (v) {
                let type = Object.keys(this.dataItem).length > 0 ? 1 : 0;
                this.defaultData(type);
                this.$refs.form.clearValidate();
            }
        },
        dataState(data) {
            if (this.loading) {
                if (data.success) {
                    this.$emit("resetModal");
                }
                this.$message({
                    type: data.success ? "success" : "error",
                    message: data.message
                });
                this.loading = false;
            }
        }
    },
    methods: {
        
    },
    mounted() {
        this.locationbtn();
    }
};
</script>
<style scoped>
#allmap {
    width: 100%;
    height: 15rem;
}
</style>