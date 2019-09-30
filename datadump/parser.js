const fs = require('fs')
const es = require('event-stream')
const conv = require('xml-js');
let isFirst = true
console.log('[');



const getByCallbackLabel = (funcName, arg) => {
  switch (funcName) {
    case 'getReleaseByLabel':
      return (result) => {
        const {label} = result.release.labels
        if (Array.isArray(label)
          && label.some(el => el._attributes.id === arg.id)
        ||(label.hasOwnProperty('_attributes')
          && label._attributes.id === arg.id)) {
            if (!isFirst) {
              console.log(',');
            }
            console.log(JSON.stringify(result.release));
        }
        isFirst = false
      }
      break;
  }
}

const parser = (file, func) => {
  const stream = fs.createReadStream(file, {start:11, end: 40000000, autoDestroy: true})
  stream
    .pipe(es.split('</release>'))
    .pipe(es.mapSync((line) => {
      result = conv.xml2js(line + '</release>', {compact:true, ignoreComment: true, spaces: 2})
      func(result)
    })
    .on('error', (err) => {
      console.log(']');
      stream.unpipe()
    })
  )
}

parser('discogs.xml', getByCallbackLabel('getReleaseByLabel', {id: '1818'}))
