<template>
  <div class="big-screen">
    <mobile-radio
      title="必填"
      :t-icon="`https://hexyuncdn.oss-cn-beijing.aliyuncs.com/images/upload.png`"
      text="请选择"
      :must="true"
      :icon="false"
      :data-list="datalist"
    ></mobile-radio>
    <mobile-radio
      title="有icon"
      :t-icon="`https://hexyuncdn.oss-cn-beijing.aliyuncs.com/images/upload.png`"
      text="请选择"
      :must="false"
      :icon="true"
    ></mobile-radio>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datalist: [{key: '类型1', value: '1'}, {key: '类型2', value: '2'}, {key: '类型3', value: '3'}]
    }
  },
  methods: {
  },
  watch: {
  },
}
</script>

<style>
  .big-screen {
    height: 100vh;
    width: 100%;
    background-color: rgba(245, 245, 245, 1);
  }
</style>