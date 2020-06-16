const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')

let shopping = {
  pokemon: {
    1: "Articuno",
    2: "Zapdos",
    3: "Moltres",
    4: "Lugia",
    5: "Ho-oh",
    6: "Latias",
    7: "Latios",
    8: "Groudon",
    9: "Kyogre",
    10: "Rayquaza"
  },
  pokemonprice: {
    1: "7000",
    2: "7000",
    3: "7000",
    4: "8000",
    5: "8000",
    6: "9000",
    7: "9000",
    8: "12000",
    9: "12000",
    10: "12000"
  }
}

module.exports = {
  name: "buy",  
  description: "Buy from the shop",
  usage: ".buy",
  run: async(bot,message,args) => {
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
  let userBal = db.get(`balance_` + message.author.id);
    
    let banned = db.fetch(`banned_` + message.author.id)
    if(banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://forms.gle/4cw7Hse1wF1g4eQD7"})
        .setColor("#fc0303")
      message.author.send(Embeds)
      return
    }
    
  function buy(buying, num){
    if(buying.toLowerCase() == "pokemon" || buying.toLowerCase() === "pokemons"){
      
      if(isNaN(num)) return message.channel.send("That is not a number!")
      if(shopping.pokemon[num] === undefined) return message.channel.send("That is not a pokemon in the shop currently!")
      if(userBal < shopping.pokemonprice[num]) return message.channel.send("You don't have enough money to buy that pokemon!")
      
      db.subtract(`balance_` + message.author.id, shopping.pokemonprice[num])
      message.channel.send(`${message.author} just bought ${shopping.pokemon[num]}!`)
      
      db.push("pokemons_" + message.author.id, shopping.pokemon[num].toLowerCase())
      db.set("pet_" + message.author.id, shopping.pokemon[num].toLowerCase())
    }
    
  }  
    
    if(args[0].toLowerCase() === "pokemon" || args[0].toLowerCase() === "pokemons"){
      buy("pokemon", args[1]);
    }
  }
};