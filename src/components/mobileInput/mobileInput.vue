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
    textAlign: {
      type: String,
      default: 'left'
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
      }, 100)
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
      let number = ['number', 'blank']
      if (number.indexOf(this.dataType) > -1) return 'number'
      return 'text'
    }
  }
};
</script>

<style lang="less" scoped>

</style>