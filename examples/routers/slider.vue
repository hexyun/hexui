<template>
    <div style="width: 540px;margin:100px;">
        {{ value }}
        {{ value2 }}
        <!-- <Slider @on-change="change" @on-input="input" :step="15"></Slider>
        <Slider :value="40" :tip-format="format"></Slider>
        <Slider :value.sync="value" show-input show-stops range @on-change="change" @on-input="input" :step="13"></Slider>
        <Slider :max="10"></Slider>
        <Slider :step="13"></Slider>
        <Slider :step="13" :max="60"></Slider>
        <Icon type="checkmark-circled" size="40" color="#f60"></Icon>
        <p>附近的首付款是东方红看就是</p>
        <div class="ivu-article">
            <a href="http://www.hexuiui.com" target="_blank">hexui</a>
        </div>
        <Slider :value="75"></Slider>
        <Slider :value="[20, 50]" range></Slider>
        <Slider :value="[20, 50]" show-tip="always"></Slider>
        <Slider :value="[20, 50]" show-tip="hover"></Slider>
        <Slider :value="[20, 50]" show-tip="never"></Slider> -->
        <p>新增的</p>
        <Slider :value.sync="value2" :step="0.1" :min="-10" :max="10" :show-stops="true" :show-input="true" :section-stops="false" @on-input="input" @on-change="change" :show-scale="true"></Slider>
    </div>
</template>
<script>
    import { Slider, Icon } from 'hexui';
    export default {
        components: { Slider, Icon },
        data () {
            return {
                value: [20, 50],
                value2: 2.3
            }
        },
        methods: {
            format (val) {
                return null;
                return `进度：${val}%`
            },
            change (data) {
            //    console.log(data)
            },
            input (value) {
                // console.log(value)
            }
        }
    }
</script>
