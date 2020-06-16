const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
// hello
module.exports={
  name: "give",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    if(!["223214332995960833", "615919285058928661", "566851016910438400", "253973130941431818", "237723768070471691"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    
    let user = message.mentions.users.first().id;
    if(!user) return message.channel.send("Please mention someone!")
    if(!args[1]) return message.channel.send("Please specify the pokemon you want to give!")
    
    db.push(`pokemons_` + user, args[1])
    db.set(`pet_` + user, args[1])
    
    message.channel.send(`**${args[1].capitalize()}** has been added to **${message.mentions.users.first().username}'s** inventory!`)
    
  }
}