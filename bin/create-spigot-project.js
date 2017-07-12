#!/usr/bin/env node

const readlineSync = require('readline-sync')
const version = require('../lib/version')
const lib = require('../lib/index')

// TODO: Logging some text
console.log(`\nSimple, Fast, Start your project easier with create-spigot-project!`)
console.log(`This utility will generate your /src/ folder automatically.\n`)
console.log(`Running on v${version} created by Chun Rapeepat\n`)
console.log(`Bugs, New Feature, Any Question at\nhttps://github.com/chunza2542/create-spigot-project/issues\n`)

// TODO: Variables contains some data
let _name, _package, _author, _version, _commands, _config

// TODO: Save your project name
_name = readlineSync.question('Enter your project name: (e.g. Something) ')

// TODO: Save your package name as Array
_package = readlineSync.question('Enter your package name: (e.g. me.chunza2542.something) ').split('.')

// TODO: Save your author name
_author = readlineSync.question('Enter author name: (e.g. Chun Rapeepat) ')

// TODO: Save your version number
_version = readlineSync.question('Enter version number: (e.g. 1.0.0) ')

// TODO: Save your commands as array
_commands = readlineSync.question('Enter your commands: (e.g. setspawn, something, ..) ').replace(' ', '').split(',')

// TODO: Save if you want default config as boolean
_config = (readlineSync.question('Do you want config.yml ? (type `yes` or `no`) ') === 'yes') ? true : false;

// TODO: Concluding information
console.log(`\n=> CONCLUDING INFORMATION`)
console.log(`${_name} v${_version} (author: ${_author})`)
console.log(`package name: ${_package.join('.')}, generate config: ${(_config) ? 'yes' : 'nope'}, commands: ${_commands.join(', ')} \n`)

// TODO: Are you sure ??
if((readlineSync.question('Are you sure this information is right? (type `sure` or `cancel`) ') === 'sure')){

  console.log('\ngenerating file. it may take a few seconds...')

  // TODO: Generating directory & file
  lib.generateFile(_name, _package, _author, _version, _commands, _config, process.cwd(), () => {
    console.log('\nGenerating a /src/ in ' + process.cwd())
    console.log('Happy Hacking :)')
  })

}
else {

  // TODO: Byeeeeeeee~
  console.log(`\nGGEZ! Bye bye ~~~~!`)

}
