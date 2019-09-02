<template>
    <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" prefabtime="2019/09/09 10:10:10" placeholder="选择日期和时间" @get-time="getTime"></Date-picker>
    <br>
    <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></Date-picker>
    <br>
    <Date-picker type="daterange" placeholder="选择日期和时间" style="width: 300px"></Date-picker>
    <br>
    <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 300px"></Date-picker>
</template>
<script>
    export default {
        data () {
            return{
                time: ''
            }
        },
        methods: {
            getTime (t) {
                console.log('父级', t);
                
            }
        }
    }
</script>
