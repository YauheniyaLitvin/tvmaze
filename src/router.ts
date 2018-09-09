import express from "express";

import { get as shows } from "./routes/shows"
import importRouter from "./routes/import"

const router = express.Router()


router.get('/shows', shows)
router.use('/import', importRouter )

export default router;