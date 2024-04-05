import { useFetch } from "@/utils/http";

export const apiComicAuthorPage = (params: any) => {
return useFetch.get<any>({
  url: "/comicAuthor/page",
  params,
  });
};

export const apiComicAuthorView = (params: any) => {
  return useFetch.get<any>({
    url: "/comicAuthor/view",
    params,
  });
};

export const apiComicAuthorCreate = (data: any) => {
  return useFetch.post<any>({
    url: "/comicAuthor/create",
    data,
  });
};

export const apiComicAuthorUpdate = (data: any) => {
  return useFetch.post<any>({
    url: "/comicAuthor/update",
    data,
  });
};

export const apiComicAuthorDelete = (data: any) => {
  return useFetch.delete<any>({
    url: "/comicAuthor/delete",
    data,
  });
};

export const apiComicAuthorColumn = (params: any) => {
  return useFetch.get<any>({
    url: "/comicAuthor/column",
    params,
  });
};

export const apiComicAuthorExport = (params: any) => {
  return useFetch.get<any>({
    url: "/comicAuthor/export",
    params,
  });
};