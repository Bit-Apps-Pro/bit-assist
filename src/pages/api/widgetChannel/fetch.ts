import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const widgetChannels = await db.widget_channels.findMany({
      where: { status: true },
      select: {
        id: true,
        config: true,
      },
    })

    res.status(200).json({ success: true, data: widgetChannels })
  }
}
