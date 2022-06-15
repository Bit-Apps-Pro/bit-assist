import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { flow } = JSON.parse(req.body || '{}')
    if (flow === undefined) res.status(422).json({ success: false })

    const widgetChannel = await db.widget_channels.create({
      data: flow,
    })

    res.status(200).json({ success: true, data: widgetChannel })
  }
}
