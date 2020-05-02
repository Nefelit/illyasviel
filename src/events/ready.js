module.exports = async () => {
    let links = await core.connectToLavalink();

    console.log(`${client.user.username} авторизована, в наличии ${links.length} муз серверов`)
}