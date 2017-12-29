var components = {
    navigator: {},
    common: {},
    tab: {},
    template: {},
    bottomtab: {},
    button: {},
    input: {},
    radio: {},
    checkbox: {},
    gallery: {},
    form: {},
    chart: {}
}
var mixins = {
    mixinsGoBack: {
        methods: {
            goToBack: function() {
                this.$router.back()
            },
        }
    },
    mixinsChangeCurrentIndex: {
        data: function() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            changeCurrentIndex: function(i) {
                this.currentIndex = i
            }
        }
    }
}
components.confirm = {
    props: {
        text: {
            type: String,
            default: ''
        },
        confirmBtnText: {
            type: String,
            default: '确定'
        },
        cancelBtnText: {
            type: String,
            default: '取消'
        }
    },
    template: '<transition name="confirm-fade">\
    <div class="confirm" v-show="showFlag" @click.stop>\
      <div class="confirm-wrapper">\
        <div class="confirm-content">\
          <p class="text">{{text}}</p>\
          <div class="operate">\
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>\
            <div @click="confirm" class="operate-btn right">{{confirmBtnText}}</div>\
          </div>\
        </div>\
      </div>\
    </div>\
  </transition>',
    data: function() {
        return {
            showFlag: false
        }
    },
    methods: {
        show: function() {
            this.showFlag = true
        },
        hide: function() {
            this.showFlag = false
        },
        cancel: function() {
            this.hide()
            this.$emit('cancel')
        },
        confirm: function() {
            this.hide()
            this.$emit('confirm')
        }
    },
    watch: {
        text: function(newVal, oldVal) {
            console.log(newVal)
        }
    }
}
components.navigator.NavigatorBase = {
    template: '<div class="components-wrapper">' +
        '<div class="um-header-light">' +
        '<div v-show="isBack"><a href="#" class="um-back" @click="goToBack" v-show="isShowIconBack"><span v-show="isShowIconText">返回</span></a></div>' +
        '<h3> 导航栏</h3>' +
        '<div v-show="isShowRight"><div class="um-header-btns" v-show="isShowBtnIcon"><i class="ti-plus mr5" ></i></div><a class="um-header-right" href="#" v-show="isShowBtnText">保存</a></div>' +
        '</div>' +
        '<div class="um-content">' +
        '<div class="text-content">这是导航栏(顶部)的默认的演示样式,你可以在顶部导航中防止多种控件。点击如下单选框按钮切换导航栏的内容</div>' +
        '<div class="components-title">左侧显示内容</div>' +
        '<div class="um-check-group">' +
        '<label class="um-check-group-item border-1px" v-for="item in radioMesg">' +
        '<input name="um-radio" type="radio" :checked="item.text === preValueLeft" :value="item.value" v-model="preValueLeft">' +
        '<span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">{{item.text}}</span>' +
        '</label></div>' +
        '<div class="components-title">右侧显示内容</div>' +
        '<div class="um-check-group">' +
        '<label class="um-check-group-item border-1px" v-for="item in radioMesgRight">' +
        '<input name="um-radio2" type="radio" :checked="item.text === preValueRight" :value="item.value" v-model="preValueRight">' +
        '<span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">{{item.text}}</span>' +
        '</label></div>' +
        '</div>' +
        '</div>',
    data: function() {
        return {
            isBack: true,
            isShowIconBack: true,
            isShowIconText: false,
            isShowRight: false,
            isShowBtnText: false,
            isShowBtnIcon: false,
            preValueLeft: 'isShowIconBack',
            preValueRight: 'isShowRight'
        }
    },
    mixins: [mixins.mixinsGoBack],
    created: function() {},
    computed: {
        radioMesg: function() {
            var radioMesg = [
                { text: '不显示', value: 'isBack' },
                { text: '仅图标', value: 'isShowIconBack' },
                { text: '图标加文字', value: 'isShowIconText' }
            ]
            return radioMesg
        },
        radioMesgRight: function() {
            var ret = [
                { text: '不显示', value: 'isShowRight' },
                { text: '仅图标', value: 'isShowBtnIcon' },
                { text: '文字按钮', value: 'isShowBtnText' }
            ]
            return ret
        }
    },
    methods: {},
    watch: {
        preValueLeft: function(newVal, oldVal) {
            if (newVal !== oldVal) {

                if (newVal === 'isShowIconBack') {
                    this.isShowIconText = false
                    this.isShowIconBack = true
                }
                if (newVal === 'isShowIconText') {
                    this.isShowIconBack = true
                    this.isShowIconText = true
                }
                if (newVal === 'isBack') {
                    this.isBack = false
                } else {
                    this.isBack = true
                }
            }
        },
        preValueRight: function(newVal, oldVal) {
            if (newVal !== oldVal) {

                if (newVal === 'isShowBtnText') {
                    this.isShowBtnIcon = false
                    this.isShowBtnText = true
                }
                if (newVal === 'isShowBtnIcon') {
                    this.isShowBtnText = false
                    this.isShowBtnIcon = true
                }
                if (newVal === 'isShowRight') {
                    this.isShowRight = false
                } else {
                    this.isShowRight = true
                }
            }
        }
    }
}
components.navigator.NavigatorHavePhoto1 = {
    template: '<div class="components-wrapper"><div class="um-header um-header-personal"><a href="#" @click="goToBack" class="um-back"></a>' +
        '<p class="tc pt15"><img class="um-circle" height="60px" width="60px" src="img/user.png" alt="...">' +
        '</p><p class="tc  um-white">name</p>' +
        '<p class="tc um-white">name@yonyou.com</p> ' +
        '</div></div>',
    mixins: [mixins.mixinsGoBack]
}
components.navigator.NavigatorHavePhoto2 = {
    template: '<div class="components-wrapper"><div class="um-header um-header-personal"><a href="#" @click="goToBack" class="um-back"></a>' +
        '<div class="um-media-left mt40 ml20">' +
        '<img class="um-circle" height="60px" width="60px" src="img/user.png" alt="...">' +
        '</div><div class="um-media-body ml15 um-white mt40 ">' +
        '<p>name</p><p>name@yonyou.com</p>' +
        '</div></div></div>',
    mixins: [mixins.mixinsGoBack]
}
components.template.wrapper = {
    props: ['title'],
    template: '<div class="components-wrapper"><div id="header" class="um-header">' +
        '<a href="#" class="um-back" @click="goToBack"></a><h3>{{title}}</h3>' +
        '</div><slot></slot></div>',
    mixins: [mixins.mixinsGoBack]
}
components.template.canScroll = {
    props: ['title'],
    template: '<div class="components-wrapper"><div id="header" class="um-header">' +
        '<a href="#" class="um-back" @click="goToBack"></a><h3>{{title}}</h3>' +
        '</div><div class="com-body" ref="comBody"><div><slot></slot></div></div></div>',
    mixins: [mixins.mixinsGoBack],
    mounted: function() {
        var el = this.$refs.comBody
        this.$nextTick(function() {
            this.scroll = new BScroll(el, {
                click: true
            })
        })
    }
}
components.template.title = {
    props: ['title'],
    template: '<div class="components-title">{{title}}</div>'
}
components.template.titleUp = {
    props: ['title'],
    template: '<div><div class="components-title">{{title}}</div><slot></slot></div>'
}
components.template.flex2 = {
    template: '<div class="flex2-wrapper border-1px"><slot name="left"></slot><slot></slot><slot name="right"></slot></div>'
}
mixins.commonComponents = {
    components: {
        wrapper: components.template.canScroll,
        comtitle: components.template.titleUp
    }
}
components.tab.base1 = {
    mixins: [mixins.mixinsChangeCurrentIndex],
    data: function() {
        return {
            title: '基础选项卡',
            navs: [
                { title: '军事', src: '#item1' },
                { title: '社会', src: '#item2' },
                { title: '体育', src: '#item3' },
                { title: '娱乐', src: '#item4' },
                { title: '财经', src: '#item5' },
                { title: '科技', src: '#item6' },
                { title: '专题', src: '#item7' },
                { title: '图片', src: '#item8' },
                { title: '视频', src: '#item9' },
                { title: '国内', src: '#item10' },
                { title: '国际', src: '#item11' },
                { title: '视界', src: '#item12' }
            ]
        }
    },
    template: '<wraper :title="title"><div class="components-title">普通文字选项卡</div> <ul class="um-tabbar"><li><a>待付款</a></li>' +
        '<li class="active"><a>待发货</a></li >' +
        '<li><a>待收货</a></li><li><a>待收货</a></li>' +
        '</ul><div class="components-title">图标选项卡</div><ul class="um-tabbar">' +
        '<li><a><div class="f20 ti-palette"></div></a></li>' +
        '<li class="active"><a><div class="f20 ti-shopping-cart-full"></div></a></li>' +
        '<li><a><div class="f20 ti-gift"></div></a></li>' +
        '<li><a><div class="f20 ti-comments-smiley"></div></a></li>' +
        '</ul><div class="components-title">带下划线选项卡</div><ul class="um-tabbar um-tabbar-underline background-color-fff">' +
        '<li><a>用户</a></li><li class="active"><a>应用</a></li><li><a>社区</a></li>' +
        '<li><a>企业</a></li></ul><div class="components-title">可滚动菜单</div><div class="um-nav f14 background-color-fff">' +
        '<div class="um-nav-inner">' +
        '<a href="#" class="um-nav-item" v-for="(item,index) in navs" :class="{\'active\':index===currentIndex}" :href="item.src" :key="index"  @click="changeCurrentIndex(index)">{{item.title}}</a>' +
        '</div></div></wraper>',
    components: {
        wraper: components.template.wrapper
    },
    methods: {
        activeNav: function(i) {
            this.currentIndex = i
        }
    }
}
components.tab.base2 = {
    mixins: [mixins.mixinsChangeCurrentIndex],
    data: function() {
        return {
            title: '页签切换',
            tabs: [
                { text: '全部' },
                { text: '待审批' },
                { text: '待收货' },
                { text: '被驳回' },
            ],
            subTabs: [
                { text: '我是全部' },
                { text: '我是待收货' },
                { text: '我是带审批' },
                { text: '我是被驳回' },
            ]
        }
    },
    template: '<wrapper :title="title"><div class="text-content">tab栏切换,这里只是简单的demo,样式还有一些逻辑可以根据需求来定</div>' +
        '<ul class="um-tabbar um-tabbar-underline pt10 pb10 um-tabbar-switch background-color-fff">' +
        '<li v-for="(item,index) in tabs" :class="{\'active\':index === currentIndex}" @click="changeCurrentIndex(index)"><a>{{item.text}}</a></li>' +
        '</ul><div class="Artical"><div v-for="(item,index) in subTabs" v-show="currentIndex === index">{{item.text}}</div></div></wrapper>',
    components: {
        wrapper: components.template.wrapper
    }
}

