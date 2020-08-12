const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '-';
 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
     
     if(command === 'pong'){
        message.channel.send('ping!');
      
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
