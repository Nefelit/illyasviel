/**
 * Core - Клиент ядро
 * config - конфгируации
 * join - функция для создания абсолютного пути с помощью __dirname
 */

const Core = require('../classes/core/Illyasviel') 
const config = require('../config')
const package = require('../package')
const join = require('path').join

/** Декорация */
const colors = require('colors')


global['client'] = core = new Core(); // я знаю что global плохо, но мне можно, я уебан.
core.setup({
    token: config.token,
    version: package.version,
    commandsDir: join(__dirname, '..', 'src', 'commands'),
    eventsDir: join(__dirname, '..', 'src', 'events')
})
    .events.load()
    .commands.load()


core.lauch().then(() => {
   process.stdin.resume(); /** Программа закроется не моментально, что позволит сохранить данные */    
})

process.on('uncaughtException', err => {
    console.log(`----------------------------->`.yellow)
    console.log(`${err.stack}`.red)
    console.log(`----------------------------->`.yellow)
    console.log(`----------------------------->`.cyan)
    console.log(`Процесс будет продолжен.`.cyan)
    console.log(`----------------------------->`.cyan)
})

module.exports = core;