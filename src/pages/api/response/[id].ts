import db from '@db'
import { serializeObj } from '@utils/utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, _limit, _page } = req.query

    // const widget = await db.widgets.findUnique({
    //   where: { id },
    //   select: {
    //     name: true,
    //     widget_responses: {
    //       skip: parseInt(_page ?? 1 * _limit - _limit),
    //       limit: parseInt(_limit),
    //       select: {
    //         id: true,
    //         response: true,
    //         createdAt: true,
    //       },
    //     },
    //   },
    // })

    const widget = await db.widgets.findUnique({
      where: { id },
      select: {
        name: true,
      },
    })

    const widgetResponsesCount = await db.widget_responses.aggregateRaw({
      pipeline: [
        {
          $match: {
            widget_id: {
              $oid: id,
            },
          },
        },
        {
          $count: 'totalResponses',
        },
      ],
    })

    const widgetResponses = await db.widget_responses.aggregateRaw({
      pipeline: [
        {
          $match: {
            widget_id: {
              $oid: id,
            },
          },
        },
        { $skip: parseInt(_page ?? 1 * _limit - _limit) },
        { $limit: parseInt(_limit) },
      ],
    })

    const newObj = { data: [...widgetResponses], widget, totalResponses: widgetResponsesCount[0].totalResponses}

    res.status(200).json({ success: true, data: serializeObj(newObj) })
  }
}
