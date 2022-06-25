import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetId } = JSON.parse(req.body || '{}')
    if (!widgetId) res.status(422).json({ success: false })

    const deleteWidget = await db.widgets.delete({
      where: { id: widgetId },
    })
    res.status(200).json({ success: true, data: deleteWidget })
  }
}