components.bottomtab = {
    template: '<wrapper title="底部工具栏">' +
        '<tem-title title="基础底部工具栏,根据需求自己添加子节点"></tem-title>' +
        '<div class="um-footer" style="line-height: 44px;">底部工具栏</div>' +
        '<tem-title title="文字居中排列"></tem-title>' +
        '<div class="um-footerbar background-color-fff"><a class="um-footerbar-item">收藏</a>' +
        '<a class="um-footerbar-item active">编辑</a><a class="um-footerbar-item">转发</a>' +
        '<a class="um-footerbar-item">记录</a><a class="um-footerbar-item">删除</a></div>' +
        '<tem-title title="底部带图标工具栏"></tem-title>' +
        '<div class="um-footer"><div class="um-footerbar pt5">' +
        '<a href="#" class="um-footerbar-item"><i class="ti-angle-left f20"></i></a>' +
        '<a href="#" class="um-footerbar-item"><i class="ti-angle-right f20"></i></a>' +
        '<a href="#" class="um-footerbar-item active"><i class="ti-export f20"></i>' +
        '</a><a href="#" class="um-footerbar-item"><i class="ti-book f20"></i></a>' +
        '<a href="#" class="um-footerbar-item"><i class="ti-layers f20"></i></a></div></div>' +
        '<tem-title title="底部图标和文字工具栏"></tem-title>' +
        '<div class="um-footer"><div class="um-footerbar"><a href="#" class="um-footerbar-item">' +
        '<i class="ti-comments f20"></i><div class="f12 lh1">消息</div></a>' +
        '<a href="#" class="um-footerbar-item active"><i class="ti-notepad f20"></i><div class="f12 lh1">日程</div>' +
        '</a><a href="#" class="um-footerbar-item"><i class="ti-id-badge f20"></i><div class="f12 lh1">通讯录</div>' +
        '</a><a href="#" class="um-footerbar-item"><i class="ti-user f20"></i><div class="f12 lh1">我</div>' +
        '</a></div></div>' +
        '</wrapper>',
    components: {
        wrapper: components.template.wrapper,
        'tem-title': components.template.title
    }
}
components.button.base = {
    template: '<wrapper title="不同按钮"><flex2><div class="flex2-item-left" slot="left">普通按钮</div>' +
        '<div class="flex2-item-right" slot="right"><button class="btn">普通按钮</button></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">普通的行内按钮</div><div class="flex2-item-right" slot="right"><button class="btn btn-inline">行内按钮</button></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">mini小按钮</div><div class="flex2-item-right" slot="right"><button class="btn btn-inline btn-sm">小按钮</button></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">文件上传</div><div class="flex2-item-right" slot="right">' +
        '<input type="file" name="file" id="file"></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">灰色按钮</div><div class="flex2-item-right" slot="right">' +
        '<button class="btn um-btn-gray">灰色按钮</button></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">多彩按钮</div><div class="flex2-item-right" slot="right">' +
        '<button class="btn um-btn-success">验证成功<i class="ti-check"></i></button></div></flex2>' +
        '</wrapper>',
    components: {
        wrapper: components.template.wrapper,
        flex2: components.template.flex2
    }
}
components.button.haveIcon = {
    template: '<wrapper title="带图标的按钮"><flex2><div class="flex2-item-left" slot="left">图标在左侧</div><div class="flex2-item-right" slot="right"><button class="btn btn-inline">' +
        '<span class="ti-reload mr5"></span>按钮</button></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">图标在右侧</div><div class="flex2-item-right" slot="right"><button class="btn btn-inline">' +
        '按钮<span class="ti-reload ml5"></span></button></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">图标在上</div><div class="flex2-item-right" slot="right">' +
        '<a href="#" class="um-tabbar-item active"><i class="ti-menu-alt f24"></i><div class="f12">企业审核</div>' +
        '</a></div>' +
        '</flex2><flex2><div class="flex2-item-left" slot="left">圆形按钮</div><div class="flex2-item-right" slot="right">' +
        '<button class="btn um-btn-success btn-inline btn-circle"><i class="ti-headphone"></i></button></div></flex2>' +
        '</wrapper>',
    components: {
        wrapper: components.template.wrapper,
        flex2: components.template.flex2
    }
}
components.button.btns = {
    template: '<wrapper title="按钮组"><comtitle title="水平按钮组"></comtitle><div><div class="btn-group align-center">' +
        '<button type="button" class="btn btn-inline">Left</button>' +
        '<button type="button" class="btn btn-inline">Middle</button>' +
        '<button type="button" class="btn btn-inline">Right</button>' +
        '</div></div><comtitle title="宽度占满按钮组"></comtitle>' +
        '<div><div class="btn-group btn-group-justify"><button type="button" class="btn um-btn-info">Left</button>' +
        '<button type="button" class="btn um-btn-success">Middle</button>' +
        '<button type="button" class="btn um-btn-primary">Right</button>' +
        '</div></div><comtitle title="垂直按钮组"></comtitle><div><div class="btn-group btn-group-vertical align-center">' +
        '<button type="button" class="btn um-btn-success">Left</button>' +
        '<button type="button" class="btn  um-btn-primary">Middle</button>' +
        '<button type="button" class="btn um-btn-info">Right</button></div></div></wrapper>',
    components: {
        wrapper: components.template.wrapper,
        comtitle: components.template.title
    }
}
components.input = {
    mixins: [mixins.commonComponents],
    template: '<wrapper  title="输入框"><comtitle title="默认文字输入框"> <input type="text" class="form-control" placeholder="请输入文字..."></comtitle>' +
        '<comtitle title="带输出按钮的文字输入框"> <div class="pr"><input type="text" ref="inpt" class="form-control" placeholder="该输入框文本可以清除">' +
        '<span class="um-input-clear ti-close" @click="clearInput"></span></div></comtitle>' +
        '<comtitle title="用户名输入框">  <div class="um-input-group"><span class="ti-user"></span>' +
        '<input type="text" class="form-control" placeholder="手机\用户名\邮箱"></div></comtitle>' +
        '<comtitle title="密码输入框"><div class="um-input-group"><span class="ti-lock"></span>' +
        '<input type="password" class="form-control" placeholder="密码"></div></comtitle>' +
        '<comtitle title="仅底部细线的输入框"><div class="um-input-text back-fff"><span class="ti-lock um-input-left-icon"></span>' +
        '<input type="text" class="form-control" placeholder="Username"></div></comtitle>' +
        '<comtitle title="数字输入框"><input type="number" value="31" class="form-control tr"></comtitle>' +
        '<comtitle title="搜索框"><div class="um-input-group"><span class="ti-search">' +
        '</span><input type="search" class="form-control" placeholder="search"></div></comtitle>' +
        '<comtitle title="带取消按钮的搜索框"><div class="um-input-search">' +
        '<input type="search" class="form-control" placeholder="search"><span class="um-input-cancle">取消</span>' +
        '</div></comtitle>' +
        '</wrapper>',
    methods: {
        clearInput: function() {
            this.$refs.inpt.value = ""
        }
    },
}

