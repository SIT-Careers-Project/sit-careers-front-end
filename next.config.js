// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = () => {
  return {
    publicRuntimeConfig: {
      // can add static folder instead public folder.
      API_URL: process.env.API_URL,
      s3_url: process.env.S3_URL,
      staticFolder: '/public'
    },
    serverRuntimeConfig: {
      JWT_SECRET: process.env.JWT_SECRET
    },
    images: {
      domains: ['www.sit.kmutt.ac.th'],
    },
  }
}
