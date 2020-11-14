const fs = require('fs');
const process = require('process');
cat(process.argv[2]);

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    });
}