const { getChrome } = require('./chrome-script');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket_name = process.env.S3_BUCKET_NAME;
const summer_movie_page = process.env.SUMMER_MOVIE_PAGE;
const summer_movie_file_name = process.env.SUMMER_MOVIE_FILE_NAME;

module.exports.scraper = async (event, context) => {
    /* const { url } = event.queryStringParameters; */

    const chrome = await getChrome();
    const browser = await puppeteer.connect({
      browserWSEndpoint: chrome.endpoint,
    });
    const page = await browser.newPage();
    await page.goto(summer_movie_page /* url */, { waitUntil: 'networkidle0' });
    const content = await page.evaluate(() => document.body.innerHTML);

    const data = {
        'players': [],
        'upcoming_releases': {}
    };

    const $ = cheerio.load(content);
    const scores = $('.totalscoretable tr');
    const releases = $('.upcomingreleasesofinterest td');

    data.players = scores.map((i, el) => {
        const name = $(el).find('.name').text();
        const score = $(el).find('.result').text();

        return {
            name,
            score
        }
    }).get();

    let previous_date = '';
    releases.each((i, el) => {
        if ($(el).hasClass('name')) {
            const film_title = $(el).text();
            data.upcoming_releases[previous_date].push(film_title);
        } else {
            const release_date = $(el).text();
            if (!data.upcoming_releases[release_date]) {
                data.upcoming_releases[release_date] = [];
            }
            previous_date = release_date;
        }
    });

    const s3Promise = s3.putObject({
        Bucket: bucket_name,
        Key: `${summer_movie_file_name}.json`,
        Body: JSON.stringify(data),
        ContentType: 'application/json'
    }).promise();

    return await s3Promise.then((response) => {
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    });
};