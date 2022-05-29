import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { widget } = JSON.parse(req.body || '{}')
    if (widget === undefined) res.status(422).json({ success: false })

    const widgetCopy = { ...widget }
    delete widgetCopy['id']

    const updateWidget = await db.chat_widgets.update({
      where: { id: widget.id },
      data: {
        ...widgetCopy,
      },
    })
    console.log({ updateWidget })
    res.status(200).json({ success: true, data: widget.id })
  }
}
