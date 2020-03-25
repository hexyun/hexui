<template>
  <div class="celendar">
    <div class="head">
      <div class="time" :style="{'color': textcolor || ''}">
        <span class="year" @click="statu = 'years'">{{currentYear}}年</span>
        <span class="month" @click="statu = 'months'" v-show="statu!=='years'">{{currentMonth + 1}}月</span>
      </div>
      <Icon type="ios-close-empty" @click="$emit('close')"></Icon>
    </div>
    <ul class="week" v-show="statu==='days'">
      <li v-for="item in weeks">{{item}}</li>
    </ul>
    <div class="date-list"  v-show="statu==='days'">
      <ul class="date" v-for="(index,item) in 1">
        <li
          v-for="(index,item) in list"
          :class="{
            'active': selected && item.y === selected.y && item.m === selected.m && item.d === selected.d,
            'today': item.y == today.y && item.m == today.m && item.d == today.d && item !== selected,
            'un-active': item.isPre || item.isNext
          }"
          @click="selectedDay(item, index)"
        >
          <div class="day" :class="index === selected ? 'textcolor' : ''">{{item.d}}</div>  
        </li>
      </ul>
    </div>
    <ul class="months" v-show="statu==='months'">
      <li
        :class="{'active': index === currentMonth}"
        v-for="(index, mon) in months"
        :key="index"
        @click="selectedMonths(index)"
        :style="{ 'border-color': color || '#E9E9E9'}"
      >{{mon}}</li>
    </ul>
    <ul class="years" v-show="statu==='years'">
      <li
        :class="{'active': year === currentYear}"
        v-for="year in years"
        @click="selectedYears(year)"
        :style="{ 'border-color': color || '#E9E9E9'}"
      >{{year}}</li>
      <li></li>
    </ul>
    <div class="btn" @click="ok">确定</div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'calendar',
  props: ['prefab', 'color', 'max', 'havething', 'thingdate', 'selectcolor', 'currentcolor', 'textcolor', 'iflunar'],
  data () {
    return {
      year: new Date().getFullYear(), // 今日年份
      month: new Date().getMonth() + 1, // 今日月份
      day: new Date().getDate(), // 今日日份
      currentYear: '', // 当前显示年份
      currentMonth: '', // 当前显示月份 0-11,显示时加一
      currentDay: '', // 当前显示日份
      monthDays: [], // 1-12月的天数
      list: [],
      statu: 'days',
      months: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ],
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      days: [],
      preDays: [],
      nextDays: [],
      selected: null,
    }
  },
  computed: {
    years: function () {
      let arr = []
      for (let i = this.currentYear - 5; i <= this.currentYear + 5; i++) {
        arr.push(i)
      }
      return arr
    },
    today() {
      let now = new Date();
      return {
        y: now.getFullYear(),
        m: now.getMonth() + 1,
        d: now.getDate()
      }
    }
  },
  compiled () {
    this.getDays();
    if (this.prefab) {
      let prefab = new Date(this.prefab);
      this.currentYear = prefab.getFullYear();
      this.currentMonth = prefab.getMonth();
      this.currentDay = prefab.getDate();
      this.selected = {
        y: this.currentYear,
        m: this.currentMonth + 1,
        d: this.currentDay
      }
      this.showCalender('prefab');
    } else {
      this.showCalender();
    }
  },
  methods: {
    ok () {
      this.$emit('finish', this.selected ? `${this.selected.y}/${this.selected.m}/${this.selected.d}` : null)
    },
    getDays () { // 获取当前月份所有公历日期及其农历日期
      this.days = []
      this.preDays = []
      this.nextDays = []
      const time = new Date()
      time.setFullYear(this.year, 1, 0)
      for (let i = 1; i <= time.getDate(); i++) {
        this.days.push({gregorian: i, lunar: this.getLunarDay(this.year, this.month, i)})
      }
      for (let i = 1; i <= time.getDate(); i++) {
        if (this.month == 1) {
          let monthTemp = 12;
          this.preDays.push({gregorian: i, lunar: this.getLunarDay(this.year - 1, monthTemp, i)})
        }
        else {
          this.preDays.push({gregorian: i, lunar: this.getLunarDay(this.year, this.month - 1, i)})
        }
      }
      for (let i = 1; i <= time.getDate(); i++) {
        if (this.month == 12) {
          this.nextDays.push({gregorian: i, lunar: this.getLunarDay(this.year + 1, 1, i)})
        } else {
          this.nextDays.push({gregorian: i, lunar: this.getLunarDay(this.year , this.month + 1, i)})
        }
      }
    },
    getLunarDay (solarYear, solarMonth, solarDay) {
      const madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
      const numString = '一二三四五六七八九十'
      const monString = '正二三四五六七八九十冬腊'
      const CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95]
      if (!(solarYear < 1921 || solarYear > 2021)) {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11
        const timeArr = [solarYear, solarMonth, solarDay]
        let TheDate = (timeArr.length !== 3) ? new Date() : new Date(timeArr[0], timeArr[1], timeArr[2])
        let total, m, n, k
        let isEnd = false
        let theDateYear = TheDate.getFullYear()
        total = (theDateYear - 1921) * 365 + Math.floor((theDateYear - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38
        if (theDateYear % 4 === 0 && TheDate.getMonth() > 1) {
          total++
        }
        for (m = 0; ; m++) {
          k = (CalendarData[m] < 0xfff) ? 11 : 12
          for (n = k; n >= 0; n--) {
            if (total <= this.getBit(CalendarData[m], n)) {
              isEnd = true
              break
            }
            total = total - this.getBit(CalendarData[m], n)
          }
          if (isEnd) {
            break
          }
        }
        let cMonth, cDay // cYear,
        // cYear = 1921 + m
        cMonth = k - n + 1
        cDay = total
        if (k === 12) {
          if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--
          }
        }
        // let run = ''
        let cDayStr = numString.charAt(cDay - 1)
        /* if (cMonth < 1) {
          run = '(闰)'
        } */
        if (cDay % 10 !== 0 || cDay === 10) {
          cDayStr = numString.charAt((cDay - 1) % 10)
        }
        return cDay === 1 ? monString.charAt(cMonth - 1) + '月' : (cDay < 11 ? '初' : (cDay < 20 ? '十' : (cDay < 30 ? '廿' : '三十'))) + cDayStr // tgString.charAt((cYear - 4) % 10) + dzString.charAt((cYear - 4) % 12) + '年 ' + run + monString.charAt(cMonth - 1) + '月' +
      }
    },
    getBit (m, n) {
      return 29 + ((m >> n) & 1)
    },
    isLeap (year) {
      // 判断是不是闰年
      return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
    },
    showCalender (type, Y = this.currentYear, M = this.currentMonth, D = this.currentDay) {
      let list = []
      this.newDate = new Date()
      if (!type) {
        Y = this.newDate.getFullYear()
        M = this.newDate.getMonth()
        D = this.newDate.getDate()
      }
      this.monthDays = [
        31,
        28 + this.isLeap(this.currentYear),
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
      this.firstDay = new Date(
        `${Y}/${M}/1`
      )
      for (let i = 0; i < this.monthDays[M]; i++) {
        if (this.days[i].gregorian - 1 == i) {
          // 当前月份
          list.push({
            y: Y,
            m: M + 1,
            d: i + 1,
            cur: true,
            lunar: this.days[i].lunar
          })
        }
      }
      this.firstnow = this.firstDay.getDay() // 当月第一日是星期几 1-7
      if (this.firstnow === 0) this.firstnow = 7
      if (this.firstnow > 1) {
        // 前一个月份
        let monIndex = M
        let year = Y
        if (monIndex === 0) {
          year--
          monIndex = 11
        } else {
          monIndex--
        }
        for (let i = 0; i < this.firstnow - 1; i++) {
          this.preDays.map(item => {
            if (item.gregorian == this.monthDays[monIndex] - i) {
              list.unshift({
                y: year,
                m: monIndex + 1,
                d: this.monthDays[monIndex] - i,
                lunar: item.lunar,
                isPre: true
              })
            }
          })
        }
      }
      const num = (this.monthDays[M] + this.firstnow - 1) % 7
      if (num > 0) {
        // 下个月份
        let monIndex2 = M
        let year2 = Y
        if (monIndex2 === 11) {
          year2++
          monIndex2 = 0
        } else {
          monIndex2++
        }
        for (let i = 0; i < 7 - num; i++) {
          this.nextDays.map(item => {
            if (item.gregorian == i + 1) {
              list.push({
                y: year2,
                m: monIndex2 + 1,
                d: i + 1,
                lunar: item.lunar,
                isNext: true
              })
            }
          })
        }
      }
      return list
    },
    getTime (date) {
      if (!date) return '';
      let time = new Date(date)
      let hours = time.getHours()
      let minutes = time.getMinutes()
      hours = hours > 9 ? hours : '0' + hours
      minutes = minutes > 9 ? minutes : '0' + minutes
      return hours + ':' + minutes
    },
    preMon () {
      if (this.month == 1) {
        this.month = 12
        this.year = this.year - 1
        this.getDays();
      } else {
        this.month = this.month - 1;
        this.getDays();
      }
      if (this.statu === 'years') {
        this.currentYear -= 4
        return
      }
      if (this.currentMonth === 0) {
        this.currentYear--
        this.currentMonth = 11
      } else {
        this.currentMonth--
      }
      this.showCalender('pre')
    },
    nextMon () {
      if (this.month == 12) {
        this.month = 1
        this.year = this.year + 1
        this.getDays();
      } else {
        this.month = this.month + 1;
        this.getDays();
      }
      if (this.statu === 'years') {
        this.currentYear += 4
        return
      }
      if (this.currentMonth === 11) {
        this.currentYear++
        this.currentMonth = 0
      } else {
        this.currentMonth++
      }
      this.showCalender('next')
    },
    today () {
      this.statu = 'days'
      this.showCalender()
    },
    selectedMonths (month) {
      if (this.statu !== 'months') return
      this.currentMonth = month
      this.month = month + 1;
      this.statu = 'days'
      this.getDays();
      this.showCalender('select')
    },
    selectedYears (year) {
      if (this.statu !== 'years') return
      this.currentYear = year;
      this.year = year;
      this.statu = 'months'
    },
    selectedDay (day, index) {
      this.selected = day
      this.$emit('selected-day', day)
    },
  }
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
      color: #0000;
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
    }
  }
}
</style>
