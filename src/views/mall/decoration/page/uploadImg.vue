<template id="upload-img">
    <div>
        <button type="button" class="layui-btn layui-btn-sm" @click="upload">上传图片</button>
        <div class="layui-upload-list">
            <img
                class="layui-upload-img"
                :src="item.image"
                id="image_src_cover"
                style="width:auto;max-width:200px;height:90px;"
            />
        </div>
        <!-- <input class="layui-upload-file" type="hidden" name="image" id="image_value_cover" value=""> -->
        <input
            type="file"
            name="image"
            id="image_value_cover"
            value
            accept="image/png, image/gif, image/jpeg"
            ref="uploadimg"
            v-on:change="inputChange($event)"
            class="layui-upload-file"
            style="overflow:hidden;width:0;height:0;"
        />
    </div>
</template>
<script>
import { IMG_UPLOAD_URL, IMG_FILE_PATH, IMG_URL } from "./js/define.js";
export default {
    data: function() {
        return {};
    },
    props: ["index", "item"],
    methods: {
        upload: function() {
            this.$refs.uploadimg.click();
            // this.$emit('upload-img')
        },
        inputChange(e) {
            let _this = this,
                imgFile = e.target.files[0];
            if (imgFile) {
                // this.qnUpload(imgFile)
                
                let fr = new FileReader();
                fr.onload = function(e) {
                    let base64 = this.result;

                    _this.item.image = base64;
                    _this.$emit("upload-img");
                    _this.$refs.uploadimg.value = "";
                };
                fr.readAsDataURL(imgFile);
            }
        },
        qnUpload(file) {
            console.log(file);
            return;
            let _this = this,
                url = IMG_UPLOAD_URL,
                path = IMG_FILE_PATH[0],
                name = new Date().getTime() + ".png";

            let fd = new FormData();
            fd.append("name", name);
            fd.append("filePath", path);
            fd.append("file", file);

            Vue.axios({
                url: url,
                method: "post",
                data: fd,
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(response => {
                    _this.item.image = base64;
                    _this.$emit("upload-img");
                })
                .catch(function(error) {
                    _this.$message.error({
                        success: false,
                        message: "上传失败",
                        data: error
                    });
                });
        }
    }
};
</script>
<style scoped>
@import "./css/style.css";
</style>