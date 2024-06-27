const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// get all blogs -----------------------------------------

exports.getAllBlogsControler = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(404).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      blogCount: blogs.length,
      success: true,
      message: "list of  all blogs ",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to fetch all blogs",
      error,
    });
  }
};

// get a blog by id ---------------------------------------------

exports.getBlogControler = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Unable to find blog with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "blog was fetched by id successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while finding the blog",
      error,
    });
  }
};

// create a new blog --------------------------------------------

exports.createBlogControler = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    // validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }
    // check if blog exists already
    const existingBlog = await blogModel.findOne({ description });
    if (existingBlog) {
      return res.status(401).send({
        success: false,
        message: "Similar blog already exists",
      });
    }
    // save new blog
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "new blog created ",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to create blog",
      error,
    });
  }
};

// update a blog by id

exports.updateBlogControler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog was updated successfully!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to update blog",
      error,
    });
  }
};

// delete a blog by id
exports.deleteBlogControler = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Unable to find blog with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog was deleted successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting the blog",
      error,
    });
  }
};

// get a blog by user
exports.userBlogControler = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with with this id",
      });
    }
    return res.status(200).send({
      blogCount: userBlog.length,
      success: true,
      message: "user blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting user blog",
      error,
    });
  }
};
