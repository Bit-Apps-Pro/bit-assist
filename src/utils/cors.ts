import Cors from 'cors'
import initMiddleware from '@middleware/initMiddleware'

const cors = initMiddleware(
  Cors({
    origin: ['http://127.0.0.1:5000', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
  })
)

export default cors