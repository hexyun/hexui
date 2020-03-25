<template>
  <div class="celendar">
    <div class="head">
      <div class="time" :style="{'color': textcolor || ''}">
        <span class="year" @click="status = 'years'">{{current.y}}年</span>
        <span class="month" @click="status = 'months'" v-show="status!=='years'">{{current.m}}月</span>
      </div>
      <Icon type="ios-close-empty" @click="$emit('close')"></Icon>
    </div>
    <ul class="week" v-show="status==='days'">
      <li v-for="item in weeks">{{item}}</li>
    </ul>
    <div class="date-list"  v-show="status==='days'">
      <div>
        <ul class="date" v-for="(index,item) in list" :id="'day-list-' + index">
          <li
            v-for="(index,item) in item"
            :class="{
              'active': selected && item.y === selected.y && item.m === selected.m && item.d === selected.d,
              'today': item.y == now.y && item.m == now.m && item.d == now.d && item !== selected,
              'un-active': item.m != current.m
            }"
            @click="selectedDay(item, index)"
          >
            <div class="day" :class="index === selected ? 'textcolor' : ''">{{item.d}}</div>  
          </li>
        </ul>
      </div>
    </div>
    <ul class="months" v-show="status==='months'">
      <li
        :class="{'active': mon == current.m}"
        v-for="(index, mon) in months"
        :key="mon"
        @click="selectedMonths(mon)"
        :style="{ 'border-color': color || '#E9E9E9'}"
      >{{mon}}</li>
    </ul>
    <ul class="years" v-show="status==='years'">
      <li
        :class="{'active': year == current.y}"
        v-for="year in years"
        @click="selectedYears(year)"
        :style="{ 'border-color': color || '#E9E9E9'}"
      >{{year}}</li>
      <li></li>
    </ul>
    <div class="btn">确定</div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'calendar',
  props: ['date', 'color', 'textcolor'],
  data () {
    return {
      now: {
        y: new Date().getFullYear(),
        m: new Date().getMonth() + 1,
        d: new Date().getDate(),
      },
      monthDays: [], // 1-12月的天数
      current: {
        y: '',
        d: '',
        m: '',
        day: ''
      },
      selected: {
        y: '',
        d: '',
        m: ''
      },
      list: [],
      status: 'days',
      months: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
      ],
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      days: [],
      preDays: [],
      nextDays: [],
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        if(val) {
          let t = new Date(val);
          this.current = {
            y: t.getFullYear(),
            m: t.getMonth()+ 1,
            d: t.getDate(),
          };
          this.init();
        } else {
          this.current = this.now;
          this.init()
        }
      }
    },
    selected: {
      deep: true,
      handler(val) {
        if(val.y && val.m && val.d) {
          this.current = val;
          this.data = new Date(`${val.y}/${val.m}/${val.d}`)
        }
      }
    },
    status(val) {
      if(val == 'days') {
        this.init(this.current)
      }
    }
  },
  created() {
  },
  computed: {
    // 每个月的天数
    monthDays() {
      return [
        31,
        28 + this.isLeap(this.current.y),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ]
    },
    years() {
      let arr = []
      for (let i = this.current.y - 4; i < this.current.y + 5; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    init() {
      let cur = this.getList(this.current)
      let pre = this.getList({
        y: this.current.m == 1 ? this.current.y - 1 : this.current.y,
        m: this.current.m == 1 ? 12 : this.current.m - 1,
        d: this.current.d
      })
      let next = this.getList({
        y: this.current.m == 12 ? this.current.y + 1 : this.current.y,
        m: this.current.m == 12 ? 1 : this.current.m + 1,
        d: this.current.d
      })
      this.list = [pre, cur, next];
      this.$nextTick(() => {
        let curView = document.getElementById('day-list-1');
        curView.scrollIntoView({behavior: 'smooth'})
      })
    },
    getList(date) {
      let list = []
      for (let i = 0; i < this.monthDays[date.m - 1]; i++) {
        list.push({
          y: date.y,
          m: date.m,
          d: i + 1
        })
      }
      // 处理上个月
      let first = new Date(`${date.y}/${date.m}/1`);
      first = first.getDay();
      let preMonth = date.m == 1 ? 12 : date.m - 1;
      let preYear = date.m == 1 ? date.y - 1 : date.y;
      console.log( '第一天是星期', first)
      for(let i = 0; i < first; i++) {
        list.unshift({
          y: preYear,
          m: preMonth,
          d: this.monthDays[preMonth - 1] - i
        })
      }

      // 处理下个月
      let end = new Date(`${date.y}/${date.m}/${this.monthDays[date.m - 1]}`)
      end = end.getDay();
      let nextMonth = date.m == 12 ? 1 : date.m + 1;
      let nextYear = date.m == 12 ? date.y + 1 : date.y;
      for(let i = 0; i < 7 - end - 1; i++) {
        list.push({
          y: nextYear,
          m: nextMonth,
          d: 1 + i
        })
      }

      return list;
    },
    isLeap (year) {
      return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
    },
    selectedMonths(m) {
      this.selected.m = m;
      this.current.m = m;
      this.status = 'days'
    },
    selectedYears(y) {
      this.selected.y = y;
      this.current.y = y;
      this.status = 'months'
    },
    selectedDay(d, index) {
      this.selected.d = d.d;
    }
    
  },
}
</script>

<style lang="less" scoped>
.FS {
  font-size: 16pt;
}
.celendar {
  background-color: white;
  z-index: 101;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 12pt;
  animation:show .3s forwards;
  @keyframes show{
    to {
      visibility:visible;
      opacity: 1;
      transform: translateY(0)
    }
    from {
      transform: translateY(300px)
    }
  }
  transition: all .3s;
  .head {
    .FS;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .week {
    > li {
      display: inline-block;
      width: 14.285%;
      text-align: center;
    }
  }
  .date {
    > li {
      display: inline-block;
      width: 14.285%;
      text-align: center;
    }
    .un-active {
      color: #d9d9d9;
    }
    .active {
      color: white;
      background-color: #E95252
    }
    .today {
      color: #E95252;
      background-color: #FFECF0;
    }
  }
  .btn {
    width: 100%;
    text-align: center;
    background-color: #E95252;
    color: white;
  }
  .months, .years {
    display: flex;
    flex-direction: inherit;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      display: inline-block;
      white-space: nowrap;
      min-width: 4em;
      padding: 8pt 0;
      width: 30%;
      text-align: center;
    }
  }
  .active {
    background-color: #E95252;
    color: white;
  }
  .date-list {
    height: 155px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
