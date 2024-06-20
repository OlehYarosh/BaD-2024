const fs = require('fs').promises;

async function readNumbersFromFile(filename) {
    const data = await fs.readFile(filename, 'utf-8');
    return data.split('\n').map(Number).filter(n => !isNaN(n));
}

function statistics(numbers) {
    const maxNum = numbers.reduce((max, num) => (num > max ? num : max), -Infinity);
    const minNum = numbers.reduce((min, num) => (min > num ? num : min), Infinity);
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    
    const median = (list) => {
        const sortNumbers = [...list].sort((a, b) => a - b);
        const mid = Math.floor(sortNumbers.length / 2);
        if (sortNumbers.length % 2 === 0) {
            return (sortNumbers[mid - 1] + sortNumbers[mid]) / 2;
        } else {
            return sortNumbers[mid];
        }
    }

    const medianRes = median(numbers);

    return { maxNum, minNum, mean, medianRes };
}

async function main() {
    const txtFile = '10m.txt';
    try {
        const numbers = await readNumbersFromFile(txtFile);
        const { maxNum, minNum, mean, medianRes } = statistics(numbers);

        console.log(`Max number: ${maxNum}`);
        console.log(`Min number: ${minNum}`);
        console.log(`Mean: ${mean}`);
        console.log(`Median: ${medianRes}`);
    }
    catch (error) {
        console.log('Error reading the file', error);
    }
}

main();
