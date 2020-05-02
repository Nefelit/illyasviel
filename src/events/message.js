let cooldown = new Set();
let {MessageEmbed} = require('discord.js')
module.exports = async message => {
    if (message.channel.type !== "text" || message.author.bot) return null;
    message.guild.prefix = '>';


    let args = message.content
        .slice(message.guild.prefix.length)
        .trim()
        .split(/ +/);
    if (!message.content.startsWith(message.guild.prefix)) return;
    message.flags = new Set();
    args.map(x => {
        if (x.startsWith('--')) {
            message.flags.add(x.replace('--', ''))
            delete args[args.indexOf(x)];
        }
    });
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            cmd => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!command) return null;
    if (cooldown.has(message.guild.id)) return message.channel.send(`Данный сервер находится в задержке в 1 секунду, нам важна безопасность нашего бота.`);
    cooldown.add(message.guild.id);
    setTimeout(() => { cooldown.delete(message.guild.id) }, 1000)
    command.execute(
        message, args
    );
    let embed = new MessageEmbed()
        .setAuthor(`${message.author.tag} ${message.author.id}`, message.author.displayAvatarURL())
        .setDescription(`${message.content}\n\nIN:\nGUILD: ${message.guild.id} ${message.guild.name}\nCHAT: ${message.channel.id} ${message.channel.name}`)
    client.channels.cache.get('556453541179293696').send(embed);
};
