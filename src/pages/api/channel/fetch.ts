import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const channels = await db.channels.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    res.status(200).json({ success: true, data: channels })
  }
}
