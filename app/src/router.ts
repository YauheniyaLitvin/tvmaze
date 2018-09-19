import express from 'express'
import { get as shows } from './routes/shows'

const router = express.Router()
router.get('/shows', shows)

export default router