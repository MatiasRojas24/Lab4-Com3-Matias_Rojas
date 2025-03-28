import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

export const argv = yargs(hideBin(process.argv))
    .command('file', 'Pedir nombre del archivo', {
        file: { 
            describe: 'Nombre del archivo a crear',
            demandOption: true,
            type: 'string',
        },
    })
    .help()
    .argv;