const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// create post
router.post("/", async (req, res) => {
  try {
    const { content, image, location, category } = req.body;

    const post = await Post.create({
      content,
      image,
      location,
      category,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// simple like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes = post.likes || [];
    post.likes.push("liked");

    await post.save();

    res.json({
      message: "Liked",
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;