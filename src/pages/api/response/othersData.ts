import db from '@db'
import { serializeObj } from '@utils/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { widgetId } = JSON.parse(req.body || '{}')
    if (!widgetId) res.status(422).json({ success: false })

    const widget = await db.widgets.findUnique({
      where: { id: widgetId },
      select: {
        name: true,
      },
    })

    const widgetResponsesCount = await db.widget_responses.aggregateRaw({
      pipeline: [
        {
          $match: {
            widget_id: {
              $oid: widgetId,
            },
          },
        },
        {
          $count: 'totalResponses',
        },
      ],
    })

    const newObj = { widget, totalResponses: widgetResponsesCount?.[0]?.totalResponses }

    res.status(200).json({ success: true, data: serializeObj(newObj) })
  }
}
