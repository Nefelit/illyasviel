/**
 * Core - Клиент ядро
 * config - конфгируации
 * join - функция для создания абсолютного пути с помощью __dirname
 */

const Core = require('../classes/core/illyasviel') 
const config = require('../config')
const package = require('../package')
const join = require('path').join

/** Декорация */
const colors = require('colors')


const client = core = new Core();
core.setup({
    token: config.token,
    version: package.version,
    commandsDir: join(__dirname, '..', 'commands'),
    eventsDir: join(__dirname, '..', 'events')
})
core.on('ready', () => {
    console.log(client.user.tag)
    client.generateInvite().then(console.log)
})
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
