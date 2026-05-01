const https = require('https');

function getChannelId(handle) {
    https.get('https://www.youtube.com/@' + handle, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const match = data.match(/"channelId":"(UC[^"]+)"/);
            console.log(handle + ' ID:', match ? match[1] : 'not found');
        });
    });
}

getChannelId('SaditAditya');
getChannelId('SADITID');
