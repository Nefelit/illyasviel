class BotCommand {
    constructor(data) {
        for (let field in data) {
            if (field === 'execute') {
            } else {
                this[field] = data[field];
            }
        }
        this.uses = 0;
        this.execute = (...args) => {
            this.uses++;
            delete require.cache[require.resolve(`${data.dir}/${this.module}/${this.name}`)];
            require(`${data.dir}/${this.module}/${this.name}`).execute(...args);
        }
    }

}

module.exports = BotCommand;