components.radio = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="单选框组"><comtitle title="demo1"><div class="um-check-group">' +
        '<label class="um-check-group-item"><input name="um-radio" checked type="radio" value="">' +
        '<span class="um-icon-check um-css3-vc"></span><span class="um-black">硕士及以上</span></label>' +
        '<label class="um-check-group-item"><input id="" name="um-radio" type="radio" value="">' +
        '<span class="um-icon-check um-css3-vc"></span><span class="um-black">本科</span> ' +
        '</label><label class="um-check-group-item"><input id="" name="um-radio" type="radio" value="">' +
        '<span class="um-icon-check um-css3-vc"></span><span class="um-black">高中</span></label>' +
        '</div></comtitle>' +
        '<comtitle title="demo2"><div class="um-check-group um-check-group-left"><label class="um-check-group-item">' +
        '<input name="um-leftRadio" type="radio" value="硕士及以上" checked><span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">硕士及以上</span></label><label class="um-check-group-item">' +
        '<input name="um-leftRadio" type="radio" value="本科"><span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">本科</span></label><label class="um-check-group-item">' +
        '<input name="um-leftRadio" type="radio" value="高中"><span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">高中</span> </label></div></comtitle>' +
        '</wrapper>',
}
components.checkbox = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="复选框"><comtitle title="复选框组"><div class="um-check-group um-check-group-left border-1px">' +
        '<label class="um-check-group-item"><input name="um-checkbox" type="checkbox" checked value="">' +
        '<span class="um-icon-checkbox um-css3-vc"></span><span class="um-black">登山</span></label>' +
        '<label class="um-check-group-item"><input name="um-checkbox" type="checkbox" value="">' +
        '<span class="um-icon-checkbox um-css3-vc"></span><span class="um-black">跑步</span> </label>' +
        '<label class="um-check-group-item"><input name="um-checkbox" type="checkbox" value="">' +
        '<span class="um-icon-checkbox um-css3-vc"></span><span class="um-black">游泳</span> </label>' +
        '</div></comtitle><flex2><div slot="right" class="flex2-item-right"><label class="um-check-inline">' +
        '<input name="um-checkbox-inline" type="checkbox" value="自动登录" checked><span class="um-icon-checkbox um-css3-vc">' +
        '</span><span class="um-black ml5">行内复选框</span></label></div></flex2></wrapper>',
    components: {
        flex2: components.template.flex2
    }
}
components.turnoff = {
    template: '<wrapper title="开关按钮"><flex2><div class="flex2-item-left" slot="left">按钮1</div>' +
        '<div class="flex2-item-right" slot="right">' +
        '<label class="um-switch1"><input type="checkbox" value="on" checked="checked">' +
        '<div class="um-track"><div class="um-handle"></div></div></label></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">按钮2</div>' +
        '<div class="flex2-item-right" slot="right"><label class="um-switch2 um-box-vc">' +
        '<input type="checkbox" class="um-switch2" /><span class="um-switch2-check" data-on-text="打开" data-off-text="关闭">' +
        '</span></label></div></flex2>' +
        '</wrapper>',
    components: {
        wrapper: components.template.canScroll,
        flex2: components.template.flex2
    },
}
components.progressbar = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="进度条"><comtitle title="默认进度条"> <div class="um-progress">' +
        '<div class="um-progress-bar" style="width: 60%;">60%</div></div></comtitle>' +
        '<comtitle title="demo2"><div class="um-progress"><div class="um-progress-bar um-progress-bar-info" style="width: 20%">' +
        '20% Complete</div></div></comtitle>' +
        '<comtitle title="mini进度条"><div class="um-progress um-progress-mini">' +
        '<div class="um-progress-bar" style="width: 60%;"></div></div></comtitle>' +
        '<comtitle title="斑马线进度条"><div class="um-progress um-progress-line">' +
        '<div class="um-progress-bar um-progress-bar-info"  style="width: 50%"></div></div></comtitle>' +
        '<comtitle title="细线进度条"><div class="um-progress um-progress-striped">' +
        '<div class="um-progress-bar um-progress-bar-success" style="width: 60%;"></div></div></comtitle>' +
        '</wrapper>'
}
components.date = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="日期"><comtitle title="年/月/日 日期输入框"><input type="date" name="date" value="2015-01-01" class="form-control">' +
        '</comtitle><comtitle title="年/月/日 时:分:秒 日期输入框"><input type="datetime-local" name="date" value="2015-01-01T12:12:12" class="form-control"></comtitle>' +
        '</wrapper>'
}
components.photo = {
    template: '<wrapper title="图片"><flex2><div class="flex2-item-left" slot="left">普通图片</div>' +
        '<div class="flex2-item-right" slot="right"><img src="img/waite.png" width=44 alt="" class="um-img-responsive" ></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">圆形图片</div>' +
        '<div class="flex2-item-right" slot="right"><img src="img/sun.png" width="44" class="um-circle  um-img-responsive"></div>' +
        '</flex2><flex2><div class="flex2-item-left" slot="left">圆角图片</div>' +
        '<div class="flex2-item-right" slot="right"><img src="img/love.png" width="44" alt="" class="um-rounded um-img-responsive"></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">相框图片</div><div class="flex2-item-right" slot="right">' +
        '<img src="img/love.png" width="44" class="um-img-thumbnail um-img-responsive"></div></flex2>' +
        '</wrapper>',
    components: {
        wrapper: components.template.canScroll,
        flex2: components.template.flex2
    }
}

