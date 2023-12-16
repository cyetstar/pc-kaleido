import { useFetch } from "@/utils/http";
import { RequestMethod } from "@ht/http";

export const apiMusicAlbumPage = (params: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/page",
    params,
  });
};

export const apiMusicAlbumView = (params: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/view",
    params,
  });
};

export const apiMusicAlbumCreate = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/create",
    data,
  });
};

export const apiMusicAlbumUpdate = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/update",
    data,
  });
};

export const apiMusicAlbumDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/musicAlbum/delete",
    data,
  });
};

export const apiMusicAlbumColumn = (params: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/column",
    params,
  });
};

export const apiMusicAlbumExport = (params: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/export",
    params,
  });
};

export const apiMusicAlbumSyncPlex = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/syncPlex",
    data,
  });
};

export const apiMusicAlbumSyncPlexById = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/syncPlexById",
    data,
  });
};

export const apiMusicAlbumSearchNetease = (params: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/searchNetease",
    params,
  });
};
export const apiMusicAlbumMatchNetease = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/matchNetease",
    data,
  });
};
export const apiMusicAlbumDownloadLyric = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/downloadLyric",
    data,
  });
};

export const apiMusicAlbumListByArtistId = (data: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/listByArtistId",
    data,
  });
};

export const apiMusicAlbumUpdateAudioTag = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/updateAudioTag",
    data,
  });
};

export const apiMusicAlbumViewPath = (params: any) => {
  return useFetch.get<any>({
    url: "/musicAlbum/viewPath",
    params,
  });
};

export const apiMusicAlbumUploadCover = (data: any) => {
  return useFetch.upload<any>({
    url: "/musicAlbum/uploadCover",
    method: RequestMethod.POST,
    data,
  });
};

export const apiMusicAlbumDownloadCover = (data: any) => {
  return useFetch.post<any>({
    url: "/musicAlbum/downloadCover",
    data,
  });
};
