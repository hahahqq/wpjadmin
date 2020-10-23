<template id="layout">
    <div class="layout-container" :style="{'padding-bottom':hasFootNavBar?'100px':'0'}" style="min-height: 600px;">
        <draggable
            v-model="pageData"
            :options="{group: { name: 'widget'},sort: true,ghostClass: 'ghost',dragClass:'dragItem',
				filter:'.lay-record',
				scroll: true,
				scrollSensitivity:100,
				scrollSpeed:1000,
				animation: 100}"
            @add="handleWidgetAdd"
            class="layout-list"
            :class="{ 'widget-empty': pageData.length === 0 }"
            @update="datadragEnd"
            @remove="handleDragRemove"
        >
            <template v-for="(item, index) in pageData">
                <div
                    class="layout-main"
                    :key="item.key"
                    :class="{ active: selectWg.key === item.key,npr:item.type=='record'}"
                    @click="handleSelectWidget(index)"
                    v-if="item.type!='footerNavBar'"
                >
                    <!-- 网店信息 -->
                    <div v-if="item.type === 'shopInfo'" class="drag lay-shopInfo">
                        <div class="circle">
                            <div class="circle-bg" :class="item.value.type">
                                <img :src="default_bg" alt />
                            </div>
                        </div>
                        <div class="info align" :class="item.value.style.align">
                            <div class="info-logo">
                                <img
                                    :src="default_logo"
                                    alt="店铺头像"
                                    class="avatar"
                                    :style="{'border-radius': item.value.style.radius+'%'}"
                                />
                            </div>
                            <div class="info-line">
                                <div v-if="item.value.name">
                                    <span>name</span>
                                </div>
                                <div v-if="item.value.address">
                                    <span>address</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 搜索框 -->
                    <div v-if="item.type === 'search'" class="drag lay-item lay-search">
                        <div class="lay-search-c">
                            <input
                                v-model="item.value.keywords"
                                class="lay-search-input"
                                :class="item.value.style"
                            />
                            <i class="iconfont icon-sousuokuang"></i>
                        </div>
                    </div>
                    <!-- 购买记录 -->
                    <div
                        v-if="item.type==='record'"
                        class="drag lay-record"
                        :class="item.value.style.align"
                        @click="handleSelectRecord(index)"
                        :style="{top:item.value.style.top+'%'}"
                    >
                        <div class="record-item">
                            <i class="layui-icon layui-icon-user"></i>
                            <span class="text">xxx刚刚0.01元买到了xxx</span>
                        </div>
                        <div
                            @click.stop="handleWidgetDelete(index)"
                            class="btn-delete"
                            v-if="selectWg.key === item.key"
                        >删除</div>
                    </div>
                    <!-- 商品组 -->
                    <div
                        v-if="item.type === 'goods'"
                        class="drag clearfix lay-goods"
                        :class="item.value.display"
                    >
                        <div class="goods-head">
                            <div>{{item.value.title}}</div>
                            <div v-if="item.value.lookMore">查看更多></div>
                        </div>
                        <div
                            class="goods-item"
                            v-for="(goods,key) in item.value.list"
                            :key="key"
                            :class="'column'+item.value.column"
                        >
                            <div class="goods-image">
                                <img :src="goods.image_url||goods.image" alt />
                            </div>
                            <div class="goods-detail">
                                <p
                                    class="goods-name"
                                    :class="item.value.nameHeight==1?'onelist-hidden':'twolist-hidden'"
                                >
                                    <span>{{goods.name||'此处显示商品名称'}}</span>
                                </p>
                                <p class="theme-color">
                                    <span class="goods-price">{{goods.price||'99.00'}}</span>
                                    <span v-if="item.value.buyNow" class="goods-buynow">购买</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 团购秒杀 -->
                    <div
                        v-if="item.type === 'groupPurchase'"
                        class="drag clearfix lay-goods slide group"
                    >
                        <div class="goods-head">
                            <div>{{item.value.title}}</div>
                        </div>
                        <div class="group-item" v-for="(goods,key) in item.value.list" :key="key">
                            <div class="group-image">
                                <img :src="default_banner" alt />
                            </div>
                            <div class="group-detail">
                                <p class="group-name twolist-hidden">{{goods.name||'此处显示商品名称'}}</p>
                                <p class="group-price">{{goods.price||'￥99.00'}}</p>
                                <p class="group-time">
                                    <span>剩余：</span>
                                    <span class="time">21</span>:
                                    <span class="time">30</span>:
                                    <span class="time">45</span>
                                </p>
                                <span class="buy-icon">
                                    <img :src="cartImg" alt />
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 拼团 -->
                    <div v-if="item.type === 'pintuan'" class="drag clearfix lay-goods slide group">
                        <div class="goods-head">
                            <div>{{item.value.title}}</div>
                        </div>
                        <div class="group-item" v-for="(goods,key) in item.value.list" :key="key">
                            <div class="group-image">
                                <img :src="default_banner" alt />
                            </div>
                            <div class="group-detail">
                                <p class="group-name twolist-hidden">{{goods.name||'此处显示商品名称'}}</p>
                                <p class="group-price">{{goods.price||'￥99.00'}}</p>
                                <p class="group-time">
                                    <span>剩余：</span>
                                    <span class="time">21</span>:
                                    <span class="time">30</span>:
                                    <span class="time">45</span>
                                </p>
                                <span class="buy-icon">
                                    <img :src="cartImg" alt />
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 单图组 -->
                    <div v-if="item.type==='imgSingle'" class="drag lay-imgSingle">
                        <div class="img-wrap" v-for="(img,key) in item.value.list" :key="key">
                            <img :src="img.image" alt />
                            <div
                                class="img-btn"
                                :style="{backgroundColor:img.buttonColor,color:img.textColor}"
                                v-show="img.buttonShow"
                            >{{img.buttonText}}</div>
                        </div>
                    </div>
                    <!-- 图片轮播 -->
                    <div v-if="item.type==='imgSlide'" class="drag lay-item lay-imgSlide">
                        <el-carousel
                            :interval="item.value.duration"
                            arrow="never"
                            :autoplay="false"
                        >
                            <el-carousel-item v-for="(list,key) in item.value.list" :key="key">
                                <img :src="list.image" alt="banner" style="width:100%;height:100%" />
                            </el-carousel-item>
                        </el-carousel>
                        <div class="swiperConts-slot" v-if="item.value.list.length>0">1/{{item.value.list.length}}</div>
                    </div>
                    <!-- 图片橱窗 -->
                    <div
                        v-if="item.type==='imgWindow'"
                        class="drag lay-imgWindow clearfix"
                        :class="'row'+item.value.style"
                        :style="{}"
                    >
                        <template v-if="item.value.style==0">
                            <div class="display">
                                <div class="display-left">
                                    <img :src="item.value.list[0].image" alt />
                                </div>
                                <div class="display-right">
                                    <div class="display-right1">
                                        <img :src="item.value.list[1].image" alt />
                                    </div>
                                    <div class="display-right2">
                                        <div class="left">
                                            <img :src="item.value.list[2].image" alt />
                                        </div>
                                        <div class="right">
                                            <img :src="item.value.list[3].image" alt />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div
                                class="img-wrap"
                                v-for="(img,key) in item.value.list"
                                :key="key"
                                :style="{padding:item.value.margin+'px'}"
                            >
                                <img :src="img.image" alt />
                            </div>
                        </template>
                    </div>
                    <!-- 视频组 -->
                    <div v-if="item.type==='video'" class="drag lay-item lay-video">
                        <div class="video-wrap" v-for="(video,key) in item.value.list" :key="key">
                            <video
                                :src="video.url"
                                :poster="video.image"
                                controls="controls"
                                height="200px;"
                            ></video>
                        </div>
                    </div>
                    <!-- 文章组 -->
                    <div v-if="item.type==='article'" class="drag lay-article">
                        <div
                            class="article-wrap clearfix"
                            v-for="(article,key) in item.value.list"
                            :key="key"
                        >
                            <div class="article-left">
                                <div class="article-left-title">{{article.title||'此处显示文章标题'}}</div>
                            </div>
                            <div class="article-img">
                                <img :src="article.cover||default_banner" alt />
                            </div>
                        </div>
                    </div>
                    <!-- 文章分类 -->
                    <div v-if="item.type==='articleClassify'" class="drag lay-article">
                        <div class="article-wrap clearfix">
                            <div class="article-left">
                                <div class="article-left-title">此处显示文章标题</div>
                            </div>
                            <div class="article-img">
                                <img :src="default_banner" alt />
                            </div>
                        </div>
                        <div class="article-wrap clearfix">
                            <div class="article-left">
                                <div class="article-left-title">此处显示文章标题</div>
                            </div>
                            <div class="article-img">
                                <img :src="default_banner" alt />
                            </div>
                        </div>
                    </div>
                    <!-- 公告组 -->
                    <div v-if="item.type==='notice'" class="drag lay-item lay-notice">
                        <i class="iconfont icon-gonggao"></i>
                        <div class="notice-right">
                            <div
                                v-for="(notice,key) in item.value.list"
                                :key="key"
                                class="notice-text"
                            >{{notice.title}}</div>
                        </div>
                    </div>
                    <!-- 优惠券组 -->
                    <div v-if="item.type==='coupon'" class="drag lay-item lay-coupon">
                        <div class="coupon-item">
                            <div class="coupon-left">
                                <p>满300减30</p>
                            </div>
                            <div class="coupon-right">
                                <p class="conpon-f">订单减1.44元 减100元</p>
                                <p>购买订单满2元</p>
                                <p>2019-05-01 - 2019-05-31</p>
                            </div>
                            <div class="coupon-btn">立即领取</div>
                        </div>
                    </div>
                    <!-- 导航组 -->
                    <div
                        v-if="item.type==='navBar'"
                        class="drag lay-navBar clearfix"
                        :class="'row'+item.value.limit"
                    >
                        <div class="item" v-for="(nav,key) in item.value.list" :key="key">
                            <div class="item-image">
                                <img :src="nav.image" alt />
                            </div>
                            <p class="item-text">{{nav.text}}</p>
                        </div>
                    </div>
                    <!-- 辅助空白 -->
                    <div
                        v-if="item.type==='blank'"
                        class="drag lay-item lay-blank"
                        :style="{height:item.value.height+'px',backgroundColor:item.value.backgroundColor}"
                    ></div>
                    <!-- 文本域 -->
                    <div v-if="item.type==='textarea'" class="drag lay-item lay-textarea">
                        <div class="lay-search-c">
                            <el-input type="textarea" autosize v-html="item.value" resize="none"></el-input>
                        </div>
                    </div>
                    <div
                        @click.stop="handleWidgetDelete(index)"
                        class="btn-delete"
                        v-if="selectWg.key === item.key "
                    >删除</div>
                    <div
                        @click.stop="handleWidgetClone(index)"
                        class="btn-clone"
                        v-if="selectWg.key === item.key"
                    >复制</div>
                </div>
            </template>
        </draggable>
        <!-- 底部导航 -->
        <div v-if="hasFootNavBar" class="layout-footer">
            <div class="layout-list">
                <div
                    class="layout-main"
                    :class="{ active: selectWg.key === pageData[0].key}"
                    @click="handleSelectWidget(0)"
                >
                    <div class="drag lay-footerNavBar">
                        <div class="item" v-for="(nav,key) in pageData[0].value.list" :key="key">
                            <div class="item-image">
                                <!-- <img :src="nav.image" alt /> -->
                                <div :style="{'background-image':'url('+nav.image+')'}" class="img"></div>
                            </div>
                            <div class="item-text">
                                <span>{{nav.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import { default_banner, default_bg } from "./js/allWidget.js";
var deepClone = function(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "object") {
                result[key] = deepClone(obj[key]); //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
};
export default {
    name: "layout",
    data() {
        return {
            default_banner: default_banner,
            cartImg: require("./images/ic-car.png"),
            default_logo: require("./images/default-logo.png"),
            default_bg: default_bg,
            pageData: [],
            selectWg: {},
            hasFootNavBar: false
        };
    },
    mounted() {
        let pageConfig = [];
        if (pageConfig.length == 0) {
            pageConfig.push({
                type: "footerNavBar",
                value: {
                    limit: 5, // 限制为5个内
                    list: [
                        {
                            image: require("./images/footer/home.png"),
                            text: "首页",
                            linkType: "",
                            linkValue: "",
                            show: false
                        },
                        {
                            image: require("./images/footer/user.png"),
                            text: "我的",
                            linkType: "",
                            linkValue: "",
                            show: false
                        }
                    ]
                }
            });
            this.hasFootNavBar = true;
        }
        console.log(2, pageConfig);
        // if (pageConfig.length > 0) {
        for (var i = 0; i < pageConfig.length; i++) {
            var item = pageConfig[i];
            var elKey = Date.now() + "_" + Math.ceil(Math.random() * 1000000);
            item.key = item.type + "_" + elKey;
        }
        this.pageData = pageConfig;
        this.$nextTick(() => {
            this.handleSelectWidget(0);
        });
        // }
    },
    methods: {
        setSelectWg(data) {
            this.selectWg = data;
            this.bus.$emit("changeSelectWg", data);
        },
        handleWidgetAdd: function(evt) {
            var newIndex = evt.newIndex;
            var elKey = Date.now() + "_" + Math.ceil(Math.random() * 1000000);
            var newObj = deepClone(this.pageData[newIndex]);
            newObj.key = this.pageData[newIndex].type + "_" + elKey;
            this.$set(this.pageData, newIndex, newObj);
            this.setSelectWg(this.pageData[newIndex]);
        },
        handleClickAdd: function(obj) {
            let elKey = Date.now() + "_" + Math.ceil(Math.random() * 1000000);
            let newObj = deepClone(obj);
            let newIndex = this.pageData.length || 0;
            newObj.key = obj.type + "_" + elKey;
            if (newIndex == 0) {
                this.$set(this.pageData, newIndex, newObj);
                this.setSelectWg(this.pageData[newIndex]);
                return;
            }
            if (
                newObj.type == "footerNavBar" &&
                this.pageData[0].type === "footerNavBar"
            ) {
                return;
            }

            if (newObj.type == "footerNavBar") {
                newIndex = 0;
            } else {
                newIndex = 1;
                for (let i = 0; i < this.pageData.length; i++) {
                    if (this.pageData[i].key === this.selectWg.key) {
                        newIndex += i;
                        break;
                    }
                }
            }
            this.pageData.splice(newIndex, 0, newObj);
            this.hasFootNavBar =
                this.pageData[0].type === "footerNavBar" ? true : false;
            this.$set(this.pageData);
            this.setSelectWg(this.pageData[newIndex]);
        },
        handleSelectWidget(index) {
            this.setSelectWg(this.pageData[index]);
        },
        handleSelectRecord(index) {
            this.setSelectWg(this.pageData[index]);
        },
        deleteAllWidget() {
            var that = this;
            this.$confirm("确定要清空吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.hasFootNavBar = false;
                    that.pageData = [];
                    that.setSelectWg([]);
                })
                .catch(() => {});
        },
        deleteWidget(index) {
            if (this.pageData[0].type == "footerNavBar" && index == 0) {
                this.hasFootNavBar = false;
            }

            if (this.pageData.length - 1 === index) {
                if (index === 0) {
                    this.setSelectWg([]);
                } else {
                    this.setSelectWg(this.pageData[index - 1]);
                }
            } else {
                this.setSelectWg(this.pageData[index + 1]);
            }
            this.$nextTick(() => {
                this.pageData.splice(index, 1);
            });
        },
        handleWidgetDelete(deleteIndex) {
            this.deleteWidget(deleteIndex);
        },
        handleWidgetClone(index) {
            let cloneData = deepClone(this.pageData[index]);
            cloneData.key =
                this.pageData[index].type +
                "_" +
                Date.now() +
                "_" +
                Math.ceil(Math.random() * 1000000);
            this.pageData.splice(index, 0, cloneData);
            this.$nextTick(() => {
                this.setSelectWg(this.pageData[index + 1]);
            });
        },
        handleDragRemove: function(evt) {
            this.setSelectWg({});
        },
        datadragEnd: function(evt) {}
    },
    components: {
        draggable
    }
};
</script>
<style scoped>
@import "./css/style.css";
</style>