/*
 * @Author: gongxiaofei
 * @Date: 2022-06-22 13:32:07
 * @LastEditors: gongxiaofei
 * @LastEditTime: 2023-08-14 11:06:21
 * @Description:
 */
import type { AxiosResponse } from "axios";
import type { RequestConfig, Result } from "#/http";
import {
  ErrorCodeEnum,
  HttpMethodEnum,
  ResultCodeEnum,
} from "@/enums/httpEnum";
import { decrypt, encrypt, getHttpSign } from "@/utils/sm2";
import { alertErrMsg } from "@/utils/message";
import { isDevMode } from "@/utils/env";
import { envParse } from "../../../build/utils";
import appConfig from "@/config";

// 生成token
export const generateBaseToken = (token: Nullable<string>) => `bearer ${token}`;

// 获取默认请求前缀地址
export const getDefaultBaseURL = () => {
  const { VITE_BASE_API, VITE_USE_PROXY, VITE_USE_MOCK } = envParse(
    import.meta.env
  );
  // 使用proxy或者mock时，无需设置默认请求前缀
  if (isDevMode() && (VITE_USE_PROXY || VITE_USE_MOCK)) {
    return "";
  }
  return VITE_BASE_API;
};

export const getFilePath = () => {
  const { VITE_FILE_PATH } = envParse(import.meta.env);
  return VITE_FILE_PATH;
};

// 请求数据转换
export const transformRequest = (config: RequestConfig): RequestConfig => {
  const { data, params, method, headers, SM2Encrypt } = config;
  // GET方法时 params来自 自身 或者 data
  if (method === HttpMethodEnum.GET) {
    config.params = params || data;
    config.data = undefined;
  }
  // SM2加密
  if (SM2Encrypt) {
    config.headers = headers || {};
    config.headers.appKey = appConfig.SM2.appKey;
    const timestamp = new Date().getTime();
    const encryptData = encrypt(JSON.stringify(data));
    config.data = {
      timestamp,
      sign: getHttpSign(encryptData, timestamp),
      data: encryptData,
    };
  }
  return config;
};

let whitelist: string[] = [
  "/oauth/token",
  // "/sysadmin/fwtQxQxzCd/build",
  // "/tycjBzJk/getDataByChooseId",
  // "/tycjGzzlPz/page",
  // "/tycjGzzlPz/detailGzzlPz",
  // "/tycjDept/page",
  // "/tycjBzJk/page",
  // "/tycjBzJk/detail",
];
let directRes: string[] = ["/tyYyJb/getXmAndSfzhByBm"];
// 响应数据转换
export const transformResponse = (
  res: AxiosResponse<Result>,
  config: RequestConfig
) => {
  const { transformResponse, SM2Encrypt } = config;
  if (res.config?.responseType === "blob") {
    return res.data;
  }
  if (!transformResponse) {
    const { resultCode, message: msg } = res.data;
    if (
      whitelist.includes(res.config.url as string) ||
      resultCode === ResultCodeEnum.SUCCESS
    ) {
      if (directRes.includes(res.config.url as string)) {
        return res;
      } else if (whitelist.includes(res.config.url as string)) {
        return res.data;
      } else {
        return res.data.data;
      }
    } else {
      alertErrMsg(`${ErrorCodeEnum.B}${resultCode}`, msg);
    }
  }
  const { resultCode, data, message: msg } = res.data;
  if (resultCode === ResultCodeEnum.SUCCESS) {
    return SM2Encrypt ? JSON.parse(decrypt(data)) : data;
  } else {
    alertErrMsg(`${ErrorCodeEnum.B}${resultCode}`, msg);
  }
};
