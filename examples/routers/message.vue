<template>
  <div>
    <i-button @click="confirm" id="btn1">标准</i-button>
    <i-button @click="custom" id="btn2">自定义按钮文字</i-button>
    <i-button @click="async" id="btn3">异步关闭</i-button>
    <i-button @click="stepShow" id="btn4">打开步骤指引</i-button>
    <Step :is-step-show="isStepShow" :list="list" v-ref:step></Step>
  </div>
</template>
<script>
import { Step } from "hexui";
export default {
  components: { Step },
  data() {
    return {
      isStepShow: true,
      list: [
        {
          title: "步骤一",
          text: "这是第一个步骤的提示文字",
          el: "btn1",
          position: "right",
          size: 10
        },
        {
          title: "步骤二",
          text: "这是第二个步骤的提示文字",
          el: "btn2",
          position: "top",
          size: 10
        },
        {
          title: "步骤三",
          text: "这是第三个步骤的提示文字",
          el: "btn3",
          position: "bottom",
          size: 10
        },
        {
          title: "步骤四",
          text: "这是第四个步骤的提示文字",
          el: "btn4",
          position: "left",
          size: 1000
        }
      ]
    };
  },
  methods: {
    stepShow() {
      this.$refs.step.stepShow();
    },
    confirm() {
      this.$Modal.confirm({
        title: "确认对话框标题",
        content: "<p>一些对话框内容</p><p>一些对话框内容</p>",
        onOk: () => {
          this.$Message.info("点击了确定");
        },
        onCancel: () => {
          this.$Message.info("点击了取消");
        }
      });
    },
    custom() {
      this.$Modal.confirm({
        title: "确认对话框标题",
        content: "<p>一些对话框内容</p><p>一些对话框内容</p>",
        okText: "OK",
        cancelText: "Cancel"
      });
    },
    async() {
      this.$Modal.confirm({
        title: "确认对话框标题",
        content: "<p>对话框将在 2秒 后关闭</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("异步关闭了对话框");
          }, 2000);
        }
      });
    }
  }
};
</script>
