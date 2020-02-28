<template>
  <div class="hex-mobile-input">
    <div :class="classes">
      <span class="title" v-if="title" :style="{'width': (labelWidth && labelWidth > 0) ? `${this.labelWidth}pt` : 'unset'}">
        <span v-if="mustFill">*</span>
        <div class="icon" :style="{'background-image': `url(${tIcon})`}" v-if="tIcon"></div>
        {{ title }}
      </span>
      <div>
        <input
          class="input"
          :type="inputType"
          :disabled="disabled"
          :readonly="readonly"
          v-model="showValue"
          :placeholder="placeholder"
          @focus="focus = true"
          @blur="blur"
          v-el:input
          @input="input"
          @change="change"
        />
        <div class="warning" v-if="warningMsg && showWarning && this.warningType === 'text'">{{ title }}{{ warningMsg }}</div>
      </div>
      <span class="icon" v-if="!clearable && iconUrl" :style="{'background-image': `url(${iconUrl})`}"></span>
      <template v-if="clearable && !iconUrl && textAlign === 'left'">
        <Icon class="icon clear"
          type="close-circled" 
          @click="clear"
          v-show="focus && showValue && showValue.length > 0">
        </Icon>
      </template>
    </div>
    <div class="explain" v-if="explainText">{{ explainText }}</div>
    <div class="line" v-if="true"></div>
  </div>
</template>

<script>
import Icon from "../icon/icon.vue";
import FORMAT from "./format"
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    iconUrl: String,
    tIcon: String,
    textAlign: {
      type: String,
      default: "left"
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mustFill: {
      // 必填
      type: Boolean,
      default: false
    },
    dataType: String,
    actualValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    showWarning: {
      type: Boolean,
      default: false
    },
    warningType: {
      type: String,
      default: 'placeholder'
    },
    explainText: String,
    labelWidth: Number
  },
  data() {
    return {
      warningMsg: "不能为空",
      showValue: "",
      focus: false
    };
  },
  watch: {
    actualValue: {
      immediate: true,
      handler(val) {
        if (val) {
          this.showValue = FORMAT[this.dataType] ? FORMAT[this.dataType](val || '') : val;
        }
      }
    },
    showWarning(val) {
      if (val) {
        if(this.actualValue) this.warningMsg = '格式不正确'
        else this.warningMsg = '不能为空'
      }
    }
  },
  methods: {
    input() {
      this.showValue = FORMAT[this.dataType] ? FORMAT[this.dataType](this.showValue || '') : this.showValue;
      this.actualValue = this.unFormat(this.showValue, this.dataType);
      this.$emit('on-input', this.actualValue)
    },
    change() {
      this.$emit('on-change', this.actualValue);
      console.log('change - event')
    },
    unFormat(val, type) {
      val = val || "";
      if (type === "phone" || type === "bank") {
        return val.replace(/ /g, "");
      } else if (type === "money") {
        return val.replace(/,/g, "");
      } else {
        return val;
      }
    },
    clear() {
      this.showValue = '';
      this.$els.input.focus();
      setTimeout(() => {
        this.focus = true;
      }, 100)
      this.$emit('on-clear')
    },
    blur() {
      setTimeout(() => {
        this.focus = false;
      }, 300)
    }
  },
  computed: {
    classes() {
      return {
        "input-group": true,
        disabled: this.disabled,
        clearable: this.clearable,
        [this.textAlign]: true,
        'warning-group-text': this.warningMsg && this.showWarning && this.warningType === 'text',
        'warning-group-placeholder': this.warningMsg && this.showWarning && this.warningType === 'placeholder',
        'no-icon': !this.iconUrl && !this.clearable
      };
    },
    inputType() {
      if (this.dataType === 'text') return 'text'
      if (this.dataType === 'url') return 'url'
      if (this.dataType === 'email') return 'email'
      if (this.dataType === 'password') return 'password'
      if (this.dataType === 'phone') return 'tel'
      return 'text'
    }
  }
};
</script>

<style lang="less" scoped>
.FS {
  font-size: 16pt;
}
.hex-mobile-input {
  // 输入框 所在行  基础样式
  .input-group {
    background-color: white;
    width: 100%;
    min-height: 50pt;
    padding: 14pt 0 14pt 18pt;
    display: flex;
    position: relative;
    > div {
      padding-right: 36pt;
    }
    .title {
      color: #333333;
      display: inline-block;
      .FS;
      white-space: nowrap;
      margin-right: 16pt;
      span {
        color: #f00;
        position: absolute;
        left: 7pt;
        transform: translateY(4pt);
      }
      .icon {
        position: relative;
        right: 0;
        top: 0;
      }
    }
    .input {
      border: none;
      color: #333333;
      .FS;
      width: 100%;
      caret-color: rgba(119, 156, 251, 1);
      &:focus {
        outline: none;
      }
      &::-webkit-input-placeholder{
        color: rgba(153, 153, 153, 1);
      }
    }
    .icon {
      display: inline-block;
      position: absolute;
      right: 18pt;
      width: 16px;
      height: 16px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.22);
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center center;
      top: 20pt;
    }
  }
  // 文字警告
  .warning-group-text {
    padding-bottom: 4pt;
    .warning {
      margin-top: 2pt;
      color: rgba(230, 67, 64, 1);
    }
  }
  // 提示字警告
  .warning-group-placeholder {
    .input::-webkit-input-placeholder {
      color: rgba(230, 67, 64, 1);
    }
  }
  // 没有右侧图标
  .no-icon > div {
    padding-right: 18pt;
  }
  
  // 附件信息
  .explain {
    color: rgba(204, 204, 204, 1);
    font-size: 12pt;
    padding-left: 18pt;
    background-color: rgba(245, 245, 245, 1);
    width: 100%;
  }
  // 禁用
  .disabled {
    .title {
      color: rgba(153, 153, 153, 1);
    }
    .input {
      background-color: #fff;
    }
  }
  // 分割线
  .line {
    height: 0;
    border: 0.25pt solid rgba(238, 238, 238, 1);
    margin-left: 18pt;
  }
  // 右对齐
  .right {
    .input, .warning{
      text-align: right;
    }
    > div {
      padding-right: 18pt;
    }
  }
}
</style>