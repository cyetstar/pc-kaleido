import { useFetch } from "@/utils/http";

export const musicArtistPageApi = (params: any) => {
return useFetch.get<any>({
  url: "/musicArtist/page",
  params,
  });
};

export const musicArtistViewApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicArtist/view",
    params,
  });
};

export const musicArtistCreateApi = (data: any) => {
  return useFetch.post<any>({
    url: "/musicArtist/create",
    data,
  });
};

export const musicArtistUpdateApi = (data: any) => {
  return useFetch.post<any>({
    url: "/musicArtist/update",
    data,
  });
};

export const musicArtistDeleteApi = (data: any) => {
  return useFetch.delete<any>({
    url: "/musicArtist/delete",
    data,
  });
};

export const musicArtistColumnApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicArtist/column",
    params,
  });
};

export const musicArtistExportApi = (params: any) => {
  return useFetch.get<any>({
    url: "/musicArtist/export",
    params,
  });
};