import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { widgetId } = JSON.parse(req.body || '{}')
    if (!widgetId) res.status(422).json({ success: false })

    console.log({ widgetId })

    const deleteWidget = await db.chat_widgets.delete({
      where: { id: widgetId },
    })
    console.log({ deleteWidget })
    res.status(200).json({ success: true, data: 'widgetIndex' })
  }
}
