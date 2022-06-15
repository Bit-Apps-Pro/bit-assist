import db from '@db'

export default async function handler(req, res) {
  // if (req.method === 'POST') {

  const deleteChannels = await db.channels.deleteMany({})

  const channels = await db.channels.createMany({
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
      {
        name: 'Skype',
        icon: 'https://ik.imagekit.io/shuvo/skype_YnnKDD73B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928725596',
        status: true,
      },
      {
        name: 'Discord',
        icon: 'https://ik.imagekit.io/shuvo/discord__g70IminO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928725319',
        status: true,
      },
      {
        name: 'Line',
        icon: 'https://ik.imagekit.io/shuvo/line_Z-0zyyQkVN.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1654928724922',
        status: true,
      },
      {
        name: 'Snapchat',
        icon: 'https://ik.imagekit.io/shuvo/snapchat_BInRfjFao.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928724448',
        status: true,
      },
      {
        name: 'Viber',
        icon: 'https://ik.imagekit.io/shuvo/viber_9WFSysBuA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928724170',
        status: true,
      },
      {
        name: 'WeChat',
        icon: 'https://ik.imagekit.io/shuvo/wechat_rpUCl6ZdG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928723878',
        status: true,
      },
      {
        name: 'SMS',
        icon: 'https://ik.imagekit.io/shuvo/sms_Oyd0vdigE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928723379',
        status: true,
      },
      {
        name: 'Linkedin',
        icon: 'https://ik.imagekit.io/shuvo/LinkedIn_-1I0sm30s.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928723184',
        status: true,
      },
      {
        name: 'TikTok',
        icon: 'https://ik.imagekit.io/shuvo/tiktok_EM01aUhyr.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928721403',
        status: true,
      },
      {
        name: 'GoogleMap',
        icon: 'https://ik.imagekit.io/shuvo/googlemap_NnjcAYgW5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928722537',
        status: true,
      },
      {
        name: 'Slack',
        icon: 'https://ik.imagekit.io/shuvo/slack_fiTZrvnB9H.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928722561',
        status: true,
      },
      {
        name: 'Youtube',
        icon: 'https://ik.imagekit.io/shuvo/youtube_zmWNRN7_4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928721742',
        status: true,
      },
      {
        name: 'Call',
        icon: 'https://ik.imagekit.io/shuvo/call_r38ibWK_e.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654928721513',
        status: true,
      },
    ],
  })

  res.status(200).json({ success: true, data: channels })
  // }
}
