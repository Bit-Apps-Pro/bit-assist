import db from '@db'

// import db from '@db/db'
export default async function handler(req, res) {

  if (req.method === 'POST') {
    // const { userId } = JSON.parse(req.body || '{}')
    // if (!userId) res.status(422).json({ success: false })

    const widget = await db.chat_widgets.create({
      data: {
        userId: '628626c4aeedcb3965aa667b',
        name: 'Untitled widget 1',
      }
    })

    res.status(200).json({ success: true, data: widget })
  }
}