components.gallery.base = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="画廊"><comtitle title="带dot并且可以自动播放"><div id="slider" class="swipe">' +
        '<div class="swipe-wrap"><div class="swipe-box"><img src="img/firstcover01.png"></div>' +
        '<div class="swipe-box"><img src="img/firstcover02.png"></div>' +
        '<div class="swipe-box"><img src="img/firstcover03.png"></div></div>' +
        '</div></comtitle>' +
        '<comtitle title="带页签切换的图片轮播"><ul class="um-tabbar um-tabbar-underline back-fff" id="nav">' +
        '<li class="active"><a href="javascript:;">用户</a></li><li><a href="javascript:;">应用</a>' +
        '</li><li><a href="javascript:;">社区</a></li></ul><div id="iSlider-wrapper" style="height:200px" class="iSlider-wrapper"></div>' +
        '</comtitle>' +
        '</wrapper>',
    mounted: function() {
        var slider = Swipe(document.getElementById('slider'), {
            startSlide: 1, //起始图片切换的索引位置
            auto: 3000, //设置自动切换时间，单位毫秒
            continuous: true, //无限循环的图片切换效果
            disableScroll: true, //阻止由于触摸而滚动屏幕
            stopPropagation: false, //停止滑动事件
            callback: function(index, element) {}, //回调函数，切换时触发
            transitionEnd: function(index, element) {} //回调函数，切换结束调用该函数。
        });
        var list = [{
            content: "img/love.png"
        }, {
            content: "img/sun.png"
        }, {
            content: "img/waite.png"
        }, ];
        var islider = new iSlider({
            type: 'pic',
            data: list,
            dom: document.getElementById("iSlider-wrapper"),
            isLooping: true,
            animateType: 'default',
            onslideend: function(idx) {
                $("#nav").find("li").eq(idx).addClass("active").siblings("li").removeClass("active");
            },
        });
        $("#nav").find("li").on("click", function() {
            $(this).addClass("active").siblings("li").removeClass("active");
            var i = $(this).index();
            islider.slideTo(i);
        });
        $(islider.wrap).on("click", ".islider-btn-outer", function() {
            var i = islider.slideIndex;
            $("#nav").find("li").eq(i).addClass("active").siblings("li").removeClass("active");
        });
    }
}
components.gallery.arrow = {
    // mixins: [mixins.commonComponents],
    components: {
        wrapper: components.template.wrapper,
        comtitle: components.template.titleUp
    },
    data: function() {
        return {
            imgs: [
                { src: 'img/love.png' },
                { src: 'img/sun.png' },
                { src: 'img/waite.png' },
                { src: 'img/love.png' },
                { src: 'img/sun.png' },
                { src: 'img/waite.png' },
                { src: 'img/love.png' },
                { src: 'img/sun.png' },
                { src: 'img/waite.png' },
                { src: 'img/love.png' },
                { src: 'img/sun.png' },
                { src: 'img/waite.png' },
            ]
        }
    },
    template: '<wrapper title="画廊"><comtitle title="带箭头的轮播图"><div class="um-row"><div id="iSlider-wrapper" style="height:150px" class="iSlider-wrapper">' +
        '</div></div></comtitle><comtitle title="图片查看"><div class="um-nav"><div class="um-nav-inner">' +
        '<div class="um-nav-item" style="padding:0 10px" v-for="item in imgs"><img :src="item.src" width="150" alt="">' +
        '</div></div></div></comtitle></wrapper>',
    mounted: function() {
        var list = [{
            content: "img/love.png"
        }, {
            content: "img/sun.png"
        }, {
            content: "img/waite.png"
        }, ];
        var islider = new iSlider({
            type: 'pic',
            data: list,
            dom: document.getElementById("iSlider-wrapper"),
            isLooping: true,
            animateType: 'default',
            onslideend: function(idx) {
                $("#nav").find("li").eq(idx).addClass("active").siblings("li").removeClass("active");
            },
        });
        islider.addBtn();
        $("#nav").find("li").on("click", function() {
            $(this).addClass("active").siblings("li").removeClass("active");
            var i = $(this).index();
            islider.slideTo(i);
        });
        $(islider.wrap).on("click", ".islider-btn-outer", function() {
            var i = islider.slideIndex;
            $("#nav").find("li").eq(i).addClass("active").siblings("li").removeClass("active");
        });
    }
}

