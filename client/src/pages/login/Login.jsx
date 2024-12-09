import { useState } from "react";  
import { Link } from "react-router-dom";  
import { Eye, EyeOff } from "lucide-react";  
import { GoogleLogin } from '@react-oauth/google';  
import useLogin from "../../hooks/useLogin";  
import ForgotPassword from "../forgotpassword/forgotpass";  
import { useGoogleAuth } from "../../context/AuthContext";  

const Login = () => {  
    const [username, setUsername] = useState("");  
    const [password, setPassword] = useState("");  
    const [showPassword, setShowPassword] = useState(false);  

    const { loading, login } = useLogin();  
    const { handleGoogleSuccess, handleGoogleError, loading: googleLoading } = useGoogleAuth();  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        await login(username, password);  
    };  

    const togglePasswordVisibility = () => {  
        setShowPassword(!showPassword);  
    };  

    return (  
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>  
            <div className='w-full p-6 rounded-lg shadow-md bg-white'>  
                <h1 className='text-3xl font-semibold text-center text-blue-500'>  
                    Login  
                    <span className='text-blue-500'> DChatApp</span>  
                </h1>  

                <form onSubmit={handleSubmit}>  
                    <div>  
                        <label className='label p-2'>  
                            <span className='text-base label-text'>Username</span>  
                        </label>  
                        <input  
                            type='text'  
                            placeholder='Enter username'  
                            className='w-full input input-bordered h-10 bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'  
                            value={username}  
                            onChange={(e) => setUsername(e.target.value)}  
                        />  
                    </div>  

                    <div>  
                        <label className='label'>  
                            <span className='text-base label-text'>Password</span>  
                        </label>  
                        <div className='relative'>  
                            <input  
                                type={showPassword ? 'text' : 'password'}  
                                placeholder='Enter Password'  
                                className='w-full input input-bordered h-10 bg-white text-gray-700 border-white-300 focus:border-blue-500 focus:ring focus:ring-blue-200 pr-10'  
                                value={password}  
                                onChange={(e) => setPassword(e.target.value)}  
                            />  
                            <button  
                                type="button"  
                                onClick={togglePasswordVisibility}  
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"  
                            >  
                                {showPassword ? (  
                                    <EyeOff className="h-5 w-5 text-gray-500" />  
                                ) : (  
                                    <Eye className="h-5 w-5 text-gray-500" />  
                                )}  
                            </button>  
                        </div>  
                    </div>  

                    <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>  
                        {"Don't"} have an account?  
                    </Link>  
                    <div className='text-sm hover:underline hover:text-blue-600 mt-2 ml-2 inline-block'>  
                        <ForgotPassword />  
                    </div>  

                    <div>  
                        <button className='btn btn-block bg-blue-500 text-white btn-sm mt-2' disabled={loading || googleLoading}>  
                            {loading ? <span className='loading loading-spinner '></span> : "Login"}  
                        </button>  
                    </div>  

                    <div className="relative mt-4">  
                        <div className="absolute inset-0 flex items-center">  
                            <div className="w-full border-t border-gray-300"></div>  
                        </div>  
                        <div className="relative flex justify-center text-sm">  
                            <span className="px-2 bg-transparent text-gray-300">Or continue with</span>  
                        </div>  
                    </div>  

                    <div className="mt-4 flex justify-center">  
                        {!googleLoading ? (  
                            <div className="google-login-button">  
                                <GoogleLogin  
                                    onSuccess={handleGoogleSuccess}  
                                    onError={handleGoogleError}  
                                    useOneTap  
                                    theme="filled_white"  
                                    shape="pill"  
                                    size="large"  
                                    disabled={loading || googleLoading}  
                                />  
                            </div>  
                        ) : (  
                            <div className="flex items-center justify-center">  
                                <span className="loading loading-spinner"></span>  
                            </div>  
                        )}  
                    </div>  
                </form>  
            </div>  

            {/* Removed style jsx block to avoid warning */}  
            <style>{`  
                .google-login-button {  
                    width: 100%;  
                    display: flex;  
                    justify-content: center;  
                }  
                .google-login-button > div {  
                    width: 100% !important;  
                }  
                .google-login-button iframe {  
                    width: 100% !important;  
                }  
            `}</style>  
        </div>  
    );  
};  

export default Login;