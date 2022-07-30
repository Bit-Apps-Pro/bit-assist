import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import initMiddleware from '@middleware/initMiddleware'

const cors = initMiddleware(
  Cors({
    origin: 'http://cdn.xyz',
    methods: ['POST'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method === 'POST') {
    const { formData } = req.body
    const { widget_channel_id } = formData
    if (!widget_channel_id) res.status(422).json({ success: false })
    delete formData.widget_channel_id

    const { config } = await db.widget_channels.findUnique({
      where: { id: widget_channel_id },
      select: {
        config: true,
      },
    })

    if (config?.store_responses) {
      await db.widget_responses.create({
        data: {
          widget_channel_id,
          response: formData,
        },
      })
    }

    res.status(200).json({ success: true })
  }
}
