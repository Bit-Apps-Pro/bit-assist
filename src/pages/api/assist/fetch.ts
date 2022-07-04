import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@db'
import Cors from 'cors'
import initMiddleware from '@middleware/initMiddleware'

const cors = initMiddleware(
  Cors({
    origin: 'http://cdn.xyz',
    methods: ['GET', 'POST'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method === 'POST') {
    const { domain } = req.body
    if (!domain) res.status(422).json({ success: false })

    const widgets = await db.widgets.findFirst({
      where: {
        domains: {
          has: domain.replace(/^www.?/, ''),
        },
        status: true,
      },
      select: {
        id: true,
        name: true,
        styles: true,
        business_hours: true,
        timezone: true,
        exclude_pages: true,
        initial_delay: true,
        page_scroll: true,
        widget_behavior: true,
        custom_css: true,
        call_to_action: true,
        store_responses: true,
        delete_responses: true,
        status: true,

        widget_channels: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            config: true,
            status: true,

            channels: {
              select: {
                id: true,
                icon: true,
                name: true,
              },
            },
          },
        },
      },
    })

    res.status(200).json({ success: true, data: widgets })
  }
}
