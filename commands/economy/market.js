const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { get } = require("request-promise-native");
const talkedRecently = new Set();
const db = require("quick.db");
//cons

module.exports = {
  name: "market",
  description: "gives you a hint from the recently spawned pokemon",
  usage: "+.hint",
  aliases: ["dex"],
  run: async (bot, message, args, db) => {
    
    function getlength(number) {
      return number.toString().length;
    }
    
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    if(!args[0]) return message.channel.send("**Available:** ``.market find <pokemon>``")
    
    if(args[0].toLowerCase() === "find" || args[0].toLowerCase() === "search") {
      
      if(!args[1]) return message.channel.send(`Please specify a pokemon!`)
      
      const option = {
        url: `https://pokeapi.co/api/v2/pokemon/${args[1].toLowerCase()}`,
        json: true
      }
      
      get(option).then(body => {
        
        let legendaries = [
          "articuno",
          "zapdos",
          "moltres",
          "mewtwo",
          "mew",
          "entei",
          "raikou",
          "suicune",
          "ho-oh",
          "lugia",
          "latias",
          "latios",
          "groudon",
          "kyogre",
          "rayquaza",
          "azelf",
          "uxie",
          "mesprit",
          "regirock",
          "regice",
          "registeel",
          "regigigas",
          "dialga",
          "palkia",
          "giratina",
          "creseelia",
          "cobalion",
          "terrakion",
          "virizion",
          "keldeo",
          "tornadus",
          "thundurus",
          "landorus",
          "reshiram",
          "zekrom",
          "kyurem",
          "xerneas",
          "yveltal",
          "zygarde",
          "tapu koko",
          "tapu lele",
          "tapu bulu",
          "tapu fini",
          "nihilego",
          "buzzwole",
          "pheromosa",
          "xurkitree",
          "celesteela",
          "kartana",
          "guzzlord",
          "poipole",
          "naganadel",
          "staktaka",
          "blacephalon",
          "cosmog",
          "cosmoem",
          "solgaleo",
          "lunala",
          "necrozma",
          "heatran",
          "jirachi",
          "deoxys",
          "phione",
          "manaphy",
          "darkrai",
          "shaymin",
          "arceus",
          "victini",
          "meoletta",
          "genesect",
          "diancie",
          "hoopa",
          "volcanion",
          "magearna",
          "marshadow",
          "zeraora"
        ];
        
        let price = Math.round((body.stats[5].base_stat + body.stats[4].base_stat + body.stats[3].base_stat + body.stats[2].base_stat + body.stats[1].base_stat + body.stats[0].base_stat) * 100);
        let base = Math.round((body.stats[5].base_stat + body.stats[4].base_stat + body.stats[3].base_stat + body.stats[2].base_stat + body.stats[1].base_stat + body.stats[0].base_stat));
        
        if(legendaries.includes(body.name)) price = Math.round(((body.stats[5].base_stat + body.stats[4].base_stat + body.stats[3].base_stat + body.stats[2].base_stat + body.stats[1].base_stat + body.stats[0].base_stat) * 100) + 550000);
        if(!legendaries.includes(body.name)) price = Math.round(((body.stats[5].base_stat + body.stats[4].base_stat + body.stats[3].base_stat + body.stats[2].base_stat + body.stats[1].base_stat + body.stats[0].base_stat) * 100) - 15000);
        
        let Embed = new MessageEmbed()
        .setTitle(body.name.capitalize())
        .setDescription(`**Price:** ${(price).toLocaleString('en')}\n**Base Stats:** ${base}\n**Type:** ${body.types[0].type.name.capitalize()}`)
        .setFooter("Buy this pokemon by typing .buy within 1 minute")
        .setColor("#6766F6")
        
        if(body.types[1] != null) Embed.setDescription(`**Price:** ${(price).toLocaleString('en')}\n**Base Stats:** ${base}\n**Types:** ${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}`)
        
        if (getlength(body.id) === 1) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${body.id}.png`
        );
      }
      if (getlength(body.id) === 2) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${body.id}.png`
        );
      }
      if (getlength(body.id) === 3) {
        Embed.setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`
        );
      }
        
        message.channel.send(Embed)
        message.channel.awaitMessages(m => m.author.id === message.author.id && m.content.startsWith("."),
        { max: 1, time: 60000, error: ["time"]}).then(collected => {
          
          let bal = db.fetch(`balance_` + message.author.id)
          
          if(collected.first().content.toLowerCase() === ".buy") {
            
            if(bal < price) return message.channel.send("You don't have enough shards to buy this pokemon!")
            
            db.set(`balance_` + message.author.id, bal-price)
            db.push(`pokemon_` + message.author.id, body.name.toLowerCase())
            db.set(`latestPokemon_` + message.author.id, body.name.toLowerCase())
            
            message.channel.send(new MessageEmbed().setAuthor("Successfully purchased a " + body.name.capitalize() + "! type .info latest to view your pokemon!").setColor("#6766F6"))
            
          }
          
        })
        
      }).catch(() => message.channel.send(`**${args[1].toUpperCase()}** is not a valid pokemon!`))
      
    }
    
  } 
}