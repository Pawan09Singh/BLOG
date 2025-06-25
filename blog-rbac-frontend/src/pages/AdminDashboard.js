// // src/pages/AdminDashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [posts, setPosts] = useState([]);
//   const [form, setForm] = useState({ title: '', content: '' });
//   const [editingId, setEditingId] = useState(null);
//   const token = localStorage.getItem('token');

//   const fetchPosts = async () => {
//     const res = await axios.get('http://localhost:5000/api/posts', {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setPosts(res.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = editingId
//       ? `http://localhost:5000/api/posts/${editingId}`
//       : `http://localhost:5000/api/posts`;

//     const method = editingId ? 'put' : 'post';

//     await axios[method](endpoint, form, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setForm({ title: '', content: '' });
//     setEditingId(null);
//     fetchPosts();
//   };

//   const handleEdit = (post) => {
//     setForm({ title: post.title, content: post.content });
//     setEditingId(post._id);
//   };

// //   const handleDelete = async (id) => {
// //     await axios.delete(`http://localhost:5000/api/posts/${id}`, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
    
// //     fetchPosts();
// //   };
//   const handleDelete = async (postId) => {
//   try {
//     const token = localStorage.getItem('token');
//     await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     // refresh or remove post from UI after successful delete
//     alert('Post deleted successfully.');

//   } catch (error) {
//     if (error.response && error.response.status === 403) {
//       alert(error.response.data.message); // <- Show custom backend message here
//     } else {
//       alert('Failed to delete post.');
//     }
//   }
// };


//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />
//         <textarea
//           placeholder="Content"
//           value={form.content}
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//         />
//         <button type="submit">{editingId ? 'Update' : 'Create'} Post</button>
//       </form>

//       <h3>Existing Posts</h3>
//       {posts.map(post => (
//         <div key={post._id}>
//           <h4>{post.title}</h4>
//           <button onClick={() => handleEdit(post)}>Edit</button>
//           <button onClick={() => handleDelete(post._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch {
      alert('Failed to fetch posts');
    }
  };
  useEffect(() => {
    fetchPosts(); // ✅ this must be inside the component before return
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = editingId
      ? `http://localhost:5000/api/posts/${editingId}`
      : `http://localhost:5000/api/posts`;

    const method = editingId ? 'put' : 'post';

    try {
      await axios[method](endpoint, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', content: '' });
      setEditingId(null);
      fetchPosts();
    } catch {
      alert('You are not admin, you cannot post. You can only like posts.');
    }
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content });
    setEditingId(post._id);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Post deleted successfully.');
      fetchPosts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete post.');
    }
  };

  return (
    <div className="min-h-screen bg-[#3a4664] p-8">
      <h2 className="text-4xl text-center font-bold text-[#fefcfc] mb-10">
        Admin Dashboard
      </h2>

      {/* Form Section */}
      <div className="bg-[#fefcfc] rounded-xl p-6 mb-12 shadow-[0_0_15px_#eaa0a2]">
        <h3 className="text-2xl font-semibold text-[#3a4664] mb-6">
          {editingId ? 'Edit Post' : 'Create New Post'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-9">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-[#eaa0a2] transition"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 resize-none h-28 focus:ring-2 focus:ring-[#eaa0a2] transition"
          />
          <button
            type="submit"
            className="bg-[#3a4664] text-white px-6 py-3 rounded-md hover:bg-[#eaa0a2] hover:text-[#3a4664] hover:shadow-[0_0_10px_#eaa0a2] transition-all duration-300"
          >
            {editingId ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <h3 className="text-2xl font-bold text-[#fefcfc] mb-6">Existing Posts</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.length === 0 ? (
          <p className="text-[#aaaaaa] col-span-full text-center">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-[#fefcfc] text-[#3a4664] rounded-xl p-6 shadow-md hover:shadow-[0_0_20px_#eaa0a2] transition-transform duration-300 hover:-translate-y-1"
            >
              <h4 className="text-xl font-bold mb-2">{post.title}</h4>
              <p className="text-sm mb-4 text-[#555]">{post.content}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
