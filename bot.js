const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('bot online');
});




client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'hey') {
            client.commands.get('hey').execute(message, args);
        }
    });
    if (command === 'ping') {
        message.channel.send('pong!');

    } else if (command === 'pong') {
        message.channel.send('ping!');

    } else if (command === 'hello') {
        message.channel.send('hi');
    } else if (command === 'help') {
        message.channel.send('here are the commands: -ping,-pong,-hello,-help ');
    } else if (command === 'server') {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else if (command === 'userinfo') {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    } else if (command === 'test') {
        message.channel.send(`Testing...`);
        message.bot.delete(2000);
    }    
    
    
});
client.on('message', message => {

    if (message.content === 'shut up') {

        message.reply('https://cdn.discordapp.com/attachments/707448978404409394/732118606061633606/video0.mp4');

    }

});




// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret
