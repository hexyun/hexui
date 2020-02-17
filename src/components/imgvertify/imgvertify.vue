<template>
  <div class="mask_layer_model" v-if="visible" style="z-index: 9;">
        <div class="captcha_model">
            <div class="headerimg">
                <span>请完成安全验证</span>
                <span style="float: right"  title="关闭验证码" @click="close">
                <i class="iconfont icon-Close"></i>
            </span>
            </div>
            <div class="contentimg">
                <div class="sliding-pictures">
                    <img class="img" src="../../../assets/刷新.png" @click="onRefresh" title="刷新验证码"></img>
                    <div id="captcha" v-el:vertify>
                    </div>
                </div>
            </div>
            <div class="sliderContainer" v-el:slidercontainer>
                <div class="sliderMask" v-el:slidermask>
                    <div class="slider" v-el:slider>
                        <span class="sliderIcon"></span>
                    </div>
                </div>
                <span class="sliderText">向右滑动填充拼图</span>
            </div>
        </div>

    </div>
</template>
<script>
import Vue from 'vue';
    export default {
        data() {
            return {
                visible: true,
                cv:{
                    w:310,
                    h:155,
                },
                block:{
                    l:42, // 滑块边长
                    L:42+9*2+3,// 滑块实际边长
                    r:9, // 滑块半径
                },
                randomPos:{
                    x:0,
                    y:0,
                },
                canvasCtx:null,
                blockCtx:null,
                blockDom:null,
                sliderDom:null,
                sliderContainerDom:null,
                sliderMaskDom:null,
                el:null,
                img:null,
                trail:null,

            };
        },
        watch: {

        },
        beforeCreate() {},
        created() {
          
        },
        compiled () {
          this.init();
        },
        methods: {
            close(){
                this.visible = false
            },
            init(){
                this.canvasInit();
                this.initImg();
                this.bindEvents();
            },
            onRefresh(){
                this.reset()
            },
            onSuccess(){
                this.$msg.success("登录成功！");
            },
            onFail(){
                this.$msg.warning("再试一次！");
            },
            bindEvents () {
                this.el.onselectstart = () => false

                let originX, originY, trail = [], isMouseDown = false

                const addClass = function (tag, className) {
                    tag.classList.add(className)
                }

                const removeClass = function  (tag, className) {
                    tag.classList.remove(className)
                }


                const handleDragStart = function (e) {
                    originX = e.clientX || e.touches[0].clientX
                    originY = e.clientY || e.touches[0].clientY
                    isMouseDown = true
                    console.log(originX)
                }

                const handleDragMove = (e) => {
                    if (!isMouseDown) return false
                    const eventX = e.clientX || e.touches[0].clientX
                    const eventY = e.clientY || e.touches[0].clientY
                    const moveX = eventX - originX
                    const moveY = eventY - originY
                    if (moveX < 0 || moveX + 38 >= this.cv.w) return false
                    this.sliderDom.style.left = moveX + 'px'
                    const blockLeft = (this.cv.w - 40 - 20) / (this.cv.w - 40) * moveX
                    this.blockDom.style.left = blockLeft + 'px'

                    addClass(this.sliderContainerDom, 'sliderContainer_active')
                    this.sliderMaskDom.style.width = moveX + 'px'
                    trail.push(moveY)
                }

                const handleDragEnd = (e) => {
                    if (!isMouseDown) return false
                    isMouseDown = false
                    const eventX = e.clientX || e.changedTouches[0].clientX
                    if (eventX == originX) return false
                    removeClass(this.sliderContainerDom, 'sliderContainer_active')
                    this.trail = trail
                    const { spliced, verified } = this.verify()
                    if (spliced) {
                        if (verified) {
                           addClass(this.sliderContainerDom, 'sliderContainer_success')
                           this.$emit('success')
                        } else {
                            addClass(this.sliderContainerDom, 'sliderContainer_fail')
                            this.$emit('fail')
                            this.onRefresh()
                        }
                    } else {
                        addClass(this.sliderContainerDom, 'sliderContainer_fail')
                        setTimeout(() => {
                          this.$emit('fail')
                            this.onRefresh()
                        }, 1000)
                    }
                }
                this.sliderDom.addEventListener('mousedown', handleDragStart)
                this.sliderDom.addEventListener('touchstart', handleDragStart)
                this.blockDom.addEventListener('mousedown', handleDragStart)
                this.blockDom.addEventListener('touchstart', handleDragStart)
                document.addEventListener('mousemove', handleDragMove)
                document.addEventListener('touchmove', handleDragMove)
                document.addEventListener('mouseup', handleDragEnd)
                document.addEventListener('touchend', handleDragEnd)
            },
            verify () {
                const sum = function (x, y) {
                    return x + y
                }
                const square =  function  (x) {
                    return x * x
                }

                const arr = this.trail // 拖动时y轴的移动距离
                const average = arr.reduce(sum) / arr.length
                const deviations = arr.map(x => x - average)
                const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length)
                const left = parseInt(this.blockDom.style.left)
                return {
                    spliced: Math.abs(left - this.randomPos.x) < 10,
                    verified: stddev !== 0, // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
                }
            },
            reset () {
                this.sliderContainerDom.className = 'sliderContainer'
                this.sliderDom.style.left = 0
                this.blockDom.style.left = 0
                this.sliderMaskDom.style.width = 0
                this.clean()
                this.img.setSrc(this.getRandomImgSrc())
            },
            clean () {
                this.canvasCtx.clearRect(0, 0, this.cv.w, this.cv.h)
                this.blockCtx.clearRect(0, 0, this.cv.w, this.cv.h)
                this.blockDom.width = this.cv.w
            },
            draw () {
                // 随机创建滑块的位置
                this.randomPos.x = this.getRandomNumberByRange(this.block.L + 10, this.cv.w - (this.block.L + 10))
                this.randomPos.y = this.getRandomNumberByRange(10 + this.block.r * 2, this.cv.h - (this.block.L + 10))
                this.drawBlock(this.canvasCtx, this.randomPos.x, this.randomPos.y, 'fill')
                this.drawBlock(this.blockCtx, this.randomPos.x, this.randomPos.y, 'clip')
            },
            drawBlock(ctx, x, y, operation) {
                let r = this.block.r,
                    l = this.block.l,
                    PI = Math.PI;

                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
                ctx.lineTo(x + l, y)
                ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
                ctx.lineTo(x + l, y + l)
                ctx.lineTo(x, y + l)
                ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
                ctx.lineTo(x, y)
                ctx.lineWidth = 2
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
                ctx.stroke()
                ctx[operation]()
                ctx.globalCompositeOperation = 'destination-over'
            },
            initImg(){
                const img = this.createImg(() => {
                    this.draw()
                    this.canvasCtx.drawImage(img, 0, 0, this.cv.w, this.cv.h)
                    this.blockCtx.drawImage(img, 0, 0, this.cv.w, this.cv.h)
                    const y = this.randomPos.y - this.block.r * 2 - 1;
                    const ImageData = this.blockCtx.getImageData(this.randomPos.x - 3, y, this.block.L, this.block.L)
                    this.blockDom.width = this.block.L
                    this.blockCtx.putImageData(ImageData, 0, y)
                })
                this.img = img
            },
            canvasInit(){
              console.log('111');
                const canvas = this.createCanvas(this.cv.w, this.cv.h) // 画布
                const block = canvas.cloneNode(true) // 滑块

                block.className = 'block'
                const el = this.$els.vertify;
                console.log(this.$els.vertify);
                el.style.position = 'relative'
                el.style.width = this.cv.w + 'px'
                Object.assign(el.style, {
                    position: 'relative',
                    width: this.cv.w + 'px',
                    margin: '0 auto'
                })

                this.el = el
                el.appendChild(canvas)
                el.appendChild(block)

                this.canvasCtx = canvas.getContext("2d");
                this.blockCtx = block.getContext("2d");
                this.blockDom=block;
                block.style.position = 'absolute';
                canvas.style.position = 'absolute';
                this.sliderDom=this.$els.slider;
                this.sliderContainerDom=this.$els.slidercontainer;
                this.sliderMaskDom=this.$els.slidermask;
                console.log(this.sliderDom)
            },
            createCanvas (width, height) {
                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height
                return canvas
            },
            createImg (onload) {
                const img = new Image()
                img.crossOrigin = "Anonymous"
                img.onload = onload
                img.onerror = () => {
                    img.setSrc(this.getRandomImgSrc())
                }

                img.setSrc =  (src) =>{
                    if (window.navigator.userAgent.indexOf('Trident') > -1) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
                        const xhr = new XMLHttpRequest()
                        xhr.onloadend =  (e) =>{
                            const file = new FileReader() // FileReader仅支持IE10+
                            file.readAsDataURL(e.target.response)
                            file.onloadend = function (e) {
                                img.src = e.target.result
                            }
                        }
                        xhr.open('GET', src)
                        xhr.responseType = 'blob'
                        xhr.send()
                    }
                    else img.src = src
                }
                img.setSrc(this.getRandomImgSrc())
                return img
            },

            getRandomNumberByRange (start, end) {
                return Math.round(Math.random() * (end - start) + start)
            },
            getRandomImgSrc () {
              let arr = ['https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF1.jpeg','https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF2.jpeg','https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF3.jpeg','https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF4.jpeg',
              'https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF5.jpeg','https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF6.jpeg','https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF7.jpeg','https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF8.jpeg',
              'https://hexyun.oss-cn-beijing.aliyuncs.com/%E9%A3%8E%E6%99%AF9.jpeg'];
              let index = Math.floor((Math.random()*arr.length));
              return arr[index];
              
                // return 'https://picsum.photos/300/150/?image=' + this.getRandomNumberByRange(0, 1084)
                // return 'https://picsum.photos/id/407/300/150'
            },
        }
    };
