//import type { App } from 'vue'

import { createPinia} from 'pinia'

//import piniaPersist from 'pinia-plugin-persist-uni'

const pinia = createPinia();

//持久化
//pinia.use(piniaPersist)

// export function setupStore(app: App<Element>){
//     app.use(pinia);
// }

export default  pinia