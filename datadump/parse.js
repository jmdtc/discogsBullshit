let fs = require('fs')
let es = require('event-stream')
const conv = require('xml-js');

let stream = fs.createReadStream('discogs.xml', {start:11, autoDestroy: true}) //, {start: 0, end:100}
console.log("[");
let isFirst = true
stream.pipe(es.split('</release>'))
.pipe(es.mapSync(function call(line) {
  result = conv.xml2js(line + '</release>', {compact:true, ignoreComment: true, spaces: 2})
  if (result.release.formats.format.hasOwnProperty('descriptions')
  && Array.isArray(result.release.formats.format.descriptions.description)
  && (result.release.formats.format.descriptions.description.some(el => el._text.includes('12"'))
  || result.release.formats.format.descriptions.description.some(el => el._text.includes('10"')))) {
    if (!isFirst) {
      console.log(',');
    }
    console.log(JSON.stringify(result.release));
    //releases.push(result.release)
    //console.log(result.release);
  }
  else if (result.release.formats.format.hasOwnProperty('descriptions')
  && result.release.formats.format.descriptions.description.hasOwnProperty('_text')
  && result.release.formats.format.descriptions.description._text.includes('12"')) {
    if (!isFirst) {
      console.log(',');
    }
    console.log(JSON.stringify(result.release));
    //releases.push(result.release)
  }
  isFirst = false
})
.on('error', (err) => {
  //console.log(err);
  console.log("]");
})
.on('end', () => {
  //console.log(JSON.stringify(releases));
})
)
