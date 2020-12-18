<!--
 * @Author: yzf
 * @Date: 2020-12-03 11:36:12
 * @LastEditTime: 2020-12-18 13:50:28
 * @LastEditors: yzf
 * @Description: 这是 文件
 * @FilePath: /alex/Volumes/project/hex/hexui/examples/routers/calendar.vue
 * @大威天龙,世尊地藏,般若诸佛,般若巴麻空,没有bug
-->
<template>
    <div class='wrap'>
        <i-button @click="changePrefab">修改初始时间</i-button>
        <i-button @click="add">添加事件</i-button>
        <calendar
            :havething="true"
            :thingdate="activeDate"
            :things="things"
            :prefab="prefab"
            :max="max"
            @selected-day="selsectedDay"
            color=""
            @selected-thing="selectedThing">
        </calendar>
        <button @click='changeDate'>changeDate</button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                things: null,
                prefab: null,
                max: null,
                activeDate:  ["2020/12/1", "2020/12/2", "2020/12/3", "2020/12/4", "2020/12/5", "2020/12/6", "2020/12/8", "2020/12/9", "2020/12/10", "2020/12/12", "2020/12/13"]
            }
        },
        methods: {
            selsectedDay (day) {
                console.log("父级day", day);

            },
            selectedThing (thing, day) {
                console.log("父级 thing",thing, day);

            },
            add () {
                this.things =  [{
                time: '2019/08/26',
                list: [
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 },
                    { name: '不知道干啥', time: 1566790378315 }]
                },{
                    time: '2019/08/02',
                    list: [
                    { name: '不道干啥', time: 1566790378315 },
                    { name: '不知干啥', time: 1566790378315 },
                    { name: '不知干啥', time: 1566790378315 },
                    { name: '知道干啥', time: 1566790378315 }]
                },{
                    time: '2019/09/02',
                    list: [
                    { name: '不道干啥', time: 1566790378315 },
                    { name: '不知干啥', time: 1566790378315 },
                    { name: '不知干啥', time: 1566790378315 },
                    { name: '知道干啥', time: 1566790378315 }]
                },{
                    time: '2019/07/02',
                    list: [
                    { name: '不道干啥', time: 1566790378315 },
                    { name: '不知干啥', time: 1566790378315 },
                    { name: '不知干啥', time: 1566790378315 },
                    { name: '知道干啥', time: 1566790378315 }]
                }];
            },
            changePrefab() {
                this.prefab = '2019-08-09'
            },
            changeDate() {
                this.activeDate = ["2020/12/1", "2020/12/2", "2020/12/3"]
            }
        }
    }
</script>
<style lang="less" scoped>
.wrap {
    width: 600px;
    height: 300px;
}
</style>
