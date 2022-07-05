import db from '@db'
import { serializeObj } from '@utils/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.query
    if (!id) res.status(422).json({ success: false })

    const widgetChannel = await db.widget_channels.findUnique({
      where: { id },
      select: {
        widget_id: true,
        channel_id: true,
        config: true,
        order: true,
      },
    })

    res.status(200).json({ success: true, data: serializeObj(widgetChannel) })
  }
}
