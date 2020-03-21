const fs = require('fs')
const path = require('path')
const del = require('del')

function nthIndex (str, pat, n) {
  var L = str.length; var i = -1
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i)
    if (i < 0) break
  }
  return i
}

const ORIGIN_FILE_PATH = path.resolve(__dirname, '../src/assets/icons/variables.scss')
const NEW_FILE_PATH = path.resolve(__dirname, '../src/assets/styles/objects/_icons-map-auto-generated.scss')

// Load the original iconmoon file from disk
let content = fs.readFileSync(ORIGIN_FILE_PATH, 'utf-8')

// Extract fontFamily and iconFontPath lines from file as separate variables
let indexOfFirstLineEnd = content.indexOf(';')
let indexOfSecondLineEnd = nthIndex(content, ';', 2)
let fontFamily = content.substring(0, indexOfFirstLineEnd + 1)
let iconFontPath = content.substring(indexOfFirstLineEnd + 1, indexOfSecondLineEnd + 1)

// Retrieve the scss icon variables
let variables = content.substring(indexOfSecondLineEnd + 1).replace(/\\n/, '').replace(/\$/g, '').replace(/;/g, ',')

// Build a scss map
let mapStart = '\n\n$icons:('
let mapEnd = ');'

// Build the new file with icons in a scss map - by reassenbling the variables split out above
let newContent = `${fontFamily}${iconFontPath}${mapStart}${variables}${mapEnd}`

// Write the new file to disk
del.sync(NEW_FILE_PATH)
fs.writeFileSync(NEW_FILE_PATH, newContent, 'utf-8')
