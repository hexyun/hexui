<template>
  <mobile-input
    title="用户名"
    clearable
    data-type="full"
    :actual-value.sync="value"
    @on-input="input"
  ></mobile-input>
  <div @click="sss">adasd</div>
</template>

<script>
export default {
  data () {
    return {
      value: '123'
    }
  },
  methods: {
    sss () {
      console.log(this.value);
      
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

</style>