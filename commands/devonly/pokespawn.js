const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const db = require('quick.db')
const { get } = require("request-promise-native");

module.exports={
  name: "spawn",  
  description: "Check your balance",
  usage: "+bal",
  run: async(bot,message,args)=>{
    function getlength(number) {
    return number.toString().length;
}
    if(!["223214332995960833", "566851016910438400", "253973130941431818", "324094776049795072", "237723768070471691"].includes(message.author.id)) return message.channel.send("You don't have permission!");
    //if(isNaN(args[0])) return message.channel.send("Failed to execute ``forcespawn`` command, ``ERROR: " + args[0] + " is not a valid pokemon!``")
    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    }
    
    const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`,
        json: true
      }
      get(options).then(async body => {
        let Embed = new MessageEmbed()
        .setTitle("You encountered a wild pokémon!")
        .setDescription("Catch the pokemon by typing **.catch <pokémon>**")
        .setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`) // so how aer we gonna do it? im still confuse
        if(getlength(body.id) === 1){
          Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`)
        }
        if(getlength(body.id) === 2){
          Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`)
        }
        if(getlength(body.id) === 3){
          Embed.setImage(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`)
        }
        Embed.setColor("#6766F6")
        message.channel.send(Embed)
        await db.set(`catchpokemon_` + message.channel.id, body.name)
        
        if(body.id === 492) await db.set(`catchpokemon_` + message.channel.id, "shaymin")
        if(body.id === 487) await db.set(`catchpokemon_` + message.channel.id, "giratina")
        
      })
  }
}