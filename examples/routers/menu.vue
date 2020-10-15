<template>
    <Menu :active-name.sync="ak" :open-names="['1']">
        <Submenu key="1">
            <template slot="title">
                <!-- <Icon type="ios-analytics" />  不支持省略写法-->
                <Icon type="ios-analytics"></Icon>
                Navigation One
            </template>
            <Menu-group title="Item 1">
                <Menu-item key="1-1">Option 1</Menu-item>
                <Menu-item key="1-2">Option 2</Menu-item>
                <Menu-item key="1-3">Option 3</Menu-item>
                <Menu-item key="1-4">Option 4</Menu-item>
            </Menu-group>
        </Submenu>
        <Submenu key="2">
            <template slot="title">
                <Icon type="ios-filing"></Icon>
                Navigation Two  1
            </template>
            <Menu-item key="2-1">2-1</Menu-item>
            <Menu-item key="2-2">2-2</Menu-item>
            <Submenu key="3">
                <template slot="title">2-3</template>
                <Menu-item key="3-1">3-1</Menu-item>
                <Menu-item key="3-2">3-2</Menu-item>
            </Submenu>
        </Submenu>
        <Submenu key="4">
            <template slot="title">
                <Icon type="ios-cog"></Icon>
                Navigation Three
            </template>
            <Menu-item key="4-1">Option 9</Menu-item>
            <Menu-item key="4-2">Option 10</Menu-item>
            <Menu-item key="4-3">Option 11</Menu-item>
            <Menu-item key="4-4">Option 12</Menu-item>
        </Submenu>
    </Menu>

    <br>
    <p>切换主题</p>
    <Radio-group :model.sync="theme1">
        <Radio value="light"></Radio>
        <Radio value="dark"></Radio>
        <Radio value="primary"></Radio>
    </Radio-group>
    <i-button @click="ak = '2'">change</i-button>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                ak: '1-2'
            }
        }
    }
</script>
