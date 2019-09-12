<template>
    <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" :prefabtime.sync="internalValue" placeholder="选择日期和时间" @get-time="getTime"></Date-picker>
    <br>
    <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></Date-picker>
    <br>
    <Date-picker type="daterange" placeholder="选择日期和时间" style="width: 300px"></Date-picker>
    <br>
    <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 300px" @get-time="getTime"></Date-picker>
    <i-button @click="showTime">显示时间</i-button>
    <i-button @click="showTime2">再显示时间</i-button>
    <i-button @click="clearTime">清空时间</i-button>
</template>
<script>
    export default {
        data () {
            return{
                time: '',
                internalValue: 1568275833650
            }
        },
        methods: {
            getTime (t) {
                console.log('父级结果', t);
            },
            showTime() {
                this.internalValue = 1567421316714;
            },
            showTime2() {
                this.internalValue = 1568275833650;
            },
            clearTime() {
                this.internalValue = null;
            }
        }
    }
</script>
