const axios = require('axios');
const cheerio = require('cheerio');

const result = {
    word: null,
    success: true,
    meanings: []
}

async function getData(word) {
    word = encodeURI(word);
    result.word = decodeURI(word);
    result.meanings = [];

    var api = axios.get(`https://tureng.com/en/turkish-english/${word}`);
    var response = await api.then(function (r) {
        return r.data;
    })

    return pullDataFromHtml(response, word);
}

function pullDataFromHtml(responseHtml, word) {
    var $ = cheerio.load(responseHtml);
    $("table.searchResultsTable").eq(0).find("tr").each(function (i, el) {
        var enItem = $(el).find("td[lang=en] > a").text().trim();
        if (enItem == word) {
            var item = $(el).find("td[lang=tr] > a");
            var meaning = item.text().trim();

            if (i < 10 && meaning.length > 1) {
                result.meanings.push(meaning);
            }
            return;
        }

        var item = $(el).find("td[lang=en] > a");
        var meaning = item.text().trim();
        if (i < 10 && meaning.length > 1) {
            result.meanings.push(meaning);
        }
    });

    if (!$("table.searchResultsTable").length) {
        result.meanings.push("No result found");
        result.success = false;
    }

    return result;
}

module.exports = getData;