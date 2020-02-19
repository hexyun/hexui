<template>
  <div class="hex-mobile-input">
    <div :class="classes">
      <span class="title" v-if="title">
        <span style="color: red" v-if="mustFill">*</span>
        {{ title }}
      </span>
      <input
        class="input"
        :type="inputType"
        :disabled="disabled"
        :readonly="readonly"
        v-model="showValue"
        :placeholder="placeholder"
        @input="input"
      />
      <span class="icon" v-if="!clearable && iconUrl"></span>
      <Icon type="close-circled" @click="this.showValue = ''" v-if="clearable && !iconUrl && textAlign !== 'right'"></Icon>
    </div>
    <div class="explain" v-if="explainText">{{ explainText }}</div>
    <div class="warring" v-if="warringText && showWarring">{{ warringText }}</div>
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
    iconUrl: {
      type: String,
      default: ""
    },
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
    dataType: {
      type: String
    },
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
    }
  },
  data() {
    return {
      explainText: "解释文字",
      warringText: "警告文字",
      showWarring: false,
      showValue: ""
    };
  },
  watch: {},
  methods: {
    input() {
      this.showValue = FORMAT[this.dataType] ? FORMAT[this.dataType](this.showValue || '') : this.showValue;
      this.actualValue = this.unFormat(this.showValue, this.dataType);
      this.$emit('on-input', this.actualValue)
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
    }
  },
  computed: {
    classes() {
      return {
        "input-group": true,
        disabled: this.disabled,
        clearable: this.clearable,
        [textAlign]: true
      };
    },
    inputType() {
      if (this.dataType === 'text') return 'text'
      if (this.dataType === 'url') return 'url'
      if (this.dataType === 'email') return 'email'
      if (this.dataType === 'password') return 'password'
      if (this.dataType === 'phone') return 'tel'
      let number = ['number', 'decimal', 'integer', 'blank', 'money']
      if (number.indexOf(this.dataType) > -1) return 'number'
      return 'text'
    }
  }
};
</script>

<style lang="less" scoped>
.hex-mobile-input {
  .title {
    color: red;
  }
}
</style>