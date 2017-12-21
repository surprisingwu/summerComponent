/*!
 * better-normal-scroll v1.0.1
 * (c) 2016-2017 ustbhuangyi
 * Released under the MIT License.
 */
! function(t, i) { "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.BScroll = i() }(this, function() {
    "use strict";

    function t(t) { return !1 !== v && ("standard" === v ? t : v + t.charAt(0).toUpperCase() + t.substr(1)) }

    function i(t, i, e, s) { t.addEventListener(i, e, { passive: !1, capture: !!s }) }

    function e(t, i, e, s) { t.removeEventListener(i, e, { passive: !1, capture: !!s }) }

    function s(t) { for (var i = 0, e = 0; t;) i -= t.offsetLeft, e -= t.offsetTop, t = t.offsetParent; return { left: i, top: e } }

    function o(t) { if (t instanceof window.SVGElement) { var i = t.getBoundingClientRect(); return { top: i.top, left: i.left, width: i.width, height: i.height } } return { top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight } }

    function n(t, i) {
        for (var e in i)
            if (i[e].test(t[e])) return !0;
        return !1
    }

    function r(t, i) {
        var e = document.createEvent("Event");
        e.initEvent(i, !0, !0), e.pageX = t.pageX, e.pageY = t.pageY, t.target.dispatchEvent(e)
    }

    function h(t) {
        var i = t.target;
        if (!/(SELECT|INPUT|TEXTAREA)/i.test(i.tagName)) {
            var e = document.createEvent(window.MouseEvent ? "MouseEvents" : "Event");
            e.initEvent("click", !0, !0), e._constructed = !0, i.dispatchEvent(e)
        }
    }

    function a(t, i) { i.firstChild ? l(t, i.firstChild) : i.appendChild(t) }

    function l(t, i) { i.parentNode.insertBefore(t, i) }

    function p(t, i, e, s, o, n) {
        var r = t - i,
            h = Math.abs(r) / e,
            a = n.deceleration,
            l = n.itemHeight,
            p = n.swipeBounceTime,
            c = n.wheel,
            u = n.swipeTime,
            d = c ? 4 : 15,
            m = t + h / a * (r < 0 ? -1 : 1);
        return c && l && (m = Math.round(m / l) * l), m < s ? (m = o ? s - o / d * h : s, u = p) : m > 0 && (m = o ? o / d * h : 0, u = p), { destination: Math.round(m), duration: u }
    }

    function c() { return window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date }

    function u(t) { console.error("[BScroll warn]: " + t) }

    function d(t, i) { this.wrapper = "string" == typeof t ? document.querySelector(t) : t, this.wrapper || u("can not resolve the wrapper dom"), this.scroller = this.wrapper.children[0], this.scroller || u("the wrapper need at least one child element to be scroller"), this.scrollerStyle = this.scroller.style, this._init(t, i) }
    var m = function() {
            function t(t, i) {
                var e = [],
                    s = !0,
                    o = !1,
                    n = void 0;
                try { for (var r, h = t[Symbol.iterator](); !(s = (r = h.next()).done) && (e.push(r.value), !i || e.length !== i); s = !0); } catch (t) { o = !0, n = t } finally { try {!s && h.return && h.return() } finally { if (o) throw n } }
                return e
            }
            return function(i, e) { if (Array.isArray(i)) return i; if (Symbol.iterator in Object(i)) return t(i, e); throw new TypeError("Invalid attempt to destructure non-iterable instance") }
        }(),
        g = function(t) { if (Array.isArray(t)) { for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i]; return e } return Array.from(t) },
        f = document.createElement("div").style,
        v = function() {
            var t = { webkit: "webkitTransform", Moz: "MozTransform", O: "OTransform", ms: "msTransform", standard: "transform" };
            for (var i in t)
                if (void 0 !== f[t[i]]) return i;
            return !1
        }(),
        y = t("transform"),
        w = t("perspective") in f,
        T = "ontouchstart" in window,
        x = !1 !== y,
        b = t("transition") in f,
        S = { transform: y, transitionTimingFunction: t("transitionTimingFunction"), transitionDuration: t("transitionDuration"), transitionDelay: t("transitionDelay"), transformOrigin: t("transformOrigin"), transitionEnd: t("transitionEnd") },
        X = 1,
        Y = { touchstart: X, touchmove: X, touchend: X, mousedown: 2, mousemove: 2, mouseup: 2 },
        M = { startX: 0, startY: 0, scrollX: !1, scrollY: !0, freeScroll: !1, directionLockThreshold: 5, eventPassthrough: "", bounce: !0, bounceTime: 700, momentum: !0, momentumLimitTime: 300, momentumLimitDistance: 15, swipeTime: 2500, swipeBounceTime: 500, deceleration: .001, flickLimitTime: 200, flickLimitDistance: 100, resizePolling: 60, probeType: 0, preventDefault: !0, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: !0, useTransition: !0, useTransform: !0, bindToWrapper: !1, disableMouse: !1, disableTouch: !1, wheel: !1, snap: !1 },
        E = { swipe: { style: "cubic-bezier(0.23, 1, 0.32, 1)", fn: function(t) { return 1 + --t * t * t * t * t } }, swipeBounce: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(t) { return t * (2 - t) } }, bounce: { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(t) { return 1 - --t * t * t * t } } },
        P = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(t) { return window.setTimeout(t, (t.interval || 100 / 60) / 2) },
        _ = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(t) { window.clearTimeout(t) };
    return function(t) {
            t.prototype._init = function(t, i) { this._handleOptions(i), this._events = {}, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._addDOMEvents(), this._initExtFeatures(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable() }, t.prototype._handleOptions = function(t) { this.options = Object.assign({}, M, t), this.translateZ = this.options.HWCompositing && w ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && b, this.options.useTransform = this.options.useTransform && x, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" !== this.options.eventPassthrough && this.options.scrollX, this.options.scrollY = "vertical" !== this.options.eventPassthrough && this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, !0 === this.options.tap && (this.options.tap = "tap") }, t.prototype._addDOMEvents = function() {
                var t = i;
                this._handleEvents(t)
            }, t.prototype._removeDOMEvents = function() {
                var t = e;
                this._handleEvents(t)
            }, t.prototype._handleEvents = function(t) {
                var i = this.options.bindToWrapper ? this.wrapper : window;
                t(window, "orientationchange", this), t(window, "resize", this), this.options.click && t(this.wrapper, "click", this), this.options.disableMouse || (t(this.wrapper, "mousedown", this), t(i, "mousemove", this), t(i, "mousecancel", this), t(i, "mouseup", this)), T && !this.options.disableTouch && (t(this.wrapper, "touchstart", this), t(i, "touchmove", this), t(i, "touchcancel", this), t(i, "touchend", this)), t(this.scroller, S.transitionEnd, this)
            }, t.prototype._initExtFeatures = function() { this.options.snap && this._initSnap() }, t.prototype.handleEvent = function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "mouseup":
                    case "touchcancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "click":
                        !this.enabled || t._constructed || /(SELECT|INPUT|TEXTAREA)/i.test(t.target.tagName) || (t.preventDefault(), t.stopPropagation())
                }
            }, t.prototype.refresh = function() {
                this.wrapper.offsetHeight, this.wrapperWidth = parseInt(this.wrapper.style.width) || this.wrapper.clientWidth, this.wrapperHeight = parseInt(this.wrapper.style.height) || this.wrapper.clientHeight, this.scrollerWidth = parseInt(this.scroller.style.width) || this.scroller.clientWidth, this.scrollerHeight = parseInt(this.scroller.style.height) || this.scroller.clientHeight;
                var t = this.options.wheel;
                t ? (this.items = this.scroller.children, this.options.itemHeight = this.itemHeight = this.items.length ? this.items[0].clientHeight : 0, void 0 === this.selectedIndex && (this.selectedIndex = t.selectedIndex), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, this.maxScrollY = -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = s(this.wrapper), this.trigger("refresh"), this.resetPosition()
            }, t.prototype.enable = function() { this.enabled = !0 }, t.prototype.disable = function() { this.enabled = !1 }
        }(d),
        function(t) {
            t.prototype._start = function(t) {
                var i = Y[t.type];
                if ((i === X || 0 === t.button) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== i)) {
                    this.initiated = i, this.options.preventDefault && !n(t.target, this.options.preventDefaultException) && t.preventDefault(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = c(), this.options.wheel && (this.target = t.target), this.stop();
                    var e = t.touches ? t.touches[0] : t;
                    this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = e.pageX, this.pointY = e.pageY, this.trigger("beforeScrollStart")
                }
            }, t.prototype._move = function(t) {
                if (this.enabled && !this.destroyed && Y[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var i = t.touches ? t.touches[0] : t,
                        e = i.pageX - this.pointX,
                        s = i.pageY - this.pointY;
                    this.pointX = i.pageX, this.pointY = i.pageY, this.distX += e, this.distY += s;
                    var o = Math.abs(this.distX),
                        n = Math.abs(this.distY),
                        r = c();
                    if (!(r - this.endTime > this.options.momentumLimitTime && n < this.options.momentumLimitDistance && o < this.options.momentumLimitDistance)) {
                        if (this.directionLocked || this.options.freeScroll || (o > n + this.options.directionLockThreshold ? this.directionLocked = "h" : n >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" === this.directionLocked) {
                            if ("vertical" === this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" === this.options.eventPassthrough) return void(this.initiated = !1);
                            s = 0
                        } else if ("v" === this.directionLocked) {
                            if ("horizontal" === this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" === this.options.eventPassthrough) return void(this.initiated = !1);
                            e = 0
                        }
                        e = this.hasHorizontalScroll ? e : 0, s = this.hasVerticalScroll ? s : 0;
                        var h = this.x + e,
                            a = this.y + s;
                        (h > 0 || h < this.maxScrollX) && (h = this.options.bounce ? this.x + e / 3 : h > 0 ? 0 : this.maxScrollX), (a > 0 || a < this.maxScrollY) && (a = this.options.bounce ? this.y + s / 3 : a > 0 ? 0 : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(h, a), r - this.startTime > this.options.momentumLimitTime && (this.startTime = r, this.startX = this.x, this.startY = this.y, 1 === this.options.probeType && this.trigger("scroll", { x: this.x, y: this.y })), this.options.probeType > 1 && this.trigger("scroll", { x: this.x, y: this.y });
                        var l = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
                            p = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                            u = this.pointX - l,
                            d = this.pointY - p;
                        (u > document.documentElement.clientWidth - this.options.momentumLimitDistance || u < this.options.momentumLimitDistance || d < this.options.momentumLimitDistance || d > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(t)
                    }
                }
            }, t.prototype._end = function(t) {
                if (this.enabled && !this.destroyed && Y[t.type] === this.initiated && (this.initiated = !1, this.options.preventDefault && !n(t.target, this.options.preventDefaultException) && t.preventDefault(), this.trigger("touchEnd", { x: this.x, y: this.y }), !this.resetPosition(this.options.bounceTime, E.bounce))) {
                    this.isInTransition = !1;
                    var i = Math.round(this.x),
                        e = Math.round(this.y);
                    if (this.moved) {
                        this.scrollTo(i, e);
                        var o = i - this.absStartX,
                            a = e - this.absStartY;
                        this.directionX = o > 0 ? -1 : o < 0 ? 1 : 0, this.directionY = a > 0 ? -1 : a < 0 ? 1 : 0, this.endTime = c();
                        var l = this.endTime - this.startTime,
                            u = Math.abs(i - this.startX),
                            d = Math.abs(e - this.startY);
                        if (this._events.flick && l < this.options.flickLimitTime && u < this.options.flickLimitDistance && d < this.options.flickLimitDistance) this.trigger("flick");
                        else {
                            var m = 0;
                            if (this.options.momentum && l < this.options.momentumLimitTime && (d > this.options.momentumLimitDistance || u > this.options.momentumLimitDistance)) {
                                var g = this.hasHorizontalScroll ? p(this.x, this.startX, l, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options) : { destination: i, duration: 0 },
                                    f = this.hasVerticalScroll ? p(this.y, this.startY, l, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options) : { destination: e, duration: 0 };
                                i = g.destination, e = f.destination, m = Math.max(g.duration, f.duration), this.isInTransition = 1
                            } else this.options.wheel && (e = Math.round(e / this.itemHeight) * this.itemHeight, m = this.options.wheel.adjustTime || 400);
                            var v = E.swipe;
                            if (this.options.snap) {
                                var y = this._nearestSnap(i, e);
                                this.currentPage = y, m = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(i - y.x), 1e3), Math.min(Math.abs(e - y.y), 1e3)), 300), i = y.x, e = y.y, this.directionX = 0, this.directionY = 0, v = E.bounce
                            }
                            if (i !== this.x || e !== this.y) return (i > 0 || i < this.maxScrollX || e > 0 || e < this.maxScrollY) && (v = E.swipeBounce), void this.scrollTo(i, e, m, v);
                            this.options.wheel && (this.selectedIndex = 0 | Math.abs(this.y / this.itemHeight)), this.trigger("scrollEnd", { x: this.x, y: this.y })
                        }
                    } else {
                        if (this.options.wheel) {
                            if (this.target && "wheel-scroll" === this.target.className) {
                                var w = Math.abs(Math.round(e / this.itemHeight)),
                                    T = Math.round((this.pointY + s(this.target).top - this.itemHeight / 2) / this.itemHeight);
                                this.target = this.items[w + T]
                            }
                            this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, !0, !0, E.swipe)
                        } else this.options.tap && r(t, this.options.tap), this.options.click && h(t);
                        this.trigger("scrollCancel")
                    }
                }
            }, t.prototype._resize = function() {
                var t = this;
                this.enabled && (clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() { t.refresh() }, this.options.resizePolling))
            }, t.prototype._startProbe = function() {
                function t() {
                    var e = i.getComputedPosition();
                    i.trigger("scroll", e), i.isInTransition && (i.probeTimer = P(t))
                }
                _(this.probeTimer), this.probeTimer = P(t);
                var i = this
            }, t.prototype._transitionTime = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                if (this.scrollerStyle[S.transitionDuration] = t + "ms", this.options.wheel)
                    for (var i = 0; i < this.items.length; i++) this.items[i].style[S.transitionDuration] = t + "ms"
            }, t.prototype._transitionTimingFunction = function(t) {
                if (this.scrollerStyle[S.transitionTimingFunction] = t, this.options.wheel)
                    for (var i = 0; i < this.items.length; i++) this.items[i].style[S.transitionTimingFunction] = t
            }, t.prototype._transitionEnd = function(t) { t.target === this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime, E.bounce) || (this.isInTransition = !1, this.trigger("scrollEnd", { x: this.x, y: this.y }))) }, t.prototype._translate = function(t, i) {
                if (this.options.useTransform ? this.scrollerStyle[S.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = Math.round(t), i = Math.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.options.wheel)
                    for (var e = 0; e < this.items.length; e++) {
                        var s = this.options.wheel.rotate * (i / this.itemHeight + e);
                        this.items[e].style[S.transform] = "rotateX(" + s + "deg)"
                    }
                this.x = t, this.y = i
            }, t.prototype._animate = function(t, i, e, s) {
                function o() {
                    var p = c();
                    if (p >= l) return n.isAnimating = !1, n._translate(t, i), void(n.resetPosition(n.options.bounceTime) || n.trigger("scrollEnd", { x: n.x, y: n.y }));
                    var u = s(p = (p - a) / e),
                        d = (t - r) * u + r,
                        m = (i - h) * u + h;
                    n._translate(d, m), n.isAnimating && P(o), 3 === n.probeType && n.trigger("scroll", { x: this.x, y: this.y })
                }
                var n = this,
                    r = this.x,
                    h = this.y,
                    a = c(),
                    l = a + e;
                this.isAnimating = !0, o()
            }, t.prototype.scrollBy = function(t, i) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : E.bounce;
                t = this.x + t, i = this.y + i, this.scrollTo(t, i, e, s)
            }, t.prototype.scrollTo = function(t, i) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : E.bounce;
                this.isInTransition = this.options.useTransition && e > 0 && (t !== this.x || i !== this.y), !e || this.options.useTransition ? (this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i), e && 3 === this.options.probeType && this._startProbe(), this.options.wheel && (i > 0 ? this.selectedIndex = 0 : i < this.maxScrollY ? this.selectedIndex = this.items.length - 1 : this.selectedIndex = 0 | Math.abs(i / this.itemHeight))) : this._animate(t, i, e, s.fn)
            }, t.prototype.scrollToElement = function(t, i, e, o, n) {
                if (t && (t = t.nodeType ? t : this.scroller.querySelector(t), !this.options.wheel || "wheel-item" === t.className)) {
                    var r = s(t);
                    r.left -= this.wrapperOffset.left, r.top -= this.wrapperOffset.top, !0 === e && (e = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === o && (o = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), r.left -= e || 0, r.top -= o || 0, r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left, r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top, this.options.wheel && (r.top = Math.round(r.top / this.itemHeight) * this.itemHeight), this.scrollTo(r.left, r.top, i, n)
                }
            }, t.prototype.resetPosition = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : E.bounce,
                    e = this.x;
                !this.hasHorizontalScroll || e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX);
                var s = this.y;
                return !this.hasVerticalScroll || s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY), (e !== this.x || s !== this.y) && (this.scrollTo(e, s, t, i), !0)
            }, t.prototype.getComputedPosition = function() {
                var t = window.getComputedStyle(this.scroller, null),
                    i = void 0,
                    e = void 0;
                return this.options.useTransform ? (i = +((t = t[S.transform].split(")")[0].split(", "))[12] || t[4]), e = +(t[13] || t[5])) : (i = +t.left.replace(/[^-\d.]/g, ""), e = +t.top.replace(/[^-\d.]/g, "")), { x: i, y: e }
            }, t.prototype.stop = function() {
                if (this.options.useTransition && this.isInTransition) {
                    this.isInTransition = !1;
                    var t = this.getComputedPosition();
                    this._translate(t.x, t.y), this.options.wheel ? this.target = this.items[Math.round(-t.y / this.itemHeight)] : this.trigger("scrollEnd", { x: this.x, y: this.y })
                } else !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this.trigger("scrollEnd", { x: this.x, y: this.y }))
            }, t.prototype.destroy = function() { this._removeDOMEvents(), this.destroyed = !0, this.trigger("destroy") }
        }(d),
        function(t) {
            t.prototype.on = function(t, i) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this;
                this._events[t] || (this._events[t] = []), this._events[t].push([i, e])
            }, t.prototype.once = function(t, i) {
                function e() { this.off(t, e), o || (o = !0, i.apply(s, arguments)) }
                var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this,
                    o = !1;
                this.on(t, e)
            }, t.prototype.off = function(t, i) {
                var e = this._events[t];
                if (e)
                    for (var s = e.length; s--;) e[s][0] === i && (e[s][0] = void 0)
            }, t.prototype.trigger = function(t) {
                var i = this._events[t];
                if (i)
                    for (var e = i.length, s = [].concat(g(i)), o = 0; o < e; o++) {
                        var n = s[o],
                            r = m(n, 2),
                            h = r[0],
                            a = r[1];
                        h && h.apply(a, [].slice.call(arguments, 1))
                    }
            }
        }(d),
        function(t) {
            t.prototype._initSnap = function() {
                var t = this;
                this.currentPage = {};
                var i = this.options.snap;
                if (i.loop) {
                    var e = this.scroller.children;
                    e.length > 0 && (a(e[e.length - 1].cloneNode(!0), this.scroller), this.scroller.appendChild(e[1].cloneNode(!0)))
                }
                var s = i.el;
                "string" == typeof s && (s = this.scroller.querySelectorAll(s)), this.on("refresh", function() {
                    if (t.pages = [], t.wrapperWidth && t.wrapperHeight && t.scrollerWidth && t.scrollerHeight) {
                        var e = i.stepX || t.wrapperWidth,
                            n = i.stepY || t.wrapperHeight,
                            r = 0,
                            h = void 0,
                            a = void 0,
                            l = void 0,
                            p = 0,
                            c = void 0,
                            u = 0,
                            d = void 0,
                            m = void 0;
                        if (s)
                            for (c = s.length, d = -1; p < c; p++) m = o(s[p]), (0 === p || m.left <= o(s[p - 1]).left) && (u = 0, d++), t.pages[u] || (t.pages[u] = []), r = Math.max(-m.left, t.maxScrollX), h = Math.max(-m.top, t.maxScrollY), a = r - Math.round(m.width / 2), l = h - Math.round(m.height / 2), t.pages[u][d] = { x: r, y: h, width: m.width, height: m.height, cx: a, cy: l }, r > t.maxScrollX && u++;
                        else
                            for (a = Math.round(e / 2), l = Math.round(n / 2); r > -t.scrollerWidth;) {
                                for (t.pages[p] = [], c = 0, h = 0; h > -t.scrollerHeight;) t.pages[p][c] = { x: Math.max(r, t.maxScrollX), y: Math.max(h, t.maxScrollY), width: e, height: n, cx: r - a, cy: h - l }, h -= n, c++;
                                r -= e, p++
                            }
                        var g = i.loop ? 1 : 0;
                        t.goToPage(t.currentPage.pageX || g, t.currentPage.pageY || 0, 0);
                        var f = i.threshold;
                        f % 1 == 0 ? (t.snapThresholdX = f, t.snapThresholdY = f) : (t.snapThresholdX = Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].width * f), t.snapThresholdY = Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].height * f))
                    }
                }), this.on("scrollEnd", function() { i.loop && (0 === t.currentPage.pageX && t.goToPage(t.pages.length - 2, t.currentPage.pageY, 0), t.currentPage.pageX === t.pages.length - 1 && t.goToPage(1, t.currentPage.pageY, 0)) }), this.on("flick", function() {
                    var e = i.speed || Math.max(Math.max(Math.min(Math.abs(t.x - t.startX), 1e3), Math.min(Math.abs(t.y - t.startY), 1e3)), 300);
                    t.goToPage(t.currentPage.pageX + t.directionX, t.currentPage.pageY + t.directionY, e)
                })
            }, t.prototype._nearestSnap = function(t, i) {
                if (!this.pages.length) return { x: 0, y: 0, pageX: 0, pageY: 0 };
                var e = 0;
                if (Math.abs(t - this.absStartX) <= this.snapThresholdX && Math.abs(i - this.absStartY) <= this.snapThresholdY) return this.currentPage;
                t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY);
                for (var s = this.pages.length; e < s; e++)
                    if (t >= this.pages[e][0].cx) { t = this.pages[e][0].x; break }
                s = this.pages[e].length;
                for (var o = 0; o < s; o++)
                    if (i >= this.pages[0][o].cy) { i = this.pages[0][o].y; break }
                return e === this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), o === this.currentPage.pageY && ((o += this.directionY) < 0 ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), i = this.pages[0][o].y), { x: t, y: i, pageX: e, pageY: o }
            }, t.prototype.goToPage = function(t, i, e) {
                var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : E.bounce,
                    o = this.options.snap;
                t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                var n = this.pages[t][i].x,
                    r = this.pages[t][i].y;
                e = void 0 === e ? o.speed || Math.max(Math.max(Math.min(Math.abs(n - this.x), 1e3), Math.min(Math.abs(r - this.y), 1e3)), 300) : e, this.currentPage = { x: n, y: r, pageX: t, pageY: i }, this.scrollTo(n, r, e, s)
            }, t.prototype.next = function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                ++e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this.goToPage(e, s, t, i)
            }, t.prototype.prev = function(t, i) {
                var e = this.currentPage.pageX,
                    s = this.currentPage.pageY;
                --e < 0 && this.hasVerticalScroll && (e = 0, s--), this.goToPage(e, s, t, i)
            }, t.prototype.getCurrentPage = function() { return this.options.snap && this.currentPage }
        }(d),
        function(t) { t.prototype.wheelTo = function(t) { this.options.wheel && (this.y = -t * this.itemHeight, this.scrollTo(0, this.y)) }, t.prototype.getSelectedIndex = function() { return this.options.wheel && this.selectedIndex } }(d), d.Version = "1.0.1", d
});