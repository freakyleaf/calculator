const csvWriter = require('csv-write-stream');
const express   = require('express');
const fs        = require('fs');
const moment    = require('moment');
const path      = require('path');

const app = express();

function doCsv(datetime, ip, ua, sum) {

    let writer;

    if (!fs.existsSync(path.join(__dirname, '../', 'log', 'log.csv'))) {
        writer = csvWriter({ headers: ['DateTime', 'IP Address', 'User Agent', 'Sum'] });
    } else {
        writer = csvWriter({ sendHeaders: false });
    }

    writer.pipe(fs.createWriteStream(path.join(__dirname, '../', 'log', 'log.csv'), { flags: 'a' }));
    writer.write({
        DateTime: datetime,
        'IP Address': ip,
        'User Agent': ua,
        Sum: sum,
    });

    writer.end();

}

app.use(express.static('dist'));
app.use(express.json());
app.listen(3000);

app.post('/post/', (request, response) => {

    const datetime = moment().format('LLLL');
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    const ua = request.headers['user-agent'];
    const sum = request.body.value;

    doCsv(datetime, ip, ua, sum);
    response.sendStatus(200);

});
