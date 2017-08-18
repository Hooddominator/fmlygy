"use strict";
var Iconv = require('iconv').Iconv;
// require iconv
var iconv = new Iconv("iso-8859-15", "utf-8");
// Require FileParser
var srt = require("srtparse");
var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
    host: "192.168.0.12:9200",
    log: "trace"
});
const path = "/Users/Hooddominator/Downloads/xsubs/*.srt";
var glob = require("glob");

var count = 0;

function getParentIdFromFilename(filename) {
    var regex = /S(\d+)E(\d+)/;
    var match = regex.exec(filename);
    if (match.length !== 3) {
        return false;
    }
    return match[1] + "." + match[2];
}


// options is optional
glob(path, function (er, files) {
    // Create a new FileParser
    files.forEach(function (file,i) {
        var parentId = getParentIdFromFilename(file);
        if(!!parentId) {
            var fp = new srt.FileParser(file);
            // Parse file
            fp.parse().then(function () {
                var subtitles = fp.getSubtitles();
                console.log("found " + subtitles.length + " in " + file);
                count = count + subtitles.length;
                subtitles.forEach(function (subtitle, j) {
                    var bulk_body = [];
                    var bulk_action = {"index": {"_index": "familyguy", "_type": "subtitle", "_parent": parentId, "_id": parentId + "." + subtitle.getIndex()}};
                    var bulk_document = {
                        "index": subtitle.getIndex(),
                        "start": subtitle.getStartTime().toSeconds(),
                        "end": subtitle.getEndTime().toSeconds(),
//                        "text": iconv.convert(subtitle.getTextAsString()).toString()
                        "text": subtitle.getTextAsString()
                    };
                    bulk_body.push(bulk_action);
                    bulk_body.push(bulk_document);
                    client.bulk({
                        body: bulk_body
                        }, function (err, resp) {
                            console.log(resp);
                    });
                });
            }).catch(console.error);
        } else {
            console.log("cannot find episode/season in filename: " + file);
        }
    });
});

console.log("totaly found " + count + " subtitles");

