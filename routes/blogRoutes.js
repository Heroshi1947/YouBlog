const express = require("express");
const {
  getAllUsers,
  registerControler,
  loginControler,
} = require("../controlers/userControler");
const {
  getAllBlogsControler,
  getBlogControler,
  createBlogControler,
  updateBlogControler,
  deleteBlogControler,
  userBlogControler,
} = require("../controlers/blogControler");

// router object
const router = express.Router();

// get all blogs || GET method
router.get("/all-blogs", getAllBlogsControler);

// get single blog || GET method
router.get("/get-blog/:id", getBlogControler);

// get single blog of user || GET method
router.get("/user-blog/:id", userBlogControler);

// create new blog || POST method
router.post("/create-blog", createBlogControler);

// update a blog || PUT method
router.put("/update-blog/:id", updateBlogControler);

// delete a blog || DELETE method
router.delete("/delete-blog/:id", deleteBlogControler);

module.exports = router;
