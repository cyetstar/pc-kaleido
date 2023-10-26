/*
 * @Author: gongxiaofei
 * @Date: 2022-06-22 13:32:07
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-10-19 16:59:06
 * @Description:
 */
import { ThemeEnum } from "@/enums/appEnum";
import { defineConfig } from "./utils";

export default defineConfig({
  //系统设置
  APP: {
    //业务中心侧边菜单标题
    title: "Kaleido",
    //主题类型
    theme: ThemeEnum.LIGHT,
    // 是否显示底部版权（包括Footer的显示）
    copyright: true,
    // 密码安全检查
    security: false,
  },
  //http相关
  HTTP: {
    timeout: 50000,
  },
  OAUTH: {
    //是否执行Auth登录（包括路由、接口检查token有效性）
    excute: true,
    //oauth中请求头内需加密的client_id
    client_id: "kaleido",
    //oauth中请求头内需加密的client_secret
    client_secret: "123456",
  },
  SM2: {
    publicKey:
      "04c3305bb148615102dd811101cbf43f5af93c5e3dc26656704f5ba234e7a60abee4fc5d41ab8b88e79aafe01094256018027c3b50a0eec351f78f9150e9c91e74",
    privateKey:
      "00dbb19fb10bb1d5617c8b85b460aa47b72250c134f5ce57163a9638021e0eddca",
    appKey:
      "e6b599e6b19fe5ae8fe794b0e58faae883bde7a791e68a80e69c8de58aa1e69c89e99990e585ace58fb8",
    cipherMode: 1,
  },
  //地图相关
  MAP: {
    //高德地图应用
    AMap: {
      key: "1a00b758d4ea0e8e32624577da319712",
      src: "https://webapi.amap.com/maps?v=1.4.15&key=1a00b758d4ea0e8e32624577da319712&callback=AMapLoader",
    },
    //百度地图应用
    BMap: {
      key: "dxy31QRkkZKnfttKSWfxMYt8yNUXuBGp",
      src: "http://api.map.baidu.com/api?v=3.0&ak=dxy31QRkkZKnfttKSWfxMYt8yNUXuBGp&callback=BMapLoader",
      //GL-3D地图
      glSrc:
        "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=dxy31QRkkZKnfttKSWfxMYt8yNUXuBGp&callback=BMapLoader",
    },
  },
});
