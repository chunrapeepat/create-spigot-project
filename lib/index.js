const template = require('./template')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const fs = require('fs')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: remove directory if exists
const removeDir = (dir) => {
  if (fs.existsSync(dir + '/src')) {
      rimraf(dir + '/src', () => {})
  }
}

// TODO: Generating directory
const generateFolder = (package, dir) => {
  removeDir(dir)
  setTimeout(() => {
    mkdirp(dir + '/src/' + package.join('/'), (err) => {})
    mkdirp(dir + '/src/' + package.join('/') + '/commands', (err) => {})
    mkdirp(dir + '/src/' + package.join('/') + '/core', (err) => {})
    mkdirp(dir + '/src/' + package.join('/') + '/listeners', (err) => {})
  }, 2000)
}

// TODO: Generating File
const generateFile = (name, package, author, version, commands, config, dir, callback) => {
  generateFolder(package, dir)
  setTimeout(() => {
    if(config) fs.writeFileSync(dir + '/src/config.yml', '')
    fs.writeFileSync(dir + '/src/plugin.yml', template.pluginYML(name, version, package, author, commands))
    fs.writeFileSync(dir + '/src/' + package.join('/') + '/' + name + '.java', template.JavaPlugin(name, package, commands, config))
    for(let i = 0; i < commands.length; i++){
      fs.writeFileSync(dir + '/src/' + package.join('/') + '/commands/' + capitalizeFirstLetter(commands[i]) + 'Command.java', template.Command(name, package, commands[i]))
    }
    callback();
  }, 5000)
}

exports.generateFile = generateFile;
