const express = require("express");
const router = express.Router();
const { signUp, signIn, getUser, updateUserPassword, updateUserDetail, getAllUser, offHours } = require("../controller/authController");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("../validator/auth");

const appointmentController = require("../controller/appointmentController");




router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);

router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);

router.route("/user").post(isRequestValidated, getUser);

router.route("/getalluser").get(isRequestValidated, getAllUser);

router.route("/updateuser").post(isRequestValidated, updateUserDetail);

router.route("/offhours").post(isRequestValidated, offHours);

router.route("/updatepassword").post(isRequestValidated, updateUserPassword);

router.route("/appointments").post(appointmentController.all);

router.route("/createAppointments").post(isRequestValidated, appointmentController.create);

module.exports = router;