let fs = require('fs')
let es = require('event-stream')
const conv = require('xml-js');

fs.createReadStream('discogs.xml', {start:11, encoding: "utf8"}) //, {start: 0, end:100}
  .pipe(es.split())
  .pipe(es.mapSync((line) => {
    //result = conv.xml2js(line, {compact:true, alwaysArray: true, ignoreComment: true, spaces: 2})
    console.log(typeof line)
    //console.log("hello", "\n")
    //console.log(typeof result.release)
  })
  .on('error', (err) => {
    console.log(err)
  })
)
