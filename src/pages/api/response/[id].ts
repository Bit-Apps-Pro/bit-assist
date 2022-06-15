import db from '@db'
import { serializeObj } from '@utils/utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query
    const widget = await db.widgets.findUnique({
      where: { id },
      select: {
        name: true,
        widget_responses: {
          select: {
            id: true,
            response: true,
            createdAt: true
          },
        },
      },
    })
    res.status(200).json({ success: true, data: serializeObj(widget) })
  }
}
