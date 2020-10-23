<template>
  <div>
    <el-row>
      <el-col :span="12">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="活动主题" prop="Caption" >
                <el-input v-model="ruleForm.Caption" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="优惠内容一">
                <el-input v-model="ruleForm.Remark1"></el-input>
              </el-form-item>
              <el-form-item label="优惠内容二">
                <el-input v-model="ruleForm.Remark2"></el-input>
              </el-form-item>
              <el-form-item label="优惠内容三">
                <el-input v-model="ruleForm.Remark3"></el-input>
              </el-form-item>
              <div class="clearfix"></div>
              <el-form-item label="有效时间">
                <el-date-picker v-model="dateBE" type="daterange" value-format="timestamp" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model.number="ruleForm.Tel" type="number" min=0></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="ruleForm.Address"></el-input>
              </el-form-item>
              <div class="clearfix"></div>
              <el-form-item label='文字颜色'>
                <el-button size='medium' @click='setCurBg("#FFFFFF", 1)' style='background:#FFFFFF; border:1px solid #999'></el-button>
                <el-button size='medium' @click='setCurBg("#6bac94", 2)' style='background:#6bac94' border></el-button>
                <el-button size='medium' @click='setCurBg("#29b1c9", 3)' style='background:#29b1c9' border></el-button>
                <el-button size='medium' @click='setCurBg("#ee798c", 4)' style='background:#ee798c' border></el-button>
                <el-button size='medium' @click='setCurBg("#f3b700", 5)' style='background:#f3b700' border></el-button>
                <el-button size='medium' @click='setCurBg("#7db3e0", 6)' style='background:#7db3e0' border></el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSubmit" :loading="loading">保 存</el-button>
                <el-button @click="closeModal">取 消</el-button>
              </el-form-item>
            </el-form>
      </el-col>
      <el-col :span="12">
        <div class="img-top">
          <span>微信公众号展示的样式</span>
        </div>
        <div class="imgUrl" :style="`color:${ruleForm.TextColor}`">
          <div class="backgroundImg" v-if='ruleForm.ImgName != undefined' :style="`background:url(${ruleForm.ImgName})`">
            <span class='title'>{{ruleForm.Caption == '' ? '活动主题' : ruleForm.Caption}}</span>
            <ul class='moveAbout p-top-md text-left'>
              <li> <img :src="imgIcon" alt="" style='width:16px; height:16px'> {{ruleForm.Remark1 == '' ? '优惠内容一' : ruleForm.Remark1}}</li>
              <li> <img :src="imgIcon" alt="" style='width:16px; height:16px'> {{ruleForm.Remark2 == '' ? '优惠内容二' : ruleForm.Remark2}}</li>
              <li> <img :src="imgIcon" alt="" style='width:16px; height:16px'> {{ruleForm.Remark3 == '' ? '优惠内容三' : ruleForm.Remark3}}</li>
            </ul>
            <span class='full-width p-top-lg pull-left text-left' style="padding-left:8px">
              <span style='font-size:5px'>活动时间: {{ new Date(dateBE[0]) | time1}} 至 {{new Date(dateBE[1]) | time1}} </span>
            </span>
            <span class='full-width p-top-sm pull-left text-left' style="padding-left:8px">
              <span style='font-size:5px'>活动热线: {{ruleForm.Tel}} </span>
            </span>
            <span class='full-width p-top-sm pull-left text-left' style="padding-left:8px">
              <span style='font-size:5px'>活动地址: {{ruleForm.Address}} </span>
            </span>
          </div>
        </div>
        <div>
          <div class="img-bottom">
              <div class="img-bottom-left">背景图片选择</div>
              <div class='img-bottom-right'>
                <span style='cursor:pointer' @click='success = true' v-if='!success && haveNewAddImg.length > 0'><i class="el-icon-edit-outline" ></i>&nbsp;编辑</span>
                <span style='cursor:pointer' @click='success = false' v-if='success && haveNewAddImg.length > 0'><i class="el-icon-check"></i>&nbsp;完成</span>
              </div>
          </div>
          <div class="imgupload">
              <ul>
                <li><test v-on:addBgImg='addBgImg'></test></li>
                <li class="upload_warp_img_div" v-for="(items,index) in marketingListImg" :key="index">
                  <el-button v-if='success && items.ISSYS == 0' @click="deleteImgUrl(index,items.ID)" class="el-icon-delete"></el-button>
                  <img :src="items.IMAGE" alt="" @click="slectImgUrl(items)" width="45px" height="90px">
                </li>
              </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { CityInfo } from "@/assets/js/area.js";
