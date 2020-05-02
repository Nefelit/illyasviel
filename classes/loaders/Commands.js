const Enmap = require('enmap');
const fs = require('fs');

class BotCommands extends Enmap {
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
        let Command = require("../Command");
        fs.readdirSync(this.dir).forEach(module => {
            fs.readdirSync(`${this.dir}/${module}`)
                .filter(x => x.endsWith(".js"))
                .forEach(cmd => {
                    let command;
                    (command = require(`${this.dir}/${module}/` + cmd)),
                        (command.module = module),
                        (command.dir = this.dir),
                        (command.path = command);
                    
                    if (module === "dev") command.ownerOnly = true;
                    this.client.commands.set(command.name, new Command(command));
                });
        });
        return this.client;
    }
}

module.exports = BotCommands;