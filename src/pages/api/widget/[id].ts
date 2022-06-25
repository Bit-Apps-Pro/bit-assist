import db from '@db'
import { serializeObj } from '@utils/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.query
    const widget = await db.widgets.findUnique({
      where: { id },
    })

    res.status(200).json({ success: true, data: serializeObj(widget) })
  }
}
