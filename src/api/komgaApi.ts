import { useFetch } from "@/utils/http";

export const apiKomgaListLibrary = (data: any) => {
  return useFetch.post<any>({
    url: "/komga/listLibrary",
    data,
  });
};
