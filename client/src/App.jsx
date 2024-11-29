import { Navigate, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import ResertPassword from "./pages/resertpassword/resertpassword";
import LandingPage from "./pages/landingPage/LandingPage";
// import { ConversationProvider } from './hooks/useGetConversations';


const GOOGLE_CLIENT_ID = "233838802280-rtmbofrpotmldqmmupdf3qjjd6i657fc.apps.googleusercontent.com";

function App() {
    const { authUser } = useAuthContext();

    return (
        
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className='min-h-screen flex flex-col justify-center'>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route 
                        path='/home' 
                        element={authUser ? <Home /> : <Navigate to={"/login"} />} 
                    />
                    <Route 
                        path='/login' 
                        element={authUser ? <Navigate to='/home' /> : <Login />} 
                    />
                    <Route 
                        path='/signup' 
                        element={authUser ? <Navigate to='/home' /> : <SignUp />} 
                    />
                    <Route 
                        path="/resertpassword" 
                        element={<ResertPassword />} 
                    />
                </Routes>
                <Toaster />
            </div>
        </GoogleOAuthProvider>
        
    );
}

export default App;