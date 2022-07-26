import db from '@db'
import { serializeObj } from '@utils/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetChannelId } = JSON.parse(req.body || '{}')
    if (!widgetChannelId) res.status(422).json({ success: false })

    const { config } = await db.widget_channels.findUnique({
      where: { id: widgetChannelId },
      select: {
        config: true,
      },
    })

    const widgetResponsesCount = await db.widget_responses.aggregateRaw({
      pipeline: [
        {
          $match: {
            widget_channel_id: {
              $oid: widgetChannelId,
            },
          },
        },
        {
          $count: 'totalResponses',
        },
      ],
    })

    const newObj = {
      channelName: config?.title,
      formFields: config?.card_config?.form_fields,
      totalResponses: widgetResponsesCount?.[0]?.totalResponses,
    }
    res.status(200).json({ success: true, data: serializeObj(newObj) })
  }
}
