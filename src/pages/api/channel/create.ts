import db from '@db'

export default async function handler(req, res) {
  // if (req.method === 'POST') {
    const channel = await db.channels.createMany({
      data: [
        {
          name: 'Facebook',
          icon: 'https://ik.imagekit.io/shuvo/facebook_fL2vFrnEa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654508674585',
          status: true,
        },
        {
          name: 'Twitter',
          icon: 'https://ik.imagekit.io/shuvo/twitter_VO0BFbTXV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654508675557',
          status: true,
        },
        {
          name: 'Telegram',
          icon: 'https://ik.imagekit.io/shuvo/Telegram_apsXHVC3A.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654508675325',
          status: true,
        },
        {
          name: 'Instagram',
          icon: 'https://ik.imagekit.io/shuvo/Instagram_FX-4Xl-1g.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654508674643',
          status: true,
        },
        {
          name: 'Whatsapp',
          icon: 'https://ik.imagekit.io/shuvo/whatsapp_9ofbvIDeY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654508675976',
          status: true,
        },
      ],
    })

    res.status(200).json({ success: true, data: channel })
  // }
}
