import envs from './config/env.js'
import { startServer } from './server/server.js'

const main = () => {
    startServer({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })
}

// Función agnóstica autoconvocada
// agnóstica pq no tiene nombre
// autoconvocada pq la ejecutamos con los parentesis
( async () => {
    main()
})()