<template>
  <div class="vue-dropdown default-theme">
    <div
      class="cur-name"
      :class="isShow ? 'show' : ''"
      style="float: left; width: 84%; border: 1px solid #ccc; height: 40px"
      @click="isShow = !isShow"
    >
      {{ name }}
    </div>
    <span class="addactive"><i class="el-icon-plus"></i></span>

    <div class="list-and-search" :class="isShow ? 'on' : ''" v-if="datalist.length">
      <div class="search-module clearfix" v-show="isNeedSearch">
        <input class="search-text" @keyup="search($event)" :placeholder="placeholder" />
      </div>
      <ul class="list-module">
        <li v-for="(item, index) in datalist" @click="selectToggle(item)" :key="index">
          <span class="list-item-text">{{ item.NAME }}</span>
        </li>
      </ul>
      <!-- <div class="tip-nodata" v-show="isNeedSearch && datalist.length == 0">{{nodatatext}}</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "请选择",
      datalist: [],
      isShow: false
    };
  },
  props: {
    itemlist: Array, //父组件传来的数据
    placeholder: {
      type: String,
      default: "搜索" //input placeholder的默认值
    },
    isNeedSearch: {
      //是否需要搜索框
      type: Boolean,
      default: true
    },
    nodatatext: {
      type: String,
      default: "未找到结果" //没有搜索到时的文本提示
    }
  },
  mounted() {
    this.datalist = this.itemlist;
    //点击组件以外的地方，收起
    document.addEventListener(
      "click",
      (e) => {
        if (!this.$el.contains(e.target)) {
          this.isShow = false;
        }
      },
      false
    );
  },
  methods: {
    selectToggle(data) {
      this.itemlist.cur.name = data.NAME;
      this.isShow = false;
      this.$emit("item-click", data);
    },
    search(e) {
      let searchvalue = e.currentTarget.value;
      this.datalist = this.itemlist.data.filter((item, index, arr) => {
        return item.name.indexOf(searchvalue) != -1;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.list-and-search {
  background: #fff;
  border: 1px solid #ccc;
  display: none;
  z-index: 9999999;
  position: absolute;
  left: 0;
  right: 0;

  &.on {
    display: block;
  }
}

.cur-name {
  text-indent: 10px;
  position: relative;
  color: #777;

  &.show {
    &:after {
      right: 9px;
      top: 6px;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #7b7b7b;
      border-left: 6px solid transparent;
      border-top: 6px solid transparent;
    }
  }
}

.vue-dropdown.default-theme {
  border-radius: 3px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  position: relative;

  &._self-show {
    display: block !important;
  }

  .search-module {
    position: relative;
    border-bottom: 1px solid #ccc;

    .search-text {
      width: 100%;
      height: 30px;
      text-indent: 10px;
      // border-radius: 0.5em;
      box-shadow: none;
      outline: none;
      border: none;
      // &:focus {
      // border-color: #2198f2;
      // }
    }

    .search-icon {
      position: absolute;
      top: 24%;
      right: 0.5em;
      color: #aaa;
    }
  }

  input::-webkit-input-placeholder {
    font-size: 14px;
  }

  .list-module {
    max-height: 200px;
    overflow-y: auto;

    li {
      &._self-hide {
        display: none;
      }

      margin-top: 0.4em;
      padding: 0.4em;

      &:hover {
        cursor: pointer;
        color: #fff;
        background: #00a0e9;
      }
    }
  }
}

.tip-nodata {
  font-size: 14px;
  padding: 10px 0;
  text-indent: 10px;
}
.addactive {
  height: 40px;
  width: 16%;
  background: #1565defc;
  color: #fff;
  text-align: center;
  display: flex;
  background-color: #2196f3;
  justify-content: center;
  align-items: center;
}
</style>
