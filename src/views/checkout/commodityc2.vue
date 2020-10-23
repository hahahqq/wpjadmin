<template>
  <div>
    <el-table
      ref="singleTable"
      class="table"
      :data="tableData"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      @row-click="clickEvent"
      @selection-change="handleSelectionChange"
      >
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="index"
        :property="item.englishName"
        :label="item.columnName"
        :min-width="item.width"
        >
        <template slot-scope="scope">
          {{scope.row[item.englishName] ? scope.row[item.englishName] : '-'}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          'code': '100001',
          'name': '张一',
          'age': 11,
          'grade': '高一'
        },
        {
          'code': '100002',
          'name': '张二',
          'age': 12,
          'grade': '高二'
        },
        {
          'code': '100003',
          'name': '张三',
          'age': 13,
          'grade': '高三'
        },

      ],
      tableColumn: [ // 表格显示的都是哪些列
        {englishName: 'code', columnName: '编号', width: '70'},
        {englishName: 'name', columnName: '姓名', width: '70'},
        {englishName: 'age', columnName: '年龄', width: '70'},
        {englishName: 'grade', columnName: '年级', width: '70'},
      ],
      selectedRow: [], // 当前已选择行
      selectedIndex: 0, // 当前选择行的index
    }
  },
  mounted() {
   //  addEventListener('keyup', this.keyUp)

   let that = this
    document.onkeydown = function(e){
     // 表格为空，不执行下方
      if (that.tableData.length == 0) return

      if (window.event.keyCode == 40) { // 下键

      console.log(that.tableData.length)
        let refsElTable = that.$refs.singleTable
        that.$nextTick(() => {
          if (that.selectedRow.length == 0) { // 如果当前没有选中行，则直接选中第一个
            that.selectedIndex = 0
          } else if (that.selectedIndex == that.tableData.length - 1) { // 如果选中的是最后一行了，那么下一行选中的是第一行
            that.selectedIndex = 0
          } else { // 正常递增
            that.selectedIndex++
          }
          if (!refsElTable) return
          let findRow = that.selectedRow.find(c => c.rowIndex == that.selectedIndex); //找出当前选中行
          //如果只有一行且点击的也是这一行则取消选择 否则清空再选中当前点击行
          if (findRow && that.selectedRow.length === 1) {
            refsElTable.toggleRowSelection(that.tableData[that.selectedIndex], false);
            return;
          }
          refsElTable.clearSelection();
          refsElTable.toggleRowSelection(that.tableData[that.selectedIndex]); // 把现在当前行勾选
        })
      } else if (window.event.keyCode == 38) { // 上键
        let refsElTable = that.$refs.singleTableleft
        that.$nextTick(() => {
          if (that.selectedRow.length == 0) { // 当前没有选中行，则直接选中第一个
            that.selectedIndex = 0
          } else if (that.selectedIndex == 0) { // 如果选中的是第一行了，那么下一行选中的是最后一行
            that.selectedIndex = that.tableData.length - 1
          } else { // 正常递减
            that.selectedIndex--
          }
          if (!refsElTable) return
          let findRow = that.selectedRow.find(c => c.rowIndex == that.selectedIndex); //找出当前选中行
          //如果只有一行且点击的也是这一行则取消选择 否则清空再选中当前点击行
          if (findRow && that.selectedRow.length === 1) {
            refsElTable.toggleRowSelection(that.tableData[that.selectedIndex], false);
            return;
          }
          refsElTable.clearSelection();
          refsElTable.toggleRowSelection(that.tableData[that.selectedIndex]); // 把现在当前行勾选
        })
      }
    }


  },
  beforeDestroy() {
   //  removeEventListener('keyup', this.keyUp)
  },
  methods: {
    // 表格方法
    rowClassName({ row, rowIndex }) {
      let rowName = "",
        findRow = this.selectedRow.find(c => c.rowIndex === row.rowIndex);
      if (findRow) {
        rowName = "rowStyle "; // 可以通过此处给选中行一个class，根据自己需求更改样式
      }
      return rowName; //也可以再加上其他类名 如果有需求的话
    },
    rowStyle({ row, rowIndex }) {
      Object.defineProperty(row, "rowIndex", { // 给每行添加不可枚举属性rowIndex来标识当前行
        value: rowIndex,
        writable: true,
        enumerable: false
      });
    },
    clickEvent(row, column, event, params) {
      let refsElTable = this.$refs.singleTable; // 获取表格对象
      let findRow = {}
      findRow = this.selectedRow.find(c => c.rowIndex == row.rowIndex); //找出当前选中行
      //如果只有一行且点击的也是这一行则取消选择 否则清空再选中当前点击行
      if (findRow && this.selectedRow.length === 1) {
        refsElTable.toggleRowSelection(row, false);
        return;
      }
      refsElTable.clearSelection();
      refsElTable.toggleRowSelection(row);
    },
    handleSelectionChange(rows) {
      this.selectedRow = rows; // 保存已选择行
    },
  }
}
</script>

<style>

</style>
