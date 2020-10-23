<template>
    <el-container>
        <el-header style="height:50px; padding: 0">
            <headerPage></headerPage>
        </el-header>
        <el-container>
            <el-aside width="100px">
                <section style="min-width:100px;">
                    <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
                </section>
            </el-aside>
            <el-container>
                <el-main style="padding: 10px">
                    <el-row>
                      <el-col :span="12">
                          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk='true' label-width="100px">
                              <el-form-item label="会员名称" prop="Name" >
                                <el-input size="small" v-model="ruleForm.Name" autocomplete="off" placeholder='如 “微信会员” ' style="width:400px"></el-input>
                              </el-form-item>
                    
                              <el-form-item label="会员等级" prop='LevelId'>
                                <el-select size="small" v-model="ruleForm.LevelId" @change='curLevel' clearable placeholder="请选择会员等级" style="width:400px">
                                  <el-option
                                    v-for="item in memberLevelList"
                                    :key="item.NAME"
                                    :label="item.NAME"
                                    :value="item.ID"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item label="权益说明">
                                <el-input type="textarea" v-model="ruleForm.Explain" size="small" placeholder="请输入会员权益说明" style="width:400px"></el-input>
                              </el-form-item>

                              <el-form-item label='文字颜色'>
                                <el-button size='medium' @click='setCurBg("#FFFFFF", 1)' style='background:#FFFFFF; border:1px solid #999'></el-button>
                                <el-button size='medium' @click='setCurBg("#6bac94", 2)' style='background:#6bac94' border></el-button>
                                <el-button size='medium' @click='setCurBg("#29b1c9", 3)' style='background:#29b1c9' border></el-button>
                                <el-button size='medium' @click='setCurBg("#ee798c", 4)' style='background:#ee798c' border></el-button>
                                <el-button size='medium' @click='setCurBg("#f3b700", 5)' style='background:#f3b700' border></el-button>
                                <el-button size='medium' @click='setCurBg("#7db3e0", 6)' style='background:#7db3e0' border></el-button>
                              </el-form-item>
                              <el-form-item label="背景图片选择">
                                <div style="width:400px;float:left">
                                  <div class="img-bottom">
                                      <div class='img-bottom-right' style='text-align:right'>
                                        <span style='cursor:pointer' @click='success = true' v-if='!success && haveNewAddImg.length > 0'><i class="el-icon-edit-outline" ></i>&nbsp;编辑</span>
                                        <span style='cursor:pointer' @click='success = false' v-if='success && haveNewAddImg.length > 0'><i class="el-icon-check"></i>&nbsp;完成</span>
                                      </div>
                                  </div>
                                  <div class="imgupload">
                                      <ul>
                                        <li><test v-on:addBgImg='addBgImg'></test></li>
                                        <li class="" v-for="(items,index) in marketingListImg" :key="index">
                                          <el-button v-if='success && items.ISSYS == 0' @click="deleteImgUrl(index,items.ID)" class="el-icon-delete"></el-button>
                                          <img :src="items.IMAGE" alt="" @click="slectImgUrl(items)" width="45px" height="90px">
                                        </li>
                                      </ul>
                                  </div>
                                </div>
                              </el-form-item>
                              <el-form-item>
                                <el-button type="primary" @click="handleSubmit" :loading="loading">保 存</el-button>
                              </el-form-item>
                            </el-form>
                      </el-col>
                      <el-col :span="12">
                        <div class="imgUrl" :style="`color: ${ruleForm.Color}; `" >
                          <div class="backgroundImg" v-if='ruleForm.Image != undefined' :style="`background:url(${ruleForm.Image})`">
                            <div style="padding: 10px 20px; width:100%; float:left">
                              <span style="width:44px; height:44px; float:left">
                                <img src="../../../static/images/logo2.png" alt="" width="40px" height="40px" style="border-radius:50%; ">
                              </span>
                              <span style='float:left; width: 200px ; '>
                                <span style="width: 200px; float:left">{{ruleForm.Name == '' ? '会员名称' : ruleForm.Name}}</span>
                                <span style='font-size:12px'>{{levelName}}</span>
                              </span>
                            </div>
                            <div style="position: relative; bottom: 30px; left: 20px;">
                                188 **** 1234
                            </div>
                          </div>
                        </div>

                      </el-col>
                    </el-row>
                  </el-main>
            </el-container>
        </el-container>
    </el-container>

