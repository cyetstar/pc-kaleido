import { useFetch } from "@/utils/http";

export const apiMusicArtistPage = (params: any) => {
return useFetch.get<any>({
  url: "/musicArtist/page",
  params,
  });
};

export const apiMusicArtistView = (params: any) => {
  return useFetch.get<any>({
    url: "/musicArtist/view",
    params,
  });
};

export const apiMusicArtistCreate = (data: any) => {
  return useFetch.post<any>({
    url: "/musicArtist/create",
    data,
  });
};

export const apiMusicArtistUpdate = (data: any) => {
  return useFetch.post<any>({
    url: "/musicArtist/update",
    data,
  });
};

export const apiMusicArtistDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/musicArtist/delete",
    data,
  });
};

export const apiMusicArtistColumn = (params: any) => {
  return useFetch.get<any>({
    url: "/musicArtist/column",
    params,
  });
};

export const apiMusicArtistExport = (params: any) => {
  return useFetch.get<any>({
    url: "/musicArtist/export",
    params,
  });
};