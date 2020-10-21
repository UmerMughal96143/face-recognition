const express = require('express');
const router = express.Router();
const { registerUser, signinUser, postImage } = require("../controller/User");



//Specific route Extending

router.route("/register").post(registerUser);
router.route("/signin").post(signinUser);
router.route("/image").put(postImage);



module.exports = router ;