const player = require('../../classes/MusicManager')
const config = require('../../config.json')
module.exports = async () => {
    core.setupPlayer(player, config.nodes);
    let links = await core.connectToLavalink();

    console.log(`${client.user.username} авторизована, в наличии ${links.length} муз серверов`)
}