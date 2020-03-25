<template>
  <div class="mobile-date">
    <div class="content">
      <div class="title">
        <span class="must" v-if="must">*</span>
        <Icon type="ios-calendar-outline" v-if="tIcon"></Icon>
        <span class="text">{{ title }}</span>
      </div>
      <div class="context" :style="{'text-align': textAlign}" @click="show = true">
        <template v-if="value">
          <span class="date">{{ date }}</span>
          <Icon class="icon clear"
            type="close-circled" 
            @click="clear">
          </Icon>
        </template>
        <template v-else>
          <span class="no-date">{{ placeholder }}</span>
          <Icon class="icon" type="ios-arrow-right"></Icon>
        </template>
      </div>
    </div>
    <date-picker v-if="show" @close="show = false" @finish="finish" :prefab="date"></date-picker>
    <div class="baffle" v-if="show"></div>
  </div>
</template>

<script>
import DatePicker from './DatePicker';
import Icon from "../icon/icon.vue";
export default {
  components: {
    DatePicker,
    Icon
  },
  props: {
    must: {
      type: Boolean,
      default: true
    },
    tIcon: {
      type: Boolean,
      default: true
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number, Date]
    }
  },
  data() {
    return {
      title: "标题",
      date: "",
      show: true
    }
  },
  methods: {
    clear() {
      this.value = "";
    },
    finish(date) {
      if(!date) return
      this.date = date
      this.value = new Date(date)
      console.log('选中的时间', this.value, date)
      this.show = false;
    }
  }
}
</script>

<style lang="less" scoped>
.FS {
  font-size: 16pt;
}
.mobile-date {
  padding: 0 12pt 0 18pt;
  align-items: center;
  .FS;
  display: flex;
  .content {
    width: 100vh;
    display: flex;
    .title {
      margin-right: 20pt;
      position: relative;
      .must {
        color: red;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -12pt;
      }
    }
    .context {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        color: rgba(0, 0, 0, 0.22)
      }
      .no-date {
        color: #999999;
      }
    }
  }

  .baffle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.22);
    z-index: 100;
  }
  
}
</style>