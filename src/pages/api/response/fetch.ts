import db from '@db'
import { serializeObj } from '@utils/utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { limit, page } = req.query

    const { widgetId } = JSON.parse(req.body || '{}')
    if (!widgetId) res.status(422).json({ success: false })

    const widgetResponses = await db.widget_responses.aggregateRaw({
      pipeline: [
        {
          $match: {
            widget_id: {
              $oid: widgetId,
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
        { $skip: parseInt(page ?? 1 * limit - limit) },
        { $limit: parseInt(limit) },
      ],
    })

    res.status(200).json({ success: true, data: serializeObj(widgetResponses) })
  }
}
