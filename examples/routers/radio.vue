<template>
  <div >
    <Radio-group :model.sync="phone" vertical>
      <Radio value="apple" id="btn1">
        <Icon type="social-apple"></Icon>
        <span>Apple</span>
      </Radio>
      <Radio value="android" disabled>
        <Icon type="social-android"></Icon>
        <span>Android</span>
      </Radio>
      <Radio value="windows">
        <Icon type="social-windows"></Icon>
        <span>Windows</span>
      </Radio>
    </Radio-group>
    <Radio-group :model.sync="animal">
      <Radio value="金斑蝶"></Radio>
      <Radio value="爪哇犀牛"></Radio>
      <Radio value="印度黑羚"></Radio>
    </Radio-group>
    <br />
    <br />
    <i-button @click="activeKey = '2'">换</i-button>
  </div>
  <Radio :checked.sync="radio">Radio</Radio>
  <i-button @click="radio = !radio">change radio</i-button>
  <br />
  <br />
  <Radio-group :model.sync="phone" type="button" vertical>
    <Radio value="apple">
      <Icon type="social-apple"></Icon>
      <span>Apple</span>
    </Radio>
    <Radio value="android">
      <Icon type="social-android"></Icon>
      <span>Android</span>
    </Radio>
    <Radio value="windows">
      <Icon type="social-windows"></Icon>
      <span>Windows</span>
    </Radio>
  </Radio-group>
  <Radio-group :model.sync="animal" type="button">
    <Radio value="金斑蝶" id="btn4" style='height:200px'></Radio>
    <Radio value="爪哇犀牛"></Radio>
    <Radio value="印度黑羚"></Radio>
  </Radio-group>

  <Radio-group :model.sync="animal" type="button">
    <Radio value="金斑蝶" disabled></Radio>
    <Radio value="爪哇犀牛" disabled></Radio>
    <Radio value="印度黑羚"></Radio>
  </Radio-group>
  <br />
  <br />
  <Radio-group :model.sync="animal" type="button" size="large">
    <Radio value="金斑蝶"></Radio>
    <Radio value="爪哇犀牛"></Radio>
    <Radio value="印度黑羚"></Radio>
  </Radio-group>
  <Radio-group :model.sync="animal" type="button">
    <Radio value="金斑蝶"></Radio>
    <Radio value="爪哇犀牛"></Radio>
    <Radio value="印度黑羚"></Radio>
  </Radio-group>
  <Radio-group :model.sync="animal" type="button" size="small">
    <Radio value="金斑蝶" id="btn3"></Radio>
    <Radio value="爪哇犀牛"></Radio>
    <Radio value="印度黑羚"></Radio>
  </Radio-group>
  <br />
  <br />
  <br />
  <br />
  <Checkbox :checked.sync="radio">Checkbox</Checkbox>
  <br />
  <br />
  <Checkbox-group :model="social">
    <Checkbox value="twitter">
      <Icon type="social-twitter"></Icon>
      <span>Twitter</span>
    </Checkbox>
    <Checkbox value="facebook">
      <Icon type="social-facebook"></Icon>
      <span>Facebook</span>
    </Checkbox>
    <Checkbox value="github">
      <Icon type="social-github"></Icon>
      <span>Github</span>
    </Checkbox>
    <Checkbox value="snapchat">
      <Icon type="social-snapchat"></Icon>
      <span>Snapchat</span>
    </Checkbox>
  </Checkbox-group>
  <br />
  <br />
  <Checkbox :checked.sync="disabledSingle" disabled>Checkbox</Checkbox>
  <Checkbox-group :model="disabledGroup">
    <Checkbox value="香蕉" disabled></Checkbox>
    <Checkbox value="苹果" disabled></Checkbox>
    <Checkbox value="西瓜"></Checkbox>
  </Checkbox-group>
  <br />
  <br />
  <Switch @on-change="change"></Switch>
  <br />
  <br />
  <Switch>
    <span slot="open">开</span>
    <span slot="close">关</span>
  </Switch>
  <br />
  <br />
  <Switch>
    <Icon type="android-done" slot="open"></Icon>
    <Icon type="android-close" slot="close"></Icon>
  </Switch>
  <Switch disabled></Switch>
  <Switch size="small"></Switch>
  <br />
  <br />
  <Input-number :max="10" :min="1" :step="1.2" :value="1"></Input-number>
  <Input-number :value="2" size="small"></Input-number>
  <Input-number :value="2"></Input-number>
  <Input-number :value="2" size="large"></Input-number>
  <br />
  <br />
  <Breadcrumb>
    <Breadcrumb-item href="/" id="btn2">Home</Breadcrumb-item>
    <Breadcrumb-item href="/components/breadcrumb">Components</Breadcrumb-item>
    <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
  </Breadcrumb>
  <Breadcrumb>
    <Breadcrumb-item href="/">
      <Icon type="ios-home-outline"></Icon>Home
    </Breadcrumb-item>
    <Breadcrumb-item href="/components/breadcrumb">
      <Icon type="social-buffer-outline"></Icon>Components
    </Breadcrumb-item>
    <Breadcrumb-item>
      <Icon type="pound"></Icon>Breadcrumb
    </Breadcrumb-item>
  </Breadcrumb>
  <Breadcrumb separator=">">
    <Breadcrumb-item href="/">Home</Breadcrumb-item>
    <Breadcrumb-item href="/components/breadcrumb">Components</Breadcrumb-item>
    <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
  </Breadcrumb>
  <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
    <Breadcrumb-item href="/">Home</Breadcrumb-item>
    <Breadcrumb-item href="/components/breadcrumb">Components</Breadcrumb-item>
    <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
  </Breadcrumb>
  <br />
  <br />
  <Checkbox :checked.sync="single"></Checkbox>
  <step :next-text = 'nextText' :is-step-show="isStepShow" :list="list" v-ref:step></step>
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <br /> 
  <!-- <button @click="open" style="position:fixed;z-index:9999;left:0;bottom:0;">打开</button>
  <button @click="changeList" style="position:fixed;z-index:9999;left:0;bottom:60px;">更改数据</button> -->
