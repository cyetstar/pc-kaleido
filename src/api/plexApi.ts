import { useFetch } from "@/utils/http";

export const apiPlexGetLibraries = (data: any) => {
  return useFetch.post<any>({
    url: "/plex/getLibraries",
    data,
  });
};
