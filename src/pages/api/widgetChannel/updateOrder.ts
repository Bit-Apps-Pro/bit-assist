import db from '@db'
import { WidgetChannelType } from '@globalStates/Interfaces'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetChannels } = JSON.parse(req.body || '{}')
    if (!widgetChannels) res.status(422).json({ success: false })

    await Promise.all(
      widgetChannels.map(async (widgetChannel: WidgetChannelType, i: number) => {
        await db.widget_channels.update({
          where: { id: widgetChannel.id },
          data: { order: widgetChannel.order },
        })
      })
    )
    res.status(200).json({ success: true, data: 'Widget Channel Order Updated' })
  }
}
