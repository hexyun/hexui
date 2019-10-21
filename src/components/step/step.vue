<template>
  <div class="mask" v-show="isStepShow" :style="{'background':backGround}">
    <div class="close" @click="close"></div>
    <div class="maskTop">
      <div
        class="step"
        v-for="(index,item) in list"
        :key="index"
        :style="position"
        v-show="actNum === index"
        :class="{'act':actNum == index,'left':item.position === 'left','top': item.position === 'top','bottom': item.position === 'bottom'}"
        v-el:steps
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
import Vue from "vue";
export default {
  props: {
    nextText: {
      default: "下一步"
    },
    finalText: {
      default: "完成"
    },
    leftIcon: {
      default: "chevron-left"
    },
    rightIcon: {
      default: "chevron-right"
    },
    buttonStyle: {
      default: "primary"
    },
    isStepShow: {
      default: true
    },
    list: {
      default: []
    },
    isless: {
      default: false
    },
    backGround: {
      default: "rgba(5, 18, 43, 0.65)"
    }
  },
  data() {
    return {
      actNum: 0,
      position: { left: 0, top: 0 }
    };
  },
  methods: {
    show(i) {
      var self = this;
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
      function isLess(i) {
        return !self.isless && i < 0 ? 0 : i;
      }
      this.list.forEach((item, ind) => {
        let el = document.querySelector("#" + item.el);
        if (ind === i) {
          el.style.zIndex = 999;
          el.style.position = "absolute";
        } else {
          el.style.zIndex = 0;
          el.style.position = "absolute";
        }
      });

      let wHalf = window.innerHeight / 2;
      let num = self.actNum;
      let item = self.list[num];
      let actel = document.querySelector("#" + item.el);
      let tarL = getElementLeft(actel);
      let tarT = getElementTop(actel);
      let tarW = actel.offsetWidth;
      let tarH = actel.offsetHeight;
      let o = document.querySelectorAll(".step")[num];
      let ow = o.offsetWidth;
      let oh = o.offsetHeight;
      let size = item.size;
      let scrollT = 0;
      function scrollChange() {
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        let left = 0;
        let top = 0;
        switch (item.position) {
          case "top":
            left = isLess(tarL - ow / 2 + tarW / 2);
            top = tarT - oh - size - scrollTop;
            scrollT = tarT + tarH/2 - size/2 - oh/2 - wHalf;
            break;
          case "bottom":
            left = isLess(tarL - ow / 2 + tarW / 2);
            top = tarT + tarH + size - scrollTop;
            scrollT = tarT + tarH/2 + size/2 +oh/2 - wHalf;
            break;
          case "left":
            left = isLess(tarL - ow - size);
            top = tarT - oh / 2 + tarH / 2 - scrollTop;
            scrollT = tarT + tarH/2 - wHalf;
            break;
          default:
            left = isLess(tarL + tarW + size);
            top = tarT - oh / 2 + tarH / 2 - scrollTop;
            scrollT = tarT + tarH / 2 - wHalf;
            break;
        }
        self.position.left = left + "px";
        self.position.top = top + "px";
      }
      scrollChange();
      window.onscroll = function() {
        scrollChange();
      };
      this.$nextTick(function() {
        setTimeout(function(){
          window.scrollTo(0, scrollT);
        },200)
      });
    },
    next() {
      this.actNum++;
    },
    open() {
      this.actNum = 0;
      this.isStepShow = true;
    },
    close() {
      this.isStepShow = false;
    }
  },
  computed: {
    btnText: function() {
      return this.list.length > 1 && this.list.length - this.actNum > 1
        ? this.nextText
        : this.finalText;
    }
  },
  watch: {
    list: {
      deep: true,
      handler() {
        this.actNum = 0;
        this.show(0);
      }
    },
    actNum(n, o) {
      n < this.list.length ? this.show(n) : this.close();
    }
  },
  ready() {
    this.$nextTick(function() {
      this.show(0);
    });
  }
};
</script>
<style lang='less' scope>
.mask {
  position: fixed !important;
  z-index: 998;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  color: #fff;
  width: auto !important;
  height: auto !important;
  .close {
    width: 38px;
    height: 38px;
    position: fixed;
    right: 70px;
    top: 70px;
    cursor: pointer;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAACUUlEQVRYR82YOYgTURjHf5sBRcHGAxG2EjxAMFFE1CaVR2lhWIu0IrJFEIKEQFIkEFIEJIWI2KbYRQtLjyqNiIgmguABVsKyeDSCojBB/pIH4zAzebPZkffKme/48f3f+S2wsbEX2A8sAruBHcDWaahfwHfgC/AJ+Aisp02zkMJhC3ACOAbsSeEn08/AK+AF8NvG1wYsB5wEisA2m6AJNj+BIfAcmCTFmgW2C7gE7JsTKOy+BtwHvsbFTQI7OIWShFkMSSq491HB48COAhcByZjlkJwPgNfhJFFgqtTl/wBlWAS3Eq5cGExz6iqQlXxx1Zesd4JzLggm2a5kMNFtp4IWxF2zWoNgp4ALtlEysnsIPFNsAybprm/CPjUvr/a5m9qEDdgZ4Ny8UTfJ/zHw1IAt2x4zxWJxZ7/fPzsYDF72er0PSTDVavVAuVw+XqlUngyHw2+W4Dq+bglMB/I1SydGo9FSPp8/7Pu+32w273U6nXdRvvV6/VCr1Sp5nueNx+O3hUJh1TYHcFtgp4Hztk6qQrfbXVLCOLgglGxqtdrqrOqG8j8SWAk4Ygsmu3DiYOWS/qXI8UZgklFyphpRAApg5Jsl9Yxk6wK7AWxPRTU1DsJNJhNfn3O5XKzEKXL8EFgD8FI4/WMquHa7XRKQfgiw0WjELgrLPL7TYM5K6ezkd3a7cHaDdfZI0gp28hAXmLPXHmcviqqak1frv8ecq48RwTn5fDPnq5MPXgPnZIsgWDl1erJ6lW+oqWLgnGxDGTgnG3fBC6dzrc6o23DmzeE/TZhqOKAkO28AAAAASUVORK5CYII=);
  }
  .maskTop {
    width: 100%;
    height: 100%;
  }
  .step {
    display: inline-block;
    position: absolute;
    font-size: 14px;
    border: 1px dashed #fff;
    padding: 8px 10px;
    &::before {
      content: "";
      width: 10px;
      height: 12px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAcklEQVQoU93PsQ3CYAyE0e9qpCyQQVJCkzGYJCNAeiiZgQGyDAOwwaFEduT8I+DOviedLJqx/QI+kqYaqS6278AF6ICnpDnzHQY6AyNwApaKN1iRpG/c+opl+xZ1Y6Kss534scIr8G5Rg4fDM1H5/1//AGqBV4mk53atAAAAAElFTkSuQmCC);
      font-size: 10px;
      color: #fff;
      position: absolute;
      right: 103%;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
    }
  }
  .step.left {
    &::before {
      left: 103%;
      transform: translateY(-50%) rotate(90deg);
      right: auto;
    }
  }
  .step.top {
    &::before {
      top: 110%;
      left: 50%;
      transform: translateX(-50%) rotate(180deg);
      right: auto;
    }
  }
  .step.bottom {
    &::before {
      bottom: 110%;
      top: auto;
      left: 50%;
      transform: translateX(-50%);
      right: auto;
    }
  }
  .next {
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
  .act {
    animation: act 1s linear;
  }
  @keyframes act {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>