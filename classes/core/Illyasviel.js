const { Client } = require('discord.js')
const BotEvents = require('../loaders/Events');
const BotCommands = require('../loaders/Commands');
const MusicPlayer = require('../MusicPlayer')
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
        this.commands = null;
        this.player = null;
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
        this.commands = new BotCommands({ dir: options.commandsDir, client: this })
        return this;
    }


    setupPlayer(Player, nodes) {
        /**
         * Плеер
         */
        this.player = new Player(nodes, {
            user: this.user.id,
            Player: MusicPlayer,
            send: packet => {
                if (this.guilds.cache) {
                    const guild = this.guilds.cache.get(packet.d.guild_id);
                    if (guild) return guild.shard.send(packet); // Отправка пакета на шард.
                } else {
                    // @ts-ignore
                    const guild = this.guilds.get(packet.d.guild_id);
                    // @ts-ignore
                    if (guild) return typeof this.ws.send === "function" ? this.ws.send(packet) : guild.shard.send(packet);
                }
            }
        });

        return this
    }
    connectToLavalink() {
        return this.player.connect();
    }


    lauch() {
        console.log('Подготовка к запуску'.gray)
        return super.login(this.token);
    }
}

module.exports = Illyasviel;