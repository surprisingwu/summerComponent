$(function() {
    var app = new Vue({
        el: "#app",
        router: router,
        data: {
            isSpread: false, // 侧滑页面是够展开
            isMove: false, // 侧滑页面是否开始滑动
            components: [{
                    title: '导航栏',
                    isChangeBackground: true,
                    isBorderShow: true,
                    children: [
                        { path: { path: 'navigator/base1' }, text: '基础导航栏' },
                        { path: { path: 'navigator/base2' }, text: '带头像导航栏(左右排列)' },
                        { path: { path: 'navigator/base3' }, text: '带头像导航栏(横向排列)' }
                    ]
                },
                {
                    title: '选项卡',
                    isBorderShow: true,
                    isChangeBackground: true,
                    children: [
                        { path: { path: 'tab/base1' }, text: '基础选项卡' },
                        { path: { path: 'tab/base2' }, text: 'tab栏切换' }
                    ]
                },
                {
                    title: '底部工具栏',
                    isBorderShow: true,
                    isChangeBackground: false,
                    path: { path: 'bottomtab' }
                }, {
                    title: '按钮',
                    isBorderShow: true,
                    isChangeBackground: true,
                    children: [
                        { path: { path: 'button/base' }, text: '普通按钮' },
                        { path: { path: 'button/haveIcon' }, text: '带图标的按钮' },
                        { path: { path: 'button/btns' }, text: '按钮组' },
                    ]
                }, {
                    title: '输入框',
                    isBorderShow: true,
                    isChangeBackground: false,
                    path: { path: 'input' }
                }, {
                    title: '单选框',
                    isBorderShow: true,
                    isChangeBackground: false,
                    path: { path: 'radio' }
                }
            ],
        },
        created: function() {
            this.touch = {}
        },
        mounted: function() {
            this.$nextTick(function() {
                var el = this.$refs.main
                this.scroll = new BScroll(el, {
                    click: true
                })
            })
        },
        methods: {
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
                var path = e.currentTarget.attributes['path'].value
                this.$router.push({ path: path })
            },
            listItemClick: function(item, e) {
                e.stopPropagation();
                if (this.isHaveChildren(item) && item.isChangeBackground) {
                    item.isBorderShow = !item.isBorderShow
                } else {
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