import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { loginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import { registerSchema } from "../schemas/registerSchema";
import {toast} from 'react-toastify' 

export const useAccounts = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const loginUser = useMutation({
        mutationFn: async (creds: loginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            });
           
        }
    });

    const { data: currentUser, isLoading:loadingUserInfo } = useQuery({
        queryKey: ['use'],
        queryFn: async () => {
            const response = await agent.get('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
    

    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey:['user']})
            queryClient.removeQueries({queryKey:['activities']})
            navigate('/');
        }
    })

    const registerUser = useMutation({
        mutationFn: async (creds: registerSchema) =>{
            await agent.post('/account/register', creds);
        }, 
        onSuccess: () => {
            toast.success('Register successful - you can now login');
            navigate('/login')
        }
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    };
};
