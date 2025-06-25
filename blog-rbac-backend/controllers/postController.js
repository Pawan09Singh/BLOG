const BlogPost = require('../models/BlogPost');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = new BlogPost({
      title,
      content,
      author: req.user.id,  // 👈 assumes you're using auth middleware
      likes: []             // 👈 optional, initialize empty likes array
    });

    await post.save();

    // Optional: populate author for immediate response
    await post.populate('author', 'name'); // 👈 just returns author's name

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await BlogPost.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fixed the 'Post' reference to 'BlogPost' in the deletePost method
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;  // from JWT middleware

    console.log('Deleting post with ID:', postId);
    console.log('User ID:', userId);

    // Use BlogPost instead of Post here
    const post = await BlogPost.findById(postId);
    if (!post) {
      console.error(`Post with ID ${postId} not found`);
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('Post found:', post);

    // Check ownership or admin role
    if (post.author.toString() !== userId && req.user.role !== 'admin') {
      console.error(`User ${userId} is not authorized to delete this post.`);
      return res.status(403).json({ message: "You don't own that post" });
    }

    console.log('Deleting the post...');
    const result = await BlogPost.findByIdAndDelete(postId);
    console.log('Delete result:', result);

    if (!result) {
      console.error(`Failed to delete post with ID ${postId}`);
      return res.status(500).json({ message: 'Failed to delete post' });
    }

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error during deletion:', error);  // Log the exact error
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleLike = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user.id;
    const liked = post.likes.includes(userId);

    if (liked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: liked ? 'Unliked' : 'Liked', likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
