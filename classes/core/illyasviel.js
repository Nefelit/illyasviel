const { Client } = require('discord.js')
const BotEvents = require('../loaders/Events');
/**
 * Основное ядро бота, измененный клиент
 * 
 * @namespace CoreClient
 * @extends Client
 * @class
 * 
 * @example 
 * 
 * const Core = new Illyasviel()
 * Core.lauch();
 */
class Illyasviel extends Client {
    constructor(...options) {
        super(...options)


        this.events = null;
    }

    /**
     * 
     * @param {object} options Обьект с данными для базовой настройки бота
     */
    setup(options) {
        /**
         * Токен для авторизации
         * 
         * @type String
         * @default false
         */
        this.token = options.token;

        /**
         * Версия
         */
        this.version = options.version;

        /**
         * Папка с командами
         */
        this.commandsDir = options.commandsDir;

        /**
         * Папка с ивентами
         */
        this.eventsDir = options.eventsDir;

        this.events = new BotEvents({ dir: options.eventsDir, client: this })
        return this;
    }


    lauch() {
        console.log('Подготовка к запуску'.gray)
        return super.login(this.token);
    }
}

module.exports = Illyasviel;