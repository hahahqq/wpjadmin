<template>
    <div>
        <el-row>
            <el-col :span="2">
                <el-button size="small" type="info" icon="el-icon-close" @click="stopOrUseGoods(0)">停用</el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="small" type="success" icon="el-icon-check" @click="stopOrUseGoods(1)">启用</el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="small" type="danger" icon="el-icon-delete" @click="stopOrUseGoods(2)">删除</el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="small" type="primary" icon="el-icon-edit" @click="showDialogFun">修改</el-button>
            </el-col>
        </el-row>

        <el-row class="m-top-md" :gutter="10">
            <el-col :span="8">
                品 牌：
                <el-select v-model="choseBrandList" multiple collapse-tags clearable placeholder="请选择品牌" size="small">
                    <el-option v-for='(item, index) in brandList' :key="index" :label='item.NAME' :value="item.NAME"></el-option>
                </el-select>
            </el-col>

            <el-col :span="8">
                类 别：
                <el-select v-model="choseTypeList" multiple collapse-tags clearable placeholder="请选择类别" size="small">
                    <el-option v-for='(item, index) in categoryList' :key="index" :label='item.NAME' :value="item.ID"></el-option>
                </el-select>
            </el-col>

            <el-col :span="8">
                年 份：
                <el-select v-model="choseYearList" multiple collapse-tags clearable placeholder="请选择年份" size="small">
                    <el-option v-for='(item, index) in PyearArr1' :key="index" :label='item' :value="item"></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row class="m-top-md" :gutter="10">
            <el-col :span="8">
                季 节：
                <el-select v-model="choseSeasonList" multiple collapse-tags clearable placeholder="请选择季节" size="small">
                    <el-option v-for='(item, index) in Season' :key="index" :label='item' :value="item"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                状 态：
                <el-select v-model="choseStatusList" clearable placeholder="请选择状态" size="small">
                    <el-option v-for='(item, index) in statusList' :key="index" :label='item' :value="item"></el-option>
                </el-select>
            </el-col>

            <el-col :span="8">
                <el-input size="small" style="width:180px" v-model="Filter" prefix-icon="el-icon-search" placeholder="请输入商品编码/名称"></el-input>
                <el-button size="small" type="primary" @click="searchDataFun">搜索</el-button>
            </el-col>
        </el-row>

        <div class="checkboxStyle" style="margin-top:10px">
            <el-table
                border size='small'
                :data="pagelist1"
                ref="multipleTable1"
                v-loading="loading"
                element-loading-text="数据加载中..."
                height="380"
                @selection-change="handleSelectionChange"
                :row-key="getRowKeys"
                style="width: 100%;"
            >
                <el-table-column type="selection" width="40" :reserve-selection="true" fixed="left"></el-table-column>
                <el-table-column label="商品名称" sortable fixed='left' width="160">
                <template slot-scope="scope">
                    <img :src="scope.row.IMGURL" alt="" style='float:left; border-radius:10px; width:40px; height:40px; margin-right:8px'>
                    <span style='line-height:40px'>{{scope.row.NAME}}</span>
                </template>
                </el-table-column>
                <el-table-column prop="CODE" align="center" label="货号"></el-table-column>
                <el-table-column prop="BRAND" align='center' label="品牌"></el-table-column>
                <el-table-column prop="TYPENAME" align="center" label="分类"></el-table-column>
                <el-table-column prop='PYEAR' align="center" label="年份" width="50"></el-table-column>
                <el-table-column prop="SEASON" align="center" label="季节" width="60"></el-table-column>
                <el-table-column prop="UNITNAME" align="center" label="单位" width="50"></el-table-column>
                <el-table-column prop='LONGCOLORNAME' align='center' label="颜色" show-overflow-tooltip min-width="110"></el-table-column>
                <el-table-column prop='LONGSIZENAME' align='center' label='尺码' show-overflow-tooltip min-width="110"></el-table-column>
                <el-table-column prop='PRICE' align='center' label="零售价" width="70"></el-table-column>
                <el-table-column prop='PURPRICE' align='center' label="采购价" width="70">
                <template slot-scope='scope'>
                    {{isPurViewFun(91040112) ? scope.row.PURPRICE : '****'}}
                </template>
                </el-table-column>
                <el-table-column prop='STOCKQTY' align='center' label="库存" width="70"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
                background
                @size-change="handlePageChange"
                @current-change="handlePageChange"
                :current-page.sync="pagination1.PN"
                :page-size="pagination1.PageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagination1.TotalNumber"
                class="text-center"
            ></el-pagination>
        </div>

        <el-dialog :visible.sync="showEditDialog" width="500px" append-to-body title='批量修改'>
            <el-row :gutter="10">
                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style='width: 80px' v-model="isType">分 类</el-checkbox>
                    <el-select style="width: 260px" v-if="isType" v-model="editItem.TypeId" clearable placeholder="请选择分类" size="small">
                        <el-option v-for='(item, index) in categoryList' :key="index" :label='item.NAME' :value="item.ID"></el-option>
                    </el-select>
                </el-col>
    
                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style='width: 80px' v-model="isSupplier">供应商</el-checkbox>
                    <el-select style="width: 260px" v-if="isSupplier" v-model="editItem.SupperId" clearable placeholder="请选择供应商" size="small">
                        <el-option v-for='(item, index) in supplierList' :key="index" :label='item.NAME' :value="item.ID"></el-option>
                    </el-select>
                </el-col>
                
                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style='width: 80px' v-model="isBrand">品 牌</el-checkbox>
                    <el-select style="width: 260px" v-if="isBrand" v-model="editItem.Brand"  @change='getBrandId(editItem.Brand)' clearable placeholder="请选择品牌" size="small">
                        <el-option v-for='(item, index) in brandList' :key="index" :label='item.NAME' :value="item.NAME"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style='width: 80px' v-model="isYear">年份</el-checkbox>
                    <el-select style="width: 260px" v-if="isYear" v-model="editItem.Pyear" clearable placeholder="请选择年份" size="small">
                        <el-option v-for='(item, index) in PyearArr1' :key="index" :label='item' :value="item"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style='width: 80px' v-model="isSeason">季节</el-checkbox>
                    <el-select style="width: 260px" v-if="isSeason" v-model="editItem.Season" clearable placeholder="请选择季节" size="small">
                        <el-option v-for='(item, index) in Season' :key="index" :label='item' :value="item"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style='width: 80px' v-model="isUnit">单位</el-checkbox>
                    <el-select style="width: 260px" v-if="isUnit" v-model="editItem.UnitId" clearable placeholder="请选择单位" size="small">
                        <el-option v-for='(item, index) in unitList' :key="index" :label='item.NAME' :value="item.ID"></el-option>
                    </el-select>
                </el-col>


                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style="width: 80px" v-model="isMaterial">材质</el-checkbox>
                    <el-select style="width: 260px" v-if="isMaterial" allow-create filterable v-model="editItem.Material" :loading="loadingGroup" size='small' placeholder="请选择材质" @click.native="getattributeStatus(6)" class="full-width">
                        <el-option size='small' v-for="(item,i) in PyearArr6" :key="i" :label="item.NAMELIST" :value="item.NAMELIST"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style="width: 80px" v-model="isStyle">风格</el-checkbox>
                    <el-select style="width: 260px" v-if="isStyle" allow-create filterable v-model="editItem.Style" :loading="loadingGroup" size='small' placeholder="请选择风格" @click.native="getattributeStatus(7)" class="full-width">
                        <el-option size='small' v-for="(item,i) in PyearArr7" :key="i" :label="item.NAMELIST" :value="item.NAMELIST"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="24" class='paddingTB-sm border-bottom1'>
                    <el-checkbox style="width: 80px" v-model="isStyle1">款式</el-checkbox>
                    <el-select style="width: 260px" v-if="isStyle1" allow-create filterable v-model="editItem.Style1" :loading="loadingGroup" size='small' placeholder="请选择款式" @click.native="getattributeStatus(8)" class="full-width">
                        <el-option size='small' v-for="(item,i) in PyearArr8" :key="i" :label="item.NAMELIST" :value="item.NAMELIST"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="24" class='paddingTB-sm border-bottom1'>   
                    <el-checkbox style="width: 80px" v-model="isProvenance">产地</el-checkbox>
                    <el-select style="width: 260px" v-if="isProvenance" allow-create filterable v-model="editItem.Provenance" :loading="loadingGroup" size='small' placeholder="请选择产地" @click.native="getattributeStatus(9)" class="full-width">
                        <el-option size="small" v-for="(item,i) in PyearArr9" :key="i" :label="item.NAMELIST" :value="item.NAMELIST"></el-option>
                    </el-select>
                </el-col>

            </el-row>

            <el-row :gutter="10">
                <el-col :span="24" class="text-center">
                    <el-button type="primary" @click="submitBtn">确 定</el-button>
                    <el-button @click="cancelBtn">取 消</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import dayjs from 'dayjs'
    import Vue from 'vue';
    let _ = require("lodash"); 
    export default {
        data(){
            return {
                loading: false,
                loadingGroup: false,
                showEditDialog: false,
                pagelist1:[],
                pagination1: {
                    TotalNumber: 0,
                    PageNumber: 0,
                    PageSize: 20,
                    PN: 0
                },
                PN : 1,
                Filter: '',
                editItem:{
                    GoodsId: '',
                    UnitId: '',
                    TypeId: '',
                    SupperId: '',
                    Status: 0,
                    Brand: '',
                    Pyear: '',
                    Season: '',
                    Material: '',
                    Style: '',
                    Provenance: '',
                    IsDel: 0,
                    BrandId: ''
                },
                choseBrandList:[],
                choseTypeList:[],
                choseYearList:[],
                choseSeasonList:[],
                choseStatusList:'',

                choseBrandList1:[],
                choseTypeList1:[],
                multipleSelection: [],
                getRowKeys(row){
                    return row.ID
                },
                statusList:['启用','停用'],
                Season:[ '春', '夏', '秋' , '冬' ],
                PyearArr1:[
                    dayjs().year(), dayjs().year() -1, dayjs().year() -2, dayjs().year() -3, dayjs().year() -4, dayjs().year() -5, dayjs().year() -6
                ],
                isType: false,
                isSupplier:false,
                isBrand: false,
                isYear: false,
                isSeason: false,
                isUnit: false,
                isUnit: false,
                isStyle1: false,
                isStyle: false,
                isMaterial: false,
                isProvenance: false,
                PyearArr6: [],
                PyearArr7: [],
                PyearArr8: [],
                PyearArr9: []
            }
        },
        computed: {
            ...mapGetters({
                dataListState1: "goodsListEditGroupState",
                supplierList:"goodssupplierList",
                categoryList: "categoryList",
                brandList:"goodsbrandList",
                unitList: "unitList",
                editGroupState:'editGroupGoodsState'
            })
        },
        watch:{
            editGroupState(data){
                this.loading = false
                if(data.success){
                    this.getNewData()
                    this.showEditDialog = false
                    this.multipleSelection = []
                    this.$refs.multipleTable1.clearSelection();
                    if(this.editItem.IsDel == 1){
                        this.$message.success('删除成功 ！')
                    }else{
                        this.$message.success('修改成功 ！')
                    }
                }else{
                    this.$message.error(data.message)
                }
            },
            dataListState1(data) {
                this.loading = false
                if(data.success){
                    let arr = data.data.PageData
                    this.pagelist1 = arr.DataArr
                    this.pagination1 = {
                        PN: arr.PN,
                        PageNumber: arr.PageNumber,
                        PageSize: arr.PageSize,
                        TotalNumber: arr.TotalNumber
                    }

                }else{
                    this.$message.error(data.message)
                }
            }
        },
        methods:{
            getBrandId(name){
                let BrandObj = this.editItem.filter(item => item.NAME == name)
                this.editItem.BrandId = BrandObj[0].ID
            },
            searchDataFun(){
                this.PN = 1
                this.getNewData()
            },
            choseBrandFun(){
                let list = this.choseBrandList1
                let noAll = list.filter(item => item == '全部')
                if(noAll.length == 1 && list.length > 1){
                    this.choseBrandList1.splice(0,1)
                }
            },
            choseTypeFun(){
                let noAll = this.choseTypeList1.filter(item => item == '全部')
                let allData = this.categoryList.map(item => item.NAME)
                if(noAll.length == 1){
                    this.choseTypeList1 = allData.unshift('全部')
                }
            },
            handleSelectionChange(rows) {
                this.multipleSelection = []
                if (rows) {
                    rows.forEach(row => {
                        if (row) {
                            this.multipleSelection.push(row);
                        }
                    })
                }
            },
            stopOrUseGoods(value){
                if(this.multipleSelection.length != 0){
                    let state = value == 0 ? '停用' : value == 1 ? '启用' : '删除'
                    let isDel = value == 2 ? '删除后不可恢复 !' : ''
                    let info = "共选择 " + this.multipleSelection.length + " 条数据 ," + "确认"+ state + "选择的商品 ? " + isDel
                    this.$confirm(info, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        let list = this.multipleSelection.map(item => item.ID), listString = ''
                        for(var i in list){
                            listString += "'" +  list[i] + "'" + ','
                        }
                        if(listString.length>0){  //去掉最后一个逗号
                            listString = listString.substring(0,listString.length-1);
                        }
                        this.editItem.GoodsId = listString

                        this.editItem.Status = value == 0 ? 2 : 1   // 1=启用,2=停用
                        if(value == 2){
                            this.editItem.IsDel = 1
                        }

                        this.$store.dispatch('editGroupInfo', this.editItem)
                        
                    }).catch(()=>{})
                }else{
                    this.$message('请先勾选需要操作的商品')
                }
            },
            showDialogFun(){
                if(this.multipleSelection.length != 0){
                    this.isType = false
                    this.isSupplier = false
                    this.isBrand = false
                    this.isYear = false
                    this.isSeason = false
                    this.isUnit = false
                    this.isUnit = false
                    this.isStyle1 = false
                    this.isStyle = false
                    this.isMaterial = false
                    this.isProvenance = false

                    this.showEditDialog = true
                }else{
                    this.$message('请先勾选需要修改的商品')
                }
            },
            submitBtn(){
                let list = this.multipleSelection.map(item => item.ID), listString = ''
                for(var i in list){
                    listString += "'" +  list[i] + "'" + ','
                }
                if(listString.length>0){  //去掉最后一个逗号
                    listString = listString.substring(0,listString.length-1);
                }
                this.editItem.GoodsId = listString

                this.editItem.IsDel = 0
                this.editItem.Status = 0   // 1=启用,2=停用  , 0 商品原状态
                this.$store.dispatch('editGroupInfo', this.editItem)
            },
            cancelBtn(){
                this.isType = false
                this.isSupplier = false
                this.isBrand = false
                this.isYear = false
                this.isSeason = false
                this.isUnit = false
                this.isUnit = false
                this.isStyle1 = false
                this.isStyle = false
                this.isMaterial = false
                this.isProvenance = false

                this.showEditDialog = false
            
            },
            handlePageChange: function(currentPage) {
                if (this.PN == currentPage || this.loading) {
                    return;
                }
                this.PN = parseInt(currentPage);
                this.getNewData();
            },
            getNewData() {
                let year = '', season = '', type = '', brand = ''
                if(this.choseYearList.length != 0){
                    for(var i in this.choseYearList){
                        year += "'" + this.choseYearList[i] + "',"
                    }
                    if(year.length>0){  //去掉最后一个逗号
                        year = year.substring(0,year.length-1)
                    }
                }

                if(this.choseSeasonList.length != 0){
                    for(var i in this.choseSeasonList){
                        season += "'" + this.choseSeasonList[i] + "',"
                    }
                    if(season.length>0){  //去掉最后一个逗号
                        season = season.substring(0,season.length-1)
                    }
                }

                if(this.choseTypeList.length != 0){
                    for(var i in this.choseTypeList){
                        type +=  "'" + this.choseTypeList[i] + "',"
                    }
                    if(type.length>0){  //去掉最后一个逗号
                        type = type.substring(0,type.length-1)
                    }
                }

                if(this.choseBrandList.length != 0){
                    for(var i in this.choseBrandList){
                        brand +=  "'" + this.choseBrandList[i] + "',"
                    }
                    if(brand.length>0){  //去掉最后一个逗号
                        brand = brand.substring(0,brand.length-1)
                    }
                }

                let sendData = {
                    Filter: this.Filter,
                    Status: this.choseStatusList == '启用' ? 1 : this.choseStatusList == '停用' ? 0 : -1,
                    BrandList: brand,
                    YearList: year,
                    SeasonList: season,
                    PN : this.PN,
                    TypeList: type,
                }
                this.$store.dispatch("getGoodsListEditGroup", sendData).then(() =>{
                    this.loading = true
                })


            }
        },
        mounted() {
            this.getNewData()

            // let list1 = this.$store.state.category.categoryList;
            // let list2 = this.$store.state.goods.goodssupplierList;
            // let list3 = this.$store.state.goods.goodsbrandList;
            // let list4 = this.$store.state.unit.unitList;

            // if (list1.length == 0) {
                // this.$store.dispatch("getCategoryList",{});
            // }
            // if (list2.length == 0) {
                // this.$store.dispatch("getGoodssupplierList",{})
            // }
            // if (list3.length == 0) {
                // this.$store.dispatch("getGoodsbrandList",{})
            // }
            // if (list4.length == 0) {
                // this.$store.dispatch("getUnitList", {})
            // }

        },
        beforeCreate() {
            this.$store.dispatch("getUnitList", {})
            this.$store.dispatch("getCategoryList",{})
            this.$store.dispatch("getGoodsbrandList",{})
            this.$store.dispatch("getGoodssupplierList",{})
        },
    }
</script>
