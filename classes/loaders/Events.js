const Enmap = require('enmap');
const fs = require('fs');

class BotEvents extends Enmap {
    constructor(args) {
        super(args)

        /**
         * Папка с элементами.
         */
        this.dir = args.dir;
        this.client = args.client;
    }

    /**
     * Загрузка всех элементов
     */
    load() {
        fs.readdirSync(this.dir)
            .filter(event => event.endsWith(".js"))
            .forEach((event, index) => {
                const loadedEvent = require(`${this.dir}/${event}`);
                let eventName = event.split(".")[0];
                this.client.on(eventName, loadedEvent);
                delete require.cache[require.resolve(`${this.dir}/${event}`)];
            });
        return this.client;
    }
} 

module.exports = BotEvents;