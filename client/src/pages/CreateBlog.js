import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

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
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"54%"}
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
            Create A Post
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
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};
export default CreateBlog;
