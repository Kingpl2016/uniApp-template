import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// 加上下面这一行
import AutoImport from 'unplugin-auto-import/vite'

// @ts-ignore
import nested from 'tailwindcss/nesting'
import tailwindcss from 'tailwindcss'
import tailwindcssConfig from './tailwind.config.cjs' // 注意匹配实际文件
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env'
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind'

import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
    envDir: resolve(__dirname, 'env'),
    plugins: [uni(),
        uniTailwind({
            /* options */
          }),
        vueSetupExtend(),
        Components({
          resolvers: [VantResolver()],
        }),
    // 加上下面的配置
    AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'pinia',
          'uni-app',
        ],
        // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // 若没此json文件，先开启，生成后在关闭
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
        dts: 'src/typings/auto-imports.d.ts',
      }),],
    resolve: {
        // 配置别名
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                // 因为uni.scss可以全局使用，这里根据自己的需求调整
                additionalData: '@import "./src/styles/global.scss";'
            }
        },
        postcss: {
            plugins: [
              nested(),
              tailwindcss({
                config: tailwindcssConfig,
              }),
              postcssPresetEnv({
                stage: 3,
                features: { 'nesting-rules': false },
              }),
            ],
          },
    },
    // 开发服务器配置
    server: {
        host: '0.0.0.0',
        port: 8080,
        // 请求代理
        proxy: {
            // 个人习惯，这里就用/dev作为前缀了
            '/dev': {
                target: 'https://suggest.taobao.com',
                changeOrigin: true,
                // 路径重写，去掉/dev
                rewrite: (path) => path.replace(/^\/dev/, '')
            }
        }
    },
    build: {
        // 禁用 gzip 压缩大小报告，以提升构建性能
        brotliSize: false,
        /** 配置h5打包js,css,img分别在不同文件夹start */
        assetsDir: 'static/img/',
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            }
        }
        /** 配置h5打包js,css,img分别在不同文件夹end */
    }
})
