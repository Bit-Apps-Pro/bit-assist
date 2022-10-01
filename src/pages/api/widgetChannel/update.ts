import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { flow, widgetChannelId } = req.body
    if (flow === undefined || widgetChannelId === undefined) res.status(422).json({ success: false })

    await db.widget_channels.update({
      where: { id: widgetChannelId },
      data: flow,
    })
    res.status(200).json({ success: true, data: widgetChannelId })
  }
}
