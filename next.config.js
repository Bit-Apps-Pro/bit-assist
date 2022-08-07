module.exports = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  env: {
    CLIENT_CDN_URL: process.env.CLIENT_CDN_URL,
  },
  // basePath: process.env.NODE_ENV !== 'production' ? '' : '/bit-assist',
}
