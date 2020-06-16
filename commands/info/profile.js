const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')

module.exports={
  name: "profile",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    let poke = db.fetch(`pokemons_` + message.author.id)
    let balance = db.fetch(`balance_` + message.author.id)
    
    if(!poke) return
    
    let catches = db.fetch("alltimecatches_" + message.author.id)
    if(catches === null) catches = 0
    
    let Embed = new MessageEmbed()
    .setTitle(message.author.username)
    .setDescription(`**All time catches:** ${catches}\n**Pokemons:** ${poke.length}\n**Balance:** ${(balance).toLocaleString('en')}`)
    .setThumbnail(`https://cdn.bulbagarden.net/upload/thumb/f/f1/Omega_Ruby_Alpha_Sapphire_Brendan.png/200px-Omega_Ruby_Alpha_Sapphire_Brendan.png`)
    .setColor("#6766F6")
    .setFooter("Badge list is coming soon!")
    message.channel.send(Embed)
    
  }
}