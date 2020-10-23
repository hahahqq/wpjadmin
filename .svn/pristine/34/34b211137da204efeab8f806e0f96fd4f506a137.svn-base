<template>
    <div class="footerBtn">
        <img v-if="attach.laterUrl" :src="attach.laterUrl" class="preview" />
        <div @click="dialogVisible=true" class="zdy">自定义</div>
        <!-- 弹出层-裁剪 -->
        <el-dialog
            title="编辑图片"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            append-to-body
            width="50%"
            >
            <span>
                <el-row>
                    <input 
                        type="file"
                        id="uploads"
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        @change="uploadImg($event,1)"
                        class="el-button"
                        style="margin-bottom:15px"
                    >
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <!-- 裁剪 -->
                            <vueCropper
                                style="width:100%;height:300px"
                                ref="cropper"
                                :img="attach.customaryUrl"
                                :autoCrop="options.autoCrop"
                                :fixedBox="options.fixedBox"
                                :canMoveBox="options.canMoveBox"
                                :centerBox="options.centerBox"
                                :fixedNumber="options.fixedNumber"
                                :outputSize="options.outputSize"
                                :info="options.info"
                                :fixed="options.fixed"
                                :outputType="options.outputType"
                                @realTime="realTime"
                            >
                            </vueCropper>
                    </el-col>
                    <el-col :span="8">
                        <h2 align="center"></h2>
                            <div class="show-preview">
                                <div :style="previews.div" class="preview">
                                    <img :src="previews.url" :style="previews.img">
                                </div>
                            </div>
                    </el-col>
                </el-row>
                <el-row class="footerBtn" align="center">
                    <el-button type="primary" size="small" round="" @click="cut('blob')">确认</el-button>
                    <el-button type="primary" size="small" round="" @click="handleClose">取消</el-button>
                </el-row>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import { getUserInfo,getHomeData } from '@/api/index'
export default {
    data(){
        return{
            dialogVisible:false,
            options:{
                info:true,
                autoCrop:true,  //默认生成截图框
                fixedBox:true,  //固定截图框大小
                canMoveBox:true,    //截图框不能拖动
                // autoCropWidth:200,  //截图框宽度
                // autoCropHeight:200, //截图框高度
                centerBox:false,    //截图框被限制在图片里面
                fixedNumber:[1.1,2],
                outputSize:1,
                full: true,
                fixed: true,
                outputType: 'png',
            },
            previews:{}, //实时预览图数据
            imgviews:{},
            attach:{ //后端附件表
                id:'',
                userId:'',
                customaryUrl:'', //原图片路径
                laterUrl:'',//裁剪后图片路径  /static/logo.png
                attachType:'photo',//附件类型
            },
            fileName:'',//本机文件地址
            uploadImgRelaPath:'',//上传后图片地址
        }
    },
    computed: {
        ...mapGetters({
            ImageMaxNum: "ImageMaxNum",
        })
    },
    methods:{
        //控制弹出层关闭
        handleClose(){
            this.dialogVisible=false
        },
        //实时预览
        realTime(data){
            this.previews=data
            this.finish(data);
        },
        finish(type) {
            this.$refs.cropper.getCropBlob(data => {
                var img = window.URL.createObjectURL(data)
                this.model = true
                this.imgviews = img
            })
        },
        //选择本地图片
        uploadImg(e,num){
            var file = e.target.files[0];
            if(!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)){
                this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
                return false;
            }
            console.log(e.target.result);
            //fileReader 接口，用于异步读取文件数据
            var reader = new FileReader();
            reader.readAsDataURL(file); //重要 以dataURL形式读取文件
            reader.onload = e => {
                
           // data = window.URL.createObjectURL(new Blob([e.target.result])) 转化为blob格式
                
                let data = e.target.result
                
                this.attach.customaryUrl=data
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
            }
        },
        //确认截图,上传
        cut(type){
            this.$refs.cropper.getCropData((data) => {
                let img = new Image(), _this = this
                img.src = data
                img.onload = function() {
                    let imageUrl=data;
                    _this.$emit('addBgImg', data)
                    _this.dialogVisible=false;
                }
            })
        },
        // 压缩图片 
        compress(img) {
            let canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            initSize = img.src.length,
            width = img.width,
            height = img.height;
            canvas.width = width
            canvas.height = height
            // 铺底色 
            ctx.fillStyle = "#fff"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, width, height)
            //进行压缩 
            let ndata = canvas.toDataURL("image/png", 0.8)
            console.log("压缩后的图片大小：" + ndata.length)
            return ndata
        }, 
        dataURItoBlob(base64Data) { 
            let byteString
            if (base64Data.split(",")[0].indexOf("base64") >= 0) 
            byteString = atob(base64Data.split(",")[1])
            else 
            byteString = unescape(base64Data.split(",")[1])
            let mimeString = base64Data .split(",")[0] .split(":")[1] .split(";")[0]; 
            let ia = new Uint8Array(byteString.length); 
            for (let i = 0; i < byteString.length; i++) { 
                ia[i] = byteString.charCodeAt(i); 
            } 
            return new Blob([ia], { type: mimeString })
        }
    }
}
</script>

<style scoped>
/* 弹性布局 水平居中 */
.show-preview{
    display: flex;  
    justify-content: center;
    }

.preview{
        /* border-radius: 50%; */
        overflow: hidden;
        border:1px solid #cccccc;
        background: #cccccc;
      }
.footerBtn{
    display: flex;
    justify-content: center;
    margin-top: 10px;
     
}
img{
    max-width: 900% !important;
}
.zdy{
 width:45px;
 height:90px;
 text-align:center;
 line-height: 90px;
 border: dashed 1px #FAD16A;
 border-radius: 3px;
}
</style>