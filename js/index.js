$(function() {
    var MIN_OFFSET_LEFT = 50
    var app = new Vue({
        el: "#app",
        data: {
            openSlide: false
        },
        created: function() {
            this.touch = {}
        },
        methods: {
            slideStart: function(e) {
                this.touch.initiated = true
                this.touch.startX = e.touches[0].pageX
            },
            slideMove: function(e) {
                if (!this.touch.initiated) {
                    return
                }
                this.touch.moveX = e.touches[0].pageX
                var offsetLeft = this.touch.moveX - this.touch.startX
                if (offsetLeft < 0 && !this.openSlide) {
                    return
                }

                var slideWidth = this.$refs.slideWrapper.clientWidth

                var offsetSlideWidth = -slideWidth + offsetLeft
                this.touch.offsetLeft = offsetLeft
                this.touch.slideWidth = slideWidth
                this.touch.offsetSlideWidth = offsetSlideWidth
                if (offsetSlideWidth > 0) {
                    return
                }

                this.$refs.app.style['transform'] = 'translate3d(' + offsetLeft + 'px,0,0)'
                this.$refs.slideWrapper.style['transform'] = 'translate3d(' + offsetSlideWidth + 'px,0,0)'


            },
            slideEnd: function(e) {
                if (this.openSlide) {
                    if (this.touch.offsetLeft <= -MIN_OFFSET_LEFT) {
                        this.$refs.app.style['transform'] = 'translate3d(0,0,0)'
                        this.$refs.slideWrapper.style['transform'] = 'translate3d(-' + this.touch.slideWidth + 'px,0,0)'

                        this.openSlide = false
                    } else {
                        this.$refs.app.style['transform'] = 'translate3d(' + this.touch.slideWidth + 'px, 0, 0)'
                        this.$refs.slideWrapper.style['transform'] = 'translate3d(0,0,0)'

                    }
                } else {
                    if (this.touch.offsetLeft >= MIN_OFFSET_LEFT) {
                        this.$refs.app.style['transform'] = 'translate3d(' + this.touch.slideWidth + 'px,0,0)'
                        this.$refs.slideWrapper.style['transform'] = 'translate3d(0,0,0)'

                        this.openSlide = true
                    } else {
                        this.$refs.app.style['transform'] = 'translate3d(0, 0, 0)'
                        this.$refs.slideWrapper.style['transform'] = 'translate3d(-' + this.touch.slideWidth + 'px,0,0)'

                    }
                }
                this.$refs.app.style['transition'] = 'all 0.3s'
                this.$refs.slideWrapper.style['transition'] = 'all 0.3s'
                this.initiated = false
                this.touch = {}
            },
            openSlideWrapper: function() {
                var offserWidth = this.$refs.slideWrapper.clientWidth
                this.$refs.app.style['transform'] = 'translate3d(' + this.touch.slideWidth + 'px,0,0)'
                this.$refs.slideWrapper.style['transform'] = 'translate3d(0,0,0)'
                this.$refs.app.style['transition'] = 'all 0.3s'
                this.$refs.slideWrapper.style['transition'] = 'all 0.3s'
                this.openSlide = true
            }
        }

    })


})