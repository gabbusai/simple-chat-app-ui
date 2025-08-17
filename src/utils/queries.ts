import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { searchUsers } from "./api";

export const useSearchUsers = (token: string | null, search: string, perPage: number) => {
    return useInfiniteQuery({
        queryKey: ['searchUsers', perPage, search],
        queryFn: ({pageParam = 1}) => searchUsers(token, search, perPage, pageParam),   
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if(lastPage.pagination.current_page < lastPage.pagination.last_page){
                return lastPage.pagination.current_page + 1;
            }
            return undefined;
        },
        refetchOnMount: false,
        enabled: false,
    });
}