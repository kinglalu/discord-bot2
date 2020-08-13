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
     
    }  else if(command === 'pong'){
        message.channel.send('ping!');
     
     }  else if(command === 'hello'){
        message.channel.send('hi');
      }  else if(command === 'help'){
        message.channel.send('here are the commands: -ping,-pong,-hello,-help ');
    }
else if (command === 'server') {
	message.channel.send(`Server name: {message.guild.name}/nTotal members: {message.guild.memberCount}`);
} 
});
client.on('message', message => {

    if (message.content === 'shut up') {

       message.reply('https://cdn.discordapp.com/attachments/707448978404409394/732118606061633606/video0.mp4');

       }

});



 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
