import { Router } from "express";
import authRouter from "./auth.mjs";
import noteRouter from "./notes.mjs";

const router = Router();

router.use(authRouter);
router.use(noteRouter);


export default router;