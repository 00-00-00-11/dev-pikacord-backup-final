const {MessageEmbed} = require('discord.js')
const ms = require('ms');
const db = require('quick.db')
var os = require('os-utils')
module.exports={
    name: 'status',
    description: 'Create a simple giveaway',
    usage: '<time> <channel> <prize>',
    category: 'fun',
    run: async(bot,message,args)=>{
      let totalSeconds = (bot.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60)
      let uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
      let user = db.fetch(`user`)
      
      os.cpuUsage(function(cpu){
      
      let Embed = new MessageEmbed()
      .setTitle("Bot Status")
      .setDescription("Pikacord - \nA new look into the world of discord pokémon")
      .addFields({name: "**Current Version**", value: "Beta"})
      .addFields({name: "**Developers**", value: "Hyp3r#7777\nBigChungus#2441\nMacca™#0001\nTravdrag#8657"})
      .addFields({name: "**Uptime**", value: uptime, inline: true})
      .addFields({name: "**Guild Size**", value: bot.guilds.cache.size})
      .addFields({name: "**CPU Usage**", value: cpu.toFixed(3) + "%"})
      .setThumbnail("https://img.techpowerup.org/200605/logo.png")
      .setColor("#6766F6")
      message.channel.send(Embed)
        
      })
    }
}