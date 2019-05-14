const rp = require('request-promise');
const cheerio = require('cheerio');
const URL = 'https://www.austinpetsalive.org/adopt/dogs/';

const getAPADogs = async () => {
    const html = await rp(URL);
    const $ = cheerio.load(html);
    let doggos = [];
    $('#available_pets_table').find('li.pet > a').each((index, element) => {
        let doggo = {};
        doggo.link = cheerio(element).attr('href'); // this is a link to the dog display page
        doggo.name = cheerio(element).attr('title'); //titles are the name of each dog
        doggo.description = cheerio(element).find('p').text().split('\n'); // new lines separate each descriptor
        doggo.picture = cheerio(element).find('div > img.photo').attr('src'); // this is the main photo for each dog
        doggos.push(doggo);
    });
    return doggos;
}
module.exports = {
    getAPADogs
}