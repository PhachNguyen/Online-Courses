import { create } from 'zustand';
import { authAPI, setToken, removeToken, getUserFromToken, isTokenValid } from '../services/api';

const useAuthStore = create((set, get) => ({
    // State
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,

    // Actions
    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await authAPI.login(email, password);
            const { token, user } = response;

            setToken(token);
            set({
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null
            });

            return { success: true };
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || 'Đăng nhập thất bại'
            });
            return { success: false, error: error.response?.data?.message };
        }
    },

    register: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await authAPI.register(userData);
            const { token, user } = response;

            setToken(token);
            set({
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null
            });

            return { success: true };
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || 'Đăng ký thất bại'
            });
            return { success: false, error: error.response?.data?.message };
        }
    },

    logout: async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            removeToken();
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
            });
        }
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid()) {
            const user = getUserFromToken();
            set({
                user,
                token,
                isAuthenticated: true
            });
            return true;
        } else {
            removeToken();
            set({
                user: null,
                token: null,
                isAuthenticated: false
            });
            return false;
        }
    },

    clearError: () => {
        set({ error: null });
    },

    updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
    }
}));

export default useAuthStore; 