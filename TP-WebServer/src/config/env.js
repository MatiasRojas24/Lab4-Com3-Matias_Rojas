import dotenv from 'dotenv'
dotenv.config()

import pkg from 'env-var'
const { get } = pkg

const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString()
}

export default envs