</script>
<style scoped>
  .block {
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  cursor: grab;
}

.block:active {
  cursor: pointer;
  cursor: grabbing;
}
.sliderContainer {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 155px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.sliderContainer_active .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #1991FA;
}

.sliderContainer_active .sliderMask {
  height: 38px;
  border-width: 1px;
}

.sliderContainer_success .slider {
  height: 38px;
  top: -1px;
  margin-left: -1px;
  border: 1px solid #52CCBA;
  background-color: #52CCBA !important;
}

.sliderContainer_success .sliderMask {
  height: 38px;
  border: 1px solid #52CCBA;
  background-color: #D2F4EF;
}

.sliderContainer_success .sliderIcon {
  background-position: 0 0 !important;
}

.sliderContainer_fail .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.sliderContainer_fail .sliderMask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.sliderContainer_fail .sliderIcon {
  top: 14px;
  background-position: 0 -82px !important;
}
.sliderContainer_active .sliderText, .sliderContainer_success .sliderText, .sliderContainer_fail .sliderText {
  display: none;
}

.sliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991FA;
  background: #D1E9FE;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: background .2s linear;
  cursor: pointer;
  cursor: grab;
}

.slider:active {
  cursor: grabbing;
}

.slider:hover {
  background: #1991FA;
}

.slider:hover .sliderIcon {
  background-position: 0 -13px;
}

.sliderIcon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png) 0 -26px;
  background-size: 34px 471px;
}

.refreshIcon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png) 0 -437px;
  background-size: 34px 471px;
}

.captcha_model{
  background-color: white;
  width:310px;
  height: 229px;
  
}
.headerimg{
    font-size: .18rem;
    padding: 2% 5%;
    border-bottom: 1px solid #ccc;
  }
.contentimg{
    padding-top: .1rem;
    
  }
.sliding-pictures{
      position: relative;
      
    }
.img{
        position: absolute;
        right: 2%;
        z-index: 9;
        width:20px;
        height: 20px;
      }

.mask_layer_model{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  font-size: .13rem;
}
</style>>