components.calendar = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="日历"><span>引入的插件比较多,先放置</span></div></wrapper>'
}
components.scrollPicker = {
    mixins: [mixins.commonComponents],
    components: {
        flex2: components.template.flex2
    },
    data: function() {
        return {
            options: [
                { text: "初中" },
                { text: "高中" },
                { text: "大专" },
                { text: "本科" },
                { text: "硕士" },
                { text: "博士" },
            ]
        }
    },
    template: '<wrapper title="滚动选择器"><comtitle title="普通的滚动选择器"><div class="um-input-text back-fff" style="position:relative;padding:0 15px">' +
        '<span class="um-input-left">学历:</span><input type="text" id="select1_dummy" /><i class="iconfont icon-jiantouyou"></i>' +
        '<select id="select1"><option v-for="item in options">{{item.text}}</option></select>' +
        '</div></comtitle><comtitle title="日期时间选择器"><flex2><div class="flex2-item-left" slot="left">' +
        '开始时间</div><i class="iconfont icon-jiantouyou"></i><div class="flex2-item-right" slot="right"><input name="start" type="text" placeholder="请选择开始时间" class="scroller-date" readonly=""></div></flex2>' +
        '<flex2><div class="flex2-item-left" slot="left">结束时间</div><i class="iconfont icon-jiantouyou"></i><div class="flex2-item-right" slot="right">' +
        '<input name="end" type="text" class="scroller-date" readonly="" placeholder="请选择结束时间"></div></flex2>' +
        '</comtitle><comtitle title="日期选择器"><flex2><div class="flex2-item-left" slot="left">开始时间</div>' +
        '<i class="iconfont icon-jiantouyou"></i><div class="flex2-item-right" slot="right"> <input name="start" placeholder="请选择开始时间" type="text" class="date-picker" readonly="">' +
        '</div></flex2><flex2><div class="flex2-item-left" slot="left">结束时间</div>' +
        '<i class="iconfont icon-jiantouyou"></i><div class="flex2-item-right" slot="right"><input name="end" type="text" class="date-picker" placeholder="请选择结束时间" readonly=""></div>' +
        '</flex2></comtitle><comtitle title="时间选择器"><flex2><div class="flex2-item-left" slot="left">选择时间</div>' +
        '<i class="iconfont icon-jiantouyou"></i><div class="flex2-item-right"><input name="start" id="start" type="text" class="time-picker" placeholder="请选择时间" readonly=""></div>' +
        '</flex2></comtitle></wrapper>',
    mounted: function() {
        var opt = {
            'date': {
                preset: 'date'
            },
            'select': {
                preset: 'select'
            }
        };
        this.$nextTick(function() {
            $('#select1').scroller('destroy').scroller(
                $.extend(opt['select'], {
                    theme: "ios7",
                    mode: "scroller",
                    display: "bottom",
                    animate: ""
                })
            );
            $('.scroller-date').scroller('destroy').scroller({
                preset: 'datetime',
                theme: "ios7",
                mode: "scroller",
                display: "bottom",
                animate: ""
            });
            $('.date-picker').scroller('destroy').scroller({
                preset: 'date',
                theme: "ios7",
                mode: "scroller",
                display: "bottom",
                animate: ""
            });
            $('.time-picker').scroller('destroy').scroller({
                preset: 'time',
                theme: "ios7",
                mode: "scroller",
                display: "bottom",
                animate: ""
            });
        })

    }
}

