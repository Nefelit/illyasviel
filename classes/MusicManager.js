const Lavacord = require('lavacord');
const fetch = require('node-fetch');


class MusicManager extends Lavacord.Manager {
    constructor(...args) {
        super(...args);
    }
    prepare(track) {
        track.info.thumbnail = require('youtube-thumbnail')(track.info.uri) // я знаю, что я мог по id видеоролика узнать его фон.
        return track
    }

    query(args) {
        let type, song, name, query = Array.isArray(args) ? args.join(" ") : args.split(" ").join(" ");
        if (query.match('http')) {
            type = '', name = query;
        } else if (query.match(/youtube.com\/playlist/)) {
            type = '', name = query;
        } else if (['soundcloud', 'sc', 'soundc'].includes(args[0])) {
            args.shift();
            type = 'sc', name = args.join(' ');
        } else if (['bc', 'band', 'bandcamp'].includes(args[0])) {
            args.shift();
            type = 'bc', name = args.join(' ');
        } else {
            type = 'yt', name = query
        };
        let searchQuery = `${type}${type ? 'search:' : ''}${name}`;
        const node = this.idealNodes[0];
        const params = new URLSearchParams();
        params.append("identifier", searchQuery);
        return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
            .then(res => res.json())
            .then(data => {
                data.node = node
                return (data)
            })
            .catch(err => {
                console.error(err);
                return null;
            });
    }
}

module.exports = MusicManager;