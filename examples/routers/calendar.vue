<template>
    <calendar 
    :things="things"
    :prefab="prefab"
    @selected-day="selsectedDay"
    @selected-thing="selectedThing"></calendar>
</template>
<script>
    export default {
        data () {
            return {
                things: [
                    {
                    time: '2019/8/26',
                    list: [
                        { name: '不知道干啥', time: 1566790378315 },
                        { name: '不知道干啥', time: 1566790378315 },
                        { name: '不知道干啥', time: 1566790378315 },
                        { name: '不知道干啥', time: 1566790378315 },
                        { name: '不知道干啥', time: 1566790378315 },
                        { name: '不知道干啥', time: 1566790378315 }]
                    }],
                    prefab: 1262707200000
                }
        },
        methods: {
            selsectedDay (day) {
                console.log("父级day", day);
                
            },
            selectedThing (thing) {
                console.log("父级 thing",thing);
                
            }
        }
    }
</script>
