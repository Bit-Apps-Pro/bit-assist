import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'POST') {
  // const { widget_id } = JSON.parse(req.body || '{}')
  // if (!widget_id) res.status(422).json({ success: false })

  const response = await db.widget_responses.createMany({
    data: [
      {
        widget_id: '62a9c703ce454c95ca469fd2',
        response: 'Success',
      },
      {
        widget_id: '62a9c703ce454c95ca469fd2',
        response: 'Error',
      },
    ],
  })

  res.status(200).json({ success: true, data: response })
  // }
}
