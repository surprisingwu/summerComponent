var components = {
    navigator: {},
    common: {}
}
var mixins = {
    methods: {
        goToBack: function() {
            this.$router.back()
        }
    }
}
components.common.Radio = {
    template: '<div class="um-check-group">' +
        '<label class="um-check-group-item" v-for="item in radioMesg">' +
        '<input name="um-radio" checked type="radio" :value="item.value">' +
        '<span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">{{item.text}}</span>' +
        '</label></div>',
    props: ['radioMesg']
}
components.navigator.NavigatorBase = {
    template: '<div class="components-wrapper">' +
        '<div class="um-header-light">' +
        '<div v-show="isBack"><a href="#" class="um-back" @click="goToBack" v-show="isShowIconBack"><span v-show="isShowIconText">返回</span></a></div>' +
        '<h3> 导航栏</h3>' +
        '<div><div class="um-header-btns" v-show="isShowBtnIcon"><i class="ti-plus mr5" ></i></div><a class="um-header-right" href="#" v-show="isShowBtnText">保存</a></div>' +
        '</div>' +
        '<div class="um-content">' +
        '<div class="text-content">这是导航栏(顶部)的默认的演示样式,你可以在顶部导航中防止多种控件。点击如下单选框按钮切换导航栏的内容</div>' +
        '<div class="components-title">左侧显示内容</div>' +
        '<div class="um-check-group">' +
        '<label class="um-check-group-item border-1px" v-for="(item,index) in radioMesg">' +
        '<input name="um-radio" type="radio" :checked="index === 1"  :value="item.value" v-model="preValueLeft">' +
        '<span class="um-icon-check um-css3-vc"></span>' +
        '<span class="um-black">{{item.text}}</span>' +
        '</label></div>' +
        '<div class="components-title">右侧显示内容</div>' +
        '</div>' +
        '</div>',
    data: function() {
        return {
            isBack: true,
            isShowIconBack: true,
            isShowIconText: false,
            isShowBtnText: false,
            isShowBtnIcon: false,
            preValueLeft: '',
        }
    },
    mixins: [mixins],
    created: function() {
        this.preValueLeft = ''
        this.preValueRight = ''
    },
    computed: {
        radioMesg: function() {
            var radioMesg = [
                { text: '不显示', value: 'isBack', bol: this.isBack },
                { text: '仅图标', value: 'isShowIconBack', bol: this.isShowIconBack },
                { text: '图标加文字', value: 'isShowIconText', bol: this.isShowIconText }
            ]

            return radioMesg
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
        }
    }
}