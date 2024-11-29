import React from "react";

function ResertPassword() {
  return (
    <>
      <div className="fixed inset-0 bg-blue-900 bg-opacity-30 flex items-center justify-center z-50">
        <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-lg bg-white">
          <p className=" font-medium text-center text-gray-400">
            Enter the email you used to create your account
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 md:ml-4">
            submit
          </button>
        </div>
      </div>
    </>
  );
}

export default ResertPassword;