var components = {
    navigator: {},
    common: {},
    tab: {},
    template: {},
    bottomtab: {},
    button: {},
    input: {},
    radio: {}
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
    props: ['sub-title'],
    template: '<div class="components-wrapper"><div id="header" class="um-header">' +
        '<a href="#" class="um-back" @click="goToBack"></a><h3>{{subTitle}}</h3>' +
        '</div><slot></slot></div>',
    mixins: [mixins.mixinsGoBack]
}
components.template.title = {
    props: ['title'],
    template: '<div class="components-title">{{title}}</div>'
}
components.template.flex2 = {
    template: '<div class="flex2-wrapper border-1px"><slot name="left"></slot><slot name="right"></slot></div>'
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
    template: '<wraper :sub-title="title"><div class="components-title">普通文字选项卡</div> <ul class="um-tabbar"><li><a>待付款</a></li>' +
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
    template: '<wrapper :sub-title="title"><div class="text-content">tab栏切换,这里只是简单的demo,样式还有一些逻辑可以根据需求来定</div>' +
        '<ul class="um-tabbar um-tabbar-underline pt10 pb10 um-tabbar-switch background-color-fff">' +
        '<li v-for="(item,index) in tabs" :class="{\'active\':index === currentIndex}" @click="changeCurrentIndex(index)"><a>{{item.text}}</a></li>' +
        '</ul><div class="Artical"><div v-for="(item,index) in subTabs" v-show="currentIndex === index">{{item.text}}</div></div></wrapper>',
    components: {
        wrapper: components.template.wrapper
    }
}

components.bottomtab.all = {
    template: '<wrapper sub-title="底部工具栏">' +
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
    template: '<wrapper sub-title="不同按钮"><flex2><div class="flex2-item-left" slot="left">普通按钮</div>' +
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
    template: '<wrapper sub-title="带图标的按钮"><flex2><div class="flex2-item-left" slot="left">图标在左侧</div><div class="flex2-item-right" slot="right"><button class="btn btn-inline">' +
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
    template: '<wrapper sub-title="按钮组"><comtitle title="水平按钮组"></comtitle><div><div class="btn-group align-center">' +
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
components.input.all = {
    template: '<wrapper sub-title="输入框"></wrapper>',
    components: {
        wrapper: components.template.wrapper,
        comtitle: components.template.title
    }
}