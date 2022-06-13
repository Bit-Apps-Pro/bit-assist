import db from '@db'

export default async function handler(req, res) {
  // if (req.method === 'POST') {
  // const { widget_id } = JSON.parse(req.body || '{}')
  // if (!widget_id) res.status(422).json({ success: false })

  const response = await db.widget_responses.create({
    data: {
      widget_id: '629c9215eb6df57bac9ee589',
      response: 'Success',
    },
  })

  res.status(200).json({ success: true, data: response })
  // }
}
