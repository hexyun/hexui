<template>
  <div class="mask" v-if="isStepShow">
    <div class="maskTop">
      <div
        class="step"
        v-for="(index,item) in list"
        :key="index"
        :style="position[index]"
        v-show="actNum==index"
      >
        <div class="stepNum">{{item.title}}</div>
        <div class="stepText">{{item.text}}</div>
      </div>
      <div class="next" @click="next">
        <i-button :type="buttonStyle">
          <Icon :type="leftIcon"></Icon>
          {{btnText}}
          <Icon :type="rightIcon"></Icon>
        </i-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 激活的提示栏
      actNum: 0,
      // 按钮文字
      btnText: "",
      // 下一步的文字
      nextText: "下一步",
      // 完成的文字
      finalText: "完成",
      // 左侧图标
      leftIcon: "chevron-left",
      // 右侧图标
      rightIcon: "chevron-right",
      // 按钮样式
      buttonStyle: "primary",
      // 存定位的数组
      position: [],
      // 能否小于0
      isless: true
    };
  },
  // 是否开启,数据列表
  props: ["isStepShow", "list"],
  methods: {
    stepShow() {
      // 初始化默认值
      this.isStepShow = true;
      this.actNum = 0;
      this.btnText = this.nextText;
      // 重置除了第一个以外的所有样式
      for (let i = 1; i < this.list.length; i++) {
        document.querySelector("#" + this.list[i].el).style.zIndex = 0;
        document.querySelector("#" + this.list[i].el).style.position = "auto";
      }
      // 第一个元素设置样式
      var actel = document.querySelector("#" + this.list[0].el);
      actel.style.zIndex = 999;
      actel.style.position = "relative";
    },
    next() {
      // 重置所有样式
      for (let i = 0; i < this.list.length; i++) {
        document.querySelector("#" + this.list[i].el).style.zIndex = 0;
        document.querySelector("#" + this.list[i].el).style.position = "auto";
      }
      // 判断点的是哪个
      switch (this.actNum) {
        // 如果是倒数第二个，下一个的文字变成终结的文字
        case this.list.length - 2:
          this.btnText = this.finalText;
          this.actNum++;
          break;
        // 如果是最后一个，隐藏掉
        case this.list.length - 1:
          this.isStepShow = false;
          break;
        default:
          // 其他的数值+1
          this.actNum++;
          break;
      }
      // 给选定的元素样式
      var actel = document.querySelector("#" + this.list[this.actNum].el);
      actel.style.zIndex = 999;
      actel.style.position = "relative";
    }
  },
  ready() {
    var self = this;
    Vue.nextTick(function() {
      console.log(document.documentElement.offsetHeight);
      // 获取元素距离文档左边和上边的距离
      function getElementLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null) {
          actualLeft += current.offsetLeft;
          current = current.offsetParent;
        }
        return actualLeft;
      }
      function getElementTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }
        return actualTop;
      }
      // 能否小于0
      function isLess(i) {
        if (self.isless) {
          i = i < 0 ? (i = 0) : i + "px";
        }
        return i;
      }
      // 将按钮文字替换成自定义文字
      self.btnText = self.nextText || "下一步";
      // 获取第一个元素
      console.log(self);
      var actel = document.querySelector("#" + self.list[0].el);
      // 给mask设置高度，如果内容不满一屏幕按照一屏高度，如果超过了就按照文档高度
      document.body.scrollHeight < window.innerHeight
        ? (document.querySelector(".mask").style.height =
            window.innerHeight + "px")
        : (document.querySelector(".mask").style.height =
            document.body.offsetHeight + "px");

      // 第一个元素设置样式
      actel.style.zIndex = 999;
      actel.style.position = "relative";
      // 创建一个空数组
      var position = [];
      // 遍历所有的元素
      for (let i = 0; i < self.list.length; i++) {
        // 获取元素
        var actel = document.querySelector("#" + self.list[i].el);
        // 将除了第一个提示以外的提示设置成visibility隐藏来获取宽高
        if (i != 0) {
          document.querySelectorAll(".step")[i].style.visibility = "hidden";
          document.querySelectorAll(".step")[i].style.display = "block";
        }
        // 获取元素距离文档左边和上边的距离
        //let Oleft = getElementLeft(actel);
        //let Otop = getElementTop(actel);
        let Oleft = actel.getBoundingClientRect().left + actel.scrollTop;
        let Otop = actel.getBoundingClientRect().top + actel.scrollLeft;
        // 获取提示框的宽度高度
        let OWidth = document.querySelectorAll(".step")[i].offsetWidth;
        let OHeight = document.querySelectorAll(".step")[i].offsetHeight;
        // 获取元素的宽度和高度
        let OelWidth = actel.offsetWidth;
        let OelHeight = actel.offsetHeight;
        // 获取偏移值
        let Osize = self.list[i].size;
        console.log(
          i +
            "方向" +
            self.list[i].position +
            "左" +
            Oleft +
            "上" +
            Otop +
            "宽" +
            OWidth +
            "高" +
            Otop +
            "元素宽" +
            OelWidth +
            "元素高" +
            OelHeight +
            "偏移值" +
            Osize
        );
        // 根据元素里的定位决定提示框的位置
        let fLeft = 0;
        let fTop = 0;
        switch (self.list[i].position) {
          case "left":
            fLeft = isLess(Oleft - OWidth - Osize);
            fTop = Otop + "px";
            break;
          case "top":
            fLeft = Oleft + "px";
            fTop = isLess(Otop - OHeight - Osize);
            break;
          case "bottom":
            fLeft = Oleft + "px";
            fTop = isLess(Otop + OelHeight + Osize);
            break;
          default:
            fLeft = isLess(Oleft + OelWidth + Osize);
            fTop = Otop + "px";
            break;
        }
        position.push({
          left: fLeft,
          top: fTop
        });
        // 获取后改回原来的样式
        if (i != 0) {
          document.querySelectorAll(".step")[i].style.visibility = "";
          document.querySelectorAll(".step")[i].style.display = "none";
        }
      }
      // 赋值
      self.position = position;
    });
  }
};
</script>
<style lang='less' scope>
.mask {
  position: absolute;
  z-index: 998;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  .maskTop {
    width: 100%;
    height: 100%;
  }
  .step {
    display: inline-block;
    position: absolute;
  }
  .next {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>