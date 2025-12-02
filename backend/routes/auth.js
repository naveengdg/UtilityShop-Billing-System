import express from "express";
import {registerUser  , loginUser} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router(); //create mini express router app

router.post("/register",
    [
       body("name").notEmpty().withMessage("Name is required"),
       body("email").isEmail().withMessage("Valid email is required"),
       body("password").notEmpty().withMessage("Password is Required")
    ],
    registerUser
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required")
    ],
    loginUser
);

export default router;

