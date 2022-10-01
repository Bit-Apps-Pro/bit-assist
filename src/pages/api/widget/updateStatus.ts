import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetId, status } = req.body
    if (!widgetId || status === undefined) res.status(422).json({ success: false })

    await db.widgets.update({
      where: { id: widgetId },
      data: {
        status: status,
      },
    })
    res.status(200).json({ success: true, data: widgetId })
  }
}
