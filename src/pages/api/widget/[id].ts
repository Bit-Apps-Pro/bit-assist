import db from '@db'
import { serializeObj } from '@utils/utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query
    const widget = await db.chat_widgets.findUnique({
      where: { id },
    })

    res.status(200).json({ success: true, data: serializeObj(widget) })
  }
}
