const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
let Embed;
module.exports={
  name: "shop",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    
    return;
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    let banned = db.fetch(`banned_` + message.author.id)
    if(banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://forms.gle/4cw7Hse1wF1g4eQD7)"})
        .setColor("#fc0303")
      message.author.send(Embeds)
      return
    }
    
    if(!args[0]) message.channel.send(".shop <pokemon/items>")
    if(args[0].toLowerCase() === "pokemon" || args[0].toLowerCase() === "pokemons"){
      
      if(args[1].toLowerCase() === "2") {
        
        Embed = new MessageEmbed()
        .setTitle("POKEMON MARKETPLACE")
        .setDescription(`Howdy there ${message.author.username}! how can I help you?\n**Pokemons List**`)
        .addFields({name: "``1`` **Entei** <:articuno:714836428663816235>", value: "Price : 7,000 Shards"})
        .addFields({name: "``2`` **Raikou** <:zapdos:714836437924577402>", value: "Price : 7,000 Shards"})
        .addFields({name: "``3`` **Suicune** <:moltres:714836437635301438>", value: "Price : 7,000 Shards"})
        .addFields({name: "``4`` **Dialga** <:lugia:714836429590495244>", value: "Price : 8,000 Shards"})
        .addFields({name: "``5`` **Palkia** <:hooh:714836429124927609>", value: "Price : 8,000 Shards"})
        .addFields({name: "``6`` **Giratina** <:latias:714988609215922247>", value: "Price : 9,000 Shards"})
        .addFields({name: "``7`` **Arceus** <:latios:714988609375043607>", value: "Price : 9,000 Shards"})
        .addFields({name: "``8`` **Azelf** <:groudon:716823442581880912>", value: "Price : 12,000 Shards"})
        .addFields({name: "``9`` **Mesprit** <:kyogre:716823447933812747>", value: "Price : 12,000 Shards"})
        .addFields({name: "``10`` **Uxie** <:rayquaza:716823570155831356>", value: "Price : 12,000 Shards"})
        .setColor("#6766F6")
        .setFooter("Buy a pokemon by typing .buy pokemon <item number>")
        message.channel.send(Embed)
        return
        
      }
      
      Embed = new MessageEmbed()
        .setTitle("POKEMON MARKETPLACE")
        .setDescription(`Howdy there ${message.author.username}! how can I help you?\n**Pokemons List**`)
        .addFields({name: "``1`` **Articuno** <:articuno:714836428663816235>", value: "Price : 7,000 Shards"})
        .addFields({name: "``2`` **Zapdos** <:zapdos:714836437924577402>", value: "Price : 7,000 Shards"})
        .addFields({name: "``3`` **Moltres** <:moltres:714836437635301438>", value: "Price : 7,000 Shards"})
        .addFields({name: "``4`` **Lugia** <:lugia:714836429590495244>", value: "Price : 8,000 Shards"})
        .addFields({name: "``5`` **Ho-oh** <:hooh:714836429124927609>", value: "Price : 8,000 Shards"})
        .addFields({name: "``6`` **Latias** <:latias:714988609215922247>", value: "Price : 9,000 Shards"})
        .addFields({name: "``7`` **Latios** <:latios:714988609375043607>", value: "Price : 9,000 Shards"})
        .addFields({name: "``8`` **Groudon** <:groudon:716823442581880912>", value: "Price : 12,000 Shards"})
        .addFields({name: "``9`` **Kyogre** <:kyogre:716823447933812747>", value: "Price : 12,000 Shards"})
        .addFields({name: "``10`` **Rayquaza** <:rayquaza:716823570155831356>", value: "Price : 12,000 Shards"})
        .setColor("#6766F6")
        .setFooter("Buy a pokemon by typing .buy pokemon <item number>")
      message.channel.send(Embed)
      
    }else if(args[0].toLowerCase() === "item" || args[0].toLowerCase() === "items"){
      Embed = new MessageEmbed()
        .setTitle("ITEM MARKETPLACE")
        .setDescription(`Howdy there ${message.author.username}! how can I help you?\n**Items List Coming Soon**`)
        .setColor("#6766F6")
      message.channel.send(Embed)
    }
  }
}