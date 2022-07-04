import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetId } = JSON.parse(req.body || '{}')
    if (!widgetId) res.status(422).json({ success: false })

    const widgetChannels = await db.widget_channels.findMany({
      where: { widget_id: widgetId, status: true },
      select: {
        id: true,
        widget_id: true,
        channel_id: true,
        config: true,
        order: true,
      },
      orderBy: {
        order: 'asc',
      },
    })

    res.status(200).json({ success: true, data: widgetChannels })
  }
}
