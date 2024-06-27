import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blogs");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      {blogs &&
        blogs.map((blog, index) =>
          blog && blog.user ? (
            <BlogCard
              key={index}
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog?.createdAt}
            />
          ) : (
            <div key={index}>Invalid blog data</div>
          )
        )}
    </>
  );
};

export default Blogs;
