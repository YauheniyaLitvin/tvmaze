import express from "express";

import { get as shows } from "./routes/shows"
import importRouter from "./routes/import"
import { get as api} from "./routes/api"

const router = express.Router()

router.get('/api/show', api )
router.get('/shows', shows)
router.use('/import', importRouter )

export default router;