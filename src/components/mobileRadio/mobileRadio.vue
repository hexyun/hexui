<template>
  <div class="hex-mobile-radio">
    <div class="radio" @click.prevent="show = true">
      <div class="star" v-if="must">*</div>
      <div class="icon" v-if="icon" :style="{'backgroundImage': `url(${tIcon})`}"></div>
      <div class="name">{{title}}</div>
      <div class="text">{{text}}</div>
      <div class="rightIcon">
        <img class="img" src="../../../assets/jiantou.png" alt="">
      </div>
    </div>
    <div class="radioBottom" v-if="show">
      <div class="bottomTop">
        <div @click="cancelSelect">取消</div>
        <div @click="enter">确定</div>
      </div>
      <div class="dataList" v-for="item in dataList">
        <div>{{item.key}}</div>
        <div></div>
      </div>
    </div>
    <div class="modal" v-if="show" @click="cancelSelect"></div>
  </div>
</template>

<script>
export default {
  props: {
    must: {
      type: Boolean,
      default: false
    },
    icon: Boolean,
    tIcon: String,
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
  },
  methods: {
    cancelSelect () {
      this.show = false;
    },
  },
  computed: {
  }
};
</script>

<style lang="less" scoped>
.hex-mobile-radio {
  background: #fff;
  margin-top: 6pt;
  .radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 50pt;
  position: relative;
  .star {
    color: #E64340;
    font-size: 16pt;
  }
  .name {
    color: #333333;
    font-size: 16pt;
  }
  .text {
    color: #999999;
    font-size: 16pt;
    margin-left: 20pt;
  }
  .icon {
    width: 22pt;
    height: 22pt;
    line-height:22pt;
  }
  .rightIcon {
    width: 22pt;
    height: 22pt;
    line-height:22pt;
    position: absolute;
    right: 12pt;
    .img {
      width: 22pt;
      height: 22pt;
    }
  }
}
.modal {
    background: #000000;
    opacity: 0.6;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 100;
}
.radioBottom {
  position: fixed;
  width: 100%;
  height: 40vh;
  background: #fff;
  bottom: 0;
  z-index: 1000;
  border-radius: 4pt 4pt 0 0;
  transform: translateY(0,40vh,2);
  .bottomTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16pt;
    height: 44pt;
    line-height:44pt;
    padding: 0 18pt;
  }
  .dataList {
    display: flex;
    flex-direction: column;
    padding: 0 18pt;
    font-size: 16pt;
  }
}
}
</style>