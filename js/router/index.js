var router = new VueRouter({
    routes: [
        { path: '/navigator/base1', component: components.navigator.NavigatorBase },
        { path: '/navigator/base2', component: components.navigator.NavigatorHavePhoto1 },
        { path: '/navigator/base3', component: components.navigator.NavigatorHavePhoto2 },
        { path: '/tab/base1', component: components.tab.base1 },
        { path: '/tab/base2', component: components.tab.base2 },
        { path: '/bottomtab', component: components.bottomtab.all },
        { path: '/button/base', component: components.button.base },
        { path: '/button/haveIcon', component: components.button.haveIcon },
        { path: '/button/btns', component: components.button.btns },
        { path: '/input', component: components.input.all },
        { path: '/radio', component: components.radio.all },
    ]
})