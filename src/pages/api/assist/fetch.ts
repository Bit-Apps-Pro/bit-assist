import db from '@db'

export default async function handler(req, res) {
  // if (req.method === 'POST') {
  // const { domain } = JSON.parse(req.body || '{}')
  // if (!domain) res.status(422).json({ success: false })

  const widgets = await db.widgets.findMany({
    where: {
      domains: {
        has: 'shuvo.com',
      },
    },
    select: {
      id: true,
      name: true,
      domains: true,
      styles: true,
      business_hours: true,
      timezone: true,
      exclude_pages: true,
      initial_delay: true,
      page_scroll: true,
      widget_behavior: true,
      custom_css: true,
      call_to_action: true,
      store_responses: true,
      delete_responses: true,
      status: true,

      widget_channels: {
        select: {
          id: true,
          config: true,
          status: true,

          channels: {
            select: {
              id: true,
              icon: true,
              name: true,
            },
          },
        },
      },
    },
  })

  res.status(200).json({ success: true, data: widgets })
  // }
}
