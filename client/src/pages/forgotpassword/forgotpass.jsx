import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => (
  <div>
    <Link to="/resertpassword">
    <button className='text-sm hover:underline hover:text-blue-600 mt-2 ml-2 inline-block'>
    Forgot password?
      </button>
    </Link>
  </div>
);

export default ForgotPassword;