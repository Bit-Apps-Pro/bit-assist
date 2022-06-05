import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { widgetId } = JSON.parse(req.body || '{}')
    if (!widgetId) res.status(422).json({ success: false })

    const deleteWidget = await db.widgets.delete({
      where: { id: widgetId },
    })
    res.status(200).json({ success: true, data: 'widgetIndex' })
  }
}
