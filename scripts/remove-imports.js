const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

process.argv.forEach((filename, index) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (path.extname(filename) == ".html") {
            if (err) throw err;

            const $ = cheerio.load(data);
            $('link').attr('href', 'REMOVED');
            $('script').attr('src', 'REMOVED');

            fs.writeFile(filename, $.html(), (err) => {
                if (err) throw err;
                console.log(`File has been modified: ${filename}`);
            });
        }
    });
});
