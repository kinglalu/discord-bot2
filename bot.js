const { Client, MessageEmbed } = require("discord.js");
const bot = new Client();
const token = "NzQzMjIyNjk1MTIyMDQzMDYw.XzRiEg.3EGFwMw_lxZir-Z3DXPdsA2s1h0"; // bot token
const roblox = require('noblox.js');
const fs = require("fs");
const PREFIX = "-"; // your prefix


var username;

const guildInvites = new Map();

bot.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

bot.on("ready", ready => {
  console.log("bot is ready");
  bot.guilds.cache.forEach(guild => {
    guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
  });
});



var isFile;

var inviter;

async function make(){
  fs.writeFile(inviter + ".txt", "1", (err) => {
  if (err) throw err;
   console.log('The file has been saved!');
   //console.log(inviter);
   //isFile = true;
 });
}



bot.on('guildMemberAdd', async member => {
  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
  const logChannel = bot.channels.cache.get(''); // logs alt channel
  const welcomeChannel = bot.channels.cache.get(''); // logs welcomes channel
  if (Date.now() - member.user.createdAt < 1000*60*60*24*14){
    const alts = new MessageEmbed()
      .setTitle(`Uh oh, i smell alts!`)
      .setDescription(`i removed an invite from ${usedInvite.inviter.tag} for inviting alts :)`)
      .setColor(0x5800ab);
    logChannel.send(alts);
    return;
  }

  const welcomeMessage = await new MessageEmbed()
  .setTitle(`Woohoo, a new member!`)
  .setDescription(`welcome **${member.user.tag}**, invited by ${usedInvite.inviter} :)`)
  .setColor(0x5DFF00)
  welcomeChannel.send(welcomeMessage);

  inviter = usedInvite.inviter.id;

  member.user.id

  console.log(inviter);

  fs.writeFile(`profile${member.user.id}.txt`, usedInvite.inviter.id, (err) => {
    if(err) throw err;
  });


  fs.writeFile(member.user.id + ".txt", "0", (err) => {
  if (err) throw err;
  })




  var temp;
  try {
    var temp1 = fs.readFileSync(`${inviter}.txt`, "utf8");
  } catch (err) {
    if(err){
      make();
      return;
    }
  }

  temp = fs.readFileSync(`${inviter}.txt`, "utf8");

  console.log(temp);


  var invites = parseInt(temp, 10);
  invites = invites + 1;
  console.log(invites);
  invites = invites.toString();
  console.log(invites);
    fs.writeFile(usedInvite.inviter.id + ".txt", invites, (err) => {
    if (err) throw err;
  })
});


bot.on("guildMemberRemove", member => {
  try {
    var temp = fs.readFileSync(`profile${member.user.id}.txt`, "utf8");
    console.log(temp);
  } catch (err) {
    if(err){
      console.log("error");
      return;
  }}

    console.log(`this dude ${temp}`);
    var temp1;
    try {
      var temp2 = fs.readFileSync(`${inviter}.txt`, "utf8");
    } catch (err) {
      if(err){
        console.log("error");
        return;
      }
    }

    temp1 = fs.readFileSync(`${temp}.txt`, "utf8");

    var invites = parseInt(temp1, 10);
    invites = invites - 1;
    invites = invites.toString();
    console.log(invites);
      fs.writeFile(temp + ".txt", invites, (err) => {
      if (err) throw err;
    })
  });





async function run() {
  try {
   var cookie = await fs.readFileSync(`cookie.txt`, "utf8");
  } catch (err) {
    if(err){
      console.log(`no cookie set`);
      return;
    }
  }
  await roblox.setCookie(cookie);
}


run();




