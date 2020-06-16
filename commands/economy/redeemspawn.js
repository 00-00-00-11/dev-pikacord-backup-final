const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const ms = require('ms')
var voucher_codes = require('voucher-code-generator');
const { get } = require("request-promise-native");
const color = "#6766F6"
module.exports={
  name: "redeemspawn",
  description: "Show list of help commands",
  usage: "help [command]",
  run: async(bot, message, args) =>{
    
    let redirec = db.fetch(`redirect_` + message.guild.id)
    
    let pokemon = db.fetch(`pokemons_` + message.author.id)

if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    function getlength(number) {
    return number.toString().length;
    }
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    let redeem = db.fetch(`redeem_` + message.author.id)
    
    if(redeem === null || redeem === 0) return message.channel.send("You don't have enough redeem. Get a redeem by typing ``.donate``")
    
    const options = {
        url: `https://pokeapi.co/api/v2/pokemon/${args[0]}`,
        json: true
      }
      
      get(options).then(async body => {
        
        db.set(`redeem_` + message.author.id, redeem-1)
        
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
        
        if(redirec != null && redirec != false) {
          
          bot.channels.cache.get(redirec).send(Embed)
          await db.set(`catchpokemon_` + redirec, body.name)
          return
          
        }
          
          message.channel.send(Embed)
        await db.set(`catchpokemon_` + message.channel.id, body.name)

        bot.channels.cache.get("719907118462795816").send(`**${message.author.username}** just redeemed a **${args[0]}** | **Redeem type:** Redeem spawn`)

      })
    .catch(() => message.channel.send(`**${args[0].capitalize()}** is not a pokemon!`))
  }
}