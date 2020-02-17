<template>
<div>
    <imgvertify @success="success" @fail="fail">
    </imgvertify>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
            success () {
                console.log("父级");
                
            },
            fail () {
                console.log("父级");
                
            },
        }
    }
</script>