bot.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");
  if(message.content.startsWith(`${PREFIX}setgroup`)){
    if(message.author.id != ``){ // put your id here so only you can use admin commands
      const accessDenied = new MessageEmbed()
        .setTitle(`Uh oh!`)
        .setDescription(`Hey your not warrior silly.`)
        .setColor(0xff0008);
      message.channel.send(accessDenied);
      return;
    }
    fs.writeFile(`groupid.txt`, args[1], (err) => {
    if (err) throw err;
    })
    const success = new MessageEmbed()
      .setTitle(`Woohoo!`)
      .setDescription(`group has been successfully set :)`)
      .setColor(0x00ff0d);
    message.channel.send(success);
  }
  if(message.content.startsWith(`${PREFIX}addinvites`)){

    if(message.author.id != ``){ // put your id here so only you can use admin commands
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`Hey your not warrior silly.`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }

    var mentiondUser = message.mentions.users.first();
    if(!mentiondUser){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`please use the following format **${PREFIX}addinvites <username> <how-much-you-want-to-ad>**`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    if(isNaN(args[2]) == true){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**${args[2]}** is not a valid number...`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    if(args[2] != Math.floor(parseInt(args[2], 10))){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**${args[2]}** is not an integer :(`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    var id = mentiondUser.id;
    console.log(id);

    var temp;
    try {
      var temp1 = fs.readFileSync(`${id}.txt`, "utf8");
    } catch (err) {
      if(err){
        console.log(args[2]);
        fs.writeFile(mentiondUser.id + ".txt", args[2], (err) => {
        if (err) throw err;
        })
          console.log("file saved");
          return;
        };
      }


    temp = fs.readFileSync(`${id}.txt`, "utf8");

    console.log(temp);

    var invites = parseInt(temp, 10);
    var argsInv = parseInt(args[2], 10);
    invites = invites + argsInv;
    console.log(invites);
    invites = invites.toString();
    console.log(invites);
      fs.writeFile(id + ".txt", invites, (err) => {
      if (err) throw err;
    })
    const added = new MessageEmbed()
      .setTitle(`Woohoo!`)
      .setDescription(`i have added ${args[2]} invites to ${mentiondUser}`)
      .setColor(0x00ff37);
    message.channel.send(added);
}

  if(message.content.startsWith(`${PREFIX}setinvites`)){
    if(message.author.id != ``){ // put your id here so only you can use admin commands
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`Hey your not warrior silly.`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    var mentiondUser = message.mentions.users.first();
    if(!mentiondUser){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription("please specify the person you would like to set invites to")
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    if(isNaN(args[2]) == true){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`"${args[2]}" is not a valid number...`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    if(args[2] != Math.floor(parseInt(args[2], 10))){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**${args[2]}** is not an integer :(`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    var id = mentiondUser.id;
    console.log(id);

    fs.writeFile(id + ".txt", args[2], (err) => {
      if (err) throw err;
    });

    const set = new MessageEmbed()
      .setTitle(`Woohoo`)
      .setDescription(`i have set ${mentiondUser} to ${args[2]} invites :)`)
      .setColor(0x00ff37);
    message.channel.send(set);
    }


  if(message.content.startsWith(`${PREFIX}removeinvites`)){
    if(message.author.id != ``){ // put your id here so only you can use admin commands
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`Hey your not warrior silly.`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    var mentiondUser = message.mentions.users.first();
    if(!mentiondUser){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`please use the following format **${PREFIX}addinvites <username> <how-much-you-want-to-ad>**`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    if(isNaN(args[2]) == true){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**${args[2]}** is not a valid number...`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    if(args[2] != Math.floor(parseInt(args[2], 10))){
      const error = new MessageEmbed()
        .setTitle(`Error!`)
        .setDescription(`**${args[2]}** is not an integer :(`)
        .setColor(0xff0008);
      message.channel.send(error);
      return;
    }
    var id = mentiondUser.id;
    console.log(id);

    var temp;
    try {
      var temp1 = fs.readFileSync(`${id}.txt`, "utf8");
    } catch (err) {
      if(err){
        return;
      }
    }

    temp = fs.readFileSync(`${id}.txt`, "utf8");

    console.log(temp);

    var invites = parseInt(temp, 10);
    var argsInv = parseInt(args[2], 10);
    invites = invites - argsInv;
    console.log(invites);
    invites = invites.toString();
    console.log(invites);
      fs.writeFile(id + ".txt", invites, (err) => {
      if (err) throw err;
    })
    const remove = new MessageEmbed()
      .setTitle(`Woohoo!`)
      .setDescription(`i have removed ${args[2]} invites from ${mentiondUser} :)`)
      .setColor(0x00ff37);
    message.channel.send(remove);
  }


  if(message.content.startsWith(`${PREFIX}invites`)){
    var mentiondUser = message.mentions.users.first();
    if(mentiondUser){
      var temp;
      var id = mentiondUser.id;
      try {
        var temp1 = fs.readFileSync(`${id}.txt`, "utf8");
      } catch (err) {
        if(err){
            const error = new MessageEmbed()
              .setTitle(`Uh oh!`)
              .setDescription(`<@${id}> has no invites :(`)
              .setColor(0xff0008);
            message.channel.send(error);
            return;
        }
      }
      temp = fs.readFileSync(`${id}.txt`, "utf8");
      const counter = new MessageEmbed()
        .setTitle(`0.o`)
        .setDescription(`<@${id}> has ${temp} invites!`)
        .setColor(0x00ff37);
      message.channel.send(counter);
      return;
    }

    var temp;
    var id = message.author.id;
    try {
      var temp1 = fs.readFileSync(`${id}.txt`, "utf8");
    } catch (err) {
      if(err){
        const error = new MessageEmbed()
          .setTitle(`Uh oh!`)
          .setDescription(`${message.author}, you have no invites :(`)
          .setColor(0xff0008);
        message.channel.send(error);
        return;
      }
    }
    temp = fs.readFileSync(`${id}.txt`, "utf8");
    message.reply(`you have ${temp} invites!`);
}
});


bot.on("message", async message => {
  if(message.content.startsWith(`${PREFIX}setcookie`)){
    if(message.author.id != ``){ // put your id here so only you can use admin commands
      const accessDenied = new MessageEmbed()
        .setTitle(`Uh oh!`)
        .setDescription(`Hey your not warrior silly.`)
        .setColor(0xff0008);
      message.channel.send(accessDenied);
      return;
    }
     let args = await message.content.substring(PREFIX.length).split(" ");
    await fs.writeFile(`cookie.txt`, args[1], async (err) => {
    if (err) throw err;
    message.delete();
    const success = await new MessageEmbed()
      .setTitle(`Woohoo!`)
      .setDescription(`cookie has been successfully set :)`)
      .setColor(0x00ff0d);
      try {
       var cookie = await fs.readFileSync(`cookie.txt`, "utf8");
      } catch (err) {
        if(err){
          console.log(`no cookie set`);
          return;
        }
      }
      await roblox.setCookie(cookie);

    message.channel.send(success);
  }
)}


  if(message.content.startsWith(`${PREFIX}claim`)){
  const claim = bot.channels.cache.get(''); // where people can claim
  const logChannel = bot.channels.cache.get(''); // where it logs payouts
  const vouch = bot.channels.cache.get(''); // vouch channel
  if(message.channel != claim){
     const claimMsg = await new MessageEmbed()
       .setTitle(`Uh oh!`)
       .setDescription(`please use ${claim} for that command`)
       .setColor(0xff0008);
     await message.channel.send(claimMsg);
     return;
  }
  let args = message.content.substring(PREFIX.length).split(" ");
  try {
      var temp = await fs.readFileSync(`groupid.txt`, "utf8")
  } catch (err) {
      if (err){
        const groupError = await new MessageEmbed()
          .setTitle("Error!")
          .setDescription("a group has not been set yet!")
          .setColor(0xff0008);
        await message.channel.send(groupError);
        console.log(err);
        return;
      }
    }


    var groupId = await fs.readFileSync(`groupid.txt`, "utf8");

  var id = message.author.id;
  var temp;
  try {
    var temp1 = await fs.readFileSync(`${id}.txt`, "utf8");
  } catch (err) {
    if(err){
      message.reply("you need atleast 1 invite to claim :)");
      console.log(err);
      return;
    }
  }

  temp = await fs.readFileSync(`${id}.txt`, "utf8");

  groupId = await parseInt(groupId, 10)

  var amount = parseInt(temp, 10);
  var amountBefore = amount;
  amount = amount * 3; //change 3 to robux per invite
  amount = amount.toString();
  await console.log(`the group id is ${groupId}`);

  const success = await new MessageEmbed()
  .setTitle("You have claimed!")
  .setColor(0x5DFF00)
  .setDescription(`${message.author}, you have claimed ${amount} Robux for ${amountBefore} invites! please vouch ${vouch} :)`)
  const log = await new MessageEmbed()
  .setTitle(`Claim Complete!`)
  .setDescription(`${message.author} clamied ${amount} robux for ${amountBefore} invites :)`)
  .setColor(0x5DFF00)



    if(!args[1]){
      message.reply(`please use this format **${PREFIX}claim <roblox-username>**`);
      return;
    }


    var userId = await roblox.getIdFromUsername(args[1]).then(console.log(userId)).catch(async err => {
      if (err){
        const errorId = await new MessageEmbed()
        .setTitle(`Oh no!`)
        .setDescription(`invalid username :(`)
        .setColor(0xff1605);
        await message.channel.send(errorId);
      }
    })




    await roblox.groupPayout({ group: groupId, member: userId, amount: amount, recurring: false }).then(function(){
      fs.writeFile(id + ".txt", "0", (err) => {
        if (err) throw err;
      });

      message.channel.send(success);
      logChannel.send(log);
      const role = message.guild.roles.cache.find(role => role.name === 'Claimed');
      const member = message.member
      member.roles.add(role);
    }).catch(function (err) {
      if(err){
        message.reply(`make sure you have more then 1 invite and you must join this group in order to be paid out: https://www.roblox.com/groups/${groupId}/about`);
          console.log(err);
      }
    })
  }





})

bot.login(token);