</template>
<script>
import { mapState, mapGetters } from "vuex";
import { CityInfo } from "@/assets/js/area.js";
import { getUserInfo,getHomeData } from '@/api/index'
import MIXINS_MARKETING from "@/mixins/marketing.js";

export default {
  mixins: [MIXINS_MARKETING.MARKETING_MENU],
  components:{
    Test: () => import("@/components/marketing/uploadVipCardBg"),
    headerPage: () => import("@/components/header")
  },
  data() {
    return {
      success:false,
      ruleForm: {
        Name: '',
        LevelId:'',
        Image: "",
        Color: '#FFFFFF',
        Explain:''
      },
      dialogImageUrl: [],
      rules: {
        Name: [
          {
            required: true,
            message: "请输入会员名称",
            trigger: "blur"
          }
        ],
      },
      loading: false,
      imgUrl:'',
      choseImg:{},
      haveNewAddImg:[],
      levelName:'',
      vipCardDetails:{
        Name: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "marketingItem",
      memberLevelList: "memberLevelList",
      dealState: "setVipCardBackGround",
      marketingListImg:"marketingListImg",
      ImageMaxNum: "ImageMaxNum",
      marketingSaveImg:"marketingSaveImg",
      marketingDelImg: "marketingDelImg",
      goodsImgUploadState:'goodsImgUploadState',
      getVipCardBackGround:'getVipCardBackGround'
    })
  },
  watch: {
    getVipCardBackGround(data){
      if(data.success){
        let info = data.data.Obj
        this.ruleForm = {
          Name: info.NAME,
          Color: info.COLOR,
          Image: info.IMAGE,
          LevelId: info.LEVELID,
          Explain: info.EXPLAIN
        }
        this.levelName = info.LEVELNAME
      }
    },
    goodsImgUploadState(data){
      if(data.success){
        this.$store.dispatch("getMarketingListImg",{ Type: 2})
      }
    },
    dealState(data) {
      this.loading = false;
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      })

      if(data.success){
        if(this.choseImg.isNewAdd != undefined){
          let homeInfo = getHomeData();
          let id = homeInfo.shop.COMPANYID + "_";
          let max= this.ImageMaxNum + 1;
          let name = id + max;
          let ip = JSON.parse(sessionStorage.getItem('serverIP'))
          let sendData = {
              Image: ip+'/resources/backgroundimage/'+name+".png",
              SmallImage: ip+ '/resources/backgroundimage/s'+name+".png",
              ImageNum: this.ImageMaxNum + 1,
              Id: '',
              Type: 2
          };
          this.$store.dispatch("getMarketingSaveImg", sendData)
        }
      }
    },
    marketingSaveImg(data){
        let homeInfo = getHomeData();
        let id = homeInfo.shop.COMPANYID + "_";
        let max= this.ImageMaxNum + 1;
        let name = id + max;
        this.$store.dispatch("uploadGoodsImg", {
            name: name +".png",
            filePath: "backgroundimage",
            file: this.ruleForm.Image
        })
        this.$store.dispatch("uploadGoodsImg", {
            name: 's'+name +".png",
            filePath: "backgroundimage",
            file: this.ruleForm.Image
        })
        this.$store.dispatch('getVipCardBg')
    },
    marketingDelImg(data){
      if(data.success){
        this.$store.dispatch("getMarketingListImg",{ Type: 2})
      }
      this.$message({
        type: data.success ? 'success' : 'error',
        message: data.message 
      })
    }
  },
  methods: {
    curLevel(event,item){
      let levelName = this.memberLevelList.filter(item => item.ID == this.ruleForm.LevelId)
      this.levelName = levelName[0].NAME
    },
    setCurBg(val, index){
      this.ruleForm.Color = val
    },
    addBgImg(data){
      this.success = false
      this.marketingListImg.unshift({ IMAGE: data, ISSYS: 0, isNewAdd: true, ID: '' })
      this.haveNewAddImg = this.marketingListImg.filter(item => item.ISSYS == 0)
    },
    deleteImgUrl(indexs,id) {
      if(id == ''){
        this.marketingListImg.splice( indexs, 1)
        this.haveNewAddImg = this.marketingListImg.filter(item => item.ISSYS == 0)
        return
      }
      this.$confirm('该图片删除会影响正在使用该图片的活动，是否继续删除？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("delImg",{id});
      }).catch(() => { })
    },
    slectImgUrl(item) {
      this.ruleForm.Image = item.IMAGE
      this.choseImg = item
    },
    handleSubmit() {
      let sendData = Object.assign({}, this.ruleForm);
      if(this.choseImg.isNewAdd == true){
        let homeInfo = getHomeData();
        let id = homeInfo.shop.COMPANYID + "_";
        let max= this.ImageMaxNum + 1;
        let name = id + max;
        let ip = JSON.parse(sessionStorage.getItem('serverIP'))
        sendData.ImgName = ip+'/resources/backgroundimage/'+name+".png"
      }else{
        sendData.ImgName = this.ruleForm.Image
      }
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("setVipCardBg", sendData).then(() => {
              this.loading = true;
            });
        } else {
          this.loading = false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.$store.dispatch("getMarketingListImg",{ Type: 2})
    this.$store.dispatch("getMemberLevel");
    this.$store.dispatch('getVipCardBg')
  },
};
</script>
<style scoped>
.half {

  width: 50%;
  margin-right: 0px;
  float: left;
}
.imgUrl{
  width: 100%;
  text-align: left;
  position:absolute
}
.imgUrl div{
  height: 160px;
  width: 300px;
  border-radius: 10px
}
.img-bottom{
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
}
.img-bottom-right{
  width: 100%;
  color:#fb789a;
}
.imgupload{  
  width: 100%;
  display: flex;
  align-items: center;
}
.imgupload img{
 width:70px;
 height:45px;
 margin-top: 6px;
 border-radius: 3px;
}
.imgupload ul li{
  float: left;
  margin-left: 6px;
  position: relative;
}
.el-icon-delete{
  position: absolute;
  top: 6px;
  text-align:center;
  color: #fff;
  opacity:0.6;
  width:70px; 
  height:45px; 
  background:#333
}
.imgupload ul{
  overflow: auto;
  height: 190px;
}
.title{
  width:100%; float:left; margin-top:26px; font-size:16px; font-family: '宋体'
}
.backgroundImg{
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  height: 160px;
  width: 300px;
  background-position: center !important;
}

.header-top{
    width: 100%;
    margin-bottom:10px;
    background: #F7F8FA;
}
.main-top{
    height: 50px;
    line-height: 50px;
    widows: 100%;
    background: #fff;
}
.member-header{
    display: flex;
    align-items: center;
    height: 50px;
}
.center-title{
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: solid 1px #d7d7d7;
}
.center-cont{
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
}
.el-header{
    padding: 0 !important;
}
.shop{
    display: flex;
    align-items: center;
    height: 50px;
    position: relative;
}
.shop .name{
    position: absolute;
    right: 50px;
    height: 50px;
    line-height: 50px;
    width: 150px;
    text-align: center;
    top: 0;
}
.el-header, .el-footer {
    background-color: #fff;
    color: #333;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.content-eightys{
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #fff;
}
</style>