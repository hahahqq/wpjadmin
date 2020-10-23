<template>
  <div class="setColor">
    <div class="setColor_top">
      <el-button type="default" icon="el-icon-plus" @click="showAddNewColor({},'add')">新增颜色</el-button>
      <el-button type="default" icon="el-icon-edit" @click="editColor">编辑颜色</el-button>
      <el-input prefix-icon="el-icon-search" v-model="searchText" @input='searchfun2(1)' placeholder="输入颜色名称" class="pull-right" style="width: 250px;"></el-input>
    </div>
    <div class="setColor_link">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for='(item, i) in dataList' size="small" :key='i' style='margin:3px 3px' :label='item.NAME' border>{{item.NAME}}</el-checkbox>
        </el-checkbox-group>
    </div>
    <div class="foote r_b text-center">
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="loading">保 存</el-button>
    </div>

    <el-dialog title="编辑颜色" :visible="dialogEditColor" width="600px" append-to-body :before-close="handleDialogClose">
      <el-tag v-for="tag in dataList" style='margin:6px 6px' :key="tag.NAME" closable :type="tag.ID" @close="handleDelClose(tag)">
        <span @click="showAddNewColor(tag,'edit')">{{tag.NAME}}</span>
      </el-tag>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo, getHomeData} from '@/api/index'
export default {
  props:{
    colorData: Array
  },
  data() {
    return {
      searchText: "",
      loading: false,
      ColorList: [],
      dataList: [],
      selectColorList:'',
      pagedata:{
        Filter:''
      },
      checkList: [],
      dialogEditColor: false
    };
  },
  methods: {
    handleDialogClose(){
      this.dialogEditColor = false
    },
    closeModal(type) {
      this.$emit("closeModal");
    },
    editColor(){
      if(localStorage.getItem("isExperience") == 'true' ){
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '此账号为公用演示账号，数据不可更改，请完成注册之后免费试用！ '),
            h('p', null, '如需协助请联系客服 18054282628 , 随时为您服务！')
          ]),
          showCancelButton: false,
          confirmButtonText: '我知道了',
          confirmButtonClass: 'btnFalses'
        })
        return
      }

      this.dialogEditColor = true
    },
    showAddNewColor(item,type) {
      if(localStorage.getItem("isExperience") == 'true' ){
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '此账号为公用演示账号，数据不可更改，请完成注册之后免费试用！'),
            h('p', null, '如需协助请联系客服 18054282628 , 随时为您服务！')
          ]),
          showCancelButton: false,
          confirmButtonText: '我知道了',
          confirmButtonClass: 'btnFalses'
        })
        return
      }

      this.$prompt('', type == 'add' ? '新增颜色' : '修改颜色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: type == 'add' ? '' : item.NAME
      }).then(({ value }) => {
        let haveSameName = this.dataList.filter(item => item.NAME === value)
        if(haveSameName.length != 0){
          this.$message.warning('该颜色名称已存在！不可重复')
          return
        }
        if(value==null || value==''){
          this.$message('请输入颜色名称');
        }else{
          this.getColoraddList(value,item.ID)
        }
      }).catch(() => {});
    },
    handleDelClose(item){
      this.$confirm('确认删除 【' + item.NAME +'】?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("getcolordeleteState", {Id:item.ID})
      }).catch(() => {});
    },
    searchfun2(){
      this.pagedata.Filter=this.searchText;
      this.getColorList();
    },
    getColorList() {
      this.$store.dispatch("getcolorState", this.pagedata)
    },
    getColoraddList(Name,Id) {
      let datas={ Name:Name , Id: Id ? Id : '' }
      this.$store.dispatch("getcoloraddState", datas)
    },
    showColorclick(){
      this.showThat()
    },
    showThat(data) {
      if (true) {
        this.dataList = [...this.seltagArr];
      }
    },
    submitForm(){
      let checkList = this.checkList, dataList = this.dataList, newParam = []
      //循环选中颜色名称与颜色列表名称相同的数据
      dataList.forEach((dataList) =>{
        checkList.forEach((checkList) =>{
          if(dataList.NAME === checkList){
            newParam.push(dataList)
          }
        })
      })
      this.$emit("getColorDateclick",newParam);
    }
  },
  computed: {
    ...mapGetters({
      datacolorList: "colorList",
      seltagArr: "seltagArr",
      tagState: "tagState",
      datacoloraddState: "coloraddState",
      colordeleteState: "colordeleteState",
      colorState:'colorState'
    })
  },
  watch: {
    datacoloraddState(data){
      if(!data.success){
        this.$message.warning(data.message)
      }
      this.getColorList()
    },
    colordeleteState(data){
      if(data.success){
        this.getColorList();
      }else{
        this.$message.error(data.message)
      }
    },
    datacolorList(data) {
      this.dataList = [...this.seltagArr];
      this.checkList = this.colorData.map(item => item.COLORNAME)
    },
    tagState(data) {
      if (data.action == "setCustomerTag") {
        this.showPopupSecond = false;
        this.closeModal();
      }
      if (data.success) {
        this.showPopupSecond = false;
      }
      this.dataList = [...this.seltagArr];
    }
  },
  mounted() {
    this.getColorList()
  }
};

</script>
<style>
.setColor_link {
  padding: 12px 0;
}

.setColor_link span.el-tag {
  margin: 6px 4px;
  cursor: pointer;
  position: relative;
  padding: 0 25px;
}

.activesColorB {
  border: 1px solid #2196F3;
}

.activesColor {
  font-family: iconfont;
  position: absolute;
  bottom: -1px;
  right: 0.2px;
}

</style>
