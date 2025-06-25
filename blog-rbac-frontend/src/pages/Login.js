// // src/pages/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { auth, provider } from '../firebase/config';
// import { signInWithPopup } from 'firebase/auth';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', res.data.token);
//       window.location.reload();  // refesh page 
//       alert('Login successful');
//     } catch (err) {
//       alert(err.response.data.message || 'Login failed');
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();

//       const res = await axios.post('http://localhost:5000/api/auth/google', { idToken });
//       localStorage.setItem('token', res.data.token);
//       window.location.reload();  // refesh page 
//       alert('Google Login successful');
//     } catch (err) {
//       alert('Google Login failed');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//         <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//         <button type="submit">Login</button>
//       </form>
//       <button onClick={handleGoogleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, provider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';



const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      // window.location.reload();
      alert('Login successful');
      navigate('/'); // ✅ Go to the "post" page
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const res = await axios.post('http://localhost:5000/api/auth/google', { idToken });
      localStorage.setItem('token', res.data.token);
      // window.location.reload();
      alert('Google Login successful');
      navigate('/'); // ✅ Go to the "post" page
    } catch {
      alert('Google Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#3a4664] flex items-center justify-center p-6">
      <div
        className={`bg-[#fefcfc] rounded-2xl px-8 py-10 w-full max-w-xl
          shadow-[0_0_30px_#eaa0a2] transform transition-all duration-700
          ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        `}
      >
        <h2 className="text-3xl font-bold text-[#3a4664] mb-6 text-center tracking-wide">
          Login HERE </h2>
          {/* ** */}
          <div className="bg-[#fefcfc] text-[#3a4664] px-3 py-2 rounded-lg shadow-[0_0_8px_#eaa0a2] mt-4 text-xs font-medium flex flex-col items-center gap-1">
  <div className="flex items-center gap-2 flex-wrap justify-center">
    <span className="bg-[#ffdbdc] px-2 py-1 rounded-full">
      ✉️ <strong>Admin:</strong> <code>admin99@gmail.com</code>
    </span>
    <span className="text-[#aaaaaa]">|</span>
    <span className="bg-[#ffdbdc] px-2 py-1 rounded-full">
      🔑 <strong>Pass:</strong> <code>admin99@gmail.com</code>
    </span>
  </div>
  <div className="flex items-center gap-2 flex-wrap justify-center">
    <span className="bg-[#ffdbdc] px-2 py-1 rounded-full">
      ✉️ <strong>User:</strong> <code>mail-user@gmail.com</code>
    </span>
    <span className="text-[#aaaaaa]">|</span>
    <span className="bg-[#ffdbdc] px-2 py-1 rounded-full">
      🔑 <strong>Pass:</strong> <code>user@gmail.com</code>
    </span>
  </div>
</div>

          {/* ** */}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-md bg-white border border-[#dddddd]
              focus:outline-none focus:ring-2 focus:ring-[#eaa0a2] placeholder-[#aaaaaa]
              transition duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-md bg-white border border-[#dddddd]
              focus:outline-none focus:ring-2 focus:ring-[#eaa0a2] placeholder-[#aaaaaa]
              transition duration-200"
          />
          <button
            type="submit"
            className="w-full bg-[#3a4664] text-white py-3 rounded-md
              hover:bg-[#eaa0a2] hover:text-[#3a4664] hover:shadow-[0_0_12px_#eaa0a2]
              transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 border border-[#dddddd] 
            bg-white text-[#3a4664] font-semibold rounded-md py-3
            hover:bg-[#fefcfc] hover:shadow-[0_0_10px_#eaa0a2]
            transition-all duration-300 transform hover:scale-[1.02]"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-6 h-6"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
