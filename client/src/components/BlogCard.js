import * as React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import toast from "react-hot-toast";
export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Card
      sx={{
        width: "41%",
        height: "auto",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton>
            <DeleteForeverIcon color="warning" onClick={handleDelete} />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="270" image={image} alt="image" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          title : {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
