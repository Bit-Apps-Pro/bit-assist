import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetIds } = JSON.parse(req.body || '{}')
    if (!widgetIds) res.status(422).json({ success: false })

    const deleteResponses = await db.widget_responses.deleteMany({
      where: {
        id: {
          in: widgetIds,
        },
      },
    })
    res.status(200).json({ success: true, data: deleteResponses })
  }
}
