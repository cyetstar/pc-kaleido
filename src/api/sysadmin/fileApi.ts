import { useFetch } from "@/utils/http";

export const apiFileList = (params: any) => {
  return useFetch.get<any>({
    url: "/file/list",
    params,
  });
};

export const apiFileDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/file/delete",
    data,
  });
};

export const apiFileRename = (data: any) => {
  return useFetch.post<any>({
    url: "/file/rename",
    data,
  });
};

export const apiFileMove = (data: any) => {
  return useFetch.post<any>({
    url: "/file/move",
    data,
  });
};
