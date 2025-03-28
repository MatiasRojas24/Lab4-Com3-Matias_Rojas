import fs from 'fs';
import { conseguirDatos } from './preguntar.js'
import { argv } from './yargs.js'


const app = async ()=>{
  const { producto, precio, cantidad} = await conseguirDatos()
  const datos = [{
    "producto": producto,
    "precio": Number(precio),
    "cantidad": Number(cantidad),
}]
try {
  if (!fs.existsSync(argv.file)) {
    fs.writeFileSync(argv.file, JSON.stringify(datos), "utf-8");
  }else{
    const newProducto = {
      "producto": producto,
    "precio": Number(precio),
    "cantidad": Number(cantidad),
    }
      const data = fs.readFileSync(argv.file,"utf-8")
      let jsonData = JSON.parse(data)
      jsonData.push(newProducto)
      fs.writeFileSync(argv.file,JSON.stringify(jsonData),"utf-8")
  }
  const dataJSON = fs.readFileSync(argv.file,"utf-8")
  const datosJSON = JSON.parse(dataJSON)
  console.log(`\nDatos del JSON en './${argv.file}':`)
  console.log(datosJSON)
} catch (error) {
  console.error(error)
}
}

app()