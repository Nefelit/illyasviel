const Lavacord = require('@lavacord/discord.js');

class MusicPlayer extends Lavacord.Player {
    constructor(...args) {
        super(...args);
    }

    get queue() {
        return core.player.queue.get(this.id);
    }
}

Lavacord.Player = MusicPlayer;
module.exports = MusicPlayer;