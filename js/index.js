$(function() {
    var app = new Vue({
        el: "#app",
        router: router,
        data: {
            isSpread: false, // 侧滑页面是否展开
            isMove: false, // 侧滑页面是否开始滑动
            components: [{
                    "title": "导航栏",
                    "isChangeBackground": true,
                    "isBorderShow": true,
                    "children": [
                        { "path": { "path": "navigator/base1" }, "text": "基础导航栏" },
                        { "path": { "path": "navigator/base2" }, "text": "带头像导航栏(左右排列)" },
                        { "path": { "path": "navigator/base3" }, "text": "带头像导航栏(横向排列)" }
                    ]
                },
                {
                    "title": "选项卡",
                    "isBorderShow": true,
                    "isChangeBackground": true,
                    "children": [
                        { "path": { "path": "tab/base1" }, "text": "基础选项卡" },
                        { "path": { "path": "tab/base2" }, "text": "tab栏切换" }
                    ]
                },
                {
                    "title": "底部工具栏",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "bottomtab" }
                }, {
                    "title": "listview组件（上拉加载、下拉刷新..）",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "listview" }
                },
                {
                    "title": "按钮",
                    "isBorderShow": true,
                    "isChangeBackground": true,
                    "children": [
                        { "path": { "path": "button/base" }, "text": "普通按钮" },
                        { "path": { "path": "button/haveIcon" }, "text": "带图标的按钮" },
                        { "path": { "path": "button/btns" }, "text": "按钮组" },
                    ]
                }, {
                    "title": "输入框",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "input" }
                }, {
                    "title": "单选框",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "radio" }
                }, {
                    "title": "复选框",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "checkbox" }
                },
                {
                    "title": "开关按钮",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "turnoff" }
                }, {
                    "title": "进度条",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "progressbar" }
                }, {
                    "title": "日期",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "date" }
                }, {
                    "title": "图片",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "photo" }
                }, {
                    "title": "画廊",
                    "isBorderShow": true,
                    "isChangeBackground": true,
                    "children": [
                        { "path": { "path": "gallery/base" }, "text": "普通图片轮播" },
                        { "path": { "path": "gallery/arrow" }, "text": "箭头轮播、图片查看" },
                    ]
                }, {
                    "title": "日历",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "calendar" }
                }, {
                    "title": "滚动选择器",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "scrollpicker" }
                }, {
                    "title": "面板",
                    "isBorderShow": true,
                    "isChangeBackground": false,
                    "path": { "path": "panel" }
                }, {
                    "title": "表单",
                    "isBorderShow": true,
                    "isChangeBackground": true,
                    "children": [
                        { "path": { "path": "form/base" }, "text": "普通表单样式" },
                        { "path": { "path": "form/base2" }, "text": "订单录入" },
                    ]
                }, {
                    "title": "图表",
                    "isBorderShow": true,
                    "isChangeBackground": true,
                    "children": [
                        { "path": { "path": "chart/base1" }, "text": "饼状图" },
                        { "path": { "path": "chart/base2" }, "text": "柱状图" },
                        { "path": { "path": "chart/base3" }, "text": "折线图" },
                    ]
                },
            ],
        },
        created: function() {
            this.touch = {}
            summerready = function() {}
        },
        mounted: function() {
            var _self = this
            var el = this.$refs.main
            setTimeout(function() {
                _self.scroll = new BScroll(el, {
                    click: true
                })
            }, 50)
        },
        methods: {
            closeApp: function() {
                this.functionback()
            },
            functionback: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (isAndroid) {
                    navigator.app.exitApp();
                }
                if (isIOS) {
                    var pamn = {
                        "params": {
                            "transtype": "exit_back"
                        }
                    };
                    summer.callService("SummerService.gotoNative", pamn, false);
                }
            },
            beforeEnter: function(el) {
                el.style.opacity = 0
                el.style.height = 0
            },
            enter: function(el, done) {
                var delay = el.dataset.index * 50
                setTimeout(function() {
                    Velocity(
                        el, { opacity: 1, height: '40px' }, { complete: done }
                    )
                }, delay)
            },
            leave: function(el, done) {
                var delay = el.dataset.index * 50
                setTimeout(function() {
                    Velocity(
                        el, { opacity: 0, height: 0 }, { complete: done }
                    )
                }, delay)
            },
            isHaveChildren: function(item) {
                return item.children && item.children.length
            },
            childItemClick: function(e) {
                if (this.isSpread) {
                    this.openSlideWrapper()
                }
                var path = e.currentTarget.attributes['path'].value
                this.$router.push({ path: path })
            },
            listItemClick: function(item, e) {
                e.stopPropagation();

                if (this.isHaveChildren(item) && item.isChangeBackground) {
                    item.isBorderShow = !item.isBorderShow
                } else {
                    if (this.isSpread) {
                        this.openSlideWrapper()
                    }
                    if (item.path) {
                        this.$router.push(item.path)
                    }
                }

            },
            slideStart: function(e) {
                this.touch.startX = e.touches[0].pageX
                this.touch.startY = e.touches[0].pageY
                this.touch.startTime = new Date().getTime()
                this.isMove = false
            },
            slideMove: function(e) {
                if (!(this.$router.currentRoute.path === '/')) {
                    return
                }
                var deltaX = e.touches[0].pageX - this.touch.startX
                var deltaY = e.touches[0].pageY - this.touch.startY
                var MAX_SLIDE_WIDTH = this.$refs.slideWrapper.clientWidth
                    // 判断是x轴还是y轴
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // 滑动的距离超过最大的距离,则返回
                    if (Math.abs(deltaX) > MAX_SLIDE_WIDTH) {
                        return
                    }
                    // 已展开,再右滑,返回
                    if (this.isSpread && deltaX > 0) {
                        return
                    }
                    // 没有展开,左划返回
                    if (!this.isSpread && deltaX < 0) {
                        return
                    }
                    var offsetMain = this.isSpread ? MAX_SLIDE_WIDTH : 0
                    this.$refs.app.style['transform'] = 'translate3d(' + (offsetMain + deltaX) + 'px,0,0)'
                    this.$refs.slideWrapper.style['transform'] = 'translate3d(' + (offsetMain - MAX_SLIDE_WIDTH + deltaX) + 'px,0,0)'
                    this.isMove = true
                    this.touch.slideWidth = MAX_SLIDE_WIDTH
                    this.touch.deltaX = deltaX
                }

            },
            slideEnd: function(e) {
                var deltaTime = new Date().getTime() - this.touch.startTime
                var _flag = false
                if (this.isMove) {
                    // 快读滑动
                    var offsetMain = 0,
                        _width = this.touch.slideWidth,
                        _deltaX = this.touch.deltaX;
                    if (deltaTime < 300) {

                        offsetMain = this.isSpread ? 0 : _width
                        _flag = true
                    } else {
                        if (Math.abs(_deltaX) / _width >= 0.5) {
                            offsetMain = this.isSpread ? 0 : _width
                            _flag = true
                        } else {
                            offsetMain = this.isSpread ? _width : 0
                        }
                    }
                    this.showSlide(offsetMain, _width)
                    this.touch = {}
                    if (_flag) {
                        this.isSpread = !this.isSpread
                    }
                }

            },
            openSlideWrapper: function() {
                var slideWidth = this.$refs.slideWrapper.clientWidth
                var offsetMain = this.isSpread ? 0 : slideWidth
                this.showSlide(offsetMain, slideWidth)
                this.isSpread = !this.isSpread
            },
            showSlide: function(offsetMain, slideWidth) {
                this.$refs.app.style['transform'] = 'translate3d(' + offsetMain + 'px, 0, 0)'
                this.$refs.slideWrapper.style['transform'] = 'translate3d(' + (offsetMain - slideWidth) + 'px,0,0)'
                    // debugger
                this.$refs.app.style['transition'] = 'all 0.3s ease'
                this.$refs.slideWrapper.style['transition'] = 'all 0.3s ease'
            }
        }

    })


})