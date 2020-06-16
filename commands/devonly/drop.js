const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "drop",  
  description: "clears your balance",
  usage: "+bal",
  run: async(bot,message,args) => {
    
    if(!["223214332995960833", "324094776049795072", "566851016910438400", "253973130941431818"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    
    if(!args[0]) return
    
    if(args[0].toLowerCase() === "balance" || args[0].toLowerCase() === "bal" || args[0].toLowerCase() === "money") {
      
      if(!args[1]) return
      message.delete()
      let Embed = new MessageEmbed()
      .setImage("https://media0.giphy.com/media/9PiwIfS9i12KrBJXw5/source.gif")
      .setTitle(`You encountered a wild gift!`)
      .setDescription(`**Claim the mysterious gift by typing ".claim gift"**`)
      .setColor("#6766F6")
      let msg = message.channel.send(Embed)
      message.channel.awaitMessages(m => m.content.toLowerCase() === ".claim gift",
      { max: 1, time: 10000, error: ["time"]}).then(collected => {
        
        if(collected.first().content.toLowerCase() === ".claim gift") {
          
          collected.first().delete()
          message.channel.send(new MessageEmbed().setDescription(`**${collected.first().author.username}** just claimed a gift containing **${(args[1]).toLocaleString('en')} Shards**`).setColor("#6766F6"))
          db.add(`balance_` + collected.first().author.id, args[1])
          
        }
        
      })
      
    }
    
    if(args[0].toLowerCase() === "pokemon") {
      
      if(!args[1]) return
      message.delete()
      let Embed = new MessageEmbed()
      .setImage("https://media0.giphy.com/media/9PiwIfS9i12KrBJXw5/source.gif")
      .setTitle(`You encountered a wild gift!`)
      .setDescription(`**Claim the mysterious gift by typing ".claim gift"**`)
      .setColor("#6766F6")
      let msg = message.channel.send(Embed)
      message.channel.awaitMessages(m => m.content.toLowerCase() === ".claim gift",
      { max: 1, time: 10000, error: ["time"]}).then(collected => {
        
        if(collected.first().content.toLowerCase() === ".claim gift") {
          
          String.prototype.capitalize = function() {
          return this.charAt(0).toUpperCase() + this.slice(1);
          };
          
          collected.first().delete()
          message.channel.send(new MessageEmbed().setDescription(`**${collected.first().author.username}** just claimed a gift containing **${args[1].capitalize()}**`).setColor("#6766F6"))
          db.push(`pokemon_` + collected.first().author.id, args[1].toLowerCase())
          db.set(`latestPokemon_` + collected.first().author.id, args[1].toLowerCase())  
          
        }
        
      })
      
    }
    
  }
}