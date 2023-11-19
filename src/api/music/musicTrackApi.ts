import { useFetch } from "@/utils/http";

export const musicTrackPageApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicTrack/page",
    params,
  });
};

export const musicTrackViewApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicTrack/view",
    params,
  });
};

export const musicTrackCreateApi = (data: any) => {
  return useFetch.post<any>({
    url: "/musicTrack/create",
    data,
  });
};

export const musicTrackUpdateApi = (data: any) => {
  return useFetch.post<any>({
    url: "/musicTrack/update",
    data,
  });
};

export const musicTrackDeleteApi = (data: any) => {
  return useFetch.delete<any>({
    url: "/musicTrack/delete",
    data,
  });
};

export const musicTrackColumnApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicTrack/column",
    params,
  });
};

export const musicTrackExportApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicTrack/export",
    params,
  });
};

export const musicTrackListByReleaseIdApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicTrack/listByReleaseId",
    params,
  });
};

export const apiMusicTrackViewLyrics = (params: any) => {
  return useFetch.get<any>({
    url: "/musicTrack/viewLyrics",
    params,
  });
};
