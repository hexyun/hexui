<template>
    <div>
        <i-button @click="changePrefab">修改初始时间</i-button>
        <calendar 
            :things="things"
            :prefab="prefab"
            :max="max"
            @selected-day="selsectedDay"
            color=""
            style="height: 1000px"
            @selected-thing="selectedThing">
        </calendar>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                things: null,
                prefab: null,
                max: null
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
                this.prefab = '2019-09-09'
            }
        }
    }
</script>
