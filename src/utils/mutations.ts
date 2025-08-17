import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { getBioId, updateBio } from "./api";
import type { BioForm, UserBioType } from "./types";


export const useBioMutate = () => {
    const { token } = useAuthContext();
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (bio: BioForm) => updateBio(token, bio),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [getBioId] });
        },
    });
}