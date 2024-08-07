import { useFetch } from "@/utils/http";

export const apiPlexListLibrary = (data: any) => {
  return useFetch.post<any>({
    url: "/plex/listLibrary",
    data,
  });
};
