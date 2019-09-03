<template>
    <Date-range type="daterange" @get-time="getTime"></Date-range>
    <i-button @click="clear">清空时间</i-button>
</template>
<script>
    export default {
        data () {
            return{
                time: '',
                prefab: 1567421316714
            }
        },
        methods: {
            getTime (t) {
                console.log('父级结果', t);
                
            },
            clear () {
              this.$children[0].handleClear();
            },
            showTime() {
                this.prefab = 1567421316714;
            },
            clearTime() {
                this.prefab = null;
            }
        }
    }
</script>
