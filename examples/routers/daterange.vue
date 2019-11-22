<template>
    <Date-range :prefabtime="prefab" type="daterange" @get-time="getTime"></Date-range>
    <i-button @click="clear">清空时间</i-button>
    <i-button @click="changeT">修改预设时间</i-button>
    <i-button @click="changeT2">再改预设时间</i-button>
</template>
<script>
    export default {
        data () {
            return{
                time: '',
                prefab: null
            }
        },
        methods: {
            getTime (t) {
                console.log('父级结果', t); 
                
            },
            clear () {
              this.prefab = [];
            },
            changeT() {
                this.prefab= ['1999-12-09','2020-01-02']
            },
            changeT2() {
                this.prefab= ['1992-01-09','2110-01-02']
            }
        }
    }
</script>
