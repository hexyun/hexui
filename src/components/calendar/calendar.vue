<template>
  <div class="celendar">
    <div class="head">
      <div class="time">
        <span class="year" @click="statu = 'years'">{{currentYear}}年</span>
        <span class="month" @click="statu = 'months'" v-show="statu!=='years'">{{currentMonth + 1}}月</span>
      </div>
      <div class="button">
        <div @click="preMon">
          <svg
            t="1566202119123"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1981"
            width="10"
            height="10"
          >
            <path
              d="M784.652701 955.6957 346.601985 517.644983c-2.822492-2.822492-2.822492-7.902977 0-11.289967l439.179713-439.179713c6.77398-6.77398 10.725469-16.370452 10.725469-25.966924L796.507166 36.692393c0-20.32194-16.370452-36.692393-36.692393-36.692393l-4.515987 0c-9.596472 0-19.192944 3.951488-25.966924 10.725469L250.072767 489.420066c-12.418964 12.418964-12.418964 32.740904 0 45.159868l477.565601 477.565601c7.338479 7.338479 17.499449 11.854465 28.224917 11.854465l0 0c22.015436 0 40.079383-18.063947 40.079383-40.079383l0 0C796.507166 973.759647 791.99118 963.598677 784.652701 955.6957z"
              p-id="1982"
            />
          </svg>
        </div>
        <span class="today" @click="today">今天</span>
        <div @click="nextMon">
          <svg
            t="1566202156077"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1981"
            width="10"
            height="10"
          >
            <path
              d="M246.121279 955.6957l438.050717-438.050717c2.822492-2.822492 2.822492-7.902977 0-11.289967L244.992282 67.175303c-6.77398-6.77398-10.725469-16.370452-10.725469-25.966924L234.266814 36.692393C234.266814 16.370452 250.637266 0 270.959206 0l4.515987 0c9.596472 0 19.192944 3.951488 25.966924 10.725469l478.694598 478.694598c12.418964 12.418964 12.418964 32.740904 0 45.159868l-477.565601 477.565601c-7.338479 7.338479-17.499449 11.854465-28.224917 11.854465l0 0c-22.015436 0-40.079383-18.063947-40.079383-40.079383l0 0C234.266814 973.759647 238.7828 963.598677 246.121279 955.6957z"
              p-id="1982"
            />
          </svg>
        </div>
      </div>
    </div>


    <ul class="week" v-show="statu==='days'">
      <li v-for="item in weeks">{{item}}</li>
    </ul>
    <ul class="date" v-show="statu==='days'">
      <li
        v-for="(index,item) in list"
        :class="{'active': (item.y === currentYear && item.m === (currentM+1) && item.d === currentDay) || index === selected || (item.y===year && item.m === month && item.d === day)}"
        @click="selectedDay(item, index)"
        :style="{ 'border-color': color || '#E9E9E9'}"
      >
        <div class="day" :class="{'text-color': item.cur}">{{item.d}}</div>
        <div class="content">
          <div
            class="things"
            v-for="thing in item.showThings"
            @click="selectedThing(thing, item)"
          >
            <span class="thing">{{thing.name}}</span>
            <span class="thing-time">{{getTime(thing.time)}}</span>
          </div>
        </div>
      </li>
    </ul>
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
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'calendar',
  props: ['things', 'prefab', 'color', 'max'],
  data () {
    return {
      year: new Date().getFullYear(), // 今日年份
      month: new Date().getMonth() + 1, // 今日月份
      day: new Date().getDate(), // 今日日份
      currentYear: '', // 当前显示年份
      currentMonth: '', // 当前显示月份 0-11,显示时加一
      currentM: '',
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
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      selected: null
    }
  },
  computed: {
    years: function () {
      let arr = []
      for (let i = this.currentYear - 4; i <= this.currentYear + 4; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  compiled () {
    if (this.prefab) {
      let prefab = new Date(this.prefab);
      this.currentYear = prefab.getFullYear();
      this.currentM = prefab.getMonth();
      this.currentMonth = prefab.getMonth();
      this.currentDay = prefab.getDate();
      this.showCalender('prefab');
    } else {
      this.showCalender();
    }
  },
  methods: {
    isLeap (year) {
      // 判断是不是闰年
      return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
    },
    showCalender (type) {
      this.list = []
      this.newDate = new Date()
      if (!type) {
        this.currentYear = this.newDate.getFullYear()
        this.currentMonth = this.newDate.getMonth()
        this.currentDay = this.newDate.getDate()
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
        `${this.currentYear}/${this.currentMonth + 1}/1`
      )
      for (let i = 0; i < this.monthDays[this.currentMonth]; i++) {
        // 当前月份
        this.list.push({
          y: this.currentYear,
          m: this.currentMonth + 1,
          d: i + 1,
          cur: true
        })
      }
      console.log('zhengchang', this.list);
      console.log('firstday',this.firstDay.getDay());
      this.firstnow = this.firstDay.getDay() // 当月第一日是星期几 1-7
      if (this.firstnow === 0) this.firstnow = 7
      if (this.firstnow > 1) {
        console.log('firstnow>1',this.firstnow);
        // 前一个月份
        let monIndex = this.currentMonth
        let year = this.currentYear
        if (monIndex === 0) {
          year--
          monIndex = 11
        } else {
          monIndex--
        }
        for (let i = 0; i < this.firstnow - 1; i++) {
          console.log('firstnow1',this.firstnow)
          this.list.unshift({
            y: year,
            m: monIndex + 1,
            d: this.monthDays[monIndex] - i
          })
          console.log('pre', this.list);
        }
      }
      const num = (this.monthDays[this.currentMonth] + this.firstnow - 1) % 7
      console.log('num',num);
      if (num > 0) {
        // 下个月份
        let monIndex2 = this.currentMonth
        let year2 = this.currentYear
        if (monIndex2 === 11) {
          year2++
          monIndex2 = 0
        } else {
          monIndex2++
        }
        for (let i = 0; i < 7 - num; i++) {
          console.log('num1', num);
          this.list.push({
            y: year2,
            m: monIndex2 + 1,
            d: i + 1
          })
          console.log('next', this.list);
        }
      }
    this.addThings()
    },
    addThings () {
      let { list, things } = this
      if (!things) return;
      for (let i = 0; i < list.length; i++) {
        for (let index = 0; index < things.length; index++) {
          if (!things[index].time) break
          const date = new Date(things[index].time)
          if (
            list[i].d === date.getDate() &&
            list[i].m === date.getMonth() + 1 &&
            list[i].y === date.getFullYear()
          ) {
            list[i].things = things[index].list
            list[i].showThings = this.showThings(things[index].list);
          }
        }
      }
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
      this.selected = null
      this.showCalender('pre')
    },
    nextMon () {
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
      this.selected = null;
    },
    today () {
      this.statu = 'days'
      this.showCalender()
    },
    selectedMonths (month) {
      if (this.statu !== 'months') return
      this.currentMonth = month
      this.statu = 'days'
      this.showCalender('select')
    },
    selectedYears (year) {
      if (this.statu !== 'years') return
      this.currentYear = year
      this.statu = 'months'
    },
    selectedDay (day, index) {
      this.selected = index
      this.$emit('selected-day', day)
    },
    selectedThing (thing, item) {
      this.$emit('selected-thing', thing, item)
    },
    // 事宜显示，显示不下时隐藏
    /**
     * 每个li都高度是总高度的0.2
     */
    showThings (things) {
      if(!this.max) return things;
      if (things.length > this.max) {
        let showThings = things.slice(0, this.max - 1);
        showThings.push({name: '显示更多', time: null});
        return showThings;
      } else {
        return things;
      }
    }
  },
  created () {
  },
  watch: {
    things() {
      this.addThings()
      this.showCalender('thing');
    }
  }
}
</script>

<style scoped>
.celendar {
  height: 100%;
}
.week li{
  height: 25px;
  color: black;
  font-weight: 600;
  border-width: 0;
  position: relative;
  left: 4px;
}
.content {
  height: 86%;
  overflow: hidden;
}
.content .things {
  height: 16px;
  margin-left: 4px;
}
.content .thing {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  width: calc(100% - 38px);
  cursor: pointer;
}
.content .thing-time {
  width: 34px;
  display: inline-block;
  position: relative;
  top: -5px;
  cursor: pointer;
}
ul{
  display: flex;
  padding: 0;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}
ul[class="date"] {
  height: 80%;
}
.date li {
  height: 25%;
}
li{
  width: 14.285%;
  height: 100px;
  border: 1px solid #E9E9E9;
  color: #999;
  font-size: 12px;
  overflow: hidden;
}
.day{
  margin-bottom: 6px;
  margin-left: 5px;
  font-size: 14px;
  cursor: initial;
}
.text-color{
  color: #222;
}
.active{
  background-color: #E9E9E9;
  color: black;
}
.active .day {
  font-weight: 600;
}
/* 年份显示 */
ul[class="years"] {
  margin-top: 40px;
}
ul[class="years"] li {
  width: 33.33%;
  text-align: center;
  line-height: 100px;
  font-size: 16px;
}
/* 月份显示 */
ul[class="months"] {
  margin-top: 40px;
}
ul[class="months"] li {
  width: 25%;
  text-align: center;
  line-height: 100px;
  font-size: 14px;
}

.time {
  display: inline-block;
  font-size: 23px;
  margin-left: 3px;
}
.button {
  display: inline-block;
  float: right;
  top: 6.5px;
  position: relative;
  bottom: -8px;
}
.button > div {
  display: inline-block;
  border: 1px solid #E9E9E9;
  padding: 0 8px;
  cursor: pointer;
}
.today {
  border: 1px solid #E9E9E9;
  padding: 0 8px;
  font-size: 13px;
  height: 20px;
  display: inline-block;
  top: 1px;
  position: relative;
  cursor: pointer;
}
</style>
