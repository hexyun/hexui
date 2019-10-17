<template>
    <div @click="T" style="margin: 100px">
        <Poptip
        confirm
        title="您确认删除这条内容吗？"
        @on-ok="ok"
        @on-cancel="cancel">
        <i-button>删除</i-button>
    </Poptip>
    <Poptip
        confirm
        title="Are you sure delete this task?"
        @on-ok="ok"
        @on-cancel="cancel"
        ok-text="yes"
        cancel-text="no">
        <i-button>国际化</i-button>
    </Poptip>
        <Poptip trigger="hover" placement="bottom" title="提示标题" content="提示内容">
            <i-button>hover 激活</i-button>
        </Poptip>
        <Poptip  title="提示标题" placement="bottom" content="提示内容">
            <i-button>click 激活</i-button>
        </Poptip>
        <Poptip trigger="focus" title="提示标题" content="提示内容">
            <i-input type="textarea"></i-input>
            <!--<i-button>focus 激活</i-button>-->
        </Poptip>
        <Poptip trigger="focus" placement="bottom" title="提示标题" content="提示内容">
            <i-input></i-input>
        </Poptip>
    </div>
</template>
<script>
    export default {
        methods: {
            T() {
                location.href = 'https://www.baidu.com'
            }
        }
    }
</script>
