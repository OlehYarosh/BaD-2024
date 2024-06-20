const fs = require('fs').promises;

async function readNumbersFromFile(filename) {
    const data = await fs.readFile(filename, 'utf-8');
    return data.split('\n').map(Number).filter(n => !isNaN(n));
}

async function main() {
    const txtFile = '10m.txt';
    try {
        const number = await readNumbersFromFile(txtFile);
        console.log(number[0])
    }
    catch (error) {
        console.log('Error reading the file', error)
    }
}

main();