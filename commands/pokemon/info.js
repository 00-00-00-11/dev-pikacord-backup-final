const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");
module.exports = {
  name: "info",
  description: "Show list of help commands",
  usage: "help [command]",
  run: async (bot, message, args, reaction) => {
    
    let pokemons = db.fetch(`pokemons_` + message.author.id)

if(!pokemons) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")
    
    let banned = db.fetch(`banned_` + message.author.id)
    if(banned === true) {
      let Embeds = new MessageEmbed()
        .setTitle(`YOUR ACCOUNT HAS BEEN BANNED`)
        .setDescription("**Your account has been banned from using the bot for one of the following reasons:**\n➜ Account automation\n➜ Scamming other user\n➜ Promoting in support server\n➜ Dm advertising")
        .addFields({name: "**Apply form**", value: "[Please fill out this form if you wish to apply](https://www.youtube.com/watch?v=dQw4w9WgXcQ)"})
        .setColor("#fc0303")
      message.author.send(Embeds)
      return
    }
    
    function getlength(number) {
      return number.toString().length;
    }
      
    if(args[0]) {
      
      if(args[0].toLowerCase() === "latest"){
        
        let latest = db.fetch(`latestPokemon_` + message.author.id)
        
        let pokemon = db.fetch(`pet_` + message.author.id);
    if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")  
    
    let pokemonspeed = db.fetch(`speed_${pokemon}_` + message.author.id);
    let pokemonattack = db.fetch(`attack_${pokemon}_` + message.author.id);
    let pokemondefense = db.fetch(`defense_${pokemon}_` + message.author.id);

//what does this do?? string.prototype.capitalize??
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${latest}`,
      json: true
    };
    get(options).then(async body => { 
      let iv = Math.round(
        (body.stats[5].base_stat +
          body.stats[4].base_stat +
          body.stats[3].base_stat +
          body.stats[2].base_stat +
          body.stats[1].base_stat +
          body.stats[0].base_stat) 
      );
      let Embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s ${latest.capitalize()}`)
        .setColor("#6766F6")
        .setDescription(
          `**Types:** ${body.types[0].type.name.capitalize()}
**Nature:** Modest
**Level:** 1

**HP:** ${body.stats[0].base_stat}
**Attack:** ${body.stats[1].base_stat}
**Defense:** ${body.stats[2].base_stat}
**Sp. Atk:** ${body.stats[3].base_stat}
**Sp. Def:** ${body.stats[4].base_stat}
**Speed:** ${body.stats[5].base_stat}
**Total Stat:** ${iv}`
        )
        .setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon}.png`
        );
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
      var array = fs
      .readFileSync("./legendarylist.txt")
      .toString()
      .split("\n");
      if (array.content === body.id) Embed.setTitle(`Level 1 ${pokemon.capitalize()} | `)
      if (body.types[1] != null) {
        Embed.setDescription(`**Types:** ${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}
**Nature:** Modest
**Level:** 1

**HP:** ${body.stats[0].base_stat}
**Attack:** ${body.stats[1].base_stat}
**Defense:** ${body.stats[2].base_stat}
**Sp. Atk:** ${body.stats[3].base_stat}
**Sp. Def:** ${body.stats[4].base_stat}
**Speed:** ${body.stats[5].base_stat}
**Total Stat:** ${iv}`);
      }
      message.channel.send(Embed);
    });
        return
      }
      
    }
    
      
    
    let pokemon = db.fetch(`pet_` + message.author.id);
    if(!pokemon) return message.channel.send("You don't have any pokemon! Do `.start` to get started!")  
    
    let pokemonspeed = db.fetch(`speed_${pokemon}_` + message.author.id);
    let pokemonattack = db.fetch(`attack_${pokemon}_` + message.author.id);
    let pokemondefense = db.fetch(`defense_${pokemon}_` + message.author.id);

//what does this do?? string.prototype.capitalize??
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      json: true
    };
    get(options).then(async body => { 
      let iv = Math.round(
        (body.stats[5].base_stat +
          body.stats[4].base_stat +
          body.stats[3].base_stat +
          body.stats[2].base_stat +
          body.stats[1].base_stat +
          body.stats[0].base_stat) 
      );
      let Embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s ${pokemon.capitalize()}`)
        .setColor("#6766F6")
        .setDescription(
          `**Types:** ${body.types[0].type.name.capitalize()}
**Nature:** Modest
**Level:** 1

**HP:** ${body.stats[0].base_stat}
**Attack:** ${body.stats[1].base_stat}
**Defense:** ${body.stats[2].base_stat}
**Sp. Atk:** ${body.stats[3].base_stat}
**Sp. Def:** ${body.stats[4].base_stat}
**Speed:** ${body.stats[5].base_stat}
**Total Stat:** ${iv}`
        )
        .setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon}.png`
        );
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
      var array = fs
      .readFileSync("./legendarylist.txt")
      .toString()
      .split("\n");
      if (array.content === body.id) Embed.setTitle(`Level 1 ${pokemon.capitalize()} | `)
      if (body.types[1] != null) {
        Embed.setDescription(`**Types:** ${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}
**Nature:** Modest
**Level:** 1

**HP:** ${body.stats[0].base_stat}
**Attack:** ${body.stats[1].base_stat}
**Defense:** ${body.stats[2].base_stat}
**Sp. Atk:** ${body.stats[3].base_stat}
**Sp. Def:** ${body.stats[4].base_stat}
**Speed:** ${body.stats[5].base_stat}
**Total Stat:** ${iv}`);
      }
      message.channel.send(Embed);
    });
  }
};