components.panel = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="面板"><comtitle title="普通俩个面板"><div class="um-panel h100">' +
        '</div><div class="um-panel h100"></div></comtitle>' +
        '<comtitle title="面板带行单元"><div class="um-panel h100"><div class="um-panel-row">面板第一行</div>' +
        '<div class="um-panel-row">面板第二行</div></div><div class="um-panel h100">' +
        '<div class="um-panel-row">面板第一行</div><div class="um-panel-row">面板第二行</div></div></comtitle>' +
        '<comtitle title="面板宽度占满"><div class="um-panel um-row h100"><div class="um-panel-row">面板第一行</div>' +
        '<div class="um-panel-row">面板第二行</div></div><div class="um-panel um-row h100">' +
        '<div class="um-panel-row">面板第一行</div><div class="um-panel-row">面板第二行</div></div></comtitle>' +
        '</wrapper>'
}
components.form.base = {
    mixins: [mixins.commonComponents],
    data: function() {
        return {
            data1: [
                { text: '经营单位', placeholder: '请输入经营单位' },
                { text: '提运单号', placeholder: '请输入提运单号' },
                { text: '单据编号', placeholder: '请输入单据编号' },
            ],
            data2: [
                { text: '报销金额(元)', placeholder: '请输入数字(必填)' },
                { text: '报销类别', placeholder: '如采购经费、活动经费(必填)' },
                { text: '费用明细', placeholder: '请输入费用明细描述' },
            ],
            data3: [
                '请输入审核单位', '请输入审核人'
            ]
        }
    },
    template: '<wrapper title="普通的表单"><comtitle title="单行数据录入"><label class="um-label um-box-justify">' +
        '<div>部门</div><div><input type="text" class="form-control tr" placeholder="请输入所在部门">' +
        '</div></label></comtitle>' +
        '<comtitle title="必填数据录入"><label class="um-label um-box-justify"><div class="pr">' +
        '<span class="um-red f20 um-box-vc pa" style="margin-left: -10px;">*</span>部门</div>' +
        '<div><input type="text" class="form-control tr" placeholder="请输入部门名称"></div></label></comtitle>' +
        '<comtitle title="录入数据右对齐"><ul class="um-list">' +
        '<li class="um-list-item" v-for="item in data1"> <div class = "um-list-item-inner">' +
        '<div class = "um-list-item-left pl15" >{{item.text}}</div> <div class = "um-list-item-right">' +
        '<input type = "text"class = "form-control tr" :placeholder = "item.placeholder" ></div> </div></li></ul></comtitle>' +
        '<comtitle title="录入数据左对齐"><ul class="um-list"><li class="um-list-item" v-for="item in data2">' +
        '<div class="um-list-item-inner"><div class="um-list-item-left pl15">{{item.text}}</div>' +
        '<div class="um-list-item-right"><input type="text" class="form-control" :placeholder="item.placeholder">' +
        '</div></div></li></ul></comtitle>' +
        '<comtitle title="提交表单"><ul class="um-list"><li class = "um-list-item" v-for="item in data3">' +
        '<div class = "um-list-item-inner"><div class="um-list-item-body" style="padding:9px 0 9px 15px"><input type="text" class="form-control" :placeholder="item">' +
        '</div> </div> </li></ul> <div class="um-row" ><button class = "um-btn um-no-brs"> 提交 </button> </div> </comtitle>' +
        '</wrapper>'
}
components.form.base2 = {
    mixins: [mixins.commonComponents],
    template: '<wrapper title="订单录入"><ul class="um-list"><li><div class="um-list-item">' +
        '<div class="um-list-item-inner"><span class="h pa um-box-vc um-red f20 pl5" >*</span><div class="um-list-item-left pl15">' +
        '公司名称：</div><div class="um-list-item-right"><input type="text" class="form-control" placeholder="请输入公司名称">' +
        '</div></div></div></li><li><div class="um-list-item"><div class="um-list-item-inner"><div class="um-list-item-left pl15">' +
        '订单编号：</div><div class="um-list-item-right"><input type="text" class="form-control" placeholder="请输入订单编号">' +
        '</div></div></div></li><li><div class="um-list-item"><div class="um-list-item-inner">' +
        '<div class="um-list-item-left pl15"> 订单金额：</div><div class="um-list-item-right">' +
        '<input type="text" class="form-control" placeholder="请输入订单金额"></div></div></div>' +
        '</li><li><div class="um-list-item"><div class="um-list-item-inner"><div class="um-list-item-left pl15">' +
        '下单日期：</div><div class="um-list-item-right"><input type="date" name="date" value="2015-01-01" class="form-control">' +
        '</div></div></div></li><li><div class="um-list-item"><div class="um-list-item-inner">' +
        '<span class="h pa um-box-vc um-red f20 pl5" >*</span><div class="um-list-item-left pl15">业务员：</div>' +
        '<div class="um-list-item-right"><input type="text" class="form-control" placeholder="请输入业务员名字"></div>' +
        '</div></div></li><li><div class="um-list-item"><div class="um-list-item-inner"><div class="um-list-item-left pl15">' +
        '联系电话：</div><div class="um-list-item-right"><input type="text" class="form-control" placeholder="请输入业务员联系电话">' +
        '</div></div></div></li></ul></wrapper>'
}
components.chart.base1 = {
    template: '<wrapper title="饼状图"><div id="myChart" style="height:500px;"></div></wrapper>',
    components: {
        wrapper: components.template.canScroll
    },
    mounted: function() {
        this.$nextTick(function() {
            var myChart = echarts.init(document.getElementById('myChart'));
            //指定图表的配置项和数据
            var option = {
                title: {
                    text: '2016年上半年订单总额百分比',
                    x: 'center',
                    y: 10,
                    textStyle: {
                        color: '#333',
                        fontSize: 18
                    }
                },
                tooltip: { //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)" // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    itemGap: 15, //legend元素间隔
                    itemWidth: 30, //图标宽度
                    itemHeight: 15, //图标高度
                    textStyle: {
                        color: '#333',
                        fontSize: 16,
                    },
                    data: ['一月', '二月', '三月', '四月', '五月', '六月']
                },
                calculable: false,
                series: [{
                    name: '单月数据详情(单位：万元)',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: [
                        { value: 60, name: '一月' },
                        { value: 100, name: '二月' },
                        { value: 90, name: '三月' },
                        { value: 120, name: '四月' },
                        { value: 240, name: '五月' },
                        { value: 480, name: '六月' },
                    ]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 点击事件操作
            myChart.on('click', function(param) {
                console.log(JSON.stringify(param.value));
            });
        })
    }
}

components.chart.base2 = {
    components: {
        wrapper: components.template.canScroll
    },
    template: '<wrapper title="柱状图"><div id="myChart" style="height:500px;"></div></wrapper>',
    mounted: function() {
        this.$nextTick(function() {
            var myChart = echarts.init(document.getElementById('myChart'));
            //指定图表的配置项和数据
            var option = {
                color: ['#007aff'],
                title: {
                    text: '2015年采购金额各月数据一览',
                    x: 'center',
                    y: 10,
                    textStyle: {
                        color: '#333',
                        fontSize: 18
                    }
                },
                tooltip: { // 气泡提示配置
                    trigger: 'item', // 触发类型，默认数据触发，可选为：'axis'
                },
                xAxis: [{ //x坐标轴相关设置
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        lineStyle: {
                            color: '#E3E5E8',
                            width: 2
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#333',
                            fontSize: 16
                        }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [{ //y坐标轴相关设置
                    type: 'value',
                    name: '(万元)',
                    nameTextStyle: {
                        align: 'right',
                        fontSize: 16
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'black',
                            width: 2
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#333',
                            fontSize: 16
                        }
                    }
                }],
                grid: {
                    x: 60,
                    y: 80,
                    x2: 40,
                    y2: 50
                },
                series: [{
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 5
                            }

                        }
                    },
                    data: [120, 150, 200, 160, 300, 230, 169, 321, 234, 432, 126, 148]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 点击事件操作
            myChart.on('click', function(param) {
                console.log(JSON.stringify(param.value));
            });
        })
    }
}

components.chart.base3 = {
    components: {
        wrapper: components.template.canScroll
    },
    template: '<wrapper title="折线图"><div id="myChart" style="height:500px;"></div></wrapper>',
    mounted: function() {
        this.$nextTick(function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById("myChart"));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "2016年8月相关数据统计",
                    x: "center",
                    y: 10,
                    textStyle: {
                        color: '#333',
                        fontSize: 18
                    }
                },
                legend: {
                    data: ["新增用户", "活跃用户", "新增vip用户", "活跃vip用户"],
                    x: 'center',
                    y: '450',
                    itemGap: 10, //legend元素间隔
                    itemWidth: 60, //图标宽度
                    itemHeight: 20, //图标高度
                    textStyle: {
                        color: '#333',
                        fontSize: 14
                    }
                },
                tooltip: { // 气泡提示配置
                    trigger: 'item' // 触发类型，默认数据触发，可选为：'axis'
                },
                xAxis: [{ //x坐标轴内容设置
                    type: 'category',
                    boundaryGap: true, //两边留出空白策略
                    axisLine: { //坐标线
                        lineStyle: {
                            color: '#464646',
                            width: 2
                        }
                    },
                    axisLabel: { //x、y坐标轴数据显示风格设置
                        interval: 'auto',
                        rotate: -45,
                        clickable: true,
                        textStyle: {
                            color: '#767676',
                            fontSize: 16
                        }
                    },
                    axisTick: {
                        interval: 'auto',
                        onGap: false
                    },
                    splitLine: { //分割线
                        show: true,
                        onGap: false,
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    data: ['8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7']
                }],
                yAxis: [{ //y坐标轴设置
                    type: 'value',
                    name: '(万)',
                    nameTextStyle: {
                        align: 'right',
                        fontSize: 16
                    },
                    axisLine: { //y坐标轴轴线颜色粗细设置
                        lineStyle: {
                            color: '#333',
                            width: 2
                        }
                    },
                    axisLabel: { //y坐标轴分度值字体设置
                        textStyle: {
                            color: '#333',
                            fontSize: 14
                        }
                    },
                    splitLine: { // y轴分割线设置
                        show: true,
                        onGap: false,
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    splitNumber: 10
                }],
                grid: { //控制坐标的四周间距（距离绘制好的dom边界距离）
                    x: 60,
                    y: 70,
                    x2: 40,
                    y2: 100
                },
                series: [{
                    name: '新增用户',
                    type: 'line',
                    symbol: 'emptyCircle',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    data: [50, 234, 450, 580, 760, 780, 900]
                }, {
                    name: '活跃用户',
                    type: 'line',
                    symbol: 'emptyCircle',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    data: [10, 160, 346, 370, 420, 470, 530]
                }, {
                    name: '新增vip用户',
                    type: 'line',
                    symbol: 'emptyCircle',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    data: [2, 40, 50, 130, 210, 200, 149]
                }, {
                    name: '活跃vip用户',
                    type: 'line',
                    symbol: 'emptyCircle',
                    symbolSize: 4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    data: [10, 30, 38, 120, 310, 380, 680]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 点击事件操作
            myChart.on('click', function(param) {
                console.log(JSON.stringify(param.value));
            });
        })
    }
}

components.listview = {
    data: function() {
        return {
            text: '',
            jsonArray: [
                { 'company': '国家电网公司', 'order_id': '000000000001', 'order_status': '待审核', 'order_money': '1,500', 'currency': '$', 'order_date': '2015-01-01', 'delivery_date': '2015-01-02', 'contact_name': '小明', 'contact_tel': '130********', 'if_store': false, 'memo': '记得及时发货' },
                { 'company': '中国移动通信集团公司', 'order_id': '000000000002', 'order_status': '待确认', 'order_money': '11,000', 'currency': '$', 'order_date': '2015-01-01', 'delivery_date': '2015-01-02', 'contact_name': '小明', 'contact_tel': '130********', 'if_store': false, 'memo': '记得及时发货' },
                { 'company': '中国人寿保险(集团)公司', 'order_id': '000000000003', 'order_status': '已关闭', 'order_money': '22,100', 'currency': '$', 'order_date': '2015-01-01', 'delivery_date': '2015-01-02', 'contact_name': '小明', 'contact_tel': '130********', 'if_store': false, 'memo': '记得及时发货' }
            ]
        }
    },
    template: '<wrapper title="listview 组件"><comtitle title="listview组件的功能是非常强大的，支持上拉加载、下拉刷新、侧滑、列表的点击、以及侧滑按钮的点击，甚至长点击。"></comtitle>\
        <div class="um-listview-wrap" id="listview">\
    <ul class="um-list um-no-active">\
        <li class="um-listview-row" v-for="(item,index) in jsonArray">\
			<a class="um-list-item um-swipe-action um-no-icon">\
				<div class="um-swipe-btns">\
					<span class="um-swipe-btn um-delete">删除</span>\
				</div><div class="um-list-item-media">\
					<label class="um-check-inline um-list-left-icon">\
					<input name="um-checkbox-inline" type="checkbox">\
					<span class="um-icon-checkbox um-css3-vc"></span> </label>\
				</div><div class="um-list-item-inner">\
					<div class="um-list-item-body" style="padding-right:0">\
						<div class="clearfix f16">\
							<div class="um-xs-6 tl um-text-overflow">\
								<span class="fb">{{item.company}}</span>\
							</div><div class="um-xs-6 tr um-text-overflow um-red">\
								<span>{{item.currency}}</span>\
								<span>{{item.order_money}}</span>\
							</div></div><div class="clearfix mt5 f12">\
							<div class="um-xs-6 tl um-text-overflow">\
								<span class="um-gray">{{item.order_id}}</span>\
								<span>{{item.order_status}}</span>\
							</div><div class="um-xs-6 tr um-text-overflow">\
								<span class="um-gray">{{item.order_date}}</span>\
							</div></div></div></div> </a></li></ul></div>\
    <totast-confirm ref="confirm" :text="text"></totast-confirm></wrapper>',
    created: function() {

    },
    mounted: function() {
        var _self = this
        setTimeout(function() {
            var listview = UM.listview('#listview');
            var that = _self
            listview.on('pullDown', function(sender) {
                row = { 'company': '中国兵器装备集团公司', 'order_id': '000000000000', 'order_status': '待审核', 'order_money': '1,500', 'currency': '$', 'order_date': '2015-01-01', 'delivery_date': '2015-01-02', 'contact_name': '小明', 'contact_tel': '130********', 'if_store': false, 'memo': '记得及时发货' }; -
                that.jsonArray.unshift(row);
                sender.refresh();
            });
            listview.on('pullUp', function(sender) {
                var row = { 'company': '宝钢集团有限公司', 'order_id': '000000000006', 'order_status': '待审核', 'order_money': '2,500', 'currency': '$', 'order_date': '2015-01-01', 'delivery_date': '2015-01-02', 'contact_name': '小明', 'contact_tel': '130********', 'if_store': false, 'memo': '记得及时发货' };
                that.jsonArray.push(row);
                sender.refresh();
            });
            listview.on('itemClick', function(sender, args) {
                that.text = "触发列表点击逻辑"
                that.show()
            });
            listview.on('itemSwipeLeft', function(sender, args) {
                sender.showItemMenu(args.$target);
            });
            listview.on('itemDelete', function(sender, args) {
                args.$target.slideUp(500, function() {});
            });
            listview.on('tapHold', function() {
                that.text = "触发了长点击"
                that.show()
            });
        }, 20)
    },
    methods: {
        show: function() {
            this.$refs.confirm.show()
        },
        deleteListItem: function(index) {
            this.jsonArray.splice(index, 1)
        }
    },
    components: {
        wrapper: components.template.wrapper,
        'totast-confirm': components.confirm,
        comtitle: components.template.title
    }
}