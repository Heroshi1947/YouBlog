const express = require("express");
const {
  getAllUsers,
  registerControler,
  loginControler,
} = require("../controlers/userControler");

// router object
const router = express.Router();

// get all users || GET method
router.get("/all-users", getAllUsers);

// create user || POST method
router.post("/register", registerControler);

// user login || POST method
router.post("/login", loginControler);

module.exports = router;
