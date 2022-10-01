import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widget } = req.body
    if (widget === undefined) res.status(422).json({ success: false })

    const widgetCopy = { ...widget }
    delete widgetCopy['id']

    await db.widgets.update({
      where: { id: widget.id },
      data: {
        ...widgetCopy,
      },
    })
    res.status(200).json({ success: true, data: widget.id })
  }
}
