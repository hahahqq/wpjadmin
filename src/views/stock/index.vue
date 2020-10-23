<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="2" :md="2" :lg="2" v-for="(item,i) in pageList" :key="i">
        <a @click='toFollowLink(item)' class="rounded-xs block padding-sm m-bottom-md" style="float:left">
          <img :src="item.img" class="inline-block pull-left m-right-sm" style="width: 55px; height: 55px;" />
          <span class='full-width m-top-xs pull-left'>{{item.label}}</span>
        </a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo} from '@/api/index'
import img from "@/assets/u4868.png";
import imgCG from '@/assets/icon_CG.png'
import imgTH from '@/assets/icon_TH.png'
import imgTB from '@/assets/icon_TB.png'
import imgPD from '@/assets/icon_PD.png'
import imgCX from '@/assets/icon_CX.png'
export default {
  data() {
    return {
      pageList: [
        { label: "采购入库", name: "warehousing", img: imgCG },
        { label: "采购退货", name: "return", img: imgTH },
        { label: "库存调拨", name: "allocation", img: imgTB },
        { label: "库存盘点", name: "inventory", img: imgPD },
        { label: "库存查询", name: "query", img: imgCX }
      ]
    };
  },
  components: {},
  methods: {
    toFollowLink(item) {
      let agentPermission = getUserInfo().List
      let arr = agentPermission.filter(element => element.MODULENAME == item.label);
      if (arr.length > 0 && !this.isPurViewFun(arr[0].MODULECODE)) {
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      } else {
        this.$router.push({ path: '/stock/' + item.name });
      }
    }
  }
};
</script>

