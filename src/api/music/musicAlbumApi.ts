import { useFetch } from "@/utils/http";

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

export const apiMusicAlbumSyncPlex = () => {
  return useFetch.post<any>({
    url: "/musicAlbum/syncPlex",
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
