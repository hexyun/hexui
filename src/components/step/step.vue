<template>
  <div class="mask" v-show="isStepShow">
    <Icon type="ios-close-outline" class='close' @click="close"></Icon>
    <div class="maskTop">
      <div
        class="step"
        v-for="(index,item) in list"
        :key="index"
        :style="position[index]"
        v-show="actNum==index"
        :class='{"act":actNum==index}'
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
import { setTimeout } from 'timers';
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
      isless: true,
      // 存储需要移动的scroll的值
      scrollT:[]
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
      // 重置第一个元素的滚动条位置
      document.documentElement.scrollTo(0,this.scrollT[0])
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
      // 滚动到相应的位置
      document.documentElement.scrollTo(0,this.scrollT[this.actNum])
    },
    close:function(){
       this.isStepShow = false;
    }
  },
  ready() {
    var self = this;
    var step=document.querySelectorAll(".step");
    var mask=document.querySelector(".mask");
    this.$nextTick(function() {
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
          i = i < 0 ? (i = 0) : i;
        }
        return i;
      }
      // 将按钮文字替换成自定义文字
      self.btnText = self.nextText || "下一步";
      // 获取第一个元素
      var actel = document.querySelector("#" + self.list[0].el);
      // 给mask设置高度，如果内容不满一屏幕按照一屏高度，如果超过了就按照文档高度
      document.body.scrollHeight < window.innerHeight
        ? (mask.style.height =
            window.innerHeight + "px")
        : (mask.style.height =
            document.body.offsetHeight + "px");

      // 第一个元素设置样式
      actel.style.zIndex = 999;
      actel.style.position = "relative";
      // 创建一个空数组存储定位
      var position = [];
      // 创建一个空数组存储top值
      var st=[];
      // 遍历所有的元素
      for (let i = 0; i < self.list.length; i++) {
        // 获取元素
        var actel = document.querySelector("#" + self.list[i].el);
        // 将除了第一个提示以外的提示设置成visibility隐藏来获取宽高
        if (i != 0) {
          step[i].style.visibility = "hidden";
          step[i].style.display = "block";
        }
        // 获取元素距离文档左边和上边的距离
        let Oleft = getElementLeft(actel);
        let Otop = getElementTop(actel);
        // 获取提示框的宽度高度
        let OWidth = step[i].offsetWidth;
        let OHeight = step[i].offsetHeight;
        // 获取元素的宽度和高度
        let OelWidth = actel.offsetWidth;
        let OelHeight = actel.offsetHeight;
        // 获取偏移值
        let Osize = self.list[i].size;
        // 获取元素高度和提示框高度哪个大
        let whichOne=OHeight>OelHeight?OHeight:OelHeight;
        console.log(
          i +
            " 方向" +
            self.list[i].position +
            " 左" +
            Oleft +
            " 上" +
            Otop +
            " 宽" +
            OWidth +
            " 高" +
            OHeight +
            " 元素宽" +
            OelWidth +
            " 元素高" +
            OelHeight +
            " 偏移值" +
            Osize+
            "比较大的尺寸"+
            whichOne
        );
        // 根据元素里的定位决定提示框的位置
        let fLeft = 0;
        let fTop = 0;
        switch (self.list[i].position) {
          case "left":
            fLeft = isLess(Oleft - OWidth - Osize);
            fTop = Otop ;
            // 提示框在左边的情况下，滚动条的值=最终定位的高度+提示框和元素中比较高的高度的一半-屏幕高度的一半
            fTop+whichOne/2>window.innerHeight/2?st.push(fTop+whichOne/2-window.innerHeight/2):st.push(0);
            break;
          case "top":
            fLeft = Oleft ;
            fTop = isLess(Otop - OHeight - Osize);
            //提示框在上的情况下，判断最终定位的左上角+(元素的高度+提示框的高度)/2是否大于屏幕的高度/2
            //滚动条的值等于元素的左上角加上元素高度/2-屏幕高度的一半
            fTop+(OelHeight+OHeight)/2>window.innerHeight/2?st.push(fTop+(OelHeight+OHeight)/2-window.innerHeight/2):st.push(0);
            break;
          case "bottom":
            fLeft = Oleft;
            fTop = isLess(Otop + OelHeight + Osize);
            // 提示框在下面的情况下，判断元素定位的高度加上（提示框的高度+元素的高度）/2
            Otop+(OHeight+OelHeight)/2>window.innerHeight/2?st.push(Otop+(OHeight+OelHeight)/2-window.innerHeight/2):st.push(0);
            break;
          default:
            fLeft = isLess(Oleft + OelWidth + Osize);
            fTop = Otop ;
            // 提示框在左边的情况下，滚动条的值=最终定位的高度+提示框和元素中比较高的高度的一半-屏幕高度的一半
            fTop+whichOne/2>window.innerHeight/2?st.push(fTop+whichOne/2-window.innerHeight/2):st.push(0);
            break;
        }
        position.push({
          left: fLeft+'px',
          top: fTop+'px'
        });
        // 获取后改回原来的样式
        if (i != 0) {
          step[i].style.visibility = "";
          step[i].style.display = "none";
        }
      }
      // window.scrollBy
      // document.documentElement.scrollBy(0,100);
      // 赋值
      self.position = position;
      self.scrollT=st;
      console.log(self.scrollT)
    });
    window.scrollTo(0,0)
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
  .close{
    font-size: 40px;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
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
  .act{
    animation: act 1s linear;
  }
  @keyframes act {
    0%{opacity: 0;}
    100%{opacity: 1;}
  }
}
</style>