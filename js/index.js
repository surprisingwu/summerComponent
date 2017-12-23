$(function() {
    var app = new Vue({
        el: "#app",
        router: router,
        data: {
            isSpread: false, // 侧滑页面是够展开
            isMove: false, // 侧滑页面是否开始滑动
            isBorderShow: true, // 是否显示下面的边框
        },
        created: function() {
            this.touch = {}
        },
        methods: {
            childItemClick: function(e) {
                this.$router.push({ path: 'navigator/base1' })
            },
            listItemClick: function(e) {
                console.log(e)
                e.stopPropagation();
                console.log('冒泡')
                this.isBorderShow = !this.isBorderShow
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