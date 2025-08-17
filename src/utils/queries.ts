import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { getSelfBio, searchUsers } from "./api";

export const useSearchUsers = (search: string, perPage: number) => {
    const { token } = useAuthContext();

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

//get user bio
export const useGetSelfBio = () => {
    const { token } = useAuthContext();

    return useQuery({
        queryKey: ['getSelfBio'],
        queryFn: () => getSelfBio(token),
    });
};
