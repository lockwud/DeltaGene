import React from 'react';

const SignIn = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
      <form className="mt-8 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email Address</label>
          <input type="email" className="w-full px-3 py-2 border rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot your password?</a>
        </div>
        <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Sign In</button>
      </form>
    </div>
  </div>
);

export default SignIn;
