/*
 * @Author: gongxiaofei
 * @Date: 2022-06-22 13:32:07
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2022-08-16 14:28:24
 * @Description: 
 */
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
import VitePluginCertificate from 'vite-plugin-mkcert'
import { configMockPlugin } from './mock'
import { configVisualizer } from './visualizer'
import {
  createStyleImportPlugin,
  AndDesignVueResolve
} from 'vite-plugin-style-import'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean) => {
  const { VITE_USE_LEGACY, VITE_USE_MOCK } = viteEnv

  const vitePlugins: Plugin[] = [
    vue({
      reactivityTransform: true
    }),

    // 支持jsx
    vueJsx(),

    // 使setup标签支持name属性配置
    vueSetupExtend(),

    // 样式辅助插件：https://windicss.org/
    WindiCSS() as any,

    // 开发环境时https证书
    VitePluginCertificate({
      source: 'coding'
    }),

    // antd-vue 样式按需导入
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    })
  ]

  // vite-plugin-mock: mock插件
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // rollup-plugin-visualizer: vite打包体积分析
  process.env.REPORT === 'true' && vitePlugins.push(configVisualizer)

  if (isBuild) {
    // 兼容不支持原生ES Modules浏览器
    VITE_USE_LEGACY && vitePlugins.push(legacy())
  }

  return vitePlugins
}
