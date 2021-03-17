// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = () => {
  return {
    publicRuntimeConfig: {
      // can add static folder instead public folder.
      API_URL: process.env.API_URL,
      s3_url: process.env.S3_URL,
      SIT_SSO_URL:  process.env.SIT_SSO_URL,
      SIT_SSO_STATE: process.env.SIT_SSO_STATE,
      SIT_SSO_REDIRECT: process.env.SIT_SSO_REDIRECT,
      SIT_SSO_CLIENT_ID: process.env.SIT_SSO_CLIENT_ID,
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
