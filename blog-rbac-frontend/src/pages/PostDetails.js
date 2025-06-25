import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(res.data);
      } catch (err) {
        setError('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!post) return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-[#3a4664] text-[#fefcfc] relative overflow-hidden">
     {/* Floating Transparent Flowers */}
<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
  <img
    src="https://www.vhv.rs/dpng/d/283-2834725_clipart-downloads-flower-free-online-violet-cute-violet.png"
    alt="flower"
    className="absolute top-[-10%] left-[10%] w-24 opacity-90 animate-flowerFloat1"
  />
  <img
    src="https://www.vhv.rs/dpng/d/283-2834725_clipart-downloads-flower-free-online-violet-cute-violet.png"
    alt="flower"
    className="absolute top-[-15%] left-[50%] w-28 opacity-85 animate-flowerFloat2"
  />
  <img
    src="https://www.vhv.rs/dpng/d/283-2834725_clipart-downloads-flower-free-online-violet-cute-violet.png"
    alt="flower"
    className="absolute top-[-20%] left-[80%] w-20 opacity-70 animate-flowerFloat3"
  />
  <img
    src="https://www.vhv.rs/dpng/d/283-2834725_clipart-downloads-flower-free-online-violet-cute-violet.png"
    alt="flower"
    className="absolute top-[-10%] left-[10%] w-24 opacity-90 animate-flowerFloat1"
  />
  <img
    src="https://www.vhv.rs/dpng/d/283-2834725_clipart-downloads-flower-free-online-violet-cute-violet.png"
    alt="flower"
    className="absolute top-[-15%] left-[50%] w-28 opacity-85 animate-flowerFloat2"
  />
  <img
    src="https://www.vhv.rs/dpng/d/283-2834725_clipart-downloads-flower-free-online-violet-cute-violet.png"
    alt="flower"
    className="absolute top-[-20%] left-[80%] w-20 opacity-70 animate-flowerFloat3"
  />
</div>


      {/* Content */}
      <div className="relative z-10 w-[90%] mx-auto p-6 pt-20 pb-12">
        <div className="bg-[#fefcfc] text-[#3a4664] p-10 rounded-3xl shadow-[0_0_30px_#eaa0a2] border border-[#eaa0a2] hover:shadow-[0_0_45px_#eaa0a2aa] transition-all duration-500">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide">{post.title}</h1>
          <p className="mb-6 text-[#555] leading-relaxed text-lg">{post.content}</p>
          <div className="text-sm text-[#777] space-y-1">
            <div><strong>Author:</strong> {post.author?.name || 'Unknown'}</div>
            <div><strong>Published:</strong> {new Date(post.timestamp || post.createdAt).toLocaleString()}</div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-[#fefcfc] text-xl font-light italic tracking-wide animate-fade-in-up">
          ─ Post Ends Here ─ <br />
          <span className="text-[#eaa0a2] font-cursive text-2xl">Happy Ending 💫</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
