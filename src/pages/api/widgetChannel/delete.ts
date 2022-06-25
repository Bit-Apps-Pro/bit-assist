import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetChannelId } = JSON.parse(req.body || '{}')
    if (!widgetChannelId) res.status(422).json({ success: false })

    const deleteWidgetChannel = await db.widget_channels.delete({
      where: { id: widgetChannelId },
    })
    res.status(200).json({ success: true, data: deleteWidgetChannel })
  }
}
