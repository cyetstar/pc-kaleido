import {useFetch} from "@/utils/http";

export const sysDictListByTypeApi = (type: string) => {
    return useFetch.get<any>({
        url: "/sysDict/listByType",
        params: {
            type,
        },
    });
};

export const sysDictListByDictTypeApi = (dictType: string) => {
    return useFetch.get<any>({
        url: "/sysDict/listByDictType",
        params: {
            dictType,
        },
    });
};

export const sysDictViewApi = (id: string) => {
    return useFetch.get<any>({
        url: "/sysDict/view",
        params: {
            id,
        },
    });
};

export const sysDictCreateApi = (data: any) => {
    return useFetch.post<any>({
        url: "/sysDict/create",
        data,
    });
};

export const sysDictCreateBatchApi = (data: any) => {
    return useFetch.post<any>({
        url: "/sysDict/createBatch",
        data,
    });
};
export const sysDictUpdateApi = (data: any) => {
    return useFetch.post<any>({
        url: "/sysDict/update",
        data,
    });
};
export const sysDictDeleteApi = (data: any) => {
    return useFetch.delete<any>({
        url: "/sysDict/delete",
        data,
    });
};