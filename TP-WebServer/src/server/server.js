import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

export const startServer = (options) =>{
    const { port, public_path = 'public' } = options

    const app = express()

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    app.use(express.static(path.join(__dirname, `../../${public_path}/dist`)))
    app.get('/',(req, res) => {
        const reactPath = path.join(__dirname, `../../${public_path}/dist/index.html`)
        res.sendFile(reactPath)
    })
    app.listen(port, ()=>{
        console.log('Escuchando en el puerto ',port)
    })
}