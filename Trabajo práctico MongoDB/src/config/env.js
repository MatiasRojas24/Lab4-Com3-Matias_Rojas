import dotenv from 'dotenv'
dotenv.config()

import pkg from 'env-var'
const { get } = pkg

const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DB_USER: get('DB_USER').required().asString(),
    DB_PASSWORD: get('DB_PASSWORD').required().asString(),
}

export default envs