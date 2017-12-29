var router = new VueRouter({
    routes: [
        { path: '/navigator/base1', component: components.navigator.NavigatorBase },
        { path: '/navigator/base2', component: components.navigator.NavigatorHavePhoto1 },
        { path: '/navigator/base3', component: components.navigator.NavigatorHavePhoto2 },
        { path: '/tab/base1', component: components.tab.base1 },
        { path: '/tab/base2', component: components.tab.base2 },
        { path: '/bottomtab', component: components.bottomtab },
        { path: '/button/base', component: components.button.base },
        { path: '/button/haveIcon', component: components.button.haveIcon },
        { path: '/button/btns', component: components.button.btns },
        { path: '/input', component: components.input },
        { path: '/radio', component: components.radio },
        { path: '/checkbox', component: components.checkbox },
        { path: '/turnoff', component: components.turnoff },
        { path: '/progressbar', component: components.progressbar },
        { path: '/date', component: components.date },
        { path: '/photo', component: components.photo },
        { path: '/gallery/base', component: components.gallery.base },
        { path: '/gallery/arrow', component: components.gallery.arrow },
        { path: '/calendar', component: components.calendar },
        { path: '/scrollpicker', component: components.scrollPicker },
        { path: '/panel', component: components.panel },
        { path: '/form/base', component: components.form.base },
        { path: '/form/base2', component: components.form.base2 },
        { path: '/chart/base1', component: components.chart.base1 },
        { path: '/chart/base2', component: components.chart.base2 },
        { path: '/chart/base3', component: components.chart.base3 },
    ]
})