<template>
    <Date-picker type="datetime" format="HH:mm" prefabtime="2019-09-09 05:06" placeholder="选择日期和时间" @get-time="getTime"></Date-picker>
    <br>
    <Date-picker type="datetime" format="yyyy/MM/dd HH:mm:ss" :prefabtime.sync="internalValue" placeholder="选择日期和时间" @get-time="getTime"></Date-picker>

    <br>
    <Date-picker type="daterange" placeholder="请选择日期和时间"  style="width: 300px" ></Date-picker>
    <br>
    <Date-picker type="datetimerange" format="yyyy/MM/dd HH:mm" :prefabtime.sync="prefab" placeholder="选择日期和时间（不含秒）" style="width: 300px" @get-time="getTime"></Date-picker>
    <div>年-月-日</div>
    <Date-picker type="datetime" format="yyyy/MM/dd" placeholder="选择日期和时间"></Date-picker>
    <div>时:分</div>
    <Date-picker type="datetime" :prefabtime.sync="internalValue"  format="HH:mm" placeholder="选择日期和时间" @get-time="getTime"></Date-picker>


    <i-button @click="showTime">显示时间</i-button>
    <i-button @click="showTime2">再显示时间</i-button>
    <i-button @click="clearTime">清空时间</i-button>
</template>
<script>
    export default {
        data () {
            return{
                time: '',
                internalValue: 1568275833650,
                prefab: [1568275833650, 1568275833650]
            }
        },
        methods: {
            getTime (t) {
                console.log('父级结果', t);
                console.log(this.internalValue, this.prefab)
            },
            showTime() {
                this.internalValue = '2019/09/09 05:06';
            },
            showTime2() {
                this.internalValue = '2019/09/09 15:06';
            },
            clearTime() {
                this.internalValue = null;
            }
        }
    }
</script>
