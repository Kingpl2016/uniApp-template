import { createSSRApp } from 'vue'
import App from './App.vue'
import '../mock'
import { setupPlugins } from './plugins'


// eslint-disable-next-line import/prefer-default-export
export function createApp() {
    const app = createSSRApp(App)
    
     setupPlugins(app)
    
    return {
        app
    }
}
