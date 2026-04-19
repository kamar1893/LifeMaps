const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// add comment
router.post("/", async (req, res) => {
  try {
    const { post, user, text } = req.body;

    const comment = await Comment.create({
      post,
      user,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get comments for one post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;