const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const talkedRecently = new Set()
module.exports={
  name: "invite",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    let Embed = new MessageEmbed()
    .setAuthor(`Hey there ${message.author.username}!`)
    .setDescription(`It looks like you want to invite Pikacord!\n**Here is the link:** http://invite.pikacord.xyz`)
    .setColor(`#6766F6`)
    message.channel.send(Embed)
    
  }
}