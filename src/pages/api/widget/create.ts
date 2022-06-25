import db from '@db'
import { str2Color } from '@atomik-color/core'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, widgetInfo } = JSON.parse(req.body || '{}')
    if (!widgetInfo) res.status(422).json({ success: false })

    const widget = await db.widgets.create({
      data: {
        user_id: '628626c4aeedcb3965aa667b',
        name: widgetInfo?.name,
        styles: {
          size: 60,
          shape: 'semiRounded',
          color: str2Color('#00ffa3'),
          icon: 'widget-icon-1',
          position: 'bottom-right',
        },
      },
    })

    res.status(200).json({ success: true, data: widget })
  }
}
