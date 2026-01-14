const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const { title, body, author } = req.body;
  if (!title || !body) {
    return res.status(400).json({ message: "Title and body required" });
  }

  const blog = new Blog({ title, body, author });
  await blog.save();
  res.json(blog);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
