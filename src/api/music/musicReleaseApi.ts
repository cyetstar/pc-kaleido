import { useFetch } from "@/utils/http";

export const musicReleasePageApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicRelease/page",
    params,
  });
};

export const musicReleaseViewApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicRelease/view",
    params,
  });
};

export const musicReleaseCreateApi = (data: any) => {
  return useFetch.post<any>({
    url: "/musicRelease/create",
    data,
  });
};

export const musicReleaseUpdateApi = (data: any) => {
  return useFetch.post<any>({
    url: "/musicRelease/update",
    data,
  });
};

export const apiMusicReleaseUpdateAudioTag = (data: any) => {
  return useFetch.post<any>({
    url: "/musicRelease/updateAudioTag",
    data,
  });
};

export const musicReleaseDeleteApi = (data: any) => {
  return useFetch.delete<any>({
    url: "/musicRelease/delete",
    data,
  });
};

export const musicReleaseColumnApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicRelease/column",
    params,
  });
};

export const musicReleaseExportApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicRelease/export",
    params,
  });
};

export const apiMusicReleaseSyncPlex = () => {
  return useFetch.post<any>({
    url: "/musicRelease/syncPlex",
  });
};

export const apiMusicReleaseSearchNetease = (params: any) => {
  return useFetch.get<any>({
    url: "/musicRelease/searchNetease",
    params,
  });
};
export const apiMusicReleaseMatchNetease = (data: any) => {
  return useFetch.post<any>({
    url: "/musicRelease/matchNetease",
    data,
  });
};
export const apiMusicReleaseDownloadLyric = (data: any) => {
  return useFetch.post<any>({
    url: "/musicRelease/downloadLyric",
    data,
  });
};

export const apiMusicReleaseListByArtistId = (data: any) => {
  return useFetch.get<any>({
    url: "/musicRelease/listByArtistId",
    data,
  });
};
