var router = new VueRouter({
    routes: [
        { path: '/navigator/base1', component: components.navigator.NavigatorBase },
        { path: '/navigator/base2', component: components.navigator.NavigatorHavePhoto1 },
        { path: '/navigator/base3', component: components.navigator.NavigatorHavePhoto2 }
    ]
})