import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { widget } = JSON.parse(req.body || '{}')
    if (!widget) res.status(422).json({ success: false })

    console.log({ widget })

    const updatedWidget = await db.chat_widgets.update({
      where: { id: widget.id },
      data: {
        ...widget,
      },
    })
    console.log({ updatedWidget })
    res.status(200).json({ success: true, data: 'widgetIndex' })
  }
}
