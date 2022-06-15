import db from '@db'
import { str2Color } from '@atomik-color/core'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const { user_id } = JSON.parse(req.body || '{}')
    // if (!user_id) res.status(422).json({ success: false })

    const widget = await db.widgets.create({
      data: {
        user_id: '628626c4aeedcb3965aa667b',
        name: 'Untitled widget 1',
        styles: {
          size: 54,
          shape: 'rounded',
          color: str2Color('#805ad5'),
          icon: 'widget-icon-1',
          position: 'bottom-right',
        }
      },
    })

    res.status(200).json({ success: true, data: widget })
  }
}
