import db from '@db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method === 'POST') {

  const deleteChannels = await db.channels.deleteMany({})

  const channels = await db.channels.createMany({
    data: [
      {
        name: 'Knowledge-Base',
        icon: 'https://ik.imagekit.io/shuvo/knowledge_BSDRwrcWm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659175963039',
        status: true,
      },
      {
        name: 'FAQ',
        icon: 'https://ik.imagekit.io/shuvo/faq2_ySsQ5jXdE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658749492982',
        status: true,
      },
      {
        name: 'Custom-Form',
        icon: 'https://ik.imagekit.io/shuvo/google-forms_15ZYafggb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657019669212',
        status: true,
      },
      {
        name: 'Messenger',
        icon: 'https://ik.imagekit.io/shuvo/messenger-01_-PT9LygZ4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655785530211',
        status: true,
      },
      {
        name: 'Twitter',
        icon: 'https://ik.imagekit.io/shuvo/twit-01_16QZC0FLY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702008201',
        status: true,
      },
      {
        name: 'Telegram',
        icon: 'https://ik.imagekit.io/shuvo/tel-01_qcAXvYA_X.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702007764',
        status: true,
      },
      {
        name: 'Instagram',
        icon: 'https://ik.imagekit.io/shuvo/insta-01_ioMDLMvY_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702005341',
        status: true,
      },
      {
        name: 'Whatsapp',
        icon: 'https://ik.imagekit.io/shuvo/wapp-01_fQL4cDqCK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702009439',
        status: true,
      },
      {
        name: 'Skype',
        icon: 'https://ik.imagekit.io/shuvo/skype-01_vB2TQ4YqV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702006604',
        status: true,
      },
      {
        name: 'Discord',
        icon: 'https://ik.imagekit.io/shuvo/discord-01_MIfdMcuoZD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702004165',
        status: true,
      },
      {
        name: 'Line',
        icon: 'https://ik.imagekit.io/shuvo/line-01_ofNtyZ_GH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702005625',
        status: true,
      },
      {
        name: 'Snapchat',
        icon: 'https://ik.imagekit.io/shuvo/schat-01_8-4w8SFW1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702006361',
        status: true,
      },
      {
        name: 'Viber',
        icon: 'https://ik.imagekit.io/shuvo/viber-01_qTOoeDNhtj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702009019',
        status: true,
      },
      {
        name: 'WeChat',
        icon: 'https://ik.imagekit.io/shuvo/wechat-01_mIgZwch48.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702009753',
        status: true,
      },
      {
        name: 'SMS',
        icon: 'https://ik.imagekit.io/shuvo/sms-01_2yVV_Ym_f.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702007445',
        status: true,
      },
      {
        name: 'Linkedin',
        icon: 'https://ik.imagekit.io/shuvo/in-01_AgaFB_8al.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702004813',
        status: true,
      },
      {
        name: 'TikTok',
        icon: 'https://ik.imagekit.io/shuvo/tiktok-01_TiQggr1sv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702007926',
        status: true,
      },
      {
        name: 'Google-Map',
        icon: 'https://ik.imagekit.io/shuvo/map-01_bgY_9zdcA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702006197',
        status: true,
      },
      {
        name: 'Slack',
        icon: 'https://ik.imagekit.io/shuvo/slack-01_0W5QuxZJL3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702007040',
        status: true,
      },
      {
        name: 'Youtube',
        icon: 'https://ik.imagekit.io/shuvo/utube-01_SkaL5If1P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702008532',
        status: true,
      },
      {
        name: 'Call',
        icon: 'https://ik.imagekit.io/shuvo/call-01_M1sBOx1ii.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655702003787',
        status: true,
      },
    ],
  })

  res.status(200).json({ success: true, data: channels })
  // }
}
