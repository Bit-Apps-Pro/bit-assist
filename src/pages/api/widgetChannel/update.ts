import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { widgetChannel } = JSON.parse(req.body || '{}')
    if (widgetChannel === undefined) res.status(422).json({ success: false })

    const widgetChannelCopy = { ...widgetChannel }
    delete widgetChannelCopy['id']

    const updateWidgetChannel = await db.widget_channels.update({
      where: { id: widgetChannel.id },
      data: {
        ...widgetChannelCopy,
      },
    })
    console.log(updateWidgetChannel)
    res.status(200).json({ success: true, data: widgetChannel.id })
  }
}
