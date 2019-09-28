let fs = require('fs')
let es = require('event-stream')
const conv = require('xml-js');

const releases = []

fs.createReadStream('discogs.xml', {start:11, end: 20000}) //, {start: 0, end:100}
  .pipe(es.split('</release>'))
  .pipe(es.mapSync((line) => {
    result = conv.xml2js(line + '</release>', {compact:true, ignoreComment: true, spaces: 2})
    //console.log("hello", "\n")
    if (Array.isArray(result.release.formats.format.descriptions.description)
    && (result.release.formats.format.descriptions.description.some(el => el._text.includes('12"'))
    || result.release.formats.format.descriptions.description.some(el => el._text.includes('10"')))) {
      //console.log(result.release.formats.format.descriptions)
      releases.push("success")
    }
  })
  .on('error', (err) => {
    res.end(err)
  })
  .on('end', () => {
    console.log("test");
  })
)
