import { Link } from "react-router-dom";  
import GenderCheckbox from "./GenderCheckbox";  
import { useState } from "react";  
import useSignup from "../../hooks/useSignup";  

const SignUp = () => {  
	const [inputs, setInputs] = useState({  
		fullName: "",  
		username: "",  
		password: "",  
		confirmPassword: "",  
		gender: "",  
	});  

	const { loading, signup } = useSignup();  

	const handleCheckboxChange = (gender) => {  
		setInputs({ ...inputs, gender });  
	};  

	const handleSubmit = async (e) => {  
		e.preventDefault();  
		await signup(inputs);  
	};  

	return (  
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>  
			<div className='w-full p-6 rounded-lg shadow-md bg-white'>  
				<h1 className='text-3xl font-semibold text-center text-blue-500'>  
					Sign Up <span className='text-blue-500'>DChatApp</span>  
				</h1>  

				<form onSubmit={handleSubmit}>  
					<div>  
						<label className='label p-2'>  
							<span className='text-base label-text text-black-500'>Full Name</span>  
						</label>  
						<input  
							type='text'  
							placeholder='Enter Your Name'  
							className='w-full input input-bordered h-10 bg-gray-300 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'  
							value={inputs.fullName}  
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}  
						/>  
					</div>  

					<div>  
						<label className='label p-2'>  
							<span className='text-base label-text bg-white text-black-500'>Username</span>  
						</label>  
						<input  
							type='text'  
							placeholder='Enter Your Username'  
							className='w-full input input-bordered h-10 bg-gray-300 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'  
							value={inputs.username}  
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}  
						/>  
					</div>  

					<div>  
						<label className='label'>  
							<span className='text-base label-text text-black-500'>Password</span>  
						</label>  
						<input  
							type='password'  
							placeholder='Enter Password'  
							className='w-full input input-bordered h-10 bg-gray-300 text-gray-700 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'  
							value={inputs.password}  
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}  
						/>  
					</div>  

					<div>  
						<label className='label'>  
							<span className='text-base label-text text-black-900'>Confirm Password</span>  
						</label>  
						<input  
							type='password'  
							placeholder='Confirm Password'  
							className='w-full input input-bordered h-10 bg-gray-300 text-gray-900 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200'  
							value={inputs.confirmPassword}  
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}  
						/>  
					</div>  

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />  

					<Link  
						to={"/login"}  
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'  
					>  
						Already have an account?  
					</Link>  
					  
					<div style={{ backgroundColor: 'white' }}>  
    {/* Terms and policies */}  
    <input  
        id="agreeTerms"  
        type="checkbox"  
        className='checkbox size-4 border-slate-900'  
    />  
    <label htmlFor="agreeTerms" className='text-sm'>  
        I agree to the{" "}  
        <a href="#" className='text-blue-600 hover:underline'>Terms and Conditions</a>  
    </label>  
</div>

					<div>  
						<button className='btn btn-block text-white bg-blue-500 btn-sm mt-2 border border-slate-700' disabled={loading}>  
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}  
						</button>  
					</div>  
				</form>  
			</div>  
		</div>  
	);  
};  

export default SignUp;