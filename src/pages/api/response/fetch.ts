import db from '@db'
import { serializeObj } from '@utils/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const limit = parseInt(req.query.limit.toString())
    const page = parseInt(req.query.page.toString())

    const { widgetChannelId } = req.body
    if (!widgetChannelId) res.status(422).json({ success: false })

    const widgetResponses = await db.widget_responses.aggregateRaw({
      pipeline: [
        {
          $match: {
            widget_channel_id: {
              $oid: widgetChannelId,
            },
          },
        },
        {
          $project: {
            id: { $toString: '$_id' },
            createdAt: { $toString: '$createdAt' },
            response: true,
          },
        },
        { $skip: (page || 1) * limit - limit },
        { $limit: limit },
      ],
    })

    res.status(200).json({ success: true, data: serializeObj(widgetResponses) })
  }
}
