import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { flow, widgetChannelId } = JSON.parse(req.body || '{}')
    if (flow === undefined || widgetChannelId === undefined) res.status(422).json({ success: false })

    const updateWidgetChannel = await db.widget_channels.update({
      where: { id: widgetChannelId },
      data: flow,
    })
    console.log('updateWidgetChannel', updateWidgetChannel)
    res.status(200).json({ success: true, data: 'flow' })
  }
}
