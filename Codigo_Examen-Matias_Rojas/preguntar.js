import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

export const conseguirDatos = async () => {
    try {
        const producto = await preguntar('Producto: ');
        const precio = await preguntar('Precio: ');
        const cantidad = await preguntar('Cantidad: ');
        rl.close()

        console.log(`\nDatos ingresados:`)
        console.log(`Producto: ${producto}`);
        console.log(`Precio unitario: $${precio}`);
        console.log(`Cantidad: ${cantidad}`);
        return {producto, precio, cantidad}
    } catch (error) {
        console.error(error);
    }
};