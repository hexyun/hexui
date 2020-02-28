<template>
  <div class="big-screen">
    <mobile-input
      title="非空"
      :must-fill="true"
      :label-width="150"
      t-icon="https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg"
      icon-url="https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg"
      data-type="full"
      explain-text="这是备注文字"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="大写"
      :must-fill="true"
      text-align="right"
      clearable
      explain-text="这是备注文字"
      data-type="capitalLetter"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="手机号"
      :must-fill="true"
      data-type="phone"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="金额"
      :must-fill="true"
      data-type="money"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="银行卡"
      clearable
      :must-fill="true"
      :show-warning="showW"
      text-align="right"
      data-type="bank"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="数字"
      :show-warning="showW"
      :warning-type="'text'"
      :must-fill="true"
      text-align="right"
      data-type="number"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="小数"
      clearable
      :must-fill="true"
      data-type="decimal"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="整数"
      :show-warning="showW"
      :must-fill="true"
      data-type="integer"
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="禁用"
      data-type="text"
      disabled
      placeholder="请输入用户名"
    ></mobile-input>
    <mobile-input
      title="只读"
      data-type="text"
      readonly
      placeholder="请输入用户名"
      actual-value="这是只读的内容"
    ></mobile-input>
    <mobile-input
      title="密码"
      data-type="password"
      placeholder="请输入用户名"
    ></mobile-input>
    <div @click="sss">aaaa</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '123',
      showW: false
    }
  },
  methods: {
    sss () {
      console.log(this.value);
      this.showW = !this.showW
    },
    input () {
      console.log(this.value, '父组件 $emit');
    }
  },
  watch: {
    value (val) {
      console.log(val, '父组件')
    }    
  },
}
</script>

<style>
  .big-screen {
    height: 100vh;
    width: 100%;
    /* background-color: rgba(245, 245, 245, 1); */
  }
</style>