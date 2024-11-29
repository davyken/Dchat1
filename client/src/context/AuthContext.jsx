import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    const [loading, setLoading] = useState(false);

    // Handle Google Login
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/google", {
                credential: credentialResponse.credential
            });

            const data = response.data;

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data.user));
            setAuthUser(data.user);
            toast.success("Successfully logged in with Google!");

        } catch (error) {
            toast.error(error.message || "Error logging in with Google");
            console.error("Google login error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
    };

    // Function to update user profile
    const updateUserProfile = (updatedUser) => {
        localStorage.setItem("chat-user", JSON.stringify(updatedUser));
        setAuthUser(updatedUser);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                authUser, 
                setAuthUser,
                handleGoogleLogin,
                logout,
                loading,
                updateUserProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for handling Google auth errors
export const useGoogleAuth = () => {
    const { handleGoogleLogin, loading } = useAuthContext();

    const handleGoogleError = () => {
        toast.error("Google sign in was unsuccessful");
    };

    return {
        handleGoogleSuccess: handleGoogleLogin,
        handleGoogleError,
        loading
    };
};