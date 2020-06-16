const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db');
module.exports={
  name: "prefix",  
  description: "Change the prefix",
  usage: "prefix",
  run: async(bot,message,args,config)=>{
    
    let banned = db.fetch(`banned_` + message.author.id)
    if(banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"})
        .setColor("#fc0303")
      message.author.send(Embeds)
      return
    }
    
    const default_prefix = config.default_prefix;
  if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed or do not have permission to change prefix")
    }
 if(!args[0]) {
      return message.channel.send("Please give the prefix that you want to set")
    }
if(args[1]) {
      return message.channel.send("You can not set prefix a double argument")
    }
 if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("Reseted Prefix ✅")
    }
 db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(`Set Bot Prefix to ${args[0]}`)
 

  
}}