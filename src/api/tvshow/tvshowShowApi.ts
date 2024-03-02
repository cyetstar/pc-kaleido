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

export const apiTvshowShowSearchInfo = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/searchInfo",
    data,
  });
};

export const apiTvshowShowMatchPath = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/matchPath",
    data,
  });
};

export const apiTvshowShowMatchInfo = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/matchInfo",
    data,
  });
};

export const apiTvshowShowDownloadPoster = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/downloadPoster",
    data,
  });
};

export const apiTvshowShowReadNFO = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/readNFO",
    data,
  });
};

export const apiTvshowShowSyncPlex = (data: any) => {
  return useFetch.post<any>({
    url: "/tvshowShow/syncPlex",
    data,
  });
};

export const apiTvshowShowViewPath = (params: any) => {
  return useFetch.get<any>({
    url: "/tvshowShow/viewPath",
    params,
  });
};
