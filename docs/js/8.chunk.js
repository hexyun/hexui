webpackJsonp([8],{204:function(t,e,i){var l,o,a;!function(i,n){o=[e],l=n,a="function"==typeof l?l.apply(e,o):l,!(void 0!==a&&(t.exports=a))}(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{value:"123",showW:!1}},methods:{sss:function(){console.log(this.value),this.showW=!this.showW},input:function(){console.log(this.value,"父组件 $emit")}},watch:{value:function(t){console.log(t,"父组件")}}},t.exports=e.default})},378:function(t,e,i){e=t.exports=i(3)(),e.push([t.id,".big-screen{height:100vh;width:100%}",""])},424:function(t,e){t.exports=" <div class=big-screen> <mobile-input title=非空 :must-fill=true :label-width=150 t-icon=https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg icon-url=https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_40c4f13.svg data-type=full explain-text=这是备注文字 placeholder=请输入用户名></mobile-input> <mobile-input title=大写 :must-fill=true text-align=right clearable explain-text=这是备注文字 data-type=capitalLetter placeholder=请输入用户名></mobile-input> <mobile-input title=手机号 :must-fill=true data-type=phone placeholder=请输入用户名></mobile-input> <mobile-input title=金额 :must-fill=true data-type=money placeholder=请输入用户名></mobile-input> <mobile-input title=银行卡 clearable :must-fill=true :show-warning=showW text-align=right data-type=bank placeholder=请输入用户名></mobile-input> <mobile-input title=数字 :show-warning=showW :warning-type=\"'text'\" :must-fill=true text-align=right data-type=number placeholder=请输入用户名></mobile-input> <mobile-input title=小数 clearable :must-fill=true data-type=decimal placeholder=请输入用户名></mobile-input> <mobile-input title=整数 :show-warning=showW :must-fill=true data-type=integer placeholder=请输入用户名></mobile-input> <mobile-input title=禁用 data-type=text disabled=disabled placeholder=请输入用户名></mobile-input> <mobile-input title=只读 data-type=text readonly=readonly placeholder=请输入用户名 actual-value=这是只读的内容></mobile-input> <mobile-input title=密码 data-type=password placeholder=请输入用户名></mobile-input> <div @click=sss>aaaa</div> </div> "},560:function(t,e,i){var l,o,a={};i(655),l=i(204),o=i(424),t.exports=l||{},t.exports.__esModule&&(t.exports=t.exports.default);var n="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;o&&(n.template=o),n.computed||(n.computed={}),Object.keys(a).forEach(function(t){var e=a[t];n.computed[t]=function(){return e}})},655:function(t,e,i){var l=i(378);"string"==typeof l&&(l=[[t.id,l,""]]);i(4)(l,{});l.locals&&(t.exports=l.locals)}});