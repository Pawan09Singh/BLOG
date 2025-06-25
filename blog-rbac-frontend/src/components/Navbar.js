// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <div className="flex space-x-6 text-gray-700 font-semibold text-lg">
//         <Link to="/" className="hover:text-blue-600 transition duration-300">Posts</Link>
//         {!token ? (
//           <>
//             <Link to="/login" className="hover:text-blue-600 transition duration-300">Login</Link>
//             <Link to="/signup" className="hover:text-blue-600 transition duration-300">Signup</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/admin" className="hover:text-blue-600 transition duration-300">Admin Dashboard</Link>
//             <button
//               onClick={handleLogout}
//               className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [role, setRole] = useState('unlogged');
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role || 'user');
      } catch (err) {
        console.error('Token decode error:', err);
      }
    }
    setMounted(true);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const navLinks = [
    { to: '/', label: 'Posts' },
    !token && { to: '/login', label: 'Login' },
    !token && { to: '/signup', label: 'Signup' },
    token && role === 'admin' && { to: '/admin', label: 'Admin Dashboard' },
    token && role === 'user' && { to: '/user', label: 'User Dashboard' },
  ].filter(Boolean);

  return (
    <nav className="w-full px-6 py-4 bg-transparent">
      <div
        className={`w-[40%] ml-auto bg-[#3a4664] text-white 
          rounded-lg rounded-tr-none shadow-[0_4px_20px_rgba(58,70,100,0.7)] 
          px-6 py-4 flex justify-between items-center gap-4
          transition-all duration-700 ease-out transform
          ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
        `}
      >
        <div className="flex gap-5 items-center text-lg font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`
                relative after:absolute after:left-0 after:bottom-0 after:h-[2px]
                after:bg-[#eaa0a2] after:w-0 hover:after:w-full after:transition-all after:duration-300
                hover:text-[#eaa0a2] transition-all duration-300
                ${location.pathname === to ? 'text-[#eaa0a2]' : ''}
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {token && (
            <button
              onClick={handleLogout}
              className="bg-[#eaa0a2] text-[#3a4664] px-4 py-2 rounded-full
                hover:bg-[#ffdbdc] transition-all duration-300 text-sm font-semibold"
            >
              Logout
            </button>
          )}
          
          {/* Role Badge */}
          <span
            className="px-3 py-1 text-sm rounded-full font-semibold uppercase
              bg-[#eaa0a2] text-[#3a4664] tracking-wide"
          >
            &nbsp;&nbsp; ROLE: {role} &nbsp;&nbsp;
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
