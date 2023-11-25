import { useFetch } from "@/utils/http";

export const apiMovieActorPage = (params: any) => {
return useFetch.get<any>({
  url: "/movieActor/page",
  params,
  });
};

export const apiMovieActorView = (params: any) => {
  return useFetch.get<any>({
    url: "/movieActor/view",
    params,
  });
};

export const apiMovieActorCreate = (data: any) => {
  return useFetch.post<any>({
    url: "/movieActor/create",
    data,
  });
};

export const apiMovieActorUpdate = (data: any) => {
  return useFetch.post<any>({
    url: "/movieActor/update",
    data,
  });
};

export const apiMovieActorDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/movieActor/delete",
    data,
  });
};

export const apiMovieActorColumn = (params: any) => {
  return useFetch.get<any>({
    url: "/movieActor/column",
    params,
  });
};

export const apiMovieActorExport = (params: any) => {
  return useFetch.get<any>({
    url: "/movieActor/export",
    params,
  });
};