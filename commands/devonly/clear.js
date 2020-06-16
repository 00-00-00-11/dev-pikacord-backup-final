const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "clear",  
  description: "clears your balance",
  usage: "+bal",
  run: async(bot,message,args) => {
    
    if(!["223214332995960833", "566851016910438400", "253973130941431818", "324094776049795072"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    
    const list = bot.guilds.cache.get("714669709706002442");
    list.members.forEach(r => console.log(r))
    
  }
}