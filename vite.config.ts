/*
 * @Author: gongxiaofei
 * @Date: 2022-06-22 13:32:07
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-04-13 13:35:34
 * @Description:
 */
import type { ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";
import { createVitePlugins } from "./build/vite/plugins";
import { createProxy } from "./build/vite/proxy";
import { envParse } from "./build/utils";
import { resolve } from "path";

export default ({ mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = envParse(loadEnv(mode, root) as ImportMetaEnv);
  const {
    VITE_PORT,
    VITE_BASE_API,
    VITE_USE_PROXY,
    VITE_PUBLIC_PATH,
    VITE_PROXY_PREFIX,
    VITE_DROP_CONSOLE,
  } = env;
  return defineConfig({
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@c": resolve(__dirname, "src/components"),
        "#": resolve(__dirname, "types"),
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      https: false,
      ...(VITE_USE_PROXY
        ? { proxy: createProxy(VITE_PROXY_PREFIX, VITE_BASE_API as string) }
        : {}),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger", "alert"] : [],
    },
    build: {
      sourcemap: false,
      brotliSize: false,
      chunkSizeWarningLimit: 1000,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: 'true; @import "@/styles/theme.less"',
          },
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/index.less";',
        },
      },
    },
    plugins: createVitePlugins(env, mode === "production"),
  });
};
