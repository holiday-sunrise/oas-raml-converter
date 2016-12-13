#!/usr/bin/env node --harmony
const program = require('commander')
const parser = require('raml-1-parser')

let expand = true
let file = undefined

const exit = (error) => {
  console.error(error)
  process.exit(1)
}

program
  .arguments('<file>')
  .option('-e, --expand <expand>', 'whether to expand (default) or not')
  .action(f => {
    file = f
    if (typeof program.expand !== 'undefined')
      expand = program.expand
  })
  .parse(process.argv)

if (typeof file === 'undefined') exit('File path required. See --help.')

parser.loadApi(file, {attributeDefaults: false}).then((api) => {
  if (expand && api.expand) api = api.expand(true)
  console.log(api.toJSON({serializeMetadata: false}))
}).catch(exit)