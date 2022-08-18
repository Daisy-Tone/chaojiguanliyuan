import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Main',
        component:()=>import('../pages/Main.vue'),
        redirect:'/home',
        children:[
            // {
            //     path:'/home',
            //     name:'home',
            //     component:()=>import('../pages/Home')
            // },
            // {
            //     path:'/mall',
            //     name:'mall',
            //     component:()=>import('../pages/Mall')
            // },
            // {
            //     path:'/user',
            //     name:'user',
            //     component:()=>import('../pages/User')
            // },
            // {
            //     path:'/page1',
            //     name:'page1',
            //     component:()=>import('../pages/Other/pageOne'),
            // },
            // {
            //     path:'/page2',
            //     name:'page2',
            //     component:()=>import('../pages/Other/pageTwo'),
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('../pages/Login')
    }
]

export default new VueRouter({
    mode:'history',
    routes
})