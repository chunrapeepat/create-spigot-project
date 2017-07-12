"use strict";

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
const generateFolder = (packages, dir) => {
  removeDir(dir)
  setTimeout(() => {
    mkdirp(dir + '/src/' + packages.join('/'), (err) => {})
    mkdirp(dir + '/src/' + packages.join('/') + '/commands', (err) => {})
    mkdirp(dir + '/src/' + packages.join('/') + '/core', (err) => {})
    mkdirp(dir + '/src/' + packages.join('/') + '/listeners', (err) => {})
  }, 2000)
}

// TODO: Generating File
const generateFile = (name, packages, author, version, commands, config, dir, callback) => {
  generateFolder(packages, dir)
  setTimeout(() => {
    if(config) fs.writeFileSync(dir + '/src/config.yml', '')
    fs.writeFileSync(dir + '/src/plugin.yml', template.pluginYML(name, version, packages, author, commands))
    fs.writeFileSync(dir + '/src/' + packages.join('/') + '/' + name + '.java', template.JavaPlugin(name, packages, commands, config))
    for(let i = 0; i < commands.length; i++){
      fs.writeFileSync(dir + '/src/' + packages.join('/') + '/commands/' + capitalizeFirstLetter(commands[i]) + 'Command.java', template.Command(name, packages, commands[i]))
    }
    callback();
  }, 5000)
}

exports.generateFile = generateFile;
