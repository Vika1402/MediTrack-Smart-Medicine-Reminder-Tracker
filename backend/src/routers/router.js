import express from "express";
import { userRouter } from "./userRouter.js";
import { doctorRouter } from "./doctorRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/doctor", doctorRouter);

export { router };
