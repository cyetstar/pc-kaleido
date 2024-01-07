import { useFetch } from "@/utils/http";
import { RequestMethod } from "@ht/http";

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

export const apiMovieBasicReadNFO = () => {
  return useFetch.post<any>({
    url: "/movieBasic/readNFO",
  });
};

export const apiMovieBasicReadNFOById = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/readNFOById",
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

export const apiMovieBasicMatchPath = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/matchPath",
    data,
  });
};

export const apiMovieBasicViewNFO = (params: any) => {
  return useFetch.open<any>({
    url: "/movieBasic/viewNFO",
    params,
  });
};

export const apiMovieBasicAutoCopy = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/autoCopy",
    data,
  });
};

export const apiMovieBasicViewPath = (params: any) => {
  return useFetch.get<any>({
    url: "/movieBasic/viewPath",
    params,
  });
};

export const apiMovieBasicUploadPoster = (data: any) => {
  return useFetch.upload<any>({
    url: "/movieBasic/uploadPoster",
    method: RequestMethod.POST,
    data,
  });
};

export const apiMovieBasicDownloadPoster = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/downloadPoster",
    data,
  });
};

export const apiMovieBasicListByCollectionId = (params: any) => {
  return useFetch.get<any>({
    url: "/movieBasic/listByCollectionId",
    params,
  });
};

export const apiMovieCollectionSyncPlexById = (data: any) => {
  return useFetch.post<any>({
    url: "/movieCollection/syncPlexById",
    data,
  });
};

export const apiMovieBasicUpdateSource = () => {
  return useFetch.post<any>({
    url: "/movieBasic/updateSource",
  });
};

export const apiMovieBasicCheckThreadStatus = () => {
  return useFetch.post<any>({
    url: "/movieBasic/checkThreadStatus",
  });
};

export const apiMovieBasicWriteNFO = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/writeNFO",
    data,
  });
};

export const apiMovieBasicUpdateSourceByDoubanId = (data: any) => {
  return useFetch.post<any>({
    url: "/movieBasic/updateSourceByDoubanId",
    data,
  });
};
