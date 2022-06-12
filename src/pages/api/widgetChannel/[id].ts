import db from '@db'
import { serializeObj } from '@utils/utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query
    if (!id) res.status(422).json({ success: false })

    const widgetChannel = await db.widget_channels.findUnique({
      where: { id },
      select: {
        widget_id: true,
        channel_id: true,
        config: true,
      },
    })

    res.status(200).json({ success: true, data: serializeObj(widgetChannel) })
  }
}
