import db from '@db'
import { str2Color } from '@atomik-color/core'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user_id, widgetInfo } = req.body
    if (!widgetInfo) res.status(422).json({ success: false })

    const widget = await db.widgets.create({
      data: {
        user_id,
        name: widgetInfo?.name,
        styles: {
          size: 60,
          shape: 'semiRounded',
          color: str2Color('#00ffa3'),
          icon: 'widget-icon-1',
          iconUrl:
            'https://ik.imagekit.io/shuvo/widget_icons/eye_j4gQF6dk-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656306394910',
          position: 'bottom-right',
        },
      },
    })

    res.status(200).json({ success: true, data: widget })
  }
}
