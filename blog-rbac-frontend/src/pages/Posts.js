// // src/pages/Posts.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const token = localStorage.getItem('token');

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/posts', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setPosts(res.data);
//     } catch (err) {
//       alert('Failed to load posts');
//     }
//   };

//   const toggleLike = async (id) => {
//     try {
//       await axios.post(`http://localhost:5000/api/posts/${id}/like`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchPosts(); // refresh
//     } catch (err) {
//       alert('Error liking post');
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h2>Global Post of All user</h2>
//       {posts.map(post => (
//         <div key={post._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           <small>By: {post.author?.name || 'Unknown'} | Likes: {post.likes.length}</small><br />
//           <button onClick={() => toggleLike(post._id)}>Like / Unlike</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Posts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      setError("YOU ARE NOT LOGGED IN. LOGIN TO SEE POSTS");
    }
  };

  const toggleLike = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/posts/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPosts(); // refresh
    } catch {
      alert("Error liking post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#3a4664] px-6 py-10">
      <h2 className="text-center text-4xl font-bold text-[#fefcfc] mb-10 tracking-wide select-none">
        Global Posts of All Users
      </h2>

      {error && (
        <div className="bg-[#3a4664] border border-[#eaa0a2] text-[#fefcfc] p-4 rounded-lg mb-8 text-center shadow-[0_0_15px_#eaa0a2]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="text-center text-[#aaaaaa] col-span-full">...</p> // loading
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-[#fefcfc] text-[#3a4664] rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_#eaa0a2] border border-transparent"
            >
              <Link to={`/post/${post._id}`} className="block">
                <h3 className="text-2xl font-semibold mb-3 hover:underline transition duration-200">
                  {post.title}
                </h3>
                <p className="text-sm text-[#555] mb-4">
                  {post.content.length > 150
                    ? post.content.slice(0, 150) + "..."
                    : post.content}
                </p>

                <div className="flex justify-between text-sm text-[#777] mb-4">
                  <span>
                    By:{" "}
                    <span className="text-[#3a4664] font-medium">
                      {post.author?.name || "Unknown"}
                    </span>
                  </span>
                  <span>
                    Likes:{" "}
                    <span className="text-[#eaa0a2] font-semibold">
                      {post.likes.length}
                    </span>
                  </span>
                  <span>
                    Published:{" "}
                    <span className="text-[#aaaaaa]">
                      {new Date(
                        post.timestamp || post.createdAt
                      ).toLocaleString()}
                    </span>
                  </span>
                </div>
              </Link>

              <button
                onClick={() => toggleLike(post._id)}
                className="mt-2 bg-[#3a4664] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#eaa0a2] hover:text-[#3a4664] hover:shadow-[0_0_12px_#eaa0a2] transition-all duration-300 transform hover:scale-105"
              >
                Like / Unlike
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
