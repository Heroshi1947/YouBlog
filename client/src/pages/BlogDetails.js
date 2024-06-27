import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated Successfully ! ");
        navigate("/my-blogs");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <Box
          width={"51%"}
          border={3}
          borderRadius={10}
          padding={8}
          margin="auto"
          marginTop="30px"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
            marginTop="-40px"
          >
            Edit the Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 0, fontSize: "21px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            style={{
              width: "90%",
              height: "55px",
              margin: "auto",
            }}
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "23px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            style={{
              width: "90%",
              height: "55px",
              margin: "auto",
            }}
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "23px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            style={{
              width: "90%",
              height: "55px",
              margin: "auto",
            }}
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            style={{
              width: "50%",
              height: "55px",
              margin: "auto",
              marginTop: "35px",
            }}
            type="submit"
            color="warning"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};
export default BlogDetails;
