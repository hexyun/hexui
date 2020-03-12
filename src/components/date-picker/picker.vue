<template>
    <div
        :class="[prefixCls]"
        v-clickoutside="handleClose">
        <div v-el:reference :class="[prefixCls + '-rel']">
            <slot>
                <i-input
                    :class="[prefixCls + '-editor']"
                    :readonly="!editable || readonly"
                    :disabled="disabled"
                    :size="size"
                    :placeholder="placeholder"
                    :value="visualValue"
                    @on-change="handleInputChange"
                    @on-focus="handleFocus"
                    @on-click="handleIconClick"
                    @mouseenter="handleInputMouseenter"
                    @mouseleave="handleInputMouseleave"
                    :icon="iconType"></i-input>
            </slot>
        </div>
        <Drop 
            :class="{'seconds': type === 'datetime' && (format || '').indexOf('ss') > -1, 'onle-time': type === 'datetime' && format === 'HH:mm', 'onle-date': type === 'datetime' && format.indexOf('HH:mm') == -1}"
            v-show="opened" 
            :placement="placement" 
            :transition="transition" 
            v-ref:drop>
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
                type: [Number, Array, String]
            },
            format: {
                type: String
            },
            readonly: {
                type: Boolean,
                default: false
            },
            // internalValue : {
            //     type: Number
            // },
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
                disableClickOutSide: false    // fixed when click a date,trigger clickoutside to close picker
            };
        },
        computed: {
            opened () {
                return this.open === null ? this.visible : this.open;
            },
            iconType () {
                let icon = 'ios-calendar-outline';
                if (this.type === 'time' || this.type === 'timerange') icon = 'ios-clock-outline';
                if (this.showClose) icon = 'ios-close';
                return icon;
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
                    const formatter = (
                        TYPE_VALUE_RESOLVER_MAP[this.type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    ).formatter;
                    this.index++;
                    if (this.prefabtime && this.index < 3) {
                        if (this.type === 'datetimerange' && Array.isArray(this.prefabtime) && this.prefabtime.length === 2) {
                            value = this.prefabtime
                        } else
                            value = this.formatTime(this.prefabtime);
                    }
                    // --------------------------
                    if (!value) return;
                    const format = DEFAULT_FORMATS[this.type];
                    if (this.type === 'datetime' && this.format.indexOf('ss') > -1) {
                        return this.formatTime(value)
                    }
                    let val = formatter(value, this.format || format);
                    return val
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
                if (correctValue !== oldValue) {
                    this.emitChange(correctDate);
                }
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
                    if (!this.visible) {
                        this.emitChange('');
                    }
                    this.handleClear();
                } else {
                    this.handleFocus();
                }
            },
            handleClear () {
                this.visible = false;
                this.internalValue = '';
                this.prefabtime = '';
                this.value = '';
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
                    this.picker.showSeconds = this.type === 'datetime' && this.format.indexOf('ss') > -1;
                    if (this.format && this.type === 'datetime' && this.format == 'HH:mm') this.picker.currentView = 'time'
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
                    this.picker.$on('on-pick', (date, visible = false, isEmit = false) => {
                        if (!this.confirm) this.visible = visible;
                        this.value = date;
                        this.picker.value = date;
                        this.picker.resetView && this.picker.resetView();
                        if (isEmit) {
                            this.visible = false;
                        }
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
                console.log(date, '传来的时间', this.type)
                const type = this.type;
                const format = this.format || DEFAULT_FORMATS[type];
                const formatter = (
                    TYPE_VALUE_RESOLVER_MAP[type] ||
                    TYPE_VALUE_RESOLVER_MAP['default']
                ).formatter;
                const parser = (
                    TYPE_VALUE_RESOLVER_MAP[type] ||
                    TYPE_VALUE_RESOLVER_MAP['default']
                ).parser;
                let newDate;
                if (type === 'daterange' || type === 'timerange' || type === 'datetimerange') {
                    newDate = parser(date);
                    let hasDate = newDate && Array.isArray(newDate) && newDate.length === 2;
                    this.prefabtime = hasDate ? [newDate[0].getTime(), newDate[1].getTime()] : [];
                } else {
                    let stamp = new Date(date);
                    newDate = stamp.getTime() || '';
                    this.prefabtime = newDate || 0;
                }
                if(this.type === 'datetime') {
                    this.$emit('get-time', date);
                } else {
                    this.$emit('get-time', this.prefabtime);
                }
                this.$emit('on-change', this.prefabtime);
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
                    prefixZero(date.getMinutes()) + ':' +
                    prefixZero(date.getSeconds());
            }
        },
        watch: {
            visible (val) {
                if (val) {
                    this.showPicker();
                    this.$refs.drop.update();
                    if (this.open === null) this.$emit('on-open-change', true);
                } else {
                    if (this.picker && this.format != 'HH:mm') this.picker.resetView && this.picker.resetView(true);
                    this.$refs.drop.destroy();
                    if (this.open === null) {
                        this.$emit('on-open-change', false);
                        this.emitChange(this.visualValue)
                    }
                }
            },
            internalValue(val) {
                if (!val && this.picker && typeof this.picker.handleClear === 'function') {
                    this.picker.handleClear();
                }
            },
            prefabtime (val) {
                if(val && typeof val === 'number') {
                    this.internalValue = this.formatTime(val);
                } else if (val && Array.isArray(val) && val.length === 2) {
                    this.internalValue = val;
                } else if(val && typeof val === 'string'){
                    this.internalValue = val
                } else if(!val) {
                    this.internalValue = ''
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

        },
        beforeDestroy () {
            if (this.picker) {
                this.picker.$destroy();
            }
        },
        ready () {
            if (this.open !== null) this.visible = this.open;
        },
        created () {
            this.internalValue = this.formatTime(parseInt(this.internalValue));
        },
        events: {
            'on-form-blur' () {
                return false;
            },
            'on-form-change' () {
                return false;
            }
        }
    };
</script>
<style>
.seconds #time-right {
    min-width: 220px;
}
.seconds {
    min-width: 430px !important;
}
.seconds .ivu-picker-confirm {
    min-width: 430px;
}
/* 只显示时间的样式 */
.onle-time .ivu-picker-confirm, 
.onle-time > .ivu-picker-panel-body-wrapper > .ivu-picker-panel-body,
.onle-time .ivu-picker-confirm{
    width: unset !important;
}
.onle-time #time-right {
    position: relative;
    left: 0;
}

/* 只显示日期的样式 */
.onle-date .ivu-picker-confirm, 
.onle-date > .ivu-picker-panel-body-wrapper > .ivu-picker-panel-body,
.onle-date .ivu-picker-confirm{
    width: unset !important;
}

</style>