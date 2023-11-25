import { useFetch } from "@/utils/http";

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
