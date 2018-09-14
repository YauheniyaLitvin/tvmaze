import express from 'express'
import { get as shows } from './routes/shows'
import scrapperRouter from './routes/scrapper'


const router = express.Router()

router.get('/shows', shows)
router.use('/scrapper', scrapperRouter)


export default router;