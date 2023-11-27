import { useFetch } from "@/utils/http";

export const apiTvshowShowPage = (params: any) => {
return useFetch.get<any>({
  url: "/tvshowShow/page",
  params,
  });
};

export const apiTvshowShowView = (params: any) => {
  return useFetch.get<any>({
    url: "/tvshowShow/view",
    params,
  });
};

export const apiTvshowShowCreate = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/create",
    data,
  });
};

export const apiTvshowShowUpdate = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/update",
    data,
  });
};

export const apiTvshowShowDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/tvshowShow/delete",
    data,
  });
};

export const apiTvshowShowColumn = (params: any) => {
  return useFetch.get<any>({
    url: "/tvshowShow/column",
    params,
  });
};

export const apiTvshowShowExport = (params: any) => {
  return useFetch.get<any>({
    url: "/tvshowShow/export",
    params,
  });
};