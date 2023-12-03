import { useFetch } from "@/utils/http";
import { HttpMethodEnum } from "@/enums/httpEnum";

export const apiMovieBasicPage = (params: any) => {
  return useFetch.get<any>({
    url: "/movieBasic/page",
    params,
  });
};

export const apiMovieBasicView = (params: any) => {
  return useFetch.get<any>({
    url: "/movieBasic/view",
    params,
  });
};

export const apiMovieBasicCreate = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/create",
    data,
  });
};

export const apiMovieBasicUpdate = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/update",
    data,
  });
};

export const apiMovieBasicDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/movieBasic/delete",
    data,
  });
};

export const apiMovieBasicColumn = (params: any) => {
  return useFetch.get<any>({
    url: "/movieBasic/column",
    params,
  });
};

export const apiMovieBasicExport = (params: any) => {
  return useFetch.get<any>({
    url: "/movieBasic/export",
    params,
  });
};

export const apiMovieBasicSyncPlex = () => {
  return useFetch.post<any>({
    url: "/movieBasic/syncPlex",
  });
};

export const apiMovieBasicSyncPlexById = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/syncPlexById",
    data,
  });
};

export const apiMovieBasicRefreshPlexById = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/refreshPlexById",
    data,
  });
};

export const apiMovieBasicReadNFO = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/readNFO",
    data,
  });
};

export const apiMovieBasicSearchDouban = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/searchDouban",
    data,
  });
};

export const apiMovieBasicMatchDouban = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/matchDouban",
    data,
  });
};

export const apiMovieBasicViewNFO = (params: any) => {
  return useFetch.open<any>({
    url: "/movieBasic/viewNFO",
    params,
  });
};
