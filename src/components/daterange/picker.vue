<template>
    <div class="range-ant"
        :class="[prefixCls]"
        v-clickoutside="handleClose">
        <div v-el:reference :class="[prefixCls + '-rel']" @click="handleFocus" @mouseover="mouseEnter" @mouseout="mouseOut">
            <span class="showDate" :class="[startDate ? '' : 'nodate']">{{startDate | start}}</span>
            <span class="link">~</span>
            <span class="showDate" :class="[startDate ? '' : 'nodate']">{{endDate | end}}</span>
            <i class="icon"></i>
            <!-- <i class="icon-close" v-show="iconType" @click.stop="handleClear"></i> -->
        </div>
        <Drop v-show="opened" :placement="placement" :transition="transition" v-ref:drop>
            <div v-el:picker></div>
        </Drop>
    </div>
</template>
<script>
    import Vue from 'vue';
    import iInput from '../../components/input/input.vue';
    import Drop from '../../components/select/dropdown.vue';
    import clickoutside from '../../directives/clickoutside';
    import { oneOf } from '../../utils/assist';
    import { formatDate, parseDate } from './util';
    const prefixCls = 'ivu-date-picker';
    const DEFAULT_FORMATS = {
        date: 'yyyy-MM-dd',
        month: 'yyyy-MM',
        year: 'yyyy',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        time: 'HH:mm:ss',
        timerange: 'HH:mm:ss',
        daterange: 'yyyy-MM-dd',
        datetimerange: 'yyyy-MM-dd HH:mm:ss'
    };
    const RANGE_SEPARATOR = ' - ';
    const DATE_FORMATTER = function(value, format) {
        return formatDate(value, format);
    };
    const DATE_PARSER = function(text, format) {
        return parseDate(text, format);
    };
    const RANGE_FORMATTER = function(value, format) {
        if (Array.isArray(value) && value.length === 2) {
            const start = value[0];
            const end = value[1];
            if (start && end) {
                return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format);
            }
        }
        return '';
    };
    const RANGE_PARSER = function(text, format) {
        const array = text.split(RANGE_SEPARATOR);
        if (array.length === 2) {
            const range1 = array[0];
            const range2 = array[1];
            return [parseDate(range1, format), parseDate(range2, format)];
        }
        return [];
    };
    const TYPE_VALUE_RESOLVER_MAP = {
        default: {
            formatter(value) {
                if (!value) return '';
                return '' + value;
            },
            parser(text) {
                if (text === undefined || text === '') return null;
                return text;
            }
        },
        date: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        datetime: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        daterange: {
            formatter: RANGE_FORMATTER,
            parser: RANGE_PARSER
        },
        datetimerange: {
            formatter: RANGE_FORMATTER,
            parser: RANGE_PARSER
        },
        timerange: {
            formatter: RANGE_FORMATTER,
            parser: RANGE_PARSER
        },
        time: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        month: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        year: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        number: {
            formatter(value) {
                if (!value) return '';
                return '' + value;
            },
            parser(text) {
                let result = Number(text);
                if (!isNaN(text)) {
                    return result;
                } else {
                    return null;
                }
            }
        }
    };
    export default {
        components: { iInput, Drop },
        directives: { clickoutside },
        props: {
            prefabtime: {
                type: Array
            },
            format: {
                type: String
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: true
            },
            confirm: {
                type: Boolean,
                default: false
            },
            open: {
                type: Boolean,
                default: null
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large']);
                }
            },
            placeholder: {
                type: String,
                default: ''
            },
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom-start'
            },
            options: {
                type: Object
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                showClose: false,
                visible: false,
                index: 0,
                picker: null,
                internalValue: '',
                startDate: '',
                iconType: false,
                endDate: '',
                disableClickOutSide: false    // fixed when click a date,trigger clickoutside to close picker
            };
        },
        computed: {
            opened () {
                return this.open === null ? this.visible : this.open;
            },
            transition () {
                if (this.placement === 'bottom-start' || this.placement === 'bottom' || this.placement === 'bottom-end') {
                    return 'slide-up';
                } else {
                    return 'slide-down';
                }
            },
            selectionMode() {
                if (this.type === 'month') {
                    return 'month';
                } else if (this.type === 'year') {
                    return 'year';
                }
                return 'day';
            },
            visualValue: {
                get () {
                    let value = this.internalValue;
                    // 设置时间的初始值 ----------
                    const prefabtime = this.formatTime(parseInt(this.prefabtime));
                    this.index++;
                    if (prefabtime && this.index < 3) {
                        value = prefabtime;
                    }
                    // --------------------------
                    if (!value) return;
                    const formatter = (
                        TYPE_VALUE_RESOLVER_MAP[this.type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    ).formatter;
                    const format = DEFAULT_FORMATS[this.type];
                    return formatter(value, this.format || format);
                    return value;
                },
                set (value) {
                    
                    if (value) {
                        const type = this.type;
                        const parser = (
                            TYPE_VALUE_RESOLVER_MAP[type] ||
                            TYPE_VALUE_RESOLVER_MAP['default']
                        ).parser;
                        const parsedValue = parser(value, this.format || DEFAULT_FORMATS[type]);
                        if (parsedValue) {
                            if (this.picker) this.picker.value = parsedValue;
                        }
                        return;
                    }
                    if (this.picker) this.picker.value = value;
                }
            }
        },
        methods: {
            handleClose () {
                if (this.open !== null) return;
                if (!this.disableClickOutSide) this.visible = false;
                this.disableClickOutSide = false;
            },
            handleFocus () {
                if (this.readonly) return;
                this.visible = true;
            },
            mouseEnter (e) {
                if (this.startDate) {
                    this.iconType = true;
                }                
            },
            mouseOut () {
                this.iconType = false;
            },
            handleInputChange (event) {
                const oldValue = this.visualValue;
                const value = event.target.value;
                let correctValue = '';
                let correctDate = '';
                const type = this.type;
                const format = this.format || DEFAULT_FORMATS[type];
                if (type === 'daterange' || type === 'timerange' || type === 'datetimerange') {
                    const parser = (
                        TYPE_VALUE_RESOLVER_MAP[type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    ).parser;
                    const formatter = (
                        TYPE_VALUE_RESOLVER_MAP[type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    ).formatter;
                    const parsedValue = parser(value, format);
                    if (parsedValue[0] instanceof Date && parsedValue[1] instanceof Date) {
                        if (parsedValue[0].getTime() > parsedValue[1].getTime()) {
                            correctValue = oldValue;
                        } else {
                            correctValue = formatter(parsedValue, format);
                        }
                        // todo 判断disabledDate
                    } else {
                        correctValue = oldValue;
                    }
                    correctDate = parser(correctValue, format);
                } else if (type === 'time') {
                    const parsedDate = parseDate(value, format);
                    if (parsedDate instanceof Date) {
                        if (this.disabledHours.length || this.disabledMinutes.length || this.disabledSeconds.length) {
                            const hours = parsedDate.getHours();
                            const minutes = parsedDate.getMinutes();
                            const seconds = parsedDate.getSeconds();
                            if ((this.disabledHours.length && this.disabledHours.indexOf(hours) > -1) ||
                                (this.disabledMinutes.length && this.disabledMinutes.indexOf(minutes) > -1) ||
                                (this.disabledSeconds.length && this.disabledSeconds.indexOf(seconds) > -1)) {
                                correctValue = oldValue;
                            } else {
                                correctValue = formatDate(parsedDate, format);
                            }
                        } else {
                            correctValue = formatDate(parsedDate, format);
                        }
                    } else {
                        correctValue = oldValue;
                    }
                    correctDate = parseDate(correctValue, format);
                } else {
                    const parsedDate = parseDate(value, format);
                    if (parsedDate instanceof Date) {
                        const options = this.options || false;
                        if (options && options.disabledDate && typeof options.disabledDate === 'function' && options.disabledDate(new Date(parsedDate))) {
                            correctValue = oldValue;
                        } else {
                            correctValue = formatDate(parsedDate, format);
                        }
                    } else {
                        correctValue = oldValue;
                    }
                    correctDate = parseDate(correctValue, format);
                }
                this.visualValue = correctValue;
                event.target.value = correctValue;
                this.internalValue = correctDate;
                if (correctValue !== oldValue) this.emitChange(correctDate);
            },
            handleInputMouseenter () {
                if (this.readonly || this.disabled) return;
                if (this.visualValue && this.clearable) {
                    this.showClose = true;
                }
            },
            handleInputMouseleave () {
                this.showClose = false;
            },
            handleIconClick () {
                if (this.showClose) {
                    this.handleClear();
                } else {
                    this.handleFocus();
                }
            },
            handleClear () {
                this.visible = false;
                this.internalValue = '';
                this.value = '';
                this.startDate = '';
                this.endDate = '';
                this.$emit('on-clear');
                this.$dispatch('on-form-change', '');
            },
            showPicker () {
                if (!this.picker) {
                    const type = this.type;
                    this.picker = new Vue(this.panel).$mount(this.$els.picker);
                    if (type === 'datetime' || type === 'datetimerange') {
                        this.confirm = true;
                        this.picker.showTime = false;
                    }
                    this.picker.value = this.internalValue;
                    this.picker.confirm = this.confirm;
                    this.picker.selectionMode = this.selectionMode;
                    if (this.format) this.picker.format = this.format;
                    // TimePicker
                    if (this.disabledHours) this.picker.disabledHours = this.disabledHours;
                    if (this.disabledMinutes) this.picker.disabledMinutes = this.disabledMinutes;
                    if (this.disabledSeconds) this.picker.disabledSeconds = this.disabledSeconds;
                    if (this.hideDisabledOptions) this.picker.hideDisabledOptions = this.hideDisabledOptions;
                    const options = this.options;
                    for (const option in options) {
                        this.picker[option] = options[option];
                    }
                    this.picker.$on('on-pick', (date, visible = false) => {
                        if (!this.confirm) this.visible = visible;
                        this.value = date;
                        this.picker.value = date;
                        this.picker.resetView && this.picker.resetView();
                        this.emitChange(date);
                    });
                    this.picker.$on('on-pick-clear', () => {
                        this.handleClear();
                    });
                    this.picker.$on('on-pick-success', () => {
                        this.visible = false;
                        this.$emit('on-ok');
                    });
                    this.picker.$on('on-pick-click', () => this.disableClickOutSide = true);
                }
                if (this.internalValue instanceof Date) {
                    this.picker.date = new Date(this.internalValue.getTime());
                } else {
                    this.picker.value = this.internalValue;
                }
                this.picker.resetView && this.picker.resetView();
            },
            emitChange (date) {
                const type = this.type;
                const format = this.format || DEFAULT_FORMATS[type];
                const formatter = (
                    TYPE_VALUE_RESOLVER_MAP[type] ||
                    TYPE_VALUE_RESOLVER_MAP['default']
                ).formatter;
                let newDate = formatter(date, format);
                if (type === 'daterange' || type === 'timerange') {
                    newDate = [newDate.split(RANGE_SEPARATOR)[0], newDate.split(RANGE_SEPARATOR)[1]];
                    this.startDate = newDate[0];
                    this.endDate = newDate[1];
                }
                this.$emit('get-time', newDate);
                this.$emit('on-change', newDate);
                this.$dispatch('on-form-change', newDate);
            },
            formatTime (t) {
                if (!t) return '';
                let date = new Date(t);
                const prefixZero = function (num) {
                    return num >= 10 ? num : '0' + num;
                };
                return date.getFullYear() + '-' +
                    prefixZero(date.getMonth() + 1) + '-' +
                    prefixZero(date.getDate()) + ' ' +
                    prefixZero(date.getHours()) + ':' +
                    prefixZero(date.getMinutes());
            }
        },
        watch: {
            visible (val) {
                if (val) {
                    this.showPicker();
                    this.$refs.drop.update();
                    if (this.open === null) this.$emit('on-open-change', true);
                } else {
                    if (this.picker) this.picker.resetView && this.picker.resetView(true);
                    this.$refs.drop.destroy();
                    if (this.open === null) this.$emit('on-open-change', false);
                }
            },
            internalValue(val) {
                if (!val && this.picker && typeof this.picker.handleClear === 'function') {
                    this.picker.handleClear();
                }
            },
            prefabtime: {
                deep: true,
                handler: function(val) {
                    if (val.length = 2) {
                        this.startDate = val[0];
                        this.endDate = val[1];
                    } else {
                        his.startDate = '';
                        this.endDate = '';
                    }
                }
            },
            value: {
                immediate: true,
                handler (val) {
                    const type = this.type;
                    const parser = (
                        TYPE_VALUE_RESOLVER_MAP[type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    ).parser;
                    if (val && type === 'time' && !(val instanceof Date)) {
                        val = parser(val, this.format || DEFAULT_FORMATS[type]);
                    } else if (val && type === 'timerange' && Array.isArray(val) && val.length === 2 && !(val[0] instanceof Date) && !(val[1] instanceof Date)) {
                        val = val.join(RANGE_SEPARATOR);
                        val = parser(val, this.format || DEFAULT_FORMATS[type]);
                    }
                    this.internalValue = val;
                }
            },
            open (val) {
                if (val === true) {
                    this.visible = val;
                    this.$emit('on-open-change', true);
                } else if (val === false) {
                    this.$emit('on-open-change', false);
                }
            },
            visualValue (val) {
                
                if (this.type === 'daterange') {
                    if (typeof val === 'object'){
                        this.$emit("get-time", val);
                    }
                } else {
                    this.$emit("get-time", val);
                }
            },
        },
        beforeDestroy () {
            if (this.picker) {
                this.picker.$destroy();
            }
        },
        ready () {
            if (this.open !== null) this.visible = this.open;
            if (this.prefabtime && this.prefabtime.length === 2) {
                this.startDate = this.prefabtime[0];
                this.endDate = this.prefabtime[1];
            }
        },
        events: {
            'on-form-blur' () {
                return false;
            },
            'on-form-change' () {
                return false;
            }
        },
        filters: {
            start: function (startDate) {
                if (startDate) {
                    return startDate;
                } else {
                    return '开始时间';
                }
            },
            end: function (endDate) {
                if (endDate) {
                    return endDate;
                } else {
                    return '结束时间';
                }
            }
        }
    };
</script>
<style scoped>
.icon {
    width: 12px;
    height: 12px;
    position: absolute;
    display: inline-block;
    background-image: url(date.png);
    top: 9px;
    left: calc(100% - 24px);
}

.ivu-date-picker-rel {
    width: 100%;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}
.ivu-date-picker-rel:hover {
    border-color: #ED6A00 !important;
}
.ivu-date-picker-rel .showDate {
    width: 45%;
    height: 100%;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 32px;
}
.ivu-date-picker-rel .link {
    display: inline-block;
    height: 100%;
}
</style>