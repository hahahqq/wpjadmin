<template>
    <div id="addImg" >
        <div class="warp" >
            <el-button size='small' type="primary" @click="fileClick">上传图片</el-button>
            <span> 
                选中{{imgList.length}}张图片，共{{bytesToSize(this.size)}}; 最多上传<span class="text-primary"> 6 </span> 张图片！
            </span>

            <div class="upload">
                <div class="upload_warp">
                    <div class="upload_warp_img" v-show="imgList.length!=0" >
                        <div class="upload_warp_img_div" v-for="(item,index) of imgList" :key='index'>
                            <div class="upload_warp_img_div_top" >
                                <div class="upload_warp_img_div_text" >
                                    {{item.file.name}}
                                </div>
                                
                                <div class='delImg'>
                                    <el-button size='small' @click="fileDel(index)" icon='el-icon-delete'></el-button>
                                </div>
                            </div>
                            <img :src="item.file.src">
                        </div>
                    </div>
                    <div class="upload_warp_img" v-show='imgList.length == 0' style='height:120px; line-height:120px; color:#999; text-align:center'>
                        暂无图片,请点击 "上传图片" 开始上传
                    </div>
                </div>

                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>

            </div>

            <div style='text-align:center; width:100%; margin-top:30px'>
                <el-button size="small" type="primary" @click='submitImgList'><i class='el-icon-upload'></i> 提 交 </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgList: [],
            size: 0
        }
    },
    methods: {
        submitImgList(){
            console.log(this.imgList)
            this.$emit('imgListClick', this.imgList)
            this.$emit('closeModal')
        },
        fileClick(){
            if(this.imgList.length < 6){
                document.getElementById('upload_file').click()
            }else{
                this.$message.warning('商品只可设置 6 张图片 !')
            }
        },
        fileChange(el){
            if (!el.target.files[0].size) return;
            this.fileList(el.target.files);
            el.target.value = ''
        },
        fileList(files){
            for (let i = 0; i < files.length; i++) {
                this.fileAdd(files[i]);
            }
        },
        fileAdd(file){
            this.size = this.size + file.size;//总大小
            let reader = new FileReader();
            reader.vue = this;
            reader.readAsDataURL(file);
            reader.onload = function () {
                file.src = this.result;
                this.vue.imgList.push({file});
            }
        },
        fileDel(index){
            this.size = this.size - this.imgList[index].file.size;//总大小
            this.imgList.splice(index, 1);
        },
        bytesToSize(bytes){
            if (bytes === 0) return '0 B';
            let k = 1024,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        dragenter(el){
            el.stopPropagation();
            el.preventDefault();
        },
        dragover(el){
            el.stopPropagation();
            el.preventDefault();
        },
        drop(el){
            el.stopPropagation();
            el.preventDefault();
            this.fileList(el.dataTransfer.files);
        }
    },
}
</script>

<style>
.upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
}

.upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
}

.upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 0px 5px 5px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
}
.delImg { 
    display: none; width:100%; height:70px; background:#999; float:left; opacity:0.8; text-align:center
}

.upload_warp_img_div:hover .delImg{ display: block}

.upload_warp_img {
    border-top: 1px solid #D2D2D2;
    padding: 5px 0 0 5px;
    overflow: hidden
}

.upload_warp_text {
    text-align: left;
    margin-bottom: 5px;
    padding-top: 5px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
}

.upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
}
.upload_warp { margin: 5px; }

.upload {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background-color: #fff;
    width: 100%;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
}

.warp { width: 100%;}

</style>


