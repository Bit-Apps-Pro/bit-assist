import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'
import cors from '@utils/cors'
import { webhook } from '@utils/request'

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

    const { webhook_url } = config?.card_config || {}
    if (typeof webhook_url !== 'undefined' && webhook_url.trim() !== '') {
      webhook(webhook_url, formData)
    }

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
