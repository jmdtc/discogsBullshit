let fs = require('fs')
let es = require('event-stream')
const conv = require('xml-js');

const releases = []

let stream = fs.createReadStream('discogs.xml', {start:11, end: 110000, autoDestroy: true}) //, {start: 0, end:100}

stream.pipe(es.split('</release>'))
.pipe(es.mapSync(function call(line) {
  result = conv.xml2js(line + '</release>', {compact:true, ignoreComment: true, spaces: 2})
  //console.log("hello", "\n")
  if (Array.isArray(result.release.formats.format.descriptions.description)
  && (result.release.formats.format.descriptions.description.some(el => el._text.includes('12"'))
  || result.release.formats.format.descriptions.description.some(el => el._text.includes('10"')))) {
    releases.push(result.release)
    //console.log(result.release.formats.format.descriptions, result.release._attributes.id);
  }
  else if (result.release.formats.format.descriptions.description.hasOwnProperty('_text')
  && result.release.formats.format.descriptions.description._text) {
    releases.push(result.release)
  }
})
.on('error', (err) => {
  console.log(JSON.stringify(releases));
  //console.log(err);
})
.on('end', () => {
  //console.log(JSON.stringify(releases));
})
)
