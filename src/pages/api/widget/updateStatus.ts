import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { widgetId, status } = JSON.parse(req.body || '{}')
    if (!widgetId || status === undefined) res.status(422).json({ success: false })

    const updateWidget = await db.widgets.update({
      where: { id: widgetId },
      data: {
        status: status,
      },
    })
    res.status(200).json({ success: true, data: widgetId })
    res.status(200).json({ success: true, data: widgetId })
  }
}
