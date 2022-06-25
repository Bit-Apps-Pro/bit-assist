import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // const { user_id } = JSON.parse(req.body || '{}')
    // if (!user_id) res.status(422).json({ success: false })

    const { widgets } = await db.users.findUnique({
      where: { id: '628626c4aeedcb3965aa667b' },
      select: {
        widgets: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    })

    res.status(200).json({ success: true, data: widgets })
  }
}
