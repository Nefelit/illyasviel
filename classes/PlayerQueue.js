const Enmap = require('enmap');

class PlayerQueue extends Enmap {
    constructor(channel) {

        this.channel = channel;
    } 

    toArray() {
        return [...this]
    }

    first() {
        return this.toArray().shift();
    }

    last() {
        return this.toArray().pop();
    }

    addTrack(object, position = 0) {
        this.pushIn(object, 'songs', position)
    }


}