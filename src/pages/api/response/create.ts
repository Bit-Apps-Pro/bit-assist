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
    const { widget_channel_id, form_name } = formData
    if (!widget_channel_id || !form_name) res.status(422).json({ success: false })

    delete formData.widget_channel_id
    delete formData.form_name
    const response = await db.widget_responses.create({
      data: {
        widget_channel_id,
        form_name,
        response: formData,
      },
    })

    res.status(200).json({ success: true })
  }
}
