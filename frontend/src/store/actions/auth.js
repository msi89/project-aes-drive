import { useRecoilValue, useSetRecoilState } from 'recoil'
import api from '../../helpers/api'
import { useState } from 'react'
import Storage from '../local'
import { authUserState, isAuthState } from '..'



export const useAuthUser = () => {
    const [loading, setLoading] = useState(false);
    const isAuthenticated = useRecoilValue(isAuthState)
    const setAuthUser = useSetRecoilState(authUserState)

    const login = async (credentials) => {
        try {
            setLoading(true)
            const response = await api.post("/auth/token/login", credentials);
            Storage.set("token", response.data.auth_token);
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        } finally {
            setLoading(false)
        }
    }

    const register = async (credentials) => {
        try {
            setLoading(true)
            const response = await api.post("/auth/users/", credentials);
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        } finally {
            setLoading(false)
        }
    }

    const me = async () => {
        try {
            setLoading(true)
            const response = await api.get("/auth/users/me");
            Storage.set('user', response.data)
            setAuthUser(response.data)
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            setLoading(true)
            const response = await api.post("/auth/token/logout");
            Storage.reset()
            return api.format(response);
        } catch (error) {
            return api.format(error.response, true);
        } finally {
            setLoading(false)
        }
    }

    return {
        login,
        me,
        loading,
        logout,
        register,
        isAuthenticated
    }
}




export default useAuthUser