import { getUserInfo,getHomeData } from '@/api/index'
import Test from "./test.vue";
export default {
  components:{
    Test
  },
  props: {
    dealType: {
      type: Object,
      default: function() {
        return {
          type: "add",
          state: false,
          dialogImageUrl: [],
          dialogVisible: false,
          showon:false,
          showin:true,
        };
      }
    }
  },
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 800);
    };
    return {
      imgIcon:'static/images/icon_right_1.png',
      success:false,
      newArr1:[],
      ruleForm: {
        BILLID: "",
        ImgName: "",
        Caption: "",
        Remark1: "",
        Remark2: "",
        Remark3: "",
        BeginDate: "",
        EndDate: "",
        Tel: null,
        Address: "",
        TextColor: '#FFFFFF'
      },
      dialogImageUrl: [],
      rules: {
        Caption: [
          {
            required: true,
            message: "请输入活动主题",
            trigger: "blur"
          }
        ],
        Tel: [
          {
            required: true,
            validator: checkTel,
            trigger: "blur"
          }
        ]
      },
      dateBE: [],
      ShopList: [], //为空=适用全部，多个店铺用逗号分隔(15925,15926),默认为空 . add
      areaOptions: CityInfo,
      selectedAreaOptions: [],
      loading: false,
      imgUrl:'',
      choseImg:{},
      haveNewAddImg:[]
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "marketingItem",
      shopList: "shopList",
      dealState: "dealMarketingState",
      marketingListImg:"marketingListImg",
      ImageMaxNum: "ImageMaxNum",
      marketingSaveImg:"marketingSaveImg",
      marketingDelImg: "marketingDelImg",
      goodsImgUploadState:'goodsImgUploadState',
    })
  },
  watch: {
    goodsImgUploadState(data){
      if(data.success){
        this.$store.dispatch("getMarketingListImg",{ Type: 0})
      }
    },
    dealType(data) {
      this.defaultData();
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
              SmallImage:ip+'/resources/backgroundimage/s'+name+".png",
              ImageNum: this.ImageMaxNum + 1,
              Id: ''
          };

          this.$store.dispatch("getMarketingSaveImg", sendData)
        }else{
          this.$store.dispatch('getMarketingList', { obj: 'promotion', data:{ PN: 1, IsValid: "-1"} }).then(()=>{
            this.closeModal('resetList')
          })
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
            file: this.ruleForm.ImgName
        })
        this.$store.dispatch("uploadGoodsImg", {
            name: 's'+name +".png",
            filePath: "backgroundimage",
            file: this.ruleForm.ImgName
        })
    },
    marketingDelImg(data){
      if(data.success){
        this.$store.dispatch("getMarketingListImg",{ Type: 0})
      }
      this.$message({
        type: data.success ? 'success' : 'error',
        message: data.message
      })
    }
  },
  methods: {
    setCurBg(val, index){
      this.ruleForm.TextColor = val
      this.imgIcon = 'static/images/icon_right_'+index+'.png'
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
      this.ruleForm.ImgName = item.IMAGE
      this.choseImg = item
    },
    closeModal(type) {
      if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields();
      if (type == "resetList") {
        this.$emit("resetList");
      } else {
        this.$emit("closeModal");
      }
    },
    handleSubmit() {
      let sendData = Object.assign({}, this.ruleForm);
      if (this.dateBE.length > 0) {
        sendData.BeginDate = this.dateBE[0];
        sendData.EndDate = this.dateBE[1];
      }
      if (this.dealType.type == "add" && this.ShopList.length > 0) {
        sendData.ShopList = this.ShopList.join(",");
      } else {
        delete sendData.ShopList;
      }
      if (this.dealType.type == "edit") {
        sendData.BillId = this.dataItem.BILLID;
      }

      let ip = JSON.parse(sessionStorage.getItem('serverIP'))
      if(this.choseImg.isNewAdd == true){
        let homeInfo = getHomeData();
        let id = homeInfo.shop.COMPANYID + "_";
        let max= this.ImageMaxNum + 1;
        let name = id + max;
        sendData.ImgName = ip+ '/resources/backgroundimage/'+name+".png"
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("dealPromotionAction", {
            type: this.dealType.type,
            data: sendData
          }).then(() => {
            this.loading = true;
          })
        } else {
          this.loading = false;
        }
      });
    },
    getAreaLabel() {
      let seled = [...this.selectedAreaOptions];
      let areaStr = "";
      if (seled.length == 0) return areaStr;
      for (let i = 0; i < this.areaOptions.length; i++) {
        if (this.areaOptions[i].value == seled[0]) {
          areaStr += this.areaOptions[i].label + " ";
          for (let j = 0; j < this.areaOptions[i].children.length; j++) {
            if (this.areaOptions[i].children[j].value == seled[1]) {
              areaStr += this.areaOptions[i].children[j].label + " ";
              let karr = [...this.areaOptions[i].children[j].children];
              for (let k = 0; k < karr.length; k++) {
                if (karr[k].value == seled[2]) {
                  areaStr += karr[k].label + " ";
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      return areaStr;
    },
    setAddress(address) {
      let seled = address.split(" ");
      let areaStr = [];
      let defauleArr = [...this.areaOptions];
      for (let i = 0; i < defauleArr.length; i++) {
        if (defauleArr[i].label == seled[0]) {
          areaStr.push(defauleArr[i].value);
          for (let j = 0; j < defauleArr[i].children.length; j++) {
            if (defauleArr[i].children[j].label == seled[1]) {
              areaStr.push(defauleArr[i].children[j].value);
              let karr = [...defauleArr[i].children[j].children];
              for (let k = 0; k < karr.length; k++) {
                if (karr[k].label == seled[2]) {
                  areaStr.push(karr[k].value);
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      this.selectedAreaOptions = [...areaStr];
      this.ruleForm.Address = seled[3];
    },
    defaultData() {
      if (this.$refs.ruleForm){ this.$refs.ruleForm.resetFields();}
      this.haveNewAddImg = this.marketingListImg.filter(item => item.ISSYS == 0)
      if (this.dealType.type == "add") {
        this.ruleForm = {
          BILLID: "",
          ImgName: this.marketingListImg[0].IMAGE,
          Caption: "",
          Remark1: "",
          Remark2: "",
          Remark3: "",
          BeginDate: "",
          EndDate: "",
          Tel: null,
          Address: "",
          TextColor: '#FFFFFF'
        }
        this.ruleForm.BeginDate = new Date().getTime();
        this.ruleForm.EndDate = new Date(this.getCustomDay(7)).getTime();
        this.dateBE = [ this.ruleForm.BeginDate, this.ruleForm.EndDate];
        if (this.shopList.length == 0) {
          this.$store.dispatch("getShopList");
        }
      }
      if (this.dealType.type == "edit") {
        for (let key in this.ruleForm) {
          let kk = key.toUpperCase();
          this.ruleForm[key] = this.dataItem[kk];
        }

        let imgIdx = 1
        if(this.ruleForm.TextColor == '#FFFFFF'){
          imgIdx = 1
        }else if(this.ruleForm.TextColor == '#6bac94'){
          imgIdx = 2
        }else if(this.ruleForm.TextColor == '#29b1c9'){
          imgIdx = 3
        }else if(this.ruleForm.TextColor == '#ee798c'){
          imgIdx = 4
        }else if(this.ruleForm.TextColor == '#f3b700'){
          imgIdx = 5
        }else if(this.ruleForm.TextColor == '#7db3e0'){
          imgIdx = 6
        }

        this.imgIcon = 'static/images/icon_right_'+imgIdx+'.png'

        if(this.ruleForm.ImgName == undefined){
          this.ruleForm.ImgName = this.marketingListImg[0].IMAGE
        }
        if (this.dataItem.BEGINDATE != 1) {
          this.dateBE = [this.dataItem.BEGINDATE, this.dataItem.ENDDATE];
        }
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.defaultData();
    this.$store.dispatch("getMarketingListImg",{ Type: 0})
  },
};
</script>
<style scoped>
.half {
  width: 50%;
  margin-right: 0px;
  float: left;
}
.img-top{
  width: 100%;
  height: 30px;
  text-align: center;
}
.imgUrl{
  width: 100%;
  text-align: center;
}
.imgUrl div{
  height: 300px;
  width: 160px;
  margin: 0 auto;
  border-radius: 10px
}
.img-bottom{
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  /* border: solid 1px #FAD16A; */
}
.img-bottom-left{
  width: 50%;
  text-align: center;
}
.img-bottom-right{
   width: 46%;
   padding: 4%;
   text-align: right;
   color:#fb789a ;
}
.imgupload{
  width: 80%;
  display: flex;
  align-items: center;
  margin-left: 70px;
}
.imgupload img{
 width:45px;
 height:90px;
 /* margin-left: 20px; */
 margin-top: 10px;
 border-radius: 3px;
}
.imgupload ul li{
  float: left;
  margin-left: 6px;
  position: relative;
}
.el-icon-delete{
  position: absolute;
  top: 10px;
  text-align:center;
  color: #fff;
  opacity:0.6;
  width:45px; 
  height:90px; 
  background:#333
}
.imgupload ul{
  overflow: auto;
  height: 200px;
}
.title{
  width:100%; float:left; margin-top:26px; font-size:18px; font-weight:bold; font-family: '宋体'
}
.moveAbout{
  width:90%; padding-left:10%; float:left; height: 80px;
}
.moveAbout li{
  margin: 6px 0;
}
.backgroundImg{
  background-size: contain !important;
  background-repeat: no-repeat !important;
  height: 100%;
  width: 100%;
  background-position: center !important;
}
</style>