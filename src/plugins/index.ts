import pinia from '@/store'
import type { App } from 'vue'
import VueMitter from '@nguyenshort/vue3-mitt'



export function setupPlugins(app:App<Element>){

    //状态管理
    app.use(pinia)

    //eventbus
    app.use(VueMitter)

}