import express from "express";
import { createUser, deleteUser, editUser, getAllUser, getUser, loginUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",getAllUser)
router.post("/register",createUser)
router.post("/login",loginUser)

router.route("/me/:email")
.get(verifyToken,getUser)
.patch(verifyToken,editUser)
.delete(verifyToken,deleteUser)

export default router;