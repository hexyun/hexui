<template>
    <Row>
        <i-col span="12" style="padding-right:10px">
            <i-select :model.sync="model111" >
                <i-option v-for="item in cityList1" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
    </Row>
    <Row>
        <i-col span="12" style="padding-right:10px">
            <i-select 
                :model.sync="model112" 
                filterable 
                :auto-select="true" 
                @on-clear="clear" 
                :clearable="true"
                @on-change="change" 
                :default-first-option="true">
                <i-option v-for="item in cityList1" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
    </Row>
    <Row>
        <i-col span="12">
            <i-select :model.sync="model12" @remove-tag="removeTag" filterable multiple :multiple-limit="3">
                <i-option v-for="item in cityList1" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </i-col>
    </Row>
</template>
<script>
const cityList = [{"label":"13233874274","value":"13233874274"},{"label":"13083595729","value":"13083595729"},{"label":"13321062885","value":"13321062885"},{"label":"13038676872","value":"13038676872"},{"label":"18727776566","value":"18727776566"},{"label":"18986020095","value":"18986020095"},{"label":"13348954743","value":"13348954743"},{"label":"13711080573","value":"13711080573"},{"label":"18985695449","value":"18985695449"},{"label":"18910134435","value":"18910134435"}]
    export default {
        data () {
            return {
                cityList1: cityList,
                model111: null,

                cityList2: [],
                model112: null,

                model12: []
            }
        },
        ready() {
          this.model111 = 'hangzhou'
          setTimeout(()=>{
            this.cityList2 = cityList
          }, 500)
        },
        methods: {
            change(e) {
                console.log(e)
            },
            clear() {
                console.log('清空了')
            },
            removeTag(e) {
                console.log('removeTag', e);
                
            }
        }
        
    }
</script>
