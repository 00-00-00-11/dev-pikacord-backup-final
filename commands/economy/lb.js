const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
module.exports={
  name: "lb",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    }
    let money = db.all().filter(data => data.ID.startsWith(`balance`)).sort((a, b) => b.data - a.data)
    money.length = 9;
    var finalLb = "";
    for (var i in money) {
      finalLb += `**${money.indexOf(money[i])+1} • ${bot.users.cache.get(money[i].ID.split(`_`)[1]) ? bot.users.cache.get(money[i].ID.split(`_`)[1]).username : "Unknown User"}** | Total Shards: ${(money[i].data).toLocaleString('en')} Credits\n`;
    }
    const Embed = new MessageEmbed()
    .setAuthor(`Shards Leaderboard`)
    .setColor("#6766F6")
    .setDescription(finalLb)
    .setFooter(bot.user.username, bot.user.displayAvatarURL())
    .setTimestamp()
    message.channel.send(Embed);
  }
}