</template>
<script>
import {
  Radio,
  Alert,
  Icon,
  Collapse,
  iButton,
  Checkbox,
  Switch,
  InputNumber,
  Breadcrumb,
  LoadingBar,
  step
} from "hexui";

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const BreadcrumbItem = Breadcrumb.Item;

export default {
  components: {
    Radio,
    RadioGroup,
    Alert,
    Icon,
    Collapse,
    Panel,
    iButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    InputNumber,
    Breadcrumb,
    BreadcrumbItem,
    LoadingBar,
    step
  },
  props: {},
  data() {
    return {
      isStepShow: true,
      single: false,
      radio: false,
      radioGroup: "段模",
      activeKey: [1, 2],
      phone: "apple",
      animal: "爪哇犀牛",
      social: ["facebook", "github"],
      disabledSingle: true,
      disabledGroup: ["苹果"],
      list: [
        {
          // title: "步骤二",
          text: "这是第二个步骤的提示文字",
          el: "btn2",
          position: "bottom",
          size: 22
        },
        {
          title: "步骤一",
          text: "这是第一个步骤的提示文字",
          el: "btn1",
          position: "right",
          size: 22
        },
        
        {
          title: "步骤三",
          text: "这是第三个步骤的提示文字",
          el: "btn3",
          position: "left",
          size: 22
        },
        {
          title: "步骤四",
          text: "这是第四个步骤的提示文字",
          el: "btn4",
          position: "top",
          size: 22
        }
      ],
      list2: [
        {
          title: "步骤三",
          text: "这是第三个步骤的提示文字",
          el: "btn3",
          position: "left",
          size: 22
        },
        {
          // title: "步骤二",
          text: "这是第二个步骤的提示文字",
          el: "btn2",
          position: "bottom",
          size: 22
        },
        {
          title: "步骤一",
          text: "这是第一个步骤的提示文字",
          el: "btn1",
          position: "right",
          size: 22
        },
        {
          title: "步骤四",
          text: "这是第四个步骤的提示文字",
          el: "btn4",
          position: "top",
          size: 22
        }
      ]
    };
  },
  computed: {},
  methods: {
    changeGroup(data) {
      console.log(data);
    },
    closed(data) {
      console.log(data);
    },
    change(status) {
      console.log(status);
    },
    open() {
      this.$refs.step.open()
    },
    changeList() {
      this.list = this.list2;
    }
  },
  ready() {
    LoadingBar.start();
  }
};
</script>
