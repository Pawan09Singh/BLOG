// const express = require('express');
// const router = express.Router();

// const {
//   getAllPosts,
//   createPost,
//   updatePost,
//   deletePost,
//   toggleLike
// } = require('../controllers/postController');

// const authenticate = require('../middleware/auth');
// const authorizeRoles = require('../middleware/role');

// // Public for all authenticated users
// router.get('/', authenticate, getAllPosts);

// // Admin-only routes
// router.post('/', authenticate, authorizeRoles('admin'), createPost);
// router.put('/:id', authenticate, authorizeRoles('admin'), updatePost);
// router.delete('/:id', authenticate, authorizeRoles('admin'), deletePost);

// // Like/unlike (user or admin)
// router.post('/:id/like', authenticate, toggleLike);

// module.exports = router;


// router.get('/posts/:id', async (req, res) => {
//   try {
//     const post = await BlogPost.findById(req.params.id).populate('author', 'name');
//     if (!post) return res.status(404).json({ message: 'Post not found' });
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching post' });
//   }
// });


const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  toggleLike
} = require('../controllers/postController');

const authenticate = require('../middleware/auth');
const authorizeRoles = require('../middleware/role');

// Get all posts (authenticated users)
router.get('/', authenticate, getAllPosts);

// ✅ Get a single post by ID (public or authenticated as needed)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post' });
  }
});

// Admin-only routes
router.post('/', authenticate, authorizeRoles('admin'), createPost);
router.put('/:id', authenticate, authorizeRoles('admin'), updatePost);
router.delete('/:id', authenticate, authorizeRoles('admin'), deletePost);

// Like/unlike
router.post('/:id/like', authenticate, toggleLike);

module.exports = router;
