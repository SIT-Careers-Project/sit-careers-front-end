import getConfig from 'next/config'

// ENV from '/.env'
// When there is new env, edit '/.env' file and add it in '/next.config.js'
const ENV = getConfig().serverRuntimeConfig
Object.assign(ENV, getConfig().publicRuntimeConfig)
export default ENV