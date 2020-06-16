const { MessageEmbed } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const db = require("quick.db");
const ms = require("ms");
const talkedRecently = new Set();
const { get } = require("request-promise-native");
const fs = require("fs");

module.exports={
  name: "stats",  
  description: "Check your pokemons stats",
  aliases: ["stat"],
  usage: ".stats",
  run: async(bot,message,args) => {
    
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
    let mons = db.fetch(`pokemons_` + message.author.id);
    if(!args[0]) return message.channel.send("Please specifiy a pokemon");
    if(!mons.includes(args[0])) return message.channel.send("You don't have that pokemon!");
    let pokemon = args[0];
    let pokemonspeed = db.fetch(`speed_${pokemon}_` + message.author.id);
    let pokemonattack = db.fetch(`attack_${pokemon}_` + message.author.id);
    let pokemondefense = db.fetch(`defense_${pokemon}_` + message.author.id);
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    const options = {
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      json: true
    };
    get(options).then(async body => {
      let iv = Math.round(
        (body.stats[5].base_stat +  // don't highlight, my EYES
          body.stats[4].base_stat +
          body.stats[3].base_stat +
          body.stats[2].base_stat +
          body.stats[1].base_stat +
          body.stats[0].base_stat) /
          3
      );
      
      /*
      
      */
      let Embed = new MessageEmbed()
        .setTitle(`${pokemon.capitalize()}'s Base Stats`)
        .setColor("#6766F6")
        .setAuthor(
          "Professor Oak",
          "https://pbs.twimg.com/profile_images/428279017339645952/GtojrlL9.jpeg"
        )
        .setDescription(
          `**Types:** ${body.types[0].type.name.capitalize()}
**HP:** ${body.stats[5].base_stat}
**Attack:** ${body.stats[4].base_stat}
**Defense:** ${body.stats[3].base_stat}
**Sp. Atk:** ${body.stats[2].base_stat}
**Sp. Def:** ${body.stats[1].base_stat}
**Speed:** ${body.stats[0].base_stat}
**Total Stat:** ${iv}`
        )
        .setImage(
          `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${body.id}.png`
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
      if (body.types[1] != null) {
        Embed.setDescription(`**Types:** ${body.types[0].type.name.capitalize()} | ${body.types[1].type.name.capitalize()}
**Nature:** Modest
**HP:** ${body.stats[5].base_stat}
**Attack:** ${body.stats[4].base_stat}
**Defense:** ${body.stats[3].base_stat}
**Sp. Atk:** ${body.stats[2].base_stat}
**Sp. Def:** ${body.stats[1].base_stat}
**Speed:** ${body.stats[0].base_stat}
**Total Stat:** ${iv}`);
      }
      message.channel.send(Embed);
    });
  }
};
