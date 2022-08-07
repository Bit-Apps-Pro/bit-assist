import Cors from 'cors'
import initMiddleware from '@middleware/initMiddleware'

const cors = initMiddleware(
  Cors({
    origin: process.env.NEXT_PUBLIC_CLIENT_CDN_URL.split(','),
    methods: ['GET', 'POST'],
  })
)

export default cors