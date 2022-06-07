import db from '@db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const channels = await db.channels.findMany()
    res.status(200).json({ success: true, data: channels })
  }
}
