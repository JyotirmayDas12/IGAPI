const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', async (req, res) => {
    const link = req.query.url;

    const data = {
        q: link,
        t: "media",
        lang: "en",
    };

    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.7',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://saveig.app',
        'Referer': 'https://saveig.app/',
        'Sec-Ch-Ua': '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Gpc': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    };

    try {
        const response = await axios.post("https://saveig.app/api/ajaxSearch", qs.stringify(data), { headers });
        const $ = cheerio.load(response.data.data);
        const filter1 = $(".download-items");
        const maindata = filter1.find(".download-items__btn").find("a").attr("href");

        const logData = {
            status: true,
            data: [{
                type: "video",
                url: maindata
            }],
            join: "@INDIAN_DEV",
            credit: "Made by JYOTIRMAY DAS"
        };

        res.json(logData);
    } catch (error) {
        res.status(500).json({ error: message: "Send Valid Instagram URL. join: "@INDIAN_DEV",
            credit: "Made by JYOTIRMAY DAS" " });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
