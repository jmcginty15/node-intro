const fs = require('fs');
const axios = require('axios');
const process = require('process');

runCats();

async function runCats() {
    const arg = process.argv[2];
    if (arg === '--out') {
        while (process.argv.length > 3) {
            console.log(process.argv);
            const path = process.argv[4];
            const filename = process.argv[3];
            if (path.slice(0, 4) === 'http') {
                await webCatWrite(path, filename);
            } else {
                catWrite(path, filename);
            }
            process.argv.splice(3, 2);
        }
    } else if (arg.slice(0, 4) === 'http') {
        webCat(arg);
    } else {
        cat(arg);
    }
}

function cat(path) {
    console.log(getData(path));
}

function catWrite(path, filename) {
    const data = getData(path);
    fs.writeFileSync(filename, data, 'utf8', function (err) {
        console.error(err);
        process.exit(1);
    });
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function webCatWrite(url, filename) {
    try {
        const res = await axios.get(url);
        fs.writeFileSync(filename, res.data, 'utf8', function (err) {
            console.error(err);
            process.exit(1);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

function getData(path) {
    const data = fs.readFileSync(path, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        return data;
    });
    return data;
}