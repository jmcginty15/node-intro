const fs = require('fs');
const axios = require('axios');
const process = require('process');

const arg = process.argv[2];
if (arg.slice(0, 4) === 'http') {
    webCat(arg);
} else {
    cat(arg);
}

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}